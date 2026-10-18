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
          {/* User  */}
          <div className="jobs-list">
            {items.map((item, index) => (
              <div className="job-card" key={index}>
                
                <div className="job-card-body">
                  <Link to={`/Personnel/ShowCv/${item.public_id}`}><h3>{item?.jobName}</h3></Link>

                  <p className="job-meta">Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)</p>
                  <div className="job-tags">
                    <span className="tag">{item.jobLocation}</span>
                    <span className="tag">{item.salary}</span>
                    <span className="tag">{item.jobSkill}</span>
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