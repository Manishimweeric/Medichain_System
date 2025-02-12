import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Contactus = () => {
  return (
    <div className="bg-orange-100 mt-32 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <p className="uppercase tracking-wider mb-4">Contact Us</p>
            <h2 className="text-4xl font-bold mb-6">We'd love to hear from you</h2>
            <p className="text-orange-600 mb-8">
              Have any question in mind or want to enquire? Please feel free to
              contact us through the form or the following details.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Let's talk!</h3>
                <p>+250078877777</p>
                <p>HandsofChange@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Head office</h3>
                <p>Kgl 123k, Kigali,</p>
                <p>Rwanda</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Branch Office</h3>
                <p>Kimihurura, kabuye,kanombe</p>
              </div>

              <div className="flex gap-4">
                <Facebook className="w-6 h-6 cursor-pointer hover:text-purple-200" />
                <Twitter className="w-6 h-6 cursor-pointer hover:text-purple-200" />
                <Linkedin className="w-6 h-6 cursor-pointer hover:text-purple-200" />
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Me A Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Fast name</label>
                  <input
                    type="text"
                    placeholder="Your"
                    className="w-full p-3 rounded bg-teal-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 rounded bg-teal-50 text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Mail</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded bg-teal-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+880"
                    className="w-full p-3 rounded bg-teal-50 text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  placeholder="Type Your Message Here..."
                  rows={6}
                  className="w-full p-3 rounded bg-teal-50 text-gray-800"
                />
              </div>

              <button className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-96 w-full mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.1!3d-1.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTQnMDAuMCJTIDMwwrAwNicwMC4wIkU!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Contactus;