import Navbar from '../components/Navbar';
import CA from '../assets/C&A.svg';
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
import Video from '../assets/launchVideo2.MOV';
import VertPh from '../components/VerticalRocketPhone';
import RocketSkel from '../assets/RocketSkel.svg';

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
    <div className="w-full h-full bg-black flex flex-col gap-5">
      <Navbar />
      <div className='pt-30'>
      {/* ================= HERO ================= */}
      <div className="bg-none sm:bg-[url('/src/assets/HeroBg.svg')] sm:bg-cover sm:bg-center px-6 sm:pl-25 sm:pr-10 py-14 sm:py-28 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-5">

        <div className="flex flex-col gap-8 sm:gap-10 items-center sm:items-start text-center sm:text-left">
          <div className="w-full sm:w-[883px] z-10">
            <span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
              Project <span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">
              Karman-X1:<br/>
            </span> Dual-Stage<br/> Rocket
            </span>
          </div>
          <div className='inline-flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-5'>
          <a
            href="/book-launch"
            className="flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans"
          >
            Book Launch
          </a>
          <a
            href="/launch-pass"
            className="flex justify-center items-center w-36 h-10 text-white bg-[#F00000] border border-[#F00000] font-sans"
          >
            Launch Pass
          </a>
          </div>
        </div>
      </div>
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

        <div className="sm:w-[1100px] text-white sm:text-xl text-sm font-extralight font-inter leading-relaxed tracking-tight">
          Project Karman-X1 is an experimental high-altitude vehicle designed for high-velocity atmospheric piercing. By utilizing a heavy-duty fiberglass airframe and a unique twin-engine sustainer, the rocket is engineered to withstand Mach 1.5+ flight regimes before a controlled ballistic impact in open water.

        </div>
      </div>

      {/* ================= TECHNICAL OVERVIEW ================= */}
      {/* Desktop Version */ }
      <div className="hidden lg:block">
      <div className="w-full max-w-[1500px] mx-auto flex flex-row items-start justify-center py-5 font-aspekta font-extralight px-8 xl:px-15">

        {/* LEFT TEXT */}
        <div
          className={`flex flex-col font-aspekta sm:gap-15 gap-5 py-10
          items-center sm:items-start
          text-center sm:text-left
          ${inView ? 'sm:sticky sm:top-16' : ''}`}
        >
          <div className="w-80 text-white text-7xl font-extralight tracking-wider">
            Technical <br /> Overview
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX VELOCITY</div>
            <div className="text-white sm:text-6xl text-2xl font-light">Mach 1.5 - 1.8</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">BOOSTER MOTOR</div>
            <div className="text-white sm:text-6xl text-2xl leading-normal font-light">N1000W (98mm)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">MAX APOGEE</div>
            <div className="text-white sm:text-6xl text-2xl leading-normal font-light">10,000m (32,808 ft)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">SUSTAINER MOTORS</div>
            <div className="text-white sm:text-6xl text-2xl font-light leading-normal">Twin-Engine <br/> Cluster (2x [Insert <br/>Motor Class, e.g., <br/>K550s])</div>
          </div>
        </div>

        {/* ROCKET */}
        <div ref={rocketRef} className="px-2 flex justify-center">
          <img src={RocketSkel} />
        </div>

        {/* RIGHT TEXT */}
        <div
          className={`flex flex-col font-aspekta sm:gap-12 gap-4 py-10
          items-center sm:items-end
          text-center sm:text-right
          ${inView ? 'sm:sticky sm:top-16' : ''}`}
        >
          <div>
            <div className="text-white sm:text-xl text-sm uppercase">LENGTH</div>
            <div className="text-white sm:text-6xl text-2xl font-light">4.0 Meters (13.1 ft)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">TOTAL MASS</div>
            <div className="text-white sm:text-6xl text-2xl font-light">590 kg</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">AIRFRAME MATERIAL</div>
            <div className="text-white sm:text-6xl text-2xl leading-normal font-light">High-Temp Filament-<br/>Wound Fiberglass</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">NOMINAL THRUST</div>
            <div className="text-white sm:text-6xl text-2xl font-light">20 kN (2T)</div>
          </div>

          <div>
            <div className="text-white sm:text-xl text-sm uppercase">RECOVERY STRATEGY</div>
            <div className="text-white sm:text-6xl text-2xl leading-normal font-light">High-Velocity <br/>Sea Impact </div>
          </div>
        </div>
      </div>
      </div>
      {/* Mobile Version */ }
      <div className='block lg:hidden px-4 sm:px-6 max-w-4xl mx-auto'>
        <div className='mb-6 text-white text-2xl sm:text-4xl font-extralight tracking-wider font-aspekta text-left'>
          Technical Overview
        </div>

        <div className='flex items-start justify-center gap-5 sm:gap-7'>
          <div className='flex-shrink-0 w-[28%] sm:w-[24%] pt-1'>
            <VertPh />
          </div>

          <div className='w-[72%] sm:w-[76%] flex flex-col text-left'>
            <div className="flex flex-col font-aspekta gap-5 sm:gap-6">
              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">MAX VELOCITY</div>
                <div className="text-white text-sm sm:text-xl font-light">Mach 1.5 - 1.8</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">BOOSTER MOTOR</div>
                <div className="text-white text-sm sm:text-xl font-light">N1000W (98mm)</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">MAX APOGEE</div>
                <div className="text-white text-sm sm:text-xl font-light">10,000m (32,808 ft)</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">SUSTAINER MOTORS</div>
                <div className="text-white text-sm sm:text-xl font-light leading-snug">Twin-Engine Cluster</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">LENGTH</div>
                <div className="text-white text-sm sm:text-xl font-light">4.0 Meters (13.1 ft)</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">TOTAL MASS</div>
                <div className="text-white text-sm sm:text-xl font-light">590 kg</div>
              </div>

              <div>
                <div className="text-white text-[10px] sm:text-sm uppercase">NOMINAL THRUST</div>
                <div className="text-white text-sm sm:text-xl font-light">20 kN (2T)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LAUNCH SITE ================= */}
      <div
        id="launchloc"
        className="w-full flex flex-col items-center py-16 sm:py-24 gap-5 font-aspekta px-6 sm:px-25 text-center sm:text-left font-extralight"
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
              <div className="text-white sm:text-xl text-sm">July 2026</div>
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
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start px-6 sm:px-25 py-12 gap-10 text-center sm:text-right font-aspekta font-extralight">
        <img src={Engine} alt="Engine" className='w-full max-w-md sm:max-w-none' />

        <div className="flex flex-col gap-5 items-center sm:items-end">
          <div>
            <span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta">Propulsion:</span>
            <span className="text-white sm:text-7xl text-3xl font-aspekta font-extralight"> The 1+2 <br/>Configuration</span>
          </div>

          <div className="sm:w-[625px] text-white sm:text-xl text-xs">
            This vehicle utilizes a "heavy-start" booster followed by a high-thrust twin-cluster sustainer.

          </div>

          <div className="flex flex-col gap-10 mt-10 items-center sm:items-end">
            <div>
              <div className="text-white sm:text-5xl text-xl">The Booster:</div>
              <div className="text-white sm:text-xl text-xs">Provides a 13.5-second long-burn "White Lightning" push to clear the dense lower atmosphere.</div>
            </div>

            <div>
              <div className="text-white sm:text-5xl text-xl">The Sustainer (Twin Cluster): </div>
              <div className="text-white sm:text-xl text-xs">Ignited at altitude via an onboard flight computer. The dual-motor configuration provides a massive spike in thrust-to-weight ratio to push through the transonic barrier and reach the 10km target.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Construction & Aerodynamics ================= */}
      <div className="w-full flex flex-col-reverse lg:flex-row justify-end items-center lg:items-stretch gap-8 lg:gap-0">
            <div className="flex flex-col gap-5 justify-center items-start text-left px-6 sm:px-10 lg:px-25 py-12 font-aspekta font-extralight">
          <div className='flex flex-col'>
            <span className="text-white text-3xl sm:text-5xl lg:text-7xl font-aspekta font-extralight"> Construction &</span>
            <span className="text-red-600 text-3xl sm:text-5xl lg:text-7xl font-extralight font-aspekta">Aerodynamics</span>
          </div>
          
            
          <div className="flex flex-col gap-10 mt-10 items-start">
          <div>
              <div className="text-white text-xl sm:text-3xl lg:text-5xl">Fiberglass Mix Carbon fiber Resilience:</div>
              <div className="text-white text-sm sm:text-lg lg:text-xl">Unlike carbon fiber, our filament-wound fiberglass provides superior RF transparency for<br/> onboard telemetry and higher impact resistance for the marine landing.</div>
            </div>
            <div>
              <div className="text-white text-xl sm:text-3xl lg:text-5xl">Supersonic Stability:</div>
              <div className="text-white text-sm sm:text-lg lg:text-xl">To prevent fin flutter at Mach 1.5, the rocket utilizes G10 fiberglass fins with a<br/> "beveled" leading edge, securely mounted with internal tip-to-tip reinforcements.</div>
            </div>

            <div>
              <div className="text-white text-xl sm:text-3xl lg:text-5xl">Sea Impact Design:</div>
              <div className="text-white text-sm sm:text-lg lg:text-xl">The nose cone and forward sections are pressure-sealed to ensure the vehicle<br/> remains buoyant for recovery after the ballistic descent.</div>
            </div>
          </div>
          </div>
            <div className='justify-end w-full lg:w-auto'>
          <div className='w-full h-full'>
          <img src={CA} alt="C&A" className='w-full max-w-2xl mx-auto lg:mx-0' />
          </div>
          </div>
      </div>

      {/* ================= MISSION PROFILE ================= */}
      <div className="w-full flex flex-col items-center py-16 sm:py-24 gap-10 sm:gap-24 text-center px-6 sm:px-20 lg:px-70">
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-red-600 text-3xl sm:text-5xl lg:text-7xl font-aspekta font-extralight">Mission</span>
            <span className="text-white text-3xl sm:text-5xl lg:text-7xl font-aspekta font-extralight"> Profile</span>
          </div>

          <div className="text-white text-sm sm:text-base lg:text-xl font-extralight font-aspekta">
            Project Karman-X1 is an experimental high-altitude vehicle designed for high-velocity atmospheric piercing. By utilizing a heavy-duty fiberglass airframe and a unique twin-engine sustainer, the rocket is engineered to withstand Mach 1.5+ flight regimes before a controlled ballistic impact in open water.

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
