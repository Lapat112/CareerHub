import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Personnel.css'

function Personnel() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users')
    .then((res) => res.json())
    .then((data) => {
      setItems(data);
    })
  }, []);


  return (
    <>
      {/* Search Header */}
<div className="jobs-header-wrapper">
  
      </div>

      {/* Main content: filters + listings */}
      <div className="jobs-main-wrapper">
        <section className="jobs-main">
          {/* Sidebar filters */}
          <aside className="jobs-sidebar">
            <div className="filter-group">
              <h4>JOB TYPE</h4>
              <label><input type="checkbox" defaultChecked /> Full-time <span>128</span></label>
              <label><input type="checkbox" /> Contract <span>42</span></label>
              <label><input type="checkbox" /> Freelance <span>15</span></label>
            </div>

            <div className="filter-group">
              <h4>EXPERIENCE LEVEL</h4>
              <label><input type="checkbox" /> Entry Level</label>
              <label><input type="checkbox" defaultChecked /> Mid-Senior</label>
              <label><input type="checkbox" /> Director/VP</label>
            </div>

            <div className="filter-group">
              <h4>SALARY RANGE</h4>
              <input type="range" min="0" max="100" className="salary-slider" />
              <div className="salary-labels">
                <span>$20k</span>
                <span>$100k+</span>
              </div>
            </div>

           
          </aside>

          {/* User  */}
          <div className="jobs-list">
            {items.map((item, index) => (
              <div className="job-card" key={index}>
                <div className="job-card-logo"></div>
                <div className="job-card-body">
                  <Link to={`/ShowCv/${item.id}`}><h3>{item?.Name}</h3></Link>

                  <p className="job-meta">Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)</p>
                  <div className="job-tags">
                    <span className="tag">Full-time</span>
                    <span className="tag">$120k - $150k</span>
                    <span className="tag">Design Systems</span>
                  </div>
                </div>
           
              </div>
            ))}
          </div>
        </section>
      </div>

     
    </>
  )
}

export default Personnel