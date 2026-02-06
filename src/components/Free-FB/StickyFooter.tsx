import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  yellow: "#F3D35B",
  orange: "#EA924D",
};

const DURATION_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = "stickyTimerEndAt";

function getOrCreateDeadline(): number {
  const saved = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (saved) {
    const endAt = parseInt(saved, 10);
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

  useEffect(() => {
    tickRef.current = window.setInterval(() => setNow(Date.now()), 250) as unknown as number;
    return () => tickRef.current && clearInterval(tickRef.current);
  }, []);

  const msLeft = useMemo(() => endAt - now, [endAt, now]);

  useEffect(() => {
    if (msLeft <= 0) {
      const newEnd = Date.now() + DURATION_MS;
      localStorage.setItem(STORAGE_KEY, String(newEnd));
      setEndAt(newEnd);
    }
  }, [msLeft]);

  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#3E646E]"
      
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        {/* ✅ Horizontal layout */}
        <div className="flex items-center justify-between gap-3">
          {/* Timer + Price */}
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-white">
                Ends in
              </span>

              {/* ✅ Blinking timer */}
              <span
                className="font-mono font-extrabold tracking-[0.14em] text-white"
                style={{
                  fontSize: "20px",
                  animation: "timerBlink 1s infinite",
                }}
              >
                {formatTime(msLeft)}
              </span>
            </div>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-extrabold text-white text-[15px]">
                Free
              </span>
              <span className="text-[12px] text-white line-through font-semibold">
                ₹299
              </span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#register"
              onClick={() => {
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        content_ids: ["money-Masterclass"],
      });
    }
  }}
            className="relative inline-flex items-center justify-center rounded-full
                       px-5 py-2.5 font-extrabold text-[13px] text-black
                       transition-transform hover:-translate-y-0.5 active:translate-y-[1px]"
            style={{
              background: "#fff",
              boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
              textDecoration: "none",
            }}
          >
            Register For Free
          </a>
        </div>
      </div>

      <style>{`
        @keyframes timerBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </motion.div>
  );
};

export default StickyFooter;
