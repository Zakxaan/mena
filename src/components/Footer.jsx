export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
  <img src="/flogoo.jpeg" alt="meanx.ai logo" />
</div>
          <p>
            Enterprise-focused consulting partner specializing in
            AI-native platforms, automation, and modern architecture.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-links">
          <span className="footer-title">Navigate</span>
          <a href="#about">About</a>
          <a href="#services">Capabilities</a>
          <a href="#usecases">Impact</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <span className="footer-title">Contact</span>
          <a href="mailto:contact@meanx.ai">contact@meanx.ai</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2023 meanx.ai · All rights reserved
      </div>
    </footer>
  );
}
