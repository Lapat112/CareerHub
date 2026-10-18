import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './History.css'

function History() {

  const [items, setItems] = useState([]);

  useEffect(() => {

    const userId = localStorage.getItem("Idonttallyou");

    if (userId) {
      console.log("i get id", userId)
    } else {
      console.log("don't get id");
      return;
    }

    fetch(`http://localhost:8000/History/users?Id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
  }, []);




  

  const handleDelete = async (item_id) => {
    const confirmDelete = window.confirm(
      "คุณต้องการลบรายการนี้ใช่หรือไม่?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/History/${item_id}`,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setItems((prevItems) =>
        prevItems.filter((item) => item.Id !== item_id)
      );

      alert("ลบรายการสำเร็จ");

    } catch (error) {
      console.error("Delete error:", error);
      alert("ลบรายการไม่สำเร็จ");
    }
  };


  return (
    <>
      <div className="jobs-header-wrapper">
      </div>
      <div className="jobs-main-wrapper">
        <section className="jobs-main">

          {/* User  */}
          <div className="jobs-list">
            {items.map((item, index) => (
              <div className="job-card" key={index}>


                <div className="job-card-body">
                  <Link to={`/Personnel/ShowCv/${item.Id}`}><h3>{item?.jobName}</h3></Link>

                  <p className="job-meta">Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)</p>

                  <div className="job-tags">
                    <span className="tag">{item.jobLocation}</span>
                    <span className="tag">{item.salary}</span>
                    <span className="tag">{item.jobSkill}</span>
                  </div>
                </div>

                {/* ปุ่มด้านขวาสุด */}
                <div className="flex gap-2 ml-auto">

                  <Link to={`/fixing/${item.Id}`}>
                    <button type="button" className=" w-15 h-30  rounded-md bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">Edit</button>
                  </Link>

                  <button className="w-15 h-30  rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer" onClick={() => handleDelete(item.Id)}>Delete</button>
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