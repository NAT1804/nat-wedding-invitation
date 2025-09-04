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

// Gallery Lightbox
function initGallery() {
  const galleryItems = $$(".gallery__item");
  const lightbox = $("#lightbox") as HTMLElement;
  const lightboxImage = $("#lightboxImage") as HTMLImageElement;
  const lightboxClose = $("#lightboxClose") as HTMLElement;

  // Lightbox functionality
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img") as HTMLImageElement;
      if (img && lightboxImage) {
        lightboxImage.src = img.src;
        lightbox?.classList.add("active");
      }
    });
  });

  lightboxClose?.addEventListener("click", () => {
    lightbox?.classList.remove("active");
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
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
  gsap.utils.toArray("section.my-gallery").forEach((section: any, index) => {
    const w = section.querySelector(".wrapper");
    const [x, xEnd] =
      index % 2
        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
        : [w.scrollWidth * -1, 0];
    gsap.fromTo(
      w,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  loadIntroPanel();
  loadTitle();
  smoothTitle();
  loadSecImg();
  loadSpinImg();
  loadGallery();
  initMusicPlayer();
  initParticles();
  initGallery();
});
