import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-[80px] bg-white flex items-center justify-between px-10 shadow-sm">
      <div className="flex items-center gap-2">
        <img
          src="/images/logo.svg" // Replace with actual logo path
          alt="LittleHugs Logo"
        //   className="w-8 h-8 rounded-full"
        />
        {/* <span className="text-3xl font-semibold text-blue-600">LittleHugs</span> */}
      </div>

      <ul className="text-[20px] flex items-center gap-8 text-[#4A4B4F] font-medium font-quicksand ">
        <li><Link to="/">For You</Link></li>
        <li><Link to="/">For Partners</Link></li>
        <li className="relative group">
          <div className="flex items-center gap-1">
            Assessments
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </div>
          {/* Dropdown can be added here if needed */}
        </li>
        <li><Link to="/">Pricing</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/">Contact Us</Link></li>
      </ul>

      <button className="w-[120px] h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]">
        Sign In
      </button>

    </nav>
  );
};

export default Navbar;