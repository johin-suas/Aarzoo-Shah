import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  onCTAClick: () => void;
}

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

const FAQ = ({ onCTAClick }: FaqProps) => {
  const faqs = [
    {
      q: "I’ve been investing for years—why should I attend this Masterclass?",
      a: "If you’re already investing but feel stuck or are looking to diversify, this Masterclass will show you how to accelerate your returns with smart strategies. We cover new opportunities in algorithmic trading and crypto, plus ways to create a more secure financial future with your existing capital.",
    },
    {
      q: "Is this Masterclass suitable for beginners?",
      a: "While the content is advanced and focused on smart wealth-building strategies, we don’t assume you’re new to investing. If you already have capital invested and want to take your strategy to the next level, this Masterclass is for you.",
    },
    {
      q: "Will I be able to implement what I learn immediately?",
      a: "Absolutely! We’ve structured this Masterclass to be actionable from day one. You’ll leave with clear, practical strategies to apply to your portfolio right away.",
    },
    {
      q: "What if I can’t attend live?",
      a: "No worries! We’ll provide a live replay for you on the weekend.",
    },
    {
      q: "Is ₹99 the final price?",
      a: "Yes! For just ₹99, you’re getting 2 full days of expert insights and strategies that will change the way you invest—this offer is available for a limited time only.",
    },
  ];

  return (
    <>
      {/* 🔹 White Separator Line */}
      <div
        className="w-full h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(255,255,255,0.8), transparent)",
          boxShadow: "0 0 8px rgba(255,255,255,0.4)",
          opacity: 0.9,
        }}
      />

      <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
        {/* soft accents */}
        <div
          className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.yellow}55` }}
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${COLORS.orange}44` }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center md:mb-10"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: COLORS.cream }}
            >
              Still Have Questions?
            </h2>
            <div
              className="mx-auto mt-3 h-[3px] w-24 rounded-full"
              style={{ backgroundColor: COLORS.orange }}
            />
            <p className="mt-3 text-sm sm:text-base font-medium" style={{ color: COLORS.yellow }}>
              We're here to help you decide with clarity.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-2xl border px-5 sm:px-6 py-1"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  <AccordionTrigger
                    className="text-left text-base sm:text-lg font-extrabold"
                    style={{ color: COLORS.cream }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="pb-4 text-[15px] sm:text-base leading-relaxed"
                    style={{ color: COLORS.cream, opacity: 0.95 }}
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
