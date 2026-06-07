// src/components/HeroSection.js
import React from "react";
import { useWellness } from "../lib/WellnessContext";

const HeroSection = () => {
  const { openWellnessFlow } = useWellness();

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
              Check in with yourself — in just 5 minutes a day.
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-[#4A4B4F] mb-6 text-center lg:text-left">
              <strong>LittleHugs</strong> is your everyday wellness companion — for the woman who holds it all together for everyone else. A few quiet minutes of comfort, a gentle nudge, and someone who listens.
              <br />
              <i className="mt-4">No pressure. No overwhelm. Just clarity, calm, and care — one check-in at a time.</i>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <button
                onClick={openWellnessFlow}
                className="w-full sm:w-auto bg-[#1E2C2B] text-white px-6 py-2 rounded-full hover:bg-[#111818] transition"
              >
                Start My Reflection
              </button>
              <button
                onClick={openWellnessFlow}
                className="w-full sm:w-auto px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] hover:bg-gray-100 transition"
              >
                Try it free →
              </button>
              <button
                onClick={() => window.dispatchEvent(new Event("lily:open"))}
                className="w-full sm:w-auto px-6 py-2 rounded-full border border-[#4F7DDD] text-[#4F7DDD] hover:bg-[#EFF6FF] transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#4F7DDD" aria-hidden="true"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
                Talk to Lily
              </button>
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
