// ─────────────────────────────────────────────────────────────────────────────
// Current research — featured project showcases.
//
// HOW MEDIA WORKS
//   Every media item points at a file under /public/projects/<slug>/...
//   • File exists  → it is shown.
//   • File missing → on the LIVE site it is silently hidden (the hero falls back
//     to an animated illustration), and in `npm run dev` a dashed placeholder
//     tells you which shot to capture and where to drop the file.
//   So to add media: export the clip/photo, name it exactly as below, drop it in
//   /public/projects/<slug>/ — no code change needed.
//
//   Video tips: 10–20 s, muted, H.264 .mp4, 1280px wide, < 4 MB
//   (ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libx264 -crf 28 -movflags +faststart hero.mp4)
//
// HONESTY RULE: only add numbers that have been measured. Placeholder stats are
// left commented out below — uncomment and fill in once you have the number.
// ─────────────────────────────────────────────────────────────────────────────

export type Media = {
  type: "image" | "video";
  src: string;
  caption: string;
  /** What to capture — shown only in the dev placeholder. */
  shot?: string;
  /** Wide screenshot: spans the full gallery row, never cropped. */
  wide?: boolean;
};

export type BoardView = { label: string; layout: Media; render: Media; photo?: Media };

export type FeaturedProject = {
  id: string; // anchor → pathaksakar.com.np/#<id> (use this in the CV links)
  name: string;
  headline: string;
  role: string;
  org: string;
  date: string;
  status: string;
  art: "modem" | "drone"; // animated hero illustration (shown when there's no hero video)
  hero?: Media; // optional hero video; if present and the file exists, it replaces the illustration
  /** Transparent PNG cut-outs composited INTO the modem illustration. */
  cutouts?: { tx: string; rx: string; hydroTx?: string; hydroRx?: string };
  stats: string[];
  summary: string;
  stack?: string[];
  story?: {
    title: string;
    text: string;
    images?: Media[];
  };
  extra?: string;
  /** PCB design views, shown as a TX / RX toggle (layout + 3D side by side). */
  boardViews?: BoardView[];
  /** Smaller card for early-stage projects. */
  compact?: boolean;
  stackLabel?: string;
  notes?: { title: string; items: string[] };
  gallery: Media[];
  links?: { title: string; link: string }[];
};

export const researchLab = {
  title: "Graduate Research Assistant",
  org: "Autonomous Systems Laboratory, University of Nevada, Reno",
  advisor: "Dr. Hao Xu",
  date: "Aug 2026 – Present",
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "uw-modem",
    name: "Underwater Acoustic Modem",
    headline: "Sending data through water with sound.",
    role: "Hardware Lead",
    org: "Dr. Hao Xu's lab, UNR",
    date: "Fall 2026",
    status: "In progress · tank test next",
    art: "modem",
    // Hero = animated underwater scene with YOUR hardware composited in.
    // Shoot each piece on a plain background, remove the background
    // (remove.bg / Photoshop / iPhone "lift subject"), export transparent PNG,
    // ~800 px wide, < 300 KB. Boards: shot straight down. Hydrophones: side view, hanging.
    cutouts: {
      tx: "/projects/uw-modem/cutout-tx.png",
      rx: "/projects/uw-modem/cutout-rx.png",
      // Hydrophones are drawn as vectors. To use photos instead, add:
      // hydroTx: "/projects/uw-modem/cutout-hydrophone-tx.png",
      // hydroRx: "/projects/uw-modem/cutout-hydrophone-rx.png",
    },
    stats: [
      "2 custom boards",
      "20–90 kHz",
      // "~[X] dB max gain",  ← read "Total gain" in the RX app at HIGH coarse gain + max VGA, then add
      // "[X] kbps",        ← add once measured
      // "[Y] m range",     ← add once measured
    ],
    summary:
      "Radio doesn't travel through water, so this modem uses sound. I designed and built both boards end to end, from the analog front ends and power amplifier to the PCBs and firmware, and I'm now developing the modulation/demodulation (e.g., BPSK) targeting 25 kbps on low-cost hardware.",
    boardViews: [
      {
        label: "Transmitter",
        layout: { type: "image", src: "/projects/uw-modem/tx-altium-layout.png", caption: "TX: layout in Altium" },
        render: { type: "image", src: "/projects/uw-modem/tx-altium-3d.png", caption: "TX: 3D render before fab" },
        photo: { type: "image", src: "/projects/uw-modem/tx-board.jpg", caption: "TX: the real board", shot: "Photo of the assembled TX board, straight down" },
      },
      {
        label: "Receiver",
        layout: { type: "image", src: "/projects/uw-modem/rx-altium-layout.png", caption: "RX: layout in Altium" },
        render: { type: "image", src: "/projects/uw-modem/rx-altium-3d.png", caption: "RX: 3D render before fab" },
        photo: { type: "image", src: "/projects/uw-modem/rx-board.jpg", caption: "RX: the real board", shot: "Photo of the assembled RX board, straight down" },
      },
    ],
    gallery: [
      { type: "video", src: "/projects/uw-modem/tx-sweep.mp4", caption: "Transmitter sweeping 20 → 90 kHz", shot: "Short muted clip of the TX frequency sweep on the scope" },
      { type: "image", src: "/projects/uw-modem/bench.jpg", caption: "Bring-up on the bench", shot: "Bench setup: scope, supplies, boards" },
      { type: "image", src: "/projects/uw-modem/aquarium-build.jpg", caption: "Tank test loading… building the aquarium myself", shot: "You: saw in one hand, drill in the other, goggles on" },
      { type: "image", src: "/projects/uw-modem/rx-app.png", caption: "My receiver app: a 3 mV test tone through every RX stage, with live waveform, FFT and spectrogram", wide: true },
    ],
    links: [
      { title: "GitHub", link: "https://github.com/sakar111/Underwater-Acoustic-Modem" },
      // { title: "Demo video", link: "https://youtu.be/..." },
    ],
  },
  {
    id: "uv-drone",
    name: "UV-Disinfection Drone",
    headline: "Building a drone that disinfects rooms with UV light.",
    role: "Flight hardware (lab team)",
    org: "Startup prototype, UNR",
    date: "Fall 2026 – Present",
    status: "Just started · testing the first builds",
    art: "drone",
    compact: true,
    // Short silent flight clip. Use .mp4, not .gif (≈10× smaller, sharper):
    // ffmpeg -i flight.mov -an -t 15 -vf scale=1280:-2 -c:v libx264 -crf 28 -movflags +faststart first-flight.mp4
    hero: {
      type: "video",
      src: "/projects/uv-drone/first-flight.mp4",
      caption: "First flight",
      shot: "10–15 s silent clip of the first flight",
    },
    stats: [
      "5–10 drone fleet",
      "3 UV variants",
      "First flight ✓",
      // Add once measured:  "[X] g UV payload", "±[X] cm hover"
    ],
    summary:
      "A fleet of 5–10 drones designed to fly autonomously, without collisions, to disinfect rooms with UV-C light, in three lamp variants: front, top and bottom. I build the drones' hardware, circuits and firmware.",
    stackLabel: "Planned stack",
    stack: ["Mocap cameras", "Raspberry Pi", "MAVLink", "ArduPilot", "Motors"],
    gallery: [
      { type: "image", src: "/projects/uv-drone/uv-front.jpg", caption: "Variant 1: UV on the front", shot: "The front-mounted UV drone" },
      { type: "image", src: "/projects/uv-drone/uv-bottom.jpg", caption: "Variant 2: UV on the bottom", shot: "The bottom-mounted UV drone" },
      { type: "image", src: "/projects/uv-drone/uv-bottom-cad.png", caption: "3D design: bottom mount", shot: "Screenshot of the 3D design of the bottom attachments" },
    ],
    links: [],
  },
];
