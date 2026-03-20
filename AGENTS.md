# LookAtWhatAiCanDo — www

Marketing and portfolio site for LookAtWhatAiCanDo, LLC, an AI consulting company.

## Project Overview

Static single-page website. No backend, no build step, no package manager. The site is deployed via Firebase Hosting from the `public/` directory exactly as-is.

## Repository Layout

```
public/
  index.html          # The entire site (one page)
  css/style.css       # All styles
  js/app.js           # Renders project cards from projects.json at runtime
  data/projects.json  # AUTO-GENERATED — never edit this file
scripts/
  fetch-projects.js   # Node.js script that populates projects.json via GitHub API
.github/workflows/    # GitHub Actions: deploy on push to main + weekly refresh
firebase.json         # Firebase Hosting config (public dir, cache headers)
```

## Setup

**No installation required.**

- There is no `package.json` and no `node_modules`
- The site runs directly from `public/index.html` with no compilation

## Running Locally

Open the site:
```bash
open public/index.html
# or serve it with any static file server
```

Regenerate project data:
```bash
GITHUB_TOKEN=<your_token> node scripts/fetch-projects.js
```
This writes `public/data/projects.json`. A valid `GITHUB_TOKEN` prevents GitHub API rate-limiting.

## Testing / Verification

1. Open `public/index.html` in a browser
2. Open browser DevTools → Network tab
3. Confirm `projects.json` loads successfully (HTTP 200 or from filesystem)
4. Confirm project cards render in the `#projects-grid` section

## Deployment

Deployments are fully automated:
- **Push to `main`** → GitHub Actions runs `fetch-projects.js` → deploys to Firebase Hosting (live)
- **Weekly cron** (Monday 7am UTC) → same pipeline (keeps project stats fresh)
- **Pull requests** → deploys to Firebase preview channel

Do not manually deploy or commit `public/data/projects.json`.

## Constraints

- **Vanilla HTML/CSS/JS only** — no frameworks, no npm dependencies, no build tools
- CSS uses custom properties (`--accent`, `--card`, `--text`, etc.) — do not hardcode colors
- Accent color: `#b8ff57` (lime). Theme: dark.
- The `scratch/` directory is archived old code — do not modify it

## Key Files to Modify for Common Tasks

| Task | File |
|------|------|
| Change site copy / layout | `public/index.html` |
| Change styles / design | `public/css/style.css` |
| Change how project cards render | `public/js/app.js` |
| Change which repos appear / pinning order | `scripts/fetch-projects.js` (edit `PINNED` or `EXCLUDE`) |
| Change deploy triggers or CI steps | `.github/workflows/firebase-hosting-merge.yml` |
