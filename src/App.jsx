import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Play, 
  MessageSquare, 
  Gift, 
  CheckCircle, 
  ArrowRight, 
  X,
  ShieldCheck,
  MousePointerClick,
  Users,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

/**
 * ENHANCED REVEAL COMPONENT
 * Supports staggered delays and directional sliding
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
      { threshold: 0.15 }
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

const ShimmerButton = ({ children, className = "" }) => (
  <button className={`group relative overflow-hidden rounded-2xl bg-slate-900 px-12 py-6 text-xl font-bold text-white transition-all hover:bg-slate-800 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] ${className}`}>
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
    <span className="relative flex items-center justify-center gap-3">
      {children}
    </span>
  </button>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className={`max-w-5xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full border border-white/20 px-6 py-2.5 ${
        isScrolled ? 'bg-white/80 shadow-lg backdrop-blur-xl border-slate-200/50 scale-[0.98]' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-lg tracking-tighter text-slate-900">
            Travel Lead System<span className="text-[10px] align-top ml-0.5 text-indigo-500 font-black">™</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#how" className="hover:text-indigo-600 transition-colors">Process</a>
          <a href="#results" className="hover:text-indigo-600 transition-colors">Results</a>
          <a href="#cta" className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">Claim System</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-48 pb-32 px-6 overflow-hidden">
    {/* Animated Background Mesh */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
    </div>

    <div className="max-w-6xl mx-auto text-center relative z-10">
      <Reveal delay={100}>
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 text-[11px] font-black tracking-[0.2em] uppercase bg-indigo-50/50 backdrop-blur-sm border border-indigo-100 text-indigo-600 rounded-full shadow-sm">
          <Sparkles className="w-3 h-3 animate-bounce" />
          The New Standard for Travel Reps
        </div>
      </Reveal>
      
      <Reveal delay={300}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-[900] text-slate-900 leading-[0.95] mb-12 tracking-[-0.05em]">
          Stop Chasing. <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-400">Start Attracting.</span>
        </h1>
      </Reveal>
      
      <Reveal delay={500}>
        <p className="text-xl md:text-2xl text-slate-500 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
          A done-for-you system that puts you in front of qualified leads <span className="text-slate-900 underline decoration-indigo-200 underline-offset-4 font-semibold">without</span> the daily DM grind or tech-headaches.
        </p>
      </Reveal>
      
      <Reveal delay={700}>
        <div className="flex flex-col items-center gap-8">
          <a href="#cta" className="w-full sm:w-auto">
            <ShimmerButton>
              Access The Lead System
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </ShimmerButton>
          </a>
          
          <div className="flex items-center gap-6 py-2 px-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-yellow-400">
                {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-1">
                Trusted by 450+ Travel Reps
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const VideoSection = () => (
  <section id="how" className="py-40 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <Reveal direction="right">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              The End of <span className="text-red-500 italic">"Hey Girl!"</span> Messaging
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              We build your attraction engine. People land on your page, see your value, and raise their hand to work with you. No chasing required.
            </p>
            <ul className="space-y-6">
              {[
                "Custom 'Lead Attraction' Page Setup",
                "Proven Travel Content Templates",
                "Automated Qualification System",
                "Zero-Tech Skill Required"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg font-bold text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <CheckCircle className="w-4 h-4" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <Reveal direction="left">
            <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-100/50 rounded-[3rem] -rotate-2 -z-10 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-[4/3] bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-white group-hover:shadow-indigo-200/50 transition-all duration-500">
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=2000')" }} />
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-active:scale-95">
                    <Play className="w-10 h-10 text-indigo-600 fill-indigo-600 translate-x-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-sm">See the system in action</p>
                    <span className="text-white/60 text-xs font-mono tracking-widest">02:14</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const ProofCard = ({ card, delay }) => (
  <Reveal delay={delay}>
    <div className={`group relative bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden ${card.featured ? 'ring-2 ring-indigo-500/20' : ''}`}>
      {card.featured && (
        <div className="absolute top-0 right-0 p-6">
          <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
            High Intent
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-5 mb-10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 ${card.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : card.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-sky-50 text-sky-600'}`}>
          {card.icon}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">{card.type}</p>
          <p className="font-black text-slate-900 text-lg tracking-tight">{card.platform}</p>
        </div>
      </div>

      <div className={`relative p-8 rounded-3xl mb-8 leading-relaxed font-medium transition-colors duration-500 ${card.color === 'indigo' ? 'bg-indigo-50/50 text-indigo-950 group-hover:bg-indigo-100/50' : 'bg-slate-50/50 text-slate-700 group-hover:bg-slate-100/50'}`}>
        <div className="absolute top-4 left-4 opacity-10">
          <MessageSquare className="w-12 h-12" />
        </div>
        <span className="relative z-10 italic">"{card.content}"</span>
      </div>

      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
        <span>Probability</span>
        <span className={`${card.color === 'emerald' ? 'text-emerald-500' : card.color === 'indigo' ? 'text-indigo-600' : 'text-sky-500'}`}>{card.percentage}</span>
      </div>
      <div className="mt-4 h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
        <div 
          className={`h-full transition-all duration-1000 delay-700 ${card.color === 'emerald' ? 'bg-emerald-500' : card.color === 'indigo' ? 'bg-indigo-600' : 'bg-sky-500'}`} 
          style={{ width: card.percentage }}
        />
      </div>
    </div>
  </Reveal>
);

const ProofSection = () => {
  const cards = [
    {
      type: "Organic Lead",
      platform: "Inbox Inquiry",
      content: "I'm so sick of my corporate job. I saw your post and clicked the link. How do I get started with the travel business?",
      icon: <Users className="w-8 h-8" />,
      color: "emerald",
      percentage: "88%"
    },
    {
      type: "System Match",
      platform: "New Application",
      content: "Just finished watching your overview video. I have the startup capital and I'm ready to launch today. When can we talk?",
      icon: <Sparkles className="w-8 h-8" />,
      color: "indigo",
      percentage: "100%",
      featured: true
    },
    {
      type: "Team Sign-up",
      platform: "Automated Join",
      content: "The system explained everything perfectly. I didn't even need to ask a single question before joining your team.",
      icon: <Zap className="w-8 h-8" />,
      color: "sky",
      percentage: "74%"
    }
  ];

  return (
    <section id="results" className="py-40 px-6 bg-[#fcfcfd]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">Attraction Over Action.</h2>
            <p className="text-xl text-slate-500 font-medium">When you have the right system, the leads do the chasing for you.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card, idx) => (
            <ProofCard key={idx} card={card} delay={idx * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => (
  <section className="py-40 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-20">
        {[
          {
            step: "01",
            title: "Connect Your Social",
            desc: "Use our 'Attraction Templates' to turn your profiles into magnets. No more posting deals that get ignored."
          },
          {
            step: "02",
            title: "Link Your System",
            desc: "Place your unique link in your bio. Our system handles the heavy lifting, the explaining, and the sorting."
          },
          {
            step: "03",
            title: "Wake Up to Leads",
            desc: "Check your phone to see qualified prospects who are actually interested in what you have to offer."
          }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 200}>
            <div className="relative group">
              <span className="block text-8xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors duration-500 mb-[-40px] tracking-tighter">{item.step}</span>
              <h3 className="text-2xl font-black mb-4 tracking-tight relative z-10">{item.title}</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium relative z-10">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PainSection = () => (
  <section className="py-40 px-6 bg-slate-950 relative overflow-hidden">
    <div className="max-w-4xl mx-auto relative z-10">
      <Reveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">The Reality Check</h2>
        </div>
      </Reveal>
      
      <div className="space-y-6">
        {[
          "Begging family members to 'look at a presentation'",
          "Spending 4 hours a day in DMs only to be left on 'read'",
          "Feeling like a 'salesperson' instead of a business owner"
        ].map((pain, i) => (
          <Reveal key={i} delay={i * 150} direction="right">
            <div className="flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors duration-300">
              <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/20">
                <X className="w-6 h-6 text-red-500" strokeWidth={3} />
              </div>
              <p className="text-xl font-bold text-slate-300">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={600}>
        <div className="mt-20 p-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 rounded-[3rem] animate-gradient-x">
          <div className="bg-slate-900 rounded-[2.8rem] p-12 text-center">
            <p className="text-3xl md:text-5xl font-black text-white leading-tight">
              It’s time to stop surviving<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">and start scaling.</span>
            </p>
          </div>
        </div>
      </Reveal>
    </div>
    
    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/20 rounded-full blur-[160px]" />
    </div>
  </section>
);

const FinalCTA = () => (
  <section id="cta" className="py-48 px-6 bg-white relative">
    <div className="max-w-5xl mx-auto text-center">
      <Reveal>
        <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter text-slate-900">Get The System.</h2>
        <p className="text-2xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
          Limited slots available. We only take on a select number of reps each week to ensure maximum quality and results.
        </p>
        
        <div className="flex flex-col items-center gap-10">
          <a href="#" className="w-full sm:w-auto">
            <ShimmerButton className="!px-20 !py-8 !text-3xl">
              Apply Now
              <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </ShimmerButton>
          </a>
          
          <p className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-sm bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            No technical knowledge required
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-24 px-6 bg-slate-50 border-t border-slate-200/60">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="font-black text-slate-900 tracking-tight text-lg uppercase tracking-tighter">Travel Lead System™</span>
      </div>
      
      <div className="flex gap-12 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
        <a href="#" className="hover:text-indigo-600 transition-colors">Legal</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
      </div>
      
      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Lead System Lab.
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 antialiased overflow-x-hidden">
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
