import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "services", "usecases", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = "";

      SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          current = id;
        }
      });

      setActive(prev => (prev === current ? prev : current));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
  <img src="/tlogo.PNG" alt="meanx.ai logo" />
  <span className="logo-text">Meanx.ai</span>
</div>



        {/* Desktop links */}
        <nav className="nav-links">
          <a href="#about" className={active === "about" ? "active" : ""}>
            About
          </a>
          <a href="#services" className={active === "services" ? "active" : ""}>
            Capabilities
          </a>
          <a href="#usecases" className={active === "usecases" ? "active" : ""}>
            Impact
          </a>
          <a href="#contact" className={active === "contact" ? "active" : ""}>
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#services" onClick={() => setOpen(false)}>Capabilities</a>
        <a href="#usecases" onClick={() => setOpen(false)}>Impact</a>
        <a href="#footer" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </header>
  );
}
