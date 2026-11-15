import React, { useState } from "react";
import "./Upload.css";

// อนุญาตเฉพาะ ตัวอักษร (ไทย/อังกฤษ/ภาษาอื่น) ตัวเลข และช่องว่าง
// \p{M} จำเป็นสำหรับภาษาไทย เพราะสระบน/วรรณยุกต์เป็น combining mark
const NO_SPECIAL = /^[\p{L}\p{M}\p{N}\s]*$/u;
const EMAIL_REGEX = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;
const PHONE_REGEX = /^\+?\d*$/;

const SPECIAL_MSG = "Special characters are not allowed.";

function Upload() {
  // --- ข้อมูลโปรไฟล์ (CV) ---
  const [fullName, setFullName] = useState("");
  const [profes, setProfes] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState("");
  const [bio, setBio] = useState("");


  // --- ข้อมูลของ Head ---
  const [jobName, setJobName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [jobSkill, setJobSkill] = useState("");

  // เก็บ error ของแต่ละช่อง
  const [errors, setErrors] = useState<Record<string, string>>({});

  // เคลียร์ error ของช่องนั้นเมื่อผู้ใช้เริ่มแก้
  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const textFields: Record<string, string> = {
      jobName,
      address,
      jobSkill,
      fullName,
      profes,
      bio,
    };

    Object.entries(textFields).forEach(([key, value]) => {
      if (!NO_SPECIAL.test(value)) {
        newErrors[key] = SPECIAL_MSG;
      }
    });

    if (email && !EMAIL_REGEX.test(email)) {
      newErrors.email = "The email format is invalid, or it contains disallowed special characters.";
    }



    return newErrors;
  };

  async function UploadData() {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // มี error → ไม่ส่งข้อมูล
    }

    try {
      const userId = sessionStorage.getItem("Idonttallyou");

      if (!userId) {
        alert("Pless login");
        return;
      }

      const response = await fetch("http://localhost:8001/Creerhub/Upload/C_W", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // CV
          FullName: fullName,
          Profes: profes,
          Email: email,
          Phon: phone,
          Bio: bio,
      

          // Head
          jobName,
          address,
          jobType,
          salary,
          jobSkill,

          // User
          userId,
        }),
      });

      const data = await response.json();
      console.log("Upload:", data);

      if (!response.ok) {
        alert("เพิ่มข้อมูลไม่สำเร็จ");
        return;
      }

      alert("Profile submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ Server");
    }
  }

  /* Array for JobTypes */
  const JOB_TYPES = ["Full-time", "Freelance", "Employment Agreement"];

  // ข้อความแจ้งเตือนสีแดงใต้ช่อง
  const ErrorText = ({ field }: { field: string }) =>
    errors[field] ? (
      <small className="block mt-1 text-sm text-red-600">{errors[field]}</small>
    ) : null;

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <div className="profile-wrapper">
        {/* Page header */}
        <div className="profile-header">
          <h1>Complete Your Professional Profile</h1>
          <p>Tell employers about your skills and experience to get better matches.</p>
        </div>

        {/* ================= ส่วนที่ 1: HEAD ================= */}
        <section className="profile-section">
          <h2 className="section-title">Head Cv</h2>
          <div className="profile-card job-card">
            <div className="job-card-body">
              <div className="form-field">
                <label>Job Title</label>
                <input type="text" placeholder="e.g. Senior Product Designer" value={jobName} onChange={(e) => { setJobName(e.target.value); clearError("jobName"); }} /><ErrorText field="jobName" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Location</label>
                  <input type="text" placeholder="e.g. Bangkok (Remote friendly)" maxLength={40} value={address} onChange={(e) => { setAddress(e.target.value); clearError("address"); }} /><ErrorText field="address" />
                </div>
              </div>

              <div className="form-row form-row-3">
                <div className="form-field">
                  <label>Job Type</label>
                  <select value={jobType} onChange={(e) => setJobType(e.target.value)} >
                    <option value="" disabled> เลือกประเภทงาน
                    </option>{JOB_TYPES.map((type) => (<option key={type} value={type}> {type}</option>))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Salary</label>
                  <input type="number" inputMode="numeric" placeholder="$120k - $150k" value={salary}onChange={(e) => { setSalary(e.target.value); clearError("salary"); }} /><ErrorText field="salary" />
                </div>

                <div className="form-field">
                  <label>Key Skill</label>
                  <input type="text" placeholder="Design Systems" value={jobSkill}onChange={(e) => {setJobSkill(e.target.value); clearError("jobSkill"); }}/> <ErrorText field="jobSkill" />
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
              <button className="w-[10rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">
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
                <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => {setFullName(e.target.value);clearError("fullName"); }}
                />
                <ErrorText field="fullName" />
              </div>
              <div className="form-field">
                <label>Professional Title</label>
                <input type="text" placeholder="e.g. Senior Product Designer" value={profes} onChange={(e) => { setProfes(e.target.value); clearError("profes");}}/>
                <ErrorText field="profes" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Email Address</label>
                <input type="text" placeholder="john@example.com" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email");}}
                />
                <ErrorText field="email" />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input type="tel" inputMode="tel" placeholder="+66 81 234 5678" value={phone} onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
                />
                <ErrorText field="phone" />
              </div>
            </div>

            <div className="form-field">
              <label>Brief Bio</label>
              <textarea placeholder="Briefly describe your professional background and what you're looking for..." rows={3} value={bio} onChange={(e) => { setBio(e.target.value); clearError("bio");}}
              ></textarea>
              <ErrorText field="bio" />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="profile-actions">
          {hasErrors && (
            <p className="mb-2 text-sm font-semibold text-red-600">
              Special characters are not allowed. Please check again.
            </p>
          )}
          <button onClick={UploadData} className="w-[8rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">
            Publish Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default Upload;