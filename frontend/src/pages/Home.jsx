import Rocket from '../assets/Rocket.png'
import Navbar from '../components/Navbar';
import VerticalBeforeAfter from '../components/VerticalBeforeAfter';
import { useScrollFlags } from '../hooks/useScrollFlags';
import { useRef } from 'react';
import Japan from '../assets/Japan.svg';
import { GoDotFill } from "react-icons/go";
import Engine from '../assets/Engine.svg';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import missionprofile from '../assets/missionprofile.svg';
import Video from '../assets/launchVideo.mp4';

const Home = () => {

  const rocketRef = useRef(null);
  const { inView, fullyOut, past, before, ratio } = useScrollFlags(rocketRef);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const section = document.getElementById(location.state.scrollToSection);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className='w-full h-full bg-[rgba(4,4,4,1)] flex flex-col gap-5'>
      <Navbar />

      <div className='sm:pl-25 sm:py-28 p-8 flex flex-col sm:gap-10 gap-5 relative container'>
        <div className="justify-start sm:w-[883px] z-10"><span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">A</span><span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">ZAD Sounding Rocket – Redefining Hybrid Propulsion</span></div>
        <a href='/book-launch' className='flex justify-center items-center w-36 h-10 text-white border border-[#F00000] font-sans'>Book Launch</a>
        <img src={Rocket} alt="Rocket" className='sm:absolute sm:right-5 sm:mt-4' />
      </div>

      <div id='Azad' className='w-full flex flex-col items-center justify-center py-13 gap-8'>
        <div className="justify-start"><span className="text-white text-7xl font-extralight font-aspekta tracking-wider">Nippon-Sparked,</span><span class="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider"> Malaysia</span><span className="text-white sm:text-7xl text-3xl font-extralight font-['Aspekta'] tracking-wider">-Launched</span></div>
        <div className="sm:w-[800px] text-center justify-start text-white text-xl font-extralight font-inter leading-relaxed tracking-tight">AZAD is a prototype sounding rocket powered by a hybrid engine using HDPE + LOX. Engineered for safety, stability, and cost-effectiveness, AZAD represents the first step toward scalable and sustainable suborbital missions.</div>
      </div>

      {/* Rocket scroll section */}
      <div className='w-full flex flex-row items-start justify-center gap-8 py-5'>

        {/* texts */}
        <div className={`flex flex-col font-aspekta sm:gap-15 gap-5 py-10 ${inView ? 'sticky top-16' : ''}`}>

          <div className="w-80 justify-start text-white sm:text-7xl text-3xl font-extralight tracking-wider">Technical <br/>Overview</div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">PAYLOAD MASS</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">10 kg</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">SIZE OF THE PAYLOAD BAY</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">350*400 mm</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">MAX APOGEE</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">15 Km</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">MAX ACCELERATION</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">3.3 G</div>
          </div>

        </div>

        <div className='px-35' ref={rocketRef}>
          <VerticalBeforeAfter />
        </div>

        {/* texts */}
        <div className={`flex flex-col font-aspekta sm:gap-12 gap-4 sm:pt-21 py-10 ${inView ? 'sticky top-16' : ''}`}>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">LENGTH</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">7400mm</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">TOTAL MASS</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">590 kg</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">PROPELLANT COMBINATION</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">HDPE + LOX</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">NOMINAL THRUST</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">20 kN (2T)</div>
          </div>

          <div className='flex flex-col'>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight uppercase">DIAMETER</div>
            <div className="justify-start text-white sm:text-6xl text-2xl font-light leading-[69.81px] tracking-wide">454 mm</div>
          </div>

        </div>

      </div>

      {/* Launch area details */}
      <div className='w-full flex flex-col justify-center items-center py-24 gap-14 font-aspekta px-25'>

        <div id='launchloc' className=""><span className="text-white sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">Our </span><span class="text-red-600 text-7xl font-extralight font-aspekta tracking-wider">Launch</span><span className="text-white text-7xl font-extralight font-['Aspekta'] tracking-wider"> Site</span></div>

        <div className='flex flex-row justify-center items-center'>
          <div className='flex flex-col font-aspekta sm:gap-15 gap-5 py-10'>

          <div className='flex flex-col gap-2'>
            <div className="justify-start text-white sm:text-5xl text-2xl font-light leading-[57.12px] tracking-wide uppercase">LAUNCH WINDOW</div>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight">TBC</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className="justify-start text-white sm:text-5xl text-2xl font-light leading-[57.12px] tracking-wide uppercase">PURPOSE</div>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight">20kN Hybrid Rocket Engine Test</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className="justify-start text-white sm:text-5xl text-2xl font-light leading-[57.12px] tracking-wide uppercase">LAUNCH TYPE</div>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight">Sea Launch</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className="justify-start text-white sm:text-5xl text-2xl font-light leading-[57.12px] tracking-wide uppercase">LAUNCH SITE</div>
            <div className="justify-start text-white sm:text-xl text-sm font-light leading-relaxed tracking-tight">Kyushu, Japan</div>
          </div>

        </div>
        <div className="relative container flex max-w-4xl w-full overflow-hidden rounded-xl">
        <img src={Japan} alt="Launch Location" className="w-full h-auto object-cover" />

        {/* overlay: black → transparent, going to the top */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10" />

        {/* label above the overlay */}
        <div className="absolute z-20 left-[35.5%] top-[58.5%] text-white text-lg font-extralight font-aspekta leading-snug tracking-tight flex flex-col items-start gap-2">
          <GoDotFill />
          <span>55 min from<br />Fukuoka Airport</span>
        </div>
      </div>

        </div>

      </div>

      {/* Engine details */}
      <div className='w-full flex flex-row justify-between items-start px-25 py-12'>

        <div>
          <img src={Engine} alt="Engine" />
        </div>

        <div className='flex flex-col gap-5 justify-end items-end text-right'>
          <div className=""><span className="text-red-600 sm:text-7xl text-3xl font-extralight font-aspekta tracking-wider">HDPE + LOX</span><span className="text-white text-7xl font-extralight font-aspekta tracking-wider"> Engine</span></div>
          <div className="w-[625px] text-right text-white sm:text-xl text-xs font-extralight font-inter leading-relaxed tracking-tight">AZAD’s hybrid engine combines liquid oxygen (LOX) and high-density polyethylene (HDPE) to achieve efficient, controllable combustion with improved safety and handling.</div>
          <div className='flex flex-col mt-15 gap-10'>

            <div className='flex flex-col'>
              <div className="text-right justify-start text-white sm:text-5xl text-xl font-light font-aspekta leading-[57.12px] tracking-wide">HDPE + LOX</div>
              <div className="text-right justify-start text-white sm:text-xl text-xs font-light font-aspekta leading-relaxed tracking-tight">PROPELLENT</div>
            </div>

            <div className='flex flex-col'>
              <div className="text-right justify-start text-white sm:text-5xl text-xl font-light font-aspekta leading-[57.12px] tracking-wide">20kN (2T)</div>
              <div className="text-right justify-start text-white sm:text-xl text-xs font-light font-aspekta leading-relaxed tracking-tight">NOMINAL THRUST</div>
            </div>

          </div>
        </div>

      </div>

      {/* Mission profile */}
      <div className='w-full flex flex-col justify-center items-center py-24 gap-24 font-aspekta text-center'>
        <div className='flex flex-col gap-5'>

          <div className=""><span className="text-red-600 sm:text-7xl text-3xl font-extralight tracking-wider">Mission</span><span className="text-white sm:text-7xl text-3xl font-extralight tracking-wider"> Profile</span></div>
          <div className="text-right justify-start text-white sm:text-xl text-xs font-extralight font-inter leading-relaxed tracking-tight"> Azad’s flight profile showing the complete trajectory and recovery sequence of its mission.</div>
        </div>

        <img src={missionprofile} alt="Mission Profile" />
      </div>

      {/* video */}
      <div>
        <video className='w-full' controls={false} autoPlay loop muted>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* NewsLetter */}
      <NewsLetter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
