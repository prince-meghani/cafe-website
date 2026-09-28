import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Award } from 'lucide-react';

const baristas = [
  {
    name: 'Arief Sulistyo',
    role: 'Head Barista & Co-founder',
    experience: 12,
    bio: 'Certified Q Grader with a passion for single-origin beans. Arief has competed in 7 national barista championships and believes every cup should tell a story.',
    specialty: 'Pour-over & Siphon',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Maya Putri',
    role: 'Lead Pastry Chef',
    experience: 8,
    bio: 'Trained at Le Cordon Bleu Paris, Maya brings French technique with Indonesian flavors. Her croissants have won 3 regional awards.',
    specialty: 'Viennoiserie & Sourdough',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Dimas Hartono',
    role: 'Senior Barista',
    experience: 6,
    bio: 'National Latte Art champion 2024. Dimas transforms every cup into a canvas and believes coffee is as much about visual beauty as it is about taste.',
    specialty: 'Latte Art & Espresso',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
  },
  {
    name: 'Sari Anggraini',
    role: 'Roast Master',
    experience: 10,
    bio: 'Sari oversees our small-batch roasting process, ensuring every bean reaches its peak expression. Her palate can distinguish over 300 flavor notes.',
    specialty: 'Roast Profiling & Cupping',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
  },
];

export default function BaristaTeam() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".team-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.utils.toArray('.barista-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out"
        });

        const counter = card.querySelector('.exp-counter');
        if (counter) {
          const target = parseInt(counter.dataset.target);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 80%" },
            onUpdate: () => {
              counter.textContent = Math.round(obj.val);
            }
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-cream overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="team-header text-center mb-10 md:mb-12">
          <span className="text-xs sm:text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-3 sm:mb-4 block">The People</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-royal-blue mb-4 sm:mb-6">
            Meet Our Artisans
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-royal-blue/60 max-w-2xl mx-auto">
            Passionate, skilled, and obsessed with quality. The people behind every perfect cup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {baristas.map((barista, i) => (
            <div key={i} className="barista-card group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                <img
                  src={barista.img}
                  alt={barista.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue via-royal-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <p className="text-white/90 text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {barista.bio}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-royal-blue mb-1">{barista.name}</h3>
                <p className="text-sm text-royal-blue/50 mb-4">{barista.role}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-royal-blue/40" />
                    <span className="text-sm text-royal-blue/60">{barista.specialty}</span>
                  </div>
                  <div className="text-right">
                    <span className="exp-counter text-2xl font-display font-bold text-royal-blue" data-target={barista.experience}>0</span>
                    <span className="text-xs text-royal-blue/40 block">years exp.</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
