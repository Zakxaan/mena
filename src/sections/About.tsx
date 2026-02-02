import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Network, Layers, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Cpu,
    title: 'AI-Native Execution',
    description:
      'We build with AI at the core, not as an afterthought. Every solution leverages machine learning, natural language processing, and intelligent automation.',
  },
  {
    icon: Network,
    title: 'Agentic Systems',
    description:
      'Autonomous agents that perceive, decide, and act. From customer service to data processing, our agents handle complex workflows with minimal human intervention.',
  },
  {
    icon: Layers,
    title: 'Unified Execution Layer',
    description:
      'A single, coherent platform that integrates disparate systems, data sources, and processes into a seamless operational fabric.',
  },
  {
    icon: Rocket,
    title: 'Autonomous Enterprise',
    description:
      'The future of business operations — self-managing, self-optimizing, and self-healing systems that drive continuous improvement.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const pillarsContainer = pillarsRef.current;
    if (!section || !content || !pillarsContainer) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        content.querySelectorAll('.reveal-item'),
        { y: 50, opacity: 0 },
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

      // Pillars staggered animation
      const pillarCards = pillarsContainer.querySelectorAll('.pillar-card');
      gsap.fromTo(
        pillarCards,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsContainer,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative line animation
      gsap.fromTo(
        '.pillar-connector',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillarsContainer,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="bg-grid opacity-30" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="reveal-item section-label">About meanx.ai</span>
            <h2 className="reveal-item text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Engineering the
              <span className="gradient-text"> Autonomous</span>
              <br />
              Enterprise
            </h2>
            <div className="reveal-item space-y-4 text-white/60 text-lg leading-relaxed mb-8">
              <p>
                At meanx.ai, we believe the future of enterprise technology is autonomous 
                systems that think, adapt, and optimize themselves. We partner with forward-thinking
                organizations to architect and build this future.
              </p>
              <p>
                Our team combines deep expertise in artificial intelligence, distributed systems,
                and enterprise architecture to deliver solutions that don't just meet today's needs
                but anticipate tomorrow's challenges.
              </p>
            </div>

            {/* Stats */}
            <div className="reveal-item grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '10+', label: 'AI Engineers' },
                { value: '1', label: 'Global Offices' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Pillars */}
          <div ref={pillarsRef} className="relative">
            {/* Connector line */}
            <div className="pillar-connector absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent origin-top hidden lg:block" />

            <div className="space-y-6">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className="pillar-card relative pl-0 lg:pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="hidden lg:flex absolute left-0 top-6 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center shadow-lg shadow-indigo-500/30 z-10">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-colors duration-300">
                      <div className="lg:hidden w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
