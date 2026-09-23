import './Login.css'

function Login() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
     
        {/* Heading */}
        <div className="login-heading">
          <h1>Welcome back</h1>
          <p>Log in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="login-card">
          <div className="form-field">
            <label>Email address</label>
            <div className="input-with-icon">
              <input type="email" placeholder="Name" />
            </div>
          </div>

          <div className="form-field">
            <div className="label-row">
              <label>Password</label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <div className="input-with-icon">            
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <label className="remember-me">
            <input type="checkbox" /> Keep me logged in
          </label>

          <button className="btn-login">Log In</button>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-buttons">
            <button className="btn-social">
              <span className="social-icon google">G</span> Google
            </button>
          
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Login