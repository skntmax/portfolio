import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
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

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: "Noida sector 98, Uttar Pradesh, India",
      color: "#f5576c"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      content: "skntjee@gmail.com",
      color: "#667eea"
    },
    {
      icon: FaPhoneAlt,
      title: "Call",
      content: "+91 7860735070",
      color: "#4ecdc4"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false, message: '' });

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Thank you! Your message has been sent successfully.'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setFormStatus({ loading: false, success: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>Get In Touch</h2>
          <p>
            Ready to start your next project? I'd love to hear from you! 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="contact-grid">
            {/* Contact Information */}
            <motion.div 
              className="contact-info"
              variants={itemVariants}
            >
              <h3>Let's Connect</h3>
              <p className="contact-intro">
                I'm always excited to take on new challenges and collaborate on interesting projects. 
                Whether you have a question, want to discuss a project, or just want to say hello, 
                I'd love to hear from you!
              </p>

              <div className="contact-details">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="contact-item"
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        '--contact-color': info.color
                      }}
                    >
                      <div className="contact-icon">
                        <Icon />
                      </div>
                      <div className="contact-content-item">
                        <h4>{info.title}</h4>
                        <p>{info.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <motion.div 
                className="contact-map"
                variants={itemVariants}
              >
                <div className="map-placeholder">
                  <FaMapMarkerAlt />
                  <p>Interactive Map</p>
                  <span>Noida, Uttar Pradesh</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="contact-form-container"
              variants={itemVariants}
            >
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={formStatus.loading}
                  whileHover={{ scale: formStatus.loading ? 1 : 1.02 }}
                  whileTap={{ scale: formStatus.loading ? 1 : 0.98 }}
                >
                  {formStatus.loading ? (
                    <>
                      <FaSpinner className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane />
                    </>
                  )}
                </motion.button>

                {/* Form Status Messages */}
                {(formStatus.success || formStatus.error) && (
                  <motion.div
                    className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {formStatus.success && <FaCheckCircle />}
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="contact-bg">
        <div className="contact-bg-shape contact-bg-shape-1"></div>
        <div className="contact-bg-shape contact-bg-shape-2"></div>
        <div className="contact-bg-shape contact-bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Contact;
