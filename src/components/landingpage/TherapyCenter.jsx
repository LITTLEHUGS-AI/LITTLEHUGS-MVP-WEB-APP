import Navbar from '../common/Navbar.js';
import { Link } from 'react-router-dom';


export default function TherapyCenter() {
    return (
        <div className="min-h-screen font-quicksand bg-white">

            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#FFC655] px-6 py-16">
                <div className="max-w-7xl mx-auto flex items-center">
                    <div className="flex-1">
                        <p className="text-lg text-gray-700 mb-2">OUR LITTLEHUGS FOR THERAPY CENTERS</p>
                        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                            Enhance Every Session. Empower Every Client.
                        </h1>
                        <p className="text-gray-700 mb-8 max-w-md">
                            A gentle, science-backed digital tool to help therapists understand and support their clients between visits — with emotional check-ins, self-care routines, and early signal detection.
                        </p>
                        <Link to="/signup" className="bg-gray-800 text-white px-6 py-3 rounded-3xl hover:bg-gray-700 transition-colors">
                            Partner with Us
                        </Link>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="bg-[#FFFAE2] rounded-full p-10 w-80 h-80 flex items-center justify-center">
                            <img alt="Therapy Center" src='/images/therapy/therapy.png' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Early Detection Section */}
            <div className="bg-[#FAF3ED] my-16 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-12">
                        Current Early Detection - Powered by Evelyn & Materna
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Evelyn Section */}
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-6">Evelyn: Risk Monitor</h3>
                            <img alt="Therapy Center" className='h-48 mx-auto mb-6' src='/images/therapy/th1.png' />
                            <ul className="text-left font-semibold space-y-2 text-md">
                                <li>• Detects early warning signs of child development such as:</li>
                                <li className="ml-4 !mt-0">◦ Autism Spectrum Disorder (ASD)</li>
                                <li className="ml-4 !mt-0">◦ Attention Deficit Disorder (ADD)</li>
                                <li className="ml-4 !mt-0">◦ Speech Delay</li>
                                <li className="ml-4 !mt-0">◦ Receptive Language Disorder (Difficulty Understanding Language)</li>
                                <li className="ml-4 !mt-0">◦ Expressive Language Disorder (Difficulty Expressing thoughts and ideas)</li>
                                <li>• Continuously analyses check-in trends to alert clients ("red flag warnings"), enabling preventive care and session prep.</li>
                            </ul>
                        </div>

                        {/* Materna Section */}
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-6">Materna: Postpartum Support and Women's Wellness</h3>
                            <img alt="Therapy Center" className='h-48 mx-auto mb-6' src='/images/therapy/th2.png' />
                            <ul className="text-left font-semibold space-y-2 text-md">
                                <li>• Designed for postpartum and women's wellness</li>
                                <li>• Helps to cope with Postpartum Depression (PPD), Postpartum Anxiety Disorder, Postpartum OCD (Obsessive-Compulsive Disorder), Postpartum Fatigue Syndrome, Postpartum Thyroiditis, Reactive Attachment Disorder, Postpartum Rage, Postpartum Thyroid disorders (Hyperthyroidism & Hypothyroidism), Nutrient Deficiencies (Iron, Vitamin D, Omega-3, etc.)</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Why Therapy Centers Choose LittleHugs */}
            <div className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        Why Therapy Centers Choose LittleHugs
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th3.png' />
                            <h3 className="font-semibold mb-2">Empower clients with self-guided, AI-backed check-ins</h3>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th4.png' />
                            <h3 className="font-semibold mb-2">Track emotional trends and progress ethically</h3>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th5.png' />
                            <h3 className="font-semibold mb-2">Offer extended care between sessions</h3>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th6.png' />
                            <h3 className="font-semibold mb-2">Strengthen engagement with light digital tools</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">How it works?</h2>

                    <div className="flex justify-center">
                        <div className="grid md:grid-cols-3 text-xl gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg text-center">
                                <p>1. Sign Up to our Program</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-lg text-center">
                                <p>2. Invite Therapist</p>
                            </div>

                            <div className="bg-blue-100 p-4 rounded-lg text-center">
                                <p>3. Therapist invites users</p>
                            </div>

                            <div className="md:col-span-3 flex justify-center gap-4">
                                <div className="bg-blue-100 p-4 rounded-lg text-center w-full md:w-1/3">
                                    <p>4. Users taking the assessment</p>
                                </div>

                                <div className="bg-blue-100 p-4 rounded-lg text-center w-full md:w-1/3">
                                    <p>5. Therapist gets insights and Early detection notification</p>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>

            {/* Who is it for */}
            <div className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-2">Who is it for?</h2>

                    <div className="flex items-center justify-center">
                        <img alt="Therapy Center" className='h-80' src='/images/therapy/th7.png' />
                        <div className="text-center">
                            <ul className="inline-block text-left text-lg space-y-2">
                                <li>• Psychologists & Family Therapists</li>
                                <li>• Developmental & Parenting Coaches</li>
                                <li>• Women's Wellness Centers</li>
                                <li>• Mental Health NGOs & Community Clinics</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* What You Get */}
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-12">What You Get</h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th8.png' />
                            <h3 className="font-semibold text-xl mb-2">Client Companion App</h3>
                            <ul className="text-lg ml-6 text-left">
                                <li>• Daily check-ins</li>
                                <li>• Calming tools</li>
                                <li>• Reflections for daily wellness</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th9.png' />
                            <h3 className="font-semibold text-xl mb-2">Therapist Dashboard</h3>
                            <ul className="text-lg ml-6 text-left">
                                <li>• Real-time client trends</li>
                                <li>• Red flags</li>
                                <li>• Usage reports</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th10.png' />
                            <h3 className="font-semibold text-xl mb-2">Self-Care Routines</h3>
                            <ul className="text-lg ml-6 text-left">
                                <li>• Daily grounding</li>
                                <li>• Parenting support tools — easy to follow</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <img alt="Therapy Center" className='w-16 h-16 mx-auto mb-4' src='/images/therapy/th11.png' />
                            <h3 className="font-semibold text-xl mb-2">Co-Branded Access</h3>
                            <ul className="text-lg ml-6 text-left">
                                <li>• Your practice name / logo for a professional handover experience</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="relative bg-[#fef8e6] overflow-hidden mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
                {/* Curve Top */}
                <div className="absolute top-0 left-0 w-full">
                    <svg
                        className="w-full h-auto"
                        height="100"
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

                {/* Footer Content */}
                <div className="relative flex flex-col items-center max-w-6xl mx-auto space-between sm:gap-10 md:gap-0 md:flex-row md:justify-around md:items-start lg:items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">

                    {/* Left - Who We Serve */}
                    <div className="text-center md:text-left space-y-1 sm:space-y-2">
                        <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800 mb-1 sm:mb-2">Who We Serve</h3>
                        <ul className="font-normal font-quicksand text-base sm:text-lg md:text-xl text-gray-600 space-y-0.5 sm:space-y-1">
                            <li>Clinics</li>
                            <li>Schools</li>
                            <li>NGO</li>
                            <li>Therapy Centers</li>
                            <li>Corporate</li>
                        </ul>
                    </div>

                    <div className="h-[200px] px-1 overflow-hidden mb-4">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/BNeo814cXzE"
                            title="Little Hugs Partnership Program"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Center - Get LittleHugs */}
                    <div className="mb-0 sm:mb-4 md:mb-9 text-center">
                        <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800">Get LittleHugs</h3>
                        <Link to="/signup">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white mt-2 sm:mt-3 md:mt-4 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition text-sm sm:text-base">
                                Get a Demo
                            </button>
                        </Link>
                    </div>

                </div>
            </div>


        </div>
    );
}