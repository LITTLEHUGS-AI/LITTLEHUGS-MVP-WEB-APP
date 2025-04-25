import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full h-[490px] mx-auto mt-[64px] font-quicksand text-center text--800">
      {/* Title */}
      <h2 className="text-4xl font-medium font-quicksand">How it works?</h2>
      <p className="text-xl font-medium font-quicksand text-gray-500 mt-1">Simple . Supportive . Self-led</p>

      {/* Steps */}
      <div className="flex font-quicksand justify-between items-start gap-[32px] mt-10 px-4">
        {[
          "Take a quick 5-minute self-check",
          "Receive friendly insights and nudges",
          "Follow personalized care tips and rituals",
          "Track your journey, share when needed",
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center h-200">
            <div className="w-[150px] h-[150px] bg-[#FFF8DC] rounded-[250px] mt-10 mb-12"></div>
            <p className="text-xl leading-snug">{index + 1}. {step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
