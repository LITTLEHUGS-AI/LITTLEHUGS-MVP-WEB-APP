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
            title: " All-in-one, not all over the place",
            img: "/images/make_4.svg",
        },
    ];

    return (
        <div className="w-full px-5 mx-auto mt-[68px] font-quicksand flex flex-col items-center justify-center">
            <h2 className="text-3xl font-medium mb-16 mt-8 text-center">
                What makes us different?
            </h2>

            <div className="flex justify-between gap-[64px]">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center gap-[28px]"
                    >
                        <img
                            src={`${item.img}`}
                            alt={`Care ${index + 1}`}
                            className="mb-4"
                        />
                        <p className="text-xl font-normal text-[#4A4B4F]">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MakeUsDiff
