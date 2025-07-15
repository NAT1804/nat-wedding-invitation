import "@/styles/main.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Initialize animations
function initAnimations() {
  // Hero section animations with enhanced effects
  const heroTimeline = gsap.timeline();

  heroTimeline
    .to("#save-date", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        gsap.to("#save-date", {
          scale: 1.05,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      },
    })
    .to(
      "#couple-names",
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Heart pulse animation
          gsap.to(".heart", {
            scale: 1.3,
            duration: 0.6,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut",
          });
        },
      },
      "-=0.3"
    )
    .to(
      "#wedding-date",
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .to(
      "#hero-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Subtle button glow effect
          gsap.to("#hero-cta button", {
            boxShadow: "0 0 20px rgba(244, 63, 94, 0.3)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut",
          });
        },
      },
      "-=0.3"
    );

  // Enhanced floating elements animation
  gsap.to(".floating-element", {
    y: -20,
    x: 10,
    rotation: 360,
    duration: 4,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    stagger: 0.7,
  });

  // Additional sparkle effect for floating elements
  gsap.to(".floating-element", {
    opacity: 0.8,
    scale: 1.2,
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
    stagger: 1,
  });

  // Scroll-triggered animations
  gsap.to(".invitation-content", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#invitation",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  // Details section
  gsap.to(".details-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#details",
      start: "top 80%",
    },
  });

  gsap.to(".details-subtitle", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#details",
      start: "top 80%",
    },
  });

  gsap.to(".detail-card", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".detail-card",
      start: "top 85%",
    },
  });

  // RSVP section
  gsap.to(".rsvp-title", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#rsvp",
      start: "top 80%",
    },
  });

  gsap.to(".rsvp-subtitle", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#rsvp",
      start: "top 80%",
    },
  });

  gsap.to(".rsvp-form", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#rsvp",
      start: "top 80%",
    },
  });

  // Footer
  gsap.to(".footer-content", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    },
  });
}

// Navigation functionality
function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
  const navMenu = document.querySelector(".nav-menu");

  // Show navigation after scroll
  gsap.to(navMenu, {
    opacity: 1,
    duration: 0.5,
    delay: 2,
    ease: "power2.out",
  });

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: target,
          ease: "power2.inOut",
        });

        // Button click animation
        gsap.to(btn, {
          scale: 1.3,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      }
    });
  });
}

// Additional interactive features
function addInteractiveFeatures() {
  // Add hover animations to detail cards
  const detailCards = document.querySelectorAll(".detail-card");
  detailCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(
        card.querySelector(".bg-rose-100, .bg-pink-100, .bg-purple-100"),
        {
          rotation: 360,
          duration: 0.6,
          ease: "power2.inOut",
        }
      );
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Add parallax effect to sections
  gsap.to("#hero", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Add text reveal animation for invitation content
  const textElements = document.querySelectorAll(
    "#invitation h2, #invitation p"
  );
  textElements.forEach((element, index) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

// Smooth scroll for CTA button
document.addEventListener("DOMContentLoaded", () => {
  const ctaButton = document.querySelector("#hero-cta button");
  ctaButton?.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#invitation",
      ease: "power2.inOut",
    });
  });

  // RSVP form submission
  const rsvpForm = document.querySelector("#rsvp-form") as HTMLFormElement;
  rsvpForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation and submission feedback
    const button = rsvpForm.querySelector(
      "button[type='submit']"
    ) as HTMLButtonElement;
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      button.textContent = "Thank You! ✨";
      button.classList.remove("bg-rose-500", "hover:bg-rose-600");
      button.classList.add("bg-green-500");

      // Reset form after a delay
      setTimeout(() => {
        rsvpForm.reset();
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove("bg-green-500");
        button.classList.add("bg-rose-500", "hover:bg-rose-600");
      }, 3000);
    }, 2000);
  });

  // Initialize all animations and features
  initAnimations();
  addInteractiveFeatures();
  setupNavigation();

  // Add loading animation
  gsap.from("body", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Add scroll progress indicator
  gsap.to(".scroll-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
});
