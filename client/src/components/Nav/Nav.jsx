import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <style>
        @import url(`https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap`)
      </style>
      <nav>
        <div className="logo-container">
          <Link className="logo" to="/">Unreal Factory</Link>
        </div>
        <div className="link-container">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        {/* <Link to="/model">Model</Link> */}
      </nav>
    </>
  )
}

export default Nav
