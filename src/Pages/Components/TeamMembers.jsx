import React from 'react';

const teamMembers = [
    {
        name: 'Dr. John Smith',
        title: 'Chief Executive Officer',
        image: 'images/John.jpeg', // Update with your image path
        bio: 'Dr. Smith has over 20 years of experience in the healthcare industry, specializing in supply chain management.',
    },
    {
        name: 'Jane Doe',
        title: 'Operations Manager',
        image: 'images/pf2.jpeg', // Update with your image path
        bio: 'Jane oversees daily operations and ensures our services run smoothly.',
    },
    {
        name: 'Mark Johnson',
        title: 'Technology Officer',
        image: 'images/pf3.jpeg', // Update with your image path
        bio: 'Mark is responsible for the technical strategy and implementation of innovative solutions.',
    },
];

const AboutUs = () => {
    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Our Team Members </h2>
                <p className="text-lg text-center mb-12">
                    MedicHAIN is committed to revolutionizing healthcare supply chain management through innovative solutions and technology.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
                            <img src={member.image} alt={member.name} className="w-full h-60 object-cover rounded-t-lg mb-4" />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.title}</p>
                            <p className="text-gray-500 mt-2">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
