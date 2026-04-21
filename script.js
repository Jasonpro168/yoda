const counters = document.querySelectorAll("[data-count]");
const revealTargets = document.querySelectorAll(".card, .timeline article, .contact-card, .hero-copy, .hero-panel");
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

const animateCounter = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

counters.forEach(animateCounter);

revealTargets.forEach((target) => target.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealTargets.forEach((target) => observer.observe(target));

if (menuToggle && siteMenu) {
  const closeMenu = () => {
    menuToggle.classList.remove("is-open");
    siteMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = !siteMenu.classList.contains("is-open");
    menuToggle.classList.toggle("is-open", willOpen);
    siteMenu.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}
