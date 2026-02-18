// ===== Three Cubs Treats - Scripts =====

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll behavior - add background after scrolling past hero
  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Hero Carousel ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  const goToSlide = (index) => {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const startHeroCarousel = () => {
    heroInterval = setInterval(nextSlide, 5000);
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(heroInterval);
      goToSlide(parseInt(dot.dataset.slide));
      startHeroCarousel();
    });
  });

  if (slides.length > 1) {
    startHeroCarousel();
  }

  // --- Gallery Carousel ---
  const galleryCarousel = document.getElementById('galleryCarousel');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');

  if (galleryCarousel && prevBtn && nextBtn) {
    const scrollAmount = 400;

    prevBtn.addEventListener('click', () => {
      galleryCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      galleryCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Build a mailto link as fallback (replace with Formspree or similar in production)
      const subject = encodeURIComponent(`Event Inquiry - ${data.eventType || 'General'}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Event Type: ${data.eventType}\n` +
        `Event Date: ${data.date || 'TBD'}\n\n` +
        `Message:\n${data.message}`
      );

      window.location.href = `mailto:threecubstreats@gmail.com?subject=${subject}&body=${body}`;

      // Show success feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Opening email...';
      btn.style.background = '#5a9a6a';
      btn.style.borderColor = '#5a9a6a';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3000);
    });
  }

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
