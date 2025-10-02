import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaArrowDown, FaPlay } from 'react-icons/fa';
import './Hero.css';
// Import assets
import heroImage from '../assets/img/Homepage2.jpg';

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    // Simple typing effect without external library
    const texts = [
      "a Full Stack Developer (MERN & Spring Boot)",
      "a React.js Expert", 
      "a Node.js/Nest Js Developer",
      "a JavaScript Enthusiast",
      "a Problem Solver",
      "passionate about Technology/Development"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId = null;

    const type = () => {
      const currentText = texts[textIndex];
      const element = typedRef.current;

      if (!element) return;

      if (isDeleting) {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        timeout = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        timeout = 500; // Pause before next text
      }

      timeoutId = setTimeout(type, timeout);
    };

    type();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero section" ref={ref}>
      {/* Animated Background Elements */}
      <div className="hero-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Main Content */}
          <div className="hero-main">
            <motion.div className="hero-text" variants={itemVariants}>
              <motion.h1 
                className="hero-name"
                variants={itemVariants}
              >
                Hi, I'm{' '}
                <span className="gradient-text">Shashi Kant</span>
                <motion.a 
                    href="/assets/shashi-kant-resume.pdf"
                  className="hero-download-btn"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Download Resume"
                >
                  <FaDownload />
                </motion.a>
              </motion.h1>

              <motion.div className="hero-typed-container" variants={itemVariants}>
                <span className="hero-typed-prefix">I'm </span>
                <span ref={typedRef} className="hero-typed"></span>
                <span className="cursor">|</span>
              </motion.div>

              <motion.p className="hero-description" variants={itemVariants}>
                Experienced Full Stack Developer with 4.5+ years in MERN stack development. 
                Passionate about creating robust, scalable applications and solving complex problems 
                with modern technologies.
              </motion.p>

              <motion.div className="hero-buttons" variants={itemVariants}>
                <motion.a
                  href="#about"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToNext();
                  }}
                >
                  <span>Discover My Work</span>
                  <FaPlay />
                </motion.a>

                <motion.a
                  href="#contact"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div className="hero-stats" variants={itemVariants}>
                <div className="stat-item">
                  <span className="stat-number">4+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12+</span>
                  <span className="stat-label">Certificates</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div className="hero-visual" variants={itemVariants}>
              <div className="hero-image-container">
                <motion.div
                  className="hero-image-wrapper"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                   <img src={heroImage} alt="Shashi Kant" />
                  <div className="image-glow" />
                </motion.div>

                {/* Floating Tech Icons */}
                <div className="tech-icons">
                  {[
                    { icon: 'fab fa-react', color: '#61DAFB', delay: 0 },
                    { icon: 'fab fa-node-js', color: '#339933', delay: 0.5 },
                    { icon: 'fab fa-js-square', color: '#F7DF1E', delay: 1 },
                    { icon: 'fab fa-html5', color: '#E34F26', delay: 1.5 },
                    { icon: 'fab fa-css3-alt', color: '#1572B6', delay: 2 },
                    { icon: 'fas fa-database', color: '#47A248', delay: 2.5 }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="tech-icon"
                      style={{ '--color': tech.color }}
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tech.delay
                      }}
                    >
                      <i className={tech.icon} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="scroll-indicator"
            variants={itemVariants}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={scrollToNext}
          >
            <span>Scroll to explore</span>
            <FaArrowDown />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay" />
    </section>
  );
};

export default Hero;