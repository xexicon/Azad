import React, { useState } from 'react';
import Azad from '../assets/Azad.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAzadClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById("Azad")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToAzad: true } });
    }
  };

  return (
    <div className="max-sm:fixed z-50 w-full bg-[rgba(4,4,4,1)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/">
          <img src={Azad} alt="Logo" className="h-8 md:h-10" />
        </a>

        {/* Desktop Nav (UNCHANGED) */}
        <div className="hidden md:flex gap-6 lg:gap-10 text-base lg:text-lg">
          <a href="/about-us" className="text-white">About</a>
          <a href="#contact" onClick={handleAzadClick} className="text-white">Azad</a>
          <a href="/contact-us" className="text-white">Contact Us</a>
          <a href="#" className="text-white">News</a>
        </div>

        {/* Desktop CTA (UNCHANGED) */}
        <a
          href="/book-launch"
          className="hidden md:block px-6 py-2 text-white border border-[#F00000] text-sm lg:text-base"
        >
          Book Launch
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu size={26} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(4,4,4,1)] border-t border-white/10 px-6 py-6 space-y-5">
          <a href="/about-us" className="block text-white text-lg">About</a>
          <a href="#contact" onClick={handleAzadClick} className="block text-white text-lg">Azad</a>
          <a href="/contact-us" className="block text-white text-lg">Contact Us</a>
          <a href="#" className="block text-white text-lg">News</a>

          <a
            href="/book-launch"
            className="block text-center mt-4 px-6 py-2 text-white border border-[#F00000]"
          >
            Book Launch
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
