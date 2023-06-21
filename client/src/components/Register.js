import axios from 'axios'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setId, setToken } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



const Register = () => {

  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    password: '',
    password_confirmation: '',
  })
  const [ accountData, setAccountData ] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    owner: '',
  })
  const [ loginData, setLoginData ] = useState('')
  const [ errors, setErrors ] = useState('')
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    if (event.target.name === 'username' || event.target.name === 'password') {
      setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
    if (event.target.name === 'first_name' || event.target.name === 'middle_name' || event.target.name === 'last_name') {
      setAccountData({ ...accountData, [event.target.name]: event.target.value })
    }
    setErrors(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${API_URL}/auth/register/`, formData)
      autoLogin()
    } catch (error) {
      console.log(error)
    }
  }


  const autoLogin = async (event) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login/`, loginData)
      setToken(data.token)
      setId(data.userId)
      setAccountData({ ...accountData, owner: data.userId })
    } catch (error) {
      setErrors(error)
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (accountData.owner) {
      createAccount()
    }
  }, [accountData.owner])

  const createAccount = async (event) => {
    try {
      const { data } = await axios.post(`${API_URL}/profile/`, accountData)
      navigate(`/profile/${accountData.owner}`)
    } catch (error) {
      setErrors(error)
      console.log(error.response)
    }
  }

  return (
    <main>
      <Container className='register-form'>


        <Row>
          <h1>Register</h1>    
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="text" name="first_name" placeholder="First Name" value={formData.first_name} /> 
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="text" name="middle_name" placeholder="Middle Name" value={formData.middle_name} /> 
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} /> 
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control  onChange={handleChange} type="email" name="username" placeholder='Email' value={formData.username}  />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password}  />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={formData.password_confirmation} /> 
            </Form.Group>
            { errors && <p className='error text-danger'>{errors}</p>}
            <Form.Group className='center-btn'>
              <Button type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </main>

  )
}

export default Register 