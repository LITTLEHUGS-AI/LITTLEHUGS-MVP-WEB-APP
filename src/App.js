import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import WhatIsLittleHugs  from './components/WhatIsLittleHugs';
import HowItWorks from './components/HowItWorks';
import DeserveCare  from './components/DeserveCare';
import EverydayCare   from './components/EverydayCare';
// import FAQSection    from './components/FAQSection';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection/>
      <WhatIsLittleHugs/>
      <HowItWorks />
      <DeserveCare />
      <EverydayCare />
      {/* <FAQSection /> */}
      <Footer />
    </div>
  );
};

export default App;
