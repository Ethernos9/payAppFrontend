import React from 'react'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeatureSection'
import TestimonialsSection from '../components/TestimonialsSection'
import DownloadSection from '../components/DownloadSection'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
 
        <div>
          <div>
              <NavBar/>
          </div>
            
            <div>
              <HeroSection/>
            </div>
            <div>
              <FeaturesSection/>
            </div>
            <div>
              <TestimonialsSection/>
            </div>
            <div>
              <DownloadSection/>
            </div>
       
           <div>
    
            <Footer/>
           </div>
        </div>
  )
}

export default HomePage