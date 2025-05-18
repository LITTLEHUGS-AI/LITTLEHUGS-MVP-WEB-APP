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
import AssesmentWomen from "../components/dashboard/dashboardComponents/PersonalAssesment/AssesmentWomen";
import ProtectedRoute from "./ProtectedRoute";
import OpenRoute from "./OpenRoute";
import AcceptInviteUser from "../temp/AcceptInviteUser";
import AcceptInviteTeam from "../temp/AcceptInviteTeam";
import AssesmentChild from "../components/dashboard/dashboardComponents/PersonalAssesment/AssesmentChild";
import AssesmentSEL from "../components/dashboard/dashboardComponents/PersonalAssesment/AssesmentSEL";

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
            <Route path={routesConfig.home.path} element={<OpenRoute> <Home /></OpenRoute>} />
            <Route path={routesConfig.about.path} element={<OpenRoute><About /></OpenRoute>} />
            <Route path={routesConfig.contact.path} element={<OpenRoute><Contact /></OpenRoute>} />
            <Route
              path={routesConfig.pricingPlans.path}
              element={<OpenRoute><PricingPlans /></OpenRoute>}
            />
            <Route
              path={routesConfig.personalLanding.path}
              element={<OpenRoute><PersonalLandingPage /></OpenRoute>}
            />
            <Route
              path={routesConfig.partenerLanding.path}
              element={<OpenRoute><PartenerLandingPage /></OpenRoute>}
            />
            <Route
              path={routesConfig.assesmentLanding.path}
              element={<OpenRoute><AssesmentLandingPage /></OpenRoute>}
            />
            <Route path={routesConfig.signIn.path} element={<OpenRoute><SignIn /></OpenRoute>} />
            <Route path={routesConfig.signUp.path} element={<OpenRoute><Signup /></OpenRoute>} />
            {/* dashboard */}
            <Route path="/auth/callback" element={<GoogleCallback />} />

            <Route
              path="/personal/dashboard"
              element={
                <ProtectedRoute>
                  <PersonalDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/partner/dashboard"
              element={
                <ProtectedRoute>
                  <PartnerDashboardLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personal/assessment"
              element={
                <ProtectedRoute>
                  <PersonalAssesment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personal/plans"
              element={
                <ProtectedRoute>
                  <Plans />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personal/asssesment-women"
              element={
                <ProtectedRoute>
                  <AssesmentWomen />
                </ProtectedRoute>
              }
            />

               <Route
              path="/personal/asssesment-child"
              element={
                <ProtectedRoute>
                  <AssesmentChild />
                </ProtectedRoute>
              }
            />

            <Route
              path="/personal/asssesment-sel"
              element={
                <ProtectedRoute>
                  <AssesmentSEL />
                </ProtectedRoute>
              }
            />

            <Route path="/accept-invite-user/:inviteId" element={<AcceptInviteUser />} />
            <Route path="/accept-invite/:inviteId" element={<AcceptInviteTeam/>} />


          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default AppRoutes;
