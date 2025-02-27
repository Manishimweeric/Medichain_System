import React from 'react';
import { CheckCircle } from 'lucide-react'; // Import an icon from lucide-react or use any other icon library

const featuresList = [
    'Automated Procurement Requests',
    'Real-Time Inventory Monitoring',
    'Supplier Management',
    'Order Management and Tracking',
    'Data Visualization and Reporting Tools',
    'Role-Based Access Control (RBAC)',
    'Incident Reporting and Resolution',
    'Automated Alerts and Notifications',
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuresList.map((feature, index) => (
                    <div key={index} className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="text-green-500 h-6 w-6" />
                            <h3 className="font-semibold text-xl ml-2">{feature}</h3>
                        </div>
                        <p className="text-gray-600">Description of {feature.toLowerCase()}.</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
