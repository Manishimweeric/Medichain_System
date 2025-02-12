import React from 'react';
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Feature = () => {
    const carouselItems = [
        {
          image: "/images/event1.jpg",
          title: "You're invited to Hands of Change 2025",
          description:
            "Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders, and visionaries to talk about the future of customer engagement.",
        },
        {
          image: "/images/event2.webp",
          title: "You're invited to Hands of Change 2025",
          description:
            "Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders, and visionaries to talk about the future of customer engagement.",
        },
        {
          image: "/images/event3.webp",
          title: "You're invited to Hands of Change 2025",
          description:
            "Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders, and visionaries to talk about the future of customer engagement.",
        },
        {
          image: "/images/image2.avif",
          title: "You're invited to Hands of Change 2025",
          description:
            "Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders, and visionaries to talk about the future of customer engagement.",
        },
        {
          image: "/images/images.webp",
          title: "You're invited to Hands of Change 2025",
          description:
            "Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders, and visionaries to talk about the future of customer engagement.",
        },
      ];
    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
      };



 return (

    <div className="px-8 py-12 bg-gray-100">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="px-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img src={item.image} alt={item.title} className="rounded-lg h-64 w-full object-cover" />
                <h3 className="text-lg font-bold mt-4">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>


 );   
};

export default Feature;