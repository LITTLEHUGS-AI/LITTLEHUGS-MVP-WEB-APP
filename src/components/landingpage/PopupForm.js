// src/PopupForm.js
import React, { useState } from 'react';

export default function PopupForm() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Trigger Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="bg-white shadow-md px-6 py-4 rounded-md border hover:bg-gray-50"
      >
        <input type="checkbox" className="mr-2" />
        Women’s Wellness Plan
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-lg font-medium text-center mb-4">Tell us more</h2>

            {/* Dropdowns */}
            <div className="space-y-4">
              {/* 1. Current Life Stage */}
              <div className="relative">
                <select className="w-full border rounded px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option disabled selected>* Current life stage</option>
                  <option>Early adulthood</option>
                  <option>Adulthood</option>
                  <option>Pregnancy</option>
                  <option>Menopause</option>
                  <option>Prefer not to say</option>
                </select>
                <span className="absolute right-4 top-3 text-gray-500 pointer-events-none">⌄</span>
              </div>

              {/* 2. Goal is to work on */}
              <div className="relative">
                <select className="w-full border rounded px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option disabled selected>* Goal is to work on</option>
                  <option>Sleep</option>
                  <option>Hormones</option>
                  <option>Energy</option>
                  <option>Stress</option>
                  <option>Digestion</option>
                </select>
                <span className="absolute right-4 top-3 text-gray-500 pointer-events-none">⌄</span>
              </div>

              {/* 3. Tone Preference */}
              <div className="relative">
                <select className="w-full border rounded px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option disabled selected>* Tone Preference</option>
                  <option>Reassuring</option>
                  <option>Motivational</option>
                  <option>Empathetic</option>
                  <option>Friendly</option>
                  <option>Professional</option>
                </select>
                <span className="absolute right-4 top-3 text-gray-500 pointer-events-none">⌄</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
