import { useState } from "react";
import Sidebar from "../Sidebar";
import ProfileUi from "../ProfileUi";

export default function AssesmentConsent() {
    const [currentStep, setCurrentStep] = useState(1);
    const [quesLoding, setQuesLoding] = useState(false);

    const [consentAccept, setConsentAccept] = useState([]);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [selectedPurposes, setSelectedPurposes] = useState([]);

    const steps = ["Consent", "Goal", "Purpose", "Assessment"];

    function step1(term) {
        if (consentAccept.includes(term)) setConsentAccept(prev => prev.filter(item => item !== term));
        else setConsentAccept(prev => [...prev, term]);
    }

    const goals = [
        {
            id: "understand",
            emoji: "👤",
            title: "Understand how I've been feeling lately",
            description: `I want a snapshot of my emotional state.`
        },
        {
            id: "support",
            emoji: "😔",
            title: "Find out if I might need support",
            description: `I'm not sure if what I'm feeling is okay—I'd like to know if I need help.`
        },
        {
            id: "wellbeing",
            emoji: "🌱",
            title: "Improve my overall well-being",
            description: `I want gentle tips to feel more balanced.`
        },
        {
            id: "stress",
            emoji: "🔴",
            title: "Manage stress, burnout, or overwhelm",
            description: `I've been feeling stretched and exhausted.`
        },
        {
            id: "reconnect",
            emoji: "🤍",
            title: "Reconnect with myself emotionally",
            description: `I feel a bit disconnected from who I am—I want to check in.`
        },
        {
            id: "tired",
            emoji: "💤",
            title: "Figure out why I'm tired all the time",
            description: `Fatigue and sleep are big issues—I need clarity.`
        },
        {
            id: "better",
            emoji: "🔒",
            title: "Be a better version of myself for me/my family",
            description: `I want to feel more present, emotionally and physically.`
        },
        {
            id: "moment",
            emoji: "💛",
            title: "Just taking a moment for myself",
            description: `I don't have anything major—just checking in and caring for myself.`
        }
    ];

    const toggleGoal = (goalId) => {
        if (selectedGoals.includes(goalId)) setSelectedGoals(prev => prev.filter(id => id !== goalId));
        else setSelectedGoals(prev => [...prev, goalId]);
    };

    const togglePurpose = (purpose) => {
        if (selectedPurposes.includes(purpose)) setSelectedPurposes(prev => prev.filter(id => id !== purpose));
        else setSelectedPurposes(prev => [...prev, purpose]);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Fixed Sidebar - not scrollable */}
            <div className="w-64 h-screen bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block">
                <Sidebar />
            </div>

            {/* Main content - scrollable */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="grid grid-cols-12 items-center justify-center p-4 gap-4">
                    <div className="col-span-10 flex items-center justify-start p-[14px] border border-gray-400 rounded-md">
                        <p className="p-0 text-[20px] text-slate-500">
                            You have not taken any assessment till date !
                        </p>
                    </div>
                    <div className="col-span-2">
                        <ProfileUi />
                    </div>
                </div>

                {quesLoding ? <div className="flex flex-col h-full items-center justify-center">
                    <img alt="loading..." src='/gif/loading1.gif' />
                    <span className="text-xl font-bold">Tailoring the questions according to your history</span>
                </div> :
                    <>
                        {/* Progress Steps */}
                        <div className="mt-16 mb-8 mx-auto w-full max-w-xl">
                            <div className="flex justify-between items-center mb-2">
                                {steps.map((step, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index + 1 === currentStep ? 'bg-blue-500 text-white' :
                                            index + 1 < currentStep ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className={`mt-2 text-sm ${index + 1 === currentStep ? 'text-blue-500' : 'text-gray-500'
                                            }`}>
                                            {step}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative h-1 w-full bg-gray-300">
                                <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
                                {steps.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`absolute top-0 w-1 h-1 rounded-full -translate-x-1/2 ${index === 0 ? 'left-0' :
                                            index === steps.length - 1 ? 'left-full' : `left-${index}/${steps.length - 1}`
                                            } ${index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                                            }`}
                                        style={{ left: `${index / (steps.length - 1) * 100}%` }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Main Content */}
                        <main className="flex flex-1 flex-col max-w-3xl items-center px-6 gap-4 m-auto">
                            {currentStep === 1 && <>
                                <div className="w-full ring-4 ring-blue-400 rounded-lg bg-white p-8 shadow-sm">
                                    <div className="space-y-4">
                                        <p className="text-gray-700">
                                            At LittleHugs, your emotional safety and self-awareness matter deeply.
                                        </p>
                                        <p className="text-gray-700">
                                            This assessment is a non-diagnostic wellness tool thoughtfully designed to help you reflect on how
                                            you're feeling across your emotional, physical, mental, and social dimensions. It's not about labels—it's
                                            about understanding yourself better.
                                        </p>
                                        <p className="text-gray-700">
                                            Whether you're navigating motherhood, balancing work and life, or simply feeling overwhelmed—this
                                            tool helps bring gentle clarity to how your mind and body are doing.
                                        </p>
                                        <p className="text-gray-700">
                                            You'll get a personalized snapshot of your wellness, along with simple, actionable suggestions and
                                            supportive insights—because small moments of reflection can lead to big shifts in self-care.
                                        </p>
                                        <p className="text-gray-700">
                                            There are no wrong answers here. This is your safe space.
                                        </p>
                                        <p className="text-gray-700">
                                            We're here to support—not to judge.
                                        </p>

                                        <div className="mt-8 flex">
                                            <button
                                                className={`px-6 py-2 text-white rounded-full ${(!consentAccept.includes("understand") || !consentAccept.includes("consent")) ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} transition-colors`}
                                                disabled={!consentAccept.includes("understand") || !consentAccept.includes("consent")}
                                                onClick={() => setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length))}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2 ">
                                    <div>
                                        <input type="checkbox" checked={consentAccept.includes("understand")} onClick={() => step1("understand")} />
                                        <span>I understand this is a supportive tool, not medical advice</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" checked={consentAccept.includes("consent")} onClick={() => step1("consent")} />
                                        <span>I consent to my anonymized data being used for personalization and insight generation</span>
                                    </div>
                                </div>
                            </>}

                            {currentStep === 2 && <>
                                <h2 className="text-xl text-gray-800 font-medium mb-6 text-center">
                                    What do you hope to gain from this check-in today? (Select all that applies)
                                </h2>

                                <div className="space-y-4">
                                    {goals.map((goal) => (
                                        <button
                                            key={goal.id}
                                            className={`w-full text-left p-6 rounded-lg border-2 ${selectedGoals.includes(goal.id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                                } transition-colors flex flex-col`}
                                            onClick={() => toggleGoal(goal.id)}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-2">{goal.emoji}</span>
                                                <span className="font-medium">{goal.title}</span>
                                            </div>
                                            <p className="text-gray-600 mt-1 ml-8">{goal.description}</p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${selectedGoals.length > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length))}
                                        disabled={selectedGoals.length === 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                            {currentStep === 3 && <>

                                <h2 className="text-xl text-gray-800 font-medium mb-6 text-center">
                                    1. What brings you here today? (Select all that applies)
                                </h2>

                                <div className="space-y-4">
                                    {["I’ve been feeling low, anxious, or burned out", "I want to check in on my emotional and mental well-being", "I’m struggling with sleep or fatigue", "I’m curious about how I’m really doing", "I’m curious about how I’m really doing"].map((ques1) => (
                                        <button
                                            key={ques1}
                                            className={`w-full text-left p-6 rounded-lg border-2 ${selectedPurposes.includes(ques1)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                                } transition-colors flex flex-col`}
                                            onClick={() => togglePurpose(ques1)}
                                        >
                                            <span className="font-medium">{ques1}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${selectedGoals.length > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => { setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length)); setQuesLoding(true) }}
                                        disabled={selectedGoals.length === 0}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                        </main>
                    </>
                }


            </div>

        </div>
    );
}