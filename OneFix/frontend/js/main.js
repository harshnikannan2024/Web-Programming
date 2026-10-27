/**
 * OneFix — Editorial Issue Management Platform
 * Core Navigation & Mobile Drawer Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollSpy();
});

/**
 * 1. Mobile Navigation Drawer Controls
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const panel = document.getElementById('mobile-nav-panel');

  if (!toggleBtn || !panel) return;

  function openDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close when clicking any link inside drawer
  const links = panel.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });

  // Close when clicking outside of drawer
  document.addEventListener('click', (e) => {
    if (panel.classList.contains('is-open') && !panel.contains(e.target) && e.target !== toggleBtn) {
      closeDrawer();
    }
  });
}

/**
 * 2. Subtle Scroll Spy Highlighting for Navigation
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu-links .nav-item-link');

  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
