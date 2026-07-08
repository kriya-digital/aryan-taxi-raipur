import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How are the taxi fares calculated?",
    answer: "Our website utilizes a dynamic fare estimator. Once you select your pickup and dropoff destinations (such as Raipur, Bilaspur, Bhilai, Durg, or Korba) alongside your preferred vehicle class, the system estimates the route distance and multiplies it by the respective rate per kilometer. Minimal base fares apply."
  },
  {
    question: "Can I schedule a taxi reservation in advance?",
    answer: "Absolutely. You can select your pickup date and time up to 30 days in advance via our booking tool. Once completed, your booking details are structured into a WhatsApp message draft to finalize driver assignment with our dispatch coordinator."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellations are completely free if made at least 1 hour prior to your scheduled pickup time. To cancel or adjust a booking, simply send a message on the same WhatsApp conversation you used to confirm the ride."
  },
  {
    question: "Do you offer outstation or hourly services?",
    answer: "Yes, we specialize in inter-city routes across Chhattisgarh (e.g., Raipur-Bilaspur, Raipur-Jagdalpur, Raipur-Korba, Bhilai-Durg) and round-trip outstation services. Simply request a custom rate quote from our representative over WhatsApp."
  }
];

export const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold text-text-primary font-display mb-2">Frequently Asked Questions</h3>
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div 
            key={idx} 
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              isOpen 
                ? 'border-taxi-gold/30 bg-black/30 shadow-[0_4px_15px_rgba(0,0,0,0.25)]' 
                : 'border-card-border bg-white/1'
            }`}
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full text-left px-5 py-4 flex justify-between items-center transition-all duration-300 font-medium font-display text-base hover:bg-white/2 outline-none cursor-pointer"
            >
              <span className={isOpen ? 'text-taxi-gold' : 'text-text-primary'}>
                {item.question}
              </span>
              <span className={`text-xs text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-taxi-gold' : ''}`}>
                ▼
              </span>
            </button>
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-52 opacity-100 border-t border-card-border/50' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 py-4 text-sm text-text-secondary leading-relaxed bg-black/10">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
