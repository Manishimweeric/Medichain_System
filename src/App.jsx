import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import Footer from './Pages/Components/Footer';
import Navbar  from "./Pages/Components/navbar";
import Login  from "./Pages/User/Login";
// import Contactus from './Pages/Contactus';
// import EventDetails from './Pages/EventDetail';
// import MoreBlogs from './Pages/MoreBlogs';
// import Gallery from './Pages/Gallery';
// import About from './Pages/About';
// import Donate from './Pages/Donate';
// import Videos from './Pages/Videos';
// import Vision from './Pages/Vision';
// import Mission from './Pages/Mission';
// import Events from './Pages/Events';
// import BlogDetail from './Pages/BlogDetail';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Navbar /><HomePage /><Footer/> </>} />
      <Route path="/login" element={<><Navbar /><Login /><Footer/> </>} />
      </Routes>      
    </Router>
  );
}
export default App;


