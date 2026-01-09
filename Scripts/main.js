document.addEventListener('DOMContentLoaded', function() {

  function initDynamicYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Injection des projets "featured" sur la page d'accueil
  function renderLatestProjects() {
    const container = document.getElementById("latest-projects");
    
    if (!container || !window.PROJECTS) {
      return;
    }
    
    const latest = window.PROJECTS.filter(p => p.featured).slice(0, 6);
    
    container.innerHTML = latest.map(project => `
      <article class="card reveal-card">
        <a href="${project.url}">
          <div class="card__cover">
            ${project.cover ? 
              `<img src="${project.cover}" alt="${project.title}">` : 
              project.title
            }
          </div>
        </a>
        <div class="card__body">
          <h3 class="card__title">${project.title}</h3>
          <p class="card__desc">${project.desc}</p>
          <div class="card__tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </article>
    `).join("");
  }

  initDynamicYear();
  renderLatestProjects();

});