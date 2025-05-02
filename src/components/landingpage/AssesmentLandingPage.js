import React from 'react';
import { useState } from 'react';
import Navbar from '../common/Navbar';
import WellnessAssessment from "./WellnessAssessment";
import { useNavigate } from 'react-router-dom';

function AssesmentLandingPage() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");

    const cards = [
        {
            title: "LittleHugs 360° Women's Wellness Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman's mental health, emotional resilience, self-care capacity, and support system.",
        },
        {
            title: "LittleHugs 360° Children's Wellness Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman's mental health, emotional resilience, self-care capacity, and support system.",
        },
        {
            title: "Universal SEL Assessment",
            description:
                "A high-level mind-body-social scan that gives a complete picture of a woman's mental health, emotional resilience, self-care capacity, and support system.",
        },
    ];

    const features = [
        {
            title: "Rooted in science",
            img: "/images/make_1.svg",
        },
        {
            title: "Built with Experts",
            img: "/images/make_2.svg",
        },
        {
            title: "Translated for Real Life-free insights",
            img: "/images/assesment_4.svg",
        },
        {
            title: "Reviewed Before Release",
            img: "/images/assesment_5.svg",
        },
    ];

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                {/* Cards Section */}
                <div className="py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden bg-[#E8E0F3]">
                    <div className="flex flex-col gap-6 md:gap-8 z-10 relative mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FAF3ED] border border-[#26323866] rounded-xl p-6 md:p-8 flex flex-col items-center text-center h-full"
                                >
                                    <h3 className="text-lg md:text-xl font-semibold text-center font-quicksand text-gray-800 mb-4 md:mb-6 leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base font-medium font-quicksand text-gray-600 mb-6 md:mb-8 flex-grow">
                                        {card.description}
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (index === 0) {
                                                setTitle(1)
                                            } else if (index === 1) {
                                                setTitle(2)
                                            } else if (index === 2) {
                                                setTitle(3)
                                            }
                                            setShowPopup(true);
                                        }}
                                        className="bg-[#1E2C2B] text-white py-2 md:py-3 px-6 md:px-8 rounded-full hover:bg-[#111818] transition w-full max-w-[180px] text-sm md:text-base"
                                    >
                                        Learn more
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {showPopup && <WellnessAssessment 
                        onClose={() => setShowPopup(false)}
                        heading={title}
                    />}
                </div>

                {/* Introduction Section */}
                <div className="bg-white mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
                    <div className="max-w-6xl mx-auto">
                        <p className="text-gray-800 text-lg md:text-xl lg:text-2xl font-normal font-quicksand mb-4">
                            At LittleHugs, we believe that every woman, parent, and caregiver deserves support they can trust—
                            without the overwhelm of medical jargon or the pressure of a diagnosis.
                        </p>
                        <p className="text-gray-800 text-lg md:text-xl lg:text-2xl font-normal font-quicksand">
                            That's why we've built our self-check tools with compassion, clarity, and evidence-based insight—
                            in collaboration with experts in emotional health, child development, hormonal wellness, and more.
                        </p>
                    </div>
                </div>

                {/* What Our Tools Are Section */}
                <section className="w-full bg-white mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-[#4A4B4F] mb-6 md:mb-8">
                            What Our Tools Are (and What They're Not)
                        </h2>
                        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-center">
                            {/* Text Section */}
                            <div className="w-full lg:w-1/2 text-[#4A4B4F] space-y-3 md:space-y-4 text-base md:text-lg">
                                <p>
                                    Our tools are not medical tests or diagnostic evaluations—and they're not meant to replace professional advice.
                                </p>
                                <p>
                                    They are gentle, science-informed, and stigma-free self-assessments designed to help you reflect, notice early signs, and better understand your or your child's well-being.
                                </p>
                                <p>
                                    Think of them as your private, expert-informed check-ins—translated into simple, everyday language, and designed to meet you where you are.
                                </p>
                                <ul className="list-disc list-inside space-y-1 pt-2">
                                    <li>Is grounded in validated research and recognized frameworks</li>
                                    <li>Provides personalized insights without judgment</li>
                                    <li>
                                        Offers gentle next steps—like a self-care tip, journaling prompt, or guidance on when to seek professional support
                                    </li>
                                </ul>
                            </div>

                            {/* Image Section */}
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <img
                                    src="/images/assesment_1.svg"
                                    alt="Tool Illustration"
                                    className="rounded-lg w-full max-w-[400px] md:max-w-[500px] bg-[#FAF3ED]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* How Tools Are Developed Section */}
                <div className="w-full mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8 text-center">
                            How Each Tool is Developed
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                            {features.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center gap-4 md:gap-6"
                                >
                                    <img
                                        src={`${item.img}`}
                                        alt={`Care ${index + 1}`}
                                        className="w-16 md:w-20 lg:w-auto"
                                    />
                                    <p className="text-sm md:text-base lg:text-xl font-normal text-[#4A4B4F]">{item.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Building Together Section */}
                <section className="w-full bg-white mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] text-center font-quicksand">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-semibold text-[#4A4B4F]">
                            We're Building This Together
                        </h2>
                        <p className="mt-4 md:mt-6 text-[#4A4B4F] text-center text-sm md:text-base">
                            Your feedback helps us grow. If something feels unclear or you'd like to see a new tool, we're listening.
                        </p>

                        <div className="mt-6 md:mt-8 space-y-2">
                            <p className="text-base md:text-lg lg:text-xl text-[#4A4B4F] font-medium">
                                Join our Early User Feedback Circle or send us a message.
                            </p>
                            <p className="text-base md:text-lg lg:text-xl text-[#4A4B4F] font-medium">
                                You're not just a user—you're a co-creator in shaping LittleHugs.
                            </p>
                        </div>

                        {/* Image below content */}
                        <div className="mt-6 md:mt-10 flex justify-center">
                            <img
                                src="/images/assesment_2.svg"
                                alt="Feedback Icon"
                                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-[#FFF9E8] p-3 md:p-4"
                            />
                        </div>

                        {/* Join Button */}
                        <div className="mt-6 md:mt-8">
                            <button
                                onClick={() => navigate("/contact")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 md:px-6 py-2 rounded-full transition text-sm md:text-base"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Bottom Curved Section */}
            <div className="h-[10px] mt-12 md:mt-[120px]"></div>
            <div className="relative bg-[#fef8e6] overflow-hidden px-4 sm:px-6 md:px-[80px]">
                {/* Curve Top */}
                <div className="absolute top-0 left-0 w-full">
                    <svg
                        className="w-full"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
                        ></path>
                    </svg>
                </div>

                <div className='flex flex-col items-center justify-center px-4 sm:px-6 py-10'>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 mt-8 md:mt-12 lg:mt-16 text-center">
                        LittleHugs is here to help you understand, not diagnose.
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto text-center">
                        Everything we build is rooted in care, backed by science, and designed for the real you.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AssesmentLandingPage;