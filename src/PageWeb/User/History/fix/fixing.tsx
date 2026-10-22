import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./fixing.css";

function Fixing() {

  // --- ข้อมูลของ Head ---

const { id } = useParams();
const navigate = useNavigate();
const [showname, setShowname] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/fixCv/User")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (item) => item.HeadId === Number(id)
        );

        setShowname(user || {});
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setShowname({ ...showname, [name]: value });
  }

  function updateProfile(e) {
    e.preventDefault();

    fetch(`http://localhost:8000/fix/putrun/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobName: showname.jobName,
        jobLocation: showname.jobLocation,
        jobType: showname.jobType,
        salary: showname.salary,
        jobSkill: showname.jobSkill,
        FullName: showname.FullName,
        Profes: showname.Profes,
        Email: showname.Email,
        address: showname.address,
        Phon: showname.Phon,
        Bio: showname.Bio
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Update success")
        navigate("/History")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form className="profile-page" onSubmit={updateProfile}>
      <h1 className="page-title">Fix Your Professional Profile</h1>

      {/* ===== Head CV ===== */}
      <h2 className="section-title">Head Cv</h2>
      <div className="card">
        <div className="head-grid">

          <div className="head-fields">
            <div className="field">
              <label>Job Title</label>
              <input name="jobName" placeholder="e.g. Senior Product Designer" value={showname?.jobName || ""} onChange={handleChange} />
            </div>

            <div className="field half">
              <label>Location</label>
              <input name="jobLocation" placeholder="e.g. Bangkok (Remote friendly)" value={showname?.jobLocation || ""} onChange={handleChange} />
            </div>

            <div className="row">
              <div className="field">
                <label>Job Type</label>
                <select name="jobType" value={showname?.jobType || ""} onChange={handleChange}>
                  <option value="">เลือกประเภทงาน</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div className="field">
                <label>Salary</label>
                <input name="salary" placeholder="$120k - $150k" value={showname?.salary || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="field half">
              <label>Key Skill</label>
              <input name="jobSkill" placeholder="Design Systems" value={showname?.jobSkill || ""} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Details CV ===== */}
      <h2 className="section-title">Details Cv</h2>

      <div className="card">
        <h3 className="card-title">📄 Upload CV / Resume</h3>
        <div className="dropzone">
          <div className="cloud">☁</div>
          <p className="drop-text">
            Drag and drop your CV <span>here</span>
          </p>
          <p className="drop-hint">Supported formats: PDF, DOCX (Max 10MB)</p>
          <button type="button" className="btn-primary">
            Browse Files
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">👤 Personal Information</h3>

        <div className="grid-2">
          <div className="field">
            <label>Full Name</label>
            <input name="FullName" placeholder="John Doe" value={showname?.FullName || ""} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Professional Title</label>
            <input name="Profes" placeholder="e.g. Senior Product Designer" value={showname?.Profes || ""} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input name="Email" type="email" placeholder="john@example.com" value={showname?.Email || ""} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Phone Number</label>
            <input name="Phon" placeholder="+66 81 234 5678" value={showname?.Phon || ""} onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label>Brief Bio</label>
          <textarea name="Bio" placeholder="Briefly describe your professional background and what you're looking for..." value={showname?.Bio || ""} onChange={handleChange} />
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="btn-primary" onClick={updateProfile}>
          UpdateProfile
        </button>
      </div>
    </form>
  )
}

export default Fixing;