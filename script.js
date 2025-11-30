// script.js - Typing, reveal, progress, tilt, modal, preloader, theme

document.addEventListener("DOMContentLoaded", () => {
  /* ========== FEATHER ICONS ========== */
  if (window.feather) feather.replace();

  /* ========== SHOW YEAR ========== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ========== PRELOADER ========== */
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      preloader.setAttribute("aria-hidden", "true");
      const page = document.querySelector(".page");
      if (page) page.setAttribute("aria-hidden", "false");
      setTimeout(() => preloader.remove(), 450);
    }
  }, 700);

  /* ========== THEME TOGGLE (if any) ========== */
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const dark = document.body.classList.toggle("dark");
      themeBtn.setAttribute("aria-pressed", String(dark));
    });
  }

  /* ========== TYPING ANIMATION ========== */
  const typingEl = document.querySelector(".typing-animation");
  const words = [
    "React Native Developer",
    "Mobile App Developer",
    "JavaScript Developer",
    "Backend Learner",
  ];

  let wIndex = 0,
    cIndex = 0;
  const typingSpeed = 90,
    eraseSpeed = 50,
    delayBetween = 1400;

  function type() {
    if (!typingEl) return;
    const word = words[wIndex];
    if (cIndex < word.length) {
      typingEl.textContent += word.charAt(cIndex);
      cIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetween);
    }
  }

  function erase() {
    if (!typingEl) return;
    if (cIndex > 0) {
      typingEl.textContent = typingEl.textContent.slice(0, -1);
      cIndex--;
      setTimeout(erase, eraseSpeed);
    } else {
      wIndex = (wIndex + 1) % words.length;
      setTimeout(type, typingSpeed + 200);
    }
  }

  if (typingEl) type();

  /* ========== SCROLL REVEAL + PROGRESS ANIMATION ========== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Trigger progress bars inside reveal section
          const bars = entry.target.querySelectorAll(".progress-done");
          bars.forEach((bar) => {
            const value = bar.getAttribute("data-done") || "0";
            bar.style.width = value + "%";
            bar.style.opacity = 1;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ========== PROJECT CARD TILT EFFECT ========== */
  const tiltCards = document.querySelectorAll(".tilt");
  tiltCards.forEach((card) => {
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    card.addEventListener("focusin", () => {
      card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("focusout", () => {
      card.style.transform = "";
    });
  });

  /* ========== RESUME MODAL ========== */
  const resumeModal = document.getElementById("resumeModal");
  const openResume = document.getElementById("openResume");
  const closeResume = document.getElementById("closeResume");

  if (openResume) {
    openResume.addEventListener("click", () => {
      resumeModal?.setAttribute("aria-hidden", "false");
    });
  }
  if (closeResume) {
    closeResume.addEventListener("click", () => {
      resumeModal?.setAttribute("aria-hidden", "true");
    });
  }
  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal)
        resumeModal.setAttribute("aria-hidden", "true");
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal)
      resumeModal.setAttribute("aria-hidden", "true");
  });

  /* ========== REDUCE MOTION SUPPORT ========== */
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    document.querySelectorAll(".floating, .floating-slow").forEach((el) => {
      el.style.animation = "none";
    });
  }
});
