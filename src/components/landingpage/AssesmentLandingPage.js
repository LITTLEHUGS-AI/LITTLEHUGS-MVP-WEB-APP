import React from 'react';
import { useState } from 'react';
import Navbar from '../common/Navbar';
import WellnessAssessment from "./WellnessAssessment";
import { useNavigate } from 'react-router-dom';



function AssesmentLandingPage() {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false);

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

                <div
                    className="py-16 px-[22px] relative overflow-hidden bg-[#E8E0F3]"
                    style={{
                        backgroundImage: "url('/images/assessment.png')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right bottom',
                    }}
                >

                    {/* Cards */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 z-10 relative">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF3ED] w-[350px] h-[400px] border border-gray-300 rounded-xl shadow-md p-6 max-w-sm flex flex-col items-center text-center"
                            >
                                <h3 className="text-2xl font-medium font-quicksand text-gray-800 mb-6">
                                    {card.title}
                                </h3>
                                <p className="text-[16px] font-normal font-quicksand text-gray-600 mb-6">
                                    {card.description}
                                </p>
                                <button onClick={() => {
                                    if (index === 0) {
                                        setShowPopup(true)
                                    } else {
                                        navigate("/contact")
                                    }
                                }}
                                    className="bg-[#1E2C2B] text-white py-2 mt-10 px-6 mb-6 rounded-full hover:bg-[#111818] transition"
                                >
                                    Learn more
                                </button>
                            </div>
                        ))}
                    </div>
                    {showPopup && <WellnessAssessment onClose={() => setShowPopup(false)} />}
                </div>


                <div className="bg-white py-12 px-6 md:px-20 lg:px-32 font-medium font-quicksand">
                    <p className="text-gray-800 text-[16px] leading-relaxed font-quicksand mb-2">
                        At LittleHugs, we believe that every woman, parent, and caregiver deserves support they can trust—
                        without the overwhelm of medical jargon or the pressure of a diagnosis.
                    </p>
                    <p className="text-gray-800 text-[16px] leading-relaxed font-quicksand">
                        That’s why we’ve built our self-check tools with compassion, clarity, and evidence-based insight—
                        in collaboration with experts in emotional health, child development, hormonal wellness, and more.
                    </p>
                </div>

                <section className="w-full bg-white mt-[40px] py-10 font-quicksand">
                    <h2 className="text-center text-3xl font-semibold text-[#4A4B4F] mb-8">
                        What Our Tools Are (and What They’re Not)
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-20 items-center">
                        {/* Text Section */}
                        <div className="w-full lg:w-1/2 text-[#4A4B4F] space-y-4 text-lg">
                            <p>
                                Our tools are not medical tests or diagnostic evaluations—and they’re not meant to replace professional advice.
                            </p>
                            <p>
                                They are gentle, science-informed, and stigma-free self-assessments designed to help you reflect, notice early signs, and better understand your or your child’s well-being.
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
                                src="/images/assesment_1.svg" // Update this path based on your asset
                                alt="Tool Illustration"
                                className="rounded-lg w-full max-w-[500px] bg-[#FAF3ED]"
                            />
                        </div>
                    </div>
                </section>

                <div className="w-full px-5 mx-auto mt-[55px] font-quicksand flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-semibold mb-16 mt-8 text-center">
                        How Each Tool is Developed
                    </h2>

                    <div className="flex justify-between gap-[64px]">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center gap-[28px]"
                            >
                                <img
                                    src={`${item.img}`}
                                    alt={`Care ${index + 1}`}
                                    className="w-24 h-24 mb-4"
                                />
                                <p className="text-xl font-normal text-[#4A4B4F]">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="w-full bg-white mt-[68px] py-10 px-4 text-center font-quicksand">
                    <h2 className="text-2xl md:text-3xl text-center font-semibold text-[#4A4B4F]">
                        We’re Building This Together
                    </h2>
                    <p className="mt-7 text-[#4A4B4F] text-center ">
                        Your feedback helps us grow. If something feels unclear or you’d like to see a new tool, we’re listening.
                    </p>

                    <div className="mt-8 space-y-2">
                        <p className="text-xl text-[#4A4B4F] font-medium">
                            Join our Early User Feedback Circle or send us a message.
                        </p>
                        <p className="text-xl text-[#4A4B4F] font-medium">
                            You’re not just a user—you’re a co-creator in shaping LittleHugs.
                        </p>
                    </div>

                    {/* Image below content */}
                    <div className="mt-10 flex justify-center">
                        <img
                            src="/images/assesment_2.svg" // Replace with your actual image path
                            alt="Feedback Icon"
                            className="w-40 h-40 rounded-full bg-[#FFF9E8] p-4"
                        />
                    </div>

                    {/* Join Button */}
                    <div className="mt-8">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition">
                            Join
                        </button>
                    </div>
                </section>

                <div
                    className="w-full text-center text-gray-700 py-16 px-4"
                    style={{
                        backgroundImage: "url('/images/assesment_3.png')",

                    }}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        LittleHugs is here to help you understand, not diagnose.
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                        Everything we build is rooted in care, backed by science, and designed for the real you.
                    </p>
                </div>

            </div>

        </div>
    )
}
export default AssesmentLandingPage;
