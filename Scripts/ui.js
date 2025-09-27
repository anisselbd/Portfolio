// Menu mobile
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-toggle='menu']");
  const menu = document.querySelector("[data-menu]");
  if (btn && menu) menu.classList.toggle("open");
});

// Thème (dark/light)
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-toggle='theme']");
    if (!t) return;
    const next = root.getAttribute("data-theme") === "light" ? "" : "light";
    if (next) root.setAttribute("data-theme", next); else root.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
  });
})();

// Effet de traînée qui suit la souris (sans halo statique)
(function initMouseTrail() {
  // Créer les éléments de traînée uniquement
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

  // Suivre la souris
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Détecter si la souris bouge
    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      isMoving = false;
    }, 150); // Arrêter l'effet après 150ms d'inactivité
  });

  // Animation de la traînée
  function animateTrail() {
    trailElements.forEach((trail, index) => {
      const speed = 0.15 - (index * 0.02); // Vitesse décroissante

      trail.prevX = trail.x;
      trail.prevY = trail.y;

      trail.x += (mouseX - trail.x) * speed;
      trail.y += (mouseY - trail.y) * speed;

      // Calculer la vitesse de mouvement pour l'opacité
      const dx = trail.x - trail.prevX;
      const dy = trail.y - trail.prevY;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Appliquer position et rotation
      trail.element.style.left = trail.x + 'px';
      trail.element.style.top = trail.y + 'px';
      trail.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

      // Opacité basée sur le mouvement et l'index (plus visible)
      const baseOpacity = isMoving ? Math.min(velocity * 0.15, 1) : 0;
      trail.element.style.opacity = Math.max(0, baseOpacity - index * 0.15);
    });

    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Masquer quand la souris sort de la page
  document.addEventListener('mouseleave', () => {
    trailElements.forEach(trail => trail.element.style.opacity = '0');
  });
})();