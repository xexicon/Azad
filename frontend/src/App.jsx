import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLaunch from './pages/bookLaunch';
import ScrollToTop from './hooks/ScrollToTop';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import LaunchPass from './pages/LaunchPass';
import LaunchSuccess from './pages/LaunchSuccess';
import LaunchFail from './pages/LaunchFail';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/book-launch" element={<BookLaunch />} />
      <Route path="/launch-pass" element={<LaunchPass />} />
      <Route path="/ticket-success" element={<LaunchSuccess />} />
      <Route path="/ticket-cancelled" element={<LaunchFail />} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
