
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

export const useIncompleteAssessment = (profileId, type) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId || profileId < 1) {
      setLoading(false);
      return;
    }

    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await personalDashboardAPI.get(`/process/`, {
          params: { profile_id: profileId, profile_type: type },
          headers: { Authorization: token },
        });

        console.log(response.data);
        setQuestions(response.data);
      } catch (err) {
        console.warn("Failed to fetch questions", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [profileId, type]);

  return { questions, loading, error };
};


export const getIncompleteAssessment2 = async (profileId, type) => {

  if (!profileId || profileId < 1) return { ques: [] };

  try {
    const token = localStorage.getItem("accessToken");
    const response = await personalDashboardAPI.get(`/process/`, {
      params: { profile_id: profileId, profile_type: type, status: 'incomplete' },
      headers: { Authorization: token },
    });

    console.log(response.data.assessment_details);
    if (response.data.assessment_details.length > 0) {
      return { ass_data: response.data };
    } else {
      return { ques: [] };
    }
  } catch (err) {
    console.warn("Failed to fetch questions", err);
  }

};


export default useAssessmentQuestions;