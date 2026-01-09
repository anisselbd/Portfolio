document.addEventListener('DOMContentLoaded', function () {

  //  Menu pour mobile
  function initMobileMenu() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-toggle='menu']");
      const menu = document.querySelector("[data-menu]");
      if (btn && menu) menu.classList.toggle("open");
    });
  }

  // Thème (dark/light)
  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);

    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-toggle='theme']");
      if (!t) return;
      const next = root.getAttribute("data-theme") === "light" ? "" : "light";
      if (next) root.setAttribute("data-theme", next);
      else root.removeAttribute("data-theme");
      localStorage.setItem("theme", next);
    });
  }

  //  Effet de traînée qui suit la souris (mouse trail)
  function initMouseTrail() {
    const trailElements = [];
    for (let i = 0; i < 6; i++) {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      document.body.appendChild(trail);
      trailElements.push({
        element: trail,
        x: -100,
        y: -100,
        prevX: -100,
        prevY: -100
      });
    }

    let mouseX = -100;
    let mouseY = -100;
    let isMoving = false;
    let moveTimeout;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 150);
    });

    function animateTrail() {
      trailElements.forEach((trail, index) => { // index 0 est le plus proche de la souris
        const speed = 0.15 - (index * 0.02);

        trail.prevX = trail.x;
        trail.prevY = trail.y;

        trail.x += (mouseX - trail.x) * speed;
        trail.y += (mouseY - trail.y) * speed;

        const dx = trail.x - trail.prevX;
        const dy = trail.y - trail.prevY;
        const velocity = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
        trail.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

        const baseOpacity = isMoving ? Math.min(velocity * 0.15, 1) : 0;
        trail.element.style.opacity = Math.max(0, baseOpacity - index * 0.15);
      });

      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.addEventListener('mouseleave', () => {
      trailElements.forEach(trail => trail.element.style.opacity = '0');
    });
  }

  //  Loader de page perso (Anisse.) au demarrage du portfolio lorsque l'user clique sur la page d'accueil
  function initPageLoader() {
    const currentPath = window.location.pathname;
    const pageTitle = document.title;

    const isMainHomePage = pageTitle === 'Anisse Lebadi — Portfolio' &&
      !currentPath.includes('/Projects/');

    if (!isMainHomePage) {
      return; // Ne pas afficher le loader perso si ce n'est pas la page d'accueil
    }

    // Créer le loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';

    const brand = document.createElement('div');
    brand.className = 'loader-brand';

    // Créer chaque lettre de "Anisse."
    const letters = 'Anisse.';
    letters.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.className = 'letter';
      if (letter === '.') {
        span.classList.add('accent');
      }
      span.textContent = letter;
      brand.appendChild(span);
    });

    const progressContainer = document.createElement('div'); // Conteneur de la barre de progression
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);

    loader.appendChild(brand);
    loader.appendChild(progressContainer);

    // Insérer le loader au début du body
    document.body.insertBefore(loader, document.body.firstChild);
    document.body.style.overflow = 'hidden';

    // Masquer le loader après l'animation complète
    setTimeout(() => {
      loader.classList.add('fade-out');
      document.body.style.overflow = '';

      // Supprimer l'élément du DOM après la transition
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 2000); // 2 secondes (lettres + barre + délai)
  }

  // Effet de révélation des cards au scroll
  function initScrollReveal() {
    // Désactiver le reveal sur mobile (<=600px)
    if (window.innerWidth > 600) {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
              const cards = entry.target.querySelectorAll('.card');
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('reveal-card', 'revealed');
                }, index * 150);
              });
            }, 100);
          }
        });
      }, observerOptions);
      document.querySelectorAll('.reveal-section').forEach(section => {
        observer.observe(section);
      });
    }
  }

  // Initialisation de tous les modules
  initMobileMenu();
  initTheme();
  initMouseTrail();
  initPageLoader();
  initScrollReveal();


}); 