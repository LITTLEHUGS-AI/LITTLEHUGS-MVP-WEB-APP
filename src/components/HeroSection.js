// src/components/HeroSection.js
import React from "react";
import { useWaitlist } from "../lib/WaitlistContext";

const HeroSection = () => {
  const { openWaitlist } = useWaitlist();

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
              Check in with yourself — and your family — in just 5 minutes.
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-[#4A4B4F] mb-6 text-center lg:text-left">
              <strong>LittleHugs</strong> is your everyday emotional wellness buddy. We help you spot early signs of stress, burnout, or imbalance — for you, your partner, or your child — and guide you toward gentle, expert-backed care.
              <br />
              <i className="mt-4">No pressure. No overwhelm. Just clarity, calm, and care — one check-in at a time.</i>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <button
                onClick={openWaitlist}
                className="w-full sm:w-auto bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
              >
                Join the Waitlist
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
