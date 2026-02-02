import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimation<T extends HTMLElement>(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const {
    y = 60,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
  } = options;

  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [y, opacity, duration, delay, stagger, ease, start]);

  return containerRef;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

export function useStaggeredReveal<T extends HTMLElement>(
  selector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const { y = 40, duration = 0.8, stagger = 0.1, start = 'top 85%' } = options;
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, y, duration, stagger, start]);

  return containerRef;
}
