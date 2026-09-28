import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Food Blogger',
    text: 'I\'ve visited over 200 cafes across Southeast Asia, and Ruangrasa stands in a league of its own. The attention to detail — from the bean sourcing to the latte art — is extraordinary.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/200?img=1',
    location: 'Jakarta'
  },
  {
    name: 'Andi Prasetyo',
    role: 'Freelance Designer',
    text: 'This isn\'t just my favorite cafe. It\'s my second office, my creative sanctuary, and the reason I look forward to Monday mornings. The cold brew is a revelation.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/200?img=3',
    location: 'Bandung'
  },
  {
    name: 'Lisa Chen',
    role: 'Startup Founder',
    text: 'I held my first investor meeting here. Three rounds of funding later, Ruangrasa remains our team\'s unofficial headquarters. The pastries don\'t hurt either.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/200?img=5',
    location: 'Singapore'
  },
  {
    name: 'Marcus van den Berg',
    role: 'Travel Writer',
    text: 'In a city full of incredible coffee, Ruangrasa manages to surprise. The Velvet Sunset Latte alone is worth the trip. The ambience? Chef\'s kiss.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/200?img=8',
    location: 'Amsterdam'
  },
  {
    name: 'Dina Rahmawati',
    role: 'Architecture Student',
    text: 'The interiors are stunning — warm wood, natural light, perfect acoustics. It\'s rare to find a cafe that cares as much about space as it does about coffee. I come here to study every day.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/200?img=9',
    location: 'Yogyakarta'
  },
  {
    name: 'James O\'Connor',
    role: 'Photographer',
    text: 'Every corner of this place is photogenic. But beyond aesthetics, the warmth of the staff and the quality of the brew keeps bringing me back. Genuine hospitality.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/200?img=12',
    location: 'Melbourne'
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Row 1 scrolls left
      gsap.to(slider1Ref.current, {
        xPercent: -30,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      // Row 2 scrolls right
      gsap.to(slider2Ref.current, {
        xPercent: 30,
        ease: "none",
        duration: 45,
        repeat: -1,
      });

      gsap.from(".test-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const TestimonialCard = ({ t, variant = 'default' }) => (
    <div className={`shrink-0 w-[280px] sm:w-[380px] md:w-[480px] ${variant === 'featured' ? 'bg-royal-blue text-white' : 'bg-white text-royal-blue'} rounded-[1.8rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden`}>
      {/* Quote icon */}
      <Quote size={32} className={`${variant === 'featured' ? 'text-white/10' : 'text-royal-blue/10'} absolute top-5 right-5 sm:top-6 sm:right-6`} />

      {/* Stars */}
      <div className="flex gap-1 mb-4 sm:mb-6">
        {[...Array(5)].map((_, s) => (
          <Star key={s} size={15} fill={s < t.rating ? "#FFD700" : "transparent"} className="text-yellow-400" />
        ))}
      </div>

      <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 ${variant === 'featured' ? 'text-white/90' : 'text-royal-blue/80'}`}>
        "{t.text}"
      </p>

      <div className="flex items-center gap-3.5 sm:gap-4">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-offset-2 ring-royal-blue/20" />
        <div>
          <h4 className="font-display font-bold text-sm sm:text-base">{t.name}</h4>
          <p className={`text-xs sm:text-sm ${variant === 'featured' ? 'text-white/60' : 'text-royal-blue/50'}`}>
            {t.role} · {t.location}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-cream overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 test-header text-center mb-10 md:mb-12">
        <span className="text-xs sm:text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Stories From Our Guests</span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-royal-blue mb-4 sm:mb-6">
          Why They Keep Coming Back
        </h2>
      </div>

      {/* Row 1 */}
      <div className="mb-6 overflow-hidden">
        <div ref={slider1Ref} className="flex gap-6 w-max">
          {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((t, i) => (
            <TestimonialCard key={i} t={t} variant={i % 3 === 1 ? 'featured' : 'default'} />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden">
        <div ref={slider2Ref} className="flex gap-6 w-max" style={{ transform: 'translateX(-30%)' }}>
          {[...testimonials.slice(3), ...testimonials.slice(3)].map((t, i) => (
            <TestimonialCard key={i} t={t} variant={i % 3 === 0 ? 'featured' : 'default'} />
          ))}
        </div>
      </div>
    </section>
  );
}
