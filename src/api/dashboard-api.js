import axios from "axios";

export const getProfileDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.ourlittlehugs.com/v1/api/user-profiles`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAssessmentData = async () => {
  try {
    const response = await axios.get(
      `https://api.ourlittlehugs.com/v1/api/assessments/`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getShareAssessment = async () =>{
  try {
    const response = await axios.get(
      `https://api.ourlittlehugs.com/v1/api/share-assessment/`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const getInsightsData = async () =>{
  try {
    const response = await axios.get(
      `https://api.ourlittlehugs.com/v1/api/insights/`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

