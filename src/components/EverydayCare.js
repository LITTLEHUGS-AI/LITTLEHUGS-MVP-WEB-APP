import React from "react";

const EverydayCare = () => {
  const features = [
    {
      title: "Auto-generated personalised insights",
      img: "/images/care_1.svg",
    },
    {
      title: "Built on WHO, IAP & CDC-aligned tools",
      img: "/images/care_2.svg",
    },
    {
      title: "Used by moms, women, caregivers, schools, and clinics",
      img: "/images/care_3.svg",
    },
    {
      title: "Clear follow-up routines and easy-to-use dashboards",
      img: "/images/care_4.svg",
    },
  ];

  return (
    <div className="w-full px-5 mx-auto mt-[68px] font-quicksand flex flex-col items-center justify-center">
      <h2 className="text-3xl font-medium mb-16 mt-8 text-center">
        Emotional intelligence meets everyday care
      </h2>

      <div className="flex justify-between gap-[64px]">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-[28px]"
          >
            <h3 className="text-xl font-normal">{item.title}</h3>
            <img
              src={`${item.img}`}
              alt={`Care ${index + 1}`}
              className="w-24 h-24 mb-4"
            />
            {/* <p className="text-xl text-black">{item.text}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EverydayCare;
