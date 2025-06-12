import React from 'react'
import Navbar from '../common/Navbar'
import { Link, useNavigate } from "react-router-dom";
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';
import { Building, Check, Heart, Star, Users } from 'lucide-react';


const plans = [
  {
    name: "Wellness Starter",
    subtitle: "For first-time users exploring basic check-ins",
    originalPrice: "₹49",
    price: "₹29",
    period: "/month",
    description: "First-time users, exploring basic self-check-ins",
    features: [
      "1 Program",
      "Basic feedback only",
      "7 Days Free",
      "Limited access"
    ],
    link: '/signup',
    additional: "Counselling available at an additional charge",
    buttonText: "Choose Plan",
    popular: false,
    icon: Heart,
    gradient: "from-blue-50 to-indigo-50",
    buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  {
    name: "Self-Wellness Plan",
    subtitle: "For women & caregivers focused on emotional well-being",
    originalPrice: "₹129",
    price: "₹69",
    period: "/month",
    description: "Women and caregivers focusing on self-check-in and emotional well-being",
    features: [
      "1 Program",
      "Personalized insights",
      "Mobile access",
      "Full access",
      "Push notifications to stay on track"
    ],
    link: '/signup',
    additional: "Counselling available at an additional charge",
    buttonText: "Upgrade Plan",
    popular: true,
    icon: Star,
    gradient: "from-purple-50 to-pink-50",
    buttonStyle: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
  },
  {
    name: "Co-Care Plan",
    subtitle: "For families caring for both the child and the caregiver's wellness",
    originalPrice: "₹249",
    price: "₹99",
    period: "/month",
    description: "Families and parents managing both self and child wellness",
    features: [
      "2 Programs",
      "Personalized insights",
      "Mobile access",
      "Full access",
      "Notifications tailored to both journeys"
    ],
    link: '/signup',
    additional: "Counselling available at an additional charge",
    buttonText: "Upgrade Plan",
    popular: false,
    icon: Users,
    gradient: "from-green-50 to-emerald-50",
    buttonStyle: "bg-green-600 hover:bg-green-700 text-white"
  },
  {
    name: "Partner Plans",
    subtitle: "For schools, clinics, NGOs, corporates, and early education teams",
    price: "Custom Pricing",
    period: "",
    description: "Multiple user access",
    features: [
      "Child + caregiver wellness dashboard",
      "Screening & analytics",
      "Custom reports and integrations",
      "Team onboarding & support"
    ],
    link: '/partner',
    additional: "",
    buttonText: "Contact Us",
    popular: false,
    icon: Building,
    gradient: "from-orange-50 to-yellow-50",
    buttonStyle: "bg-orange-600 hover:bg-orange-700 text-white"
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
  const { title, description } = routesConfig.pricingPlans;

  return (
    <>
      <DocumentHead
        title={title}
        description={description}
        slug={routesConfig.pricingPlans.path}
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />


        <h1 className="text-3xl md:text-4xl mt-12 font-semibold mb-8 text-center">Early Birds Offer</h1>

        {/* Pricing Cards */}
        <div className="py-16 px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl lg:grid-cols-4 mx-auto gap-8">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                    }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`p-2 bg-gradient-to-br ${plan.gradient} rounded-t-2xl`}>
                    <div className="flex items-center justify-center w-16 h-12 bg-white rounded-2xl shadow-lg mb-1 mx-auto">
                      <IconComponent className="w-8 h-8 text-gray-700" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                      {plan.name}
                    </h3>

                    <p className="text-sm text-gray-600 text-center mb-2 leading-relaxed">
                      {plan.subtitle}
                    </p>

                    <div className="text-center mb-6">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through mr-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-lg text-gray-600 ml-1">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-600 mb-2 text-center">{plan.description}</p>

                    <ul className="space-y-2 mb-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.additional && (
                      <p className="text-sm text-gray-500 mb-6 text-center italic">
                        {plan.additional}
                      </p>
                    )}
                  </div>

                  <Link
                    to={plan.link}
                    className={`mt-auto mb-2 mx-4 py-4 px-6 rounded-xl font-semibold text-lg text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              );
            })}
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
              <Link to="/assesment" className="w-full sm:w-auto">
                <button className="w-full bg-[#283036] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-base md:text-lg font-quicksand hover:bg-[#1f252b] transition">
                  Explore our Programs
                </button>
              </Link>
              <Link to="/partner" className="w-full sm:w-auto">
                <button className="w-full border border-[#283036] text-[#283036] px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-base md:text-lg font-quicksand hover:bg-[#283036] hover:text-white transition">
                  Partner with us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlans;