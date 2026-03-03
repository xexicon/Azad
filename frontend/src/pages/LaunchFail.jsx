import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LaunchFail = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/launch-pass"); // change to your target route
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);
  return (
    <div className='w-full h-full bg-black'>
      <Navbar />
      <div className="bg-[url('./assets/LaunchFail.svg')] bg-cover bg-center w-full h-screen">
        <div className='flex flex-col items-end pt-40 pr-20 gap-2'>
        <div className='flex flex-col text-left'>
            <span className='text-white text-7xl text-left font-extralight font-aspekta'>Opps!</span>
<span className='text-white text-5xl text-left font-extralight font-aspekta'>Something weird happend
Try Again...</span>
</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LaunchFail
