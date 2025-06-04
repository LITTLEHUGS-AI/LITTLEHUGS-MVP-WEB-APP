
import { useEffect, useState } from 'react';
import axios from 'axios';



const personalDashboardAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/api`,
  headers: { Accept: 'application/json' },
});




const useAssessmentQuestions = (questionFor, type) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await personalDashboardAPI.get(
          `/pre-screenng-assesment-question/`, {
          params: { question_for: questionFor, assessment: type },
          headers: { Authorization: token },
        });
        setQuestions(response.data);
      } catch (err) {
        console.error('Failed to fetch questions', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionFor, type]);

  return { questions, error, loading };
};

export default useAssessmentQuestions;