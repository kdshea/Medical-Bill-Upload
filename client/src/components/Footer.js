import logo from '../img/logo.svg'
import { Link } from 'react-router-dom'

const Footer = () => {


  return (
    <div className="footer-container">
      <div className="footer p-3">
        <div className="footer-logo">
          <img width="33.13" height="30" className="d-inline-block align-top"src={logo} alt="Truffle Health Logo"/>
          <p>Truffle Health</p>
        </div>
        <Link className="legal" to='/privacy'>Privacy Policy</Link>
        <Link className="legal" to='/terms'>Terms & Conditions</Link>
        <div className="kate">
          <a href="https://kdshea.com/" target="_blank" rel="noreferrer" >
            Built by Kate Shea
          </a>
          <a className="footer-icon" href="https://github.com/kdshea" target="_blank" rel="noreferrer" >
            <i className="fa-brands fa-github"></i> 
          </a>
          <a className="footer-icon" href="https://www.linkedin.com/in/katedshea/" target="_blank" rel="noreferrer" > 
            <i className="fa-brands fa-linkedin"></i> 
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer