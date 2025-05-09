import React, { useEffect, useState } from "react";
import { getProfileDetails } from "../../../api/dashboard-api";
import { Modal } from "antd";
import { Calendar, ChevronDown } from "lucide-react";

const ProfileUi = () => {
  const [profileData, setProfileData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    city: "",
    language: "",
    dateOfBirth: "",
    currentLifeStage: "",
    weight: "",
    height: "",
    occupation: "",
    lifestyle: "",
    goal: "",
    tonePreference: "",
  });

  useEffect(() => {
    (async () => {
      const res = await getProfileDetails();
      res && setProfileData(res);
    })();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    // Handle form submission
  };

  return (
    <>
      {/* User Profile */}
      <div
        onClick={showModal}
        className="lg:flex items-center justify-between hidden border p-3 rounded-md border-gray-400 cp"
      >
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 font-medium">
            {profileData.name ? profileData.name : "UserName"}
          </span>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
      <Modal
        title="LittleHuges"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
      >
        <div className="mx-auto p-6 bg-white rounded-lg">
          <h1 className="text-4xl font-medium text-center text-gray-700 mb-8">
            Profile
          </h1>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <span className="text-gray-400">Photo</span>
                </div>
              </div>
              <div className="mt-2 text-center text-sm font-medium">
                100 % Complete
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * City
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Language
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Date Of Birth
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.dateOfBirth}
                    onChange={(e) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                    placeholder="YYYY-MM-DD"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Current life stage
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.currentLifeStage}
                    onChange={(e) =>
                      handleChange("currentLifeStage", e.target.value)
                    }
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Weight
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                  />
                  <span className="text-gray-400 mr-3">kg</span>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Height
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                  />
                  <span className="text-gray-400 mr-3">cm</span>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Occupation
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md outline-none"
                  value={profile.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Lifestyle
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md outline-none"
                  value={profile.lifestyle}
                  onChange={(e) => handleChange("lifestyle", e.target.value)}
                />
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Goal is to work on
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.goal}
                    onChange={(e) => handleChange("goal", e.target.value)}
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-500 mb-1">
                  * Tone Preference
                </label>
                <div className="flex items-center border rounded-md">
                  <input
                    type="text"
                    className="flex-grow p-3 outline-none rounded-md"
                    value={profile.tonePreference}
                    onChange={(e) =>
                      handleChange("tonePreference", e.target.value)
                    }
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 mr-3" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileUi;
