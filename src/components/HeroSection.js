import React from "react";

const HeroSection = () => {
  return (
    <div
      className="w-full pt-[20px] bg-[#FAF3ED] font-quicksand flex items-center justify-between px-20"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      {/* Left Content */}
      <div className="max-w-[630px] h-[334px] top-274 left-80px gap- 24px">
        <h1 className="text-4xl font-medium font-quicksand mb-4 leading-snug text-gray-800">
          Gentle Guidance for Growing <br />
          Minds and Healing Hearts
        </h1>
        <p className="text-xl font-quicksand text-gray-600 mb-6">
          LittleHugs helps you check in, not check out. Discover personalized,
          non-clinical care insights—at home, in school, or on the go.
        </p>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
          Try for Free
        </button>
      </div>

      {/* Right Blob Content */}
      <div className="">
        {/* Central Title */}
        <img
                  src="/images/Vector.svg"
                  alt=""
                  
                />
        <h2 className="absolute flex justify-center  text-center top-[280px] left-[822px] font-quicksand font-medium text-[38px]">Animation</h2>

        {/* Blob Labels */}
        <span className="absolute top-[33%] left-[60%]  font-quicksand font-medium text-[20px]">Emotional Checking</span>
        <span className="absolute top-[40%] right-[10%]  font-quicksand font-medium text-[20px]">Daily Journaling</span>
        <span className="absolute left-[60%] top-[65%]  font-quicksand font-medium text-[20px]">Mood Tracker</span>
        <span className="absolute  right-[5%] top-[80%] font-quicksand font-medium text-[20px]">Daily Ritual Suggestion</span>


      </div>
    </div>
  );
};

export default HeroSection;
