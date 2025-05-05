import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from "react-hook-form";
import Navbar from '../common/Navbar';
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from "../common/Loader";
import axios from "axios";
import { Button } from "react-aria-components";

const INITIAL_VALUES = {
    email: "",
    password: "",
};

function SignInUI({
    onSubmit,
    isError,
    isPending,
    message,
    visible,
    handleShowPassword,
    SignInFormSchema,
}) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: zodResolver(SignInFormSchema),
    });
    const handleSubmit = (data) => {
        onSubmit(data);
    };

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
                className="flex-grow flex  items-center justify-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('/images/sign in.png')",
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, top left',
                    backgroundSize: 'cover, contain',
                }} // Your uploaded background image
            >
                <div className="bg-white rounded-md shadow-md p-8 w-[980px] max-w-md border">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Sign In</h2>
                    <p className="text-center text-sm py-2 mb-2 text-gray-600 ">
                        New here? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                    <FormProvider {...methods}>
                        <form
                            className="space-y-4"
                            onSubmit={methods.handleSubmit(handleSubmit)}
                        >
                            {/* <input
                                type="email"
                                placeholder="* Email"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            /> */}
                            <InputField
                                label="Email"
                                name="email"
                                fieldId="email"
                                placeHolder="Enter your Email"
                                message={isError ? message : ""}
                                isDisabled={isPending}
                            />
                            {/* <input
                                type="password"
                                placeholder="* Password"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            /> */}
                            <InputField
                                type={visible.password ? "text" : "password"}
                                name="password"
                                placeHolder="Enter your password"
                                showIcon={visible.password}
                                visible={true}
                                handleChange={handleShowPassword}
                            />

                            <div className="text-right">
                                <Link to="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</Link>
                            </div>

                            <div className="flex items-start py-5 space-x-2 text-sm text-gray-600">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    I agree to LittleHugs's <Link to="#" className="text-blue-500 underline">Terms & Conditions</Link> and acknowledge the <Link to="#" className="text-blue-500 underline">Privacy Policy</Link>.
                                </label>
                            </div>

                            {/* <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                            >
                                Create Account
                            </button> */}
                            <Button
                                isDisabled={isPending}
                                className={`${isPending ? "sign-load" : "sign"
                                    } w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200`}
                                type="submit"
                            >
                                {isPending ? <ButtonLoader /> : "Sign In"}
                            </Button>

                            <div className="flex justify-center mt-4">
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
        </div>
    );
}

export default SignInUI;
