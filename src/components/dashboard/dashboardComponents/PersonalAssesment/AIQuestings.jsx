import React, { useState, useEffect } from 'react';

const AIQuestings = ({ questions, onAnswerSubmit }) => {
  // State to hold the updated questions
  const [updatedQuestions, setUpdatedQuestions] = useState(questions);

  useEffect(() => {
    // Initialize answers based on the provided questions (pre-populate default answers)
    setUpdatedQuestions(questions);
  }, [questions]);

  // Handle change when a user selects an answer
  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    const updatedQuestionsArray = [...updatedQuestions];
    updatedQuestionsArray[questionIndex].answer = selectedOptionIndex; // Update the answer for the specific question

    setUpdatedQuestions(updatedQuestionsArray);
    onAnswerSubmit(updatedQuestionsArray); // Send the updated questions back to the parent component
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Survey: Sleep, Emotional Well-being, and More
      </h1>

      {updatedQuestions.map((questionObj, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-4">{questionObj.question}</h2>

          <div className="space-y-4">
            {questionObj.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={updatedQuestions[index].answer === optionIndex}
                  onChange={() => handleAnswerChange(index, optionIndex)} // Pass the option index instead of option text
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <label className="text-gray-600">{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIQuestings;