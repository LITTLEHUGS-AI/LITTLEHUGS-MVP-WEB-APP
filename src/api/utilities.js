 export function updateQuestionType(questionsArray) {
    return questionsArray.map(question => {
        if (question.text === "How have you been feeling emotionally this past week?") {
            return {
                ...question,
                type: "slider"
            };
        }
        return question;
    });
}
