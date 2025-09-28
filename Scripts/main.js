document.addEventListener('DOMContentLoaded', function() {

  //  Année dynamique dans le footer
  function initDynamicYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  //  Injection des projets "featured" sur la page d'accueil
  function renderLatestProjects() {
    const container = document.getElementById("latest-projects");
    
    // Vérifier que le conteneur existe et que les données sont disponibles
    if (!container || !window.PROJECTS) {
      return;
    }
    
    // Filtrer les projets featured et limiter à 6
    const latest = window.PROJECTS.filter(p => p.featured).slice(0, 6);
    
    // Générer le HTML des cartes de projets
    container.innerHTML = latest.map(project => `
      <article class="card">
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

  // Initialisation de tous les modules
  initDynamicYear();
  renderLatestProjects();

});