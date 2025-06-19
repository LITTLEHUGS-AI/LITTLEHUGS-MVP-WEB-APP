import { Link } from "react-router-dom";
import Navbar from '../common/Navbar.js';
import routesConfig from '../../config/routesConfig.js';
import DocumentHead from '../common/DocumentHead.js';


function SchoolPartnerPage() {
  const { title, description } = routesConfig.schoolPartnerLanding;

  return (
    <>
      <DocumentHead
        title={title}
        description={description}
        slug={routesConfig.schoolPartnerLanding.path}
      />
      <div className="flex flex-col font-quicksand min-h-screen">
        <Navbar />

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-8 md:py-12 bg-[#FFC655]" >

          <div className='container flex flex-col lg:flex-row gap-4 items-center justify-between mx-auto'>
            <div className="w-full lg:max-w-[630px] text-center lg:text-left mb-8 lg:mb-0">
              <p className='text-lg sm:text-xl text-[#4A4B4F] font-medium mb-2'>
                LITTLEHUGS FOR SCHOOLS
              </p>
              <h1 className="text-3xl sm:text-3xl md:text-4xl font-medium mb-4 leading-snug text-[#4A4B4F]">
                Nuturing Emotional Wellness at Heart of Eduction
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] mb-6">
                Whether you're a pre-primary center or a K-12 institution, our platform is built to identify emotional red flags early, empower caregivers, and foster a culture of empathy and resilience.
              </p>
              <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
                <Link to='/signup' className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                  Partner with Us
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-[25rem] p-12 bg-[#FFFAE2] rounded-full flex items-center justify-center relative overflow-hidden">
                <img alt='School' src='/images/school/school.png' />
              </div>
            </div>
          </div>

        </div>


        {/* How LittleHugs Supports Section */}
        <div className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
              How LittleHugs Supports Your School Community
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Early Emotional Risk Detection */}
              <div className="text-center">
                <img alt='school' className="mx-auto mb-2 w-16 h-16" src='/images/school/sc1.png' />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Early Emotional Risk Detection</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our AI tools spot patterns that could point to anxiety, bullying stress, or developmental gaps — and offer proactive nudges before things escalate.
                </p>
              </div>

              {/* Care Journeys for Families */}
              <div className="text-center">
                <img alt='school' className="mx-auto mb-2 w-16 h-16" src='/images/school/sc2.png' />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Care Journeys for Families</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Daily nudges, calming tools, and age-appropriate parent-child routines help build consistent emotional hygiene at home.
                </p>
              </div>

              {/* Wellness Trends Dashboard */}
              <div className="text-center">
                <img alt='school' className="mx-auto mb-2 w-16 h-16" src='/images/school/sc3.png' />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Wellness Trends Dashboard</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Schools receive anonymized, consent-based emotional health trends across classes or age groups — supporting SEL programs, counselor planning, and wellbeing audits.
                </p>
              </div>

              {/* Workshops + School Events */}
              <div className="text-center">
                <img alt='school' className="mx-auto mb-2 w-16 h-16" src='/images/school/sc4.png' />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Workshops + School Events</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We offer branded SEL workshops, parenting talks, and emotional wellness sessions for students and caregivers — co-designed with your school's ethos.
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="py-8 bg-[#FFFAE2]">
          <div className="max-w-4xl mx-auto flex items-center gap-12">

            <img alt='School' src='/images/school/sc5.png' />

            <div className="flex-1">
              <ul className="space-y-4 text-2xl font-semibold ">
                <li className="flex items-start gap-3">
                  • <span className="text-gray-800">No diagnosis. No grading. No invasive testing.</span>
                </li>
                <li className="flex items-start gap-3">
                  • <span className="text-gray-800">100% child-safe, privacy-respecting platform.</span>
                </li>
                <li className="flex items-start gap-3">
                  • <span className="text-gray-800">Compliant with school data and child safety norms.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>



        <div className="py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              How to Get Started
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div className="bg-[#D9E4FC] px-6 py-2 rounded-lg text-center">
                <h3 className="font-semibold text-xl text-gray-800">1. Sign Up to our Program</h3>
              </div>

              <div className="bg-[#D9E4FC] px-6 py-2 rounded-lg text-center">
                <h3 className="font-semibold text-xl text-gray-800">2. Choose your engagement model</h3>
              </div>

              <div className="bg-[#D9E4FC] px-6 py-2 rounded-lg text-center">
                <h3 className="font-semibold text-xl text-gray-800">3. Co-brand and onboard your parents</h3>
              </div>

              <div className="bg-[#D9E4FC] px-6 py-2 rounded-lg text-center">
                <h3 className="font-semibold text-xl text-gray-800">4. Track the impact</h3>
              </div>

            </div>
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
                <li>Corporate</li>
              </ul>
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
    </>
  );
};

export default SchoolPartnerPage;