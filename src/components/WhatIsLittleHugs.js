import React from "react";

const WhatIsLittleHugs = () => {
  return (
    <section className="w-full font-quicksand mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-8 md:mb-12">
        What is LittleHugs?
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
        {/* Image container - full width on mobile, half on desktop */}
        <div className="w-full flex justify-center lg:justify-start lg:w-1/2 order-2 lg:order-1">
          <img
            src="/images/where_litlehug.svg"
            alt="Heart in Hands"
            className="max-w-full h-auto"
          />
        </div>

        {/* Text container - full width on mobile, half on desktop */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 order-1 lg:order-2">
          <div className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug text-[#4A4B4F] mb-4">
            "Early support for the people who care the most"
          </div>
          <p className="text-base sm:text-lg md:text-xl pt-2 font-normal text-[#4A4B4F] mb-4 text-center md:text-left">
            LittleHugs is India's first emotionally intelligent care platform for women and children. We help caregivers and professionals screen for early signs of burnout, anxiety, and developmental delays — and guide them through gentle, expert-informed routines that bring clarity, not overwhelm.
          </p>
          <p className="text-base sm:text-lg md:text-xl font-normal text-[#4A4B4F] text-center md:text-left">
            Whether you're a mom navigating emotional exhaustion, or a therapist supporting dozens of children — LittleHugs was built to support you too.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLittleHugs;