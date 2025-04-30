import React from 'react'

function WhyWeExist() {
    return (
        <section className="w-full px-5 font-quicksand text-800 mt-[60px]">
            <h2 className="text-4xl font-medium font-quicksand text-[#4A4B4F] text-center">Why we exist?</h2>
            <p className="text-xl font-normal font-quicksand ml-4 text-[#4A4B4F] mt-6">
                Wellness often starts with a quiet question:
            </p>
            <p className="text-[24px] leading-8 font-[600] ml-4 font-quicksand text-[#4A4B4F]">
                “How are you really doing?”
            </p>
            {/* Steps */}
            <div className="flex font-quicksand justify-between px-4">
                <div className="w-[40%] flex flex-col gap-2">
                    <p className="text-xl pt-4 font-medium justify-start text-[#4A4B4F]">
                        But in today’s fast-moving world, most people don’t get the space to answer it, especially women, caregivers, and children who carry invisible burdens daily. We started LittleHugs because there was no gentle, guided space to reflect before things broke down. Everything felt either too clinical, too fragmented, or too late. So we built something different. Soft, stigma-free assessments. One backed by experts. One that catches signals early — and helps turn them into small, doable steps.
                    </p>
                    <p className="text-2xl mt-7 font-semibold  text-[#4A4B4F]">
                        Whether you're navigating early milestones, learning delays, teen transitions, or postpartum fog — or simply trying to raise a child while holding it all together — we built LittleHugs to meet you there.
                    </p>
                </div>

                <div className="w-[50%] mb-10 flex flex-col items-center justify-center">
                    <img
                        src="/images/about_2.svg"
                        alt="Step 1"
                        className="h-[600px]"
                    />
                </div>
            </div>

            <div className="flex font-quicksand justify-between items-center gap-[32px] mt-10 px-4">
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <img
                        src="/images/about_3.svg"
                        alt="Step 1"
                        className="h-[450px]"
                    />
                </div>
                <div className="w-[50%] flex flex-col gap-8">
                    <h2 className='text-3xl font-medium text-[#4A4B4F]'>Our Partners in Care</h2>
                    <p className="text-[20px] font-medium text-[#4A4B4F]">
                        LittleHugs collaborates with pediatricians, therapists, school counselors, mental health educators, and early education centers who share one belief: <br />
                        That care shouldn’t begin with a crisis.<br />
                        Our tools are developed in consultation with:
                    </p>
                    <ul className="list-disc list-inside text-xl font-[600] text-[#4A4B4F]">
                        <li>Child psychologists & ABA therapists</li>
                        <li>Women’s health specialists</li>
                        <li>Pediatricians & special educators</li>
                        <li>Early childhood development NGOs</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default WhyWeExist
