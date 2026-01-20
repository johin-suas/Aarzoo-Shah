import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play, TrendingUp, Lightbulb, Lock } from "lucide-react";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

type BulletItem =
  | string
  | {
      strong?: string;
      text: string;
    };

interface Step {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  intro: string;
  bullets: BulletItem[];
  outro: string;
  sub?: string;
}

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeOut", delay },
  },
});

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};

/* ---- Content ---- */
const STEP3: Step = {
  icon: TrendingUp,
  title: "Step 3: Take Smart Risks That Pay Off",
  intro:
    "You’re not here to play it safe forever. We’ll show you how to mix high-reward moves with steady wins — without gambling your future.",
  bullets: [
    "Learn what, how and where of 360° stock trading.",
    "Learn how to identify winning strategies in the stock market.",
    "Build the foundation for crypto, altcoins, and DeFi for massive returns.",
  ],
  outro:
    "This isn’t reckless betting. It’s stacking the odds with proven strategies.",
};

const STEP4: Step = {
  icon: Lightbulb,
  title: "Step 4: Think Like a Wealth Builder",
  intro:
    "To build lasting wealth, you need the right mindset. You can’t let fear or emotion control your decisions. We’ll help you gain the clarity and consistency needed to scale your wealth.",
  bullets: [
    "Learn to balance risk and reward in every investment.",
    "Cultivate the patience for long-term growth.",
    "Master strategies that keep your portfolio strong.",
    "Develop the mindset used by successful wealth builders.",
  ],
  outro:
    "This is your chance to think like the wealthy and start acting accordingly.",
};

/* ---- Card ---- */
function StepCard({ data }: { data: Step }) {
  const Icon = data.icon;
  return (
    <motion.article
      variants={fadeUp(0.1)}
      className="rounded-2xl border shadow-md overflow-hidden"
      style={{
        backgroundColor: COLORS.navy,
        borderColor: COLORS.orange,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-t-2xl"
        style={{ backgroundColor: COLORS.orange }}
      >
        <Icon className="h-5 w-5 text-[#111]" />
        <h3 className="font-extrabold text-[#111] text-base md:text-lg">{data.title}</h3>
      </div>

      {/* Body */}
      <div className="px-5 py-5 md:px-6 md:py-6">
        <p
          className="text-sm md:text-base leading-relaxed mb-4"
          style={{ color: COLORS.cream }}
        >
          {data.intro}
        </p>

        <ul className="space-y-3">
          {data.bullets.map((b, i) => {
            const content =
              typeof b === "string" ? (
                b
              ) : (
                <>
                  <span className="font-bold" style={{ color: COLORS.yellow }}>
                    {b.strong}
                  </span>
                  {`: ${b.text}`}
                </>
              );

            return (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-[#EEEAD366] pb-2 last:border-none"
              >
                <Play className="h-4 w-4 flex-shrink-0 mt-1" style={{ color: COLORS.yellow }} />
                <p className="text-sm md:text-base" style={{ color: COLORS.cream }}>
                  {content}
                </p>
              </li>
            );
          })}
        </ul>

        <p
          className="mt-4 text-sm md:text-base leading-relaxed"
          style={{ color: COLORS.cream }}
        >
          {data.outro}
        </p>
      </div>
    </motion.article>
  );
}

/* ---- Section ---- */
const DayTwoSection = () => {
  const [active, setActive] = useState<"step3" | "step4">("step3");

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.cream }}
    >
      {/* Section Divider / Label */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: `linear-gradient(90deg, ${COLORS.navy}, ${COLORS.orange})`,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 text-center">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2
            variants={fadeUp(0)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: COLORS.navy }}
          >
            Day 2:{" "}
            <span style={{ color: COLORS.redOrange }}>Play Offense.</span>{" "}
            <span style={{ color: COLORS.orange }}>Multiply Your Wealth.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp(0.1)}
            className="mx-auto mt-3 mb-8 h-[3px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.orange }}
          />

          <motion.div
            variants={fadeUp(0.15)}
            className="mx-auto mb-6 flex items-center justify-center gap-2 text-sm font-medium"
            style={{ color: COLORS.navy }}
          >
            <Lock className="h-4 w-4" style={{ color: COLORS.orange }} />
            <span>Evaluate instruments responsibly, identify risks, and develop discipline for long-term
decisions.</span>
          </motion.div>
        </motion.div>

        {/* Mobile Tabs */}
        <div className="md:hidden flex justify-center gap-2 mb-6">
          <button
            onClick={() => setActive("step3")}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              active === "step3" ? "shadow-md" : "opacity-85 hover:opacity-100"
            }`}
            style={{
              backgroundColor: active === "step3" ? COLORS.orange : COLORS.navy,
              color: COLORS.cream,
              border: `1px solid ${COLORS.orange}`,
            }}
          >
            Step 3
          </button>
          <button
            onClick={() => setActive("step4")}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              active === "step4" ? "shadow-md" : "opacity-85 hover:opacity-100"
            }`}
            style={{
              backgroundColor: active === "step4" ? COLORS.orange : COLORS.navy,
              color: COLORS.cream,
              border: `1px solid ${COLORS.orange}`,
            }}
          >
            Step 4
          </button>
        </div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left"
        >
          {/* Mobile: one active card only */}
          <div className="md:hidden">
            {active === "step3" ? <StepCard data={STEP3} /> : <StepCard data={STEP4} />}
          </div>

          {/* Desktop: both cards */}
          <div className="hidden md:block"><StepCard data={STEP3} /></div>
          <div className="hidden md:block"><StepCard data={STEP4} /></div>
        </motion.div>

        {/* CTA */}
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

export default DayTwoSection;
