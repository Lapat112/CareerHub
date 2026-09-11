import { Link, useNavigate } from "react-router-dom";

import './Nav.css'


function Navbar() {
  return (
    <header className="navbar">
      <div className="logo"> CreerHub </div>
      <nav className="nav-links">  
        <Link to = {"Homepage"}><button className=" cursor-pointer">Home</button></Link>      
        <Link to={"Personnel"}><button  className=" cursor-pointer">Search for Personnel</button></Link>
        <Link to={"Upload"}><button  className=" cursor-pointer">Upload</button></Link>
        
      </nav>
      <div className="nav-actions">
        <Link to={"Login"}><a href="#" className="link-login">Log in</a></Link>
       <Link to={"Register"}><a href="#" className="btn btn-primary">Sign Up</a></Link>
      </div>
    </header>
  )
}

export default Navbar