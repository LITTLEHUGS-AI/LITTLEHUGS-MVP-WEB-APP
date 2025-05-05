import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/api-client";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

function useSignIn() {
  const signInMutation = useMutation({
    mutationFn: async (user) => {
      return apiClient.post(`${apiUrl}/v1/api/login`, user);
    },
  });
  const [visible, setVisible] = useState({
    password: false,
  });

  const handleShowPassword = () => {
    setVisible({ password: !visible.password });
  };

  return { signInMutation, visible, handleShowPassword };
}

export default useSignIn;
