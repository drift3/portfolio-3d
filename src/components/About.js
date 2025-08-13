import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Zap, Heart, Award, Coffee } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skills = [
    { name: 'React/Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript/TypeScript', level: 90, color: 'from-yellow-500 to-orange-500' },
    { name: 'Node.js/Express', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'Python/Django', level: 80, color: 'from-purple-500 to-pink-500' },
    { name: 'UI/UX Design', level: 88, color: 'from-pink-500 to-rose-500' },
    { name: 'Database Design', level: 82, color: 'from-indigo-500 to-blue-500' }
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
      icon: Code
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Solutions Ltd.',
      period: '2020 - 2022',
      description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences.',
      icon: Palette
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      period: '2019 - 2020',
      description: 'Built and maintained web applications while learning modern development practices and agile methodologies.',
      icon: Zap
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

  const SkillBar = ({ skill, index }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
      if (inView) {
        const timer = setTimeout(() => {
          setAnimatedLevel(skill.level);
        }, index * 200);
        return () => clearTimeout(timer);
      }
    }, [inView, skill.level, index]);

    return (
      <motion.div
        variants={itemVariants}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 font-medium">{skill.name}</span>
          <span className="text-primary-400 font-semibold">{animatedLevel}%</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${animatedLevel}%` : 0 }}
            transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="about" ref={ref} className="section-padding bg-dark-900 relative overflow-hidden">
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
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.05), rgba(245, 158, 11, 0.05))`,
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
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left Column - Image and Info */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative mb-8 group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Profile"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-effect rounded-xl p-3 sm:p-4 border border-primary-500/20"
              >
                <div className="flex items-center space-x-2">
                  <Coffee className="text-primary-400" size={20} />
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">500+</div>
                    <div className="text-xs text-gray-400">Cups of Coffee</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                I'm a passionate full-stack developer with over 3 years of experience 
                creating digital solutions that make a difference. I love turning complex 
                problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or enjoying a good cup of coffee 
                while sketching out my next big idea.
              </p>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: 'Years Experience', value: '3+' },
                  { icon: Heart, label: 'Projects Completed', value: '50+' }
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="glass-effect rounded-xl p-4 text-center"
                  >
                    <fact.icon className="text-primary-400 mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-white mb-1">{fact.value}</div>
                    <div className="text-sm text-gray-400">{fact.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills and Experience */}
          <div>
            {/* Skills Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Code className="text-primary-400 mr-3" size={28} />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Zap className="text-primary-400 mr-3" size={28} />
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="relative pl-8 border-l-2 border-primary-500/30 hover:border-primary-500 transition-all duration-300"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <exp.icon size={12} className="text-white" />
                    </div>
                    <div className="glass-effect rounded-xl p-6 ml-4">
                      <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                      <div className="text-primary-400 font-medium mb-2">{exp.company}</div>
                      <div className="text-sm text-gray-500 mb-3">{exp.period}</div>
                      <p className="text-gray-400">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(20, 184, 166, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;