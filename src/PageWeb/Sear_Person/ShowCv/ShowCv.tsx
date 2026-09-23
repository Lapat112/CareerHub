import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowCv.css";

function ShowCv() {
  
  const { id } = useParams();
  const [showname, setShowname] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/ShowCv/User")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find((item) => item.id === Number(id));
        setShowname(user);
      });
  }, [id]);

  return (
    <div className="info-container">

      <div className="info-card">

        <div className="info-card-header">
          <h2>Personal Information</h2>
        </div>

        <div className="info-grid">

          <div className="info-field">
            <label>Full Name</label>
            <p className="info-value">
              {showname?.FullName}
            </p>
          </div>

          <div className="info-field">
            <label>Professional Title</label>
            <p className="info-value">{showname?.ProFes}</p>
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

      <div className="Cv-back"></div>

    </div>
  );
}

export default ShowCv;