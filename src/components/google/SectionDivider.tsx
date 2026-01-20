const COLORS = {
  white: "#FFFFFF",
  navy: "#0B3E77",
  cream: "#EEEAD3",
  yellow: "#F3D35B",
  orange: "#EA924D",
  redOrange: "#F5543A",
};

export const SectionDivider = () => (
  <div
    className="w-full h-[2px] my-12 md:my-16 rounded-full relative overflow-hidden"
    style={{
      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(255,255,255,0.6), transparent)`,
      boxShadow: "0 0 10px rgba(255,255,255,0.4)",
      opacity: 0.8,
    }}
  />
);
