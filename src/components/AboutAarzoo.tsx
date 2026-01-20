import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import aarzoopic from "@/assets/Aarzoo.webp"; // replace if your path differs

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

const AboutAarzoo = () => {
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

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:px-6 md:py-16">
        {/* IMAGE PANEL */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* framed image with subtle border and shadow */}
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
            />
          </div>

          {/* floating signature plate */}
          
        </motion.div>

        {/* TEXT PANEL */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative"
        >
          {/* greeting headline */}
          <motion.h2
            variants={fadeUp(0)}
            className="text-3xl font-extrabold leading-tight md:text-4xl"
            style={{ color: COLORS.navy }}
          >
            Hello, I am <span style={{ color: COLORS.redOrange }}>Aarzoo Shah!</span>
          </motion.h2>

          {/* tiny underline */}
          <motion.div
            variants={fadeUp(0.05)}
            className="mt-3 h-[3px] w-20 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />

          {/* narrative paragraphs */}
          <motion.p variants={fadeUp(0.1)} className="mt-6 text-base leading-7 text-neutral-800 md:text-lg">
           I help people unlock their highest potential using proven coaching frameworks that have created thousands of success stories across clarity, confidence, relationships, and wealth alignment. With programs trusted by working professionals and entrepreneurs across India, I’ve been featured in expert panels, podcasts, and digital publications for my work on mindset transformation and growth psychology.
          </motion.p>

         

          {/* emphatic pull-quote block */}
          <motion.blockquote
            variants={fadeUp(0.3)}
            className="mt-6 rounded-2xl border bg-white p-5 text-xl font-extrabold leading-snug md:text-2xl"
            style={{ borderColor: `${COLORS.navy}22`, color: COLORS.navy }}
          >
            Your transformation starts with one powerful choice:{" "}
            <span style={{ color: COLORS.redOrange }}>to believe in yourself</span>
          </motion.blockquote>

          {/* subtle info strip */}
          <motion.div
            variants={fadeUp(0.35)}
            className="mt-6 flex flex-wrap items-center gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: `${COLORS.cream}`, border: `1px solid ${COLORS.orange}55` }}
          >
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: COLORS.yellow, color: "#111" }}>
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
