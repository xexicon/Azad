import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { FiDownload } from "react-icons/fi"
import { FaWhatsapp, FaLinkedin, FaShareAlt } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

import FooterLine from '../assets/FooterLine.svg'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const LaunchSuccess = () => {

  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [loading, setLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {

    if (!sessionId) {
      setError("Invalid payment session.")
      setLoading(false)
      return
    }

    const fetchTicket = async () => {
      try {

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/checkout/session/${sessionId}`
        )

        if (!res.data || res.data.status !== "paid") {
          setError("Payment not confirmed.")
          return
        }

        setPdfUrl(res.data.pdfUrl)

        localStorage.removeItem("launchPassData")

      } catch (err) {
        setError("Unable to fetch ticket.")
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()

  }, [sessionId])


  const shareText = "I just got my Launch Pass 🚀"

  const whatsappShare = pdfUrl
    ? `https://wa.me/?text=${encodeURIComponent(shareText + " " + pdfUrl)}`
    : ""

  const twitterShare = pdfUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pdfUrl)}`
    : ""

  const linkedinShare = pdfUrl
    ? `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText + " " + pdfUrl)}`
    : ""


  const copyLink = () => {
    if (pdfUrl) {
      navigator.clipboard.writeText(pdfUrl)
      alert("Link copied to clipboard!")
    }
  }


  const downloadPdf = async () => {
  try {
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error("Failed to download PDF")
    }

    const blob = await response.blob()

    // create a file with explicit pdf extension
    const file = new File([blob], "LaunchPass.pdf", {
      type: "application/pdf"
    })

    const url = window.URL.createObjectURL(file)

    const link = document.createElement("a")
    link.href = url
    link.download = file.name

    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)

  } catch (err) {
    console.error("Download failed:", err)
    alert("Unable to download ticket.")
  }
}


  return (
    <div className='w-full h-full bg-black'>
      <Navbar />

      <div className='pt-18'>
        <div className="bg-[url('./assets/LaunchSuccessbg.png')] w-full min-h-[855px] bg-cover bg-center">

          <div className='flex flex-col items-center lg:items-end pt-24 px-4 pb-10 gap-6 lg:pt-40 lg:px-0'>

            <div className='flex flex-col text-center lg:text-left lg:pr-30'>
              <span className='text-white text-4xl sm:text-5xl lg:text-7xl font-extralight font-aspekta leading-tight'>
                Launch Pass
              </span>

              <span className='text-white text-4xl sm:text-5xl lg:text-7xl font-extralight font-aspekta leading-tight'>
                Generated Yayyy....
              </span>
            </div>


            <div className='w-full max-w-[780px] lg:max-w-none lg:w-auto lg:pr-50 flex flex-col items-center lg:items-end gap-2'>

              {loading && (
                <div className='text-white text-lg sm:text-xl text-center lg:text-right'>
                  Verifying payment & loading ticket...
                </div>
              )}

              {!loading && error && (
                <div className='text-red-500 text-lg sm:text-xl text-center lg:text-right'>
                  {error}
                </div>
              )}

              {!loading && pdfUrl && !error && (
                <>

                  <div className='bg-transparent w-full flex justify-center lg:justify-end'>
                    <Document file={pdfUrl}>
                      <Page
                        pageNumber={1}
                        width={typeof window !== "undefined" && window.innerWidth < 1024 ? Math.min(window.innerWidth - 32, 750) : 750}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                    </Document>
                  </div>


                  <div className='flex items-center justify-center lg:justify-end gap-6 text-xl sm:text-2xl lg:text-base'>

                    <button
                      onClick={downloadPdf}
                      className='text-white hover:text-gray-300 transition'
                      title="Download Ticket"
                    >
                      <FiDownload />
                    </button>


                    <a
                      href={whatsappShare}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-green-500 hover:text-green-400 transition'
                      title="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>


                    <a
                      href={linkedinShare}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-600 hover:text-blue-500 transition'
                      title="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </a>


                    <a
                      href={twitterShare}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-sky-500 hover:text-sky-400 transition'
                      title="Share on X"
                    >
                      <FaXTwitter />
                    </a>


                    <button
                      onClick={copyLink}
                      className='text-red-500 hover:text-red-400 transition'
                      title="Copy Share Link"
                    >
                      <FaShareAlt />
                    </button>

                  </div>

                </>
              )}

            </div>

          </div>

        </div>
      </div>

      <img src={FooterLine} alt="FooterLine" className="w-full" />
      <Footer />
    </div>
  )
}

export default LaunchSuccess
