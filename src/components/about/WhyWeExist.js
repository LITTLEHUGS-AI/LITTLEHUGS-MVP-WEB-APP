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
                        But in today's fast-moving world, most people don't get the space to answer it, especially women, caregivers, and children who carry invisible burdens daily. We started LittleHugs because there was no gentle, guided space to reflect before things broke down. Everything felt either too clinical, too fragmented, or too late. So we built something different. Soft, stigma-free assessments. One backed by experts. One that catches signals early — and helps turn them into small, doable steps.
                    </p>
                    <p className="text-lg sm:text-xl md:text-2xl mt-4 sm:mt-7 font-semibold text-[#4A4B4F]">
                        Whether you're navigating early milestones, learning delays, teen transitions, or postpartum fog — or simply trying to raise a child while holding it all together — we built LittleHugs to meet you there.
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
                        LittleHugs collaborates with pediatricians, therapists, school counselors, mental health educators, and early education centers who share one belief:
                        <span className="block mt-2">That care shouldn't begin with a crisis.</span>
                        <span className="block mt-2">Our tools are developed in consultation with:</span>
                    </p>
                    <ul className="list-disc list-inside text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F] mt-2">
                        <li className="mb-1">Child psychologists & ABA therapists</li>
                        <li className="mb-1">Women's health specialists</li>
                        <li className="mb-1">Pediatricians & special educators</li>
                        <li>Early childhood development NGOs</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default WhyWeExist