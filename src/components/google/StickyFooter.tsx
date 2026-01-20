import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};
// How long the timer should run (in ms)
const DURATION_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "stickyTimerEndAt";

function getOrCreateDeadline(): number {
  const saved = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (saved) {
    const endAt = parseInt(saved, 10);
    // If expired, start a fresh window
    if (Number.isFinite(endAt) && endAt > now) return endAt;
  }
  const endAt = now + DURATION_MS;
  localStorage.setItem(STORAGE_KEY, String(endAt));
  return endAt;
}

function formatTime(msLeft: number): string {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

const StickyFooter = () => {
  const [endAt, setEndAt] = useState<number>(() => getOrCreateDeadline());
  const [now, setNow] = useState<number>(Date.now());
  const tickRef = useRef<number | null>(null);

  // tick every 250ms for smooth countdown
  useEffect(() => {
    tickRef.current = window.setInterval(() => setNow(Date.now()), 250) as unknown as number;
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  const msLeft = useMemo(() => endAt - now, [endAt, now]);

  // when timer finishes, start a new 15m window
  useEffect(() => {
    if (msLeft <= 0) {
      const newEnd = Date.now() + DURATION_MS;
      localStorage.setItem(STORAGE_KEY, String(newEnd));
      setEndAt(newEnd);
    }
  }, [msLeft]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-2xl z-50 md:hidden"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Price + Timer */}
          <div className="flex items-center gap-4">
            <div className="leading-tight">
              <p className="font-montserrat font-extrabold text-2xl text-[#A43920]">
                ₹99{" "}
                <span className="ml-2 align-middle text-lg text-muted-foreground line-through">
                  ₹299
                </span>
              </p>
              {/* Countdown */}
              <p className="text-sm font-semibold text-[#A43920]">
                Offer ends in{" "}
                <span className="inline-block rounded-md bg-[#A43920]/10 px-2 py-[2px] font-mono">
                  {formatTime(msLeft)}
                </span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => {
  window.open("https://rzp.io/rzp/O3e94Np9", "_self");
}}
            size="lg"
            className=" text-black  font-montserrat font-bold rounded-full shadow-lg px-6"
             style={{
              background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.orange})`,
              border: `1px solid ${COLORS.orange}`,
            }}
          >
            Register For Just ₹99{" "}
            <span className="ml-2 text-sm opacity-70 line-through">₹299</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyFooter;
