import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/** Palette */
const COLORS = {
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
  red: "#bb3618ff",
};

/** Google Sheet (published) -> CSV for specific gid */
const PUB_HTML =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pubhtml#gid=2093861631";

const CSV_URLS = [
  PUB_HTML.replace(
    "pubhtml#gid=2093861631",
    "pub?gid=2093861631&single=true&output=csv"
  ),
  PUB_HTML.replace("pubhtml", "pub?output=csv"),
];

/** ✅ Razorpay Page */
const RZP_PAGE_URL = "https://pages.razorpay.com/pl_RYq2EEaLYQcOyK/view";

/** ✅ Webhook */
const WEBHOOK_URL = "https://offbeatn8n.coachswastik.com/webhook/aarzoo-form";

/** ✅ UTM storage key */
const UTM_KEY = "lead_utms";

/** Motion */
const sectionContainer: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const leftCol: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const rightCol: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
};
const line: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

/** helpers */
function cleanText(s: string) {
  return s.replace(/\u200D|\uFE0F|\u2069|\u2066|\u2068|\u2067/g, "").trim();
}

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
      if (ch === '"') inQuotes = true;
      else if (ch === ",") {
        row.push(cleanText(cell));
        cell = "";
      } else if (ch === "\n") {
        row.push(cleanText(cell));
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch !== "\r") cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cleanText(cell));
    rows.push(row);
  }
  return rows.filter((r) => r.length && r.some((c) => c !== ""));
}

/** ✅ capture & persist UTMs (URL → localStorage fallback) */
function getUTMs() {
  const empty = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    fclid: "",
  };

  if (typeof window === "undefined") return empty;

  const params = new URLSearchParams(window.location.search);

  const fromUrl = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fclid: params.get("fclid") || "",
  };

  const saved = localStorage.getItem(UTM_KEY);

  const hasAny =
    !!fromUrl.utm_source ||
    !!fromUrl.utm_medium ||
    !!fromUrl.utm_campaign ||
    !!fromUrl.utm_content ||
    !!fromUrl.utm_term ||
    !!fromUrl.fclid;

  if (!saved && hasAny) localStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));

  try {
    const stored = saved ? JSON.parse(saved) : {};
    return {
      utm_source: fromUrl.utm_source || stored.utm_source || "",
      utm_medium: fromUrl.utm_medium || stored.utm_medium || "",
      utm_campaign: fromUrl.utm_campaign || stored.utm_campaign || "",
      utm_content: fromUrl.utm_content || stored.utm_content || "",
      utm_term: fromUrl.utm_term || stored.utm_term || "",
      fclid: fromUrl.fclid || stored.fclid || "",
    };
  } catch {
    return fromUrl;
  }
}

const Hero = () => {
  const [dateText, setDateText] = useState<string>("Loading…");
  const HERO_MOBILE = "/AarzooMob.webp";
  const HERO_DESKTOP = "/AarzooDesk.webp";

  // ✅ Form state
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
  });

  // ✅ capture UTMs once on load
  useEffect(() => {
    getUTMs();
  }, []);

  // ✅ date from sheet
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const url of CSV_URLS) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) continue;

          const rows = parseCsv(await res.text());
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
          // try next
        }
      }
      if (!cancelled) setDateText("Date TBA");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /** ✅ Build Razorpay URL with name/email/phone + UTMs */
  const buildPayUrl = () => {
    const attribution = getUTMs();
    const qs =
      `?name=${encodeURIComponent(form.fullName)}` +
      `&email=${encodeURIComponent(form.email)}` +
      `&phone=${encodeURIComponent(form.phone)}` +
      `&utm_source=${encodeURIComponent(attribution.utm_source)}` +
      `&utm_medium=${encodeURIComponent(attribution.utm_medium)}` +
      `&utm_campaign=${encodeURIComponent(attribution.utm_campaign)}` +
      `&utm_content=${encodeURIComponent(attribution.utm_content)}` +
      `&utm_term=${encodeURIComponent(attribution.utm_term)}` +
      `&fclid=${encodeURIComponent(attribution.fclid)}`;

    return `${RZP_PAGE_URL}${qs}`;
  };

  /** ✅ Form submit → send to webhook → redirect to Razorpay */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const attribution = getUTMs();

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      profession: form.profession,
      ...attribution,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      ts: new Date().toISOString(),
    };

    // optional tracking
    try {
      if (window.fbq) {
        window.fbq("track", "Lead", {
          value: 99,
          currency: "INR",
          content_name: "Money Masterclass",
        });
      }
    } catch {
      // ignore
    }

    // ✅ send to webhook (don’t block redirect if it fails)
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (err) {
      console.error("Webhook failed:", err);
    }

    // ✅ redirect
    window.location.href = buildPayUrl();
  };

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
            className="font-extrabold leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[38rem] mx-auto lg:mx-0"
            style={{ color: COLORS.red }}
          >
            Build Your Personal Financial Roadmap:<br/> A Step-By-Step Masterclass on Wealth Planning
          </h1>

          <motion.p
            variants={line}
            className="max-w-xl text-[0.95rem] sm:text-base md:text-lg mx-auto lg:mx-0"
            style={{ color: `${COLORS.navy}CC` }}
          >
            <span className="font-semibold" style={{ color: COLORS.navy }}>
              Join Aarzoo Shah’s 2-Day Masterclass to understand how to make your savings work
              smarter.
            </span>
          </motion.p>

          <p className="font-base text-red-900 text-xs">
            *Educational content only. This is not financial or investment advice.
          </p>
        </motion.div>

        {/* Date/Time + CTA */}
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

          {/* ✅ CTA scroll to form */}
          <div className="flex justify-center">
          <a
  href="#register"
  onClick={() => {
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        value: 99,
        currency: "INR",
        content_ids: ["money-Masterclass"],
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

          </div>
        </motion.div>

        {/* ✅ Form */}
        <motion.div variants={leftCol} className="lg:col-start-1 lg:row-start-3">
          <div className="rounded-3xl border border-black/10 shadow-[0_14px_30px_rgba(0,0,0,0.12)] bg-[#f5b976] p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-6">
              Fill Your Details
            </h3>

            <form onSubmit={onSubmit} className="space-y-5" id="register">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full h-12 rounded-2xl border border-black/15 bg-white px-4 outline-none
                             focus:border-black/30 focus:ring-4 focus:ring-black/5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="w-full h-12 rounded-2xl border border-black/15 bg-white px-4 outline-none
                               focus:border-black/30 focus:ring-4 focus:ring-black/5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    required
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        phone: e.target.value.replace(/[^\d]/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="9876543210"
                    className="w-full h-12 rounded-2xl border border-black/15 bg-white px-4 outline-none
                               focus:border-black/30 focus:ring-4 focus:ring-black/5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Profession *</label>
                <select
                  required
                  value={form.profession}
                  onChange={(e) => setForm((p) => ({ ...p, profession: e.target.value }))}
                  className="w-full h-12 rounded-2xl border border-black/15 bg-white px-4 outline-none
                             focus:border-black/30 focus:ring-4 focus:ring-black/5"
                >
                  <option value="" disabled>
                    Select your profession
                  </option>
                  <option value="Business Owner / Entrepreneur">
                    Business Owner / Entrepreneur
                  </option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Freelancer / Self-Employed">Freelancer / Self-Employed</option>
                  <option value="Student / Recent Graduate">Student / Recent Graduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-2xl font-extrabold text-white bg-[#3E646E]
                           shadow-[0_6px_0_rgba(0,0,0,0.12)]
                           hover:brightness-105 active:translate-y-[1px]
                           transition disabled:opacity-60 disabled:shadow-none"
              >
                {submitting ? "Submitting..." : "Register For Just ₹99"}
              </button>
            </form>
          </div>
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
                <h3
                  className="text-base sm:text-lg md:text-xl font-extrabold"
                  style={{ color: COLORS.redOrange }}
                >
                  Aarzoo Shah
                </h3>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  Entrepreneur • Writer • Speaker • Coach • ChangeMaker
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second CTA – mobile only (also scroll) */}
        <div className="flex justify-center lg:hidden">
          <a
            href="#register"
            onClick={() => {
              if (window.fbq) {
                window.fbq("track", "AddToCart", {
                  value: 99,
                  currency: "INR",
                  content_ids: ["money-Masterclass"],
                });
              }
            }}
            className="relative inline-flex items-center justify-center rounded-full px-6 py-4 text-sm sm:text-base md:text-lg font-bold text-white
                       shadow-[0_5px_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5 focus:outline-none bg-[#3E646E]"
            
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
          </a>
        </div>
      </motion.div>

      {/* Press Logos – Infinite Scroll */}
      <div className="w-full overflow-hidden py-7 mt-10 border-t-2 border-black">
        <h3
          className="text-center text-base sm:text-lg font-semibold tracking-wider mb-4"
          style={{ color: "#000000ff" }}
        >
          Featured On
        </h3>

        <div className="relative">
          <div className="marquee-track">
            <div className="marquee-content">
              {[
                "/logos/forbes.png",
                "/logos/tedx.png",
                "/logos/ndtv.png",
                "/logos/hindustan.png",
                "/logos/indianexpress.png",
                "/logos/abp.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Featured Logo"
                  className="h-8 sm:h-10 opacity-90 object-contain"
                  loading="lazy"
                />
              ))}
            </div>

            <div className="marquee-content" aria-hidden="true">
              {[
                "/logos/forbes.png",
                "/logos/tedx.png",
                "/logos/ndtv.png",
                "/logos/hindustan.png",
                "/logos/indianexpress.png",
                "/logos/abp.png",
              ].map((src, i) => (
                <img
                  key={`dup-${i}`}
                  src={src}
                  alt=""
                  className="h-8 sm:h-10 opacity-90 object-contain"
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #EEEAD3, transparent 15%, transparent 85%, #EEEAD3)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
