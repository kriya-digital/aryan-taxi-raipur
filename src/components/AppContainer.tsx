import React, { useState, useEffect } from 'react';
import { BookingForm } from './BookingForm';
import { FaqAccordion } from './FaqAccordion';
import { PopularRoutes, POPULAR_ROUTES } from './PopularRoutes';
import { FleetScroller } from './FleetScroller';
import { ContactForm } from './ContactForm';
import { ImageCarousel } from './ImageCarousel';

type Tab = 'home' | 'fleet' | 'contact';

const FLEET_SHOWCASES = [
  {
    category: 'standard',
    name: 'Standard Sedan',
    model: 'Maruti Suzuki Dzire (or equivalent)',
    images: ['/dzire_sedan1.png', '/dzire_sedan2.png', '/sedan_red.png'],
    rate: '₹12/km',
    minFare: '₹1,200',
    seats: '4 Passengers Max',
    luggage: '2 Luggage Bags',
    features: ['Climate Control A/C', 'Clean Cabin & Seats', 'Professional Driver', 'USB Charger', 'Premium Audio System'],
    desc: 'Perfect for business trips, solo travelers, and small family airport transfers.'
  },
  {
    category: 'executive',
    name: 'Executive SUV',
    model: 'Maruti Suzuki Ertiga (or equivalent)',
    images: ['/innova_crysta.png', '/kiya_karen.png', '/suv_cab.png'],
    rate: '₹18/km',
    minFare: '₹1,800',
    seats: '6 Passengers Max',
    luggage: '4 Luggage Bags',
    features: ['Roof-mounted A/C Vents', 'Spacious Legroom', 'Extra Luggage Capacity', 'First Aid Kit', 'Smooth Highway Ride'],
    desc: 'Spacious passenger comfort and smooth highway performance for family trips.'
  },
  {
    category: 'luxury',
    name: 'Luxury Force Urbania',
    model: 'Force Urbania (or equivalent)',
    images: ['/urbania_cab.png'],
    rate: '₹30/km',
    minFare: '₹5,000',
    seats: '13-17 Passengers Max',
    luggage: '10 Luggage Bags',
    features: ['Executive Captain Seats', 'Personal Climate Knobs', 'USB Port Per Seat', 'Reclining Backrest', 'Massive Boot Storage'],
    desc: 'Elite group transport coach, premium suspension, and lounge-like seating experience.'
  }
];

export const AppContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('standard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme on client mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  // Sync class name when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleBookVehicle = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFleetRoute = (route: typeof POPULAR_ROUTES[0], category: string) => {
    const price = route.pricing[category as 'standard' | 'executive' | 'luxury'];
    let vehicleName = "Standard Sedan";
    if (category === 'executive') vehicleName = "Executive SUV";
    if (category === 'luxury') vehicleName = "Luxury Force Urbania";

    const messageText =
      ` *Aryan Taxi Services - Inter-City Route Booking* 
----------------------------------------
*Route:* ${route.from} ⇄ ${route.to}
*Vehicle Class:* ${vehicleName}
*Distance:* ${route.distance}
*Est. Duration:* ${route.duration}
*Upfront Price:* ₹${price}
----------------------------------------
Please confirm my booking availability for this route. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/918815614056?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 md:pb-0">

      {/* ==========================================
           DESKTOP HEADER
           ========================================== */}
      <header className="sticky top-0 z-50 bg-bg-darker/80 backdrop-blur-md border-b border-card-border">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex justify-between items-center">

          <a href="#" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight" onClick={() => switchTab('home')}>
            <svg className="w-8 h-8 fill-taxi-gold animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 6h11l1.4 4H5.1l1.4-4zM5 16c-.83 0-1.5-.67-1.5-1.5S4.17 13 5 13s1.5.67 1.5 1.5S5.83 16 5 16zm14 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
            <span>ARYAN <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">TAXI</span></span>
          </a>

          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => switchTab('home')}
              className={`font-semibold text-sm transition-all duration-300 relative py-1 cursor-pointer ${activeTab === 'home' ? 'text-taxi-gold after:w-full' : 'text-text-secondary hover:text-taxi-gold after:w-0'
                } after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-taxi-gold after:transition-all after:duration-300`}
            >
              Home
            </button>
            <button
              onClick={() => switchTab('fleet')}
              className={`font-semibold text-sm transition-all duration-300 relative py-1 cursor-pointer ${activeTab === 'fleet' ? 'text-taxi-gold after:w-full' : 'text-text-secondary hover:text-taxi-gold after:w-0'
                } after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-taxi-gold after:transition-all after:duration-300`}
            >
              Our Fleet
            </button>
            <button
              onClick={() => switchTab('contact')}
              className={`font-semibold text-sm transition-all duration-300 relative py-1 cursor-pointer ${activeTab === 'contact' ? 'text-taxi-gold after:w-full' : 'text-text-secondary hover:text-taxi-gold after:w-0'
                } after:absolute after:bottom-0 after:left-0 after:height-[2px] after:bg-taxi-gold after:transition-all after:duration-300`}
            >
              Contact & FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg bg-white/3 border border-card-border flex items-center justify-center text-text-primary hover:border-taxi-gold hover:text-taxi-gold hover:bg-taxi-gold/5 transition-all duration-300 outline-none cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                // Moon Icon (shows in Light mode to go Dark)
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c.132 0 .263 0 .393.007a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3zm0 2a7 7 0 1 0 6.012 10.59 9.501 9.501 0 0 1-5.713-5.713A7.009 7.009 0 0 0 12 5z" />
                </svg>
              ) : (
                // Sun Icon (shows in Dark mode to go Light)
                <svg className="w-5 h-5 fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414 2.122 2.122-1.414 1.414-2.122-2.122zM16.95 18.364l1.414-1.414 2.122 2.122-1.414 1.414-2.122-2.122zM1 11h3v2H1v-2zm19 0h3v2h-3v-2zM4.929 20.485l-1.414-1.414 2.122-2.122 1.414 1.414-2.122 2.122zM18.364 5.636l-1.414-1.414 2.122-2.122 1.414 1.414-2.122 2.122z" />
                </svg>
              )}
            </button>

            <a href="tel:+918815614056" className="hidden md:flex bg-gradient-to-r from-taxi-gold to-[#E69D00] text-black font-bold text-sm py-2.5 px-5 rounded-lg items-center gap-2 shadow-[0_4px_14px_rgba(255,179,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,179,0,0.35)] transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </header>

      {/* ==========================================
           MAIN CONTENT AREA
           ========================================== */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="animate-fade-in-up duration-300">
            <div className="text-center py-10 md:py-16 max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-display">
                जय जोहार, छत्तीसगढ़!<br />अब सफर होही <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">आसान।</span>
              </h1>
              <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto font-medium">
                Reliable, comfortable inter-city rides across Chhattisgarh. Based in Raipur, connecting you seamlessly to Bilaspur, Bhilai, Durg, Jagdalpur, Korba, and beyond.
              </p>
            </div>

            <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-6 md:p-10 mb-12 shadow-2xl transition-all duration-300">
              <BookingForm
                selectedVehicle={selectedVehicle}
                onVehicleChange={setSelectedVehicle}
              />
            </div>

            <PopularRoutes limit={3} onSeeMore={() => switchTab('fleet')} />

            <FleetScroller
              onSelectVehicle={handleBookVehicle}
              onSeeAll={() => switchTab('fleet')}
            />
          </div>
        )}

        {/* TAB 2: FLEET */}
        {activeTab === 'fleet' && (
          <div className="animate-fade-in-up duration-300">
            <div className="text-center py-10 max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">Our Premium <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">Fleet</span></h2>
              <p className="text-text-secondary text-sm md:text-base font-medium">Choose from our curated classes of immaculately maintained vehicles for your next journey.</p>
            </div>

            <div className="space-y-12 mb-16">
              {FLEET_SHOWCASES.map(showcase => (
                <div key={showcase.category} className="glass-panel rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-card-border hover:border-taxi-gold/30 transition-all duration-300">
                  
                  {/* Vehicle Showcase (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Image showcase frame */}
                      <div className="w-full h-52 md:h-64 bg-gradient-to-br from-white/3 to-white/1 rounded-2xl overflow-hidden border border-white/5 relative group">
                        <ImageCarousel 
                          images={showcase.images} 
                          alt={showcase.name} 
                        />
                        <div className="absolute top-3 right-3 bg-taxi-gold/10 text-taxi-gold border border-taxi-gold/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                          From {showcase.rate}
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-extrabold font-display text-text-primary">{showcase.name}</h3>
                          <span className="text-xs text-text-muted font-bold font-sans">({showcase.model.split(' ')[0]})</span>
                        </div>
                        <p className="text-xs text-text-muted font-medium">{showcase.model}</p>
                        <p className="text-sm text-text-secondary leading-relaxed pt-2 font-medium">
                          {showcase.desc}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                          <span className="text-taxi-gold font-bold text-sm">👥</span>
                          <div>
                            <p className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Capacity</p>
                            <p className="text-text-primary font-extrabold">{showcase.seats}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-text-secondary">
                          <span className="text-taxi-gold font-bold text-sm">🧳</span>
                          <div>
                            <p className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Luggage</p>
                            <p className="text-text-primary font-extrabold">{showcase.luggage}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookVehicle(showcase.category)}
                        className="w-full bg-taxi-gold text-black font-extrabold text-xs py-3 px-5 rounded-xl hover:bg-taxi-gold-hover hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer outline-none shadow-[0_4px_12px_rgba(255,179,0,0.15)] flex justify-center items-center gap-2"
                      >
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                        </svg>
                        Select & Book Vehicle
                      </button>
                    </div>

                  </div>

                  {/* Route rates Showcase (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold font-display text-text-primary">Flat-Rate Inter-City Corridors</h4>
                        <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase bg-bg-darker/50 border border-card-border px-2 py-0.5 rounded">All-Inclusive Fares</span>
                      </div>
                      
                      <div className="border border-card-border bg-bg-darker/40 rounded-2xl overflow-hidden">
                        <div className="hidden sm:grid bg-bg-darker/80 border-b border-card-border py-3 px-4 text-[10px] font-bold text-text-secondary uppercase tracking-wider grid-cols-12 gap-2">
                          <span className="col-span-4">Route Destination</span>
                          <span className="col-span-3 text-center">Distance & Time</span>
                          <span className="col-span-5 text-right">Price & Book</span>
                        </div>
                        <div className="divide-y divide-card-border max-h-[360px] overflow-y-auto no-scrollbar">
                          {POPULAR_ROUTES.map(route => {
                            const price = route.pricing[showcase.category as 'standard' | 'executive' | 'luxury'];
                            return (
                              <div key={`${showcase.category}-${route.id}`} className="transition-colors duration-300">
                                {/* Mobile View (below sm) */}
                                <div className="sm:hidden flex flex-col p-4 space-y-3 hover:bg-bg-darker/60">
                                  <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                      <span className="font-bold text-text-primary text-base leading-tight">{route.to}</span>
                                      <span className="text-[11px] text-text-muted font-medium mt-0.5">from {route.from}</span>
                                    </div>
                                    <span className="font-extrabold text-taxi-gold font-display text-base">₹{price.toLocaleString('en-IN')}</span>
                                  </div>
                                  
                                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                    <span className="text-xs text-text-secondary font-medium">
                                      {route.distance} • {route.duration}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleBookFleetRoute(route, showcase.category)}
                                        className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 shadow-[0_3px_8px_rgba(37,211,102,0.15)] transition-all duration-300 cursor-pointer outline-none"
                                        title="Book on WhatsApp"
                                      >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512">
                                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                        </svg>
                                        WhatsApp
                                      </button>
                                      <a
                                        href="tel:+918815614056"
                                        className="bg-white/5 border border-taxi-gold/30 hover:border-taxi-gold text-taxi-gold hover:text-black hover:bg-taxi-gold py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1 shadow-[0_3px_8px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer outline-none"
                                        title="Call Now"
                                      >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                        Call
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Desktop View (sm and up) */}
                                <div className="hidden sm:grid grid-cols-12 gap-2 py-3.5 px-4 text-sm items-center hover:bg-bg-darker/60">
                                  <div className="col-span-4 flex flex-col">
                                    <span className="font-bold text-text-primary text-sm md:text-base leading-tight">{route.to}</span>
                                    <span className="text-[10px] text-text-muted font-medium mt-0.5">from {route.from}</span>
                                  </div>
                                  <div className="col-span-3 flex flex-col items-center text-center text-xs text-text-secondary">
                                    <span className="font-bold">{route.distance}</span>
                                    <span className="text-[10px] text-text-muted mt-0.5 font-medium">{route.duration}</span>
                                  </div>
                                  <div className="col-span-5 flex items-center justify-end gap-2.5">
                                    <span className="font-extrabold text-taxi-gold font-display text-base md:text-lg mr-1.5">₹{price.toLocaleString('en-IN')}</span>
                                    <div className="flex items-center gap-1.5">
                                      <button
                                        onClick={() => handleBookFleetRoute(route, showcase.category)}
                                        className="bg-[#25D366] hover:bg-[#20ba59] p-2 rounded-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer outline-none shadow-[0_3px_10px_rgba(37,211,102,0.15)]"
                                        title="Book on WhatsApp"
                                      >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                        </svg>
                                      </button>
                                      <a
                                        href="tel:+918815614056"
                                        className="bg-white/5 border border-taxi-gold/30 hover:border-taxi-gold text-taxi-gold hover:text-black hover:bg-taxi-gold p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer outline-none shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
                                        title="Call Now"
                                      >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT & FAQ */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in-up duration-300">
            <div className="text-center py-10 max-w-2xl mx-auto space-y-2 mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">Contact & <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">Support</span></h2>
              <p className="text-text-secondary text-sm md:text-base font-medium">Have questions or want to make custom travel bookings? Reach out to our 24/7 team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

              {/* Contact Info Column */}
              <div className="space-y-6">
                <ContactForm />

                <div className="glass-panel rounded-2xl p-6 space-y-6">

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-taxi-gold/10 rounded-full flex justify-center items-center flex-shrink-0">
                      <svg className="w-5.5 h-5.5 fill-taxi-gold" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold font-display text-text-primary">Phone Number</h4>
                      <p className="text-sm text-text-secondary hover:text-taxi-gold transition-colors duration-300"><a href="tel:+918815614056">+91 88156 14056</a></p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-taxi-gold/10 rounded-full flex justify-center items-center flex-shrink-0">
                      <svg className="w-5.5 h-5.5 fill-taxi-gold" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold font-display text-text-primary">Email Address</h4>
                      <p className="text-sm text-text-secondary hover:text-taxi-gold transition-colors duration-300"><a href="mailto:info@aryantaxiservices.com">info@aryantaxiservices.com</a></p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-taxi-gold/10 rounded-full flex justify-center items-center flex-shrink-0">
                      <svg className="w-5.5 h-5.5 fill-taxi-gold" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold font-display text-text-primary">Head Office</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">Aryan Taxi Plaza, VIP Road, Telibandha, Raipur, Chhattisgarh, India</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-taxi-gold/10 rounded-full flex justify-center items-center flex-shrink-0">
                      <svg className="w-5.5 h-5.5 fill-taxi-gold" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-semibold font-display text-text-primary">Operating Hours</h4>
                      <p className="text-sm text-text-secondary">24 Hours a day, 7 Days a week</p>
                    </div>
                  </div>

                </div>

                {/* Social links */}
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 border border-white/8 rounded-full flex justify-center items-center text-text-secondary hover:text-taxi-gold hover:border-taxi-gold hover:bg-taxi-gold/5 transition-all duration-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 border border-white/8 rounded-full flex justify-center items-center text-text-secondary hover:text-taxi-gold hover:border-taxi-gold hover:bg-taxi-gold/5 transition-all duration-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.3 1.83 9 9 0 0 1-1-.06C3.07 20 5.68 21 8.47 21 17.44 21 22.33 13.57 22.33 7.14v-.63c.95-.69 1.78-1.56 2.43-2.54z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 border border-white/8 rounded-full flex justify-center items-center text-text-secondary hover:text-taxi-gold hover:border-taxi-gold hover:bg-taxi-gold/5 transition-all duration-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* FAQ Accordion Column */}
              <div>
                <FaqAccordion />
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ==========================================
           MOBILE APP BOTTOM NAVIGATION BAR
           ========================================== */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[450px] h-16 z-50 glass-panel rounded-2xl flex justify-around items-center px-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">

        <button
          onClick={() => switchTab('home')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold flex-1 h-full cursor-pointer transition-all duration-300 outline-none ${activeTab === 'home' ? 'text-taxi-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          <svg className={`w-5.5 h-5.5 fill-current transition-all duration-300 ${activeTab === 'home' ? 'translate-y-[-2px] filter drop-shadow-[0_2px_8px_rgba(255,179,0,0.3)]' : ''}`} viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </button>

        <button
          onClick={() => switchTab('fleet')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold flex-1 h-full cursor-pointer transition-all duration-300 outline-none ${activeTab === 'fleet' ? 'text-taxi-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          <svg className={`w-5.5 h-5.5 fill-current transition-all duration-300 ${activeTab === 'fleet' ? 'translate-y-[-2px] filter drop-shadow-[0_2px_8px_rgba(255,179,0,0.3)]' : ''}`} viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
          </svg>
          <span>Fleet</span>
        </button>

        <button
          onClick={() => switchTab('contact')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold flex-1 h-full cursor-pointer transition-all duration-300 outline-none ${activeTab === 'contact' ? 'text-taxi-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
        >
          <svg className={`w-5.5 h-5.5 fill-current transition-all duration-300 ${activeTab === 'contact' ? 'translate-y-[-2px] filter drop-shadow-[0_2px_8px_rgba(255,179,0,0.3)]' : ''}`} viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>Contact</span>
        </button>

      </nav>

      {/* ==========================================
           FOOTER (Desktop only)
           ========================================== */}
      <footer className="hidden md:block border-t border-white/8 py-8 mt-12 bg-black/20 text-center text-xs text-text-muted">
        <div className="max-w-7xl mx-auto px-6 space-y-1">
          <p>&copy; {new Date().getFullYear()} Aryan Taxi Services. All rights reserved.</p>
          <p className="font-medium">Premium Cab & Taxi Bookings. Built for ultimate convenience.</p>
        </div>
      </footer>

    </div>
  );
};
