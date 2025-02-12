import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import Footer from './Pages/Components/Footer';
import Navbar  from "./Pages/Components/navbar";
import Contactus from './Pages/Contactus';
import EventDetails from './Pages/EventDetail';
import MoreBlogs from './Pages/MoreBlogs';
import Gallery from './Pages/Gallery';
import Aboutus from './Pages/aboutus';
import Donate from './Pages/Donate';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar/> <HomePage /> <Footer /> </>} />
        <Route path="/contactus" element={<><Navbar/> <Contactus /> <Footer /> </>} />
        <Route path="/EventDetails" element={<><Navbar/> <EventDetails /> <Footer /> </>} />
        <Route path="/MoreBlogs" element={<><Navbar/> <MoreBlogs /> <Footer /> </>} />
        <Route path="/Gallery" element={<><Navbar/> <Gallery /> <Footer /> </>} />
        <Route path="/Aboutus" element={<><Navbar/> <Aboutus /> <Footer /> </>} />
        <Route path="/Donate" element={<><Navbar/> <Donate /> <Footer /> </>} />
      </Routes>      
    </Router>
  );
}

export default App;
