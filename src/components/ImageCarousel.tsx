import React, { useState, useRef, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  rate?: string;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt, rate, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Sync index on manual scroll/swipe
  const handleScroll = () => {
    if (isScrollingRef.current || !scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    
    isScrollingRef.current = true;
    const width = scrollRef.current.clientWidth;
    
    scrollRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
    
    // Release scroll lock after animation finishes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 400);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    scrollTo(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    scrollTo(nextIndex);
  };

  // Adjust scroll position on resize to prevent alignment issues
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth;
        scrollRef.current.scrollLeft = currentIndex * width;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className={`w-full h-full relative group/carousel overflow-hidden select-none ${className}`}>
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 snap-start relative">
            <img
              src={img}
              alt={`${alt} view ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading={idx === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Rate Badge Overlay */}
      {rate && (
        <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-taxi-gold border border-taxi-gold/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-lg">
          {rate}
        </span>
      )}

      {/* Navigation Arrows (Only if multiple images exist) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:bg-taxi-gold hover:text-black hover:border-taxi-gold text-text-primary flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 cursor-pointer outline-none z-10 shadow-lg"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:bg-taxi-gold hover:text-black hover:border-taxi-gold text-text-primary flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 cursor-pointer outline-none z-10 shadow-lg"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </>
      )}

      {/* Indicator Dots (Only if multiple images exist) */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                scrollTo(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer outline-none ${
                currentIndex === idx ? 'bg-taxi-gold w-4' : 'bg-white/40 hover:bg-white/75 w-1.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
