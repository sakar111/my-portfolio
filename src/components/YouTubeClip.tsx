import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiPlay, BiX } from "react-icons/bi";

export type Clip = {
  videoId: string;
  /** Loop this section of the video (seconds). */
  start?: number;
  end?: number;
  caption?: string;
};

const ORIGIN = "https://www.youtube-nocookie.com";
/** YouTube shows its title bar + play/pause overlay for the first few seconds.
 *  The thumbnail stays on top until that has faded, so visitors only see clean video. */
const REVEAL_DELAY_MS = 3200;
/** If the player never reports back (blocked messages etc.), reveal anyway. */
const FALLBACK_REVEAL_MS = 6000;

type YTMessage = {
  event?: string;
  info?: number | { playerState?: number; currentTime?: number } | null;
};

/* ───────── Full video, on the site (with sound, controls, fullscreen) ───────── */

const VideoModal: React.FC<{ videoId: string; start: number; title: string; onClose: () => void }> = ({
  videoId,
  start,
  title,
  onClose,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const params = new URLSearchParams({ autoplay: "1", start: String(start), rel: "0", modestbranding: "1", playsinline: "1" });
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
        onClick={onClose}
        aria-label="Close"
      >
        <BiX size={32} />
      </button>
      <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`${ORIGIN}/embed/${videoId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};

/* ───────── Inline clip: muted, looping section, like a GIF ───────── */

/**
 * - Only the thumbnail until scrolled into view (no YouTube code loaded before that).
 * - Pauses when scrolled away.
 * - Loops by seeking back *before* the end, so the player never hits "ended"
 *   (which would bring YouTube's overlay back).
 * - Click → full video in a viewer on this site (sound, controls, fullscreen).
 */
const YouTubeClip: React.FC<{ clip: Clip }> = ({ clip }) => {
  const { videoId, start = 0, end, caption } = clip;
  const boxRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const revealTimer = useRef<number | undefined>(undefined);
  const heardBack = useRef(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const post = useCallback((msg: object) => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify(msg), ORIGIN);
  }, []);
  const send = useCallback((func: string, args: unknown[] = []) => post({ event: "command", func, args }), [post]);

  const scheduleReveal = useCallback((ms: number) => {
    if (revealTimer.current !== undefined) return;
    revealTimer.current = window.setTimeout(() => setReady(true), ms);
  }, []);
  const cover = useCallback(() => {
    window.clearTimeout(revealTimer.current);
    revealTimer.current = undefined;
    setReady(false);
  }, []);

  // Load when it first scrolls into view; afterwards play/pause with visibility.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          send("playVideo");
        } else {
          send("pauseVideo");
          cover(); // so the "paused" overlay is never seen
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, send, cover]);

  // Pause the inline clip while the full video is open.
  useEffect(() => {
    if (open) send("pauseVideo");
    else if (load) send("playVideo");
  }, [open, load, send]);

  // Player events: reveal after the overlay fades; loop the section.
  useEffect(() => {
    if (!load) return;
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || e.source !== frameRef.current?.contentWindow) return;
      heardBack.current = true;
      let d: YTMessage;
      try {
        d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const info = d.info;
      const state =
        d.event === "onStateChange" && typeof info === "number"
          ? info
          : d.event === "infoDelivery" && info && typeof info === "object"
            ? info.playerState
            : undefined;
      const time = d.event === "infoDelivery" && info && typeof info === "object" ? info.currentTime : undefined;

      if (state === 1) scheduleReveal(REVEAL_DELAY_MS);
      if (end !== undefined && time !== undefined && time >= end - 0.3) send("seekTo", [start, true]);
      if (state === 0) {
        send("seekTo", [start, true]);
        send("playVideo");
      }
    };
    window.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("message", onMsg);
      window.clearTimeout(revealTimer.current);
    };
  }, [load, start, end, send, scheduleReveal]);

  // The player only starts reporting once it hears "listening", and it may not be ready
  // on the first try, so keep saying it until it answers. Reveal anyway after a while.
  const onFrameLoad = () => {
    let tries = 0;
    const id = window.setInterval(() => {
      if (heardBack.current || ++tries > 40) return window.clearInterval(id);
      post({ event: "listening", id: videoId, channel: "widget" });
      send("mute");
      send("playVideo");
    }, 250);
    scheduleReveal(FALLBACK_REVEAL_MS);
  };

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    enablejsapi: "1",
    start: String(start),
    ...(end === undefined ? { loop: "1", playlist: videoId } : {}),
    origin: window.location.origin,
  });

  return (
    <figure className="flex flex-col gap-1.5">
      <button
        ref={boxRef}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full aspect-video rounded-lg overflow-hidden bg-black cursor-pointer"
        aria-label={`Play the full video${caption ? `: ${caption}` : ""}`}
      >
        {load && (
          <iframe
            ref={frameRef}
            src={`${ORIGIN}/embed/${videoId}?${params}`}
            title={caption ?? "Project video"}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
            onLoad={onFrameLoad}
            // slightly oversized so YouTube's edge UI is cropped; clicks go to the button
            className="absolute -inset-[6%] w-[112%] h-[112%] pointer-events-none"
          />
        )}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-xs font-Poppins text-white bg-black/60 group-hover:bg-[#149ddd] px-2.5 py-1 rounded-full transition-colors">
          <BiPlay size={16} /> Watch full video
        </span>
      </button>
      {caption && <figcaption className="font-Roboto text-xs text-gray-600">{caption}</figcaption>}
      {open && (
        <VideoModal videoId={videoId} start={start} title={caption ?? "Project video"} onClose={() => setOpen(false)} />
      )}
    </figure>
  );
};

export default YouTubeClip;
