import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

const RightHandSide = () => {

  return (
    <>
      {/* User Profile */}
      <div className="lg:flex items-center justify-between mb-6 hidden">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="ml-2 font-medium">UserName</span>
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

      {/* Mood Trend Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Mood trend</h3>
        <div className="h-48 bg-white rounded-lg border border-gray-200"></div>
      </div>

      {/* Insight Cards */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Insight Cards</h3>
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-800">
              You're carrying emotional load without enough release
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-800">
              Your physical wellness is affecting your mood more than you
              realize
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-800">
              You're doing better than you think—but you deserve more ease
            </p>
          </div>
        </div>
      </div>

      {/* Download App Banner */}
      <div className="mt-6">
        <p className="text-center mb-4">
          Download our Mobile App to get personalised nudges for your insights
        </p>
        <button className="bg-blue-500 text-white w-full py-2 rounded-lg">
          Download
        </button>
      </div>
    </>
  );
};

export default RightHandSide;
