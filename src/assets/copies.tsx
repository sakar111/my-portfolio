export const youtubeVideos = [
  {
    videoId: "c0BD83TTN2g",
    videoTitle:
      "Years after a faulty incubator killed 25 chicks I redeem myself with a risk-assessed incubator.",
  },
  {
    videoId: "ipwiKTBkyi0",
    videoTitle:
      "We created our own decentralised currency system to simplify the basics of bitcoin and blockchain.",
  },
  {
    videoId: "nACGXdyO0Jw",
    videoTitle:
      "One invention for every day of the Valentine's Week hoping to finally get a girlfriend.",
  },
  {
    videoId: "5cn1-zTlr6c",
    videoTitle: "A set of inventions that may or may not help us hike easily.",
  },
  {
    videoId: "5MhvuZvl0Pk",
    videoTitle:
      "We oversimplified our favourite projects from Nepal's biggest tech festival.",
  },
  {
    videoId: "jsEMLAb3UFE",
    videoTitle:
      "We oversimplified the basic concept of electricity (current voltage and power) which troubled a lot of casuals.",
  },
  {
    videoId: "qH0R85JNOHU",
    videoTitle:
      "We competed against each other to see who could make the most unnecessary invention.",
  },
  {
    videoId: "50Pt141f-Mg",
    videoTitle:
      "A plasma speaker created out of a flyback transformer from an old Television set.",
  },
  {
    videoId: "o0eYXKOH0rQ",
    videoTitle:
      "A propanol-fueled turret cannon we made just for the fun of it.",
  },
  {
    videoId: "0DCpCSC6Efc",
    videoTitle:
      "Series of unnecessary inventions to to brush teeth, cook food, clean rooms, do dishes and talk to girls.",
  },
  {
    videoId: "UNcxobltQyU",
    videoTitle:
      "A Capacitor Gun that served as a safe and legal alternative to firecrackers which were banned in Nepal.",
  },
  {
    videoId: "4ZWP32GZ8BM",
    videoTitle:
      "A RC Fiber Glass Boat to sail across ponds and holy rivers during heavy monsoon floods.",
  },
];

export const jobExperience = [
  {
    title: "Co-Founder & Lead Engineer",
    organization: "Axar Space Pvt. Ltd. · Makit Labs (educational robotics)",
    date: "Feb 2024 – Jul 2026",
    place: "Kathmandu, Nepal",
    points: [
      "Built the full mechanical, electrical, and firmware stack of a robotics kit that lets students build multiple robots.",
      "Designed and open-sourced a sub-$80 robot dog kit.",
      "Taught 1,000+ students through workshops and weekly STEM classes.",
    ],
    media: [
      { type: "image" as const, src: "/photo/car-kit.jpg", caption: "Makit robotics kit: one kit, many robots" },
      { type: "image" as const, src: "/photo/robot-dog2.jpg", caption: "Open-source robot dog kit" },
      { type: "image" as const, src: "/photo/students.jpg", caption: "1,000+ students taught" },
    ],
    button: [{ title: "makitlabs.com", link: "https://makitlabs.com" }],
  },
  {
    title: "Lecturer",
    organization: "Kantipur College of Management and Information Technology",
    date: "May 2024 – Sep 2025",
    place: "Kathmandu, Nepal",
    points: [
      "Taught Discrete Mathematics, Digital Logic, and Data Communication & Computer Networks.",
    ],
  },
  {
    title: "Electronics Engineer",
    organization: "Sandbox Software Pvt. Ltd.",
    date: "Jan 2024 - Apr 2024",
    place: "Pokhara, Nepal",
    points: [
      "Led hardware development and production of 1,000 HID devices (keyboards and mice) built on microcontrollers and ASICs.",
    ],
  },
  {
    title: "Robotics Engineer",
    organization: "North Star Developer’s Village",
    date: "Aug 2023 – Oct 2023",
    place: "Kathmandu, Nepal",
    points: [
      "Delivered a person-following system for an autonomous mobile robot, achieving 75% tracking accuracy.",
    ],
  },
];

export const Projects = [
  {
    id: "vtol",
    title: "Reusable Autonomous VTOL Vehicle",
    organization: "Undergraduate Thesis, Pulchowk Campus",
    date: "2023",
    place: "",
    points: [
      "Designed a custom flight computer (IMU, barometer, GPS, LiDAR) and demonstrated autonomous takeoff and stable hover in flight tests.",
      "Implemented an asynchronous EKF, cutting GPS horizontal noise by 96% for sub-meter position accuracy.",
      "Ran 250 Hz embedded attitude estimation; identified models via MOESP and designed an LQG controller with integral action.",
      "Developed MPC trajectory optimization in CasADi/IPOPT, achieving 20× faster solve times with multiple shooting.",
    ],
    // Loops the whole YouTube video (add start/end in seconds to loop just a section).
    clip: { videoId: "sy4MgeHsBhg" },
    button: [
      {
        title: "Github",
        link: "https://github.com/sakar111/UAV-Model-Rocket-with-Guidance-Navigation-and-Control",
      },
      {
        title: "Thesis Report",
        link: "https://elibrary.tucl.edu.np/JQ99OgQIizUxyjI9nB0on9OyLkqsGIf4/api/core/bitstreams/50768bc5-b571-4bc2-9ae1-6c3d998d0251/content",
      },
    ],
  },
  {
    id: "quadruped",
    title: "Open-Source 12-DOF Quadruped Robot",
    organization: "Makit Labs",
    date: "",
    place: "",
    points: [
      "Designed a low-cost (sub-$80) 12-DOF quadruped robot with custom mechanical and embedded system architecture.",
      "Developed Python GUI tools for kinematics, calibration, stabilization, and real-time control.",
      "Developed crawl and trot gaits validated in physics-based simulation and on real hardware.",
      "Implemented IMU-based stabilization and calibration pipelines for robust locomotion under disturbances.",
      "Led iterative mechanical and control design through multiple hardware revisions and open-sourced the complete platform.",
    ],
    clip: { videoId: "LkegFqLjT9M" },
    button: [
      {
        title: "Github",
        link: "https://github.com/Third-World-Nerd/Robot-Dog",
      },
    ],
  },
];

export const education = [
  {
    school: "University of Nevada, Reno",
    degree: "M.S. in Electrical Engineering",
    date: "Aug 2026 – May 2028 (expected)",
    detail: "Graduate Research Assistant, Autonomous Systems Laboratory",
  },
  {
    school: "Pulchowk Campus, Tribhuvan University",
    degree: "B.E. in Electronics, Communication & Information Engineering",
    date: "2018 – 2023",
    detail: "78.04% · Rank 9 of 500+ · Full scholarship",
  },
];

export const honors = [
  "Ranked 24th of 16,000 in the national engineering entrance exam (top in Electronics)",
  "Winner, National Science Exhibition",
  "Hardware Coordinator, LOCUS 2023: ran six robotics contests for 20,000+ visitors",
];

export const skills = [
  {
    group: "Electronics & PCB",
    items: ["Analog / mixed-signal", "Low-noise front ends", "Active filters", "Multilayer PCB (Altium, KiCad)", "LTspice", "Board bring-up"],
  },
  {
    group: "Embedded",
    items: ["C/C++", "STM32", "ESP32", "Teensy", "Raspberry Pi", "NVIDIA Jetson", "FreeRTOS", "I2C / SPI / UART"],
  },
  {
    group: "Drones & Controls",
    items: ["ArduPilot", "MAVLink", "ELRS", "PID tuning", "LQR / LQG", "MPC", "EKF / UKF", "System ID"],
  },
  {
    group: "Software & Tools",
    items: ["Python", "MATLAB / Simulink", "ROS 2", "Computer vision", "SLAM", "DSP", "Fusion 360", "3D printing", "Git"],
  },
];
