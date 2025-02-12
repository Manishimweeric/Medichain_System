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

const EventDetails = () => {

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
        <div className="bg-orange-100 mt-32">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-orange-200 to-orange-600  py-20">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Annual Gala Fundraising Event
                </h1>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>Kigali,kanombe Kigali Gala</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>April 13, 2022 8:30 AM</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white py-16">
                <div className="mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        An Evening of Hope and Impact
                    </h2>
                    <p className="text-gray-600 max-w-6xl mx-auto text-center mb-12">
                        Join us for our Annual Gala Fundraising Event, a night dedicated to celebrating the lives we've touched and
                        the communities we continue to empower. This special evening brings together supporters, partners, and
                        changemakers who share our vision of financial independence and sustainable growth for all
                    </p>
                    <div className="mb-12">
                        <img
                            src="/images/event4.jpg"
                            alt="Hands holding coins"
                            className="rounded-lg mx-auto max-w-3xl w-full"
                        />
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What to expect</h3>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Inspiring Stories: Hear firsthand accounts from individuals whose lives have been transformed through our
                                programs.
                            </p>
                            <p>
                                Live Entertainment: Enjoy performances by local artists and cultural showcases that highlight the spirit of
                                our community.
                            </p>
                        </div>
                    </div>

                    <section className="max-w-full mx-auto px-4 py-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Events in Next Month</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {events.map((event, index) => (
                                <EventCard key={index} {...event} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;