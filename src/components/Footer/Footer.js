import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaArrowUp,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaYoutube, url: "https://www.youtube.com/@skntmax", label: "YouTube" },
    { icon: FaTwitter, url: "https://twitter.com/Shashik84927339", label: "Twitter" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/shashi-kant-5a1710185/", label: "LinkedIn" },
    { icon: FaInstagram, url: "https://www.instagram.com/skntmax/", label: "Instagram" },
    { icon: FaGithub, url: "#", label: "GitHub" }
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            <div className="footer-grid">
              {/* About Column */}
              <div className="footer-column">
                <div className="footer-brand">
                  <h3>Shashi Kant</h3>
                  <p className="brand-tagline">Full Stack Developer (MERN)</p>
                </div>
                
                <p className="footer-description">
                  Passionate full-stack developer with 4+ years of experience creating 
                  robust web applications using modern technologies. Let's build something 
                  amazing together!
                </p>

                <div className="footer-social">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={social.label}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="footer-column">
                <h4>Quick Links</h4>
                <nav className="footer-nav">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="footer-link"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Services Column */}
              <div className="footer-column">
                <h4>Services</h4>
                <nav className="footer-nav">
                  <a href="#services" className="footer-link">Web Development</a>
                  <a href="#services" className="footer-link">Mobile Apps</a>
                  <a href="#services" className="footer-link">API Development</a>
                  <a href="#services" className="footer-link">UI/UX Design</a>
                  <a href="#services" className="footer-link">Consulting</a>
                </nav>
              </div>

              {/* Contact Column */}
              <div className="footer-column">
                <h4>Get in Touch</h4>
                <div className="footer-contact">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Noida, Uttar Pradesh</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:skntjee@gmail.com">skntjee@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <a href="tel:+917860735070">+91 7860735070</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © {currentYear} Shashi Kant. Made with <FaHeart className="heart-icon" /> in India
              </p>
            </div>

            <div className="footer-credits">
              <p>Designed & Developed by Shashi Kant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <FaArrowUp />
      </motion.button>

      {/* Background Elements */}
      <div className="footer-bg">
        <div className="footer-bg-shape footer-bg-shape-1"></div>
        <div className="footer-bg-shape footer-bg-shape-2"></div>
      </div>
    </footer>
  );
};

export default Footer;
