import React, { useState } from 'react'
import Pass from '../assets/Pass.svg'

const LaunchPass2 = ({
  shippingDetails,
  setShippingDetails,
  handleCheckout,
  handleBack,
  subtotal,
  shipping,
  total
}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitClick = async () => {
    if (isSubmitting) return

    // ✅ Prevent checkout if consent not given
    if (!shippingDetails.consent) {
      alert("Please accept the Privacy Policy and Cookie Policy before proceeding.")
      return
    }

    setIsSubmitting(true)

    try {
      await handleCheckout()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
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

            {/* LEFT SECTION */}
            <div className='flex flex-col gap-2'>

              {/* Postal Code */}
              <div className="flex flex-col gap-2">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Postal Code*
                </div>
                <input
                  type="text"
                  value={shippingDetails.postalCode}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, postalCode: e.target.value })
                  }
                  className="px-4 py-3 w-80 h-10 bg-transparent rounded-md text-white border border-white/70 placeholder-white/30"
                  placeholder="0000111"
                />
              </div>

              {/* Address Line 1 */}
              <div className="flex flex-col gap-2">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Address Line 1*
                </div>
                <input
                  type="text"
                  value={shippingDetails.address1}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address1: e.target.value })
                  }
                  className="px-4 py-3 w-80 h-10 bg-transparent rounded-md text-white border border-white/70 placeholder-white/30"
                  placeholder="Address"
                />
              </div>

              {/* Address Line 2 */}
              <div className="flex flex-col gap-2">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Address Line 2*
                </div>
                <input
                  type="text"
                  value={shippingDetails.address2}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address2: e.target.value })
                  }
                  className="px-4 py-3 w-80 h-10 bg-transparent rounded-md text-white border border-white/70 placeholder-white/30"
                  placeholder="Address"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-2">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Country of Origin*
                </div>
                <input
                  type="text"
                  value={shippingDetails.country}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, country: e.target.value })
                  }
                  className="px-4 py-3 w-80 h-10 bg-transparent rounded-md text-white border border-white/70 placeholder-white/30"
                  placeholder="Singapore"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <div className="mt-5 text-white text-xl font-inter font-extralight">
                  Company/Institution Name
                </div>
                <input
                  type="text"
                  value={shippingDetails.companyOrInstitution}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, companyOrInstitution: e.target.value })
                  }
                  className="px-4 py-3 w-80 h-10 bg-transparent rounded-md text-white border border-white/70 placeholder-white/30"
                  placeholder="OculloSpace PTE LTD"
                />
              </div>

              {/* Submit */}
              <div className='flex justify-center gap-5'>
  <button
    disabled={isSubmitting}
    onClick={handleBack}
    className="w-28 h-10 mt-5 mb-5 bg-transparent rounded-md border border-white/70 text-white"
  >
    Back
  </button>

  <button
    disabled={isSubmitting}
    onClick={handleSubmitClick}
    className="w-28 h-10 mt-5 mb-5 bg-transparent rounded-md border border-white/70 text-white"
  >
    {isSubmitting ? "Processing..." : "Submit"}
  </button>
</div>
            </div>

            {/* RIGHT SECTION */}
            <div className='flex flex-col gap-5'>
              <div className='text-white font-aspekta text-right'>
                Summary
              </div>

             <div className="w-full">
  <div className="grid grid-cols-[auto_1fr] w-full gap-y-10 items-start">

    {/* Item */}
    <div className="text-white text-xl font-aspekta font-extralight">
      Item
    </div>

    <div className="flex justify-end items-start gap-2">
      <img
        src={Pass}
        alt="summary"
        className="w-12 h-4 mt-1 flex-shrink-0"
      />

      <span className="text-white text-xl font-aspekta font-extralight leading-snug text-right">
        Business <br />
        Networking Pass x 1
      </span>
    </div>

    {/* Subtotal */}
    <div className="text-white text-xl font-aspekta font-extralight">
      Subtotal
    </div>

    <div className="text-white text-right text-xl font-aspekta font-light">
      {subtotal.toFixed(2)} USD
    </div>

    {/* Shipping */}
    <div className="text-white text-xl font-aspekta font-extralight">
      Shipping
    </div>

    <div className="text-white text-right text-xl font-aspekta font-light">
      {shipping.toFixed(2)} USD
    </div>

    {/* Total */}
    <div className="text-white text-xl font-aspekta font-extralight">
      Total
    </div>

    <div className="text-white text-right text-xl font-aspekta font-light">
      {total.toFixed(2)} USD
    </div>

  </div>
</div>

              {/* CONSENT CHECKBOX */}
              <label className="flex items-start gap-3 cursor-pointer max-w-xl">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={shippingDetails.consent || false}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      consent: e.target.checked,
                    })
                  }
                />

                <div
                  className={`
                    w-6 h-6
                    border border-gray-500
                    rounded-md
                    flex items-center justify-center
                    flex-shrink-0
                    transition-all duration-200
                    ${shippingDetails.consent ? "bg-red-600 border-red-600" : "bg-black"}
                  `}
                >
                  {shippingDetails.consent && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                <span className="text-sm text-gray-300 leading-relaxed">
                  I have read and consent to{" "}
                  <span className="text-white font-medium">Azad</span>{" "}
                  processing my information in accordance with the{" "}
                  <a
                    href="https://privacy.azadrocket.com/"
                    className="text-white underline"
                  >
                    Privacy Statement
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