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
