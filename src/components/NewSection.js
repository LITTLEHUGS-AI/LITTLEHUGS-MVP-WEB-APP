import React from 'react';
import { Link } from "react-router-dom";


const NewCareSection = () => {
  return (
    <div className="relative w-full h-[420px] bg-[#FFC550] overflow-hidden">

      {/* White Top Curve */}
      <div className="absolute top-0 left-0 w-full h-[180px] bg-white rounded-b-[80%]"></div>

      {/* Centered Button */}
      <div className="absolute top-[47%] w-full flex justify-center">
        <Link to="/signup">
          <button className="bg-[#4F7DDD] text-white px-10 py-3 rounded-full font-medium text-lg">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Outer Decorative Circle */}
      <div className="absolute bottom-[-120px] left-1/2 transform -translate-x-1/2 w-[270px] h-[270px] bg-[#FFF8DC] rounded-full flex items-center justify-center">
        <div className="w-[210px] h-[210px] bg-[#FFC550] rounded-full"></div>
      </div>
    </div>

  );
};

export default NewCareSection;
