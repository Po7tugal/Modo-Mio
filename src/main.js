// ============================================
// MODO MIO — interações
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAV scroll state ---------- */
  const nav = document.querySelector('.nav');
  const stickyCta = document.querySelector('.sticky-cta');
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (stickyCta) {
      if (window.scrollY > window.innerHeight * 0.6) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const branchEls = document.querySelectorAll('.branch-divider');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    el.style.setProperty('--i', i % 6);
    io.observe(el);
  });
  branchEls.forEach(el => io.observe(el));

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const lists = document.querySelectorAll('.menu-list');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      lists.forEach(l => l.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  /* ---------- Gallery carousel ---------- */
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-nav .prev');
  const nextBtn = document.querySelector('.carousel-nav .next');
  if (track && prevBtn && nextBtn) {
    const scrollAmount = () => track.querySelector('.carousel-slide').offsetWidth + 22;
    nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
    prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  }

  /* ---------- Ambience video mute toggle ---------- */
  const ambVideo = document.querySelector('.ambience video');
  const muteBtn = document.querySelector('.mute-btn');
  if (ambVideo && muteBtn) {
    muteBtn.addEventListener('click', () => {
      ambVideo.muted = !ambVideo.muted;
      muteBtn.innerHTML = ambVideo.muted ? iconMuted() : iconSound();
    });
    muteBtn.innerHTML = iconMuted();
  }
  function iconMuted(){
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  }
  function iconSound(){
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/><path d="M18.5 5.5a9 9 0 010 13"/></svg>';
  }

  /* ---------- Smooth anchor offset for fixed nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - 84;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

});