import React, { useState } from "react";
import PartnerSidebar from "./dashboardComponents/PartnerSidebar";
import PartnerDashboard from "./dashboardComponents/PartnerDashboard";
import PartnerHeader from "./dashboardComponents/PartnerHeader";
import PartnerTeamMember from "./dashboardComponents/PartnerTeamMember";
import PartnerFirmSetting from "./dashboardComponents/PartnerFirmSetting";
import { Menu } from "lucide-react";
import { Drawer } from "antd";
import { PartnerProvider } from "../../lib/PartnerContext";

const PartnerDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState(null);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleTabChange = (tab, subTab) => {
    setActiveTab(tab);
    setActiveSubTab(subTab);
    onClose(); // Close drawer on tab select
  };

  let MainContent = null;
  if (activeTab === "dashboard") {
    MainContent = <PartnerDashboard />;
  } else if (activeTab === "settings" && activeSubTab === "team") {
    MainContent = <PartnerTeamMember />;
  } else if (activeTab === "settings" && activeSubTab === "firm") {
    MainContent = <PartnerFirmSetting />;
  }

  return (
    <PartnerProvider>
      <div className="w-full flex flex-col items-center bg-white font-quicksand min-h-screen">
        {/* Mobile Sidebar */}
        <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-white shadow flex items-center justify-between px-3 z-50">
          <button
            onClick={showDrawer}
            className="bg-transparent p-2"
            aria-label="Open sidebar menu"
          >
            <Menu size={28} />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.jpg"
              alt="LittleHugs"
              className="h-7 w-auto"
            />
            <span className="text-xl font-bold text-[#4F7DDD] font-quicksand">
              LittleHugs
            </span>
          </div>
        </div>

        <div className="w-full flex flex-row pt-14 md:pt-0">
          {/* Desktop Sidebar */}
          <div className="hidden md:flex md:h-screen bg-white min-w-[250px] max-w-xs w-64 flex-shrink-0 flex-col border border-gray-300 rounded-[10px] mx-2 my-4">
            <PartnerSidebar onTabChange={handleTabChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-stretch px-2 py-4">
            <PartnerHeader />
            <div className="bg-white w-full h-full flex flex-col p-0">
              {MainContent}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Sidebar */}
        <Drawer
          placement="left"
          width={280}
          onClose={onClose}
          open={open}
          closable={false}
          headerStyle={{ display: "none" }}
          bodyStyle={{ padding: 0 }}
        >
          <PartnerSidebar onTabChange={handleTabChange} />
        </Drawer>
      </div>
    </PartnerProvider>
  );
};

export default PartnerDashboardLayout;
