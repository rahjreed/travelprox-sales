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
  UserPlus
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
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'translateY(30px)';
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
  <a href={href} className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[2rem] bg-indigo-600 px-14 py-8 text-2xl font-black text-white transition-all hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-indigo-200 ${className}`}>
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative flex items-center gap-3">
      {children}
      <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
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
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 sm:px-12 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full border px-8 py-3.5 ${
        isScrolled ? 'bg-white/90 shadow-xl backdrop-blur-xl border-slate-200' : 'bg-white/50 backdrop-blur-md border-white/20'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-slate-900">
            Travel Lead System<span className="text-[10px] align-top ml-0.5 text-indigo-500 font-black">™</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-600 uppercase tracking-widest">
          <a href="#how" className="hover:text-indigo-600 transition-colors">How it works</a>
          <a href="#proof" className="hover:text-indigo-600 transition-colors">Real Proof</a>
          <a href="#cta" className="bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-all shadow-lg">Get Leads</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-48 pb-40 px-8 overflow-hidden bg-[#fafafa]">
    {/* Animated Background Mesh */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-40" />
    </div>

    <div className="max-w-7xl mx-auto text-center relative z-10">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 text-[12px] font-black tracking-[0.2em] uppercase bg-white border border-slate-200 text-slate-900 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          For Travel Reps Tired of Chasing People for Leads
        </div>
      </Reveal>
      
      <Reveal delay={300}>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-[1000] text-slate-950 leading-[0.85] mb-12 tracking-[-0.06em]">
          Stop Chasing. <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-500">Start Attracting.</span>
        </h1>
      </Reveal>
      
      <Reveal delay={500}>
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-slate-600 mb-16 leading-relaxed font-medium">
            Stop messaging people who ignore you. See how top travel reps get <span className="text-slate-950 font-bold underline decoration-indigo-500 underline-offset-8">leads coming to them</span> without the daily DM grind or chasing friends.
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={700}>
        <div className="flex flex-col items-center gap-8">
          <PrimaryButton>
            See How I Get Leads
          </PrimaryButton>
          
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            No marketing degree or tech skills required
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const VideoSection = () => (
  <section id="how" className="py-32 px-8 bg-white border-y border-slate-100">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-5/12">
          <Reveal direction="right">
            <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[0.9] tracking-tighter text-slate-900">
              The Secret to Inbound Travel Leads
            </h2>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium max-w-xl">
              Messaging strangers in DMs is a hobby. Attracting ready-to-join prospects is a business. We show you exactly how to automate the "Sorting" so you only talk to the serious ones.
            </p>
            <ul className="space-y-8">
              {[
                "The 'Anti-Chasing' Content Strategy",
                "Qualified Prospect Attraction System",
                "Automated Hand-Raiser Page",
                "Zero-Tech Setup (We do it for you)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-xl font-black text-slate-900 italic">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        
        <div className="lg:w-7/12 w-full">
          <Reveal direction="left">
            <div className="relative group">
              <div className="absolute -inset-6 bg-slate-50 rounded-[4rem] -z-10 group-hover:rotate-1 transition-transform duration-700" />
              <div className="relative aspect-video bg-slate-950 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden border-[12px] border-white transition-all duration-700">
                <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <div className="w-28 h-28 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-indigo-700">
                    <Play className="w-12 h-12 text-white fill-white translate-x-1" />
                  </div>
                </div>
                <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-widest">
                  2:14 Video Overview
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ProofSection = () => {
  const notifications = [
    {
      user: "Jordan M.",
      message: "Hey, I saw your video about the travel club. I'm tired of my 9-5. Can we talk about how to join?",
      time: "2m ago",
      type: "DM",
      color: "bg-indigo-500"
    },
    {
      user: "System Admin",
      message: "New Lead Qualified: Sarah J. is ready for a consultation. Startup capital: Ready.",
      time: "14m ago",
      type: "LEAD",
      color: "bg-emerald-500"
    },
    {
      user: "Marcus V.",
      message: "I clicked your link, watched the breakdown. I'm in. Send me the enrollment link please!",
      time: "1h ago",
      type: "JOIN",
      color: "bg-sky-500"
    }
  ];

  return (
    <section id="proof" className="py-40 px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-28">
            <h2 className="text-5xl md:text-7xl font-[1000] mb-8 tracking-tighter text-slate-950 uppercase italic">
              This is what happens when you stop chasing
            </h2>
            <p className="text-2xl text-slate-500 font-medium max-w-2xl mx-auto">
              Real inbound interest. Real people asking YOU for information. No more awkward DMs.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12">
          {notifications.map((n, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative group hover:-translate-y-4 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${n.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {n.type === 'DM' ? <MessageSquare className="w-6 h-6" /> : n.type === 'LEAD' ? <Bell className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{n.user}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{n.type} NOTIFICATION</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase">
                    <Clock className="w-3 h-3" /> {n.time}
                  </span>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 italic font-medium text-slate-700 leading-relaxed group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                  "{n.message}"
                </div>
                
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase">Incoming Request</span>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => (
  <section className="py-40 px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-[5.5rem] font-[1000] mb-8 tracking-tighter text-slate-950 uppercase">How This Works (Simple)</h2>
          <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full" />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-24 relative">
        {[
          {
            title: "You post simple content",
            desc: "We give you the 'Hand-Raiser' templates that spark curiosity and stop people from scrolling past."
          },
          {
            title: "People click your page",
            desc: "Instead of a messy website, they land on your custom system that builds authority and filters for you."
          },
          {
            title: "They come to you",
            desc: "Qualified prospects reach out asking for details or join your team directly. No chasing required."
          }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="relative group">
              <span className="text-[12rem] font-[1000] leading-none text-slate-50 absolute -top-16 -left-4 -z-10 transition-colors group-hover:text-indigo-50/50">0{i+1}</span>
              <h3 className="text-3xl font-black mb-6 tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PainSection = () => (
  <section className="py-40 px-8 bg-slate-950 text-white relative overflow-hidden">
    <div className="max-w-4xl mx-auto relative z-10">
      <Reveal>
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-[1000] italic tracking-tighter uppercase">The Reality Check</h2>
        </div>
      </Reveal>
      
      <div className="space-y-6">
        {[
          "Begging family members who aren't interested",
          "Messaging people in DMs only to be ignored",
          "Posting deals every day with zero engagement",
          "Feeling like a 'salesperson' instead of a CEO"
        ].map((pain, i) => (
          <Reveal key={i} delay={i * 150} direction="right">
            <div className="flex items-center gap-8 p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30 flex-shrink-0">
                <X className="w-8 h-8 text-red-500" strokeWidth={4} />
              </div>
              <p className="text-2xl font-bold text-slate-100">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={600}>
        <div className="mt-28 p-1.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 rounded-[3.5rem] animate-gradient-x shadow-[0_0_50px_-10px_rgba(79,70,229,0.5)]">
          <div className="bg-slate-900 rounded-[3.3rem] p-16 text-center">
            <p className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-4">
              And it’s inconsistent at best.
            </p>
            <p className="text-2xl md:text-4xl font-black text-indigo-400 italic">This fixes that.</p>
          </div>
        </div>
      </Reveal>
    </div>
    
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/20 rounded-full blur-[180px]" />
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="cta" className="py-48 px-8 bg-white relative overflow-hidden">
    <div className="max-w-6xl mx-auto text-center relative z-10">
      <Reveal>
        <span className="text-indigo-600 font-black uppercase tracking-[0.3em] mb-6 block">Ready to change the game?</span>
        <h2 className="text-7xl md:text-[10rem] font-[1000] mb-12 tracking-tighter text-slate-950 leading-[0.8]">Want This Set Up For You?</h2>
      </Reveal>
      
      <Reveal delay={200}>
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-slate-500 mb-20 leading-relaxed font-medium">
            I only work with a limited number of travel reps at a time. Secure your system before we close access to new users this week.
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="flex flex-col items-center gap-14">
          <PrimaryButton className="!px-20 !py-10 !text-4xl">
            Show Me How This Works
          </PrimaryButton>
          
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              <p className="text-xl font-black text-slate-900 italic tracking-tight uppercase">“This isn’t a website… it’s a lead engine”</p>
            </div>
            <div className="h-px w-20 bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
              <p className="text-xl font-black text-slate-900 italic tracking-tight uppercase">Limited Availability</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    
    {/* Decorative background blur */}
    <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-indigo-50 to-transparent rounded-full blur-[100px] -z-10 opacity-60" />
  </section>
);

const Footer = () => (
  <footer className="py-24 px-8 bg-slate-50 border-t border-slate-200">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="font-black text-slate-900 tracking-tighter text-2xl uppercase">Travel Lead System™</span>
      </div>
      
      <div className="flex gap-14 text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
      </div>
      
      <div className="text-sm text-slate-400 font-bold uppercase tracking-widest text-center md:text-right leading-relaxed">
        &copy; {new Date().getFullYear()} Travel Lead Lab.<br />
        Built for high-performance travel business owners.
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-indigo-100 selection:text-indigo-700 antialiased overflow-x-hidden">
      {/* Global CSS for custom animations */}
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
          animation: gradient-x 8s ease infinite;
        }
        html { scroll-behavior: smooth; }
        
        /* Font refinements for high impact */
        h1, h2, h3, .font-black {
          letter-spacing: -0.04em;
        }
      `}</style>
      
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <ProofSection />
        <StepsSection />
        <PainSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
