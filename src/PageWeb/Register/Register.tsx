import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css'

function Register() {

const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmpassword] = useState("");
const homepage = useNavigate();






function addUserRegister(){

  if(password!==confirmpassword!){
    alert("Password does not match");
    return
  }

  if(!firstname || !lastname || !email || !password){
    alert("กรอกข้อมูลให้ครบ")
    return
  }

 fetch("http://localhost:7000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    firstname: firstname,
    lastname : lastname,
    email    : email,
    password    : password
  })
})
.then(res => res.json())
.then(() => { 
  homepage("/Homepage")

});

}

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
                <input type="text" placeholder="First name" onChange={(e) =>setFirstname(e.target.value)} value={firstname} />
              </div>
            </div>
            <div className="form-field">
              <label>Last name</label>
              <div className="input-with-icon">
                <input type="text" placeholder="Last name" onChange={(e) =>setLastname(e.target.value)} value={lastname} />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Email address</label>
            <div className="input-with-icon">
              <input type="email" placeholder="name@company.com"  onChange={(e) =>setEmail(e.target.value)} value={email}  />
            </div>
          </div>

          

          <div className="form-field">
            <label>Password</label>
            <div className="input-with-icon">
              <input type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} value={password} />
            </div>
          </div>

          <div className="form-field">
            <label>Confirm password</label>
            <div className="input-with-icon">
              <input type="password" placeholder="Confirm password" onChange={(e) =>setConfirmpassword(e.target.value)} value={confirmpassword}/>
            </div>
          </div>

          <button className="btn-login" onClick={addUserRegister}>Sign Up</button>
        </div>

        
      </div>
    </div>
  )
}

export default Register