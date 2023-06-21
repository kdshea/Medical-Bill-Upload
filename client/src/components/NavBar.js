
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from './helpers/auth'
import logo from '../img/logo.svg'


const NavBar = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    navigate('/')
  }

  return (
    <div className='nav-wrapper'>
      { userIsAuthenticated()
        ?
        <>
          <Nav className='main-nav'>
            <Nav.Item>
              <Navbar.Brand as={Link} to="/bills">
                <img width="44.13" height="40"src={logo} alt="Truffle Health Logo"/>
                <span className="logo-text">Truffle Health</span>
              </Navbar.Brand>
            </Nav.Item>
          </Nav>

          <Nav className='main-nav'>
            <Nav.Item>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </>
        :
        <>
          <Nav className='main-nav'>
            <Nav.Item>
              <Navbar.Brand as={Link} to="/">
                <img width="33.13" height="30" className="d-inline-block align-top"src={logo} alt="Truffle Health Logo"/>
                <span className="logo-text">Truffle Health</span>
              </Navbar.Brand>
            </Nav.Item>
          </Nav>
          <Nav className='main-nav'>
            <Nav.Item>
              <Nav.Link as={Link} to='/register'>Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  as={Link} to='/login'>Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </>      
      }      
    </div>
  )
}
  
  
export default NavBar