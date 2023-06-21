import '../styles/main.css'
import { Link } from 'react-router-dom'
import pigCape from '../img/pig-cape.jpg'
import detectivePig from '../img/detective-pig.png'

const Landing = () => {
  return (
    <main className='landing'>
      <div className="landing-flex">
        <div>        
          <h1>We&#39;re Truffle Health.</h1>
          <p className="big-hook-text">We sniff out the good stuff on your medical bills</p>
        </div>
        <div>
          <img src={pigCape} alt="Cartoon pig in a cape" />
        </div>
        <div>
          <Link to='/register'>
            <button className="green-btn">Reduce Your Bill</button>
          </Link>
          <div>
            <p className="demo">Demo credentials: demo@mail.com demopassword</p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Landing