import React from "react";

const EverydayCare = ({ title, subtitle, features }) => {
  return (
    <div className="w-full mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px] font-quicksand flex flex-col items-center justify-center">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center ${subtitle ? "mb-4 sm:mb-6" : "mb-8 sm:mb-12 lg:mb-16"}`}>
        {title}
      </h2>
      {subtitle && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-8 sm:mb-12 lg:mb-16 text-center">
          {subtitle}
        </h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center gap-4 md:gap-6 mb-8 lg:mb-0"
          >
            <div className="w-full flex justify-center">
              <img
                src={`${item.img}`}
                alt={`Care ${index + 1}`}
                className="mb-2 md:mb-4 max-w-full h-auto max-h-48"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-normal">{item.title}</h3>
            {item.text && <p className="text-base sm:text-lg text-black">{item.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EverydayCare;