import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Coffee, Globe, Clock, Users } from 'lucide-react';

const facts = [
  { icon: Coffee, label: 'Cups Served Daily', value: 1200, suffix: '+', color: 'from-amber-400 to-orange-500' },
  { icon: Globe, label: 'Bean Origins', value: 14, suffix: ' Countries', color: 'from-emerald-400 to-teal-500' },
  { icon: Clock, label: 'Roasting Hours / Week', value: 84, suffix: ' hrs', color: 'from-blue-400 to-indigo-500' },
  { icon: Users, label: 'Monthly Visitors', value: 25000, suffix: '+', color: 'from-purple-400 to-pink-500' },
];

export default function CoffeeFacts() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".facts-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.utils.toArray('.fact-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          delay: i * 0.1,
          ease: "back.out(1.5)"
        });

        // Counter animation
        const counter = card.querySelector('.fact-counter');
        if (counter) {
          const target = parseInt(counter.dataset.target);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toLocaleString();
            }
          });
        }

        // Circular progress animation
        const circle = card.querySelector('.progress-circle');
        if (circle) {
          const circumference = 2 * Math.PI * 54;
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;
          gsap.to(circle, {
            strokeDashoffset: circumference * (1 - (i + 1) / facts.length * 0.85),
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-royal-blue text-white overflow-hidden relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="facts-header text-center mb-20">
          <span className="text-sm font-bold text-white/40 tracking-[0.3em] uppercase mb-4 block">By The Numbers</span>
          <h2 className="text-5xl md:text-7xl font-display font-black mb-6">
            Coffee in Numbers
          </h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            The passion behind each cup, measured in more ways than one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, i) => {
            const Icon = fact.icon;
            return (
              <div key={i} className="fact-card relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 group text-center">
                {/* Circular progress */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <circle className="progress-circle" cx="60" cy="60" r="54" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${fact.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="fact-counter text-4xl font-display font-black" data-target={fact.value}>0</span>
                  <span className="text-lg text-white/60 font-medium">{fact.suffix}</span>
                </div>
                <p className="text-white/50 text-sm">{fact.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
