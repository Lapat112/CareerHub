// Navbar.tsx
import './Nav.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        CreerHub
      </div>
      <nav className="nav-links">        
        <a href="#">Search for Personnel</a>
        <a href="#">Upload</a>
      </nav>
      <div className="nav-actions">
        <a href="#" className="link-login">Log in</a>
        <a href="#" className="btn btn-primary">Sign Up</a>
      </div>
    </header>
  )
}

export default Navbar