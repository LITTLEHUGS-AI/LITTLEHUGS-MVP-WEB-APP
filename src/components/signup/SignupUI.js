import { useEffect, useState, useRef, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from "../common/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import { useAuth } from "../../lib/AuthContext";
import useSignIn from "../signin/useSignIn";
import { toastErrorMessage } from "../common/Constants";
import { apiClient, setupApiAccessToken } from "../../api/api-client";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import SearchableSelect from "../../widgets/layouts/SearchableSelect";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  country: "",
  city: "",
  language: "",
  organisation_type: "",
  is_organization: false,
};

function SignupUI({
  onSubmit,
  isSuccess,
  isError,
  isPending,
  message,
  visible,
  handleShowPassword,
  SignInFormSchema,
  isOtp,
  setIsOtp,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // const apiUrl = process.env.REACT_APP_API_URL;

  const [showPopup, setShowPopup] = useState(null);
  const [email, setEmail] = useState("");
  const [allLanguages, setAllLanguages] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [showWomenPopup, setshowWomenPopup] = useState(false);
  const [showChildPopup, setshowChildPopup] = useState(false);
  const [showMenPopup, setshowMenPopup] = useState(false);

  const [programmeLock, setProgramLock] = useState(false);

  const { otpMutation, motherMutation, childMutation } = useSignIn();
  const { login } = useAuth();
  // const { login, hasAuthenticated } = useAuth();
  const [accessToken, setAccessToken] = useState();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [orgType, setorgType] = useState("");

  const womenFormRef = useRef(null);
  const childFormRef = useRef(null);
  const menFormRef = useRef(null);

  const partnerFormRef = useRef(null);

  const methods = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: zodResolver(SignInFormSchema),
  });
  const { watch } = methods;
  const formData = watch();

  const [invitee, setInvite] = useState({});


  const womenGoalDropdownRef = useRef(null);
  const childGoalDropdownRef = useRef(null);
  const menGoalDropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (childGoalDropdownRef.current && !childGoalDropdownRef.current.contains(event.target)) setIsChildGoalOpen(false);
      if (womenGoalDropdownRef.current && !womenGoalDropdownRef.current.contains(event.target)) setIsWomenGoalOpen(false);
      if (menGoalDropdownRef.current && !menGoalDropdownRef.current.contains(event.target)) setIsMenGoalOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSubmit = async (data) => {

    if (invitee && invitee.type === 'partner') {

      const url = `${process.env.REACT_APP_API_URL}/v1/api/register-invited-partner`;
      const payload = {
        organisation_type: methods.getValues('organisation_type'),
        email: methods.getValues('email'),
        name: methods.getValues('name'),
        password: methods.getValues('password'),
        country: methods.getValues('country'),
        city: methods.getValues('city'),
        language: methods.getValues('language'),
        token: invitee.token,
      };
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();

        localStorage.setItem('accessToken', `token ${data.token}`)
        localStorage.setItem('userType', 'partner');
        setAccessToken(`token ${data.token}`)
        // setShowPopup(2);
        navigate("/partner/dashboard");
      } catch (error) {
        console.error('Error:', error);
      }

      return;
    }

    data = {
      ...data,
      is_personal: selectedUserType === "personal" ? true : false,
      is_organization: selectedUserType === "personal" ? false : true,
    };

    if (selectedUserType === 'partner') data = { ...data, organisation_type: orgType }

    onSubmit(data, invitee);
    setEmail(data.email);
  };

  useEffect(() => {
    if (isSuccess) {
      methods.reset(INITIAL_VALUES);
      if (isOtp === false && invitee && Object.keys(invitee).length > 0) {
        if (invitee.type && invitee.type === 'user') {
          setShowPopup(1);
        }
        if (invitee.type && invitee.type === 'team') navigate("/partner/dashboard");
      }
    }
  }, [isSuccess, methods, invitee, isOtp, navigate]);

  // const handleLogin = (logintype) => {
  //   let redirect_url = "";
  //   if (logintype === "google-login") {
  //     redirect_url = `${window.location.origin}/auth/google/callback`;
  //   } else {
  //     redirect_url = `${window.location.origin}/auth/ms/callback`;
  //   }
  //   sessionStorage.removeItem("chats");
  //   axios
  //     .get(`${apiUrl}/v1/api/google/login?redirect_url=${redirect_url}`)
  //     .then((response) => {
  //       window.location.href = response.data.authorization_url;
  //     });
  // };

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const otpdata = otpMutation?.data;
  const [resentOtp, setResentOtp] = useState(false);

  const [selectedUserType, setSelectedUserType] = useState("personal");


  const [isWomenGoalOpen, setIsWomenGoalOpen] = useState(false);
  const [selectedWomenGoalOptions, setSelectedWomenGoalOptions] = useState([]);
  const toggleWomenGoalDropdown = () => setIsWomenGoalOpen(!isWomenGoalOpen);
  const toggleWomenGoalOption = (option) => {
    setSelectedWomenGoalOptions((prevSelected) => {
      if (prevSelected.some((item) => item === option))
        return prevSelected.filter((item) => item !== option);
      else return [...prevSelected, option];
    });
  };


  const [isMenGoalOpen, setIsMenGoalOpen] = useState(false);
  const [selectedMenGoalOptions, setSelectedMenGoalOptions] = useState([]);
  const toggleMenGoalDropdown = () => setIsMenGoalOpen(!isMenGoalOpen);
  const toggleMenGoalOption = (option) => {
    setSelectedMenGoalOptions((prevSelected) => {
      if (prevSelected.some((item) => item === option))
        return prevSelected.filter((item) => item !== option);
      else return [...prevSelected, option];
    });
  };


  const childOptions = ["Growth", "Nutrition", "Activity", "Developmental", "Wellness"];
  const [isChildGoalOpen, setIsChildGoalOpen] = useState(false);
  const [selectedChildGoalOptions, setSelectedChildGoalOptions] = useState([]);
  const toggleChildGoalDropdown = () => setIsChildGoalOpen(!isChildGoalOpen);
  const toggleChildGoalOption = (option) => {
    setSelectedChildGoalOptions((prevSelected) => {
      if (prevSelected.some((item) => item === option))
        return prevSelected.filter((item) => item !== option);
      else return [...prevSelected, option];
    });
  };


  const [isPartnerGoalOpen, setIsPartnerGoalOpen] = useState(false);
  const [selectedPartnerGoalOptions, setSelectedPartnerGoalOptions] = useState([]);
  const togglePartnerGoalDropdown = () => setIsPartnerGoalOpen(!isPartnerGoalOpen);
  const togglePartnerGoalOption = (option) => {
    setSelectedPartnerGoalOptions((prevSelected) => {
      if (prevSelected.some((item) => item === option))
        return prevSelected.filter((item) => item !== option);
      else return [...prevSelected, option];
    });
  };


  const [isPartnerServiceOpen, setIsPartnerServiceOpen] = useState(false);
  const [selectedPartnerServiceOptions, setSelectedPartnerServiceOptions] = useState([]);
  const togglePartnerServiceDropdown = () => setIsPartnerServiceOpen(!isPartnerServiceOpen);
  const togglePartnerServiceOption = (option) => {
    setSelectedPartnerServiceOptions((prevSelected) => {
      if (prevSelected.some((item) => item === option))
        return prevSelected.filter((item) => item !== option);
      else return [...prevSelected, option];
    });
  };


  const [womenDP, setWomenDP] = useState("/images/women-demo.png");
  const [childDP, setChildDP] = useState("/images/child-demo.png");
  const [menDP, setMenDP] = useState("/images/men-demo.jpg");


  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendEnabled(true); // enable resend after timer hits 0
    }
  }, [timer]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      setOtpError(false);
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmitForOTP = () => {
    if (otp.some((digit) => digit === "")) {
      setOtpError(true);
      return;
    }
    setResentOtp(false);
    const payload = {
      email: email,
      otp_code: otp.join(""),
    };
    otpMutation.mutate(payload);
    setIsOtp(true);
    setOtp(Array(6).fill(""));
  };

  const handleResendOtp = () => {
    const payload = {
      email: email,
    };
    otpMutation.mutate(payload);
    setOtp(Array(6).fill(""));
    inputsRef.current[0].focus();
    setTimer(60);
    setResendEnabled(false);
    setResentOtp(true);
  };

  useEffect(() => {
    if (otpMutation.isSuccess) {
      if (!resentOtp) {
        login(otpdata);
        setAccessToken(`token ${otpdata.token}`);
        setIsOtp(false);

        if (selectedUserType === "personal") setShowPopup(1);
        if (selectedUserType === "partner") setShowPopup(2);
      }
    }
  }, [login, otpdata, otpMutation.isSuccess, setIsOtp, resentOtp, selectedUserType]);

  useEffect(() => {
    if (motherMutation.isSuccess) {
      // setShowWellnessPopup(false);
      navigate("/");
      // addToast({
      //     type: "error",
      //     message: "Mother profile created successfully",
      // });
    }
  }, [motherMutation.isSuccess, navigate]);

  useEffect(() => {
    if (childMutation.isSuccess) {
      // setChildShowWellnessPopup(false);
      navigate("/");
      // addToast({
      //     type: "error",
      //     message: "Child profile created successfully",
      // });
    }
  }, [childMutation.isSuccess, navigate]);

  useEffect(() => {
    if (otpMutation.isError && otpMutation?.error?.response?.status !== 401) {
      // addToast({
      //     type: "error",
      //     message: otpMutation?.error?.data.error || "Unknown error occurred",
      // });
      toastErrorMessage({
        // content: "Unknown error occurred",
        content: otpMutation?.error?.data.error || "Unknown error occurred",
        option: { type: "" },
      });
    }
  }, [otpMutation.isError, otpMutation?.error]);

  useEffect(() => {
    if (
      motherMutation.isError &&
      motherMutation?.error?.response?.status !== 401
    ) {
      // addToast({
      //     type: "error",
      //     message: motherMutation?.error?.response?.data?.message || "Unknown error occurred",
      // });
      toastErrorMessage({
        content:
          motherMutation?.error?.response?.data?.message ||
          "Unknown error occurred",
        option: { type: "" },
      });
    }
  }, [motherMutation.isError, motherMutation?.error]);

  useEffect(() => {
    if (
      childMutation.isError &&
      childMutation?.error?.response?.status !== 401
    ) {
      toastErrorMessage({
        content: childMutation?.error?.response?.data?.message || "Unknown error occurred",
        option: { type: "" },
      });
    }
  }, [childMutation.isError, childMutation?.error]);


  // Fetch Countries
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/api/country/`)
      .then(response => response.json())
      .then(result => {
        if (Array.isArray(result)) {
          setAllCountries(result);
        } else {
          setAllCountries([]);
        }
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);





  const fetchCityLanguage = useCallback((country) => {
    fetch(`${process.env.REACT_APP_API_URL}/v1/api/city/?country_code=${country}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && Array.isArray(data[0]?.name)) {
          const cities = data[0].name;
          if (cities.length < 1) toast.error('Got Zero Cities Names');
          else setAllCities([...cities]);
        }
      })
      .catch(error => {
        console.error('City fetch error:', error);
      });

    fetch(`${process.env.REACT_APP_API_URL}/v1/api/language/?country_code=${country}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && Array.isArray(data[0]?.name)) {
          const languages = data[0].name;
          if (languages.length < 1) toast.error('Got Zero Languages Names');
          else setAllLanguages([...languages]);
        }
      })
      .catch(error => {
        console.error('Language fetch error:', error);
      });
  }, []);


  useEffect(() => {
    if (formData.country) fetchCityLanguage(formData.country)
  }, [formData.country, fetchCityLanguage, partnerFormRef])



  async function handleProfile() {
    setupApiAccessToken(accessToken);

    if (selectedUserType === "personal") {
      const promises = [];
      try {
        if (showWomenPopup) {
          const womenFormDataRaw = new FormData(womenFormRef.current);

          const womenProfilePromise = apiClient
            .post(`${process.env.REACT_APP_API_URL}/v1/api/mother-profile`, {
              dob: womenFormDataRaw.get("dob"),
              life_stage: womenFormDataRaw.get("lifeStage"),
              weight: womenFormDataRaw.get("weight"),
              height: womenFormDataRaw.get("height"),
              life_style: womenFormDataRaw.get("lifeStyle"),
              occupation: womenFormDataRaw.get("occupation"),
              intent: [...selectedWomenGoalOptions],
              tone_prefrence: womenFormDataRaw.get("tone_prefrence")
            })
            .then((response) => {
              if (response.profile) {
                console.log("Mother profile data successfully sent");
              } else {
                toast.error('Error in Mother Profile');
              }
            });

          promises.push(womenProfilePromise);
        }


        if (showChildPopup) {
          const childFormDataRaw = new FormData(childFormRef.current);

          const childProfilePromise = apiClient
            .post(`${process.env.REACT_APP_API_URL}/v1/api/child-profile`, {
              name: childFormDataRaw.get("name"),
              dob: childFormDataRaw.get("dob"),
              age_group: childFormDataRaw.get("ageGroup"),
              goal: [...selectedChildGoalOptions],
              tone_prefrence: childFormDataRaw.get("tone_prefrence"),
              relation_with_child: childFormDataRaw.get("relationWithChild"),
              occupation: childFormDataRaw.get("occupation"),
              weight: childFormDataRaw.get("weight"),
              height: childFormDataRaw.get("height"),
            })
            .then((response) => {
              if (response.profile) {
                console.log("Child profile data successfully sent");
              } else {
                toast.error('Error in Child Profile');
              }
            });

          promises.push(childProfilePromise);
        }


        if (showMenPopup) {
          const menFormDataRaw = new FormData(menFormRef.current);

          const menProfilePromise = apiClient
            .post(`${process.env.REACT_APP_API_URL}/v1/api/men-profile`, {
              name: menFormDataRaw.get("name"),
              dob: menFormDataRaw.get("dob"),
              age_group: menFormDataRaw.get("ageGroup"),
              life_stage: menFormDataRaw.get("lifeStage"),
              life_style: menFormDataRaw.get("lifeStyle"),
              intent: [...selectedMenGoalOptions],
              tone_prefrence: menFormDataRaw.get("tone_prefrence"),
              relation_with_child: menFormDataRaw.get("relationWithChild"),
              occupation: menFormDataRaw.get("occupation"),
              weight: menFormDataRaw.get("weight"),
              height: menFormDataRaw.get("height"),
            })
            .then((response) => {
              if (response.profile) {
                console.log("Men profile data successfully sent");
              } else {
                toast.error('Error in Men Profile');
              }
            });

          promises.push(menProfilePromise);
        }

        await Promise.all(promises);

        navigate("/personal/dashboard");
      } catch (error) {
        toast.error('Error', error);
      }
    }

    if (selectedUserType === "partner") {
      const partnerFormDataRaw = new FormData(partnerFormRef.current);

      apiClient
        .post(`${process.env.REACT_APP_API_URL}/v1/api/organisation-profile`, {
          organisation_name: partnerFormDataRaw.get("org_name"),
          description: partnerFormDataRaw.get("description"),
          organisation_type: orgType,
          org_offers: [...selectedPartnerServiceOptions],
          littlehug_for: [...selectedPartnerGoalOptions],
        })
        .then((response) => {
          if (response) {
            navigate("/partner/dashboard");
          } else {
            alert("Some Error Occured");
          }
        });
    }
  }


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if ((queryParams.get('invite-type') === 'partner-team') && token) {

      setInvite({ type: 'team', token });

      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/member-invite/${token}`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
            }
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();
          if (data.name && data.email) {
            methods.setValue('password', '');
            methods.setValue('name', data.name);
            methods.setValue('email', data.email);
            if (data.organisation_type) methods.setValue('organisation_type', data.organisation_type);
            setSelectedUserType('partner')
          }
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchUserData();
    }


    if ((queryParams.get('invite-type') === 'partner-user') && token) {

      setInvite({ type: 'user', token });

      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/user-invited/${token}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();
          if (data.name && data.email) {
            methods.setValue('name', data.name);
            methods.setValue('email', data.email);
            methods.setValue('password', '');
            setSelectedUserType('personal');
            if (data.programme) {
              setProgramLock(true);
              if (data.programme.includes("Women Wellness 360")) setshowWomenPopup(true);
              if (data.programme.includes("Child Wellness 360")) setshowChildPopup(true);
              if (data.programme.includes("SEL Assessment 360")) setshowMenPopup(true);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchUserData();
    }


    if ((queryParams.get('invite-type') === 'partner') && token) {

      setInvite({ type: 'partner', token });

      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/partner-invite/${token}`, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();
          if (data.name && data.email && data.partner_type) {
            methods.setValue('organisation_type', data.partner_type);
            methods.setValue('name', data.name);
            methods.setValue('email', data.email);
            methods.setValue('password', '');
            setSelectedUserType('partner')
          }
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchUserData();
    }


  }, [location, methods]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fef9f6]">
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/signup.png')",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center, bottom left",
          backgroundSize: "cover, contain",
        }}
      >
        <div className="flex w-full max-w-6xl items-center justify-center p-6">
          {/* Left Decorative Side */}
          <div className="hidden md:flex w-1/2 flex-col justify-center items-start relative z-10">
            <h1 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
              A Hug Ahead of Time
            </h1>
          </div>

          {/* Right Form Side */}
          <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-md p-10 shadow-md relative z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Sign Up
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>


            {Object.keys(invitee).length === 0 &&
              <div className="flex items-center justify-center my-6">
                <div className="inline-flex border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setSelectedUserType("personal")}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 ${selectedUserType === "personal"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Personal
                  </button>
                  <button
                    onClick={() => setSelectedUserType("partner")}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 ${selectedUserType === "partner"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    Partner
                  </button>
                </div>
              </div>
            }

            <FormProvider {...methods}>
              <form
                className="space-y-4"
                onSubmit={methods.handleSubmit(handleSubmit)}
              >

                {(selectedUserType === 'partner') &&
                  <select
                    {...methods.register("organisation_type")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                    onChange={(e) => { setorgType(e.target.value) }}
                    disabled={invitee.token}
                    required
                  >
                    <option value="" hidden selected>
                      * Organisation Type
                    </option>
                    {['Clinics', 'Schools', 'NGO', 'Therapy Center', 'Corporate'].map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                }

                <InputField
                  name="name"
                  fieldId="name"
                  isReadOnly={true}
                  placeHolder="Enter your Name"
                />

                <InputField
                  label="Email"
                  name="email"
                  input_type="email"
                  isReadOnly={true}
                  fieldId="email"
                  placeHolder="Enter your Email"
                  message={isError ? message : ""}
                  isDisabled={isPending}
                />

                <InputField
                  label="Password"
                  input_type={visible.password ? "text" : "password"}
                  name="password"
                  fieldId="password"
                  placeHolder="Enter your Password"
                  visible
                  showIcon={visible.password}
                  handleChange={handleShowPassword}
                  isDisabled={isPending}
                />


                <SearchableSelect
                  name="country"
                  placeholder="* Country"
                  options={allCountries}
                  key1="name"
                  key2="code"
                  setValue={methods.setValue}
                />


                <div className="flex gap-4">

                  <SearchableSelect
                    name="city"
                    placeholder="* City"
                    options={allCities}
                    register={methods.register}
                    setValue={methods.setValue}
                  />

                  <select  {...methods.register("language")} defaultValue="" className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                    {selectedUserType === 'personal' && <option value="" hidden>* Mother Tongue</option>}
                    {selectedUserType === 'partner' && <option value="" hidden>* Language</option>}
                    {allLanguages.map((language, i) => (
                      <option key={i} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to LittleHugs’s{" "}
                    <span
                      onClick={() => setShowPopup("Terms&Conditions")}
                      className="text-blue-600 underline"
                    >
                      Terms & Conditions
                    </span>{" "}
                    and acknowledge the{" "}
                    <span
                      onClick={() => setShowPopup("PrivacyPolicy")}
                      className="text-blue-600 underline"
                    >
                      Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`${isPending ? "sign-load" : "sign"} w-full ${!isTermsAccepted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#4776E6] hover:bg-[#365fbd]"
                    } text-white text-sm py-2 rounded-full transition`}
                  disabled={!isTermsAccepted}
                >
                  {isPending ? <ButtonLoader /> : " Sign Up"}
                </button>

                {/* <div className="flex justify-center">
                  <button
                    type="button"
                    className="mt-2 w-full flex items-center justify-center gap-2 text-sm bg-[#fef3e6] border border-gray-200 rounded-full py-2 hover:bg-[#f8e9d8]"
                    onClick={() => handleLogin("google-login")}
                  >
                    <img
                      src="/icons/google-icon.svg"
                      alt="Google"
                      className="w-10 h-5 justify-center"
                    />
                  </button>
                </div> */}

              </form>
            </FormProvider>

          </div>
        </div>

        {/* Popup Modal */}
        {showPopup === 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-[#FFF9E8] p-6 rounded-md shadow-lg max-w-[950px] mx-6">

              <div className="flex items-center justify-between space-x-6 mb-4">

                <div />

                <div className="flex max-w-60 justify-between items-center space-x-6">
                  {["Profile Selection", "Profile Completion"].map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 === currentStep
                          ? "bg-blue-500 text-white"
                          : index + 1 < currentStep
                            ? "bg-blue-500 text-white"
                            : "bg-gray-400 text-white"
                          }`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`mt-2 text-sm ${index + 1 === currentStep ? "text-blue-500" : "text-gray-500"
                          }`}
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => { setShowPopup(null) }}>
                  <X className="w-5 h-5 text-red-600" />
                </button>

              </div>


              {currentStep === 1 && (
                <>
                  <h3 className="text-gray-800 font-medium mb-4 text-base">
                    I need LittleHugs for
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">

                    <label className="flex items-start gap-2">
                      <input
                        className="mt-1"
                        type="checkbox"
                        disabled={programmeLock}
                        checked={showWomenPopup}
                        onChange={(e) => setshowWomenPopup((prev) => !prev)}
                      />
                      <span>Women’s Wellness Plan</span>
                    </label>

                    <label className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        className="mt-1"
                        disabled={programmeLock}
                        checked={showChildPopup}
                        onChange={(e) => setshowChildPopup((prev) => !prev)}
                      />
                      <span>Child’s Development & Growth Plan</span>
                    </label>

                    <label className="flex items-start gap-2">
                      <input
                        className="mt-1"
                        type="checkbox"
                        disabled={programmeLock}
                        checked={showMenPopup}
                        onChange={(e) => setshowMenPopup((prev) => !prev)}
                      />
                      <span>SEL Plan</span>
                    </label>

                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="flex gap-12">
                  {/* for women */}
                  {showWomenPopup && (
                    <div className="min-w-[300px] mx-auto">
                      <h2 className="font-bold text-center">{showChildPopup ? "Mother's Profile" : "Women's Profile"}</h2>
                      <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                        <label htmlFor="womenDPInput">
                          <img
                            src={womenDP}
                            alt="Profile"
                            className="w-full h-full object-cover cursor-pointer"
                          />
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="womenDPInput"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setWomenDP(imageUrl);
                            }
                          }}
                        />
                      </div>

                      <form ref={womenFormRef} >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <input
                            name="dob"
                            type="date"
                            placeholder="Date Of Birth"
                            className="border p-2 rounded"
                          />
                          <select
                            name="lifeStage"
                            className="border p-2 rounded"
                            required
                          >
                            <option value="" selected hidden>
                              * Current life stage
                            </option>
                            {["Early adulthood", "Adulthood", "Pregnancy", "Menopause", "Prefer not to say"].map((tone, i) => {
                              return (<option>{tone}</option>)
                            })}
                          </select>

                          <div className="relative">
                            <input
                              name="weight"
                              type="text"
                              placeholder="Weight"
                              className="border p-2 rounded w-full"
                              required
                            />
                            <span className="absolute right-2 top-2.5 text-gray-500">
                              kg
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              name="height"
                              type="text"
                              placeholder="Height"
                              className="border p-2 rounded w-full"
                              required
                            />
                            <span className="absolute right-2 top-2.5 text-gray-500">
                              cm
                            </span>
                          </div>

                          <select name="lifeStyle" className="border p-2 rounded" required>
                            <option value="" selected hidden>
                              * Life Style
                            </option>
                            <option>Nuclear Family</option>
                            <option>Joint Family</option>
                            <option>Single Parent</option>
                            <option>Shared Accommodation / Hostel</option>
                            <option>Urban / Metro City</option>
                            <option>Suburban / Town</option>
                            <option>Rural / Village</option>
                          </select>


                          <div>
                            {/* Dropdown button */}
                            <div
                              className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                              onClick={toggleWomenGoalDropdown}
                            >
                              {selectedWomenGoalOptions.length === 0 ? (
                                <span className="text-gray-500">
                                  * Goal is to work on
                                </span>
                              ) : (
                                selectedWomenGoalOptions.map((option) => (
                                  <div
                                    key={option}
                                    className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                                  >
                                    <span>{option}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Dropdown menu */}
                            {isWomenGoalOpen && (
                              <div ref={womenGoalDropdownRef} className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                {["Sleep", "Hormones", "Fatigue", "Anxiety", "Self Care"]
                                  .map((option) => (
                                    <div
                                      key={option}
                                      className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedWomenGoalOptions.some(
                                        (item) => item === option
                                      )
                                        ? "bg-blue-50"
                                        : ""
                                        }`}
                                      onClick={() =>
                                        toggleWomenGoalOption(option)
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedWomenGoalOptions.some((item) => item === option)}
                                        readOnly
                                        className="mr-2"
                                      />
                                      {option}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="* Occupation"
                              className="border p-2 rounded w-full pr-10"
                              name="occupation"
                              required
                            />
                          </div>
                          <div>
                            <select name="tone_prefrence" className="w-full border p-2 rounded" required>
                              <option value="" hidden selected>
                                * Tone Prefrence
                              </option>
                              {["Reassuring", "Motivational", "Calming", "Neutral"].map((tone, i) => {
                                return (
                                  <option>{tone}</option>
                                )
                              })}
                            </select>
                          </div>

                        </div>
                      </form>
                    </div>
                  )}

                  {/* for child */}
                  {showChildPopup && (
                    <div className="">
                      <h2 className="font-bold text-center">Child's Profile</h2>
                      {/* Profile */}
                      <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                        <label htmlFor="childDPInput">
                          <img
                            src={childDP}
                            alt="Profile"
                            className="w-full h-full object-cover cursor-pointer"
                          />
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="childDPInput"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setChildDP(imageUrl);
                            }
                          }}
                        />
                      </div>

                      {/* Form Fields */}
                      <form ref={childFormRef} >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <input
                            name="name"
                            type="text"
                            placeholder="* Child's Name"
                            className="border p-2 rounded"
                            required
                          />
                          <div className="relative">
                            <input
                              name="dob"
                              type="date"
                              placeholder="Date Of Birth"
                              className="border p-2 rounded w-full"
                            />
                          </div>

                          <div className="relative">
                            <input
                              type="text"
                              placeholder="* Weight"
                              className="border p-2 rounded w-full pr-10"
                              name="weight"
                              required
                            />
                            <span className="absolute right-3 top-2.5 text-gray-500">
                              kg
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="* Height"
                              className="border p-2 rounded w-full pr-10"
                              name="height"
                              required
                            />
                            <span className="absolute right-3 top-2.5 text-gray-500">
                              cm
                            </span>
                          </div>

                          <select
                            name="ageGroup"
                            className="border p-2 rounded"
                            required
                          >
                            <option value="" hidden selected>
                              * Age Group
                            </option>
                            <option>0-2 years</option>
                            <option>3-5 years</option>
                            <option>6-12 years</option>
                          </select>


                          <div>
                            {/* Dropdown button */}
                            <div

                              className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                              onClick={toggleChildGoalDropdown}
                            >
                              {selectedChildGoalOptions.length === 0 ? (
                                <span className="text-gray-500">* Goal</span>
                              ) : (
                                selectedChildGoalOptions.map((option) => (
                                  <div
                                    key={option}
                                    className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                                  >
                                    <span>{option}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Dropdown menu */}
                            {isChildGoalOpen && (
                              <div ref={childGoalDropdownRef} className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                {childOptions.map((option) => (
                                  <div
                                    key={option}
                                    className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedChildGoalOptions.some((item) => item === option)
                                      ? "bg-blue-50" : ""}`}
                                    onClick={() => toggleChildGoalOption(option)}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedChildGoalOptions.some(
                                        (item) => item === option
                                      )}
                                      readOnly
                                      className="mr-2"
                                    />
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>


                        </div>
                      </form>
                    </div>
                  )}

                  {/* for Men */}
                  {showMenPopup && (
                    <div className="min-w-[300px] mx-auto">
                      <h2 className="font-bold text-center">Men Profile</h2>
                      <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                        <label htmlFor="menDPInput">
                          <img
                            src={menDP}
                            alt="Profile"
                            className="w-full h-full object-cover cursor-pointer"
                          />
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="menDPInput"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setMenDP(imageUrl);
                            }
                          }}
                        />
                      </div>

                      <form ref={menFormRef} >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <input
                            name="dob"
                            type="date"
                            placeholder="Date Of Birth"
                            className="border p-2 rounded"
                          />
                          <select
                            name="lifeStage"
                            className="border p-2 rounded"
                            required
                          >
                            <option value="" selected hidden>
                              * Current life stage
                            </option>
                            {['Teenager', 'Early Adulthood', 'Adulthood'].map((tone, i) => {
                              return (<option>{tone}</option>)
                            })}
                          </select>

                          <div className="relative">
                            <input
                              name="weight"
                              type="text"
                              placeholder="Weight"
                              className="border p-2 rounded w-full"
                              required
                            />
                            <span className="absolute right-2 top-2.5 text-gray-500">
                              kg
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              name="height"
                              type="text"
                              placeholder="Height"
                              className="border p-2 rounded w-full"
                              required
                            />
                            <span className="absolute right-2 top-2.5 text-gray-500">
                              cm
                            </span>
                          </div>

                          <select name="lifeStyle" className="border p-2 rounded" required>
                            <option value="" selected hidden>
                              * Life Style
                            </option>
                            <option>Nuclear Family</option>
                            <option>Joint Family</option>
                            <option>Single Parent</option>
                            <option>Shared Accommodation / Hostel</option>
                            <option>Urban / Metro City</option>
                            <option>Suburban / Town</option>
                            <option>Rural / Village</option>
                          </select>


                          <div>
                            {/* Dropdown button */}
                            <div
                              className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                              onClick={toggleMenGoalDropdown}
                            >
                              {selectedMenGoalOptions.length === 0 ? (
                                <span className="text-gray-500">
                                  * Goal is to work on
                                </span>
                              ) : (
                                selectedMenGoalOptions.map((option) => (
                                  <div
                                    key={option}
                                    className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                                  >
                                    <span>{option}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Dropdown menu */}
                            {isMenGoalOpen && (
                              <div ref={menGoalDropdownRef} className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                {["Sleep", "Hormones", "Fatigue", "Anxiety", "Self Care"]
                                  .map((option) => (
                                    <div
                                      key={option}
                                      className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedMenGoalOptions.some(
                                        (item) => item === option
                                      )
                                        ? "bg-blue-50"
                                        : ""
                                        }`}
                                      onClick={() =>
                                        toggleMenGoalOption(option)
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedMenGoalOptions.some((item) => item === option)}
                                        readOnly
                                        className="mr-2"
                                      />
                                      {option}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="* Occupation"
                              className="border p-2 rounded w-full pr-10"
                              name="occupation"
                              required
                            />
                          </div>
                          <div>
                            <select name="tone_prefrence" className="w-full border p-2 rounded" required>
                              <option value="" hidden selected>
                                * Tone Prefrence
                              </option>
                              {["Reassuring", "Motivational", "Calming", "Neutral"].map((tone, i) => {
                                return (
                                  <option>{tone}</option>
                                )
                              })}
                            </select>
                          </div>

                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {currentStep === 2 && (
                  <button
                    className={`px-8 py-2 text-white rounded-full ${currentStep > 1
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400"
                      } transition-colors`}
                    onClick={() =>
                      setCurrentStep((prevStep) => Math.min(prevStep - 1, 2))
                    }
                    disabled={currentStep < 2}
                  >
                    Back
                  </button>
                )}
                {currentStep === 1 && (
                  <button
                    className={`px-8 py-2 text-white rounded-full ${showWomenPopup || showChildPopup || showMenPopup
                      ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"} transition-colors`}
                    onClick={() =>
                      setCurrentStep((prevStep) => Math.min(prevStep + 1, 2))
                    }
                    disabled={
                      currentStep >= 2 || (!showWomenPopup && !showChildPopup && !showMenPopup)
                    }
                  >
                    Next
                  </button>
                )}
                {currentStep === 2 && (
                  <div
                    onClick={handleProfile}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                  >
                    Go to the Dashboard
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showPopup === 2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-[#FFF9E8] p-6 rounded-md shadow-lg w-[600px] mx-6">
              <button className="ml-auto" onClick={() => { setShowPopup(null) }}>
                <X className="w-5 h-5 text-red-600" />
              </button>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow mb-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2098/2098439.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <form ref={partnerFormRef} className="flex flex-col gap-4">
                <input
                  name="org_name"
                  type="text"
                  placeholder="* Organisation Name"
                  className="w-full border p-2 rounded"
                  required
                />

                <input
                  name="description"
                  type="text"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  required
                />

                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                  required
                  onChange={() => { }}
                >
                  <option value="" hidden selected>
                    * Country
                  </option>
                  {allCountries.map((country, i) => (
                    <option key={i} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                    <option value="" hidden selected>* City</option>
                    {allCities.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                    <option value="" hidden selected>* Language</option>
                    {allLanguages.map((language, i) => (
                      <option key={i} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>

                  <div>
                    {/* Dropdown button */}
                    <div
                      className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                      onClick={togglePartnerServiceDropdown}
                    >
                      {selectedPartnerServiceOptions.length === 0 ? (
                        <span className="text-gray-500">
                          * Services you offer
                        </span>
                      ) : (
                        selectedPartnerServiceOptions.map((option) => (
                          <div
                            key={option}
                            className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                          >
                            <span>{option}</span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Dropdown menu */}
                    {isPartnerServiceOpen && (
                      <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                        {["Developmental Screening", "Health Monitoring", "School Readiness", "Behavioral Therapy", "Parental Counseling"]
                          .map((option) => (
                            <div
                              key={option}
                              className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedPartnerServiceOptions.some(
                                (item) => item === option
                              )
                                ? "bg-blue-50"
                                : ""
                                }`}
                              onClick={() => togglePartnerServiceOption(option)}>
                              <input
                                type="checkbox"
                                checked={selectedPartnerServiceOptions.some((item) => item === option)}
                                readOnly
                                className="mr-2"
                              />
                              {option}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>


                  <div>
                    {/* Dropdown button */}
                    <div
                      className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                      onClick={togglePartnerGoalDropdown}
                    >
                      {selectedPartnerGoalOptions.length === 0 ? (
                        <span className="text-gray-500">
                          * You want LittleHugs for
                        </span>
                      ) : (
                        selectedPartnerGoalOptions.map((option) => (
                          <div
                            key={option}
                            className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1"
                          >
                            <span>{option}</span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Dropdown menu */}
                    {isPartnerGoalOpen && (
                      <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                        {["Development & Emmotional Screening", "Assessment and Reporting", "Structured Early Interventions", "Progress Tracking & Team Collaboration", "Bulk Onboarding and Outreach", "Data Insights and Impact Reporting", "Smart Nudges for Caregivers", "Therapy Center Tools", "School & Counselor Tools", "NGO & Community Health Tools"]
                          .map((option) => (
                            <div
                              key={option}
                              className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedPartnerGoalOptions.some(
                                (item) => item === option
                              )
                                ? "bg-blue-50"
                                : ""
                                }`}
                              onClick={() =>
                                togglePartnerGoalOption(option)
                              }
                            >
                              <input
                                type="checkbox"
                                checked={selectedPartnerGoalOptions.some((item) => item === option)}
                                readOnly
                                className="mr-2"
                              />
                              {option}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>


                </div>
              </form>

              <div className="mt-8 flex justify-center">
                <div
                  onClick={handleProfile}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                >
                  Go to the Dashboard
                </div>
              </div>
            </div>
          </div>
        )}

        {showPopup === "Terms&Conditions" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#FAF3ED] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div />
                <img
                  src="/images/logo.svg"
                  alt="LittleHugs Logo"
                  className="max-h-10"
                />
                <button
                  type="button"
                  className="font-extrabold"
                  onClick={() => setShowPopup(null)}
                >
                  &#10005;
                </button>
              </div>

              <div className="overflow-y-auto p-4 md:p-6">
                <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
                  LittleHugs Webapp - Terms and Conditions
                </h1>

                <p className="font-medium text-gray-700 mb-4">
                  Effective: 5/21/2025
                </p>

                <p className="text-gray-600 mb-6">
                  Welcome to LittleHugs! These Terms and Conditions ("Terms")
                  govern your access to and use of our webapp, mobile tools, and
                  wellness assessments. By creating an account or using our
                  services, you agree to comply with these Terms.
                </p>

                <div className="space-y-6">
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      1. Overview of Services
                    </h2>
                    <p className="text-gray-600">
                      LittleHugs provides AI-guided wellness assessments for
                      mothers, caregivers, children, and families. Our tools are
                      non-diagnostic and are intended for reflection, insight,
                      and support, not medical treatment.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      2. Eligibility
                    </h2>
                    <p className="text-gray-600">
                      You must be at least 18 years old to use LittleHugs
                      independently. If you're using LittleHugs on behalf of a
                      minor, you confirm that you are their legal guardian or
                      have proper consent.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      3. Account Responsibilities
                    </h2>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>
                        You agree to provide accurate, current, and complete
                        information during sign-up.
                      </li>
                      <li>Keep your login credentials secure.</li>
                      <li>
                        Notify us immediately at support@ourlittlehugs.com if
                        you suspect unauthorized use.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      4. Privacy and Data Use
                    </h2>
                    <p className="text-gray-600">
                      By signing up, you consent to our use of anonymized data
                      to personalize wellness insights. We do not sell or
                      disclose personal information without your explicit
                      permission.
                    </p>
                    <p className="text-gray-600 mt-2">
                      See our Privacy Policy for full details.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      5. Acceptable Use
                    </h2>
                    <p className="text-gray-600 mb-2">You agree not to:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>
                        Use the app for any unlawful, harmful, or misleading
                        purposes
                      </li>
                      <li>
                        Attempt to interfere with our platform's functionality
                        or security
                      </li>
                      <li>
                        Copy, reverse-engineer, or exploit any part of the
                        webapp
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      6. AI-Based Insights Disclaimer
                    </h2>
                    <p className="text-gray-600">
                      All insights are generated by AI tools based on your
                      inputs. They are not substitutes for professional medical
                      advice, diagnosis, or treatment. Always consult with a
                      licensed provider for health concerns.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      7. Content Ownership
                    </h2>
                    <p className="text-gray-600">
                      All content on the platform—including assessments,
                      visuals, and language—is owned or licensed by LittleHugs
                      and protected by intellectual property laws.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      8. User Feedback
                    </h2>
                    <p className="text-gray-600">
                      Any suggestions, feedback, or ideas you provide may be
                      used to improve LittleHugs without any obligation to
                      compensate you.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      9. Termination of Use
                    </h2>
                    <p className="text-gray-600 mb-2">
                      We may suspend or terminate your account if:
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>You violate these Terms</li>
                      <li>You misuse the platform</li>
                      <li>Required by law or regulatory authority</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      10. Modifications to Terms
                    </h2>
                    <p className="text-gray-600">
                      We may update these Terms as needed. You'll be notified of
                      material changes, and continued use means you accept the
                      revised Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      11. Contact
                    </h2>
                    <p className="text-gray-600">
                      Questions? Email us at{" "}
                      <a
                        href="mailto:support@ourlittlehugs.com"
                        className="text-blue-500 hover:underline"
                      >
                        support@ourlittlehugs.com
                      </a>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPopup === "PrivacyPolicy" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div />
                <img
                  src="/images/logo.svg"
                  alt="LittleHugs Logo"
                  className="max-h-10"
                />
                <button
                  type="button"
                  className="font-extrabold"
                  onClick={() => setShowPopup(null)}
                >
                  &#10005;
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-4 md:p-6">
                <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
                  LittleHugs Webapp - Privacy Policy
                </h1>

                <div className="mb-6">
                  <h2 className="font-medium text-gray-700">
                    LittleHugs Privacy Policy
                  </h2>
                  <p className="text-gray-600">Effective Date: 5/21/2025</p>
                  <p className="text-gray-600">Last Updated: 5/21/2025</p>
                </div>

                <p className="text-gray-600 mb-6">
                  At LittleHugs, your privacy and trust matter deeply. This
                  Privacy Policy explains how we collect, use, protect, and
                  share your information when you interact with our website,
                  mobile app, assessments, and services.
                </p>

                <div className="space-y-6">
                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      1. Information We Collect
                    </h2>
                    <p className="text-gray-600 mb-2">
                      We collect information in the following ways:
                    </p>

                    <div className="ml-4 mb-2">
                      <h3 className="font-medium text-gray-700">
                        a. Personal Information You Provide
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>
                          Name, email address, and login details when you sign
                          up
                        </li>
                        <li>
                          Assessment responses (emotional, physical, cognitive,
                          etc.)
                        </li>
                        <li>
                          Voluntary journal entries, feedback, and preferences
                        </li>
                        <li>
                          Optional demographic details (e.g., age range,
                          motherhood status)
                        </li>
                      </ul>
                    </div>

                    <div className="ml-4">
                      <h3 className="font-medium text-gray-700">
                        b. Automated Data Collection
                      </h3>
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>IP address, browser type, device information</li>
                        <li>Pages visited and time spent on site</li>
                        <li>
                          Cookies and tracking tools for experience optimization
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      2. How We Use Your Data
                    </h2>
                    <p className="text-gray-600 mb-2">We use your data to:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>Personalize wellness insights and nudges using AI</li>
                      <li>Improve assessment accuracy and recommendations</li>
                      <li>Track your progress (if you opt in)</li>
                      <li>
                        Notify you of new features, reminders, or service
                        updates
                      </li>
                      <li>Respond to inquiries or support requests</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      3. AI-Generated Insights
                    </h2>
                    <p className="text-gray-600">
                      Our assessments use AI to tailor wellness feedback. These
                      insights are supportive and non-diagnostic, and your
                      personal data is never used to make automated clinical
                      decisions.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      4. Data Sharing
                    </h2>
                    <p className="text-gray-600 mb-2">
                      We do not sell your data.
                    </p>
                    <p className="text-gray-600 mb-2">
                      Your data may only be shared:
                    </p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>
                        With your explicit consent (e.g., to a therapist or
                        doctor)
                      </li>
                      <li>
                        With trusted third-party processors (e.g., secure cloud
                        storage)
                      </li>
                      <li>If required by law or for safety concerns</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      5. Data Security
                    </h2>
                    <p className="text-gray-600">
                      We use industry-standard encryption and secure storage to
                      protect your information. Access is limited to authorized
                      personnel and anonymized AI modules.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      6. Your Rights
                    </h2>
                    <p className="text-gray-600 mb-2">You have the right to:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                      <li>Access, update, or delete your data</li>
                      <li>Withdraw consent for data use at any time</li>
                      <li>Request a summary of your stored data</li>
                    </ul>
                    <p className="text-gray-600 mt-2">
                      You can do so by contacting us at
                      support@ourlittlehugs.com.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      7. Data Retention
                    </h2>
                    <p className="text-gray-600">
                      We keep your data for as long as your account is active or
                      as necessary to provide services. Upon account deletion,
                      all personal data is securely erased within 30 days,
                      unless legally required otherwise.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      8. Children's Privacy
                    </h2>
                    <p className="text-gray-600">
                      We only collect information about children with parental
                      or guardian consent. We do not knowingly collect data from
                      children under 13 without adult supervision.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      9. Cookies & Tracking
                    </h2>
                    <p className="text-gray-600">
                      We use cookies to improve your experience. You may disable
                      cookies in your browser, though some features may not
                      function properly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      10. Changes to This Policy
                    </h2>
                    <p className="text-gray-600">
                      We may update this Privacy Policy from time to time. We
                      will notify users via email or website banner if
                      significant changes are made.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      11. Contact Us
                    </h2>
                    <p className="text-gray-600">
                      For privacy-related questions, please contact:
                    </p>
                    <p className="flex items-center gap-2 mt-2">
                      <span className="inline-block w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
                        ✉
                      </span>
                      Email:{" "}
                      <a
                        href="mailto:support@ourlittlehugs.com"
                        className="text-blue-500 hover:underline"
                      >
                        support@ourlittlehugs.com
                      </a>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {isOtp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl w-full max-w-[650px] p-8 relative text-gray-700 shadow-xl">

              <div className="flex items-center justify-between space-x-6">
                <div />
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                  OTP Authentication
                </h2>
                <button onClick={() => setIsOtp(false)}>
                  <X className="w-5 h-5 text-red-600" />
                </button>
              </div>

              <p className="text-center text-gray-500 my-3">
                Please enter the OTP
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ))}
              </div>
              {otpError && (
                <span className="text-[#DC2626] text-xs leading-[16px] font-normal">
                  Please enter OTP
                </span>
              )}

              {/* Timer or Resend */}
              <div className="text-right text-sm mb-4 pr-2">
                {resendEnabled ? (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-500 hover:underline focus:outline-none"
                  >
                    Resend
                  </button>
                ) : (
                  <span className="text-gray-500">
                    00:{("0" + timer).slice(-2)}
                  </span>
                )}
              </div>

              {/* Continue Button */}
              <button
                onClick={handleSubmitForOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <img
            src="/images/wave-decoration.png"
            alt="Wave Background"
            className="w-full h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SignupUI;