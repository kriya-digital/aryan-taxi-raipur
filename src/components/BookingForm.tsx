import React, { useState, useEffect } from 'react';

// Vehicle Rates configuration (INR per km)
interface VehicleRate {
  name: string;
  rate: number;
  minFare: number;
  icon: string;
}

const VEHICLE_RATES: Record<string, VehicleRate> = {
  standard: {
    name: "Standard Sedan",
    rate: 12.00,
    minFare: 1200.00,
    icon: "standard"
  },
  executive: {
    name: "Executive SUV",
    rate: 18.00,
    minFare: 1800.00,
    icon: "executive"
  },
  luxury: {
    name: "Luxury Urbania",
    rate: 30.00,
    minFare: 5000.00,
    icon: "luxury"
  }
};

// Local Packages (8 Hours / 80 Km flat rates)
const LOCAL_FLAT_RATES = {
  standard: 1600,
  executive: 2400,
  luxury: 5000
};

const WHATSAPP_NUMBER = "917000811242";

// 10 Cities of Chhattisgarh
const CITIES = [
  "Raipur",
  "Jagdalpur",
  "Durg Bhilai",
  "Kanker",
  "Kondagaon",
  "Ambikapur",
  "Bilaspur",
  "Korba",
  "Rajnandgaon",
  "Raigarh"
];

// Distance Matrix in Kilometers
const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  "Raipur": {
    "Raipur": 0, "Jagdalpur": 300, "Durg Bhilai": 40, "Kanker": 140, "Kondagaon": 225,
    "Ambikapur": 340, "Bilaspur": 115, "Korba": 195, "Rajnandgaon": 75, "Raigarh": 250
  },
  "Jagdalpur": {
    "Raipur": 300, "Jagdalpur": 0, "Durg Bhilai": 310, "Kanker": 160, "Kondagaon": 75,
    "Ambikapur": 630, "Bilaspur": 415, "Korba": 490, "Rajnandgaon": 320, "Raigarh": 540
  },
  "Durg Bhilai": {
    "Raipur": 40, "Jagdalpur": 310, "Durg Bhilai": 0, "Kanker": 150, "Kondagaon": 235,
    "Ambikapur": 370, "Bilaspur": 145, "Korba": 225, "Rajnandgaon": 35, "Raigarh": 280
  },
  "Kanker": {
    "Raipur": 140, "Jagdalpur": 160, "Durg Bhilai": 150, "Kanker": 0, "Kondagaon": 85,
    "Ambikapur": 470, "Bilaspur": 255, "Korba": 330, "Rajnandgaon": 160, "Raigarh": 380
  },
  "Kondagaon": {
    "Raipur": 225, "Jagdalpur": 75, "Durg Bhilai": 235, "Kanker": 85, "Kondagaon": 0,
    "Ambikapur": 550, "Bilaspur": 340, "Korba": 415, "Rajnandgaon": 245, "Raigarh": 465
  },
  "Ambikapur": {
    "Raipur": 340, "Jagdalpur": 630, "Durg Bhilai": 370, "Kanker": 470, "Kondagaon": 550,
    "Ambikapur": 0, "Bilaspur": 225, "Korba": 220, "Rajnandgaon": 400, "Raigarh": 280
  },
  "Bilaspur": {
    "Raipur": 115, "Jagdalpur": 415, "Durg Bhilai": 145, "Kanker": 255, "Kondagaon": 340,
    "Ambikapur": 225, "Bilaspur": 0, "Korba": 90, "Rajnandgaon": 180, "Raigarh": 145
  },
  "Korba": {
    "Raipur": 195, "Jagdalpur": 490, "Durg Bhilai": 225, "Kanker": 330, "Kondagaon": 415,
    "Ambikapur": 220, "Bilaspur": 90, "Korba": 0, "Rajnandgaon": 260, "Raigarh": 140
  },
  "Rajnandgaon": {
    "Raipur": 75, "Jagdalpur": 320, "Durg Bhilai": 35, "Kanker": 160, "Kondagaon": 245,
    "Ambikapur": 400, "Bilaspur": 180, "Korba": 260, "Rajnandgaon": 0, "Raigarh": 315
  },
  "Raigarh": {
    "Raipur": 250, "Jagdalpur": 540, "Durg Bhilai": 280, "Kanker": 380, "Kondagaon": 465,
    "Ambikapur": 280, "Bilaspur": 145, "Korba": 140, "Rajnandgaon": 315, "Raigarh": 0
  }
};

type TripType = 'oneway' | 'roundtrip' | 'airport' | 'local';

interface BookingFormProps {
  selectedVehicle: string;
  onVehicleChange: (vehicle: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ selectedVehicle, onVehicleChange }) => {
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [pickup, setPickup] = useState('Raipur');
  const [dropoff, setDropoff] = useState('Bilaspur');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('1');

  // Set default pickup date/time on mount
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);

    const futureDate = new Date(now.getTime() + 30 * 60000);
    const hours = String(futureDate.getHours()).padStart(2, '0');
    const minutes = String(futureDate.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tripType !== 'local' && pickup === dropoff) {
      alert("Pickup and Dropoff cities cannot be the same.");
      return;
    }

    if (!date || !time) {
      alert("Please select pickup date and time.");
      return;
    }

    // Format date to DD/MM/YYYY
    const dateParts = date.split('-');
    const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : date;
    const vehicleName = VEHICLE_RATES[selectedVehicle]?.name || "Taxi";

    let tripTypeLabel = "One-Way Outstation";
    if (tripType === 'roundtrip') tripTypeLabel = "Round-Trip Outstation";
    if (tripType === 'airport') tripTypeLabel = "Airport Transfer";
    if (tripType === 'local') tripTypeLabel = "Local Hourly Package (8Hr/80Km)";

    const destinationText = tripType === 'local' ? "Local Raipur Hire" : dropoff;

    const messageText =
      ` *Aryan Taxi Services - Booking Request* 
----------------------------------------
 *Service:* ${tripTypeLabel}
 *Pickup:* ${pickup}
 *Dropoff:* ${destinationText}
 *Date:* ${formattedDate}
 *Time:* ${time}
 *Passengers:* ${passengers}
 *Vehicle Type:* ${vehicleName}
----------------------------------------
Please confirm booking availability. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ==========================================
           TRIP TYPE CAPSULES SELECTOR
           ========================================== */}
      <div className="flex flex-wrap gap-2 pb-2 justify-center">
        {(['oneway', 'roundtrip', 'airport', 'local'] as const).map(type => {
          let label = "One-way";
          if (type === 'roundtrip') label = "Round Trip";
          if (type === 'airport') label = "Airport";
          if (type === 'local') label = "Local (8Hr/80Km)";

          const isActive = tripType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => {
                setTripType(type);
                // Adjust default selections for airport type
                if (type === 'airport') {
                  setPickup('Raipur');
                  setDropoff('Bilaspur');
                }
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 outline-none cursor-pointer border ${isActive
                  ? 'bg-taxi-gold text-black border-taxi-gold shadow-[0_2px_8px_rgba(255,179,0,0.3)]'
                  : 'bg-white/3 text-text-secondary border-card-border hover:border-taxi-gold/30 hover:text-text-primary'
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Pickup Location Dropdown */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="pickup-loc">
          Pickup City
        </label>
        <div className="relative flex items-center">
          <svg className="absolute left-3 w-5 h-5 fill-text-secondary pointer-events-none" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <select
            id="pickup-loc"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-white/3 border border-card-border rounded-lg py-3 pl-11 pr-10 text-text-primary text-base transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none appearance-none cursor-pointer font-medium"
          >
            {CITIES.map(city => (
              <option key={`pickup-${city}`} value={city}>{city}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 text-[10px] text-text-secondary">▼</div>
        </div>
      </div>

      {/* Dropoff Location Dropdown (Hidden/Locked if Local package selected) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="dropoff-loc">
          Dropoff City
        </label>
        <div className="relative flex items-center">
          <svg className="absolute left-3 w-5 h-5 fill-text-secondary pointer-events-none" viewBox="0 0 24 24">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
          </svg>
          {tripType === 'local' ? (
            <input
              type="text"
              id="dropoff-loc"
              value="Raipur Sightseeing / City Limits"
              disabled
              className="w-full bg-white/1 border border-card-border/50 rounded-lg py-3 pl-11 pr-4 text-text-muted text-base cursor-not-allowed outline-none font-medium"
            />
          ) : (
            <select
              id="dropoff-loc"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full bg-white/3 border border-card-border rounded-lg py-3 pl-11 pr-10 text-text-primary text-base transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none appearance-none cursor-pointer font-medium"
            >
              {CITIES.map(city => (
                <option key={`dropoff-${city}`} value={city}>{city}</option>
              ))}
            </select>
          )}
          {tripType !== 'local' && (
            <div className="pointer-events-none absolute right-4 text-[10px] text-text-secondary">▼</div>
          )}
        </div>
        {tripType === 'airport' && pickup !== 'Raipur' && dropoff !== 'Raipur' && (
          <span className="text-[10px] text-taxi-gold font-medium mt-1">
            * Note: Raipur hosts the nearest airport. Airport packages usually connect Raipur Swami Vivekananda Airport (RPR) to other cities.
          </span>
        )}
      </div>

      {/* Date & Time Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="pickup-date">
            Pickup Date
          </label>
          <div className="relative flex items-center">
            <svg className="absolute left-3 w-5 h-5 fill-text-secondary pointer-events-none" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
            <input
              type="date"
              id="pickup-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full color-scheme-dark bg-white/3 border border-card-border rounded-lg py-3 pl-11 pr-4 text-text-primary text-base transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="pickup-time">
            Pickup Time
          </label>
          <div className="relative flex items-center">
            <svg className="absolute left-3 w-5 h-5 fill-text-secondary pointer-events-none" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <input
              type="time"
              id="pickup-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full color-scheme-dark bg-white/3 border border-card-border rounded-lg py-3 pl-11 pr-4 text-text-primary text-base transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="passengers">
          Number of Passengers
        </label>
        <div className="relative flex items-center">
          <svg className="absolute left-3 w-5 h-5 fill-text-secondary pointer-events-none" viewBox="0 0 24 24">
            <path d="M16.5 13c-1.2 0-3.07.59-3.79 1.64C13.99 15.74 15 17.24 15 19v2h7v-2c0-2.66-5.33-4-5.5-4zm-9 0c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm9 0c1.38 0 2.5-1.12 2.5-2.5S17.88 6 16.5 6c-.22 0-.42.03-.62.08.58.71.92 1.62.92 2.62s-.34 1.91-.92 2.62c.2.05.4.08.62.08z" />
          </svg>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full bg-white/3 border border-card-border rounded-lg py-3 pl-11 pr-10 text-text-primary text-base transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none appearance-none cursor-pointer"
          >
            <option value="1">1 Passenger</option>
            <option value="2">2 Passengers</option>
            <option value="3">3 Passengers</option>
            <option value="4">4 Passengers</option>
            <option value="5-6">5-6 Passengers (SUV)</option>
            <option value="7-13">7-13 Passengers (Urbania)</option>
            <option value="14-17">14-17 Passengers (Urbania)</option>
          </select>
          <div className="pointer-events-none absolute right-4 text-[10px] text-text-secondary">▼</div>
        </div>
      </div>

      {/* Vehicle Category Select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Select Car Class
        </label>
        <div className="grid grid-cols-3 gap-3">

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="vehicle-type"
              value="standard"
              checked={selectedVehicle === 'standard'}
              onChange={() => onVehicleChange('standard')}
              className="peer sr-only"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-3 text-center border border-card-border rounded-lg bg-white/2 transition-all duration-300 hover:border-taxi-gold/30 peer-checked:border-taxi-gold peer-checked:bg-taxi-gold/8 peer-checked:shadow-[0_0_15px_rgba(255,179,0,0.1)] group">
              <svg className="w-10 h-10 fill-text-secondary transition-all duration-300 group-hover:fill-text-primary peer-checked:group-hover:fill-taxi-gold peer-checked:fill-taxi-gold peer-checked:scale-105" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 15H5v-3h14v3zm-3.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <span className="text-xs font-semibold peer-checked:text-taxi-gold">Sedan</span>
              <span className="text-[10px] text-text-secondary">₹12 / km</span>
            </div>
          </label>

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="vehicle-type"
              value="executive"
              checked={selectedVehicle === 'executive'}
              onChange={() => onVehicleChange('executive')}
              className="peer sr-only"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-3 text-center border border-card-border rounded-lg bg-white/2 transition-all duration-300 hover:border-taxi-gold/30 peer-checked:border-taxi-gold peer-checked:bg-taxi-gold/8 peer-checked:shadow-[0_0_15px_rgba(255,179,0,0.1)] group">
              <svg className="w-10 h-10 fill-text-secondary transition-all duration-300 group-hover:fill-text-primary peer-checked:group-hover:fill-taxi-gold peer-checked:fill-taxi-gold peer-checked:scale-105" viewBox="0 0 24 24">
                <path d="M17 10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1.45.45-1.45 1v4c0 .55.45 1 1 1H17zm-1.5-4c.83 0 1.5 6.7 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5 6.7 1.5 1.5S9.33 9 8.5 9s-1.5-.67-1.5-1.5S7.67 6 8.5 6zM21.9 14.1l-2.3-6.9c-.2-.6-.8-1.2-1.5-1.2H5.9c-.7 0-1.3.6-1.5 1.2l-2.3 6.9c-.3.9-.1 1.9.5 2.6v3.3c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-2h12v2c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-3.3c.6-.7.8-1.7.5-2.6zM6 14.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S8.33 16 7.5 16 6 15.33 6 14.5zm10.5 1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <span className="text-xs font-semibold peer-checked:text-taxi-gold">SUV</span>
              <span className="text-[10px] text-text-secondary">₹18 / km</span>
            </div>
          </label>

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="vehicle-type"
              value="luxury"
              checked={selectedVehicle === 'luxury'}
              onChange={() => onVehicleChange('luxury')}
              className="peer sr-only"
            />
            <div className="flex flex-col items-center justify-center gap-2 p-3 text-center border border-card-border rounded-lg bg-white/2 transition-all duration-300 hover:border-taxi-gold/30 peer-checked:border-taxi-gold peer-checked:bg-taxi-gold/8 peer-checked:shadow-[0_0_15px_rgba(255,179,0,0.1)] group">
              <svg className="w-10 h-10 fill-text-secondary transition-all duration-300 group-hover:fill-text-primary peer-checked:group-hover:fill-taxi-gold peer-checked:fill-taxi-gold peer-checked:scale-105" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-6.5h-3V9h3v3z" />
              </svg>
              <span className="text-xs font-semibold peer-checked:text-taxi-gold">Urbania</span>
              <span className="text-[10px] text-text-secondary">₹30 / km</span>
            </div>
          </label>

        </div>
      </div>



      {/* Submit & Call CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-taxi-gold to-[#E69D00] text-black font-bold text-sm sm:text-base py-3.5 px-4 sm:px-6 rounded-lg cursor-pointer flex justify-center items-center gap-2 shadow-[0_4px_20px_rgba(255,179,0,0.25)] hover:translate-y-[-2px] hover:shadow-[0_6px_25px_rgba(255,179,0,0.4)] transition-all duration-300 outline-none"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          <span className="truncate">Book on WhatsApp</span>
        </button>

        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="w-full bg-white/5 border border-taxi-gold/30 hover:border-taxi-gold text-taxi-gold hover:text-black hover:bg-taxi-gold font-bold text-sm sm:text-base py-3.5 px-4 sm:px-6 rounded-lg cursor-pointer flex justify-center items-center gap-2 transition-all duration-300 hover:translate-y-[-2px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,179,0,0.2)] text-center outline-none"
        >
          <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="truncate">Call Now to Book</span>
        </a>
      </div>

    </form>
  );
};
