import React from "react";

const HowItWorks = () => {
  const data = [
    "Take a quick 5-minute self-check",
    "Receive friendly insights and nudges",
    "Follow personalized care tips and rituals",
    "Track your journey, share when needed",
  ];

  return (
    <section className="w-full font-quicksand text-center mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#4A4B4F]">
        How it works?
      </h2>
      <p className="text-lg sm:text-xl font-medium text-[#4A4B4F] mt-1">
        Simple . Supportive . Self-led
      </p>

      {/* Steps - Grid for small screens, Flex for larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex justify-between items-start gap-6 md:gap-8 mt-8 md:mt-10">
        {data.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center mb-8 sm:mb-6 lg:mb-0"
          >
            <div className="w-full flex justify-center">
              <img
                src={`/images/step_${index + 1}.svg`}
                alt={`Step ${index + 1}`}
                className="mb-4 max-w-full h-auto max-h-40"
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] font-medium text-center">
              {index + 1}. {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;