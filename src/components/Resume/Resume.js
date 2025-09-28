import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaBuilding,
  FaCode,
  FaUsers,
  FaProjectDiagram
} from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
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

  const workExperience = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Paytm",
      location: "Noida sector 98, Uttar Pradesh, India",
      period: "JAN 2025 - Present",
      type: "Full-time",
      description: "Currently working on Oreddo, LLA project and Dhiragu marketplace with focus on seamless UI design and functionality building.",
      responsibilities: [
        "Worked on Oreddo, LLA project and Dhiragu marketplace",
        "Seamless UI design with functionality building of Dhiragu marketplace",
        "Write effective APIs and integrate them to frontend",
        "Taking care of performance-based issues",
        "Creating new modules and solving bugs"
      ],
      technologies: ["React.js", "Node.js", "TypeScript", "MongoDB"]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Policybazaar",
      location: "Gurugram sector 45",
      period: "APRIL 2024 - JAN 2025",
      type: "Full-time",
      description: "Worked on sales and policy driven web applications with focus on Phoenix and IVR modules.",
      responsibilities: [
        "Worked on sales and policy driven web applications",
        "Seamless UI design with functionality building of Phoenix and IVR module",
        "Write effective APIs and integrate them to frontend",
        "Taking care of performance-based issues",
        "Creating new modules and solving bugs"
      ],
      technologies: ["React.js", "Node.js", "JavaScript", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "VIL (Value Innovation Labs)",
      location: "Noida sector 16",
      period: "NOV 2021 - APRIL 2024",
      type: "Full-time",
      description: "Led design, development, and implementation of various government projects using MERN stack.",
      responsibilities: [
        "Lead in the design, development, and implementation of graphic, layout, and production communication materials",
        "Work with development teams and product managers to ideate software solutions",
        "Write effective APIs and integrate them to frontend",
        "Take care of performance-based issues",
        "Create new modules and solve bugs"
      ],
      technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "PostgreSQL"]
    },
    {
      id: 4,
      title: "Full Stack Development Intern",
      company: "Internshala",
      location: "Remote",
      period: "2021",
      type: "Internship",
      description: "Full Stack development program focusing on web technologies and modern development practices.",
      responsibilities: [
        "Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements)",
        "Managed up to 5 projects or tasks at a given time while under pressure",
        "Recommended and consulted with clients on the most appropriate graphic design",
        "Created 4+ design presentations and proposals a month for clients and account managers"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"]
    }
  ];

  const education = [
    {
      id: 1,
      degree: "B.Tech (Computer Science and Engineering)",
      institution: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
      period: "2017 - 2021",
      description: "Chhatrapati Shahu Ji Maharaj University, formerly Kanpur University, is a public state university located in Kanpur, Uttar Pradesh, India. It is administered under the state legislature of the government of Uttar Pradesh.",
      grade: "First Class",
      activities: ["Technical Society Member", "Coding Club Participant", "Project Team Lead"]
    },
    {
      id: 2,
      degree: "12th Grade",
      institution: "Swami Harsewanand Public School, Garhwaghat, Varanasi",
      period: "2015 - 2016",
      description: "Swami Harsewanand Public School. The school was established in 2001. Swami Harsewanand Public School is a Co-Ed school affiliated to Central Board of Secondary Education (CBSE).",
      grade: "First Division",
      activities: ["Science Club Member", "Mathematics Olympiad Participant"]
    }
  ];

  const personalInfo = {
    name: "Shashi Kant",
    summary: "Dedicated and efficient full stack web developer using MERN stack since last 4+ years, currently working at Paytm as Senior Software Engineer. Previously worked at Policybazaar and Value Innovation Labs where I contributed to various government projects such as CCIL (Cement Corporation of India), EPIL (Engineering Enterprise Project), HRMS (Employee Management System), CSC (Common Service Center) etc. All projects were completely based on MERN stack. Certified by both Internshala and LinkedIn. Seeking to further improve JavaScript and Node.js skills as a future-oriented full stack developer.",
    contact: {
      location: "Noida, Sector 98",
      phone: "+91 7860735070",
      email: "skntjee@gmail.com"
    }
  };

  return (
    <section id="resume" className="resume section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>Qualification & Experience</h2>
          <p>
            My professional journey showcases a blend of technical expertise and practical experience. 
            Here's a comprehensive overview of my educational background and work experience in the 
            software development industry.
          </p>
        </motion.div>

        <motion.div
          className="resume-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Personal Summary */}
          <motion.div 
            className="personal-summary"
            variants={itemVariants}
          >
            <div className="summary-header">
              <h3>{personalInfo.name}</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>{personalInfo.contact.location}</span>
                </div>
                <div className="contact-item">
                  <FaCalendarAlt />
                  <span>{personalInfo.contact.phone}</span>
                </div>
                <div className="contact-item">
                  <FaCalendarAlt />
                  <span>{personalInfo.contact.email}</span>
                </div>
              </div>
            </div>
            <p className="summary-text">{personalInfo.summary}</p>
          </motion.div>

          {/* Resume Timeline */}
          <div className="resume-timeline">
            {/* Work Experience */}
            <motion.div 
              className="timeline-section"
              variants={itemVariants}
            >
              <div className="section-header">
                <div className="header-content">
                  <FaBriefcase className="section-icon" />
                  <h3>Professional Experience</h3>
                </div>
                <div className="section-count">{workExperience.length} Positions</div>
              </div>

              <div className="timeline">
                {workExperience.map((job, index) => (
                  <motion.div
                    key={job.id}
                    className="timeline-item work-item"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="timeline-marker">
                      <FaBriefcase />
                    </div>
                    
                    <div className="timeline-content">
                      <div className="content-header">
                        <div className="job-info">
                          <h4>{job.title}</h4>
                          <div className="company-info">
                            <FaBuilding />
                            <span>{job.company}</span>
                            <span className="job-type">{job.type}</span>
                          </div>
                        </div>
                        <div className="job-meta">
                          <div className="job-period">
                            <FaCalendarAlt />
                            <span>{job.period}</span>
                          </div>
                          <div className="job-location">
                            <FaMapMarkerAlt />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="job-description">{job.description}</p>

                      <div className="responsibilities">
                        <h5>Key Responsibilities:</h5>
                        <ul>
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="technologies">
                        <h5>Technologies Used:</h5>
                        <div className="tech-tags">
                          {job.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div 
              className="timeline-section"
              variants={itemVariants}
            >
              <div className="section-header">
                <div className="header-content">
                  <FaGraduationCap className="section-icon" />
                  <h3>Education</h3>
                </div>
                <div className="section-count">{education.length} Qualifications</div>
              </div>

              <div className="timeline">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="timeline-item education-item"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="timeline-marker">
                      <FaGraduationCap />
                    </div>
                    
                    <div className="timeline-content">
                      <div className="content-header">
                        <div className="edu-info">
                          <h4>{edu.degree}</h4>
                          <div className="institution-info">
                            <FaBuilding />
                            <span>{edu.institution}</span>
                          </div>
                        </div>
                        <div className="edu-meta">
                          <div className="edu-period">
                            <FaCalendarAlt />
                            <span>{edu.period}</span>
                          </div>
                          <div className="edu-grade">
                            Grade: <strong>{edu.grade}</strong>
                          </div>
                        </div>
                      </div>

                      <p className="edu-description">{edu.description}</p>

                      <div className="activities">
                        <h5>Activities:</h5>
                        <div className="activity-tags">
                          {edu.activities.map((activity, idx) => (
                            <span key={idx} className="activity-tag">{activity}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="resume-bg">
        <div className="resume-bg-shape resume-bg-shape-1"></div>
        <div className="resume-bg-shape resume-bg-shape-2"></div>
        <div className="resume-bg-shape resume-bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Resume;
