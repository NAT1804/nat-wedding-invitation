import "@/styles/main.scss";

import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// let smoother: ScrollSmoother | null = null;

// Music Player
function initMusicPlayer() {
  const musicToggle = $("#musicToggle") as HTMLElement;
  const bgMusic = $("#bgMusic") as HTMLAudioElement;
  let isPlaying = false;

  musicToggle?.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic?.pause();
      musicToggle.classList.remove("playing");
    } else {
      bgMusic?.play();
      musicToggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });
}

// Particle Effects for Hero Section
function initParticles() {
  const particlesContainer = $("#particles") as HTMLElement;
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 20 + Math.random() * 20 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Enhanced Gallery and Zoom Lightbox
function initZoomableImages() {
  const zoomableItems = $$(".zoomable") as NodeListOf<HTMLElement>;
  const lightbox = $("#lightbox") as HTMLElement;
  const lightboxImage = $("#lightboxImage") as HTMLImageElement;
  const lightboxClose = $("#lightboxClose") as HTMLElement;
  const zoomInBtn = $("#zoomIn") as HTMLElement;
  const zoomOutBtn = $("#zoomOut") as HTMLElement;
  const zoomResetBtn = $("#zoomReset") as HTMLElement;
  const rotateLeftBtn = $("#rotateLeft") as HTMLElement;
  const rotateRightBtn = $("#rotateRight") as HTMLElement;
  const rotateResetBtn = $("#rotateReset") as HTMLElement;
  
  let currentScale = 1;
  let currentRotation = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  // Function to update image transform
  const updateImageTransform = () => {
    if (lightboxImage) {
      lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale}) rotate(${currentRotation}deg)`;
    }
  };

  // Reset zoom, position, and rotation
  const resetAll = () => {
    currentScale = 1;
    currentRotation = 0;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
  };
  
  // Reset only zoom and position (keep rotation)
  const resetZoom = () => {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateImageTransform();
  };
  
  // Reset only rotation (keep zoom and position)
  const resetRotation = () => {
    currentRotation = 0;
    updateImageTransform();
  };

  // Open lightbox with background image
  zoomableItems.forEach((item) => {
    item.addEventListener("click", () => {
      const bgUrl = item.getAttribute('data-bg');
      if (bgUrl && lightboxImage) {
        lightboxImage.src = bgUrl;
        lightbox?.classList.add("active");
        resetAll();
      }
    });
  });

  // Close lightbox
  lightboxClose?.addEventListener("click", () => {
    lightbox?.classList.remove("active");
    resetAll();
  });

  // Close on background click
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      resetAll();
    }
  });

  // Zoom controls
  zoomInBtn?.addEventListener("click", () => {
    currentScale = Math.min(currentScale * 1.3, 5);
    updateImageTransform();
  });

  zoomOutBtn?.addEventListener("click", () => {
    currentScale = Math.max(currentScale / 1.3, 0.5);
    updateImageTransform();
  });

  zoomResetBtn?.addEventListener("click", () => {
    resetZoom();
  });

  // Rotation controls
  rotateLeftBtn?.addEventListener("click", () => {
    currentRotation -= 90;
    updateImageTransform();
  });

  rotateRightBtn?.addEventListener("click", () => {
    currentRotation += 90;
    updateImageTransform();
  });

  rotateResetBtn?.addEventListener("click", () => {
    resetRotation();
  });

  // Mouse wheel zoom
  lightboxImage?.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    currentScale = Math.min(Math.max(currentScale * delta, 0.5), 5);
    updateImageTransform();
  });

  // Drag functionality for zoomed images
  lightboxImage?.addEventListener("mousedown", (e) => {
    if (currentScale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      lightboxImage.style.cursor = "grabbing";
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging && currentScale > 1) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateImageTransform();
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      if (lightboxImage) {
        lightboxImage.style.cursor = currentScale > 1 ? "grab" : "default";
      }
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (lightbox?.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          lightbox.classList.remove("active");
          resetAll();
          break;
        case "+":
        case "=":
          currentScale = Math.min(currentScale * 1.3, 5);
          updateImageTransform();
          break;
        case "-":
          currentScale = Math.max(currentScale / 1.3, 0.5);
          updateImageTransform();
          break;
        case "0":
          resetZoom();
          break;
        case "r":
        case "R":
          currentRotation += 90;
          updateImageTransform();
          break;
        case "l":
        case "L":
          currentRotation -= 90;
          updateImageTransform();
          break;
        case "ArrowLeft":
          currentRotation -= 90;
          updateImageTransform();
          break;
        case "ArrowRight":
          currentRotation += 90;
          updateImageTransform();
          break;
        case "ArrowUp":
          resetRotation();
          break;
      }
    }
  });

  // Touch support for mobile
  let initialDistance = 0;
  let initialScale = 1;

  lightboxImage?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      initialDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialScale = currentScale;
    }
  });

  lightboxImage?.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = (distance / initialDistance) * initialScale;
      currentScale = Math.min(Math.max(scale, 0.5), 5);
      updateImageTransform();
    }
  });
}

// Initialize all animations
function initAnimations() {
  // Initialize ScrollSmoother
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
  });

  // Hero animations
  gsap
    .timeline()
    .from(".hero__subtitle", { opacity: 0, y: 30, duration: 1 })
    .from(
      ".hero__name",
      { opacity: 0, y: 50, duration: 1, stagger: 0.2 },
      "-=0.5"
    )
    .from(".hero__amp", { opacity: 0, scale: 0, duration: 0.5 }, "-=0.5")
    .from(".hero__date", { opacity: 0, y: 30, duration: 1 }, "-=0.5")
    .from(".hero__quote", { opacity: 0, duration: 1 }, "-=0.5")
    .from(".hero__cta", { opacity: 0, y: 30, duration: 1 }, "-=0.5");

  // Parallax effects
  gsap.to(".hero__bg", {
    yPercent: 50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Gallery items animation
  const galleryItems = $$(".gallery__item");
  galleryItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: index * 0.1,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
      },
    });
  });

  // Title animations
  const titles = $$(".hero__name");
  titles.forEach((title) => {
    const splitText = new SplitType(title as HTMLElement, { types: "chars" });

    gsap.from(splitText.chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
      },
    });
  });
}

function loadIntroPanel() {
  // Panel animation
  gsap.to(".panel", {
    scaleY: 0,
    duration: 1.65,
    ease: "power4.inOut",
  });
}

function loadTitle() {
  const splitName = new SplitType(".hero__title", {
    types: "chars",
  });

  gsap
    .timeline()
    .set(".hero__title", { scale: 1.4 })
    .from(splitName.chars, {
      yPercent: gsap.utils.wrap([200, -80]),
      opacity: 0,
      stagger: 0.018,
      duration: 1.6,
      ease: "power4.inOut",
    })
    .to(
      ".hero__title",
      { scale: 1, duration: 0.95, ease: "power3.out" },
      "-=0.75"
    );
}

function loadSecImg() {
  const splitJL = new SplitType(".JL", {
    types: "chars",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".sec-img",
      // markers: true,
      scrub: 0.4,
      scroller: "#smooth-wrapper",
      pin: true,
      start: "center center",
      end: "+=100%",
    },
  });

  tl.to(".mask", {
    scaleY: 0,
  })
    .from(
      splitJL.chars,
      {
        opacity: 0,
        x: -100,
        stagger: 0.015,
      },
      0
    )
    .from(
      ".img",
      {
        opacity: 0,
        scale: 1.7,
      },
      0
    );
}

function loadSpinImg() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".spin-img",
        scrub: 1,
        scroller: "#smooth-wrapper",
      },
    })
    .from(".spin-img__list", {
      scale: 0.8,
    })
    .to(".spin-img__list", {
      scale: 1,
      rotate: 270,
      duration: 2,
      ease: "power1.inOut",
    })
    .to(
      ".spin-img__img",
      {
        rotate: -270,
        duration: 2,
        ease: "power1.inOut",
      },
      0
    );
}

function loadGallery() {
  gsap.utils.toArray(".my-gallery").forEach((section: any, index) => {
    const w = section.querySelector(".wrapper");
    const [x, xEnd] =
      index % 2
        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
        : [w.scrollWidth * -0.5, 0];
    gsap.fromTo(
      w,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          scrub: 1,
        },
      }
    );
  });
}

function smoothTitle() {
  // let headings = gsap.utils.toArray(".JL").reverse();
  // headings.forEach((heading: any, i) => {
  //   let headingIndex = i + 1;
  //   let mySplitText = new SplitType(heading, { types: "chars" });
  //   let chars = mySplitText.chars ?? [];
  //   chars.forEach((char, i) => {
  //     smoother?.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
  //   });
  // });
}

function initBackgroundImagesInvitation() {
  const bgElements = $$('[data-bg]') as NodeListOf<HTMLElement>;
  bgElements.forEach((element) => {
    const bgUrl = element.getAttribute('data-bg');
    if (bgUrl) {
      element.style.backgroundImage = `url(${bgUrl})`;
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  loadIntroPanel();
  loadTitle();
  smoothTitle();
  loadSecImg();
  loadSpinImg();
  loadGallery();
  initBackgroundImagesInvitation();
  initMusicPlayer();
  initParticles();
  initZoomableImages();
});
