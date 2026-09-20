/**
 * Labs & Drops Universe — Interactive Controller
 * Handles filter tabs, device simulator modal, multi-event switcher (3 events x 3 photos),
 * live carousel synchronization across desktop/mobile, and dynamic heartbeat counters.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFilterTabs();
  initSimulatorModal();
  initMultiEventSimulator();
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
  const floatingCards = document.querySelectorAll(".sim-floating-card");
  const digits = document.querySelectorAll(".sim-digit");

  paletteDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      paletteDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      const color = dot.getAttribute("data-color");
      floatingCards.forEach((card) => {
        card.style.borderColor = color;
        card.style.boxShadow = `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${color}33`;
      });
      digits.forEach((digit) => {
        digit.style.color = color;
      });
    });
  });
}

/* ==========================================================================
   3. MULTI-EVENT SIMULATOR ENGINE (3 Events x 3 Photos Each)
   ========================================================================== */
function initMultiEventSimulator() {
  const slideshowLayers = document.querySelectorAll(".sim-slideshow-layer");
  if (!slideshowLayers.length) return;

  // 3 Curated Events with 3 High-Resolution Atmospheric Photos Each
  const events = [
    {
      id: "anniversary",
      titleEs: "Aniversario Especial",
      titleEn: "Special Anniversary",
      baseSeconds: 31536000 + 43200 + 1800, // ~365 days
      baseBeats: 36829440,
      photos: [
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80", // Sunlit canopy & romantic walkway
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80", // Intertwined hands & rings at sunset
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"  // Intimate warm moments under fairy lights
      ]
    },
    {
      id: "travel",
      titleEs: "Viaje Soñado a la Patagonia",
      titleEn: "Dream Trip to Patagonia",
      baseSeconds: 7344000 + 21600, // ~85 days
      baseBeats: 8812800,
      photos: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // Alpine lake & dramatic twilight peaks
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80", // Scenic endless road trip exploration
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"  // Serene pristine ocean shores
      ]
    },
    {
      id: "milestone",
      titleEs: "Graduación & Hito de Vida",
      titleEn: "Graduation & Life Milestone",
      baseSeconds: 18144000 + 7200, // ~210 days
      baseBeats: 21772800,
      photos: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80", // Golden milestone toast & celebration
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", // Shared triumph & team achievement
        "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=1200&q=80"  // Mountain horizon gazing into the stars
      ]
    }
  ];

  let currentEventIndex = 0;
  let currentPhotoIndex = 0;
  let autoSlideTimer = null;

  // DOM elements for titles, countdowns, and indicators
  const eventTitles = document.querySelectorAll(".sim-event-title");
  const eventTabs = document.querySelectorAll(".sim-event-tab");
  const photoDots = document.querySelectorAll(".photo-dot");
  const photoCounters = document.querySelectorAll(".photo-counter-text");

  const daysElements = document.querySelectorAll(".sim-days");
  const hoursElements = document.querySelectorAll(".sim-hours");
  const minsElements = document.querySelectorAll(".sim-mins");
  const secsElements = document.querySelectorAll(".sim-secs");
  const heartbeatsElements = document.querySelectorAll(".sim-heartbeats");

  let activeSeconds = events[0].baseSeconds;
  let activeBeats = events[0].baseBeats;

  // Render active photo to ALL slideshow layers (desktop AND mobile)
  function renderActivePhoto() {
    const currentEvent = events[currentEventIndex];
    const photoUrl = currentEvent.photos[currentPhotoIndex];

    slideshowLayers.forEach((layer) => {
      layer.classList.toggle("ken-burns");
      layer.style.backgroundImage = `url('${photoUrl}')`;
    });

    // Update photo indicator dots
    photoDots.forEach((dot) => {
      const idx = parseInt(dot.getAttribute("data-photo"), 10);
      if (idx === currentPhotoIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Update photo label text
    const lang = document.documentElement.lang || "es";
    photoCounters.forEach((lbl) => {
      if (lang === "en") {
        lbl.textContent = `Photo ${currentPhotoIndex + 1} of 3`;
      } else {
        lbl.textContent = `Foto ${currentPhotoIndex + 1} de 3`;
      }
    });
  }

  // Switch to a new event
  function selectEvent(eventIdx) {
    currentEventIndex = eventIdx;
    currentPhotoIndex = 0;

    const currentEvent = events[currentEventIndex];
    activeSeconds = currentEvent.baseSeconds;
    activeBeats = currentEvent.baseBeats;

    // Update tab active classes
    eventTabs.forEach((tab) => {
      if (parseInt(tab.getAttribute("data-event-idx"), 10) === currentEventIndex) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    // Update titles in both desktop and mobile
    const lang = document.documentElement.lang || "es";
    eventTitles.forEach((el) => {
      el.textContent = lang === "en" ? currentEvent.titleEn : currentEvent.titleEs;
    });

    renderActivePhoto();
    resetCarouselTimer();
  }

  // Auto-carousel timer
  function resetCarouselTimer() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      const currentEvent = events[currentEventIndex];
      currentPhotoIndex = (currentPhotoIndex + 1) % currentEvent.photos.length;
      renderActivePhoto();
    }, 3200);
  }

  // Event Tabs Click Listeners
  eventTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.getAttribute("data-event-idx"), 10);
      selectEvent(idx);
    });
  });

  // Photo Dots Click Listeners
  photoDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const pIdx = parseInt(dot.getAttribute("data-photo"), 10);
      currentPhotoIndex = pIdx;
      renderActivePhoto();
      resetCarouselTimer();
    });
  });

  // Initial render
  selectEvent(0);

  // Live ticking clock & heartbeats simulation
  setInterval(() => {
    activeSeconds--;
    activeBeats += Math.floor(Math.random() * 2) + 1;

    const days = Math.floor(activeSeconds / 86400);
    const hours = Math.floor((activeSeconds % 86400) / 3600);
    const mins = Math.floor((activeSeconds % 3600) / 60);
    const secs = activeSeconds % 60;

    const daysStr = String(days).padStart(3, "0");
    const hoursStr = String(hours).padStart(2, "0");
    const minsStr = String(mins).padStart(2, "0");
    const secsStr = String(secs).padStart(2, "0");
    const beatsStr = activeBeats.toLocaleString();

    daysElements.forEach((el) => (el.textContent = daysStr));
    hoursElements.forEach((el) => (el.textContent = hoursStr));
    minsElements.forEach((el) => (el.textContent = minsStr));
    secsElements.forEach((el) => (el.textContent = secsStr));
    heartbeatsElements.forEach((el) => (el.textContent = beatsStr));
  }, 1000);
}
