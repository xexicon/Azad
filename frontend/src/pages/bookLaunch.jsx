import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import TotalRocket from '../assets/Total Rocket.png';
import FooterLine from '../assets/FooterLine.svg';
import Launch1 from '../components/Launch1.jsx';
import Launch2 from '../components/Launch2.jsx';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import ScrollToTop from '../hooks/ScrollToTop.jsx';

const BookLaunch = () => {
  const [step, setStep] = useState(1);
  const [launch1Data, setLaunch1Data] = useState({
    name: '',
    email: '',
    contact_number: '',
    country: '',
    company: ''
  });

  const [launch2Data, setLaunch2Data] = useState({
    payload: '',
    launch_quarter: '',
    target_altitude: ''
  });

  const [recordId, setRecordId] = useState(null);

  // Load saved data from localStorage
  useEffect(() => {
    const savedLaunch1 = localStorage.getItem('launch1Data');
    const savedLaunch2 = localStorage.getItem('launch2Data');
    const savedRecordId = localStorage.getItem('recordId');

    if (savedLaunch1) setLaunch1Data(JSON.parse(savedLaunch1));
    if (savedLaunch2) setLaunch2Data(JSON.parse(savedLaunch2));
    if (savedRecordId) setRecordId(savedRecordId);
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('launch1Data', JSON.stringify(launch1Data));
  }, [launch1Data]);

  useEffect(() => {
    localStorage.setItem('launch2Data', JSON.stringify(launch2Data));
  }, [launch2Data]);

  // ✅ Handle "Next" click from Launch1
  const handleNext = async () => {
    const { name, email, contact_number, country } = launch1Data;

    if (!name || !email || !contact_number || !country) {
      toast.error("Please fill all the * marked fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/add`, launch1Data);

      // ✅ Extract MongoDB ID properly
      const newId = response.data.lead?._id;
      if (!newId) {
        throw new Error("No ID returned from backend");
      }

      setRecordId(newId);
      localStorage.setItem('recordId', newId);

      setStep(2);
    } catch (error) {
      console.error("Error saving Launch1:", error);
      toast.error(error.response?.data?.message || "An error occurred while saving Launch1 data.");
    }
  };

  // ✅ Handle "Back" click from Launch2
  const handleBack = () => {
    setStep(1);
  };

  // ✅ Handle "Submit" click from Launch2
  const handleSubmit = async () => {
    const { payload, launch_quarter, target_altitude } = launch2Data;

    // Validation
    if (!payload || !launch_quarter || !target_altitude) {
      toast.error("Please fill all the * marked fields.");
      return;
    }

    if (!recordId) {
      toast.error("Record ID not found. Please complete the first step.");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/update/${recordId}`, {
        payload_mass: payload,
        target_quater: launch_quarter,
        target_altitude
      });

      toast.success("Booking submitted successfully!");

      // Clear all stored data
      localStorage.removeItem('launch1Data');
      localStorage.removeItem('launch2Data');
      localStorage.removeItem('recordId');

      // Reset state
      setLaunch1Data({ name: '', email: '', contact_number: '', country: '', company: '' });
      setLaunch2Data({ payload: '', launch_quarter: '', target_altitude: '' });
      setStep(1);
      setRecordId(null);
    } catch (error) {
      console.error("Error submitting Launch2:", error);
      toast.error(error.response?.data?.message || "Error submitting Launch2 data.");
    }
  };

  return (
    <div className='w-full h-full bg-[rgba(4,4,4,1)]'>
      <Toaster position="top-center" />
      <Navbar />

      <div className='mb-10 flex flex-col justify-center items-center'>
        {/* Header */}
        <div className='flex flex-row gap-4'>
          <div className='mt-20 font-aspekta font-extralight text-red-600 text-7xl'>Book</div>
          <div className='mt-20 font-aspekta font-extralight text-white text-7xl'>Launch</div>
        </div>

        {/* Form Section */}
        <div className='justify-center items-center'>
          {step === 1 && (
            <Launch1
              data={launch1Data}
              setData={setLaunch1Data}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <Launch2
              data={launch2Data}
              setData={setLaunch2Data}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Bottom Section */}
        <div className="w-full h-[100vh] mt-20"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${TotalRocket})`,
            backgroundSize: "cover",
          }}>
          <div className="mt-20 mr-30 flex flex-col items-end text-right">
            <div className="flex flex-row space-x-2">
              <span className="text-white text-7xl font-extralight font-aspekta tracking-wider">Why </span>
              <span className="text-red-600 text-7xl font-extralight font-aspekta tracking-wider">AZAD</span>
              <span className="text-white text-7xl font-extralight font-aspekta tracking-wider">?</span>
            </div>
            <div className="text-white text-xl font-extralight font-inter leading-relaxed tracking-tight max-w-xl">
              AZAD represents a new class of safe, efficient, and scalable sounding rockets.
              Built with a hybrid LOX–plastic propulsion system, it offers high thrust with reduced explosion risk and easier handling.
            </div>
          </div>
        </div>
      </div>

      <img src={FooterLine} alt='FooterLine' className='w-full' />
      <Footer />
    </div>
  );
};

export default BookLaunch;
