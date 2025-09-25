import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [selectedProject, setSelectedProject] = useState(null); // Removed as eye icon functionality disabled

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'graphic', label: 'Graphic Design' },
    { id: 'design', label: 'UI/UX' },
    { id: 'backend', label: 'Backend' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Atlas Novels Publishing Platform',
      category: 'web',
      description: 'A comprehensive novel publishing platform built with Node.js, Express, MongoDB, and Tailwind CSS. Features user authentication, novel management, and modern publishing tools.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
      liveUrl: 'https://drift3-atlas-novels-2abbfd0a63d9.herokuapp.com/',
      githubUrl: 'https://github.com/drift3',
      featured: true
    },
    {
      id: 2,
      title: 'Trika Sports Brand Identity',
      category: 'graphic',
      description: 'Complete branding project for "Trika | تريكا," a sportswear store. Created visual identity including bilingual logo, color palette, and branded mockups.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Behance Project/Trika Project/Hoody-Mockup-Trika.jpg`,
      technologies: ['Adobe Illustrator', 'Photoshop', 'Branding', 'Logo Design'],
      liveUrl: 'https://www.behance.net/gallery/230899005/-Logo-Design-for-Sports-Brand',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      category: 'design',
      description: 'A modern, responsive portfolio website with smooth animations and creative layouts.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 4,
      title: 'API Gateway Service',
      category: 'backend',
      description: 'A scalable API gateway built with Node.js and Express, featuring rate limiting, authentication, and load balancing.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'SkyFly Airline Booking',
      category: 'web',
      description: 'A modern, creative, and professional airline booking website built with React, Tailwind CSS, and Framer Motion. This project showcases a premium travel experience with smooth animations, interactive components, and stunning visuals.',
      image: `${process.env.PUBLIC_URL}/assets/screenshots/skyfly-airline-booking.png`,
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript'],
      liveUrl: 'https://drift3.github.io/skyfly-airline-booking/',
      githubUrl: 'https://github.com/drift3',
      featured: true
    },
    {
      id: 6,
      title: 'Graphic Design Tasks Collection',
      category: 'graphic',
      description: 'A collection of diverse graphic design tasks showcasing various visual effects and styles including photo manipulation, digital art, and creative compositions.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/Glowing-Girl.jpg`,
      technologies: ['Photoshop', 'Digital Art', 'Photo Manipulation', 'Visual Effects'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 7,
      title: 'Social Media Ad Designs',
      category: 'graphic',
      description: 'Creative social media advertisements and designs including yogurt ads, mobile device promotions, and Black Friday campaigns with mixed visual concepts.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Social media/Yogurt Adv.png`,
      technologies: ['Photoshop', 'Social Media Design', 'Advertisement Design', 'Digital Marketing'],
      liveUrl: 'https://www.behance.net/gallery/231644777/Social-Media-Ad-Designs-Mixed-Concepts',
      githubUrl: '#',
      featured: false
    },
    {
      id: 8,
      title: 'Diamond Visual Effects',
      category: 'graphic',
      description: 'Stunning diamond visualization with realistic lighting effects, reflections, and premium jewelry presentation showcase.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/Diamond.jpg`,
      technologies: ['Photoshop', 'Visual Effects', '3D Rendering', 'Lighting Design'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 9,
      title: 'Digital Art Manipulation',
      category: 'graphic',
      description: 'Creative photo manipulation project featuring surreal digital art concepts with advanced compositing techniques and artistic vision.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/Manipulation.jpg`,
      technologies: ['Photoshop', 'Digital Art', 'Compositing', 'Creative Retouching'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 10,
      title: 'Halloween Pumpkin Design',
      category: 'graphic',
      description: 'Creative Halloween-themed design with atmospheric pumpkin illustration and dark mood lighting effects.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/pumpkin.png`,
      technologies: ['Photoshop', 'Illustration', 'Seasonal Design', 'Mood Lighting'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 11,
      title: 'QUEST Gaming Logo',
      category: 'graphic',
      description: 'Modern gaming logo design with bold typography and dynamic visual elements perfect for esports and gaming brands.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/QUEST.png`,
      technologies: ['Adobe Illustrator', 'Logo Design', 'Gaming Branding', 'Typography'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 12,
      title: 'Metallic Shine Effects',
      category: 'graphic',
      description: 'Professional metallic surface design with realistic chrome effects and sophisticated lighting techniques.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Tasks/Shiny.png`,
      technologies: ['Photoshop', 'Metallic Effects', 'Surface Design', 'Lighting'],
      liveUrl: 'https://www.behance.net/gallery/231646355/Graphic-Design-Tasks-Visual-Effects-Styles',
      githubUrl: '#',
      featured: false
    },
    {
      id: 13,
      title: 'Fresh Juice Advertisement',
      category: 'graphic',
      description: 'Vibrant and refreshing juice advertisement design with dynamic splash effects and appetizing product presentation.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Social media/Juice.png`,
      technologies: ['Photoshop', 'Product Photography', 'Beverage Marketing', 'Visual Effects'],
      liveUrl: 'https://www.behance.net/gallery/231644777/Social-Media-Ad-Designs-Mixed-Concepts',
      githubUrl: '#',
      featured: false
    },
    {
      id: 14,
      title: 'Mobile Device Promotion',
      category: 'graphic',
      description: 'Modern mobile device promotional design with sleek product presentation and contemporary marketing aesthetics.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Social media/Phone-adv.png`,
      technologies: ['Photoshop', 'Product Design', 'Tech Marketing', 'Modern Aesthetics'],
      liveUrl: 'https://www.behance.net/gallery/231644777/Social-Media-Ad-Designs-Mixed-Concepts',
      githubUrl: '#',
      featured: false
    },
    {
      id: 15,
      title: 'Black Friday Campaign',
      category: 'graphic',
      description: 'High-impact Black Friday promotional campaign design with bold typography and compelling call-to-action elements.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Social media/black_friday.png`,
      technologies: ['Photoshop', 'Campaign Design', 'Promotional Graphics', 'Typography'],
      liveUrl: 'https://www.behance.net/gallery/231644777/Social-Media-Ad-Designs-Mixed-Concepts',
      githubUrl: '#',
      featured: false
    },
    {
      id: 16,
      title: 'Trika Store Sign Mockup',
      category: 'graphic',
      description: 'Professional store signage design mockup for Trika sports brand, showcasing real-world brand implementation and environmental branding.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Behance Project/Trika Project/Store-Sign trika-logo mockup.jpg`,
      technologies: ['Adobe Illustrator', 'Mockup Design', 'Brand Implementation', 'Signage Design'],
      liveUrl: 'https://www.behance.net/gallery/230899005/-Logo-Design-for-Sports-Brand',
      githubUrl: '#',
      featured: false
    },
    {
      id: 17,
      title: 'Trika T-Shirt Design',
      category: 'graphic',
      description: 'Clean and modern t-shirt mockup design for Trika sports brand, demonstrating apparel branding and merchandise design capabilities.',
      image: `${process.env.PUBLIC_URL}/assets/graphic-design/Behance Project/Trika Project/white-t-shirt trika mockup.jpg`,
      technologies: ['Adobe Illustrator', 'Apparel Design', 'Brand Application', 'Mockup Creation'],
      liveUrl: 'https://www.behance.net/gallery/230899005/-Logo-Design-for-Sports-Brand',
      githubUrl: '#',
      featured: false
    },
    {
      id: 18,
      title: 'BookHaven E-commerce Store',
      category: 'web',
      description: 'BookHaven is a modern, responsive e-commerce web application designed specifically for selling books and novels. Built with React and styled with Tailwind CSS, it offers a seamless shopping experience across all devices.',
      image: `${process.env.PUBLIC_URL}/assets/screenshots/bookhaven-ecommerce.png`,
      technologies: ['React', 'Tailwind CSS', 'JavaScript', 'E-commerce'],
      liveUrl: 'https://drift3.github.io/BookHaven-Store/',
      githubUrl: 'https://github.com/drift3',
      featured: true
    },
    {
      id: 19,
      title: 'Al-Dahawaqah Restaurant',
      category: 'web',
      description: 'A professional and responsive restaurant website built with React and Tailwind CSS with advanced animations and 3D effects, featuring an attractive, modern design and a warm orange color palette.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Tailwind CSS', '3D Effects', 'Animations'],
      liveUrl: 'https://drift3.github.io/aldahawaqah-restaurant/',
      githubUrl: 'https://github.com/drift3',
      featured: false
    },
    {
      id: 20,
      title: 'Portfolio 3D - Personal Showcase',
      category: 'web',
      description: 'This is my portfolio for all my different fields, A modern, creative, and professional personal portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations, attractive visuals, and a unique user experience.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', '3D Effects'],
      liveUrl: 'https://drift3.github.io/portfolio-3d/',
      githubUrl: 'https://github.com/drift3',
      featured: true
    },
    {
      id: 21,
      title: 'Graphic Design Portfolio',
      category: 'web',
      description: 'This is my portfolio for my graphic design, A modern, responsive portfolio website showcasing the creative work and professional services of Ahmed Farouk, a passionate graphic designer from Egypt.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      liveUrl: '#',
      githubUrl: 'https://github.com/drift3',
      featured: false
    },
    {
      id: 22,
      title: 'Karas Portfolio - Client Project',
      category: 'web',
      description: 'This is a project I did for a client named Karas, A modern, creative, and professional personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and a unique visual experience.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: 'https://github.com/drift3/karas-portfolio',
      featured: false
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className={`group relative overflow-hidden rounded-2xl glass-effect border border-white/10 hover:border-primary-500/50 transition-all duration-300 ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex space-x-2 sm:space-x-4">
            {/* Eye icon disabled as requested by user
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProject(project)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-effect flex items-center justify-center text-white hover:text-primary-400 transition-colors duration-300"
            >
              <Eye size={18} />
            </motion.button>
            */}
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-white hover:text-primary-400 transition-colors duration-300"
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-white hover:text-primary-400 transition-colors duration-300"
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-dark-700 text-primary-400 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-full">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" ref={ref} className="section-padding bg-dark-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 300 + 150,
              height: Math.random() * 300 + 150,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.03), rgba(245, 158, 11, 0.03))`,
            }}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360],
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
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              Here are some of my recent projects that showcase my skills and passion for creating amazing digital experiences.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'glass-effect text-gray-300 hover:text-primary-400 hover:bg-white/10'
              }`}
            >
              <Filter size={16} />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${selectedCategory}`} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal - Disabled as eye icon functionality has been removed
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              key="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-slate-900/95 border-2 border-teal-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              style={{ backdropFilter: 'blur(12px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-600/80 hover:bg-red-500 border-2 border-red-400 flex items-center justify-center text-white hover:text-red-100 transition-all duration-200 hover:scale-110 shadow-xl z-10"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <X size={26} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{selectedProject.title}</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{selectedProject.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </section>
  );
};

export default Projects;