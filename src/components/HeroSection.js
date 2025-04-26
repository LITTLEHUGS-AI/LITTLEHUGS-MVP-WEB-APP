import React from "react";

const HeroSection = () => {
  return (
    <div
      className="w-full bg-[#FAF3ED] font-quicksand flex items-center justify-between px-20"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      {/* Left Content */}
      <div className="max-w-[630px] h-[334px] top-274 left-80px gap- 24px">
        <h1 className="text-4xl font-medium font-quicksand mb-4 leading-snug text-gray-800">
          Get clarity on your child’s<br />
          development — and your own<br />
          well-being — in just 5 minutes<br />
        </h1>
        <p className="text-xl font-quicksand text-gray-600 mb-6">
          LittleHugs helps you check in, not check out. Discover personalized,
          non-clinical care insights—at home, in school, or on the go.
        </p>
        <div className="flex items-center gap-4 mb-6">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
            Try for Free
          </button>
          <button className="px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] transition">
            Partner with us
          </button>
        </div>
      </div>

      {/* Right Blob Content */}
      <div className="max-w-[620px] h-[600px] relative">
        {/* Central Title */}
        <img
          src="/gif/home.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default HeroSection;
