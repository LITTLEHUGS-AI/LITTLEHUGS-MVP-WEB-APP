import React from "react";
import { Link } from "react-router-dom";

const MainHeader = () => {
    return (
        <div className="w-full bg-[#FFC655] font-quicksand flex items-center justify-between px-20 py-8">
            <div className="max-w-[630px] top-274 left-80px gap- 24px">
                <h1 className="text-4xl font-medium font-quicksand mb-4 leading-snug text-[#4A4B4F]">
                    We check in where most <br />
                    systems don’t
                </h1>
                <p className="text-xl font-quicksand text-[#4A4B4F] mb-6">
                    LittleHugs is an emotionally intelligent wellness platform that helps families and institutions spot early signs of emotional and developmental risks — and respond with gentle, guided care.
                </p>
                <p className="text-xl font-quicksand text-[#4A4B4F] mb-6">
                    From the first nudge to the final insight, we’re here to make care simpler, stigma-free, and deeply human.
                </p>
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/assesment-landing">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                            Take the free test
                        </button>
                    </Link>
                    <Link to="/partener-landing">
                        <button className="px-6 py-2 rounded-full border border-[#263238] text-[#4A4B4F] transition">
                            Partner with us
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center p-5">
                <img
                    src="/images/about_1.svg"
                    alt="About Header"
                    className="w-[400px] h-[400px]"
                />
            </div>
        </div>
    );
};

export default MainHeader;
