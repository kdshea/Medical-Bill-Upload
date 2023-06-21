import axios from 'axios'
import { getToken, getPayLoad } from './helpers/auth'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'
import API_URL from '../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CurrencyInput from 'react-currency-input-field'
import BillNav from './BillNav'

const EditBill = () => {

  const navigate = useNavigate()
  const { billId } = useParams()
  const [ billData, setBillData ] = useState({})
  const [ updatedBillData, setUpdatedBillData ] = useState({})

  const [ updatedBillImgUrl, setUpdatedBillImgUrl ] = useState('')
  const [ billImageSelect, setBillImageSelect ] = useState('')
  const [ billUploading, setBillUploading ] = useState(false)
  const [ billUploadComplete, setBillUploadComplete ] = useState(false)

  const [ updatedEobImgUrl, setUpdatedEobImgUrl ] = useState('')
  const [ eobImageSelect, setEobImageSelect ] = useState('')
  const [ eobUploading, setEobUploading ] = useState(false)
  const [ eobUploadComplete, setEobUploadComplete ] = useState(false)

  const [ errors, setErrors ] = useState(false)
  
  useEffect(() => {
  }, [updatedBillImgUrl, updatedEobImgUrl])

  useEffect(() => {
    // console.log('bill data', billData)
  }, [billData])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/bills/${billId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setBillData(data)
        setUpdatedBillData(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const payLoad = getPayLoad()
    const ownerId = payLoad.sub.toString()
    setBillData({ ...billData, owner: ownerId }),
    setUpdatedBillData({ ...updatedBillData, owner: ownerId })
  }, [])

  const handleChange = (event, error) => {
    setUpdatedBillData({ ...updatedBillData, [event.target.name]: event.target.value })
  }

  const handleBillAmountChange = (value) => {
    setUpdatedBillData({ ...updatedBillData, bill_amount: value })
  }

  const uploadBillImage = async (event = undefined) => {
    try {
      if (event) {
        event.preventDefault()
      }
      if (!billImageSelect) {
        return
      }
      setBillUploading(true)
      const formData = new FormData()
      formData.append('file', billImageSelect)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_KEY)
      const { data } = await axios.post('https://api.cloudinary.com/v1_1/dhblcmzwc/image/upload', formData)
      setUpdatedBillImgUrl(data.url)
      setUpdatedBillData({ ...billData, bill_image_url: data.url })
      setBillUploadComplete(true)
    } catch (error) {
      console.log(error)
    } finally {
      setBillUploading(false)
    }
  }
  const uploadEobImage = async (event = undefined) => {
    try {
      if (event) {
        event.preventDefault()
      }
      if (!eobImageSelect) {
        return
      }
      setEobUploading(true)
      const formData = new FormData()
      formData.append('file', eobImageSelect)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_KEY)
      const { data } = await axios.post('https://api.cloudinary.com/v1_1/dhblcmzwc/image/upload', formData)
      setUpdatedEobImgUrl(data.url)
      setUpdatedBillData({ ...billData, eob_image_url: data.url })
      setEobUploadComplete(true)
    } catch (error) {
      console.log(error)
    } finally {
      setEobUploading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await Promise.all([uploadBillImage(), uploadEobImage()])
      // console.log('bill data.>>>>>', billData)
      const { data } = await axios.put(`${API_URL}/bills/${billId}/`, updatedBillData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      navigate(`/bills/${data.id}`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  const deleteBill = async (event, billId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/bills/${billId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(data)
      navigate('/bills/')
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      <div className='form-page'>
        <div className='edit-bill'>
          <BillNav />
          <Form className='bill-form' onSubmit={handleSubmit}>
            <div >
              <Form.Group className="bill-form-field" >
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control onChange={handleChange} type="text" name="hospital_name" placeholder={billData.hospital_name} value={updatedBillData.hospital_name} /> 
              </Form.Group>
              <Form.Group className="bill-form-field" >
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleChange} type="text" name="hospital_city" placeholder={billData.hospital_city} value={updatedBillData.hospital_city} /> 
              </Form.Group>
              <Form.Group className='bill-form-field'>
                <Form.Label>State</Form.Label>
                <Form.Select onChange={handleChange} name={billData.hospital_state} value={updatedBillData.hospital_state}>
                  <option value="">-- Select State --</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="bill-form-field" >
                <Form.Label>Date of Service</Form.Label>
                <Form.Control  onChange={handleChange} type="date" name="date_of_service" placeholder={billData.date_of_service} value={updatedBillData.date_of_service}  />
              </Form.Group>
              <Form.Group className="bill-form-field">
                <Form.Label>Bill Amount</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <CurrencyInput
                    id="bill_amount"
                    name="bill_amount"
                    placeholder={billData.bill_amount}
                    value={updatedBillData.bill_amount}
                    decimalsLimit={2}
                    onValueChange={handleBillAmountChange}
                  />
                </div>
              </Form.Group>
              <Form.Label className="image-label">Itemized Medical Bill</Form.Label>
              <div className="image-field">
                <Form.Group>
                  { updatedBillData.bill_image_url ? 
                    <div className="bill-image">
                      <img className='w-100' src={updatedBillData.bill_image_url} alt={'Bill Image'} />
                    </div>
                    :
                    <>
                      <div className="image-label">
                        No itemized bill provided
                      </div>
                    </>
                  }
                </Form.Group>
                <Form.Group className="bill-form-field image-upload"  >
                  <input type="file" id="image" className="input" onChange={(event) => {
                    setBillImageSelect(event.target.files[0])
                  }} /> 
                  <Button className="green-btn" onClick={uploadBillImage} disabled={billUploading}>
                    {billUploading ? (
                      <>
                        <div className="dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </>
                    ) : billUploadComplete ? (
                      'Update Complete'
                    ) : (
                      'Update Bill'
                    )}
                  </Button>
                </Form.Group> 
              </div>
              <Form.Label className="image-label">Explanation of Benefits (EOB)</Form.Label>
              <div className="image-field">
                <Form.Group>
                  { billData.eobImgUrl ? 
                    <div className="bill-image">
                      <img className='w-100' src={updatedBillData.eob_image_url} alt={'EOB Image'} />
                    </div>
                    :
                    <>
                      <div className="image-label">No insurance information provided</div>
                    </>
                  }
                </Form.Group>
                <Form.Group className="bill-form-field image-upload"  >
                  <input type="file" id="image" className="input" onChange={(event) => {
                    setEobImageSelect(event.target.files[0])
                  }} /> 
                  <Button className="green-btn" onClick={uploadEobImage} disabled={eobUploading}>
                    {eobUploading ? (
                      <>
                        <div className="dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </>
                    ) : eobUploadComplete ? (
                      'Update Complete'
                    ) : (
                      'Update EOB'
                    )}
                  </Button>
                </Form.Group> 
              </div>
            </div>
            { errors && <p className='text-danger'>{errors}</p>}
            <Form.Group className='center-btn'>
              <Button type="submit">
                Save
              </Button>
              <Button className="delete-btn btn center-btn" onClick={event => deleteBill(event, billId)}><i className="fa-solid fa-trash-can"></i></Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditBill 