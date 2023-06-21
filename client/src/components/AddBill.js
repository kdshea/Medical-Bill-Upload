import axios from 'axios'
import { getToken, getPayLoad } from './helpers/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CurrencyInput from 'react-currency-input-field'
import BillNav from './BillNav'

const AddBill = () => {

  const navigate = useNavigate()
  
  const [ billImgUrl, setBillImgUrl ] = useState('')
  const [ billImageSelect, setBillImageSelect ] = useState('')
  const [ billUploading, setBillUploading ] = useState(false)
  const [ billUploadComplete, setBillUploadComplete ] = useState(false)

  const [ eobImgUrl, setEobImgUrl ] = useState('')
  const [ eobImageSelect, setEobImageSelect ] = useState('')
  const [ eobUploading, setEobUploading ] = useState(false)
  const [ eobUploadComplete, setEobUploadComplete ] = useState(false)

  useEffect(() => {
  }, [billImgUrl,eobImgUrl])

  useEffect(() => {
    const payLoad = getPayLoad()
    const user = payLoad.sub.toString()
    setBillData({ ...billData, owner: user })
  }, [])

  const [ billData, setBillData ] = useState({
    hospital_name: '',
    hospital_city: '',
    hospital_state: '',
    date_of_service: '',
    bill_amount: '',
    bill_image_url: '',
    eob_image_url: '',
  })
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (event, error) => {
    setBillData({ ...billData, [event.target.name]: event.target.value })
  }
  const handleBillAmountChange = (value) => {
    setBillData({ ...billData, bill_amount: value })
    // console.log(billData)
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
      setBillImgUrl(data.url)
      setBillData({ ...billData, bill_image_url: data.url })
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
      setEobImgUrl(data.url)
      setBillData({ ...billData, eob_image_url: data.url })
    } catch (error) {
      console.log(error)
    } finally {
      setEobUploading(false)
    }
  }
  

  const handleSubmit = async (event, error) => {
    event.preventDefault()
    try {
      await Promise.all([uploadBillImage(), uploadEobImage()])
      // console.log('bill data.>>>>>', billData)
      const { data } = await axios.post(`${API_URL}/bills/`, billData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      // console.log('response data', data)
      navigate(`/bills/${data.id}`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <div className='add-bill'>
          <BillNav />
          <Form onSubmit={handleSubmit}>
            <div className='bill-form'>
              <Form.Group className="bill-form-field" >
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control onChange={handleChange} type="text" name="hospital_name" placeholder="Hospital Name" value={billData.hospital_name} /> 
              </Form.Group>
              <Form.Group className="bill-form-field" >
                <Form.Label>City</Form.Label>
                <Form.Control onChange={handleChange} type="text" name="hospital_city" placeholder="Hospital City" value={billData.hospital_city} /> 
              </Form.Group>
              <Form.Group className='bill-form-field'>
                <Form.Label>State</Form.Label>
                <Form.Select onChange={handleChange} name="hospital_state" value={billData.hospital_state}>
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
                <Form.Control  onChange={handleChange} type="date" name="date_of_service" placeholder="Date of Service" value={billData.date_of_service}  />
              </Form.Group>
              <Form.Group className="bill-form-field">
                <Form.Label>Bill Amount</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <CurrencyInput
                    id="bill_amount"
                    name="bill_amount"
                    placeholder="0.00"
                    value={billData.bill_amount}
                    decimalsLimit={2}
                    onValueChange={handleBillAmountChange}
                  />
                </div>
              </Form.Group>
              <Form.Group>

              </Form.Group>
              <Form.Label className="image-label">Upload Your Itemized Medical Bill</Form.Label>
              <div className="image-field">
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
                      'Upload Complete'
                    ) : (
                      'Upload Bill (JPEG Format)'
                    )}
                  </Button>
                </Form.Group> 
                <Form.Group>
                  { billImgUrl ? 
                    <div className="bill-image">
                      <img className='w-100' src={billImgUrl} alt={'Bill Image'} />
                    </div>
                    :
                    <></>
                  }
                </Form.Group>
              </div>

              <Form.Label>Upload Explanation of Benefits (EOB) Associated with Bill </Form.Label>
              <div className="image-field">
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
                      'Upload Complete'
                    ) : (
                      'Upload EOB (JPEG Format)'
                    )}
                  </Button>
                </Form.Group> 
                <Form.Group>
                  { eobImgUrl ? 
                    <div className="bill-image">
                      <img className='w-100' src={eobImgUrl} alt={'EOB Image'} />
                    </div>
                    :
                    <></>
                  }
                </Form.Group>
              </div>
              { errors && <p className='text-danger'>{errors}</p>}
              <Form.Group className='center-btn'>
                <Button type="submit"> Save</Button>
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddBill 