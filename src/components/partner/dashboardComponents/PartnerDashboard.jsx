import React, { useState, useEffect, useCallback, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import CommonModal from "./CommonModal";
import { Input, Select, Spin } from "antd";
import {
  getTeamMembers,
  inviteUser,
  getUserLists,
  getUniqueUsers,
  analyzeAssessmentData,
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
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [completedAssesCount, setCompletedAssesCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [totalAssess, setTotalAssess] = useState(0);
  const initialFetchDone = useRef(false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [domainData, setDomainData] = useState([]);

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
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error(
        error?.response?.data?.detail || "Failed to fetch team members"
      );
    } finally {
      setLoading(false);
    }
  }, []);


  const calculateDomainData = useCallback((results) => {
    const colorPalette = [
      "#B1A4E7", "#D3CBA5", "#D9E4FC", "#69A664", "#FFC655",
      "#FF7F50", "#87CEFA", "#98FB98", "#FFD700", "#E9967A",
      "#20B2AA", "#FFB6C1", "#8A2BE2", "#00CED1", "#FF6347"
    ];

    const domainCounts = {};

    results.forEach(user => {
      user.domains.forEach(domain => {
        if (!domainCounts[domain]) {
          domainCounts[domain] = 0;
        }
        domainCounts[domain]++;
      });
    });

    const domainStructure = Object.entries(domainCounts)
      .map(([name, value], index) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((domain, index) => ({
        ...domain,
        color: colorPalette[index % colorPalette.length] // Assign colors
      }));

    return domainStructure;
  }, []);


  const calculateAssessmentData = useCallback((results) => {
    const assessmentStructure = [
      { name: "women-wellness-360", value: 0, color: "#A5B4FC" },
      { name: "child-wellness-360", value: 0, color: "#FDE68A" },
      { name: "sel-assessment-360", value: 0, color: "#FCA5A5" },
    ];

    return assessmentStructure
      .map((assessment) => {
        const count = results.filter(
          (user) => user.assessment_type === assessment.name
        ).length;
        return {
          ...assessment,
          value: count,
        };
      })
      .filter((assessment) => assessment.value !== 0);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const response = await getUserLists();
      setUsers(response);

      if (response.results.length > 0) {

        const assessmentChartData = calculateAssessmentData(response.results);
        setAssessmentData(assessmentChartData);

        const domainChartData = calculateDomainData(response.results);
        // debugger
        setDomainData(domainChartData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  }, [calculateAssessmentData, calculateDomainData]);

  const fetchUniqueUsers = useCallback(async () => {
    try {
      console.log(users);

      // setUsersLoading(true);
      const response = await getUniqueUsers();


      if (response.results.length > 0) {
        const { uniqueUsers, completedAtLeastOneAssessment, didNotCompleteAnyAssessment, totalCompletedAssessments, totalIncompleteAssessments } = analyzeAssessmentData(response.results);
        setUniqueUsers(uniqueUsers);
        setCompletedCount(completedAtLeastOneAssessment);
        setIncompleteCount(didNotCompleteAnyAssessment);
        setCompletedAssesCount(totalCompletedAssessments);
        completedAssesCount(totalIncompleteAssessments);
        setTotalAssess(response.results.length);

        const assessmentChartData = calculateAssessmentData(response.results);
        setAssessmentData(assessmentChartData);

        const domainChartData = calculateDomainData(response.results);
        setDomainData(domainChartData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  }, [calculateAssessmentData, calculateDomainData, completedAssesCount, users]);

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
          <span className="block md:hidden text-[16px] font-normal text-gray-700 mb-2 ml-1">
            Dashboard
          </span>
          <div className="grid grid-cols-2 gap-4">



            <div className="flex flex-col lg:flex-row border border-gray-300 rounded-2xl p-4 sm:p-6 gap-4">
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg sm:text-xl font-semibold text-gray-700 font-normal">
                  Assessments
                </span>

                <div className="flex flex-row items-center gap-4 sm:gap-6">
                  <div className="relative w-[160px] h-[160px]">
                    <svg
                      width="160"
                      height="160"
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
                        {formatNumber(totalAssess)}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center">
                        <div>Assessments</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D3D3A5] flex items-center justify-center text-gray-700 font-medium text-sm">
                        {formatNumber(completedAssesCount)}
                      </div>
                      <span className="text-gray-700 text-lg leading-tight">
                        Completed <br />Assessments
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#DDBEBE] flex items-center justify-center text-gray-700 font-medium text-sm">
                        {formatNumber(incompleteCount)}
                      </div>
                      <span className="text-gray-700 text-lg leading-tight">
                        Incomplete<br />Assessments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border border-gray-300 rounded-2xl p-4 sm:p-6 gap-4">
              <div className="flex flex-col gap-3 w-full">
                <span className="text-lg sm:text-xl font-semibold text-gray-700 font-normal">
                  Users
                </span>

                <div className="flex flex-row items-center gap-4 sm:gap-6">
                  <div className="relative w-[160px] h-[160px]">
                    <svg
                      width="160"
                      height="160"
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
                        {uniqueUsers}
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
                      <span className="text-gray-700 text-lg leading-tight">
                        Users who completed 1<br />assessment
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#DDBEBE] flex items-center justify-center text-gray-700 font-medium text-sm">
                        {incompleteCount}
                      </div>
                      <span className="text-gray-700 text-lg leading-tight">
                        Users who did not<br />complete 1 assessment
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Charts below both main and insight cards */}
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-8">
            {/* Assessments Chart */}

            {assessmentData.length < 1 ? <div>No Assessments taken yet</div> :
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
            }


            {/* Domains Chart */}
            {domainData.length < 1 ? <div>No Domains Generated yet</div> :
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
            }
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