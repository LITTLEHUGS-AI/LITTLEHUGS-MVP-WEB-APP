import React, { useState } from "react";
import Sidebar from "./dashboardComponents/Sidebar";
import Main from "./dashboardComponents/Main";
import { Menu, X } from "lucide-react";

const PersonalDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden grid grid-cols-2 items-center justify-between w-full p-4 bg-white border-b border-gray-200">
        <button onClick={toggleSidebar} className="justify-self-start">
          {sidebarOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
        <div className="flex items-center justify-self-end">
          <img src="/images/logo.jpg" alt="logo" className="h-8" />
          <span className="ml-2 text-xl font-semibold text-blue-600">
            LittleHugs
          </span>
        </div>
      </div>

      {/* Sidebar (mobile + desktop) */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:block
        `}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-full overflow-y-auto">
        <Main />
      </div>
    </div>
  );
};

export default PersonalDashboard;
