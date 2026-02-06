import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import aarzoopic from "@/assets/Aarzoo Profile.webp"; // keep as-is

/* Brand palette */
const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

/* Motion */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.5, delay },
  },
});

/** Slider images (put these in /public/about/) */
const SLIDES = [
  "/about/celeb1.webp",
  "/about/celeb2.webp",
  "/about/celeb3.webp",
  "/about/celeb4.webp",
  "/about/celeb5.webp",
  "/about/celeb6.webp",
];

const AboutAarzoo = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // ✅ Auto-scroll (mobile + desktop) — pauses while user interacts
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let paused = false;

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("pointerup", resume, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    const interval = window.setInterval(() => {
      if (paused) return;
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2800); // speed: lower = faster

    return () => {
      window.clearInterval(interval);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("pointerup", resume);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  // ✅ Scroll when index changes
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    // card width ≈ container width because your snap cards are large
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, [index]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* soft accent shapes */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: `${COLORS.yellow}55` }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: `${COLORS.orange}44` }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-6 md:py-14">
        {/* IMAGE PANEL */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div
            className="relative overflow-hidden rounded-3xl border shadow-sm"
            style={{ borderColor: `${COLORS.navy}22` }}
          >
            <motion.img
              src={aarzoopic}
              alt="Aarzoo Shah"
              className="h-full w-full object-cover"
              initial={{ scale: 1.04 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* TEXT PANEL */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="text-3xl font-extrabold leading-tight md:text-4xl"
            style={{ color: COLORS.navy }}
          >
            Hello, I am <span style={{ color: COLORS.redOrange }}>Aarzoo Shah!</span>
          </motion.h2>

          <motion.div
            variants={fadeUp(0.05)}
            className="mt-3 h-[3px] w-20 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />

          <motion.p
            variants={fadeUp(0.1)}
            className="mt-5 text-[15px] sm:text-base md:text-lg font-semibold leading-7"
            style={{ color: "#111827" }}
          >
            I help people unlock their highest potential using proven coaching frameworks that have created
            thousands of success stories across clarity, confidence, relationships, and wealth alignment.
            My programs are trusted by working professionals and entrepreneurs across India, and I’ve been
            featured in expert panels, podcasts, and digital publications for my work on mindset
            transformation and growth psychology.
          </motion.p>

          {/* ✅ Slider (same fitting, now auto-scroll enabled) */}
          <motion.div variants={fadeUp(0.18)} className="mt-5">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
              }}
            >
              <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
              `}</style>

              {SLIDES.map((src, i) => (
                <motion.div
                  key={i}
                  className="snap-center shrink-0 w-[78%] sm:w-[58%] md:w-[46%] lg:w-[40%]"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                >
                  <div
                    className="overflow-hidden rounded-2xl border bg-white shadow-sm"
                    style={{ borderColor: `${COLORS.navy}18` }}
                  >
                    <img
                      src={src}
                      alt={`Aarzoo highlight ${i + 1}`}
                      className="h-44 sm:h-52 md:h-56 w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* dots */}
            <div className="mt-3 flex justify-center md:justify-start gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="h-2 w-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === index ? COLORS.orange : "rgba(11,62,119,0.25)",
                    opacity: i === index ? 1 : 0.8,
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            variants={fadeUp(0.25)}
            className="mt-6 rounded-2xl border bg-white p-5 text-xl font-extrabold leading-snug md:text-2xl"
            style={{ borderColor: `${COLORS.navy}22`, color: COLORS.navy }}
          >
            Your transformation starts with one powerful choice:{" "}
            <span style={{ color: COLORS.redOrange }}>to believe in yourself</span>
          </motion.blockquote>

          {/* Info strip */}
          <motion.div
            variants={fadeUp(0.3)}
            className="mt-5 flex flex-wrap items-center gap-3 rounded-xl px-4 py-3"
            style={{
              backgroundColor: `${COLORS.cream}`,
              border: `1px solid ${COLORS.orange}55`,
            }}
          >
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: COLORS.yellow, color: "#111" }}
            >
              2000+ Lives Impacted
            </span>
            <span className="text-sm font-semibold" style={{ color: COLORS.navy }}>
              Purpose • Confidence • Clarity • Action
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAarzoo;
