import React, { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import CommonModal from "./CommonModal";
import { Input, Select, Spin } from "antd";
import { getTeamMembers, getUserLists, inviteUser } from "../../../api/partner-apis";
import { toast } from "react-toastify";
import CommonLoader from "./CommonLoader";


const PartnerUsers = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);


  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [therapist, setTherapist] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);


  const handleCloseAddUser = () => setIsAddUserOpen(false);
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
      toast.error(error?.response?.data?.detail || "Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const response = await getUserLists();
      setUsers(response);

      if (response.results.length > 0) {
        // const completed = response.results.filter(
        //   (user) => user.status.toLowerCase() === "completed"
        // ).length;
        // const incomplete = response.count - completed;

        // setCompletedCount(completed);
        // setIncompleteCount(incomplete);

        // const assessmentChartData = calculateAssessmentData(response.results);
        // setAssessmentData(assessmentChartData);

        // const domainChartData = calculateDomainData(response.results);
        // setDomainData(domainChartData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  }, []);



  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
    async function a() {
      const response = await getUserLists();
      setUsers(response);
    }
    a();
    fetchUsers();
  }, [fetchTeamMembers, fetchUsers]);




  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };



  return (
    <div className="flex flex-col w-full h-full px-3 pt-6 md:px-0 font-quicksand">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[14px] md:text-2xl font-normal text-gray-700">
          Users
        </span>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center gap-1 text-white font-normal text-[16px] px-1 py-1 rounded-[50%] bg-[#4F7DDD]"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Plus size={18} />
          </button>
          <p
            className="text-[14px] md:text-[16px] font-semibold text-[#4F7DDD] cursor-pointer"
            onClick={() => setIsAddUserOpen(true)}
          >
            Add Users
          </p>
        </div>
      </div>



      {inviteLoading ? (
        <div className="flex items-center justify-center w-full h-[60vh]">
          <Spin size="large" />
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-500 text-base">
          No team member, please add by clicking on add team member button
        </div>
      ) : (
        <>
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
          {/* desktop */}
          <div className="hidden md:block border border-gray-300 rounded-[8px] bg-white p-0">
            <div className="overflow-x-auto px-4 pb-1">
              <table className="min-w-full">
                <thead className="text-base">
                  <tr className="text-gray-600 bg-white">
                    <th className="px-3 py-2 text-left font-normal">
                      User Name
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Assigned Therapist
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Assessment
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Date
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  {usersLoading ? (
                    <tr>
                      <td colSpan="5" className="px-3 py-2 text-center">
                        <CommonLoader loading={true} />
                      </td>
                    </tr>
                  ) : (
                    users?.results?.map((u, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {u?.user_name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {u?.partner_name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap max-w-[160px] truncate">
                          {u?.assessment_type}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {formatDate(u?.created_date)}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="font-normal">{u?.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <CommonModal
        open={isAddUserOpen}
        onCancel={handleCloseAddUser}
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
                ? "bg-[#4F7DDDBF] cursor-not-allowed" : ""}`}
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

export default PartnerUsers;
