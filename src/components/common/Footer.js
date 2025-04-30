import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="h-[100px]"></div>
    <div className="relative bg-[#fef8e6] overflow-hidden pt-20 pb-8">
        {/* Curve Top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            className="w-full h-[100px]"
          >
            <path
              fill="#ffffff"
              d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative flex flex-col md:flex-row justify-around items-start md:items-center py-16 px-8">
        <div className="flex flex-col gap-3 justify-normal">
          <h1 className="text-[28px] leading-8 font-medium mb-4 text-[#4A4B4F]">
            Whether you're a mom,a caregiver,<br /> a school, or a clinic — LittleHugs<br />
            gives you a smarter way to care
          </h1>
          <div className="flex items-center gap-4 mb-6">
            {/* <Link to="/pricingplans"> */}
              <button className="bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                Take the free test
              </button>
            {/* </Link> */}
            <Link to="/partener-landing">
              <button className="px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] transition">
                Partner with us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[50%] flex mb-20 gap-4 relative justify-center items-center">
          <div className="w-full">
            <input disabled className="w-full border border-[#263238] rounded-[8px] px-4 py-2" type="text" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate("/contact")} className="bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
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
