import React from 'react'

function OurPartner() {
    return (
        <section className="w-full font-quicksand text-800 mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium font-quicksand text-[#4A4B4F] text-center mb-6 sm:mb-8">Meet Our Experts</h2>

            {/* Grid for experts cards - 1 column on mobile, 2 on tablets, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">

                {/* Expert 1 */}
                <div className="rounded-lg p-4 sm:p-6 bg-[#FAF3ED] w-full">
                    <img
                        src="/images/about_4.svg"
                        alt="Shilpi Aggrawal Vijay"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#4A4B4F] mb-2">Shilpi Aggrawal</h3>
                    <div className="space-y-2">
                        <p className='text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F]'>Medical Strategist – Women & Child Behavioral Health</p>
                        <p className='text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#4A4B4F]'>RCI-Licensed Clinical Psychologist | Mental Health Advocate | Psychotherapy & Assessment Specialist</p>
                    </div>
                </div>

                {/* Expert 2 */}
                <div className="rounded-lg p-4 sm:p-6 bg-[#FAF3ED] w-full">
                    <img
                        src="/images/about_6.svg"
                        alt="Simran Kaur"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#4A4B4F] mb-2">Simran Kaur</h3>
                    <div className="space-y-2">
                        <p className='text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F]'>Strategic Partner– Experience & Emotional Intelligence</p>
                        <p className='text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#4A4B4F]'>Counseling Psychologist | Life Skills Trainer | Adolescent & Parenting Wellness Expert</p>
                    </div>
                </div>

                {/* Expert 3 */}
                <div className="rounded-lg p-4 sm:p-6 bg-[#FAF3ED] w-full">
                    <img
                        src="/images/about_5.svg"
                        alt="Yinass Pushparani"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#4A4B4F] mb-2">Yinass Pushparani</h3>
                    <div className="space-y-2">
                        <p className='text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F]'>Prompt Partner & Platform Enhancement Lead</p>
                        <p className='text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#4A4B4F]'>Mental Health Educator | Counseling Psychologist | Socio-Emotional Learning Advocate</p>
                    </div>
                </div>

                {/* Expert 4 */}
                <div className="rounded-lg p-4 sm:p-6 bg-[#FAF3ED] w-full">
                    <img
                        src="/images/image.svg"
                        alt="Haritha Vijay"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#4A4B4F] mb-2">Haritha Vijay</h3>
                    <div className="space-y-2">
                        <p className='text-base sm:text-lg md:text-xl font-[600] text-[#4A4B4F]'>Clinical Growth Partner – Parenting Wellness & Early Intervention</p>
                        <p className='text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#4A4B4F]'>M.Sc. Clinical Psychology | B.Ed. Special Education</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OurPartner