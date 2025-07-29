// src/components/layouts/SideMenu.js

import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu, onLogoutClick }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-2 p-6 border-b border-gray-200">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName || ''}
            width="w-20"
            height="h-20"
            style="text-2xl"
          />
        )}
        <div className="text-center mt-2">
          <h5 className="font-semibold text-gray-900">{user?.fullName || 'User'}</h5>
          <p className="text-sm text-gray-500">Welcome Back</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {SIDE_MENU_DATA.map((item) => (
          item.label !== 'Logout' && (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`w-full flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all duration-200 text-sm font-medium 
                ${activeMenu === item.label
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          )
        ))}
      </nav>

      {/* Logout Button at the bottom */}
      <div className="px-4 py-4 border-t border-gray-200">
         {SIDE_MENU_DATA.map((item) => (
          item.label === 'Logout' && (
            <button
              key={item.label}
              onClick={onLogoutClick}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
           )
        ))}
      </div>
    </div>
  );
};

export default SideMenu;