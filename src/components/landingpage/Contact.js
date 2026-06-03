import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    ;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.purpose) {
            setSubmitStatus({
                success: false,
                message: 'Please fill in all required fields.'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSubmitStatus({
                success: false,
                message: 'Please enter a valid email address.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const apiPayload = {
                name: formData.name,
                email: formData.email,
                purpose: formData.purpose
            };

            const url = `${process.env.REACT_APP_API_URL}/v1/api/contact-us/`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiPayload),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    success: true,
                    message: 'Thank you for Contacting us! We\'ll be in touch soon.'
                });

                setFormData({
                    name: '',
                    email: '',
                    purpose: '',
                    message: ''
                });
                console.log(formData);
            } else {
                setSubmitStatus({
                    success: false,
                    message: data.message || 'Something went wrong. Please try again later.'
                });
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: 'Network error. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const { title, description } = routesConfig.contact;

    return (
        <>
            <DocumentHead
                title={title}
                description={description}
                slug={routesConfig.contact.path}
            />
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <section className="relative bg-gradient-to-r from-yellow-300 to-orange-400 font-quicksand overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Side - Title */}
                            <div className='relative -top-4'>
                                <h1 className="text-5xl font-quicksand text-[#4A4B4F] font-semibold mb-8">Contact Us</h1>
                                <img alt='contactus' src='/images/contactus/contactus.png' />
                            </div>

                            {/* Right Side - Contact Form */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                {submitStatus &&
                                    <>
                                        {submitStatus.success === false && <div className='px-4 py-1 mb-2 rounded-xl bg-red-300'>{submitStatus.message}</div>}
                                        {submitStatus.success === true && <div className='px-4 py-1 mb-2 rounded-xl bg-green-300'>{submitStatus.message}</div>}
                                    </>
                                }
                                <div className="space-y-6">
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="* Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="* Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <select
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                            required
                                        >
                                            <option value="" hidden>* Select Type</option>
                                            <option value="Organisation">Organisation</option>
                                            <option value="Personal">Personal</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>

                                    <div>
                                        <textarea
                                            name="message"
                                            placeholder="* Message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="bg-gray-800 text-white px-8 py-5 rounded-2xl hover:bg-gray-900 transition-colors"
                                        >
                                            {isSubmitting ? "Loading..." : "Submit"}
                                            
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1200 200" className="w-full h-auto">
                            <path d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z" fill="white" />
                        </svg>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-12 right-8 transform -translate-y-1/2">
                        <img alt='dropdown' className="w-12" src='/images/contactus/plant.png'></img>
                    </div>

                </section>

                <section className="py-16 font-quicksand bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Left Side */}
                            <div>
                                <h2 className="text-4xl font-semibold text-gray-800 mb-6">We are here for you</h2>
                                <p className="text-gray-600 text-2xl mb-8">Get In Touch With Us</p>

                                <div className="flex space-x-4">
                                    <a href="https://www.instagram.com/liitlehugs/" target='_blank' rel="noreferrer" className="w-12 h-12">
                                        <img className="w-full h-full" alt='instagram'  src='/images/contactus/instagram.png' />
                                    </a>
                                    <a href="https://www.linkedin.com/company/littlehugs/" target='_blank' rel="noreferrer" className="w-12 h-12">
                                        <img className="w-full h-full" alt='linkedin' src='/images/contactus/linkedin.png' />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=61577311737612#" target='_blank' rel="noreferrer" className="w-12 h-12">
                                        <img className="w-full h-full" alt='facebook' src='/images/contactus/facebook.png' />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <footer className="relative bg-[#fef8e6] overflow-hidden pt-12 md:pt-20 pb-8">
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

                        </div>
                    </div>
                </footer>


            </div>
        </>
    );
};

export default Contact;