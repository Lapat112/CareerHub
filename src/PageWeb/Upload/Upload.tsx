import React, { useState ,useEffect} from 'react'
import './Upload.css'

function Upload() {

  // --- ข้อมูลของ Head ---
  const [jobName, setJobName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [jobSkill, setJobSkill] = useState("");


  // --- ข้อมูลโปรไฟล์ (CV) ---
  const [fullName, setFullName] = useState("");
  const [profes, setProfes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState("");/* PNG */
  const [bio, setBio] = useState("");



  function UploadData() {
    try {      
    const userId = localStorage.getItem("Idonttallyou");
    
    if (userId) {
      console.log("i get id", userId)  
    }else {
      console.log("don't get id");
      return;
    }

  /* Head */    
    fetch("http://localhost:8000/users/posthead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobName,
        jobLocation,
        jobType,
        salary,
        jobSkill,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } catch (error) {
    console.error(error);
  }


  /* CV */
    fetch("http://localhost:8000/Upload", {
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
    })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Profile submitted successfully!");
      });

}

/* Arry for JobTypes */
  const JOB_TYPES = ["Full-time", "Freelance", "Employment Agreement"];

  return (
    <>
      <div className="profile-wrapper">

        {/* Page header (อยู่บนสุด) */}
        <div className="profile-header">
          <h1>Complete Your Professional Profile</h1>
          <p>Tell employers about your skills and experience to get better matches.</p>
        </div>

        {/* ================= ส่วนที่ 1: HEAD ================= */}
          <section className="profile-section">
          <h2 className="section-title">Head Cv</h2>

          <div className="profile-card job-card">
            <div className="job-card-logo">
              <span className="logo-placeholder">🖼</span>
              <button type="button" className="import-btn">
                import รูป
              </button>
            </div>

            <div className="job-card-body">
              <div className="form-field">
                <label>Job Title</label>
                <input type="text" placeholder="e.g. Senior Product Designer" value={jobName} onChange={(e) => setJobName(e.target.value)}/>
              </div>

              <div className="form-row">
                
                <div className="form-field">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Bangkok (Remote friendly)" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}/>
                </div>
              </div>

              <div className="form-row form-row-3">
                <div className="form-field">
                <label>Job Type</label>
                <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
                  <option value="" disabled>เลือกประเภทงาน</option>
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

                <div className="form-field">
                  <label>Salary</label>
                  <input type="number" placeholder="$120k - $150k" value={salary} onChange={(e) => setSalary(e.target.value)}/>
                </div>
                <div className="form-field">
                  <label>Key Skill</label>
                  <input type="text" placeholder="Design Systems" value={jobSkill} onChange={(e) => setJobSkill(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ส่วนที่ 2: CV ================= */}
        <section className="profile-section">
          <h2 className="section-title">Details Cv</h2>

          {/* Upload CV card */}
          <div className="profile-card">
            <div className="card-title">
              <span className="icon">📄</span>
              <h2>Upload CV / Resume</h2>
            </div>

            <div className="dropzone">
              <span className="dropzone-icon">☁</span>
              <p className="dropzone-text">Drag and drop your CV here</p>
              <p className="dropzone-sub">Supported formats: PDF, DOCX (Max 10MB)</p>
              <button className=" w-[10rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">
                Browse Files
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
                <input type="text" placeholder="e.g. Senior Product Designer" value={profes} onChange={(e) => setProfes(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input type="number" placeholder="+66 81 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>

            <div className="form-field">
              <label>Brief Bio</label>
              <textarea placeholder="Briefly describe your professional background and what you're looking for..." rows={3} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            </div>
          </div>

       
        </section>

        {/* Actions */}
        <div className="profile-actions">
          <button onClick={UploadData} className="w-[8rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700" >
            Publish Profile
          </button>
        </div>
      </div>

    </>
  )
}

export default Upload