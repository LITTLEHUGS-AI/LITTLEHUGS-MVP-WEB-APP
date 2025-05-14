import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from "react-hook-form";
import Navbar from '../common/Navbar';
import InputField from "../../widgets/layouts/InputField";
import { ButtonLoader } from "../common/Loader";
import axios from "axios";
import { Button } from "react-aria-components";

const INITIAL_VALUES = {
    email: "",
    password: "",
};

function SignInUI({
    onSubmit,
    isError,
    isPending,
    message,
    visible,
    handleShowPassword,
    SignInFormSchema,
}) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: zodResolver(SignInFormSchema),
    });
    const handleSubmit = (data) => {
        onSubmit(data);
    };

    const handleLogin = (logintype) => {
        let redirect_url = ""
        if (logintype === "google-login") {
            redirect_url = `${window.location.origin}/auth`
        } else {
            redirect_url = `${window.location.origin}/auth/ms/callback`
        }
        axios.get(`${apiUrl}/v1/api/google/login?redirect_url=${redirect_url}`).then((response) => {
            window.location.href = response.data.auth_url;
        });
    };

    const inputsRef = useRef([]);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [forgetEmail, setForgetEmail] = useState('');
    const [forgetEmailStep, setForgetEmailStep] = useState(0);
    const [showPopup, setShowPopup] = useState(null);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);


    async function handleForgetEmailSubmit() {
        try {
            const res = await fetch('https://api.ourlittlehugs.com/v1/api/password-reset/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "email": forgetEmail })
            });

            if (!res.ok) throw new Error('Network response was not ok');

            setForgetEmailStep(2)

        } catch (error) {
            console.error('Error during POST:', error);
        }
    }


    async function handleForgetOtpSubmit() {

        try {
            const res = await fetch('https://api.ourlittlehugs.com/v1/api/password-reset/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": forgetEmail,
                    "otp_code": otp.join(''),
                    "password": "Password@123",
                    "confirm_password": "Password@123"
                })
            });

            if (!res.ok) throw new Error('Network response was not ok');

            setShowPopup(null);
            setForgetEmailStep(0);
            alert('Passord Chnaged')

        } catch (error) {
            console.error('Error during POST:', error);
        }
    }

    const handleChangeOTP = (value, index) => {
        if (!isNaN(value)) {
            // setOtpError(false);
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);
            if (value && index < 5) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fef9f6]">
            <Navbar />
            <div
                className="flex-grow flex  items-center justify-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('/images/sign in.png')",
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, top left',
                    backgroundSize: 'cover, contain',
                }} // Your uploaded background image
            >

                {(showPopup === 'ForgetPassword') && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg text-center shadow-lg p-8 max-w-md w-full">

                        {forgetEmailStep === 1 && <>
                            <h2 className="text-2xl font-medium text-gray-700 mb-2">
                                Please provide your email ID
                            </h2>

                            <p className="text-gray-400 mb-6">
                                We will send an OTP to this ID
                            </p>

                            <div className="mb-6">
                                <input
                                    type="email"
                                    placeholder="* Email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={forgetEmail}
                                    onChange={(e) => setForgetEmail(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleForgetEmailSubmit}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full transition duration-200"
                            >
                                Reset Password
                            </button>
                        </>}

                        {forgetEmailStep === 2 && <>
                            <h2 className="text-2xl font-semibold text-center text-gray-800">
                                OTP Authentication
                            </h2>
                            <p className="text-center text-gray-500 my-3">Please enter the OTP</p>

                            <div className="flex justify-center gap-3 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChangeOTP(e.target.value, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                ))}
                            </div>
                            {/* {otpError && (
                                <span className="text-[#DC2626] text-xs leading-[16px] font-normal">
                                    Please enter OTP
                                </span>
                            )} */}
                            <button
                                onClick={handleForgetOtpSubmit}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full transition duration-200"
                            >
                                Submit OTP
                            </button>
                        </>}
                    </div>

                </div>)}


                {(showPopup === 'Terms&Conditions') && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#FAF3ED] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div />
                            <img
                                src="/images/logo.svg"
                                alt="LittleHugs Logo"
                                className="max-h-10"
                            />
                            <button
                                type="button"
                                className="font-extrabold"
                                onClick={() => setShowPopup(null)}
                            >
                                &#10005;
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 md:p-6">
                            <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">LittleHugs Webapp - Terms and Conditions</h1>

                            <p className="font-medium text-gray-700 mb-4">Effective: 5/21/2025</p>

                            <p className="text-gray-600 mb-6">
                                Welcome to LittleHugs! These Terms and Conditions ("Terms") govern your access to and use of our webapp,
                                mobile tools, and wellness assessments. By creating an account or using our services, you agree to comply with
                                these Terms.
                            </p>

                            <div className="space-y-6">
                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">1. Overview of Services</h2>
                                    <p className="text-gray-600">
                                        LittleHugs provides AI-guided wellness assessments for mothers, caregivers, children, and families. Our tools are
                                        non-diagnostic and are intended for reflection, insight, and support, not medical treatment.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">2. Eligibility</h2>
                                    <p className="text-gray-600">
                                        You must be at least 18 years old to use LittleHugs independently. If you're using LittleHugs on behalf of a minor,
                                        you confirm that you are their legal guardian or have proper consent.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">3. Account Responsibilities</h2>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>You agree to provide accurate, current, and complete information during sign-up.</li>
                                        <li>Keep your login credentials secure.</li>
                                        <li>Notify us immediately at support@ourlittlehugs.com if you suspect unauthorized use.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">4. Privacy and Data Use</h2>
                                    <p className="text-gray-600">
                                        By signing up, you consent to our use of anonymized data to personalize wellness insights. We do not sell or
                                        disclose personal information without your explicit permission.
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        See our Privacy Policy for full details.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">5. Acceptable Use</h2>
                                    <p className="text-gray-600 mb-2">You agree not to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Use the app for any unlawful, harmful, or misleading purposes</li>
                                        <li>Attempt to interfere with our platform's functionality or security</li>
                                        <li>Copy, reverse-engineer, or exploit any part of the webapp</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">6. AI-Based Insights Disclaimer</h2>
                                    <p className="text-gray-600">
                                        All insights are generated by AI tools based on your inputs. They are not substitutes for professional medical
                                        advice, diagnosis, or treatment. Always consult with a licensed provider for health concerns.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">7. Content Ownership</h2>
                                    <p className="text-gray-600">
                                        All content on the platform—including assessments, visuals, and language—is owned or licensed by LittleHugs
                                        and protected by intellectual property laws.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">8. User Feedback</h2>
                                    <p className="text-gray-600">
                                        Any suggestions, feedback, or ideas you provide may be used to improve LittleHugs without any obligation to
                                        compensate you.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">9. Termination of Use</h2>
                                    <p className="text-gray-600 mb-2">We may suspend or terminate your account if:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>You violate these Terms</li>
                                        <li>You misuse the platform</li>
                                        <li>Required by law or regulatory authority</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">10. Modifications to Terms</h2>
                                    <p className="text-gray-600">
                                        We may update these Terms as needed. You'll be notified of material changes, and continued use means you
                                        accept the revised Terms.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">11. Contact</h2>
                                    <p className="text-gray-600">
                                        Questions? Email us at <a href="mailto:support@ourlittlehugs.com" className="text-blue-500 hover:underline">support@ourlittlehugs.com</a>
                                    </p>
                                </section>
                            </div>
                        </div>

                    </div>
                </div>

                )}
                {(showPopup === 'PrivacyPolicy') && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div />
                            <img
                                src="/images/logo.svg"
                                alt="LittleHugs Logo"
                                className="max-h-10"
                            />
                            <button
                                type="button"
                                className="font-extrabold"
                                onClick={() => setShowPopup(null)}
                            >
                                &#10005;
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-4 md:p-6">
                            <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">LittleHugs Webapp - Privacy Policy</h1>

                            <div className="mb-6">
                                <h2 className="font-medium text-gray-700">LittleHugs Privacy Policy</h2>
                                <p className="text-gray-600">Effective Date: 5/21/2025</p>
                                <p className="text-gray-600">Last Updated: 5/21/2025</p>
                            </div>

                            <p className="text-gray-600 mb-6">
                                At LittleHugs, your privacy and trust matter deeply. This Privacy Policy explains how we collect, use, protect, and
                                share your information when you interact with our website, mobile app, assessments, and services.
                            </p>

                            <div className="space-y-6">
                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">1. Information We Collect</h2>
                                    <p className="text-gray-600 mb-2">We collect information in the following ways:</p>

                                    <div className="ml-4 mb-2">
                                        <h3 className="font-medium text-gray-700">a. Personal Information You Provide</h3>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                            <li>Name, email address, and login details when you sign up</li>
                                            <li>Assessment responses (emotional, physical, cognitive, etc.)</li>
                                            <li>Voluntary journal entries, feedback, and preferences</li>
                                            <li>Optional demographic details (e.g., age range, motherhood status)</li>
                                        </ul>
                                    </div>

                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-700">b. Automated Data Collection</h3>
                                        <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                            <li>IP address, browser type, device information</li>
                                            <li>Pages visited and time spent on site</li>
                                            <li>Cookies and tracking tools for experience optimization</li>
                                        </ul>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">2. How We Use Your Data</h2>
                                    <p className="text-gray-600 mb-2">We use your data to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Personalize wellness insights and nudges using AI</li>
                                        <li>Improve assessment accuracy and recommendations</li>
                                        <li>Track your progress (if you opt in)</li>
                                        <li>Notify you of new features, reminders, or service updates</li>
                                        <li>Respond to inquiries or support requests</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">3. AI-Generated Insights</h2>
                                    <p className="text-gray-600">
                                        Our assessments use AI to tailor wellness feedback. These insights are supportive and non-diagnostic, and your
                                        personal data is never used to make automated clinical decisions.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">4. Data Sharing</h2>
                                    <p className="text-gray-600 mb-2">We do not sell your data.</p>
                                    <p className="text-gray-600 mb-2">Your data may only be shared:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>With your explicit consent (e.g., to a therapist or doctor)</li>
                                        <li>With trusted third-party processors (e.g., secure cloud storage)</li>
                                        <li>If required by law or for safety concerns</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">5. Data Security</h2>
                                    <p className="text-gray-600">
                                        We use industry-standard encryption and secure storage to protect your information. Access is limited to
                                        authorized personnel and anonymized AI modules.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">6. Your Rights</h2>
                                    <p className="text-gray-600 mb-2">You have the right to:</p>
                                    <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                        <li>Access, update, or delete your data</li>
                                        <li>Withdraw consent for data use at any time</li>
                                        <li>Request a summary of your stored data</li>
                                    </ul>
                                    <p className="text-gray-600 mt-2">
                                        You can do so by contacting us at support@ourlittlehugs.com.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">7. Data Retention</h2>
                                    <p className="text-gray-600">
                                        We keep your data for as long as your account is active or as necessary to provide services. Upon account
                                        deletion, all personal data is securely erased within 30 days, unless legally required otherwise.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">8. Children's Privacy</h2>
                                    <p className="text-gray-600">
                                        We only collect information about children with parental or guardian consent. We do not knowingly collect data
                                        from children under 13 without adult supervision.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">9. Cookies & Tracking</h2>
                                    <p className="text-gray-600">
                                        We use cookies to improve your experience. You may disable cookies in your browser, though some features
                                        may not function properly.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">10. Changes to This Policy</h2>
                                    <p className="text-gray-600">
                                        We may update this Privacy Policy from time to time. We will notify users via email or website banner if
                                        significant changes are made.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-medium text-gray-800 mb-2">11. Contact Us</h2>
                                    <p className="text-gray-600">
                                        For privacy-related questions, please contact:
                                    </p>
                                    <p className="flex items-center gap-2 mt-2">
                                        <span className="inline-block w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">✉</span>
                                        Email: <a href="mailto:support@ourlittlehugs.com" className="text-blue-500 hover:underline">support@ourlittlehugs.com</a>
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>)}

                <div className="bg-white rounded-md shadow-md p-8 w-[980px] max-w-md border">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Sign In</h2>
                    <p className="text-center text-sm py-2 mb-2 text-gray-600 ">
                        New here? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                    <FormProvider {...methods}>
                        <form
                            className="space-y-4"
                            onSubmit={methods.handleSubmit(handleSubmit)}
                        >
                            {/* <input
                                type="email"
                                placeholder="* Email"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            /> */}
                            <InputField
                                label="Email"
                                name="email"
                                fieldId="email"
                                placeHolder="Enter your Email"
                                message={isError ? message : ""}
                                isDisabled={isPending}
                            />
                            {/* <input
                                type="password"
                                placeholder="* Password"
                                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            /> */}
                            <InputField
                                type={visible.password ? "text" : "password"}
                                name="password"
                                placeHolder="Enter your password"
                                showIcon={visible.password}
                                visible={true}
                                handleChange={handleShowPassword}
                            />

                            <div className="text-right">
                                <button type="button" onClick={() => { setShowPopup('ForgetPassword'); setForgetEmailStep(1) }} className="text-sm text-orange-500 hover:underline">Forgot Password?</button>
                            </div>


                            <div className="flex items-start space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isTermsAccepted}
                                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                    className="mt-1"
                                />
                                <label htmlFor="terms" className="text-gray-600">
                                    I agree to LittleHugs’s{' '}
                                    <span onClick={() => setShowPopup('Terms&Conditions')} className="text-blue-600 underline">
                                        Terms & Conditions
                                    </span>{' '}
                                    and acknowledge the{' '}
                                    <span onClick={() => setShowPopup('PrivacyPolicy')} className="text-blue-600 underline">
                                        Privacy Policy
                                    </span>
                                </label>
                            </div>

                            <Button
                                isDisabled={isPending}
                                className={`${isPending ? "sign-load" : "sign"
                                    } w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200`}
                                type="submit"
                            >
                                {isPending ? <ButtonLoader /> : "Sign In"}
                            </Button>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="mt-2 w-full flex items-center justify-center gap-2 text-sm bg-[#fef3e6] border border-gray-200 rounded-full py-2 hover:bg-[#f8e9d8]"
                                    onClick={() => handleLogin("google-login")}
                                >
                                    <img
                                        src="/icons/google-icon.svg"
                                        alt="Google"
                                        className="w-10 h-5 justify-center"
                                    />

                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}

export default SignInUI;
