import React from "react";
import "./ShowCv.css";

function ShowCv() {
  return (
    <div className="info-container">
      {/* Personal Information Card */}
      <div className="info-card">
        <div className="info-card-header">
          <h2>Personal Information</h2>
        </div>

        <div className="info-grid">
          <div className="info-field">
            <label>Full Name</label>
            <p className="info-value"></p>
          </div>

          <div className="info-field">
            <label>Professional Title</label>
            <p className="info-value"></p>
          </div>

          <div className="info-field">
            <label>Email Address</label>
            <p className="info-value"></p>
          </div>

          <div className="info-field">
            <label>Phone Number</label>
            <p className="info-value"></p>
          </div>
        </div>

        <div className="info-field full-width">
          <label>Brief Bio</label>
          <p className="info-value bio-text"></p>
        </div>
      </div>



    <div className="Cv-back">

    </div>
   
    </div>
  );
}

export default ShowCv;