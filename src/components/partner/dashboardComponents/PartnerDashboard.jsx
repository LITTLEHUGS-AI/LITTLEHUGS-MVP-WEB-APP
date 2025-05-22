import React, { useState, useEffect, useCallback, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Plus } from "lucide-react";
import CommonModal from "./CommonModal";
import { Input, Select, Spin } from "antd";
import {
  getTeamMembers,
  inviteUser,
  getUserLists,
} from "../../../api/partner-apis";
import { toast } from "react-toastify";
import CommonLoader from "./CommonLoader";

const PartnerDashboard = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [therapist, setTherapist] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const initialFetchDone = useRef(false);
  const [assessmentData, setAssessmentData] = useState([
    { name: "women-wellness-360", value: 0, color: "#A5B4FC" },
    { name: "child-wellness-360", value: 0, color: "#FDE68A" },
    { name: "sel-assessment-360", value: 0, color: "#FCA5A5" },
  ]);
  const [domainData, setDomainData] = useState([
    { name: "Emotional Well-being", value: 0, color: "#B1A4E7" },
    {
      name: "Social Support & Relationship Health",
      value: 0,
      color: "#D3CBA5",
    },
    { name: "Self-Care & Routine Habits", value: 0, color: "#D9E4FC" },
    { name: "Stress & Burnout Risk", value: 0, color: "#69A664" },
    { name: "Mental Clarity & Cognitive Load", value: 0, color: "#FFC655" },
  ]);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTeamMembers();
      const options = response.map((member) => ({
        label: member.name,
        value: member.name,
      }));
      setTeamMembers(options);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch team members"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateDomainData = useCallback((results) => {
    const domainStructure = [
      { name: "Emotional Well-being", value: 0, color: "#B1A4E7" },
      {
        name: "Social Support & Relationship Health",
        value: 0,
        color: "#D3CBA5",
      },
      { name: "Self-Care & Routine Habits", value: 0, color: "#D9E4FC" },
      { name: "Stress & Burnout Risk", value: 0, color: "#69A664" },
      { name: "Mental Clarity & Cognitive Load", value: 0, color: "#FFC655" },
    ];

    return domainStructure.map((domain) => {
      const count = results.filter((user) =>
        user.domains.includes(domain.name)
      ).length;
      return {
        ...domain,
        value: count,
      };
    });
  }, []);

  const calculateAssessmentData = useCallback((results) => {
    const assessmentStructure = [
      { name: "women-wellness-360", value: 0, color: "#A5B4FC" },
      { name: "child-wellness-360", value: 0, color: "#FDE68A" },
      { name: "sel-assessment-360", value: 0, color: "#FCA5A5" },
    ];

    return assessmentStructure.map((assessment) => {
      const count = results.filter(
        (user) => user.assessment_type === assessment.name
      ).length;
      return {
        ...assessment,
        value: count,
      };
    });
  }, []);


  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const response = await getUserLists();
      setUsers(response);

      if (response.results.length > 0) {
        const completed = response.results.filter(
          (user) => user.status.toLowerCase() === "completed"
        ).length;
        const incomplete = response.count - completed;

        setCompletedCount(completed);
        setIncompleteCount(incomplete);

        const assessmentChartData = calculateAssessmentData(response.results);
        setAssessmentData(assessmentChartData);

        const domainChartData = calculateDomainData(response.results);
        setDomainData(domainChartData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  }, [calculateAssessmentData, calculateDomainData]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchTeamMembers();
      fetchUsers();
      initialFetchDone.current = true;
    }
  }, [fetchTeamMembers, fetchUsers]);

  const handleOpenAddUser = () => setIsAddUserOpen(true);
 
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatNumber = (num) => {
    if (num === 0) return "0";
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-2 font-quicksand px-2 md:px-0">
      {usersLoading ? (
        <div className="flex items-center justify-center w-full h-[60vh]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4">
            <div className="col-span-4 flex flex-col gap-3">
              {/* Mobile Title */}
              <span className="block md:hidden text-[16px] font-normal text-gray-700 mb-2 ml-1">
                Dashboard
              </span>


              {/* Stat Cards */}
              <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4 w-full">
                {/* mobile */}
                <div className="border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-[#4F7DDD] w-full">
                  <span className="text-base md:text-xl text-white font-normal mb-1">
                    Total Assessments
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {formatNumber(users?.count || 0)}
                  </span>
                </div>

                {/* Bottom mobile */}
                <div className="flex flex-row gap-3 w-full md:hidden">
                  <div className="flex-1 border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-white">
                    <span className="text-base text-gray-700 font-normal mb-1">
                      Completed
                    </span>
                    <span className="text-4xl font-bold text-[#4A4B4F]">
                      {formatNumber(completedCount)}
                    </span>
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-white">
                    <span className="text-base text-gray-700 font-normal mb-1">
                      Incomplete
                    </span>
                    <span className="text-4xl font-bold text-[#4A4B4F]">
                      {formatNumber(incompleteCount)}
                    </span>
                  </div>
                </div>
                {/* Desktop */}
                <div className="hidden md:flex border border-gray-300 rounded-[16px] p-4 flex-col items-start bg-white w-full md:w-auto">
                  <span className="text-xl text-gray-700 font-normal mb-1">
                    Completed Assessments
                  </span>
                  <span className="text-5xl font-bold text-[#4A4B4F]">
                    {formatNumber(completedCount)}
                  </span>
                </div>
                <div className="hidden md:flex border border-gray-300 rounded-[16px] p-4 flex-col items-start bg-white w-full md:w-auto">
                  <span className="text-xl text-gray-700 font-normal mb-1">
                    Incomplete Assessments
                  </span>
                  <span className="text-5xl font-bold text-[#4A4B4F]">
                    {formatNumber(incompleteCount)}
                  </span>
                </div>
              </div>


              <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4 w-full">
                {/* mobile */}
                <div className="border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-[#4F7DDD] w-full">
                  <span className="text-base md:text-xl text-white font-normal mb-1">
                    Unique Users
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-white">
                    {formatNumber(users?.count || 0)}
                  </span>
                </div>
                {/* Bottom mobile */}
                <div className="flex flex-row gap-3 w-full md:hidden">
                  <div className="flex-1 border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-white">
                    <span className="text-base text-gray-700 font-normal mb-1">
                      Users Completed Atleat 1 Assessment
                    </span>
                    <span className="text-4xl font-bold text-[#4A4B4F]">
                      3
                    </span>
                  </div>
                  <div className="flex-1 border border-gray-300 rounded-[16px] p-4 flex flex-col items-start bg-white">
                    <span className="text-base text-gray-700 font-normal mb-1">
                      User has not completed Atleast 1 Assessment
                    </span>
                    <span className="text-4xl font-bold text-[#4A4B4F]">
                      0
                    </span>
                  </div>
                </div>
                {/* Desktop */}
                <div className="hidden md:flex border border-gray-300 rounded-[16px] p-4 flex-col items-start bg-white w-full md:w-auto">
                  <span className="text-xl text-gray-700 font-normal mb-1">
                    Users Completed Atleast 1 Assessment
                  </span>
                  <span className="text-5xl font-bold text-[#4A4B4F]">
                    3
                  </span>
                </div>
                <div className="hidden md:flex border border-gray-300 rounded-[16px] p-4 flex-col items-start bg-white w-full md:w-auto">
                  <span className="text-xl text-gray-700 font-normal mb-1">
                    Users did not Completed Atleat 1 Assessment
                  </span>
                  <span className="text-5xl font-bold text-[#4A4B4F]">
                    0
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center px-2 md:px-4 p-1">
                <span className="font-normal text-[16px] md:text-2xl text-gray-700">
                  Users
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="flex items-center gap-1 text-white font-normal text-base px-1 py-1 rounded-[50%] bg-[#4F7DDD]"
                    onClick={handleOpenAddUser}
                  >
                    <Plus size={16} />
                  </button>
                  <p
                    className="text-base font-semibold text-[#4F7DDD] cursor-pointer"
                    onClick={handleOpenAddUser}
                  >
                    Add User
                  </p>
                </div>
              </div>
              {/* mobile */}
              <div className="flex flex-col gap-3 md:hidden">
                {users?.results?.map((u, i) => (
                  <div
                    key={i}
                    className="border border-gray-300 rounded-[12px] bg-white p-3 flex flex-col gap-1"
                  >
                    <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                      <span>User Name</span>
                      <span>{u?.user_name}</span>
                    </div>
                    <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                      <span>Assigned therapist</span>
                      <span>{u?.partner_name}</span>
                    </div>
                    <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                      <span>Assessment</span>
                      <span className="max-w-[120px] truncate">
                        {u?.assessment_type}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                      <span>Date</span>
                      <span>{formatDate(u?.created_date)}</span>
                    </div>
                    <div className="flex flex-row justify-between text-xs text-gray-500">
                      <span>Status</span>
                      <span>{u?.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            
            </div>
          </div>

          {/* Charts below both main and insight cards */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-8">
            {/* Assessments Chart */}
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[16px] md:text-[28px] font-normal text-gray-700 mb-1 ml-2">
                Assessments
              </span>
              <div className="border border-gray-300 rounded-[16px] bg-white p-6 flex flex-col h-[13.5rem] w-full">
                <div className="flex flex-row items-center h-full">
                  <div className="w-[60%] flex items-center justify-center">
                    <PieChart width={180} height={180}>
                      <Pie
                        data={assessmentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={3}
                      >
                        {assessmentData.map((entry, idx) => (
                          <Cell key={`cell2-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="w-[40%] flex flex-col justify-center gap-2">
                    {assessmentData.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs md:text-base text-gray-600"
                      >
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ background: d.color }}
                        ></span>
                        {d.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Domains Chart */}
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[16px] md:text-[28px] font-normal text-gray-700 mb-1 ml-2">
                Domains
              </span>
              <div className="border border-gray-300 rounded-[16px] bg-white p-6 flex flex-col h-[13.5rem] w-full">
                <div className="flex flex-row items-center h-full">
                  <div className="w-[60%] flex items-center justify-center">
                    <PieChart width={180} height={180}>
                      <Pie
                        data={domainData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={3}
                      >
                        {domainData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="w-[40%] flex flex-col justify-center gap-2">
                    {domainData.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs md:text-[0.95rem] text-gray-600"
                      >
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ background: d.color }}
                        ></span>
                        {d.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

 
    </div>
  );
};

export default PartnerDashboard;
