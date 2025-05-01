import React, { useState } from 'react';
import Navbar from '../common/Navbar';

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
                url = "https://api.ourlittlehugs.com/v1/api/contact-us/"
            } else {
                url = "https://api.ourlittlehugs.com/v1/api/contact-us/"
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

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div
                className="flex-grow bg-[#FFF7F2] flex items-center justify-center relative"
                // style={{
                //     backgroundImage: "url('/images/waitlist.png'), url('/images/littlehugs-bg.png')",
                //     backgroundRepeat: 'no-repeat, no-repeat',
                //     backgroundPosition: 'center, bottom left',
                //     backgroundSize: 'cover, contain',
                // }}
            >
                <div className="w-full px-6 py-12 text-center">
                    <h1 className="text-2xl md:text-4xl font-medium font-quicksand text-[#4A4B4F] mb-4 text-center">
                        Be the First to Join Our LittleHugs Family!
                    </h1>

                    <p className="text-[#4A4B4F] font-normal font-quicksand text-2xl text-center mx-auto max-w-4xl mb-8">
                        Our LittleHugs is almost ready to bring you a beautiful space where connection, care, and community
                        come together. We're excited to have you on this journey with us!
                    </p>

                    <ul className="text-[#4A4B4F] text-xm font-[600] font-quicksand mb-6 space-y-2 max-w-md mx-auto">
                        <li>• Get early access to our platform</li>
                        <li>• Receive exclusive updates</li>
                        <li>• Enjoy special launch offers and surprises!</li>
                    </ul>

                    <div className="flex justify-center pt-5">
                        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                            {submitStatus && (
                                <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="* Name"
                                className="w-full px-4 py-3 rounded-md border bg-[#FAF3ED] focus:outline-none"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="* Email"
                                className="w-full px-4 py-3 rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none"
                                required
                            />

                            <select
                                name="needFor"
                                value={formData.needFor}
                                onChange={handleChange}
                                className="w-full px-4 py-3 font-normal rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none"
                                required
                            >
                                <option value="" disabled hidden>Select type</option>
                                <option value="Organisation">Organisation</option>
                                <option value="Personal">Personal</option>
                            </select>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#1D1D1D] text-white px-6 py-3 rounded-full hover:bg-[#333] transition disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Join the Waitlist'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;