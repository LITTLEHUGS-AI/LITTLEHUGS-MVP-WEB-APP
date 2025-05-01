import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full h-[80px] bg-white flex items-center justify-between px-10 shadow-sm sticky top-0 z-50">
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
        <li className={isActive("/personal-landing") ? "font-[700]" : ""}>
          <Link to="/personal-landing">For You</Link>
        </li>
        <li className={isActive("/partener-landing") ? "font-[700]" : ""}>
          <Link to="/partener-landing">For Partners</Link>
        </li>
        <li className={isActive("/assesment-landing") ? "font-[700]" : ""}>
          <Link to="/assesment-landing">Assessments</Link>
        </li>
        <li className={isActive("/pricingplans") ? "font-[700]" : ""}>
          <Link to="/pricingplans">Pricing</Link>
        </li>
        <li className={isActive("/about") ? "font-[700]" : ""}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={isActive("/contact") ? "font-[700]" : ""}>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      {isActive("/contact") ? (
        <>
          <div
            className="w-[120px] h-[42px]"
          >
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate('/contact')}
            className="w-[120px] h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]"
          >
            Try For Free
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;