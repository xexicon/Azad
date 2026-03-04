import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LaunchPass1 from '../components/LaunchPass1.jsx'
import LaunchPass2 from '../components/LaunchPass2.jsx'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterLine from '../assets/FooterLine.svg';

const LaunchPass = () => {

  const [step, setStep] = useState(1)

  const SUBTOTAL = 3000;
  const SHIPPING = 0;
  const TOTAL = SUBTOTAL + SHIPPING;

  const stepSectionRef = useRef(null); // ✅ Ref for scrolling

  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    companyOrInstitution: "",
  })

  const [shippingDetails, setShippingDetails] = useState({
    postalCode: "",
    address1: "",
    address2: "",
    country: "",
    companyOrInstitution: "",
    consent: false,
  })

  // ✅ Restore only if exists
  useEffect(() => {
    const saved = localStorage.getItem("launchPassData");
    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.personalDetails) {
        setPersonalDetails(parsed.personalDetails);
        setStep(2);
      }
    }
  }, []);

  // =========================
  // STEP 1 → SAVE personalDetails ONLY
  // =========================
  const handleNextStep = () => {

    if (!personalDetails.name.trim()) {
      return toast.error("Name is required");
    }

    if (!personalDetails.email.trim()) {
      return toast.error("Email is required");
    }

    if (!/^\S+@\S+\.\S+$/.test(personalDetails.email)) {
      return toast.error("Enter a valid email");
    }

    if (!personalDetails.phone.trim()) {
      return toast.error("Phone number is required");
    }

    if (!personalDetails.country.trim()) {
      return toast.error("Country is required");
    }

    localStorage.setItem(
      "launchPassData",
      JSON.stringify({ personalDetails })
    );

    setStep(2);
  };

  // =========================
  // STEP 2 → SAVE shippingDetails THEN CALL API
  // =========================
  const handleCheckout = async () => {

    if (!shippingDetails.postalCode.trim()) {
      return toast.error("Postal code is required");
    }

    if (!shippingDetails.address1.trim()) {
      return toast.error("Address Line 1 is required");
    }

    if (!shippingDetails.address2.trim()) {
      return toast.error("Address Line 2 is required");
    }

    if (!shippingDetails.country.trim()) {
      return toast.error("Shipping country is required");
    }

    if (!shippingDetails.consent) {
      return toast.error("You must accept Privacy & Cookie Policy");
    }

    const saved = localStorage.getItem("launchPassData");
    if (!saved) {
      return toast.error("Session expired. Please restart checkout.");
    }

    const parsed = JSON.parse(saved);

    const finalData = {
      personalDetails: parsed.personalDetails,
      shippingDetails
    };

    localStorage.setItem(
      "launchPassData",
      JSON.stringify(finalData)
    );

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/checkout/create`,
        finalData
      );

      if (res.data?.url) {

        toast.success("Redirecting to secure payment page...");

        localStorage.removeItem("launchPassData");

        setTimeout(() => {
          window.location.href = res.data.url;
        }, 1200);
      }

    } catch (err) {
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  // =========================
  // SCROLL FUNCTION
  // =========================
  const scrollToForm = () => {
    if (stepSectionRef.current) {
      stepSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className='w-full h-full bg-black'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-[url('./assets/Launchbg.svg')] bg-cover w-full h-screen">
        <div className='flex flex-col pt-70 pl-20 gap-5'>
          <span className="text-white text-7xl font-extralight font-aspekta">
            Get your <br/>
          </span>
          <span className="text-red-600 text-7xl font-extralight font-aspekta">
            Launch Pass
          </span>
          <button
            onClick={scrollToForm}
            className='w-28 h-10 border border-red-600 font-aspekta text-white'
          >
            Buy Pass
          </button>
        </div>
      </div>

      {/* STEP SECTION */}
      <div
        ref={stepSectionRef}  // ✅ Attach ref here
        className="bg-[url('./assets/Launchbg2.svg')] bg-cover bg-center w-full h-full mb-20"
      >
        <div className="flex flex-col gap-4 items-center pt-20 justify-center h-full">
          <div className="font-aspekta font-extralight text-red-600 text-7xl">
            Step - {step}
          </div>

          <div className="flex justify-center items-center w-auto">

            {step === 1 && (
              <LaunchPass1
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                nextStep={handleNextStep}
              />
            )}

            {step === 2 && (
              <LaunchPass2
                shippingDetails={shippingDetails}
                setShippingDetails={setShippingDetails}
                handleCheckout={handleCheckout}
                subtotal={SUBTOTAL}
                shipping={SHIPPING}
                total={TOTAL}
              />
            )}

          </div>
        </div>
      </div>
      <img src={FooterLine} alt="FooterLine" className="w-full" />
      <Footer />
    </div>
  )
}

export default LaunchPass;