import React from "react";
import { Shield, Eye, Users, Handshake, Bird, Globe } from 'lucide-react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Events from "../Pages/Components/Events";
import Blogs from "../Pages/Components/blogs";
import Feature from "../Pages/Components/Feature";
import { Link } from 'react-router-dom';

export default function HomePage() {
  const StatCard = ({ icon: Icon, number, label }) => (
    <div className="bg-teal-50 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <Icon className="text-orange-600" size={32} />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{number}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );

  const stats = [
    { icon: Users, number: "4597+", label: "People Rised" },
    { icon: Handshake, number: "8945+", label: "Volunteer" },
    { icon: Bird, number: "10M+", label: "Poor People Saved" },
    { icon: Globe, number: "100+", label: "Country Member" }
  ];


  const objectives = [
    "Creating Sustainable Opportunities Together",
    "Collaborate In A Supportive Environment",
    "Fostering Resilience And Independence",
    "Creating Sustainable Opportunities Together",
    "Financial Education For Growth"
  ];


  const progressData = [
    { label: "Donations", percentage: 75 },
    { label: "Trainings", percentage: 90 }
  ];



  return (
    <div className="font-sans">
      <div className="relative">
        <img src="/images/image2.avif" alt="Community" className="w-full h-[700px] object-cover brightness-75"/>
        <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-700 to-transparent text-white p-8 w-1/2 h-full flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold leading-tight">Empowering Communities, Transforming Lives</h2>
          <p className="mt-2 text-lg">
            We believe in transforming lives through financial empowerment.
          </p>
          <div className="mt-6 space-x-4">
            <button 
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300">
              Donate Now
            </button>
            <Link 
            to="/about"
            className="bg-white text-orange-600 px-6 py-3 rounded-full border-2 border-orange-600 hover:bg-orange-100 transition duration-300"
          >
            Know About Us
          </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {[
          { icon: "💚", label: "Featured" },
          { icon: "📈", label: "Financial Empowerment" },
          { icon: "👨‍🏫", label: "Training" },
          { icon: "🤝", label: "Support" }
        ].map((feature, index) => (
          <div key={index} className="bg-orange-50 border border-orange-200 p-6 rounded-lg shadow-lg flex items-center justify-center space-x-4 hover:scale-105 transition duration-300">
            <span className="text-orange-500 text-3xl">{feature.icon}</span>
            <span className="font-semibold">{feature.label}</span>
          </div>
        ))}
      </div>

      <Feature />


      {/* About Us Section */}
      <div className="container mt-48 mx-auto px-4 py-16" id="aboutus">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Images Section */}
          <div className="relative w-full lg:w-1/2">
            {/* Top Image */}
            <div className="bg-teal-50 p-4 rounded-lg mb-4 lg:absolute lg:top-0 lg:right-0 lg:w-3/4">
              <img
                src="/images/image2.avif"
                alt="Hands joined together"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Bottom Image */}
            <div className="bg-teal-50 p-4 rounded-lg lg:absolute lg:bottom-0 lg:left-0 lg:w-3/4">
              <img
                src="/images/images.webp"
                alt="Community member smiling"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-2">About Us</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Your Support Is Really Powerful.
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                At The Hands Of Change, We Empower Individuals And Communities Through Financial Education, Savings Groups, And Support. Driven By The Belief That Everyone Deserves Financial Independence, We Create Pathways For Growth, Resilience, And Lasting Impact.
              </p>

              <button className="bg-orange-600  text-white px-6 py-3 rounded hover:bg-orange-600 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-60 px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2">


            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Let Us Come Together<br />
              To Make A Difference
            </h1>

            <p className="text-gray-600 mb-8">
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
              Nonumy Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
              Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo.
            </p>

            {/* Mission and Vision Cards */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="bg-teal-50 p-6 rounded-lg flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-orange-600" size={24} />
                  <span className="font-semibold text-orange-600">Our Mission</span>
                </div>
                <p className="text-gray-600">
                  Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                </p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="text-orange-600" size={24} />
                  <span className="font-semibold text-orange-600">Our Vision</span>
                </div>
                <p className="text-gray-600">
                  Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                </p>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-orange-600">{item.percentage}%</span>
                  </div>
                  <div className="h-3 bg-teal-50 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-orange-200 to-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-teal-50 p-4 w-[80%] rounded-lg">
              <img
                src="/images/event2.webp"
                alt="People working together"
                className="w-full h-96 rounded-lg"
              />
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg absolute -bottom-8 -right-0">
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-700 rounded-full"></span>
                    <span className="text-sm text-gray-800">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Blogs />

      {/* Fun Facts Section */}  
      <section className="container mx-auto px-4 py-16">       
        <div className="mb-16">
          <p className="text-gray-600 mb-2">Our Fun Facts</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            We Believe That We Can Save<br />
            More Lifes With You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Donation Section */}
        <div className="relative">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <img
              src="images/image2.avif"
              alt="Donation banner"
              className="w-full h-full  object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl">
                Make a difference today. Donate now and help empower communities to build brighter futures
              </h2>
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition-colors">
                Donate
              </button>
            </div>
          </div>
        </div>
      </section>

      <Events />

    </div>
  );
}
