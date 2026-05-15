import { useState, useEffect } from 'react';
import Navbar from '../common/Navbar.js';
import routesConfig from '../../config/routesConfig.js';
import DocumentHead from '../common/DocumentHead.js';
import { apiClient } from '../../api/api-client.js';
import { useWaitlist } from '../../lib/WaitlistContext';


function PartenerLandingPage() {
  const { openWaitlist } = useWaitlist();
  const { title, description } = routesConfig.partenerLanding;

  const [showPopup, setShowPopup] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allLanguages, setLanguages] = useState([]);
  const [loadingDemo, setLoadingdDmo] = useState(false);

  const INITIAT_STATE = {
    organization_type: '',
    name: '',
    email: '',
    country: '',
    language: ''
  };

  const [formData, setFormData] = useState(INITIAT_STATE);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const toggleAccordion = (index) => setOpenIndex(openIndex === index ? -1 : index);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingdDmo(true);
    try {
      const result = await apiClient.post(`${process.env.REACT_APP_API_URL}/v1/api/demo/`, {
        organization_type: formData.organization_type,
        name: formData.name,
        email: formData.email,
        city: formData.city,
        language: formData.language
      });

      if (result.id) {
        alert('Booked Demo Successfully\nThanks');
        setFormData(INITIAT_STATE);
        setAgreedToTerms(false);
      }

    } catch (err) {
      alert('Try Again!\nSome Error Occured')
    } finally {
      setLoadingdDmo(false);
    }
  };


  // Check if all form fields are filled and terms are agreed to
  useEffect(() => {
    const { organization_type, name, email, country, language } = formData;
    const allFieldsFilled = organization_type && name && email && country && language;
    setIsFormValid(allFieldsFilled && agreedToTerms);
  }, [formData, agreedToTerms]);

  // Fetch Countries & Languages Data
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(result => {
        const countryNames = result.data.map(item => item.country);
        setAllCountries([...countryNames]);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });

    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const languages = new Set();
        data.forEach(country => {
          if (country.languages) Object.values(country.languages).forEach(lang => languages.add(lang));
        });
        setLanguages([...languages]);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: formData.country })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setAllCities(data.data);
        } else {
          setAllCities([]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [formData.country])

  return (
    <>
      <DocumentHead
        title={title}
        description={description}
        slug={routesConfig.partenerLanding.path}
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="w-full font-quicksand flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-8 md:py-12 bg-[#FFC655]" >

          <div className="w-full lg:max-w-[630px] order-2 lg:order-1 text-center lg:text-left mb-8 lg:mb-0">
            <p className='text-lg sm:text-xl text-[#4A4B4F] font-medium mb-2'>
              LITTLEHUGS FOR PARTNERS
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 leading-snug text-[#4A4B4F]">
              Screen Smarter. Support Sooner
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#4A4B4F] mb-6">
              Whether you're a mother, caregiver, or growing child—LittleHugs brings AI-powered wellness, smart screening, and daily care routines to your fingertips
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
              <a href='#book-a-demo' className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition">
                Book a Demo
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-auto flex justify-center items-center p-2 sm:p-4 order-1 lg:order-2 mb-6 lg:mb-0">
            <img
              src="images/partner_part_2.svg"
              alt="Header illustration"
              className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto"
            />
          </div>
        </div>

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



        <div className="relative flex flex-col lg:flex-row font-quicksand justify-between items-center gap-6 mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img
              src="/images/partner_part_3.svg"
              alt="Step 1"
              className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto lg:h-[600px] object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-7 lg:mr-[85px] px-0 sm:px-4 py-6 sm:py-8 md:py-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-quicksand font-medium text-gray-800 mb-3 sm:mb-4 md:mb-[20px]">Why LittleHugs?</h2>
            <p className="uppercase text-base sm:text-lg md:text-[20px] font-quicksand font-medium text-gray-500 tracking-widest mb-4 sm:mb-5 md:mb-6">
              It's time for mindfulness
            </p>

            {/* Accordions */}
            <div className="space-y-3 sm:space-y-4 font-quicksand font-medium text-2xl sm:text-3xl md:text-[38px]">
              {[
                {
                  title: "Prescreening & Risk Detection Tools",
                  content: [
                    "AI-powered prescreening forms for women (PPD, PPA, OCD, fatigue, burnout) and children (ASD, ADHD, speech/motor delays)",
                    "Auto-tagging of red flags with “RAG” (Red-Amber-Green) risk scores",
                    "Auto-referral suggestions to therapists, pediatricians, or gynecologists",
                  ],
                },
                {
                  title: "AI Engines", content: [
                    "EarlyCare.AI: Pediatric milestone co-pilot for growth tracking & delay alerts",
                    "Materna.AI: Gynecologist tool for postpartum mood, nutrition, thyroid issues",
                    "Evalyn: ABA therapist assistant with structured behavioral insights"
                  ]
                },
                {
                  title: "Report Generation & Summaries", content: [
                    "Auto-generated, evidence-backed reports with trendlines and benchmarks",
                    "Integrated with global guidelines (WHO, IAP, CDC, NICE, ACOG)",
                    "Ready-to-share summaries for EMR or teleconsultation platforms"
                  ]
                },
                {
                  title: "Partner Dashboards & Analytics", content: [
                    "Role-based access for pediatricians, OB-GYNs, NGOs, and educators",
                    "Track engagement, screening outcomes, flagged risks, and wellness metrics",
                    "HIPAA/GDPR-compliant storage & API-ready for EMR/LMS sync"
                  ]
                },
                {
                  title: "White-Labeled Mobile Experiences", content: [
                    "Custom onboarding for different roles (mother, child, co-caregiver, teen)",
                    "Daily nudges + suggested wellness routines tailored by age & concern",
                    "Multilingual, culturally adaptive interface with visual summaries"
                  ]
                },
                {
                  title: "Integrated Telehealth", content: [
                    "Secure video consults, real-time data sync",
                    "Session notes + report upload functionality",
                    "Coordination between parent, child specialist, and mental health professional"
                  ]
                },
              ].map((item, index) => (
                <div key={index} className="border-b pb-3 sm:pb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg sm:text-xl md:text-[25px] font-medium text-gray-800">{item.title}</h3>
                    <span className="text-base sm:text-lg md:text-xl">{openIndex === index ? "▾" : "▸"}</span>
                  </div>

                  {openIndex === index && item.content.length > 0 && (
                    <ul className="mt-2 sm:mt-3 md:mt-4 font-quicksand list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-base sm:text-lg md:text-xl">
                      {item.content.map((point, idx) => (
                        <li key={idx} className="pl-2">{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-medium font-quicksand text-center mb-6 sm:mb-8 md:mb-12">
            Request a demo to learn more about how we can support your team
          </h1>

          <div id="book-a-demo" className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10 gap-8 sm:gap-10 md:gap-16 w-full max-w-5xl">

            <img
              src="/images/partner_part_4.svg"
              alt=""
              className="w-full max-w-[250px] sm:max-w-[320px] md:max-w-[400px]"
            />

            <form className="w-full max-w-md space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <select
                name="organization_type"
                className="w-full p-2.5 sm:p-3 border rounded-md text-gray-600"
                onChange={handleChange}
                value={formData.organization_type}
                required
              >
                <option value="" disabled hidden>Organisation Type</option>
                <option>Clinics</option>
                <option>Schools</option>
                <option>NGO</option>
                <option>Therapy Centers</option>
                <option>Corporate</option>
              </select>

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border rounded-md"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border rounded-md"
                required
              />

              <select
                name="country"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                onChange={handleChange}
                value={formData.country}
                required
              >
                <option value="" hidden>* Country</option>
                {allCountries.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                name="city"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                onChange={handleChange}
                value={formData.city}
                required
              >
                <option value="" hidden>* City</option>
                {allCities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                name="language"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600"
                onChange={handleChange}
                value={formData.language}
                required
              >
                <option value="" hidden>* Language</option>
                {allLanguages.map((language, i) => (
                  <option key={i} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              {/* Checkbox */}
              <div className="flex items-start pt-5 sm:pt-6 md:pt-10 gap-3 sm:gap-4 md:gap-7 text-xs sm:text-sm font-quicksand font-bold text-gray-600">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  required
                />
                <label htmlFor="terms" className="text-gray-600">
                  I agree to LittleHugs's{' '}
                  <span onClick={() => setShowPopup('Terms&Conditions')} className="text-blue-600 underline cursor-pointer">
                    Terms & Conditions
                  </span>{' '}
                  and acknowledge the{' '}
                  <span onClick={() => setShowPopup('PrivacyPolicy')} className="text-blue-600 underline cursor-pointer">
                    Privacy Policy
                  </span>
                </label>
              </div>

              <button
                className={`w-full sm:min-w-[120px] md:min-w-[150px] px-4 sm:px-5 py-2.5 sm:py-3 md:pt-4 text-white rounded-full transition mt-4 ${(isFormValid && !loadingDemo)
                  ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'}`}
                disabled={!isFormValid || loadingDemo}
              >{loadingDemo ? <div className='flex items-center justify-center gap-2 px-4 py-2'>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Loading...
              </div> : "Request DEMO"}
              </button>
            </form>

          </div>
        </div>

        <div className="relative bg-[#fef8e6] overflow-hidden mt-12 md:mt-[120px] px-4 sm:px-6 md:px-[80px]">
          {/* Curve Top */}
          <div className="absolute top-0 left-0 w-full">
            <svg
              className="w-full h-auto"
              height="100"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M0,100 C480,0 960,0 1440,100 L1440,0 L0,0 Z"
              ></path>
            </svg>
          </div>

          {/* Footer Content */}
          <div className="relative flex flex-col items-center max-w-6xl mx-auto space-between sm:gap-10 md:gap-0 md:flex-row md:justify-around md:items-start lg:items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">

            {/* Left - Who We Serve */}
            <div className="text-center md:text-left space-y-1 sm:space-y-2">
              <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800 mb-1 sm:mb-2">Who We Serve</h3>
              <ul className="font-normal font-quicksand text-base sm:text-lg md:text-xl text-gray-600 space-y-0.5 sm:space-y-1">
                <li>Clinics</li>
                <li>Schools</li>
                <li>NGO</li>
                <li>Therapy Centers</li>
                <li>Corporate</li>
              </ul>
            </div>

            <div className="h-[200px] px-1 overflow-hidden mb-4">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/BNeo814cXzE"
                title="Little Hugs Partnership Program"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Center - Get LittleHugs */}
            <div className="mb-0 sm:mb-4 md:mb-9 text-center">
              <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800">Get LittleHugs</h3>
              <button onClick={openWaitlist} className="bg-blue-500 hover:bg-blue-600 text-white mt-2 sm:mt-3 md:mt-4 py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition text-sm sm:text-base">
                  Get a Demo
                </button>
            </div>

            {/* Right - Support */}
            {/* Commented out as in original code */}
            {/* <div className="text-center md:text-right space-y-1 sm:space-y-2">
        <h3 className="font-medium font-quicksand text-xl sm:text-2xl md:text-[28px] text-gray-800 mb-1 sm:mb-2">Support</h3>
        <ul className="font-normal font-quicksand text-base sm:text-lg md:text-xl text-gray-600 space-y-0.5 sm:space-y-1">
          <li>FAQ</li>
          <li>Help</li>
        </ul>
      </div> */}

          </div>
        </div>

      </div>
    </>
  );
};

export default PartenerLandingPage;