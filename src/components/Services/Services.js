import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, 
  FaMobile, 
  FaDatabase, 
  FaCloud, 
  FaShoppingCart, 
  FaSearch,
  FaCogs,
  FaPalette,
  FaRocket
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
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

  const services = [
    {
      id: 1,
      icon: FaCode,
      title: "Responsive Web Design",
      description: "Create stunning, mobile-first responsive websites that work flawlessly across all devices and screen sizes.",
      features: ["Mobile-First Approach", "Cross-Browser Compatibility", "Optimized Performance", "Modern UI/UX"],
      color: "#667eea"
    },
    {
      id: 2,
      icon: FaShoppingCart,
      title: "E-commerce Solutions",
      description: "Build secure and scalable online stores with payment integration, inventory management, and user-friendly interfaces.",
      features: ["Payment Gateway Integration", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      color: "#f5576c"
    },
    {
      id: 3,
      icon: FaCogs,
      title: "Content Management Systems",
      description: "Develop custom CMS solutions that allow easy content management and updates without technical knowledge.",
      features: ["User-Friendly Interface", "Custom Modules", "SEO Optimization", "Multi-User Support"],
      color: "#4ecdc4"
    },
    {
      id: 4,
      icon: FaRocket,
      title: "Web Application Development",
      description: "Create powerful web applications that streamline business processes and enhance user experiences.",
      features: ["Custom Development", "API Integration", "Real-time Features", "Scalable Architecture"],
      color: "#ff9f43"
    },
    {
      id: 5,
      icon: FaPalette,
      title: "UI/UX Design",
      description: "Design intuitive and visually appealing interfaces that provide seamless user experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
      color: "#a55eea"
    },
    {
      id: 6,
      icon: FaDatabase,
      title: "API Development & Integration",
      description: "Develop robust APIs and integrate third-party services for seamless data communication.",
      features: ["RESTful APIs", "GraphQL", "Third-party Integration", "Data Security"],
      color: "#26de81"
    },
    {
      id: 7,
      icon: FaCogs,
      title: "Website Maintenance & Support",
      description: "Provide ongoing maintenance, updates, and support to keep your website secure and optimized.",
      features: ["Regular Updates", "Security Monitoring", "Performance Optimization", "Bug Fixes"],
      color: "#fd79a8"
    },
    {
      id: 8,
      icon: FaSearch,
      title: "SEO & Digital Marketing",
      description: "Optimize your website for search engines and implement digital marketing strategies.",
      features: ["On-page SEO", "Technical SEO", "Performance Optimization", "Analytics Setup"],
      color: "#00b894"
    },
    {
      id: 9,
      icon: FaCloud,
      title: "Cloud & DevOps Services",
      description: "Deploy and manage applications on cloud platforms with modern DevOps practices.",
      features: ["Cloud Deployment", "CI/CD Pipelines", "Monitoring", "Scalability"],
      color: "#6c5ce7"
    }
  ];

  return (
    <section id="services" className="services section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>My Services</h2>
          <p>
            I provide professional web development services tailored to your specific needs. 
            My expert team approach ensures stunning results that align with your brand and 
            engage your target audience effectively.
          </p>
        </motion.div>

        <motion.div
          className="services-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="service-card"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  style={{
                    '--service-color': service.color
                  }}
                >
                  <div className="service-icon">
                    <Icon />
                  </div>

                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p className="service-description">{service.description}</p>

                    <div className="service-features">
                      <h4>What's Included:</h4>
                      <ul>
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="service-cta">
                      <motion.button 
                        className="cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="service-hover-effect" />
                  <div className="service-border-effect" />
                </motion.div>
              );
            })}
          </div>

          {/* Services Summary */}
          <motion.div 
            className="services-summary"
            variants={itemVariants}
          >
            <div className="summary-content">
              <h3>Why Choose My Services?</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-icon">
                    <FaRocket />
                  </div>
                  <div className="summary-text">
                    <h4>Fast Delivery</h4>
                    <p>Quick turnaround time without compromising quality</p>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">
                    <FaCogs />
                  </div>
                  <div className="summary-text">
                    <h4>Custom Solutions</h4>
                    <p>Tailored development to meet your specific requirements</p>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">
                    <FaCloud />
                  </div>
                  <div className="summary-text">
                    <h4>Modern Technology</h4>
                    <p>Using latest technologies and best practices</p>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">
                    <FaPalette />
                  </div>
                  <div className="summary-text">
                    <h4>Great Design</h4>
                    <p>Beautiful, user-friendly interfaces that engage users</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="services-bg">
        <div className="services-bg-shape services-bg-shape-1"></div>
        <div className="services-bg-shape services-bg-shape-2"></div>
        <div className="services-bg-shape services-bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Services;
