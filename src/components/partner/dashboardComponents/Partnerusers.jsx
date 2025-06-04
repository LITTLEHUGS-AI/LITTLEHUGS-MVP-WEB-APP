import React, { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import CommonModal from "./CommonModal";
import { Input, Select, Spin } from "antd";
import { getLatestAssessmentsByUser, getUserMembers, getTeamMembers, inviteUser, deleteUserMembers } from "../../../api/partner-apis";
import { toast } from "react-toastify";
import { usePartner } from "../../../lib/PartnerContext";
import CommonLoader from "./CommonLoader";
import MultiSelectDropdown from "../../common/MultiSelectDropdown";


const PartnerUsers = () => {

  const { userProfile } = usePartner();

  const [email, setEmail] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [therapist, setTherapist] = useState("");
  const [program, setProgram] = useState([]);
  const [inviteLoading, setInviteLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);


  const handleCloseAddUser = () => setIsAddUserOpen(false);
  const handleInviteUser = async () => {
    if (!userName.trim() || !email.trim() || !(therapist || program)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setInviteLoading(true);
      if (userProfile?.partner_type === 'Therapy Center') {
        await inviteUser({
          name: userName,
          email: email,
          therapist: therapist,
          programme: program
        });
      } else {
        await inviteUser({
          name: userName,
          email: email,
          programme: program,
        });
      }

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
      setUsersLoading(true);
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
      setUsersLoading(false);
    }
  }, []);


  async function fetchUsers() {
    try{
      const response = await getUserMembers();
      const usersData = getLatestAssessmentsByUser(response.results);
      setUsers({ count: usersData.length, results: usersData });
    }catch(error){
      console.log(error);
    }
  }

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
    fetchUsers();
  }, [fetchTeamMembers]);



  async function deleteUser(user) {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    
    try {
      setInviteLoading(true)
      await deleteUserMembers(user.id);
      fetchUsers();
    }
    catch {
      toast.error('Failed to Delete User')
    }
    finally {
      setInviteLoading(false);
    }
  }



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
          No Users, please add by clicking on add Users button
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
                  <span>{u?.name}</span>
                </div>

                {userProfile?.partner_type === 'Therapy Center' &&
                  <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                    <span>Assigned Therapist</span>
                    <span></span>
                  </div>
                }

                <div className="flex flex-row justify-between text-xs text-gray-500 mb-1">
                  <span>Assigned Program</span>
                  <span></span>
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
                      Name
                    </th>

                    {userProfile?.partner_type === 'Therapy Center' &&
                      <th className="px-3 py-2 text-left font-normal">
                        Assigned Therapist
                      </th>}

                    <th className="px-3 py-2 text-left font-normal">
                      Assigned Program
                    </th>

                    <th className="px-3 py-2 text-left font-normal">
                      Latest Assessment
                    </th>

                     <th className="px-3 py-2 text-left font-normal">
                      Assessment Date
                    </th>

                    <th className="px-3 py-2 text-left font-normal">
                      Joined Date
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Onboarding Status
                    </th>
                    <th className="px-3 py-2 text-left font-normal">
                      Action
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
                      <tr className={`${i % 2 === 0 ? 'bg-gray-100' : ''}`} key={i}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {u?.name}
                        </td>

                        {userProfile.partner_type === 'Therapy Center' &&
                          <td className="px-3 py-2 whitespace-nowrap">
                            {u?.therapist}
                          </td>
                        }

                        <td className="px-3 py-2 whitespace-nowrap">
                          {u?.programme?.map((programme, index) => (
                            <React.Fragment key={index}>
                              {programme}
                              <br />
                            </React.Fragment>
                          ))}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap max-w-[160px] truncate">
                          {u?.latest_assessment?.assessment_name || ''}
                        </td>

                         <td className="px-3 py-2 whitespace-nowrap max-w-[160px] truncate">
                          {formatDate(u?.latest_assessment?.date) || ''}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          {formatDate(u?.date_joined)}
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="font-normal">{u?.status}</span>
                        </td>

                        <td className="px-3  py-2 whitespace-nowrap">
                          <button onClick={() => deleteUser(u)} className="p-2 bg-red-500 font-semibold text-white rounded-lg">Delete</button>
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

          {userProfile?.partner_type === 'Therapy Center' &&
            <div className="flex flex-col gap-4 md:flex-row md:gap-4">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="mb-1 text-gray-700 text-sm">
                  Assigne Therapist
                </label>
                <Select
                  showSearch
                  placeholder="* Assigne Therapist"
                  value={therapist}
                  onChange={setTherapist}
                  options={teamMembers}
                  loading={usersLoading}
                  className="h-[2.5rem]"
                />
              </div>
            </div>
          }

          <div className="flex flex-col gap-4 md:flex-row md:gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="mb-1 text-gray-700 text-sm">
                Assigne Program
              </label>
              <MultiSelectDropdown
                options={['Women Wellness 360', 'Child Wellness 360', 'SEL Assessment 360']}
                placeholder="Select fruits"
                onChange={setProgram}
                maxSelectable={2}
              />
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <CommonLoader
              loading={inviteLoading}
              disabled={!userName.trim() || !email.trim() || !(therapist || program)}
              onClick={handleInviteUser}
              className={`bg-[#4F7DDD] text-white font-semibold px-8 py-5 rounded text-base font-quicksand ${!userName.trim() || !email.trim() || !(therapist || program)
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
