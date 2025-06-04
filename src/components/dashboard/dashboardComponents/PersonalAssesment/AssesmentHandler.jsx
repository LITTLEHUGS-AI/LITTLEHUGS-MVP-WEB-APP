import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Sidebar from "../Sidebar";
import ProfileUi from "../ProfileUi";
import useAssessmentQuestions from "../../../../api/personal-assessment";
import GoalsQuestionnaire from './AssessmentQuestions';
import { updateQuestionType } from "../../../../api/utilities";
import store from "../../../../config/storeInstance";
import AssessmentAIQuestings from "./AssessmentAIQuestings";
import { toast } from "react-toastify";

export default function AssesmentHandler() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const no = searchParams.get('no');
    if (!(type && no)) navigate('/personal/assessment');

    const dd = store.getData();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000);

    const { questions: goalQuestions } = useAssessmentQuestions('goal', no);
    const { questions: intentQuestions } = useAssessmentQuestions('intent', no);


    const [goalsQuestionnaire, setGoalsQuestionnaire] = useState([]);
    const [intentQuestionnaire, setIntentQuestionnaire] = useState([]);

    const [combinedAnswers, setCombinedAnswers] = useState([]);
    const [ai, setAI] = useState({});

    const [finalAnswers, setFinalAnswers] = useState({});

    const [currentStep, setCurrentStep] = useState(1);
    const [quesLoding, setQuesLoding] = useState(null);


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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/pre-screenng-assesment-submission/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken')
                },
                signal: controller.signal,
                body: JSON.stringify({
                    assessment_type: type,
                    profile_id: dd.current === 'women' ? dd.women.id : dd.child.id,
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
                setQuesLoding(null);
                return;
            }

            const aiQues = await response.json();

            setAI(aiQues);
            setCurrentStep(4);
            setQuesLoding(null);

            toast.success("Assessment Created")

        } catch (error) {
            alert('An Error Occured during Call');
            console.log(error)
        }
    };


    const finalSubmit = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/api/pre-screenng-assesment-submission/${ai.assessment_data.id}/?insights_for=${type}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ responses: finalAnswers })
                }
            );

            if (!response.ok) {
                toast.error('Got an Error, Please Retry');
                navigate('/personal/assessment')
                return;
            }

            await response.json();
            toast.success('Insights Generated');
            navigate('/personal/dashboard')
        } catch (err) {
            toast.error('Got an Error, Please Retry');
            navigate('/personal/assessment')
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">

            <Sidebar />

            {/* Main content - scrollable */}
            <div className="flex flex-col flex-1 overflow-y-auto">

                <div className="grid grid-cols-12 m-6 gap-4">
                    <div className="col-span-12 flex items-center justify-center p-[14px] border border-gray-400 rounded-md">
                        <p className="p-0 text-md lg:text-xl text-slate-500 font-medium">
                            {no === "1" && "You are taking Women Assessment"}
                            {no === "2" && "You are taking Child Assessment"}
                            {no === "3" && "You are taking SEL Assessment"}
                        </p>
                    </div>
                    <div className="hidden col-span-2 flex">
                        <ProfileUi />
                    </div>
                </div>

                <div className="mx-2 text-center">If you don't see questions, Please refresh the Page</div>

                {quesLoding ? <div className="flex flex-col h-full items-center justify-center">
                    <img alt="loading..." src='/gif/loading1.gif' />
                    <div className="text-xl font-bold">{quesLoding}</div>
                    <div className="text-lg font-bold">It will take 2 minutes. Please be patient.<br />Please don't Click Refresh or Back button</div>
                </div> :
                    <>
                        {/* Progress Steps */}
                        <div className="mt-8 lg:mt-16 mb-8 mx-auto w-full max-w-xl">
                            <div className="flex justify-between items-center mx-4 mb-2">
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

                            <div className="relative h-1 mx-10 bg-gray-300">
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
                        <main className="max-w-6xl items-center justify-center px-6 gap-4 mx-auto">

                            {currentStep === 1 && <>
                                <div className="ring-4 ring-blue-500 rounded-3xl bg-white p-4 md:p-8 shadow-sm">
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


                                    </div>
                                </div>

                                <div className="my-8 flex gap-4 justify-center">
                                    <button
                                        className={`mr-auto px-6 py-2 text-white rounded-full ${(!consentAccept.includes("understand") || !consentAccept.includes("consent")) ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} transition-colors`}
                                        disabled={!consentAccept.includes("understand") || !consentAccept.includes("consent")}
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length))}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                            {currentStep === 2 && <>

                                <GoalsQuestionnaire ques={goalsQuestionnaire} onAnswersChange={handleAnswersChange} />

                                <div className="my-8 flex gap-4 justify-center">
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

                                <GoalsQuestionnaire ques={intentQuestionnaire} onAnswersChange={handleAnswersChange} />

                                <div className="my-8 flex gap-4 justify-center">
                                    <button
                                        className="px-8 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
                                        onClick={() => setCurrentStep(prevStep => Math.min(prevStep - 1, steps.length))}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className={`px-8 py-2 text-white rounded-full ${true ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} transition-colors`}
                                        onClick={() => { setQuesLoding("Tailoring the questions according to your Profile"); submitAssessment() }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>}

                            {currentStep === 4 && <>

                                <AssessmentAIQuestings questions={ai.assessment_data.questions} onAnswerSubmit={handleAIAnswers} />

                                <div className="my-8 flex gap-4 justify-center">
                                    <div className="text-center">
                                        <button onClick={() => { finalSubmit(); setQuesLoding("Generating your Insights"); }} className="px-8 py-2 text-white rounded-full bg-blue-500 hover:bg-blue-800 transition-colors"  >
                                            Next
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