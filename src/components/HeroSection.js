import React from "react";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div
      className="w-full bg-[#FAF3ED] font-quicksand flex items-center justify-between px-20"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      {/* Left Content */}
      <div className="max-w-[630px] h-[334px] top-274 left-80px gap- 24px">
        <h1 className="text-4xl font-medium font-quicksand mb-4 leading-snug text-[#4A4B4F]">
          Get clarity on your child’s<br />
          development — and your own<br />
          well-being — in just 5 minutes<br />
        </h1>
        <p className="text-[20px] leading-8 font-quicksand text-[#4A4B4F] mb-6">
          LittleHugs is a gentle, expert-backed wellness platform that helps parents and professionals understand, support, and care better — before it gets overwhelming.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <Link to="/assesment-landing">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
              Take the free test
            </button>
          </Link>
          <Link to="/partener-landing">
            <button className="px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] transition">
              Partner with us
            </button>
          </Link>
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
