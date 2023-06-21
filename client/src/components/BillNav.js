
import { Link } from 'react-router-dom'
import { getId } from './helpers/auth'


const BillNav = () => {
  const userId = getId()

  return (
    <div className='bill-nav'>
      <Link to='/add-bill'>
        <i className="fa-regular fa-square-plus"></i>
        <p>New Bill</p>
      </Link> 
      <Link to='/bills'>
        <i className="fa-solid fa-file-invoice"></i>
        <p>Overview</p>
      </Link> 
      <Link  to={`/profile/${userId}`}>
        <i className="fa-regular fa-circle-user"></i>
        <p>Account</p>
      </Link> 
    </div>

  )
}
  
  
export default BillNav