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
  competitionUrl: "", // TODO: intercollegiate bike building competition website (About page)
  // Apply page: false shows "Applications are closed" in place of the recruiting timeline.
  // Flip to true when recruiting opens and the timeline (BBB.recruiting) comes back.
  applicationsOpen: false,
  applyForm: "",    // TODO: application form URL (Apply page). Empty = scrolls to timeline.
  recruitingTerm: "Spring 2026", // TODO: confirm term shown on Apply page
};

/* ---------- Members ----------
   Subteams render on members.html in the order listed in BBB.subteams.
   team:  must match one of the subteam names below (or "founder")
   role:  title shown under the name — list the team lead first
   link:  optional personal site / LinkedIn / Instagram
   Source: member info form, fall 2026.                                   */
BBB.subteams = ["Business & Operations", "Frame", "Suspension", "Composites", "EECS"];

BBB.members = [
  // Business & Operations
  { name: "Neel Chandran",       team: "Business & Operations", role: "President", photo: "assets/img/members/neel-chandran.jpg", link: "https://www.linkedin.com/in/neel-chandran-a57714220/" },
  { name: "Sophia Campbell",     team: "Business & Operations", role: "Treasurer", photo: "assets/img/members/sophia-campbell.jpg", link: "https://www.linkedin.com/in/sophia-campbell-846303294/" },

  // Frame
  { name: "Ian Poe",             team: "Frame", role: "Lead Frame Engineer", photo: "assets/img/members/ian-poe.jpg", link: "https://www.linkedin.com/in/ianpoe/" },
  { name: "Kian Rafian",         team: "Frame", role: "Frame Engineer", photo: "assets/img/members/kian-rafian.jpg" },
  { name: "Tovi Ding",           team: "Frame", role: "Frame Engineer", photo: "assets/img/members/tovi-ding.jpg", link: "https://ocf.io/tovi" },
  { name: "Zoe Khuu",            team: "Frame", role: "Frame Engineer", photo: "assets/img/members/zoe-khuu.jpg", link: "https://www.instagram.com/zoe.thuy.k/" },

  // Suspension
  { name: "Sean Giomi",          team: "Suspension", role: "Lead Suspension Engineer", photo: "assets/img/members/sean-giomi.jpg", link: "https://sites.google.com/berkeley.edu/sean-giomi/portfolio" },
  { name: "Grant Hough",         team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/grant-hough.jpg", link: "https://granthough.com" },
  { name: "Tony Blonska",        team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/tony-blonska.jpg" },
  { name: "Jacob Stutz",         team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/jacob-stutz.jpg", link: "https://www.linkedin.com/in/jacob-stutz/" },
  { name: "Livia Yang",          team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/livia-yang.jpg" },
  { name: "Luke Hollingsworth",  team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/luke-hollingsworth.jpg", link: "https://www.linkedin.com/in/luke-hollingsworth-02a44a233" },
  { name: "Myles Heller",        team: "Suspension", role: "Suspension Engineer", photo: "assets/img/members/myles-heller.jpg", link: "https://www.linkedin.com/in/myles-heller/" },

  // Composites
  { name: "Pranav Amarnath",     team: "Composites", role: "Lead Composites Engineer", photo: "assets/img/members/pranav-amarnath.jpg", link: "https://pranavamarnath.myportfolio.com/" },
  { name: "Edwin Luck",          team: "Composites", role: "Composites Engineer", photo: "assets/img/members/edwin-luck.jpg", link: "https://www.linkedin.com/in/edwin-luck/" },

  // EECS
  { name: "Lachlan Watts-Tobin", team: "EECS", role: "Lead Electrical Engineer", photo: "assets/img/members/lachlan-watts-tobin.jpg", link: "https://lachlanwt.com" },
  { name: "Richard Cao",         team: "EECS", role: "Electrical Engineer", photo: "assets/img/members/richard-cao.jpg" },
  { name: "Yifan Liu",           team: "EECS", role: "Electrical Engineer", photo: "assets/img/members/yifan-liu.jpg" },

  // Founders
  { name: "Ziven Posner",        team: "founder", role: "President (2021–2024)", photo: "assets/img/members/ziven-posner.jpg" },
  { name: "Jacob Pashman",       team: "founder", role: "Co-Founder",            photo: "assets/img/members/jacob-pashman.jpg" },
];

/* Home page "Member Spotlight" carousel — club president + subteam leads */
BBB.spotlight = [
  // Name must match BBB.members — photo, role, subteam and link are pulled from there.
  // Add an optional blurb: "..." to replace the default one-liner.
  // funFact: "..." fills the "Fun fact:" line (it shows as a blank until filled).
  { name: "Neel Chandran",       funFact: "" },
  { name: "Ian Poe",             funFact: "" },
  { name: "Sean Giomi",          funFact: "" },
  { name: "Pranav Amarnath",     funFact: "" },
  { name: "Lachlan Watts-Tobin", funFact: "" },
];

/* ---------- Projects ----------
   The project marked featured: true is the big one at the top of projects.html.
   The rest show below it in the order listed here.
   id:     used in the URL → project.html?id=<id>
   heroImages: [main photo, wide strip, overview photo, second overview photo]
   overview: { objective, planning, final } or { sections: [{ title, body }] }
   links:  buttons under the description, e.g. a design report
   year:   shown on the project card
   cover:  card image (leave "" for a "Photo needed" placeholder)
   Everything else feeds the project detail page; any field can be left out. */
// Home page "Our Work": the 3 small shout-out cards under the featured project (by project id).
// Leave this list empty to show the 3 newest projects automatically.
BBB.homeShoutouts = ["tube-winder-2026", "dh-mtb-2025", "steel-mtb-2024"];

BBB.projects = [
  {
    id: "mtb-2026",
    featured: true,
    title: "Modal Trail Bike (MTB)",
    year: "2026",
    cover: "assets/img/seaotter-bike.jpg",
    summary: "Our newest build: a full-suspension trail bike with carbon fiber tubes wound in house on our Tube Winder and bonded to 3D-printed aluminum lugs. It debuted at the 2026 Sea Otter Classic.",
    description: [
      "The Modal Trail Bike pairs carbon fiber tubes, made in house on our 2026 Tube Winder, with 3D-printed aluminum lugs.",
      "We brought the finished bike to the 2026 Sea Otter Classic in Monterey, where it sat at our booth alongside our tube winder.",
    ],
    heroImages: ["assets/img/seaotter-bike.jpg", "assets/img/seaotter-detail2.jpg", "assets/img/projects/tw2-tubes-on-frame.jpg", "assets/img/seaotter-headbadge.jpg"],
    overview: {
      objective: "TODO: What the team set out to build with this bike and why (ride style, travel, goals).",
      planning: "Each tube was wound under tension around a sectioned, 3D-printed mandrel, vacuum bagged, and finished with heat-shrink wrap before being bonded into the aluminum lugs.",
      final: "A complete, rideable full-suspension trail bike, shown at the 2026 Sea Otter Classic.",
    },
    dataTitle: "How It's Made",
    dataPhotos: true,
    data: [
      { title: "Carbon Tubes", body: "Tubes are wound on our Tube Winder from carbon tow pulled through a resin bath. We weigh the tow spool before and after each wind and compare it to the final tube weight to keep the fiber-to-resin ratio consistent." },
      { title: "Lugs", body: "The tubes are bonded into 3D-printed aluminum lugs that form the joints of the frame, including the head tube with our B³ head badge." },
    ],
    dataImages: ["assets/img/projects/tw2-final-tubes.jpg", "assets/img/projects/tw2-the-bike.jpg", "assets/img/seaotter-detail.jpg"],
    links: [{ label: "See the Tube Winder", url: "project.html?id=tube-winder-2026" }],
    team: [],  // TODO: list the build team (names must match BBB.members, or use { name, role, photo })
  },
  {
    id: "gravel-2022",
    title: "Gravel Bike",
    year: "2022",
    cover: "assets/img/projects/gravel-cover.jpg",   // photos from Ziven Posner's Behance gallery
    summary: "Our first bike: a steel gravel frame designed, jigged, cut, and TIG welded by the club, then finished in Cal blue and gold.",
    description: [
      "The gravel bike was the club's first build, designed in Fusion 360 and fabricated almost entirely in house, from the welding jig to the final paint.",
      "The build was topped off with a Redshift compliant seatpost and stem, plus Kitchen Sink handlebars and bar tape.",
    ],
    heroImages: ["assets/img/projects/gravel-cover.jpg", "assets/img/projects/gravel-wall-wide.jpg", "assets/img/projects/gravel-jig.jpg", "assets/img/projects/gravel-weld.jpg"],
    links: [{ label: "See Ziven's photo gallery", url: "https://www.behance.net/gallery/152330011/Gravel-Bike" }],
    overview: {
      sections: [
        { title: "Jig Design", body: "The frame jig was built mostly from 80/20 aluminum extrusion for convenience, so it could be adjusted and reused as the design changed." },
        { title: "Welding", body: "With every tube cut and held in place, the whole frame was tacked together first, then fully TIG welded." },
        { title: "Finishing", body: "The frame was painted with spray paint and custom stencils, then shot on the UC Berkeley campus." },
      ],
    },
    dataTitle: "Fixtures & Cutting",
    dataPhotos: true,
    data: [
      { title: "Tapered Cones", body: "Custom machined tapered cones keep cylindrical parts like the head tube and bottom bracket concentric in the jig." },
      { title: "Dropout Jig", body: "A 3D-printed and machined dropout jig locks the rear dropouts in the right position while the rear triangle is welded." },
      { title: "Cutting Jigs", body: "3D-printed jigs held the curved and tapered tubes steady for cutting and mitering. They worked incredibly well." },
    ],
    dataImages: ["assets/img/projects/gravel-jig-cad.jpg", "assets/img/projects/gravel-cones.jpg", "assets/img/projects/gravel-cutting-jig.jpg"],
    team: [{ name: "Justin Peck", role: "Gravel Bike Lead", photo: "assets/img/members/justin-peck.jpg" }],
  },
  {
    id: "carbon-mtb-2023",
    title: "Full Carbon Mountain Bike",
    year: "2023",
    cover: "assets/img/mtb-v1.jpg",   // extra photos from Ziven Posner's write-up
    summary: "Our first full-suspension mountain bike: a carbon fiber frame with a single pivot rear suspension, the result of a two-year plan that started with the club.",
    description: [
      "This single pivot mountain bike was built as a tool for rapid, hands-on learning. As a new club we wanted to gain as much experience as possible, and full suspension and carbon fiber were the two areas we knew the least about.",
      "The fall semester involved a month of industrial design and two months in CAD. The spring semester was a manufacturing frenzy, including a few last-minute design changes. Huge shout-out to FSA: we would not have been able to finish the build without their incredibly generous parts donation.",
    ],
    heroImages: ["assets/img/mtb-v1.jpg", "assets/img/projects/cc1-detail-wide.jpg", "assets/img/projects/cc1-layup.jpg", "assets/img/projects/cc1-back.jpg"],
    links: [
      { label: "Read Ziven's write-up", url: "https://ziven.com/assets/projects/cc-1/cc1" },
      { label: "Pinkbike bike check", url: "https://www.pinkbike.com/news/bike-check-uc-berkeley-students-handmade-carbon-mountain-bike.html" },
    ],
    overview: {
      sections: [
        { title: "Objective", body: "When starting the club in Fall 2021, we outlined a two-year plan to build a composite full-suspension mountain bike." },
        { title: "Sea Otter 2023", body: "After finishing the bike, we brought it to Sea Otter 2023 and pedaled it around for sponsors. That is how we secured Öhlins as a sponsor for our next bike." },
        { title: "Lessons Learned", body: "One of the biggest takeaways was the value of prototyping in steel, which is much quicker and easier to build with. It's a pretty incredible feeling to work on something for two solid years and have it go according to plan. That's not to say it was easy: this project literally involved blood, sweat, and tears." },
      ],
    },
    data: [
      { title: "Suspension Deep Dive", body: "These curves are a product of the points we used for our single pivot suspension. Leverage ratio, anti-squat, and anti-rise all affect the bike's ride feel and handling. Choosing a single pivot style kept our first bike simple, which limited our choice of points. However, Cormac was able to design a bike that rides great anyway!" },
    ],
    dataImages: ["assets/img/mtb-v1-curves.png", "assets/img/mtb-v1-render.jpg"],
    team: [
      { name: "Ziven Posner",    role: "Co-Lead: ID, frame CAD, manufacturing, assembly" },
      { name: "Blaze Harris",    role: "Co-Lead: manufacturing guru, test rider", photo: "assets/img/members/blaze-harris.jpg" },
      { name: "Cormac Alonzo",   role: "Created the frame points", photo: "assets/img/members/cormac-alonzo.jpg" },
      { name: "Connor Hennig",   role: "Dropout design and manufacturing", photo: "assets/img/members/connor-hennig.jpg" },
      { name: "Zachary Liu",     role: "Dropout design and manufacturing", photo: "assets/img/members/zachary-liu.jpg" },
      { name: "Cameron Chaney",  role: "Designed and built the rear triangle welding jig", photo: "assets/img/members/cameron-chaney.jpg" },
      { name: "Luke Seybold",    role: "Designed the shock mount", photo: "assets/img/members/luke-seybold.jpg" },
      { name: "Josiah Polhemus", role: "Designed and built the rear triangle linkage", photo: "assets/img/members/josiah-polhemus.jpg" },
    ],
  },
  {
    id: "steel-mtb-2024",
    title: "Steel Mountain Bike",
    year: "2024",
    cover: "assets/img/projects/steel-bike-cover.jpg",   // photos from Justin Peck's write-up
    summary: "A steel full-suspension mountain bike with a unique linkage that passes through the center of the frame, using custom links and pivot hardware.",
    description: [
      "This project doubled as a training ground for the whole team.",
      "New members learned CAD, drawings, and machining in workshops, then each designed and made individual parts for the bike. The more advanced components were machined in house, and the steel frame was welded in our own fixture.",
    ],
    heroImages: ["assets/img/projects/steel-bike-cover.jpg", "assets/img/projects/steel-welding-wide.jpg", "assets/img/projects/steel-linkage-section.jpg", "assets/img/projects/steel-bike.jpg"],
    links: [{ label: "Read Justin's write-up", url: "https://justinpeck.me/bike-builders-of-berkeley-steel-full-suspension-mountain-bike.html" }],
    overview: {
      sections: [
        { title: "The Linkage", body: "Instead of mounting the suspension linkage outside the main triangle, this design passes it through the center of the frame. That called for custom links and pivot hardware, designed and built by the team." },
        { title: "Learning by Building", body: "Project leads ran workshops on the basics of CAD, technical drawings, and machining. Each new member then took ownership of individual parts, carrying them from design through manufacturing." },
        { title: "Manufacturing", body: "The more advanced components were machined in house, and the steel tubes were welded into a complete, rideable full-suspension frame." },
      ],
    },
    team: [
      { name: "Blaze Harris",    role: "Co-Lead: manufacturing guru, test rider", photo: "assets/img/members/blaze-harris.jpg" },
      { name: "Justin Peck",     role: "Co-Lead: frame design", photo: "assets/img/members/justin-peck.jpg" },
      { name: "Zachary Liu",     role: "Dropout design and manufacturing", photo: "assets/img/members/zachary-liu.jpg" },
      { name: "Ziven Posner",    role: "Manufacturing, assembly" },
      { name: "Kian Rafian",     role: "Frame" },
      { name: "Sophia Campbell", role: "Peripherals design and manufacturing" },
      { name: "Pranav Amarnath", role: "Dropout design and manufacturing" },
    ],
  },
  {
    id: "dh-mtb-2025",
    title: "Downhill Mountain Bike",
    year: "2025",
    cover: "assets/img/projects/dh-finished-bike.jpg",
    summary: "A fully custom downhill frame built to survive the high-impact loads of a race course: carbon fiber tubes wound in house, bonded to 3D-printed aluminum lugs.",
    description: [
      "Downhill riding puts extreme, repeated stress on a frame, so the design had to be stiff enough to handle hard landings and rough terrain while staying light enough to be competitive.",
      "We built the frame from carbon fiber (CFRP) tubes bonded to 3D-printed aluminum lugs. The hybrid pairs carbon's stiffness-to-weight with the complex geometry, tight tolerances, and suspension hardpoints that are far easier to get in metal. Rather than buy tubing, we wound every carbon tube in house on tooling we designed and built ourselves, giving us full control over wall thickness, layup, and cross-section.",
    ],
    heroImages: ["assets/img/projects/dh-finished-bike.jpg", "assets/img/projects/dh-tapered.jpg", "assets/img/projects/dh-assembly.jpg", "assets/img/projects/dh-frame-model.jpg"],
    links: [{ label: "Read Lachlan's full design report", url: "https://lachlanwt.github.io/projects/downhill-mountain-bike" }],
    overview: {
      sections: [
        { title: "Composites and Manufacturing", body: "Each tube starts as continuous carbon tow, wet out with epoxy and wound under controlled tension onto a sectioned mandrel that defines its inner shape. The wound tube is vacuum bagged and cured, then post-processed to compact the laminate, drive out excess resin, and leave a clean structural surface. Making our own tubes let us tune fiber orientation and resin content to the loads each part of the frame sees." },
        { title: "Results", body: "With the tubes wound and finished and the lugs machined and bonded, everything came together into a complete, rideable downhill frame: real hardware for the team to test, ride, and keep improving on in the next iteration." },
      ],
    },
    dataTitle: "Machining & Testing",
    dataPhotos: true,
    data: [
      { title: "Lugs and Hardware", body: "The lugs come off the printer close to net shape, so we post-machined the critical features by hand, reaming bearing bores and facing mating surfaces to tolerance. Custom fixtures and spacers kept bored holes concentric so the suspension pivots line up correctly." },
      { title: "Adhesive Testing", body: "The whole frame relies on the bond between the carbon tubes and the aluminum lugs. We bonded sample coupons with several candidate epoxies, pulled them to failure on an Instron machine to measure lap-shear strength, and chose the best performer for the final frame." },
      { title: "The Tapered Top Tube", body: "Unlike the other constant cross-section tubes, the top tube changes shape along its length, which a standard winding process can't produce. A custom G-code generator computes winding paths for variable cross-sections, adjusting the layup and machine motion as the profile changes, so the tapered top tube could be wound directly." },
    ],
    dataImages: ["assets/img/projects/dh-gcode-test.jpg", "assets/img/projects/dh-machining2.jpg", "assets/img/projects/dh-tensile2.jpg"],
    team: [{ name: "Pranav Amarnath" }, { name: "Lachlan Watts-Tobin" }, { name: "Zachary Liu", photo: "assets/img/members/zachary-liu.jpg" }, { name: "Kyle Blanset" }],
  },

  {
    id: "tube-winder-2025",
    title: "Tube Winder",
    year: "2025",
    cover: "assets/img/projects/tw1-render.jpg",   // other photos from Kyle Blanset's write-up
    summary: "Our first CNC carbon fiber filament winder: controlled, repeatable carbon tube manufacturing for bicycles and more.",
    description: [
      "Three stepper motors, controlled by an Arduino running G-code, wrap a single strand of 12k carbon fiber tow around a mandrel. The tow runs through a series of rollers to keep it under tension and through a resin bath on the way.",
      "Once wrapping is done, the tube can be cured with any conventional CFRP method: heat-shrink tape, vacuum bagging, or external molds.",
    ],
    heroImages: ["assets/img/projects/tw1-render.jpg", "assets/img/projects/tw1-winding-wide.jpg", "assets/img/projects/tw1-winding.jpg", "assets/img/projects/tw1-tube.jpg"],
    links: [
      { label: "Read Zach's full design report", url: "https://zachary-liu.com/cnc-cfrp-filament-winder" },
      { label: "Read Kyle's write-up", url: "https://kyleblanset.com/computer-controlled-carbon-fiber-tube-winder-for-bike-manufacturing/" },
    ],
    overview: {
      sections: [
        { title: "Design", body: "The base frame is 1000 mm by 500 mm and can wind tubes up to about 850 mm long and 100 mm in diameter. A dual-rail linear axis spreads the gantry's weight evenly. Preliminary calculations sized the stepper motors at 12.08 N·cm at 826 RPM for the linear axis and 18.73 N·cm at 278 RPM for the rotational axis." },
        { title: "Manufacturing and Assembly", body: "Custom parts were 3D printed over two weeks. The three stepper motors run from a CNC shield on an Arduino UNO with grbl firmware, controlled through Universal G-code Sender. The rollers are wrapped in Teflon tape to minimize tow breakage." },
        { title: "Process Dialed In", body: "After a successful dry run and first wet layup on a parchment-wrapped PVC mandrel, the team produced six tubes in a single afternoon at 60°, 45°, and 30° fiber angles with 1.6 mm and 0.8 mm walls. These tubes went into our 2025 downhill bike, BBB DH 1.91." },
      ],
    },
    dataPhotos: true,
    dataTitle: "Data & Testing",
    data: [
      { title: "Motion", body: "The gantry moves along the linear axis on one stepper motor, the tow head rotates for smooth tow dispensing on a second, and the mandrel spins on a third." },
      { title: "G-code Generation", body: "A spreadsheet generates the G-code automatically from tube length, diameter, wrap angle, and number of layers. The machine is calibrated so 1 mm of G-code travel equals 1 mm on the linear axis and 1 degree of rotation on the others." },
      { title: "Testing", body: "Tubes were pulled to failure with machined end plugs to compare wrap angle against tensile strength, and tested in a custom 3-point bend fixture to find the strongest fiber orientation." },
      { title: "Custom Geometry", body: "We also experimented with PVA (3D printing support material) mandrels, which dissolve after curing to allow non-standard tube shapes with a well-controlled inner diameter." },
    ],
    dataImages: ["assets/img/projects/tw1-cad.jpg"],
    team: [{ name: "Zachary Liu", role: "Project Lead: top-level CAD and detailed design", photo: "assets/img/members/zachary-liu.jpg" }], // TODO: co-lead and team of 6
  },
  {
    id: "tube-winder-2026",
    title: "Tube Winder",
    year: "2026",
    cover: "assets/img/projects/tw2-cover.jpg",
    summary: "Our second-generation carbon fiber filament winder, which wound the tubes for the Modal Trail Bike.",
    description: [
      "The winder wraps carbon tow under tension around removable mandrels. The wound tubes are then cured and finished into structural tubes that are bonded to 3D-printed aluminum lugs.",
      "This version added a new tow head and carbon routing, sectioned mandrels, a repeatable resin process, and a vacuum and heat-shrink post-processing setup for a better tube finish.",
    ],
    heroImages: ["assets/img/projects/tw2-cover.jpg", "assets/img/projects/tw2-winding2.jpg", "assets/img/projects/tw2-mandrel3.jpg", "assets/img/projects/tw2-final-tubes.jpg"],
    links: [{ label: "Read Lachlan's full design report", url: "https://lachlanwt.github.io/projects/carbon-fiber-winder" }],
    overview: {
      sections: [
        { title: "Winding and Tooling", body: "Multi-section mandrels with dovetail joints can be 3D printed in pieces while staying rigid under winding tension." },
        { title: "Resin Control", body: "We weigh the tow spool before and after winding and compare it to the final tube weight to hit a consistent fiber-to-resin ratio from tube to tube." },
        { title: "Post-Processing", body: "Wound tubes go into a vacuum bag on a disconnectable vacuum system, then get heat-shrink wrapped to remove excess resin and leave a better surface finish." },
      ],
    },
    dataTitle: "Design Details",
    dataPhotos: true,
    data: [
      { title: "Tow Head", body: "A redesigned tow head guides the carbon tow onto the mandrel and rotates to lay it down smoothly." },
      { title: "Carbon Routing and Tow Holder", body: "New carbon routing and a tow holder feed the tow from the spool to the head under steady tension." },
      { title: "On the Bike", body: "The finished tubes were bonded to 3D-printed aluminum lugs to build the 2026 Modal Trail Bike, which we showed alongside the winder at Sea Otter." },
    ],
    dataImages: ["assets/img/projects/tw2-towhead-model.jpg", "assets/img/projects/tw2-towhead.jpg", "assets/img/projects/tw2-towholder.jpg"],
    team: [
      { name: "Lachlan Watts-Tobin", role: "Tow head, carbon routing, rotation system, mandrels, resin process, post-processing" },
      { name: "Pranav Amarnath" },
    ],
  },
];

/* ---------- Sponsors ---------- */
BBB.sponsors = {
  currentSeason: "2026–2027",
  current: [
    { name: "SRAM", logo: "assets/img/sponsors/sram.png", url: "https://www.sram.com" },
  ],
  pastSeasons: "2022–2026",
  // wide: true = double-width tile (good for long wordmarks). Keep the wide count
  // at 0 or 6 so the grid fills evenly, or expect a short last row.
  past: [
    { name: "Easy Composites", logo: "assets/img/sponsors/easy-composites.png", wide: true },
    { name: "Full Speed Ahead", logo: "assets/img/sponsors/fsa.png", wide: true },
    { name: "Stashed", logo: "assets/img/sponsors/stashed.png", wide: true },
    { name: "Engineering Student Council", logo: "assets/img/sponsors/esc.png", wide: true },
    { name: "Hipo Wood", logo: "assets/img/sponsors/hipo-wood.png" },
    { name: "Redshift", logo: "assets/img/sponsors/redshift.png" },
    { name: "PNW Components", logo: "assets/img/sponsors/pnw-components.png", url: "https://www.pnwcomponents.com" },
    { name: "Autodesk Fusion 360", logo: "assets/img/sponsors/autodesk-fusion.png" },
    { name: "Sportful", logo: "assets/img/sponsors/sportful.png" },
    { name: "Hopper Adventures", logo: "assets/img/sponsors/hopper.png" },
    { name: "Airgas", logo: "", wide: true },                       // TODO: logo file
    { name: "Bicycle Fabrication Supply", logo: "", wide: true },   // TODO: logo file
  ],
};

/* ---------- Alumni destinations (About page) ----------
   Where members have interned or worked.
   logo: image in assets/img/alumni/ (leave empty to show the name as text)
   showName: true prints the name under a symbol-only logo
   Most logos were cut from the old site's alumni image, so they're low-res.
   Swap in official SVG/PNG files from each company's press kit before launch. */
BBB.alumni = [
  { name: "Apple",         logo: "assets/img/alumni/apple.svg", small: true },
  { name: "SpaceX",        logo: "assets/img/alumni/spacex.png" },
  { name: "Tesla",         logo: "assets/img/alumni/tesla.png", small: true },
  { name: "Boeing",        logo: "assets/img/alumni/boeing.svg", small: true, showName: true }, // TODO: official wordmark
  { name: "SRAM",          logo: "assets/img/alumni/sram.png" },
  { name: "Specialized",   logo: "assets/img/alumni/specialized.png" },
  { name: "Rivian",        logo: "assets/img/alumni/rivian.png" },
  { name: "Intuitive",     logo: "" }, // TODO: logo file
  { name: "Bosch",         logo: "assets/img/alumni/bosch.png" },
  { name: "Foxconn",       logo: "" }, // TODO: logo file
  { name: "Cisco",         logo: "assets/img/alumni/cisco.png", small: true },
  { name: "Mastercard",    logo: "assets/img/alumni/mastercard.png", small: true },
  { name: "Calfee Design", logo: "assets/img/alumni/calfee.png" },
  { name: "Bimotal",       logo: "assets/img/alumni/bimotal.png" },
];

/* ---------- FAQs ---------- */
BBB.faq = {
  about: [
    { q: "Do you need any prior experience?", a: "Nope! No prior experience is needed. You’ll learn everything you need to know by building with us." },
    { q: "I don’t own a bike… can I still join?", a: "Absolutely. Having a bike is not a requirement to join, but it does make our group rides more fun!" },
    { q: "Where do you get your custom parts?", a: "Our generous sponsors supply our components, and we make our frames in house at our shop at the Richmond Field Station." },
    { q: "Can y’all fix my bike??", a: "Sorry, no! We build bikes, but we don’t repair them. We are not to be confused with BicyCAL :)" },
  ],
  apply: [
    { q: "Do you need any prior experience?", a: "Nope! No prior experience is needed. You’ll learn everything you need to know by building with us." },
    { q: "What are the onboarding projects like?", a: "Onboarding projects are a fun introduction to the kind of work your subteam does. They’re not meant to be a barrier to getting involved, but a way to start gaining experience the moment you join!" },
    { q: "What’s the time commitment?", a: "All members are required to come to our general meetings. Beyond that, it’s up to you how much you want to contribute to your subteam and how many trips to our shop at the Richmond Field Station (RFS) you want to go on!" },
    { q: "Do I have to reapply every semester?", a: "Nope! Once you’re in, you’re in. No reapplication needed." },
  ],
};

/* ---------- Recruiting timeline (Apply page) ---------- */
// Recruiting timeline: only shown on the Apply page while BBB.site.applicationsOpen is true.
BBB.recruiting = [
  { title: "Tabling",           date: "TODO: 01/18 – 01/25", body: "TODO: Where to find us on Sproul." },
  { title: "Coffee Chats",      date: "TODO: 01/20 – 01/23", body: "TODO: How to sign up for a coffee chat." },
  { title: "Info Session",      date: "TODO: 01/23",         body: "TODO: Time and location." },
  { title: "Applications Due",  date: "TODO: 01/30",         body: "TODO: Link to the application." },
  { title: "Onboarding Projects", date: "TODO: 02/01 – 02/07", body: "TODO: What the onboarding projects involve." },
  { title: "Acceptances!",      date: "TODO: 02/08",         body: "TODO: Welcome message." },
];
