import React, { useState, useEffect } from 'react';

const AssessmentAIQuestings = ({ questions, onAnswerSubmit }) => {

  const [updatedQuestions, setUpdatedQuestions] = useState(questions);

  useEffect(() => { setUpdatedQuestions(questions) }, [questions]);

  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    const updatedQuestionsArray = [...updatedQuestions];
    updatedQuestionsArray[questionIndex].answer = selectedOptionIndex;

    setUpdatedQuestions(updatedQuestionsArray);
    onAnswerSubmit(updatedQuestionsArray);
  };

  const getQuestionsWithAnswerCount = () => updatedQuestions.filter(question => 'answer' in question).length;


  return (
    <>
      <span className='bloxk text-right text-lg mb-4'>{getQuestionsWithAnswerCount}/{questions.length}</span>
      {updatedQuestions.map((questionObj, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">{index + 1}. {questionObj.question}</h2>

          <div className="space-y-4">
            {questionObj.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex flex-col items-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleAnswerChange(index, optionIndex)}
                  className={`w-full py-3 px-4 border rounded-xl ${updatedQuestions[index].answer === optionIndex
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    } focus:outline-none`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default AssessmentAIQuestings;