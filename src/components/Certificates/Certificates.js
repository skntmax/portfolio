import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCertificate, FaExternalLinkAlt, FaAward, FaStar } from 'react-icons/fa';
import './Certificates.css';

const Certificates = () => {
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const certificates = [
    {
      id: 1,
      title: "Full Stack Developer",
      issuer: "Internshala",
      link: "https://trainings.internshala.com/verify_certificate",
      level: "Professional",
      year: "2021"
    },
    {
      id: 2,
      title: "React JS for Beginners",
      issuer: "Simply Learn",
      link: "https://simpli-web.app.link/e/Rg6NqdV5jDb",
      level: "Beginner",
      year: "2021"
    },
    {
      id: 3,
      title: "SQL Certified",
      issuer: "HackerRank",
      link: "https://bit.ly/3F9UBl2",
      level: "Intermediate",
      year: "2022"
    },
    {
      id: 4,
      title: "Google Digital Marketing Garage Certification",
      issuer: "Google",
      credentialId: "KEW 7FF URH",
      link: "https://learndigital.withgoogle.com/digitalunlocked/validate-certificate-code",
      level: "Professional",
      year: "2021"
    },
    {
      id: 5,
      title: "Getting Started with NodeJS",
      issuer: "Skill Up",
      link: "https://bit.ly/3f11jPQ",
      level: "Beginner",
      year: "2021"
    },
    {
      id: 6,
      title: "Introduction to Kubernetes",
      issuer: "Simply Learn",
      link: "https://simpli-web.app.link/e/lzXAud25jDb",
      level: "Intermediate",
      year: "2022"
    },
    {
      id: 7,
      title: "Full Stack JavaScript Development MongoDB Node",
      issuer: "LinkedIn Learning",
      link: "https://shorturl.at/qzJ23",
      level: "Professional",
      year: "2022"
    },
    {
      id: 8,
      title: "React Creating and Hosting a Full Stack Site",
      issuer: "LinkedIn Learning",
      link: "https://shorturl.at/BFX48",
      level: "Professional",
      year: "2022"
    },
    {
      id: 9,
      title: "React Native Essential Training",
      issuer: "LinkedIn Learning",
      link: "https://shorturl.at/mrBO0",
      level: "Professional",
      year: "2022"
    },
    {
      id: 10,
      title: "Introduction to Cloud Computing",
      issuer: "Coursera",
      link: "http://surl.li/npbib",
      level: "Beginner",
      year: "2022"
    },
    {
      id: 11,
      title: "AWS Cloud Essential",
      issuer: "AWS",
      link: "https://rb.gy/myilzy",
      level: "Professional",
      year: "2023"
    },
    {
      id: 12,
      title: "JavaScript Intermediate Level Certificate",
      issuer: "HackerRank",
      link: "https://shorturl.at/wDVWZ",
      level: "Intermediate",
      year: "2023"
    }
  ];

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Professional':
        return <FaAward className="level-icon professional" />;
      case 'Intermediate':
        return <FaStar className="level-icon intermediate" />;
      case 'Beginner':
        return <FaCertificate className="level-icon beginner" />;
      default:
        return <FaCertificate className="level-icon" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Professional':
        return '#f5576c';
      case 'Intermediate':
        return '#667eea';
      case 'Beginner':
        return '#4ecdc4';
      default:
        return '#667eea';
    }
  };

  return (
    <section id="certificates" className="certificates section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>Certificates</h2>
          <p>
            Here are my professional certifications that showcase my expertise in various technologies 
            and development practices. Each certification represents dedication to continuous learning 
            and skill enhancement.
          </p>
        </motion.div>

        <motion.div
          className="certificates-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Summary Cards */}
          <div className="cert-summary">
            <motion.div className="summary-card" variants={itemVariants}>
              <div className="summary-icon">
                <FaAward />
              </div>
              <div className="summary-content">
                <h4>Professional</h4>
                <span>{certificates.filter(cert => cert.level === 'Professional').length}</span>
              </div>
            </motion.div>

            <motion.div className="summary-card" variants={itemVariants}>
              <div className="summary-icon">
                <FaStar />
              </div>
              <div className="summary-content">
                <h4>Intermediate</h4>
                <span>{certificates.filter(cert => cert.level === 'Intermediate').length}</span>
              </div>
            </motion.div>

            <motion.div className="summary-card" variants={itemVariants}>
              <div className="summary-icon">
                <FaCertificate />
              </div>
              <div className="summary-content">
                <h4>Total Certificates</h4>
                <span>{certificates.length}</span>
              </div>
            </motion.div>
          </div>

          {/* Certificates Grid */}
          <div className="certificates-grid">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="certificate-card"
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="cert-header">
                  <div className="cert-number">
                    #{certificate.id.toString().padStart(2, '0')}
                  </div>
                  <div className="cert-level" style={{ color: getLevelColor(certificate.level) }}>
                    {getLevelIcon(certificate.level)}
                    <span>{certificate.level}</span>
                  </div>
                </div>

                <div className="cert-content">
                  <h3 className="cert-title">{certificate.title}</h3>
                  <p className="cert-issuer">
                    <strong>Issued by:</strong> {certificate.issuer}
                  </p>
                  
                  <div className="cert-details">
                    <span className="cert-year">{certificate.year}</span>
                    {certificate.credentialId && (
                      <span className="cert-credential">
                        ID: {certificate.credentialId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="cert-footer">
                  <motion.a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View Certificate</span>
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>

                {/* Hover Effect */}
                <div 
                  className="cert-hover-effect"
                  style={{ background: `linear-gradient(135deg, ${getLevelColor(certificate.level)}15 0%, ${getLevelColor(certificate.level)}05 100%)` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="certificates-bg">
        <div className="cert-bg-shape cert-bg-shape-1"></div>
        <div className="cert-bg-shape cert-bg-shape-2"></div>
        <div className="cert-bg-shape cert-bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Certificates;
