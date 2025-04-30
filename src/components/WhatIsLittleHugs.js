import React from "react";

const WhatIsLittleHugs = () => {
  return (
    <section className="w-full pt-4 font-quicksand mt-[120px]">
      <h2 className="text-center text-3xl font-semibold">What is LittleHugs?</h2>

      <div className="flex gap-4 justify-between p-4">
        <div className="flex w-full justify-center items-center">
          <img
            src="/images/where_litlehug.svg"
            alt="Heart in Hands"
            className=""
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="text-[42px] font-medium leading-snug text-[#4A4B4F]">
            “Early support for the people who care the most”
          </div>
          <p className="text-xl pt-2 font-normal text-[#4A4B4F]">
            LittleHugs is India’s first emotionally intelligent care platform for women and children. We help caregivers and professionals screen for early signs of burnout, anxiety, and developmental delays — and guide them through gentle, expert-informed routines that bring clarity, not overwhelm.
          </p>
          <p className="text-xl font-normal text-[#4A4B4F]">
            Whether you're a mom navigating emotional exhaustion, or a therapist supporting dozens of children — LittleHugs was built to support you too.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLittleHugs;
