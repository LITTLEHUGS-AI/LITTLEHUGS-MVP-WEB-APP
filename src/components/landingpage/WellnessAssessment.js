import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WellnessAssessment = ({ onClose }) => {
  const navigate = useNavigate();

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative mx-4"
        style={{
          backgroundImage: "url('/images/learnmore.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white bg-opacity-70 rounded-full h-8 w-8 flex items-center justify-center"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
          LittleHugs 360° Women's Wellness Assessment
        </h1>

        {/* What it Assesses Section */}
        <div className="mb-4 sm:mb-6 px-2 sm:px-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What it Assesses:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
            <li>Mood & emotional balance</li>
            <li>Anxiety, overthinking</li>
            <li>Physical energy & fatigue</li>
            <li>Support systems in relationship quality</li>
            <li>Self-care routines & burnout-warning sign</li>
          </ul>
        </div>

        {/* Output Section */}
        <div className="mb-6 sm:mb-8 px-2 sm:px-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
            <li>HAC Wellness Score</li>
            <li>Key theme insights (e.g. "You feel unsupported," "You're emotionally fatigued")</li>
            <li>AI-supported nudges (swimming, rest rituals, conversation starter pools)</li>
            <li>PDF summary with personal wellness trendline</li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4 sm:my-6"></div>

        {/* Action Button */}
        <div className="flex justify-center px-2 sm:px-4 pb-2 sm:pb-4">
          <button
            onClick={() => navigate("/contact")}
            className="bg-[#1E2C2B] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition font-medium text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
          >
            Take quick assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssessment;