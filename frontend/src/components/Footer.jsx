import React from 'react';
import Azad from '../assets/Azad.svg';
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
      const handleAzadClick = (e) => {
        e.preventDefault(); 
        if (location.pathname === "/") {
          document.getElementById("Azad")?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/", { state: { scrollToAzad: true } });
        }
      };


  return (
    <div className='w-full pt-10 pb-30 bg-[rgba(4,4,4,1)]'>
        <div className=''>
        {/*<div className="flex flex-col mt-5 w-full max-w-[1600px] mx-auto">
  <div className="w-1/4 sm:w-1/9 border-b border-red-600 pt-20 ml-auto"></div>
  <div className="w-10 sm:w-10 border-b border-red-600 mt-2 rotate-140 self-end"></div>
  <div className="w-7/8 border-b border-red-600 pt-7"></div>
</div>*/}
        <div className='flex flex-row justify-center items-center mt-20 gap-60'>
            <div className='flex flex-col justify-start items-start gap-20'>
                <img className='w-60 h-16' src={Azad} alt='Logo'/>
                <button className="bg-red-600 border-red-600 text-white text-lg font-sans font-semibold tracking-light py-2.5 px-5 cursor-pointer" onClick={() => navigate('/book-launch')}>Book Launch</button>
                <div className="text-white text-lg font-sans tracking-tight">© {new Date().getFullYear()} Ocullo Technologies Pte. Ltd.</div>
            </div>
            <div className='flex flex-row justify-center items-start gap-30'>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href=''>Company</a>
                <a href='https://ocullospace.com'>Occulo Space</a>
                <a href='/about-us'>About Us</a>
                <a href='https://ocullospace.com/news'>News</a>
                <a href='/about-us'>Vision</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href=''>Quick Links</a>
                <a href='/book-launch'>Book Launch</a>
                <a href=''>Contact Us</a>
                <a href='https://ocullospace.com/privacy'>Privacy Policy</a>
                <a href='https://ocullospace.com/terms'>Terms</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href='https://www.linkedin.com/company/ocullospace/'>Media</a>
                <a href=''>News</a>
                <a href=''>Updates</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href="#contact" onClick={handleAzadClick}>AZAD</a>
                <a href='/about-us'>About</a>
                <a href=''>Specs</a>
                <a href=''>Launch Location</a>
            </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
