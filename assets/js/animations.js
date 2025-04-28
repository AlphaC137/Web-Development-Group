/**
 * Animations JavaScript File
 * Author: Group 214
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
  
    // Typing animation for hero section
    function initTypingAnimation() {
      const typingElement = document.querySelector('.outlined-text');
      const typingCursor = document.querySelector('.typing-animation');
      
      if (!typingElement || !typingCursor) return;
      
      // Original text to type
      const originalText = "Web Developer";
      
      // Clear the text content and set up for typing animation
      typingElement.textContent = "";
      typingElement.style.opacity = '1';
      typingCursor.style.opacity = '1';
      
      // Timing variables (in milliseconds)
      const typingSpeed = 150;       // Time between typing each character
      const erasingSpeed = 100;      // Time between erasing each character
      const startDelay = 1000;       // Initial delay before starting
      const pauseBeforeErasing = 2000; // Pause time before erasing starts
      const pauseBeforeTyping = 2000;  // Pause time after erasing before typing again
      
      let charIndex = 0;
      let isDeleting = false;
      let timeoutId = null;
      
      // Function to type or erase text
      function typeText() {
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        if (!isDeleting) {
          // Typing mode
          if (charIndex < originalText.length) {
            // Add next character
            typingElement.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            timeoutId = setTimeout(typeText, typingSpeed);
          } else {
            // Finished typing, pause before erasing
            isDeleting = true;
            timeoutId = setTimeout(typeText, pauseBeforeErasing);
          }
        } else {
          // Erasing mode
          if (charIndex > 0) {
            // Remove last character
            typingElement.textContent = originalText.substring(0, charIndex - 1);
            charIndex--;
            timeoutId = setTimeout(typeText, erasingSpeed);
          } else {
            // Finished erasing, pause before typing again
            isDeleting = false;
            timeoutId = setTimeout(typeText, pauseBeforeTyping);
          }
        }
      }
      
      // Start the typing animation after a short delay
      setTimeout(typeText, startDelay);
    }
    
    // Stats counter animation
    function initStatsCounters() {
      const counters = document.querySelectorAll('.counter');
      const options = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            
            // Reset counter to 0
            counter.textContent = '0';
            
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            
            let current = 0;
            
            const timer = setInterval(() => {
              current += 1;
              counter.textContent = current;
              
              if (current >= target) {
                clearInterval(timer);
                counter.textContent = target; // Ensure final value is correct
              }
            }, stepTime);
            
            // Once the animation has been triggered, stop observing this counter
            observer.unobserve(counter);
          }
        });
      }, options);
      
      counters.forEach(counter => {
        observer.observe(counter);
      });
    }
    
    // Scroll animations using Intersection Observer
    function initScrollAnimations() {
      if (!('IntersectionObserver' in window)) return;
      
      const sections = document.querySelectorAll('section');
      const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate the section's children with a staggered delay
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('slide-up');
              }, 100 * index);
            });
            
            // Once the animation has been triggered, we can stop observing this section
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      sections.forEach(section => {
        section.classList.add('animation-ready');
        observer.observe(section);
      });
    }
    
    // Smooth parallax scrolling effect for hero section
    function initParallaxEffect() {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
          hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
      });
    }
    
    // Initialize Sydwell's animations
    initTypingAnimation();
    initStatsCounters();
    initScrollAnimations();
    initParallaxEffect();
    
    // Skill bars animation - To be implemented by Team Member 3
    /*
    function initSkillBarsAnimation() {
      // Skill bars animation code will go here
    }
    */
    
    // Portfolio hover effects - To be implemented by Team Member 3
    /*
    function initPortfolioHoverEffects() {
      // Portfolio hover effects code will go here
    }
    */
    
    // Reveal animations when scrolling
    window.addEventListener('scroll', debounce(function() {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    }, 50));
    
    // Helper function to limit function calls for scroll events
    function debounce(func, wait, immediate) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  });