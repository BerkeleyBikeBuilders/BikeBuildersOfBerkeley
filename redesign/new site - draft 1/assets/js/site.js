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

  /* ---------- Brand mark (from the Figma logo) ---------- */
  const LOGO_PATH =
    "M5.04494 14.4264C5.13883 14.4283 5.21712 14.4975 5.23146 14.5895L5.40822 15.7262C5.63694 15.7978 5.85502 15.894 6.06252 16.0143L7.00783 15.3629C7.0455 15.337 7.09127 15.3252 7.13674 15.3297C7.18223 15.3342 7.22501 15.3545 7.25685 15.3873L7.99025 16.15C8.05525 16.2176 8.06178 16.3218 8.00685 16.3971L7.32424 17.3307C7.43445 17.5413 7.52114 17.7618 7.58302 17.9918L8.71681 18.1998C8.76153 18.2084 8.80231 18.2329 8.83107 18.2682C8.85959 18.3034 8.87467 18.3478 8.87404 18.3932L8.85353 19.4518C8.85225 19.4967 8.83528 19.54 8.80568 19.5738C8.77596 19.6078 8.73497 19.6301 8.69045 19.6373L7.54787 19.815C7.47755 20.0415 7.38203 20.2599 7.26369 20.4654L7.91896 21.4137C7.94477 21.4513 7.95564 21.4972 7.95119 21.5426C7.94665 21.5881 7.92639 21.6309 7.89357 21.6627L7.1299 22.3961C7.09727 22.4272 7.05473 22.4457 7.00978 22.4488C6.96494 22.4519 6.92037 22.4398 6.88381 22.4137L5.95217 21.732C5.7411 21.8441 5.51877 21.932 5.28615 21.9957L5.06349 23.1246C5.05451 23.1688 5.03023 23.2086 4.99513 23.2369C4.9599 23.2652 4.91533 23.2806 4.87013 23.2799L3.81154 23.2594C3.76626 23.2582 3.72251 23.2405 3.68849 23.2105C3.65467 23.1806 3.63197 23.1399 3.62502 23.0953L3.459 21.9625C3.23062 21.8909 3.01048 21.7953 2.80275 21.6764L1.85256 22.3141C1.81501 22.3392 1.76954 22.35 1.72463 22.3453C1.67962 22.3406 1.63706 22.3201 1.60549 22.2877L0.872087 21.524C0.840923 21.4911 0.822185 21.4482 0.819353 21.4029C0.816613 21.3577 0.829625 21.3125 0.856462 21.276L1.53713 20.3629C1.42516 20.1493 1.33665 19.9238 1.27345 19.691L0.15529 19.4693C0.111086 19.4603 0.0712966 19.4361 0.0429853 19.401C0.0147413 19.3659 -0.000576068 19.322 1.65762e-05 19.277L0.0205244 18.2184C0.0224855 18.1244 0.0929286 18.0455 0.185563 18.0318L1.31154 17.8668C1.38362 17.6358 1.4805 17.4157 1.60158 17.2066L0.96486 16.2574C0.940161 16.22 0.928921 16.1751 0.93361 16.1305C0.938418 16.0857 0.95907 16.0437 0.991228 16.0123L1.75392 15.2789C1.82163 15.2138 1.92767 15.207 2.00295 15.2633L2.91896 15.9449C3.13132 15.835 3.35498 15.7481 3.58595 15.6861L3.79299 14.5641C3.80141 14.5193 3.82516 14.4787 3.86037 14.4498C3.89578 14.4209 3.94065 14.4051 3.98634 14.4059L5.04494 14.4264ZM20.8067 11.0162C21.0142 11.0206 21.1911 11.1557 21.2569 11.3443L21.2783 11.4283V11.4293L21.4258 12.3893C21.5536 12.4365 21.6782 12.4923 21.7998 12.5543L22.5957 12.0055C22.6906 11.9397 22.806 11.9092 22.9209 11.9205L23.0059 11.9371C23.0881 11.9604 23.1635 12.0048 23.2236 12.067L23.958 12.8307C24.0176 12.8927 24.0588 12.9698 24.0791 13.0523L24.0928 13.1363L24.0908 13.2213C24.0816 13.3058 24.0499 13.3873 23.999 13.4566L23.9981 13.4557L23.4209 14.2447C23.4768 14.3667 23.5265 14.4913 23.5684 14.6188L24.5244 14.7945C24.6095 14.8103 24.689 14.8491 24.7539 14.9049L24.8145 14.9664L24.8633 15.0377C24.9046 15.1124 24.9256 15.1975 24.9238 15.2838L24.9024 16.3424C24.9 16.4567 24.8575 16.5668 24.7822 16.6529C24.7068 16.739 24.6033 16.7966 24.4903 16.8141L23.5225 16.9635C23.4762 17.089 23.4228 17.2114 23.3623 17.3307L23.916 18.1314H23.9151C23.9809 18.2265 24.0105 18.3416 23.999 18.4566C23.9875 18.5717 23.9349 18.6783 23.8516 18.7584L23.0889 19.4928C23.0065 19.5721 22.8993 19.6206 22.7852 19.6285C22.6709 19.6363 22.5564 19.6043 22.4639 19.5367V19.5357L21.6768 18.9596C21.5528 19.0171 21.4257 19.0672 21.2959 19.11L21.1074 20.066L21.1065 20.067C21.0841 20.1792 21.0238 20.2805 20.9346 20.3522C20.8454 20.4237 20.7334 20.4619 20.6192 20.4596L19.5625 20.4381C19.4472 20.4359 19.3355 20.3933 19.249 20.317C19.1629 20.241 19.1066 20.1367 19.0899 20.023L18.9492 19.068C18.8213 19.0206 18.6959 18.9658 18.5742 18.9039L17.7715 19.4439C17.6765 19.5076 17.562 19.5353 17.4483 19.523C17.3343 19.5107 17.2287 19.4583 17.1494 19.3756V19.3766L16.4131 18.6109C16.335 18.5281 16.2877 18.4208 16.2803 18.3072C16.2731 18.1935 16.3062 18.0801 16.3731 17.9879L16.375 17.985L16.9483 17.2154C16.8903 17.0899 16.8398 16.9611 16.7969 16.8297L15.8526 16.6441V16.6432C15.7406 16.6209 15.64 16.5602 15.5684 16.4713C15.4967 16.3823 15.4578 16.2701 15.46 16.1559L15.4805 15.0982C15.4852 14.8602 15.6617 14.6588 15.8985 14.6246L16.8457 14.4859C16.8939 14.3567 16.95 14.2308 17.0127 14.108L16.4756 13.3072V13.3063C16.4121 13.2112 16.3832 13.0966 16.3955 12.983C16.4079 12.8695 16.4597 12.7634 16.542 12.6842H16.543L17.3067 11.9508C17.3896 11.8712 17.4985 11.8233 17.6133 11.816L17.6992 11.8189C17.7557 11.8254 17.8105 11.8414 17.8613 11.8668L17.9346 11.9117L18.708 12.4859C18.8306 12.43 18.9564 12.3809 19.085 12.3395L19.2588 11.3941L19.2822 11.3121C19.3123 11.2319 19.3635 11.1608 19.4307 11.1061L19.502 11.0572C19.5767 11.0158 19.6616 10.9939 19.7481 10.9957L20.8067 11.0162ZM4.46388 17.4957C4.10654 17.4887 3.7606 17.624 3.50295 17.8717C3.24546 18.1193 3.09702 18.4589 3.08986 18.816C3.08638 18.993 3.11716 19.1698 3.18166 19.3346C3.24615 19.4993 3.34325 19.6494 3.46584 19.777C3.58839 19.9044 3.73453 20.0068 3.8965 20.0777C4.05856 20.1486 4.23332 20.1865 4.41017 20.19C4.58699 20.1935 4.76305 20.1626 4.92775 20.0982C5.09255 20.0338 5.24353 19.9367 5.37111 19.8141C5.49851 19.6915 5.60102 19.5454 5.67189 19.3834C5.7428 19.2213 5.78069 19.0466 5.7842 18.8697C5.79123 18.5124 5.65592 18.1664 5.40822 17.9088C5.16063 17.6514 4.82096 17.5028 4.46388 17.4957ZM19.6319 12.6246L19.5977 12.8082L19.417 12.857C19.2059 12.9129 19.0046 12.9911 18.8125 13.0914L18.6485 13.1764L18.499 13.066L17.6524 12.4352L17.0117 13.0494L17.6006 13.9273L17.7031 14.0807L17.6113 14.2389C17.5012 14.4294 17.4138 14.6304 17.3477 14.8404L17.291 15.0162L17.1094 15.0436L16.0694 15.1949L16.0518 16.0826L17.085 16.2867L17.2647 16.3219L17.3125 16.4986C17.3696 16.7105 17.4502 16.916 17.5528 17.11L17.6397 17.274L17.5283 17.4234L16.8985 18.2662L17.5137 18.9068L18.3936 18.316L18.5459 18.2135L18.7041 18.3063C18.8457 18.3879 18.9945 18.4572 19.1475 18.5143L19.3028 18.567L19.4795 18.6217L19.5069 18.8053L19.6592 19.8512L20.5459 19.8688L20.752 18.8229L20.7881 18.6441L20.9639 18.5953C21.1737 18.5381 21.3772 18.4579 21.5694 18.3561L21.7324 18.2701L21.8809 18.3795L22.7422 19.0094L23.3819 18.3941L22.7754 17.5172L22.6699 17.3639L22.7627 17.2027C22.8706 17.0161 22.9568 16.8194 23.0205 16.6129L23.0752 16.4371L23.2569 16.4088L24.3154 16.2447L24.333 15.358L23.2852 15.1656L23.0391 15.1207L23.043 14.9156C22.9872 14.7202 22.9124 14.5325 22.8184 14.3522L22.7334 14.1891L22.8418 14.0416L23.4736 13.1773L22.8604 12.5387L21.9854 13.1422L21.832 13.2477L21.6709 13.1539C21.4819 13.0444 21.2837 12.9576 21.0762 12.8932L20.9004 12.8385L20.8721 12.6568L20.709 11.6051L19.8233 11.5875L19.6319 12.6246ZM12.3613 4.9332C12.6648 4.93032 12.9532 5.05893 13.1514 5.28672L15.3447 7.81211L17.8965 7.39121C18.4706 7.29665 19.0046 7.68578 19.0899 8.26133C19.1749 8.83718 18.7784 9.38125 18.2041 9.47617L15.0801 9.9918C14.7234 10.0506 14.3632 9.92177 14.1279 9.65098L12.3447 7.59824L9.32228 11.0875L12.0586 13.1988C12.2701 13.3623 12.4098 13.6021 12.4492 13.8688L13.0996 18.2721C13.1846 18.848 12.7882 19.3921 12.2139 19.4869C11.6396 19.5815 11.1047 19.1916 11.0195 18.6158L10.4307 14.6256L7.14845 12.0953C6.92089 11.9196 6.77653 11.6558 6.75002 11.3668C6.7236 11.0777 6.81747 10.7882 7.00881 10.567L11.5664 5.30332L11.6465 5.22031C11.8407 5.03932 12.0959 4.93595 12.3613 4.9332ZM20.2236 14.0855C20.659 14.0942 21.0732 14.2765 21.375 14.5904C21.6767 14.9044 21.8416 15.3251 21.833 15.7604C21.8244 16.1957 21.643 16.6099 21.3291 16.9117C21.0153 17.2134 20.5944 17.3782 20.1592 17.3697C19.7238 17.3611 19.3096 17.1797 19.0078 16.8658C18.7061 16.5519 18.5404 16.1312 18.5488 15.6959C18.5574 15.2606 18.739 14.8464 19.0528 14.5445C19.3667 14.2427 19.7882 14.077 20.2236 14.0855ZM20.2119 14.6744C19.9329 14.669 19.6632 14.7751 19.4619 14.9684C19.2606 15.162 19.1442 15.4283 19.1387 15.7076C19.1333 15.9867 19.2391 16.2564 19.4326 16.4576C19.6261 16.6587 19.891 16.7752 20.1699 16.7809C20.4492 16.7864 20.7205 16.6805 20.9219 16.4869C21.1229 16.2934 21.2386 16.0276 21.2442 15.7486C21.2496 15.4695 21.1446 15.199 20.9512 14.9977C20.7576 14.7963 20.4912 14.6799 20.2119 14.6744ZM14.8887 0.00351723C15.386 -0.0257288 15.8717 0.128391 16.2617 0.429298C16.7055 0.771715 16.9918 1.27744 17.0733 1.82871C17.1545 2.37981 17.0269 2.95259 16.7031 3.42149C16.3778 3.89257 15.8788 4.22185 15.3086 4.31602C14.7383 4.41013 14.1666 4.25767 13.7207 3.91367C13.2773 3.57134 12.9907 3.06622 12.9092 2.51524C12.8279 1.96406 12.9555 1.39048 13.2793 0.921486C13.6047 0.450347 14.1047 0.122132 14.6748 0.0279313L14.8887 0.00351723Z";
  const logo = (cls = "") => `<svg class="${cls}" viewBox="0 0 25 24" aria-hidden="true"><path d="${LOGO_PATH}"/></svg>`;
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
          <a class="brand" href="index.html" aria-label="Bike Builders of Berkeley — home">${logo()}<span>Bike Builders of Berkeley</span></a>
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
          <a class="footer__brand" href="index.html" aria-label="Bike Builders of Berkeley — home">${logo()}<span>Bike<br>Builders<br>of Berkeley</span></a>
          <div class="footer__cols">
            <ul><li><a href="about.html">About Us</a></li><li><a href="projects.html">Projects</a></li><li><a href="members.html">Members</a></li></ul>
            <ul><li><a href="sponsors.html">Sponsors</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="apply.html">Apply Now</a></li></ul>
            <ul>${socialLinks()}</ul>
          </div>
        </div>
        <div class="container"><div class="footer__legal">
          <span>© ${new Date().getFullYear()} Bike Builders of Berkeley · A student organization at UC Berkeley</span>
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
      const phrase = el.dataset.ribbon.trim() + " • ";
      const band = el.dataset.band || "var(--primary)";
      const ink = el.dataset.ink || "#fff";
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

  /* ---------- Content renderers ---------- */
  const renderers = {
    "members-current": () =>
      BBB.members.filter((m) => m.group === "current").map(memberCard).join(""),
    "members-founders": () =>
      BBB.members.filter((m) => m.group === "founder").map(memberCard).join(""),

    spotlight: () =>
      BBB.spotlight.map((m) => `
        <article class="spot-card">
          <div class="frame">${personPhoto(m)}</div>
          <div class="spot-card__body">
            <h3>${esc(m.name)}</h3>
            <p class="spot-card__role">${esc(m.role)}</p>
            <p>${txt(m.blurb)}</p>
          </div>
        </article>`).join(""),

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
      const steps = BBB.recruiting.map((s, i) => `
        <div class="tl-step reveal">
          <p class="tl-step__date">${txt(s.date)}</p>
          <span class="tl-step__num">${String(i + 1).padStart(2, "0")}.</span>
          <h3>${esc(s.title)}</h3>
          <p>${txt(s.body)}</p>
        </div>`);
      // Group as 2 / 2 (on photo band) / rest, to follow the Figma layout
      const pathL = `<div class="tl-path tl-path--left" aria-hidden="true"><svg viewBox="0 0 180 400" preserveAspectRatio="none"><path d="M40 20 L10 150 L150 260 L40 380" stroke="#5a3dff" stroke-width="3" stroke-dasharray="10 9" fill="none" vector-effect="non-scaling-stroke"/><rect x="28" y="8" width="24" height="24" fill="#5a3dff"/><rect x="28" y="368" width="24" height="24" fill="#5a3dff"/></svg></div>`;
      const pathR = `<div class="tl-path tl-path--right" aria-hidden="true"><svg viewBox="0 0 180 400" preserveAspectRatio="none"><path d="M90 0 L60 120 L110 220 L170 260 L110 400" stroke="#fff" stroke-width="3" stroke-dasharray="10 9" fill="none" vector-effect="non-scaling-stroke"/><rect x="98" y="208" width="24" height="24" fill="#fff"/></svg></div>`;
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
        <div class="member__meta"><div class="member__name">${esc(m.name)}</div><div class="member__role">${esc(m.role)}</div></div>
      </article>`;
  }
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
    if (!grid) return;
    const chipsEl = $("[data-project-chips]");
    const search = $("[data-project-search]");
    const cats = ["All", ...new Set(BBB.projects.map((p) => p.category))];
    let active = "All";
    chipsEl.innerHTML = cats.map((c) => `<button class="chip" type="button" aria-pressed="${c === "All"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

    const draw = () => {
      const q = (search.value || "").trim().toLowerCase();
      const list = BBB.projects.filter((p) =>
        (active === "All" || p.category === active) &&
        (!q || (p.title + " " + p.summary + " " + p.category).toLowerCase().includes(q)));
      if (!list.length) { grid.innerHTML = `<p class="proj-empty">No projects match “${esc(q)}”.</p>`; return; }
      // Masonry: deal items into N columns left-to-right so reading order stays natural
      const n = window.innerWidth < 600 ? 1 : window.innerWidth < 960 ? 2 : 3;
      const cols = Array.from({ length: n }, () => []);
      list.forEach((p, i) => cols[i % n].push(`
          <a class="proj-item" href="project.html?id=${encodeURIComponent(p.id)}">
            <div class="frame" style="aspect-ratio:${p.tall ? "4/5" : "4/3"}">${photo(p.cover, p.title, p.title)}</div>
            <p class="proj-item__cap"><b>Project ${BBB.projects.indexOf(p) + 1} / ${esc(p.title)}</b><br><span>${esc(p.category)}</span></p>
          </a>`));
      grid.innerHTML = cols.map((c) => `<div class="proj-col">${c.join("")}</div>`).join("");
    };
    let lastN = 0;
    window.addEventListener("resize", () => {
      const n = window.innerWidth < 600 ? 1 : window.innerWidth < 960 ? 2 : 3;
      if (n !== lastN) { lastN = n; draw(); }
    });
    chipsEl.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      active = b.dataset.cat;
      $$(".chip", chipsEl).forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
      draw();
    });
    search.addEventListener("input", draw);
    draw();
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
    doc.title = `${p.title} · Bike Builders of Berkeley`;
    const [img1, img2, img3] = p.heroImages || [];
    const o = p.overview || {};
    const members = (p.team || []).map((n) => BBB.members.find((m) => m.name === n) || { name: n, role: "Team Member" });

    root.innerHTML = `
      <section class="pd-intro">
        <div class="container">
          <div class="pd-grid">
            <div class="pd-grid__text">
              <h1 class="pd-title rule-heading">${esc(p.title)}</h1>
              <dl class="pd-facts">
                <dt>Timeline</dt><dd>${txt(p.timeline)}</dd>
                <dt>Category</dt><dd>${esc(p.category)}</dd>
                <dt>Summary</dt><dd>${txt(p.summary)}</dd>
              </dl>
            </div>
            <div class="frame">${photo(img1, p.title, p.title + " — hero photo")}</div>
            <div class="frame" style="aspect-ratio:3/1">${photo(img2, p.title + " detail", p.title + " — detail shot", 'style="object-position:center 60%"')}</div>
            <div class="pd-grid__caption"><p>${txt(p.description)}</p></div>
          </div>
        </div>
      </section>

      <section class="section pd-overview on-dark">
        ${img1 ? `<div class="pd-overview__bg"><img src="${esc(img1)}" alt="" loading="lazy"></div>` : ""}
        <div class="container split">
          <div>
            <h2 class="rule-heading">Overview</h2>
            <h3>Objective</h3><p>${txt(o.objective || "TODO: Objective")}</p>
            <h3>Initial Planning &amp; Research</h3><p>${txt(o.planning || "TODO: Planning & research")}</p>
            <h3>Final Product</h3><p>${txt(o.final || "TODO: Final product")}</p>
          </div>
          <div class="pd-overview__imgs">
            <div class="frame">${photo(img3 || img2, p.title, p.title + " — process photo")}</div>
            <div class="frame">${photo("", p.title, p.title + " — final product photo")}</div>
          </div>
        </div>
      </section>

      ${p.data ? `
      <section class="pd-data">
        <div class="pd-data__imgs">
          ${(p.dataImages || []).map((s, i) => `<div class="frame"${i ? ' style="aspect-ratio:1"' : ""}>${photo(s, p.title + " analysis", "analysis figure")}</div>`).join("")}
        </div>
        <div class="pd-data__text">
          <h2 class="rule-heading">Data &amp; Analysis</h2>
          ${p.data.map((d) => `<h3>${esc(d.title)}</h3><p>${txt(d.body)}</p>`).join("")}
        </div>
      </section>` : ""}

      <section class="section" style="padding-top:${p.data ? "0" : "var(--section-y)"}">
        <div class="container">
          <h2 class="h2" style="text-transform:uppercase;margin-bottom:1.5rem">Project Team</h2>
          ${members.length
            ? `<div class="team-row">${members.map((m) => `<div><div class="frame">${personPhoto(m)}</div><div class="member__meta"><div class="member__name">${esc(m.name)}</div><div class="member__role">${esc(m.role)}</div></div></div>`).join("")}</div>`
            : `<p><mark class="todo">TODO: list the project team in assets/js/data.js</mark></p>`}
          <p style="margin-top:3rem"><a class="btn btn--ghost on-light" style="color:var(--primary)" href="projects.html">← All projects</a></p>
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
        const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
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
    $$("[data-gofundme]").forEach((a) => { if (BBB.site.gofundme) { a.href = BBB.site.gofundme; a.target = "_blank"; a.rel = "noopener"; } else { a.title = "TODO: add GoFundMe URL in assets/js/data.js"; } });
    $$("[data-term]").forEach((el) => (el.textContent = BBB.site.recruitingTerm));
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
})();
