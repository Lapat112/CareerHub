import React, { useState , useEffect } from 'react';

import './Personnel.css'

function Personnel() {

  const [showname, setShowname] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/users')
    .then((res) => res.json())
    .then((data) => {
      setShowname(data);
    })
  }, []);


  return (
    <>
      {/* Search Header */}
<div className="jobs-header-wrapper">
  <section className="pt-10 pb-6">
    <form className="flex gap-3">
      <input type="text" placeholder="Job title or keywords" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm"/>
      <input type="text" placeholder="Location (e.g. Bangkok)" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm" />
      <button type="submit"className="px-6 py-3 rounded-lg border-none bg-blue-600 text-white font-semibold cursor-pointer whitespace-nowrap"> Search Jobs</button>
      </form>
  </section>
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
            <div className="job-card">
              <div className="job-card-logo"></div>
              <div className="job-card-body">
                <h3>{showname}</h3>
                <p className="job-meta">Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)</p>
                <div className="job-tags">
                  <span className="tag">Full-time</span>
                  <span className="tag">$120k - $150k</span>
                  <span className="tag">Design Systems</span>
                </div>
              </div>
         
            </div>

            

            
          </div>
        </section>
      </div>

     
    </>
  )
}

export default Personnel