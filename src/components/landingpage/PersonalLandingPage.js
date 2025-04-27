import React from 'react'
import Navbar from '../common/Navbar'
import LandingHeader from './LandingHeader'
import ForThis from './ForThis'

function PersonalLandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <LandingHeader
                bg_color="#FAF3ED"
                title="A hug for every stage of life"
                description="Whether you're a mother, caregiver, or growing child—LittleHugs brings AI-powered wellness, smart screening, and daily care routines to your fingertips"
            />
            <ForThis />
        </div>
    )
}

export default PersonalLandingPage
