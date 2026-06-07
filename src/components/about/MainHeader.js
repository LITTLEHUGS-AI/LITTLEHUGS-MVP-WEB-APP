import React from "react";
import { Link } from "react-router-dom";

const MainHeader = () => {
    return (
        <div className="w-full bg-[#FFC655] font-quicksand flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8">
            <div className="w-full md:max-w-[630px] mb-8 md:mb-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium font-quicksand mb-3 sm:mb-4 leading-snug text-[#4A4B4F] text-center md:text-left">
                    We check in where most {/* Removed <br /> for mobile responsiveness */}
                    systems don't
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-quicksand text-[#4A4B4F] mb-4 sm:mb-6 text-center md:text-left">
                    LittleHugs is a wellness companion for the woman who holds it all together — at work, at home, for everyone but herself. A gentle daily space to pause, reflect, and feel a little more like yourself again.
                </p>
                <p className="text-base sm:text-lg md:text-xl font-quicksand text-[#4A4B4F] mb-4 sm:mb-6 text-center md:text-left">
                    From the first nudge to the final insight, we're here to make care simpler, stigma-free, and deeply human.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
                    <Link to="/assesment" className="w-full sm:w-auto">
                        <button className="bg-gray-800 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-gray-700 transition w-full sm:w-auto text-sm sm:text-base">
                            Explore our Programs
                        </button>
                    </Link>

                </div>
            </div>
            <div className="flex justify-center items-center p-3 sm:p-4 md:p-5">
                <img
                    src="/images/about_1.svg"
                    alt="About Header"
                    className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-auto"
                />
            </div>
        </div>
    );
};

export default MainHeader;