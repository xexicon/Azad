import React from 'react';
import Azad from '../assets/Azad.svg';
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollClick = (e, page, sectionId) => {
    e.preventDefault();

    if (location.pathname === `/${page === "home" ? "" : page}`) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(page === "home" ? "/" : `/${page}`, {
        state: { scrollToSection: sectionId }
      });
    }
  };

  return (
    <div className="w-full pt-10 pb-30 bg-[rgba(4,4,4,1)]">

      {/* ================= DESKTOP FOOTER (UNCHANGED) ================= */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-center items-center mt-20 gap-60">
          <div className="flex flex-col justify-start items-start gap-20">
            <img className="w-60 h-16" src={Azad} alt="Logo" />

            <div className="flex flex-row gap-20">
              <button
                className="bg-red-600 border-red-600 text-white text-lg font-sans font-semibold py-2.5 px-5"
                onClick={() => navigate('/book-launch')}
              >
                Book a Launch
              </button>

              <button
                className="text-white text-lg font-sans font-semibold border border-[#F00000] py-2.5 px-5"
                onClick={() => navigate('/contact-us')}
              >
                Contact Us
              </button>
            </div>

            <div className="text-white text-lg font-sans">
              © {new Date().getFullYear()} Ocullo Technology Pte. Ltd. Singapore
            </div>
          </div>

          <div className="flex flex-row justify-center items-start gap-30">
            <div className="flex flex-col text-white gap-5">
              <div className="text-lg font-bold">Company</div>
              <a href="https://ocullospace.com">OculloSpace</a>
              <a href="/about-us">About Us</a>
              <a href="https://ocullospace.com/news">News</a>
              <a href="#vision" onClick={(e) => handleScrollClick(e, "about-us", "vision")}>Vision</a>
            </div>

            <div className="flex flex-col text-white gap-5">
              <div className="text-lg font-bold">Quick Links</div>
              <a href="/book-launch">Book a Launch</a>
              <a href="/contact-us">Contact Us</a>
              <a href="https://ocullospace.com/privacy">Privacy Policy</a>
              <a href="https://ocullospace.com/terms">Terms</a>
            </div>

            <div className="flex flex-col text-white gap-5">
              <div className="text-lg font-bold">Media</div>
              <a href="https://ocullospace.com/news">News</a>
              <a href="#">Updates</a>
            </div>

            <div className="flex flex-col text-white gap-5">
              <div className="text-lg font-bold">AZAD</div>
              <a href="/about-us">About</a>
              <a href="#Azad" onClick={(e) => handleScrollClick(e, "home", "Azad")}>Technical Overview</a>
              <a href="#launchloc" onClick={(e) => handleScrollClick(e, "home", "launchloc")}>Launch Location</a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE FOOTER ================= */}
      <div className="md:hidden px-6 pt-12 space-y-10">

        {/* Logo */}
        <img src={Azad} alt="Logo" className="w-48 mx-auto" />

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4">
          <button
            className="bg-red-600 text-white py-3 text-lg font-semibold"
            onClick={() => navigate('/book-launch')}
          >
            Book a Launch
          </button>

          <button
            className="border border-[#F00000] text-white py-3 text-lg font-semibold"
            onClick={() => navigate('/contact-us')}
          >
            Contact Us
          </button>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 text-white text-base">

          <div className="space-y-3 flex flex-col">
            <div className="font-bold">Company</div>
            <a href="/about-us">About Us</a>
            <a href="https://ocullospace.com/news">News</a>
            <a href="#vision" onClick={(e) => handleScrollClick(e, "about-us", "vision")}>Vision</a>
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="font-bold">Quick Links</div>
            <a href="/book-launch">Book Launch</a>
            <a href="/contact-us">Contact</a>
            <a href="https://ocullospace.com/privacy">Privacy</a>
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="font-bold">Media</div>
            <a href="https://ocullospace.com/news">News</a>
            <a href="#">Updates</a>
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="font-bold">AZAD</div>
            <a href="/about-us">About</a>
            <a href="#Azad" onClick={(e) => handleScrollClick(e, "home", "Azad")}>Overview</a>
            <a href="#launchloc" onClick={(e) => handleScrollClick(e, "home", "launchloc")}>Launch Location</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white text-sm pt-6">
          © {new Date().getFullYear()} Ocullo Technology Pte. Ltd. Singapore
        </div>
      </div>
    </div>
  );
};

export default Footer;
