import React from 'react'
import Navbar from '../common/Navbar'
import { Link, useNavigate } from "react-router-dom";

const plans = [
  {
    title: "Wellness Starter",
    description: "For first-time users exploring basic check-ins",
    price: "Rs. 69/-",
    button: "Choose Plan",
    features: [
      "1 Assessment",
      "Basic emotional insights",
      "15-day access to progress tracking",
      "Limited access to the resource library"
    ],
    note: "Counselling available at an additional charge",
  },
  {
    title: "Self-Wellness Plan",
    description: "For women & caregivers focused on emotional well-being",
    price: "Rs. 129/- month",
    button: "Upgrade Plan",
    features: [
      "1 Assessment/month",
      "Personalized insights",
      "Progress tracking",
      "Full access to the resource library",
      "Regular emotional check-ins"
    ],
    extras: "Push notifications to stay on track",
    note: "Counselling available at an additional charge",
  },
  {
    title: "Co-Care Plan",
    description: "For families caring for both the child and the caregiver's wellness",
    price: "Rs. 249 / month",
    button: "Upgrade Plan",
    features: [
      "2 Assessments/month",
      "Personalized insights for the caregiver and child",
      "Progress dashboards",
      "Full access to the resources",
      "Regular emotional check-ins"
    ],
    extras: "Notifications tailored to both journeys",
    note: "Counselling available at an additional charge",
  },
  {
    title: "Partner Plans",
    description: "For schools, clinics, NGOs, corporates, and early education teams",
    price: "Custom Pricing",
    button: "Contact Us",
    features: [
      "Multiple user access",
      "Child + caregiver wellness dashboard",
      "Screening & analytics",
      "Custom reports and integrations",
      "Team onboarding & support"
    ]
  }
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

const PricingPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Pricing Plans Section */}
      <div className="bg-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm p-4 md:p-6 flex flex-col justify-between h-full transition-transform duration-300 hover:shadow-md hover:scale-[1.02]"
            >
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{plan.title}</h3>
                <p className="mt-1 text-xs md:text-sm text-gray-600">{plan.description}</p>
                <p className="mt-3 md:mt-4 text-xl md:text-2xl font-bold text-blue-600">{plan.price}</p>
                <button
                  onClick={() => { navigate("/contact") }}
                  className="mt-3 md:mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                >
                  {plan.button}
                </button>
                <ul className="mt-3 md:mt-4 text-xs md:text-sm text-gray-700 space-y-1 md:space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2 flex-shrink-0">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.extras && (
                  <p className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600 italic">{plan.extras}</p>
                )}
              </div>
              {plan.note && (
                <p className="mt-4 md:mt-6 text-xs md:text-sm text-gray-800 font-medium">
                  {plan.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Section */}
      <div className="text-center mt-8 md:mt-16 px-4 py-8 bg-white">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Not sure where to begin?
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
          Start with a free consultation with one of our pediatric experts and see how LittleHugs works for you.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-300">
          Take a Free Consultation
        </button>
      </div>

      {/* Tools Development Section */}
      <div className="w-full px-4 md:px-8 mx-auto mt-8 md:mt-12 font-quicksand flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-16 text-center">
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
                className="mb-2 md:mb-4 w-16 md:w-auto"
              />
              <p className="text-lg md:text-xl font-normal text-[#4A4B4F]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-white px-4 md:px-16 py-8 md:py-12 mt-8 md:mt-12 text-center text-gray-700">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
          Private. Safe. Judgment-Free.
        </h2>

        <div className="max-w-2xl mx-auto">
          <p className="font-medium text-gray-800 mb-1">
            Your data stays yours. Always.
          </p>
          <p className="text-xs md:text-base text-gray-600">
            LittleHugs doesn't diagnose or label. We simply help you notice the signs earlier, reflect with clarity, and take small, guided steps forward — all at your pace.
          </p>
        </div>
      </div>

      {/* Join Movement Section */}
      <div className="h-[10px] mt-6 md:mt-8"></div>
      <div className="relative bg-[#fef8e6] overflow-hidden pt-12 md:pt-20 pb-8">
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

        <div className='flex flex-col items-center justify-center px-4'>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#4A4B4F] mb-4 md:mb-6 font-quicksand text-center">
            Join the Movement
          </h2>
          <p className="text-base md:text-lg max-w-3xl text-[#4A4B4F] mb-6 md:mb-10 px-4 font-quicksand text-center">
            We're building more than a platform — we're building a world where every child feels seen early, and every caregiver feels supported. Whether you're a school, clinic, parent, or simply someone who believes in early care, we'd love to build with you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto">
            <Link to="/assesment-landing" className="w-full sm:w-auto">
              <button className="w-full bg-[#283036] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-base md:text-lg font-quicksand hover:bg-[#1f252b] transition">
                Take the free test
              </button>
            </Link>
            <Link to="/partener-landing" className="w-full sm:w-auto">
              <button className="w-full border border-[#283036] text-[#283036] px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-base md:text-lg font-quicksand hover:bg-[#283036] hover:text-white transition">
                Partner with us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;