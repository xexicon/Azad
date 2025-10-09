import React from 'react';
import Azad from '../assets/Azad.svg';
import {useNavigate} from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full bottom-0 h-[628px] bg-black'>
        <div className='flex flex-col mt-5'>
            <div className="w-[138px] pt-20 ml-auto border-b border-red-600" />
            <div class="w-[40px] ml-[1349px] mt-3 border-b border-red-600 rotate-140"></div>
            <div className="w-[1353.5px] pt-3 border-b border-red-600" />
        </div>
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
                <a href=''>Occulo Space</a>
                <a href=''>About Us</a>
                <a href=''>News</a>
                <a href=''>Vision</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href=''>Quick Links</a>
                <a href=''>Book Launch</a>
                <a href=''>Contact Us</a>
                <a href=''>Privacy Policy</a>
                <a href=''>Terms</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href=''>Media</a>
                <a href=''>News</a>
                <a href=''>Updates</a>
            </div>
            <div className='flex flex-col justify-center font-sans text-white items-start gap-5'>
                <a href=''>AZAD</a>
                <a href=''>About</a>
                <a href=''>Specs</a>
                <a href=''>Launch Location</a>
            </div>
            </div>

        </div>
      <h2>Footer</h2>
    </div>
  );
}

export default Footer;
