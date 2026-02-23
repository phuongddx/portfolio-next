"use client";

import { m } from "framer-motion";
import { useState } from "react";

interface DeviceMockupProps {
  screenshots: string[];
  title: string;
}

export function DeviceMockup({ screenshots, title }: DeviceMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    const swipe = Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 500;

    if (swipe && screenshots.length > 1) {
      const direction = info.offset.x > 0 ? -1 : 1;
      const newIndex = Math.max(0, Math.min(screenshots.length - 1, currentIndex + direction));
      setCurrentIndex(newIndex);
    }
  };

  if (screenshots.length === 0) {
    return (
      <div className="relative w-48 h-96 mx-auto mb-4">
        {/* Placeholder device frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-[2.5rem] border-4 border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm text-center px-4">
            Screenshots coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-48 h-96 mx-auto mb-4">
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10" />

        {/* Screen Container */}
        <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-white">
          <m.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-full cursor-grab active:cursor-grabbing"
          >
            {screenshots.map((src, index) => (
              <div key={index} className="min-w-full h-full flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Dots Indicator */}
      {screenshots.length > 1 && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-cta" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
