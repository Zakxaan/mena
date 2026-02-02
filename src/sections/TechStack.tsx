import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'LLMs / NLP', category: 'AI' },
  { name: 'Kubernetes', category: 'Platform' },
  { name: 'OpenTelemetry', category: 'Observability' },
  { name: 'Prometheus', category: 'Observability' },
  { name: 'Grafana', category: 'Observability' },
  { name: 'ELK Stack', category: 'Observability' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Docker', category: 'Platform' },
  { name: 'Terraform', category: 'Infrastructure' },
  { name: 'Apache Kafka', category: 'Streaming' },
  { name: 'Redis', category: 'Data' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'MongoDB', category: 'Data' },
  { name: 'Python', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Go', category: 'Languages' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'GraphQL', category: 'API' },
  { name: 'gRPC', category: 'API' },
  { name: 'GitHub Actions', category: 'DevOps' },
  { name: 'ArgoCD', category: 'DevOps' },
];

const categoryColors: Record<string, string> = {
  AI: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300',
  Platform: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
  Observability: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
  Cloud: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300',
  Infrastructure: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300',
  Streaming: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-300',
  Data: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-300',
  Languages: 'from-lime-500/20 to-green-500/20 border-lime-500/30 text-lime-300',
  Frontend: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-300',
  Runtime: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300',
  API: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300',
  DevOps: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-300',
};

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const marquee = marqueeRef.current;
    const grid = gridRef.current;
    if (!section || !header || !marquee || !grid) return;

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

      // Marquee animation
      const marqueeContent = marquee.querySelector('.marquee-content');
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          x: '-50%',
          duration: 30,
          ease: 'none',
          repeat: -1,
        });
      }

      // Grid items animation
      const gridItems = grid.querySelectorAll('.tech-chip');
      gsap.fromTo(
        gridItems,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: {
            each: 0.03,
            from: 'random',
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

  // Duplicate technologies for seamless marquee
  const marqueeTechs = [...technologies, ...technologies];

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
      <div className="bg-grid opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="section-label">Our Toolkit</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Technology Stack
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We leverage industry-leading technologies to build scalable,
            reliable, and future-proof solutions.
          </p>
        </div>

        {/* Infinite Marquee */}
        <div
          ref={marqueeRef}
          className="relative mb-12 overflow-hidden py-4"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content flex gap-4 whitespace-nowrap">
            {marqueeTechs.map((tech, index) => (
              <div
                key={index}
                className={`inline-flex px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r ${categoryColors[tech.category]} border backdrop-blur-sm`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div ref={gridRef}>
          {Object.entries(
            technologies.reduce((acc, tech) => {
              if (!acc[tech.category]) acc[tech.category] = [];
              acc[tech.category].push(tech);
              return acc;
            }, {} as Record<string, typeof technologies>)
          ).map(([category, techs]) => (
            <div key={category} className="mb-8 last:mb-0">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {techs.map((tech, index) => (
                  <div
                    key={index}
                    className={`tech-chip px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${categoryColors[category]} border cursor-default hover:scale-105 transition-transform duration-200`}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
