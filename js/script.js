/* ============================================================
   InAmigos NGO Website — Main JavaScript
   Vanilla JS | Intersection Observer | Canvas Particles
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==================== 0. ACCESSIBILITY PREFERENCE ==================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==================== 1. PRELOADER ==================== */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove preloader from DOM after transition
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 600);
    }, 800);
  });


  /* ==================== 2. STICKY NAVBAR ==================== */
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  // Initial check
  updateNavbar();


  /* ==================== 3. MOBILE MENU TOGGLE ==================== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const allNavLinks = navLinks.querySelectorAll('.nav-link');

  function openMenu() {
    navLinks.classList.add('active');
    navToggle.classList.add('active');
    navOverlay.classList.add('active');
    navOverlay.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    navOverlay.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a nav link is clicked
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Close menu when clicking the overlay backdrop
  navOverlay.addEventListener('click', closeMenu);

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });


  /* ==================== 4. SCROLL SPY (Active Nav Link) ==================== */
  const sections = document.querySelectorAll('section[id], footer[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  /* ==================== 5. SCROLL REVEALS (Intersection Observer) ==================== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after revealing for performance
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ==================== 6. ANIMATED COUNTERS ==================== */
  const impactNumbers = document.querySelectorAll('.impact-number');
  let countersAnimated = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2200; // ms
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * eased);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        impactNumbers.forEach(num => animateCounter(num));
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  if (impactNumbers.length > 0) {
    counterObserver.observe(impactNumbers[0].closest('.impact-card') || impactNumbers[0]);
  }


  /* ==================== 7. GALLERY LIGHTBOX ==================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  const gallerySources = [];

  galleryItems.forEach((item, index) => {
    gallerySources.push(item.getAttribute('data-src'));
    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox(gallerySources[currentImageIndex]);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % gallerySources.length;
    lightboxImg.src = gallerySources[currentImageIndex];
    updateNavButtons();
  }

  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + gallerySources.length) % gallerySources.length;
    lightboxImg.src = gallerySources[currentImageIndex];
    updateNavButtons();
  }

  function updateNavButtons() {
    prevBtn.style.display = gallerySources.length > 1 ? 'flex' : 'none';
    nextBtn.style.display = gallerySources.length > 1 ? 'flex' : 'none';
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });


  /* ==================== 8. TESTIMONIAL CAROUSEL ==================== */
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevTestimonial = document.getElementById('testimonialPrev');
  const nextTestimonial = document.getElementById('testimonialNext');

  let currentSlide = 0;
  const slideCount = slides.length;
  let autoPlayInterval;

  // Create dots
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('span');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slideCount);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slideCount) % slideCount);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  prevTestimonial.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });

  nextTestimonial.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });

  // Pause on hover
  const carousel = document.getElementById('testimonialCarousel');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      startAutoPlay();
    }
  });

  // Initialize
  if (slideCount > 0) {
    goToSlide(0);
    startAutoPlay();
  }


  /* ==================== 9. SMOOTH SCROLLING ==================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ==================== 10. SCROLL TO TOP BUTTON ==================== */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollTop, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ==================== 11. FORM VALIDATION ==================== */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // --- Volunteer Form ---
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', handleVolunteerSubmit);
  }

  function handleVolunteerSubmit(e) {
    e.preventDefault();
    let isValid = true;
    const form = e.target;

    const name = form.querySelector('#volName');
    const email = form.querySelector('#volEmail');
    const message = form.querySelector('#volMessage');

    [name, email, message].forEach(field => field?.classList.remove('error'));

    if (!name.value.trim()) { name.classList.add('error'); isValid = false; }
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) { email.classList.add('error'); isValid = false; }
    if (!message.value.trim()) { message.classList.add('error'); isValid = false; }

    if (isValid) {
      showFormSuccess(form, 'Thank you for registering! We will contact you soon.', handleVolunteerSubmit);
    }
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    let isValid = true;
    const form = e.target;

    const name = form.querySelector('#ctName');
    const email = form.querySelector('#ctEmail');
    const message = form.querySelector('#ctMessage');

    [name, email, message].forEach(field => field?.classList.remove('error'));

    if (!name.value.trim()) { name.classList.add('error'); isValid = false; }
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) { email.classList.add('error'); isValid = false; }
    if (!message.value.trim()) { message.classList.add('error'); isValid = false; }

    if (isValid) {
      showFormSuccess(form, 'Message sent successfully! We will get back to you soon.', handleContactSubmit);
    }
  }

  // --- Newsletter Form ---
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');

      if (input.value.trim() && emailRegex.test(input.value.trim())) {
        input.value = '';
        const btn = newsletterForm.querySelector('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.style.background = 'var(--clr-green)';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
        }, 2000);
      } else {
        input.style.borderColor = '#ef4444';
        setTimeout(() => { input.style.borderColor = ''; }, 2000);
      }
    });
  }

  function showFormSuccess(form, message, reattachHandler) {
    const originalHTML = form.innerHTML;
    form.innerHTML = `
      <div style="text-align:center;padding:2rem;">
        <div style="width:70px;height:70px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;">
          <i class="fa-solid fa-check" style="font-size:2rem;color:white;"></i>
        </div>
        <h3 style="font-family:var(--font-heading);color:var(--clr-deep-blue);margin-bottom:0.5rem;">Success!</h3>
        <p style="color:var(--clr-gray-500);">${message}</p>
      </div>
    `;
    setTimeout(() => {
      form.innerHTML = originalHTML;
      form.addEventListener('submit', reattachHandler);
    }, 4000);
  }


  /* ==================== 12. PARTICLE EFFECTS ==================== */

  // --- Hero Canvas Particles ---
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let heroParticles = [];
    let heroAnimId;

    function resizeHeroCanvas() {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    }

    function createHeroParticles() {
      heroParticles = [];
      const count = Math.floor((heroCanvas.width * heroCanvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        heroParticles.push({
          x: Math.random() * heroCanvas.width,
          y: Math.random() * heroCanvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    function animateHeroParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      heroParticles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = heroCanvas.width;
        if (p.x > heroCanvas.width) p.x = 0;
        if (p.y < 0) p.y = heroCanvas.height;
        if (p.y > heroCanvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < heroParticles.length; i++) {
        for (let j = i + 1; j < heroParticles.length; j++) {
          const dx = heroParticles[i].x - heroParticles[j].x;
          const dy = heroParticles[i].y - heroParticles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(heroParticles[i].x, heroParticles[i].y);
            ctx.lineTo(heroParticles[j].x, heroParticles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      heroAnimId = requestAnimationFrame(animateHeroParticles);
    }

    let heroResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(heroResizeTimer);
      heroResizeTimer = setTimeout(() => {
        resizeHeroCanvas();
        createHeroParticles();
      }, 150);
    });

    resizeHeroCanvas();
    createHeroParticles();
    if (!prefersReducedMotion) {
      animateHeroParticles();
    }
  }

  // --- Impact Canvas Particles ---
  const impactCanvas = document.getElementById('impactCanvas');
  if (impactCanvas) {
    const ictx = impactCanvas.getContext('2d');
    let impactParticles = [];
    let impactInitDone = false;
    let impactAnimId;

    function resizeImpactCanvas() {
      impactCanvas.width = impactCanvas.offsetWidth;
      impactCanvas.height = impactCanvas.offsetHeight;
    }

    function createImpactParticles() {
      impactParticles = [];
      const count = Math.floor((impactCanvas.width * impactCanvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        impactParticles.push({
          x: Math.random() * impactCanvas.width,
          y: Math.random() * impactCanvas.height,
          radius: Math.random() * 2.5 + 0.5,
          speedY: -0.3 - Math.random() * 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.05,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function animateImpactParticles(timestamp) {
      ictx.clearRect(0, 0, impactCanvas.width, impactCanvas.height);

      impactParticles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;
        const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.1;

        // Wrap
        if (p.y < -10) p.y = impactCanvas.height + 10;
        if (p.x < -10) p.x = impactCanvas.width + 10;
        if (p.x > impactCanvas.width + 10) p.x = -10;

        ictx.beginPath();
        ictx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ictx.fillStyle = `rgba(45, 212, 191, ${Math.max(0, currentOpacity)})`;
        ictx.fill();
      });

      impactAnimId = requestAnimationFrame(animateImpactParticles);
    }

    const impactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !impactInitDone) {
          impactInitDone = true;
          resizeImpactCanvas();
          createImpactParticles();
          if (!prefersReducedMotion) {
            animateImpactParticles(performance.now());
          }
        }
      });
    }, { threshold: 0.1 });

    impactObserver.observe(impactCanvas);

    let impactResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(impactResizeTimer);
      impactResizeTimer = setTimeout(() => {
        resizeImpactCanvas();
        createImpactParticles();
      }, 150);
    });
  }

}); // End DOMContentLoaded