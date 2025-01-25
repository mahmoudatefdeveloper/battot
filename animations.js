// Advanced UI Animations with Performance Optimizations

document.addEventListener('DOMContentLoaded', () => {
  // Throttle function with smoother timing
  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  };

  // Enhanced Intersection Observer with smoother thresholds
  const scrollObserverOptions = {
    root: null,
    rootMargin: '20px',
    threshold: Array.from({ length: 41 }, (_, i) => i * 0.025) // More granular thresholds
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Calculate smooth fade based on intersection ratio
        const opacity = Math.min(1, entry.intersectionRatio * 1.5);
        const translateY = 30 * (1 - entry.intersectionRatio);
        
        // Add staggered delay based on position
        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
        
        entry.target.style.transition = `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
        entry.target.style.opacity = opacity;
        entry.target.style.transform = `translateY(${translateY}px)`;
        
        if (entry.intersectionRatio > 0.8) {
          entry.target.classList.add('is-visible');
        }
      }
    });
  }, scrollObserverOptions);

  // Observe scroll elements with smooth transitions
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  scrollElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    scrollObserver.observe(el);
  });

  // Smooth 3D card effect with interpolation
  const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

  const handleCardMove = (card, event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = lerp(0, (y - centerY) / 15, 0.8);
    const rotateY = lerp(0, (centerX - x) / 15, 0.8);
    
    requestAnimationFrame(() => {
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.02)
        translateZ(20px)
      `;
    });
  };

  const handleCardLeave = (card) => {
    requestAnimationFrame(() => {
      card.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale(1)
        translateZ(0)
      `;
      card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  };

  // Apply smooth card animations
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', throttle((e) => handleCardMove(card, e), 10));
    card.addEventListener('mouseleave', () => handleCardLeave(card));
    card.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleCardMove(card, touch);
    }, { passive: false });
    card.addEventListener('touchend', () => handleCardLeave(card));
  });

  // Smooth scroll with easing
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / 1000, 1);
          
          // Smooth easing function
          const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          
          window.scrollTo(0, startPosition + distance * ease(progress));
          
          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });

  // Enhanced logo animation
  const logo = document.querySelector('.logo i');
  if (logo) {
    let isAnimating = false;
    
    logo.addEventListener('mouseover', () => {
      if (!isAnimating) {
        isAnimating = true;
        logo.style.animation = 'none';
        logo.offsetHeight; // Trigger reflow
        logo.style.animation = 'sparkle 3s cubic-bezier(0.16, 1, 0.3, 1) infinite';
        setTimeout(() => isAnimating = false, 3000);
      }
    });
  }

  // Initialize Lucide icons
  lucide.createIcons();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const menuIcon = menuToggle.querySelector('[data-lucide]');
      if (navLinks.classList.contains('active')) {
        menuIcon.setAttribute('name', 'x');
      } else {
        menuIcon.setAttribute('name', 'menu');
      }
      lucide.createIcons();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        const menuIcon = menuToggle.querySelector('[data-lucide]');
        menuIcon.setAttribute('name', 'menu');
        lucide.createIcons();
      }
    });
  }

  // Scroll animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Check if element is in viewport
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.classList.add('visible');
      }
    });
  };

  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Here you would typically send the data to your backend
      // For now, we'll just log it
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('شكراً لتواصلك معنا! سنرد عليك قريباً');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scroll animation for gallery cards
  const animateGalleryCards = () => {
    const cards = document.querySelectorAll('.gallery-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a small delay for each card to create a cascade effect
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, Array.from(cards).indexOf(entry.target) * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    cards.forEach(card => observer.observe(card));
  };

  animateGalleryCards();

  // Gallery image loading animation
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      img.addEventListener('load', () => {
        card.classList.add('loaded');
      });
    }
  });

  // Floating animation for cute elements
  const floatingIcons = document.querySelectorAll('.floating-icon');
  floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
  });

  // Heart beat animation
  const hearts = document.querySelectorAll('.heart-icon');
  hearts.forEach(heart => {
    heart.style.animation = 'heartBeat 1.5s ease-in-out infinite';
  });
});
