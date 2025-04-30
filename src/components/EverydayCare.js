import React from "react";

const EverydayCare = ({ title, subtitle, features }) => {

  return (
    <div className="w-full px-[80px] mx-auto mt-[120px] font-quicksand flex flex-col items-center justify-center">
      <h2 className={`text-5xl font-medium text-center ${subtitle ? "mb-8" : "mb-16"}`}>
        {title}
      </h2>
      {subtitle && (
        <h2 className="text-5xl font-medium mb-16 text-center">
          {subtitle}
        </h2>
      )}

      <div className={`w-full flex justify-between`}>
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
