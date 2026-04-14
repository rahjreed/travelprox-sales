import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  X,
  ShieldCheck,
  Sparkles,
  Lock
} from 'lucide-react';

/**
 * GLOBAL ERROR SUPPRESSION
 * Silences vague "Script error." artifacts from cross-origin scripts in sandboxes.
 */
if (typeof window !== 'undefined') {
  const silentError = (e) => {
    const msg = (e.message || "").toLowerCase();
    if (msg.includes('script error') || msg === 'script error.') {
      e.stopImmediatePropagation();
      e.preventDefault();
      return true;
    }
  };
  window.addEventListener('error', silentError, true);
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason && e.reason.message && e.reason.message.includes('Script error')) {
      e.preventDefault();
    }
  });
}

/**
 * REVEAL COMPONENT
 * Handles unified entrance animations
 */
const Reveal = ({ children, delay = 0, direction = 'up', width = "w-full" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      default: return 'translateY(40px)';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${width} transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: getTransform(), transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * PRIMARY MODAL
 * Contains the Jotform Iframe triggered on click
 */
const ZaraModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen && window.jotformEmbedHandler) {
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-019d8941f1b87b70a991f93de29ca7d94d38']",
        "https://www.jotform.com"
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#0B1220]/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-500">
        {/* Modal Header */}
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={onClose}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Iframe Content */}
        <div className="w-full h-[700px] max-h-[85vh]">
          <iframe 
            id="JotFormIFrame-019d8941f1b87b70a991f93de29ca7d94d38"
            title="Zara: Lead Qualification Specialist" 
            allowTransparency="true"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://agent.jotform.com/019d8941f1b87b70a991f93de29ca7d94d38?embedMode=iframe&autofocus=1&background=1&shadow=0"
            frameBorder="0" 
            style={{ minWidth: '100%', height: '100%', border: 'none' }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * PRIMARY BUTTON
 * Triggers the modal state
 */
const PrimaryButton = ({ onClick, className = "" }) => (
  <button 
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#5B5FFF] to-[#7C7FFF] px-12 py-8 md:px-16 md:py-9 text-2xl md:text-3xl font-[1000] text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-10px_rgba(91,95,255,0.4)] ${className}`}
  >
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative flex items-center gap-4 tracking-tighter uppercase">
      Show Me How This Works
      <ArrowRight className="w-8 h-8 md:w-9 md:h-9 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
    </span>
  </button>
);

const SectionHeader = ({ tag, title, description, dark = false }) => (
  <div className="text-center mb-20 md:mb-32 px-4">
    <Reveal>
      {tag && <span className="inline-block mb-6 text-sm font-black tracking-[0.3em] uppercase text-[#5B5FFF]">{tag}</span>}
      <h2 className={`text-4xl md:text-7xl lg:text-8xl font-[1000] leading-[0.95] tracking-[-0.06em] uppercase mb-8 ${dark ? 'text-white' : 'text-[#0F172A]'}`}>{title}</h2>
      {description && <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed ${dark ? 'text-slate-400' : 'text-[#64748B]'}`}>{description}</p>}
    </Reveal>
  </div>
);

const Navbar = ({ onTrigger }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 sm:px-12 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-2xl border px-6 py-4 ${
        isScrolled ? 'bg-white/95 shadow-xl backdrop-blur-xl border-slate-200' : 'bg-white/5 border-white/10 backdrop-blur-sm'
      }`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className={`font-black text-xl md:text-2xl tracking-tighter uppercase ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}>Travel Lead System™</span>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em]">
          <button onClick={onTrigger} className={`px-6 py-2.5 rounded-full transition-all shadow-xl font-black uppercase text-[10px] tracking-widest ${isScrolled ? 'bg-[#0B1220] text-white hover:bg-slate-800' : 'bg-white text-[#0B1220] hover:bg-slate-100'}`}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onTrigger }) => (
  <section className="relative pt-40 pb-32 md:pt-56 md:pb-64 px-6 overflow-hidden bg-[#0B1220]">
    <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5B5FFF] rounded-full mix-blend-soft-light filter blur-[180px] opacity-20 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C7FFF] rounded-full mix-blend-soft-light filter blur-[180px] opacity-10 translate-y-1/2 -translate-x-1/4" />
    </div>
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 text-[12px] font-black tracking-[0.3em] uppercase bg-white/5 text-white border border-white/10 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-pulse" /> Stop Chasing. Start Scaling.
        </div>
      </Reveal>
      <Reveal delay={300}>
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-[1000] text-white leading-[0.85] mb-10 tracking-[-0.07em] uppercase">Chasing isn't <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#7C7FFF]">a strategy.</span></h1>
      </Reveal>
      <Reveal delay={500}>
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl text-slate-400 mb-16 leading-tight font-medium tracking-tight px-4">If you’re still messaging people who ignore you… your business isn’t the problem. <span className="text-white font-black">Your lead flow is.</span></p>
        </div>
      </Reveal>
      <Reveal delay={700}>
        <div className="flex flex-col items-center gap-10">
          <PrimaryButton onClick={onTrigger} />
          <div className="mt-2 text-slate-400 text-sm font-bold uppercase tracking-[0.2em] max-w-lg">Used by travel reps getting messages like: "I saw your video… how do I join?"</div>
          <div className="flex items-center gap-4 text-slate-500 text-xs font-black uppercase tracking-[0.4em] mt-2"><Lock className="w-4 h-4" /> Zero Tech Experience Required</div>
        </div>
      </Reveal>
    </div>
  </section>
);

const PainAmplification = () => (
  <section className="py-24 md:py-32 px-6 bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <SectionHeader tag="The Reality Check" title="This is why most travel reps stay stuck" description="The old way of building a travel business is dead. If you're doing any of the following, you're working harder for smaller results." />
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {[
          { text: "Posting travel deals every day with zero engagement.", icon: <X className="text-[#EF4444]" /> },
          { text: "Messaging strangers and being left on 'read'.", icon: <MessageSquare className="text-[#64748B]" /> },
          { text: "Feeling like a salesperson instead of a CEO.", icon: <ShieldCheck className="text-[#5B5FFF]" /> },
          { text: "Exhausted by the DM grind with zero growth.", icon: <Zap className="text-[#5B5FFF]" /> }
        ].map((pain, i) => (
          <Reveal key={i} delay={i * 100} direction="up">
            <div className="flex items-center gap-6 p-10 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0">{pain.icon}</div>
              <p className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight leading-tight">{pain.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const SimplicitySection = ({ onTrigger }) => (
  <section className="py-24 md:py-32 px-6 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto">
      <SectionHeader tag="The Workflow" title="Simply Built" description="We've stripped away the complexity. No tropical distractions—just an engine that works." />
      <div className="grid md:grid-cols-3 gap-20 text-center relative mb-24">
        {[
          { title: "Post Simple Content", desc: "Templates that spark instant curiosity." },
          { title: "Filter The Noise", desc: "The system sorts serious prospects for you." },
          { title: "Close The Deal", desc: "You only talk to people ready to start." }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="relative group">
              <span className="text-[10rem] md:text-[12rem] font-[1000] leading-none text-slate-200 absolute -top-24 left-1/2 -translate-x-1/2 -z-10 tracking-tighter transition-colors group-hover:text-[#5B5FFF]/10">0{i+1}</span>
              <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-[#0F172A] uppercase">{item.title}</h3>
              <p className="text-xl text-[#64748B] font-medium max-w-[280px] mx-auto leading-relaxed">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center"><PrimaryButton onClick={onTrigger} /></div>
    </div>
  </section>
);

const FinalCTA = ({ onTrigger }) => (
  <section id="cta" className="py-28 md:py-40 px-6 bg-[#0B1220] relative overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal>
        <div className="text-white text-lg md:text-xl font-bold uppercase tracking-[0.2em] mb-8">If you're serious about building your travel business…</div>
        <span className="text-[#5B5FFF] font-black uppercase tracking-[0.5em] mb-12 block text-sm">Strictly Limited Access</span>
        <h2 className="text-5xl md:text-[11rem] font-[1000] mb-20 tracking-tighter text-white leading-[0.75] uppercase">Get My Setup</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-slate-400 mb-24 leading-tight font-medium tracking-tight px-4">We only take a handful of travel reps each week. <span className="text-white font-black">Claim your spot before access closes.</span></p>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div className="flex flex-col items-center gap-12">
          <PrimaryButton onClick={onTrigger} />
          <div className="flex items-center gap-5 opacity-40">
            <Sparkles className="w-8 h-8 text-[#5B5FFF]" />
            <p className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Not a website. An Engine.</p>
          </div>
        </div>
      </Reveal>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#5B5FFF] rounded-full blur-[200px] -z-10 opacity-10" />
  </section>
);

const Footer = () => (
  <footer className="py-24 px-6 bg-[#0B1220] text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-lg"><Zap className="w-6 h-6 text-white fill-white" /></div>
        <span className="font-black text-2xl tracking-tighter uppercase text-white">Travel Lead System Lab™</span>
      </div>
      <div className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.3em] text-center md:text-right">&copy; {new Date().getFullYear()} Travel Lead System Lab. <br /> Powering travel professionals worldwide.</div>
    </div>
  </footer>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/s/umd/28b754a8080/for-form-embed-handler.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#5B5FFF]/20 selection:text-[#5B5FFF] antialiased overflow-x-hidden font-sans">
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        html { scroll-behavior: smooth; }
        h1, h2, h3, h4, .font-[1000] { letter-spacing: -0.06em; -webkit-font-smoothing: antialiased; }
      `}</style>
      
      <Navbar onTrigger={() => setIsModalOpen(true)} />
      <main>
        <Hero onTrigger={() => setIsModalOpen(true)} />
        <PainAmplification />
        <SimplicitySection onTrigger={() => setIsModalOpen(true)} />
        <FinalCTA onTrigger={() => setIsModalOpen(true)} />
      </main>
      <Footer />

      <ZaraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
