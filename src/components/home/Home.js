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
    const everyDayCareData = {
        title: "Emotional intelligence meets everyday care",
        feature: [
            {
                title: "Auto-generated personalised insights",
                img: "/images/care_1.svg",
            },
            {
                title: "Built on WHO, IAP & CDC-aligned tools",
                img: "/images/care_2.svg",
            },
            {
                title: "Used by moms, women, caregivers, schools, and clinics",
                img: "/images/care_3.svg",
            },
            {
                title: "Clear follow-up routines and easy-to-use dashboards",
                img: "/images/care_4.svg",
            },
        ]
    };

    return (
        <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="w-full">
                <HeroSection />
                <WhatIsLittleHugs />
                <HowItWorks />
                <DeserveCare />
                <EverydayCare
                    title={everyDayCareData.title}
                    features={everyDayCareData.feature}
                />
                <MakeUsDiff />
                {/* <NewCareSection /> */}
            </main>
            <Footer />
        </div>
    )
}

export default Home
