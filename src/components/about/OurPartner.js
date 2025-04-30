import React from 'react'

function OurPartner() {
    return (
        <section className="w-full px-[80px] font-quicksand text-800 mt-[120px]">
            <h2 className="text-4xl font-medium font-quicksand text-[#4A4B4F] text-center">Our Partners in Care</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-8 mb-8">
                <div className="rounded-lg p-6 bg-[#FAF3ED] w-1/4">
                    <img
                        src="/images/about_4.svg"
                        alt="Shilpi Aggrawal Vijay"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-medium text-[#4A4B4F] mb-2">Shilpi Aggrawal</h3>
                    <div className="space-y-2 text-sm text-[#4A4B4F]">
                        <p className='text-xl font-[600] text-[#4A4B4F]'>Medical Strategist – Women & Child Behavioral Health</p>
                        <p className='text-xl font-normal text-[#4A4B4F]'>RCI-Licensed Clinical Psychologist | Mental Health Advocate | Psychotherapy & Assessment Specialist</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 bg-[#FAF3ED] w-1/4">
                    <img
                        src="/images/about_6.svg"
                        alt="Haritha Vijay"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-medium text-[#4A4B4F] mb-2">Simran Kaur</h3>
                    <div className="space-y-2 text-sm text-[#4A4B4F]">
                        <p className='text-xl font-[600] text-[#4A4B4F]'>Strategic Partner– Experience & Emotional Intelligence</p>
                        <p className='text-xl font-normal text-[#4A4B4F]'>Counseling Psychologist | Life Skills Trainer | Adolescent & Parenting Wellness Expert</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 bg-[#FAF3ED] w-1/4">
                    <img
                        src="/images/about_5.svg"
                        alt="Haritha Vijay"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-medium text-[#4A4B4F] mb-2">Yinass Pushparani</h3>
                    <div className="space-y-2 text-sm text-[#4A4B4F]">
                        <p className='text-xl font-[600] text-[#4A4B4F]'>Prompt Partner & Platform Enhancement Lead</p>
                        <p className='text-xl font-normal text-[#4A4B4F]'>Mental Health Educator | Counseling Psychologist | Socio-Emotional Learning Advocate</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 bg-[#FAF3ED] w-1/4">
                    <img
                        src="/images/image.svg"
                        alt="Haritha Vijay"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-medium text-[#4A4B4F] mb-2">Haritha Vijay</h3>
                    <div className="space-y-2 text-sm text-[#4A4B4F]">
                        <p className='text-xl font-[600] text-[#4A4B4F]'>Clinical Growth Partner – Parenting Wellness & Early Intervention M.Sc Psychology | Behavioral Therapist | Parent Coach</p>
                        <p className='text-xl font-normal text-[#4A4B4F]'>M.Sc. Clinical Psychology | B.Ed. Special Education</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurPartner
