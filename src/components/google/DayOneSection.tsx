import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Play, Shield, Goal, Lock } from "lucide-react";

/* Brand palette */
const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

/* ---- Types ---- */
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

/* ---- Motion ---- */
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
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};

/* ---- Content ---- */
const STEP1: Step = {
  icon: Goal,
  title: "Step 1: Define Your Next Big Move",
  intro:
    "You’ve got goals for retirement, a dream home, and generational wealth. But are your investments actually lined up to get you there? We’ll dive into your current setup and create a no-BS plan to hit those targets faster.",
  sub: "With our Financial Goal Calculator (yours free during the Workshop), you’ll:",
  bullets: [
    "Pinpoint how much you need to grow yearly.",
    "Spot where your portfolio’s lagging.",
    "Get a custom roadmap for real results.",
  ],
  outro:
    "No more vague “save more” advice. This is about making your money match your ambition.",
};

const STEP2: Step = {
  icon: Shield,
  title: "Step 2: Protect What You’ve Built",
  intro:
    "Growth is great, but losing it all to a bad market or crisis? Nightmare fuel. We’ll show you how to build a safety net that keeps your wealth rock-solid:",
  bullets: [
    { strong: "Health Insurance", text: "Shield your cash from medical hits." },
    { strong: "Gold", text: "Hedge against inflation like a pro." },
    { strong: "Debt Funds", text: "Steady returns to balance the chaos." },
    { strong: "Term Insurance", text: "Secure your family’s future." },
    { strong: "Tax Hacks", text: "Keep more cash with simple moves." },
  ],
  outro:
    "You’ll walk away knowing how to grow and guard your money—no matter what.",
};

/* ---- Card ---- */
function StepCard({ data }: { data: Step }) {
  const Icon = data.icon;
  return (
    <motion.article
      variants={fadeUp(0.1)}
      className="rounded-2xl border shadow-sm overflow-hidden"
      style={{ backgroundColor: COLORS.cream, borderColor: COLORS.orange }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-t-2xl"
        style={{ backgroundColor: COLORS.yellow }}
      >
        <Icon className="h-5 w-5 text-[#111]" />
        <h3 className="font-extrabold text-[#111] text-base md:text-lg">
          {data.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-5 py-5 md:px-6 md:py-6">
        <p className="text-sm md:text-base leading-relaxed text-[#222]">{data.intro}</p>

        {data.sub && (
          <p
            className="mt-4 text-sm md:text-base font-semibold"
            style={{ color: COLORS.redOrange }}
          >
            {data.sub}
          </p>
        )}

        <ul className="mt-3 md:mt-4 space-y-3">
          {data.bullets.map((b, i) => {
            const content =
              typeof b === "string" ? (
                b
              ) : (
                <>
                  <span className="font-bold" style={{ color: COLORS.navy }}>
                    {b.strong}
                  </span>
                  {`: ${b.text}`}
                </>
              );

            return (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-[#0B3E7720] pb-2 last:border-none"
              >
                <Play className="h-4 w-4 flex-shrink-0 mt-1" style={{ color: COLORS.orange }} />
                <p className="text-sm md:text-base text-[#111]">{content}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-sm md:text-base leading-relaxed text-[#222]">{data.outro}</p>
      </div>
    </motion.article>
  );
}

/* ---- Section ---- */
const DayOneSection = () => {
  const [active, setActive] = useState<"step1" | "step2">("step1");

  return (
    <>
      {/* 🔹 Separation Line (visible on all backgrounds) */}
      <div
        className="w-full h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)",
          boxShadow: "0 0 12px rgba(255,255,255,0.4)",
          opacity: 0.9,
        }}
      />

      <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
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
              style={{ color: COLORS.cream }}
            >
              Day 1: <span style={{ color: COLORS.yellow }}>Map Your Money</span>.{" "}
              <span style={{ color: COLORS.orange }}>Build Your Fortress.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp(0.1)}
              className="mx-auto mt-3 mb-8 h-[3px] w-24 rounded-full"
              style={{ backgroundColor: COLORS.yellow }}
            />

            <motion.div
              variants={fadeUp(0.15)}
              className="mx-auto mb-6 flex items-center justify-center gap-2 text-sm font-medium"
              style={{ color: COLORS.cream }}
            >
              <Lock className="h-4 w-4" style={{ color: COLORS.yellow }} />
              <span>Learn to define goals, assess your current plan with the Financial Goal Calculator, and
build a safety net with budgeting and insurance basics.</span>
            </motion.div>
          </motion.div>

          {/* Mobile Tabs */}
          <div className="md:hidden flex justify-center gap-2 mb-6">
            <button
              onClick={() => setActive("step1")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                active === "step1" ? "shadow-md" : "opacity-85 hover:opacity-100"
              }`}
              style={{
                backgroundColor: active === "step1" ? COLORS.yellow : COLORS.cream,
                color: active === "step1" ? "#111" : COLORS.navy,
                border: `1px solid ${active === "step1" ? COLORS.orange : COLORS.cream}`,
              }}
            >
              Step 1
            </button>
            <button
              onClick={() => setActive("step2")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                active === "step2" ? "shadow-md" : "opacity-85 hover:opacity-100"
              }`}
              style={{
                backgroundColor: active === "step2" ? COLORS.yellow : COLORS.cream,
                color: active === "step2" ? "#111" : COLORS.navy,
                border: `1px solid ${active === "step2" ? COLORS.orange : COLORS.cream}`,
              }}
            >
              Step 2
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
            {/* Mobile */}
            <div className="md:hidden">
              {active === "step1" ? <StepCard data={STEP1} /> : <StepCard data={STEP2} />}
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <StepCard data={STEP1} />
            </div>
            <div className="hidden md:block">
              <StepCard data={STEP2} />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp(0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 md:mt-14 flex justify-center"
          >
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
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DayOneSection;
