import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUsRocket from '../assets/AboutUsRocket.svg';
import AboutVision from '../assets/AboutVision.svg';
import AboutMission from '../assets/AboutMission.svg';
import NewsLetter from '../components/NewsLetter';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const AboutUs = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className='w-full h-full bg-[rgba(4,4,4,1)]'>
        <Navbar />
        <div className='mb-10'>
            <div
                className="w-full h-[610px]"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${AboutUsRocket})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >
                    <div className="justify-start pl-40 pt-85 text-white text-7xl font-extralight font-aspekta tracking-wider">About Us</div>
                    <div className="pl-40 justify-start text-white text-xl font-extralight font-inter leading-relaxed tracking-tight">At OculloSpace, we are committed to building the next generation of hybrid rocket<br/> systems that make access to near-space safer, more reliable, and cost-efficient.<br/></div>
            </div>
            <div id='vision' className='mt-30 flex flex-row gap-60 items-end text-right'>
                <img src={AboutVision} alt='Vision' className='ml-25'/>
                <div className='flex flex-col mb-30'>
                <div className="justify-start text-white text-7xl font-extralight font-aspekta tracking-wider">Vision</div>
                <div className="text-right justify-start text-white text-xl font-extralight font-['Inter'] leading-relaxed tracking-tight">To ignite a future where every student across ASEAN and<br/> beyond can explore, innovate, and lead humanity’s journey<br/> into space—building a global community of empowered,<br/> explorers united by curiosity and discovery.</div>
                </div>
            </div>
            <div className='mt-40 flex flex-row gap-40'>
                <div className='flex flex-col'>
                <div className="justify-start ml-25 text-white text-7xl font-extralight font-aspekta tracking-wider">Mission</div>
                <div className="ml-25 justify-start"><span class="text-white text-xl font-extralight font-inter leading-relaxed tracking-tight"><br/></span><span class="text-white text-xl font-extralight font-inter leading-relaxed tracking-tight">OculloSpace Innovations launches sounding rockets to inspire and educate, carrying student experiments to the edge of space. We democratize access to suborbital research, fostering the next generation of scientists and engineers through hands-on missions.</span></div>
                </div>
                <img src={AboutMission} alt='Mission' className='mr-35' />
            </div>
        </div>
        <NewsLetter />
      <Footer />
    </div>
  );
};

export default AboutUs;