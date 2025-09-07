import "@/styles/main.scss";

import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Image loading tracker
class ImageLoadingTracker {
  private totalImages = 0;
  private loadedImages = 0;
  private loader: HTMLElement | null = null;
  private resolvePromise: (() => void) | null = null;
  private isLoaderHidden = false;

  constructor() {
    this.loader = $("#loader");
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
      
      // Get all images that need to be tracked
      const images = $$('img') as NodeListOf<HTMLImageElement>;
      const bgImages = $$('[data-bg]') as NodeListOf<HTMLElement>;
      
      this.totalImages = images.length + bgImages.length;
      
      if (this.totalImages === 0) {
        this.allImagesLoaded();
        return;
      }

      console.log(`Starting to load ${this.totalImages} images...`);

      // Track regular img elements
      images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
          this.imageLoaded();
        } else {
          img.addEventListener('load', () => this.imageLoaded());
          img.addEventListener('error', () => this.imageLoaded());
        }
      });

      // Track background images
      bgImages.forEach(element => {
        const bgUrl = element.getAttribute('data-bg');
        if (bgUrl) {
          const img = new Image();
          img.onload = () => {
            element.style.backgroundImage = `url(${bgUrl})`;
            this.imageLoaded();
          };
          img.onerror = () => this.imageLoaded();
          img.src = bgUrl;
        } else {
          this.imageLoaded();
        }
      });
    });
  }

  private imageLoaded() {
    this.loadedImages++;
    console.log(`Images loaded: ${this.loadedImages}/${this.totalImages}`);
    
    if (this.loadedImages >= this.totalImages) {
      this.allImagesLoaded();
    }
  }

  private allImagesLoaded() {
    console.log('All images loaded! Hiding loader and resolving promise...');
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      this.hideLoader();
      
      setTimeout(() => {
        if (this.resolvePromise) {
          this.resolvePromise();
        }
      }, 600); 
    }, 500);
  }

  private hideLoader() {
    if (this.isLoaderHidden) {
      console.log('Loader already hidden, skipping...');
      return;
    }
    
    this.isLoaderHidden = true;
    
    if (this.loader && this.loader.parentNode) {
      this.loader.classList.add('hidden');
      console.log('Loader hidden class added');
      
      // Remove from DOM after transition, but only if it's still in the DOM
      setTimeout(() => {
        if (this.loader && document.body.contains(this.loader)) {
          try {
            // Use remove() method which is safer than removeChild()
            this.loader.remove();
            console.log('Loader removed from DOM successfully');
            this.loader = null; // Clear reference
          } catch (error) {
            console.warn('Error removing loader from DOM:', error);
            // Fallback: try removeChild if remove() fails
            try {
              if (this.loader && this.loader.parentNode) {
                this.loader.parentNode.removeChild(this.loader);
                console.log('Loader removed using removeChild fallback');
                this.loader = null;
              }
            } catch (fallbackError) {
              console.error('Failed to remove loader with both methods:', fallbackError);
            }
          }
        }
      }, 500);
    }
  }
}

// Music Player
function initMusicPlayer() {
  const musicToggle = $("#musicToggle") as HTMLElement;
  const bgMusic = $("#bgMusic") as HTMLAudioElement;
  let isPlaying = musicToggle.classList.contains("playing");
  if (isPlaying) {
    bgMusic?.play();
  }

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
    // .from(
    //   ".hero__name",
    //   { opacity: 0, y: 50, duration: 1, stagger: 0.2 },
    //   "-=0.5"
    // )
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

  // Title animations
  const titles = $$(".hero__name");
  titles.forEach((title) => {
    const splitText = new SplitType(title as HTMLElement, { types: "chars" });

    gsap.from(splitText.chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 3,
      ease: "back.out(1.7)",
    });
  });
}

function loadIntroPanel() {
  gsap.to(".panel", {
    scaleY: 0,
    duration: 2,
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
      duration: 2,
      ease: "power4.inOut",
    })
    .to(
      ".hero__title",
      { scale: 1, duration: 0.95, ease: "power3.out" },
      "-=0.75"
    );
}

function loadSecImg() {
  const splitHeading = new SplitType(".heading", {
    types: "chars",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".sec-img",
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
      splitHeading.chars,
      {
        opacity: 0,
        x: -100,
        stagger: 0.015,
      },
      0
    )
    .from(
      ".text",
      {
        opacity: 0,
        x: 1000,
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

function loadWeddingCeremony() {
  const ceremonyTitle = new SplitType(".ceremony-title", {
    types: "chars",
  });

  // Title animation
  gsap.from(ceremonyTitle.chars, {
    opacity: 0,
    y: 100,
    stagger: 0.05,
    duration: 1.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".wedding-ceremony",
      start: "top 80%",
    },
  });

  // Card entrance animation
  gsap.from(".ceremony-card", {
    opacity: 0,
    scale: 0.8,
    y: 50,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".ceremony-card",
      start: "top 85%",
    },
  });

  // Parents info animation
  gsap.from(".parent-group", {
    opacity: 0,
    x: (index) => index % 2 === 0 ? -100 : 100,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".parents-info",
      start: "top 85%",
    },
  });

  // Announcement text animation
  gsap.from(".announcement-text", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".ceremony-announcement",
      start: "top 85%",
    },
  });

  // Couple names animation
  gsap.from(".name-script", {
    opacity: 0,
    scale: 0,
    rotation: 10,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".couple-names",
      start: "top 85%",
    },
  });

  gsap.from(".couple-divider", {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".couple-names",
      start: "top 85%",
    },
  });

  // Ceremony details animation
  gsap.from(".ceremony-details p", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".ceremony-details",
      start: "top 85%",
    },
  });

}

function loadEngagementCeremony() {
  const engagementTitle = new SplitType(".engagement-title", {
    types: "chars",
  });

  // Title animation
  gsap.from(engagementTitle.chars, {
    opacity: 0,
    y: 80,
    stagger: 0.04,
    duration: 1,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".engagement-ceremony",
      start: "top 80%",
    },
  });

  // Card entrance animation
  gsap.from(".engagement-card", {
    opacity: 0,
    scale: 0.9,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-card",
      start: "top 85%",
    },
  });

  // Header section animation
  gsap.from(".invitation-text", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-header",
      start: "top 85%",
    },
  });

  gsap.from(".dotted-line", {
    scaleX: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-header",
      start: "top 85%",
    },
  });

  gsap.from(".celebration-text", {
    opacity: 0,
    y: 15,
    duration: 0.6,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-header",
      start: "top 85%",
    },
  });

  // Couple names animation
  gsap.from(".name-script-eng", {
    opacity: 0,
    scale: 0.5,
    rotation: -5,
    duration: 0.7,
    stagger: 0.15,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".engagement-couple",
      start: "top 85%",
    },
  });

  gsap.from(".couple-divider-eng", {
    opacity: 0,
    scale: 0,
    duration: 0.4,
    delay: 0.3,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".engagement-couple",
      start: "top 85%",
    },
  });

  // Timing section animation
  gsap.from(".engagement-timing p", {
    opacity: 0,
    y: 15,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-timing",
      start: "top 85%",
    },
  });

  // Venue information animation
  gsap.from(".engagement-venue p", {
    opacity: 0,
    x: (index) => index === 0 ? 0 : (index % 2 === 1 ? -30 : 30),
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".engagement-venue",
      start: "top 85%",
    },
  });

  // Family info animation
  gsap.from(".family-group", {
    opacity: 0,
    y: 20,
    x: (index) => index % 2 === 0 ? -50 : 50,
    duration: 0.7,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".family-info-eng",
      start: "top 85%",
    },
  });

  // Subtle hover effect for the card
  gsap.set(".engagement-card", {
    transformOrigin: "center center"
  });
}

// QR Download Functionality
function initQRDownload() {
  const downloadButtons = $$('.download-btn') as NodeListOf<HTMLButtonElement>;
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const qrImagePath = button.getAttribute('data-qr');
      const fileName = button.getAttribute('data-name') || 'QR_Code';
      
      if (!qrImagePath) {
        console.error('QR image path not found');
        return;
      }
      
      try {
        // Show loading state
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Đang tải...</span>';
        button.disabled = true;
        
        console.log(`Starting download for: ${fileName} from ${qrImagePath}`);
        
        // Fetch the image
        const response = await fetch(qrImagePath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        
        // Enhanced download for better local support
        try {
          if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
            // For IE/Edge legacy support
            (window.navigator as any).msSaveOrOpenBlob(blob, `${fileName}.jpg`);
          } else {
            // Modern browsers
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.jpg`;
            link.style.display = 'none';
            
            // Force download attributes for better compatibility
            link.setAttribute('download', `${fileName}.jpg`);
            link.setAttribute('target', '_blank');
            
            // Trigger download
            document.body.appendChild(link);
            
            // Use both click and dispatchEvent for maximum compatibility
            if (link.click) {
              link.click();
            } else {
              // Fallback for older browsers
              const event = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });
              link.dispatchEvent(event);
            }
            
            // Cleanup with delay to ensure download starts
            setTimeout(() => {
              if (document.body.contains(link)) {
                document.body.removeChild(link);
              }
              window.URL.revokeObjectURL(url);
            }, 100);
          }
        } catch (downloadError) {
          // Ultimate fallback: open in new tab for manual save
          console.warn('Direct download failed, opening in new tab:', downloadError);
          const url = window.URL.createObjectURL(blob);
          const newTab = window.open(url, '_blank');
          if (newTab) {
            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
          } else {
            throw new Error('Unable to download or open image');
          }
        }
        
        // Show success state briefly
        button.innerHTML = '<i class="fas fa-check"></i><span>Đã tải!</span>';
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.disabled = false;
        }, 2000);
        
      } catch (error) {
        console.error('Download failed:', error);
        
        // Show error state
        button.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Lỗi!</span>';
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-download"></i><span>Tải QR</span>';
          button.disabled = false;
        }, 2000);
      }
    });
  });
}


// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  console.log('DOM loaded, starting image loading...');
  
  // Initialize image loading tracker first and wait for all images to load
  const imageTracker = new ImageLoadingTracker();
  
  try {
    await imageTracker.init();
    console.log('All images loaded! Starting to initialize other components...');
    
    // Initialize all other components after images are loaded
    initAnimations();
    loadIntroPanel();
    loadTitle();
    loadSecImg();
    loadWeddingCeremony();
    loadEngagementCeremony();
    initQRDownload();
    initMusicPlayer();
    initParticles();
    
    console.log('All components initialized successfully!');
  } catch (error) {
    console.error('Error during image loading:', error);
    
    // Fallback: initialize components anyway if there's an error
    initAnimations();
    loadIntroPanel();
    loadTitle();
    loadSecImg();
    loadWeddingCeremony();
    loadEngagementCeremony();
    initQRDownload();
    initMusicPlayer();
    initParticles();
  }
});
