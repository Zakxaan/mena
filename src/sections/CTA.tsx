import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        content.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background gradient animation
      gsap.to('.cta-gradient-1', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.cta-gradient-2', {
        rotate: -360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);



  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Rotating gradient orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="cta-gradient-1 absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="cta-gradient-2 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'conic-gradient(from 180deg, #8b5cf6, #6366f1, #a855f7, #8b5cf6)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="bg-grid opacity-20" />

      <div className="container relative z-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="section-label">Get Started</span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Build{' '}
            <span className="gradient-text">Autonomous</span>
            <br />
            Systems Together
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Ready to transform your enterprise with AI-native solutions?
            Our architects are standing by to discuss your challenges and opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:contact@meanx.ai"
              className="btn btn-primary group text-lg px-8 py-4"
            >
              <Users className="w-5 h-5" />
              Talk to Our Architects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:contact@meanx.ai"
              className="btn btn-outline text-lg px-8 py-4"
            >
              <MessageSquare className="w-5 h-5" />
              Send a Message
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Free Initial Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>NDA Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
