import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const photos = [
  'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=800&auto=format&fit=crop', // Minimalist ceramic latte
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop', // Sunlit aesthetic cafe interior
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop', // Golden croissant on ceramic plate
  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop', // Aesthetic iced latte
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop', // Warm morning coffee & light shadows
  'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop', // Minimalist pour-over coffee craft
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop', // Aesthetic cafe journal & espresso
  'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop'  // Warm cappuccino on wood table
];

export default function InstagramWall() {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    let flipCtx;

    const createTween = () => {
      const galleryElement = galleryRef.current;
      if (!galleryElement) return;
      const galleryItems = galleryElement.querySelectorAll('.gallery__item');

      if (flipCtx) flipCtx.revert();
      galleryElement.classList.remove('gallery--final');

      flipCtx = gsap.context(() => {
        // Temporarily add the final class to capture the final state
        galleryElement.classList.add('gallery--final');
        const flipState = Flip.getState(galleryItems);
        galleryElement.classList.remove('gallery--final');

        const flip = Flip.to(flipState, {
          simple: true,
          ease: 'expoScale(1, 5)',
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryElement,
            start: 'center center',
            end: '+=100%',
            scrub: true,
            pin: galleryElement.parentNode,
          },
        });
        tl.add(flip);
        return () => gsap.set(galleryItems, { clearProps: 'all' });
      });
    };

    createTween();

    window.addEventListener('resize', createTween);
    return () => {
      window.removeEventListener('resize', createTween);
      if (flipCtx) flipCtx.revert();
    };
  }, []);

  return (
    <section id="gallery" className="bg-cream pt-14 md:pt-16">
      {/* Section Header */}
      <div className="container mx-auto px-6 md:px-12 mb-6 md:mb-8 text-center">
        <span className="text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-3 block">#RuangrasaCafe</span>
        <h2 className="text-4xl md:text-6xl font-display font-black text-royal-blue mb-4">
          The Instagram Wall
        </h2>
        <p className="text-lg md:text-xl text-royal-blue/60 max-w-xl mx-auto">
          Your moments at Ruangrasa, shared with the world.
        </p>
      </div>

      {/* GSAP Bento Flip Gallery */}
      <div ref={containerRef} className="gallery-wrap bg-cream">
        <div ref={galleryRef} className="gallery gallery--bento gallery--switch" id="gallery-8">
          {photos.map((src, index) => (
            <div key={index} className="gallery__item overflow-hidden">
              <img
                src={src}
                alt={`Instagram moment ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=800&auto=format&fit=crop';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
