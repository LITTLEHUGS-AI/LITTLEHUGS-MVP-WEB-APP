import React, { useState } from "react";
import { Settings, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../api/partner-apis";
import { usePartner } from "../../../lib/PartnerContext";
import { Tooltip } from "antd";

const PartnerSidebar = ({ onTabChange }) => {


  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState(null);
  const { logo, clearLogo, userProfile } = usePartner();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "settings") {
      setSettingsOpen(true);
      setActiveSubTab("users");
      onTabChange && onTabChange("settings", "users");
    } else {
      setSettingsOpen(false);
      setActiveSubTab(null);
      onTabChange && onTabChange(tab, null);
    }
  };

  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    onTabChange && onTabChange("settings", subTab);
  };

  const handleLogout = async () => {
    console.log("logout--------");
    try {
      const response = await logout();
      console.log("response------------", response);
      if (response) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("orgLogo");
        localStorage.clear('userType');
        localStorage.removeItem("teamMembers");
        clearLogo();
        toast.success("Logged out successfully");
        navigate("/signin");
      } else {
        toast.error(response?.message || "Failed to logout. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to logout. Please try again.";
      toast.error(errorMessage);
    }
    finally {
      localStorage.clear();
      navigate("/signin");
    }
  };

  const truncateEmail = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength - 3) + "...";
    }
    return str;
  };

  return (
    <aside className="flex flex-col h-screen bg-white w-full font-quicksand">
      <div className="h-[10%] flex items-center justify-center px-6 py-4 border-b border-gray-300">
        {logo !== null ? (
          <img
            src={logo}
            alt="Logo"
            className="max-w-full max-h-full object-contain rounded-full"
          />
        ) : (
          <svg width="32" height="32" fill="#979FA8" viewBox="0 0 24 24">
            <path d="M12 16a1 1 0 0 1-1-1V9.83l-1.59 1.58a1 1 0 1 1-1.41-1.41l3.3-3.29a1 1 0 0 1 1.41 0l3.3 3.29a1 1 0 1 1-1.41 1.41L13 9.83V15a1 1 0 0 1-1 1ZM5 20a1 1 0 0 1-1-1v-2a7 7 0 0 1 14 0v2a1 1 0 0 1-1 1Zm1-2v1h12v-1a5 5 0 0 0-10 0Z" />
          </svg>
        )}
      </div>

      <nav className="h-[80%] flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => handleTabClick("dashboard")}
          className={`group flex items-center px-4 py-2 font-normal text-base transition-colors relative w-full text-left bg-white ${activeTab === "dashboard"
            ? "text-[#4F7DDD] font-semibold"
            : "text-gray-700"
            }`}
        >
          {activeTab === "dashboard" && (
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#4F7DDD] rounded-r-full" />
          )}
          <LayoutDashboard size={22} className="mr-3 z-10" />
          <span className="z-10">Dashboard</span>
        </button>

        <div className="relative">
          <button
            onClick={() => handleTabClick("settings")}
            className={`group flex items-center px-4 py-2 font-normal text-base transition-colors relative w-full text-left bg-white ${activeTab === "settings"
              ? "text-[#4F7DDD] font-semibold"
              : "text-gray-700"
              }`}
          >
            {activeTab === "settings" && (
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#4F7DDD] rounded-r-full" />
            )}
            <Settings size={20} className="mr-3 z-10" />
            <span className="z-10">Settings</span>
          </button>

          {activeTab === "settings" && settingsOpen && (
            <div className="flex flex-col ml-10 mt-1 space-y-1">
              {userProfile?.is_partner_admin === true &&
                <button
                  onClick={() => handleSubTabClick("team")}
                  className={`text-left text-base px-2 py-1 transition-colors w-full ${activeSubTab === "team"
                    ? "font-bold text-gray-800" : "font-normal text-gray-700"}`}
                >
                  Team member
                </button>
              } 
              <button
                onClick={() => handleSubTabClick("users")}
                className={`text-left text-base px-2 py-1 transition-colors w-full ${activeSubTab === "users"
                  ? "font-bold text-gray-800"
                  : "font-normal text-gray-700"
                  }`}
              >
                Users
              </button>
              {userProfile?.is_partner_admin === true &&
                <button
                  onClick={() => handleSubTabClick("firm")}
                  className={`text-left text-base px-2 py-1 transition-colors w-full ${activeSubTab === "firm"
                    ? "font-bold text-gray-800" : "font-normal text-gray-700"}`}
                >
                  Firm Setting
                </button>
              }
            </div>
          )}
        </div>
      </nav>

      <div className="mt-auto flex items-center gap-3 px-6 py-2 border-t border-gray-300">
        <img
          src={logo}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
        <div className="flex flex-col">
          <Tooltip title={userProfile?.email || "amitsingh@gm..."}>
            <span className="text-sm font-normal text-gray-900">
              {truncateEmail(userProfile?.email, 15) || "amitsingh@gm..."}
            </span>
          </Tooltip>
        </div>
        <LogOut
          className="ml-auto w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={handleLogout}
        />
      </div>
    </aside>
  );
};

export default PartnerSidebar;
