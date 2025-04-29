import React from 'react'
import Navbar from '../common/Navbar'
import LandingHeader from './LandingHeader'
import ForThis from './ForThis'
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
            <div className="w-full px-5 font-quicksand text-center text-gray-800 mt-5 flex flex-col items-center p-4">
                <h2 className="text-4xl font-medium text-[#4A4B4F] mb-10">How our warm hug will help you?</h2>
                <img src="/images/for_3.svg" alt="Landing Page" className="w-full" />
            </div>
            {/* <HugSelection /> */}
            {/* <div className="w-full font-quicksand text-center text-gray-800 mt-5 flex flex-col items-center">
                <img src="/images/parsonal_landing_section2.png" alt="Landing Page" className="w-full" />
            </div> */}
            <section className="w-full px-5 font-quicksand text-800 mt-[60px]">
                <h2 className="text-4xl font-medium font-quicksand text-[#4A4B4F] text-center">What hug do you need today?</h2>
                {/* <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8 mb-8 max-w-7xl mx-auto px-10">
                    <div className="rounded-lg p-6">
                        <img
                            src="/images/happier_health.svg"
                            alt="Haritha Vijay"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                    </div>
                    <div className="rounded-lg p-6">
                        <img
                            src="/images/happier_health.svg"
                            alt="Haritha Vijay"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                    </div>
                    <div className="rounded-lg p-6">
                        <img
                            src="/images/happier_health.svg"
                            alt="Haritha Vijay"
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                    </div>
                </div> */}
                <div className="bg-[#FFFFFF] py-16 px-[22px] relative overflow-hidden">


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
            </section>
            <div className="w-full h-[480px] font-quicksand px-20 bg-[#FFFAE2] pt-4">
                <div className="flex gap-4 justify-between">
                    <div className="flex flex-col gap-3 justify-normal w-1/2">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[32px] leading-8 font-normal mb-4 text-[#4A4B4F]">
                                Stay Updated
                            </h1>
                            <p className=''>Be the first to get updates on our latest content, special offers, and new features. By signing up, you’re agreeing to receive marketing emails from LittleHugs. You can unsubscribe at any time. For more details, check out our Privacy Policy.</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex gap-4 relative justify-center items-center">
                        <div className="w-full">
                            <input className="w-full border border-[#263238] rounded-[8px] px-4 py-2 bg-transparent" type="text" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <button className="bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-between mt-[50px]">
                    <div className="flex gap-3 justify-normal w-1/2">
                        <div className="w-1/2 flex flex-col gap-3">
                            <h1 className="text-[32px] leading-8 font-normal mb-4 text-[#4A4B4F]">
                                Get LittleHugs
                            </h1>
                            <p className='text-[18px] font-normal text-[#4A4B4F]'>
                                Try for free <br />
                                Our Plans <br />
                                Personal Plan <br />
                                Partner Plan <br />
                                Check Assessments <br />
                            </p>
                        </div>
                        <div className="w-1/2 flex flex-col gap-3">
                            <h1 className="text-[32px] leading-8 font-normal mb-4 text-[#4A4B4F]">
                                My LittleHugs
                            </h1>
                            <button className="w-fit bg-[#4F7DDD] text-white px-6 py-2 rounded-full">
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 flex gap-4 relative justify-center items-center">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalLandingPage
