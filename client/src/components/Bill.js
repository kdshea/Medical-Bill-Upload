import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from './Spinner.js'
import  Card  from 'react-bootstrap/Card'
import { getToken } from './helpers/auth.js'
import  Button  from 'react-bootstrap/Button'
import BillNav from './BillNav'

const BillDetails = () => {
  const { billId } = useParams()
  const [ bill, setBill ] = useState({})
  const [ errors, setErrors ] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/bills/${billId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        // setBill(data)
        // console.log(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  const deleteBill = async (event, billId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/bills/${billId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/bill')
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <Container className='bill-details'>
          <BillNav />
          { bill.bill_amount ? 
            <div className="kitchen-sink">
              <Card>
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title className="title">{bill.hospital_name}</Card.Title>
                  <Card.Text className="title">{bill.hospital_city}, {bill.hospital_state}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <div className="label">Date of Service</div>
                    <div className="content">{bill.date_of_service}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Amount</div>
                    <div className="content">{bill.bill_amount}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Itemized Bill</div>
                    <div className="content">
                      {bill.bill_img_url}
                      <img className='w-100' src={bill.bill_image_url} alt={'Bill Image'} />
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="label">Explanation of Benefits</div>
                    <div className="content">
                      {bill.eob_image_url ?
                        <img className='w-100' src={bill.eob_image_url} alt={'EOB Image'} />
                        :
                        <div>No insurance information provided</div>
                      }
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body className='card-buttons'>
                  <div>
                    <Link to={`/edit-bill/${billId}/`}>
                      <Button className="green-btn"><i className="fa-solid fa-pen-to-square"></i></Button>
                    </Link>
                  </div>
                  <div>
                    <Button className="delete-btn" onClick={event => deleteBill(event, billId)}><i className="fa-solid fa-trash-can"></i></Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            :
            <h2 className="text-center">
              { errors ? 'Something went wrong. Please try again later' : <Spinner />}
            </h2>
          } 
        </Container>
      </div>
    </>
  )
}

export default BillDetails