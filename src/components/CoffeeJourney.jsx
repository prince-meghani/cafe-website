import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const stages = [
  {
    num: '01',
    title: 'Farm',
    subtitle: 'Where It All Begins',
    desc: 'High in the volcanic highlands of Java and Sumatra, our partner farmers cultivate Arabica and Robusta cherries using generations-old techniques. Rich soil, perfect altitude, and careful hands create the foundation of every cup.',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
    color: '#2D5016'
  },
  {
    num: '02',
    title: 'Harvest',
    subtitle: 'Hand-Picked Perfection',
    desc: 'Only the ripest cherries are selected — each one hand-picked at peak maturity. This selective harvesting ensures consistency and depth of flavor that machine-harvested beans simply cannot match.',
    img: 'https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1000&auto=format&fit=crop',
    color: '#8B4513'
  },
  {
    num: '03',
    title: 'Roasting',
    subtitle: 'The Transformation',
    desc: 'Our master roasters coax out each bean\'s unique character through precise temperature control. Small batches of 12kg are roasted to order, ensuring peak freshness and complex flavor profiles.',
    img: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1000&auto=format&fit=crop',
    color: '#3E2723'
  },
  {
    num: '04',
    title: 'Brewing',
    subtitle: 'Precision in Every Pour',
    desc: 'From pour-over to espresso, our baristas are trained in the art and science of extraction. Water temperature, grind size, and timing are calibrated to unlock the full potential of every roast.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    color: '#1E2397'
  },
  {
    num: '05',
    title: 'Serving',
    subtitle: 'The Perfect Moment',
    desc: 'The final step is the most important — placing a beautiful cup in your hands. Garnished with latte art and served with a smile, this is where the journey becomes an experience.',
    img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop',
    color: '#1E2397'
  }
];

export default function CoffeeJourney() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const stageEls = gsap.utils.toArray('.journey-stage');

      // Progress bar
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      stageEls.forEach((stage, i) => {
        const img = stage.querySelector('.journey-img');
        const num = stage.querySelector('.journey-num');
        const title = stage.querySelector('.journey-title');
        const sub = stage.querySelector('.journey-sub');
        const desc = stage.querySelector('.journey-desc');
        const dot = stage.querySelector('.journey-dot');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse",
          }
        });

        tl.from(num, { scale: 3, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(title, { x: i % 2 === 0 ? -80 : 80, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(sub, { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
          .from(desc, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
          .from(img, { scale: 0.8, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

        if (dot) {
          tl.from(dot, { scale: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.6");
        }

        // Parallax on image
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cream py-32 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 md:px-12 mb-24 text-center">
        <span className="text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-4 block">The Journey</span>
        <h2 className="text-5xl md:text-7xl font-display font-black text-royal-blue mb-6">
          From Bean to Bliss
        </h2>
        <p className="text-xl text-royal-blue/60 max-w-2xl mx-auto">
          Follow every step of our meticulous process — from highland farms to your morning cup.
        </p>
      </div>

      {/* Progress line */}
      <div className="hidden lg:block fixed left-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <div className="w-1 h-48 bg-royal-blue/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="w-full h-full bg-royal-blue rounded-full origin-top" style={{ transform: 'scaleY(0)' }}></div>
        </div>
      </div>

      {/* Timeline stages */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-royal-blue/10 -translate-x-1/2"></div>

        {stages.map((stage, i) => (
          <div key={i} className={`journey-stage relative py-20 md:py-32 ${i !== stages.length - 1 ? 'mb-8' : ''}`}>
            <div className={`container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>

              {/* Text side */}
              <div className={`${i % 2 === 1 ? 'lg:order-2 lg:text-right lg:direction-ltr' : ''}`}>
                <span className="journey-num text-[8rem] md:text-[12rem] font-display font-black text-royal-blue/5 leading-none block -mb-16 md:-mb-24">
                  {stage.num}
                </span>
                <h3 className="journey-title text-4xl md:text-6xl font-display font-bold text-royal-blue mb-2">
                  {stage.title}
                </h3>
                <p className="journey-sub text-lg font-medium text-royal-blue/50 mb-6">{stage.subtitle}</p>
                <p className="journey-desc text-royal-blue/70 leading-relaxed max-w-lg text-lg">
                  {stage.desc}
                </p>
              </div>

              {/* Image side */}
              <div className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="journey-img relative w-full h-[45vh] md:h-[55vh] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <img
                    src={stage.img}
                    alt={stage.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="journey-dot hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-royal-blue rounded-full z-10 ring-8 ring-cream items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
