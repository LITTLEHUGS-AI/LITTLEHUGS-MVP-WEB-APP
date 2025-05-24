import React from "react";
import Sidebar from "./dashboardComponents/Sidebar";
import Main from "./dashboardComponents/Main";

const PersonalDashboard = () => {

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar />

        {/* Main Content and Right Sidebar Container */}
        <div className="flex flex-col lg:flex-row flex-1 w-full">
          {/* Main Content */}
          <div className="flex-1 h-screen">
            <Main />
          </div>

        </div>
      </div>
    </>
  );
};

export default PersonalDashboard;
