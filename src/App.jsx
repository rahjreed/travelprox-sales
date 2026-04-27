import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  X,
  ShieldCheck,
  Sparkles,
  Lock,
  Play,
  TrendingUp,
  Target,
  AlertCircle,
  Users,
  Search,
  MousePointer2,
  DoorOpen,
  SearchCode,
  UserCheck
} from 'lucide-react';

/**
 * GLOBAL ERROR SUPPRESSION
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
}

/**
 * REVEAL COMPONENT
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
      case 'up': return 'translateY(60px)';
      case 'down': return 'translateY(-60px)';
      case 'left': return 'translateX(60px)';
      case 'right': return 'translateX(-60px)';
      default: return 'translateY(60px)';
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
 * ZARA MODAL
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
      <div className="absolute inset-0 bg-[#0B1220]/98 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_0_100px_rgba(91,95,255,0.5)] overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-6 right-6 z-10">
          <button onClick={onClose} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <div className="w-full h-[700px] max-h-[85vh]">
          <iframe id="JotFormIFrame-019d8941f1b87b70a991f93de29ca7d94d38" title="Zara" allowTransparency="true" allow="geolocation; microphone; camera; fullscreen" src="https://agent.jotform.com/019d8941f1b87b70a991f93de29ca7d94d38?embedMode=iframe&autofocus=1&background=1&shadow=0" frameBorder="0" style={{ minWidth: '100%', height: '100%', border: 'none' }} scrolling="no" />
        </div>
      </div>
    </div>
  );
};

/**
 * AGGRESSIVE CTA BUTTON
 */
const AggressiveCTA = ({ onClick, text = "Start Getting Inbound Leads", subtext = "Answer a couple quick questions and I’ll show you how this works", className = "", alignment = "start" }) => (
  <div className={`flex flex-col items-${alignment === 'center' ? 'center' : 'start'} gap-4`}>
    <div className="relative group w-full sm:w-auto">
      <div className="absolute -inset-2 bg-[#5B5FFF] rounded-2xl blur-2xl opacity-20 group-hover:opacity-50 transition duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-[#5B5FFF] to-[#8E7CFF] rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
      
      <button 
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className={`relative w-full sm:w-auto inline-flex items-center justify-center gap-6 overflow-hidden rounded-2xl bg-white px-10 py-7 md:px-14 md:py-8 text-xl md:text-2xl font-[1000] text-[#0F172A] border border-white transition-all hover:scale-[1.02] active:scale-95 ${className}`}
      >
        <span className="relative flex items-center gap-4 tracking-tighter uppercase text-center leading-none">
          {text}
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform text-[#5B5FFF]" strokeWidth={4} />
        </span>
      </button>
    </div>
    {subtext && <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-center">{subtext}</p>}
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
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-3xl border px-6 py-4 ${
        isScrolled ? 'bg-[#0B1220]/90 shadow-2xl backdrop-blur-xl border-white/10' : 'bg-transparent border-transparent'
      }`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(91,95,255,0.5)]"><Zap className="w-6 h-6 text-white fill-white" /></div>
          <span className={`font-black text-xl md:text-2xl tracking-tighter uppercase ${isScrolled ? 'text-white' : 'text-white'}`}>Inbound Lead System<span className="text-[#5B5FFF]">™</span></span>
        </div>
        <button onClick={onTrigger} className="px-6 py-2.5 rounded-full transition-all shadow-xl font-black uppercase text-[10px] tracking-widest bg-white text-[#0B1220] hover:bg-[#5B5FFF] hover:text-white">Start Now</button>
      </div>
    </nav>
  );
};

const Hero = ({ onTrigger }) => (
  <section className="relative min-h-screen flex items-center pt-32 pb-24 px-6 overflow-hidden bg-[#0B1220]">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#5B5FFF]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#8E7CFF]/10 rounded-full blur-[150px]" />
    </div>
    
    <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.4em] uppercase bg-[#5B5FFF]/10 text-[#5B5FFF] border border-[#5B5FFF]/30 rounded-full backdrop-blur-md">
            The Blueprint for Universal Inbound Leads
        </div>
      </Reveal>
      
      <Reveal delay={300}>
        <h1 className="text-6xl md:text-[9rem] lg:text-[10rem] font-[1000] text-white leading-[0.85] tracking-[-0.08em] uppercase mb-10">
          Stop Chasing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] via-white to-[#8E7CFF] drop-shadow-[0_0_30px_rgba(91,95,255,0.4)]">
            PEOPLE
          </span>
        </h1>
      </Reveal>

      <div className="max-w-4xl mx-auto mb-16">
        <Reveal delay={600}>
          <div className="space-y-8">
            <p className="text-2xl md:text-4xl text-slate-300 font-medium leading-[1.1] tracking-tight">
              If you’re posting, messaging people, and not getting results... <br />
              <span className="text-white font-black italic underline decoration-[#5B5FFF] decoration-4 underline-offset-8">effort isn't your problem.</span>
            </p>
            <p className="text-lg md:text-2xl text-slate-500 font-bold uppercase tracking-widest leading-tight">
              This system brings high-value <span className="text-white shadow-[0_0_20px_rgba(255,255,255,0.3)] px-1 font-black">LEADS</span> to you daily — No chasing, No cold DMs, No begging.
            </p>
          </div>
        </Reveal>
      </div>
      
      <Reveal delay={800}>
        <div className="flex justify-center">
          <AggressiveCTA 
            onClick={onTrigger} 
            text="Start Getting Inbound Leads" 
            subtext="This shows you how to get people reaching out to YOU instead"
            alignment="center"
          />
        </div>
      </Reveal>
    </div>
  </section>
);

const CallOut = () => (
  <section className="py-32 bg-[#5B5FFF] relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
    <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
      <Reveal>
        <h2 className="text-5xl md:text-8xl font-[1000] text-[#0B1220] uppercase tracking-[-0.06em] mb-16 leading-none text-center">
          Be honest… <br /> this sound like you?
        </h2>
      </Reveal>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { text: "You post about your offer but nobody messages you", icon: <MessageSquare /> },
          { text: "You DM people and get left on read", icon: <X /> },
          { text: "Doing everything right but nothing is working", icon: <AlertCircle /> }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="bg-[#0B1220] p-12 rounded-[2.5rem] shadow-2xl border border-white/10 group hover:bg-[#0B1220]/90 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-[#5B5FFF]/10 text-[#5B5FFF] rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight text-center">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PerspectiveShift = () => (
  <section className="py-40 bg-[#0F172A] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-24">
        <Reveal>
            <h2 className="text-5xl md:text-8xl font-[1000] text-white uppercase tracking-[-0.06em] mb-6 text-center">
                Chasing vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5FFF] to-[#8E7CFF]">Attracting</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-2xl font-medium tracking-tight uppercase tracking-widest text-center">Why most people struggle to get leads</p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-stretch">
        <Reveal direction="left" delay={200}>
            <div className="h-full bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3rem] space-y-10 border-l-4 border-l-red-500/50">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                        <DoorOpen className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-[1000] text-white uppercase tracking-tighter italic text-left"><span className="text-red-500">CHASING</span> is Interruption</h3>
                </div>
                <div className="space-y-6 text-lg md:text-xl text-slate-400 font-medium leading-relaxed text-left">
                    <p>It's like <span className="text-white font-bold underline decoration-red-500/50">knocking on a stranger's door</span> in the middle of dinner.</p>
                    <p>When you cold DM people or post generic offers, people feel <span className="text-white italic">interrupted and pressured.</span></p>
                    <p>Their guard goes up instantly. They want to end the interaction quickly. You are a <span className="text-white border-b border-white/20">pest</span>, not a professional.</p>
                </div>
            </div>
        </Reveal>

        <Reveal direction="right" delay={400}>
            <div className="h-full bg-gradient-to-br from-[#5B5FFF]/10 to-transparent border border-[#5B5FFF]/20 p-10 md:p-16 rounded-[3rem] space-y-10 border-r-4 border-r-[#5B5FFF]">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#5B5FFF]/20 text-[#5B5FFF] rounded-2xl flex items-center justify-center">
                        <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-[1000] text-white uppercase tracking-tighter italic text-left"><span className="text-[#5B5FFF]">ATTRACTING</span> is Intent</h3>
                </div>
                <div className="space-y-6 text-lg md:text-xl text-slate-400 font-medium leading-relaxed text-left">
                    <p>It's like someone <span className="text-white font-bold underline decoration-[#5B5FFF]/50">actively searching</span> for exactly what you provide.</p>
                    <p>When someone is looking for a solution, they are <span className="text-white italic">open, curious, and ready to buy.</span></p>
                    <p>They aren't looking to get rid of you—they are looking for you to help them. You are the <span className="text-white border-b border-white/20">Authority</span> they've been waiting for.</p>
                </div>
            </div>
        </Reveal>
      </div>

      <Reveal delay={600}>
        <div className="mt-24 text-center max-w-4xl mx-auto p-12 bg-white/5 rounded-[2.5rem] border border-white/5">
            <p className="text-2xl md:text-4xl text-white font-black uppercase tracking-tighter leading-tight text-center">
                Most people are <span className="text-red-500 underline decoration-red-500/30">"door knocking online"</span> by posting and messaging. <br className="hidden md:block" />
                <span className="text-[#5B5FFF]">This system flips it</span> so people come to YOU already interested.
            </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const BridgeSection = () => (
    <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
                <Reveal direction="left">
                    <h2 className="text-5xl md:text-8xl font-[1000] text-[#0F172A] uppercase tracking-tighter leading-[0.85] mb-8 text-left">
                        This is <span className="text-[#5B5FFF] block">WHY</span> you’re not getting <span className="underline decoration-[#5B5FFF]">leads.</span>
                    </h2>
                </Reveal>
                <Reveal direction="right">
                    <div className="space-y-8">
                        {[
                            { title: "Generic Appearance", desc: "You look like every other rep posting offers. You're a commodity, not an authority." },
                            { title: "No trust engine", desc: "You don't have a system that builds trust automatically before you even speak." },
                            { title: "Effort over positioning", desc: "You're relying on raw effort and DMs instead of positioning your offer correctly." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start text-left">
                                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"><X strokeWidth={3} /></div>
                                <div>
                                    <h4 className="text-2xl font-black uppercase text-[#0F172A] mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-lg font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);

const PainReality = () => (
  <section className="py-40 bg-slate-50 border-y border-slate-200 text-center">
    <div className="max-w-7xl mx-auto px-6">
        <Reveal>
            <span className="text-[#5B5FFF] font-black uppercase tracking-widest text-sm mb-10 block text-center">The Hard Truth</span>
            <h2 className="text-5xl md:text-[9rem] font-[1000] uppercase tracking-tighter leading-[0.8] text-[#0F172A] mb-12 text-center">
              Most business owners <span className="text-red-600 block text-center uppercase">STAY STUCK & BROKE</span> 
            </h2>
            <p className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter mb-20 text-center">
               Because they rely on <span className="italic text-center">"posting and hoping."</span>
            </p>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
                { title: "No Predictable System", desc: "You wake up every day not knowing where your next lead is coming from." },
                { title: "Zero Authority", desc: "You're begging for attention like a salesman instead of an advisor." },
                { title: "No Inbound Traffic", desc: "If you aren't hunting, your business starves. That's a job, not a business." }
            ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col items-center">
                        <h4 className="text-2xl font-black uppercase text-[#0F172A] mb-4 text-center">{item.title}</h4>
                        <p className="text-slate-500 font-medium leading-tight text-center">{item.desc}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    </div>
  </section>
);

const EngineSection = ({ onTrigger }) => (
    <section className="py-48 bg-[#0B1220] relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-32">
                <Reveal>
                    <span className="inline-block mb-8 text-xs font-black tracking-[0.5em] uppercase text-[#5B5FFF] px-6 py-2 border border-[#5B5FFF]/20 rounded-full text-center">The Solution</span>
                    <h2 className="text-5xl md:text-9xl font-[1000] text-white uppercase tracking-tighter leading-none mb-12 text-center">
                        The <span className="text-[#5B5FFF]">INBOUND</span> Engine
                    </h2>
                    <p className="text-xl md:text-3xl text-slate-500 max-w-3xl mx-auto font-medium text-center">
                        This isn't a website. It's a high-converting machine that qualifies <span className="text-white">LEADS</span> for you before you ever talk to them.
                    </p>
                </Reveal>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16 relative text-center">
                {[
                    { icon: <TrendingUp className="w-12 h-12" />, title: "Inbound Content", desc: "Exact templates that attract the right people and flip the switch from 'pest' to 'authority' instantly." },
                    { icon: <Target className="w-12 h-12" />, title: "Lead Filtration", desc: "Automated logic that sorts the tire-kickers from the serious business builders for you." },
                    { icon: <Zap className="w-12 h-12" />, title: "Start Closing", desc: "Qualified leads reach out already interested. You only speak to people who are ready to book. Period." }
                ].map((item, i) => (
                    <Reveal key={i} delay={i * 200}>
                        <div className="group p-8 rounded-3xl hover:bg-white/5 transition-colors duration-500 border border-transparent hover:border-white/5 h-full flex flex-col items-center">
                            <div className="w-24 h-24 bg-white/5 text-[#5B5FFF] rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:bg-[#5B5FFF] group-hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(91,95,255,0.2)]">{item.icon}</div>
                            <h3 className="text-3xl font-[1000] uppercase tracking-tighter text-white mb-6 leading-none text-center">{item.title}</h3>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed text-center">{item.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
            <div className="mt-32 flex justify-center">
                <AggressiveCTA onClick={onTrigger} text="Start Getting Inbound Leads" alignment="center" />
            </div>
        </div>
    </section>
);

/**
 * AUTHORITY PROFILE SECTION
 * Moved here per user request to introducing Roger Reed before the final CTA.
 */
const AuthorityProfile = () => (
    <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <Reveal direction="left">
                    <div className="relative group max-w-md mx-auto lg:mx-0">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#5B5FFF] to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000" />
                        <div className="relative rounded-[3rem] overflow-hidden border-2 border-slate-100 shadow-2xl bg-[#0F172A]">
                            <img 
                                src="https://images.travelprox.com/callista/rahj.png" 
                                alt="Roger Reed - Lead Gen Specialist" 
                                className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
                                <h4 className="text-white font-[1000] text-xl uppercase tracking-tighter leading-none mb-1">Roger Reed</h4>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#5B5FFF] animate-pulse" />
                                    <p className="text-[#5B5FFF] text-[10px] font-black uppercase tracking-[0.3em]">Lead Gen Specialist</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal direction="right" delay={200}>
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 text-[10px] font-black tracking-[0.4em] uppercase bg-[#5B5FFF]/5 text-[#5B5FFF] border border-[#5B5FFF]/20 rounded-full">
                           Meet The Architect
                        </div>
                        <h2 className="text-5xl md:text-7xl font-[1000] text-[#0F172A] uppercase tracking-tighter leading-[0.9]">
                            Helping business owners <br /> 
                            <span className="text-[#5B5FFF]">get leads</span> without chasing.
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
                            I spent years struggling to find consistent leads in my own business until I realized that raw effort is no match for a high-converting system. I built this engine to handle the qualifying and filtering so you can focus on what actually makes you money: <span className="text-[#0F172A] font-bold italic">Closing deals.</span>
                        </p>
                        <div className="flex items-center gap-4 text-[#5B5FFF]">
                            <UserCheck className="w-8 h-8" />
                            <span className="text-sm font-black uppercase tracking-widest italic">Authority Verified System</span>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);

const FinalCTA = ({ onTrigger }) => (
    <section id="cta" className="py-56 md:py-80 bg-slate-50 border-t border-slate-100 relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto relative z-10 px-6">
            <Reveal>
                <div className="text-[#0F172A] text-2xl md:text-6xl font-[1000] uppercase tracking-[-0.04em] mb-12 leading-tight text-center">
                    If you're serious about building a <br className="hidden md:block" /> real <span className="text-[#5B5FFF] underline underline-offset-8">business…</span>
                </div>
                <p className="text-xl md:text-3xl text-slate-500 font-bold uppercase tracking-widest mb-24 max-w-3xl mx-auto text-center">
                    You need a <span className="text-[#0F172A] border-b-4 border-[#5B5FFF]">SYSTEM</span> that brings clients to you daily — not one that forces you to chase.
                </p>
            </Reveal>
            
            <Reveal delay={200}>
                <div className="flex justify-center">
                    <AggressiveCTA 
                        onClick={onTrigger} 
                        text="Get Clients Coming To You Now" 
                        subtext="Answer a couple quick questions and I’ll show you how this works"
                        className="!bg-[#0F172A] !text-white !px-20"
                        alignment="center"
                    />
                </div>
            </Reveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-[#5B5FFF]/10 to-transparent -z-10 opacity-30" />
    </section>
);

const Footer = () => (
  <footer className="py-24 px-6 bg-[#0B1220] text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#5B5FFF] rounded-xl flex items-center justify-center shadow-lg"><Zap className="w-6 h-6 text-white fill-white" /></div>
        <span className="font-black text-2xl tracking-tighter uppercase text-white text-left">Inbound Lead System™</span>
      </div>
      <div className="text-[11px] text-slate-600 font-bold uppercase tracking-[0.3em] text-center md:text-right">
        &copy; {new Date().getFullYear()} Inbound Lead System. <br /> 
        Helping business owners get leads without chasing.
      </div>
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
    <div className="min-h-screen bg-[#0B1220] selection:bg-[#5B5FFF]/30 selection:text-white antialiased overflow-x-hidden font-sans">
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        html { scroll-behavior: smooth; }
        h1, h2, h3, h4, .font-[1000] { letter-spacing: -0.06em; -webkit-font-smoothing: antialiased; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
      
      <Navbar onTrigger={() => setIsModalOpen(true)} />
      <main>
        <Hero onTrigger={() => setIsModalOpen(true)} />
        <CallOut />
        <PerspectiveShift />
        <BridgeSection />
        <PainReality />
        <EngineSection onTrigger={() => setIsModalOpen(true)} />
        <AuthorityProfile />
        <FinalCTA onTrigger={() => setIsModalOpen(true)} />
      </main>
      <Footer />

      <ZaraModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
