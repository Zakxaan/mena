import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Users, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'contact' | 'architects' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.fromTo(
        content.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Background gradient animation
      gsap.to('.cta-gradient-1', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.cta-gradient-2', {
        rotate: -360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleOpenDialog = (type: 'contact' | 'architects') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(
      'https://mena-backend-vgzs.onrender.com/api/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to send message');
    }

    // ✅ REAL success (only after backend responds)
    toast.success('Message sent successfully! Our team will reach out within 24 hours.');
    setDialogOpen(false);
    setFormData({ name: '', email: '', company: '', message: '' });

  } catch (error: any) {
    console.error('Contact form error:', error);
    toast.error(
      error.message || 'Something went wrong. Please try again later.'
    );
  }
};


  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Rotating gradient orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="cta-gradient-1 absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="cta-gradient-2 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'conic-gradient(from 180deg, #8b5cf6, #6366f1, #a855f7, #8b5cf6)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="bg-grid opacity-20" />

      <div className="container relative z-10">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="section-label">Get Started</span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Build{' '}
            <span className="gradient-text">Autonomous</span>
            <br />
            Systems Together
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Ready to transform your enterprise with AI-native solutions?
            Our architects are standing by to discuss your challenges and opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => handleOpenDialog('architects')}
              className="btn btn-primary group text-lg px-8 py-4"
            >
              <Users className="w-5 h-5" />
              Talk to Our Architects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleOpenDialog('contact')}
              className="btn btn-outline text-lg px-8 py-4"
            >
              <MessageSquare className="w-5 h-5" />
              Send a Message
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Free Initial Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>NDA Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#12121a] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dialogType === 'architects' ? 'Talk to Our Architects' : 'Send Us a Message'}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {dialogType === 'architects'
                ? 'Schedule a call with our solution architects to discuss your project.'
                : 'Fill out the form below and we will get back to you within 24 hours.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Name</label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Company</label>
              <Input
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Message</label>
              <Textarea
                placeholder="Tell us about your project or challenges..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-indigo-500 min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
