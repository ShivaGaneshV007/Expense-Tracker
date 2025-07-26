import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggleable sidebar
  const sidebarRef = useRef(null);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".toggle-sidebar-btn") // add this class to the toggle button
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full m-0 p-0">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
        <Navbar activeMenu={activeMenu} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      <div className="flex pt-16 min-h-screen w-full relative">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={`bg-white border-r border-gray-200 m-0 p-0 transition-all duration-300
            fixed md:static top-16 left-0 h-[calc(100vh-4rem)] z-40 w-64 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <SideMenu activeMenu={activeMenu} />
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6 overflow-visible w-full md:ml-64">
          {user ? (
            children
          ) : (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] text-gray-600 text-lg">
              Please login to access the dashboard.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
