import React, { useState } from 'react';

const WHATSAPP_NUMBER = "917000811242";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !query.trim()) {
      alert("Please enter both your name and your query.");
      return;
    }

    const messageText =
      ` *Aryan Taxi Services - Customer Inquiry* 
----------------------------------------
 *Passenger:* ${name.trim()}
 *Query:* ${query.trim()}
----------------------------------------
Please assist me with my inquiry. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-card-border mt-6">
      <h3 className="text-lg font-bold font-display text-text-primary mb-4 flex items-center gap-2">
        <span>Send Us a Message</span>
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Passenger Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="passenger-name">
            Passenger Name
          </label>
          <input
            type="text"
            id="passenger-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/3 border border-card-border rounded-lg py-2.5 px-4 text-text-primary text-sm transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none font-medium"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Passenger Query */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider" htmlFor="passenger-query">
            Your Message / Query
          </label>
          <textarea
            id="passenger-query"
            rows={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/3 border border-card-border rounded-lg py-2.5 px-4 text-text-primary text-sm transition-all duration-300 focus:border-taxi-gold focus:bg-taxi-gold-glow outline-none font-medium resize-none"
            placeholder="How can we help you today?"
            required
          />
        </div>

        {/* Submit & Call CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-3 px-4 rounded-lg flex justify-center items-center gap-2 shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)] transition-all duration-300 cursor-pointer outline-none"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <span className="truncate">Send WhatsApp</span>
          </button>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="w-full bg-white/5 border border-taxi-gold/30 hover:border-taxi-gold text-taxi-gold hover:text-black hover:bg-taxi-gold font-bold text-xs py-3 px-4 rounded-lg cursor-pointer flex justify-center items-center gap-2 transition-all duration-300 hover:translate-y-[-2px] shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,179,0,0.2)] text-center outline-none"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="truncate">Call Support</span>
          </a>
        </div>

      </form>
    </div>
  );
};
