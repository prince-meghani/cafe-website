import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, ChevronLeft, Check, Users, CalendarDays, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

const steps = [
  { id: 1, label: 'Date & Time' },
  { id: 2, label: 'Your Details' },
  { id: 3, label: 'Confirm' },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00',
];

export default function ReservationSection() {
  const sectionRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    notes: '',
    location: 'West Jakarta',
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".res-left", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".res-right", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        x: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.date) errs.date = 'Please choose a reservation date.';
      if (!formData.time) errs.time = 'Please select a preferred time slot.';
    } else if (step === 2) {
      if (!formData.name.trim()) errs.name = 'Please provide your full name.';
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        errs.email = 'Please provide a valid email address.';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmReservation = () => {
    const randomCode = 'RR-' + Math.floor(10000 + Math.random() * 90000);
    setBookingCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      date: '',
      time: '',
      guests: 2,
      name: '',
      email: '',
      notes: '',
      location: 'West Jakarta',
    });
    setErrors({});
  };

  return (
    <section ref={sectionRef} id="reservation" className="pt-12 pb-12 bg-cream overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #1E2397 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}></div>

      <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl min-h-[550px] lg:min-h-[700px]">

          {/* Left — Image & Messaging */}
          <div className="res-left relative hidden lg:flex flex-col justify-between bg-royal-blue text-white p-12 overflow-hidden">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
              alt="Cozy cafe interior"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-royal-blue via-royal-blue/95 to-royal-blue/80"></div>

            <div className="relative z-10">
              <span className="text-sm font-bold text-white/40 tracking-[0.3em] uppercase mb-6 block">Reserve a Table</span>
              <h2 className="text-4xl xl:text-5xl font-display font-black leading-tight mb-6">
                Save Your Spot,<br />We'll Save<br />Your Coffee
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                Whether it's a quiet morning solo or a weekend gathering with friends — your perfect table is waiting.
              </p>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Opening Hours</p>
                  <p className="text-sm">Daily 08:00 — 22:00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Group Bookings</p>
                  <p className="text-sm">Up to 20 guests per reservation</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Free Cancellation</p>
                  <p className="text-sm">Cancel up to 2 hours before</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="res-right bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              /* Success State Screen */
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle2 size={44} />
                </div>
                <div>
                  <span className="text-xs font-bold text-royal-blue/50 uppercase tracking-widest block mb-2">Booking Confirmed</span>
                  <h3 className="text-3xl font-display font-black text-royal-blue mb-2">We're Ready For You!</h3>
                  <p className="text-royal-blue/70 text-sm max-w-sm mx-auto">
                    A confirmation has been sent to <span className="font-semibold text-royal-blue">{formData.email}</span>.
                  </p>
                </div>

                <div className="w-full bg-cream/60 rounded-2xl p-6 border border-royal-blue/10 space-y-3 text-left">
                  <div className="flex justify-between items-center pb-2 border-b border-royal-blue/10">
                    <span className="text-xs font-bold text-royal-blue/50 uppercase">Reservation Code</span>
                    <span className="font-mono font-bold text-base text-royal-blue bg-white px-3 py-1 rounded-lg shadow-xs">{bookingCode}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-royal-blue/60">Guest Name</span>
                    <span className="font-medium text-royal-blue">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-royal-blue/60">Date & Time</span>
                    <span className="font-medium text-royal-blue">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-royal-blue/60">Party Size</span>
                    <span className="font-medium text-royal-blue">{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-royal-blue/60">Outlet</span>
                    <span className="font-medium text-royal-blue">{formData.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-royal-blue text-white px-7 py-3 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-md"
                >
                  <RotateCcw size={16} /> Book Another Table
                </button>
              </div>
            ) : (
              <>
                {/* Mobile-only heading */}
                <div className="lg:hidden mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-royal-blue mb-1.5">Book Your Table</h2>
                  <p className="text-sm sm:text-base text-royal-blue/60">Your perfect spot is waiting.</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  {steps.map((step, i) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                          currentStep > step.id ? 'bg-royal-blue text-white' :
                          currentStep === step.id ? 'bg-royal-blue/10 border-2 border-royal-blue text-royal-blue' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {currentStep > step.id ? <Check size={14} /> : step.id}
                        </div>
                        <span className={`hidden sm:inline text-sm font-medium ${currentStep >= step.id ? 'text-royal-blue' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-px mx-2 sm:mx-3 ${currentStep > step.id ? 'bg-royal-blue' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Date & Time */}
                {currentStep === 1 && (
                  <div className="space-y-5 sm:space-y-6 flex-1">
                    <div>
                      <label htmlFor="res-date" className="block text-xs sm:text-sm text-royal-blue/70 mb-2 font-medium">Pick a Date</label>
                      <input
                        id="res-date"
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: null });
                        }}
                        className={`w-full bg-cream/50 border rounded-2xl py-3.5 sm:py-4 px-4 sm:px-5 text-royal-blue focus:outline-none focus:ring-2 transition-all text-base min-h-[44px] ${errors.date ? 'border-red-400 focus:ring-red-200' : 'border-royal-blue/10 focus:border-royal-blue/40 focus:ring-royal-blue/10'}`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-royal-blue/70 mb-2 font-medium">Choose a Time</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {timeSlots.map(slot => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => {
                              setFormData({ ...formData, time: slot });
                              if (errors.time) setErrors({ ...errors, time: null });
                            }}
                            className={`py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] ${
                              formData.time === slot
                                ? 'bg-royal-blue text-white shadow-md scale-[1.02]'
                                : 'bg-cream/50 border border-royal-blue/10 text-royal-blue hover:border-royal-blue/30'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.time}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-royal-blue/70 mb-2 font-medium">Location</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['West Jakarta', 'South Jakarta'].map(loc => (
                          <button
                            type="button"
                            key={loc}
                            onClick={() => setFormData({ ...formData, location: loc })}
                            className={`py-4 rounded-2xl text-sm font-medium transition-all duration-200 min-h-[44px] ${
                              formData.location === loc
                                ? 'bg-royal-blue text-white shadow-md'
                                : 'bg-cream/50 border border-royal-blue/10 text-royal-blue hover:border-royal-blue/30'
                            }`}
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Guest Details */}
                {currentStep === 2 && (
                  <div className="space-y-6 flex-1">
                    <div>
                      <label className="block text-sm text-royal-blue/70 mb-2 font-medium">Number of Guests</label>
                      <div className="flex items-center gap-6 bg-cream/50 rounded-2xl p-4 border border-royal-blue/10">
                        <button
                          type="button"
                          aria-label="Decrease guest count"
                          onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                          className="w-10 h-10 rounded-full bg-white border border-royal-blue/10 hover:bg-royal-blue/5 transition-colors flex items-center justify-center text-royal-blue font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="text-4xl font-display font-bold text-royal-blue w-12 text-center">{formData.guests}</span>
                        <button
                          type="button"
                          aria-label="Increase guest count"
                          onClick={() => setFormData({ ...formData, guests: Math.min(20, formData.guests + 1) })}
                          className="w-10 h-10 rounded-full bg-white border border-royal-blue/10 hover:bg-royal-blue/5 transition-colors flex items-center justify-center text-royal-blue font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="res-name" className="block text-sm text-royal-blue/70 mb-2 font-medium">Full Name</label>
                      <input
                        id="res-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: null });
                        }}
                        placeholder="e.g. Arief Sulistyo"
                        className={`w-full bg-cream/50 border rounded-2xl py-4 px-5 text-royal-blue placeholder-royal-blue/30 focus:outline-none focus:ring-2 transition-all min-h-[44px] ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-royal-blue/10 focus:border-royal-blue/40 focus:ring-royal-blue/10'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-email" className="block text-sm text-royal-blue/70 mb-2 font-medium">Email Address</label>
                      <input
                        id="res-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        placeholder="your@email.com"
                        className={`w-full bg-cream/50 border rounded-2xl py-4 px-5 text-royal-blue placeholder-royal-blue/30 focus:outline-none focus:ring-2 transition-all min-h-[44px] ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-royal-blue/10 focus:border-royal-blue/40 focus:ring-royal-blue/10'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="res-notes" className="block text-sm text-royal-blue/70 mb-2 font-medium">Any Special Requests? (Optional)</label>
                      <textarea
                        id="res-notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Birthday, dietary needs, seating preference..."
                        rows={3}
                        className="w-full bg-cream/50 border border-royal-blue/10 rounded-2xl py-4 px-5 text-royal-blue placeholder-royal-blue/30 focus:outline-none focus:border-royal-blue/40 focus:ring-2 focus:ring-royal-blue/10 transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-royal-blue/10 flex items-center justify-center">
                      <Check size={32} className="text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-royal-blue mb-1">You're Almost There!</h3>
                      <p className="text-royal-blue/60 text-sm">Please verify your reservation details below.</p>
                    </div>
                    <div className="w-full bg-cream/50 rounded-2xl p-6 space-y-3 text-left border border-royal-blue/10">
                      <div className="flex justify-between items-center py-2 border-b border-royal-blue/5">
                        <span className="text-royal-blue/60 text-sm flex items-center gap-2"><CalendarDays size={14}/> Date</span>
                        <span className="font-medium text-royal-blue text-sm">{formData.date || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-royal-blue/5">
                        <span className="text-royal-blue/60 text-sm flex items-center gap-2"><Clock size={14}/> Time</span>
                        <span className="font-medium text-royal-blue text-sm">{formData.time || '—'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-royal-blue/5">
                        <span className="text-royal-blue/60 text-sm flex items-center gap-2"><Users size={14}/> Guests</span>
                        <span className="font-medium text-royal-blue text-sm">{formData.guests} {formData.guests === 1 ? 'person' : 'people'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-royal-blue/5">
                        <span className="text-royal-blue/60 text-sm">Location</span>
                        <span className="font-medium text-royal-blue text-sm">{formData.location}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-royal-blue/60 text-sm">Contact</span>
                        <span className="font-medium text-royal-blue text-sm">{formData.name} ({formData.email})</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-royal-blue/5">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-1.5 text-royal-blue/70 hover:text-royal-blue transition-colors font-semibold text-sm min-h-[44px] px-3"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                  ) : <div className="w-8"></div>}
                  <button
                    type="button"
                    onClick={currentStep === 3 ? handleConfirmReservation : nextStep}
                    className="bg-royal-blue text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 shadow-lg text-sm min-h-[44px]"
                  >
                    {currentStep === 3 ? 'Confirm Reservation' : 'Continue'} <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
