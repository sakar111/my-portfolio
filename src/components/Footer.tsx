import React, { useEffect, useRef, useState } from "react";

/** Injected by vite.config.ts at build time. */
declare const __BUILD_DATE__: string;

/* ─────────── Reusable-rocket hop: takes off from one pad, lands on the other, and back ───────────
 * Pure CSS transform/opacity animations (GPU-friendly). Pauses when off-screen.
 * Keyframes live in index.css (.rk-*).
 */

const Rocket: React.FC = () => (
  <svg viewBox="0 0 40 100" width="30" height="75" aria-hidden="true" className="block overflow-visible">
    {/* legs */}
    <path d="M12 74 L3 96 M28 74 L37 96" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
    <path d="M0 96 H7 M33 96 H40" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
    {/* fins */}
    <path d="M10 62 L2 80 L10 78Z M30 62 L38 80 L30 78Z" fill="#dc2626" />
    {/* body */}
    <rect x="10" y="22" width="20" height="60" rx="4" fill="#e5e7eb" stroke="#9ca3af" />
    <rect x="10" y="56" width="20" height="5" fill="#149ddd" />
    {/* nose */}
    <path d="M10 24 Q20 -4 30 24Z" fill="#dc2626" />
    {/* window */}
    <circle cx="20" cy="38" r="5" fill="#bae6fd" stroke="#149ddd" strokeWidth="2" />
    {/* nozzle */}
    <path d="M14 82 H26 L24 88 H16Z" fill="#4b5563" />
  </svg>
);

const RocketScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rk-scene relative h-72 overflow-hidden bg-gradient-to-b from-white to-gray-100 ${visible ? "" : "rk-paused"}`}
      aria-hidden="true"
    >
      {/* landing pads */}
      {["20%", "80%"].map((left) => (
        <div key={left} className="absolute bottom-10 -translate-x-1/2" style={{ left }}>
          <div className="w-20 h-1.5 rounded-t bg-gray-500" />
        </div>
      ))}

      {/* smoke at each pad (liftoff / touchdown) */}
      <div className="absolute bottom-10 -translate-x-1/2" style={{ left: "20%" }}>
        <span className="rk-puff rk-puff-l" />
      </div>
      <div className="absolute bottom-10 -translate-x-1/2" style={{ left: "80%" }}>
        <span className="rk-puff rk-puff-r" />
      </div>

      {/* rocket: starts on the left pad */}
      <div className="absolute bottom-[46px]" style={{ left: "20%" }}>
        <div className="-translate-x-1/2">
          <div className="rk-hop relative">
            <div className="rk-flame-gate absolute left-1/2 top-[64px] -translate-x-1/2">
              <div className="rk-flame w-3 h-7 rounded-full bg-gradient-to-b from-yellow-300 via-orange-500 to-red-500/0" />
            </div>
            <Rocket />
          </div>
        </div>
      </div>

      {/* ground */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gray-300" />
    </div>
  );
};

/* ─────────── Plain contact line ─────────── */

const contacts = [
  { label: "sakar.pathak111@gmail.com", href: "mailto:sakar.pathak111@gmail.com" },
  { label: "+1 (775) 223-5742", href: "tel:+17752235742" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sakar-pathak" },
  { label: "GitHub", href: "https://github.com/sakar111" },
  { label: "Resume", href: "/SakarPathak_CV.pdf" },
];

const Footer: React.FC = () => (
  <footer>
    <RocketScene />
    <div id="contact" className="bg-gray-300 px-[5%] pb-6 -mt-px">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-Roboto text-sm text-gray-700">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") || c.href.endsWith(".pdf") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="hover:text-[#149ddd] transition-colors"
            >
              {c.label}
            </a>
          ))}
        </nav>
        <span className="text-gray-500">
          © {new Date().getFullYear()} Sakar Pathak · Last updated {__BUILD_DATE__}
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
