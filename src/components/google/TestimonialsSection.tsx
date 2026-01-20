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
    name: "Anjali",
    role: "Entrepreneur",
    text: "I finally understood diversification. The frameworks helped me feel in control.",
  },
  {
    name: "Rohan",
    role: "Investor",
    text: "Balanced, realistic, and clear — no hype, just guidance .",
  },
  {
    name: "Sameer",
    role: "Professional",
    text: "Aarzoo’s tax hacks saved me lakhs while scaling my wealth. She uncovered opportunities in tax-saving strategies I never knew existed. Now I’m maximizing growth without unnecessary tax burden.",
  },
  {
    name: "Kavita",
    role: "Investor",
    text: "Her safety net plan protected my gains and then tripled them. She taught me how to build a resilient portfolio so my assets stay shielded through any market. I finally have the confidence to scale without fear.",
  },
  {
    name: "Arjun",
    role: "Entrepreneur",
    text: "Aarzoo helped me rewire my approach to wealth—thinking long-term like a pro. Since applying her advice, results just followed. My financial mindset and outcomes have completely transformed.",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto slide only on desktop
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
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
          <p className="mt-4 text-sm sm:text-base md:text-lg" style={{ color: COLORS.cream }}>
            Here’s what people say about her work:
          </p>
        </motion.div>

        {/* Scrollable testimonial cards */}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:overflow-hidden md:grid md:grid-cols-3 md:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -4 }}
              className="min-w-[90%] sm:min-w-[45%] md:min-w-0 snap-center rounded-2xl border p-5 sm:p-6 text-left transition-all shadow-lg md:shadow-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.18)",
                color: "#fff",
              }}
            >
              <h3 className="text-lg font-extrabold" style={{ color: COLORS.cream }}>
                {t.name}
              </h3>
              <p className="mb-4 text-sm font-semibold opacity-90">{t.role}</p>
              <p className="text-base leading-relaxed opacity-95">{t.text}</p>
            </motion.article>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-6 hidden md:flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor: i === index ? COLORS.yellow : "rgba(255,255,255,0.5)",
                opacity: i === index ? 1 : 0.6,
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
           <button
             onClick={() => {
  window.open("https://rzp.io/rzp/O3e94Np9", "_self");
}}
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-bold text-[#111]
                     shadow-[0_5px_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 focus:outline-none"
              style={{
                background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.orange})`,
                border: `1px solid ${COLORS.orange}`,
              }}
            >
              Register Now at ₹99
            </button>
        </div>
      </div>
    </section>
  );
}
