import React from 'react';
import { Shield } from 'lucide-react';

const Mission = () => {
    return (
        <div className="bg-gray-100 mt-28 md:mt-32">
            <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Our Mission</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Empowering individuals through education, entrepreneurship, and community development.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Lifting People from Poverty
                        </h2>
                        <p className="text-gray-600 mb-8">
                            GIfT is a private organization registered by Rwanda Development Board as a Community Benefit Company.
                            Created in 2024, it is located in Kicukiro District, Kanombe Sector. Business-oriented, its benefits
                            are used for community development.
                        </p>
                        <div className="bg-teal-50 p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="text-orange-600" size={24} />
                                <span className="font-semibold text-orange-600">Our Mission</span>
                            </div>
                            <p className="text-gray-600">
                                Lifting people from poverty through training on savings and loans, entrepreneurship, gender equality,
                                and provision of seed money.
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="bg-teal-50 p-4 w-[80%] rounded-lg">
                            <img
                                src="/images/mission.jpg"
                                alt="Mission in action"
                                className="w-full h-96 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;
