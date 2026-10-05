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
        url
          ? `<li><a href="${esc(url)}" target="_blank" rel="noopener">${name} ${ARROW_UR}</a></li>`
          : `<li><a href="#" title="TODO: add ${name} URL in assets/js/data.js">${name} ${ARROW_UR}</a></li>`
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

    spotlight: () =>
      BBB.spotlight
        .map((s) => ({ ...(BBB.members.find((m) => m.name === s.name) || {}), ...s }))
        .map((m) => `
        <article class="spot-card">
          <div class="frame">${personPhoto(m)}</div>
          <div class="spot-card__body">
            <h3>${esc(m.name)}</h3>
            <p class="spot-card__role">${esc(m.role || "")}</p>
            <p>${txt(m.blurb || defaultBlurb(m))}</p>
            <p class="spot-card__fact"><b>Fun fact:</b> ${m.funFact ? esc(m.funFact) : '<span class="spot-card__blank" aria-label="coming soon"></span>'}</p>
            ${m.link ? `<a class="member__link spot-card__link" href="${esc(m.link)}" target="_blank" rel="noopener">${linkLabel(m.link)} ${ARROW_UR}</a>` : ""}
          </div>
        </article>`).join(""),

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
    const last = (m) => m.name.trim().split(/\s+/).slice(-1)[0];
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
      </section>` : ""}

      ${p.data ? `
      <section class="pd-data${(p.dataImages || []).length ? "" : " pd-data--solo"}">
        ${(p.dataImages || []).length ? `<div class="pd-data__imgs">
          ${(p.dataImages || []).map((s, i) => `<div class="frame${p.dataPhotos ? " frame--photo" : ""}"${i ? ' style="aspect-ratio:1"' : ""}>${photo(s, p.title, "figure")}</div>`).join("")}
        </div>` : ""}
        <div class="pd-data__text">
          <h2 class="rule-heading">${esc(p.dataTitle || "Data & Analysis")}</h2>
          ${p.data.map((d) => `<h3>${esc(d.title)}</h3><p>${txt(d.body)}</p>`).join("")}
        </div>
      </section>` : ""}

      <section class="section" style="padding-top:${p.data ? "0" : "var(--section-y)"};padding-bottom:clamp(3rem,6vw,5rem)">
        <div class="container">
          <p><a class="btn btn--ghost on-light" style="color:var(--primary)" href="projects.html">← All projects</a></p>
        </div>
      </section>`;
  }

  /* ---------- Carousel buttons ---------- */
  function initCarousels() {
    $$("[data-carousel]").forEach((wrap) => {
      const track = $(wrap.dataset.carousel);
      if (!track) return;
      $$("[data-dir]", wrap).forEach((b) =>
        b.addEventListener("click", () => {
          const card = track.firstElementChild;
          const step = card ? card.getBoundingClientRect().width + 28 : 400;
          track.scrollBy({ left: step * Number(b.dataset.dir), behavior: reduceMotion ? "auto" : "smooth" });
        })
      );
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
    // Show/hide pieces depending on whether applications are open
    const open = BBB.site.applicationsOpen !== false;
    $$("[data-when-open]").forEach((el) => { el.hidden = !open; });
    $$("[data-when-closed]").forEach((el) => { el.hidden = open; });
    $$("[data-season]").forEach((el) => (el.textContent = BBB.sponsors[el.dataset.season]));
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$(".reveal");
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
  initDataLinks();
  initRibbons();
  initCarousels();
  initForms();
  initReveal();
  initSponsorHero();
})();
