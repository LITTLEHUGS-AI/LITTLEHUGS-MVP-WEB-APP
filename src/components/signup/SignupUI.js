import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from '../common/Loader';
import { Link } from 'react-router-dom';
import axios from "axios";
import Navbar from '../common/Navbar';



const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
    city: "",
    mother_tongue: "user",
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

}) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [showPopup, setShowPopup] = useState(false);
    const [showWellnessPopup, setShowWellnessPopup] = useState(false);


    // const handleSubmitPopup = (e) => {
    //     e.preventDefault();
    //     setShowPopup(true);
    // };
    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: zodResolver(SignInFormSchema),
    });

    const handleSubmit = (data) => {
        onSubmit(data);
    };

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
                                <inputField
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
                                    <select {...methods.register("city")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
                                        <option value="">* City</option>
                                        <option>New York</option>
                                        <option>Mumbai</option>
                                        <option>Delhi</option>
                                        <option>Chennai</option>
                                    </select>
                                    <select  {...methods.register("mother_tongue")} className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
                                        <option value="">* Mother tongue</option>
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
                                        onChange={(e) => setShowWellnessPopup(e.target.checked)}
                                    />
                                    <span>Women’s Wellness Plan</span>
                                </label>

                                <label className="flex items-start space-x-2">
                                    <input type="checkbox" className="mt-1"
                                        onChange={(e) => setShowWellnessPopup(e.target.checked)}
                                    />
                                    <span>Child’s Development & Growth Plan</span>
                                </label>
                            </div>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute bottom-4 right-4 text-white bg-orange-400 hover:bg-orange-500 text-xs px-4 py-1 rounded-full"
                            >
                                Done
                            </button>
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

                            {/* Form Fields */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <input type="date" placeholder="Date Of Birth" className="border p-2 rounded" />
                                <select className="border p-2 rounded">
                                    <option disabled selected>* Current life stage</option>
                                    <option>Early adulthood</option>
                                    <option>Adulthood</option>
                                    <option>Pregnancy</option>
                                    <option>Menopause</option>
                                    <option>Prefer not to say</option>
                                </select>
                                <select className="border p-2 rounded">
                                    <option disabled selected>* Goal is to work on</option>
                                    <option>Sleep</option>
                                    <option>Hormones</option>
                                    <option>fatigue</option>
                                    <option>Anxiety</option>
                                    <option>Self Care</option>
                                </select>
                                <select className="border p-2 rounded">
                                    <option disabled selected>* Tone Preference</option>
                                    <option>Reassuring</option>
                                    <option>Motivational</option>
                                    <option>Calming</option>
                                    <option>Neutral</option>
                                </select>
                                <div className="relative">
                                    <input type="text" placeholder="Weight" className="border p-2 rounded w-full" />
                                    <span className="absolute right-2 top-2.5 text-gray-500">kg</span>
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="Height" className="border p-2 rounded w-full" />
                                    <span className="absolute right-2 top-2.5 text-gray-500">cm</span>
                                </div>
                            </div>

                            {/* Go to Dashboard Button */}
                            <div className="mt-6 flex justify-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
                                    Go to the Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* for child */}

                {showWellnessPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-xl w-full max-w-[650px] p-8 relative text-gray-700 shadow-xl">

                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                                onClick={() => setShowWellnessPopup(false)}
                            >
                                ✕
                            </button>

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <input
                                    type="text"
                                    placeholder="* Child's Name"
                                    className="border p-2 rounded"
                                />
                                <div className="relative">
                                    <input
                                        type="date"
                                        placeholder="* Child's Date of Birth"
                                        className="border p-2 rounded w-full"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500">
                                        📅
                                    </span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="* Weight"
                                        className="border p-2 rounded w-full pr-10"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500">kg</span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="* Height"
                                        className="border p-2 rounded w-full pr-10"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-500">cm</span>
                                </div>

                                <select className="border p-2 rounded">
                                    <option>* Age Group</option>
                                    <option>0-2 years</option>
                                    <option>3-5 years</option>
                                    <option>6-12 years</option>
                                </select>

                                <select className="border p-2 rounded">
                                    <option>* Goal</option>
                                    <option>Growth</option>
                                    <option>Nutrition</option>
                                    <option>Activity</option>
                                </select>
                            </div>

                            {/* Dashboard Button */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
                                    onClick={() => setShowWellnessPopup(false)}
                                >
                                    Go to the Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
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
