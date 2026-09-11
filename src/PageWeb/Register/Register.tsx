import './Register.css'

function Register() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Heading */}
        <div className="login-heading">
          <h1>Create your account</h1>
          <p>Sign up to get started</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="form-row">
            <div className="form-field">
              <label>First name</label>
              <div className="input-with-icon">
                <input type="text" placeholder="First name" />
              </div>
            </div>
            <div className="form-field">
              <label>Last name</label>
              <div className="input-with-icon">
                <input type="text" placeholder="Last name" />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>
            <div className="input-with-icon">
              <input type="email" placeholder="name@company.com" />
            </div>
          </div>

          <div className="form-field">
            <label>Date of birth</label>
            <div className="input-with-icon">
              <input type="date" />
            </div>
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-with-icon">
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <div className="form-field">
            <label>Confirm password</label>
            <div className="input-with-icon">
              <input type="password" placeholder="Confirm password" />
            </div>
          </div>

          <button className="btn-login">Sign Up</button>
        </div>

        <p className="signup-text">
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </div>
  )
}

export default Register