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
        <div className="bg-gray-100 mt-32  ">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-200 to-orange-600 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">About Us</h1>
                    <p className="text-xl text-center max-w-3xl mx-auto">
                    Discover our commitment to making a lasting impact, empowering individuals and communities.

                    </p>
                </div>
            </div>

            {/* About Us Section */}
            <div className="container mt-48 mx-auto px-4 py-16" id="aboutus">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Images Section */}
                    <div className="relative w-full lg:w-1/2">
                        {/* Top Image */}
                        <div className="bg-teal-50 p-4 rounded-lg mb-4 lg:absolute lg:top-0 lg:right-0 lg:w-3/4">
                            <img
                                src="/images/image2.avif"
                                alt="Hands joined together"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Bottom Image */}
                        <div className="bg-teal-50 p-4 rounded-lg lg:absolute lg:bottom-0 lg:left-0 lg:w-3/4">
                            <img
                                src="/images/images.webp"
                                alt="Community member smiling"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2 lg:pl-8">
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-600 mb-2">About Us</p>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Your Support Is Really Powerful.
                                </h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                At The Hands Of Change, We Empower Individuals And Communities Through Financial Education, Savings Groups, And Support. Driven By The Belief That Everyone Deserves Financial Independence, We Create Pathways For Growth, Resilience, And Lasting Impact.
                            </p>

                            <button className="bg-orange-600  text-white px-6 py-3 rounded hover:bg-orange-600 transition-colors">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto mt-60 px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content Section */}
                    <div className="w-full lg:w-1/2">


                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Let Us Come Together<br />
                            To Make A Difference
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                            Nonumy Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
                            Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo.
                        </p>

                        {/* Mission and Vision Cards */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="bg-teal-50 p-6 rounded-lg flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Shield className="text-purple-700" size={24} />
                                    <span className="font-semibold text-purple-700">Our Mission</span>
                                </div>
                                <p className="text-gray-600">
                                    Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                                </p>
                            </div>

                            <div className="bg-teal-50 p-6 rounded-lg flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Eye className="text-purple-700" size={24} />
                                    <span className="font-semibold text-purple-700">Our Vision</span>
                                </div>
                                <p className="text-gray-600">
                                    Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
                                </p>
                            </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="space-y-4">
                            {progressData.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="text-purple-700">{item.percentage}%</span>
                                    </div>
                                    <div className="h-3 bg-teal-50 rounded-full">
                                        <div
                                            className="h-full bg-purple-700 rounded-full transition-all duration-500"
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
                                        <span className="w-2 h-2 bg-purple-700 rounded-full"></span>
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