import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPartnerSubmenu, setShowPartnerSubmenu] = useState(false);

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

        {/* Corporate with dropdown */}
        <li className={`relative group ${(isActive("/partner") || isActive("/corporate") || isActive("/school") || isActive("/therapy-center")) ? "font-bold" : ""}`}>
          <Link to="/partner" className="cursor-pointer">For Partners</Link>

          <div className="absolute top-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white shadow-xl border w-48 rounded-lg z-50 p-4">
            <ul className="space-y-2">
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer"><Link to='/corporate'>Corporates</Link></li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer"><Link to='/school'>Schools</Link></li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer"><Link to='/therapy-center'>Therapy Center</Link></li>
            </ul>
          </div>
        </li>

        <li className={isActive("/assesment") ? "font-bold" : ""}>
          <Link to="/assesment">Programs</Link>
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

      <button
        onClick={() => navigate('/signup')}
        className="w-[120px] h-10 sm:h-[42px] bg-[#4F7DDD] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-[10px]"
      >
        Try For Free
      </button>


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

          <li>
            <Link to="/partner"
              className={`flex justify-between w-full items-center ${isActive("/partner") || isActive("/corporate") || isActive("/school") || isActive("/therapy-center") ? "font-bold" : ""}`}
            >
              For Partners
              <button onClick={() => setShowPartnerSubmenu(!showPartnerSubmenu)}>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showPartnerSubmenu ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Link>

            {showPartnerSubmenu && (
              <ul className="mt-2 ml-4 space-y-3 text-base text-gray-600">
                <li className={isActive("/corporate") ? "font-bold" : ""}>
                  <Link to="/corporate" onClick={closeMenu}>Corporates</Link>
                </li>
                <li className={isActive("/school") ? "font-bold" : ""}>
                  <Link to="/school" onClick={closeMenu}>Schools</Link>
                </li>
                <li className={isActive("/therapy-center") ? "font-bold" : ""}>
                  <Link to="/therapy-center" onClick={closeMenu}>Therapy Center</Link>
                </li>
              </ul>
            )}
          </li>


          <li className={isActive("/assesment") ? "font-bold" : ""}>
            <Link to="/assesment" onClick={closeMenu}>Programs</Link>
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
                navigate('/signup');
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