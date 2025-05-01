import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-[10px] mt-12 md:mt-[120px]"></div>
      <div className="relative bg-[#fef8e6] overflow-hidden px-4 sm:px-6 md:px-[80px] pb-8">
        {/* Curve Top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            className="w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative flex flex-col lg:flex-row justify-around items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8">
          {/* Left Side - Text and Buttons */}
          <div className="flex flex-col gap-3 justify-normal w-full lg:w-auto mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl md:text-[28px] leading-normal sm:leading-10 font-normal mb-4 text-[#4A4B4F]">
              Whether you're a mom, a caregiver,<br className="hidden sm:block" />
              a school, or a clinic — LittleHugs<br className="hidden sm:block" />
              gives you a smarter way to care
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <Link to="/assesment-landing" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                  Take the free test
                </button>
              </Link>
              <Link to="/partener-landing" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] hover:bg-gray-100 transition">
                  Partner with us
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Email Subscription */}
          <div className="w-full lg:w-[50%] flex flex-col sm:flex-row mb-10 lg:mb-20 gap-4 justify-center items-center">
            <div className="w-full sm:w-[70%]">
              <input
                disabled
                className="w-full border border-[#263238] rounded-[10px] h-12 sm:h-[72px] px-4 py-2"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full sm:w-auto">
              <button
                onClick={() => navigate("/contact")}
                className="w-full sm:w-[138px] bg-[#263238] text-white px-6 py-2 rounded-[70px] hover:bg-gray-700 transition h-12 sm:h-[72px]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;