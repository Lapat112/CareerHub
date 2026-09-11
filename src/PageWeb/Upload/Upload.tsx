import './Upload.css'

function Upload() {
  return (
    <>
      <div className="profile-wrapper">
        {/* Page header */}
        <div className="profile-header">
          <h1>Complete Your Professional Profile</h1>
          <p>Tell employers about your skills and experience to get better matches.</p>
        </div>

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
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="form-field">
              <label>Professional Title</label>
              <input type="text" placeholder="e.g. Senior Product Designer" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input type="text" placeholder="+66 81 234 5678" />
            </div>
          </div>

          <div className="form-field">
            <label>Brief Bio</label>
            <textarea
              placeholder="Briefly describe your professional background and what you're looking for..."
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Skills & Expertise card */}
        <div className="profile-card">
          <div className="card-title">
            <h2>Skills & Expertise</h2>
          </div>
          <label>Search & Add Skills</label>
          <div className="search-input-wrapper">
            <input type="text" placeholder="Type a skill (e.g. JavaScript, UI Design)" />
          </div>      
        </div>

        {/* Actions */}
        <div className="profile-actions">
         
          <button className="w-[8rem] h-[30px] rounded-lg bg-blue-600 text-white text-sm font-semibold cursor-pointer border-none hover:bg-blue-700">Publish Profile </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="profile-footer">
        <div className="profile-footer-inner">
         <div className="flex items-center gap-2 text-sm font-bold text-gray-900">CrerrHub</div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Help Center</a>
          </div>
          <div className="text-xs text-gray-400">© 2024 TalentVault Inc.</div>
        </div>
      </footer>
    </>
  )
}

export default Upload