/**
 * Labs & Drops Universe — Interactive Controller
 * Handles filter tabs, device simulator modal, multi-event switcher (3 events x 3 photos),
 * live carousel synchronization across desktop/mobile, and dynamic heartbeat counters.
 */

document.addEventListener("DOMContentLoaded", () => {
  initFilterTabs();
  initSimulatorModal();
  initMultiEventSimulator();
  initCatalogModal();
  initCouponSystem();
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

  // Position Docking Picker (↖ Top-Left, ⊙ Center, ↘ Bottom-Right)
  const posButtons = document.querySelectorAll(".btn-pos");

  posButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      posButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const pos = btn.getAttribute("data-pos");
      floatingCards.forEach((card) => {
        card.style.left = "";
        card.style.top = "";
        card.style.right = "";
        card.style.bottom = "";
        card.style.transform = "";
        card.classList.remove("pos-center", "pos-top-left", "pos-bottom-right");
        card.classList.add(`pos-${pos}`);
      });
    });
  });

  // Selector de 10 Fuentes Emocionales
  const fontSelect = document.getElementById("sim-font-select");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      const font = e.target.value;
      floatingCards.forEach((card) => {
        card.style.fontFamily = `'${font}', sans-serif`;
      });
    });
  }

  // Regulador de Opacidad de Fondo
  const opacitySlider = document.getElementById("sim-opacity-slider");
  const opacityVal = document.getElementById("sim-opacity-val");
  if (opacitySlider && opacityVal) {
    opacitySlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      opacityVal.innerText = `${val}%`;
      floatingCards.forEach((card) => {
        card.style.backgroundColor = `rgba(15, 23, 42, ${val / 100})`;
        card.style.backdropFilter = `blur(${Math.max(2, (val / 100) * 22)}px)`;
      });
    });
  }

  // Regulador de Tamaño / Escala de Tarjeta
  const scaleSlider = document.getElementById("sim-scale-slider");
  const scaleVal = document.getElementById("sim-scale-val");
  if (scaleSlider && scaleVal) {
    scaleSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      scaleVal.innerText = `${val}%`;
      floatingCards.forEach((card) => {
        card.style.transform = `scale(${val / 100})`;
      });
    });
  }

  // Simulación de Reproductor de Audio Local
  const audioButtons = document.querySelectorAll(".sim-audio-btn");
  audioButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isPlaying = !btn.classList.contains("is-playing");
      audioButtons.forEach((b) => {
        if (isPlaying) {
          b.classList.add("is-playing");
          b.innerHTML = '<i class="fas fa-pause"></i> <span>Pausar</span>';
        } else {
          b.classList.remove("is-playing");
          b.innerHTML = '<i class="fas fa-music"></i> <span>Música</span>';
        }
      });
    });
  });

  // Drag to Reposition within Simulator Screen
  floatingCards.forEach((card) => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    function startDrag(e) {
      if (e.target.closest("button") || e.target.closest(".photo-dot")) return;

      const screen = card.closest(".simulator-screen");
      if (!screen) return;

      isDragging = true;
      card.classList.add("is-dragging");

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const cardRect = card.getBoundingClientRect();
      const screenRect = screen.getBoundingClientRect();

      card.classList.remove("pos-center", "pos-top-left", "pos-bottom-right");
      posButtons.forEach((b) => b.classList.remove("active"));

      initialLeft = cardRect.left - screenRect.left;
      initialTop = cardRect.top - screenRect.top;
      startX = clientX;
      startY = clientY;

      card.style.left = `${initialLeft}px`;
      card.style.top = `${initialTop}px`;
      card.style.right = "auto";
      card.style.bottom = "auto";
      card.style.transform = "none";

      window.addEventListener("mousemove", moveDrag);
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchmove", moveDrag, { passive: false });
      window.addEventListener("touchend", endDrag);
    }

    function moveDrag(e) {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();

      const screen = card.closest(".simulator-screen");
      if (!screen) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      const screenRect = screen.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      const maxLeft = screenRect.width - cardRect.width;
      const maxTop = screenRect.height - cardRect.height;

      newLeft = Math.max(6, Math.min(newLeft, maxLeft - 6));
      newTop = Math.max(6, Math.min(newTop, maxTop - 6));

      card.style.left = `${newLeft}px`;
      card.style.top = `${newTop}px`;
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove("is-dragging");

      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    }

    card.addEventListener("mousedown", startDrag);
    card.addEventListener("touchstart", startDrag, { passive: true });
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
      iconHtml: '<span class="sim-icon-container heart-container"><i class="fas fa-heart sim-event-icon icon-heart"></i></span>',
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
      iconHtml: '<span class="sim-icon-container plane-container"><i class="fas fa-plane sim-event-icon icon-plane"></i><span class="jet-contrail"><span class="contrail-puff p1"></span><span class="contrail-puff p2"></span><span class="contrail-puff p3"></span></span></span>',
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
      iconHtml: '<span class="sim-icon-container flag-container"><i class="fas fa-flag sim-event-icon icon-flag"></i></span>',
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
  const dynamicIconSlots = document.querySelectorAll(".sim-dynamic-icon-slot");
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

    // Update dynamic icon slots with active event icon animation
    dynamicIconSlots.forEach((slot) => {
      slot.innerHTML = currentEvent.iconHtml;
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

/* ==========================================================================
   4. CATALOG MODAL CONTROLLER (HEARTBEATS MEMORIES)
   ========================================================================== */
function initCatalogModal() {
  const catalogModal = document.getElementById("catalog-modal");
  const openCatalogBtn = document.getElementById("btn-open-catalog");
  const closeCatalogBtn = document.getElementById("btn-close-catalog");
  const openSimulatorFromCatalog = document.querySelector(".btn-open-simulator-from-catalog");
  const simulatorModal = document.getElementById("simulator-modal");

  if (!catalogModal) return;

  function openCatalog() {
    catalogModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCatalog() {
    catalogModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (openCatalogBtn) {
    openCatalogBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCatalog();
    });
  }

  if (closeCatalogBtn) {
    closeCatalogBtn.addEventListener("click", closeCatalog);
  }

  catalogModal.addEventListener("click", (e) => {
    if (e.target === catalogModal) {
      closeCatalog();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && catalogModal.classList.contains("active")) {
      closeCatalog();
    }
  });

  if (openSimulatorFromCatalog) {
    openSimulatorFromCatalog.addEventListener("click", () => {
      closeCatalog();
      if (simulatorModal) {
        simulatorModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  }
}

/* ==========================================================================
   5. COUPON & PROMOTION ENGINE (DROP 01) - SECURE BACKEND VALIDATION
   ========================================================================== */
const WEBPAY_URL_REGULAR = "https://www.webpay.cl/form-pay/422690";
const QR_SRC_REGULAR = "/assets/img/qr-webpay.png";
const APPS_SCRIPT_COUPON_API = "https://script.google.com/macros/s/AKfycbzhJ6Z69I0jHzSMs_tqIELb_OF7-bF0ignQS0T0bH0KpIqxmmvNblOCD2cLOmAqMxZ4VA/exec";

function initCouponSystem() {
  const toggleBtn = document.getElementById("coupon-toggle-btn");
  const couponBox = document.getElementById("coupon-box");
  const couponInput = document.getElementById("coupon-input");
  const applyBtn = document.getElementById("coupon-apply-btn");
  const feedbackEl = document.getElementById("coupon-feedback");
  const qrImage = document.getElementById("d1-qr-image");
  
  const d1PriceAmount = document.getElementById("d1-price-amount");
  const d1PriceUsd = document.getElementById("d1-price-usd");
  const d1PricePill = document.getElementById("d1-price-pill");

  const catalogPriceAmount = document.getElementById("catalog-price-amount");
  const catalogPriceUsd = document.getElementById("catalog-price-usd");
  const catalogPricePill = document.getElementById("catalog-price-pill");

  const catalogPriceAmountBottom = document.getElementById("catalog-price-amount-bottom");
  const catalogPriceUsdBottom = document.getElementById("catalog-price-usd-bottom");
  const catalogPricePillBottom = document.getElementById("catalog-price-pill-bottom");
  const catalogQrImage = document.getElementById("catalog-qr-image");

  let activeCouponData = null;

  function getCurrentLang() {
    return localStorage.getItem("mrclo_user_lang") || document.documentElement.lang || "es";
  }

  function getI18nText(key, defaultText) {
    const lang = getCurrentLang();
    if (window.translations && window.translations[lang] && window.translations[lang][key]) {
      return window.translations[lang][key];
    }
    return defaultText;
  }

  async function applyDiscount(couponCode) {
    const code = (couponCode || "").trim().toUpperCase();

    if (!code) {
      if (feedbackEl) {
        feedbackEl.className = "coupon-feedback error";
        feedbackEl.textContent = getI18nText("labs.d1.coupon_empty", "Por favor ingresa un código promocional.");
        feedbackEl.style.display = "block";
      }
      return false;
    }

    if (feedbackEl) {
      feedbackEl.className = "coupon-feedback";
      feedbackEl.textContent = getI18nText("labs.d1.coupon_validating", "Validando cupón con el servidor...");
      feedbackEl.style.display = "block";
    }
    if (applyBtn) applyBtn.disabled = true;

    try {
      const response = await fetch(`${APPS_SCRIPT_COUPON_API}?action=validate_coupon&code=${encodeURIComponent(code)}`);
      const data = await response.json();

      if (!data.valid) {
        removeDiscount(false);
        if (feedbackEl) {
          feedbackEl.className = "coupon-feedback error";
          if (data.reason === "EXPIRED") {
            feedbackEl.textContent = data.message || getI18nText("labs.d1.coupon_expired", "Este código promocional ha expirado.");
          } else {
            feedbackEl.textContent = data.message || getI18nText("labs.d1.coupon_invalid", "Cupón no válido o inexistente.");
          }
          feedbackEl.style.display = "block";
        }
        return false;
      }

      activeCouponData = data;
      try {
        sessionStorage.setItem("mrclo_coupon", code);
      } catch (e) {}

      renderDiscountUI(data);
      return true;
    } catch (errNet) {
      console.warn("Fallo al validar cupón con el servidor:", errNet);
      if (feedbackEl) {
        feedbackEl.className = "coupon-feedback error";
        feedbackEl.textContent = getI18nText("labs.d1.coupon_net_error", "No se pudo conectar con el servidor para validar el cupón.");
        feedbackEl.style.display = "block";
      }
      return false;
    } finally {
      if (applyBtn) applyBtn.disabled = false;
    }
  }

  function renderDiscountUI(data) {
    const lang = getCurrentLang();
    const usdText = lang === "es" ? data.promoUsdEs : data.promoUsdEn;
    const badgeText = getI18nText("labs.d1.price_badge_promo", "50% OFF Promoción (1 Dispositivo)");

    // Update Drop 01 Card (if elements present)
    if (d1PriceAmount) {
      d1PriceAmount.innerHTML = `<span class="price-original-strikethrough">${data.originalClp}</span>${data.promoClp}`;
    }
    if (d1PriceUsd) {
      d1PriceUsd.textContent = usdText;
    }
    if (d1PricePill) {
      d1PricePill.classList.add("promo-badge");
      d1PricePill.innerHTML = `<i class="fas fa-tag"></i> <span>${badgeText}</span>`;
    }

    // Update Catalog Modal (Top)
    if (catalogPriceAmount) {
      catalogPriceAmount.innerHTML = `<span class="price-original-strikethrough">${data.originalClp}</span>${data.promoClp}`;
    }
    if (catalogPriceUsd) {
      catalogPriceUsd.textContent = usdText;
    }
    if (catalogPricePill) {
      catalogPricePill.classList.add("promo-badge");
      catalogPricePill.innerHTML = `<i class="fas fa-tag"></i> <span>${badgeText}</span>`;
    }

    // Update Catalog Modal (Bottom)
    if (catalogPriceAmountBottom) {
      catalogPriceAmountBottom.innerHTML = `<span class="price-original-strikethrough">${data.originalClp}</span>${data.promoClp}`;
    }
    if (catalogPriceUsdBottom) {
      catalogPriceUsdBottom.textContent = usdText;
    }
    if (catalogPricePillBottom) {
      catalogPricePillBottom.classList.add("promo-badge");
      catalogPricePillBottom.innerHTML = `<i class="fas fa-tag"></i> <span>${badgeText}</span>`;
    }

    // Update all Webpay Links to dynamic server promo URL
    if (data.webpayUrl) {
      document.querySelectorAll(".btn-buy-webpay").forEach(btn => {
        btn.setAttribute("href", data.webpayUrl);
      });
    }

    // Update Desktop QR image to server promo QR
    if (data.qrSrc) {
      if (qrImage) qrImage.src = data.qrSrc;
      if (catalogQrImage) catalogQrImage.src = data.qrSrc;
    }

    // Show Feedback with Remove button
    if (feedbackEl) {
      feedbackEl.className = "coupon-feedback success";
      const appliedMsg = getI18nText("labs.d1.coupon_applied", `🎉 ¡Cupón aplicado! ${data.discountPercent}% de descuento (-$2.500 CLP)`);
      const removeMsg = getI18nText("labs.d1.coupon_remove", "Quitar");
      feedbackEl.innerHTML = `<span>${appliedMsg}</span> <button type="button" class="btn-remove-coupon" id="btn-remove-coupon">${removeMsg}</button>`;
      feedbackEl.style.display = "flex";

      const removeBtn = document.getElementById("btn-remove-coupon");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => removeDiscount(true));
      }
    }
  }

  function removeDiscount(clearInput = true) {
    activeCouponData = null;
    try {
      sessionStorage.removeItem("mrclo_coupon");
    } catch (e) {}

    const lang = getCurrentLang();
    const usdText = lang === "es" ? "(Aprox. 5 USD)" : "(Approx. $5 USD)";
    const regularBadgeText = getI18nText("labs.d1.price_badge", "Licencia de por vida (1 dispositivo)");

    // Restore Drop 01 Card
    if (d1PriceAmount) d1PriceAmount.textContent = "$5.000 CLP";
    if (d1PriceUsd) d1PriceUsd.textContent = usdText;
    if (d1PricePill) {
      d1PricePill.classList.remove("promo-badge");
      d1PricePill.innerHTML = `<i class="fas fa-infinity"></i> <span data-i18n="labs.d1.price_badge">${regularBadgeText}</span>`;
    }

    // Restore Catalog Modal (Top)
    if (catalogPriceAmount) catalogPriceAmount.textContent = "$5.000 CLP";
    if (catalogPriceUsd) catalogPriceUsd.textContent = usdText;
    if (catalogPricePill) {
      catalogPricePill.classList.remove("promo-badge");
      catalogPricePill.innerHTML = `<i class="fas fa-infinity"></i> <span data-i18n="catalog.lifetime_pill">${regularBadgeText}</span>`;
    }

    // Restore Catalog Modal (Bottom)
    if (catalogPriceAmountBottom) catalogPriceAmountBottom.textContent = "$5.000 CLP";
    if (catalogPriceUsdBottom) catalogPriceUsdBottom.textContent = usdText;
    if (catalogPricePillBottom) {
      catalogPricePillBottom.classList.remove("promo-badge");
      catalogPricePillBottom.innerHTML = `<i class="fas fa-infinity"></i> <span data-i18n="catalog.lifetime_pill">${regularBadgeText}</span>`;
    }

    // Restore all Webpay Links to Regular URL
    document.querySelectorAll(".btn-buy-webpay").forEach(btn => {
      btn.setAttribute("href", WEBPAY_URL_REGULAR);
    });

    // Restore Desktop QR image
    if (qrImage) qrImage.src = QR_SRC_REGULAR;
    if (catalogQrImage) catalogQrImage.src = QR_SRC_REGULAR;

    if (clearInput && couponInput) {
      couponInput.value = "";
    }
    if (feedbackEl) {
      feedbackEl.style.display = "none";
      feedbackEl.innerHTML = "";
    }
  }

  // Toggle button logic
  if (toggleBtn && couponBox) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = couponBox.style.display !== "none";
      couponBox.style.display = isOpen ? "none" : "block";
      toggleBtn.classList.toggle("open", !isOpen);
      toggleBtn.setAttribute("aria-expanded", String(!isOpen));
      if (!isOpen && couponInput) {
        setTimeout(() => couponInput.focus(), 50);
      }
    });
  }

  // Apply button click & force uppercase input
  if (couponInput) {
    couponInput.addEventListener("input", () => {
      couponInput.value = couponInput.value.toUpperCase();
    });
  }

  if (applyBtn && couponInput) {
    applyBtn.addEventListener("click", () => {
      applyDiscount(couponInput.value);
    });

    couponInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyDiscount(couponInput.value);
      }
    });
  }

  // Re-render strings when language changes
  window.addEventListener("languageChanged", () => {
    if (activeCouponData) {
      renderDiscountUI(activeCouponData);
    }
  });

  // Check URL parameter & Session Storage
  const urlParams = new URLSearchParams(window.location.search);
  const couponParam = urlParams.get("coupon") || urlParams.get("cupon") || urlParams.get("promo");

  let storedCoupon = null;
  try {
    storedCoupon = sessionStorage.getItem("mrclo_coupon");
  } catch (e) {}

  const couponToApply = couponParam || storedCoupon;
  if (couponToApply) {
    if (couponInput) {
      couponInput.value = couponToApply.trim().toUpperCase();
    }
    if (couponBox) {
      couponBox.style.display = "block";
      if (toggleBtn) {
        toggleBtn.classList.add("open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    }
    applyDiscount(couponToApply);
  }
}


