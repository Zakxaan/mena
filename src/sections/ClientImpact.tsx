import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  Activity,
  MessageSquare,
  GitBranch,
  ChevronRight,
  TrendingDown,
  CheckCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    icon: Bot,
    title: 'Agentic AI for Customer Service Automation',
    client: 'Fortune 500 Insurance Company',
    problem:
      'Customer service team was overwhelmed with routine inquiries, leading to long wait times and frustrated customers.',
    solution:
      'Deployed autonomous AI agents capable of understanding natural language, accessing policy data, and resolving 80% of inquiries without human intervention.',
    impact: [
      { label: 'Response Time', before: '15 min', after: '2 min', improvement: '87% faster' },
      { label: 'Automation Rate', value: '80%', suffix: 'cases automated' },
      { label: 'CSAT Score', value: '+23%', suffix: 'improvement' },
    ],
    tech: ['Agentic AI', 'LLM/NLP', 'Workflow Orchestration', 'Open APIs', 'Cloud-native'],
  },
  {
    icon: Activity,
    title: 'APM Observability for Insurance Claims',
    client: 'National Insurance Provider',
    problem:
      'Microservices architecture lacked visibility, making it difficult to identify and resolve performance issues quickly.',
    solution:
      'Implemented comprehensive observability stack with distributed tracing, metrics, and intelligent alerting across all services.',
    impact: [
      { label: 'MTTR', before: '45 min', after: '8 min', improvement: '82% reduction' },
      { label: 'System Uptime', value: '99.9%', suffix: 'achieved' },
      { label: 'Alert Accuracy', value: '95%', suffix: 'true positives' },
    ],
    tech: ['OpenTelemetry', 'Jaeger', 'Prometheus', 'Grafana', 'ELK', 'Kubernetes'],
  },
  {
    icon: MessageSquare,
    title: 'LLM-Powered Conversational Applications',
    client: 'Global Retail Enterprise',
    problem:
      'Customer interactions were fragmented across channels with inconsistent responses and limited backend integration.',
    solution:
      'Built unified conversational AI platform integrating with CRM, inventory, and order management systems for contextual responses.',
    impact: [
      { label: 'Response Accuracy', value: '94%', suffix: 'correct answers' },
      { label: 'Resolution Rate', value: '78%', suffix: 'without escalation' },
      { label: 'Cost Savings', value: '$2.4M', suffix: 'annually' },
    ],
    tech: ['LLMs', 'NLP', 'Conversational AI', 'API Integration', 'Vector DB'],
  },
  {
    icon: GitBranch,
    title: 'Production-Grade MLOps Implementation',
    client: 'Financial Services Firm',
    problem:
      'Machine learning models were deployed manually with no versioning, monitoring, or rollback capabilities.',
    solution:
      'Built end-to-end MLOps pipeline with automated training, testing, deployment, and monitoring for all models.',
    impact: [
      { label: 'Deployment Time', before: '2 weeks', after: '2 hours', improvement: '98% faster' },
      { label: 'Model Drift Detection', value: 'Real-time', suffix: 'monitoring' },
      { label: 'Rollback Time', value: '<5 min', suffix: 'if needed' },
    ],
    tech: ['MLOps', 'Kubeflow', 'MLflow', 'Model Lifecycle', 'CI/CD for ML'],
  },
];

export function ClientImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

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
      const cardElements = cards.querySelectorAll('.case-card');
      gsap.fromTo(
        cardElements,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="section relative py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f15] to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="bg-grid opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="section-label">Success Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Client Impact
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real results from real engagements. See how we've helped enterprises
            transform their operations with AI and modern architecture.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            const isExpanded = expandedCard === index;

            return (
              <div
                key={index}
                className={`case-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isExpanded ? 'lg:col-span-2' : ''
                }`}
                onClick={() => handleCardClick(index)}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl" />
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-white/40 mb-1 block">
                        {study.client}
                      </span>
                      <h3 className="text-xl font-semibold text-white">
                        {study.title}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`w-6 h-6 text-white/40 transition-transform duration-300 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`grid md:grid-cols-2 gap-8 transition-all duration-500 ${
                      isExpanded
                        ? 'opacity-100 max-h-[800px]'
                        : 'opacity-0 max-h-0 overflow-hidden md:hidden'
                    }`}
                  >
                    {/* Problem & Solution */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                          Challenge
                        </h4>
                        <p className="text-white/70">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                          Solution
                        </h4>
                        <p className="text-white/70">{study.solution}</p>
                      </div>
                    </div>

                    {/* Impact Metrics */}
                    <div>
                      <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
                        Business Impact
                      </h4>
                      <div className="space-y-4">
                        {study.impact.map((metric, mIndex) => (
                          <div
                            key={mIndex}
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                          >
                            {metric.before && metric.after ? (
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-lg font-bold text-white/40">
                                    {metric.before}
                                  </div>
                                  <div className="text-xs text-white/30">Before</div>
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                  <div className="flex items-center gap-2 text-emerald-400">
                                    <TrendingDown className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      {metric.improvement}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-bold text-emerald-400">
                                    {metric.after}
                                  </div>
                                  <div className="text-xs text-white/30">After</div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <div>
                                  <div className="text-lg font-bold text-white">
                                    {metric.value}
                                  </div>
                                  <div className="text-sm text-white/50">
                                    {metric.suffix}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.tech.map((tech, tIndex) => (
                            <span
                              key={tIndex}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed Preview */}
                  <div
                    className={`flex flex-wrap gap-2 mt-4 ${
                      isExpanded ? 'hidden' : 'md:flex hidden'
                    }`}
                  >
                    {study.impact.slice(0, 2).map((metric, mIndex) => (
                      <span
                        key={mIndex}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10"
                      >
                        {metric.improvement || metric.value}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      +{study.tech.length} technologies
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="btn btn-outline group">
            View All Case Studies
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
