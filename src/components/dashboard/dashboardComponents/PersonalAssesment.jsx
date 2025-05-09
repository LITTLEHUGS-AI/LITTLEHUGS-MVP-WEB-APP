import React from "react";
import Sidebar from "./Sidebar";
import ProfileUi from "./ProfileUi";

const PersonalAssessment = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Fixed Sidebar - not scrollable */}
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main content - scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-12 items-center justify-center p-4 gap-4">
          <div className="col-span-10 flex items-center justify-start p-[14px] border border-gray-400 rounded-md">
            <p className="p-0 text-[20px] text-slate-500">
              You have not taken any assessment till date !
            </p>
          </div>
          <div className="col-span-2">
            <ProfileUi />
          </div>
        </div>
        <div className="bg-purple-100 p-8">
          <h1 className="text-3xl text-center text-gray-700 font-medium mb-8">
            Explore our assessments here
          </h1>

          <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
            {/* Women's Assessment Card */}
            <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                LittleHugs 360° Women's Wellness Assessment
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                A high-level mind-body-social scan that gives a complete
                picture of a woman's mental health, emotional resilience,
                self-care capacity, and support system.
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Children's Assessment Card */}
            <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                LittleHugs 360° Children's Wellness Assessment
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                To provide a comprehensive snapshot of a child's
                developmental, behavioral, emotional, and physical wellness
                for early detection and support
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* SEL Assessment Card */}
            <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                Universal SEL Assessment
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                Promote self-awareness, emotional intelligence, and social
                well-being; identify SEL strengths and growth areas; support
                self-regulation, empathy, and decision-making
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-8 border-slate-500 rounded-md h-[200px] mt-5 mx-4 mb-4 flex items-center justify-center">
          <p className="text-2xl text-slate-500
          ">Collage of dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalAssessment;