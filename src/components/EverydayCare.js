import React from "react";

const features = [
  {
    title: "Non Clinical Design",
    text: "You’re not “a case”—you’re a human",
  },
  {
    title: "AI-powered, but gentle",
    text: "Nudges that feel natural, not robotic",
  },
  {
    title: "Built for families + field workers",
    text: "Empower care where it starts",
  },
  {
    title: "Designed with empathy",
    text: "Validating tone, safe check-ins",
  },
];

const EverydayCare = () => {
  return (
    <div className="w-full h-[444px] mx-auto font-quicksand flex flex-col items-center justify-center">
      <h2 className="text-3xl font-medium mb-16 text-center">
        Emotional intelligence meets everyday care
      </h2>

      <div className="flex justify-between gap-[64px]">
        {features.map((item, index) => (
          <div
            key={index}
            className=" h-[308px] flex flex-col items-center text-center gap-[28px]"
          >
            <h3 className="text-xl font-medium">{item.title}</h3>
            <div className="w-[150px] h-[150px] rounded-[250px] bg-[#FFF9E5]" />
            <p className="text-xl text-black">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EverydayCare;
