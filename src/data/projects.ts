import wildtrack1 from "@/assets/wildtrack-1.png";
import wildtrack2 from "@/assets/wildtrack-2.png";
import dfsp1 from "@/assets/dfsp-1.png";
import dfsp2 from "@/assets/dfsp-2.png";
import michiganAerospaceLogo from "@/assets/projects/michaero.jpeg";
import newEagleLogo from "@/assets/projects/neweagle.jpeg";
import ketteringLogo from "@/assets/projects/kettering.jpeg";
import gvsuLogo from "@/assets/projects/gvsu.jpeg";
import deepLearningLogo from "@/assets/projects/deepnn.jpeg";
import faaLogo from "@/assets/projects/faa.jpeg";
import halasOutside from "@/assets/projects/halas-outside-airborne.jpg";
import halasNight from "@/assets/projects/halas-night-lazing.jpg";
import dron2oFirstFlight from "@/assets/projects/dron2o-first-flight.png";
import anemometerTeensy from "@/assets/projects/anemometer-teensy.jpg";
import anemometer1d from "@/assets/projects/anemometer-1d.png";
import reconnImage from "@/assets/projects/reconn.png";
import newEagleReach from "@/assets/projects/new-eagle-reach.png";
import roboticsLineFollower from "@/assets/projects/robotics-line-follower.jpg";
import roboticsSumoBot from "@/assets/projects/robotics-sumo-bot.jpg";
import roboticsBabySteps from "@/assets/projects/robotics-baby-steps.mp4";
import roboticsTraining from "@/assets/projects/robotics-training.mp4";
import roboticsBattle01 from "@/assets/projects/robotics-battle-01.mp4";
import roboticsBattle02 from "@/assets/projects/robotics-battle-02.mp4";
import roboticsSemiFinals from "@/assets/projects/robotics-semi-finals.mp4";
import roboticsPostTourney from "@/assets/projects/robotics-post-tourney.mp4";
import voidDemo from "@/assets/projects/void-demo.gif";
import voidHonestWork from "@/assets/projects/void-honest-work.jpg";

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  caption: string;
};

export type ProjectsItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  images: string[];
  media?: ProjectMedia[];
  externalUrl?: string;
  externalLabel?: string;
  details?: string[];
  review?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  logo: string;
  summary: string;
  highlights: string[];
  projects?: ProjectsItem[];
};

export type CredentialItem = {
  title: string;
  issuer: string;
  dates: string;
  logo: string;
  detail?: string;
  href?: string;
};

export const clientProjects: ProjectsItem[] = [
  {
    slug: "wildtrack",
    title: "WildTrack",
    category: "Conservation",
    description:
      "AI-assisted wildlife identification platform using footprint imagery, morphometrics, and data workflows to support endangered-species monitoring.",
    technologies: ["AWS", "Python", "Flask", "React", "PostgreSQL", "MLOps"],
    images: [wildtrack1, wildtrack2],
    details: [
      "WildTrack is a conservation-focused platform for using footprint imagery and metadata to support non-invasive wildlife monitoring.",
      "The work combined web application development, cloud-hosted services, database design, and machine-learning workflows for species and individual identification.",
      "The project required a practical interface for researchers while keeping the underlying data pipeline maintainable and extensible.",
    ],
  },
  {
    slug: "dfs-pro",
    title: "DFS Pro",
    category: "Sports Analytics",
    description:
      "Data product for daily fantasy sports players, combining ETL pipelines, projections, and lineup analytics in a web application.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "AWS", "React", "ETL"],
    review:
      "Matt was excellent to work with - responsive, professional, and delivered exactly what I requested.",
    images: [dfsp1, dfsp2],
    details: [
      "DFS Pro is a sports analytics product for daily fantasy sports research and lineup decision support.",
      "The application brought together ETL workflows, projection data, backend APIs, and a React interface for exploring slate-level insights.",
      "The goal was to reduce manual research time and make player/team comparison workflows faster and more repeatable.",
    ],
  },
];

export const professionalExperience: ExperienceItem[] = [
  {
    company: "Michigan Aerospace Corporation",
    role: "Research Scientist | Engineer",
    dates: "November 2019 - June 2024",
    logo: michiganAerospaceLogo,
    summary:
      "Led software, embedded systems, and applied ML work for atmospheric sensing, LiDAR, robotics, and wildlife-analysis products.",
    highlights: [
      "Developed control-system software for advanced atmospheric LiDAR systems including HALAS and DroN2O.",
      "Researched and applied deep-learning models for optical flow, object classification, and image-analysis workflows.",
      "Led embedded software and PCB work for ultrasonic anemometer systems used for high-speed wind and temperature measurements.",
      "Improved Reconn.AI classification algorithms, user interface, and subscription/payment integration.",
    ],
    projects: [
      {
        slug: "halas",
        title: "HALAS",
        category: "Atmospheric LiDAR",
        description:
          "Ground and airborne UV LiDAR/Raman sensing system for real-time high-altitude wind, density, temperature, and atmospheric composition measurements.",
        technologies: ["Python", "Control Systems", "LiDAR", "Field Operations", "Data Acquisition"],
        images: [halasOutside, halasNight],
        externalUrl: "https://www.honeywellaerospace.com/us/en/pages/halas",
        externalLabel: "Honeywell HALAS",
        details: [
          "HALAS is a high-altitude LiDAR atmospheric sensing system used for wind, density, temperature, and atmospheric-composition measurements.",
          "My work supported control software, data acquisition, and field operations around ground and airborne sensing campaigns.",
          "The system required practical engineering across research software, instrument operations, and deployment constraints in the field.",
        ],
      },
      {
        slug: "dron2o",
        title: "DroN2O",
        category: "Environmental Monitoring",
        description:
          "Drone-based measurement system combining laser sensors, wind sensing, imaging, and AI-enabled processing for agricultural nitrous oxide emissions.",
        technologies: ["Robotics", "Sensor Fusion", "Python", "Autonomous Flight", "ML"],
        images: [dron2oFirstFlight],
        externalUrl: "https://arpa-e.energy.gov/sites/default/files/2025-04/ARPA-E%20Project%20Descriptions_SMARTFARM_R25.1%20.pdf",
        externalLabel: "ARPA-E SMARTFARM PDF",
        details: [
          "DroN2O was a drone-based sensing effort for measuring nitrous oxide emissions from agricultural fields.",
          "The system combined laser-based sensing, autonomous flight, wind measurement, imaging, and AI-assisted processing.",
          "The work sat at the intersection of robotics, environmental measurement, and deployable data systems.",
        ],
      },
      {
        slug: "ultrasonic-anemometer",
        title: "3D Ultrasonic Anemometer",
        category: "Embedded Systems",
        description:
          "Embedded software and PCB development for a high-speed ultrasonic anemometer measuring wind vector and temperature.",
        technologies: ["C++", "ARM Cortex-M", "PCB Design", "Signal Processing", "Embedded Linux"],
        images: [anemometerTeensy, anemometer1d],
        details: [
          "This project centered on embedded software and PCB development for ultrasonic wind and temperature measurement.",
          "The work included sensor timing, signal acquisition, microcontroller integration, and iterative hardware prototyping.",
          "It built on earlier 1D anemometer work and expanded toward multi-axis high-speed measurement.",
        ],
      },
      {
        slug: "reconn-ai",
        title: "Reconn.AI",
        category: "Computer Vision",
        description:
          "Camera-trap image-management and classification platform that used Microsoft's MegaDetector as part of the analysis workflow.",
        technologies: ["Vue", "Stripe", "Computer Vision", "MegaDetector", "Python"],
        images: [reconnImage],
        details: [
          "Reconn.AI was a platform for managing and classifying camera-trap image collections.",
          "The project used Microsoft's camera-trap tooling, including MegaDetector, as part of the workflow for detecting and organizing wildlife imagery.",
          "This page is intentionally lightweight for now and can be expanded with more implementation notes later.",
        ],
      },
    ],
  },
  {
    company: "Michigan Aerospace Corporation",
    role: "Engineer Co-op",
    dates: "April 2018 - October 2019",
    logo: michiganAerospaceLogo,
    summary:
      "Supported research and prototype engineering across embedded sensing, optics, control software, and mechanical design.",
    highlights: [
      "Designed a 1D ultrasonic anemometer PCB shield for an ARM-based microcontroller.",
      "Wrote Python and LabVIEW control software for laser-induced melanoma cell detection using the photoacoustic effect.",
      "Used SolidWorks and 3D printing for rapid prototyping and hardware iteration.",
    ],
  },
  {
    company: "New Eagle",
    role: "Engineer Co-op",
    dates: "September 2016 - July 2017",
    logo: newEagleLogo,
    summary:
      "Contributed to mechanical, electrical, and software work for hybrid-vehicle and electronic-control-unit projects.",
    highlights: [
      "Built and validated harnesses and test systems for vehicle control projects.",
      "Supported a large ECU reverse-engineering effort involving CAN decryption, replacement hardware, and data acquisition.",
    ],
    projects: [
      {
        slug: "ecu-reverse-engineering",
        title: "Rough-Terrain Container Handler",
        category: "Vehicle Controls",
        description:
          "Reverse-engineering and replacement validation for a military rough-terrain container handler control system.",
        technologies: ["CAN Bus", "Harness Design", "Data Acquisition", "Controls"],
        images: [newEagleReach],
        details: [
          "This project supported reverse engineering and replacement validation for a military rough-terrain container handler, likely a Kalmar RT240 or similar heavy-duty reach stacker.",
          "The machine shown is used to lift and move shipping containers in rough-terrain operating environments.",
          "Work included CAN-related investigation, harness development, and software tooling for I/O validation and data acquisition.",
        ],
      },
    ],
  },
];

export const personalProjects: ProjectsItem[] = [
  {
    slug: "robotics",
    title: "Robotics",
    category: "Personal Projects",
    description:
      "Line-following and sumo robotics work from early engineering projects, including autonomous motion, sensing, and competition builds.",
    technologies: ["Robotics", "Embedded Systems", "Sensors", "Controls"],
    images: [roboticsLineFollower, roboticsSumoBot],
    media: [
      { type: "image", src: roboticsLineFollower, caption: "Line follower" },
      { type: "video", src: roboticsBabySteps, caption: "Baby steps" },
      { type: "image", src: roboticsSumoBot, caption: "Sumo bot" },
      { type: "video", src: roboticsTraining, caption: "Training session" },
      { type: "video", src: roboticsBattle01, caption: "Battle 01" },
      { type: "video", src: roboticsBattle02, caption: "Battle 02" },
      { type: "video", src: roboticsSemiFinals, caption: "Semi-finals" },
      { type: "video", src: roboticsPostTourney, caption: "Post-tournament battle" },
    ],
    details: [
      "Highlighting personal, inspiring, and future robotics projects.",
      "This collection includes early line-following and sumo robot builds focused on sensing, embedded control, mechanical iteration, and autonomous behavior.",
      "The videos and images below were copied forward from the old dedicated Robotics page.",
    ],
  },
  {
    slug: "void",
    title: "Void",
    category: "Game",
    description:
      "Browser-based multiplayer game prototype using 2D rendering, physics simulation, and WebRTC multiplayer experiments.",
    technologies: ["PixiJS", "Matter.js", "WebRTC", "JavaScript"],
    images: [voidDemo, voidHonestWork],
    externalUrl: "https://github.com/hopeYouLikeGamminToo/void",
    externalLabel: "GitHub Repository",
    details: [
      "Void started after a GitHub invite to collaborate on a coding project. After a short discussion, the idea became a web-browser multiplayer game that could eventually support in-game currency, collectibles, and digital characters.",
      "None of us had much experience with the technologies needed to build that kind of game, so we used the repository as a sandbox to experiment, learn, and build out ideas. The name came from the empty directory I created while starting the project.",
      "The collaboration eventually slowed down, but I continued tinkering with Void in spare time. The prototype uses PixiJS for 2D rendering, Matter.js for physics, and WebRTC for multiplayer communication and chat functionality.",
      "The demo below shows the state of the project from the old dedicated Void page.",
    ],
  },
];

const unsortedProjects: ProjectsItem[] = [
  ...clientProjects,
  ...professionalExperience.flatMap((experience) => experience.projects ?? []),
  ...personalProjects,
];

const projectBySlug = new Map(unsortedProjects.map((project) => [project.slug, project]));

export const allProjects: ProjectsItem[] = [
  "wildtrack",
  "halas",
  "reconn-ai",
  "dron2o",
  "ultrasonic-anemometer",
  "ecu-reverse-engineering",
  "dfs-pro",
  // "robotics",
  // "void",
].map((slug) => projectBySlug.get(slug)!);

export const education: CredentialItem[] = [
  {
    title: "Bachelor of Science, Engineering Physics",
    issuer: "Kettering University",
    dates: "2016 - 2019",
    logo: ketteringLogo,
  },
  {
    title: "Product Manufacturing and Design",
    issuer: "Grand Valley State University",
    dates: "2014 - 2016",
    logo: gvsuLogo,
  },
];

export const certifications: CredentialItem[] = [
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    dates: "Issued May 2022",
    logo: deepLearningLogo,
    detail: "Credential ID UU3EMP2YHERR",
    href: "https://www.coursera.org/account/accomplishments/verify/UU3EMP2YHERR",
  },
  {
    title: "Remote Unmanned Aircraft Pilot",
    issuer: "Federal Aviation Administration",
    dates: "Issued June 2021",
    logo: faaLogo,
  },
];
