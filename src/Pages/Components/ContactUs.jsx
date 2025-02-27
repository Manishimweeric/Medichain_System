import React from 'react';

const ContactUs = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
                <p className="text-lg text-center mb-12">
                    We’d love to hear from you! Reach out to us with any questions or inquiries.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-600 mb-4">
                            Feel free to contact us via the form below or through our social media channels.
                        </p>
                        <ul className="list-disc ml-5 mb-4">
                            <li>Email: info@medichain.com</li>
                            <li>Phone: +123 456 7890</li>
                            <li>Location: 123 Health St, Wellness City</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                        <p className="text-gray-600 mb-4">Stay connected with us on social media:</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                                <i className="fab fa-facebook-f"></i> Facebook
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                                <i className="fab fa-twitter"></i> Twitter
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-800">
                                <i className="fab fa-linkedin-in"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-8">
                    <h3 className="text-2xl font-semibold mb-4 text-center">Provide Your Information</h3>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition-colors"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
