import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const EventCard = ({ day, month, title }) => (
    <div className="bg-gradient-to-r from-orange-200 to-orange-600 rounded-lg p-6 flex items-center justify-between hover:bg-orange-400 transition-colors cursor-pointer">
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
            },
            {
                day: "07",
                month: "MAY",
                title: "Prevents Overlapping by Adding mt-32 to Content"
            },
            {
                day: "20",
                month: "MAY",
                title: "A  Fixes the Navbar Below the Banner"
            },          
    ];  
    return (
        <div className='bg-gray-100 mt-28 md:mt-32'>
            <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Stay updated with our upcoming events, bringing communities together for impactful experiences and meaningful connections.
                    </p>
                </div>
            </div>

            <div className="px-8 py-12 bg-gray-100">
                <h2 className="text-2xl md:ml-36 font-bold text-gray-900 mb-6">
                    Recent Events Last Month
                </h2>                
                <div className="flex flex-wrap justify-center gap-7">
                    {carouselItems.map((item, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <img src={item.image} alt={item.title} className="rounded-lg h-64 w-full object-cover" />
                                <h3 className="text-lg font-bold mt-4">{item.title}</h3>
                                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                                <button 
                                    className="mt-4 text-orange-600 font-semibold hover:underline"
                                    onClick={() => window.location.href = `/EventDetails`}
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
            <section className="md:px-8 md:py-12 md:mt-0 mt-14 md:max-w-[85%] mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Up Camming Events in Next Month</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <EventCard key={index} {...event} />
                            ))}
                        </div>
            </section>           
        </div>
    );
};

export default Events;
