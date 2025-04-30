import React from "react";
import { useNavigate } from "react-router-dom";


const WellnessAssessment = ({ onClose }) => {
    const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-[650px] h-[580px] p-6 relative" 
      style={{ backgroundImage: "url('/images/learnmore.svg')" }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          LittleHugs 360° Women's Wellness Assessment
        </h1>

        {/* What it Assesses Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">What it Assesses:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
            <li>Mood & emotional balance</li>
            <li>Anxiety, overthinking</li>
            <li>Physical energy & fatigue</li>
            <li>Support systems in relationship quality</li>
            <li>Self-care routines & burnout-warning sign</li>
          </ul>
        </div>

        {/* Output Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Output:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
            <li>HAC Wellness Score</li>
            <li>Key theme insights (e.g. "You feel unsupported," "You're emotionally fatigued")</li>
            <li>AI-supported nudges (swimming, rest rituals, conversation starter pools)</li>
            <li>PDF summary with personal wellness trendline</li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button onClick={() => navigate("/contact")} className="bg-[#1E2C2B] text-white py-3 px-8 rounded-full hover:bg-[#111818] transition font-medium">
            Take quick assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssessment;
