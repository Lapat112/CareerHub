import React, { useState } from "react";
import "./Upload-header.css";

interface UploadHeaderProps {
  cvId: number;
}

function UploadHeader({ cvId }: UploadHeaderProps) {

  // --- ข้อมูลของ Head ---
  const [jobName, setJobName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [jobSkill, setJobSkill] = useState("");

  // --- Array for JobTypes ---
  const JOB_TYPES = [ "Full-time", "Freelance", "Employment Agreement"];

  async function UploadData() {

    try {

      const userId =
        localStorage.getItem("Idonttallyou");

      if (!userId) {
        console.log("don't get id");
        alert("ไม่พบ User ID");
        return;
      }

      if (!cvId) {
        console.log("don't get cv id");
        alert("ไม่พบ CV ID");
        return;
      }

      console.log("User ID:", userId);
      console.log("CV ID:", cvId);

      // =========================
      // สร้าง Head
      // =========================

      const response = await fetch(
        "http://localhost:8000/users/posthead",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            jobName,
            jobLocation,
            jobType,
            salary,
            jobSkill,
            userId,
            Cvlink: cvId
          })
        }
      );

      const data = await response.json();

      console.log("Head:", data);

      if (!response.ok) {
        alert("เพิ่ม Head ไม่สำเร็จ");
        return;
      }

      alert(
        "สร้าง Head และเชื่อมกับ CV สำเร็จ!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "เกิดข้อผิดพลาดในการเชื่อมต่อ Server"
      );

    }
  }

  return (
    <>
      <div className="profile-wrapper">

        {/* ================= ส่วนที่ 1: HEAD ================= */}

        <section className="profile-section">

          <h2 className="section-title">
            Head Cv
          </h2>

          <div className="profile-card job-card">

            {/* รูป */}

            <div className="job-card-logo">

              <span className="logo-placeholder">
                🖼
              </span>

              <button
                type="button"
                className="import-btn"
              >
                import รูป
              </button>

            </div>

            {/* ข้อมูล Head */}

            <div className="job-card-body">

              {/* Job Title */}

              <div className="form-field">

                <label>
                  Job Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Senior Product Designer"
                  value={jobName}
                  onChange={(e) =>
                    setJobName(e.target.value)
                  }
                />

              </div>

              {/* Location */}

              <div className="form-row">

                <div className="form-field">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Bangkok (Remote friendly)"
                    value={jobLocation}
                    onChange={(e) =>
                      setJobLocation(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* Job Type / Salary / Skill */}

              <div className="form-row form-row-3">

                <div className="form-field">

                  <label>
                    Job Type
                  </label>

                  <select
                    value={jobType}
                    onChange={(e) =>
                      setJobType(
                        e.target.value
                      )
                    }
                  >

                    <option
                      value=""
                      disabled
                    >
                      เลือกประเภทงาน
                    </option>

                    {JOB_TYPES.map(
                      (type) => (

                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>

                      )
                    )}

                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Salary
                  </label>

                  <input
                    type="number"
                    placeholder="$120k - $150k"
                    value={salary}
                    onChange={(e) =>
                      setSalary(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-field">

                  <label>
                    Key Skill
                  </label>

                  <input
                    type="text"
                    placeholder="Design Systems"
                    value={jobSkill}
                    onChange={(e) =>
                      setJobSkill(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

              {/* Button */}

              <div className="profile-actions">

                <button
                  type="button"
                  onClick={UploadData}
                  className="submit-btn"
                >
                  Publish Profile
                </button>

              </div>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default UploadHeader;