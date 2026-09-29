import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './History.css'

function History() {

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
     

          {/* User  */}
        <div className="jobs-list">
  {items.map((item, index) => (
    <div className="job-card" key={index}>
      <div className="job-card-logo"></div>

      <div className="job-card-body">
        <Link to={`/Personnel/ShowCv/${item.Id}`}><h3>{item?.Name}</h3></Link>

        <p className="job-meta">Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)</p>

        <div className="job-tags">
          <span className="tag">Full-time</span>
          <span className="tag">$120k - $150k</span>
          <span className="tag">Design Systems</span>
        </div>
      </div>

      {/* ปุ่มด้านขวาสุด */}
      <div className="flex gap-2 ml-auto">
        <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"  > Edit</button>
        <button className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer" > Delete</button>
      </div>
    </div>
  ))}
</div>
        </section>
      </div>

     
    </>
  )
}

export default History