import React from 'react';
import { useState } from 'react';
import Navbar from '../common/Navbar';
// import WellnessAssessment from "./WellnessAssessment"; // not needed
import WomenWellnessFlow from "./WomenWellnessFlow";
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';

function AssesmentLandingPage() {
    const [showWomenFlow, setShowWomenFlow] = useState(false);
    const { title, description } = routesConfig.assesmentLanding;


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
        <>
            <DocumentHead
                title={title}
                description={description}
                slug={routesConfig.assesmentLanding.path}
            />
            <div>
                <div className="flex flex-col min-h-screen">
                    <Navbar />

                    {/* Lead Attraction Section */}
                    <div className="py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 relative overflow-hidden bg-[#E8E0F3]">
                        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
                            <p className="text-xs md:text-sm font-semibold tracking-widest text-[#4F7DDD] uppercase mb-3 font-quicksand">Free · 5 Minutes · No Sign-Up Required</p>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1E2C2B] leading-tight font-quicksand mb-4">
                                Understand yourself in 5 minutes
                            </h1>
                            <p className="text-base md:text-lg text-[#4A4B4F] max-w-2xl mx-auto font-quicksand mb-8">
                                Answer a few honest questions. Walk away with your personal wellness score, 
                                meaningful insights across 15 life areas, and a 7-day habit plan — tailored to you.
                            </p>
                            <button
                                onClick={() => setShowWomenFlow(true)}
                                className="bg-[#4F7DDD] hover:bg-[#3d6bc9] text-white px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold text-base md:text-lg font-quicksand transition shadow-md"
                            >
                                Start My Reflection →
                            </button>
                            <p className="text-xs text-[#9ca3af] mt-3 font-quicksand">Takes 5 minutes · 100% private · No clinical diagnosis</p>
                        </div>

                        {/* 3 benefit cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            <div className="bg-[#FAF3ED] rounded-2xl p-6 md:p-8 text-center border border-[#e5d6c8]">
                                <div className="text-3xl mb-3">🌡️</div>
                                <h3 className="text-base md:text-lg font-semibold text-[#1E2C2B] font-quicksand mb-2">Know where you stand</h3>
                                <p className="text-sm text-[#6b7280] font-quicksand leading-relaxed">
                                    Get a personalised wellness score across 15 areas of life — emotional, physical, social, hormonal, and more. 
                                    See exactly where you're thriving and where you deserve more support.
                                </p>
                            </div>
                            <div className="bg-[#FAF3ED] rounded-2xl p-6 md:p-8 text-center border border-[#e5d6c8]">
                                <div className="text-3xl mb-3">🌱</div>
                                <h3 className="text-base md:text-lg font-semibold text-[#1E2C2B] font-quicksand mb-2">Your 7-day habit plan</h3>
                                <p className="text-sm text-[#6b7280] font-quicksand leading-relaxed">
                                    Walk away with 3 specific habits matched to your top wellness areas — yoga poses, 
                                    meditation practices, nutrition nudges, and self-reflection prompts designed for real life.
                                </p>
                            </div>
                            <div className="bg-[#FAF3ED] rounded-2xl p-6 md:p-8 text-center border border-[#e5d6c8]">
                                <div className="text-3xl mb-3">📈</div>
                                <h3 className="text-base md:text-lg font-semibold text-[#1E2C2B] font-quicksand mb-2">Come back and grow</h3>
                                <p className="text-sm text-[#6b7280] font-quicksand leading-relaxed">
                                    Small habits done consistently change everything. Return in 7 days and see your score shift. 
                                    Each check-in shows you how far you've come — and what to focus on next.
                                </p>
                            </div>
                        </div>

                        {showWomenFlow && <WomenWellnessFlow onClose={() => setShowWomenFlow(false)} />}
                    </div>

                    {/* Introduction Section */}
                    <div className="bg-white mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
                        <div className="max-w-6xl mx-auto">
                            <p className="text-gray-800 text-lg text-center md:text-xl lg:text-2xl font-semibold font-quicksand mb-4">At LittleHugs, we believe support should feel like care — not confusion.</p>
                            <p className="text-gray-800 text-lg md:text-xl lg:text-2xl font-normal font-quicksand mb-4">
                             Whether you're stretched thin at work, carrying a full home, or simply trying to understand how you really feel — you deserve gentle, reliable guidance.
                            </p>
                            <p className="text-gray-800 text-lg md:text-xl lg:text-2xl font-normal font-quicksand">
                               That’s why we’ve built our check-in tools with empathy, simplicity, and expert-backed insight — combining emotional, physical, social, and hormonal wellness into one easy, human-first experience.
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
                                        They are gentle, science-informed, and stigma-free self-assessments designed to help you reflect, notice how you're really doing, and better understand your own well-being.
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
                                    onClick={() => setShowWomenFlow(true)}
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
        </>
    );
}

export default AssesmentLandingPage;