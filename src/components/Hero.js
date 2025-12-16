import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';
import { fetchUnsplashImages } from '../utils/unsplashApi';

const Hero = ({ setCurrentSection }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    fetchBackgroundImages();
  }, []);

  const fetchBackgroundImages = async () => {
    try {
      const queries = ['technology workspace', 'coding setup', 'modern office', 'abstract tech', 'minimal desk'];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      
      const images = await fetchUnsplashImages(randomQuery, 5, 'landscape', 'full');
      const imageUrls = images.map(img => img.url);
      
      setBackgroundImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    if (backgroundImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % backgroundImages.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [backgroundImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const roles = ['Full Stack Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver'];
  const [currentRole, setCurrentRole] = useState(0);

  const scrollToNextSection = () => {
    // Simply navigate to the About section
    if (setCurrentSection) {
      setCurrentSection('about');
    }
  };

  const scrollToProjects = () => {
    // Simply navigate to the Projects section
    if (setCurrentSection) {
      setCurrentSection('projects');
    }
  };

  const downloadCV = () => {
    // You can replace this with your actual CV file path
    const cvUrl = '/resume.pdf'; // Place your CV in the public folder
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Ahmed_Farouk_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/60 to-dark-900/80" />
          </motion.div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.1))`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto w-full"
        >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="inline-block px-3 py-2 sm:px-4 rounded-full glass-effect text-primary-400 font-medium text-xs sm:text-sm md:text-base">
            👋 Hello, I'm
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-shadow leading-tight"
        >
          <span className="gradient-text">Ahmed Farouk</span>
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          variants={itemVariants}
          className="mb-6 sm:mb-8 h-12 sm:h-16 flex items-center justify-center"
        >
          <motion.h2
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 px-2"
          >
            {roles[currentRole]}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={textVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          I craft beautiful, functional, and user-centered digital experiences. 
          Passionate about clean code, innovative design, and solving complex problems 
          with creative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            className="btn-primary flex items-center space-x-2 group w-full sm:w-auto justify-center"
          >
            <span>View My Work</span>
            <ExternalLink size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCV}
            className="btn-secondary flex items-center space-x-2 group w-full sm:w-auto justify-center"
          >
            <Download size={18} className="group-hover:animate-bounce" />
            <span>Download CV</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            { number: '10+', label: 'Projects Completed' },
            { number: '1+', label: 'Years Experience' },
            { number: '25+', label: 'Happy Clients' },
            { number: '100%', label: 'Satisfaction Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center glass-effect rounded-xl p-4 sm:p-6"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="scroll-indicator absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNextSection}
          className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-primary-400 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs sm:text-sm mb-1 font-medium">About Me</span>
          <ChevronDown size={16} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>

      {/* Image Navigation Dots */}
      {backgroundImages.length > 0 && (
        <div className="nav-dots absolute bottom-12 sm:bottom-20 right-2 sm:right-8 z-30 flex flex-col space-y-1 sm:space-y-2">
          {backgroundImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-primary-500 shadow-lg active'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;