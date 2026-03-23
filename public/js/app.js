/* =============================================
   app.js — LookAtWhatAiCanDo
   Renders projects from pre-built JSON,
   generated at deploy time by GitHub Actions.
   ============================================= */

function timeAgo(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function renderProjects(projects, fromCache = false) {
  const grid = document.getElementById('projects-grid');
  const freshness = document.getElementById('freshness');

  if (fromCache && projects._fetchedAt) {
    const ago = timeAgo(projects._fetchedAt);
    freshness.textContent = `↻ Data refreshed ${ago} via GitHub`;
    projects = projects.projects || projects;
  }

  grid.innerHTML = '';

  projects.forEach((p, i) => {
    const card = document.createElement('a');
    card.className = 'project-card';
    card.href = p.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = `${i * 0.07}s`;
    card.style.animation = 'fadeUp 0.6s ease both';

    const updatedStr = p.updatedAt ? timeAgo(p.updatedAt) : null;

    card.innerHTML = `
      <div class="project-name">${p.name}</div>
      <div class="project-desc">${p.description || 'Open source project by LookAtWhatAiCanDo, LLC.'}</div>
      <div class="project-meta">
        ${p.language ? `<span class="project-lang">${p.language}</span>` : ''}
        ${p.stars > 0 ? `<span class="project-stat">★ ${p.stars}</span>` : ''}
        ${p.forks > 0 ? `<span class="project-stat">⑂ ${p.forks}</span>` : ''}
        ${updatedStr ? `<span class="project-updated">Updated ${updatedStr}</span>` : ''}
      </div>
    `;

    grid.appendChild(card);
  });
}

async function loadProjects() {
  const res = await fetch('/data/projects.json');
  if (!res.ok) throw new Error('No projects.json');
  const data = await res.json();

  // Support both raw array and wrapped object with metadata
  const projects = Array.isArray(data) ? data : (data.projects || []);
  const fetchedAt = data._fetchedAt || null;

  if (projects.length === 0) throw new Error('Empty projects list');

  const freshness = document.getElementById('freshness');
  if (fetchedAt) {
    freshness.textContent = `↻ Data refreshed ${timeAgo(fetchedAt)} via GitHub`;
  }

  projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  renderProjects(projects);
}

// Init
loadProjects();

// ── Hero AI glitch ────────────────────────────────────────────────────────────
// Every 4–9 seconds, briefly replace the "AI" text with the logo SVG using a
// CRT-corruption animation, then snap back to text.
(function initHeroGlitch() {
  //return; // DISABLED FOR NOW — MAY REVISIT LATER
  const aiSpan = document.querySelector('.hero-title .ai-italic');
  if (!aiSpan) return;

  const GLITCH_DURATION = 420;   // ms — matches animation duration above

  function glitch() {
    aiSpan.classList.add('glitching');
    setTimeout(() => {
      aiSpan.classList.remove('glitching');
      schedule();
    }, GLITCH_DURATION);
  }

  function schedule() {
    setTimeout(glitch, 3000 + Math.random() * 3000); // 3–6 s
  }

  schedule(); // first glitch after 3–6 s on load
}());
