import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const storyPanels = [
  {
    title: "It Started With Curiosity",
    text: "In 2018, our founder wandered through the misty highlands of Java, searching for the perfect bean. What they found was more than coffee — it was a community, a tradition, a way of life passed down through generations of farmers.",
    img: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=1000&auto=format&fit=crop",
    alt: "Misty highlands coffee plantation"
  },
  {
    title: "From Farm to Cup",
    text: "Every bean tells a story. We source directly from family farms across Indonesia, ensuring fair wages and sustainable practices. The journey from cherry to cup is one of patience, precision, and deep respect for the craft.",
    img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=1000&auto=format&fit=crop",
    alt: "Farmer holding freshly harvested coffee cherries"
  },
  {
    title: "The Art of Roasting",
    text: "Our master roasters spend 12 hours daily perfecting each batch. Small-batch roasting ensures every cup carries the distinct terroir of its origin — notes of dark chocolate, citrus, and caramel dancing on your palate.",
    img: "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=1000&auto=format&fit=crop",
    alt: "Small-batch coffee roasting in cooling tray"
  },
  {
    title: "A Space for Everyone",
    text: "Ruangrasa isn't just a cafe — it's a sanctuary. A place where strangers become friends over lattes, where artists find their muse, where every morning begins with warmth, purpose, and the perfect brew.",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    alt: "Sunlit cozy cafe interior and community space"
  }
];

export default function BrandStory() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const panels = gsap.utils.toArray('.story-panel');

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + wrapperRef.current.offsetWidth * 2,
        }
      });

      panels.forEach((panel, i) => {
        const title = panel.querySelector('.story-title');
        const text = panel.querySelector('.story-text');
        const decorator = panel.querySelector('.story-decorator');

        gsap.from(title, {
          y: 60,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1
        });

        gsap.from(text, {
          y: 30,
          opacity: 0,
          scrollTrigger: {
            trigger: panel,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2 + i * 0.1
        });

        if (decorator) {
          gsap.to(decorator, {
            rotation: 360,
            scrollTrigger: { trigger: panel, scrub: true },
            ease: "none"
          });
        }
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray('.mobile-story-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cream overflow-hidden">
      {/* Section intro */}
      <div className="container mx-auto px-5 sm:px-6 md:px-12 pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-royal-blue leading-[1.05] max-w-xl">
            Our Story Begins With One Perfect Cup
          </h2>
          <div className="max-w-md lg:pt-4">
            <div className="w-12 sm:w-16 h-1 bg-royal-blue mb-3 sm:mb-4"></div>
            <p className="text-sm sm:text-base md:text-lg text-royal-blue/70 leading-relaxed font-medium">
              Every great cafe has an origin story. Ours begins in the highlands of Indonesia,
              where passion meets precision, and every cup carries a legacy.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Scroll View */}
      <div ref={wrapperRef} className="hidden lg:block relative h-screen overflow-hidden">
        <div className="flex h-full w-max">
          {storyPanels.map((panel, i) => (
            <div key={i} className="story-panel relative w-screen h-full flex items-center shrink-0">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img src={panel.img} alt={panel.alt} className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-cream/60"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-4 block">
                    Chapter {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="story-title text-4xl md:text-5xl font-display font-bold text-royal-blue mb-6 leading-tight">
                    {panel.title}
                  </h3>
                  <p className="story-text text-lg text-royal-blue/70 leading-relaxed max-w-lg">
                    {panel.text}
                  </p>
                </div>
                <div className="relative">
                  <div className="relative w-full h-[50vh] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
                    <img src={panel.img} alt={panel.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="story-decorator absolute -top-8 -right-8 w-32 h-32 border-4 border-royal-blue/20 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-royal-blue/10 rounded-2xl rotate-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Vertical Stream View */}
      <div className="lg:hidden container mx-auto px-5 sm:px-6 pb-14 space-y-12">
        {storyPanels.map((panel, i) => (
          <div key={i} className="mobile-story-card bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-royal-blue/5 overflow-hidden">
            <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6">
              <img src={panel.img} alt={panel.alt} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 bg-royal-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Chapter {String(i + 1).padStart(2, '0')}
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-royal-blue mb-3">
              {panel.title}
            </h3>
            <p className="text-sm sm:text-base text-royal-blue/70 leading-relaxed">
              {panel.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
