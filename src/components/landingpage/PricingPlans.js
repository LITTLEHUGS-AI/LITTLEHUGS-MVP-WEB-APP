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
    price: "Rs. 129/- / month",
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
    description: "For families caring for both the child and the caregiver’s wellness",
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
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="border rounded-lg shadow-sm p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{plan.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{plan.description}</p>
                <p className="mt-4 text-2xl font-bold text-blue-600">{plan.price}</p>
                <button
                  onClick={() => {navigate("/contact")}}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  {plan.button}
                </button>
                <ul className="mt-4 text-sm text-gray-700 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.extras && (
                  <p className="mt-4 text-sm text-gray-600 italic">{plan.extras}</p>
                )}
              </div>
              {plan.note && (
                <p className="mt-6 text-sm text-gray-800 font-medium">
                  {plan.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-[64px] px-4 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Not sure where to begin?
        </h2>
        <p className="text-gray-600 mb-6">
          Start with a free consultation with one of our pediatric experts and see how LittleHugs works for you.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition duration-300">
          Take a Free Consultation
        </button>
      </div>

      <div className="w-full px-5 mx-auto mt-[45px] font-quicksand flex flex-col items-center justify-center">
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
                className="mb-4"
              />
              <p className="text-xl font-normal text-[#4A4B4F]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white px-6 md:px-16  mt-[35px] text-gray-700">
        <p className="text-xl font-normal font-quicksand md:text-base mb-4">
          They’re not medical tests. They’re private, research-backed check-ins — designed to help you understand yourself and your child, before things feel too heavy.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mt-[64px] mb-6">
          Developed With Experts. Translated For You.
        </h2>

        <p className="mb-4 text-sm mt-[64px] md:text-base">
          Each tool is co-developed or reviewed by the top pediatricians, child psychologists, and women’s wellness experts in the country, and translated into everyday, relatable language.
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
          <li><strong>EPDS</strong> – Edinburgh Postnatal Depression Scale</li>
          <li><strong>GAD-7 & PHQ-9</strong> – for anxiety and mood self-checks</li>
          <li><strong>WHO & IAP Developmental Guidelines</strong> – for child milestone tracking</li>
          <li><strong>DSM-5 aligned behavior checklists</strong> – for early emotional insights in children</li>
          <li><strong>Validated symptom scales</strong> – for PMS, perimenopause, and menopause wellness</li>
          <li><strong>Ongoing research</strong> from NIH, CDC, and peer-reviewed health journals</li>
        </ul>
      </div>

      <div className="bg-white px-6 md:px-16 py-12 mt-[45px] text-center text-gray-700">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Private. Safe. Judgment-Free.
        </h2>

        <div className="max-w-2xl mx-auto">
          <p className="font-medium text-gray-800 mb-1">
            Your data stays yours. Always.
          </p>
          <p className="text-sm md:text-base text-gray-600">
            LittleHugs doesn’t diagnose or label. We simply help you notice the signs earlier, reflect with clarity, and take small, guided steps forward — all at your pace.
          </p>
        </div>
      </div>

      <>
        <div className="h-[10px] mt-[30px]"></div>
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
  );
};

export default PricingPlans;
