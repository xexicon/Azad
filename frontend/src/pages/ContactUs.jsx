import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsLetter from '../components/NewsLetter';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ContactUs = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact_number, setContact_number] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);

  const submitContactForm = async () => {
    if (!name || !email || !contact_number) {
      toast.error("Please fill all the * marked fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:7000/api/contact", {
        name, 
        email,
        contact_number,
        company
      });
      setName('');
      setEmail('');
      setContact_number('');
      setCompany('');
      toast.success(response.data.message);
    }
    catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "An error occurred on the server.");
  }
  finally {
        setLoading(false);
    }
}

  return (
    <div className='w-full h-full bg-[rgba(4,4,4,1)]'>
    <ToastContainer theme='dark' />
      <Navbar />
      <div className='mb-40 flex flex-col justify-center items-center'>
      <div className='flex flex-row gap-4 mb-5'>
        <div className='mt-20 font-aspekta font-extralight text-red-600 text-7xl'>Contact</div>
        <div className='mt-20 font-aspekta font-extralight text-white text-7xl'>Us</div>
      </div>
      <div className="w-[837px] bg-zinc-300/0 rounded-2xl border border-white/70 justify-start items-center">
        <div className='flex flex-col gap-4 justify-start items-center'>
          <div className='flex flex-col gap-2'>
            <div className='mt-5 text-white text-xl leading-relaxed font-inter font-extralight'>Your Name*</div>
            <input type='text' className='px-4 py-3 w-[730.40px] h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30 placeholder-text-inter' placeholder='John Doe' value={name} onChange={(e)=>setName(e.target.value)} required/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='mt-5 text-white text-xl leading-relaxed font-inter font-extralight'>Email ID*</div>
            <input type='text' className='px-4 py-3 w-[730.40px] h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30 placeholder-text-inter' placeholder='John Doe' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='mt-5 text-white text-xl leading-relaxed font-inter font-extralight'>Contact Number*</div>
            <PhoneInput country={"in"} 
            value={contact_number}
            onChange={(value) => setContact_number(value)}
            placeholder=""
            inputStyle={{
              width: "730.40px",
          height: "40px",
          backgroundColor: "rgba(4,4,4,1)",
          color: "white",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }} 
        buttonClass="custom-flag-button"
        buttonStyle={{
        borderRight: "none",
        borderColor: "white",
        borderRadius: "8px"// same dark background,
      }}
      dropdownStyle={{
        backgroundColor: "rgba(4,4,4,1)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        top: "100%",       // position below
    left: "0",         // ✅ align from input start
    marginTop: "4px",// optional: make dropdown same width as input
    zIndex: 50,
      }}required/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='mt-5 text-white text-xl leading-relaxed font-inter font-extralight'>Company/Institution Name</div>
            <textarea type='text' className='px-4 pt-3 pb-4 w-[730.40px] h-30 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30 placeholder-text-inter' placeholder='Type your Message here' value={company} onChange={(e) => setCompany(e.target.value)} required/>
          </div>
           <button className='w-28 h-10 mt-5 mb-5 items-center font-inter font-extralight text-xl bg-zinc-300/0 rounded-md border border-white/70 text-white' disabled={loading} onClick={submitContactForm}>Submit</button>
          </div>
          </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default ContactUs;