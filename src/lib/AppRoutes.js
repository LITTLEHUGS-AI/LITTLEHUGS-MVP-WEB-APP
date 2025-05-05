import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader } from "../components/common/Loader";
import Home from "../components/home/Home";
import About from "../components/about/About";
import PersonalLandingPage from "../components/landingpage/PersonalLandingPage";
import PartenerLandingPage from "../components/landingpage/PartenerLandingPage";
import AssesmentLandingPage from "../components/landingpage/AssesmentLandingPage";
import SignIn from "../components/signin/SignIn";
import SignUp from "../components/landingpage/SignUp";
import Contact from "../components/landingpage/Contact";
import PricingPlans from "../components/landingpage/PricingPlans";
import ScrollToTop from "./ScrollToTop";

function AppRoutes() {
  return (
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricingplans" element={<PricingPlans />} />
          <Route path="/personal-landing" element={<PersonalLandingPage />} />
          <Route path="/partener-landing" element={<PartenerLandingPage />} />
          <Route path="/assesment-landing" element={<AssesmentLandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* <Route element={<DefaultLayout />}> */}
          {/* </Route> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
