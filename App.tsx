import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsConsole from './components/NewsConsole';
import Features from './components/Features';
import Capabilities from './components/Capabilities';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import styles from './App.module.css';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.app}>
      {/* Background Circuit Pattern Overlay */}
      <div
        className={styles.backgroundPattern}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: `0px ${scrollY * 0.5}px`
        }}
      />

      {/* Decorative Neon Lines */}
      <div className={styles.decorativeGlow}>
        <div className={styles.glowBlue}></div>
        <div className={styles.glowGreen}></div>
      </div>

      <div className={styles.content}>
        <Navbar />
        <main>
          <Hero />
          <NewsConsole />
          <Features />
          <Capabilities />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;