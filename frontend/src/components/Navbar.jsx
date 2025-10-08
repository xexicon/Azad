import React from 'react';
import Azad from '../assets/Azad.svg';

const Navbar = () => {
  return (
    <div className='w-full h-20 bg-black border-b-2 border-white/10'>
        <div className='pl-25 pt-4 inline-flex'>
            <div className='flex justify-left items-center'>
                <a href="/"><img src={Azad} alt='Logo'/></a>
            </div>
            <div className='pl-65 pt-1 inline-flex gap-20 text-xl justify-center items-center'>
                <div className='text-white'><a href=''>About</a></div>
                <div className='text-white'>Azad<a href=''/></div>
                <div className='text-white'>Contact Us</div>
                <div className='text-white'>News</div>
            </div>
            <div className='pl-70 pt-1'>
                <button className='w-36 h-10 text-white border border-red-600'>Book Launch</button>
            </div>
        </div>
    </div>
  );
};

export default Navbar;