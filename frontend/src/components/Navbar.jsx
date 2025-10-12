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
    <div className='w-full h-20 bg-[rgba(4,4,4,1)] border-b-2 border-white/10 font-sans'>
        <div className='pl-25 pt-4 inline-flex'>
            <div className='flex justify-left items-center'>
                <a href="/"><img src={Azad} alt='Logo'/></a>
            </div>
            <div className='pl-65 pt-1 inline-flex gap-20 text-[18px] justify-center items-center'>
                <div className='text-white'><a href="/about-us">About</a></div>
                <div className='text-white'><a href="#contact" onClick={handleAzadClick}>Azad</a></div>
                <div className='text-white'><a href="/contact-us">Contact Us</a></div>
                <div className='text-white'><a href="">News</a></div>
            </div>
            <div className='pl-70 pt-1'>
                <a href='/book-launch' className='flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans'>Book Launch</a>
            </div>
        </div>
    </div>
  );
};

export default Navbar;