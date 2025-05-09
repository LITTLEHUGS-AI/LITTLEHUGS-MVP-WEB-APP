import { apiClient } from "../../api/api-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

// const apiUrl = process.env.REACT_APP_API_URL;

function useSignUp() {
    const signUpMutation = useMutation({
        mutationFn: async (signUpPayload) => {
            return apiClient.post("/v1/api/register", signUpPayload);
        },
    });

    const [visible, setVisible] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleShowPassword = () => {
        setVisible({ password: !visible.password, confirmPassword: false });
    };

    const handleShowConfirmPassword = () => {
        setVisible({ password: false, confirmPassword: !visible.confirmPassword });
    };

    const handleSsoLogin = async (loginType) => {
        try {
            let redirect_url = ""
            if (loginType === "google-login") {
                redirect_url = `${window.location.origin}/auth/google/callback`
            } else {
                redirect_url = `${window.location.origin}/auth/ms/callback`
            }
            const response = await apiClient.get(
                `/${loginType}?redirect_url=${redirect_url}`
            );

            if (response.authorization_url) {
                window.location.href = response.authorization_url;
            } else {
                console.error("Authorization URL not found in the response.");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return {
        signUpMutation,
        visible,
        handleShowPassword,
        handleShowConfirmPassword,
        handleSsoLogin
    };
}

export default useSignUp;
