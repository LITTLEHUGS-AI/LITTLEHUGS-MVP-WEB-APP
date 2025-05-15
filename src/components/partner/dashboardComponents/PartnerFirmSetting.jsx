import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input, Spin } from "antd";
import { apiClient } from "../../../api/api-client";
import { toast } from "react-toastify";
import { usePartner } from "../../../lib/PartnerContext";
import CommonLoader from "./CommonLoader";
import {
  updateLogo,
  getOrganizationProfile,
  updateOrganizationProfile,
} from "../../../api/partner-apis";

const { TextArea } = Input;

// Options for the dropdowns
const SERVICES_OFFERED_OPTIONS = [
  { label: "Developmental Screening", value: "Developmental Screening" },
  { label: "Health Monitoring", value: "Health Monitoring" },
  { label: "School Readiness", value: "School Readiness" },
  { label: "Behavioral Therapy", value: "Behavioral Therapy" },
  { label: "Parental Counseling", value: "Parental Counseling" },
];

const LITTLEHUGS_FOR_OPTIONS = [
  { label: "Screening Tool", value: "Screening Tool" },
  { label: "Progress Tracking", value: "Progress Tracking" },
  { label: "Report Sharing", value: "Report Sharing" },
  { label: "Team Collaboration", value: "Team Collaboration" },
  { label: "Child Wellness Nudges", value: "Child Wellness Nudges" },
  { label: "Parental Support Nudges", value: "Parental Support Nudges" },
];

// Custom multi-select dropdown component
const CustomMultiSelectDropdown = ({
  placeholder,
  options,
  selected,
  setSelected,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionToggle = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div ref={ref} className="relative w-full md:w-1/2">
      <div
        className={`flex items-center justify-between border border-[#26323866] rounded-lg px-4 py-2 cursor-pointer bg-white`}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
      >
        <span
          className={`select-none ${
            selected.length === 0 ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {selected.length === 0
            ? placeholder
            : options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")}
        </span>
        <span className="text-lg text-gray-400">&#x25BC;</span>
      </div>
      {open && (
        <div className="absolute left-0 right-0 z-10 bg-white border border-[#26323866] rounded-b-lg shadow-lg mt-1">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => handleOptionToggle(option.value)}
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom single-select dropdown component
const CustomSingleSelectDropdown = ({
  placeholder,
  options,
  selected,
  setSelected,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-1/2">
      <div
        className={`flex items-center justify-between border border-[#26323866] rounded-lg px-4 py-2 cursor-pointer bg-white`}
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
      >
        <span
          className={`select-none ${
            !selected ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {selected ? selected : placeholder}
        </span>
        <span className="text-lg text-gray-400">&#x25BC;</span>
      </div>
      {open && (
        <div className="absolute left-0 right-0 z-10 bg-white border border-[#26323866] rounded-b-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              <input
                type="radio"
                checked={selected === option}
                readOnly
                className="mr-3 w-4 h-4"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const getInitialDescRows = () =>
  typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 7;

const PartnerFirmSetting = () => {
  const { setLogo } = usePartner();

  const [logo, setLogoLocal] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [numEmployees, setNumEmployees] = useState("2-9");
  const [descRows, setDescRows] = useState(getInitialDescRows);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [littleHugsFor, setLittleHugsFor] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch organization profile data
  const fetchOrganizationProfile = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) setProfileLoading(true);
        const response = await getOrganizationProfile();
        console.log("response------------", response);
        if (response) {
          setOrganisationName(response?.organisation_name || "");
          setDescription(response?.description || "");
          setServicesOffered(response?.org_offers || []);
          setLittleHugsFor(response?.littlehug_for || []);
          setSelectedCity(response?.city || "");
          setSelectedLanguage(response?.language || "");
          setNumEmployees(response?.number_of_employees || "");
          if (response?.logo) {
            setLogo(response.logo);
            setLogoLocal(response.logo);
          }
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch organization profile"
        );
      } finally {
        if (showLoader) setProfileLoading(false);
      }
    },
    [setLogo]
  );

  useEffect(() => {
    fetchOrganizationProfile(true);
  }, [fetchOrganizationProfile]);

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoLocal(file);
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setDescRows(getInitialDescRows());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchCountriesAndLanguages() {
      const data = await apiClient.get("https://restcountries.com/v3.1/all");
      const languages = new Set();
      const countries = new Set();
      data.forEach((country) => {
        if (country.languages)
          Object.values(country.languages).forEach((lang) =>
            languages.add(lang)
          );
        if (country.name?.common) countries.add(country.name.common);
      });
      setAllLanguages([...languages].sort());
      setAllCountries([...countries].sort());
    }
    fetchCountriesAndLanguages();
  }, []);

  const isFormValid =
    organisationName.trim() &&
    description.trim() &&
    selectedCity &&
    selectedLanguage &&
    servicesOffered.length > 0 &&
    littleHugsFor.length > 0;

  const handleSave = async () => {
    if (!isFormValid) return;
    setLoading(true);
    try {
      if (logoFile) {
        await updateLogo(logoFile);
      }
      await updateOrganizationProfile({
        organisation_name: organisationName,
        description,
        org_offers: servicesOffered,
        littlehug_for: littleHugsFor,
        city: selectedCity,
        language: selectedLanguage,
        number_of_employees: numEmployees,
      });
      await fetchOrganizationProfile(false);
      setLogoFile(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

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
            {logo !== null ? (
              <img
                src={logo}
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
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
              <TextArea
                placeholder="Description"
                rows={descRows}
                className="resize-none h-20 md:h-[10rem] w-full mt-2 border-[#26323866] text-[14px] md:text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                        src={
                          typeof logo === "string"
                            ? logo
                            : URL.createObjectURL(logo)
                        }
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
              <CustomSingleSelectDropdown
                placeholder="* City"
                options={allCountries}
                selected={selectedCity}
                setSelected={setSelectedCity}
              />
              <CustomSingleSelectDropdown
                placeholder="* Language"
                options={allLanguages}
                selected={selectedLanguage}
                setSelected={setSelectedLanguage}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3">
            {/* Services you offer */}
            <CustomMultiSelectDropdown
              placeholder="* Services you offer"
              options={SERVICES_OFFERED_OPTIONS}
              selected={servicesOffered}
              setSelected={setServicesOffered}
            />
            {/* You want LittleHugs for */}
            <CustomMultiSelectDropdown
              placeholder="* You want LittleHugs for"
              options={LITTLEHUGS_FOR_OPTIONS}
              selected={littleHugsFor}
              setSelected={setLittleHugsFor}
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
        <CommonLoader
          loading={loading}
          disabled={!isFormValid || loading}
          onClick={handleSave}
          className={`w-full md:w-[30rem] text-white text-[16px] md:text-lg font-normal rounded-full px-4 md:px-16 py-2 h-auto font-quicksand ${
            isFormValid ? "bg-[#4F7DDD]" : "bg-[#4F7DDDBF] cursor-not-allowed"
          }`}
          type="primary"
        >
          {loading ? "Saving..." : "Save"}
        </CommonLoader>
      </div>
    </div>
  );
};

export default PartnerFirmSetting;
