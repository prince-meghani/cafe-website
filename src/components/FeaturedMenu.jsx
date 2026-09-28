import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const categories = ['Coffee', 'Bakes', 'Savory'];

const productsByCategory = {
  Coffee: [
    { id: 1, name: 'Iced Velvet Latte', desc: 'Cooling espresso & oat milk', price: 'Rp. 28,000', badge: 'Customer Favorite', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Classic Flat White', desc: 'Silky microfoam & double shot', price: 'Rp. 24,000', badge: null, img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Whipped Cloud Mocha', desc: 'Belgian cocoa & sweet foam', price: 'Rp. 32,000', badge: 'Signature', img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop' },
  ],
  Bakes: [
    { id: 4, name: 'Almond Flake Croissant', desc: 'Golden layers & roasted almonds', price: 'Rp. 26,000', badge: 'Fresh Daily', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'Valrhona Pain au Chocolat', desc: 'Double dark chocolate bar', price: 'Rp. 28,000', badge: null, img: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=800&auto=format&fit=crop' },
    { id: 6, name: 'Cardamom Cinnamon Knot', desc: 'Swedish spiced brioche', price: 'Rp. 24,000', badge: 'Artisan', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },
  ],
  Savory: [
    { id: 7, name: 'Truffle Egg Brioche', desc: 'Poached egg & herb butter', price: 'Rp. 42,000', badge: 'Chef Special', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop' },
    { id: 8, name: 'Avocado Sourdough Toast', desc: 'Feta, radish & chili flakes', price: 'Rp. 38,000', badge: null, img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop' },
    { id: 9, name: 'Prosciutto Burrata Melt', desc: 'Aged balsamic & arugula', price: 'Rp. 48,000', badge: 'Gourmet', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop' },
  ]
};

export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const sectionRef = useRef(null);

  const displayProducts = productsByCategory[activeCategory] || productsByCategory.Coffee;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".menu-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="py-16 md:py-20 bg-cream relative">
      <div className="container mx-auto px-5 sm:px-6 md:px-12">

        <div className="menu-header mb-10 md:mb-12">
          {/* Top row: Categories */}
          <div className="flex gap-2.5 sm:gap-4 mb-6 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-[15px] font-bold transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[44px] ${activeCategory === cat ? 'bg-royal-blue text-white shadow-lg' : 'bg-white text-royal-blue hover:bg-royal-blue/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Second row: Headline & Arrows */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 sm:gap-8">
            <h2 className="text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-display font-black text-royal-blue leading-[1.05] tracking-tight max-w-[900px]">
              Beyond The Bean Discover<br className="hidden lg:block" />
              Your New Morning Ritual
            </h2>

            <div className="flex gap-3 sm:gap-4 pb-2 sm:pb-4">
              <button 
                onClick={() => {
                  const idx = categories.indexOf(activeCategory);
                  setActiveCategory(categories[(idx - 1 + categories.length) % categories.length]);
                }}
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-royal-blue hover:bg-royal-blue hover:text-white transition-all shadow-sm text-lg sm:text-xl font-bold cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label="Previous Category"
              >
                &larr;
              </button>
              <button 
                onClick={() => {
                  const idx = categories.indexOf(activeCategory);
                  setActiveCategory(categories[(idx + 1) % categories.length]);
                }}
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-royal-blue flex items-center justify-center text-white hover:bg-[#2a30b5] transition-all shadow-lg shadow-royal-blue/30 text-lg sm:text-xl font-bold cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label="Next Category"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                key={product.id}
                className="group cursor-pointer flex flex-col bg-white rounded-[2.5rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-royal-blue/5"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 relative bg-cream/30">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-royal-blue text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full z-20 shadow-md">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Text Details */}
                <div className="flex justify-between items-start px-3 pb-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-royal-blue tracking-tight leading-snug group-hover:text-[#2a30b5] transition-colors">{product.name}</h3>
                    <p className="text-sm font-medium text-royal-blue/60">{product.desc}</p>
                  </div>
                  <span className="font-bold text-royal-blue text-base whitespace-nowrap ml-3">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
