import React from 'react';
import { Twitter, Instagram, Youtube } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';


const Footer = () => {
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/Aboutus' },
    { title: 'Blog Post', href: '/Blogs' },
    { title: 'Photo Gallery', href: '/Gallery' },
    { title: 'Events', href: '/EventDetails' }
  ];

  const services = [
    { title: 'Contact Us', href: '/contactus' },
    { title: 'Our Services', href: '#' }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: FaPinterest, href: '#' },
    { icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-r from-orange-200 to-orange-600 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-script text-2xl mb-2">Hands Of Change</h3>
            <p className="text-lg mb-4">Empowering Communities Together</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Link</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="hover:underline">
                    {service.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
<div className="flex flex-wrap sm:flex-nowrap w-full gap-2">
  <input
    type="email"
    placeholder="Enter Your Email"
    className="w-full sm:flex-1 px-4 py-2 rounded text-gray-800 focus:outline-none border border-gray-300"
  />
  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors w-full sm:w-auto">
    Subscribe
  </button>
</div>
<p className="text-sm mt-2 opacity-80">
  Your email is safe with us, we don't spam.
</p>


            

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="text-lg font-semibold mb-3">Follow Me</h5>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-white p-2 rounded-full  hover:bg-gray-100 transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-500 text-center">
          <p>Hands of Change</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;