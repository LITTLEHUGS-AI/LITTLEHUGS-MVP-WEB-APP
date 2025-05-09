import React, { useEffect } from 'react'
import SignupUI from './SignupUI'
import { useNavigate } from 'react-router-dom'
import useSignUp from './useSignup';
import {signUpValidationSchema} from './ValidationSchema'
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';

function handleSubmitApi(mutate, data) {
    const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        city: data.city,
        mothertounge: data.mothertounge,
        // url: `${window.location.origin}/thanks`,
    };
    return mutate(payload);
}

function Signup() {
    const navigate = useNavigate();

    const { signUpMutation, visible, handleShowPassword, handleShowConfirmPassword, handleSsoLogin } = useSignUp();

    useEffect(() => {
        if (signUpMutation.isSuccess) {
            navigate("/login");
        }
    }, [navigate, signUpMutation.isSuccess]);

    const onSubmit = (data) => {
        console.log(data);
        handleSubmitApi(signUpMutation.mutate, data);
    };
    const { title, description } = routesConfig.signUp;

    return (
        <>
            <DocumentHead
                title={title}
                description={description}
                slug={routesConfig.signUp.path}
            />
            <div className="w-full login mx-auto bg-primarybg shadow-xl flex h-[100svh] md:h-screen overflow-y-hidden">
                <SignupUI
                    onSubmit={onSubmit}
                    isSuccess={signUpMutation.isSuccess}
                    isError={signUpMutation.isError}
                    isPending={signUpMutation.isPending}
                    message={
                        signUpMutation?.error?.data.message || "Unknown error occurred"
                    }
                    visible={visible}
                    handleShowPassword={handleShowPassword}
                    handleShowConfirmPassword={handleShowConfirmPassword}
                    SignInFormSchema={signUpValidationSchema}
                    handleSsoLogin={handleSsoLogin}
                />
            </div>
        </>
    )
}

export default Signup
