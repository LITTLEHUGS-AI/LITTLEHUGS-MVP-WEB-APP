import { useEffect, useState } from 'react'
import SignupUI from './SignupUI'
import { useNavigate } from 'react-router-dom'
import useSignUp from './useSignup';
import { signUpValidationSchema } from './ValidationSchema'
import routesConfig from '../../config/routesConfig';
import DocumentHead from '../common/DocumentHead';
import { setupApiAccessToken } from '../../api/api-client';

function handleSubmitApi(mutate, data, invite) {
    const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        country: data.country,
        city: data.city,
        language: data.language,
        organisation_type: data.organisation_type,
        is_personal: data.is_personal,
        is_organization: data.is_organization,
        invite
    };

    return mutate(payload);
}


function Signup() {
    const navigate = useNavigate();
    const [isOtp, setIsOtp] = useState(false);

    const { signUpMutation, visible, handleShowPassword, handleShowConfirmPassword, handleSsoLogin } = useSignUp();

    useEffect(() => {
        if (signUpMutation.isSuccess && signUpMutation.variables && signUpMutation.variables.invite) {
            if (signUpMutation.variables.invite && Object.keys(signUpMutation.variables.invite).length > 0 && signUpMutation.variables.invite.constructor === Object && signUpMutation.variables.invite.token != null) {
                localStorage.setItem('accessToken', `token ${signUpMutation.data.token}`);
                localStorage.setItem('userType', signUpMutation.variables.invite.type);
                setupApiAccessToken(`token ${signUpMutation.data.token}`)
            }
            else setIsOtp(true);
        }
    }, [navigate, signUpMutation.isSuccess, signUpMutation.variables, signUpMutation.data]);

    const onSubmit = async (data, inviteType) => await handleSubmitApi(signUpMutation.mutateAsync, data, inviteType);

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
