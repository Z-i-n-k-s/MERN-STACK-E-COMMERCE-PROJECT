import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserLarge } from "react-icons/fa6";
import { Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import SideBar from '../components/SideBar'; // Import the updated SideBar component

const Adminpanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      {/* Sidebar Section */}
      <div className={`${sidebarOpen ? 'w-60' : 'w-16'} transition-all bg-white shadow-lg`}>
        <div className="h-32 flex justify-center items-center flex-col p-4">
          <div className="text-5xl cursor-pointer relative">
            {user?.profilePic ? (
              <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user?.name} />
            ) : (
              <FaUserLarge />
            )}
          </div>
          <p className="capitalize text-lg font-bold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content Section */}
      <main className={`flex-grow px-2 py-4 transition-all ${sidebarOpen ? 'ml-6 mr-6' : 'ml-6 mr-6'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Adminpanel;
