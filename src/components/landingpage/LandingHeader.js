import React from 'react'
import { Link } from "react-router-dom";


function LandingHeader({image, bg_color, title, description, sub_title, button_text}) {
    return (
        <div className={`w-full bg-[${bg_color}] font-quicksand flex items-center justify-between px-20 py-8`}>
            <div className="max-w-[630px] top-274 left-80px gap- 24px">
                {sub_title && (
                    <p className='text-xl text-[#4A4B4F] font-medium'>{sub_title}</p>
                )}
                <h1 className="text-4xl font-medium font-quicksand mb-4 leading-snug text-[#4A4B4F]">
                    {title}
                </h1>
                <p className="text-xl font-quicksand text-[#4A4B4F] mb-6">
                    {description}
                </p>
                <div className="flex items-center gap-4 mb-6">
                <Link to={`${button_text ? "/contact" : "/assesment-landing"}`}><button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                        {button_text ? button_text : "Try for Free"}
                    </button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center p-5">
                <img
                    src={image ? image : "/images/about_header.svg"}
                    alt="About Header"
                    className="w-[400px] h-[400px]"
                />
            </div>
        </div>
    )
}

export default LandingHeader
