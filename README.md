# Creative Portfolio Website

A modern, creative, and professional personal portfolio website built with React, Tailwind CSS, and Framer Motion. Features smooth animations, attractive visuals, and a unique user experience.

## 🚀 Features

### Design & UI
- **Creative Navigation**: Interactive floating navigation with smooth animations
- **Page Transitions**: Animated transitions between sections (fade, slide, reveal)
- **Hero Section**: Dynamic hero banner with Unsplash API integration
- **Background Elements**: Minimal abstract shapes, gradients, and animated particles
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop

### Sections
- **Hero**: Large hero banner with animated headings and background images
- **About**: Creative layout with animated skill bars and experience timeline
- **Projects**: Grid/masonry layout with hover animations and project modals
- **Contact**: Stylish contact form with floating labels and social links

### Technical Features
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Smooth animations and page transitions
- **Intersection Observer**: Trigger animations on scroll
- **Lucide React**: Beautiful, customizable icons
- **Responsive Images**: Optimized images from Unsplash API

## 🛠️ Technologies Used

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion, CSS Animations
- **Icons**: Lucide React
- **Images**: Unsplash API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio-3D
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Unsplash API (Optional)**
   - Get your free API key from [Unsplash Developers](https://unsplash.com/developers)
   - Replace `YOUR_UNSPLASH_ACCESS_KEY` in `src/components/Hero.js`

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 🎨 Customization

### Colors & Theme
The color scheme is defined in `tailwind.config.js`:
- **Primary**: Teal shades (#14b8a6)
- **Accent**: Gold/Orange shades (#f59e0b)
- **Dark**: Dark blue/gray shades (#0f172a)

### Content
Update the following files to customize content:
- `src/components/Hero.js` - Personal information, roles, stats
- `src/components/About.js` - About text, skills, experience
- `src/components/Projects.js` - Project data and categories
- `src/components/Contact.js` - Contact information and social links

### Images
- Replace profile image URL in `About.js`
- Update project images in `Projects.js`
- Configure Unsplash API for dynamic hero backgrounds

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎭 Animation Features

### Page Transitions
- Smooth fade and slide transitions between sections
- Staggered animations for list items
- Hover effects on interactive elements

### Scroll Animations
- Elements animate in when they come into view
- Progress bars animate based on scroll position
- Floating particles and background elements

### Interactive Elements
- Hover effects on buttons and cards
- Click animations with scale transforms
- Loading screen with progress animation

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## 📂 Project Structure

```
src/
├── components/
│   ├── Navigation.js      # Main navigation component
│   ├── Hero.js           # Hero section with background images
│   ├── About.js          # About section with skills & experience
│   ├── Projects.js       # Projects showcase with filtering
│   ├── Contact.js        # Contact form and information
│   ├── BackgroundElements.js # Animated background elements
│   └── LoadingScreen.js  # Initial loading animation
├── App.js                # Main app component
├── App.css              # Additional custom styles
├── index.js             # React DOM render
└── index.css            # Tailwind imports and global styles
```

## 🎯 Performance Optimizations

- **Lazy Loading**: Components load only when needed
- **Image Optimization**: Responsive images with proper sizing
- **Animation Performance**: GPU-accelerated animations
- **Code Splitting**: Automatic code splitting with Create React App

## 🌟 Key Features Explained

### Creative Navigation
- Floating navigation bar with glass morphism effect
- Mobile-friendly slide-out menu
- Smooth transitions and hover effects
- Navigation dots for quick section jumping

### Dynamic Hero Section
- Rotating background images from Unsplash
- Animated text with typewriter effects
- Floating statistics cards
- Scroll indicator with animation

### Interactive Projects Grid
- Filterable project categories
- Hover effects revealing project details
- Modal popups with full project information
- Responsive masonry layout

### Modern Contact Form
- Floating label inputs
- Form validation and submission states
- Social media integration
- Availability status indicator

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure custom domain (optional)

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Unsplash** for beautiful stock images
- **Lucide** for clean, modern icons
- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid styling
- **React** community for excellent documentation

---

**Made with ❤️ and lots of ☕**

For questions or support, please open an issue or contact [your-email@example.com]






### Download CV Button **

Attempts to download /resume.pdf from the public folder
If you don't have a resume file yet, it will show a 404 error
To make it work, just place your resume file as resume.pdf in the public folder
To complete the setup:
Place your actual resume/CV file in d:\Zen Coder Projects\Portfolio 3D\public\resume.pdf
Or update the cvUrl variable in the downloadCV function to point to your resume file