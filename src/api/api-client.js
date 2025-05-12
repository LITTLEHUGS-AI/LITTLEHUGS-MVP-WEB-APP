import axios from "axios";
import ApiError from "./api-error";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function deleteApi(url, data) {
  return axiosClient
    .delete(url, { data: data })
    .then((response) => response.data)
    .catch((error) => {
      throw new ApiError(error);
    });
}

function post(url, data) {
  return axiosClient
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw new ApiError(error);
    });
}

function put(url, data) {
  return axiosClient
    .put(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw new ApiError(error);
    });
}

function get(url) {
  return axiosClient
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw new ApiError(error);
    });
}

function setupApiAccessToken(accessToken) {
  if (!accessToken) {
    return;
  }

  axiosClient?.interceptors.request.use(
    (config) => {
      config["headers"]["Authorization"] = `${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
}

function clearApiAccessToken() {
  axiosClient.interceptors.request.clear();
}

const apiClient = { post, get, put, deleteApi };

export { apiClient, setupApiAccessToken, clearApiAccessToken };
