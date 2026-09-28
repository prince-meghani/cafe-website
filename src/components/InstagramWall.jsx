import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const photos = [
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop'
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
            <div key={index} className="gallery__item">
              <img src={src} alt={`Instagram moment ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
