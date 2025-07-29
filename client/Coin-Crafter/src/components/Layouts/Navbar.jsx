// src/components/layouts/Navbar.js

import React, { useState, useEffect, useRef, useContext } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { LuUser, LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import CharAvatar from '../Cards/CharAvatar';

const Navbar = ({ onMenuButtonClick }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user } = useContext(UserContext);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm h-[65px] px-4 sm:px-6">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button onClick={onMenuButtonClick} className="lg:hidden text-gray-600 hover:text-indigo-600">
          <HiOutlineMenu className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold text-indigo-700 tracking-wide hidden sm:block">
          WealthWise
        </h2>
      </div>

      {/* --- Profile Dropdown --- */}
      <div className="relative" ref={profileMenuRef}>
        <button
          onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center gap-2 text-left rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <CharAvatar fullName={user?.fullName || ""} width="w-9" height="h-9" />
          )}
           <div className="hidden md:block">
             <p className="text-sm font-semibold text-gray-800">{user?.fullName}</p>
             <p className="text-xs text-gray-500">View Profile</p>
           </div>
        </button>

        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 py-2 border border-gray-100">
            <Link
              to="/profile"
              onClick={() => setProfileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LuUser />
              <span>Edit Profile</span>
            </Link>
            {/* You can add more dropdown items here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;