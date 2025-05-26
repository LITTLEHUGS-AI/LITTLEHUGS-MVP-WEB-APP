import React, { useState, useEffect, useCallback, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CommonModal from "./CommonModal";
import { Input, Select, Spin } from "antd";
import {
  getTeamMembers,
  inviteUser,
  getUserLists,
  getUniqueUsers,
  getUniqueEmails,
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
  const [uniqueUsers, setUniqueUsers] = useState([]);
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
        email: member.email
      }));
      setTeamMembers(options);
      setUniqueUsers(getUniqueEmails(response));
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

  const fetchUniqueUsers = useCallback(async () => {
    try {
      // setUsersLoading(true);
      const response = await getUniqueUsers();
      // setUniqueUsers(getUniqueEmails(response));
      console.log(uniqueUsers);

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
  }, [calculateAssessmentData, calculateDomainData, uniqueUsers]);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchTeamMembers();
      fetchUsers();
      fetchUniqueUsers();
      initialFetchDone.current = true;
    }
  }, [fetchTeamMembers, fetchUsers, fetchUniqueUsers]);

  const handleInviteUser = async () => {
    if (!userName.trim() || !email.trim() || !therapist) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setInviteLoading(true);
      await inviteUser({
        name: userName,
        email: email,
        therapist: therapist,
      });

      toast.success("User invited successfully!");
      setIsAddUserOpen(false);
      setUserName("");
      setEmail("");
      setTherapist("");
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
        "Failed to invite user. Please try again."
      );
    } finally {
      setInviteLoading(false);
    }
  };




  // useEffect(() => {
  //   const a = getUserAssessmentCounts(users.results);
  //   setCompletedUsers(a.completed);
  //   setInCompleteUsers(a.notCompleted);
  // }, [users])


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
              <div className="flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-4 w-full">
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

                <div className="flex flex-col lg:flex-row border border-gray-300 rounded-2xl p-4 sm:p-6 gap-4">
                  <div className="flex flex-col gap-3 w-full">
                    <span className="text-lg sm:text-xl text-gray-700 font-normal">
                      Completed Assessments
                    </span>

                    <div className="flex flex-row items-center gap-4 sm:gap-6 overflow-scroll">
                      <div className="relative w-[120px] h-[120px]">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 200 200"
                          className="transform -rotate-90"
                        >
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#DDBEBE"
                            strokeWidth="20"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="#D3D3A5"
                            strokeWidth="20"
                            strokeDasharray="125.66 376.99"
                            strokeDashoffset="0"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {uniqueUsers.length}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 text-center">
                            <div>Unique</div>
                            <div>Users</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#D3D3A5] flex items-center justify-center text-gray-700 font-medium text-sm">
                            {completedCount}
                          </div>
                          <span className="text-gray-700 text-sm leading-tight">
                            Users who completed 1<br />assessment
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#DDBEBE] flex items-center justify-center text-gray-700 font-medium text-sm">
                            {incompleteCount}
                          </div>
                          <span className="text-gray-700 text-sm leading-tight">
                            Users who did not<br />complete 1 assessment
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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

      {/* Add User Modal */}
      <CommonModal
        open={isAddUserOpen}
        // onCancel={handleCloseAddUser}
        title={
          <div className="w-full text-center font-semibold text-lg">
            Add User
          </div>
        }
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 text-gray-700 text-sm">User Name</label>
              <Input
                placeholder="* User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-[2.5rem]"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 text-gray-700 text-sm">Email ID</label>
              <Input
                placeholder="* Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[2.5rem]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 text-gray-700 text-sm">
                Assigned Therapist
              </label>
              <Select
                showSearch
                placeholder="* Assigned Therapist"
                value={therapist}
                onChange={setTherapist}
                options={teamMembers}
                loading={loading}
                className="h-[2.5rem]"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <CommonLoader
              loading={inviteLoading}
              disabled={!userName.trim() || !email.trim() || !therapist}
              onClick={handleInviteUser}
              className={`bg-[#4F7DDD] text-white font-semibold px-8 py-5 rounded text-base font-quicksand ${!userName.trim() || !email.trim() || !therapist
                ? "bg-[#4F7DDDBF] cursor-not-allowed"
                : ""
                }`}
              type="primary"
            >
              {inviteLoading ? "Inviting..." : "Invite User"}
            </CommonLoader>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default PartnerDashboard;