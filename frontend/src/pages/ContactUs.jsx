import React, { useState } from 'react';
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
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/contact`,
        { name, email, contact_number, company }
      );

      setName('');
      setEmail('');
      setContact_number('');
      setCompany('');
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred on the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-[rgba(4,4,4,1)]">
      <ToastContainer theme="dark" />
      <Navbar />

      {/* ================= HEADING ================= */}
      <div className="mb-40 flex flex-col justify-center items-center px-6 sm:px-0">
        <div className="flex flex-row gap-4 mb-5">
          <div className="mt-20 font-aspekta font-extralight text-red-600 text-3xl sm:text-7xl">
            Contact
          </div>
          <div className="mt-20 font-aspekta font-extralight text-white text-3xl sm:text-7xl">
            Us
          </div>
        </div>

        {/* ================= FORM CARD ================= */}
        <div className="w-full sm:w-[837px] bg-zinc-300/0 rounded-2xl border border-white/70">
          <div className="flex flex-col gap-4 items-center px-4 sm:px-0">

            {/* NAME */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
                Your Name*
              </div>
              <input
                type="text"
                className="px-4 py-3 w-full sm:w-[730.40px] h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
                Email ID*
              </div>
              <input
                type="text"
                className="px-4 py-3 w-full sm:w-[730.40px] h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* CONTACT NUMBER (RESPONSIVE FIX) */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
                Contact Number*
              </div>

              {/* Wrapper controls responsiveness */}
              <div className="w-full sm:w-[730.40px]">
                <PhoneInput
                  country={"sg"}
                  value={contact_number}
                  onChange={(value) => setContact_number(value)}
                  containerStyle={{
                    width: "100%",
                  }}
                  inputStyle={{
                    width: "100%",          // ✅ responsive
                    height: "40px",
                    backgroundColor: "rgba(4,4,4,1)",
                    color: "white",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.7)",
                  }}
                  buttonStyle={{
                    borderRight: "none",
                    borderColor: "white",
                    borderRadius: "8px",
                  }}
                  dropdownStyle={{
                    backgroundColor: "rgba(4,4,4,1)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    zIndex: 50,
                  }}
                  required
                />
              </div>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
                Company/Institution Name
              </div>
              <textarea
                className="px-4 pt-3 pb-4 w-full sm:w-[730.40px] h-30 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30"
                placeholder="Type your Message here"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* SUBMIT */}
            <button
              className="w-28 h-10 mt-5 mb-5 font-inter font-extralight text-xl bg-zinc-300/0 rounded-md border border-white/70 text-white disabled:opacity-50"
              disabled={loading}
              onClick={submitContactForm}
            >
              {loading ? "Sending…" : "Submit"}
            </button>

          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default ContactUs;
