import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Loader } from "../components/common/Loader";
import Home from "../components/home/Home";
import About from "../components/about/About";
import PersonalLandingPage from "../components/landingpage/PersonalLandingPage";
import PartenerLandingPage from "../components/landingpage/PartenerLandingPage";
import AssesmentLandingPage from "../components/landingpage/AssesmentLandingPage";
import SignIn from "../components/signin/SignIn";
import Signup from "../components/signup/signup";
import Contact from "../components/landingpage/Contact";
import PricingPlans from "../components/landingpage/PricingPlans";
import ScrollToTop from "./ScrollToTop";
import routesConfig from "../config/routesConfig";
import PersonalDashboard from "../components/dashboard/PersonalDashboard";
import PersonalAssesment from "../components/dashboard/dashboardComponents/PersonalAssesment";
import Plans from "../components/dashboard/dashboardComponents/Plans";
import GoogleCallback from "../components/signin/GoogleCallback";
import PartnerDashboardLayout from "../components/partner/PartnerDashboardLayout";
import AssesmentConsent from "../components/dashboard/dashboardComponents/PersonalAssesment/AssesmentConsent";

function AppRoutes() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path={routesConfig.home.path} element={<Home />} />
            <Route path={routesConfig.about.path} element={<About />} />
            <Route path={routesConfig.contact.path} element={<Contact />} />
            <Route
              path={routesConfig.pricingPlans.path}
              element={<PricingPlans />}
            />
            <Route
              path={routesConfig.personalLanding.path}
              element={<PersonalLandingPage />}
            />
            <Route
              path={routesConfig.partenerLanding.path}
              element={<PartenerLandingPage />}
            />
            <Route
              path={routesConfig.assesmentLanding.path}
              element={<AssesmentLandingPage />}
            />
            <Route path={routesConfig.signIn.path} element={<SignIn />} />
            <Route path={routesConfig.signUp.path} element={<Signup />} />
            {/* dashboard */}
            <Route path="/personal/dashboard" element={<PersonalDashboard />} />
            <Route
              path="/partner/dashboard"
              element={<PartnerDashboardLayout />}
            />
            <Route
              path="/personal/assessment"
              element={<PersonalAssesment />}
            />
            <Route path="/personal/plans" element={<Plans />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />
            <Route
              path="/personal/asssesment-consent"
              element={<AssesmentConsent />}
            />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default AppRoutes;
