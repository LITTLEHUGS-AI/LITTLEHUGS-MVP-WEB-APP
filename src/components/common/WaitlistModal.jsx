// src/components/common/WaitlistModal.jsx
import React, { useState } from "react";
import { useWaitlist } from "../../lib/WaitlistContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlerle";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={closeWaitlist}
    >
      <div
        className="bg-[#FAF3ED] rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        {/* Close button */}
        <button
          onClick={closeWaitlist}
          className="absolute top-4 right-4 text-[#4A4B4F] hover:text-gray-800 text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#4A4B4F] mb-2">You're on the list!</h2>
            <p className="text-[#4A4B4F] text-base leading-relaxed">
              We'll reach out as soon as LittleHugs is ready for you. Thank you for being part of this journey.
            </p>
            <button
              onClick={closeWaitlist}
              className="mt-6 bg-[#4F7DDD] hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-full transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#4A4B4F] mb-1">Join the waitlist</h2>
            <p className="text-[#4A4B4F] text-sm mb-6 leading-relaxed">
              Be the first to know when LittleHugs launches. No spam — just one email when we're ready.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4B4F] mb-1">Your name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sara Ahmed"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7DDD] bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A4B4F] mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sara@example.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F7DDD] bg-white"
                />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#4F7DDD] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition text-base"
              >
                {status === "submitting" ? "Joining..." : "Join the waitlist"}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
