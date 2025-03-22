import { useState, useEffect } from "react";

const DealsCarousel = () => {
  const deals = [
    "50% Off Electronics",
    "Buy 1 Get 1 Free",
    "Limited-Time Offers",
    "Seasonal Sale - Up to 70% Off",
    "Exclusive Online Discounts"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-black/50 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4"> Limited-Time Deals! </h2>
        <div className="relative w-full max-w-3xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg transition-all text-lg font-semibold">
          {deals[currentIndex]}
        </div>
        <p className="mt-2 text-sm">Hurry! These offers won’t last long.</p>
      </div>
    </section>
  );
};

export default DealsCarousel;
