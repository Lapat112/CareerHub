import "./UserCv.css";

function UserCv() {
  return (
    <div className="profile-page">
      {/* Header Card */}
      <div className="card header-card">
        <div className="header-left">
          <img className="avatar" src="https://i.pravatar.cc/150?img=12" alt="Narawit Sukjai" />
          <div className="header-info">
            <div className="name-row">
              <h1>นราวิชญ์ สุขใจ</h1>             
            </div>
            <p className="role">Senior UX/UI Designer &amp; Product Thinker</p>
            <div className="meta-row">
              <span> กรุงเทพมหานคร, ประเทศไทย</span>
              <span> ประสบการณ์ 6 ปี</span>
              <span> narawit.s@example.com</span>
            </div>
          </div>
        </div>     
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Left Column */}
        <div className="left-col">
          {/* About */}
          <div className="card">
            <h2>👤 เกี่ยวกับฉัน (About Me)</h2>
            <p className="about-text">
              นักออกแบบผู้หลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ใช้งานง่ายและตอบโจทย์ธุรกิจ
              มีประสบการณ์ในการออกแบบ Product ตั้งแต่เริ่มต้น (Zero to One) ทั้ง Mobile และ
              Web Applications เชี่ยวชาญการออกแบบที่ตั้งอยู่บนหลักการทำวิจัยผู้ใช้งาน
              และ Data-driven Design
            </p>
            <div className="about-grid">
              <div>
                <span className="about-label">ตำแหน่งที่หาอยู่</span>
                <span className="about-value">พร้อมเริ่มงานทันที</span>
              </div>
              <div>
                <span className="about-label">ความสนใจ</span>
                <span className="about-value">FinTech, SaaS, AI</span>
              </div>
              <div>
                <span className="about-label">การทำงาน</span>
                <span className="about-value">Full-time, Remote</span>
              </div>
              <div>
                <span className="about-label">ภาษา</span>
                <span className="about-value">ไทย, อังกฤษ</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="card">
            <h2>💼 ประสบการณ์การทำงาน (Experience)</h2>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="exp-row">
                    <div>
                      <h3>Senior UX/UI Designer</h3>
                      <a href="#" className="company-link">Cloud Stream Corp</a>
                      <p className="exp-date">มกราคม 2021 — ปัจจุบัน (3 ปี 5 เดือน)</p>
                    </div>
                  </div>
                  <ul className="exp-list">
                    <li>เข้ามาดูแลงานระบบ Cloud Enterprise สำหรับลูกค้า B2B ในเชิงธุรกิจในองค์กรใหญ่</li>
                    <li>ทำ Design System ของแอปให้เป็นโครงสร้างที่ใช้ในทีม Dev และ Design กว่า 20 คน</li>
                    <li>ปรับปรุงอัตราการใช้งาน (Retention) เพิ่มขึ้น 25% ผ่านการทำ Re-design ครั้งใหญ่</li>
                  </ul>
                </div>
              </div>

              <div className="timeline-item">
              
                <div className="timeline-content">
                  <div className="exp-row">
                    <div>
                      <h3>Product Designer</h3>
                      <a href="#" className="company-link">GrowthWave Agency</a>
                      <p className="exp-date">มิถุนายน 2018 — มีนาคม 2020 (2 ปี 7 เดือน)</p>
                    </div>                   
                  </div>
                  <ul className="exp-list">
                    <li>ออกแบบแอปพลิเคชันโค้ดและ Microsite สำหรับลูกค้าแบรนด์กว่า 20 แบรนด์</li>
                    <li>ทำงานร่วมกับทีม Marketing และ Tech เพื่อเก็บความต้องการของ User</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-col">
          {/* Contact */}
          <div className="card">
            <h2>ช่องทางการติดต่อ</h2>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <span className="contact-label">EMAIL</span>
                <a href="mailto:narawit.s@example.com" className="contact-value link">
                  narawit.s@example.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <span className="contact-label">PHONE</span>
                <span className="contact-value">081-234-5678</span>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">💼</span>
              <div>
                <span className="contact-label">LINKEDIN</span>
                <a href="#" className="contact-value link">linkedin.com/in/narawit</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🌐</span>
              <div>
                <span className="contact-label">PORTFOLIO</span>
                <a href="#" className="contact-value link">naraw-design.com</a>
              </div>
            </div>
          </div>

                   {/* Resume Preview */}
          <div className="card resume-card">
            <h2>Resume Preview</h2>
            <p>อัพเดตล่าสุดของ CV แบบเต็มในรูปแบบ PDF ได้ที่นี่</p>
            <button className="btn btn-primary full-width">เปิดไฟล์ CV</button>
     
          </div>
   


          
        </div>
      </div>
    </div>
  );
}

export default UserCv;