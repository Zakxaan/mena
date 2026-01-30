import { useEffect, useRef } from "react";

export default function About() {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imageRef.current.classList.add("visible");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(imageRef.current);
  }, []);

  return (
    <section className="about reveal" id="about">
    <div ref={imageRef} className="about-image">
      <img src="/favicon.png" alt="Meanx.ai logo" />
    </div>
      <div className="about-content">
        <p>
  Meanx.ai is an innovation-led consulting and delivery partner
  specializing in AI-native enterprise platforms, automation,
  and modern architecture.
</p>

<p>
  We work with forward-looking organizations to design systems that
  combine agentic AI, microservices, and cloud-native execution
  reducing operational friction while increasing speed, resilience,
  and intelligence across the enterprise.
</p>

      </div>
    </section>
  );
}
