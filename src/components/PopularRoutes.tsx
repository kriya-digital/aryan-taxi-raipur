import React, { useState } from 'react';

interface RouteData {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  pricing: {
    standard: number;
    executive: number;
    luxury: number;
  };
}

export const POPULAR_ROUTES: RouteData[] = [
  {
    id: "raipur-bilaspur",
    from: "Raipur",
    to: "Bilaspur",
    distance: "120 km",
    duration: "2h 30m",
    pricing: {
      standard: 2500,
      executive: 3500,
      luxury: 5000
    }
  },
  {
    id: "raipur-jagdalpur",
    from: "Raipur",
    to: "Jagdalpur",
    distance: "300 km",
    duration: "6h 15m",
    pricing: {
      standard: 5000,
      executive: 6000,
      luxury: 8500
    }
  },
  {
    id: "raipur-durg",
    from: "Raipur",
    to: "Durg / Bhilai",
    distance: "40 km",
    duration: "1h 00m",
    pricing: {
      standard: 1400,
      executive: 2000,
      luxury: 3000
    }
  },
  {
    id: "raipur-korba",
    from: "Raipur",
    to: "Korba",
    distance: "200 km",
    duration: "4h 30m",
    pricing: {
      standard: 4000,
      executive: 5500,
      luxury: 7500
    }
  },
  {
    id: "raipur-raigarh",
    from: "Raipur",
    to: "Raigarh",
    distance: "250 km",
    duration: "5h 00m",
    pricing: {
      standard: 4000,
      executive: 5500,
      luxury: 7500
    }
  },
  {
    id: "raipur-bargarh",
    from: "Raipur",
    to: "Bargarh",
    distance: "220 km",
    duration: "4h 00m",
    pricing: {
      standard: 4000,
      executive: 5000,
      luxury: 7000
    }
  },
  {
    id: "raipur-sambalpur",
    from: "Raipur",
    to: "Sambalpur",
    distance: "280 km",
    duration: "5h 00m",
    pricing: {
      standard: 5000,
      executive: 5500,
      luxury: 8000
    }
  },
  {
    id: "raipur-ambikapur",
    from: "Raipur",
    to: "Ambikapur",
    distance: "340 km",
    duration: "7h 00m",
    pricing: {
      standard: 6000,
      executive: 7500,
      luxury: 10500
    }
  },
  {
    id: "raipur-nagpur",
    from: "Raipur",
    to: "Nagpur",
    distance: "290 km",
    duration: "5h 30m",
    pricing: {
      standard: 5500,
      executive: 6000,
      luxury: 9000
    }
  },
  {
    id: "raipur-rajnandgaon",
    from: "Raipur",
    to: "Rajnandgaon",
    distance: "75 km",
    duration: "1h 30m",
    pricing: {
      standard: 2500,
      executive: 3500,
      luxury: 5000
    }
  }
];

const WHATSAPP_NUMBER = "918815614056";

interface PopularRoutesProps {
  limit?: number;
  onSeeMore?: () => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ limit, onSeeMore }) => {
  // Store selected vehicle type per route ID
  const [selectedVehicles, setSelectedVehicles] = useState<Record<string, 'standard' | 'executive' | 'luxury'>>(
    POPULAR_ROUTES.reduce((acc, route) => ({ ...acc, [route.id]: 'standard' }), {})
  );

  const handleVehicleChange = (routeId: string, vehicle: 'standard' | 'executive' | 'luxury') => {
    setSelectedVehicles(prev => ({
      ...prev,
      [routeId]: vehicle
    }));
  };

  const handleBookRoute = (route: RouteData) => {
    const vehicleType = selectedVehicles[route.id] || 'standard';
    const price = route.pricing[vehicleType];

    let vehicleName = "Standard Sedan";
    if (vehicleType === 'executive') vehicleName = "Executive SUV";
    if (vehicleType === 'luxury') vehicleName = "Luxury Force Urbania";

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
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  const displayRoutes = limit ? POPULAR_ROUTES.slice(0, limit) : POPULAR_ROUTES;

  return (
    <div className="py-12 border-t border-white/8 mt-12">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Popular Inter-City <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">Routes & Pricing</span>
        </h2>
        <p className="text-text-secondary text-sm md:text-base font-medium">
          Get upfront, transparent flat rates on our most requested travel corridors in Chhattisgarh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {displayRoutes.map(route => {
          const currentVehicle = selectedVehicles[route.id] || 'standard';
          const price = route.pricing[currentVehicle];

          return (
            <div key={route.id} className="glass-panel rounded-2xl p-6 flex flex-col justify-between transition-all duration-300">

              {/* Route Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold font-display text-text-primary flex items-center gap-2">
                      <span>{route.from}</span>
                      <span className="text-taxi-gold text-sm font-normal">⇄</span>
                      <span>{route.to}</span>
                    </h3>
                    <p className="text-xs text-text-secondary font-semibold mt-1">Inter-city corridor</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-lg py-1.5 px-3">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-text-muted font-bold tracking-wider">DISTANCE</span>
                      <span className="text-xs font-bold text-text-primary">{route.distance}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-text-muted font-bold tracking-wider">TIME</span>
                      <span className="text-xs font-bold text-text-primary">{route.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Segmented Control Selector */}
                <div className="bg-black/30 p-1 border border-white/5 rounded-lg grid grid-cols-3 gap-1 mb-6">
                  <button
                    onClick={() => handleVehicleChange(route.id, 'standard')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all duration-300 outline-none cursor-pointer ${currentVehicle === 'standard'
                        ? 'bg-taxi-gold text-black shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Sedan
                  </button>
                  <button
                    onClick={() => handleVehicleChange(route.id, 'executive')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all duration-300 outline-none cursor-pointer ${currentVehicle === 'executive'
                        ? 'bg-taxi-gold text-black shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    SUV
                  </button>
                  <button
                    onClick={() => handleVehicleChange(route.id, 'luxury')}
                    className={`py-1.5 px-2 rounded-md text-xs font-bold transition-all duration-300 outline-none cursor-pointer ${currentVehicle === 'luxury'
                        ? 'bg-taxi-gold text-black shadow-md'
                        : 'text-text-secondary hover:text-text-primary'
                      }`}
                  >
                    Urbania
                  </button>
                </div>
              </div>

              {/* Price & Action Button Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Upfront Pricing</span>
                  <span className="text-2xl font-extrabold text-taxi-gold font-display">₹{price.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleBookRoute(route)}
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center gap-1.5 shadow-[0_4px_12px_rgba(37,211,102,0.15)] hover:translate-y-[-1px] transition-all duration-300 cursor-pointer outline-none shrink-0"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                    WhatsApp
                  </button>
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="bg-white/5 border border-taxi-gold/30 hover:border-taxi-gold text-taxi-gold hover:text-black hover:bg-taxi-gold font-bold text-xs py-2.5 px-3 rounded-lg flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:translate-y-[-1px] transition-all duration-300 cursor-pointer outline-none shrink-0"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {limit && onSeeMore && POPULAR_ROUTES.length > limit && (
        <div className="flex justify-center mt-10">
          <button
            onClick={onSeeMore}
            className="bg-transparent hover:bg-taxi-gold/5 text-taxi-gold border border-taxi-gold/30 hover:border-taxi-gold font-bold text-sm py-3 px-8 rounded-xl transition-all duration-300 cursor-pointer outline-none flex items-center gap-2 group"
          >
            See All Routes & Pricing
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

