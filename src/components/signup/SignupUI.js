import React, { useEffect, useState, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from '../common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../common/Navbar';
import { useAuth } from '../../lib/AuthContext';
import useSignIn from '../signin/useSignIn';
// import { addToast } from '../../lib/useToastContext';
import { toastErrorMessage } from "../common/Constants";

const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
    country: "",
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
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [showWellnessPopup, setShowWellnessPopup] = useState(false);
    const [showChildWellnessPopup, setChildShowWellnessPopup] = useState(false);
    const { otpMutation, motherMutation, childMutation } = useSignIn();
    const { login, hasAuthenticated } = useAuth();
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: zodResolver(SignInFormSchema),
    });

    const handleSubmit = (data) => {
        onSubmit(data);
        setEmail(data.email);
    };

    useEffect(() => {
        if (hasAuthenticated) {
            navigate("/");
        }
    }, [hasAuthenticated, navigate]);

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
                setIsOtp(false);
                setShowPopup(true);
            }
        }
    }, [login, otpdata, otpMutation.isSuccess, setIsOtp, resentOtp]);

    useEffect(() => {
        if (motherMutation.isSuccess) {
            setShowWellnessPopup(false);
            navigate("/");
            // addToast({
            //     type: "error",
            //     message: "Mother profile created successfully",
            // });
        }
    }, [motherMutation.isSuccess, navigate]);

    useEffect(() => {
        if (childMutation.isSuccess) {
            setChildShowWellnessPopup(false);
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
        motherMutation.mutate({ data, access_token: hasAuthenticated });
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
        childMutation.mutate({ data, access_token: hasAuthenticated });
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

                                <div className="flex gap-4">
                                    <select {...methods.register("country")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                                        <option value="" hidden selected>* City</option>
                                        <option>New York</option>
                                        <option>Mumbai</option>
                                        <option>Delhi</option>
                                        <option>Chennai</option>
                                    </select>
                                    <select  {...methods.register("language")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600" required>
                                        <option value="" hidden selected>* Language</option>
                                        <option>English</option>
                                        <option>Hindi</option>
                                        <option>Tamil</option>
                                        <option>Malayalam</option>
                                    </select>
                                </div>

                                <div className="flex items-start space-x-2 text-sm">
                                    <input type="checkbox" id="terms" className="mt-1" />
                                    <label htmlFor="terms" className="text-gray-600">
                                        I agree to LittleHugs’s{' '}
                                        <Link to="#" className="text-blue-600 underline">
                                            Terms & Conditions
                                        </Link>{' '}
                                        and acknowledge the{' '}
                                        <Link to="#" className="text-blue-600 underline">
                                            Privacy Policy
                                        </Link>.
                                    </label>
                                </div>

                                {/* <button
                                    type="submit"
                                    className="w-full bg-[#4776E6] text-white text-sm py-2 rounded-full hover:bg-[#365fbd] transition"
                                >
                                    Create Account
                                </button> */}
                                <button
                                    type="submit"
                                    className={`${isPending ? "sign-load" : "sign"} w-full bg-[#4776E6] text-white text-sm py-2 rounded-full hover:bg-[#365fbd] transition`}
                                >
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
                {showPopup && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-[#FFF9E8] p-6 rounded-md shadow-lg w-[250px] relative">
                            <h3 className="text-gray-800 font-medium mb-4 text-base">I need LittleHugs for</h3>
                            <div className="space-y-3 text-sm text-gray-700">
                                <label className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="mt-1 accent-gray-700"
                                        onChange={(e) => {
                                            setShowWellnessPopup(e.target.checked);
                                            setShowPopup(false);
                                        }}
                                    />
                                    <span>Women’s Wellness Plan</span>
                                </label>

                                <label className="flex items-start space-x-2">
                                    <input type="checkbox" className="mt-1"
                                        onChange={(e) => {
                                            setChildShowWellnessPopup(e.target.checked);
                                            setShowPopup(false);
                                        }}
                                    />
                                    <span>Child’s Development & Growth Plan</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}


                {showWellnessPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-xl w-[550px] p-8 relative text-gray-700">
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                onClick={() => setShowWellnessPopup(false)}
                            >
                                ✕
                            </button>

                            {/* Profile Image & Progress */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md mb-2">
                                    <img src="/images/women.png" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-sm font-medium mb-4">23% Complete</p>
                            </div>

                            <form onSubmit={submitMotherProfile}>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <input name="dob" type="date" placeholder="Date Of Birth" className="border p-2 rounded" />
                                    <select name="lifeStage" className="border p-2 rounded" required>
                                        <option value="" disabled selected>* Current life stage</option>
                                        <option>Early adulthood</option>
                                        <option>Adulthood</option>
                                        <option>Pregnancy</option>
                                        <option>Menopause</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                    <select name="goal" className="border p-2 rounded" required>
                                        <option disabled selected>* Goal is to work on</option>
                                        <option>Sleep</option>
                                        <option>Hormones</option>
                                        <option>fatigue</option>
                                        <option>Anxiety</option>
                                        <option>Self Care</option>
                                    </select>
                                    <select name="tone" className="border p-2 rounded" required>
                                        <option disabled selected>* Tone Preference</option>
                                        <option>Reassuring</option>
                                        <option>Motivational</option>
                                        <option>Calming</option>
                                        <option>Neutral</option>
                                    </select>
                                    <div className="relative">
                                        <input name="weight" type="text" placeholder="Weight" className="border p-2 rounded w-full" required />
                                        <span className="absolute right-2 top-2.5 text-gray-500">kg</span>
                                    </div>
                                    <div className="relative">
                                        <input name="height" type="text" placeholder="Height" className="border p-2 rounded w-full" required />
                                        <span className="absolute right-2 top-2.5 text-gray-500">cm</span>
                                    </div>
                                </div>

                                {/* Go to Dashboard Button */}
                                <div className="mt-6 flex justify-center">
                                    <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                                        Go to the Dashboard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* for child */}

                {showChildWellnessPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-xl w-full max-w-[650px] p-8 relative text-gray-700 shadow-xl">
                            {/* Profile & Progress */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow mb-2">
                                    <img
                                        src="/images/women.png"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-sm font-medium">23 % Complete</p>
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

                                    <select name='gaol' className="border p-2 rounded" required>
                                        <option value="" hidden selected>* Goal</option>
                                        <option>Growth</option>
                                        <option>Nutrition</option>
                                        <option>Activity</option>
                                    </select>
                                </div>

                                {/* Dashboard Button */}
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
                                    >
                                        Go to the Dashboard
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isOtp && (
                    <>
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
                    </>
                )}

                {/* for child and womens */}


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

export default SignupUI
