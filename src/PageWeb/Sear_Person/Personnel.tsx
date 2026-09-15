import { useState, useEffect } from 'react'
import './Personnel.css'

function Personnel() {

  const [headername, setHeadername] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        setHeadername(data)
      })
  }, [])

  return (
    <>
      {/* Search Header */}
      <div className="jobs-header-wrapper">
        <section className="pt-10 pb-6">
          <form className="flex gap-3">
            <input type="text" placeholder="Job title or keywords" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm"/>
            <input type="text" placeholder="Location (e.g. Bangkok)" className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm" />
            <button type="submit" className="px-6 py-3 rounded-lg border-none bg-blue-600 text-white font-semibold cursor-pointer whitespace-nowrap"> Search Jobs</button>
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

          {/* User */}
          {headername.map((item) => (
            <div key={item.id} className="flex-1 bg-blue-600">
              <div className="flex gap-4 bg-white rounded-xl border border-gray-200  h-[9rem]">
                <div className="w-20 h-20 rounded-lg bg-gray-200 absolute top-33 left-80 "></div>

                <div className="flex-1">
                  <h3 className="text-[20px] mb-1  absolute top-33 left-105">{item.Name}</h3>
                  <p className="text-[13px] text-gray-500  absolute top-42 left-105">
                    Compass Corp &nbsp;•&nbsp; Bangkok (Remote friendly)
                  </p>
                  <div className="flex gap-5 flex-wrap absolute left-105 top-57">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      Full-time
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      $120k - $150k
                    </span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                      Design Systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

    </>
  )
}

export default Personnel