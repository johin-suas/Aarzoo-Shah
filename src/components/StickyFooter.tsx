import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StickyFooterProps {
  onCTAClick: () => void;
}

const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

// 15-minute countdown
const DURATION_MS = 15 * 60 * 1000;
const STORAGE_KEY = "stickyTimerEndAt";

function formatTime(msLeft: number): string {
  const total = Math.max(0, Math.floor(msLeft / 1000));
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

const StickyFooter = ({ onCTAClick }: StickyFooterProps) => {
  const [mounted, setMounted] = useState(false);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const intervalRef = useRef<number | null>(null);

  /** Defer mount slightly & guard window for SSR */
  useEffect(() => {
    let timeoutId: number | null = null;

    if (typeof window !== "undefined") {
      const w = window as any;
      if ("requestIdleCallback" in w) {
        w.requestIdleCallback?.(() => setMounted(true), { timeout: 600 });
      } else {
        timeoutId = w.setTimeout(() => setMounted(true), 600) as unknown as number;
      }
    } else {
      // SSR / no window – just mark mounted after a small delay
      timeoutId = setTimeout(() => setMounted(true), 600) as unknown as number;
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  /** Initialise / restore deadline once we’re mounted (browser only) */
  useEffect(() => {
    if (!mounted) return;

    const nowTs = Date.now();
    let newEndAt: number;

    if (typeof window !== "undefined" && "localStorage" in window) {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (Number.isFinite(parsed) && parsed > nowTs) {
          newEndAt = parsed;
        } else {
          newEndAt = nowTs + DURATION_MS;
          window.localStorage.setItem(STORAGE_KEY, String(newEndAt));
        }
      } else {
        newEndAt = nowTs + DURATION_MS;
        window.localStorage.setItem(STORAGE_KEY, String(newEndAt));
      }
    } else {
      newEndAt = nowTs + DURATION_MS;
    }

    setEndAt(newEndAt);
  }, [mounted]);

  /** Tick the timer */
  useEffect(() => {
    if (!mounted || endAt == null) return;

    const id = window.setInterval(() => {
      setNow(Date.now());
    }, 250) as unknown as number;

    intervalRef.current = id;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mounted, endAt]);

  const msLeft = useMemo(
    () => (endAt != null ? endAt - now : DURATION_MS),
    [endAt, now]
  );

  /** When timer finishes, start a new window */
  useEffect(() => {
    if (!mounted || endAt == null) return;
    if (msLeft <= 0) {
      const nowTs = Date.now();
      const newEndAt = nowTs + DURATION_MS;
      if (typeof window !== "undefined" && "localStorage" in window) {
        window.localStorage.setItem(STORAGE_KEY, String(newEndAt));
      }
      setEndAt(newEndAt);
    }
  }, [msLeft, mounted, endAt]);

  // Don’t render until we’re mounted & have a deadline
  if (!mounted || endAt == null) return null;

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
              if (typeof window !== "undefined") {
                const w = window as any;
                if (w.fbq) {
                  w.fbq("track", "AddToCart", {
                    value: 99,
                    currency: "INR",
                    content_ids: ["ai-trading-Masterclass"],
                  });
                }
                window.open("https://rzp.io/rzp/DBp63xai", "_self");
              }
              onCTAClick?.();
            }}
            size="lg"
            className="text-black font-montserrat font-bold rounded-full shadow-lg px-6"
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
