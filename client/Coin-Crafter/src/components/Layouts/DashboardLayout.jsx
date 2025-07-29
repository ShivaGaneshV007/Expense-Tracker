// src/components/layouts/DashboardLayout.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import LogoutModal from '../Modals/LogoutModal.jsx';

const DashboardLayout = ({ children, activeMenu }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
    setLogoutModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- Desktop Sidebar (Fixed) --- */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
        <SideMenu 
          activeMenu={activeMenu} 
          onLogoutClick={() => setLogoutModalOpen(true)} 
        />
      </div>

      {/* --- Mobile Sidebar (Overlay) --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative z-10 w-64">
            <SideMenu 
              activeMenu={activeMenu} 
              onLogoutClick={() => {
                setMobileMenuOpen(false);
                setLogoutModalOpen(true);
              }} 
            />
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          onMenuButtonClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
      
      {/* --- Logout Confirmation Modal --- */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default DashboardLayout;