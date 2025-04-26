import React from "react";

const Footer = () => {
  return (
    <div className="w-full font-quicksand px-20 mt-[64px]">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-3 justify-normal">
          <h1 className="text-[32px] leading-8 font-normal mb-4 text-[#4A4B4F]">
            Get clarity on your child’s<br />
            development — and your own<br />
            well-being — in just 5 minutes<br />
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <button className="bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
              Take the free test
            </button>
            <button className="px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] transition">
              Partner with us
            </button>
          </div>
        </div>
        <div className="w-[50%] flex gap-4 relative justify-center items-center">
          <div className="w-full">
            <input className="w-full border border-[#263238] rounded-[8px] px-4 py-2" type="text" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
