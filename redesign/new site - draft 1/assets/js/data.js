/* =========================================================================
   SITE CONTENT — edit this file to update members, projects and sponsors.
   No build step: save the file and refresh the page.

   Anything wrapped in "TODO:" renders as highlighted placeholder text so
   it's easy to spot before launch. Photos: set `photo` to a path inside
   assets/img/ (e.g. "assets/img/members/zachary-liu.jpg"). Leave it empty
   and a labeled placeholder is shown instead.
   ========================================================================= */

window.BBB = window.BBB || {};

/* ---------- Club-wide settings ---------- */
BBB.site = {
  email: "contact@bikebuilders.berkeley.edu",
  // Leave a URL empty ("") and the link is shown as a TODO placeholder.
  social: {
    LinkedIn: "",   // TODO: LinkedIn page URL
    Instagram: "",  // TODO: Instagram URL
    Facebook: "",   // TODO: Facebook URL
    Github: "",     // TODO: GitHub org URL
  },
  gofundme: "",     // TODO: GoFundMe URL (Sponsors page)
  applyForm: "",    // TODO: application form URL (Apply page). Empty = scrolls to timeline.
  recruitingTerm: "Spring 2026", // TODO: confirm term shown on Apply page
};

/* ---------- Members ----------
   role: shown under the name. group: "current" | "founder"            */
BBB.members = [
  { name: "Zachary Liu",       role: "President",        group: "current", photo: "" },
  { name: "Blaze Harris",      role: "MTB Lead",         group: "current", photo: "" },
  { name: "Kevin Ying",        role: "Components Lead",  group: "current", photo: "" },
  { name: "Sophia Cambell",    role: "MTB Engineer",     group: "current", photo: "" },
  { name: "Justin Peck",       role: "MTB Engineer",     group: "current", photo: "" },
  { name: "Pranav Amarnath",   role: "MTB Engineer",     group: "current", photo: "" },
  { name: "Sanya Ciervo",      role: "Team Member",      group: "current", photo: "" },
  { name: "Connor Mailander",  role: "Team Member",      group: "current", photo: "" },
  { name: "Kian Rafian",       role: "Team Member",      group: "current", photo: "" },
  { name: "Justin Toshima",    role: "Team Member",      group: "current", photo: "" },
  { name: "Elle O Hill",       role: "Team Member",      group: "current", photo: "" },
  { name: "Krisha Nair",       role: "Team Member",      group: "current", photo: "" },
  { name: "Joseph Chen",       role: "Team Member",      group: "current", photo: "" },
  { name: "Ethan Jao",         role: "Team Member",      group: "current", photo: "" },
  { name: "Bilal Elsayed",     role: "Team Member",      group: "current", photo: "" },
  { name: "Ziven Posner",      role: "President (2021–2024)", group: "founder", photo: "" },
  { name: "Jacob Pashman",     role: "Co-Founder",       group: "founder", photo: "" },
];

/* Home page "Member Spotlight" carousel */
BBB.spotlight = [
  { name: "Ziven Posner", role: "Founder", photo: "",
    blurb: "TODO: Updated spotlight blurb. (Old copy: Ziven finished his 5-year stint at Cal, B.S. & M.S., and rode the Great Divide on a bike he built in 2 weeks.)" },
  { name: "Justin Peck", role: "MTB Engineer", photo: "",
    blurb: "TODO: Updated spotlight blurb. (Old copy: studies Mechanical Engineering, races bikes, and works on two student teams — better than most people can do one.)" },
  { name: "Zachary Liu", role: "President", photo: "",
    blurb: "TODO: Updated spotlight blurb. (Old copy: led our GoFundMe campaign, rides his road bike all around the Bay, and designs and machines components for Bike Builders.)" },
];

/* ---------- Projects ----------
   id:       used in the URL → project.html?id=<id>
   category: used by the filter chips on projects.html
   cover:    image for the projects grid
   Everything else feeds the project detail page.                        */
BBB.projects = [
  {
    id: "mtb-v1",
    title: "Mountain Bike V1",
    category: "Bikes",
    timeline: "Fall 2023 – Spring 2024",
    cover: "assets/img/mtb-v1.jpg",
    tall: true,
    summary: "A steel full-suspension mountain bike with a unique linkage that passes through the center of the frame, using custom links and pivot hardware.",
    description: "This bike was the pinnacle of our second year as a club. The Fall '23 semester involved a month of industrial design and two months in CAD. The second semester was a manufacturing frenzy (including a few last-minute design changes). Huge shout-out to FSA — we would not have been able to do any of this without them.",
    heroImages: ["assets/img/mtb-v1.jpg", "assets/img/mtb-v1-render.jpg"],
    overview: {
      objective: "TODO: Objective — what the team set out to build and why.",
      planning: "TODO: Initial planning & research — geometry targets, reference bikes, suspension goals.",
      final: "TODO: Final product — how it rides, weight, what worked, what we'd change.",
    },
    data: [
      { title: "Leverage Analysis", body: "TODO: Leverage ratio, anti-squat and anti-rise curves — what they mean for how the bike rides." },
      { title: "Frame Design", body: "TODO: Tube selection, joints, and how the linkage passes through the frame." },
      { title: "Suspension Deep Dive", body: "TODO: Kinematics iterations and shock tune." },
    ],
    dataImages: ["assets/img/mtb-v1-curves.png", "assets/img/mtb-v1-render.jpg", "assets/img/mtb-v2-sketch.jpg"],
    team: ["Kevin Ying", "Kian Rafian", "Krisha Nair", "Joseph Chen"], // TODO: confirm project team
  },
  {
    id: "mtb-v2",
    title: "Mountain Bike V2",
    category: "Bikes",
    timeline: "TODO: timeline",
    cover: "assets/img/mtb-v2-render.png",
    summary: "TODO: One-line summary of MTB V2 (carbon tubes with machined lugs?).",
    description: "TODO: Project description.",
    heroImages: ["assets/img/mtb-v2-render.png", "assets/img/mtb-v2-sketch.jpg"],
    team: [],
  },
  {
    id: "gravel-v1",
    title: "Gravel Bike V1",
    category: "Bikes",
    timeline: "TODO: timeline",
    cover: "assets/img/gravel-v1.jpg",
    tall: true,
    summary: "TODO: One-line summary of the steel gravel bike.",
    description: "TODO: Project description.",
    heroImages: ["assets/img/gravel-v1.jpg"],
    team: ["Justin Peck"],
  },
  {
    id: "welding-jig",
    title: "Welding Jig V1–V3",
    category: "Tooling",
    timeline: "TODO: timeline",
    cover: "assets/img/jig-v2.jpg",
    summary: "TODO: Summary — the in-house frame jig that holds tubes in place for welding.",
    description: "TODO: Project description (V1 plywood → V2 → V3 aluminum extrusion).",
    heroImages: ["assets/img/jig-v2.jpg", "assets/img/jig-v1.jpg", "assets/img/jig-v3.jpg"],
    team: [],
  },
  {
    id: "fork",
    title: "Suspension Fork",
    category: "Components",
    timeline: "TODO: timeline",
    cover: "assets/img/fork-v1.jpg",
    tall: true,
    summary: "TODO: One-line summary of the fork project.",
    description: "TODO: Project description.",
    heroImages: ["assets/img/fork-v1.jpg"],
    team: [],
  },
  {
    id: "telemetry",
    title: "Suspension Telemetry",
    category: "Electronics",
    timeline: "TODO: timeline",
    cover: "assets/img/telemetry-v1.jpg",
    summary: "TODO: One-line summary of the suspension telemetry system.",
    description: "TODO: Project description.",
    heroImages: ["assets/img/telemetry-v1.jpg"],
    team: ["Kevin Ying"],
  },
  {
    id: "jersey",
    title: "Team Jersey",
    category: "Apparel",
    timeline: "TODO: timeline",
    cover: "assets/img/jersey-v2.jpg",
    tall: true,
    summary: "TODO: One-line summary of the club jersey.",
    description: "TODO: Project description.",
    heroImages: ["assets/img/jersey-v2.jpg", "assets/img/jersey-v1.jpg"],
    team: [],
  },
];

/* ---------- Sponsors ---------- */
BBB.sponsors = {
  currentSeason: "2025–2026",
  current: [
    { name: "SRAM", logo: "", url: "https://www.sram.com" },                 // TODO: add logo file
    { name: "PNW Components", logo: "", url: "https://www.pnwcomponents.com" }, // TODO: add logo file
  ],
  pastSeasons: "2022–2025",
  past: [
    { name: "Easy Composites", logo: "assets/img/sponsors/easy-composites.png", wide: true },
    { name: "Full Speed Ahead", logo: "assets/img/sponsors/fsa.png", wide: true },
    { name: "SRAM", logo: "" },
    { name: "Hipo Wood", logo: "assets/img/sponsors/hipo-wood.png" },
    { name: "Redshift", logo: "assets/img/sponsors/redshift.png" },
    { name: "Airgas", logo: "", wide: true },
    { name: "Bicycle Fabrication Supply", logo: "", wide: true },
    { name: "Engineering Student Council", logo: "assets/img/sponsors/esc.png" },
    { name: "Autodesk Fusion 360", logo: "assets/img/sponsors/autodesk-fusion.png" },
    { name: "Sportful", logo: "assets/img/sponsors/sportful.png" },
    { name: "Hopper Adventures", logo: "assets/img/sponsors/hopper.png" },
    { name: "Stashed", logo: "assets/img/sponsors/stashed.png", wide: true },
  ],
};

/* ---------- FAQs ---------- */
BBB.faq = {
  about: [
    { q: "Do you need any prior experience?", a: "TODO: answer" },
    { q: "I don’t own a bike… can I still join?", a: "TODO: answer" },
    { q: "Where do you get your custom parts?", a: "TODO: answer" },
    { q: "Can y’all fix my bike??", a: "TODO: answer" },
  ],
  apply: [
    { q: "Do you need any prior experience?", a: "TODO: answer" },
    { q: "What’s the initial interview like?", a: "TODO: answer" },
    { q: "What’s the time commitment?", a: "TODO: answer" },
    { q: "Do I have to reapply every semester?", a: "TODO: answer" },
  ],
};

/* ---------- Recruiting timeline (Apply page) ---------- */
BBB.recruiting = [
  { title: "Tabling",           date: "TODO: 01/18 – 01/25", body: "TODO: Where to find us on Sproul." },
  { title: "Coffee Chats",      date: "TODO: 01/20 – 01/23", body: "TODO: How to sign up for a coffee chat." },
  { title: "Info Session",      date: "TODO: 01/23",         body: "TODO: Time and location." },
  { title: "Applications Due",  date: "TODO: 01/30",         body: "TODO: Link to the application." },
  { title: "Interviews",        date: "TODO: 02/01 – 02/07", body: "TODO: What to expect." },
  { title: "Acceptances!",      date: "TODO: 02/08",         body: "TODO: Welcome message." },
];
