import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import store from "../../../config/storeInstance";
import ProfileUi from "./ProfileUi";

const PersonalAssessment = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(null);
  const [hideAssessment, setHideAssessment] = useState(0);
  const [type, setType] = useState('');


  const dd = store.getData();
  useEffect(() => {
    if ((Object.keys(dd).length !== 0)) {
      if (dd.completingPercentage != null) setHideAssessment(dd.completingPercentage);
      setType(dd.current);
    }

    const unsubscribe = store.subscribe((newData) => {
      if (newData.completingPercentage != null) setHideAssessment(newData.completingPercentage);
      setType(newData.current);
    });

    return () => unsubscribe();
  }, [dd])


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">

      <Sidebar />

      {/* Main content - scrollable */}
      <div className="flex-1 m-2 overflow-y-auto">


        <div className="flex">
          <div className="flex-1 flex-grow flex items-center justify-start p-2 border border-gray-400 rounded-md">
            <p className="p-0 text-[20px] text-slate-500">
              In this moment, nothing is asked of you. You are allowed to pause. To rest. To simply be
            </p>
          </div>
          <div className="hidden md:block">
            <ProfileUi />
          </div>
        </div>



        {showPopup === "Women" && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              onClick={() => setShowPopup(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white bg-opacity-70 rounded-full h-8 w-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs 360° Women's Wellness Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What it Program:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Mood & emotional balance</li>
                <li>Anxiety, overthinking</li>
                <li>Physical energy & fatigue</li>
                <li>Support systems in relationship quality</li>
                <li>Self-care routines & burnout-warning sign</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>HAC Wellness Score</li>
                <li>Key theme insights (e.g. "You feel unsupported," "You're emotionally fatigued")</li>
                <li>AI-supported nudges (swimming, rest rituals, conversation starter pools)</li>
                <li>PDF summary with personal wellness trendline</li>
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

            {/* Action Button */}
            <div className="flex justify-center px-2 sm:px-4 pb-2 sm:pb-4">
              <button
                onClick={() => navigate(`/personal/assessment/start?type=women-wellness-360&no=1`)}
                className="bg-[#1E2C2B] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition font-medium text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
              >
                Take quick assessment
              </button>
            </div>
          </div>
        </div>}

        {showPopup === "Children" && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-[650px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative mx-4"
            style={{
              backgroundImage: "url('/images/learnmore.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <button
              onClick={() => setShowPopup(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white bg-opacity-70 rounded-full h-8 w-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs 360° Children's Wellness Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What it Program:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Developmental milestones (motor, speech, cognitive, social)</li>
                <li>learning, autism signs, behavioral regulation</li>
                <li>Mood, anxiety, social-emotional health</li>
                <li>Growth, nutrition, sensory function, immunizations</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>RAG status (Red/Amber/Green) for each domain</li>
                <li>Risk flags and severity scores</li>
                <li>Personalized insights, home strategies, and referral guidance</li>
                <li>Shareable caregiver summary (optional PDF)</li>
              </ul>
            </div>


            {/* Divider */}
            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

            {/* Action Button */}
            <div className="flex justify-center px-2 sm:px-4 pb-2 sm:pb-4">
              <button
                onClick={() => navigate("/personal/assessment/start?type=child-wellness-360&no=2")}
                className="bg-[#1E2C2B] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition font-medium text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
              >
                Take quick assessment
              </button>
            </div>
          </div>
        </div>}

        {showPopup === "SEL" && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              onClick={() => setShowPopup(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-2xl bg-white bg-opacity-70 rounded-full h-8 w-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center mt-2 px-4">
              LittleHugs Corporate Partnership Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What it Provides:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li><b>Digital Screening Tools : </b>Developmental, emotional, and behavioral assessments (ASQ, M-CHAT, SDQ, EPDS, GAD-7)</li>
                <li><b>Smart Dashboards : </b>Risk-flag overviews (Red/Amber/Green), outcome summaries, referral tracking</li>
                <li><b>Multirole Access & User Management : </b>Admins, therapists, educators, caregivers—all with tailored UX</li>
                <li><b>Integrated Reports : </b>Auto-generated PDF summaries for caregivers, pediatricians, or therapists</li>
              </ul>
            </div>

            {/* Output Section */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Output:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-2 sm:pl-4 text-sm sm:text-base">
                <li>Domain scores: Thriving, Developing, Needs Support</li>
                <li>Strengths/growth summary</li>
                <li>Personalized action steps & micro-habits</li>
                <li>Optional external feedback layer (for children or shared settings)</li>
                <li>Referral suggestions for high emotional or relational concern</li>
              </ul>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4 sm:my-6"></div>

            {/* Action Button */}
            <div className="flex justify-center px-2 sm:px-4 pb-2 sm:pb-4">
              <button
                onClick={() => navigate("/personal/assessment/start?type=sel-assessment-360&no=3")}
                className="bg-[#1E2C2B] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-[#111818] transition font-medium text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
              >
                Take quick assessment
              </button>
            </div>
          </div>
        </div>}


        {(hideAssessment < 100) && (
          <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center px-2">
            <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                Your Pofile is {hideAssessment}% Completed
              </h2>
              <p className="mb-6">
                Please Complete your profile first
              </p>
              <span className="bg-blue-500 text-white rounded-lg mx-auto p-2 hover:bg-blue-700" onClick={()=>{
                const profile = document.getElementById('profile');
                if(profile) profile.click();
              }}>Complete Profile</span>
            </div>
          </div>
        )}


        <div className="flex flex-col flex-1 bg-purple-100 mt-2 p-8">
          <h1 className="text-3xl text-center text-gray-700 font-medium mb-8">
            Explore Our Programs here
          </h1>

          <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">

            {/* Women's Assessment Card */}
            {type === 'women' && <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                LittleHugs 360° Women's Wellness Program
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                A high-level mind-body-social scan that gives a complete
                picture of a woman's mental health, emotional resilience,
                self-care capacity, and support system.
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button onClick={() => setShowPopup('Women')} className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>}

            {/* Children's Assessment Card */}
            {type === 'child' && <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                LittleHugs 360° Children's Wellness Program
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                To provide a comprehensive snapshot of a child's
                developmental, behavioral, emotional, and physical wellness
                for early detection and support
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button onClick={() => setShowPopup('Children')} className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>}

            {/* SEL Assessment Card */}
            <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                LittleHugs Corporate Partnership Program
              </h2>

              <p className="text-gray-600 text-center mb-8 flex-grow">
                Promote self-awareness, emotional intelligence, and social
                well-being; identify SEL strengths and growth areas; support
                self-regulation, empathy, and decision-making
              </p>

              <div className="flex flex-col gap-3 mt-auto">
                <button onClick={() => setShowPopup('SEL')} className="bg-gray-800 text-white py-2 px-4 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* completingPercentage */}
        <div className="flex flex-start border border-slate-500 rounded-md mt-5 mx-1 md:mx-4 mb-4 flex items-start justify-center overflow-hidden">
          <img
            alt="Dashboard Collage"
            src="/images/dashboardCollageWeb.png"
            className="w-full h-full"
          />
        </div>


      </div>
    </div>
  );
};

export default PersonalAssessment;