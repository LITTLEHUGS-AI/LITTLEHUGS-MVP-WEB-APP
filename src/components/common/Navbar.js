import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
        <li className={isActive("/partener") ? "font-bold" : ""}>
          <Link to="/partener">For Partners</Link>
        </li>
        <li className={isActive("/assesment") ? "font-bold" : ""}>
          <Link to="/assesment">Assessments</Link>
        </li>
        <li className={isActive("/pricingplans") ? "font-bold" : ""}>
          <Link to="/pricingplans">Pricing</Link>
        </li>
        <li className={isActive("/about") ? "font-bold" : ""}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={isActive("/contact") ? "font-bold" : ""}>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* CTA Button */}
      <div className="hidden sm:block z-20">
        {isActive("/contact") ? (
          <div className="w-[120px] h-[42px]"></div>
        ) : (
          <button
            onClick={() => navigate('/contact')}
            className="w-[120px] h-10 sm:h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]"
          >
            Try For Free
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-20 p-2"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          // X icon for close
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-10 flex flex-col pt-20 px-6 pb-6 lg:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
          }`}
      >
        <ul className="flex flex-col items-center gap-6 text-[#4A4B4F] font-medium font-quicksand text-xl">
          <li className={isActive("/personal") ? "font-bold" : ""}>
            <Link to="/personal" onClick={closeMenu}>For You</Link>
          </li>
          <li className={isActive("/partener") ? "font-bold" : ""}>
            <Link to="/partener" onClick={closeMenu}>For Partners</Link>
          </li>
          <li className={isActive("/assesment") ? "font-bold" : ""}>
            <Link to="/assesment" onClick={closeMenu}>Assessments</Link>
          </li>
          <li className={isActive("/pricingplans") ? "font-bold" : ""}>
            <Link to="/pricingplans" onClick={closeMenu}>Pricing</Link>
          </li>
          <li className={isActive("/about") ? "font-bold" : ""}>
            <Link to="/about" onClick={closeMenu}>About Us</Link>
          </li>
          <li className={isActive("/contact") ? "font-bold" : ""}>
            <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
          </li>
        </ul>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center">
          {!isActive("/contact") && (
            <button
              onClick={() => {
                navigate('/contact');
                closeMenu();
              }}
              className="w-full max-w-xs h-12 bg-[#4F7DDD] hover:bg-blue-700 text-white text-base font-medium px-4 py-2 rounded-[10px]"
            >
              Try For Free
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;