import React from "react";

const PartnerHeader = () => {
  return (
    <div className="hidden md:flex w-full flex-row items-center justify-between font-quicksand px-2 py-2 md:px-6 md:py-4">
      {/* <div className="hidden md:flex w-[70%] border border-gray-300 rounded-[10px] bg-white items-center justify-between px-8 py-3 mb-4">
        <div className="flex-1 flex justify-center">
          <span className="text-xl font-normal text-gray-700">Quote</span>
        </div>
      </div> */}
      {/* Mobile: Quote input */}
      {/* <div className="flex md:hidden w-full">
        <input
          type="text"
          placeholder="Quote"
          className="w-full border border-gray-300 rounded-[10px] px-4 py-2 text-base font-quicksand"
        />
      </div> */}

      <div className="flex items-end gap-1 flex-col ml-auto">
        <div className="flex items-center gap-1 flex-col">
          <span className="text-xs text-[#4F7DDD] font-semibold">
            POWERED BY
          </span>
          <div className="flex items-center gap-1">
            <img
              src="/images/logo.jpg"
              alt="LittleHugs"
              className="h-7 w-auto"
            />
            <span className="text-2xl font-bold text-blue-600">LittleHugs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHeader;
