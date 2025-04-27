import React from 'react'
import Navbar from '../common/Navbar'
import LandingHeader from './LandingHeader'

function PartenerLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
            <Navbar />
            <LandingHeader
                bg_color="#FFC655"
                sub_title="LITTLEHUGS FOR PARTNERS"
                title="Screen Smarter. Support Sooner"
                description="Whether you're a mother, caregiver, or growing child—LittleHugs brings AI-powered wellness, smart screening, and daily care routines to your fingertips"
                button_text="Book a Demo"
            />
        </div>
  )
}

export default PartenerLandingPage
