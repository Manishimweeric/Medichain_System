import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about-us' },
    { title: 'Features', href: '/blog' },
  ];

  const services = [
    { title: 'Contact Us', href: '/contact-us' },
    { title: 'Our Services', href: '/services' }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/' },
    { icon: Instagram, href: 'https://instagram.com/' },
    { icon: FaPinterest, href: 'https://pinterest.com/' },
    { icon: Youtube, href: 'https://youtube.com/' }
  ];

  return (
    <footer className="bg-green-800 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-4xl font-bold text-white mb-2">MedicHAIN</h3>
            <p className="text-lg text-gray-300 mb-4">
              Connecting Healthcare Supply Chains for Better Outcomes
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {service.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-gray-300">123 Health St. Springfield, IL 62701</p>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Newsletter</h4>
            <div className="flex flex-wrap sm:flex-nowrap w-full gap-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full sm:flex-1 px-4 py-2 rounded text-gray-800 focus:outline-none border border-gray-400"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-2 opacity-80 text-gray-300">
              Your email is safe with us; we don't spam.
            </p>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-xl font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={20} className="text-green-600" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-300">&copy; 2025 MedicHAIN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
