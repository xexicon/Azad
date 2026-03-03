import React, { useState } from 'react'
import Pass from '../assets/Pass.svg'

const LaunchPass2 = ({
  shippingDetails,
  setShippingDetails,
  handleCheckout,
  subtotal,
  shipping,
  total
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitClick = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      await handleCheckout()
    } finally {
      // If redirect happens this won't execute
      // If API fails, button becomes active again
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      {/* Card */}
      <div
        className="
          w-210
          mt-10
          bg-zinc-300/0
          rounded-2xl
          border border-white/70
          flex justify-center
        "
      >
        <div className='p-10 flex flex-col gap-2'>
          <div className='font-aspekta text-white text-xl font-light'>
            Shipping Details
          </div>

          <div className='flex flex-row gap-25'>
            <div className='flex flex-col gap-2'>

              {/* Postal Code */}
              <div className="flex flex-col gap-2 w-full auto">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Postal Code*
                </div>
                <input
                  type="text"
                  placeholder="0000111"
                  value={shippingDetails.postalCode}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, postalCode: e.target.value })
                  }
                  className="
                    px-4 py-3
                    w-80
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

              {/* Address Line 1 */}
              <div className="flex flex-col gap-2 w-full auto">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Address Line 1*
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingDetails.address1}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address1: e.target.value })
                  }
                  className="
                    px-4 py-3
                    w-80
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

              {/* Address Line 2 */}
              <div className="flex flex-col gap-2 w-full auto">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Address Line 2*
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingDetails.address2}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address2: e.target.value })
                  }
                  className="
                    px-4 py-3
                    w-80
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

              {/* Country */}
              <div className="flex flex-col gap-2 w-full auto">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Country of Origin*
                </div>
                <input
                  type="text"
                  placeholder="Singapore"
                  value={shippingDetails.country}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, country: e.target.value })
                  }
                  className="
                    px-4 py-3
                    w-80
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

              {/* Company */}
              <div className="flex flex-col gap-2 w-full auto">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Company/Institution Name
                </div>
                <input
                  type="text"
                  placeholder="OculloSpace PTE LTD"
                  value={shippingDetails.companyOrInstitution}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      companyOrInstitution: e.target.value
                    })
                  }
                  className="
                    px-4 py-3
                    w-80
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

              {/* Submit Button */}
              <div className='flex justify-center'>
                <button
                  disabled={isSubmitting}
                  className="
                    w-28 h-10
                    mt-5 mb-5
                    bg-zinc-300/0
                    rounded-md
                    border border-white/70
                    text-white
                    cursor-pointer
                  "
                  onClick={handleSubmitClick}
                >
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
              </div>

            </div>

            {/* Summary Section */}
            <div className='flex flex-col gap-5'>
              <div className='text-white font-aspekta text-right'>
                Summary
              </div>

              <div className='flex flex-row gap-15'>
                <div className='flex flex-col gap-10'>
                  <div className='text-left text-white text-xl font-extralight font-aspekta'>
                    Item
                  </div>
                  <div className='text-left text-white text-xl font-extralight font-aspekta'>
                    Subtotal
                  </div>
                  <div className='text-left text-white text-xl font-extralight font-aspekta'>
                    Shipping
                  </div>
                  <div className='text-left text-white text-xl font-extralight font-aspekta'>
                    Total
                  </div>
                </div>

                <div className='flex flex-col gap-10'>
                  <div className='flex flex-row'>
                    <img src={Pass} alt="summary" className='w-12 h-4'/>
                    <span className='text-white text-xl font-extralight'>
                      1x Launch Pass
                    </span>
                  </div>
                  <div className='text-white text-xl font-light'>
                    {subtotal.toFixed(2)} USD
                  </div>
                  <div className='text-white text-xl font-extralight'>
                    {shipping.toFixed(2)} USD
                  </div>
                  <div className='text-white text-xl font-light'>
                    {total.toFixed(2)} USD
                  </div>
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer max-w-xl">
                <input
                  type="checkbox"
                  className="hidden peer"
                  checked={shippingDetails.consent}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      consent: e.target.checked,
                    })
                  }
                />

                <div className="mt-1 w-5 h-5 
                  bg-black 
                  border border-gray-500
                  rounded-[30%]
                  flex items-center justify-center
                  peer-checked:bg-red-600
                  peer-checked:border-red-600
                  transition-all duration-200"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <span className="text-sm text-gray-300 leading-relaxed">
                  I have read and consent to{" "}
                  <span className="text-white font-medium">Azad</span>{" "}
                  processing my information in accordance with the{" "}
                  <a href="https://ocullospace.com/privacy" className="text-white underline">
                    Privacy Statement
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white underline">
                    Cookie Policy
                  </a>.
                </span>
              </label>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaunchPass2