import React from 'react'
import { Link } from "react-router-dom";

function LandingHeader({ image, bg_color, title, description, sub_title, button_text, link }) {
    // Handle dynamic background color with inline style since Tailwind
    // doesn't support dynamic class names with string interpolation
    const backgroundStyle = {
        backgroundColor: bg_color || '#FAF3ED', // Default fallback color
    };

    return (
        <div
            className="w-full font-quicksand flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-8 md:py-12"
            style={backgroundStyle}
        >
            {/* Text Content */}
            <div className="w-full lg:max-w-[630px] order-2 lg:order-1 text-center lg:text-left mb-8 lg:mb-0">
                {sub_title && (
                    <p className='text-lg sm:text-xl text-[#4A4B4F] font-medium mb-2'>
                        {sub_title}
                    </p>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 leading-snug text-[#4A4B4F]">
                    {title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] mb-6">
                    {description}
                </p>
                <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
                    <Link to={link != null ? link : "/signup"}>
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                            {button_text ? button_text : "Explore our Programs"}
                        </button>
                    </Link>
                </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-auto flex justify-center items-center p-2 sm:p-4 order-1 lg:order-2 mb-6 lg:mb-0">
                <img
                    src={image ? image : "/images/about_header.svg"}
                    alt="Header illustration"
                    className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto"
                />
            </div>
        </div>
    )
}

export default LandingHeader