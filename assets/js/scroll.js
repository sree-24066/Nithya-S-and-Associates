/* ============================================
   NITHYA S & ASSOCIATES — Scroll
   Smooth scrolling & scroll progress
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
});

function initSmoothScroll() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect on hero shapes
  const heroShapes = document.querySelectorAll('.hero-shape');
  if (heroShapes.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroShapes.forEach((shape, i) => {
        const speed = 0.15 + (i * 0.08);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }
}
