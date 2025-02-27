import React from 'react';

const Hero = () => {
    return (
        <section className="relative bg-gray-100 text-center py-52 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url("images/md2.jpg")', // Update with your image path
                }}
            ></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 text-white">
                <h2 className="text-4xl font-bold mb-4">Revolutionizing Medical Supply Chain Management</h2>
                <p className="text-lg mb-8">Optimize procurement, inventory management, and supplier relationships.</p>
                <a href="#features" className="bg-green-700  text-white py-2 px-4 rounded hover:bg-green-700  transition">
                <i className="fas fa-user-plus mr-1"></i> 
                    Join Us
                </a>
            </div>
        </section>
    );
};

export default Hero;
