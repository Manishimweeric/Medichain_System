import Hero from '../Pages/Components/Hero';
import Features from '../Pages/Components/Features';
import Services from '../Pages/Components/Services';
import AboutUs from '../Pages/Components/AboutUs';
import TeamMembers from '../Pages/Components/TeamMembers';
import ContactUs from '../Pages/Components/ContactUs';
import ScrollToTop from '../Pages/Components/ScrollToTop';


const Home = () => {
  return (
    <div className='mt-22'>      
      <Hero />
      <AboutUs />
      <Features />
      <Services />
      <TeamMembers />
      <ContactUs />
      <ScrollToTop />      
      
    </div>
  );
};

export default Home;
