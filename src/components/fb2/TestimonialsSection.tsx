import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

const testimonials = [
  {
    text: "I finally understood diversification. The frameworks helped me feel in control.",
    image: "/testimonials/1.jpeg",
  },
  {
    text: "Balanced, realistic, and clear — no hype, just guidance.",
    image: "/testimonials/2.jpeg",
  },
  {
    text: "Aarzoo’s tax hacks saved me lakhs while scaling my wealth.",
    image: "/testimonials/3.jpeg",
  },
  {
    text: "Her safety net plan protected my gains and then tripled them.",
    image: "/testimonials/4.jpeg",
  },
  {
    text: "My financial mindset and outcomes have completely transformed.",
    image: "/testimonials/5.jpeg",
  },
];

// 👇 images for the small round faces row (public/people)
const faceImages = [
  "/people/1.png",
  "/people/2.png",
  "/people/3.png",
  "/people/4.webp",
  "/people/5.webp",
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto slide only on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scroll container when index changes (desktop + mobile, so dots work everywhere)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const slideWidth = el.clientWidth; // each slide is min-w-full on mobile
    el.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-10"
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: COLORS.yellow }}
          >
            Still Thinking? Hear it from the winners.
          </h2>
          <div
            className="mx-auto mt-3 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
          <p
            className="mt-4 text-sm sm:text-base md:text-lg"
            style={{ color: COLORS.cream }}
          >
            Here’s what people say about her work:
          </p>
        </motion.div>

        {/* Scrollable testimonial images */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              whileHover={{ y: -4 }}
              className="min-w-full md:min-w-[70%] lg:min-w-[60%] snap-center rounded-2xl border p-3 sm:p-4 bg-black/10 shadow-lg"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
              }}
            >
              <div className="overflow-hidden rounded-xl bg-black/40">
                <img
                  src={t.image}
                  alt={`Testimonial ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <figcaption className="mt-4 text-left">
                <p className="mt-2 text-sm sm:text-base leading-relaxed opacity-90">
                  {t.text}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Pagination dots – now visible on mobile too */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor:
                  i === index ? COLORS.yellow : "rgba(255,255,255,0.5)",
                opacity: i === index ? 1 : 0.6,
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Faces row + 1 Million lives text */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {/* Small circular faces – more images from /people */}
          <div className="flex -space-x-3">
            {faceImages.map((src, i) => (
              <div
                key={i}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white overflow-hidden"
                style={{ boxShadow: "0 0 0 2px rgba(11,62,119,0.8)" }}
              >
                <img
                  src={src}
                  alt={`Participant ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* 1 Million lives text */}
          <div className="text-center">
            <p
              className="text-sm sm:text-base font-semibold tracking-[0.18em] uppercase"
              style={{ color: COLORS.cream }}
            >
              1 Million
            </p>
            <p
              className="text-lg sm:text-xl font-extrabold tracking-[0.16em] uppercase"
              style={{ color: COLORS.yellow }}
            >
              Lives Transformed
            </p>
            <p
              className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase mt-1"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Through The Program
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
         <a
  href="#register"
  onClick={() => {
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        value: 99,
        currency: "INR",
        content_ids: ["money-Masterclass"],
      });
    }
  }}
  className="relative inline-flex items-center justify-center rounded-full
             px-7 py-3.5 sm:px-8 sm:py-4
             text-sm sm:text-base md:text-lg font-extrabold text-white
             bg-[#3E646E]
             transition-transform duration-200
             hover:-translate-y-0.5 active:translate-y-[1px]
             focus:outline-none focus:ring-4 focus:ring-black/20"
  style={{
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.35), 0 16px 40px rgba(0,0,0,0.25)",
  }}
>
  <span>Register Now at ₹99</span>

  {/* soft shine sweep */}
  <motion.span
    aria-hidden
    initial={{ x: "-100%" }}
    animate={{ x: "100%" }}
    transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
    className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
    style={{
      background:
        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
      mixBlendMode: "overlay",
    }}
  />
</a>

        </div>
      </div>
    </section>
  );
}
