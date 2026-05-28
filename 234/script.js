/* =============================================
   ZERC MOTORS — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE LOADER ──
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(() => loader.remove(), 500);
    }, 1400);
  }

  // ── NAVBAR SCROLL ──
  const navbar = document.querySelector('.zm-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── ACTIVE NAV LINK ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.zm-navlink').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── FADE IN ON SCROLL ──
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── PRODUCT FILTER ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── ADD TO CART ──
  const cartBadge = document.querySelector('.cart-badge');
  let cartCount = 0;
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i>';
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 1500);
    });
  });

  // ── SMOOTH SCROLL for # links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── CONTACT FORM ──
  const contactForm = document.querySelector('.zm-contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('.zm-input');
        let valid = true;
        inputs.forEach(inp => {
          if (inp.required && !inp.value.trim()) {
            inp.style.borderColor = 'var(--red)';
            valid = false;
          } else {
            inp.style.borderColor = '';
          }
        });
        if (!valid) return;

        const orig = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Mensagem Enviada!';
        submitBtn.style.background = '#16a34a';
        submitBtn.style.borderColor = '#16a34a';
        setTimeout(() => {
          submitBtn.innerHTML = orig;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          inputs.forEach(inp => inp.value = '');
        }, 3000);
      });
    }
  }

  // ── COUNTER ANIMATION ──
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const rawTarget = el.textContent.trim();
          const isFloat = rawTarget.includes('.');
          const numericStr = rawTarget.replace(/[^0-9.]/g, '');
          const suffix = rawTarget.replace(/[0-9.]/g, '');
          const target = parseFloat(numericStr);
          let start = 0;
          const duration = 1800;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            el.textContent = (isFloat ? start.toFixed(1) : Math.floor(start)) + suffix;
          }, step);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));
  }

  // ── SCHEDULE FORM (agendamento.html) ──
  const schedForm = document.getElementById('scheduleForm');
  if (schedForm) {
    schedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = schedForm.querySelector('[type="submit"]');
      btn.innerHTML = '<i class="fas fa-check me-2"></i> Agendamento Confirmado!';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = 'Agendar Test Drive <i class="fas fa-arrow-right ms-2"></i>';
        btn.style.background = '';
        schedForm.reset();
      }, 3000);
    });
  }

  // ── DATE INPUT MIN = today ──
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(inp => inp.setAttribute('min', today));

});