import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer to track active section
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-30% 0px -50% 0px', 
        threshold: 0.1 
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navItems = ['Home', 'Menu', 'Outlet', 'Gallery'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#f7f4ea]/90 backdrop-blur-lg py-4 shadow-sm border-b border-royal-blue/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#home" className="text-2xl font-display font-black tracking-tighter text-royal-blue hover:opacity-80 transition-opacity">
          ruangrasa.
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1 bg-white/70 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => {
                  // Optional: Smooth scroll manually if desired, but native CSS smooth scroll usually handles this
                  setActiveSection(item.toLowerCase());
                }}
                className={`relative px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-royal-blue hover:text-royal-blue/70 hover:bg-white/50'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-royal-blue rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-royal-blue text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-[#2a30b5] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(30,35,151,0.2)]">
            Contact Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-royal-blue z-[60] relative bg-white/50 p-2 rounded-full backdrop-blur-md" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 w-full h-screen bg-[#f7f4ea] flex flex-col items-center justify-center space-y-8 z-50"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => {
                      setIsOpen(false);
                      setActiveSection(item.toLowerCase());
                    }}
                    className={`text-4xl font-display font-black transition-colors ${isActive ? 'text-royal-blue' : 'text-royal-blue/50 hover:text-royal-blue'}`}
                  >
                    {item}
                  </a>
                );
              })}
              
              <button className="mt-8 bg-royal-blue text-white px-10 py-4 rounded-full font-bold text-lg w-3/4 max-w-xs shadow-xl">
                Contact Us
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}
