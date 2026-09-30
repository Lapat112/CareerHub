import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const homepage = useNavigate();

  async function addlogin() {
    if (!email || !password) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (data.message === "Login Success") {
        // บันทึกชื่อผู้ใช้ไว้ให้ Navbar นำไปแสดง
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("Idonttallyou",data.Idonttallyou)
        // แจ้ง Navbar ให้อัปเดตทันที
        window.dispatchEvent(new Event("auth-change"));
        homepage("/Homepage");
      } else {
        alert("Login ไม่ผ่าน");
      }
    } catch (error) {
      console.error(error);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  }

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
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
          </div>

          <div className="form-field">
            <div className="label-row">
              <label>Password</label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <div className="input-with-icon">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          <label className="remember-me">
            <input type="checkbox" /> Keep me logged in
          </label>

          <button className="btn-login" onClick={addlogin}>Log In</button>
        </div>

      </div>
    </div>
  )
}

export default Login