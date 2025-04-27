// src/components/JoinMovement.jsx
import React from 'react';

function JoinMovement() {
    return (
        <div className="bg-[#FFF9E7] py-16 flex flex-col items-center text-center relative overflow-hidden">
            <h2 className="text-3xl font-semibold text-[#4A4B4F] mb-6 font-quicksand">
                Join the Movement
            </h2>
            <p className="text-lg max-w-3xl text-[#4A4B4F] mb-10 px-4 font-quicksand">
                We’re building more than a platform — we’re building a world where every child feels seen early,
                and every caregiver feels supported. Whether you’re a school, clinic, parent, or simply someone
                who believes in early care, we’d love to build with you.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <button className="bg-[#283036] text-white px-8 py-3 rounded-full font-semibold text-lg font-quicksand hover:bg-[#1f252b] transition">
                    Take the free test
                </button>
                <button className="border border-[#283036] text-[#283036] px-8 py-3 rounded-full font-semibold text-lg font-quicksand hover:bg-[#283036] hover:text-white transition">
                    Partner with us
                </button>
            </div>
        </div>
    );
}

export default JoinMovement;
