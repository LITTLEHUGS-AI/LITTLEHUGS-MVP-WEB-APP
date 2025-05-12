import React, { useState } from "react";
import { Plus } from "lucide-react";
import CommonModal from "./CommonModal";
import { Input, Select } from "antd";

const teamMembers = [
  {
    name: "Sethu Lakshmi",
    email: "abcd@gmail.com",
    initials: "SL",
  },
  {
    name: "Sethu Lakshmi",
    email: "abcd@gmail.com",
    initials: "SL",
  },
];

const PartnerTeamMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");

  return (
    <div className="flex flex-col w-full h-full px-3 pt-6 md:px-0 font-quicksand">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[14px] md:text-2xl font-normal text-gray-700">
          Team Members
        </span>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center gap-1 text-white font-normal text-[16px] px-1 py-1 rounded-[50%] bg-[#4F7DDD]"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
          </button>
          <p
            className="text-[14px] md:text-[16px] font-semibold text-[#4F7DDD] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Add Team Member
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="border border-[#4A4B4F80] rounded-lg bg-white p-4 flex flex-col gap-2"
          >
            <div className="flex flex-row items-center gap-2 mb-1">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#4F7DDD] text-[#F4F8FF] font-semibold text-base border border-[#4F7DDD]">
                {member.initials}
              </span>
              <span className="text-gray-800 text-sm font-semibold">
                {member.name}
              </span>
            </div>
            <div className="flex flex-row text-xs text-gray-600">
              <span className="w-20 font-normal">Email</span>
              <span className="flex-1">{member.email}</span>
            </div>
            <div className="flex flex-row text-xs text-gray-600">
              <span className="w-20 font-normal">Role</span>
              <span className="flex-1 ">Admin</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-white border border-[#4A4B4F80] rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-white">
              <th className="text-left px-4 py-2 font-normal text-gray-700 border-b w-1/2 border-r border-[#4A4B4F80]">
                Team Member
              </th>
              <th className="text-left px-4 py-2 font-normal text-gray-700 border-b border-r border-[#4A4B4F80]">
                Email
              </th>
              <th className="text-left px-4 py-2 font-normal text-gray-700 border-b border-[#4A4B4F80]">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#4F7DDD] text-[#F4F8FF] font-semibold text-base border border-[#4F7DDD]">
                    {member.initials}
                  </span>
                  <span className="text-gray-800 text-sm">{member.name}</span>
                </td>
                <td className="px-4 py-2 text-gray-700 text-sm">
                  {member.email}
                </td>
                <td className="px-4 py-2 text-gray-700 text-sm">Admin</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommonModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setName("");
          setEmail("");
          setRole("Admin");
        }}
        title={
          <div className="w-full text-center font-normal text-[16px] md:text-2xl">
            Add Team Member
          </div>
        }
        footer={null}
      >
        <div className="flex flex-col gap-4 mt-4 w-full md:flex-row md:gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="mb-1 text-gray-700 text-sm">
              Team Member Name
            </label>
            <Input
              placeholder="* Team Member Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 md:h-[2.5rem] text-[14px]"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label className="mb-1 text-gray-700 text-sm">Email ID</label>
            <Input
              placeholder="* Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 md:h-[2.5rem] text-[14px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-full mt-4 font-quicksand">
          <label className="mb-1 text-gray-700 text-sm font-quicksand">
            Role
          </label>
          <Select
            value={role}
            onChange={setRole}
            className="w-full h-9 md:h-[2.5rem] text-[14px] font-quicksand"
            options={[
              { label: "Admin", value: "Admin" },
              { label: "Member", value: "Member" },
            ]}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-[#4F7DDD] text-white font-semibold px-4 md:px-8 py-2 rounded text-sm md:text-base font-quicksand"
            onClick={() => {
              setIsModalOpen(false);
              setName("");
              setEmail("");
              setRole("Admin");
            }}
          >
            Invite Member
          </button>
        </div>
      </CommonModal>
    </div>
  );
};

export default PartnerTeamMember;
