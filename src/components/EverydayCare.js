import React from "react";

const EverydayCare = ({ title, subtitle, features }) => {

  return (
    <div className="w-full px-5 mx-auto mt-[120px] font-quicksand flex flex-col items-center justify-center">
      <h2 className={`text-3xl leading-10 font-medium text-center ${subtitle ? "" : "mb-16"}`}>
        {title}
      </h2>
      {subtitle && (
        <h2 className="text-3xl leading-10 font-medium mb-16 text-center">
          {subtitle}
        </h2>
      )}

      <div className={`flex justify-between ${subtitle ? "gap-[160px]" : "gap-[64px]"} `}>
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
            <h3 className="text-xl font-normal">{item.title}</h3>
            {/* <p className="text-xl text-black">{item.text}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EverydayCare;
