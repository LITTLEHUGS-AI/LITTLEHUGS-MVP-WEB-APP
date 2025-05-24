// src/components/JoinMovement.jsx
import React from 'react';
import { Link } from "react-router-dom";

function JoinMovement() {
    return (
        <div className="bg-[#FFF9E7] mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] flex flex-col items-center text-center relative overflow-hidden py-6 sm:py-8 md:py-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#4A4B4F] mb-3 sm:mb-4 md:mb-6 font-quicksand">
                Join the Movement
            </h2>
            <p className="text-base sm:text-lg max-w-3xl text-[#4A4B4F] mb-6 sm:mb-8 md:mb-10 px-0 sm:px-2 md:px-4 font-quicksand">
                We're building more than a platform — we're building a world where every child feels seen early,
                and every caregiver feels supported. Whether you're a school, clinic, parent, or simply someone
                who believes in early care, we'd love to build with you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-none">
                <Link to="/signup" className="w-full sm:w-auto">
                    <button className="bg-[#283036] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg font-quicksand hover:bg-[#1f252b] transition w-full sm:w-auto">
                        Explore our Programs
                    </button>
                </Link>
                <Link to="/signup" className="w-full sm:w-auto mt-3 sm:mt-0">
                    <button className="border border-[#283036] text-[#283036] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg font-quicksand hover:bg-[#283036] hover:text-white transition w-full sm:w-auto">
                        Partner with us
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default JoinMovement;