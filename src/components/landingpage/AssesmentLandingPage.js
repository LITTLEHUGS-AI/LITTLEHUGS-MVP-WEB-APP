import React from 'react';
import Navbar from '../common/Navbar';


function AssesmentLandingPage() {
    const cards = [
        {
            title: "LittleHugs 360° Women’s Wellness Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman’s mental health, emotional resilience, self-care capacity, and support system.",
        },
        {
            title: "LittleHugs 360° Children’s Wellness Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman’s mental health, emotional resilience, self-care capacity, and support system.",
        },
        {
            title: "Universal SEL Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman’s mental health, emotional resilience, self-care capacity, and support system.",
        },
    ];

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="bg-[#E8E0F3] py-16 px-[22px] relative overflow-hidden">

                    {/* Top Left Decoration (Sun) */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-[#FFF6D8] rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-[#F9B233] rounded-full"></div>
                    </div>

                    {/* Bottom Right Decoration (Waves) */}
                    <div className="absolute bottom-0 right-0 flex flex-col space-y-2 pr-4 pb-4">
                        <div className="w-4 h-12 bg-[#8DD3BB] rounded-full"></div>
                        <div className="w-4 h-12 bg-[#8DD3BB] rounded-full"></div>
                        <div className="w-4 h-12 bg-[#8DD3BB] rounded-full"></div>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 z-10 relative">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF3ED] w-[350px] h-[400px] border border-gray-300 rounded-xl shadow-md p-6 max-w-sm flex flex-col items-center text-center"
                            >
                                <h3 className="text-2xl font-medium font-quicksand text-gray-800 mb-6">{card.title}</h3>
                                <p className="text-[16px] font-normal font-quicksand text-gray-600 mb-6">{card.description}</p>
                                <button className="bg-[#1E2C2B] text-white py-2 mt-10 px-6 mb-6 rounded-full hover:bg-[#111818] transition">
                                    Learn more
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    )
}
export default AssesmentLandingPage;
