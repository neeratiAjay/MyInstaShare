import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dieu9paow/image/upload/v1727069595/alert-triangle_cq0jwj.png"
      alt="page not found"
      className="notfound-image"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="home-btn">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
