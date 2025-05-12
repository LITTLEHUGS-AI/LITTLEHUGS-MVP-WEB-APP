import { useState } from "react";
import Sidebar from "../Sidebar";
import ProfileUi from "../ProfileUi";

export default function AssesmentConsent() {
    const [currentStep, setCurrentStep] = useState(1);

    const [consentAccept, setConsentAccept] = useState([]);

    const steps = ["Consent", "Goal", "Purpose", "Assessment"];

    function step1(term) {
        if (consentAccept.includes(term)) setConsentAccept(prev => prev.filter(item => item !== term));
        else setConsentAccept(prev => [...prev, term]);
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Fixed Sidebar - not scrollable */}
            <div className="w-64 h-screen bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block">
                <Sidebar />
            </div>

            {/* Main content - scrollable */}
            <div className="flex-1 overflow-y-auto">
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
                                        disabled = {!consentAccept.includes("understand") || !consentAccept.includes("consent")}
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
                        </div> </>}
                </main>

            </div>

        </div>
    );
}