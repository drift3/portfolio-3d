import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'Working with Ahmed was an absolute pleasure. His attention to detail and creative problem-solving skills helped us deliver our project ahead of schedule. The user interface he designed exceeded our expectations.',
      rating: 5,
      project: 'E-commerce Platform'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartupXYZ',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'Ahmed\'s technical expertise and innovative approach transformed our vision into reality. His full-stack development skills and modern design sensibilities made our application stand out in the market.',
      rating: 5,
      project: 'Mobile App Development'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Design Director',
      company: 'Creative Agency',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'Collaborating with Ahmed was seamless. He perfectly translated our design concepts into functional, beautiful code. His understanding of both design and development made the entire process smooth.',
      rating: 5,
      project: 'Brand Website Redesign'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Founder',
      company: 'InnovateLab',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'Ahmed delivered exceptional results on our complex web application. His code quality, performance optimization, and user experience focus helped us achieve a 40% increase in user engagement.',
      rating: 5,
      project: 'SaaS Dashboard'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

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

  const testimonialVariants = {
    enter: {
      x: 300,
      opacity: 0
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0
    }
  };

  return (
    <section ref={ref} className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.03), rgba(245, 158, 11, 0.03))`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
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
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </motion.div>

          {/* Main Testimonial Display */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="relative h-auto sm:h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4 sm:p-0"
                >
                  <div className="glass-effect rounded-2xl p-6 sm:p-8 lg:p-12 text-center max-w-3xl mx-auto border border-white/10">
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mb-4 sm:mb-6"
                    >
                      <Quote className="text-primary-400 mx-auto" size={36} />
                    </motion.div>

                    {/* Testimonial Content */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 italic"
                    >
                      "{testimonials[currentTestimonial].content}"
                    </motion.p>

                    {/* Rating */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex justify-center space-x-1 mb-6"
                    >
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                        >
                          <Star className="text-accent-400 fill-current" size={20} />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Client Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex items-center justify-center space-x-4"
                    >
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary-500/50"
                      />
                      <div className="text-left">
                        <h4 className="text-white font-semibold text-lg">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonials[currentTestimonial].role}
                        </p>
                        <p className="text-primary-400 text-sm font-medium">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </motion.div>

                    {/* Project Tag */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="mt-6"
                    >
                      <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                        Project: {testimonials[currentTestimonial].project}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-primary-400 hover:text-white hover:bg-primary-500/20 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-primary-500 shadow-lg scale-125'
                        : 'bg-white/30 hover:bg-primary-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-primary-400 hover:text-white hover:bg-primary-500/20 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '25+', label: 'Happy Clients' },
              { number: '10+', label: 'Projects Completed' },
              { number: '100%', label: 'Satisfaction Rate' },
              { number: '1+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center glass-effect rounded-xl p-6 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Your Project Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;