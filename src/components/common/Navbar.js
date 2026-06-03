// src/components/common/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWaitlist } from "../../lib/WaitlistContext";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="w-full h-16 sm:h-20 bg-white flex items-center justify-between px-4 sm:px-6 lg:px-10 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 z-20">
        <Link to="/">
          <img
            src="/images/logo.svg"
            alt="LittleHugs Logo"
            className="max-h-10"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-4 xl:gap-8 text-[#4A4B4F] font-medium font-quicksand text-base xl:text-xl">
        <li className={isActive("/personal") ? "font-bold" : ""}>
          <Link to="/personal">For You</Link>
        </li>


        <li className={isActive("/assesment") ? "font-bold" : ""}>
          <Link to="/assesment">Programs</Link>
        </li>

        <li className={isActive("/about") ? "font-bold" : ""}>
          <Link to="/about">About Us</Link>
        </li>

        <li className={isActive("/contact") ? "font-bold" : ""}>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* CTA Button */}
      <button
        onClick={openWaitlist}
        className="hidden lg:block w-[140px] h-10 sm:h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]"
      >
        Join Waitlist
      </button>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-20 p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-10 flex flex-col pt-20 px-6 pb-6 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
      >
        <ul className="flex flex-col items-center gap-6 text-[#4A4B4F] font-medium font-quicksand text-xl">
          <li className={isActive("/personal") ? "font-bold" : ""}>
            <Link to="/personal" onClick={closeMenu}>For You</Link>
          </li>


          <li className={isActive("/assesment") ? "font-bold" : ""}>
            <Link to="/assesment" onClick={closeMenu}>Programs</Link>
          </li>
          <li className={isActive("/about") ? "font-bold" : ""}>
            <Link to="/about" onClick={closeMenu}>About Us</Link>
          </li>
          <li className={isActive("/contact") ? "font-bold" : ""}>
            <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
          </li>
        </ul>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => { openWaitlist(); closeMenu(); }}
            className="w-full max-w-xs h-12 bg-[#4F7DDD] hover:bg-blue-700 text-white text-base font-medium px-4 py-2 rounded-[10px]"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
