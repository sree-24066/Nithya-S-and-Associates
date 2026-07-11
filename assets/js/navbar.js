/* ============================================
   NITHYA S & ASSOCIATES — Navbar
   Scroll behavior, mobile menu, dropdowns
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  const topBar = document.querySelector('.top-bar');

  if (!navbar) return;

  let topBarHeight = topBar ? topBar.offsetHeight : 0;

  /* ── Scroll Behavior ── */
  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > topBarHeight + 10) {
      navbar.classList.remove('navbar--top');
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
      navbar.classList.add('navbar--top');
    }
  }

  // Initial state
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    topBarHeight = topBar ? topBar.offsetHeight : 0;
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });

  /* ── Mobile Menu ── */
  function openMobileMenu() {
    navMenu.classList.add('open');
    navToggle.classList.add('active');
    if (navOverlay) {
      navOverlay.classList.add('active');
      navOverlay.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    if (navOverlay) {
      navOverlay.classList.remove('active');
      setTimeout(() => { navOverlay.style.display = 'none'; }, 300);
    }
    document.body.style.overflow = '';
    // Close all dropdowns
    dropdownItems.forEach(item => item.classList.remove('open'));
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  /* ── Mobile Dropdowns ── */
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    link.addEventListener('click', (e) => {
      // Only handle dropdown toggle on mobile
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        // Close others
        dropdownItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    });
  });

  /* ── Close menu when clicking a non-dropdown link ── */
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const parent = link.closest('.has-dropdown');
      if (!parent && window.innerWidth <= 1024) {
        closeMobileMenu();
      }
    });
  });

  // Also close on dropdown item click (mobile)
  const dropdownLinks = navMenu.querySelectorAll('.dropdown-item');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeMobileMenu();
      }
    });
  });

  /* ── Escape key to close ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
});
