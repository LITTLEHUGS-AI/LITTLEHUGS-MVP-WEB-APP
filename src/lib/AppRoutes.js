import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loader } from "../components/common/Loader";
import Home from "../components/home/Home";
import About from "../components/about/About";

function AppRoutes() {
  return (
    <Router>
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
          {/* <Route element={<DefaultLayout />}> */}
          {/* </Route> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;
