import React from 'react';
import { Link } from "react-router-dom";


const NewCareSection = () => {
  return (
    <div className="relative w-full h-[420px] bg-[#FFC550] overflow-hidden">
          
          {/* White Top Curve */}
          <div className="absolute top-0 left-0 w-full h-[180px] bg-white rounded-b-[80%]"></div>
    
          {/* Centered Button */}
          <div className="absolute top-[120px] w-full flex justify-center">
          <Link to="/signup">
            <button className="bg-[#4A7CFB] text-white px-10 py-3 rounded-full font-medium text-lg shadow-md hover:scale-105 transition-transform duration-300">
              Sign Up
            </button>
            </Link>
          </div>
    
          {/* Outer Decorative Circle */}
          <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 w-[270px] h-[270px] bg-[#FFF8DC] rounded-full flex items-center justify-center">
            {/* Inner Circle */}
            <div className="w-[140px] h-[140px] bg-[#FFC550] rounded-full"></div>
          </div>
        </div>

  );
};

export default NewCareSection;
