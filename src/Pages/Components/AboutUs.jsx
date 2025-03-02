import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
                <p className="text-lg text-center mb-12">
                    At MedicHAIN, we are dedicated to revolutionizing healthcare supply chain management by providing innovative solutions that enhance efficiency, transparency, and collaboration among all stakeholders.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <i className="fas fa-bullseye text-green-700  text-4xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-gray-600">
                            To improve healthcare outcomes by optimizing the supply chain and ensuring that essential medical supplies are available when and where they are needed.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <i className="fas fa-handshake text-green-700 text-4xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                        <p className="text-gray-600">
                            Integrity, Collaboration, Innovation, and Accountability are the core values that guide our operations and decision-making processes.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <i className="fas fa-cogs text-green-700  text-4xl mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">What We Do</h3>
                        <p className="text-gray-600">
                            We provide a comprehensive platform that facilitates automated procurement, real-time inventory monitoring, and supplier management to streamline healthcare supply chains.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold mb-4">Join Us in Transforming Healthcare</h3>
                    <p className="text-lg mb-4">
                        We believe in the power of technology to transform healthcare delivery. Together, we can make a significant impact on the lives of patients and healthcare providers.
                    </p>
                    <Link to="/" className="bg-green-700  text-white py-2 px-4 rounded hover:bg-green-700  transition-colors">
                    <i className="fas fa-user-plus mr-1"></i> 
                        Join Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
