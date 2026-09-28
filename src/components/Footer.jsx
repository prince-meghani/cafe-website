import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-royal-blue text-white relative">
      {/* 2-row Checkered Pattern using SVG for perfect rendering */}
      <div
        className="absolute top-0 left-0 w-full h-[60px] -translate-y-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='30' height='30' fill='%231E2397'/%3E%3Crect x='30' width='30' height='30' fill='%23F5F1E8'/%3E%3Crect y='30' width='30' height='30' fill='%23F5F1E8'/%3E%3Crect x='30' y='30' width='30' height='30' fill='%231E2397'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom'
        }}
      ></div>
      {/* Main footer content */}
      <div className="container mx-auto px-5 sm:px-6 md:px-12 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Us Today!</h4>
            <button className="bg-white text-royal-blue px-6 py-3 rounded-full font-medium hover:bg-cream transition-colors flex items-center gap-2.5 text-sm min-h-[44px]">
              <Mail size={16} /> Let's connect via email
            </button>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-4 sm:mb-6">Explore</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-white/70 text-sm">
              <li><a href="#menu" className="hover:text-white transition-colors">Discover Our Menu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Read Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">View Job Openings</a></li>
            </ul>
          </div>

          {/* Our Commitment */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-4 sm:mb-6">Our Commitment</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-white/70 text-sm">
              <li>Sourcing the Finest Beans</li>
              <li>Freshly Baked Every Morning</li>
              <li>Local & Sustainable Ingredients</li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-4 sm:mb-6">Stay Updated</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Join Our Newsletter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Get Exclusive Offers</a></li>
            </ul>
          </div>
        </div>

        {/* Big tagline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight mb-8">
          Your Next Favorite Place Awaits
        </h2>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white/10 text-white/50 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Copyright All Right Reserved</p>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
