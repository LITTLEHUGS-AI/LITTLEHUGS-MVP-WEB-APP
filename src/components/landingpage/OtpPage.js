import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);

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

  const handleSubmit = () => {
    alert("OTP Submitted: " + otp.join(""));
  };

  const handleResendOtp = () => {
    // You can integrate an actual resend API here
    alert("OTP Resent!");
    setOtp(Array(6).fill("")); // Clear OTP fields
    inputsRef.current[0].focus(); // Focus back to first field
    setTimer(60); // Reset timer
    setResendEnabled(false); // Disable resend until timer ends again
  };

  return (
    <div className="min-h-screen bg-[#fef6f2] flex flex-col items-center justify-center">
      {/* Logo and Title */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
      <Link to="/">
          <img
            src="/images/logo.svg"
            alt="LittleHugs Logo"
            className="max-h-10"
          />
        </Link>
        
      </div>

      {/* OTP Box */}
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md border border-gray-200">
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
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
