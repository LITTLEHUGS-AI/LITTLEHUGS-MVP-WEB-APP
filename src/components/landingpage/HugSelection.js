import React from 'react';

function HugSelection() {
    return (
        <div className="w-full px-5 font-quicksand text-center text-gray-800 mt-5 flex flex-col items-center p-10">
            <h2 className="text-4xl font-medium text-[#4A4B4F] mb-10">Who is this for?</h2>

            <div className="w-full">
                <div className="flex flex-row gap-12">
                    <div className="w-full md:w-1/2 p-8">
                        <div className="relative mb-6">
                            <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-gray-400">
                                <span className="text-xl text-[#4A4B4F]">Women's Health & Wellness</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start">
                            <div className="relative w-full max-w-md">
                                <img
                                    src="/images/women_health.png"
                                    alt="Women's Health Illustration"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Child's Development Section */}
                    <div className="w-full md:w-1/2 p-8">
                        <div className="relative mb-6">
                            <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-gray-400">
                                <span className="text-xl text-[#4A4B4F]">Child's Development & Growth</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex justify-center md:justify-start">
                            <div className="relative w-full max-w-md">
                                <img
                                    src="/images/child_health.png"
                                    alt="Child Development Illustration"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HugSelection;