import React from 'react';

const servicesData = [
    {
        title: 'Medical Supplies',
        description: 'High-quality medical supplies for hospitals and clinics.',
        image: 'images/medical-supplies.jpg', // Update with your image path
    },
    {
        title: 'Pharmaceuticals',
        description: 'Wide range of pharmaceuticals to meet patient needs.',
        image: 'images/pharmaceuticals.jpeg', // Update with your image path
    },
    {
        title: 'Diagnostic Equipment',
        description: 'State-of-the-art diagnostic equipment for accurate results.',
        image: 'images/diagnostic-equipment.jpg', // Update with your image path
    },
    {
        title: 'Personal Protective Equipment',
        description: 'Essential PPE for healthcare professionals.',
        image: 'images/ppe.jpg', // Update with your image path
    },
];

const Services = () => {
    return (
        <div className="py-16 px-4 bg-gray-100">
            <h2 className="text-center text-4xl font-bold mb-12">Medical Services We Provide</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {servicesData.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-700">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
