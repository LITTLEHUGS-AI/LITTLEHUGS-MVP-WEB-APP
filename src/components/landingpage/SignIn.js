import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';

function SignIn() {
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
                <div className="bg-white rounded-md shadow-md p-8 w-full max-w-md border">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Sign In</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        New here? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>

                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="* Email"
                            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="* Password"
                            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <div className="text-right">
                            <Link to="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</Link>
                        </div>

                        <div className="flex items-start space-x-2 text-sm text-gray-600">
                            <input type="checkbox" id="terms" />
                            <label htmlFor="terms">
                                I agree to LittleHugs's <Link to="#" className="text-blue-500 underline">Terms & Conditions</Link> and acknowledge the <Link to="#" className="text-blue-500 underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Create Account
                        </button>

                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="mt-2 w-full flex items-center justify-center gap-2 text-sm bg-[#fef3e6] border border-gray-200 rounded-full py-2 hover:bg-[#f8e9d8]"
                >
                                <img
                                    src="/icons/google-icon.svg"
                                    alt="Google"
                                    className="w-10 h-5"
                                />
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
