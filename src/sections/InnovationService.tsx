import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, FlaskConical, Rocket, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Lightbulb,
    title: 'Rapid Experimentation',
    description:
      'Test ideas quickly with dedicated innovation sprints. We prototype, validate, and iterate to find what works.',
  },
  {
    icon: FlaskConical,
    title: 'Proof of Concepts',
    description:
      'Build working prototypes that demonstrate real value before committing to full-scale development.',
  },
  {
    icon: Rocket,
    title: 'Fast Commercialization',
    description:
      'Accelerate time-to-market with our proven frameworks for taking innovations from lab to production.',
  },
  {
    icon: Target,
    title: 'Outcome-Focused',
    description:
      'Every experiment is tied to measurable business outcomes — revenue, efficiency, or customer satisfaction.',
  },
];

const outcomes = [
  { metric: '2-4x', label: 'Faster Time-to-Market' },
  { metric: '60%', label: 'Reduction in R&D Waste' },
  { metric: '3x', label: 'Higher Success Rate' },
];

export function InnovationService() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const outcomesSection = outcomesRef.current;
    if (!section || !header || !cards || !outcomesSection) return;

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

      // Cards animation
      const cardElements = cards.querySelectorAll('.innovation-card');
      gsap.fromTo(
        cardElements,
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Outcomes animation
      const outcomeItems = outcomesSection.querySelectorAll('.outcome-item');
      gsap.fromTo(
        outcomeItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: outcomesSection,
            start: 'top 85%',
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
      id="innovation"
      className="section relative py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0c0c12] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="bg-grid opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label">Engagement Model</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Innovation-as-a-Service
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Don't just keep up with technology — stay ahead. Our innovation
            service helps you experiment, validate, and commercialize new ideas
            at startup speed with enterprise rigor.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="innovation-card group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-300"
                style={{ perspective: '1000px' }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outcomes */}
        <div
          ref={outcomesRef}
          className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">
              Measurable Outcomes
            </h3>
            <p className="text-white/50">
              Real results from our innovation partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="outcome-item text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {outcome.metric}
                </div>
                <div className="text-white/60">{outcome.label}</div>
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
