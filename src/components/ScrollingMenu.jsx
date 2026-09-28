import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const menuItems = [
  { name: 'Classic Espresso', desc: 'Bold, pure, uncompromising', price: 'Rp. 18,000', cat: 'Espresso', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop' },
  { name: 'Double Shot Ristretto', desc: 'Concentrated intensity', price: 'Rp. 22,000', cat: 'Espresso', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' },
  { name: 'Vanilla Oat Latte', desc: 'Silky smooth comfort', price: 'Rp. 28,000', cat: 'Latte', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop' },
  { name: 'Caramel Macchiato', desc: 'Sweet meets bold', price: 'Rp. 30,000', cat: 'Latte', img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop' },
  { name: 'Rose Petal Latte', desc: 'Floral elegance', price: 'Rp. 32,000', cat: 'Signature', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop' },
  { name: 'Lavender Cold Brew', desc: 'Calm & refreshing', price: 'Rp. 35,000', cat: 'Signature', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Almond Croissant', desc: 'Flaky golden perfection', price: 'Rp. 20,000', cat: 'Bakery', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Sourdough Loaf', desc: 'Artisan fermented bread', price: 'Rp. 45,000', cat: 'Bakery', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop' },
  { name: 'Dark Chocolate Tart', desc: 'Decadent & rich', price: 'Rp. 38,000', cat: 'Desserts', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Tiramisu', desc: 'Italian classic, our way', price: 'Rp. 42,000', cat: 'Desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop' },
];

export default function ScrollingMenu() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + totalWidth,
        }
      });

      // Animate individual cards as they enter viewport
      gsap.utils.toArray('.menu-scroll-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.utils.toArray('.menu-scroll-card')[0]?._gsap?.parent,
            start: "left 80%",
            end: "left 50%",
            scrub: true,
          },
          duration: 0.5,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-cream overflow-hidden">
      {/* Header (fixed while scrolling) */}
      <div className="absolute top-0 left-0 w-full z-20 pt-12 pb-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-sm font-bold text-royal-blue/40 tracking-[0.3em] uppercase mb-3 block">Full Menu</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-royal-blue">
              Scroll & Explore
            </h2>
          </div>
          <div className="flex gap-3">
            {['Espresso', 'Latte', 'Signature', 'Bakery', 'Desserts'].map(cat => (
              <span key={cat} className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-royal-blue border border-royal-blue/10">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex gap-8 items-center h-full pl-6 md:pl-12 pt-32 pb-12 w-max">
        {menuItems.map((item, i) => (
          <div key={i} className="menu-scroll-card shrink-0 w-80 bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer">
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-royal-blue/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {item.cat}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-royal-blue mb-1">{item.name}</h3>
              <p className="text-sm text-royal-blue/50 mb-4">{item.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-display font-bold text-royal-blue">{item.price}</span>
                <button className="w-10 h-10 rounded-full bg-royal-blue text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform text-lg">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="shrink-0 w-24"></div>
      </div>
    </section>
  );
}
