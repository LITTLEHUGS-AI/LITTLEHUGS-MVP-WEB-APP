import React from 'react';
import Navbar from '../common/Navbar';

const Contact = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div
                    className="min-h-screen bg-[#FFF7F2] flex items-center justify-center relative overflow-hidden"
                    style={{
                        backgroundImage: "url('/images/waitlist.png')", // Replace with your image path

                    }}
                >
                    <div
                        className="min-h-screen bg-[#FFF7F2] flex items-center"
                        style={{
                            backgroundImage: "url('/images/littlehugs-bg.png')", // Add your actual image here
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom left',
                            backgroundSize: 'contain',
                        }}
                    >
                        <div className="w-full px-6 py-12 text-center">
                            <h1 className="text-2xl md:text-4xl font-medium font-quicksand text-[#3B3B3B] mb-4 text-center whitespace-nowrap">
                                Be the First to Join Our LittleHugs Family!
                            </h1>

                            <p className="text-[#4F4F4F] font-normal font-quicksand text-2xl text-center w-[1228px] mb-8">
                                Our LittleHugs is almost ready to bring you a beautiful space where connection, care, and community
                                come together. We’re excited to have you on this journey with us!
                            </p>
                            <ul className="text-[#2D2D2D] text-xm font-medium font-quicksand mb-6 space-y-2">
                                <li>• Get early access to our platform</li>
                                <li>• Receive exclusive updates</li>
                                <li>• Enjoy special launch offers and surprises!</li>
                            </ul>

                            <div className="flex justify-center pt-5 bg-[#FAF3ED]">
                                <form className="w-[520px] space-y-4">
                                    <input
                                        type="text"
                                        placeholder="* Name"
                                        className="w-full px-4 py-3 rounded-md border bg-[#FAF3ED] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
                                    />
                                    <input
                                        type="email"
                                        placeholder="* Email"
                                        className="w-full px-4 py-3 rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="* Need LittleHugs for"
                                        className="w-full px-4 py-3 rounded-md border bg-[#FAF3ED] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-[#1D1D1D] text-white px-6 py-3 rounded-full hover:bg-[#333] transition"
                                    >
                                        Join the Waitlist
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact
