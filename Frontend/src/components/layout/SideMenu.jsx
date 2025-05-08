import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import ConfirmationModal from './ConfirmationModal';

import {
  LuLayoutDashboard,
  LuUsers,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

const SideMenu = ({ activeMenu }) => {

  const { user, clearUser } = useContext(UserContext);

  const [sideManuData, setSideManuData] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      setShowLogoutModal(true);
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideManuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => { };
  }, [user]);

  return (
    <>
      <div className='w-64 h-[calc(100vh)] bg-gray-200 border-r border-gray-200/50 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify-center mb-7 pt-5'>
          <div className='relative'>
            <img
              src={user?.profileImageUrl || ""}
              alt="profileImage"
              className='w-20 h-20 bg-slate-400 rounded-full'
            />
          </div>

          {user?.role === "admin" && (
            <div className='text-[10px] font-medium text-white bg-blue-600 px-3 py-0.5 rounded mt-1'>
              Admin
            </div>
          )}

          <h5 className='text-gray-950 font-medium leading-6 mt-3'>
            {user?.name || ""}
          </h5>

          <p className='text-[12px] text-gray-500'>
            {user?.email || ""}
          </p>
        </div>

        {sideManuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] 
              ${activeMenu === item.label
                ? "bg-blue-600 text-white"
                : ""
              } py-3 px-6 mb-3 cursor-pointer hover:bg-gray-500 hover:text-white transition-colors`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="" />
            {item.label}
          </button>
        ))}
      </div>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
      />
    </>
  );
};

export default SideMenu;