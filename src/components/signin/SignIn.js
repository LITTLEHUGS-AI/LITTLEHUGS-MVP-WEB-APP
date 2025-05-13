import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "./useSignIn";
import SignInUI from "./Login";
import { useAuth } from "../../lib/AuthContext";
import { SignInFormSchema } from "./ValidationSchema";
import { toastErrorMessage } from "../common/Constants";
import routesConfig from "../../config/routesConfig";
import DocumentHead from "../common/DocumentHead";

function SignIn() {
  const navigate = useNavigate();
  const { signInMutation, visible, handleShowPassword } = useSignIn();
  const { login, hasAuthenticated } = useAuth();
  const data = signInMutation?.data;

  useEffect(() => {
    if (signInMutation.isSuccess) {
      login(data);
      window.location.href = "/personal/dashboard";
    }
  }, [data, login, signInMutation.isSuccess]);

  // useEffect(() => {
  //   if (hasAuthenticated) {
  //     navigate("/");
  //   }
  // }, [hasAuthenticated, navigate]);

  const onSubmit = (data) => {
    signInMutation.mutate(data);
  };

  useEffect(() => {
    if (
      signInMutation.isError &&
      signInMutation?.error?.response?.status !== 401
    ) {
      toastErrorMessage({
        content:
          signInMutation?.error?.message || "Unknown error occurred",
        option: { type: "" },
      });
    }
  }, [signInMutation.isError, signInMutation?.error]);

  const { title, description } = routesConfig.signIn;

  return (
    <>
      <DocumentHead
        title={title}
        description={description}
        slug={routesConfig.signIn.path}
      />
      <SignInUI
        onSubmit={onSubmit}
        isError={signInMutation.isError}
        isPending={signInMutation?.isPending}
        message={
          ((signInMutation.error)?.message) ||
          "Unknown error occurred"
        }
        visible={visible}
        handleShowPassword={handleShowPassword}
        SignInFormSchema={SignInFormSchema}
      // handleSsoLogin={handleSsoLogin}
      />
    </>

  );
}

export default SignIn;
