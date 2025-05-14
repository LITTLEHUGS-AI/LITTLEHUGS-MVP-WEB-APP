import { useEffect, useState, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from '../common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../common/Navbar';
import { useAuth } from '../../lib/AuthContext';
import useSignIn from '../signin/useSignIn';
import { toastErrorMessage } from "../common/Constants";
import { apiClient, setupApiAccessToken } from '../../api/api-client';

const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
    country: "",
    organisation_type: "",
    is_organization: false,
    language: ""
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
    const apiUrl = process.env.REACT_APP_API_URL;

    const [showPopup, setShowPopup] = useState(null);
    const [email, setEmail] = useState("");
    const [allLanguages, setAllLanguages] = useState([]);
 const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
    const [showWomenPopup, setshowWomenPopup] = useState(false);
    const [showChildPopup, setshowChildPopup] = useState(false);
    const { otpMutation, motherMutation, childMutation } = useSignIn();
    const { login } = useAuth();
    // const { login, hasAuthenticated } = useAuth();
    const [accessToken, setAccessToken] = useState();
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: zodResolver(SignInFormSchema),
    });
      const { watch } = methods;
  const formData = watch();



    const handleSubmit = (data) => {
        data = { ...data, is_personal: (selected === 'personal') ? true : false, is_organization: (selected === 'personal') ? false : true }
        onSubmit(data);
        setEmail(data.email);
    };

    // useEffect(() => {
    //     if (hasAuthenticated) {
    //         navigate("/personal/dashboard");
    //     }
    // }, [hasAuthenticated, navigate]);

    useEffect(() => {
        if (isSuccess) {
            methods.reset(INITIAL_VALUES);
        }
    }, [isSuccess, methods]);

    const handleLogin = (logintype) => {
        let redirect_url = ""
        if (logintype === "google-login") {
            redirect_url = `${window.location.origin}/auth/google/callback`
        } else {
            redirect_url = `${window.location.origin}/auth/ms/callback`
        }
        sessionStorage.removeItem("chats");
        axios.get(`${apiUrl}/v1/api/google/login?redirect_url=${redirect_url}`).then((response) => {
            window.location.href = response.data.authorization_url;
        });
    };

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [otpError, setOtpError] = useState(false);
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);
    const otpdata = otpMutation?.data;
    const [resentOtp, setResentOtp] = useState(false);

    const [selected, setSelected] = useState('personal');


    const womenGoalOptions = ['Sleep', 'Hormones', 'Fatigue', 'Anxiety', 'Self Care'];
    const [isWomenGoalOpen, setIsWomenGoalOpen] = useState(false);
    const [selectedWomenGoalOptions, setSelectedWomenGoalOptions] = useState([]);
    const toggleWomenGoalDropdown = () => setIsWomenGoalOpen(!isWomenGoalOpen);
    const toggleWomenGoalOption = (option) => {
        setSelectedWomenGoalOptions(prevSelected => {
            if (prevSelected.some(item => item === option))
                return prevSelected.filter(item => item !== option);
            else
                return [...prevSelected, option];
        });
    };


    const toneOptions = ['Reassuring', 'Motivational', 'Calming', 'Neutral'];
    const [isToneOpen, setIsToneOpen] = useState(false);
    const [selectedToneOptions, setSelectedToneOptions] = useState([]);
    const toggleToneDropdown = () => setIsToneOpen(!isToneOpen);
    const toggleToneOption = (option) => {
        setSelectedToneOptions(prevSelected => {
            if (prevSelected.some(item => item === option))
                return prevSelected.filter(item => item !== option);
            else
                return [...prevSelected, option];
        });
    };


    const womenChildOptions = ['Growth', 'Nutrition', 'Activity'];
    const [isChildGoalOpen, setIsChildGoalOpen] = useState(false);
    const [selectedChildGoalOptions, setSelectedChildGoalOptions] = useState([]);
    const toggleChildGoalDropdown = () => setIsChildGoalOpen(!isChildGoalOpen);
    const toggleChildGoalOption = (option) => {
        setSelectedChildGoalOptions(prevSelected => {
            if (prevSelected.some(item => item === option))
                return prevSelected.filter(item => item !== option);
            else
                return [...prevSelected, option];
        });
    };

    const [womenDP, setWomenDP] = useState('/images/women-demo.png');
    const [childDP, setChildDP] = useState('/images/child-demo.png');



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
            if (value && index < 5) {
                inputsRef.current[index + 1].focus();
            }
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
        }
        otpMutation.mutate(payload)
        setIsOtp(true);
    };

    const handleResendOtp = () => {
        const payload = {
            email: email
        }
        otpMutation.mutate(payload)
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
                setAccessToken(`token ${otpdata.token}`)
                setIsOtp(false);

                if (selected === 'personal')
                    setShowPopup(1);
                if (selected === 'partner')
                    setShowPopup(2);

            }
        }
    }, [login, otpdata, otpMutation.isSuccess, setIsOtp, resentOtp, selected]);

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
        if (
            otpMutation.isError &&
            otpMutation?.error?.response?.status !== 401
        ) {
            // addToast({
            //     type: "error",
            //     message: otpMutation?.error?.data.error || "Unknown error occurred",
            // });
            toastErrorMessage({
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
                content: motherMutation?.error?.response?.data?.message || "Unknown error occurred",
                option: { type: "" },
            });
        }
    }, [motherMutation.isError, motherMutation?.error]);

    useEffect(() => {
        if (
            childMutation.isError &&
            childMutation?.error?.response?.status !== 401
        ) {
            // addToast({
            //     type: "error",
            //     message: childMutation?.error?.response?.data?.message || "Unknown error occurred",
            // });
            toastErrorMessage({
                content: childMutation?.error?.response?.data?.message || "Unknown error occurred",
                option: { type: "" },
            });
        }
    }, [childMutation.isError, childMutation?.error]);

    const submitMotherProfile = (event) => {
        event.preventDefault(); // Prevent page reload
        const formData = new FormData(event.target); // event.target is the <form>
        const data = {
            dob: formData.get("dob"),
            life_stage: formData.get("lifeStage"),
            intent: [formData.get("goal")],
            tone_prefrence: formData.get("tone"),
            weight: formData.get("weight"),
            height: formData.get("height"),
        };
        motherMutation.mutate({ data, access_token: accessToken });
    }

    const submitChildProfile = (event) => {
        event.preventDefault(); // Prevent page reload
        const formData = new FormData(event.target); // event.target is the <form>
        const data = {
            name: formData.get("child_name"),
            dob: formData.get("child_dob"),
            age_group: formData.get("age_group"),
            goal: [formData.get("gaol")],
            weight: formData.get("weight"),
            height: formData.get("height"),
        };
        childMutation.mutate({ data, access_token: accessToken });
    }




   
  // Fetch Countries & Languages Data
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(result => {
        const countryNames = result.data.map(item => item.country);
        setAllCountries([...countryNames]);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });

    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const languages = new Set();
        data.forEach(country => {
          if (country.languages) Object.values(country.languages).forEach(lang => languages.add(lang));
        });
        setAllLanguages([...languages]);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);


   useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: formData.country })
    })
      .then(response => response.json())
      .then(data => { if (data && data.data) {
    setAllCities(data.data);
  } else {
    setAllCities([]);
  }})
      .catch(error => {
        console.error('Error:', error);
      });
  }, [formData.country])



    async function handleProfile() {
        setupApiAccessToken(accessToken);

        if (selected === 'personal') {
            const promises = [];
            try {
                if (showWomenPopup) {
                    const womenProfilePromise = apiClient.post('https://api.ourlittlehugs.com/v1/api/mother-profile', {
                        "dob": "2025-05-12",
                        "life_stage": "string",
                        "weight": 0,
                        "height": 0,
                        "life_style": 0,
                        "occupation": 0,
                        "tone_preference": "string"
                    }).then(response => {
                        if (response.ok) {
                            console.log('Mother profile data successfully sent');
                        } else {
                            console.error('Error sending mother profile data');
                        }
                    });

                    promises.push(womenProfilePromise);
                }

                if (showChildPopup) {
                    const childProfilePromise = apiClient.post('https://api.ourlittlehugs.com/v1/api/child-profile', {
                        "name": "raj kumar 2",
                        "dob": "2025-05-12",
                        "age_group": "2",
                        "goal": {},
                        "relation_with_child": "",
                        "weight": 0,
                        "height": 0
                    }).then(response => {
                        if (response.ok) {
                            console.log('Child profile data successfully sent');
                        } else {
                            console.error('Error sending child profile data');
                        }
                    });

                    promises.push(childProfilePromise);
                }
                await Promise.all(promises);

                navigate("/personal/dashboard")
            }
            catch (error) {
                alert('Some Error Occured')
            }
        }
        if (selected === 'partner') {
            apiClient.post('https://api.ourlittlehugs.com/v1/api/organisation-profile', {
                "organisation_name": "My Org",
                "description": "Default Description",
                "org_offers": ['offer 1', 'offer 2'],
                "littlehug_for": ['for 1 ', 'for 2']
            }).then(response => {
                if (response) {
                    navigate("/partner/dashboard")
                } else {
                    alert('Some Error Occured')
                }
            });
        }
    }


    return (
        <div className="flex flex-col min-h-screen bg-[#fef9f6]">
            <Navbar />
            <div
                className="flex-grow flex items-center justify-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('/images/signup.png')",
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, bottom left',
                    backgroundSize: 'cover, contain',
                }}
            >
                <div className="flex w-full max-w-6xl items-center justify-center p-6">
                    {/* Left Decorative Side */}
                    <div className="hidden md:flex w-1/2 flex-col justify-center items-start relative z-10">
                        <h1 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">A Hug Ahead of Time</h1>
                    </div>

                    {/* Right Form Side */}
                    <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-md p-10 shadow-md relative z-10">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign Up</h2>
                        <p className="text-center text-sm text-gray-500 mb-6">
                            Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
                        </p>

                        <div className="flex items-center justify-center my-6">
                            <div className="inline-flex border border-gray-300 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setSelected('personal')}
                                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 ${selected === 'personal'
                                        ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Personal
                                </button>
                                <button
                                    onClick={() => setSelected('partner')}
                                    className={`px-6 py-2 font-medium text-sm transition-colors duration-200 ${selected === 'partner'
                                        ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Partner
                                </button>
                            </div>
                        </div>

                        <FormProvider {...methods}>
                            <form className="space-y-4" onSubmit={methods.handleSubmit(handleSubmit)}>

                                <InputField
                                    name="name"
                                    fieldId="name"
                                    placeHolder="Enter your Name"
                                />
                                <InputField
                                    label="Email"
                                    name="email"
                                    fieldId="email"
                                    placeHolder="Enter your Email"
                                    message={isError ? message : ""}
                                    isDisabled={isPending}
                                />
                                <InputField
                                    label="Password"
                                    name="password"
                                    fieldId="password"
                                    placeHolder="Enter your Password"
                                    type={visible.password ? "text" : "password"}
                                    visible
                                    showIcon={visible.password}
                                    handleChange={handleShowPassword}
                                    isDisabled={isPending}
                                />

                                <select {...methods.register("country")} className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                                    <option value="" hidden selected>* Country</option>
                                    {allCountries.map((country, i) => (
                                        <option key={i} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex gap-4">
                                    <select {...methods.register("city")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                                        <option value="" hidden selected>* City</option>
                                        {allCities.map((city, i) => (
                                            <option key={i} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <select  {...methods.register("language")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                                        <option value="" hidden selected>* Language</option>
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
                                        I agree to LittleHugs’s{' '}
                                        <span onClick={() => setShowPopup('Terms&Conditions')} className="text-blue-600 underline">
                                            Terms & Conditions
                                        </span>{' '}
                                        and acknowledge the{' '}
                                        <span onClick={() => setShowPopup('PrivacyPolicy')} className="text-blue-600 underline">
                                            Privacy Policy
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={`${isPending ? "sign-load" : "sign"} w-full ${!isTermsAccepted ? "bg-gray-400 cursor-not-allowed" : "bg-[#4776E6] hover:bg-[#365fbd]"} text-white text-sm py-2 rounded-full transition`}
                                    disabled={!isTermsAccepted}>
                                    {isPending ? <ButtonLoader /> : " Sign Up"}
                                </button>

                                <div className="flex justify-center">
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
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>


                {/* Popup Modal */}
                {(showPopup === 1) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-[#FFF9E8] p-6 rounded-md shadow-lg w-[800px] mx-6">

                            <div className="mb-8 mx-auto w-full max-w-xl">
                                <div className="flex max-w-60 justify-between items-center mx-auto mb-2">
                                    {["Profile Selection", "Profile Completion"].map((step, index) => (
                                        <div key={index} className="flex flex-col items-center text-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 === currentStep ? 'bg-blue-500 text-white' :
                                                index + 1 < currentStep ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'}`}>
                                                {index + 1}
                                            </div>
                                            <div className={`mt-2 text-sm ${index + 1 === currentStep ? 'text-blue-500' : 'text-gray-500'}`}>
                                                {step}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {(currentStep === 1) && <>
                                <h3 className="text-gray-800 font-medium mb-4 text-base">I need LittleHugs for</h3>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <label className="flex items-start gap-2">
                                        <input className="mt-1"
                                            type="checkbox"
                                            checked={showWomenPopup}
                                            onChange={(e) => setshowWomenPopup(prev => !prev)}
                                        />
                                        <span>Women’s Wellness Plan</span>
                                    </label>

                                    <label className="flex items-start space-x-2">
                                        <input type="checkbox" className="mt-1"
                                            checked={showChildPopup}
                                            onChange={(e) => setshowChildPopup(prev => !prev)}
                                        />
                                        <span>Child’s Development & Growth Plan</span>
                                    </label>
                                </div>
                            </>}

                            {(currentStep === 2) &&
                                <div className='flex gap-12'>
                                    {/* for women */}
                                    {showWomenPopup && (
                                        <div className='min-w-[300px]'>
                                            <h2 className='font-bold text-center'>Women Profile</h2>
                                            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                                                <label htmlFor="womenDPInput">
                                                    <img src={womenDP} alt="Profile" className="w-full h-full object-cover cursor-pointer" />
                                                </label>
                                                <input
                                                    type="file" accept="image/*" id="womenDPInput" style={{ display: 'none' }}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const imageUrl = URL.createObjectURL(file);
                                                            setWomenDP(imageUrl);
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <form onSubmit={submitMotherProfile}>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <input name="dob" type="date" placeholder="Date Of Birth" className="border p-2 rounded" />
                                                    <select name="lifeStage" className="border p-2 rounded" required>
                                                        <option value="" disabled hidden>* Current life stage</option>
                                                        <option>Early adulthood</option>
                                                        <option>Adulthood</option>
                                                        <option>Pregnancy</option>
                                                        <option>Menopause</option>
                                                        <option>Prefer not to say</option>
                                                    </select>

                                                    <div>
                                                        {/* Dropdown button */}
                                                        <div
                                                            className="border rounded p-2 bg-white flex flex-wrap min-h-10 cursor-pointer"
                                                            onClick={toggleWomenGoalDropdown}
                                                        >
                                                            {selectedWomenGoalOptions.length === 0 ? (
                                                                <span className="text-gray-500">* Goal is to work on</span>
                                                            ) : (
                                                                selectedWomenGoalOptions.map(option => (
                                                                    <div key={option} className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1">
                                                                        <span>{option}</span>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>

                                                        {/* Dropdown menu */}
                                                        {isWomenGoalOpen && (
                                                            <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                                                {womenGoalOptions.map(option => (
                                                                    <div
                                                                        key={option}
                                                                        className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedWomenGoalOptions.some(item => item === option) ? 'bg-blue-50' : ''}`}
                                                                        onClick={() => toggleWomenGoalOption(option)}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedWomenGoalOptions.some(item => item === option)}
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
                                                            onClick={toggleToneDropdown}
                                                        >
                                                            {selectedToneOptions.length === 0 ? (
                                                                <span className="text-gray-500">* Tone Preference</span>
                                                            ) : (
                                                                selectedToneOptions.map(option => (
                                                                    <div key={option} className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1">
                                                                        <span>{option}</span>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>

                                                        {/* Dropdown menu */}
                                                        {isToneOpen && (
                                                            <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                                                {toneOptions.map(option => (
                                                                    <div
                                                                        key={option}
                                                                        className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedToneOptions.some(item => item === option) ? 'bg-blue-50' : ''}`}
                                                                        onClick={() => toggleToneOption(option)}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedToneOptions.some(item => item === option)}
                                                                            readOnly
                                                                            className="mr-2"
                                                                        />
                                                                        {option}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="relative">
                                                        <input name="weight" type="text" placeholder="Weight" className="border p-2 rounded w-full" required />
                                                        <span className="absolute right-2 top-2.5 text-gray-500">kg</span>
                                                    </div>
                                                    <div className="relative">
                                                        <input name="height" type="text" placeholder="Height" className="border p-2 rounded w-full" required />
                                                        <span className="absolute right-2 top-2.5 text-gray-500">cm</span>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    )}


                                    {/* for child */}
                                    {showChildPopup && (
                                        <div className=''>
                                            <h2 className='font-bold text-center'>Child Profile</h2>
                                            {/* Profile */}
                                            <div className="mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                                                <label htmlFor="childDPInput">
                                                    <img src={childDP} alt="Profile" className="w-full h-full object-cover cursor-pointer" />
                                                </label>
                                                <input
                                                    type="file" accept="image/*" id="childDPInput" style={{ display: 'none' }}
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
                                            <form onSubmit={submitChildProfile}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <input
                                                        name="child_name"
                                                        type="text"
                                                        placeholder="* Child's Name"
                                                        className="border p-2 rounded"
                                                        required
                                                    />
                                                    <div className="relative">
                                                        <input name="child_dob" type="date" placeholder="Date Of Birth" className="border p-2 rounded w-full" />
                                                    </div>

                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="* Weight"
                                                            className="border p-2 rounded w-full pr-10"
                                                            name='weight'
                                                            required
                                                        />
                                                        <span className="absolute right-3 top-2.5 text-gray-500">kg</span>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="* Height"
                                                            className="border p-2 rounded w-full pr-10"
                                                            name='height'
                                                            required
                                                        />
                                                        <span className="absolute right-3 top-2.5 text-gray-500">cm</span>
                                                    </div>

                                                    <select name='age_group' className="border p-2 rounded" required>
                                                        <option value="" hidden selected>* Age Group</option>
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
                                                                selectedChildGoalOptions.map(option => (
                                                                    <div key={option} className="bg-blue-100 rounded-full px-2 py-1 text-sm flex items-center m-1">
                                                                        <span>{option}</span>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>

                                                        {/* Dropdown menu */}
                                                        {isChildGoalOpen && (
                                                            <div className="absolute mt-1 w-64 border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                                                                {womenChildOptions.map(option => (
                                                                    <div
                                                                        key={option}
                                                                        className={`p-2 hover:bg-gray-100 cursor-pointer ${selectedToneOptions.some(item => item === option) ? 'bg-blue-50' : ''}`}
                                                                        onClick={() => toggleChildGoalOption(option)}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedChildGoalOptions.some(item => item === option)}
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


                                </div>
                            }

                            <div className="mt-8 flex justify-between">
                                {(currentStep === 2) &&
                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${currentStep > 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, 2))}
                                        disabled={currentStep < 2}                                >
                                        Back
                                    </button>}
                                {(currentStep === 1) && <button
                                    className={`px-8 py-2 text-white rounded-full ${(showWomenPopup || showChildPopup) ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                    onClick={() => setCurrentStep(prevStep => Math.min(prevStep + 1, 2))}
                                    disabled={currentStep >= 2 || (!showWomenPopup && !showChildPopup)}                                >
                                    Next
                                </button>}
                                {(currentStep === 2) &&
                                    <div onClick={handleProfile} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                                        Go to the Dashboard
                                    </div>}
                            </div>

                        </div>
                    </div>
                )}

                {(showPopup === 2) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-[#FFF9E8] p-6 rounded-md shadow-lg w-[600px] mx-6">

                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow mb-2">
                                    <img
                                        src="/images/women.png"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Form Fields */}
                            <form className="flex flex-col gap-4" onSubmit={submitChildProfile}>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <input
                                        type="text"
                                        placeholder="* city"
                                        className="border p-2 rounded w-full pr-10"
                                        name='city'
                                        required
                                    />

                                    <input
                                        type="text"
                                        placeholder="* Language prefrence"
                                        className="border p-2 rounded w-full pr-10"
                                        name='language'
                                        required
                                    />

                                    <select name='age_group' className="border p-2 rounded" required>
                                        <option value="" hidden selected>* Services you offer</option>
                                        <option>0-2 years</option>
                                        <option>3-5 years</option>
                                        <option>6-12 years</option>
                                    </select>

                                    <select name='gaol' className="border p-2 rounded" required>
                                        <option value="" hidden selected>* You want LittleHugs for</option>
                                        <option>Growth</option>
                                        <option>Nutrition</option>
                                        <option>Activity</option>
                                    </select>

                                </div>

                            </form>

                            <div className="mt-8 flex justify-center">
                                <div onClick={handleProfile} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                                    Go to the Dashboard
                                </div>
                            </div>

                        </div>
                    </div>
                )}


                {(showPopup === 'Terms&Conditions') && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                            <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">LittleHugs Webapp - Terms and Conditions</h1>

                            <p className="font-medium text-gray-700 mb-4">Effective: 5/21/2025</p>

                            <p className="text-gray-600 mb-6">
                                Welcome to LittleHugs! These Terms and Conditions ("Terms") govern your access to and use of our webapp,
                                mobile tools, and wellness assessments. By creating an account or using our services, you agree to comply with
                                these Terms.
                            </p>

                            <div className="space-y-6">
                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">1. Overview of Services</h2>
                                    <p className="text-gray-600">
                                        LittleHugs provides AI-guided wellness assessments for mothers, caregivers, children, and families. Our tools are
                                        non-diagnostic and are intended for reflection, insight, and support, not medical treatment.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">2. Eligibility</h2>
                                    <p className="text-gray-600">
                                        You must be at least 18 years old to use LittleHugs independently. If you're using LittleHugs on behalf of a minor,
                                        you confirm that you are their legal guardian or have proper consent.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">3. Account Responsibilities</h2>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>You agree to provide accurate, current, and complete information during sign-up.</li>
                                        <li>Keep your login credentials secure.</li>
                                        <li>Notify us immediately at support@ourlittlehugs.com if you suspect unauthorized use.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">4. Privacy and Data Use</h2>
                                    <p className="text-gray-600">
                                        By signing up, you consent to our use of anonymized data to personalize wellness insights. We do not sell or
                                        disclose personal information without your explicit permission.
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        See our Privacy Policy for full details.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">5. Acceptable Use</h2>
                                    <p className="text-gray-600 mb-2">You agree not to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Use the app for any unlawful, harmful, or misleading purposes</li>
                                        <li>Attempt to interfere with our platform's functionality or security</li>
                                        <li>Copy, reverse-engineer, or exploit any part of the webapp</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">6. AI-Based Insights Disclaimer</h2>
                                    <p className="text-gray-600">
                                        All insights are generated by AI tools based on your inputs. They are not substitutes for professional medical
                                        advice, diagnosis, or treatment. Always consult with a licensed provider for health concerns.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">7. Content Ownership</h2>
                                    <p className="text-gray-600">
                                        All content on the platform—including assessments, visuals, and language—is owned or licensed by LittleHugs
                                        and protected by intellectual property laws.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">8. User Feedback</h2>
                                    <p className="text-gray-600">
                                        Any suggestions, feedback, or ideas you provide may be used to improve LittleHugs without any obligation to
                                        compensate you.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">9. Termination of Use</h2>
                                    <p className="text-gray-600 mb-2">We may suspend or terminate your account if:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>You violate these Terms</li>
                                        <li>You misuse the platform</li>
                                        <li>Required by law or regulatory authority</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">10. Modifications to Terms</h2>
                                    <p className="text-gray-600">
                                        We may update these Terms as needed. You'll be notified of material changes, and continued use means you
                                        accept the revised Terms.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">11. Contact</h2>
                                    <p className="text-gray-600">
                                        Questions? Email us at <a href="mailto:support@ourlittlehugs.com" className="text-blue-500 hover:underline">support@ourlittlehugs.com</a>
                                    </p>
                                </section>
                            </div>
                        </div>

                    </div>
                </div>

                )}
                {(showPopup === 'PrivacyPolicy') && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                            <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">LittleHugs Webapp - Privacy Policy</h1>

                            <div className="mb-6">
                                <h2 className="font-medium text-gray-700">LittleHugs Privacy Policy</h2>
                                <p className="text-gray-600">Effective Date: 5/21/2025</p>
                                <p className="text-gray-600">Last Updated: 5/21/2025</p>
                            </div>

                            <p className="text-gray-600 mb-6">
                                At LittleHugs, your privacy and trust matter deeply. This Privacy Policy explains how we collect, use, protect, and
                                share your information when you interact with our website, mobile app, assessments, and services.
                            </p>

                            <div className="space-y-6">
                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">1. Information We Collect</h2>
                                    <p className="text-gray-600 mb-2">We collect information in the following ways:</p>

                                    <div className="ml-4 mb-2">
                                        <h3 className="font-medium text-gray-700">a. Personal Information You Provide</h3>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                            <li>Name, email address, and login details when you sign up</li>
                                            <li>Assessment responses (emotional, physical, cognitive, etc.)</li>
                                            <li>Voluntary journal entries, feedback, and preferences</li>
                                            <li>Optional demographic details (e.g., age range, motherhood status)</li>
                                        </ul>
                                    </div>

                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-700">b. Automated Data Collection</h3>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                            <li>IP address, browser type, device information</li>
                                            <li>Pages visited and time spent on site</li>
                                            <li>Cookies and tracking tools for experience optimization</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">2. How We Use Your Data</h2>
                                    <p className="text-gray-600 mb-2">We use your data to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Personalize wellness insights and nudges using AI</li>
                                        <li>Improve assessment accuracy and recommendations</li>
                                        <li>Track your progress (if you opt in)</li>
                                        <li>Notify you of new features, reminders, or service updates</li>
                                        <li>Respond to inquiries or support requests</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">3. AI-Generated Insights</h2>
                                    <p className="text-gray-600">
                                        Our assessments use AI to tailor wellness feedback. These insights are supportive and non-diagnostic, and your
                                        personal data is never used to make automated clinical decisions.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">4. Data Sharing</h2>
                                    <p className="text-gray-600 mb-2">We do not sell your data.</p>
                                    <p className="text-gray-600 mb-2">Your data may only be shared:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>With your explicit consent (e.g., to a therapist or doctor)</li>
                                        <li>With trusted third-party processors (e.g., secure cloud storage)</li>
                                        <li>If required by law or for safety concerns</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">5. Data Security</h2>
                                    <p className="text-gray-600">
                                        We use industry-standard encryption and secure storage to protect your information. Access is limited to
                                        authorized personnel and anonymized AI modules.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">6. Your Rights</h2>
                                    <p className="text-gray-600 mb-2">You have the right to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Access, update, or delete your data</li>
                                        <li>Withdraw consent for data use at any time</li>
                                        <li>Request a summary of your stored data</li>
                                    </ul>
                                    <p className="text-gray-600 mt-2">
                                        You can do so by contacting us at support@ourlittlehugs.com.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">7. Data Retention</h2>
                                    <p className="text-gray-600">
                                        We keep your data for as long as your account is active or as necessary to provide services. Upon account
                                        deletion, all personal data is securely erased within 30 days, unless legally required otherwise.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">8. Children's Privacy</h2>
                                    <p className="text-gray-600">
                                        We only collect information about children with parental or guardian consent. We do not knowingly collect data
                                        from children under 13 without adult supervision.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">9. Cookies & Tracking</h2>
                                    <p className="text-gray-600">
                                        We use cookies to improve your experience. You may disable cookies in your browser, though some features
                                        may not function properly.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">10. Changes to This Policy</h2>
                                    <p className="text-gray-600">
                                        We may update this Privacy Policy from time to time. We will notify users via email or website banner if
                                        significant changes are made.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">11. Contact Us</h2>
                                    <p className="text-gray-600">
                                        For privacy-related questions, please contact:
                                    </p>
                                    <p className="flex items-center gap-2 mt-2">
                                        <span className="inline-block w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">✉</span>
                                        Email: <a href="mailto:support@ourlittlehugs.com" className="text-blue-500 hover:underline">support@ourlittlehugs.com</a>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>)}


                {isOtp && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-xl w-full max-w-[650px] p-8 relative text-gray-700 shadow-xl">
                            <h2 className="text-2xl font-semibold text-center text-gray-800">
                                OTP Authentication
                            </h2>
                            <p className="text-center text-gray-500 my-3">Please enter the OTP</p>

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
        </div >
    );
}

export default SignupUI
