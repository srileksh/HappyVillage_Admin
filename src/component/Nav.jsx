import React, { useState, useRef, useEffect } from "react";
import { RiGovernmentLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.clear();
    navigate("/"); // redirect to login page
  };

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full px-4 sm:px-[50px] lg:px-[80px] xl:px-[100px] border-[#edeef1] border-b-2 py-[10px] relative bg-white">
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center gap-[5px] sm:gap-[10px]">
          <p className="text-[12px] sm:text-[25px] bg-[#4f46e5] text-white rounded-[10px] p-2">
            <RiGovernmentLine />
          </p>
          <p className="text-lg sm:text-2xl font-bold text-[#333]">Happy Village</p>
        </div>

        {/* Right side */}
        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-1 sm:gap-[8px] cursor-pointer select-none hover:bg-[#f4f5ff] ps-3 py-2 rounded-lg transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <p className="text-[18px] sm:text-[25px] text-[#4f46e5]">
              <VscAccount />
            </p>
            <h1 className="text-sm sm:text-base font-semibold text-[#333]">Admin User</h1>
            <FaAngleDown
              className={`transition-transform duration-200 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg sm:py-2 z-50 animate-fadeIn">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="block w-full text-left px-5 py-2.5 text-red-500 font-medium hover:bg-red-50 hover:text-red-600 transition"
              >
                <span className="flex items-center gap-2">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[350px] text-center animate-scaleIn">
            <h2 className="text-xl font-semibold mb-3 text-[#333]">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out from your account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#3e3bcc] transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
