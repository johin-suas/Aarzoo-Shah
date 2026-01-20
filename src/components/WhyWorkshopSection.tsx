import { motion, type Variants } from "framer-motion";
import { Cog, Handshake, Map, ShieldCheck } from "lucide-react";

/** Brand palette */
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
  show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.5, ease: "easeOut", delay } },
});

const FEATURES = [
  {
    icon: Cog,
    title: "2 Days of Practical Learning",
    
  },
  {
    icon: Handshake,
    title: "Downloadable Tools",
  },
  {
    icon: Map,
    title: "Custom Plan",
  },
  {
    icon: ShieldCheck,
    title: "No Tips or Signals — only education and skill-building.",
    
  },
];

const WhyWorkshopSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.navy }}
    >
      {/* soft vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 text-center">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-8 md:mb-10"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="font-extrabold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: COLORS.yellow }}
          >
            Why This Workshop? Because You
            <br className="hidden sm:block" /> Deserve Results, Not Theories.
          </motion.h2>
          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-3 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />
          <motion.p
            variants={fadeUp(0.15)}
            className="mx-auto mt-4 max-w-3xl text-sm sm:text-base md:text-lg"
            style={{ color: COLORS.cream }}
          >
            You’ve worked hard for your money. Now learn how to manage it confidently. Inflation and
changing markets make it harder to plan ahead. This workshop helps you understand
asset allocation, risk management, and goal setting.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.title}
                variants={fadeUp(i * 0.05)}
                whileHover={{ y: -3 }}
                className="flex items-center gap-4 rounded-2xl border p-4 text-left sm:p-5 md:p-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#FFFFFF",
                }}
              >
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${COLORS.yellow}22`, border: `1px solid ${COLORS.yellow}55` }}
                >
                  <Icon className="h-6 w-6" style={{ color: COLORS.yellow }} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold sm:text-lg">{f.title}</h3>
                
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Hook line */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 text-base md:text-lg"
          style={{ color: COLORS.cream }}
        >
          This isn’t “learn to invest.” It’s making what you’ve got unstoppable.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp(0.25)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 md:mt-8 flex justify-center"
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
        content_ids: ["ai-trading-workshop"],
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
};

export default WhyWorkshopSection;
