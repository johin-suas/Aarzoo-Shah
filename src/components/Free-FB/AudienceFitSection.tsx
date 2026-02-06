import { motion, type Variants } from "framer-motion";

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
  show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.45, ease: "easeOut", delay } },
});

type FitCard = { image: string; caption: string };

interface AudienceFitProps {
  cards: [FitCard, FitCard, FitCard]; // pass your 3 images + captions
}

const AudienceFitSection = ({ cards }: AudienceFitProps) => {

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 text-center">
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ color: COLORS.navy }}
          >
            This Isn’t for Everyone.{" "}
            <span style={{ color: COLORS.orange }}>This is for YOU if you are :</span>
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
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c, i) => (
            <motion.figure
              key={i}
              variants={fadeUp(i * 0.05)}
              className="overflow-hidden rounded-2xl border bg-white text-left shadow-sm"
              style={{ borderColor: `${COLORS.navy}22` }}
            >
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt=""
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
              </div>
              <figcaption
                className="px-5 py-4 text-base font-semibold sm:text-lg"
                style={{ color: COLORS.navy, backgroundColor: "#FDFDFD" }}
              >
                {c.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-4xl text-sm sm:text-base md:text-lg font-medium"
          style={{ color: COLORS.navy }}
        >
         Not for: Anyone seeking tips or guaranteed profits
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
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
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
  <span>Register Now Free</span>

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

export default AudienceFitSection;