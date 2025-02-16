import React from 'react';
import { Shield, Eye } from 'lucide-react';

const Aboutus = () => {
    
    const objectives = [
        "Creating Sustainable Opportunities Together",
        "Collaborate In A Supportive Environment",
        "Fostering Resilience And Independence",
        "Creating Sustainable Opportunities Together",
        "Financial Education For Growth"
    ];


    const progressData = [
        { label: "Donations", percentage: 75 },
        { label: "Trainings", percentage: 90 }
    ];


    return (
        <div className="bg-gray-100 mt-28 md:mt-32  ">
            <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">About Us</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                        Discover our commitment to making a lasting impact, empowering individuals and communities.
                    </p>
                </div>
            </div>

            <div className="container md:mt-48 mx-auto px-4 py-16" id="aboutus">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="relative w-full lg:w-1/2">
                        <div className="bg-teal-50 p-4 rounded-lg mb-4 lg:absolute lg:top-0 lg:right-0 lg:w-3/4">
                            <img
                                src="/images/image2.avif"
                                alt="Hands joined together"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg lg:absolute lg:bottom-0 lg:left-0 lg:w-3/4">
                            <img
                                src="/images/images.webp"
                                alt="Community member smiling"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 lg:pl-8">
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-600 mb-2">About Us</p>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Your Support Is Really Powerful.
                                </h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                            GIfT is a private organization registered by Rwanda Development Board as a Community Benefit Company. Created in 2024, it is located in Kicukiro District, Kanombe Sector. Business oriented, its benefits are used for the community development.
                            </p>                            
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto md:mt-60 px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Let Us Come Together<br />
                            To Make A Difference
                        </h1>

                        <p className="text-gray-600 mb-8">
                        GIfT is a private organization registered by Rwanda Development Board as a Community Benefit Company. Created in 2024, it is located in Kicukiro District, Kanombe Sector. Business oriented, its benefits are used for the community development.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="bg-teal-50 p-6 rounded-lg flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="text-orange-600" size={24} />
                                <span className="font-semibold text-orange-600">Our Mission</span>
                            </div>
                            <p className="text-gray-600">
                            Lifting people from poverty through trainings on savings and loans, entrepreneurship, gender equality and provision of seed money.
                            </p>
                            </div>

                            <div className="bg-teal-50 p-6 rounded-lg flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <Eye className="text-orange-600" size={24} />
                                <span className="font-semibold text-orange-600">Our Vision</span>
                            </div>
                            <p className="text-gray-600">
                                Satisfying socio-economic development of the poorest in the community.
                            </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {progressData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                <span className="font-medium">{item.label}</span>
                                <span className="text-orange-600">{item.percentage}%</span>
                                </div>
                                <div className="h-3 bg-teal-50 rounded-full">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-200 to-orange-600 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%` }}
                                />
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>


                    <div className="w-full lg:w-1/2 relative">
                        <div className="bg-teal-50 p-4 w-[80%] rounded-lg">
                            <img
                                src="/images/event2.webp"
                                alt="People working together"
                                className="w-full h-96 rounded-lg"
                            />
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg absolute -bottom-8 -right-0">
                            <ul className="space-y-3">
                                {objectives.map((objective, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                                        <span className="text-sm text-gray-800">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );


};

export default Aboutus;