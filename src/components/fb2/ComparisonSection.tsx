import { motion, Variants } from "framer-motion";
import {
  PiggyBank,
  TrendingDown,
  ShieldAlert,
  CandlestickChart,
  Shuffle,
  HelpCircle,
  Layers,
  Target,
  CheckCircle2,
} from "lucide-react";

const COLORS = {
  navy: "#0B3E77",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
  white :"#ffffff"
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay },
  },
});

type Row = {
  heading: string;
  label: string;
  did: string;
  result: string;
  focus?: boolean;
  icons: any[];
};

const rows: Row[] = [
  {
    heading: "Safe but Losing",
    label: "Saver Shubham",
    did: "Kept all money in a savings account at 2%.",
    result: "₹11,04,081 — inflation quietly destroyed value.",
    icons: [PiggyBank, TrendingDown, ShieldAlert],
  },
  {
    heading: "Risky & Uncertain",
    label: "Investor Isha",
    did: "Put everything in stocks and hoped for the best.",
    result: "₹14,00,000 — only if luck stays on her side.",
    icons: [CandlestickChart, Shuffle, HelpCircle],
  },
  {
    heading: "Structured & Winning",
    label: "Smart Sarah",
    did: "Diversified across stocks, gold, debt & systems.",
    result: "Potentially far higher & more stable growth.",
    focus: true,
    icons: [Layers, Target, CheckCircle2],
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ color: COLORS.white }}
          >
            Here’s the Difference: <span style={{ color: COLORS.yellow }}>Saving</span> vs.{" "}
            <span style={{ color: COLORS.yellow }}>Investing</span> vs.{" "}
            <span style={{ color: COLORS.redOrange }}>Investing Smart</span>
          </motion.h2>

          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-3 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((r, i) => {
            const isFocus = r.focus;

            return (
              <motion.div
                key={r.label}
                variants={fadeUp(i * 0.06)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-xl border p-5 text-left transition-all"
                style={{
                  backgroundColor: isFocus
                    ? "rgba(255,255,255,0.14)"
                    : "rgba(255,255,255,0.06)",
                  borderColor: isFocus
                    ? "rgba(243,211,91,0.6)"
                    : "rgba(255,255,255,0.2)",
                  color: "#fff",
                  opacity: isFocus ? 1 : 0.45,
                  transform: isFocus ? "scale(1.04)" : "scale(1)",
                }}
              >
                {/* Heading */}
                <div
                  className="text-xs uppercase tracking-wider font-bold mb-1"
                  style={{
                    color: isFocus ? COLORS.yellow : "rgba(255,255,255,0.6)",
                  }}
                >
                  {r.heading}
                </div>

                {/* Name */}
                <div className="flex items-center gap-2 mb-3">
                  <h3
                    className="text-lg font-extrabold"
                    style={{ color: isFocus ? COLORS.yellow : "#fff" }}
                  >
                    {r.label}
                  </h3>

                  {isFocus && (
                    <span
                      className="rounded-full px-2 py-1 text-[11px] font-bold"
                      style={{
                        backgroundColor: "rgba(243,211,91,0.18)",
                        border: "1px solid rgba(243,211,91,0.45)",
                      }}
                    >
                      BEST CHOICE
                    </span>
                  )}
                </div>

                {/* Icons */}
                <div className="flex gap-2 mb-4">
                  {r.icons.map((Icon, idx) => (
                    <div
                      key={idx}
                      className="h-8 w-8 flex items-center justify-center rounded-full border"
                      style={{
                        borderColor: "rgba(255,255,255,0.25)",
                        backgroundColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm opacity-90 mb-2">{r.did}</p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: isFocus ? COLORS.yellow : "#fff" }}
                >
                  {r.result}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Copy */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 text-base md:text-lg"
          style={{ color: "#fff" }}
        >
          Smart money isn’t about luck or fear — it’s about{" "}
          <span style={{ color: COLORS.yellow, fontWeight: 800 }}>
            structure, systems, and clarity
          </span>
          .
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
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
  <span>Get Access at ₹99</span>

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


        </motion.div>
      </div>
    </section>
  );
}
