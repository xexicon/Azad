import React from 'react';
import Azad from '../assets/Azad.svg';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleAzadClick = (e) => {
    e.preventDefault(); 
    if (location.pathname === "/") {
      document.getElementById("Azad")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToAzad: true } });
    }
  };


  return (
    <div className="w-full bg-[rgba(4,4,4,1)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/">
          <img src={Azad} alt="Logo" className="h-8 md:h-10" />
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 lg:gap-10 text-base lg:text-lg">
          <a href="/about-us" className="text-white">About</a>
          <a href="#contact" onClick={handleAzadClick} className="text-white">Azad</a>
          <a href="/contact-us" className="text-white">Contact Us</a>
          <a href="#" className="text-white">News</a>
        </div>

        {/* CTA */}
        <a
          href="/book-launch"
          className="px-6 py-2 text-white border border-[#F00000] text-sm lg:text-base"
        >
          Book Launch
        </a>
      </div>
    </div>
  );
};

export default Navbar;