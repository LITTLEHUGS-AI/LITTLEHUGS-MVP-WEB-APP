import React from 'react'
import { useState } from "react";
import Sidebar from "./dashboardComponents/Sidebar";
import Main from "./dashboardComponents/Main";
import RightHandSide from "./dashboardComponents/RightHandSide";
import { Menu } from "lucide-react";
import { Button, Drawer } from "antd";


const PersonalDashboard = () => {
    const [username, setUsername] = useState("Sethulakshmi");
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
  return (
    <>
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-gray-50">
      {/* Header for mobile */}
      <div className="lg:hidden grid grid-cols-2 items-center justify-between w-full">
        <div className="justify-self-start">
          <Menu size={30} className="ms-3 cp" onClick={showDrawer} />
        </div>
        <div className="flex items-center p-4 border-gray-200 justify-self-end">
          {/* <img src={logo} alt="" /> */}
          <img src="/images/logo.jpg" alt="" />
          <span className="ml-2 text-xl font-semibold text-blue-600">
            LittleHugs
          </span>
        </div>
      </div>

      {/* Left Sidebar - hidden on mobile */}
      <div className="w-64 border-r border-gray-200 bg-white h-screen hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content and Right Sidebar Container */}
      <div className="flex flex-col lg:flex-row flex-1 w-full">
        {/* Main Content */}
        <div className="flex-1 overflow-auto h-screen scrollbar-thin">
          <Main />
        </div>

        {/* Right Sidebar - full width on mobile, side column on desktop */}
        <div className="w-full mt-5 lg:mt-0 lg:w-72 border-t lg:border-l lg:border-t-0 border-gray-200 p-4 overflow-auto scrollbar-thin">
          <RightHandSide />
        </div>
      </div>
    </div>
    <Drawer
      // title="Basic Drawer"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      placement={"left"}
      width={300}
      open={open}
      title={null}
      headerStyle={{ display: 'none' }}
    >
      <Sidebar />
    </Drawer>
  </>
  )
}

export default PersonalDashboard
