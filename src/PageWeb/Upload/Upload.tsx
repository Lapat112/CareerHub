import React, { useState } from 'react'
import './Upload.css'
import { useNavigate } from 'react-router-dom';

function Upload() {

  // --- ข้อมูลโปรไฟล์ (CV) ---
  const [fullName, setFullName] = useState("");
  const [profes, setProfes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState(""); /* PNG */
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  async function UploadData() {
    try {
      const userId = localStorage.getItem("Idonttallyou");

      if (userId) {
        console.log("i get id", userId);
      } else {
        console.log("don't get id");
        return;
      }

      /* CV */
      const response = await fetch(
        "http://localhost:8000/Upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: fullName,
            Profes: profes,
            Email: email,
            Phon: phone,
            Bio: bio,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("เพิ่ม CV ไม่สำเร็จ");
        return;
      }

      /* ส่ง CV ID ไปหน้า Upload-header */
      navigate("/UploadHeader", {
        state: {
          cvId: data.cvId
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="profile-wrapper">

        {/* Page header */}
        <div className="profile-header">
          <h1>Complete Your Professional Profile</h1>
          <p>
            Tell employers about your skills and experience to get better matches.
          </p>
        </div>

        {/* ================= ส่วนที่ 2: CV ================= */}
        <section className="profile-section">

          <h2 className="section-title">
            Details Cv
          </h2>

          {/* Upload CV card */}
          <div className="profile-card">
            <div className="card-title">
              <span className="icon">📄</span>
              <h2>Upload CV / Resume</h2>
            </div>

            <div className="dropzone">
              <span className="dropzone-icon">☁</span>
              <p className="dropzone-text"> Drag and drop your CV here </p>
              <p className="dropzone-sub"> Supported formats: PDF, DOCX (Max 10MB)</p>
              <button className="w-[10rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">
                Upload yor CV
              </button>
            </div>

          </div>

          {/* Personal Information card */}
          <div className="profile-card">
            <div className="card-title">
              <span className="icon">👤</span>
              <h2>Personal Information</h2>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
              </div>

              <div className="form-field">
                <label>Professional Title</label>
                <input type="text" placeholder="e.g. Senior Product Designer" value={profes} onChange={(e) =>setProfes(e.target.value) }/>
              </div>

            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) =>  setEmail(e.target.value)}/>
              </div>

              <div className="form-field">
                <label>Phone Number</label>
                <input type="number"placeholder="+66 81 234 5678"value={phone}onChange={(e) =>  setPhone(e.target.value)}/>
              </div>

            </div>
            <div className="form-field">
              <label>Brief Bio</label>
              <textarea placeholder="Briefly describe your professional background and what you're looking for..." rows={3} value={bio} onChange={(e) => setBio(e.target.value)}/>
            </div>
          </div>

        </section>
        {/* Actions */}
        <div className="profile-actions">
          <button onClick={UploadData}className="w-[8rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">
           Publish Profile
          </button>
        </div>

      </div>
    </>
  )
}

export default Upload