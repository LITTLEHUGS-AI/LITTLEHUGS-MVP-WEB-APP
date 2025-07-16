import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
                LittleHugs 360° Men’s Wellness Program
            </h1>

            {/* What it Assesses Section */}
            <div className="mb-4 sm:mb-6 px-2 sm:px-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">What it Provides:</h2>
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
              <span className="bg-blue-500 text-white rounded-lg mx-auto p-2 hover:bg-blue-700" onClick={() => {
                const profile = document.getElementById('profile');
                if (profile) profile.click();
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
            {type === 'men' && <div className="bg-amber-50 rounded-lg p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-medium text-gray-700 text-center mb-6">
                  LittleHugs 360° Men’s Wellness Program
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
            </div>}

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