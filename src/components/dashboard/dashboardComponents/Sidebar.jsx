import React from "react";
import {
  BarChart3,
  Settings,
  LogOut,
  Download,
  Share2,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  IndianRupee,
  ChartColumnIncreasing,
} from "lucide-react";

const Sidebar = () => {
  return (
    <>
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <img src="/images/logo.jpg" alt="" />
          <span className="ml-2 text-xl font-semibold text-blue-600">
            LittleHugs
          </span>
        </div>

        {/* Menu Categories */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-500 mb-4">MENU</p>
          <div className="space-y-2">
            <div className="flex items-center p-2 bg-blue-100 text-blue-600 rounded">
              <LayoutDashboard size={20} />
              <span className="ml-3 font-semibold">Dashboard</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
              <IndianRupee size={20} />
              <span className="ml-3 font-semibold">Pricing</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
              <ChartColumnIncreasing size={20} />
              <span className="ml-3 font-semibold">Assessment</span>
            </div>
          </div>
        </div>

        {/* General Options */}
        <div className="p-4 mt-8">
          <p className="text-xs font-medium text-gray-500 mb-4">GENERAL</p>
          <div className="space-y-2">
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
              <Settings size={20} />
              <span className="ml-3 font-semibold">Settings</span>
            </div>
            <div className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
              <LogOut size={20} />
              <span className="ml-3 font-semibold">Logout</span>
            </div>
          </div>
        </div>

        {/* Download App Banner */}
        <div className="mx-4 mt-auto mb-8 bg-gray-800 rounded-lg p-4 text-white fixed bottom-0">
          <h3 className="font-semibold">Download Our Mobile App</h3>
          <p className="text-xs text-gray-300 mb-4">Lorem ipsum</p>
          <button className="bg-blue-500 text-white w-full py-2 rounded text-sm font-medium cp">
            Download
          </button>
        </div>
    </>
  );
};

export default Sidebar;
