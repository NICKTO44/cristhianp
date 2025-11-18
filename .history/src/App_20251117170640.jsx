import { useEffect } from 'react';
import GridBackground from './components/GridBackground';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent default cursor on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      document.body.style.cursor = 'none';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-primary-black min-h-screen overflow-x-hidden">
      {/* Background Elements */}
      <GridBackground />
      
      {/* Custom Cursor (only desktop) */}
      <CustomCursor />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        <main>
          <Hero />
          <About />
          <Technologies />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;