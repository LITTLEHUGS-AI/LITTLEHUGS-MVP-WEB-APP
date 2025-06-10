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
import AssesmentHandler from "../components/dashboard/dashboardComponents/PersonalAssesment/AssesmentHandler";
import ProtectedRoute from "./ProtectedRoute";
import OpenRoute from "./OpenRoute";
import AcceptInviteUser from "../temp/AcceptInviteUser";
import AcceptInviteTeam from "../temp/AcceptInviteTeam";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminPartners from "../components/admin/AdminPartners";
import AcceptInvitePartner from "../temp/AcceptInvitePartner";
import AppPrivacyPolicy from "../components/misc/appPrivacypolicy";
import MobileAccDelete from "../components/misc/mobileAccDelete";




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

            <Route path="/mobile/privacy-policy" element={<OpenRoute><AppPrivacyPolicy /></OpenRoute>} />
            <Route path="/mobile/account-delete" element={<OpenRoute><MobileAccDelete /></OpenRoute>} />


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
              path="/personal/assessment/start"
              element={
                <ProtectedRoute>
                  <AssesmentHandler />
                </ProtectedRoute>
              }
            />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/partners" element={<AdminPartners />} />


            <Route path="/accept-invite-user/:inviteId" element={<AcceptInviteUser />} />
            <Route path="/accept-invite/:inviteId" element={<AcceptInviteTeam />} />
            <Route path="/partner-invite/:inviteId" element={<AcceptInvitePartner />} />

          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default AppRoutes;
