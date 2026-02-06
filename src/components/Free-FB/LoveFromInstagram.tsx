// src/components/LoveFromInstagram.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const instaShots = [
  "/ig/shot1.jpg",
  "/ig/shot2.jpg",
  "/ig/shot3.jpg",
  "/ig/shot4.jpg",
  "/ig/shot5.jpg",
];

export default function LoveFromInstagram() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRaf = useRef<number | null>(null);

  // Auto slide (optional)
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % instaShots.length;
        el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Detect scroll position for center zoom
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const newIndex = Math.round(el.scrollLeft / el.clientWidth);
      if (newIndex !== index) setIndex(newIndex);
    });
  };

  return (
    <section
      className="py-8 md:py-12"
      style={{
        background:
          "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
      }}
    >
      <div className="mx-auto max-w-5xl px-3 md:px-6">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
    20k Plus followers with lots of love
  </h2>

  <div className="mx-auto mt-2 inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
       style={{
         background: "rgba(255,255,255,0.15)",
         backdropFilter: "blur(6px)",
         border: "1px solid rgba(255,255,255,0.3)",
         color: "white",
       }}>
    @aarzoorshah
  </div>

  <p className="mt-2 text-xs sm:text-sm md:text-base font-medium text-white/90">
    Instagram Family 💛
  </p>

  <div className="mx-auto mt-2 h-[2px] w-20 rounded-full bg-white/70" />
</div>


        {/* Carousel */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Hide scrollbar (Chrome/Safari/Edge) */}
          <style>
            {`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {instaShots.map((src, i) => {
            const isActive = i === index;

            return (
              <motion.div
                key={i}
                className="snap-center shrink-0 w-full px-2 sm:px-6"
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
              >
                <div className="mx-auto max-w-sm sm:max-w-md rounded-2xl bg-black/10 border border-white/10 shadow-xl overflow-hidden backdrop-blur-sm">
                  <img
                    src={src}
                    alt={`Instagram love ${i + 1}`}
                    className="w-full h-64 sm:h-72 object-contain bg-black/10"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {instaShots.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = containerRef.current;
                if (!el) return;
                el.scrollTo({
                  left: i * el.clientWidth,
                  behavior: "smooth",
                });
                setIndex(i);
              }}
              className="h-2 w-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  i === index ? "#ffffff" : "rgba(255,255,255,0.5)",
                opacity: i === index ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
