import React, { useEffect, useState } from 'react'
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
        country: data.country,
        language: data.language,
        is_personal: data.is_personal,
        is_organization: data.is_organization,
    };
    return mutate(payload);
}

function Signup() {
    const navigate = useNavigate();
    const [isOtp, setIsOtp] = useState(false);

    const { signUpMutation, visible, handleShowPassword, handleShowConfirmPassword, handleSsoLogin } = useSignUp();

    useEffect(() => {
        if (signUpMutation.isSuccess) {
            setIsOtp(true);
        }
    }, [navigate, signUpMutation.isSuccess]);

    const onSubmit = (data) => {
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
                isOtp={isOtp}
                setIsOtp={setIsOtp}
            />
        </>
    )
}

export default Signup
