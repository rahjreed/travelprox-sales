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
 * ENHANCED REVEAL COMPONENT
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

// --- Custom Styled Components ---

const PrimaryButton = ({ children, className = "", href = "#cta" }) => (
  <a href={href} className={`group relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-[3rem] bg-indigo-600 px-20 py-10 text-4xl font-[1000] text-white transition-all hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 shadow-[0_40px_80px_-15px_rgba(79,70,229,0.45)] ${className}`}>
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative flex items-center gap-4 tracking-tighter uppercase italic">
      {children}
      <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" strokeWidth={3} />
    </span>
  </a>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 sm:px-12 ${isScrolled ? 'py-6' : 'py-12'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full border px-12 py-5 ${
        isScrolled ? 'bg-white/95 shadow-2xl backdrop-blur-xl border-slate-200' : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <span className="font-[1000] text-3xl tracking-tighter text-slate-900 uppercase">
            Lead System<span className="text-indigo-600">™</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-16 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
          <a href="#proof" className="hover:text-indigo-600 transition-colors">Results</a>
          <a href="#how" className="hover:text-indigo-600 transition-colors">The Process</a>
          <a href="#cta" className="bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-slate-800 transition-all shadow-xl">Start Attracting</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-80 pb-60 px-8 overflow-hidden bg-white">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/4 w-[900px] h-[900px] bg-indigo-50 rounded-full mix-blend-multiply filter blur-[150px] opacity-70" />
      <div className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-sky-50 rounded-full mix-blend-multiply filter blur-[150px] opacity-70" />
    </div>

    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-3 px-8 py-4 mb-16 text-[14px] font-black tracking-[0.3em] uppercase bg-slate-950 text-white rounded-full shadow-2xl border-t border-white/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Stop Chasing. Start Scaling.
        </div>
      </Reveal>
      
      <Reveal delay={300}>
        <h1 className="text-6xl md:text-9xl lg:text-[11.5rem] font-[1000] text-slate-950 leading-[0.8] mb-16 tracking-[-0.08em] uppercase italic">
          Chasing isn't <br className="hidden lg:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-500">a strategy.</span>
        </h1>
      </Reveal>
      
      <Reveal delay={500}>
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-5xl text-slate-500 mb-24 leading-[1.2] font-medium tracking-tight">
            If you're still messaging people who ignore you, <br className="hidden md:block" />
            <span className="text-slate-950 font-[1000]">your business is stuck.</span> We fix that.
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={700}>
        <div className="flex flex-col items-center gap-12">
          <PrimaryButton>
            Show Me How This Works
          </PrimaryButton>
          
          <div className="flex items-center gap-4 text-slate-400">
            <Lock className="w-6 h-6" />
            <p className="text-xs font-black uppercase tracking-[0.4em]">Zero Tech Experience Required</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const PainAmplification = () => (
  <section className="py-60 px-8 bg-slate-950 text-white relative overflow-hidden">
    <div className="max-w-5xl mx-auto relative z-10">
      <Reveal>
        <div className="text-center mb-32">
          <h2 className="text-6xl md:text-8xl font-[1000] italic tracking-tighter uppercase text-indigo-500 leading-none">The Hard Truth</h2>
        </div>
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { text: "Posting travel deals every day... with zero engagement.", icon: <X className="text-red-500" /> },
          { text: "Messaging strangers... and being left on 'read'.", icon: <MessageSquare className="text-slate-500" /> },
          { text: "Feeling like a salesperson... instead of a CEO.", icon: <ShieldCheck className="text-indigo-500" /> },
          { text: "Exhausted by the DM grind... with zero growth.", icon: <Zap className="text-yellow-500" /> }
        ].map((pain, i) => (
          <Reveal key={i} delay={i * 100} direction={i % 2 === 0 ? "right" : "left"}>
            <div className="flex items-center gap-8 p-12 bg-white/5 border border-white/10 rounded-[4rem] hover:bg-white/10 transition-all duration-500 backdrop-blur-xl group">
              <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:rotate-6 transition-transform">
                {pain.icon}
              </div>
              <p className="text-2xl md:text-3xl font-[1000] text-slate-200 tracking-tight leading-tight italic uppercase">{pain.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={800}>
        <div className="mt-32 p-2 bg-gradient-to-r from-indigo-600 via-sky-400 to-indigo-600 rounded-[5rem] animate-gradient-x shadow-2xl">
          <div className="bg-slate-900 rounded-[4.8rem] p-20 md:p-32 text-center">
            <p className="text-5xl md:text-9xl font-[1000] text-white leading-[0.8] mb-10 tracking-tighter uppercase italic">
              Stop surviving. <br />
              <span className="text-indigo-400">Start Scaling.</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
    
    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-950 to-slate-950" />
  </section>
);

const ProofSection = () => {
  const bubbles = [
    { text: "I saw your video. I'm ready to quit my 9-5. How do I join?", sender: "Jordan M.", time: "Just now" },
    { text: "I've been watching you for a while. How do I get started?", sender: "Sarah L.", time: "4m ago" },
    { text: "New Lead Qualified: Marcus V. has capital and is ready to launch.", sender: "System", time: "12m ago", special: true }
  ];

  return (
    <section id="proof" className="py-60 px-8 bg-[#fafafa] border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-40">
            <h2 className="text-6xl md:text-[9rem] font-[1000] mb-10 tracking-tighter text-slate-950 uppercase italic leading-[0.85]">
              Real Inbound <br /> Interest.
            </h2>
            <p className="text-3xl md:text-4xl text-slate-500 font-medium max-w-3xl mx-auto tracking-tight leading-relaxed">
              When you stop chasing, the right people <span className="text-slate-950 font-black italic">start asking.</span>
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-16">
          {bubbles.map((b, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className={`rounded-[4rem] p-16 shadow-[0_60px_100px_-30px_rgba(0,0,0,0.08)] border border-slate-100 h-full flex flex-col justify-between group hover:-translate-y-6 transition-all duration-700 ${b.special ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white'}`}>
                <div>
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-xl shadow-xl ${b.special ? 'bg-white text-indigo-600' : 'bg-slate-950 text-white'}`}>
                        {b.sender.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-[1000] text-2xl tracking-tighter uppercase">{b.sender}</h4>
                        <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${b.special ? 'text-indigo-200' : 'text-slate-400'}`}>Verified Lead</p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-3xl font-[1000] leading-tight italic tracking-tighter uppercase ${b.special ? 'text-white' : 'text-slate-900'}`}>
                    "{b.text}"
                  </p>
                </div>
                
                <div className={`mt-16 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] ${b.special ? 'text-indigo-100' : 'text-indigo-600'}`}>
                  <Send className="w-4 h-4" /> Inbound Request
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
  <section id="how" className="py-60 px-8 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-40">
          <h2 className="text-7xl md:text-[11rem] font-[1000] mb-12 tracking-tighter text-slate-950 uppercase leading-none italic">Simply Built.</h2>
          <div className="w-48 h-4 bg-indigo-600 mx-auto rounded-full" />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-32 text-center relative">
        {[
          { title: "Post Simple Content", desc: "Templates that spark instant curiosity." },
          { title: "Filter The Noise", desc: "The system sorts serious prospects for you." },
          { title: "Close The Deal", desc: "You only talk to people ready to start." }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="relative group">
              <span className="text-[18rem] font-[1000] leading-none text-slate-50 absolute -top-32 left-1/2 -translate-x-1/2 -z-10 tracking-tighter transition-colors group-hover:text-indigo-50/50">0{i+1}</span>
              <h3 className="text-4xl font-[1000] mb-8 tracking-tighter text-slate-950 leading-none uppercase italic">{item.title}</h3>
              <p className="text-2xl text-slate-500 font-medium max-w-[320px] mx-auto leading-relaxed">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PositioningSection = () => (
  <section className="py-60 px-8 bg-indigo-600 text-white relative overflow-hidden">
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <Reveal>
        <h2 className="text-6xl md:text-[8rem] font-[1000] mb-16 leading-[0.85] tracking-tighter uppercase italic">The Missing Link.</h2>
        <div className="bg-white/10 backdrop-blur-3xl p-24 md:p-40 rounded-[6rem] border border-white/20 shadow-2xl">
          <p className="text-3xl md:text-5xl leading-tight font-light mb-16 tracking-tight">
            “Stop fighting the tech. I set everything up so you can focus on building your travel legacy.”
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-20 pt-20 border-t border-white/20">
            <div className="flex items-center gap-5">
              <ShieldCheck className="w-10 h-10 text-indigo-300" strokeWidth={3} />
              <span className="text-2xl font-[1000] uppercase italic tracking-tighter">Turn-Key Engine</span>
            </div>
            <div className="flex items-center gap-5">
              <Zap className="w-10 h-10 text-indigo-300" strokeWidth={3} />
              <span className="text-2xl font-[1000] uppercase italic tracking-tighter">Total Authority</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-white/5 rounded-full blur-[180px] -z-10" />
  </section>
);

const FinalCTA = () => (
  <section id="cta" className="py-80 px-8 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal>
        <span className="text-indigo-600 font-black uppercase tracking-[0.5em] mb-12 block text-sm">Strictly Limited Access</span>
        <h2 className="text-7xl md:text-[13rem] font-[1000] mb-20 tracking-tighter text-slate-950 leading-[0.7] uppercase italic">Get My Setup</h2>
      </Reveal>
      
      <Reveal delay={200}>
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-5xl text-slate-500 mb-32 leading-relaxed font-medium tracking-tight">
            We only take a handful of travel reps each week. <br className="hidden md:block" />
            <span className="text-slate-950 font-black italic">Claim your spot before access closes.</span>
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="flex flex-col items-center gap-20">
          <PrimaryButton className="!px-32 !py-14 !text-6xl">
            Show Me How
          </PrimaryButton>
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32 mt-12 opacity-40">
            <div className="flex items-center gap-5">
              <Sparkles className="w-10 h-10 text-slate-950" />
              <p className="text-2xl font-[1000] text-slate-950 italic uppercase tracking-tighter">Not a website. An Engine.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    
    <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-50/70 rounded-full blur-[180px] -z-10" />
  </section>
);

const Footer = () => (
  <footer className="py-32 px-8 bg-[#fafafa] border-t border-slate-200">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center shadow-2xl">
          <Zap className="w-7 h-7 text-white fill-white" />
        </div>
        <span className="font-[1000] text-slate-950 text-3xl tracking-tighter uppercase italic">Lead System<span className="text-indigo-600">™</span></span>
      </div>
      
      <div className="flex gap-20 text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">
        <a href="#" className="hover:text-indigo-600 transition-colors">Legal</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
      </div>
      
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em] text-center md:text-right leading-loose">
        &copy; {new Date().getFullYear()} Lead System Lab. <br />
        Built for professionals.
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-indigo-100 selection:text-indigo-700 antialiased overflow-x-hidden font-sans">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
        html { scroll-behavior: smooth; }
        
        h1, h2, h3, h4, .font-[1000] {
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
        <PositioningSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
