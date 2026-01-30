export default function Services() {
  const services = [
    {
      title: "Agentic AI & Intelligent Automation",
      desc: "Design and implementation of autonomous workflows that reduce manual effort and improve decision velocity."
    },
    {
      title: "Enterprise & Solution Architecture",
      desc: "Architecture design aligned with business strategy, scalability, and long-term platform evolution."
    },
    {
      title: "Microservices Architecture",
      desc: "Cloud-native microservices enabling modular, resilient, and high-performance systems."
    },
    {
      title: "DevOps & Observability",
      desc: "CI/CD, APM, and OpenTelemetry-based observability for reliability and performance at scale."
    },
    {
      title: "Cloud & Open APIs",
      desc: "API-first integration and cloud-native deployment across distributed digital ecosystems."
    },
    {
      title: "Security & Governance",
      desc: "Enterprise-grade security, governance, and compliance embedded by design."
    }
  ];

  return (
    <section className="services reveal" id="services">
      <div className="services-header">
        <h2>Core Capabilities</h2>
        <p>
          End-to-end delivery across architecture, automation, and AI-native
          enterprise platforms.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
