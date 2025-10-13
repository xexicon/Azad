import React from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Launch1 = ({ data, setData, onNext }) => {
  return (
    <div className='w-full h-full'>
      <div className="w-96 mt-10 bg-zinc-300/0 rounded-2xl border border-white/70 justify-start items-center">
        <div className='flex flex-col gap-4 justify-start items-center'>
          <div className='flex flex-col gap-2'>
            <div className='mt-5 text-white text-xl leading-relaxed font-inter font-extralight'>Your Name*</div>
            <input
              type='text'
              placeholder='John Doe'
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              className='px-4 py-3 w-80 h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-white text-xl leading-relaxed tracking-tight font-inter font-extralight'>Email ID*</div>
            <input
              type='email'
              placeholder='email@gmail.com'
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              className='px-4 py-3 w-80 h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-white text-xl leading-relaxed tracking-tight font-inter font-extralight'>Contact Number*</div>
            <PhoneInput
              country={"sg"}
              value={data.contact_number}
              onChange={value => setData({ ...data, contact_number: value })}
              inputStyle={{
                width: "320px",
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
                borderRadius: "8px",
              }}
              dropdownStyle={{
                backgroundColor: "rgba(4,4,4,1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                top: "100%",
                left: "0",
                marginTop: "4px",
                zIndex: 50,
              }}
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-white text-xl leading-relaxed tracking-tight font-inter font-extralight'>Country of Origin*</div>
            <input
              type='text'
              placeholder='Singapore'
              value={data.country}
              onChange={e => setData({ ...data, country: e.target.value })}
              className='px-4 py-3 w-80 h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-white text-xl leading-relaxed tracking-tight font-inter font-extralight'>Company/Institution Name</div>
            <input
              type='text'
              placeholder='OculloSpace PTE LTD'
              value={data.company}
              onChange={e => setData({ ...data, company: e.target.value })}
              className='px-4 py-3 w-80 h-10 bg-zinc-300/0 rounded-md text-white font-inter font-extralight border border-white/70 placeholder-white/30'
            />
          </div>

          <button
            className='w-28 h-10 mt-5 mb-5 items-center bg-zinc-300/0 rounded-md border border-white/70 text-white cursor-pointer'
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Launch1;
