import React, { useState } from "react";
import { Link } from "react-router-dom";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlerle";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "footer-early-access" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="h-[10px] mt-12 md:mt-[120px]"></div>
      <div id="early-access" className="relative bg-[#fef8e6] overflow-hidden px-4 sm:px-6 md:px-[80px] pb-8">
        {/* Curve Top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            className="w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
            ></path>
          </svg>
        </div>

        {/* Footer Content */}
        <div className="relative flex flex-col lg:flex-row justify-around items-center py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8">
          {/* Left Side - Text and Buttons */}
          <div className="flex flex-col gap-3 justify-normal w-full lg:w-auto mb-10 lg:mb-0 text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl md:text-[28px] leading-normal sm:leading-10 font-normal mb-4 text-[#4A4B4F]">
              Whether you're leading at work, holding it together at home,<br className="hidden sm:block" />
              or simply trying to find a moment for yourself —<br className="hidden sm:block" />
              LittleHugs gives you a gentler way to care
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <Link to="/assesment" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#263238] text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                  Explore our Programs
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Email Subscription */}
          <div className="w-full lg:w-[50%] flex flex-col mb-10 lg:mb-20 gap-2 justify-center items-center">
            {status === "success" ? (
              <p className="text-[#15803d] font-medium text-center text-base sm:text-lg">
                You're on the list. We'll be in touch when your check-in is ready.
              </p>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="w-full sm:w-[70%]">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#263238] rounded-[10px] h-12 sm:h-[72px] px-4 py-2 outline-none"
                      type="email"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full sm:w-[138px] bg-[#263238] text-white px-6 py-2 rounded-[70px] hover:bg-gray-700 transition h-12 sm:h-[72px] disabled:opacity-60"
                    >
                      {status === "submitting" ? "…" : "Get early access"}
                    </button>
                  </div>
                </form>
                {status === "error" && (
                  <p className="text-[#dc2626] text-sm text-center">Something slipped — please try again.</p>
                )}
                <p className="text-[#6b6c70] text-xs text-center mt-1">No spam. Private by design.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
