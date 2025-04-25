import React from "react";

const Footer = () => {
  return (
    <div className="w-full p-8 font-quicksand">
      {/* Top Section - Stay Updated */}
      <div className="flex justify-between mb-55">
        {/* Left */}
        <div className="max-w-[600px]">
          <h2 className="text-2xl font-medium mb-2">Stay Updated</h2>
          <p className="text-sm text-gray-700 mb-4">
            Be the first to get updates on our latest content, special offers, and new
            features. By signing up, you're agreeing to receive marketing emails from
            LittleHugs. You can unsubscribe at any time. For more details, check out our{" "}
            <a href="#" className="text-blue-600 underline">Privacy Policy.</a>
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center ml-23 gap-6">
          <input
            type="email"
            placeholder="* Email"
            className="w-[320px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Section - Footer Links */}
      <div className="w-[583px] ml-[10px] flex gap-[200px]">
        {/* Left Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get LittleHugs</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><a href="#">Try for free</a></li>
            <li><a href="#">Our Plans</a></li>
            <li><a href="#">Personal Plan</a></li>
            <li><a href="#">Partner Plan</a></li>
            <li><a href="#">Check Assessments</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg font-semibold mb-2">My LittleHugs</h3>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
