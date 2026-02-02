import { Linkedin, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Agentic AI', href: '#capabilities' },
    { label: 'Enterprise Architecture', href: '#capabilities' },
    { label: 'Cloud-Native Solutions', href: '#capabilities' },
    { label: 'DevOps & Automation', href: '#capabilities' },
    { label: 'APM & Observability', href: '#capabilities' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Case Studies', href: '#impact' },
    { label: 'Tech Stack', href: '#tech' },
    { label: 'Careers', href: '#' },
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-6">
              <img
      src="dist/logo.png" // same logo as navbar
      alt="Meanx AI Logo"
      className="w-10 h-10 object-contain"
    />
              <span className="text-white font-semibold text-xl">
                meanx<span className="text-indigo-400">.ai</span>
              </span>
            </a>

            <p className="text-white/50 mb-6 max-w-sm leading-relaxed">
              AI-native enterprise transformation. We architect autonomous systems
              that integrate, automate, and scale.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>hello@meanx.ai</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+966 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Saudi Arabia, Riyadh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2023 meanx.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
