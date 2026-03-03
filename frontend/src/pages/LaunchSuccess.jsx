import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { FiDownload } from "react-icons/fi"

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


  return (
    <div className='w-full h-full bg-black'>
      <Navbar />

      <div className="bg-[url('./assets/LaunchSuccessbg.png')] w-full h-screen bg-cover">

        <div className='flex flex-col items-end pt-40 gap-6'>

          {/* Title */}
          <div className='flex flex-col text-left'>
            <span className='text-white text-7xl font-extralight font-aspekta'>
              Launch Pass
            </span>
            <span className='text-white text-7xl font-extralight font-aspekta'>
              Generated Yayyy....
            </span>
          </div>

          {/* PDF Section */}
          <div className='pt-20 pr-120 flex flex-col items-end gap-4'>

            {loading && (
              <div className='text-white text-xl'>
                Verifying payment & loading ticket...
              </div>
            )}

            {!loading && error && (
              <div className='text-red-500 text-xl'>
                {error}
              </div>
            )}

            {!loading && pdfUrl && !error && (
              <>
                {/* PDF WITHOUT WHITE BORDER */}
                <div className='bg-transparent'>
                  <Document file={pdfUrl}>
                    <Page
                      pageNumber={1}
                      width={500}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                </div>

                {/* Download Icon Only */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='bg-black/70 p-3 rounded-full hover:bg-red-600 transition'
                  title="Download Ticket"
                >
                  <FiDownload className='text-white text-xl' />
                </a>
              </>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LaunchSuccess