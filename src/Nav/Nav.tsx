import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Nav.css";

function Navbar() {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);
  const [userFirstName, setUserFirstName] = useState<string | null>(
    localStorage.getItem("firstName")
  );

  const userMenuRef = useRef<HTMLDivElement>(null);

  // กดนอกโซน User → ปิดเมนู
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // อัปเดตชื่อเมื่อ login/logout
  useEffect(() => {
    const syncUser = () => {
      setUserFirstName(localStorage.getItem("firstName"));
    };

    window.addEventListener("auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // Profile
  const handleProfile = () => {
    setShowLogout(false);
    navigate("/Profile");
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    setShowLogout(false);
    navigate("/Homepage");
  };

  return (
    <header className="navbar">
      <div className="logo">CreerHub</div>

      <nav className="nav-links">
        <Link to="/Homepage">
          <button className="cursor-pointer">Home</button>
        </Link>

        <Link to="/Personnel"><button className="cursor-pointer"> Search for Personnel</button> </Link>

        <Link to="/Upload"><button className="cursor-pointer">Upload</button> </Link>
      </nav>

      <div className="nav-actions">
        {!userFirstName ? (
          <>
            <Link to="/Login" className="link-login">Log in</Link>

            <Link to="/Register" className="btn btn-primary">Sign Up</Link>
          </>
        ) : (
          <div ref={userMenuRef} className="relative">
            <button className="btn btn-primary cursor-pointer" onClick={() => setShowLogout(!showLogout)} >{userFirstName} </button>

            {showLogout && (
              <div className="absolute right-0 top-full mt-2 w-[120px] bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
               <Link to = {"/History"}> <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer" > History</button> </Link>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={handleLogout}> Logou</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;