import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = ({ setCurrentSection }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'a.fwork66@gmail.com', href: 'mailto:a.fwork66@gmail.com' },
    { icon: Phone, text: '+201020647879', href: 'tel:+201020647879' },
    { icon: MapPin, text: 'Mansoura, Egypt', href: '#' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSection('home');
  };

  return (
    <footer className="bg-dark-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.02), rgba(245, 158, 11, 0.02))`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Crafting beautiful, functional, and user-centered digital experiences 
                  with passion and precision.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/20 transition-all duration-300"
                      title={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <motion.button
                        onClick={() => setCurrentSection(link.id)}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-left"
                      >
                        {link.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
                <ul className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <li key={index}>
                      <motion.a
                        href={info.href}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-300"
                      >
                        <info.icon size={16} />
                        <span className="text-sm">{info.text}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Newsletter/CTA */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Get notified about new projects and blog posts.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <div className="copyright-text flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-1 sm:space-y-0 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                <span>© {currentYear} Ahmed Farouk.</span>
                <div className="flex items-center space-x-2">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart className="text-red-400 fill-current" size={16} />
                  </motion.div>
                  <span>and lots of ☕</span>
                </div>
              </div>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-300 group"
            >
              <span className="text-xs sm:text-sm">Back to top</span>
              <motion.div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass-effect flex items-center justify-center group-hover:bg-primary-500/20 transition-all duration-300"
                whileHover={{ rotate: -90 }}
              >
                <ArrowUp size={14} className="sm:w-4 sm:h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center py-4 border-t border-white/5"
        >
          <p className="text-gray-500 text-xs">
            This website is built with React, Tailwind CSS, and Framer Motion. 
            <span className="text-primary-400 ml-1">View source on GitHub</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;