import React from "react";
import { Download, Share2 } from "lucide-react";

const Main = () => {
  // Circle score component to ensure consistent sizing and appearance
  const CircleScore = ({ title, score, color, bgColor }) => (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <h4 className="text-sm font-medium mb-2">{title}</h4>
      <div className="flex justify-center">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={283 - (score / 10) * 283}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              {score}/10
            </text>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-blue-100 p-6 mx-4 my-4 rounded-lg">
        <h2 className="text-xl font-medium mb-2">Hi UserName</h2>
        <p className="text-gray-700">
          In this moment, nothing is asked of you.
          <br />
          You are allowed to pause. To rest. To simply be.
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="mx-4 p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-medium mb-4">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-sm font-medium">Total Assessments</h3>
            <p className="text-5xl font-bold">03</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Incomplete</h3>
            <p className="text-5xl font-bold">0</p>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">Complete</h3>
            <p className="text-5xl font-bold">03</p>
          </div>
        </div>

        {/* RAG Wellness Score */}
        <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">RAG Wellness Score</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <CircleScore 
              title="Mental Health" 
              score={8} 
              color="#22c55e" 
              bgColor="bg-orange-100" 
            />
            <CircleScore 
              title="Self - Care" 
              score={4} 
              color="#ef4444" 
              bgColor="bg-green-100" 
            />
            <CircleScore 
              title="Social Support" 
              score={6} 
              color="#a78bfa" 
              bgColor="bg-purple-100" 
            />
            <CircleScore 
              title="Physical Health" 
              score={6} 
              color="#f59e0b" 
              bgColor="bg-yellow-100" 
            />
            <CircleScore 
              title="Emotional Well-being" 
              score={3} 
              color="#f87171" 
              bgColor="bg-red-100" 
            />
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-6 bg-orange-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Short summary</h3>
          <div className="h-24"></div> {/* Placeholder for summary content */}
        </div>

        {/* PDF Report Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center mb-3 sm:mb-0">
            <div className="bg-red-500 p-2 rounded">
              <span className="text-white text-xs">PDF</span>
            </div>
            <span className="ml-3">Here is your detailed summary</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 border border-gray-300 rounded-lg">
              <Download size={20} />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
      </>
  );
};

export default Main;