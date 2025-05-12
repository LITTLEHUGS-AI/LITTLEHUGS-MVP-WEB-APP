import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";

const { TextArea } = Input;

const PartnerFirmSetting = () => {
  const [logo, setLogo] = useState(null);
  const [numEmployees, setNumEmployees] = useState("2-9");
  const [descRows, setDescRows] = useState(window.innerWidth < 768 ? 4 : 7);

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setDescRows(window.innerWidth < 768 ? 4 : 7);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full px-3 pt-6 md:px-8 font-quicksand">
      <style>{`
        .firm-setting-select .ant-select-selector {
          border-color: #26323866 !important;
        }
        .no-upload-box.ant-upload-drag {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
        }
      `}</style>
      <h2 className="text-[16px] md:text-2xl font-normal text-gray-700 mb-4 font-quicksand">
        Firm Setting
      </h2>

      <div className="flex flex-col items-center md:hidden mb-4">
        <label htmlFor="logo-upload-input" className="cursor-pointer">
          <div className="w-16 h-16 rounded-full border-4 border-[#979FA8] flex items-center justify-center bg-[#D9DDE1] overflow-hidden">
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <svg width="32" height="32" fill="#979FA8" viewBox="0 0 24 24">
                <path d="M12 16a1 1 0 0 1-1-1V9.83l-1.59 1.58a1 1 0 1 1-1.41-1.41l3.3-3.29a1 1 0 0 1 1.41 0l3.3 3.29a1 1 0 1 1-1.41 1.41L13 9.83V15a1 1 0 0 1-1 1ZM5 20a1 1 0 0 1-1-1v-2a7 7 0 0 1 14 0v2a1 1 0 0 1-1 1Zm1-2v1h12v-1a5 5 0 0 0-10 0Z" />
              </svg>
            )}
          </div>
        </label>
        <input
          id="logo-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex flex-col gap-4 w-full md:w-[80%]">
              <Input
                placeholder="* Organisation name"
                className="h-10 md:h-[3.5rem] w-full border-[#26323866] text-[14px] md:text-base"
              />
              <TextArea
                placeholder="Description"
                rows={descRows}
                className="resize-none h-20 md:h-[10rem] w-full mt-2 border-[#26323866] text-[14px] md:text-base"
              />
            </div>
            <div className="hidden md:flex w-full md:w-[30%] flex-col gap-2 border border-[#26323866] rounded-lg p-4 items-center justify-start mt-4 md:mt-0">
              <span className="text-[14px] md:text-base font-normal text-gray-700 mb-2 font-quicksand">
                Logo Upload
              </span>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="logo-upload-input-desktop"
                  className="cursor-pointer"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#979FA8] flex items-center justify-center bg-[#D9DDE1] overflow-hidden mb-2">
                    {logo ? (
                      <img
                        src={URL.createObjectURL(logo)}
                        alt="Logo"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg
                        width="32"
                        height="32"
                        fill="#979FA8"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 16a1 1 0 0 1-1-1V9.83l-1.59 1.58a1 1 0 1 1-1.41-1.41l3.3-3.29a1 1 0 0 1 1.41 0l3.3 3.29a1 1 0 1 1-1.41 1.41L13 9.83V15a1 1 0 0 1-1 1ZM5 20a1 1 0 0 1-1-1v-2a7 7 0 0 1 14 0v2a1 1 0 0 1-1 1Zm1-2v1h12v-1a5 5 0 0 0-10 0Z" />
                      </svg>
                    )}
                  </div>
                </label>
                <span className="text-[#979FA8] text-xs md:text-base mb-2 font-quicksand">
                  Drag/Drop files here
                </span>
                <input
                  id="logo-upload-input-desktop"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
                <button
                  type="button"
                  className="bg-[#979FA8] text-white font-normal rounded-full px-4 md:px-8 py-2 text-xs md:text-base mt-1 font-quicksand"
                  onClick={() =>
                    document.getElementById("logo-upload-input-desktop").click()
                  }
                >
                  Choose file
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 w-full">
            <div className="flex flex-row w-full gap-3">
              <Select
                placeholder="* City"
                className="firm-setting-select w-1/2 h-10 md:h-[3.5rem] border-[#26323866] text-[14px] md:text-base"
                options={[]}
              />
              <Select
                placeholder="* Language"
                className="firm-setting-select w-1/2 h-10 md:h-[3.5rem] border-[#26323866] text-[14px] md:text-base"
                options={[]}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3">
            <Select
              placeholder="* Services you offer"
              className="firm-setting-select w-full md:w-1/2 h-10 md:h-[3.5rem] border-[#26323866] text-[14px] md:text-base"
              options={[]}
              suffixIcon={<span className="text-lg">▼</span>}
            />
            <Select
              placeholder="* You want LittleHugs for"
              className="firm-setting-select w-full md:w-1/2 h-10 md:h-[3.5rem] border-[#26323866] text-[14px] md:text-base"
              options={[]}
              suffixIcon={<span className="text-lg">▼</span>}
            />
          </div>

          <div className="w-full mt-4 p-3 md:p-4 border border-[#26323866] rounded-lg flex flex-col md:flex-row md:items-center gap-2 md:gap-6 bg-white">
            <span className="text-[14px] md:text-base font-normal text-gray-700 mb-2 md:mb-0 font-quicksand">
              Number of Employees
            </span>
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-4 w-full md:w-auto">
              {["Just me", "2-9", "10-50", "Over 50"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setNumEmployees(option)}
                  className={`border rounded-full px-2 py-1 md:px-4 md:py-2 text-xs md:text-base font-quicksand transition-colors duration-150 ${
                    numEmployees === option
                      ? "border-[#4F7DDD] text-[#4F7DDD] bg-[#F4F8FF]"
                      : "border-[#26323866] text-gray-700 bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          type="primary"
          className="w-full md:w-[30rem] bg-[#4F7DDDBF] text-white text-[16px] md:text-lg font-normal rounded-full px-4 md:px-16 py-2 h-auto font-quicksand"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default PartnerFirmSetting;
