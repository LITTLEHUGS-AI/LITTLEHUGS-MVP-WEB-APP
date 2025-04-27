import React from 'react';

function ForThis() {
    return (
        <div className="w-full px-5 font-quicksand text-center text-gray-800 mt-5 flex flex-col items-center">
            <h2 className="text-4xl font-medium text-[#4A4B4F] mb-10">Who is this for?</h2>

            <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto p-4">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                    <div className="space-y-4">
                        <div className="flex ml-[30px] items-center gap-2">
                            <img src="/icons/mingcute_down-line.svg" alt="For This" className="w-8 h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-[600]">Children</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[18px] font-normal">Teenagers</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[18px] font-normal">Women</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[18px] font-normal">Mothers</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[18px] font-normal">Caregivers</span>
                        </div>
                        <div className="flex ml-[30px] items-center gap-2">
                            <img src="/icons/mingcute_dow-line.svg" alt="For This" className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center">
                    <img src="/images/new_thing.png" alt="For This" className="w-[302px] h-auto" />
                </div>

                <div className="w-full md:w-1/3 text-left md:pl-8">
                    <h3 className="text-[24px] font-[600] text-[#4A4B4F] mb-4">For Little Minds That Bloom</h3>
                    <p className="text-lg text-[#4A4B4F] mb-8">Daily milestone moments, sensory play, and gentle rituals that help your child thrive</p>
                    <button className="bg-[#4F7DDD] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full">Explore Our Assessments</button>
                </div>
            </div>
        </div>
    )
}

export default ForThis;
