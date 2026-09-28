import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const croissantRef = useRef(null);
  const cupRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".hero-title-line",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8 }
      );

      gsap.fromTo(".hero-btn",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)", delay: 1 }
      );

      gsap.to(croissantRef.current, {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(cupRef.current, {
        y: 12,
        rotation: -2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5
      });

      gsap.to(croissantRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden flex items-center">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center relative z-10">

        {/* Text Content */}
        <div className="max-w-2xl relative z-20 text-center lg:text-left">
          <h1 ref={headlineRef} className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black leading-[1.05] text-royal-blue mb-5 sm:mb-6 tracking-tight">
            <div className="overflow-hidden pb-1"><span className="hero-title-line inline-block">Your Perfect Break</span></div>
            <div className="overflow-hidden pb-1"><span className="hero-title-line inline-block"> Starts Right Here</span></div>
          </h1>
          <p className="hero-subtitle text-sm sm:text-base md:text-lg text-royal-blue/80 mb-7 sm:mb-8 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
            Freshly brewed coffee, handcrafted pastries, and a space designed for conversations, creativity, and unforgettable mornings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center lg:justify-start">
            <a href="#menu" className="hero-btn inline-flex items-center justify-center bg-royal-blue text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-royal-blue/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-royal-blue/30 touch-manipulation text-sm sm:text-base min-h-[44px]">
              Explore Menu
            </a>
            <a href="#outlet" className="hero-btn inline-flex items-center justify-center bg-white text-royal-blue px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-cream transition-all hover:scale-105 active:scale-95 shadow-md touch-manipulation text-sm sm:text-base min-h-[44px]">
              Reserve a Table
            </a>
          </div>
          
          {/* Social Proof */}
          <div className="hero-btn mt-8 sm:mt-10 flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80&auto=format&fit=crop" alt="Customer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-cream object-cover" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80&auto=format&fit=crop" alt="Customer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-cream object-cover" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format&fit=crop" alt="Customer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-cream object-cover" loading="lazy" />
            </div>
            <div className="text-left">
              <div className="flex text-yellow-500 text-xs sm:text-sm">
                ★★★★★
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-royal-blue/80 mt-0.5">4.9/5 from 2,000+ Coffee Lovers</p>
            </div>
          </div>
        </div>

        {/* Image Composition */}
        <div className="relative h-[45vh] sm:h-[55vh] lg:h-[70vh] min-h-[350px] sm:min-h-[440px] lg:min-h-[500px] w-full flex items-center justify-center mt-6 lg:mt-0">
          {/* Main checkered background container */}
          <div className="absolute inset-0 bg-checkered rounded-[2.5rem] sm:rounded-[3rem] transform rotate-[3deg] sm:rotate-[4deg] scale-[1.05] sm:scale-100 shadow-2xl opacity-100"></div>

          <div className="relative w-full h-full flex items-center justify-center z-10 py-6 md:py-0">
            {/* Centralized Wrapper */}
            <div className="relative w-[95%] md:w-[85%] max-w-[650px] aspect-[4/3] flex items-center justify-center">

              {/* Croissant */}
              <div className="absolute left-[-2%] sm:left-[-6%] md:left-[-10%] top-[18%] sm:top-[20%] w-[75%] md:w-[80%] z-20">
                <img
                  ref={croissantRef}
                  src="/images-removebg-preview.png"
                  alt="Fresh Croissant"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(30,35,151,0.45)] transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-[2%] left-[8%] sm:left-[15%] bg-white text-royal-blue px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-2xl font-bold text-[11px] sm:text-[13px] md:text-[15px] whitespace-nowrap transform -rotate-3">
                  Morning Energy Booster
                </div>
              </div>

              {/* Coffee Cup */}
              <div className="absolute right-[-2%] sm:right-[0%] top-[0%] md:top-[5%] w-[45%] md:w-[50%] z-10">
                <img
                  ref={cupRef}
                  src="/hot-cappuccino.webp"
                  alt="Latte Art"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_40px_rgba(30,35,151,0.35)] mix-blend-multiply"
                />
                <div className="absolute bottom-[-5%] right-[2%] sm:right-[10%] bg-white text-royal-blue px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-2xl font-bold text-[11px] sm:text-[13px] md:text-[15px] whitespace-nowrap transform rotate-2">
                  The Must-Have Breakfast
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
