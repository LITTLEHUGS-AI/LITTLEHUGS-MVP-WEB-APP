import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-[80px] bg-white flex items-center justify-between px-10 shadow-sm">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src="/images/logo.svg" // Replace with actual logo path
            alt="LittleHugs Logo"

          />
        </Link>
          {/* <span className="text-3xl font-semibold text-blue-600">LittleHugs</span> */}
      </div>

      <ul className="text-[20px] flex items-center gap-8 text-[#4A4B4F] font-medium font-quicksand ">
        <li><Link to="/personal-landing">For You</Link></li>
        <li><Link to="/partener-landing">For Partners</Link></li>
        <li><Link to="/assesment-landing">Assessments</Link></li>
        <li><Link to="/">Pricing</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/">Contact Us</Link></li>
      </ul>

      <button
        onClick={() => navigate('/signin')}
        className="w-[120px] h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]"
      >
        Sign In
      </button>

    </nav>
  );
};

export default Navbar;