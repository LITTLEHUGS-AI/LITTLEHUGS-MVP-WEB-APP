import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WellnessAssessment = ({ onClose, heading }) => {
  const navigate = useNavigate();

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative mx-4"
        style={{
          backgroundImage: "url('/images/learnmore.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white bg-opacity-70 rounded-full h-8 w-8 flex items-center justify-center"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        {heading === 1 ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs 360° Women's Wellness Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What the Program Covers:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Mood & emotional regulation</li>
                <li>Anxiety, mental overload, overthinking</li>
                <li>Hormonal balance & fatigue (e.g., PMS, perimenopause, PCOS)</li>
                <li>Self-image, body confidence & social comparison</li>
                <li>Relationship health & parenting stress</li>
                <li>Sleep habits, digital wellbeing, and rest patterns</li>
                <li>Work-life burnout signs and emotional coping</li>
                <li>Self-care rituals & early red flag detection</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li><b>HAC Wellness Score</b> across 20 life domains</li>
                <li><b>Key insight flags</b> (e.g., “You may be in early burnout,” “Hormonal mood changes detected”)</li>
                <li><b>AI-generated nudges</b> (e.g., journaling cues, body-awareness tools, calm-down rituals)</li>
                <li><b>Personal wellness timeline</b> (PDF report with emotional patterns + suggestions)</li>
                <li>Optional <b>Follow-up support path</b> (sleep reset, confidence builder, burnout toolkit)</li>
              </ul>
            </div>
          </>
        ) : heading === 2 ? (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs 360° Children's Wellness Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What the Program Covers:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Developmental milestones (language, motor skills, problem-solving)</li>
                <li>Social-emotional learning (empathy, confidence, coping with change)</li>
                <li>Behavioral signs (hyperactivity, aggression, emotional withdrawal)</li>
                <li>Communication skills (speech clarity, understanding, social use of language)</li>
                <li>School readiness (attention, memory, curiosity, early literacy/numerac</li>
                <li>Sleep patterns, nutrition habits, and physical activity</li>
                <li>Peer relationships, emotional safety, and self-esteem</li>
                <li>Caregiver bonding, routines, and parenting stress</li>
                <li>Environmental stability and access to safe support systems</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li><b>HAC Wellness Score</b> adapted to child age & domain relevance</li>
                <li><b>Key growth & behavior insights</b> (e.g., “Signs of emotional withdrawal,” “Delayed speech milestones”)</li>
                <li><b>AI-powered caregiver nudges</b> (e.g., play-based prompts, conversation starters, routine support)</li>
                <li><b>Development & wellness summary</b> (PDF snapshot with trendlines & risk flags)</li>
                <li>Optional <b>Guided care track</b> (e.g., language stimulation, emotion regulation, focus support)</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs Corporate Partnership Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What the Program Covers:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Emotional awareness, irritability, and resilience</li>
                <li>Stress & burnout from work, caregiving, or identity roles</li>
                <li>Hormonal wellness (e.g., testosterone-linked mood, energy dips)</li>
                <li>Sleep issues, fatigue, and digital overstimulation</li>
                <li>Body confidence, self-image, and aging transitions</li>
                <li>Relationship satisfaction, parenting load, and co-parenting stress</li>
                <li>Impulse control, anger management, and conflict resolution</li>
                <li>Self-care awareness, loneliness, and mental load detection</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li><b>HAC Wellness Score</b> tailored to men’s 20-domain profile</li>
                <li><b>Key emotional insights</b> (e.g., “You may be emotionally disconnected,” “Stress is impacting your energy”</li>
                <li><b>AI-driven nudges</b> (e.g., movement prompts, self-reflection tools, anger diffusers)</li>
                <li><b>ersonal wellness summary</b> with trendlines across sleep, mood, and energy</li>
                <li>Optional <b>Guided plans </b> (e.g., stress reboot, fatherhood clarity, confidence reset)</li>
              </ul>
            </div>
          </>
        )}


        {/* Divider */}
        <div className="border-t border-gray-200 my-4 sm:my-6"></div>

        {/* Action Button */}
        <div className="flex justify-center px-2 sm:px-4 pb-2 sm:pb-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#1E2C2B] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition font-medium text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
          >
            Take quick assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssessment;