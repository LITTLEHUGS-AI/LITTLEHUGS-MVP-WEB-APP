import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import LandingHeader from './LandingHeader';
import { Link } from "react-router-dom";


function PartenerLandingPage() {
  const accordionData = [
    {
      title: "Prescreening & Risk Detection Tools",
      content: [
        "AI-powered prescreening forms for women (PPD, PPA, OCD, fatigue, burnout) and children (ASD, ADHD, speech/motor delays)",
        "Auto-tagging of red flags with “RAG” (Red-Amber-Green) risk scores",
        "Auto-referral suggestions to therapists, pediatricians, or gynecologists",
      ],
    },
    {
      title: "AI Engines", content: [
        "EarlyCare.AI: Pediatric milestone co-pilot for growth tracking & delay alerts",
        "Materna.AI: Gynecologist tool for postpartum mood, nutrition, thyroid issues",
        "Evalyn: ABA therapist assistant with structured behavioral insights"
      ]
    },
    {
      title: "Report Generation & Summaries", content: [
        "Auto-generated, evidence-backed reports with trendlines and benchmarks",
        "Integrated with global guidelines (WHO, IAP, CDC, NICE, ACOG)",
        "Ready-to-share summaries for EMR or teleconsultation platforms"
      ]
    },
    {
      title: "Partner Dashboards & Analytics", content: [
        "Role-based access for pediatricians, OB-GYNs, NGOs, and educators",
        "Track engagement, screening outcomes, flagged risks, and wellness metrics",
        "HIPAA/GDPR-compliant storage & API-ready for EMR/LMS sync"
      ]
    },
    {
      title: "White-Labeled Mobile Experiences", content: [
        "Custom onboarding for different roles (mother, child, co-caregiver, teen)",
        "Daily nudges + suggested wellness routines tailored by age & concern",
        "Multilingual, culturally adaptive interface with visual summaries"
      ]
    },
    {
      title: "Integrated Telehealth", content: [
        "Secure video consults, real-time data sync",
        "Session notes + report upload functionality",
        "Coordination between parent, child specialist, and mental health professional"
      ]
    },
  ];

  // 👇 Moved useState here
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LandingHeader
        image='/images/partner_part_2.svg'
        bg_color="#FFC655"
        sub_title="LITTLEHUGS FOR PARTNERS"
        title="Screen Smarter. Support Sooner"
        description="Whether you're a mother, caregiver, or growing child—LittleHugs brings AI-powered wellness, smart screening, and daily care routines to your fingertips"
        button_text="Book a Demo"
      />

      <div className="relative flex flex-col lg:flex-row font-quicksand justify-between items-center gap-6 mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src="/images/partner_part_3.svg"
            alt="Step 1"
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto lg:h-[600px] object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 mt-6 lg:mt-7 lg:mr-[85px] px-0 sm:px-4 py-6 sm:py-8 md:py-12">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-quicksand font-medium text-gray-800 mb-3 sm:mb-4 md:mb-[20px]">Why LittleHugs?</h2>
          <p className="uppercase text-base sm:text-lg md:text-[20px] font-quicksand font-medium text-gray-500 tracking-widest mb-4 sm:mb-5 md:mb-6">
            It's time for mindfulness
          </p>

          {/* Accordions */}
          <div className="space-y-3 sm:space-y-4 font-quicksand font-medium text-2xl sm:text-3xl md:text-[38px]">
            {accordionData.map((item, index) => (
              <div key={index} className="border-b pb-3 sm:pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg sm:text-xl md:text-[25px] font-medium text-gray-800">{item.title}</h3>
                  <span className="text-base sm:text-lg md:text-xl">{openIndex === index ? "▾" : "▸"}</span>
                </div>

                {openIndex === index && item.content.length > 0 && (
                  <ul className="mt-2 sm:mt-3 md:mt-4 font-quicksand list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-base sm:text-lg md:text-xl">
                    {item.content.map((point, idx) => (
                      <li key={idx} className="pl-2">{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6 items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        {/* Heading */}
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-medium font-quicksand text-center mb-6 sm:mb-8 md:mb-12">
          Request a demo to learn more about how we can support your team
        </h1>

        {/* Content */}
        <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 gap-8 sm:gap-10 md:gap-16 w-full max-w-5xl">

          {/* Left Circle */}
          <img
            src="/images/partner_part_4.svg"
            alt=""
            className="w-full max-w-[250px] sm:max-w-[320px] md:max-w-[400px]"
          />

          {/* Right Form */}
          <form className="w-full max-w-md space-y-3 sm:space-y-4">
            {/* Organisation Type */}
            <select className="w-full p-2.5 sm:p-3 border rounded-md text-gray-600">
              <option>Organisation Type</option>
              <option>School</option>
              <option>Clinic</option>
              <option>Other</option>
            </select>

            {/* Name */}
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2.5 sm:p-3 border rounded-md"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2.5 sm:p-3 border rounded-md"
            />

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2.5 sm:p-3 border rounded-md pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                👁️
              </div>
            </div>

            {/* Country and Language Preference */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select className="w-full sm:w-1/2 p-2.5 sm:p-3 border rounded-md text-gray-600">
                <option>Country</option>
                <option>USA</option>
                <option>India</option>
                <option>UK</option>
              </select>
              <select className="w-full sm:w-1/2 p-2.5 sm:p-3 border rounded-md text-gray-600 mt-3 sm:mt-0">
                <option>Language Preference</option>
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>

            {/* Checkbox */}
            <div className="flex items-start pt-5 sm:pt-6 md:pt-10 gap-3 sm:gap-4 md:gap-7 text-xs sm:text-sm font-quicksand font-bold text-gray-600">
              <input type="checkbox" className="mt-1" />
              <p>
                I agree to LittleHugs's <span className="underline cursor-pointer">Terms & Conditions</span> and acknowledge
                the <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>

            {/* Submit Button */}
            <button
              disabled
              className="w-full sm:w-auto sm:min-w-[120px] md:min-w-[150px] px-4 sm:px-5 py-2.5 sm:py-3 md:pt-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition mt-4"
            >
              Submit
            </button>
          </form>

        </div>
      </div>

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
        <div className="relative flex flex-col items-center gap-8 sm:gap-10 md:gap-0 md:flex-row md:justify-around md:items-start lg:items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">

          {/* Left - Who We Serve */}
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800 mb-1 sm:mb-2">Who We Serve</h3>
            <ul className="font-normal font-quicksand text-base sm:text-lg md:text-xl text-gray-600 space-y-0.5 sm:space-y-1">
              <li>Clinics</li>
              <li>Schools</li>
              <li>NGO</li>
              <li>Therapy Centers</li>
              <li>Agency</li>
            </ul>
          </div>

          {/* Center - Get LittleHugs */}
          <div className="mb-0 sm:mb-4 md:mb-9 text-center">
            <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800">Get LittleHugs</h3>
            <Link to="/contact">
              <button className="bg-blue-500 hover:bg-blue-600 text-white mt-2 sm:mt-3 md:mt-4 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition text-sm sm:text-base">
                Get a Demo
              </button>
            </Link>
          </div>

          {/* Right - Support */}
          {/* Commented out as in original code */}
          {/* <div className="text-center md:text-right space-y-1 sm:space-y-2">
      <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800 mb-1 sm:mb-2">Support</h3>
      <ul className="font-normal font-quicksand text-base sm:text-lg md:text-xl text-gray-600 space-y-0.5 sm:space-y-1">
        <li>FAQ</li>
        <li>Help</li>
      </ul>
    </div> */}

        </div>
      </div>
    </div>
  );
};

export default PartenerLandingPage;
