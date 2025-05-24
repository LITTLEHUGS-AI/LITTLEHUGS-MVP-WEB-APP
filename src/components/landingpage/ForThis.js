import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForThis() {
    const dropdown_data = [
        {
            title: "Children",
            sub_heading: "For Little Minds That Bloom",
            description: "Daily milestone moments, sensory play, and gentle rituals that help your child thrive",
            image: "/landing/Children.png"
        },
        {
            title: "Teenagers",
            sub_heading: "For Growing Hearts & Minds",
            description: "Support emotional balance, focus, and self-esteem through guided wellness tools designed for teens",
            image: "/landing/Teenagers.png"
        },
        {
            title: "Women",
            sub_heading: "For Your Inner Flow",
            description: "Track hormones, manage stress, and nurture your emotional cycles with kindness and clarity",
            image: "/landing/Women.png"
        },
        {
            title: "Mothers",
            sub_heading: "For the Journey of Motherhood",
            description: "Postpartum care, emotional check-ins, and daily rituals that hold space for your healing and joy",
            image: "/landing/Mothers.png"
        },
        {
            title: "Caregivers",
            sub_heading: "For the Ones Who Hold Others",
            description: "Co-care tools to build deeper bonds while gently supporting those you love—and yourself",
            image: "/landing/Caregivers.png"
        }
    ]
    const [selectedData, setSelectedData] = useState({
        title: "Children",
        sub_heading: "For Little Minds That Bloom",
        description: "Daily milestone moments, sensory play, and gentle rituals that help your child thrive",
        image: "/landing/Children.png"
    })

    const navigate = useNavigate()

    const handleNext = () => {
        const currentIndex = dropdown_data.findIndex(item => item.title === selectedData.title);
        if (currentIndex < dropdown_data.length - 1) {
            setSelectedData(dropdown_data[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = dropdown_data.findIndex(item => item.title === selectedData.title);
        if (currentIndex > 0) {
            setSelectedData(dropdown_data[currentIndex - 1]);
        }
    };

    return (
        <div className="w-full mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand text-center text-gray-800 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#4A4B4F] mb-6 sm:mb-8 lg:mb-10">
                Who is this for?
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto p-4 gap-8 lg:gap-4">
                {/* Mobile Navigation Arrows - Top (Only visible on smaller screens) */}
                <div className="flex justify-center items-center gap-8 lg:hidden w-full mb-4">
                    <button
                        onClick={handlePrevious}
                        className="p-2"
                        aria-label="Previous item"
                        disabled={dropdown_data.findIndex(item => item.title === selectedData.title) === 0}
                    >
                        <img
                            src="/icons/mingcute_dow-line.svg"
                            alt="Previous"
                            className={`w-8 h-8  ${dropdown_data.findIndex(item => item.title === selectedData.title) === 0 ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </button>
                    <span className="text-lg font-medium text-[#4A4B4F]">
                        {selectedData.title}
                    </span>
                    <button
                        onClick={handleNext}
                        className="p-2"
                        aria-label="Next item"
                        disabled={dropdown_data.findIndex(item => item.title === selectedData.title) === dropdown_data.length - 1}
                    >
                        <img
                            src="/icons/mingcute_down-line.svg"
                            alt="Next"
                            className={`w-8 h-8 ${dropdown_data.findIndex(item => item.title === selectedData.title) === dropdown_data.length - 1 ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </button>
                </div>

                {/* Desktop Left Menu */}
                <div className="hidden lg:block w-full lg:w-1/3">
                    <div className="space-y-4">
                        <div
                            onClick={handlePrevious}
                            className={`flex ml-[30px] items-center gap-2 cursor-pointer ${dropdown_data.findIndex(item => item.title === selectedData.title) === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <img src="/icons/mingcute_dow-line.svg" alt="Previous" className="w-8 h-8" />
                        </div>
                        {dropdown_data.map((item, index) => (
                            <div
                                className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${selectedData.title === item.title ? "scale-110" : "opacity-70 hover:opacity-100"}`}
                                key={index}
                                onClick={() => setSelectedData(item)}
                            >
                                <span className={`text-xl ${selectedData.title === item.title ? "font-[600]" : ""}`}>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                        <div
                            onClick={handleNext}
                            className={`flex ml-[30px] items-center gap-2 cursor-pointer ${dropdown_data.findIndex(item => item.title === selectedData.title) === dropdown_data.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <img src="/icons/mingcute_down-line.svg" alt="Next" className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Center Image */}
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 flex justify-center">
                    <img
                        src={selectedData.image}
                        alt={selectedData.title}
                        className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[302px] h-auto"
                    />
                </div>

                {/* Right Content */}
                <div className="w-full md:w-2/3 lg:w-1/3 text-center lg:text-left lg:pl-4 xl:pl-8">
                    <h3 className="text-xl sm:text-2xl md:text-[24px] font-[600] text-[#4A4B4F] mb-3 md:mb-4">
                        {selectedData.sub_heading}
                    </h3>
                    <p className="text-base sm:text-lg text-[#4A4B4F] mb-6 md:mb-8">
                        {selectedData.description}
                    </p>
                    <button
                        onClick={() => { navigate("/signup") }}
                        className="bg-[#4F7DDD] hover:bg-blue-600 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
                    >
                        Explore Our Programs
                    </button>
                </div>
            </div>

            {/* Mobile Category Pills (Small Screens Only) */}
            <div className="flex lg:hidden flex-wrap justify-center gap-2 mt-6 px-2">
                {dropdown_data.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedData(item)}
                        className={`px-3 py-1 rounded-full text-sm border transition-all ${selectedData.title === item.title
                                ? "bg-[#4F7DDD] text-white border-[#4F7DDD]"
                                : "bg-white text-[#4A4B4F] border-gray-300 hover:border-[#4F7DDD]"
                            }`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ForThis;