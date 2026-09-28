import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const galleryImages = [
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507133750070-44028c5a1561?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511920170033-f8396924c648?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop",
];

export default function CommunityGallery() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slider = sliderRef.current;
      
      // Infinite horizontal scroll effect
      gsap.to(slider, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="gallery" className="py-24 bg-royal-blue text-white overflow-hidden relative border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-display font-bold max-w-lg">
          Our Community's Favorite Moments Captured Here
        </h2>
        <button className="hidden md:block bg-white text-royal-blue px-6 py-2.5 rounded-full font-medium hover:bg-cream transition-colors">
          Share Your Moment
        </button>
      </div>

      <div className="w-full relative py-8">
        {/* Double the images to create infinite loop effect */}
        <div ref={sliderRef} className="flex gap-6 w-max px-6">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <div 
              key={i} 
              className="relative w-72 md:w-96 h-96 md:h-[30rem] rounded-3xl overflow-hidden group cursor-pointer shrink-0"
            >
              <div className="absolute inset-0 bg-royal-blue/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <img 
                src={img} 
                alt="Community moment" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Instagram style user badge */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${(i % 10) + 1}`} alt="User" />
                </div>
                <span className="text-white font-medium drop-shadow-md">@coffeelover_{i+1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:hidden mt-8">
         <button className="w-full bg-white text-royal-blue px-6 py-3 rounded-full font-medium hover:bg-cream transition-colors">
          Share Your Moment
        </button>
      </div>
    </section>
  );
}
