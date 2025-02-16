import React from 'react';
import { Eye } from 'lucide-react';

const Vision = () => {
    return (
        <div className="bg-gray-100 mt-28 md:mt-32">
            <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Our Vision</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Satisfying socio-economic development of the poorest in the community.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            A Future of Growth and Opportunity
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Our vision is to create sustainable socio-economic development, ensuring that even the most underprivileged members of our community have access to opportunities that foster resilience and independence.
                        </p>
                        <div className="bg-teal-50 p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <Eye className="text-orange-600" size={24} />
                                <span className="font-semibold text-orange-600">Our Vision</span>
                            </div>
                            <p className="text-gray-600">
                                Satisfying socio-economic development of the poorest in the community.
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        <div className="bg-teal-50 p-4 w-[80%] rounded-lg">
                            <img
                                src="/images/vision.jpeg"
                                alt="People working together"
                                className="w-full h-96 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vision;
