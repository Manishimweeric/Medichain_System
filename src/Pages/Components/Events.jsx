import React from 'react';
import { ArrowRight } from 'lucide-react';

const EventCard = ({ day, month, title }) => (
  <div className="bg-gradient-to-r from-orange-200 to-orange-600 rounded-lg p-6 flex items-center justify-between hover:bg-purple-800 transition-colors cursor-pointer">
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <div className="text-4xl font-bold">{day}</div>
        <div className="uppercase text-sm">{month}</div>
      </div>
      <div className="space-y-1">
        <div className="text-sm uppercase tracking-wider opacity-80">Next Events</div>
        <div className="text-xl font-medium">{title}</div>
      </div>
    </div>
    <div className="bg-white rounded-full p-2">
      <ArrowRight className="text-purple-700 w-5 h-5" />
    </div>
  </div>
);

const Events = () => {
  const events = [
    {
      day: "13",
      month: "APR",
      title: "Annual Fundraiser Gala"
    },
    {
      day: "25",
      month: "APR",
      title: "A celebration of growth and community spirit"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
};

export default Events;