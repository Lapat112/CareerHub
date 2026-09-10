// Navbar.tsx
import './Nav.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">◆</span> TalentHub
      </div>
      deww
      <nav className="nav-links">
        <a href="#">Find Jobs</a>
        <a href="#">Browse Talent</a>
        <a href="#">Find Employers</a>
      </nav>
      <div className="nav-actions">
        <a href="#" className="link-login">Log in</a>
        <a href="#" className="btn btn-primary">Sign Up</a>
      </div>
    </header>
  )
}

export default Navbar