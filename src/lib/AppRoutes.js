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
            <Route path={routesConfig.pricingPlans.path} element={<PricingPlans />} />
            <Route path={routesConfig.personalLanding.path} element={<PersonalLandingPage />} />
            <Route path={routesConfig.partenerLanding.path} element={<PartenerLandingPage />} />
            <Route path={routesConfig.assesmentLanding.path} element={<AssesmentLandingPage />} />
            <Route path={routesConfig.signIn.path} element={<SignIn />} />
            <Route path={routesConfig.signUp.path} element={<Signup />} />
           
            
           
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default AppRoutes;