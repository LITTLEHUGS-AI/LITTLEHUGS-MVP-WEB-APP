import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import ProfileUi from "../ProfileUi";
import useAssessmentQuestions from "../../../../api/personal-assessment";
import GoalsQuestionnaire from './GoalAssessment';
import { updateQuestionType } from "../../../../api/utilities";
import store from "../../../../config/storeInstance";
import AIQuestings from "./AIQuestings";

export default function AssesmentWomen() {
    const dd = store.getData();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000);

    const { questions: goalQuestions } = useAssessmentQuestions('goal', 1);
    const { questions: intentQuestions } = useAssessmentQuestions('intent', 1);


    const [goalsQuestionnaire, setGoalsQuestionnaire] = useState([]);
    const [intentQuestionnaire, setIntentQuestionnaire] = useState([]);

    const [combinedAnswers, setCombinedAnswers] = useState([]);
    const [ai, setAI] = useState({});
    const [finalAnswers, setFinalAnswers] = useState({});

    const [currentStep, setCurrentStep] = useState(1);
    const [quesLoding, setQuesLoding] = useState(false);


    const [consentAccept, setConsentAccept] = useState([]);

    const steps = ["Consent", "Goal", "Purpose", "Assessment"];


    function step1(term) {
        if (consentAccept.includes(term)) setConsentAccept(prev => prev.filter(item => item !== term));
        else setConsentAccept(prev => [...prev, term]);
    }


    useEffect(() => {
        if (goalQuestions?.results?.length > 0) { setGoalsQuestionnaire(updateQuestionType(goalQuestions.results)); };
    }, [goalQuestions]);

    useEffect(() => {
        if (intentQuestions?.results?.length > 0) { setIntentQuestionnaire(updateQuestionType(intentQuestions.results)); };
    }, [intentQuestions]);


    const handleAnswersChange = (newAnswers) => {
        setCombinedAnswers(prev => {
            const updated = [...prev];

            newAnswers.forEach(newQ => {
                const existingIndex = updated.findIndex(q => q.question === newQ.question);
                if (existingIndex !== -1) {
                    updated[existingIndex] = newQ;
                } else {
                    updated.push(newQ);
                }
            });

            return updated;
        });
    };


    const handleAIAnswers = (answers) => {
        setFinalAnswers(answers);
    };


    const submitAssessment = async () => {
        try {
            const response = await fetch('https://api.ourlittlehugs.com/v1/api/pre-screenng-assesment-submission/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken')
                },
                signal: controller.signal,
                body: JSON.stringify({
                    assessment_type: "women-wellness-360",
                    profile_id: dd.women.id,
                    goal: [
                        "Improve emotional regulation",
                        "Encourage communication"
                    ],
                    responses: combinedAnswers,
                    created_by_type: dd.current,
                    created_by_id: dd.current === 'women' ? dd.women.id : dd.child.id,
                })
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                alert('Server responded with an error');
                setQuesLoding(false);
                return;
            }

            const aiQues = await response.json();


            alert("Assessment Created");

            // const transformQuestions = async (questionsArray) => {
            //     return questionsArray.map((item) => ({
            //         question: item.question,
            //         options: item.options,
            //         focus_area: item.focus_area || "String",
            //         domain: item.domain || "String",
            //         question_type: item.question_type || "String",
            //         answer: 0
            //     }));
            // };


            setAI(aiQues);
            setCurrentStep(4);
            setQuesLoding(false);

        } catch (error) {
            alert('An Error Occured during Call');
            console.log(error)
        }
    };


    const finalSubmit = async () => {
        try {

            const response = await fetch(`https://api.ourlittlehugs.com/v1/api/pre-screenng-assesment-submission/${ai.assessment_data.id}/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ responses: finalAnswers })
            });

            const result = await response.json();
            console.log('Success:', result);
            alert('Done')
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                            You are taking Women Assessment
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
                                        <input type="checkbox" className="mr-2" checked={consentAccept.includes("understand")} onClick={() => step1("understand")} />
                                        <span>I understand this is a supportive tool, not medical advice</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="mr-2" checked={consentAccept.includes("consent")} onClick={() => step1("consent")} />
                                        <span>I consent to my anonymized data being used for personalization and insight generation</span>
                                    </div>
                                </div>
                            </>}

                            {currentStep === 2 && <>

                                <h2 className="text-xl text-gray-800 font-medium mb-6 text-center">
                                    What do you hope to gain from this check-in today? (Select all that applies) 2
                                </h2>
                                <GoalsQuestionnaire ques={goalsQuestionnaire} onAnswersChange={handleAnswersChange} />
                                <div className="mb-8 flex gap-8 justify-between">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${true ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length))}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                            {currentStep === 3 && <>

                                <h2 className="text-xl text-gray-800 font-medium mb-6 text-center">
                                    What do you hope to gain from this check-in today? (Select all that applies) 3
                                </h2>
                                <GoalsQuestionnaire ques={intentQuestionnaire} onAnswersChange={handleAnswersChange} />
                                <div className="mb-8 flex gap-8 justify-between">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${true ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => { setQuesLoding(true); submitAssessment() }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                            {currentStep === 4 && <>

                                <AIQuestings questions={ai.assessment_data.questions} onAnswerSubmit={handleAIAnswers} />
                                {/* {JSON.stringify(ai.assessment_data.questions)} */}
                                <div className="mt-8 flex justify-between">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <div className="text-center">
                                        <button onClick={() => { finalSubmit(); setQuesLoding(true); }} className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"  >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </>}

                        </main>
                    </>
                }

            </div>

        </div>
    );
}