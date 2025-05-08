import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProfileDetails } from "../../../api/dashboard-api";
import ProfileUi from "./ProfileUi";

const RightHandSide = () => {
  return (
    <>
    <ProfileUi/>
      {/* Mood Trend Section */}
      <div className="my-6">
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
