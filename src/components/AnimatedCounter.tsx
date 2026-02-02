import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter || hasAnimated) return;

    const ctx = gsap.context(() => {
      const obj = { value: from };
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated) return;
          setHasAnimated(true);
          
          gsap.to(obj, {
            value: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = prefix + obj.value.toFixed(decimals) + suffix;
            },
          });
        },
      });
    }, counter);

    return () => ctx.revert();
  }, [from, to, duration, prefix, suffix, decimals, hasAnimated]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{from.toFixed(decimals)}{suffix}
    </span>
  );
}

interface MetricComparisonProps {
  before: string;
  after: string;
  label: string;
  className?: string;
}

export function MetricComparison({
  before,
  after,
  label,
  className = '',
}: MetricComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container.querySelectorAll('.metric-item'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        container.querySelector('.metric-arrow'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`metric-comparison ${className}`}>
      <div className="metric-item metric-before">
        <span className="metric-value">{before}</span>
        <span className="metric-label">Before</span>
      </div>
      <div className="metric-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <div className="metric-item metric-after">
        <span className="metric-value">{after}</span>
        <span className="metric-label">After</span>
      </div>
      <span className="metric-description">{label}</span>
    </div>
  );
}
