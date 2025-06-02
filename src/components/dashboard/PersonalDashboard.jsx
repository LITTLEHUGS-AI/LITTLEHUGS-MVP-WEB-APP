import React, { useState } from "react";
import Sidebar from "./dashboardComponents/Sidebar";
import Main from "./dashboardComponents/Main";

const PersonalDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />

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
