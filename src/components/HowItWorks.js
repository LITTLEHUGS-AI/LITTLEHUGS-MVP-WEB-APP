import React from "react";

const HowItWorks = () => {
  const data = [
    "Take a quick 5-minute self-check",
    "Receive friendly insights and nudges",
    "Follow personalized care tips and rituals",
    "Track your journey, share when needed",
  ];

  return (
    <section className="w-full px-5 font-quicksand text-center text--800 mt-[20px]">
      <h2 className="text-4xl font-medium font-quicksand text-[#4A4B4F]">How it works?</h2>
      <p className="text-xl font-medium font-quicksand text-[#4A4B4F] mt-1">Simple . Supportive . Self-led</p>

      {/* Steps */}
      <div className="flex font-quicksand justify-between items-start gap-[32px] mt-10 px-4">
        {data.map((step, index) => (
          <div key={index} className="flex flex-col items-center h-200">
            <img
              src={`/images/step_${index + 1}.svg`}
              alt={`Step ${index + 1}`}
              className="mb-4"
            />
            <p className="text-xl text-[#4A4B4F] font-medium text-start">{index + 1}. {step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
