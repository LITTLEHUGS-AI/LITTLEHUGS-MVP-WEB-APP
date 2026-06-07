import React from 'react'

function WhyWeExist() {
    return (
        <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[80px] font-quicksand text-800 mt-8 sm:mt-12 md:mt-16 lg:mt-[120px]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-quicksand text-[#4A4B4F] text-center mb-4 sm:mb-6">Why we exist?</h2>

            <div className="px-0 sm:px-2 md:px-4">
                <p className="text-lg sm:text-xl font-normal font-quicksand text-[#4A4B4F] mt-4 sm:mt-6">
                    Wellness often starts with a quiet question:
                </p>
                <p className="text-xl sm:text-2xl md:text-[24px] leading-7 sm:leading-8 font-[600] font-quicksand text-[#4A4B4F] mt-2">
                    "How are you really doing?"
                </p>
            </div>

            {/* First Section - Stacked on mobile, side by side on desktop */}
            <div className="flex flex-col lg:flex-row font-quicksand justify-between mt-6 sm:mt-8 gap-6 lg:gap-0">
                <div className="w-full lg:w-[40%] flex flex-col gap-2">
                    <p className="text-base sm:text-lg md:text-xl pt-2 sm:pt-4 font-medium text-[#4A4B4F]">
                        But most women never get the space to answer it. The ones who hold everything together — leading at work, running a home, carrying the invisible load — rarely get a moment for themselves. We started LittleHugs because there was no gentle, everyday space to check in before things felt too heavy. Most of what existed was too clinical, too fragmented, or came too late. So we built something different — soft, stigma-free check-ins, informed by experts, that help you notice how you're really doing and turn it into small, doable steps.
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-7 font-semibold text-[#4A4B4F]">
                        Whether you're stretched thin at work, carrying the weight of a household, or simply running on empty and feeling unseen — we built LittleHugs to meet you there.
                    </p>
                </div>

                <div className="w-full lg:w-[50%] mt-6 lg:mt-0 mb-6 sm:mb-10 flex flex-col items-center justify-center">
                    <img
                        src="/images/about_2.svg"
                        alt="About our mission"
                        className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-none lg:h-[600px] object-contain"
                    />
                </div>
            </div>

            {/* Second Section - Stacked on mobile, side by side on desktop */}
            <div className="flex flex-col-reverse lg:flex-row font-quicksand gap-6 sm:gap-8 md:gap-[32px] mt-8 sm:mt-12">
                <div className="w-full lg:w-[50%] flex flex-col items-center justify-center">
                    <img
                        src="/images/about_3.svg"
                        alt="Our partners"
                        className="w-full max-w-[400px] md:max-w-[450px] lg:max-w-none lg:h-[450px] object-contain"
                    />
                </div>
                <div className="w-full lg:w-[50%] flex flex-col gap-4 sm:gap-6 md:gap-8">
                    <h2 className='text-xl sm:text-2xl md:text-3xl font-medium text-[#4A4B4F]'>Our Partners in Care</h2>
                    <p className="text-base sm:text-lg md:text-[20px] font-medium text-[#4A4B4F]">
                        LittleHugs is built with psychologists, women's wellness specialists, and emotional-wellbeing experts who share one belief:
                        <span className="block mt-2">That care shouldn't begin with a crisis.</span>
                        <span className="block mt-2">Our tools are developed in consultation with:</span>
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F] mt-2">
                        <li className="mb-1">Counselling & wellness psychologists</li>
                        <li className="mb-1">Women's health & hormonal specialists</li>
                        <li className="mb-1">Emotional wellbeing & mindfulness coaches</li>
                        <li>Self-care & habit-building experts</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default WhyWeExist