import React from 'react'
import Navbar from '../common/Navbar'
// import Footer from '../common/Footer'

function About() {
    const values = [
        {
            title: 'Empathy first',
            img: "/images/pro_1.svg",
        },
        {
            title: 'Backed by science',
            img: "/images/pro_2.svg",
        },
        {
            title: 'Early over urgent',
            img: "/images/pro_3.svg",
        },
        {
            title: 'Inclusion by design',
            img: "/images/pro_4.svg",
        },
    ];



    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="bg-[#FCC153] h-[450px] flex items-center justify-center font-quicksand">
                <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12">

                    {/* Left Content */}
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-[40px] font-medium font-quicksand text-gray-800 leading-tight">
                            We check in where most <br /> systems don’t
                        </h2>
                        <p className="text-md md:text-lg text-gray-700">
                            LittleHugs is an emotionally intelligent wellness platform that helps families and institutions spot early signs of emotional and developmental risks — and respond with gentle, guided care.
                            From the first nudge to the final insight, we're here to make care simpler, stigma-free, and deeply human.
                        </p>
                        <button className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition">
                            Try for Free
                        </button>
                    </div>

                    {/* Right Circle */}
                    <div className="mt-12 md:mt-0">
                        <img
                            src="/images/circle.svg"
                            alt="Heart in Hands"
                            className="w-[2500px] h-[300px]"
                        />
                    </div>

                </div>
            </div>

            <div className="w-full flex flex-col items-center px-4 py-12 font-quicksand">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium leading-snug">
                        We’re not just building a product.
                        <br />
                        We’re reimagining what care should feel like.
                    </h2>
                </div>

                {/* img with Titles */}
                <div className="flex justify-between gap-[78px]">
                    {values.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center gap-[28px]"
                        >
                            <img
                                src={`${item.img}`}
                                alt={`Care ${index + 1}`}
                                className="w-24 h-24 mb-4"
                            />
                            <p className="text-xl font-normal text-[#4A4B4F]">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-16">
                {/* Title */}
                <h2 className="text-center text-[38px] font-medium font-quicksand text-gray-800 mb-12">
                    Why we exist?
                </h2>

                {/* Main Flex Row */}
                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Left Text Content */}
                    <div className="flex-1 text-gray-700 space-y-6 text-base leading-relaxed">

                        {/* Top Line */}
                        <div>
                            <span className="text-gray-400 font-normal font-quicksand text-[24px]">Wellness often starts with a quiet question:</span>
                            <br />
                            <span className="font-bold text-xl text-gray-800">
                                “How are you really doing?”
                            </span>
                        </div>

                        {/* Paragraph */}
                        <p className="text-[18px] font-quicksand font-normal text-gray-600 gap-7 leading-6">
                            But in today’s fast-moving world, most people don’t get the space to answer it, especially women, caregivers, and children who carry invisible burdens daily. We started LittleHugs because there was no gentle, guided space to reflect before things broke down. Everything felt either too clinical, too fragmented, or too late. So we built something different. Soft, stigma-free assessments.<br />
                            One backed by experts. One that catches signals early <br /> — and helps turn them into small, doable steps.
                        </p>

                        {/* Final Bold Paragraph */}
                        <p className="text-[24px] font-semibold font-quicksand text-gray-800">
                            Whether you’re navigating early milestones,learning delays,teen transitions,or postpartum fog — or <br />simply trying to raise a child while <br />holding it all together — we built <br /> LittleHugs to meet you there.
                        </p>

                    </div>

                    {/* Right Image Placeholder */}
                    <div className="flex-1">
                        <img
                            src="/images/Rectangle.svg"
                            alt="Heart in Hands"
                            className="text-gray-500 pt-12 w-[600px] h-[600px]"
                        />

                    </div>

                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-start gap-10">

                    {/* Left Image */}
                    <div className="flex-1">
                        <img
                            src="/images/Rectangle_1.svg" // replace with your real image path
                            alt=""
                            className="w-[500px] h-[410px]  gap-3 ml-10"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 text-gray-700 space-y-6">

                        {/* Title */}
                        <h2 className="text-4xl font-medium font-quicksand text-gray-800">
                            Our Partners in Care
                        </h2>

                        {/* Paragraph */}
                        <p className="text-[18px] font-normal font-quicksand gap-4">
                            LittleHugs collaborates with pediatricians, therapists, school counselors, mental health educators, and early education centers who share one belief: <br />
                            That care shouldn’t begin with a crisis. <br />
                            Our tools are developed in consultation with:
                        </p>

                        {/* List */}
                        <ul className="text-[24px] font-medium font-quicksand list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Child psychologists & ABA therapists</span></li>
                            <li><span className="font-semibold">Women’s health specialists</span></li>
                            <li><span className="font-semibold">Pediatricians & special educators</span></li>
                            <li><span className="font-semibold">Early childhood development NGOs</span></li>
                        </ul>

                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
                    Our Partners in Care
                </h2>

                <div className="flex flex-wrap justify-center gap-24">

                    {/* Card 1 */}
                    <div className="w-[300px] h-[640px] bg-[#fef8f2] rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <img
                            src="/images/part_1.svg" // Replace with your image
                            alt="Haritha Vijay"
                            className="w-full h-[268px] object-cover"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">Haritha Vijay</h3>
                            <p className="text-sm text-gray-700 leading-6">
                                M.Sc. Clinical Psychology | <br />
                                B.Ed. Special Education (Autism, RCI Certified)<br />
                                Specialized in child & adolescent mental health, neurodiversity (ASD, ADHD, CP, learning disabilities)<br />
                                Trained in ABA, REBT, CBT, play therapy, expressive arts therapy, and mindfulness practices<br />
                                Active member of the United Psychologists Association & certified graphologist
                            </p>
                        </div>
                    </div>

                    {/* Copy Card 2 */}
                    <div className="w-[300px] h-[640px] bg-[#fef8f2] rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <img
                            src="/images/part_1.svg"
                            alt="Haritha Vijay"
                            className="w-full h-[268px] object-cover"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">Haritha Vijay</h3>
                            <p className="text-sm text-gray-700 leading-6">
                                M.Sc. Clinical Psychology | <br />
                                B.Ed. Special Education (Autism, RCI Certified)<br />
                                Specialized in child & adolescent mental health, neurodiversity (ASD, ADHD, CP, learning disabilities)<br />
                                Trained in ABA, REBT, CBT, play therapy, expressive arts therapy, and mindfulness practices<br />
                                Active member of the United Psychologists Association & certified graphologist
                            </p>
                        </div>
                    </div>

                    {/* Copy Card 3 */}
                    <div className="w-[300px] h-[640px] bg-[#fef8f2] rounded-2xl shadow-md overflow-hidden flex flex-col">
                        <img
                            src="/images/part_1.svg"
                            alt="Haritha Vijay"
                            className="w-full h-[268px] object-cover"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold mb-2">Haritha Vijay</h3>
                            <p className="text-sm text-gray-700 leading-6">
                                M.Sc. Clinical Psychology | <br />
                                B.Ed. Special Education (Autism, RCI Certified)<br />
                                Specialized in child & adolescent mental health, neurodiversity (ASD, ADHD, CP, learning disabilities)<br />
                                Trained in ABA, REBT, CBT, play therapy, expressive arts therapy, and mindfulness practices<br />
                                Active member of the United Psychologists Association & certified graphologist
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative bg-[#fef8e6] overflow-hidden pt-20 pb-16">
                {/* Curve Top */}
                <div className="absolute top-0 left-0 w-full">
                    <svg
                        className="w-full h-[100px]"
                        viewBox="0 0 1440 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
                        ></path>
                    </svg>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Join the Movement
                    </h2>
                    <p className="text-gray-700 mb-10 leading-relaxed">
                        We’re building more than a platform — we’re building a world where every child feels seen early, and every caregiver feels supported. Whether you're a school, clinic, parent, or simply someone who believes in early care, we'd love to build with you.
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-center gap-6">
                        <button className="px-6 py-3 bg-[#29303b] text-white rounded-full text-sm font-medium hover:bg-[#111827] transition">
                            Take the free test
                        </button>
                        <button className="px-6 py-3 border border-[#29303b] text-[#29303b] rounded-full text-sm font-medium hover:bg-gray-100 transition">
                            Partner with us
                        </button>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>


    )
}

export default About


