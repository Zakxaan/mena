import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Building2,
  Layers,
  Cloud,
  Workflow,
  Activity,
  Plug,
  Database,
  MessageSquare,
  Shield,
  Zap,
  ClipboardList,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Bot,
    title: 'Agentic AI',
    description: 'Autonomous AI agents that execute complex workflows, make decisions, and continuously learn from enterprise data.',
  },
  {
    icon: Building2,
    title: 'Enterprise Architecture',
    description: 'Strategic technology roadmaps aligned with business objectives, ensuring scalable and future-proof systems.',
  },
  {
    icon: Layers,
    title: 'Microservices Architecture',
    description: 'Modular, domain-driven services that enable independent deployment, scaling, and maintenance.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native Solutions',
    description: 'Containerized, scalable applications built for AWS, Azure, or GCP with optimal cost efficiency.',
  },
  {
    icon: Workflow,
    title: 'DevOps & Automation',
    description: 'CI/CD pipelines, infrastructure as code, and automated testing for rapid, reliable releases.',
  },
  {
    icon: Activity,
    title: 'APM & Observability',
    description: 'End-to-end monitoring, distributed tracing, and intelligent alerting for system reliability.',
  },
  {
    icon: Plug,
    title: 'Multi-System Integration',
    description: 'Seamless connectivity between legacy systems, SaaS platforms, and modern APIs.',
  },
  {
    icon: Database,
    title: 'Open APIs',
    description: 'Well-designed, documented APIs that enable ecosystem expansion and partner integrations.',
  },
  {
    icon: Zap,
    title: 'Data Streaming',
    description: 'Real-time event processing and streaming architectures for immediate insights and actions.',
  },
  {
    icon: MessageSquare,
    title: 'Chatbots & Conversational AI',
    description: 'Intelligent assistants that understand context, integrate with systems, and deliver results.',
  },
  {
    icon: Shield,
    title: 'Security & Governance',
    description: 'Enterprise-grade security, compliance frameworks, and data governance built into every solution.',
  },
  {
    icon: ClipboardList,
    title: 'Workflow Automation',
    description: 'Intelligent process automation that eliminates manual tasks and accelerates business outcomes.',
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

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

      // Cards staggered animation
      const cards = grid.querySelectorAll('.capability-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (_index: number, card: HTMLDivElement) => {
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('.card-glow'), {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(card.querySelector('.capability-icon'), {
      rotate: 5,
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(2)',
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(card.querySelector('.card-glow'), {
      opacity: 0,
      duration: 0.3,
    });
    gsap.to(card.querySelector('.capability-icon'), {
      rotate: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="section relative py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f]" />
      <div className="bg-grid opacity-50" />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Enterprise Capabilities
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            End-to-end expertise in AI, architecture, and automation —
            delivering systems that scale with your ambition.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={index}
                className="capability-card relative group"
                onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                {/* Glow effect */}
                <div
                  className="card-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity"
                  style={{
                    background:
                      'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.15), transparent 40%)',
                  }}
                />

                {/* Card content */}
                <div className="relative h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm overflow-hidden">
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                      <Icon className="capability-icon w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/50 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
