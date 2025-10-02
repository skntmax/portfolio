import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { 
  FaSmile, 
  FaProjectDiagram, 
  FaHeadset, 
  FaUsers,
  FaCalendarAlt,
  FaGlobe,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBriefcase
} from 'react-icons/fa';
import './About.css';
// Import assets
import aboutImage from '../assets/img/Homepage2.jpg';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

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

  const statsData = [
    { icon: FaSmile, number: 20, label: "Happy Clients", suffix: "+" },
    { icon: FaProjectDiagram, number: 7, label: "Projects", suffix: "+" },
    { icon: FaHeadset, number: 24, label: "Hours Of Support", suffix: "/7" },
    { icon: FaUsers, number: 12, label: "Hard Workers", suffix: "+" }
  ];

  const personalInfo = [
    { icon: FaCalendarAlt, label: "Birthday", value: "14 Jul 1998" },
    { icon: FaGlobe, label: "Website", value: "https://bytecode.live/" },
    { icon: FaPhoneAlt, label: "Phone", value: "+91 7860735070" },
    { icon: FaMapMarkerAlt, label: "City", value: "Noida, Uttar Pradesh" }
  ];

  const additionalInfo = [
    { icon: FaCalendarAlt, label: "Age", value: "26" },
    { icon: FaBriefcase, label: "Degree", value: "B.Tech" },
    { icon: FaEnvelope, label: "Email", value: "skntjee@gmail.com" },
    { icon: FaBriefcase, label: "Availability", value: "Contact me" }
  ];

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container responsive-container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>About Me</h2>
          <p>
            I am thrilled to express my sincere interest in Full Stack Development. 
            With over 4 years of dedicated professional experience and a robust 6 years background in coding, 
            I have acquired profound expertise in leveraging state-of-the-art technologies, 
            with a particular focus on the MERN stack.
          </p>
        </motion.div>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* About Grid */}
          <div className="about-grid">
            {/* Profile Image */}
            <motion.div 
              className="about-image"
              variants={itemVariants}
            >
              <div className="image-wrapper">
                <img src={aboutImage} alt="Shashi Kant" />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h4>Full Stack Developer</h4>
                    <p>MERN Stack Expert</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </motion.div>

            {/* About Info */}
            <motion.div 
              className="about-info"
              variants={itemVariants}
            >
              <h3>Full Stack Developer (MERN)</h3>
              <p className="about-subtitle">
                Experienced full-stack developer skilled in MEAN and MERN technologies, 
                delivering robust architectures, bug fixes, and seamless integrations for 
                prominent projects with a focus on quality and timeliness.
              </p>

              {/* Personal Information */}
              <div className="info-grid">
                <div className="info-column">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="info-item"
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <info.icon className="info-icon" />
                      <span className="info-label">{info.label}:</span>
                      <span className="info-value">{info.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="info-column">
                  {additionalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="info-item"
                      variants={itemVariants}
                      transition={{ delay: (index + 4) * 0.1 }}
                    >
                      <info.icon className="info-icon" />
                      <span className="info-label">{info.label}:</span>
                      <span className="info-value">{info.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Detailed Description */}
              <motion.div 
                className="about-description"
                variants={itemVariants}
              >
                <p>
                  Throughout my career, I have made significant contributions to a multitude of government projects, 
                  including prominent initiatives such as the Cement Corporation of India, the Engineering Enterprise 
                  Project (EPIL), the EPMS, and the Common Service Center (CSC). Presently, I am deeply immersed in 
                  the development of Rozgar.com and the CSC resume portal, both of which are proprietary products 
                  of our company.
                </p>
                <p>
                  Certified as a Full Stack Developer by Internshala and recognized for my proficiency in MySQL by 
                  HackerRank, I possess a comprehensive understanding of Object-Oriented Programming principles in 
                  JavaScript and Java. Moreover, my expertise extends to a diverse range of frontend and backend 
                  frameworks, including React.js, Next.js, Node.js, PostgreSQL, MySQL, and MongoDB.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            className="stats-section"
            variants={itemVariants}
          >
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="stat-icon">
                    <stat.icon />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">
                      {inView && (
                        <CountUp
                          start={0}
                          end={stat.number}
                          duration={2.5}
                          delay={index * 0.2}
                        />
                      )}
                      <span className="stat-suffix">{stat.suffix}</span>
                    </div>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="stat-hover-effect"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="about-bg">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
    </section>
  );
};

export default About;
