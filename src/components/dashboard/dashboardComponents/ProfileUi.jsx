import React, { useEffect, useState } from 'react'
import { getProfileDetails } from '../../../api/dashboard-api';

const ProfileUi = () => {
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
      (async () => {
        const res = await getProfileDetails();
        res && setProfileData(res);
      })();
    }, []);
  return (
    <>
       {/* User Profile */}
       <div className="lg:flex items-center justify-between hidden border p-3 rounded-md border-gray-400">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 font-medium">
            {profileData && profileData.name}
          </span>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <span className="sr-only">Notifications</span>
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
    </>
  )
}

export default ProfileUi
