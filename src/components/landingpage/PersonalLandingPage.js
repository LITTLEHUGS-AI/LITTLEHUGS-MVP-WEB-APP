import React, { useState } from 'react'
import Navbar from '../common/Navbar'
import LandingHeader from './LandingHeader'
import ForThis from './ForThis'
import { useNavigate } from 'react-router-dom';
import WellnessAssessment from './WellnessAssessment';
import { Link } from 'react-router-dom';
// import HugSelection from './HugSelection'

function PersonalLandingPage() {
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
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <LandingHeader
                image='/images/for_1.svg'
                bg_color="#FAF3ED"
                title="A hug for every stage of life"
                description="Whether you're a mother, caregiver, or growing child—LittleHugs brings AI-powered wellness, smart screening, and daily care routines to your fingertips"
            />
            <ForThis />
            <div className="w-full px-[80px] mt-[120px] font-quicksand text-center text-gray-800 flex flex-col items-center p-4">
                <h2 className="text-4xl font-medium text-[#4A4B4F] mb-10">How our warm hug will help you?</h2>
                <img src="/images/for_3.svg" alt="Landing Page" className="w-full" />
            </div>
            {/* <HugSelection /> */}
            {/* <div className="w-full font-quicksand text-center text-gray-800 mt-5 flex flex-col items-center">
                <img src="/images/parsonal_landing_section2.png" alt="Landing Page" className="w-full" />
            </div> */}
            <section className="w-full px-[80px] mt-[120px] font-quicksand text-800">
                <h2 className="text-4xl font-medium font-quicksand text-[#4A4B4F] text-center">What hug do you need today?</h2>
                <div className="bg-[#FFFFFF] py-16 px-[22px] relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 z-10 relative mx-auto max-w-7xl">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-[#FAF3ED] w-full md:w-[360px] border border-[#26323866] rounded-xl p-8 flex flex-col items-center text-center flex-1 min-h-[420px]"
                            >
                                <h3 className="text-[20px] font-semibold text-center font-quicksand text-gray-800 mb-8 leading-tight">
                                    {card.title}
                                </h3>
                                <p className="text-[16px] font-medium font-quicksand text-gray-600 mb-8 flex-grow">
                                    {card.description}
                                </p>
                                <button
                                    onClick={() => {
                                        if (index === 0) {
                                            setShowPopup(true)
                                        } else {
                                            navigate("/contact")
                                        }
                                    }}
                                    className="bg-[#263238] text-white py-3 px-8 rounded-full hover:bg-[#111818] transition w-full max-w-[180px] text-base"
                                >
                                    Learn more
                                </button>
                            </div>
                        ))}
                    </div>
                    {showPopup && <WellnessAssessment onClose={() => setShowPopup(false)} />}
                </div>
            </section>
            <>
                <div className="h-[10px] mt-[120px]"></div>
                <div className="relative bg-[#fef8e6] overflow-hidden pt-20 pb-8">
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

                    <div className='flex flex-col items-center justify-center'>
                        <h2 className="text-3xl font-semibold text-[#4A4B4F] mb-6 font-quicksand">
                            Join the Movement
                        </h2>
                        <p className="text-lg max-w-3xl text-[#4A4B4F] mb-10 px-4 font-quicksand">
                            We’re building more than a platform — we’re building a world where every child feels seen early, and every caregiver feels supported. Whether you’re a school, clinic, parent, or simply someone who believes in early care, we’d love to build with you.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link to="/assesment-landing">
                                <button className="bg-[#283036] text-white px-8 py-3 rounded-full font-semibold text-lg font-quicksand hover:bg-[#1f252b] transition">
                                    Take the free test
                                </button>
                            </Link>
                            <Link to="/partener-landing">
                                <button className="border border-[#283036] text-[#283036] px-8 py-3 rounded-full font-semibold text-lg font-quicksand hover:bg-[#283036] hover:text-white transition">
                                    Partner with us
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default PersonalLandingPage
