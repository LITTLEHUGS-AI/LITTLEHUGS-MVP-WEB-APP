import React, { useState } from "react";
import { Settings, LayoutDashboard, LogOut } from "lucide-react";

const PartnerSidebar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "settings") {
      setSettingsOpen(true);
      setActiveSubTab("team");
      onTabChange && onTabChange("settings", "team");
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

  return (
    <aside className="flex flex-col h-screen bg-white w-full font-quicksand">
      <div className="flex items-center justify-center px-6 py-4 border-b border-gray-300">
        <img
          src="/images/MDI-Logo.png"
          alt="MYDATA INSIGHTS"
          className="h-14 w-auto"
        />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={() => handleTabClick("dashboard")}
          className={`group flex items-center px-4 py-2 font-normal text-base transition-colors relative w-full text-left bg-white ${
            activeTab === "dashboard"
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
            className={`group flex items-center px-4 py-2 font-normal text-base transition-colors relative w-full text-left bg-white ${
              activeTab === "settings"
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
              <button
                onClick={() => handleSubTabClick("team")}
                className={`text-left text-base px-2 py-1 transition-colors w-full ${
                  activeSubTab === "team"
                    ? "font-bold text-gray-800"
                    : "font-normal text-gray-700"
                }`}
              >
                Team member
              </button>
              <button
                onClick={() => handleSubTabClick("firm")}
                className={`text-left text-base px-2 py-1 transition-colors w-full ${
                  activeSubTab === "firm"
                    ? "font-bold text-gray-800"
                    : "font-normal text-gray-700"
                }`}
              >
                Firm Setting
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="mt-auto flex items-center gap-3 px-6 py-2 border-t border-gray-300">
        <img
          src="/images/user.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
        <div className="flex flex-col">
          <span className="text-sm font-normal text-gray-900">
            amitsingh@gm...
          </span>
        </div>
        <LogOut className="ml-auto w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
      </div>
    </aside>
  );
};

export default PartnerSidebar;
