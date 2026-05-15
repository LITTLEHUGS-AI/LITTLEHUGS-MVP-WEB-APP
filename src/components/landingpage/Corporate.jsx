import React from 'react';
import Navbar from '../common/Navbar';
import { useWaitlist } from '../../lib/WaitlistContext';

export default function CorporateLandingPage() {
  const { openWaitlist } = useWaitlist();
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#4F7DDD] text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <p className="text-xl mb-4 opacity-90">OUR LITTLEHUGS FOR CORPORATES</p>
              <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                Recognize early. Respond early
              </h1>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Our platform provides preventive, personalized, and stigma-free emotional care, helping your people feel seen, supported, and stronger — before things break down.
              </p>
              <button onClick={openWaitlist} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Partner with Us
              </button>
            </div>
            <div className="hidden md:block">
              <div className="w-80 h-80 bg-cream-100 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-yellow-50 rounded-full"></div>
                <div className="relative z-10">
                  <img className='p-6' alt='corporate' src='/images/corporate/c1.png' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What's Included in the Corporate Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
                <img alt="corporate" src='/images/corporate/plan1.png' />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Emotional Wellness</h3>
              <p className="text-gray-600 text-sm">Check-ins</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
                  <img alt="corporate" src='/images/corporate/plan2.png' />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Parental Support Tools</h3>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
                  <img alt="corporate" src='/images/corporate/plan3.png' />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">Wellness Insights</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
                <img alt="corporate" src='/images/corporate/plan4.png' />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Actionable Care</h3>
              <p className="text-gray-600 text-sm">Journeys</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
                <img alt="corporate" src='/images/corporate/plan5.png' />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Anonymized Org-Level</h3>
              <p className="text-gray-600 text-sm">Reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Benefits Section */}
      <div className="py-16 bg-[#FAF3ED]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            A Powerful Addition to Your Employee Benefit Package
          </h2>
          <div className="flex items-center justify-around">
            <div className="w-68 h-68 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <img alt='corporate' src='/images/corporate/hands.png' />
            </div>
            <ul className="space-y-3 text-xl text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>100% confidential, inclusive care</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Meaningful benefits for women, parents & caregivers</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Improves employee retention & morale</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Supports hybrid, remote & return-to-work models</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Reinforces your DEI & ESG commitment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits for HR Leaders */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-[#4A4B4F] mb-12">
            Benefits for HR Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Proactive Burnout Prevention */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img alt='corporate' src='/images/corporate/hr1.png' />
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Proactive Burnout Prevention</h3>
              <ul className="px-4 font-semibold text-sm text-gray-600 space-y-2 text-left">
                <li>• Identify emotional fatigue early via non-intrusive check-ins</li>
                <li>• Reduce sick leaves, attrition, and quiet quitting</li>
              </ul>
            </div>

            {/* Enhanced Employee Benefit Portfolio */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img alt='corporate' src='/images/corporate/hr2.png' />
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Enhanced Employee Benefit Portfolio</h3>
              <ul className="px-4 font-semibold text-sm text-gray-600 space-y-2 text-left">
                <li>• Add a unique emotional wellness layer to your existing benefits</li>
                <li>• Especially valuable for women, working parents, and caregivers</li>
              </ul>
            </div>

            {/* Support Return-to-Work & Caregiver Transitions */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img alt='corporate' src='/images/corporate/hr3.png' />
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Support Return-to-Work & Caregiver Transitions</h3>
              <ul className="px-4 font-semibold text-sm text-gray-600 space-y-2 text-left">
                <li>• Help employees navigate postpartum, parental leave, or caregiving stress</li>
                <li>• Improves retention of top talent during life-stage shifts</li>
              </ul>
            </div>

            {/* Data-Driven Culture Insights */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img alt='corporate' src='/images/corporate/hr4.png' />
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-4">Data-Driven Culture Insights</h3>
              <ul className="px-4 font-semibold text-sm text-gray-600 space-y-2 text-left">
                <li>• Access anonymized dashboards on engagement, wellness trends, and red flags</li>
                <li>• Inform policy changes with real emotional analytics (no guesswork)</li>
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
            <button onClick={openWaitlist} className="bg-blue-500 hover:bg-blue-600 text-white mt-2 sm:mt-3 md:mt-4 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition text-sm sm:text-base">
                Get a Demo
              </button>
          </div>

        </div>
      </div>

    </div>
  );
}