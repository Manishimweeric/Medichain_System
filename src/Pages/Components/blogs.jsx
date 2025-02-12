import React from 'react';

const EventCard = ({ image, category, title, description }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <img 
      src={image} 
      alt={title}
      className="w-full h-56  object-cover"
    />
    <div className="p-6">
      <p className="text-orange-700 font-medium mb-2">{category}</p>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
        Read More
      </button>
    </div>
  </div>
);

const Blogs = () => {
    const events = [
        {
          image: "/images/images.webp",
          category: "Savings Group Workshop",
          title: "Practical Steps To Achieve Financial Security",
          description: "Learn Proven Saving Techniques And Start Your Journey Toward Financial Freedom By Joining A Supportive Savings Group."
        },
        {
          image: "/images/event3.webp",
          category: "Community Empowerment Day",
          title: "A Celebration Of Growth And Community Spirit",
          description: "Participate In Inspiring Activities, Share Success Stories, And Connect With Others Committed To Making A Difference"
        },
        {
          image: "/images/event4.jpg",
          category: "Savings Group Workshop",
          title: "Practical Steps To Achieve Financial Security",
          description: "Learn Proven Saving Techniques And Start Your Journey Toward Financial Freedom By Joining A Supportive Savings Group."
        },
        {
          image: "/images/event4.jpg",
          category: "Savings Group Workshop",
          title: "Practical Steps To Achieve Financial Security",
          description: "Learn Proven Saving Techniques And Start Your Journey Toward Financial Freedom By Joining A Supportive Savings Group."
        }
      ];

  return (
   
    <section className="container mx-auto px-4 py-16">
      <p className="text-gray-600 mb-2">Latest Events</p>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Find Our Last Blogs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;