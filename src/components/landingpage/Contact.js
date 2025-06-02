import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        needFor: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.email || !formData.needFor) {
            setSubmitStatus({
                success: false,
                message: 'Please fill in all required fields.'
            });
            return;
        }

        // Email validation
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
            // Replace with your actual API endpoint
            const apiPayload = {
                name: formData.name,
                email: formData.email,
                purpose: formData.needFor
            };

            const origin = window.location.origin;
            let url = ""
            if (origin === "https://www.ourlittlehugs.com") {
                url = `${process.env.REACT_APP_API_URL}/v1/api/contact-us/`
            } else {
                url = `${process.env.REACT_APP_API_URL}/v1/api/contact-us/`
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    success: true,
                    message: 'Thank you for joining our waitlist! We\'ll be in touch soon.'
                });
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    needFor: ''
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

                <div
                    className="flex-grow bg-[#FFF7F2] flex items-center justify-center relative py-8 sm:py-10 md:py-12"
                // style={{
                //     backgroundImage: "url('/images/waitlist.png'), url('/images/littlehugs-bg.png')",
                //     backgroundRepeat: 'no-repeat, no-repeat',
                //     backgroundPosition: 'center, bottom left',
                //     backgroundSize: 'cover, contain',
                // }}
                >
                    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 text-center">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium font-quicksand text-[#4A4B4F] mb-3 sm:mb-4 text-center">
                            Be the First to Join Our LittleHugs Family!
                        </h1>

                        <p className="text-[#4A4B4F] font-normal font-quicksand text-base sm:text-lg md:text-xl lg:text-2xl text-center mx-auto max-w-4xl mb-4 sm:mb-6 md:mb-8">
                            Our LittleHugs is almost ready to bring you a beautiful space where connection, care, and community
                            come together. We're excited to have you on this journey with us!
                        </p>

                        <ul className="text-[#4A4B4F] text-sm sm:text-base font-[600] font-quicksand mb-4 sm:mb-6 space-y-1 sm:space-y-2 max-w-md mx-auto">
                            <li>• Get early access to our platform</li>
                            <li>• Receive exclusive updates</li>
                            <li>• Enjoy special launch offers and surprises!</li>
                        </ul>

                        <div className="flex justify-center pt-2 sm:pt-3 md:pt-5">
                            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 sm:space-y-4">
                                {submitStatus && (
                                    <div className={`p-2 sm:p-3 rounded-md text-sm sm:text-base ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {submitStatus.message}
                                    </div>
                                )}

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="* Name"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border bg-[#FAF3ED] focus:outline-none text-sm sm:text-base"
                                    required
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="* Email"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none text-sm sm:text-base"
                                    required
                                />

                                <select
                                    name="needFor"
                                    value={formData.needFor}
                                    onChange={handleChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 font-normal rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none text-sm sm:text-base"
                                    required
                                >
                                    <option value="" disabled hidden>Select type</option>
                                    <option value="Organisation">Organisation</option>
                                    <option value="Personal">Personal</option>
                                </select>

                                <button type='submit'
                                    className="block bg-[#1D1D1D] text-white px-4 mt-8 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#333] transition disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    {isSubmitting ? 'Processing...' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;