import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaTools, 
  FaCloud,
  FaMobile,
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaWordpress,
  FaLinux,
  FaDocker,
  FaAws,
  FaJava
} from 'react-icons/fa';
import { SiMongodb, SiMysql, SiTypescript, SiNextdotjs, SiPostgresql } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [activeCategory, setActiveCategory] = useState('frontend');

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

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: FaCode,
      color: '#667eea',
      skills: [
        { name: 'HTML', level: 80, icon: FaHtml5, color: '#E34F26' },
        { name: 'CSS', level: 50, icon: FaCss3Alt, color: '#1572B6' },
        { name: 'JavaScript', level: 95, icon: FaJs, color: '#F7DF1E' },
        { name: 'TypeScript', level: 80, icon: SiTypescript, color: '#3178C6' },
        { name: 'React.js', level: 95, icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', level: 95, icon: SiNextdotjs, color: '#000000' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: FaServer,
      color: '#f5576c',
      skills: [
        { name: 'Node.js', level: 80, icon: FaNodeJs, color: '#339933' },
        { name: 'Nest Js', level: 80, icon: FaNodeJs, color: '#339933' },
        { name: 'Spring Boot', level: 80, icon: FaJava, color: '#339933' },
        { name: 'PHP', level: 80, icon: FaPhp, color: '#777BB4' },
        { name: 'React Native', level: 95, icon: FaReact, color: '#61DAFB' },
        { name: 'WordPress/CMS', level: 90, icon: FaWordpress, color: '#21759B' }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: FaDatabase,
      color: '#4ecdc4',
      skills: [
        { name: 'MongoDB', level: 70, icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', level: 95, icon: SiMysql, color: '#4479A1' },
        { name: 'PostgreSQL', level: 85, icon: SiPostgresql, color: '#336791' },
        { name: 'SQL', level: 95, icon: FaDatabase, color: '#00758F' }
      ]
    },
    devops: {
      title: 'DevOps & Cloud',
      icon: FaCloud,
      color: '#ff9f43',
      skills: [
        { name: 'Linux', level: 90, icon: FaLinux, color: '#FCC624' },
        { name: 'Docker', level: 95, icon: FaDocker, color: '#2496ED' },
        { name: 'AWS', level: 80, icon: FaAws, color: '#FF9900' },
        { name: 'Cloud Computing', level: 80, icon: FaCloud, color: '#4285F4' }
      ]
    },
    tools: {
      title: 'Tools & Others',
      icon: FaTools,
      color: '#a55eea',
      skills: [
        { name: 'DSA', level: 80, icon: FaCode, color: '#667eea' },
        { name: 'Team Management', level: 90, icon: FaTools, color: '#f5576c' },
        { name: 'React Query', level: 80, icon: FaReact, color: '#ff6b6b' },
        { name: 'Mobile Development', level: 85, icon: FaMobile, color: '#4ecdc4' }
      ]
    }
  };

  return (
    <section id="skills" className="skills section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2>Skills & Expertise</h2>
          <p>
            Over the time I've brushed up my development skills in various technologies. 
            Here are the skills I've mastered through continuous learning and practical experience 
            in real-world projects.
          </p>
        </motion.div>

        <motion.div
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Skill Categories Navigation */}
          <div className="skills-nav">
            {Object.entries(skillCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={key}
                  className={`skill-nav-btn ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    '--category-color': category.color
                  }}
                >
                  <Icon className="nav-icon" />
                  <span>{category.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Skills Display */}
          <motion.div 
            className="skills-display"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="skills-header">
              <div className="category-info">
                {React.createElement(skillCategories[activeCategory].icon, {
                  className: 'category-icon',
                  style: { color: skillCategories[activeCategory].color }
                })}
                <h3 style={{ color: skillCategories[activeCategory].color }}>
                  {skillCategories[activeCategory].title}
                </h3>
              </div>
              <div className="skills-count">
                {skillCategories[activeCategory].skills.length} Skills
              </div>
            </div>

            <div className="skills-grid">
              {skillCategories[activeCategory].skills.map((skill, index) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <SkillIcon 
                          className="skill-icon" 
                          style={{ color: skill.color }}
                        />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>

                    <div className="skill-progress">
                      <div className="progress-track">
                        <motion.div
                          className="progress-fill"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)`
                          }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: index * 0.1 + 0.5,
                            ease: "easeOut"
                          }}
                        >
                          <div className="progress-shine" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Skill Level Indicator */}
                    <div className="skill-level">
                      {skill.level >= 90 && <span className="level-badge expert">Expert</span>}
                      {skill.level >= 70 && skill.level < 90 && <span className="level-badge advanced">Advanced</span>}
                      {skill.level < 70 && <span className="level-badge intermediate">Intermediate</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Category Summary */}
            <motion.div 
              className="category-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-label">Average Level</span>
                  <span className="stat-value" style={{ color: skillCategories[activeCategory].color }}>
                    {Math.round(skillCategories[activeCategory].skills.reduce((acc, skill) => acc + skill.level, 0) / skillCategories[activeCategory].skills.length)}%
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Expert Skills</span>
                  <span className="stat-value" style={{ color: skillCategories[activeCategory].color }}>
                    {skillCategories[activeCategory].skills.filter(skill => skill.level >= 90).length}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Years Experience</span>
                  <span className="stat-value" style={{ color: skillCategories[activeCategory].color }}>
                    4+
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="skills-bg">
        <div className="skills-bg-shape skills-bg-shape-1"></div>
        <div className="skills-bg-shape skills-bg-shape-2"></div>
        <div className="skills-bg-shape skills-bg-shape-3"></div>
      </div>
    </section>
  );
};

export default Skills;
