import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLaunch from './pages/bookLaunch';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/book-launch" element={<BookLaunch />} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
