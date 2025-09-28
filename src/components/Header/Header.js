import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaDownload,
  FaHome, 
  FaUser, 
  FaCertificate, 
  FaFileAlt, 
  FaProjectDiagram, 
  FaServicestack, 
  FaEnvelope,
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa';
import './Header.css';
// Import assets
import profileImage from '../assets/img/Hompage.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Home', icon: FaHome },
    { id: 'about', label: 'About', icon: FaUser },
    { id: 'certificates', label: 'Certificates', icon: FaCertificate },
    { id: 'resume', label: 'Resume', icon: FaFileAlt },
    { id: 'portfolio', label: 'Projects', icon: FaProjectDiagram },
    { id: 'services', label: 'Services', icon: FaServicestack },
    { id: 'contact', label: 'Contact', icon: FaEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const handleResize = () => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 1199) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [navItems]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on Mobile */}
      <motion.header 
        className="header-sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: window.innerWidth <= 1199 ? 'none' : 'block' }}
      >
        <div className="header-content">
          {/* Profile Section */}
          <motion.div 
            className="profile-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="profile-image">
              <img src={profileImage} alt="Shashi Kant" />
              <div className="profile-overlay">
                <motion.div 
                  className="profile-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            
            <h1 className="profile-name">
              Shashi Kant
              <motion.a 
                href="/assets/shashi-kant-resume.pdf" 
                className="download-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Download Resume"
              >
                <FaDownload />
              </motion.a>
            </h1>
            
            <p className="profile-title">Full Stack Developer (MERN)</p>
            
            {/* Social Links */}
            <div className="social-links">
              {[
                { href: "https://www.youtube.com/@skntmax", icon: "youtube" },
                { href: "https://twitter.com/Shashik84927339", icon: "twitter" },
                { href: "https://www.facebook.com/shashikantkumar.skntmax", icon: "facebook" },
                { href: "https://www.instagram.com/skntmax/", icon: "instagram" },
                { href: "https://www.linkedin.com/in/shashi-kant-5a1710185/", icon: "linkedin" }
              ].map((social, index) => (
                <motion.a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${social.icon}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fab fa-${social.icon}`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="main-nav">
            <ul>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="nav-icon" />
                      <span className="nav-text">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          className="active-indicator"
                          layoutId="activeIndicator"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header 
        className={`header-mobile ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mobile-header-content">
          <motion.div 
            className="mobile-profile"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/assets/img/Hompage.jpg" alt="Shashi Kant" />
            <span>Shashi Kant</span>
          </motion.div>
          
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                <div className="mobile-profile-large">
                  <img src={profileImage} alt="Shashi Kant" />
                  <div>
                    <h3>Shashi Kant</h3>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
              </div>
              
              <ul className="mobile-nav-list">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                      >
                        <Icon className="mobile-nav-icon" />
                        <span>{item.label}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
              
              <div className="mobile-social-links">
                {[
                  { href: "https://www.youtube.com/@skntmax", icon: FaYoutube, name: "youtube" },
                  { href: "https://twitter.com/Shashik84927339", icon: FaTwitter, name: "twitter" },
                  { href: "https://www.facebook.com/shashikantkumar.skntmax", icon: FaFacebook, name: "facebook" },
                  { href: "https://www.instagram.com/skntmax/", icon: FaInstagram, name: "instagram" },
                  { href: "https://www.linkedin.com/in/shashi-kant-5a1710185/", icon: FaLinkedinIn, name: "linkedin" }
                ].map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mobile-social-link ${social.name}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={`Follow me on ${social.name}`}
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
