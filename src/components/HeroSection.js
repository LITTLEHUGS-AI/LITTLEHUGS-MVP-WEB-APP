import React from "react";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div
      className="w-full bg-[#FAF3ED] font-quicksand px-4 sm:px-6 md:px-[80px]"
      style={{ fontFamily: "Quicksand, sans-serif" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="w-full lg:max-w-[630px] order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 leading-snug text-[#4A4B4F] text-center lg:text-left">
              Get clarity on your child's
              development — and your own
              well-being — in just 5 minutes
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-[#4A4B4F] mb-6 text-center lg:text-left">
              LittleHugs is a gentle, expert-backed wellness platform that helps parents and professionals understand, support, and care better — before it gets overwhelming.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <Link to="/signup" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                  Take the free test
                </button>
              </Link>
              <Link to="/partner#book-a-demo" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] hover:bg-gray-100 transition">
                  Partner with us
                </button>
              </Link>
            </div>
          </div>

          {/* Right Blob Content */}
          <div className="w-full lg:max-w-[620px] order-1 lg:order-2 flex justify-center">
            <img
              src="/gif/home.gif"
              alt="LittleHugs illustration"
              className="max-w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;