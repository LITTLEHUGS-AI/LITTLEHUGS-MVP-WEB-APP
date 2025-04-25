import React from "react";

const FAQSection = () => {
  return (
    <div className="flex flex-col items-center">
     

      {/* FAQ Section */}
      <div className="w-full h-[400px]  px-8 py-8">
        <h2 className="text-center text-5xl font-medium font-quicksand mb-12">
          Frequently asked questions and answers
        </h2>

        <div className="grid text-2xl grid-cols-2 font-quicksand gap-y-8 gap-x-10">
          <FAQButton text="Is this a diagnostic tool?" />
          <FAQButton text="Who is it for?" />
          <FAQButton text="Is it safe and private?" />
          <FAQButton text="Can I use it without a doctor?" />
        </div>
      </div>
      <div className="width-[1440px] h-[479px]">
      <img
            src="/images/2.jpg" // Replace with your image path
            alt="Heart in Hands"
            className="w-full h-auto object-cover rounded-md"
          />
      </div>
    </div>
  );
};

const FAQButton = ({ text }) => (
  <button className="w-[550px] h-[80px] bg-gray-800 text-white rounded-[30px] px-6 flex items-center justify-between text-lg font-normal hover:bg-gray-700 transition">
    {text}
    <span className="ml-4 text-lg">▾</span>
  </button>
);

export default FAQSection;
