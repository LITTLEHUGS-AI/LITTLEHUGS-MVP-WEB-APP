import {
  LogOut,
  LayoutDashboard,
  IndianRupee,
  ChartColumnIncreasing,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {

  const handleLogout = async () => {
    localStorage.clear('accessToken');
    localStorage.clear('userType');
  }
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

          <NavLink
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
          </NavLink>

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

      {/* General Options */}
      <div className="p-4 mt-8">
        <p className="text-xs font-medium text-gray-500 mb-4">GENERAL</p>
        <div className="space-y-2">
          <Link to="/signin" onClick={handleLogout} className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded">
            <LogOut size={20} />
            <span className="ml-3 font-semibold">Logout</span>
          </Link>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
