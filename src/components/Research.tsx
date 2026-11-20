import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiBug, BiCamera, BiVideo, BiX, BiChevronDown, BiZoomIn, BiZoomOut, BiExpandAlt, BiMove } from "react-icons/bi";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import Section from "./Section";
import {
  featuredProjects,
  researchLab,
  type BoardView,
  type FeaturedProject,
  type Media,
} from "../assets/research";

const isDev = import.meta.env.DEV;

/** null = still checking, true = file exists, false = missing */
function useImageOk(src?: string) {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => setOk(true);
    img.onerror = () => setOk(false);
    img.src = src;
  }, [src]);
  return src ? ok : false;
}

/* ─────────────────────────── Media with graceful fallback ─────────────────────────── */

const DevPlaceholder: React.FC<{ media: Media }> = ({ media }) => (
  <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center gap-1 p-3 text-center border-2 border-dashed border-amber-400 bg-amber-50 text-amber-900 rounded-lg">
    {media.type === "video" ? <BiVideo size={22} /> : <BiCamera size={22} />}
    <span className="text-xs font-semibold">{media.shot ?? media.caption}</span>
    <code className="text-[10px] break-all opacity-70">public{media.src}</code>
  </div>
);

/**
 * Hero media. If the file doesn't exist, shows `fallback` (the animated illustration).
 */
const HeroMedia: React.FC<{
  media: Media;
  fallback: React.ReactNode;
  onOpen: (m: Media) => void;
}> = ({ media, fallback, onOpen }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  const cls = "absolute inset-0 w-full h-full object-cover cursor-zoom-in";
  return media.type === "video" ? (
    <video
      className={cls}
      src={media.src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
      onClick={() => onOpen(media)}
      aria-label={media.caption}
    />
  ) : (
    <img
      className={cls}
      src={media.src}
      alt={media.caption}
      onError={() => setFailed(true)}
      onClick={() => onOpen(media)}
    />
  );
};

/**
 * A captioned figure. Missing file → dashed placeholder in dev, removed entirely
 * (caption too) in production so the live site never looks unfinished.
 */
const Figure: React.FC<{
  media: Media;
  onOpen: (m: Media) => void;
  /** "cover" crops to fill a 4:3 tile; "contain" shows the whole image in a square tile. */
  fit?: "cover" | "contain";
  /** square tile (used for the board-design row so all three line up) */
  square?: boolean;
}> = ({ media, onOpen, fit = "cover", square = false }) => {
  const [failed, setFailed] = useState(false);
  if (failed && !isDev) return null;

  const wide = media.wide && !failed;
  const cls = wide
    ? "w-full h-auto cursor-zoom-in"
    : `w-full h-full ${fit === "contain" ? "object-contain" : "object-cover hover:scale-[1.03]"} cursor-zoom-in transition-transform duration-500`;
  const box = wide ? "" : fit === "contain" || square ? "aspect-square" : "aspect-[4/3]";
  return (
    <figure className={`flex flex-col gap-1.5 ${media.wide ? "col-span-2" : ""}`}>
      <div className={`${box} rounded-lg overflow-hidden bg-gray-100 border border-gray-200`}>
        {failed ? (
          <DevPlaceholder media={media} />
        ) : media.type === "video" ? (
          <video
            className={cls}
            src={media.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            onClick={() => onOpen(media)}
            aria-label={media.caption}
          />
        ) : (
          <img
            className={cls}
            src={media.src}
            alt={media.caption}
            loading="lazy"
            onError={() => setFailed(true)}
            onClick={() => onOpen(media)}
          />
        )}
      </div>
      <figcaption className="font-Roboto text-xs text-gray-600">{media.caption}</figcaption>
    </figure>
  );
};

/* ─────────────────────────── Hero illustrations ─────────────────────────── */

type Box = { x: number; y: number; w: number; h: number };

/** Uses the real-photo cut-out if it exists, otherwise draws a vector stand-in. */
const Cutout: React.FC<{
  src?: string;
  box: Box;
  vector: React.ReactNode;
}> = ({ src, box, vector }) => {
  const ok = useImageOk(src);
  if (ok && src)
    return (
      <image
        href={src}
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        preserveAspectRatio="xMidYMid meet"
        filter="url(#cutShadow)"
      />
    );
  return <>{vector}</>;
};

const VectorBoard: React.FC<{ box: Box; label: string }> = ({ box: b, label }) => (
  <g>
    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="6" fill="#0f5132" stroke="#34d399" strokeOpacity=".6" />
    <rect x={b.x + 14} y={b.y + 14} width="30" height="30" rx="2" fill="#0b1220" />
    <rect x={b.x + 56} y={b.y + 14} width="34" height="16" rx="2" fill="#0b1220" />
    <rect x={b.x + 56} y={b.y + 36} width="22" height="10" rx="2" fill="#0b1220" />
    <circle cx={b.x + b.w - 18} cy={b.y + b.h - 16} r="5" fill="#fbbf24" className="art-led" />
    <text x={b.x + 14} y={b.y + b.h - 12} fill="#a7f3d0" fontSize="15" fontFamily="monospace" fontWeight="700">
      {label}
    </text>
  </g>
);

const VectorHydrophone: React.FC<{ box: Box }> = ({ box: b }) => {
  const cx = b.x + b.w / 2;
  return (
    <g>
      <rect x={cx - 4} y={b.y} width="8" height="22" fill="#1f2937" />
      <rect x={cx - 14} y={b.y + 20} width="28" height={b.h - 30} rx="12" fill="#111827" stroke="#38bdf8" strokeOpacity=".4" />
      <rect x={cx - 14} y={b.y + 40} width="28" height="5" fill="#38bdf8" opacity=".35" />
      <rect x={cx - 14} y={b.y + 52} width="28" height="5" fill="#38bdf8" opacity=".35" />
    </g>
  );
};

const ModemArt: React.FC<{ cutouts?: FeaturedProject["cutouts"] }> = ({ cutouts }) => {
  // Layout (viewBox 640×320 = the 2:1 hero box, so nothing is cropped):
  // boards sit on docks above the waterline, cables drop to the hydrophones,
  // sound crosses underwater TX → RX.
  const WL = 152; // waterline y
  const txBoard = { x: 72, y: 12, w: 126, h: 126 };
  const rxBoard = { x: 442, y: 12, w: 126, h: 126 };
  const txHydro = { x: 95, y: 182, w: 80, h: 100 };
  const rxHydro = { x: 465, y: 182, w: 80, h: 100 };
  const txC = txHydro.x + txHydro.w / 2;
  const rxC = rxHydro.x + rxHydro.w / 2;
  const pingY = 242;
  const surface =
    `M-40 ${WL} Q -20 ${WL - 8} 0 ${WL} ` +
    Array.from({ length: 17 }, (_, i) => `T ${40 * (i + 1)} ${WL}`).join(" ");

  return (
    <svg
      viewBox="0 0 640 320"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Transmitter and receiver boards above water, sending sound between two hydrophones"
    >
      <defs>
        <linearGradient id="air" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070f1a" />
          <stop offset="1" stopColor="#10243a" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c5a82" />
          <stop offset="1" stopColor="#03111f" />
        </linearGradient>
        <clipPath id="channel">
          <rect x={txC} y={WL + 2} width={rxC - txC} height={320 - WL} />
        </clipPath>
        <filter id="cutShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity=".6" />
        </filter>
      </defs>

      {/* air + water */}
      <rect width="640" height={WL + 4} fill="url(#air)" />
      <rect y={WL - 2} width="640" height={322 - WL} fill="url(#water)" />
      {/* light rays */}
      <polygon points={`230,${WL} 285,${WL} 215,320 140,320`} fill="#7dd3fc" opacity=".05" />
      <polygon points={`360,${WL} 410,${WL} 500,320 425,320`} fill="#7dd3fc" opacity=".05" />
      {/* surface */}
      <path d={surface} stroke="#7dd3fc" strokeOpacity=".5" strokeWidth="2" fill="none" className="art-surface" />
      {/* docks */}
      <rect x={txBoard.x - 22} y={WL - 14} width={txBoard.w + 44} height="8" rx="2" fill="#1e293b" />
      <rect x={rxBoard.x - 22} y={WL - 14} width={rxBoard.w + 44} height="8" rx="2" fill="#1e293b" />

      {/* cables */}
      <path d={`M${txBoard.x + 30} ${WL - 8} C ${txBoard.x + 30} ${WL + 14}, ${txC} ${WL + 8}, ${txC} ${txHydro.y + 4}`} stroke="#0b0f17" strokeWidth="3" fill="none" />
      <path d={`M${rxBoard.x + rxBoard.w - 30} ${WL - 8} C ${rxBoard.x + rxBoard.w - 30} ${WL + 14}, ${rxC} ${WL + 8}, ${rxC} ${rxHydro.y + 4}`} stroke="#0b0f17" strokeWidth="3" fill="none" />

      {/* acoustic pings */}
      <g clipPath="url(#channel)">
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={txC}
            cy={pingY}
            r="30"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            className="art-ping"
            style={{ animationDelay: `${i * 0.75}s` }}
          />
        ))}
      </g>
      {/* data waveform */}
      <path
        d={`M${txC + 32} ${pingY} q 10 -16 20 0 ` + Array.from({ length: 13 }, () => "t 20 0").join(" ")}
        stroke="#e0f2fe"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 8"
        className="art-dash"
        opacity=".75"
      />

      {/* bubbles */}
      {[
        { x: 150, d: 0 },
        { x: 320, d: 1.4 },
        { x: 500, d: 2.6 },
        { x: 260, d: 3.3 },
      ].map((b) => (
        <circle key={b.x} cx={b.x} cy="300" r="3" fill="#bae6fd" opacity=".5" className="art-bubble" style={{ animationDelay: `${b.d}s` }} />
      ))}

      {/* hardware: real photos if present, vectors otherwise */}
      <Cutout src={cutouts?.hydroTx} box={txHydro} vector={<VectorHydrophone box={txHydro} />} />
      <Cutout src={cutouts?.hydroRx} box={rxHydro} vector={<VectorHydrophone box={rxHydro} />} />
      <Cutout src={cutouts?.tx} box={txBoard} vector={<VectorBoard box={txBoard} label="TX" />} />
      <Cutout src={cutouts?.rx} box={rxBoard} vector={<VectorBoard box={rxBoard} label="RX" />} />

      {/* labels */}
      {[
        { x: txBoard.x + txBoard.w / 2, t: "TX" },
        { x: rxBoard.x + rxBoard.w / 2, t: "RX" },
      ].map((l) => (
        <text key={l.t} x={l.x} y={WL + 26} textAnchor="middle" fill="#bae6fd" opacity=".55" fontSize="11" fontFamily="Poppins, sans-serif" letterSpacing="3">
          {l.t}
        </text>
      ))}

      {/* seabed */}
      <path d="M0 300 Q 160 286 320 298 T 640 294 V320 H0Z" fill="#020a14" opacity=".85" />
    </svg>
  );
};

const DroneArt: React.FC = () => (
  <svg
    viewBox="0 0 640 360"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label="Illustration: quadcopter hovering and shining UV light onto the floor"
  >
    <defs>
      <radialGradient id="room" cx="50%" cy="85%" r="75%">
        <stop offset="0" stopColor="#2e1065" />
        <stop offset="1" stopColor="#05030f" />
      </radialGradient>
      <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#c4b5fd" stopOpacity=".55" />
        <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="spot" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#a78bfa" stopOpacity=".7" />
        <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="640" height="360" fill="url(#room)" />
    <g stroke="#a78bfa" strokeOpacity=".12">
      {[...Array(9)].map((_, i) => (
        <line key={i} x1={320 + (i - 4) * 40} y1="300" x2={320 + (i - 4) * 140} y2="360" />
      ))}
      <line x1="0" y1="300" x2="640" y2="300" />
      <line x1="0" y1="325" x2="640" y2="325" />
    </g>
    {[40, 600].map((x) => (
      <g key={x}>
        <rect x={x - 14} y="34" width="28" height="18" rx="3" fill="#1f1b2e" stroke="#4c1d95" />
        <circle cx={x} cy="43" r="5" fill="#ef4444" className="art-led" />
      </g>
    ))}
    <ellipse cx="320" cy="312" rx="150" ry="22" fill="url(#spot)" className="art-glow" />
    <g className="art-bob">
      <polygon points="285,178 355,178 450,310 190,310" fill="url(#cone)" className="art-glow" />
      <rect x="170" y="140" width="300" height="6" rx="3" fill="#2a2440" />
      {[180, 460].map((x) => (
        <g key={x}>
          <rect x={x - 9} y="128" width="18" height="14" rx="3" fill="#3b3456" />
          <ellipse cx={x} cy="126" rx="62" ry="4" fill="#c4b5fd" opacity=".35" className="art-prop" />
        </g>
      ))}
      {[245, 395].map((x) => (
        <g key={x} opacity=".55">
          <rect x={x - 7} y="122" width="14" height="10" rx="3" fill="#3b3456" />
          <ellipse cx={x} cy="120" rx="44" ry="3" fill="#c4b5fd" opacity=".3" className="art-prop" />
        </g>
      ))}
      <rect x="282" y="132" width="76" height="30" rx="8" fill="#1f1b2e" stroke="#6d28d9" />
      <circle cx="300" cy="147" r="3" fill="#22c55e" />
      <rect x="270" y="168" width="100" height="10" rx="5" fill="#ddd6fe" className="art-glow" />
      <rect x="306" y="162" width="4" height="8" fill="#3b3456" />
      <rect x="330" y="162" width="4" height="8" fill="#3b3456" />
    </g>
  </svg>
);

/* Dev-only hint listing which cut-outs are still missing. */
const CutoutHint: React.FC<{ cutouts: NonNullable<FeaturedProject["cutouts"]> }> = ({ cutouts }) => {
  const tx = useImageOk(cutouts.tx);
  const rx = useImageOk(cutouts.rx);
  const ht = useImageOk(cutouts.hydroTx);
  const hr = useImageOk(cutouts.hydroRx);
  const missing = [
    [tx, cutouts.tx],
    [rx, cutouts.rx],
    [ht, cutouts.hydroTx],
    [hr, cutouts.hydroRx],
  ].filter(([ok, src]) => src && ok === false);
  if (!isDev || missing.length === 0) return null;
  return (
    <div className="absolute bottom-2 left-2 z-10 text-[10px] bg-amber-300/95 text-amber-950 px-2 py-1 rounded leading-tight">
      Vector stand-ins shown. Drop transparent PNGs at:
      {missing.map(([, s]) => (
        <div key={String(s)}>public{String(s)}</div>
      ))}
    </div>
  );
};

/* ─────────────────────────── Lightbox ─────────────────────────── */

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Full-screen image viewer: zoom in/out (buttons, wheel, double-click), drag to pan. */
const ZoomViewer: React.FC<{ media: Media; onClose: () => void }> = ({ media, onClose }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ s: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ px: number; py: number; x: number; y: number; moved: boolean } | null>(null);

  /** Zoom by `factor`, keeping the point (cx, cy) (relative to the stage centre) fixed. */
  const zoomBy = useCallback((factor: number, cx = 0, cy = 0) => {
    setView((v) => {
      const s = clamp(v.s * factor, MIN_ZOOM, MAX_ZOOM);
      if (s === MIN_ZOOM) return { s, x: 0, y: 0 };
      const k = s / v.s;
      return { s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });
  }, []);
  const reset = useCallback(() => setView({ s: 1, x: 0, y: 0 }), []);

  // Wheel / trackpad pinch (ctrl+wheel) zooms the image, never the page.
  // Needs a non-passive native listener so preventDefault works.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const cx = e.clientX - r.left - r.width / 2;
      const cy = e.clientY - r.top - r.height / 2;
      zoomBy(Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015)), cx, cy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  // Keyboard: Esc close, +/- zoom, 0 reset. Lock page scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomBy(1.4);
      else if (e.key === "-") zoomBy(1 / 1.4);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, zoomBy, reset]);

  const zoomed = view.s > 1.01;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { px: e.clientX, py: e.clientY, x: view.x, y: view.y, moved: false };
    if (zoomed) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    if (zoomed) setView((v) => ({ ...v, x: d.x + dx, y: d.y + dy }));
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    // A plain click on the dark backdrop (not the image, not a drag) closes when not zoomed.
    if (d && !d.moved && !zoomed && e.target === e.currentTarget) onClose();
  };

  const btn =
    "w-10 h-10 flex items-center justify-center rounded-full text-white/85 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-default transition-colors";

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={media.caption}
    >
      <button
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white cursor-pointer"
        onClick={onClose}
        aria-label="Close"
      >
        <BiX size={32} />
      </button>

      {/* stage */}
      <div
        ref={stageRef}
        className={`relative flex-1 min-h-0 overflow-hidden flex items-center justify-center p-4 select-none touch-none ${
          zoomed ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => {
          if (zoomed) return reset();
          const r = e.currentTarget.getBoundingClientRect();
          zoomBy(2.5, e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
        }}
      >
        <img
          src={media.src}
          alt={media.caption}
          draggable={false}
          className="max-w-full max-h-full object-contain rounded-lg will-change-transform"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
            transition: dragging ? "none" : "transform 0.15s ease-out",
          }}
        />
      </div>

      {/* toolbar */}
      <div className="flex flex-col items-center gap-2 pb-4 px-4">
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur rounded-full px-2 py-1">
          <button className={btn} onClick={() => zoomBy(1 / 1.4)} disabled={!zoomed} aria-label="Zoom out" title="Zoom out (-)">
            <BiZoomOut size={22} />
          </button>
          <span className="w-14 text-center text-white/80 font-Roboto text-sm tabular-nums">
            {Math.round(view.s * 100)}%
          </span>
          <button className={btn} onClick={() => zoomBy(1.4)} disabled={view.s >= MAX_ZOOM} aria-label="Zoom in" title="Zoom in (+)">
            <BiZoomIn size={22} />
          </button>
          <button className={btn} onClick={reset} disabled={!zoomed} aria-label="Fit to screen" title="Fit to screen (0)">
            <BiExpandAlt size={20} />
          </button>
          <span
            className={`hidden sm:flex items-center gap-1 pl-2 pr-3 text-xs font-Roboto transition-opacity ${
              zoomed ? "text-white/70" : "text-white/30"
            }`}
          >
            <BiMove size={16} /> drag to pan
          </span>
        </div>
        <p className="text-white/75 font-Roboto text-sm text-center">{media.caption}</p>
      </div>
    </div>
  );
};

const Lightbox: React.FC<{ media: Media | null; onClose: () => void }> = ({ media, onClose }) => {
  useEffect(() => {
    if (!media || media.type !== "video") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [media, onClose]);

  if (!media) return null;
  // key gives every opened image a fresh zoom state
  if (media.type === "image") return <ZoomViewer key={media.src} media={media} onClose={onClose} />;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={media.caption}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
        onClick={onClose}
        aria-label="Close"
      >
        <BiX size={32} />
      </button>
      <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <video src={media.src} controls autoPlay loop className="w-full max-h-[80vh] rounded-lg" />
        <p className="text-white/80 font-Roboto text-sm mt-3 text-center">{media.caption}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────── PCB design: TX / RX toggle ─────────────────────────── */

const BoardViews: React.FC<{ views: BoardView[]; onOpen: (m: Media) => void }> = ({
  views,
  onOpen,
}) => {
  const [i, setI] = useState(0);
  const v = views[i];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-Raleway font-bold text-lg text-[#050d18]">Board design</h4>
        <div role="tablist" className="inline-flex rounded-full bg-gray-100 p-1 border border-gray-200">
          {views.map((b, idx) => (
            <button
              key={b.label}
              role="tab"
              aria-selected={idx === i}
              onClick={() => setI(idx)}
              className={`px-4 py-1.5 rounded-full font-Poppins text-sm transition-colors cursor-pointer ${
                idx === i ? "bg-[#149ddd] text-white shadow" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      {/* key forces a fresh mount so the switch fades in */}
      <div key={v.label} className="grid grid-cols-3 gap-4 max-w-3xl animate-fadeIn">
        <Figure media={v.layout} onOpen={onOpen} fit="contain" />
        <Figure media={v.render} onOpen={onOpen} fit="contain" />
        {v.photo && <Figure media={v.photo} onOpen={onOpen} square />}
      </div>
    </div>
  );
};

/* ─────────────────────────── Reusable gallery (used by project cards) ─────────────────────────── */

export const MediaGallery: React.FC<{ items: Media[] }> = ({ items }) => {
  const [open, setOpen] = useState<Media | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 grid-flow-row-dense">
        {items.map((m) => (
          <Figure key={m.src} media={m} onOpen={setOpen} />
        ))}
      </div>
      <Lightbox media={open} onClose={() => setOpen(null)} />
    </>
  );
};

/* ─────────────────────────── Project showcase ─────────────────────────── */

const ProjectShowcase: React.FC<{ p: FeaturedProject; onOpen: (m: Media) => void }> = ({
  p,
  onOpen,
}) => {
  const art = p.art === "modem" ? <ModemArt cutouts={p.cutouts} /> : <DroneArt />;

  return (
    <article
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
    >
      {/* Top: hero (left) beside the pitch (right) */}
      <div className="grid lg:grid-cols-5 lg:items-center">
        <div className="relative aspect-[2/1] lg:col-span-3 bg-[#040b14] overflow-hidden">
          {p.hero ? <HeroMedia media={p.hero} fallback={art} onOpen={onOpen} /> : art}
          {p.cutouts && <CutoutHint cutouts={p.cutouts} />}
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center gap-4 p-6 lg:p-8">
          <p className="description leading-relaxed">{p.summary}</p>
          <span className="self-start inline-flex items-center gap-2 text-xs font-Poppins font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {p.status}
          </span>

          {p.stats.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.stats.map((s) => (
              <span
                key={s}
                className="font-Poppins text-sm font-semibold text-[#050d18] bg-[#149ddd]/10 border border-[#149ddd]/30 px-3 py-1 rounded-md"
              >
                {s}
              </span>
            ))}
          </div>
          )}

          {p.stack && (
            <div>
            {p.stackLabel && (
              <p className="font-Poppins text-[11px] uppercase tracking-[0.15em] text-gray-500 mb-2">
                {p.stackLabel}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-Roboto text-xs text-gray-700">
              {p.stack.map((s, i) => (
                <React.Fragment key={s}>
                  <span className="bg-gray-100 border border-gray-200 px-2 py-1 rounded">{s}</span>
                  {i < p.stack!.length - 1 && <FiArrowRight className="text-gray-400" />}
                </React.Fragment>
              ))}
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Story, notes, gallery, links */}
      <div className="px-6 lg:px-8 pb-8 flex flex-col gap-6">
        {p.story && (
          <div className="bg-[#f7f9fb] border-l-4 border-[#149ddd] rounded-r-xl p-5">
            <h4 className="flex items-center gap-2 font-Raleway font-bold text-lg text-[#050d18]">
              <BiBug className="text-[#149ddd]" /> {p.story.title}
            </h4>
            <p className="description leading-relaxed mt-2 max-w-3xl">{p.story.text}</p>
            {p.extra && <p className="font-Roboto text-sm text-gray-600 mt-3">{p.extra}</p>}
            {p.story.images && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {p.story.images.map((m) => (
                  <Figure key={m.src} media={m} onOpen={onOpen} />
                ))}
              </div>
            )}
          </div>
        )}

        {p.boardViews && <BoardViews views={p.boardViews} onOpen={onOpen} />}

        {p.notes && (
          <details className="group bg-[#f7f9fb] rounded-xl p-5">
            <summary className="flex items-center justify-between cursor-pointer list-none font-Raleway font-bold text-lg text-[#050d18]">
              {p.notes.title}
              <BiChevronDown className="transition-transform group-open:rotate-180" />
            </summary>
            <ul className="mt-3 space-y-2 description list-disc pl-5">
              {p.notes.items.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </details>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 grid-flow-row-dense">
          {p.gallery.map((m) => (
            <Figure key={m.src} media={m} onOpen={onOpen} />
          ))}
        </div>

        {p.links && p.links.some((l) => l.link) && (
          <div className="flex gap-3 flex-wrap">
            {p.links.filter((l) => l.link).map((l) => (
              <a
                key={l.link}
                href={l.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 description px-4 py-2 rounded-full transition-colors"
              >
                {l.title} <FiExternalLink size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

/* ─────────────────────────── Section ─────────────────────────── */

const Research: React.FC = () => {
  const [open, setOpen] = useState<Media | null>(null);

  return (
    <Section id="research" title="Current Role" bg="bg-[#f7f7f7]">
      <div>
        <p className="font-Raleway text-xl font-bold text-[#050d18]">{researchLab.title}</p>
        <p className="font-Roboto text-gray-600">
          {researchLab.org} · {researchLab.advisor} · {researchLab.date}
        </p>
        {/* jump links: makes it obvious this role contains two projects */}
        <div className="flex flex-wrap gap-2 mt-5">
          {featuredProjects.map((p, i) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="inline-flex items-center gap-2 font-Poppins text-sm text-gray-700 bg-white border border-gray-200 hover:border-[#149ddd] hover:text-[#149ddd] px-3 py-1.5 rounded-full transition-colors"
            >
              <span className="text-[#149ddd] font-semibold">{String(i + 1).padStart(2, "0")}</span>
              {p.name}
            </a>
          ))}
        </div>
      </div>

      {featuredProjects.map((p, i) => (
        <div key={p.id} id={p.id} className="flex flex-col gap-5 mt-8">
          {/* project header: clear start of each project */}
          <div className="flex items-center gap-4">
            <span className="font-Poppins text-4xl md:text-5xl font-bold text-[#149ddd]/25 leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-Raleway text-2xl md:text-3xl font-bold text-[#050d18]">{p.name}</h3>
            <span className="hidden sm:block flex-1 h-px bg-gray-300" />
          </div>
          <ProjectShowcase p={p} onOpen={setOpen} />
        </div>
      ))}

      <Lightbox media={open} onClose={() => setOpen(null)} />
    </Section>
  );
};

export default Research;
