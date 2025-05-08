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
