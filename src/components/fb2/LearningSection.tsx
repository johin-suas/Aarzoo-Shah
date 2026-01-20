import { motion, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",      // not used here (per your request)
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

/** ✅ Typing-safe variants (fixes your error) */
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeOut", delay },
  },
});

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const LearningSection = () => {
  const points = [
    "Rising costs and market volatility are draining your profits",
    'The “save more, invest a little” mindset? It’s no longer enough',
    "You’re frustrated by returns that fall far short of your goals",
    "Diversifying feels overwhelming, risky, and complicated",
    "You’re watching others build their wealth while you remain stuck in the same place",
    "You’re constantly worried about whether you’re making the right investment decisions",
    "You know there’s more potential to make profit with your investments",
  ];

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: COLORS.navy, color: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2
          
            className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Hey, You’ve Got Money in Play.
            <br className="hidden sm:block" />
            <span style={{ color: COLORS.yellow }}> Now It’s Time to Make It Work</span>
          </h2>

          {/* solid divider */}
          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-4 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          {points.map((text, i) => (
            <motion.div
              key={i}
              variants={fadeUp(i * 0.04)}
              whileHover={{ scale: 1.015, transition: { type: "tween", duration: 0.2 } }}
              className="flex items-start gap-3 rounded-2xl p-4 sm:p-5 text-left shadow-sm hover:shadow-md"
              style={{
                // solid look on navy: subtle translucent card
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div
                className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS.yellow }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: COLORS.navy }} />
              </div>
              <p className="text-sm sm:text-base leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA (same gradient as hero) */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 md:mt-14 flex justify-center"
        >
        <a
  href="#register"
  onClick={() => {
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        value: 99,
        currency: "INR",
        content_ids: ["money-workshop"],
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
};

export default LearningSection;
