/* ==========================================
   TECHPRIX — Main JS
   Navbar, Scroll Reveal, Counters, Misc
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ========== NAVBAR SCROLL ========== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ========== HAMBURGER MENU ========== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  /* ========== ACTIVE NAV LINK ========== */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link:not(.nav-cta)');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        const id = section.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.remove('active-nav');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active-nav');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Active nav style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.active-nav { color: var(--white) !important; background: var(--white-faint) !important; }`;
  document.head.appendChild(navStyle);

  /* ========== SCROLL REVEAL ========== */
  const revealEls = document.querySelectorAll(
    '.section-header, .service-card, .project-card, .pricing-card, .intern-card, .contact-info, .contact-form-wrap, .floating-card'
  );
  revealEls.forEach((el, i) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });

  // Expose observer for dynamic content
  window.techprixObserver = observer;

  /* ========== COUNTER ANIMATION ========== */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(c => animateCounter(c));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) statsObserver.observe(statsSection);

  /* ========== BUTTON RIPPLE ========== */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== SCROLL PROGRESS BAR ========== */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
    background: linear-gradient(90deg, #7C3AED, #06B6D4);
    width: 0%; transition: width 0.1s; pointer-events: none;
    box-shadow: 0 0 8px rgba(124,58,237,0.6);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ========== CURSOR GLOW (desktop only) ========== */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      width: 300px; height: 300px; border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
      position: fixed; pointer-events: none; z-index: 0;
      transform: translate(-50%, -50%); transition: transform 0.1s ease;
      will-change: transform;
    `;
    document.body.appendChild(glow);

    let glowX = 0, glowY = 0, cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateGlow() {
      glowX += (cursorX - glowX) * 0.08;
      glowY += (cursorY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ========== TOAST NOTIFICATION ========== */
  window.showToast = function (message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; bottom: 32px; right: 32px; z-index: 9999;
      background: ${type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'};
      border: 1px solid ${type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'};
      color: ${type === 'success' ? '#6EE7B7' : '#FCA5A5'};
      padding: 16px 24px; border-radius: 12px;
      font-size: 0.9rem; font-weight: 500; max-width: 360px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      animation: fadeInUp 0.4s ease both;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  /* ========== YEAR IN FOOTER ========== */
  const yearEls = document.querySelectorAll('.footer-year');
  yearEls.forEach(el => { el.textContent = new Date().getFullYear(); });

  console.log('%cTECHPRIX 🚀', 'font-size:20px;font-weight:bold;color:#7C3AED;');
  console.log('%cBuilt for students. Powered by passion.', 'color:#06B6D4;');
});
