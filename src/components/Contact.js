import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'a.fwork66@gmail.com',
      href: 'mailto:a.fwork66@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+20 1020647876',
      href: 'tel:+201020647876'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mansoura, Egypt',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const FloatingLabel = ({ label, name, type = 'text', required = false, isTextarea = false }) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = (e) => {
      setFocused(false);
      setHasValue(e.target.value !== '');
    };

    const inputClasses = `w-full bg-transparent border-2 border-gray-600 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-white placeholder-transparent focus:outline-none focus:border-primary-500 transition-all duration-300 text-sm sm:text-base ${
      isTextarea ? 'resize-none h-24 sm:h-32' : ''
    }`;

    const labelClasses = `absolute left-3 sm:left-4 transition-all duration-300 pointer-events-none ${
      focused || hasValue || formData[name]
        ? 'top-0 text-xs text-primary-400 bg-dark-900 px-2 -translate-y-1/2'
        : 'top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base'
    }`;

    return (
      <div className="relative">
        {isTextarea ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className={inputClasses}
            placeholder={label}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            className={inputClasses}
            placeholder={label}
          />
        )}
        <label className={labelClasses}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      </div>
    );
  };

  return (
    <section ref={ref} className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 150 + 75,
              height: Math.random() * 150 + 75,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.1))`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="mb-12">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <MessageCircle className="text-primary-400 mr-2 sm:mr-3" size={24} />
                  Let's Connect
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 glass-effect rounded-xl hover:border-primary-500/50 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors duration-300">
                        <info.icon className="text-primary-400" size={18} />
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs sm:text-sm">{info.label}</div>
                        <div className="text-white font-medium text-sm sm:text-base">{info.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Follow Me</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300`}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <motion.div
                variants={itemVariants}
                className="mt-8 sm:mt-12 p-4 sm:p-6 glass-effect rounded-xl border border-green-500/20"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm sm:text-base">Available for Work</span>
                </div>
                <p className="text-gray-400 text-sm">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's discuss how we can work together!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <FloatingLabel
                    label="Your Name"
                    name="name"
                    required
                  />
                  <FloatingLabel
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                
                <FloatingLabel
                  label="Subject"
                  name="subject"
                  required
                />
                
                <FloatingLabel
                  label="Your Message"
                  name="message"
                  required
                  isTextarea
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                  >
                    Thank you! Your message has been sent successfully. I'll get back to you soon!
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;