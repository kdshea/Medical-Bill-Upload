import axios from 'axios'
import { getToken, getPayLoad } from './helpers/auth'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import Spinner from '../components/Spinner.js'
import { useNavigate, useParams } from 'react-router-dom'
import API_URL from '../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import BillNav from './BillNav'

const UserProfile = () => {

  const navigate = useNavigate()
  const { userId } = useParams()
  const payLoad = getPayLoad()
  const user = payLoad.sub.toString()
  const [ userProfile, setUserProfile ] = useState({})
  const [ updatedUserProfile, setUpdatedUserProfile ] = useState({})
  const [ savedChanges, setSavedChanges ] = useState(0)
  const [showAccountUpdated, setShowAccountUpdated] = useState(false)
  const [ errors, setErrors ] = useState('')
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile/${userId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        // console.log(data)
        const completeData = { ...data, owner: userId }
        setUserProfile({ ...userProfile, ...completeData })
        setUpdatedUserProfile({ ...updatedUserProfile, ...completeData })
      } catch (error) {
        setErrors(error)
        console.log(error)
      }
    }
    getUser()

  }, [userId])


  const handleChange = (event, error) => {
    setUpdatedUserProfile({ ...updatedUserProfile, [event.target.name]: event.target.value })
    setErrors(error)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.put(`${API_URL}/profile/${userId}/`, updatedUserProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      setSavedChanges(savedChanges + 1)
      setShowAccountUpdated(true)
      setTimeout(() => {
        setShowAccountUpdated(false)
      }, 3000)

    } catch (error) {
      setErrors(error)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <BillNav />
        { userProfile.first_name ? 
          <>
            <Form onSubmit={handleSubmit}>
              <div className='profile-form'>
                <Form.Group className="profile-form-field" >
                  <Form.Label>First</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="first_name" placeholder={userProfile.first_name} value={updatedUserProfile.first_name} /> 
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>Middle</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="middle_name" placeholder={userProfile.last_name} value={updatedUserProfile.middle_name} /> 
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>Last</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="last_name" placeholder={userProfile.last_name} value={updatedUserProfile.last_name} /> 
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control  onChange={handleChange} type="date" name="date_of_birth" placeholder={userProfile.date_of_birth} value={updatedUserProfile.date_of_birth}  />
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="address1" placeholder={userProfile.address1} value={updatedUserProfile.address1} /> 
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="address2" placeholder={userProfile.address2} value={updatedUserProfile.address2} /> 
                </Form.Group>
                <Form.Group className="profile-form-field" >
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="city" placeholder={userProfile.city} value={updatedUserProfile.city} /> 
                </Form.Group>
                <Form.Group className='profile-form-field'>
                  <Form.Label>State</Form.Label>
                  <Form.Select onChange={handleChange} name="state" value={updatedUserProfile.state}>
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
                <Form.Group className="profile-form-field" >
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control onChange={handleChange} type="text" name="zip_code" placeholder={userProfile.zip_code} value={updatedUserProfile.zip_code} /> 
                </Form.Group>
              </div>
              <Form.Group className='center-btn'>
                <Button type="submit">
                  Save
                </Button>
              </Form.Group>
            </Form>
            <div className='hidden-messages'>
              { errors && <p className='error-popup'>Something went wrong. Please try again later</p>}
              {showAccountUpdated && <p className="account-update">Account Updated</p>}
            </div>
          </>
          :
          <h2 className="text-center">
            { errors ? 'Something went wrong. Please try again later' : <Spinner />}
          </h2>
        }
      </div>
    </>
  )
}

export default UserProfile