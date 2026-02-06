import { motion, Variants } from "framer-motion";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3", // not used here (per your note)
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeOut", delay },
  },
});

const rows = [
  {
    label: "Saver Shubham",
    did: "Kept all in a savings account at 2%.",
    result: "Rs. 11,04,081. Inflation ate it.",
  },
  {
    label: "Investor Isha",
    did: "Dumped it in stocks, crossed his fingers.",
    result: "Rs. 14,00,000—if luck holds.",
  },
  {
    label: "Smart Sarah",
    did: "Mixed stocks, crypto, gold, debt funds, algo trading.",
    result: "Potentially much higher returns than stock market alone",
  },
];

export default function ComparisonSection() {
  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: `${COLORS.navy}` }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Heading */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 md:mb-10"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: COLORS.yellow }}
          >
            Here’s the Difference: <span style={{ color: COLORS.redOrange }}>Saving</span> vs.{" "}
            <span style={{ color: COLORS.orange }}>Investing</span> vs.{" "}
            <span style={{ color: COLORS.yellow }}>Investing Smart</span>
          </motion.h2>

          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-3 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden md:block"
        >
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.35)" }}
          >
            <div
              className="grid grid-cols-3 text-left font-bold px-5 py-4"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            >
              <div>Approach</div>
              <div>What They Did</div>
              <div>Result After 5 Years</div>
            </div>

            {rows.map((r, i) => (
              <div
                key={r.label}
                className="grid grid-cols-3 px-5 py-4 text-left"
                style={{
                  backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  color: "#fff",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div className="font-extrabold" style={{ color: COLORS.yellow }}>
                  {r.label}
                </div>
                <div className="opacity-95">{r.did}</div>
                <div className="opacity-95">{r.result}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="md:hidden space-y-3"
        >
          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              variants={fadeUp(i * 0.05)}
              className="rounded-xl border p-4 text-left"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
              }}
            >
              <div className="font-extrabold mb-2" style={{ color: COLORS.yellow }}>
                {r.label}
              </div>
              <div className="text-sm">
                <div className="opacity-90">
                  <span className="font-semibold" style={{ color: COLORS.orange }}>
                    What They Did:
                  </span>{" "}
                  {r.did}
                </div>
                <div className="opacity-90 mt-1.5">
                  <span className="font-semibold" style={{ color: COLORS.redOrange }}>
                    Result After 5 Years:
                  </span>{" "}
                  {r.result}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Blurb */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 md:mt-10 text-base md:text-lg"
          style={{ color: "#fff" }}
        >
          <span className="font-extrabold" style={{ color: COLORS.yellow }}>
            Saver Shubham
          </span>{" "}
          played safe and stagnated.{" "}
          <span className="font-extrabold" style={{ color: COLORS.orange }}>
            Investor Isha
          </span>{" "}
          risked it but missed the mark.{" "}
          <span className="font-extrabold" style={{ color: COLORS.redOrange }}>
            Smart Sarah
          </span>{" "}
          diversified smart, used systems, and won big. Where are you now? Where do you want to be?
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 md:mt-10 flex justify-center"
        >
          <a
  href="#register"
  onClick={() => {
    // @ts-ignore
    if (window.fbq) {
      // @ts-ignore
      window.fbq("track", "AddToCart", {
        value: 99,
        currency: "INR",
        content_ids: ["ai-trading-Masterclass"],
      });
    }
  }}
  className="inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-bold text-[#111]
             shadow-[0_5px_0_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5 focus:outline-none"
  style={{
    background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.orange})`,
    border: `1px solid ${COLORS.orange}`,
  }}
>
  Register Now at ₹99
</a>
        </motion.div>
      </div>
    </section>
  );
}
