import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Certificates from './components/Certificates/Certificates';
import Skills from './components/Skills/Skills';
import Resume from './components/Resume/Resume';
import Projects from './components/Projects/Projects';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import MobileHeaderFix from './components/MobileHeaderFix';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ParticleBackground />
        <MobileHeaderFix />
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Certificates />
          <Skills />
          <Resume />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
