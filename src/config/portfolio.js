// Portfolio Configuration
// Customize this file to personalize your portfolio

export const personalInfo = {
  name: 'Ahmed Farouk',
  title: 'Full Stack Developer',
  roles: ['Full Stack Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver'],
  email: 'a.fwork66@gmail.com',
  phone: '+201020647879',
  location: 'Mansoura, Egypt',
  bio: `I'm a passionate full-stack developer with over 3 years of experience 
        creating digital solutions that make a difference. I love turning complex 
        problems into simple, beautiful, and intuitive designs.`,
  extendedBio: `When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or enjoying a good cup of coffee 
                while sketching out my next big idea.`,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  resumeUrl: '/resume.pdf', // Place your resume in the public folder
  availability: {
    status: 'available', // 'available', 'busy', 'unavailable'
    message: 'I\'m currently available for freelance projects and full-time opportunities.'
  }
};

export const socialLinks = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  instagram: 'https://instagram.com/yourusername',
  dribbble: 'https://dribbble.com/yourusername',
  behance: 'https://behance.net/yourusername'
};

export const skills = {
  frontend: [
    { name: 'React', level: 95, icon: '⚛️' },
    { name: 'TypeScript', level: 90, icon: '📘' },
    { name: 'Next.js', level: 88, icon: '▲' },
    { name: 'Tailwind CSS', level: 92, icon: '🎨' },
    { name: 'Framer Motion', level: 85, icon: '🎭' }
  ],
  backend: [
    { name: 'Node.js', level: 88, icon: '🟢' },
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'Express.js', level: 90, icon: '🚀' },
    { name: 'MongoDB', level: 82, icon: '🍃' },
    { name: 'PostgreSQL', level: 80, icon: '🐘' }
  ],
  tools: [
    { name: 'Git', level: 92, icon: '📚' },
    { name: 'Docker', level: 78, icon: '🐳' },
    { name: 'AWS', level: 75, icon: '☁️' },
    { name: 'Figma', level: 88, icon: '🎨' },
    { name: 'Jest', level: 85, icon: '🧪' }
  ]
};

export const experience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
    icon: 'Code'
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Solutions Ltd.',
    period: '2020 - 2022',
    description: 'Developed responsive web applications and collaborated with design teams to create exceptional user experiences.',
    icon: 'Palette'
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Ventures',
    period: '2019 - 2020',
    description: 'Built and maintained web applications while learning modern development practices and agile methodologies.',
    icon: 'Zap'
  }
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'web',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    liveUrl: 'https://your-project.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'mobile',
    description: 'A React Native mobile app for task management with real-time synchronization and offline support.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
    liveUrl: 'https://your-app.com',
    githubUrl: 'https://github.com/yourusername/app',
    featured: false
  },
  // Add more projects here...
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    content: 'Working with Ahmed was an absolute pleasure. His attention to detail and creative problem-solving skills helped us deliver our project ahead of schedule.',
    rating: 5,
    project: 'E-commerce Platform'
  },
  // Add more testimonials here...
];

export const stats = [
  { number: '10+', label: 'Projects Completed' },
  { number: '1+', label: 'Years Experience' },
  { number: '25+', label: 'Happy Clients' },
  { number: '100%', label: 'Satisfaction Rate' }
];

export const services = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies',
    icon: '🌐',
    features: ['React/Next.js', 'Node.js/Express', 'Graphic Design', 'API Development']
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps for iOS and Android',
    icon: '📱',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Deployment']
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design that converts and engages',
    icon: '🎨',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
  }
];

export const siteConfig = {
  title: 'Creative Portfolio',
  description: 'Creative Portfolio - Modern Web Developer & Designer',
  keywords: 'web developer, full stack, react, node.js, portfolio',
  author: personalInfo.name,
  siteUrl: 'https://yourportfolio.com',
  image: '/og-image.jpg', // Place in public folder
  twitterHandle: '@yourusername',
  
  // Theme colors
  themeColor: '#14b8a6',
  backgroundColor: '#0f172a',
  
  // Analytics
  googleAnalyticsId: 'GA_MEASUREMENT_ID',
  
  // Contact form
  contactFormEndpoint: 'https://your-backend.com/api/contact',
  
  // Features
  features: {
    darkMode: true,
    animations: true,
    customCursor: true,
    scrollProgress: true,
    lazyLoading: true
  }
};

export default {
  personalInfo,
  socialLinks,
  skills,
  experience,
  projects,
  testimonials,
  stats,
  services,
  siteConfig
};