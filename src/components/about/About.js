import React from 'react'
import Navbar from '../common/Navbar'
import MainHeader from './MainHeader'
import EverydayCare from '../EverydayCare'
import WhyWeExist from './WhyWeExist'
import OurPartner from './OurPartner'
import JoinMovement from './JoinMovement'
import DocumentHead from '../common/DocumentHead'
import routesConfig from '../../config/routesConfig'

function About() {
    const everyDayCareData = {
        title: "We’re not just building a product.",
        subtitle: "We’re reimagining what care should feel like.",
        feature: [
            {
                title: "Empathy first",
                img: "/images/heart.svg",
            },
            {
                title: "Backed by science",
                img: "/images/heart_1.svg",
            },
            {
                title: "Early over urgent",
                img: "/images/heart_2.svg",
            },
            {
                title: "Inclusion by design",
                img: "/images/heart_3.svg",
            },
        ]
    };
    const { title, description } = routesConfig.about;

    return (
        <>
            <DocumentHead
                title={title}
                description={description}
                slug={routesConfig.about.path}
            />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <MainHeader />
                <EverydayCare
                    title={everyDayCareData.title}
                    subtitle={everyDayCareData.subtitle}
                    features={everyDayCareData.feature}
                />
                <WhyWeExist />
                <OurPartner />
                <JoinMovement />
            </div>
        </>
    )
}

export default About
