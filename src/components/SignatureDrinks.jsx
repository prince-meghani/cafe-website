import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Star, Heart } from 'lucide-react';

const drinks = [
  {
    name: 'Velvet Sunset Latte',
    tagline: 'Our signature creation',
    desc: 'A mesmerizing blend of single-origin espresso, oat milk, and our house-made vanilla-cardamom syrup, finished with a sunset gradient of turmeric foam.',
    price: 'Rp. 32,000',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 342,
    calories: '180 kcal',
    flavor: ['Sweet', 'Floral', 'Creamy'],
    ingredients: ['Single-origin espresso', 'Oat milk', 'Vanilla-cardamom syrup', 'Turmeric foam'],
    isFavorite: true,
  },
  {
    name: 'Midnight Mocha Velour',
    tagline: 'Dark & indulgent',
    desc: 'Belgian dark chocolate meets our darkest roast in this velvety, intensely satisfying mocha. Topped with cocoa dust and a hint of sea salt.',
    price: 'Rp. 35,000',
    img: 'https://images.unsplash.com/photo-1572442388796-11668ba67e53?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    reviews: 278,
    calories: '220 kcal',
    flavor: ['Bold', 'Chocolatey', 'Salt'],
    ingredients: ['Dark roast espresso', 'Belgian chocolate', 'Whole milk', 'Sea salt flakes'],
    isFavorite: false,
  },
  {
    name: 'Cloud Nine Matcha',
    tagline: 'Zen in a cup',
    desc: 'Ceremonial-grade Uji matcha whisked to perfection, layered with honeyed almond milk and a cloud of cold foam. Peaceful, earthy, ethereal.',
    price: 'Rp. 38,000',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    reviews: 198,
    calories: '150 kcal',
    flavor: ['Earthy', 'Sweet', 'Umami'],
    ingredients: ['Uji matcha', 'Almond milk', 'Honey', 'Cold foam'],
    isFavorite: true,
  },
];

export default function SignatureDrinks() {
  const sectionRef = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".sig-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.utils.toArray('.sig-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out"
        });

        const floaters = card.querySelectorAll('.sig-floater');
        floaters.forEach((f, j) => {
          gsap.to(f, {
            y: -10 + Math.random() * 20,
            x: -5 + Math.random() * 10,
            rotation: -3 + Math.random() * 6,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: j * 0.3,
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-royal-blue text-white overflow-hidden relative">
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl"></div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12">
        <div className="sig-header text-center mb-10 md:mb-14">
          <span className="text-xs sm:text-sm font-bold text-white/40 tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Handcrafted Excellence</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black mb-4 sm:mb-6">
            Signature Creations
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Three drinks that define who we are. Each one crafted with obsessive attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {drinks.map((drink, i) => (
            <div
              key={i}
              className="sig-card group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer"
              onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            >
              {drink.isFavorite && (
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20">
                  <Heart size={14} fill="currentColor" className="text-red-400" />
                  <span className="text-xs font-bold">Favorite</span>
                </div>
              )}

              <div className="relative w-full h-60 sm:h-72 rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden mb-6 sm:mb-8">
                <img
                  src={drink.img}
                  alt={drink.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-royal-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {drink.ingredients.slice(0, 3).map((ing, j) => (
                  <div
                    key={j}
                    className="sig-floater absolute bg-white/90 text-royal-blue text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      top: `${20 + j * 25}%`,
                      left: j % 2 === 0 ? '10%' : '55%',
                      transitionDelay: `${j * 100}ms`
                    }}
                  >
                    {ing}
                  </div>
                ))}
              </div>

              <span className="text-xs text-white/40 uppercase tracking-wider">{drink.tagline}</span>
              <h3 className="text-2xl font-display font-bold mt-1 mb-3">{drink.name}</h3>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill={s < Math.floor(drink.rating) ? "#FFD700" : "transparent"} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-white/60">{drink.rating} ({drink.reviews})</span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6">{drink.desc}</p>

              <div className={`overflow-hidden transition-all duration-500 ${expandedCard === i ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">Flavor Profile</span>
                    <div className="flex gap-2 mt-2">
                      {drink.flavor.map((f, fi) => (
                        <span key={fi} className="bg-white/10 px-3 py-1 rounded-full text-xs">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Calories</span>
                    <span>{drink.calories}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-bold">{drink.price}</span>
                <a href="#outlet" className="inline-flex items-center justify-center bg-white text-royal-blue px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform shadow-md min-h-[44px]">
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
