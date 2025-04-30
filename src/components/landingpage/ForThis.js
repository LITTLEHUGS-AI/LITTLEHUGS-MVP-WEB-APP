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
        <div className="w-full px-[80px] mt-[120px] font-quicksand text-center text-gray-800 flex flex-col items-center">
            <h2 className="text-4xl font-medium text-[#4A4B4F] mb-10">Who is this for?</h2>

            <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                    <div className="space-y-4">
                        <div
                            onClick={() => handleNext()}
                            className="flex ml-[30px] items-center gap-2 cursor-pointer">
                            <img src="/icons/mingcute_down-line.svg" alt="For This" className="w-8 h-8" />
                        </div>
                        {dropdown_data.map((item, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <span className={`text-xl ${selectedData.title === item.title ? "font-[600]" : ""}`}>{item.title}</span>
                            </div>
                        ))}

                        <div
                            onClick={() => handlePrevious()}
                            className="flex ml-[30px] items-center gap-2 cursor-pointer">
                            <img src="/icons/mingcute_dow-line.svg" alt="For This" className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex">
                    <img src={selectedData.image} alt="For This" className="w-[302px] h-auto" />
                </div>

                <div className="w-full md:w-1/3 text-left md:pl-8">
                    <h3 className="text-[24px] font-[600] text-[#4A4B4F] mb-4">{selectedData.sub_heading}</h3>
                    <p className="text-lg text-[#4A4B4F] mb-8">{selectedData.description}</p>
                    <button
                        onClick={() => {navigate("/assesment-landing")}}
                        className="bg-[#4F7DDD] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full">Explore Our Assessments</button>
                </div>
            </div>
        </div>
    )
}

export default ForThis;
