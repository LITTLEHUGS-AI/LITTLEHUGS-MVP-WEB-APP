import React from 'react';
import Navbar from '../common/Navbar';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fef9f6]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center relative overflow-hidden"
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
            {/* <img
              src="/images/signup.png"
              alt="Decor"
              className="w-full h-auto object-contain"
            /> */}
          </div>

          {/* Right Form Side */}
          <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-md p-10 shadow-md relative z-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign Up</h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Already have an account? <Link to="#" className="text-blue-600 hover:underline">Sign in</Link>
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="* Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="* Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="* Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex gap-4">
                <select className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
                  <option value="">* City</option>
                  <option>New York</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Chennai</option>
                </select>
                <select className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600">
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
                  I agree to LittleHugs’s <Link to="#" className="text-blue-600 underline">Terms & Conditions</Link> and acknowledge the <Link to="#" className="text-blue-600 underline">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4776E6] text-white text-sm py-2 rounded-full hover:bg-[#365fbd] transition"
              >
                Create Account
              </button>

              <div className="flex justify-center">
                <button
                  type="button"
                  className="mt-2 w-full flex items-center justify-center gap-2 text-sm bg-[#fef3e6] border border-gray-200 rounded-full py-2 hover:bg-[#f8e9d8]"
                >
                  <img
                    src="/icons/google-icon.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">Sign up with Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <img src="/images/wave-decoration.png" alt="Wave Background" className="w-full h-[80px]" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
