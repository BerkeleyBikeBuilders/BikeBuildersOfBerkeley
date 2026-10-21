/* =========================================================================
   Bike Builders of Berkeley — shared site behaviour
   - Injects the header + footer on every page (edit them once, here)
   - Renders content from data.js into any element with [data-render]
   - Ribbons, marquees, mobile menu, mailto forms, scroll reveal
   ========================================================================= */
(function () {
  "use strict";
  const BBB = window.BBB || {};
  const doc = document;
  doc.documentElement.classList.remove("no-js");

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Text starting with "TODO:" renders as a highlighted placeholder.
  const txt = (s) => {
    s = String(s ?? "");
    return /^TODO:/i.test(s) ? `<mark class="todo">${esc(s)}</mark>` : esc(s);
  };
  const initials = (name) => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const $ = (sel, root = doc) => root.querySelector(sel);
  const $$ = (sel, root = doc) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const photo = (src, alt, label, extra = "") =>
    src
      ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" ${extra}>`
      : `<div class="ph" role="img" aria-label="Photo coming soon: ${esc(label)}">Photo needed:<br>${esc(label)}</div>`;
  const personPhoto = (m) =>
    m.photo
      ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
      : `<div class="ph ph--person" role="img" aria-label="Photo coming soon: ${esc(m.name)}"><span class="ph__initials">${esc(initials(m.name))}</span><span>Headshot needed</span></div>`;

  /* ---------- Brand mark: the club badge (assets/img/logo.png) ---------- */
  const logo = (cls = "") => `<img class="${cls}" src="assets/img/logo.png" alt="" width="443" height="444">`;
  const ARROW_UR = `<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="display:inline;vertical-align:-1px"><path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;
  const CHEVRON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* ---------- Header ---------- */
  const NAV = [
    ["About Us", "about.html"],
    ["Projects", "projects.html"],
    ["Members", "members.html"],
    ["Sponsors", "sponsors.html"],
  ];
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isCurrent = (href) => here === href || (href === "projects.html" && here === "project.html");

  function renderHeader() {
    const mount = $("[data-site-header]");
    if (!mount) return;
    const links = NAV.map(([t, h]) => `<a href="${h}"${isCurrent(h) ? ' aria-current="page"' : ""}>${t}</a>`).join("");
    mount.outerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header" id="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="index.html" aria-label="Bike Builders of Berkeley home page">${logo("brand__logo")}<span>Bike Builders of Berkeley</span></a>
          <nav class="nav" aria-label="Primary">${links}</nav>
          <div class="header-cta">
            <a class="btn btn--ghost btn--sm" href="contact.html"${here === "contact.html" ? ' aria-current="page"' : ""}>Contact Us</a>
            <a class="btn btn--apply btn--sm" href="apply.html"${here === "apply.html" ? ' aria-current="page"' : ""}>Apply Now</a>
          </div>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
        </div>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        ${links}
        <a href="contact.html">Contact Us</a>
        <div class="btn-row"><a class="btn btn--white" href="apply.html">Apply Now</a></div>
      </div>`;

    const header = $("#site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $(".menu-toggle");
    const menu = $("#mobile-menu");
    const setOpen = (open) => {
      doc.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.setAttribute("aria-hidden", String(!open));
    };
    toggle.addEventListener("click", () => setOpen(!doc.body.classList.contains("menu-open")));
    doc.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  /* ---------- Footer ---------- */
  function socialLinks() {
    return Object.entries(BBB.site?.social || {})
      .map(([name, url]) =>
        url ? `<li><a href="${esc(url)}" target="_blank" rel="noopener">${name} ${ARROW_UR}</a></li>` : ""
      )
      .join("");
  }

  function renderFooter() {
    const mount = $("[data-site-footer]");
    if (!mount) return;
    const withNewsletter = mount.hasAttribute("data-newsletter");
    const loop = Array(6).fill("Stay in the loop •&nbsp;").join("");
    mount.outerHTML = `
      <footer class="site-footer">
        ${withNewsletter ? `
        <div class="container newsletter">
          <div>
            <h2>Join our Newsletter</h2>
            <p>Subscribe to our email updates for new info, merch drops, and more!</p>
          </div>
          <form class="pill-input" data-newsletter-form>
            <label class="sr-only" for="nl-email">Email address</label>
            <input id="nl-email" type="email" name="email" placeholder="Email Address" required autocomplete="email">
            <button class="btn btn--primary" type="submit">Sign Up</button>
          </form>
        </div>` : ""}
        <div class="loop" aria-hidden="true">
          <div class="marquee" style="--marquee-duration:30s"><div class="marquee__track">
            <div class="marquee__group loop__text" style="padding-right:0">${loop}</div>
            <div class="marquee__group loop__text" style="padding-right:0">${loop}</div>
          </div></div>
        </div>
        <div class="container footer__bottom">
          <a class="footer__brand" href="index.html" aria-label="Bike Builders of Berkeley home page">${logo()}<span>Bike<br>Builders<br>of Berkeley</span></a>
          <div class="footer__cols">
            <ul><li><a href="about.html">About Us</a></li><li><a href="projects.html">Projects</a></li><li><a href="members.html">Members</a></li></ul>
            <ul><li><a href="sponsors.html">Sponsors</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="apply.html">Apply Now</a></li></ul>
            <ul>${socialLinks()}</ul>
          </div>
        </div>
        <div class="container"><div class="footer__legal">
          <span>© ${new Date().getFullYear()} Bike Builders of Berkeley</span>
          <a href="mailto:${esc(BBB.site?.email)}">${esc(BBB.site?.email)}</a>
        </div></div>
      </footer>`;
  }

  /* ---------- Ribbon: text scrolling along a curved band ---------- */
  const RIBBON_PATHS = {
    // Rises from left to right, like the home + apply heroes
    rise: { vb: "0 0 1512 300", d: "M-120 170 C 200 260, 520 255, 820 185 S 1330 50, 1640 10" },
    // Gentle S-wave, like the Members page
    wave: { vb: "0 0 1512 260", d: "M-120 250 C 150 40, 450 30, 760 130 S 1300 200, 1640 -40" },
  };
  function initRibbons() {
    $$("[data-ribbon]").forEach((el, i) => {
      const shape = RIBBON_PATHS[el.dataset.shape] || RIBBON_PATHS.rise;
      const text = (BBB.site.applicationsOpen === false && el.dataset.ribbonClosed) || el.dataset.ribbon;
      const phrase = text.trim() + " • ";
      const band = el.dataset.band || "#fdb515";
      const ink = el.dataset.ink || "#003262";
      const id = "ribbon-path-" + i;
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `
        <svg viewBox="${shape.vb}" preserveAspectRatio="xMidYMid meet">
          <path id="${id}" d="${shape.d}" fill="none" stroke="${band}" stroke-width="66" />
          <text font-size="34" fill="${ink}" dy="12"><textPath href="#${id}" startOffset="0">${esc(phrase.repeat(8))}</textPath></text>
        </svg>`;
      const tp = $("textPath", el);
      const svgText = $("text", el);
      // Measure one phrase so the loop is seamless (re-measured once fonts load)
      let unit = 600;
      const measure = () => {
        const probe = doc.createElementNS("http://www.w3.org/2000/svg", "text");
        probe.setAttribute("font-size", "34");
        probe.textContent = phrase;
        svgText.parentNode.appendChild(probe);
        unit = probe.getComputedTextLength() || unit;
        probe.remove();
      };
      measure();
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(measure);
      if (reduceMotion) return;
      let offset = 0, last = performance.now(), visible = true;
      new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(el);
      const speed = parseFloat(el.dataset.speed || "45"); // svg units / second
      const tick = (t) => {
        const dt = Math.min(64, t - last); last = t;
        if (visible) {
          offset -= (speed * dt) / 1000;
          if (offset <= -unit) offset += unit;
          tp.setAttribute("startOffset", offset.toFixed(2));
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Projects: featured + the rest, newest first ---------- */
  const featuredProject = () => BBB.projects.find((p) => p.featured) || BBB.projects[0];
  const otherProjectsNewestFirst = () => {
    const f = featuredProject();
    // Newest first; projects from the same year keep their order in data.js.
    return BBB.projects.filter((p) => p !== f)
      .map((p, i) => [p, i]).sort((a, b) => (parseInt(b[0].year) || 0) - (parseInt(a[0].year) || 0) || a[1] - b[1])
      .map(([p]) => p);
  };
  const projectLink = (p) => `project.html?id=${encodeURIComponent(p.id)}`;

  /* ---------- Decorative bike-part graphics (Members page) ----------
     Drawn inline (not as CSS masks) so they also show when the site is opened straight from disk. */
  const DECO_SVG = {
    rotor: `<svg viewBox="0 0 200 200"><path fill="currentColor" fill-rule="evenodd" d="M197.00,100.00 a97,97 0 1,0 -194.00,0 a97,97 0 1,0 194.00,0 Z M164.00,100.00 a64,64 0 1,0 -128.00,0 a64,64 0 1,0 128.00,0 Z M178.20,100.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M182.44,120.96 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M168.29,137.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M161.48,157.28 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M141.20,164.09 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M125.16,178.24 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M104.20,174.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M83.24,178.24 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M67.20,164.09 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M46.92,157.28 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M40.11,137.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M25.96,120.96 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M30.20,100.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M25.96,79.04 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M40.11,63.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M46.92,42.72 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M67.20,35.91 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M83.24,21.76 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M104.20,26.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M125.16,21.76 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M141.20,35.91 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M161.48,42.72 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M168.29,63.00 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M182.44,79.04 a4.2,4.2 0 1,0 -8.40,0 a4.2,4.2 0 1,0 8.40,0 Z M130.00,100.00 a30,30 0 1,0 -60.00,0 a30,30 0 1,0 60.00,0 Z M114.00,100.00 a14,14 0 1,0 -28.00,0 a14,14 0 1,0 28.00,0 Z M122.05,111.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z M103.00,122.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z M83.95,111.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z M83.95,89.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z M103.00,78.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z M122.05,89.00 a3,3 0 1,0 -6.00,0 a3,3 0 1,0 6.00,0 Z"/><path fill="currentColor" d="M126.2,93.3 Q149.9,108.5 163.7,117.2 L157.8,131.9 Q149.9,96.5 126.2,106.7 Z M118.9,119.3 Q117.6,147.5 116.9,163.8 L101.3,166.0 Q128.0,141.5 107.3,126.0 Z M92.7,126.0 Q67.7,139.0 53.2,146.6 L43.5,134.1 Q78.1,145.0 81.1,119.3 Z M73.8,106.7 Q50.1,91.5 36.3,82.8 L42.2,68.1 Q50.1,103.5 73.8,93.3 Z M81.1,80.7 Q82.4,52.5 83.1,36.2 L98.7,34.0 Q72.0,58.5 92.7,74.0 Z M107.3,74.0 Q132.3,61.0 146.8,53.4 L156.5,65.9 Q121.9,55.0 118.9,80.7 Z"/></svg>`,
  };
  // Chain routes: each is a viewBox plus one or more SVG paths the links follow.
  // "branch" mimics the chains in our slide decks (strands meeting at one link).
  // Every strand starts and ends past the left/right edge of the page, so no chain end is ever visible.
  const CHAIN_SHAPES = {
    branch: { vb: [1440, 900], pitch: 50, paths: [
      "M1500 70 C 1400 110, 1320 220, 1290 360",
      "M1500 250 C 1420 270, 1330 300, 1290 360",
      "M1290 360 C 1270 520, 1380 640, 1500 700",
      "M1290 360 C 1180 470, 900 520, 640 600 S 160 760, -60 820",
    ] },
    wave:   { vb: [1440, 320], pitch: 50, paths: ["M-60 230 C 260 40, 560 30, 760 160 S 1200 330, 1500 110"] },
    swoop:  { vb: [1440, 700], pitch: 50, paths: ["M1500 40 C 1150 110, 1180 400, 780 460 S 200 540, -60 670"] },
  };
  let decoId = 0;
  // A realistic roller-chain link: two round ends joined by a waisted (pinched) middle
  function chainPlate(p) {
    const r = p * 0.34, w = p * 0.2, t = 52 * Math.PI / 180;
    const cx = r * Math.cos(t), cy = r * Math.sin(t);
    return `M${cx},${-cy} Q${p / 2},${-w} ${p - cx},${-cy} A${r},${r} 0 1,1 ${p - cx},${cy} Q${p / 2},${w} ${cx},${cy} A${r},${r} 0 1,1 ${cx},${-cy}Z`;
  }
  function drawChain(el) {
    const shape = CHAIN_SHAPES[el.dataset.shape] || CHAIN_SHAPES.wave;
    const [W, H] = shape.vb, pitch = Number(el.dataset.pitch) || shape.pitch || 58, id = "chain-gap-" + ++decoId;
    el.style.aspectRatio = `${W} / ${H}`;
    // Lay out invisible guide paths first so we can measure them
    el.innerHTML = `<svg aria-hidden="true" focusable="false" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${shape.paths.map((d) => `<path d="${d}" fill="none" stroke="none"/>`).join("")}</svg>`;
    const svg = $("svg", el), plates = [], pins = [];
    $$("path", svg).forEach((path) => {
      const len = path.getTotalLength();
      let prev = path.getPointAtLength(0);
      pins.push(prev);
      for (let d = pitch; d <= len + 0.01; d += pitch) {
        const pt = path.getPointAtLength(Math.min(d, len));
        const ang = Math.atan2(pt.y - prev.y, pt.x - prev.x) * 180 / Math.PI;
        plates.push(`<path d="${chainPlate(Math.hypot(pt.x - prev.x, pt.y - prev.y))}" transform="translate(${prev.x.toFixed(1)} ${prev.y.toFixed(1)}) rotate(${ang.toFixed(1)})"/>`);
        pins.push(pt); prev = pt;
      }
    });
    const rr = pitch * 0.17, sw = pitch * 0.055;
    svg.innerHTML = `
      <defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-50" y="-50" width="${W + 100}" height="${H + 100}">
        <rect x="-50" y="-50" width="${W + 100}" height="${H + 100}" fill="#fff"/>
        ${pins.map((q) => `<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="#000" stroke-width="${sw.toFixed(1)}"/>`).join("")}
      </mask></defs>
      <g fill="currentColor" mask="url(#${id})">${plates.join("")}</g>`;
  }
  function initDeco() {
    $$(".deco").forEach((el) => {
      if (el.classList.contains("deco--chain")) return drawChain(el);
      el.innerHTML = DECO_SVG.rotor.replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
    });
  }

  /* ---------- Content renderers ---------- */
  const renderers = {
    // Home page "Our Work": the featured project big, then shout-outs to the 3 newest others
    "work-showcase": () => {
      const f = featuredProject();
      const picks = (BBB.homeShoutouts || []).map((id) => BBB.projects.find((p) => p.id === id)).filter(Boolean);
      const others = (picks.length ? picks : otherProjectsNewestFirst()).slice(0, 3);
      return `
        <a class="work-feature" href="${projectLink(f)}">
          ${photo(f.homeImage || f.cover, f.title, f.title)}
          <div class="work-feature__text">
            <span class="work-feature__tag">Latest Project</span>
            <span class="work-feature__title">${esc(f.title)} ${esc(f.year || "")}</span>
          </div>
        </a>
        <div class="work-mini">
          ${others.map((p) => `
            <a class="work-card" href="${projectLink(p)}">
              ${photo(p.cover, p.title, p.title)}
              <span>${esc(p.title)}<small>${esc(p.year || "")}</small></span>
            </a>`).join("")}
        </div>`;
    },
    "members-by-team": () =>
      (BBB.subteams || [])
        .map((team) => {
          const people = BBB.members.filter((m) => m.team === team).sort(byLeadThenName);
          if (!people.length) return "";
          return `
          <section class="subteam" aria-labelledby="team-${slugify(team)}">
            <h2 class="subteam__title" id="team-${slugify(team)}">${esc(team)}</h2>
            <div class="member-grid member-grid--center">${people.map(memberCard).join("")}</div>
          </section>`;
        })
        .join(""),
    "members-founders": () =>
      BBB.members.filter((m) => m.team === "founder").map(memberCard).join(""),

    spotlight: () => `<div class="spotlight__track">${
      BBB.spotlight
        .map((s) => ({ ...(BBB.members.find((m) => m.name === s.name) || {}), ...s }))
        .map((m) => `
        <article class="spot-card" aria-roledescription="slide">
          <div class="spot-card__body">
            <h3>${esc(m.name)}</h3>
            <p class="spot-card__role">${esc(m.role || "")}</p>
            <dl class="spot-card__facts">
              ${m.major ? `<div><dt>Major</dt><dd>${esc(m.major)}</dd></div>` : ""}
              ${m.year ? `<div><dt>Year</dt><dd>${esc(m.year)}</dd></div>` : ""}
              ${m.joined ? `<div><dt>Joined</dt><dd>${esc(m.joined)}</dd></div>` : ""}
            </dl>
            <p class="spot-card__fact"><b>Fun fact:</b> ${m.funFact ? esc(m.funFact) : '<span class="spot-card__blank" aria-label="coming soon"></span>'}</p>
          </div>
          <div class="spot-card__photo">${personPhoto(m)}</div>
        </article>`).join("")}</div>`,

    alumni: () =>
      (BBB.alumni || []).map((c) => `
        <li class="alumni__item${c.small ? " alumni__item--mark" : ""}" title="${esc(c.name)}">
          ${c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.name)}" loading="lazy">` : `<span class="alumni__word">${esc(c.name)}</span>`}
          ${c.logo && c.showName ? `<span class="alumni__name">${esc(c.name)}</span>` : ""}
        </li>`).join(""),

    "faq-about": () => faqList(BBB.faq.about),
    "faq-apply": () => faqList(BBB.faq.apply),

    "logo-marquee": () => {
      const logos = [...BBB.sponsors.past, ...BBB.sponsors.current]
        .filter((s) => s.logo)
        .filter((s, i, a) => a.findIndex((x) => x.logo === s.logo) === i)
        .map((s) => `<img src="${esc(s.logo)}" alt="${esc(s.name)}">`).join("");
      return `<div class="marquee__track"><div class="marquee__group">${logos}</div><div class="marquee__group" aria-hidden="true">${logos}</div></div>`;
    },

    "sponsors-current": () =>
      BBB.sponsors.current.map((s) => `
        <figure>
          <a class="logo-tile" href="${esc(s.url || "#")}" target="_blank" rel="noopener">${sponsorLogo(s)}</a>
          <figcaption><span class="tag" style="margin-top:0">${esc(s.name)}</span></figcaption>
        </figure>`).join(""),

    "sponsors-past": () =>
      BBB.sponsors.past.map((s) => `
        <div class="logo-tile${s.wide ? " logo-tile--wide" : ""}">${sponsorLogo(s)}</div>`).join(""),

    timeline: () => {
      if (BBB.site.applicationsOpen === false) {
        return `
        <div class="tl-group tl-group--band tl-closed on-dark">
          <div class="tl-bg"><img src="assets/img/bg-apply-band.jpg" alt="" loading="lazy"></div>
          <div class="container text-center reveal">
            <h2 class="h1">Applications are closed.</h2>
            <p class="lead">Check back in the spring!</p>
          </div>
        </div>`;
      }
      const steps = BBB.recruiting.map((s, i) => `
        <div class="tl-step reveal">
          <p class="tl-step__date">${txt(s.date)}</p>
          <span class="tl-step__num">${String(i + 1).padStart(2, "0")}.</span>
          <h3>${esc(s.title)}</h3>
          <p>${txt(s.body)}</p>
        </div>`);
      // Group as 2 / 2 (on photo band) / rest, to follow the Figma layout
      const pathL = `<div class="tl-path tl-path--left" aria-hidden="true"><svg viewBox="0 0 180 400" preserveAspectRatio="none"><path d="M40 20 L10 150 L150 260 L40 380" stroke="#fdb515" stroke-width="3" stroke-dasharray="10 9" fill="none" vector-effect="non-scaling-stroke"/><rect x="28" y="8" width="24" height="24" fill="#fdb515"/><rect x="28" y="368" width="24" height="24" fill="#fdb515"/></svg></div>`;
      const pathR = `<div class="tl-path tl-path--right" aria-hidden="true"><svg viewBox="0 0 180 400" preserveAspectRatio="none"><path d="M90 0 L60 120 L110 220 L170 260 L110 400" stroke="#fdb515" stroke-width="3" stroke-dasharray="10 9" fill="none" vector-effect="non-scaling-stroke"/><rect x="98" y="208" width="24" height="24" fill="#fdb515"/></svg></div>`;
      return `
        <div class="tl-group">${pathL}${steps.slice(0, 2).join("")}</div>
        <div class="tl-group tl-group--band on-dark"><div class="tl-bg"><img src="assets/img/bg-apply-band.jpg" alt="" loading="lazy"></div>${pathR}${steps.slice(2, 4).join("")}</div>
        <div class="tl-group">${pathL}${steps.slice(4).join("")}</div>`;
    },
  };

  function memberCard(m) {
    return `
      <article class="member reveal">
        <div class="frame">${personPhoto(m)}</div>
        <div class="member__meta">
          <div class="member__name">${esc(m.name)}</div>
          ${m.role ? `<div class="member__role">${esc(m.role)}</div>` : ""}
          ${m.link ? `<a class="member__link" href="${esc(m.link)}" target="_blank" rel="noopener">${linkLabel(m.link)} ${ARROW_UR}</a>` : ""}
        </div>
      </article>`;
  }
  function linkLabel(url) {
    if (/linkedin\.com/i.test(url)) return "LinkedIn";
    if (/instagram\.com/i.test(url)) return "Instagram";
    if (/github\.com/i.test(url)) return "GitHub";
    return "Website";
  }
  // Team lead (role starting with "Lead", or President) first, then everyone else A→Z by last name
  function byLeadThenName(a, b) {
    const isLead = (m) => /^(lead\b|president\b)/i.test(m.role || "");
    if (isLead(a) !== isLead(b)) return isLead(a) ? -1 : 1;
    // Last name for sorting, skipping suffixes like "Jr." or "IV"
    const last = (m) => m.name.trim().split(/\s+/).filter((w, i, a) => i === 0 || !/^(jr\.?|sr\.?|ii|iii|iv|v)$/i.test(w)).slice(-1)[0];
    return last(a).localeCompare(last(b)) || a.name.localeCompare(b.name);
  }
  function defaultBlurb(m) {
    if (/president/i.test(m.role || "")) return "Leads the club and keeps every subteam on track.";
    const team = m.team === "EECS" ? "electrical" : (m.team || "").toLowerCase();
    return `Leads our ${team} subteam.`;
  }
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function sponsorLogo(s) {
    return s.logo
      ? `<img src="${esc(s.logo)}" alt="${esc(s.name)}" loading="lazy">`
      : `<span class="logo-tile__word">${esc(s.name)}<small>Logo needed</small></span>`;
  }
  function faqList(items) {
    return items.map((f) => `
      <details class="faq__item">
        <summary>${esc(f.q)} ${CHEVRON}</summary>
        <div class="faq__answer">${txt(f.a)}</div>
      </details>`).join("");
  }

  function renderAll() {
    $$("[data-render]").forEach((el) => {
      const fn = renderers[el.dataset.render];
      if (fn) el.innerHTML = fn();
    });
  }

  /* ---------- Projects index (filter + search) ---------- */
  function initProjects() {
    const grid = $("[data-projects]");
    const hero = $("[data-project-featured]");
    if (!grid && !hero) return;
    const featured = featuredProject();
    const rest = otherProjectsNewestFirst();
    const label = (p) => `${p.title}${p.year ? " " + p.year : ""}`;

    if (hero) {
      const h = featured.heroImages || [];
      const [a, b] = [featured.cover || h[0], h[3] || h[2] || h[1]];
      hero.innerHTML = `
        <div class="reveal">
          <h1>Latest Project</h1>
          <p class="proj-hero__name">${esc(featured.title)} <span class="proj-hero__year">${esc(featured.year || "")}</span></p>
          <p>${txt(featured.summary)}</p>
          <a class="btn btn--primary" href="project.html?id=${encodeURIComponent(featured.id)}">Learn More</a>
        </div>
        <div class="proj-hero__art reveal">
          <div class="frame a">${photo(a, label(featured), label(featured))}</div>
          ${b ? `<div class="frame b">${photo(b, label(featured) + " detail", "detail")}</div>` : ""}
        </div>`;
    }
    if (grid) {
      grid.innerHTML = rest.map((p) => `
        <a class="proj-item" href="project.html?id=${encodeURIComponent(p.id)}">
          <div class="frame">${photo(p.cover, label(p), label(p))}</div>
          <p class="proj-item__cap"><b>${esc(p.title)}</b><br><span>${esc(p.year || "")}</span></p>
        </a>`).join("");
    }
  }

  /* ---------- Project detail ---------- */
  function initProjectDetail() {
    const root = $("[data-project-detail]");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id") || BBB.projects[0].id;
    const p = BBB.projects.find((x) => x.id === id);
    if (!p) {
      root.innerHTML = `<section class="section page-top"><div class="container"><h1 class="h1 text-primary">Project not found</h1><p style="margin-top:1rem"><a class="btn btn--primary" href="projects.html">Back to projects</a></p></div></section>`;
      return;
    }
    doc.title = `${p.title}${p.year ? " " + p.year : ""} · Bike Builders of Berkeley`;
    // heroImages: [main photo, wide strip, overview photo 1, overview photo 2]
    const [img1, img2, img3, img4] = p.heroImages || [];
    const o = p.overview;
    const members = (p.team || []).map((t) => {
      const e = typeof t === "string" ? { name: t } : t;   // "Name" or { name, role, photo }
      const m = BBB.members.find((x) => x.name === e.name) || {};
      return { ...m, ...e, photo: e.photo || m.photo || "" };
    });
    const links = (p.links || []).map((l) => `<a class="btn btn--primary" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${ARROW_UR}</a>`).join("");

    // "All projects" link sits inside the last section so the page runs flush into the footer
    const back = `<div class="container pd-back"><a class="btn btn--ghost" href="projects.html">← All projects</a></div>`;
    const lastIs = p.data ? "data" : o ? "overview" : "intro";
    root.innerHTML = `
      <section class="pd-intro">
        <div class="container">
          <div class="pd-grid">
            <div class="pd-grid__text">
              <h1 class="pd-title rule-heading">${esc(p.title)}${p.year ? " " + esc(p.year) : ""}</h1>
              <p class="pd-summary">${txt(p.summary)}</p>
            </div>
            <div class="frame">${photo(img1, p.title, p.title + ": hero photo")}</div>
            <div class="frame" style="aspect-ratio:3/1">${photo(img2, p.title + " detail", p.title + ": detail shot", 'style="object-position:center 60%"')}</div>
            <div class="pd-grid__caption">
              ${(Array.isArray(p.description) ? p.description : [p.description]).map((d) => `<p>${txt(d)}</p>`).join("")}
              ${links ? `<div class="btn-row" style="margin-top:1.5rem">${links}</div>` : ""}
            </div>
          </div>
        </div>
        ${lastIs === "intro" ? back.replace("btn--ghost", "btn--ghost on-light") : ""}
      </section>

      ${o ? `
      <section class="section pd-overview on-dark">
        ${img1 ? `<div class="pd-overview__bg"><img src="${esc(img1)}" alt="" loading="lazy"></div>` : ""}
        <div class="container split">
          <div>
            <h2 class="rule-heading">Overview</h2>
            ${(o.sections || [
              ["Objective", o.objective], ["Initial Planning &amp; Research", o.planning], ["Final Product", o.final],
            ].filter(([, b]) => b).map(([title, body]) => ({ title, body }))).map((x) => `<h3>${x.title}</h3><p>${txt(x.body)}</p>`).join("")}
          </div>
          <div class="pd-overview__imgs">
            <div class="frame">${photo(img3 || img2, p.title, p.title + ": process photo")}</div>
            ${img4 ? `<div class="frame">${photo(img4, p.title, p.title)}</div>` : ""}
          </div>
        </div>
        ${lastIs === "overview" ? back : ""}
      </section>` : ""}

      ${p.data ? `
      <section class="pd-data on-dark${(p.dataImages || []).length ? "" : " pd-data--solo"}">
        <div class="container pd-data__inner">
          ${(p.dataImages || []).length ? `<div class="pd-data__imgs">
            ${(p.dataImages || []).map((s, i) => `<div class="frame${p.dataPhotos ? " frame--photo" : ""}"${i ? ' style="aspect-ratio:1"' : ""}>${photo(s, p.title, "figure")}</div>`).join("")}
          </div>` : ""}
          <div class="pd-data__text">
            <h2 class="rule-heading">${esc(p.dataTitle || "Data & Analysis")}</h2>
            ${p.data.map((d) => `<h3>${esc(d.title)}</h3><p>${txt(d.body)}</p>`).join("")}
          </div>
        </div>
        ${back}
      </section>` : ""}`;
  }

  /* ---------- Carousel buttons ---------- */
  /* ---------- Leads spotlight slider ----------
     One card at a time, clickable dots, auto-advances. Starts on the first lead when it scrolls
     into view, and after the last lead the first one slides in from the right (seamless loop). */
  function initCarousels() {
    $$("[data-spotlight-dots]").forEach((dotsEl) => {
      const root = $(dotsEl.dataset.spotlightDots);
      const track = root && $(".spotlight__track", root);
      if (!track) return;
      const slides = Array.from(track.children);
      const n = slides.length;
      if (!n) return;
      // Copy of the first slide at the end, so the loop keeps moving right
      const clone = slides[0].cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
      dotsEl.innerHTML = slides.map((s, k) => {
        const name = $("h3", s)?.textContent || `Lead ${k + 1}`;
        return `<button type="button" role="tab" class="spotlight__dot" aria-label="Show ${esc(name)}"></button>`;
      }).join("");
      const dots = $$(".spotlight__dot", dotsEl);
      let i = 0, timer = null, busy = false;
      const delay = Number(root.dataset.autoplay) || 4000;
      const set = (k, animate) => {
        track.style.transition = animate && !reduceMotion ? "transform .8s cubic-bezier(.65,0,.35,1)" : "none";
        track.style.transform = `translateX(calc(${-k} * (100% + 2rem)))`;
        i = k;
        dots.forEach((d, j) => { const on = j === k % n; d.classList.toggle("is-active", on); d.setAttribute("aria-selected", on); });
        slides.forEach((s, j) => s.setAttribute("aria-hidden", j !== k % n));
      };
      track.addEventListener("transitionend", () => { busy = false; if (i === n) set(0, false); });
      const go = (k) => {
        if (k === i) return;
        if (reduceMotion) return set(((k % n) + n) % n, false);
        if (k < 0) { set(n, false); void track.offsetWidth; k = n - 1; }   // wrap backwards via the copy
        busy = true; set(k, true);
      };
      const restart = () => { clearInterval(timer); timer = setInterval(() => { if (!document.hidden && !busy) go(i + 1); }, delay); };
      dots.forEach((d, j) => d.addEventListener("click", () => { go(j === 0 && i === n ? n : j); restart(); }));
      // Swipe on touch screens
      let x0 = null;
      track.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
      track.addEventListener("pointerup", (e) => {
        if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
        if (Math.abs(dx) > 50) { go(dx < 0 ? i + 1 : i - 1); restart(); }
      });
      set(0, false);
      // Start (on the first lead) once the spotlight scrolls into view
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); set(0, false); restart(); } }, { threshold: 0.35 });
        io.observe(root);
      } else restart();
    });
  }

  /* ---------- Forms → mailto (until a form backend is chosen) ---------- */
  function initForms() {
    const email = BBB.site?.email || "";
    $$("[data-contact-form]").forEach((form) =>
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const f = new FormData(form);
        const subject = f.get("subject") || "Website inquiry";
        const body = `${f.get("message")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
        location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const note = $(".form__note", form);
        if (note) note.textContent = "Opening your email app… If nothing happens, email us at " + email + ".";
      })
    );
    $$("[data-newsletter-form]").forEach((form) =>
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const addr = new FormData(form).get("email");
        location.href = `mailto:${email}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent("Please add me to the Bike Builders newsletter: " + addr)}`;
      })
    );
  }

  /* ---------- Links driven by data.js ---------- */
  function initDataLinks() {
    $$("[data-email]").forEach((a) => { a.href = "mailto:" + BBB.site.email; if (!a.textContent.trim()) a.textContent = BBB.site.email; });
    $$("[data-apply-link]").forEach((a) => { if (BBB.site.applyForm) { a.href = BBB.site.applyForm; a.target = "_blank"; a.rel = "noopener"; } });
    $$("[data-competition-link]").forEach((a) => {
      if (BBB.site.competitionUrl) { a.href = BBB.site.competitionUrl; a.target = "_blank"; a.rel = "noopener"; }
      else if (a.dataset.fallback) { a.href = a.dataset.fallback; } // until the site is live, go to the About page section
      else { a.title = "TODO: add competition website URL (competitionUrl in assets/js/data.js)"; a.insertAdjacentHTML("afterend", ' <mark class="todo">TODO: competition link</mark>'); }
    });
    $$("[data-term]").forEach((el) => (el.textContent = BBB.site.recruitingTerm));
    $$("[data-social-inline]").forEach((el) => {
      const links = Object.entries(BBB.site.social || {}).filter(([, u]) => u)
        .map(([name, url]) => `<a class="text-primary" href="${esc(url)}" target="_blank" rel="noopener">${name}</a>`);
      if (links.length) el.insertAdjacentHTML("beforeend", links.join(" · ")); else el.remove();
    });
    // Show/hide pieces depending on whether applications are open
    const open = BBB.site.applicationsOpen !== false;
    $$("[data-when-open]").forEach((el) => { el.hidden = !open; });
    $$("[data-when-closed]").forEach((el) => { el.hidden = open; });
    $$("[data-season]").forEach((el) => (el.textContent = BBB.sponsors[el.dataset.season]));
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$(".reveal, .deco");
    if (!("IntersectionObserver" in window) || reduceMotion) return els.forEach((e) => e.classList.add("is-visible"));
    const io = new IntersectionObserver((entries) =>
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Sponsors hero: keep the photo clear of the nav links ---------- */
  function initSponsorHero() {
    const hero = $(".sp-hero"), nav = $(".nav");
    if (!hero || !nav) return;
    const fit = () => {
      const vw = document.documentElement.clientWidth;
      const end = nav.getBoundingClientRect().right + 32;
      const ok = nav.offsetParent !== null && end <= vw * 0.62;
      hero.style.setProperty("--sp-split", ok ? Math.max(vw * 0.5, end) + "px" : "50%");
      hero.classList.toggle("sp-hero--drop", nav.offsetParent !== null && !ok);
    };
    fit();
    window.addEventListener("resize", fit);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(fit);
  }

  /* ---------- Boot ---------- */
  renderHeader();
  renderFooter();
  renderAll();
  initProjects();
  initProjectDetail();
  initDeco();
  initDataLinks();
  initRibbons();
  initCarousels();
  initForms();
  initReveal();
  initSponsorHero();
})();
