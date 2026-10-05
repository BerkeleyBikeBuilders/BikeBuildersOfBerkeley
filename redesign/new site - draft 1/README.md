# Bike Builders of Berkeley — v2 site

Static HTML/CSS/JS. No build step, no dependencies — open `index.html` in a browser, or serve the folder with any static host (GitHub Pages, OCF, Netlify, etc.).

For local preview with working links: `python -m http.server` in this folder, then open http://localhost:8000.

## Where things live

| What | File |
|---|---|
| Members, spotlight, projects, sponsors, FAQs, recruiting timeline, social links, email | `assets/js/data.js` |
| Header, footer, and all page behaviour | `assets/js/site.js` |
| All styling + design tokens (colors, type scale) | `assets/css/styles.css` |
| Images | `assets/img/` (sponsor logos in `assets/img/sponsors/`) |
| Fonts (Figtree + Inter, self-hosted, OFL) | `assets/fonts/` |

Pages: `index.html`, `about.html`, `projects.html`, `project.html?id=<project-id>`, `members.html`, `sponsors.html`, `apply.html`, `contact.html`.

Most day-to-day updates (new members, new sponsor, new project, recruiting dates) are edits to `data.js` only.

### Adding a photo
Drop the image in `assets/img/` (≤ 1600px wide JPG is plenty) and set the `photo` / `cover` / `logo` field in `data.js`. Empty fields render a labeled "Photo needed" placeholder.

### Adding a project
Copy an entry in `BBB.projects`, give it a unique `id`, and it appears on the Projects page and at `project.html?id=<id>`.

## Before launch — placeholder checklist

Anything still to fill in shows up **highlighted yellow** on the page (text starting with `TODO:` in `data.js`) or as a **striped "Photo needed" box**. Search the code for `TODO` to find them all.

- [ ] Member headshots (all members + founders) → `BBB.members[].photo`
- [ ] Member spotlight blurbs (current copy is from the old site) → `BBB.spotlight`
- [ ] Recruiting timeline dates + descriptions → `BBB.recruiting`
- [ ] FAQ answers (About + Apply) → `BBB.faq`
- [ ] Project write-ups, timelines, and teams → `BBB.projects`
- [ ] Sea Otter paragraph + 3 photos → `sponsors.html`
- [ ] SRAM, PNW Components, Airgas, BFS logo files → `BBB.sponsors`
- [ ] Social links, GoFundMe URL, application form URL → `BBB.site`
- [ ] Confirm recruiting term label → `BBB.site.recruitingTerm`

## Forms
The contact form and newsletter signup currently open the visitor's email app (mailto) addressed to `contact@bikebuilders.berkeley.edu`. To switch to a real form backend (Formspree, Google Forms, etc.), replace `initForms()` in `site.js`.
