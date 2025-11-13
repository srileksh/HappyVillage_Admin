// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Nav from '../component/Nav'
// import SideBar from '../page/SideBar'

// function MainLayout() {
//   return (
//     <div>
//       <Nav/>

//       <Outlet/>

//     </div>
//   )
// }

// export default MainLayout

import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import toast from "react-hot-toast";

function MainLayout() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // ✅ Protect all outlet routes
  if (!isLoggedIn) {
    toast.error("Please login to continue!");
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Nav />

        {/* Protected child routes */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
