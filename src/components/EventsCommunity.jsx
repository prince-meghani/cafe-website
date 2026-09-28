import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, Music, Coffee, Palette } from 'lucide-react';

const events = [
  {
    icon: Music,
    title: 'Jazz & Pour-Over Nights',
    date: 'Every Friday, 7PM',
    desc: 'Live jazz performances paired with exclusive pour-over tastings. An evening where great music meets extraordinary coffee.',
    img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop',
    tag: 'Live Music',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Coffee,
    title: 'Brewing Masterclass',
    date: 'Saturdays, 10AM',
    desc: 'Learn the art of brewing from our head barista. From Chemex to AeroPress, master the techniques behind a perfect cup.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
    tag: 'Workshop',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: Palette,
    title: 'Latte Art Lab',
    date: '1st Sunday of Every Month',
    desc: 'Turn your latte into a canvas. Our award-winning barista Dimas guides you through rosettas, tulips, and free-pour designs.',
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop',
    tag: 'Creative Class',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    icon: Calendar,
    title: 'Community Coffee Hour',
    date: 'Wednesdays, 4PM',
    desc: 'Free coffee tasting sessions where neighbors meet, ideas spark, and our community grows stronger — one cup at a time.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
    tag: 'Community',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
];

export default function EventsCommunity() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".events-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.utils.toArray('.event-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 80,
          opacity: 0,
          rotateX: 10,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-cream overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="events-header flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Experiences</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-royal-blue">
              More Than Coffee
            </h2>
          </div>
          <button className="w-full sm:w-auto bg-royal-blue text-white px-7 sm:px-8 py-3 rounded-full font-medium hover:bg-royal-blue/90 transition-all hover:scale-105 active:scale-95 text-center min-h-[44px]">
            View All Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={i} className="event-card group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="relative h-52 sm:h-64 lg:h-full overflow-hidden">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-royal-blue text-xs font-bold px-3 py-1.5 rounded-full">
                      {event.tag}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-royal-blue/5 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-royal-blue group-hover:text-white transition-colors duration-300">
                      <Icon size={20} className="text-royal-blue group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-royal-blue mb-2">{event.title}</h3>
                    <p className="text-xs sm:text-sm font-medium text-royal-blue/50 mb-3 sm:mb-4 flex items-center gap-2">
                      <Calendar size={14} /> {event.date}
                    </p>
                    <p className="text-sm sm:text-base text-royal-blue/60 leading-relaxed mb-5 sm:mb-6">{event.desc}</p>
                    <button className="self-start text-sm font-bold text-royal-blue flex items-center gap-2 group-hover:gap-4 transition-all">
                      Learn More <span className="text-lg">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
