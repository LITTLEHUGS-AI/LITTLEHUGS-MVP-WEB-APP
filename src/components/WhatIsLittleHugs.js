import React from "react";

const WhatIsLittleHugs = () => {
  return (
    <section className="w-full h-[784px] mx-auto mt-[64px] font-quicksand text-gray-800">
      <h2 className="text-center text-3xl font-semibold mb-10">What is LittleHugs?</h2>

      <div className="flex font-quicksand gap-[64px]">
        {/* Left Image */}
        <div className="flex-shrink-0 w-[500px] h-auto">
          <img
            src="/images/1.png" // Replace with your image path
            alt="Heart in Hands"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Right Text */}
        <div className="flex font-quicksand flex-col justify-center gap-10 max-w-[600px]">
          <blockquote className="text-5xl font-medium leading-snug">
            “We’re not a clinic. We’re your care companion.”
          </blockquote>
          <p className="text-xl text-gray-600">
            LittleHugs is a self-guided emotional and developmental wellness platform that
            offers AI-powered insights, micro-care routines, and early signals—without
            medical labels
          </p>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="flex font-quicksand justify-between mt-[64px] px-4">
        {[
          "Post Partum Support",
          "Emotional Check-ins",
          "Milestone Nudges",
          "NGO/Clinical Support",
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center w-[299px]">
            <div className="w-[210px] h-[210px] gap-64 ml-2 rounded-tr-[30px] rounded-bl-[30px] bg-[#e9e1f8] mb-3"></div>
            <span className="text-3xl font-normal">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIsLittleHugs;
