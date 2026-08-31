// Reveal each section once, the first time it scrolls into view.
let sections = document.querySelectorAll('section');
let prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced || !('IntersectionObserver' in window)) {
  sections.forEach(function (s) { s.classList.add('in-view'); });
} else {
  let observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(function (s) { observer.observe(s); });
}

// Mobile nav dropdown toggle
let menuToggle = document.querySelector('.menu-toggle');
let mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  const setMenuState = function (isOpen) {
    mobileMenu.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  menuToggle.addEventListener('click', function () {
    setMenuState(!mobileMenu.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuState(false);
    });
  });
}