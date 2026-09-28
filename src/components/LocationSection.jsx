import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, Clock, Navigation } from 'lucide-react';

export default function LocationSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".location-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="outlet" className="py-16 md:py-20 bg-royal-blue text-white overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="location-text text-3xl sm:text-4xl md:text-6xl font-display font-black leading-tight mb-4 sm:mb-6">
              Find Your Nearest Coffee Sanctuary
            </h2>
            <p className="location-text text-white/80 text-sm sm:text-base md:text-lg max-w-md">
              We are expanding to bring the perfect brew closer to you. Consistent quality and comfort await at every outlet.
            </p>
          </div>
          <div className="location-text grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[180px]">
              <div className="flex items-center gap-3 mb-1.5">
                <MapPin size={18} className="text-cream" />
                <h3 className="font-bold text-sm sm:text-base">West Jakarta</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70">Kabon Jeruk Square</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[180px] hover:bg-white/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-1.5">
                <MapPin size={18} className="text-cream" />
                <h3 className="font-bold text-sm sm:text-base">South Jakarta</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70">Senopati Blvd</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden h-[340px] sm:h-[420px] md:h-[500px] w-full border border-white/20 shadow-2xl location-text bg-cream/10">
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
          
          {/* Embedded map using OpenStreetMap */}
          <iframe
            title="Cafe Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=106.7500%2C-6.2100%2C106.8000%2C-6.1800&layer=mapnik"
            className="w-full h-full border-0 opacity-70 grayscale"
            loading="lazy"
          ></iframe>
          
          {/* Interactive Pins */}
          <div className="absolute top-1/3 left-1/4 z-20 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-royal-blue shadow-xl cursor-pointer transform group-hover:scale-110 transition-transform">
              <MapPin size={24} fill="currentColor" />
            </div>
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-64 bg-white text-royal-blue p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <h4 className="font-bold mb-1">Kabon Jeruk Square</h4>
              <p className="text-xs text-royal-blue/70 mb-3 flex items-center gap-1"><Clock size={12}/> 08:00 - 22:00</p>
              <button className="w-full bg-royal-blue text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-royal-blue/90">
                <Navigation size={16} /> Get Directions
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 right-1/3 z-20 group">
             <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-royal-blue shadow-lg cursor-pointer transform group-hover:scale-110 transition-transform">
              <MapPin size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
