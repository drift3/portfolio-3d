import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'TypeScript', level: 90, icon: '📘' },
        { name: 'Next.js', level: 88, icon: '▲' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '🎭' }
      ]
    },
    {
      title: 'Backend',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 88, icon: '🟢' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'Express.js', level: 90, icon: '🚀' },
        { name: 'MongoDB', level: 82, icon: '🍃' },
        { name: 'PostgreSQL', level: 80, icon: '🐘' }
      ]
    },
    {
      title: 'Tools & Others',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Git', level: 92, icon: '📚' },
        { name: 'Docker', level: 78, icon: '🐳' },
        { name: 'AWS', level: 75, icon: '☁️' },
        { name: 'Figma', level: 88, icon: '🎨' },
        { name: 'Jest', level: 85, icon: '🧪' }
      ]
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

  const categoryVariants = {
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

  const skillVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: Math.random() * 150 + 75,
              height: Math.random() * 150 + 75,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(20, 184, 166, 0.05), rgba(245, 158, 11, 0.05))`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
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
          <motion.div variants={categoryVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={categoryVariants}
                className="glass-effect rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-primary-500/30 transition-all duration-300 sm:col-span-1 lg:col-span-1"
              >
                {/* Category Header */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <div className={`w-full h-1 bg-gradient-to-r ${category.color} rounded-full`} />
                </div>

                {/* Skills List */}
                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-lg sm:text-2xl">{skill.icon}</span>
                          <span className="text-gray-300 font-medium text-sm sm:text-base">{skill.name}</span>
                        </div>
                        <motion.span
                          className="text-primary-400 font-semibold text-sm sm:text-base"
                          animate={{
                            scale: hoveredSkill === `${categoryIndex}-${skillIndex}` ? 1.1 : 1
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      {/* Skill Bar */}
                      <div className="relative">
                        <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: inView ? `${skill.level}%` : 0,
                              boxShadow: hoveredSkill === `${categoryIndex}-${skillIndex}` 
                                ? '0 0 20px rgba(20, 184, 166, 0.5)' 
                                : '0 0 0px rgba(20, 184, 166, 0)'
                            }}
                            transition={{ 
                              duration: 1.5, 
                              delay: (categoryIndex * 0.2) + (skillIndex * 0.1),
                              ease: 'easeOut' 
                            }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              animate={{
                                x: hoveredSkill === `${categoryIndex}-${skillIndex}` ? ['0%', '100%'] : '0%'
                              }}
                              transition={{
                                duration: 1,
                                repeat: hoveredSkill === `${categoryIndex}-${skillIndex}` ? Infinity : 0,
                                ease: 'linear'
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Skill Level Indicator */}
                        <motion.div
                          className="absolute -top-8 bg-dark-800 text-white text-xs px-2 py-1 rounded shadow-lg"
                          style={{ left: `${skill.level}%` }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: hoveredSkill === `${categoryIndex}-${skillIndex}` ? 1 : 0,
                            y: hoveredSkill === `${categoryIndex}-${skillIndex}` ? 0 : 10
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill.level}%
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-dark-800" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Stats */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  variants={skillVariants}
                >
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>Average Proficiency</span>
                    <span className="text-primary-400 font-semibold">
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={categoryVariants}
            className="text-center mt-16"
          >
            <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
              <p className="text-gray-400 mb-6">
                I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
                Currently exploring: <span className="text-primary-400 font-semibold">WebAssembly, Three.js, and AI/ML integration</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Learning', 'Experimenting', 'Building'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(20, 184, 166, 0.3)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsShowcase;