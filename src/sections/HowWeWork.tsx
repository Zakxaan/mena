import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Settings, TrendingUp, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discover & Diagnose',
    description:
      'We begin with deep discovery — understanding your business objectives, current systems, pain points, and opportunities. Our architects analyze your technology landscape to identify quick wins and strategic imperatives.',
    deliverables: ['Current State Assessment', 'Gap Analysis', 'Opportunity Mapping'],
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Architect & Design',
    description:
      'With insights in hand, we design comprehensive solutions — from AI agent architectures to cloud-native platforms. Every design decision balances technical excellence with business value.',
    deliverables: ['Solution Architecture', 'Technical Roadmap', 'Integration Strategy'],
  },
  {
    icon: Code,
    number: '03',
    title: 'Build & Integrate',
    description:
      'Our engineering teams bring designs to life using modern practices — microservices, APIs, and AI/ML pipelines. We integrate seamlessly with your existing systems while minimizing disruption.',
    deliverables: ['Production Code', 'API Contracts', 'System Integration'],
  },
  {
    icon: Settings,
    number: '04',
    title: 'Automate & Optimize',
    description:
      'We implement intelligent automation — from CI/CD pipelines to AI-powered workflows. Continuous optimization ensures your systems perform at peak efficiency.',
    deliverables: ['CI/CD Pipelines', 'Automated Workflows', 'Performance Tuning'],
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Measure & Scale',
    description:
      'Success is measured in outcomes. We establish metrics, monitoring, and feedback loops that drive continuous improvement and enable confident scaling.',
    deliverables: ['Success Metrics', 'Monitoring Dashboards', 'Scaling Strategy'],
  },
];

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stepsContainer = stepsRef.current;
    if (!section || !header || !stepsContainer) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      const stepCards = stepsContainer.querySelectorAll('.step-card');
      stepCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Progress line animation
      gsap.fromTo(
        '.progress-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsContainer,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section relative py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d12] to-[#0a0a0f]" />
      <div className="bg-grid opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label">Our Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            How We Work
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A proven methodology that delivers results — from initial discovery
            to production-scale systems.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden sm:block">
            <div className="progress-line-fill absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 origin-top" />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <div
                  key={index}
                  className={`step-card relative md:grid md:grid-cols-2 md:gap-16 ${
                    index > 0 ? 'md:mt-12' : ''
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Timeline Node */}
                  <div
                    className={`hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 z-10 ${
                      isActive ? 'scale-110' : ''
                    } transition-transform duration-300`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-white/50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`${
                      isEven ? 'md:pr-24 md:text-right' : 'md:col-start-2 md:pl-24'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4 md:hidden">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isActive
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                            : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-4xl font-bold text-white/10">
                        {step.number}
                      </span>
                    </div>

                    <span
                      className={`hidden md:block text-6xl font-bold mb-4 ${
                        isEven ? 'md:text-right' : ''
                      }`}
                      style={{ color: 'rgba(255,255,255,0.05)' }}
                    >
                      {step.number}
                    </span>

                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                      {step.title}
                    </h3>

                    <p className="text-white/60 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Deliverables */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isEven ? 'md:justify-end' : ''
                      }`}
                    >
                      {step.deliverables.map((deliverable, dIndex) => (
                        <span
                          key={dIndex}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10"
                        >
                          <ChevronRight className="w-3 h-3 text-indigo-400" />
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  {!isEven && <div className="hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
