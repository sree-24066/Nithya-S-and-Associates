/* ============================================
   NITHYA S & ASSOCIATES — FAQ
   Accordion expand/collapse
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initFaqFilters();
});

function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all siblings
      const parent = item.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
          const body = sibling.querySelector('.accordion-body');
          if (body) body.style.maxHeight = null;
        });
      }

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion-body');
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
  });

  // Open first item by default
  const firstItem = document.querySelector('.accordion-item');
  if (firstItem) {
    firstItem.classList.add('active');
    const body = firstItem.querySelector('.accordion-body');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  }
}

function initFaqFilters() {
  const filterBtns = document.querySelectorAll('.faq-cat-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      const items = document.querySelectorAll('.accordion-item[data-category]');

      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
          const body = item.querySelector('.accordion-body');
          if (body) body.style.maxHeight = null;
        }
      });
    });
  });
}
