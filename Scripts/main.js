// Année dynamique
document.getElementById("year").textContent = new Date().getFullYear();

// Injecte les projets "featured" sur la home
(function renderLatest() {
  const container = document.getElementById("latest-projects");
  if (!container || !window.PROJECTS) return;
  const latest = window.PROJECTS.filter(p => p.featured).slice(0, 6);
  container.innerHTML = latest.map(p => `
    <article class="card">
      <a href="${p.url}">
        <div class="card__cover">${p.cover ? `<img src="${p.cover}" alt="${p.title}">` : p.title}</div>
      </a>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
})();