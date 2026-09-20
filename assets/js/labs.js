/**
 * Labs & Drops Universe — Interactive Controller
 * Handles filter tabs, device simulator modal, live carousels,
 * and dynamic heartbeat counters.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFilterTabs();
  initSimulatorModal();
  initSimulatorEngine();
});

/* ==========================================================================
   1. CATEGORY FILTER TABS
   ========================================================================== */
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".drop-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-filter");

      cards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   2. SIMULATOR MODAL (HEARTBEATS MEMORIES)
   ========================================================================== */
function initSimulatorModal() {
  const modal = document.getElementById("simulator-modal");
  const openButtons = document.querySelectorAll(".btn-open-simulator");
  const closeButton = document.getElementById("btn-close-modal");
  const deviceButtons = document.querySelectorAll(".btn-device");
  const stage = document.getElementById("simulator-stage");

  if (!modal) return;

  // Open Modal
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close Modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Device Switcher (Desktop vs Mobile)
  deviceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      deviceButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetDevice = btn.getAttribute("data-device");
      if (targetDevice === "mobile") {
        stage.classList.add("mode-mobile");
      } else {
        stage.classList.remove("mode-mobile");
      }
    });
  });

  // Interactive Color Palette Picker
  const paletteDots = document.querySelectorAll(".palette-dot");
  const floatingCard = document.getElementById("sim-card");
  const digits = document.querySelectorAll(".sim-digit");

  paletteDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      paletteDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      const color = dot.getAttribute("data-color");
      if (floatingCard) {
        floatingCard.style.borderColor = color;
        floatingCard.style.boxShadow = `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${color}33`;
      }
      digits.forEach((digit) => {
        digit.style.color = color;
      });
    });
  });
}

/* ==========================================================================
   3. SIMULATOR CAROUSEL & REAL-TIME CLOCK ENGINE
   ========================================================================== */
function initSimulatorEngine() {
  const layer = document.getElementById("sim-slideshow");
  if (!layer) return;

  // Atmospheric royalty-free curated moments (high-res Unsplash landscape/milestones)
  const slides = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80", // Sunlit canopy & romance
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // Yosemite lake at twilight
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80", // Golden hour celebration
    "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=80"  // Serene horizon & stars
  ];

  let currentSlide = 0;
  layer.style.backgroundImage = `url('${slides[0]}')`;

  // Rotate photo every 3.5s with subtle Ken Burns effect
  setInterval(() => {
    layer.classList.toggle("ken-burns");
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Crossfade via preloaded image
    const nextImg = new Image();
    nextImg.src = slides[currentSlide];
    nextImg.onload = () => {
      layer.style.backgroundImage = `url('${slides[currentSlide]}')`;
    };
  }, 3500);

  // Live countdown clock & heartbeats simulation
  const daysEl = document.getElementById("sim-days");
  const hoursEl = document.getElementById("sim-hours");
  const minsEl = document.getElementById("sim-mins");
  const secsEl = document.getElementById("sim-secs");
  const heartbeatsEl = document.getElementById("sim-heartbeats");

  // Simulated target: 365 days milestone
  let totalSeconds = 31536000 + 43200 + 1800; // Base count
  let heartbeats = 36829440;

  setInterval(() => {
    totalSeconds--;
    heartbeats += Math.floor(Math.random() * 2) + 1;

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days).padStart(3, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(mins).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(secs).padStart(2, "0");

    if (heartbeatsEl) {
      heartbeatsEl.textContent = heartbeats.toLocaleString();
    }
  }, 1000);
}
