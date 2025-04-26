import React from 'react'
import Navbar from '../common/Navbar'
import HeroSection from '../HeroSection'
import WhatIsLittleHugs from '../WhatIsLittleHugs'
import HowItWorks from '../HowItWorks'
import DeserveCare from '../DeserveCare'
import EverydayCare from '../EverydayCare'
import Footer from '../common/Footer'
import MakeUsDiff from '../MakeUsDiff'
// import NewCareSection from '../NewSection'

function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroSection />
            <WhatIsLittleHugs />
            <HowItWorks />
            <DeserveCare />
            <EverydayCare />
            <MakeUsDiff />
            {/* <NewCareSection /> */}
            <Footer />
        </div>
    )
}

export default Home
