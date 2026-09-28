import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FinalCTA() {
  const containerRef = useRef(null);
  const cupRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cta-text", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.to(cupRef.current, {
        y: -12,
        rotation: 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-cream overflow-hidden">
      {/* Main content */}
      <div className="container mx-auto px-5 sm:px-6 md:px-12 pt-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-center lg:text-left">
          {/* Left — Text */}
          <div>
            <h2 className="cta-text text-3xl sm:text-5xl md:text-6xl font-display font-black text-royal-blue leading-[1.05] mb-4 sm:mb-6">
              Stop Scrolling<br />Your Next Treat Awaits
            </h2>
            <p className="cta-text text-gray-900 font-medium text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
              Don't Just Dream About It Taste The Difference Today
            </p>
            <a href="#outlet" className="cta-text inline-flex items-center justify-center bg-royal-blue text-white px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-royal-blue/90 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto min-h-[44px] shadow-lg shadow-royal-blue/20">
              Visit Our Cafe
            </a>
          </div>

          {/* Right — Coffee Cup */}
          <div className="flex justify-center lg:justify-end">
            <img
              ref={cupRef}
              src="/hot-cappuccino-with-latte-art-in-a-cup-isolated-on-white-background-perfect-for-cafe-menu-and-coffee-lovers-png-removebg-preview.png"
              alt="Coffee cup with latte art"
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
