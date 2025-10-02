import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaGithub, FaEye, FaCode, FaMobile, FaDesktop } from 'react-icons/fa';
import './Projects.css';
// Import assets - Real project images
import ccilImage from '../assets/img/projects_shorts/ccil.png';
import rozgarImage from '../assets/img/projects_shorts/rozgar.com.png';
import luxorImage from '../assets/img/projects_shorts/luxor2.png';
import bytecodeImage from '../assets/img/projects_shorts/bytecode/bt1.png';
import eStoreImage from '../assets/img/projects_shorts/e-store.png';
import youtubeLiteImage from '../assets/img/projects_shorts/youtube-lite.png';
import chatAppImage from '../assets/img/projects_shorts/chatapp-home.png';
import todoMobileImage from '../assets/mobile/todo.png';
import contactListImage from '../assets/img/projects_shorts/contact-list.png';

const Projects = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [activeFilter, setActiveFilter] = useState('all');

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

    const projects = [
        {
            id: 1,
            title: "CCIL (Cement Corporation of India)",
            category: "enterprise",
            type: "web",
            description: "Government project for employee file and leave management system with multi-level approval workflow.",
            image: ccilImage,
            technologies: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
            features: ["File Management", "Leave System", "Committee Module", "Multi-level Approval"],
            liveUrl: "https://eoffice.cciltd.in/",
            status: "Live",
            year: "2021-Present"
        },
        {
            id: 2,
            title: "EPIL (Engineering Enterprise Project)",
            category: "enterprise",
            type: "web",
            description: "Enhanced version of CCIL with additional modules including E-filing, Knowledge Management, and Medical Reimbursement.",
            image: ccilImage,
            technologies: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
            features: ["E-filing Module", "Knowledge Management", "DAK Management", "E-tour", "Medical Reimbursement"],
            status: "Live",
            year: "2021-Present"
        },
        {
            id: 3,
            title: "Rozgar.com",
            category: "commercial",
            type: "web",
            description: "Job portal similar to Naukri.com with AI-powered resume builder and advanced search capabilities.",
            image: rozgarImage,
            technologies: ["Next.js", "Node.js", "MySQL", "AI Integration"],
            features: ["Job Search", "AI Resume Builder", "Cover Letter Generator", "Zoom Integration"],
            liveUrl: "https://rozgar.com",
            status: "Live",
            year: "2021-Present"
        },
        {
            id: 4,
            title: "Luxorpen CMS Website",
            category: "commercial",
            type: "web",
            description: "Content Management System for India's No. 1 manufacturer & exporter of writing instruments with dynamic animations.",
            image: luxorImage,
            technologies: ["Next.js", "Node.js", "MongoDB", "GSAP"],
            features: ["CMS Portal", "Product Catalog", "Admin Dashboard", "Dynamic Animations"],
            status: "Live",
            year: "2023"
        },
        {
            id: 5,
            title: "ByteCode.live",
            category: "personal",
            type: "web",
            description: "Learning platform and quiz portal with interactive coding challenges and educational content.",
            image: bytecodeImage,
            technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
            features: ["Quiz System", "Learning Modules", "User Dashboard", "Progress Tracking"],
            liveUrl: "https://bytecode.live/",
            status: "Live",
            year: "2022"
        },
        {
            id: 6,
            title: "E-Store Application",
            category: "personal",
            type: "web",
            description: "Full-featured e-commerce application with shopping cart, payment integration, and user management.",
            image: eStoreImage,
            technologies: ["React.js", "Node.js", "MongoDB", "Stripe"],
            features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management"],
            liveUrl: "https://e-store-1.netlify.app/",
            status: "Live",
            year: "2022"
        },
        {
            id: 7,
            title: "YouTube Lite",
            category: "personal",
            type: "web",
            description: "YouTube clone with YouTube Data v3 API integration for video streaming and search functionality.",
            image: youtubeLiteImage,
            technologies: ["React.js", "YouTube API", "CSS3", "JavaScript"],
            features: ["Video Streaming", "Search Functionality", "Video Details", "Related Videos"],
            liveUrl: "https://youtube-lyte.netlify.app/",
            status: "Live",
            year: "2022"
        },
        {
            id: 8,
            title: "Real-time Chat App",
            category: "personal",
            type: "web",
            description: "Real-time chat application with Socket.io, push notifications, and file sharing capabilities.",
            image: chatAppImage,
            technologies: ["React.js", "Socket.io", "Node.js", "MongoDB"],
            features: ["Real-time Messaging", "Push Notifications", "File Sharing", "User Status"],
            liveUrl: "https://chatapp-lyte.netlify.app/",
            status: "Live",
            year: "2022"
        },
        {
            id: 9,
            title: "Todo Mobile App",
            category: "personal",
            type: "mobile",
            description: "React Native todo application with offline support and beautiful animations.",
            image: todoMobileImage,
            technologies: ["React Native", "AsyncStorage", "Animated API"],
            features: ["Task Management", "Offline Support", "Beautiful UI", "Local Storage"],
            liveUrl: "https://drive.google.com/file/d/147sWNUfoBgTew_KXK_xzfIKvlzc-qpyT/view",
            status: "Live",
            year: "2022"
        }
    ];

    const filters = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'enterprise', label: 'Enterprise', count: projects.filter(p => p.category === 'enterprise').length },
        { id: 'commercial', label: 'Commercial', count: projects.filter(p => p.category === 'commercial').length },
        { id: 'personal', label: 'Personal', count: projects.filter(p => p.category === 'personal').length },
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    return (
        <section id="portfolio" className="projects section" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-title"
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <h2>My Projects</h2>
                    <p>
                        Here's a showcase of my work including enterprise applications, commercial projects,
                        and personal developments. Each project demonstrates different aspects of my
                        full-stack development expertise.
                    </p>
                </motion.div>

                <motion.div
                    className="projects-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {/* Filter Navigation */}
                    <div className="projects-filter">
                        {filters.map(filter => (
                            <motion.button
                                key={filter.id}
                                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{filter.label}</span>
                                <span className="filter-count">{filter.count}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                        className="projects-grid"
                        layout
                        transition={{ duration: 0.5 }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`project-card ${project.type}`}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                                layout
                            >
                             <div 
                                className="project-image"
                                onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
                                style={{ cursor: project.liveUrl ? 'pointer' : 'default' }}
                             >
                                 <img 
                                    src={project.image} 
                                    alt={project.title}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (project.liveUrl) {
                                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                    style={{ cursor: 'pointer' }}
                                 />
                                 <div className="project-overlay">
                                     <div className="project-actions">
                                         {project.liveUrl && (
                                             <motion.a
                                                 href={project.liveUrl}
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="action-btn live"
                                                 whileHover={{ scale: 1.15 }}
                                                 whileTap={{ scale: 0.9 }}
                                                 onClick={(e) => {
                                                     e.preventDefault();
                                                     e.stopPropagation();
                                                     window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                                 }}
                                                 title="View Live Project"
                                             >
                                                 <FaExternalLinkAlt />
                                             </motion.a>
                                         )}
                                         <motion.button
                                             className="action-btn details"
                                             whileHover={{ scale: 1.15 }}
                                             whileTap={{ scale: 0.9 }}
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 // Add modal or detailed view functionality here
                                                 console.log('Show project details for:', project.title);
                                             }}
                                             title="View Project Details"
                                         >
                                             <FaEye />
                                         </motion.button>
                                     </div>
                                 </div>

                                    {/* Project Type Badge */}
                                    <div className={`project-type-badge ${project.type}`}>
                                        {project.type === 'mobile' ? <FaMobile /> : <FaDesktop />}
                                        <span>{project.type === 'mobile' ? 'Mobile' : 'Web'}</span>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`status-badge ${project.status.toLowerCase()}`}>
                                        {project.status}
                                    </div>
                                </div>

                                <div className="project-content">
                                    <div className="project-header">
                                        <h3>{project.title}</h3>
                                        <span className="project-year">{project.year}</span>
                                    </div>

                                    <p className="project-description">{project.description}</p>

                                    <div className="project-features">
                                        <h4>Key Features:</h4>
                                        <ul>
                                            {project.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                            {project.features.length > 3 && (
                                                <li className="more-features">+{project.features.length - 3} more</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="project-technologies">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="project-hover-effect" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Projects Stats */}
                    <motion.div
                        className="projects-stats"
                        variants={itemVariants}
                    >
                        <div className="stat-item">
                            <FaCode className="stat-icon" />
                            <div className="stat-content">
                                <span className="stat-number">{projects.length}</span>
                                <span className="stat-label">Total Projects</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <FaDesktop className="stat-icon" />
                            <div className="stat-content">
                                <span className="stat-number">{projects.filter(p => p.type === 'web').length}</span>
                                <span className="stat-label">Web Applications</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <FaMobile className="stat-icon" />
                            <div className="stat-content">
                                <span className="stat-number">{projects.filter(p => p.type === 'mobile').length}</span>
                                <span className="stat-label">Mobile Apps</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="projects-bg">
                <div className="projects-bg-shape projects-bg-shape-1"></div>
                <div className="projects-bg-shape projects-bg-shape-2"></div>
                <div className="projects-bg-shape projects-bg-shape-3"></div>
            </div>
        </section>
    );
};

export default Projects;
