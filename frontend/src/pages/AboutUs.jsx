import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUsRocket from '../assets/AboutUsRocket.svg';
import AboutVision from '../assets/AboutVision.svg';
import AboutMission from '../assets/AboutMission.svg';
import NewsLetter from '../components/NewsLetter';
import { useLocation } from "react-router-dom";

const AboutUs = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="w-full h-full bg-black">
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="w-full h-[610px]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${AboutUsRocket})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pl-6 sm:pl-40 pt-40 sm:pt-85 text-white text-3xl sm:text-7xl font-extralight font-aspekta tracking-wider">
          About Us
        </div>

        <div className="pl-6 sm:pl-40 text-white text-sm sm:text-xl font-extralight font-inter leading-relaxed tracking-tight">
          At OculloSpace, we are dedicated to developing the next generation of hybrid rocket<br className="hidden sm:block"/>
          systems that make access to near space safer, more reliable, and cost-effective.
        </div>
      </div>

      {/* ================= VISION ================= */}
      {/* Desktop: right edge aligned with Mission image */}
      {/* Mobile: stacked & centered */}
      <div
        id="vision"
        className="
          mt-30
          flex flex-col-reverse sm:flex-row
          gap-16 sm:gap-60
          items-center sm:items-end
          px-6 sm:px-0
          text-center sm:text-right
        "
      >
        <img
          src={AboutVision}
          alt="Vision"
          className="sm:ml-25 max-w-full"
        />

        <div className="flex flex-col sm:mb-30 sm:mr-35">
          <div className="text-white text-3xl sm:text-7xl font-extralight font-aspekta tracking-wider">
            Vision
          </div>

          <div className="text-white text-sm sm:text-xl font-extralight font-inter leading-relaxed tracking-tight">
            To ignite a future where every student across ASEAN and
            beyond can explore, innovate, and lead humanity’s journey
            into space—building a global community of empowered,
            explorers united by curiosity and discovery.
          </div>
        </div>
      </div>

      {/* ================= MISSION ================= */}
      {/* Desktop unchanged, Mobile stacked */}
      <div
        className="
          mt-40
          flex flex-col sm:flex-row
          gap-16 sm:gap-40
          items-center
          px-6 sm:px-0
          text-center sm:text-left
        "
      >
        <div className="flex flex-col">
          <div className="text-white text-3xl sm:text-7xl font-extralight font-aspekta tracking-wider sm:ml-25">
            Mission
          </div>

          <div className="text-white text-sm sm:text-xl font-extralight font-inter leading-relaxed tracking-tight sm:ml-25">
            OculloSpace Innovations launches sounding rockets to inspire and educate,
            carrying student experiments to the edge of space. We democratize access
            to suborbital research, fostering the next generation of scientists and
            engineers through hands-on missions.
          </div>
        </div>

        <img
          src={AboutMission}
          alt="Mission"
          className="sm:mr-35 max-w-full"
        />
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default AboutUs;
