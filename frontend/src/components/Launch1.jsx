import React from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Launch1 = ({ data, setData, onNext }) => {
  return (
    <div className="w-full flex justify-center">
      {/* Card */}
      <div className="
        w-full
        sm:w-96
        mt-10
        bg-zinc-300/0
        rounded-2xl
        border border-white/70
        flex justify-center
      ">
        <div className="flex flex-col gap-4 items-center w-full px-4 sm:px-0">

          {/* Name */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="mt-5 text-white text-sm sm:text-xl font-inter font-extralight">
              Your Name*
            </div>
            <input
              type="text"
              placeholder="John Doe"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Email ID*
            </div>
            <input
              type="email"
              placeholder="email@gmail.com"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
              required
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Contact Number*
            </div>

            {/* Wrapper controls responsiveness */}
            <div className="w-full sm:w-[320px]">
              <PhoneInput
                country={"sg"}
                value={data.contact_number}
                onChange={value => setData({ ...data, contact_number: value })}
                containerStyle={{ width: "100%" }}
                inputStyle={{
                  width: "100%",               // 📱 responsive
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
                  marginTop: "4px",
                  zIndex: 50,
                }}
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Country of Origin*
            </div>
            <input
              type="text"
              placeholder="Singapore"
              value={data.country}
              onChange={e => setData({ ...data, country: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
              required
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="text-white text-sm sm:text-xl font-inter font-extralight">
              Company/Institution Name
            </div>
            <input
              type="text"
              placeholder="OculloSpace PTE LTD"
              value={data.company}
              onChange={e => setData({ ...data, company: e.target.value })}
              className="
                px-4 py-3
                w-full sm:w-80
                h-10
                bg-zinc-300/0
                rounded-md
                text-white
                font-inter font-extralight
                border border-white/70
                placeholder-white/30
              "
            />
          </div>

          {/* Button */}
          <button
            className="
              w-28 h-10
              mt-5 mb-5
              bg-zinc-300/0
              rounded-md
              border border-white/70
              text-white
              cursor-pointer
            "
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
