import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LaunchFailArtwork from '../assets/LaunchFail.svg';

const LaunchFail = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/launch-pass"); // change to your target route
    },30000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);
  return (
    <div className='w-full h-full bg-black'>
      <Navbar />
      <div className='pt-12 md:pt-15'>
        <div className="w-full flex justify-center overflow-hidden">
          <img
            src={LaunchFailArtwork}
            alt="Ticket cancelled illustration"
            className="w-full max-w-[560px] sm:max-w-[760px] md:max-w-none md:w-full h-auto md:h-[900px] md:object-cover object-contain object-top md:object-center"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LaunchFail
