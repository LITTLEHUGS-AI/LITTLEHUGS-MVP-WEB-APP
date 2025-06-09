import {
  LogOut,
  LayoutDashboard,
  ChartColumnIncreasing,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import ProfileUi from "./ProfileUi";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    localStorage.clear('accessToken');
    localStorage.clear('userType');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="bg-white z-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b shadow-sm">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center">
          <img src="/images/logo.jpg" alt="Logo" className="h-8 w-8" />
          <span className="ml-2 text-lg font-semibold text-blue-600">
            LittleHugs
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed h-screen z-50 top-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block`}
      >
        {/* Logo */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img src="/images/logo.jpg" alt="Logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold text-blue-600">
              LittleHugs
            </span>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-500 mb-4">MENU</p>
          <div className="space-y-2">
            <NavLink
              to="/personal/dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <LayoutDashboard size={20} />
              <span className="ml-3 font-semibold">Dashboard</span>
            </NavLink>

            {/* <NavLink
              to="/personal/plans"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <IndianRupee size={20} />
              <span className="ml-3 font-semibold">Plans</span>
            </NavLink> */}

            <NavLink
              to="/personal/assessment"
              className={({ isActive }) =>
                `flex items-center p-2 rounded ${isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <ChartColumnIncreasing size={20} />
              <span className="ml-3 font-semibold">Assessment</span>
            </NavLink>
          </div>
        </div>

        <div className="fixed bottom-0 p-4 mt-auto">

          <div className="h-[200px] overflow-hidden mb-4">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/8fiETwzBW0o"
              title="Little Hugs Personal Program"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="md:hidden mb-3">
            <p className="text-xs font-medium text-gray-500 mb-1">PROFILE</p>
            <ProfileUi />
          </div>

          <p className="text-xs font-medium text-gray-500 mb-1">GENERAL</p>
          <div className="space-y-2">
            <Link
              to="/signin"
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <LogOut size={20} />
              <span className="ml-3 font-semibold">Logout</span>
            </Link>
          </div>

          {/* Download App Banner */}
          <div className="mt-2 bg-gray-800 rounded-lg p-4 text-white">
            <h3 className="font-semibold">Download Our Mobile App</h3>
            <p className="text-xs text-gray-300 mb-4">
              from Google Play Store
            </p>
            <button className="bg-blue-500 text-white w-full py-2 rounded text-sm font-medium">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
