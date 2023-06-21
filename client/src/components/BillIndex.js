
import Spinner from './Spinner.js'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { getToken } from './helpers/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import BillNav from './BillNav'
import API_URL from '../config.js'

const BillIndex = () => {

  const navigate = useNavigate()

  const [bills, setBills] = useState(null)
  const [errors, setErrors] = useState('')
  const [billDeleted, setBillDeleted] = useState(0)

  useEffect(() => {
    fetchBills()
  }, [billDeleted])

  const fetchBills = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/bills/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      setBills(data)
    } catch (error) {
      console.error('Error fetching bills:', error)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, options)
  }

  const editBill = async (event, billId) => {
    event.preventDefault()
    navigate(`/edit-bill/${billId}`)
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
      setBillDeleted(billDeleted + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <div className="index-container">
      <BillNav />
      
      <div className="bill-index">
        {bills && bills.length > 0 ? (
          bills.map((bill) => (
            <div key={bill.id} className="bill-card">
              <div className="card-top">
                <div  className="hospital-name">
                  <h3>{bill.hospital_name}</h3>
                  <p>{bill.hospital_city}, {bill.hospital_state}</p>
                </div>
                <div>
                  <p>{formatDate(bill.date_of_service)}</p>
                  <p>${bill.bill_amount}</p>
                </div>
              </div>
              <div className="bill-images">
                <div className="image-wrapper">
                  {bill.bill_image_url ?
                    <>
                      <img src={bill.bill_image_url} alt={'Bill Image'} />
                      <label>Bill</label>
                    </>
                    :
                    <div>No itemized bill provided</div>
                  }
                  <label>Bill</label>
                </div>
                <div className="image-wrapper">
                  {bill.eob_image_url ?
                    <>
                      <img src={bill.eob_image_url} alt={'EOB Image'} />
                      <label>EOB</label>
                    </>
                    :
                    <div>No insurance information provided</div>
                  }
                </div>
              </div>
              <div className="index-btns">
                <Button className="edit-btn btn center-btn" onClick={event => editBill(event, bill.id)}><i className="fa-solid fa-pen-to-square"></i></Button>
                <div>
                  <Button className="delete-btn btn center-btn" onClick={event => deleteBill(event, bill.id)}><i className="fa-solid fa-trash-can"></i></Button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="no-bills">No bills found.</div>
        )}
      </div>

      <div className="center-btn">
        <Link to="/add-bill">
          <Button>Upload a Bill</Button>
        </Link>
      </div>
    </div>
  )
}

export default BillIndex
