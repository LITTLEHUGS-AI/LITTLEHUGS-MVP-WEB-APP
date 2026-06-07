import React from 'react'
import Navbar from '../common/Navbar'
import ForThis from './ForThis'
// import WellnessAssessment from './WellnessAssessment'; // hidden with program cards
import { Link } from 'react-router-dom';
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';

function PersonalLandingPage() {
    // const cards = [...]; // hidden with program cards section
    // const [showPopup, setShowPopup] = useState(false); // hidden with program cards
    // const [titleData, setTitleData] = useState(""); // hidden with program cards

    const { title, description } = routesConfig.personalLanding;

    return (
        <>
            <DocumentHead
                title={title}
                description={description}
                slug={routesConfig.personalLanding.path}
            />
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div
                    className="w-full font-quicksand flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-8 md:py-12 bg-[#FAF3ED]"
                >
                    {/* Text Content */}
                    <div className="w-full lg:max-w-[630px] order-2 lg:order-1 text-center lg:text-left mb-8 lg:mb-0">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 leading-snug text-[#4A4B4F]">
                         A wellness hug for every stage of life
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] mb-2">
                            Whether you're a mom, a dad, a caregiver, or a growing child — <b>LittleHugs</b> offers gentle check-ins, smart emotional insights, and daily wellness tools, right at your fingertips.
                        </p>
                        <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] mb-6">
                            Care that grows with you.
                        </p>
                        <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
                            <Link to="/assesment">
                                <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                                    Explore how we support
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="w-full lg:w-auto flex justify-center items-center p-2 sm:p-4 order-1 lg:order-2 mb-6 lg:mb-0">
                        <img
                            src="/images/for_1.svg"
                            alt="Header illustration"
                            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto"
                        />
                    </div>
                </div>

                <ForThis />

                <div className="w-full mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand text-center text-gray-800 flex flex-col items-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#4A4B4F] mb-4 sm:mb-6 md:mb-8 lg:mb-10">How our warm hug will help you?</h2>
                    <div className="w-full max-w-6xl">
                        <img src="/images/for_3.svg" alt="Landing Page" className="w-full" />
                    </div>
                </div>
         

                {/* Programs cards hidden — uncomment to re-enable
                <section className="w-full mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand text-800">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-quicksand text-[#4A4B4F] text-center mb-6 md:mb-8">What hug do you need today?</h2>
                    <div className="bg-[#FFFFFF] py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-[22px] relative overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 sm:gap-6 md:gap-8 z-10 relative mx-auto max-w-7xl">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FAF3ED] w-full border border-[#26323866] rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-center flex-1 min-h-0 sm:min-h-[300px] md:min-h-[380px] lg:min-h-[420px]"
                                >
                                    <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-center font-quicksand text-gray-800 mb-4 md:mb-6 lg:mb-8 leading-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-[16px] font-medium font-quicksand text-gray-600 mb-4 md:mb-6 lg:mb-8 flex-grow">
                                        {card.description}
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (index === 0) {
                                                setTitleData(1)
                                            } else if (index === 1) {
                                                setTitleData(2)
                                            } else if (index === 2) {
                                                setTitleData(3)
                                            }
                                            setShowPopup(true);
                                        }}
                                        className="bg-[#263238] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition w-full max-w-[160px] sm:max-w-[180px] text-sm sm:text-base"
                                    >
                                        Learn more
                                    </button>
                                </div>
                            ))}
                        </div>
                        {showPopup && <WellnessAssessment
                            onClose={() => setShowPopup(false)}
                            heading={titleData}
                        />}
                    </div>
                </section>
                */}
                <>
                    <div className="h-[6px] sm:h-[8px] md:h-[10px] mt-8 sm:mt-12 md:mt-16 lg:mt-[120px]"></div>
                    <div className="relative bg-[#fef8e6] overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
                        {/* Curve Top */}
                        <div className="absolute top-0 left-0 w-full">
                            <svg
                                className="w-full h-auto"
                                viewBox="0 0 1440 100"
                                height="100"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#ffffff"
                                    d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
                                ></path>
                            </svg>
                        </div>

                        <div className='flex flex-col items-center justify-center px-4 sm:px-6 md:px-8'>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#4A4B4F] mb-4 sm:mb-5 md:mb-6 text-center font-quicksand">
                                Join the Movement
                            </h2>
                            <p className="text-base sm:text-lg max-w-3xl text-[#4A4B4F] mb-6 sm:mb-8 md:mb-10 text-center font-quicksand">
                                We're building more than a platform — we're building a world where every child feels seen early, and every caregiver feels supported. Whether you're a school, clinic, parent, or simply someone who believes in early care, we'd love to build with you.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none">
                                <Link to="/assesment" className="w-full sm:w-auto">
                                    <button className="bg-[#283036] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg font-quicksand hover:bg-[#1f252b] transition w-full">
                                        Explore how we support
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default PersonalLandingPage