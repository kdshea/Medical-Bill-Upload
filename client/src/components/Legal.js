
import detectivePig from '../img/detective-pig.png'
import { Link } from 'react-router-dom'

const Legal = () => {
  return (
    <div className="legal-page">
      <h1>Legal Docs Go Here</h1>
      <img src={detectivePig} alt="Detective pig with magnifying glass" />
      <Link to='/register'>
        <button className="green-btn">Reduce Your Bill</button>
      </Link>
    </div>
  )
}

export default Legal