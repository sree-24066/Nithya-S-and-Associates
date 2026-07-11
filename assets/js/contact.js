/* ============================================
   NITHYA S & ASSOCIATES — Contact
   Form validation & submission feedback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const inputs = form.querySelectorAll('.form-input, .form-textarea');

  // Floating label / focus animations
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.form-group')?.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.closest('.form-group')?.classList.remove('focused');
      if (input.value.trim()) {
        input.closest('.form-group')?.classList.add('filled');
      } else {
        input.closest('.form-group')?.classList.remove('filled');
      }
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    let hasError = false;

    // Validate required fields
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (name && !name.value.trim()) {
      showError(name, 'Please enter your name');
      hasError = true;
    }

    if (email) {
      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        hasError = true;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        hasError = true;
      }
    }

    if (message && !message.value.trim()) {
      showError(message, 'Please enter your message');
      hasError = true;
    }

    if (hasError) return;

    // Simulate submission
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="animate-spin" style="display:inline-block">↻</span> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Show success message
      submitBtn.innerHTML = '✓ Message Sent!';
      submitBtn.style.background = 'var(--success)';
      submitBtn.style.borderColor = 'var(--success)';

      form.reset();
      form.querySelectorAll('.form-group').forEach(g => {
        g.classList.remove('filled', 'focused');
      });

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
      }, 3000);
    }, 1500);
  });
}

function showError(input, message) {
  const group = input.closest('.form-group');
  if (!group) return;
  group.classList.add('error');
  const errorEl = group.querySelector('.form-error');
  if (errorEl) errorEl.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
