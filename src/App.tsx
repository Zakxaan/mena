import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Capabilities } from './sections/Capabilities';
import { About } from './sections/About';
import { HowWeWork } from './sections/HowWeWork';
import { ClientImpact } from './sections/ClientImpact';
import { TechStack } from './sections/TechStack';
import { InnovationService } from './sections/InnovationService';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
        <div className="text-center">
          {/* Logo Animation */}
          <div className="relative mb-8">
            <div className="mx-auto flex items-center justify-center animate-pulse">
              <img
      src="images/logo.png" // same logo as navbar
      alt="Meanx AI Logo"
      className="w-10 h-10 object-contain"
    />
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute -top-2 left-1/2 w-2 h-2 bg-indigo-400 rounded-full" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full" />
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-2xl font-semibold text-white mb-2">
            meanx<span className="text-indigo-400">.ai</span>
          </h1>

          {/* Tagline */}
          <p className="text-white/50 text-sm mb-8">
            Innovation | Experience | Delivery
          </p>

          {/* Progress Bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-[loading_1.5s_ease-in-out]"
              style={{
                animation: 'loading 1.5s ease-in-out forwards',
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 60%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#12121a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <Capabilities />
        <About />
        <HowWeWork />
        <ClientImpact />
        <TechStack />
        <InnovationService />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
