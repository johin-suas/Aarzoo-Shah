import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";


/** Palette */
const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

/** Google Sheet (published) -> CSV for specific gid */
const PUB_HTML =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pubhtml#gid=2093861631";

// Prefer exact gid CSV, fall back to generic CSV if needed
const CSV_URLS = [
  PUB_HTML.replace("pubhtml#gid=2093861631", "pub?gid=2093861631&single=true&output=csv"),
  PUB_HTML.replace("pubhtml", "pub?output=csv"),
];

/** Motion variants */
const sectionContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};
const leftCol: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const rightCol: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 } },
};
const line: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
};

/** tiny helpers */
function cleanText(s: string) {
  return s.replace(/\u200D|\uFE0F|\u2069|\u2066|\u2068|\u2067/g, "").trim();
}
// minimal CSV parser that handles quoted cells with commas
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cleanText(cell));
        cell = "";
      } else if (ch === "\n") {
        row.push(cleanText(cell));
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch === "\r") {
        // ignore
      } else {
        cell += ch;
      }
    }
  }
  // last cell
  if (cell.length || row.length) {
    row.push(cleanText(cell));
    rows.push(row);
  }
  return rows.filter((r) => r.length && r.some((c) => c !== ""));
}

const Hero = () => {
  const [dateText, setDateText] = useState<string>("Loading…");
  const HERO_MOBILE = "/AarzooMob.webp";
  const HERO_DESKTOP = "/AarzooDesk.webp";

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (const url of CSV_URLS) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) continue;
          const csv = await res.text();
          const rows = parseCsv(csv);

          // Expect a header row with "Date" and "Time"
          // Then first data row contains the values we want.
          if (rows.length >= 2) {
            const header = rows[0].map((h) => h.toLowerCase());
            const data = rows[1];

            const dateIdx = header.findIndex((h) => h.includes("date"));
            const parsedDate =
              dateIdx >= 0 && data[dateIdx] ? cleanText(data[dateIdx]) : "Date TBA";

            if (!cancelled) setDateText(parsedDate);
            return;
          }
        } catch {
          // try next URL
        }
      }
      if (!cancelled) setDateText("Date TBA");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      {/* subtle blobs */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.yellow, opacity: 0.3 }}
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: COLORS.orange, opacity: 0.22 }}
      />

      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-8 sm:gap-8 sm:py-10 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-10"
      >
        {/* Headline */}
        <motion.div
          variants={leftCol}
          className="space-y-3 sm:space-y-4 lg:col-start-1 lg:row-start-1 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1
            className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[38rem] mx-auto lg:mx-0"
            style={{ color: COLORS.navy }}
          >
            <motion.span variants={line} className="block">
              Frustrated With <br />
              <span style={{ color: COLORS.redOrange }}>Unclear Financial Growth?</span>
            </motion.span>
          </h1>

          <h3
            className="font-extrabold leading-tight text-xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[42rem] mx-auto lg:mx-0"
            style={{ color: COLORS.navy }}
          >
            <motion.span variants={line} className="block">
              Discover <span style={{ color: COLORS.orange }}>Smart Money Practice</span>
            </motion.span>
            <motion.span variants={line} className="block">
            in Just <span style={{ color: COLORS.orange }}>2 Days</span>
            </motion.span>
          </h3>

          <motion.p
            variants={line}
            className="max-w-xl text-[0.95rem] sm:text-base md:text-lg mx-auto lg:mx-0"
            style={{ color: `${COLORS.navy}CC` }}
          >
            <span className="font-semibold" style={{ color: COLORS.redOrange }}>
              Join Aarzoo Shah’s 2-Day Masterclass 
            </span>{" "}
            to understand how to make your savings work
smarter through structured diversification and informed financial planning — without tips,
hype, or guarantees.
          </motion.p>
          <p className="font-base text-red-900 text-xs">" Educational content only. This is not financial or investment advice. "</p>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={rightCol}
          className="relative flex justify-center lg:justify-end lg:col-start-2 lg:row-span-2 lg:row-start-1"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            <img
  src={HERO_DESKTOP}
  srcSet={`${HERO_MOBILE} 768w, ${HERO_DESKTOP} 1200w`}
  sizes="(max-width: 768px) 92vw, 48vw"
  alt="Aarzoo Shah"
  className="rounded-xl sm:rounded-2xl object-cover w-full"
  width={480}
  height={640}
  loading="eager"
  fetchPriority="high"
/>

            <div className="mt-3 lg:mt-0">
              <div
                className="lg:absolute lg:-bottom-8 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[min(92vw,360px)] rounded-lg sm:rounded-xl border bg-white px-4 py-2.5 sm:px-6 sm:py-3 text-center shadow-sm"
                style={{ borderColor: `${COLORS.navy}22`, color: COLORS.navy }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-extrabold" style={{ color: COLORS.redOrange }}>
                  Aarzoo Shah
                </h3>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  Entrepreneur • Writer • Speaker • Coach • ChangeMaker
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards + CTA */}
        <motion.div variants={leftCol} className="space-y-4 lg:col-start-1 lg:row-start-2">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              variants={cardIn}
              className="flex items-center gap-3 rounded-lg sm:rounded-xl border bg-white px-3 py-2.5 sm:px-5 sm:py-3 shadow-sm"
              style={{ borderColor: `${COLORS.navy}22`, color: COLORS.navy }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md sm:h-10 sm:w-10"
                style={{ backgroundColor: COLORS.yellow }}
              >
                <CalendarDays className="h-5 w-5 text-[#111]" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold opacity-70">Date</p>
                <p className="text-xs sm:text-sm font-bold">{dateText}</p>
              </div>
            </motion.div>

            <motion.div
              variants={cardIn}
              className="flex items-center gap-3 rounded-lg sm:rounded-xl border bg-white px-3 py-2.5 sm:px-5 sm:py-3 shadow-sm"
              style={{ borderColor: `${COLORS.navy}22`, color: COLORS.navy }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-md sm:h-10 sm:w-10"
                style={{ backgroundColor: COLORS.yellow }}
              >
                <Clock className="h-5 w-5 text-[#111]" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold opacity-70">Time</p>
                <p className="text-xs sm:text-sm font-bold">8:00 PM – 10:00 PM</p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
  window.open("https://rzp.io/rzp/O3e94Np9", "_self");
}}
              className="relative inline-block rounded-full px-6 py-3 text-sm sm:text-base md:text-lg font-bold text-[#111]
                         shadow-[0_5px_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5 focus:outline-none"
              style={{ background: `linear-gradient(90deg, ${COLORS.yellow}, ${COLORS.orange})` }}
            >
              <span>Get Access at ₹99</span>
              <motion.span
                aria-hidden
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%)",
                  mixBlendMode: "overlay",
                }}
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
