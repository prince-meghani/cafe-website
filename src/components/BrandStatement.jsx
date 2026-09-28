import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".brand-line", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out"
      });

      gsap.from(imgRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-royal-blue text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.05] mb-6 italic">
              <span className="brand-line block">More Than Just A Cup</span>
              <span className="brand-line block">We Create Spaces Where</span>
              <span className="brand-line block">Moments Are Made One</span>
              <span className="brand-line block">Perfect Brew at a Time</span>
            </h2>
            <p className="brand-line text-white/50 text-sm md:text-base">
              Daily Fresh Bakes Make Your Coffee Pause Memorable
            </p>
          </div>

          {/* Iced coffee image */}
          <div ref={imgRef} className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop"
              alt="Iced coffee with milk swirl"
              className="w-64 xl:w-80 h-80 xl:h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
