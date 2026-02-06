import { motion, type Variants } from "framer-motion";
import {
  HelpCircle,
  ShieldAlert,
  Brain,
  Inbox,
  FileWarning,
  Landmark,
} from "lucide-react";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.45, ease: "easeOut", delay },
  },
});

const PAINS = [
  { icon: HelpCircle, text: "I know I should invest, but I have no idea where to even start." },
  { icon: ShieldAlert, text: "I’m worried about making the wrong decision and losing my hard-earned money." },
  { icon: Landmark, text: "My income is limited and I feel I don't have enough left over to make a real difference." },
  { icon: Brain, text: "I’ve tried to learn on my own but keep putting it off or get overwhelmed by too much info." },
  { icon: Inbox, text: "I have some savings, but no clear long-term plan to make them grow." },
  { icon: FileWarning, text: "I’ve had bad experiences before that make me hesitant to invest again." },
];

const PainPointsSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 text-center">
        {/* Title */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-8 md:mb-10"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ color: COLORS.yellow }}
          >
            Does Any of This Sound Familiar?
          </motion.h2>
          <motion.div
            variants={fadeUp(0.05)}
            className="mx-auto mt-3 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.text}
                variants={fadeUp(i * 0.05)}
                whileHover={{ y: -3 }}
                className="flex items-start gap-3 rounded-2xl border p-4 sm:p-5 md:p-6 text-left"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              >
                <div
                  className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}55` }}
                >
                  <Icon className="h-5 w-5" style={{ color: COLORS.yellow }} />
                </div>
                <p className="text-base sm:text-lg leading-relaxed">{p.text}</p>
              </motion.article>
            );
          })}
        </motion.div>

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

export default PainPointsSection;