import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GradientOrbs, ParticleBackground } from '@/components/ParticleBackground';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });

      // Entrance animation sequence
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.5'
        );

      // Title word animation
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.5,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <GradientOrbs />
      <ParticleBackground particleCount={40} connectionDistance={120} />
      <div className="bg-grid" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 container text-center px-6">
        {/* Badge */}
        <div ref={badgeRef} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Innovation | Experience | Delivery
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl mx-auto leading-tight"
          style={{ perspective: '1000px' }}
        >
          <span className="word inline-block">AI-Native</span>{' '}
          <span className="word inline-block">Enterprise</span>
          <br />
          <span className="word inline-block gradient-text">Transformation</span>{' '}
          <span className="word inline-block">Partner</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We architect autonomous systems that integrate, automate, and scale.
          From agentic AI to cloud-native platforms — we deliver enterprise transformation
          with measurable outcomes.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('capabilities')}
            className="btn btn-primary group"
          >
            Explore Capabilities
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('impact')}
            className="btn btn-outline"
          >
            See Client Impact
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: '50+', label: 'Enterprise Clients' },
            { value: '200+', label: 'Projects Delivered' },
            { value: '10x', label: 'Avg. Efficiency Gain' },
            { value: '99.9%', label: 'Uptime Achieved' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
