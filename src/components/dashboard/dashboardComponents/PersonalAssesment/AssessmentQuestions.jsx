import { useEffect, useState } from 'react';

const AssessmentQuestions = ({ ques, onAnswersChange }) => {
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        if (onAnswersChange) onAnswersChange(answers);
    }, [answers, onAnswersChange]);

    const updateAnswer = (question, selectedOptions) => {
        setAnswers(prev => {
            const newAnswer = {
                question: question.text,
                options: question.options,
                selected_options: selectedOptions
            };

            const exists = prev.find(a => a.question === question.text);
            if (exists) {
                return prev.map(a =>
                    a.question === question.text ? newAnswer : a
                );
            } else {
                return [...prev, newAnswer];
            }
        });
    };

    const handleChange = (question, option) => {
        const currentAnswer = answers.find(a => a.question === question.text);
        const currentSelected = currentAnswer?.selected_options || [];

        if (question.type === 'multi_select') {
            const exists = currentSelected.includes(option);
            const updatedSelected = exists
                ? currentSelected.filter(o => o !== option)
                : [...currentSelected, option];
            updateAnswer(question, updatedSelected);
        } else {
            updateAnswer(question, [option]);
        }
    };

    const handleSliderChange = (question, index) => {
        const selectedOption = question.options[index];
        updateAnswer(question, [selectedOption]);
    };

    const renderQuestion = (q, i) => {
        const currentAnswer = answers.find(a => a.question === q.text);
        const selectedOptions = currentAnswer?.selected_options || [];

        switch (q.type) {
            case 'multi_select':
            case 'single_select':
                return (
                    <div key={q.id} className="mb-8">
                        <span className="text-gray-700 mb-2 font-medium">{i + 1}. {q.text}</span>
                        <div className="flex flex-col space-y-2">
                            {q.options.map((option, idx) => {
                                const isSelected = selectedOptions.includes(option);
                                return (
                                    <button
                                        key={idx}
                                        className={`border rounded-lg mt-2 py-3 px-4 text-center ${isSelected
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
                const selected = selectedOptions[0];
                const selectedIndex = q.options.indexOf(selected ?? q.options[0]);

                return (
                    <div key={q.question_id} className="mb-8">
                        <p className="text-gray-700 mb-2 font-medium">{q.text}</p>
                        <div className="flex justify-between mb-2 text-sm text-gray-500">
                            {q.options.map((label, i) => (
                                <div key={i}>{label}</div>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max={q.options.length - 1}
                                value={selectedIndex}
                                onChange={(e) => handleSliderChange(q, parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
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

export default AssessmentQuestions;