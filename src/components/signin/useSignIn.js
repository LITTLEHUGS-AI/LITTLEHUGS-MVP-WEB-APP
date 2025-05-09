import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/api-client";
import { useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function useSignIn() {
  const signInMutation = useMutation({
    mutationFn: async (user) => {
      return apiClient.post(`${apiUrl}/v1/api/login`, user);
    },
  });

  const otpMutation = useMutation({
    mutationFn: async (user) => {
      let url = "";
      if (!user.otp_code) {
        url = `v1/api/resend-verification`;
      } else {
        url = `v1/api/verify-email`;
      }
      return apiClient.post(`${apiUrl}/${url}`, user);
    },
  });

  const motherMutation = useMutation({
    mutationFn: async ({ data, access_token }) => {
      const headers = {
        "Content-type": "application/json",
        "Authorization": `${access_token}`,
      };
      return axios.post(`${apiUrl}/v1/api/mother-profile`, data, { headers });
    },
  });

  const childMutation = useMutation({
    mutationFn: async ({ data, access_token }) => {
      const headers = {
        "Content-type": "application/json",
        "Authorization": `${access_token}`,
      };
      return axios.post(`${apiUrl}/v1/api/child-profile`, data, { headers });
    },
  });

  const [visible, setVisible] = useState({
    password: false,
  });

  const handleShowPassword = () => {
    setVisible({ password: !visible.password });
  };

  return { signInMutation, visible, handleShowPassword, otpMutation, motherMutation, childMutation };
}

export default useSignIn;
