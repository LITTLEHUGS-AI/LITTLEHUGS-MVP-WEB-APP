import React from 'react'

function MakeUsDiff() {
    const features = [
        {
            title: "Rooted in science",
            img: "/images/make_1.svg",
        },
        {
            title: "Built for both sides of care",
            img: "/images/make_2.svg",
        },
        {
            title: "Judgement-free insights",
            img: "/images/make_3.svg",
        },
        {
            title: "All-in-one, not all over the place",
            img: "/images/make_4.svg",
        },
    ];

    return (
        <div className="w-full mx-auto mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl font-medium mb-8 sm:mb-12 lg:mb-16 mt-4 sm:mt-6 lg:mt-8 text-center">
                What makes us different?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center gap-4 md:gap-6 mb-8 lg:mb-0"
                    >
                        <div className="w-full flex justify-center">
                            <img
                                src={item.img}
                                alt={`Feature ${index + 1}: ${item.title}`}
                                className="mb-2 md:mb-4 max-w-full h-auto max-h-40"
                            />
                        </div>
                        <p className="text-lg sm:text-xl font-normal text-[#4A4B4F] px-2">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MakeUsDiff