export default function UseCases() {
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

  return (
    <section className="usecases reveal" id="usecases">
      <div className="usecases-header">
        <h2>Client Impact</h2>
<p>
  Selected engagements demonstrating measurable outcomes
  across automation, reliability, and operational scale.
</p>

      </div>

      <div className="usecases-grid">
        {cases.map((c, i) => (
          <div key={i} className="usecase-card">
            <h3>{c.title}</h3>

            <ul>
              {c.impact.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="usecase-tech">
              <span>Tech:</span> {c.tech}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
