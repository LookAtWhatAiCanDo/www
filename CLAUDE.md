# LookAtWhatAiCanDo — www

Marketing and portfolio site for LookAtWhatAiCanDo, LLC, an AI consulting company.

## Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+) — no frameworks, no build tools
- **Hosting**: Firebase Hosting (Spark/free tier)
- **CI/CD**: GitHub Actions
- **Data**: GitHub API → `public/data/projects.json` (generated at deploy time)

## Project Structure

```
public/
  index.html          # Single page — the entire site
  css/style.css       # All styles (734 lines, dark theme)
  js/app.js           # Fetches projects.json and renders project cards
  data/projects.json  # AUTO-GENERATED — do not edit manually
scripts/
  fetch-projects.js   # Node.js script run by GitHub Actions to populate projects.json
.github/workflows/
  firebase-hosting-merge.yml        # Deploys on push to main + weekly cron
  firebase-hosting-pull-request.yml # PR preview deployments
```

## Design System

- **Theme**: Dark (near-black background)
- **Accent**: `#b8ff57` (lime green) — used for highlights, borders, buttons
- **CSS custom properties**: `--black`, `--dark`, `--card`, `--border`, `--muted`, `--text`, `--dim`, `--accent`, `--red`, `--white`
- **Fonts**:
  - `Bebas Neue` — display headings
  - `DM Mono` — body, code-like elements
  - `Instrument Serif` — italic accent text
- **Aesthetic**: Terminal-editorial, noise overlay texture, marquee tickers

## Key Conventions

- **No npm packages** — the site has zero runtime dependencies
- **No build step** — `public/` is deployed as-is; open `public/index.html` directly in a browser to preview locally
- **CSS**: Always use existing custom properties instead of hardcoded color values; avoid inline styles
- **JS**: Vanilla ES6+, async/await for fetch calls, no frameworks
- **HTML**: Semantic HTML5; preserve the existing section structure (nav, hero, services, projects, philosophy, contact, footer)
- **`scratch/`**: Archived old implementation — ignore this directory

## Data Flow

```
GitHub Actions trigger (push to main OR weekly Monday 7am UTC)
  → node scripts/fetch-projects.js   (requires GITHUB_TOKEN env var)
  → writes public/data/projects.json
  → Firebase CLI deploys public/ to Firebase Hosting CDN
  → Browser: index.html loads → app.js fetches /data/projects.json → renders cards
```

## Local Development

No install needed. To preview the site:
```
open public/index.html
```

To manually regenerate `projects.json` locally:
```
GITHUB_TOKEN=your_token node scripts/fetch-projects.js
```

## Modifying the Projects List

- To **pin** repos to the top: edit the `PINNED` array in `scripts/fetch-projects.js`
- To **exclude** repos: add to the `EXCLUDE` array in `scripts/fetch-projects.js`
- Never manually edit `public/data/projects.json` — it gets overwritten on every deploy

## Firebase

- Project: `lookatwhataicando-1337`
- Config: `firebase.json` (public dir: `public/`, SPA rewrites to `index.html`)
- Cache: 1hr for data files, 1yr for JS/CSS assets
