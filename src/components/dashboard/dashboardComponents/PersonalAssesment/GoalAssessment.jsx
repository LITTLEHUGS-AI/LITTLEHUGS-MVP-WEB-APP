import React, { useState } from 'react';

const GoalQuestionnaire = ({ ques }) => {
    const [answers, setAnswers] = useState({});
    const [sliderValues, setSliderValues] = useState({
        q3: 0, // Default position for emotional slider
        q5: 0  // Default position for support slider
    });

    const handleChange = (question, option) => {
        const isMulti = question.type === 'multi_select';
        setAnswers(prev => {
            const current = prev[question.question_id] || [];
            if (isMulti) {
                // Toggle option
                const exists = current.includes(option);
                return {
                    ...prev,
                    [question.question_id]: exists
                        ? current.filter(o => o !== option)
                        : [...current, option]
                };
            } else {
                return {
                    ...prev,
                    [question.question_id]: option
                };
            }
        });
    };

    const handleSliderChange = (questionId, value) => {
        setSliderValues(prev => ({
            ...prev,
            [questionId]: value
        }));
    };


    const renderQuestion = (q, i) => {
        switch (q.type) {
            case 'multi_select':
            case 'single_select':
                return (
                    <div key={q.id} className="mb-8">
                        <span className="text-gray-700 mb-2 font-medium">{i + 1}. {q.text}</span>
                        <div className="flex flex-col space-y-2">
                            {q.options.map((option, idx) => {
                                const name = q.question_id;
                                const isSelected = q.type === 'multi_select'
                                    ? answers[name]?.includes(option)
                                    : answers[name] === option;
                                return (
                                    <button
                                        key={idx}
                                        className={`border rounded-full py-3 px-4 text-center ${isSelected
                                            ? "bg-blue-100 border-blue-300 text-blue-800"
                                            : "border-gray-400 text-gray-600 hover:bg-gray-50"
                                            }`}
                                        onClick={() => handleChange(q, option)}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'slider':
                const isEmotionSlider = q.question_id === 'q3';
                return (
                    <div key={q.question_id} className="mb-8">
                        <p className="text-gray-700 mb-2 font-medium">{q.text}</p>

                        {isEmotionSlider && (
                            <div className="flex justify-between mb-2">
                                {q.options.map((emoji, i) => (
                                    <div key={i} className="text-2xl">{emoji}</div>
                                ))}
                            </div>
                        )}

                        {!isEmotionSlider && q.question_id === 'q5' && (
                            <div className="flex justify-between mb-2 text-sm text-gray-500">
                                {q.options.map((label, i) => (
                                    <div key={i} className={i === 1 ? "ml-6 mr-6" : ""}>{label}</div>
                                ))}
                            </div>
                        )}

                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max={q.options.length - 1}
                                value={sliderValues[q.question_id]}
                                onChange={(e) => handleSliderChange(q.question_id, parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            {/* <div className="absolute -top-2 left-0">
                                <div
                                    className="w-6 h-6 bg-black rounded-full"
                                    style={{ transform: `translateX(${(sliderValues[q.question_id] / (q.options.length - 1)) * 100}%)` }}
                                />
                            </div> */}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full p-4">
            {ques.map(renderQuestion)}
        </div>
    );
};


export default GoalQuestionnaire;