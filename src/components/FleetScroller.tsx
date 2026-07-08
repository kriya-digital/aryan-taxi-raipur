import React from 'react';
import { ImageCarousel } from './ImageCarousel';

interface FleetItem {
  id: string;
  name: string;
  model: string;
  images: string[];
  seats: string;
  bags: string;
  rate: string;
  desc: string;
  category: 'standard' | 'executive' | 'luxury';
}

const FLEETS: FleetItem[] = [
  {
    id: "dzire",
    name: "Sedan",
    model: "Maruti Suzuki Dzire (or equivalent)",
    images: ["/dzire_sedan1.png", "/dzire_sedan2.png", "/sedan_red.png"],
    seats: "4 Passengers",
    bags: "2 Luggage Bags",
    rate: "₹12/km",
    desc: "Compact, fuel-efficient inter-city travel. Best for solo travelers or small families.",
    category: "standard"
  },
  {
    id: "ertiga",
    name: "SUV",
    model: "Maruti Suzuki Ertiga (or equivalent)",
    images: ["/innova_crysta.png", "/kiya_karen.png", "/suv_cab.png"],
    seats: "6 Passengers",
    bags: "4 Luggage Bags",
    rate: "₹18/km",
    desc: "Spacious multi-purpose vehicle. Comfortable family touring across the state.",
    category: "executive"
  },
  {
    id: "urbania",
    name: "Urbania",
    model: "Force Urbania (or equivalent)",
    images: ["/urbania_cab.png"],
    seats: "13-17 Passengers",
    bags: "10 Luggage Bags",
    rate: "₹30/km",
    desc: "Luxury group touring and executive coach. Ultimate group comfort, spacious head clearance, and premium suspension.",
    category: "luxury"
  }
];

interface FleetScrollerProps {
  onSelectVehicle: (category: string) => void;
  onSeeAll: () => void;
}

export const FleetScroller: React.FC<FleetScrollerProps> = ({ onSelectVehicle, onSeeAll }) => {
  return (
    <div className="py-12 border-t border-white/8">
      {/* Header with Title and See More link */}
      <div className="flex justify-between items-end mb-8 max-w-5xl mx-auto">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight font-display text-text-primary">
            Our Available <span className="bg-gradient-to-r from-taxi-gold to-taxi-gold-light bg-clip-text text-transparent">Fleets</span>
          </h2>
          <p className="text-text-secondary text-xs md:text-sm font-medium">Select a category below to book or explore specifications.</p>
        </div>
        <button 
          onClick={onSeeAll}
          className="text-taxi-gold font-bold text-xs md:text-sm flex items-center gap-1 hover:underline cursor-pointer outline-none"
        >
          See All Specs →
        </button>
      </div>

      {/* Side Scroller Container */}
      <div className="w-full overflow-x-auto no-scrollbar py-4 px-2 -mx-2 flex gap-6 snap-x snap-mandatory max-w-5xl mx-auto">
        {FLEETS.map(cab => (
          <div 
            key={cab.id} 
            className="flex-shrink-0 w-[280px] md:w-[320px] glass-panel rounded-2xl p-5 flex flex-col justify-between snap-start border border-card-border hover:border-taxi-gold/40 transition-all duration-300"
          >
            <div>
              {/* Image Frame */}
              <div className="w-full h-36 bg-gradient-to-br from-white/3 to-white/1 rounded-xl mb-4 flex items-center justify-center border border-white/5 relative overflow-hidden select-none">
                <ImageCarousel 
                  images={cab.images} 
                  alt={cab.name} 
                />
                <span className="absolute top-2 right-2 bg-taxi-gold/10 text-taxi-gold border border-taxi-gold/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10">
                  {cab.rate}
                </span>
              </div>

              {/* Specs Info */}
              <div className="space-y-1 mb-4">
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-lg font-bold font-display text-text-primary">{cab.name}</h3>
                  <span className="text-[10px] text-text-muted font-bold">({cab.model.split(' ')[0]})</span>
                </div>
                <p className="text-xs text-text-secondary font-medium leading-relaxed min-h-10">{cab.desc}</p>
              </div>

              {/* Features list */}
              <div className="space-y-2 border-t border-white/5 pt-3 mb-5">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="text-taxi-gold font-semibold">👥 Capacity:</span>
                  <span className="text-text-primary font-bold">{cab.seats}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="text-taxi-gold font-semibold">🧳 Luggage:</span>
                  <span className="text-text-primary font-bold">{cab.bags}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => onSelectVehicle(cab.category)}
              className="w-full bg-white/3 border border-card-border text-text-primary hover:bg-taxi-gold hover:text-black hover:border-taxi-gold font-bold text-xs py-2.5 px-4 rounded-lg transition-all duration-300 cursor-pointer outline-none"
            >
              Select & Book
            </button>
          </div>
        ))}

        {/* Ending Card "See More" */}
        <div 
          onClick={onSeeAll}
          className="flex-shrink-0 w-[200px] glass-panel rounded-2xl p-5 flex flex-col items-center justify-center text-center snap-start border border-card-border border-dashed hover:border-taxi-gold/60 cursor-pointer group transition-all duration-300 select-none"
        >
          <div className="w-12 h-12 rounded-full bg-taxi-gold/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6 fill-taxi-gold" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </div>
          <h4 className="font-display font-bold text-text-primary text-sm mb-1 group-hover:text-taxi-gold transition-colors duration-300">See More Fleets</h4>
          <p className="text-[10px] text-text-muted max-w-[130px] font-medium leading-normal">Compare specifications, rates, and view other options</p>
        </div>
      </div>
    </div>
  );
};

