import { Link } from 'react-router-dom';
import './UserProfile.css'

function UserProfile() {


  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Card */}
        <div className="login-card">
          <div className="form-row">
            <div className="form-field">
              <label>First name</label>
              <div className="input-with-icon">
                <div className="input-display">First name</div>
              </div>
            </div>
            <div className="form-field">
              <label>Last name</label>
              <div className="input-with-icon">
                <div className="input-display">Last name</div>
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>
            <div className="input-with-icon">
              <div className="input-display">name@company.com</div>
            </div>
          </div>

          <div className="form-field">
            <label>Date of birth</label>
            <div className="input-with-icon">
              <div className="input-display"></div>
            </div>
          </div>

          <Link to = {'UserProfile/History'}><button className="btn-history">ไปหน้า History</button></Link>
        </div>
      </div>
    </div>
  )
}

export default UserProfile