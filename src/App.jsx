import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Play, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  X,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Bell,
  Clock,
  UserPlus,
  Send,
  Lock
} from 'lucide-react';

/**
 * REVEAL COMPONENT
 * Handles unified entrance animations across the page
 */
const Reveal = ({ children, delay = 0, direction = 'up', width = "w-full" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
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
      style={{ 
        transform: getTransform(),
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};

// --- Standardized UI Components ---

const PrimaryButton = ({ children, className = "", href = "#cta" }) => (
  <a href={href} className={`group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#5B5FFF] to-[#7C7FFF] px-12 py-8 md:px-16 md:py-9 text-2xl md:text-3xl font-[1000] text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-10px_rgba(91,95,255,0.4)] ${className}`}>
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative flex items-center gap-4 tracking-tighter uppercase">
      {children}
      <ArrowRight className="w-8 h-8 md:w-9 md:h-9 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
    </span>
  </a>
);

const SectionHeader = ({ tag, title, description, dark = false }) => (
  <div className="text-center mb-20 md:mb-32">
    <Reveal>
      {tag && (
        <span className="inline-block mb-6 text-sm font-black tracking-[0.3em] uppercase text-[#5B5FFF]">
          {tag}
        </span>
      )}
      <h2 className={`text-5xl md:text-7xl lg:text-8xl font-[1000] leading-[0.95] tracking-[-0.06em] uppercase mb-8 ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed ${dark ? 'text-[#64748B]' : 'text-[#64748B]'}`}>
          {description}
        </p>
      )}
    </Reveal>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 sm:px-12 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-2xl border px-8 py-4 ${
        isScrolled ? 'bg-white/95 shadow-xl backdrop-blur-xl border-slate-200' : 'bg-white/5 border-white/10 backdrop-blur-sm'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <span className={`font-black text-2xl tracking-tighter uppercase ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}>
            Travel Lead System<span className="text-[#5B5FFF]">™</span>
          </span>
        </div>
        <div className={`hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] ${isScrolled ? 'text-[#64748B]' : 'text-slate-300'}`}>
          <a href="#proof" className="hover:text-[#5B5FFF] transition-colors">Results</a>
          <a href="#how" className="hover:text-[#5B5FFF] transition-colors">Process</a>
          <a href="#cta" className={`px-6 py-2.5 rounded-full transition-all shadow-xl ${isScrolled ? 'bg-[#0B1220] text-white hover:bg-slate-800' : 'bg-white text-[#0B1220] hover:bg-slate-100'}`}>Get Started</a>
        </div>
      </div>
    </nav>
  );
};

// --- Main App Sections ---

const Hero = () => (
  <section className="relative pt-64 pb-40 md:pt-80 md:pb-60 px-6 overflow-hidden bg-[#0B1220]">
    {/* Clean, Non-Tropical Background Decor */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5B5FFF] rounded-full mix-blend-soft-light filter blur-[180px] opacity-20 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7C7FFF] rounded-full mix-blend-soft-light filter blur-[180px] opacity-10 translate-y-1/2 -translate-x-1/4" />
    </div>

    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-12 text-[12px] font-black tracking-[0.3em] uppercase bg-white/5 text-white border border-white/10 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-pulse" />
          Stop Chasing. Start Scaling.
        </div>
      </Reveal>
      
      <Reveal delay={300}>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-[1000] text-white leading-[0.85] mb-12 tracking-[-0.07em] uppercase">
          Chasing isn't <br className="hidden lg:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#7C7FFF]">a strategy.</span>
        </h1>
      </Reveal>
      
      <Reveal delay={500}>
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl text-[#64748B] mb-20 leading-tight font-medium tracking-tight">
            If you're still messaging people who ignore you, your business is <span className="text-white font-black">fundamentally stuck.</span> We fix that.
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={700}>
        <div className="flex flex-col items-center gap-10">
          <PrimaryButton>
            Show Me How This Works
          </PrimaryButton>
          <div className="flex items-center gap-4 text-slate-500 text-xs font-black uppercase tracking-[0.4em]">
            <Lock className="w-4 h-4" />
            Zero Tech Experience Required
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const PainAmplification = () => (
  <section className="py-32 md:py-48 px-6 bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <SectionHeader 
        tag="The Reality Check"
        title="Stop Fighting the noise"
        description="The old way of building a travel business is dead. If you're doing any of the following, you're working harder for smaller results."
      />
      
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {[
          { text: "Posting travel deals every day with zero engagement.", icon: <X className="text-[#EF4444]" /> },
          { text: "Messaging strangers and being left on 'read'.", icon: <MessageSquare className="text-[#64748B]" /> },
          { text: "Feeling like a salesperson instead of a CEO.", icon: <ShieldCheck className="text-[#5B5FFF]" /> },
          { text: "Exhausted by the DM grind with zero growth.", icon: <Zap className="text-[#5B5FFF]" /> }
        ].map((pain, i) => (
          <Reveal key={i} delay={i * 100} direction="up">
            <div className="flex items-center gap-6 p-10 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                {pain.icon}
              </div>
              <p className="text-xl md:text-2xl font-black text-[#0F172A] uppercase tracking-tight leading-tight">{pain.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const ProofSection = () => {
  const bubbles = [
    { text: "I saw your video. I'm ready to quit my 9-5. How do I join?", sender: "Jordan M.", time: "Just now" },
    { text: "I've been watching you for a while. How do I get started?", sender: "Sarah L.", time: "4m ago" },
    { text: "New Lead Qualified: Marcus V. has capital and is ready to launch.", sender: "System", time: "12m ago", special: true }
  ];

  return (
    <section id="proof" className="py-32 md:py-48 px-6 bg-[#0B1220] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          tag="Inbound Interest"
          title="Results speak louder"
          description="When you stop chasing, the right people start asking. This is what a modern travel business looks like."
          dark
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {bubbles.map((b, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className={`rounded-2xl p-12 shadow-2xl h-full flex flex-col justify-between group hover:-translate-y-4 transition-all duration-500 border ${b.special ? 'bg-[#5B5FFF] text-white border-none' : 'bg-white/5 border-white/10'}`}>
                <div>
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${b.special ? 'bg-white text-[#5B5FFF]' : 'bg-white/10 text-white'}`}>
                        {b.sender.charAt(0)}
                      </div>
                      <h4 className="font-black text-xl tracking-tight uppercase text-white">{b.sender}</h4>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${b.special ? 'text-white/60' : 'text-slate-500'}`}>{b.time}</span>
                  </div>
                  <p className={`text-2xl font-black leading-tight uppercase tracking-tight ${b.special ? 'text-white' : 'text-slate-200'}`}>
                    "{b.text}"
                  </p>
                </div>
                <div className={`mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] ${b.special ? 'text-white/80' : 'text-[#22C55E]'}`}>
                  {b.special ? <Zap className="w-4 h-4 fill-white" /> : <CheckCircle className="w-4 h-4" />} 
                  {b.special ? "System Verification" : "Qualified Lead"}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const SimplicitySection = () => (
  <section id="how" className="py-32 md:py-48 px-6 bg-[#F8FAFC]">
    <div className="max-w-7xl mx-auto">
      <SectionHeader 
        tag="The Workflow"
        title="Simply Built"
        description="We've stripped away the complexity. No tropical distractions—just an engine that works."
      />

      <div className="grid md:grid-cols-3 gap-20 text-center relative">
        {[
          { title: "Post Simple Content", desc: "Templates that spark instant curiosity." },
          { title: "Filter The Noise", desc: "The system sorts serious prospects for you." },
          { title: "Close The Deal", desc: "You only talk to people ready to start." }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="relative group">
              <span className="text-[12rem] font-[1000] leading-none text-slate-200 absolute -top-24 left-1/2 -translate-x-1/2 -z-10 tracking-tighter transition-colors group-hover:text-[#5B5FFF]/10">0{i+1}</span>
              <h3 className="text-3xl font-black mb-6 tracking-tight text-[#0F172A] uppercase">{item.title}</h3>
              <p className="text-xl text-[#64748B] font-medium max-w-[280px] mx-auto leading-relaxed">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="cta" className="py-48 md:py-80 px-6 bg-[#0B1220] relative overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal>
        <span className="text-[#5B5FFF] font-black uppercase tracking-[0.5em] mb-12 block text-sm">Strictly Limited Access</span>
        <h2 className="text-7xl md:text-[11rem] font-[1000] mb-20 tracking-tighter text-white leading-[0.75] uppercase">Get My Setup</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl md:text-4xl text-[#64748B] mb-24 leading-tight font-medium tracking-tight">
            We only take a handful of travel reps each week. <span className="text-white font-black">Claim your spot before access closes.</span>
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="flex flex-col items-center gap-12">
          <PrimaryButton>
            Show Me How
          </PrimaryButton>
          <div className="flex items-center gap-5 opacity-40">
            <Sparkles className="w-8 h-8 text-[#5B5FFF]" />
            <p className="text-xl font-black text-white uppercase tracking-tighter">Not a website. An Engine.</p>
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
        <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-lg">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <span className="font-black text-2xl tracking-tighter uppercase text-white">Travel Lead System Lab<span className="text-[#5B5FFF]">™</span></span>
      </div>
      
      <div className="flex gap-12 text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">
        <a href="#" className="hover:text-[#5B5FFF] transition-colors">Privacy</a>
        <a href="#" className="hover:text-[#5B5FFF] transition-colors">Terms</a>
        <a href="#" className="hover:text-[#5B5FFF] transition-colors">Support</a>
      </div>
      
      <div className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.3em] text-center md:text-right">
        &copy; {new Date().getFullYear()} Travel Lead System Lab. <br />
        Powering travel professionals worldwide.
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#5B5FFF]/20 selection:text-[#5B5FFF] antialiased overflow-x-hidden font-sans">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        html { scroll-behavior: smooth; }
        
        h1, h2, h3, h4, .font-black {
          letter-spacing: -0.06em;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      
      <Navbar />
      <main>
        <Hero />
        <PainAmplification />
        <ProofSection />
        <SimplicitySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
