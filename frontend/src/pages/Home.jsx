import Rocket from '../assets/Rocket.png';
import Navbar from '../components/Navbar';
import VerticalBeforeAfter from '../components/VerticalBeforeAfter';
import { useScrollFlags } from '../hooks/useScrollFlags';
import { useRef, useEffect } from 'react';
import Sarawak from '../assets/Sarawak.svg';
import { GoDotFill } from "react-icons/go";
import Engine from '../assets/Engine.svg';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useLocation } from "react-router-dom";
import missionprofile from '../assets/missionprofile.svg';
import Video from '../assets/launchVideo.mp4';
import VertPh from '../components/VerticalRocketPhone';

const Home = () => {

  const rocketRef = useRef(null);
  const { inView, fullyOut, past, before, ratio } = useScrollFlags(rocketRef);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="w-full h-full bg-[rgba(4,4,4,1)] flex flex-col gap-5">
      <Navbar />

      {/* ================= HERO ================= */}
      <div className="sm:pl-25 sm:py-28 p-8 pt-25 flex flex-col-reverse sm:flex-row justify-between items-center gap-10">

        <div className="flex flex-col gap-10 items-center sm:items-start text-center sm:text-left">
          <div className="sm:w-[883px] z-10">
            <span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
              A
            </span>
            <span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
              ZAD Sounding Rocket – Redefining Hybrid Propulsion
            </span>
          </div>

          <a
            href="/book-launch"
            className="flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans"
          >
            Book Launch
          </a>
        </div>

        <img
          src={Rocket}
          alt="Rocket"
          className="w-full max-w-[280px] sm:max-w-[420px] xl:max-w-[520px] object-contain shrink-0"
        />
      </div>

      {/* ================= AZAD INTRO ================= */}
      <div
        id="Azad"
        className="w-full flex flex-col items-center justify-center py-10 sm:py-13 gap-8 px-6 sm:px-0 text-center"
      >
        <div>
          <span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
            Singapore-Sparked,
          </span>
          <span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
            {" "}Malaysia
          </span>
          <span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
            -Launched
          </span>
        </div>

        <div className="sm:w-[800px] text-white sm:text-xl text-sm font-extralight font-inter leading-relaxed tracking-tight">
          AZAD is a prototype sounding rocket powered by a hybrid engine using HDPE + LOX.
          Engineered for safety, stability, and cost-effectiveness, AZAD represents the first
          step toward scalable and sustainable suborbital missions.
        </div>
      </div>

      {/* ================= TECHNICAL OVERVIEW ================= */}
      {/* Desktop Version */ }
      <div className="hidden lg:block">
      <div className="w-full flex flex-col sm:flex-row items-start justify-center gap-12 py-5">

        {/* LEFT TEXT */}
        <div
          className={`flex flex-col font-aspekta sm:gap-15 gap-5 py-10
          items-center sm:items-start
          text-center sm:text-left
          ${inView ? 'sm:sticky sm:top-16' : ''}`}
        >
          <div className="w-80 text-white sm:text-7xl text-3xl font-extralight tracking-wider">
            Technical <br /> Overview
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">PAYLOAD MASS</div>
            <div className="text-white sm:text-6xl text-2xl font-light">10 kg</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">SIZE OF THE PAYLOAD BAY</div>
            <div className="text-white sm:text-6xl text-2xl font-light">350 × 400 mm</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX APOGEE</div>
            <div className="text-white sm:text-6xl text-2xl font-light">15 Km</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX ACCELERATION</div>
            <div className="text-white sm:text-6xl text-2xl font-light">3.3 G</div>
          </div>
        </div>

        {/* ROCKET */}
        <div ref={rocketRef} className="px-6 sm:px-35 flex justify-center">
          <VerticalBeforeAfter className="hidden lg:block"/>
        </div>

        {/* RIGHT TEXT */}
        <div
          className={`flex flex-col font-aspekta sm:gap-12 gap-4 py-10
          items-center sm:items-start
          text-center sm:text-left
          ${inView ? 'sm:sticky sm:top-16' : ''}`}
        >
          <div>
            <div className="text-white sm:text-xl text-sm uppercase">LENGTH</div>
            <div className="text-white sm:text-6xl text-2xl font-light">7400 mm</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">TOTAL MASS</div>
            <div className="text-white sm:text-6xl text-2xl font-light">590 kg</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">PROPELLANT COMBINATION</div>
            <div className="text-white sm:text-6xl text-2xl font-light">HDPE + LOX</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">NOMINAL THRUST</div>
            <div className="text-white sm:text-6xl text-2xl font-light">20 kN (2T)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">DIAMETER</div>
            <div className="text-white sm:text-6xl text-2xl font-light">454 mm</div>
          </div>
        </div>
      </div>
      </div>
      {/* Mobile Version */ }
      <div className='block lg:hidden'>
        <div className='flex flex-row items-center justify-center gap-5'>
        <div className='flex items-center justify-center'>
          <VertPh />
          </div>
        <div className='flex flex-col items-center justify-center text-center'>
            <div className="flex flex-col font-aspekta gap-5">
          <div className="text-white sm:text-7xl text-3xl font-extralight tracking-wider">
            Technical <br /> Overview
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">PAYLOAD MASS</div>
            <div className="text-white sm:text-6xl text-2xl font-light">10 kg</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">SIZE OF THE PAYLOAD BAY</div>
            <div className="text-white sm:text-6xl text-2xl font-light">350 × 400 mm</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX APOGEE</div>
            <div className="text-white sm:text-6xl text-2xl font-light">15 Km</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX ACCELERATION</div>
            <div className="text-white sm:text-6xl text-2xl font-light">3.3 G</div>
          </div>
          <div>
            <div className="text-white sm:text-xl text-sm uppercase">LENGTH</div>
            <div className="text-white sm:text-6xl text-2xl font-light">7400 mm</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">TOTAL MASS</div>
            <div className="text-white sm:text-6xl text-2xl font-light">590 kg</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">PROPELLANT COMBINATION</div>
            <div className="text-white sm:text-6xl text-2xl font-light">HDPE + LOX</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">NOMINAL THRUST</div>
            <div className="text-white sm:text-6xl text-2xl font-light">20 kN (2T)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">DIAMETER</div>
            <div className="text-white sm:text-6xl text-2xl font-light">454 mm</div>
          </div>
        </div>
        </div>
        </div>
      </div>

      {/* ================= LAUNCH SITE ================= */}
      <div
        id="launchloc"
        className="w-full flex flex-col items-center py-16 sm:py-24 gap-5 font-aspekta px-6 sm:px-25 text-center sm:text-left"
      >
        <div>
          <span className="text-white sm:text-7xl text-3xl font-extralight">Our </span>
          <span className="text-red-600 sm:text-7xl text-3xl font-extralight">Launch</span>
          <span className="text-white sm:text-7xl text-3xl font-extralight"> Site</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 items-center">
          <div className="flex flex-col sm:gap-15 gap-20 py-10 items-center sm:items-start">

            <div>
              <div className="text-white sm:text-5xl text-2xl uppercase whitespace-nowrap">
                LAUNCH WINDOW
              </div>
              <div className="text-white sm:text-xl text-sm">March 2026</div>
            </div>

            <div>
              <div className="text-white sm:text-5xl text-2xl uppercase">PURPOSE</div>
              <div className="text-white sm:text-xl text-sm">
                20kN Hybrid Rocket Engine Test
              </div>
            </div>

            <div>
              <div className="text-white sm:text-5xl text-2xl uppercase">LAUNCH TYPE</div>
              <div className="text-white sm:text-xl text-sm">Mobile Launch Rail</div>
            </div>

            <div>
              <div className="text-white sm:text-5xl text-2xl uppercase">LAUNCH SITE</div>
              <div className="text-white sm:text-xl text-sm">Sarawak</div>
            </div>
          </div>

          <div className="relative max-w-4xl w-full overflow-hidden rounded-xl">
            <img src={Sarawak} alt="Launch Location" className="w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute z-20 left-[30%] top-[23%] sm:left-[44.5%] sm:top-[37.5%] text-white text-lg font-light font-aspekta leading-snug tracking-tight flex flex-col items-end gap-1">
              <span className="text-sm text-center">
                55 min from <br /> Bintulu Airport <br /> and Miri Airport
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ENGINE ================= */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start px-6 sm:px-25 py-12 gap-10 text-center sm:text-right">
        <img src={Engine} alt="Engine" />

        <div className="flex flex-col gap-5 items-center sm:items-end">
          <div>
            <span className="text-red-600 sm:text-7xl text-3xl">HDPE + LOX</span>
            <span className="text-white sm:text-7xl text-3xl"> Engine</span>
          </div>

          <div className="sm:w-[625px] text-white sm:text-xl text-xs">
            AZAD’s hybrid engine combines liquid oxygen (LOX) and high-density polyethylene (HDPE)
            to achieve efficient, controllable combustion with improved safety and handling.
          </div>

          <div className="flex flex-col gap-10 mt-10 items-center sm:items-end">
            <div>
              <div className="text-white sm:text-5xl text-xl">HDPE + LOX</div>
              <div className="text-white sm:text-xl text-xs">PROPELLANT</div>
            </div>

            <div>
              <div className="text-white sm:text-5xl text-xl">20kN (2T)</div>
              <div className="text-white sm:text-xl text-xs">NOMINAL THRUST</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MISSION PROFILE ================= */}
      <div className="w-full flex flex-col items-center py-16 sm:py-24 gap-24 text-center px-6">
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-red-600 sm:text-7xl text-3xl">Mission</span>
            <span className="text-white sm:text-7xl text-3xl"> Profile</span>
          </div>

          <div className="text-white sm:text-xl text-xs">
            Azad’s flight profile showing the complete trajectory and recovery sequence of its mission.
          </div>
        </div>

        <img src={missionprofile} alt="Mission Profile" className="w-full max-w-5xl" />
      </div>

      {/* ================= VIDEO ================= */}
      <video className="w-full object-cover" autoPlay loop muted>
        <source src={Video} type="video/mp4" />
      </video>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
