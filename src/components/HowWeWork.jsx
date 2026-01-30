import { useEffect, useRef } from "react";

export default function HowWeWork() {
  const sectionRef = useRef(null);

 useEffect(() => {
  const section = sectionRef.current;
  const cards = section.querySelectorAll(".how-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("active");
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
  return () => observer.disconnect();
}, []);



  return (
    <section className="how" ref={sectionRef}>
  <div className="how-header">
  <h2>How We Work</h2>
  <p>
    Our engagement model is designed to reduce risk, create clarity,
    and deliver measurable outcomes.
  </p>
</div>

<div className="how-label">
  Engagement Model
</div>


  <div className="how-cards">
    <div className="how-card">
      <span className="how-step">01</span>
      <h3>Understand & Frame</h3>
      <p>
        We begin by understanding business context, constraints, and
        objectives before proposing solutions.
      </p>
    </div>

    <div className="how-card">
      <span className="how-step">02</span>
      <h3>Design & Architect</h3>
      <p>
        We design enterprise-grade architectures that balance scalability,
        security, and long-term evolution.
      </p>
    </div>

    <div className="how-card">
  <span className="how-step">03</span>
  <h3>Build & Enable</h3>
  <p>
    We implement and enable teams with production-ready systems that
    are observable and operable at scale.
  </p>
</div>
  </div>
</section>

  );
}
