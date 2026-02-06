import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { useEffect , useRef } from "react";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

const WA_GROUP_LINK = "http://go.aarzooshah.com/whatsapp"; // 🔗 replace with real link

export default function ThankYou() {

  const fired = useRef(false);

  useFacebookPixel();

  useEffect(() => {
    fired.current = true; // prevent re-firing if the component re-renders
  }, []);

  
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `radial-gradient(circle at top, ${COLORS.navy}, #021E3D)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-md w-full text-center bg-[#ffffff08] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md"
      >
        {/* ✅ Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#ffffff14]">
            <CheckCircle2
              className="h-10 w-10"
              style={{ color: COLORS.yellow }}
            />
          </div>
        </div>

        {/* ✅ Heading */}
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-3"
          style={{ color: COLORS.cream }}
        >
          Thank You For Registering!
        </h1>

        {/* ✅ Subtext */}
        <p
          className="text-base leading-relaxed mb-6"
          style={{ color: COLORS.cream, opacity: 0.9 }}
        >
          <span style={{ color: COLORS.redOrange, fontWeight: 600 }}>
            Wait, your registration is incomplete...
          </span>{" "}
          Join the WhatsApp group below to receive updates, reminders, and
          access details for the{" "}
          <span style={{ color: COLORS.yellow, fontWeight: 600 }}>
            Smart Wealth Blueprint Masterclass
          </span>
          .
        </p>

        {/* ✅ WhatsApp CTA */}
        <motion.a
          href={WA_GROUP_LINK}
          target="_self"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 text-lg font-semibold rounded-full px-6 py-3 w-full sm:w-auto"
          style={{
            background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.orange})`,
            color: "#111",
            boxShadow: "0 4px 15px rgba(243, 211, 91, 0.3)",
          }}
        >
          <MessageSquare className="h-5 w-5" />
          Join WhatsApp Group
        </motion.a>
      </motion.div>
    </section>
  );
}
