import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Bot, 
  Activity, 
  MessageSquare, 
  GitBranch, 
  Layers, 
  Cloud, 
  Workflow, 
  Eye, 
  Zap, 
  Shield 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<number, React.ReactNode> = {
  0: <Bot className="usecase-icon" />,
  1: <Activity className="usecase-icon" />,
  2: <MessageSquare className="usecase-icon" />,
  3: <GitBranch className="usecase-icon" />,
  4: <Layers className="usecase-icon" />,
  5: <Cloud className="usecase-icon" />,
  6: <Workflow className="usecase-icon" />,
  7: <Eye className="usecase-icon" />,
  8: <Zap className="usecase-icon" />,
  9: <Shield className="usecase-icon" />,
};

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cases = [
    {
      title: "Agentic AI for Customer Service Automation",
      impact: [
        "Turnaround time reduced from 15 minutes to 2 minutes",
        "80% automated case handling",
        "Improved customer satisfaction and peak throughput"
      ],
      tech: "Agentic AI, LLM/NLP, Workflow Orchestration, Open APIs, Cloud-native"
    },
    {
      title: "APM Observability for Insurance Claims",
      impact: [
        "End-to-end visibility across microservices",
        "Faster root cause analysis",
        "Improved reliability and performance"
      ],
      tech: "OpenTelemetry, Jaeger, Prometheus, Grafana, ELK, Kubernetes"
    },
    {
      title: "LLM-Powered Conversational Applications",
      impact: [
        "Delivered AI assistants for customer and employee interactions",
        "Integrated contextual reasoning with backend systems via secure APIs",
        "Improved response accuracy, consistency, and resolution speed"
      ],
      tech: "LLMs · NLP · Conversational AI · API Integration"
    },
    {
      title: "Production-Grade MLOps Implementation",
      impact: [
        "Implemented end-to-end ML pipelines from training to production",
        "Enabled model versioning, monitoring, and safe rollbacks",
        "Reduced operational risk of AI deployments"
      ],
      tech: "MLOps · Model Lifecycle · CI/CD for ML"
    },
    {
      title: "Microservices Platform with OpenAPI",
      impact: [
        "Decomposed complex workloads into domain-aligned microservices",
        "Designed OpenAPI contracts for seamless system interoperability",
        "Enabled independent scaling and faster feature delivery"
      ],
      tech: "Microservices · OpenAPI · Domain-Driven Design"
    },
    {
      title: "Cloud-Native Platform on AWS",
      impact: [
        "Architected and deployed scalable cloud platforms on AWS",
        "Implemented secure networking, IAM, and observability",
        "Optimized performance, availability, and cloud costs"
      ],
      tech: "AWS · Cloud Architecture · Security"
    },
    {
      title: "DevOps & CI/CD Enablement",
      impact: [
        "Implemented automated CI/CD pipelines for consistent deployments",
        "Standardized environments using infrastructure-as-code",
        "Improved release velocity and platform stability"
      ],
      tech: "DevOps · CI/CD · GitOps · Automation"
    },
    {
      title: "APM & Observability for Distributed Systems",
      impact: [
        "Implemented end-to-end observability across microservices",
        "Enabled faster root-cause analysis and MTTR reduction",
        "Improved reliability under peak production loads"
      ],
      tech: "OpenTelemetry · Jaeger · Prometheus · Grafana · ELK"
    },
    {
      title: "Event-Driven & Streaming Architectures",
      impact: [
        "Designed event-driven integrations using streaming platforms",
        "Enabled real-time data flow across systems",
        "Reduced latency and improved system responsiveness"
      ],
      tech: "Event Streaming · Asynchronous Integration"
    },
    {
      title: "Secure & Governed Enterprise Applications",
      impact: [
        "Embedded security, governance, and auditability into platform design",
        "Implemented role-based access and compliance controls",
        "Reduced operational and security risks in production systems"
      ],
      tech: "Security · Governance · Access Control"
    }
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation - fade in and slide up
      gsap.fromTo(header.children,
        { 
          y: 60, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards staggered reveal animation
      cards.forEach((card, index) => {
        if (!card) return;

        // Initial state
        gsap.set(card, { 
          y: 80, 
          opacity: 0,
          scale: 0.95
        });

        // Scroll-triggered animation
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: (index % 3) * 0.1, // Stagger by column
        });
      });

      // Tech tags animation
      const techTags = section.querySelectorAll('.usecase-tech');
      techTags.forEach((tag) => {
        gsap.fromTo(tag,
          { 
            x: -20, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tag,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  // Hover animation handlers
  const handleMouseEnter = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      y: -12,
      scale: 1.02,
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4), 0 0 40px -10px rgba(99, 102, 241, 0.3)',
      duration: 0.4,
      ease: 'power2.out',
    });

    // Animate icon
    const icon = card.querySelector('.usecase-icon-wrapper');
    if (icon) {
      gsap.to(icon, {
        rotate: 5,
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(2)',
      });
    }

    // Animate border glow
    const border = card.querySelector('.card-border-glow');
    if (border) {
      gsap.to(border, {
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.2)',
      duration: 0.4,
      ease: 'power2.out',
    });

    // Reset icon
    const icon = card.querySelector('.usecase-icon-wrapper');
    if (icon) {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Hide border glow
    const border = card.querySelector('.card-border-glow');
    if (border) {
      gsap.to(border, {
        opacity: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <section className="usecases" id="usecases" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="usecases-bg">
        <div className="bg-gradient-orb orb-1" />
        <div className="bg-gradient-orb orb-2" />
        <div className="bg-grid" />
      </div>

      <div className="usecases-container">
        <div className="usecases-header" ref={headerRef}>
          <span className="section-label">Success Stories</span>
          <h2>Client Impact</h2>
          <p>
            Selected engagements demonstrating measurable outcomes
            across automation, reliability, and operational scale.
          </p>
        </div>

        <div className="usecases-grid" ref={gridRef}>
          {cases.map((c, i) => (
            <div
              key={i}
              className="usecase-card"
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {/* Animated border glow */}
              <div className="card-border-glow" />
              
              {/* Card content */}
              <div className="card-content">
                <div className="usecase-icon-wrapper">
                  {iconMap[i]}
                </div>

                <h3>{c.title}</h3>

                <ul>
                  {c.impact.map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="usecase-tech">
                  <span className="tech-label">Tech:</span>
                  <span className="tech-value">{c.tech}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
