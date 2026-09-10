import './Homepage.css'

function Homepage() {
  return (
    <>
      {/* Hero Main 1 */}
      <div className="hero-wrapper">
        <section className="hero">
          <div className="hero-text">
            <h1>Showcase your CV<br />to the world's top<br />employers</h1>
            <p>Upload your CV and let thousands of companies discover you. Smart matching puts the right opportunities in front of you.</p>
            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">Upload Your CV</a>
              <a href="#" className="btn btn-outline">Browse Jobs</a>
            </div>
            <div className="hero-social-proof">
              <div className="avatars">
                <span className="avatar"></span>
                <span className="avatar"></span>
                <span className="avatar"></span>
              </div>
              <span className="proof-text">Trusted by 10,000+ job seekers</span>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-mock"></div>
          </div>
        </section>
      </div>

      {/* How it works Main 2 */}
      <div className="how-it-works-wrapper">
        <section className="how-it-works">
          <h2>How it works for job seekers</h2>
          <p className="section-sub">Get started in three simple steps</p>
          <div className="steps">
            <div className="step-card">
              <div className="step-icon">⬆</div>
              <h3>1. Upload Your CV</h3>
              <p>Simply drag and drop your resume. Our system parses it automatically to build your profile.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">✎</div>
              <h3>2. Get matched</h3>
              <p>Our algorithm connects you with jobs that fit your skills, experience, and preferences.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">➤</div>
              <h3>3. Apply with one tap</h3>
              <p>Apply to jobs directly from your dashboard and track every response in real time.</p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Mian3*/}
      <div className="cta-wrapper">
        <section className="cta">
          <h2>Ready to take the next step?</h2>
          <p>Join thousands of professionals who've found their dream job through TalentHub.</p>
          <a href="#" className="btn btn-primary">Upload Your CV</a>
        </section>
      </div>









      {/* Footer Main 4 */}
      <div className="footer-wrapper">
        <footer className="footer">
          <div className="footer-columns">
            <div className="footer-col">
              <div className="logo">◆ TalentHub</div>
              <p>Connecting exceptional talent with leading companies worldwide.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#">Browse Jobs</a>
              <a href="#">Browse Talent</a>
              <a href="#">Pricing</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Homepage