import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import FeaturedMenu from './components/FeaturedMenu';
import SignatureDrinks from './components/SignatureDrinks';
import BaristaTeam from './components/BaristaTeam';
import Testimonials from './components/Testimonials';
import EventsCommunity from './components/EventsCommunity';
import LocationSection from './components/LocationSection';
import InstagramWall from './components/InstagramWall';
import ReservationSection from './components/ReservationSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Scroll Progress Bar ── */
function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrollTop / docHeight) * 100;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div ref={barRef} className="h-full bg-gradient-to-r from-royal-blue to-royal-blue/60" style={{ width: '0%' }}></div>
    </div>
  );
}

/* ── Custom Cursor Follower ── */
function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(dotRef.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-royal-blue rounded-full pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 border-2 border-royal-blue/30 rounded-full pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
    </>
  );
}

/* ── Marquee Strip ── */
function MarqueeStrip() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
  }, []);

  return (
    <div className="overflow-hidden py-6 bg-royal-blue text-white/80 border-y border-white/10">
      <div ref={ref} className="flex whitespace-nowrap w-max">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-lg md:text-2xl font-display font-bold tracking-wider mx-4">
            More Than Just A Cup · We Create Spaces Where Moments Are Made · One Perfect Brew at a Time ·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Home Page ── */
function Home() {
  return (
    <main className="w-full bg-cream text-royal-blue min-h-screen">
      <Hero />
      <MarqueeStrip />
      <BrandStory />
      <FeaturedMenu />
      <SignatureDrinks />
      <BaristaTeam />
      <Testimonials />
      <EventsCommunity />
      <LocationSection />
      <InstagramWall />
      <ReservationSection />
      <FinalCTA />
    </main>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="relative">
        <ScrollProgress />
        <CursorFollower />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
