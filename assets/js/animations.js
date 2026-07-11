/* ============================================
   NITHYA S & ASSOCIATES — Animations
   GSAP-style scroll animations (vanilla)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStaggerAnimations();
  initCardHoverTilt();
  initTextAnimations();
});

/* ── Stagger children on scroll ── */
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('[data-stagger]');

  if (!staggerContainers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const children = container.querySelectorAll('[data-stagger-child]');
        const delay = parseInt(container.dataset.stagger) || 100;

        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('revealed');
          }, index * delay);
        });

        observer.unobserve(container);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  staggerContainers.forEach(el => observer.observe(el));
}

/* ── Card Tilt on Hover ── */
function initCardHoverTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ── Heading text reveal animations ── */
function initTextAnimations() {
  const animatedTexts = document.querySelectorAll('[data-text-reveal]');

  if (!animatedTexts.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('text-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedTexts.forEach(el => observer.observe(el));
}
