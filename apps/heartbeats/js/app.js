import { storage } from './storage.js';
import { CarouselManager } from './carousel.js';

const MAX_EVENTS = 10;
const MAX_PHOTOS_PER_EVENT = 10;

// Elementos del DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const eventTitleInput = document.getElementById('event-title');
const dateInput = document.getElementById('date-input');
const fileInput = document.getElementById('file-input');
const speedRange = document.getElementById('speed-range');
const speedVal = document.getElementById('speed-val');
const thumbContainer = document.getElementById('thumb-container');
const bgSlide = document.getElementById('bg-slide');
const floatingToggleBtn = document.getElementById('floating-toggle-btn');
const iconExpand = document.getElementById('icon-expand');
const iconCollapse = document.getElementById('icon-collapse');
const btnDoneSettings = document.getElementById('btn-done-settings');
const mainCard = document.getElementById('main-card');
const dragHandle = document.getElementById('drag-handle');
const colorPicker = document.getElementById('color-picker');
const colorDots = document.querySelectorAll('.color-dot');
const countdownTrigger = document.getElementById('countdown-trigger');
const eventsTabsContainer = document.getElementById('events-tabs');
const btnAddEvent = document.getElementById('btn-add-event');
const btnDeleteEvent = document.getElementById('btn-delete-event');
const eventBadge = document.getElementById('event-badge');
const photoCounter = document.getElementById('photo-counter');
const btnUploadLabel = document.getElementById('btn-upload-label');
const btnToggleSettings = document.getElementById('btn-toggle-settings');
const btnSettingsGear = document.getElementById('btn-settings-gear');

let carousel = null;
let events = [];
let activeEvent = null;

// Inicialización de la Aplicación
async function initApp() {
  carousel = new CarouselManager(bgSlide);

  // Registrar Service Worker v1.4.0 (PWA Offline)
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (err) {
      console.warn('Service Worker no registrado:', err);
    }
  }

  // Cargar eventos guardados de IndexedDB
  await loadAllEvents();

  // Iniciar ciclo de conteo regresivo
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Inicializar estado de minimizado / expandido
  initSettingsCollapse();

  // Listeners y Arrastre
  setupEventListeners();
  setupDraggableCard();
}

function initSettingsCollapse() {
  const saved = localStorage.getItem('settings_collapsed');
  // Si ya hay eventos guardados, iniciar minimizado para una vista limpia de carrusel; si no, expandido
  if (saved === 'true' || (saved === null && events.length > 0)) {
    collapseSettings();
  } else {
    expandSettings();
  }
}

function expandSettings() {
  mainCard.classList.remove('is-collapsed');
  localStorage.setItem('settings_collapsed', 'false');
  if (btnToggleSettings) {
    btnToggleSettings.querySelector('.toggle-label').innerText = 'Ocultar Ajustes';
  }
  if (btnSettingsGear) {
    btnSettingsGear.classList.add('is-active');
  }
  if (iconExpand && iconCollapse) {
    iconExpand.style.display = 'none';
    iconCollapse.style.display = 'block';
  }
  if (floatingToggleBtn) {
    floatingToggleBtn.title = 'Cerrar Ajustes y Minimizar';
  }
}

function collapseSettings() {
  mainCard.classList.add('is-collapsed');
  localStorage.setItem('settings_collapsed', 'true');
  if (btnToggleSettings) {
    btnToggleSettings.querySelector('.toggle-label').innerText = 'Personalizar Recordatorio';
  }
  if (btnSettingsGear) {
    btnSettingsGear.classList.remove('is-active');
  }
  if (iconExpand && iconCollapse) {
    iconExpand.style.display = 'block';
    iconCollapse.style.display = 'none';
  }
  if (floatingToggleBtn) {
    floatingToggleBtn.title = 'Ampliar / Abrir Ajustes';
  }
}

function toggleSettings() {
  if (mainCard.classList.contains('is-collapsed')) {
    expandSettings();
  } else {
    collapseSettings();
  }
}

// Carga todos los eventos o inicializa el primero por defecto
async function loadAllEvents() {
  events = await storage.getAllEvents();

  if (events.length === 0) {
    const defaultEvent = storage.createDefaultEvent();
    await storage.saveEvent(defaultEvent);
    events = [defaultEvent];
  }

  const savedActiveId = storage.getActiveEventId();
  activeEvent = events.find((e) => e.id === savedActiveId) || events[0];
  storage.setActiveEventId(activeEvent.id);

  renderEventsTabs();
  renderActiveEventUI();
}

// Renderiza las pestañas superiores de selección de evento con números compactos
function renderEventsTabs() {
  eventsTabsContainer.innerHTML = '';

  events.forEach((evt, idx) => {
    const tab = document.createElement('button');
    tab.className = `event-tab ${evt.id === activeEvent.id ? 'active' : ''}`;
    tab.innerText = String(idx + 1);
    tab.title = `${idx + 1}. ${evt.title || 'Recordatorio'}`;

    tab.addEventListener('click', () => {
      switchActiveEvent(evt.id);
    });

    eventsTabsContainer.appendChild(tab);
  });

  // Actualizar badges e interactividad del botón nuevo
  eventBadge.innerText = `${events.indexOf(activeEvent) + 1}/${events.length}`;
  btnAddEvent.disabled = events.length >= MAX_EVENTS;
  btnAddEvent.style.display = events.length >= MAX_EVENTS ? 'none' : 'flex';
  btnDeleteEvent.disabled = events.length <= 1;
}

// Cambia al evento seleccionado y refresca carrusel y UI al instante
function switchActiveEvent(eventId) {
  if (activeEvent && activeEvent.id === eventId) return;

  const found = events.find((e) => e.id === eventId);
  if (!found) return;

  activeEvent = found;
  storage.setActiveEventId(activeEvent.id);

  renderEventsTabs();
  renderActiveEventUI();
}

// Pasa al siguiente evento en la lista (rotación al tocar el contador)
function cycleNextEvent() {
  if (events.length <= 1) return;
  const currentIdx = events.findIndex((e) => e.id === activeEvent.id);
  const nextIdx = (currentIdx + 1) % events.length;
  switchActiveEvent(events[nextIdx].id);
}

// Refresca todos los elementos de la interfaz con los datos del evento activo
function renderActiveEventUI() {
  if (!activeEvent) return;

  eventTitleInput.value = activeEvent.title;
  dateInput.value = activeEvent.targetDate;
  speedRange.value = activeEvent.intervalSeconds || 4;
  speedVal.innerText = activeEvent.intervalSeconds || 4;
  carousel.setIntervalSeconds(activeEvent.intervalSeconds || 4);

  // Aplicar color temático
  applyColorTheme(activeEvent.accentColor || '#38bdf8', false);

  // Cargar fotos al carrusel
  const photos = activeEvent.photos || [];
  carousel.setPhotos(photos);
  renderThumbnails();

  // Actualizar posición si tiene una guardada
  if (activeEvent.position) {
    applyCardPosition(activeEvent.position.x, activeEvent.position.y);
  }

  updateCountdown();
}

function renderThumbnails() {
  thumbContainer.innerHTML = '';
  const photos = activeEvent.photos || [];

  photoCounter.innerText = `${photos.length}/${MAX_PHOTOS_PER_EVENT} fotos`;
  if (photos.length >= MAX_PHOTOS_PER_EVENT) {
    btnUploadLabel.classList.add('disabled');
    btnUploadLabel.innerText = 'Límite de 10 fotos alcanzado';
  } else {
    btnUploadLabel.classList.remove('disabled');
    btnUploadLabel.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      Agregar Fotos (Máx 10)
    `;
  }

  photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'thumbnail-card';
    card.innerHTML = `
      <img src="${photo.data}" alt="Foto" />
      <button class="btn-delete-photo" data-idx="${idx}">×</button>
    `;
    thumbContainer.appendChild(card);
  });

  thumbContainer.querySelectorAll('.btn-delete-photo').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.idx);
      activeEvent.photos.splice(idx, 1);
      await storage.saveEvent(activeEvent);
      carousel.setPhotos(activeEvent.photos);
      renderThumbnails();
    });
  });
}

// Cálculo del conteo regresivo para el evento activo
function updateCountdown() {
  if (!activeEvent || !activeEvent.targetDate) return;
  const now = new Date();
  const target = new Date(activeEvent.targetDate);
  const diff = target - now;

  if (diff <= 0) {
    daysEl.innerText = '00';
    hoursEl.innerText = '00';
    minutesEl.innerText = '00';
    secondsEl.innerText = '00';
    return;
  }

  daysEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  hoursEl.innerText = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  minutesEl.innerText = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  secondsEl.innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}

// Aplicar y persistir tema de color
function applyColorTheme(hexColor, save = true) {
  colorPicker.value = hexColor;
  document.documentElement.style.setProperty('--accent', hexColor);
  document.documentElement.style.setProperty('--accent-glow', `${hexColor}59`);

  if (activeEvent) {
    activeEvent.accentColor = hexColor;
    if (save) storage.saveEvent(activeEvent);
  }
}

// Guardar cambios en el evento activo
async function persistActiveEvent() {
  if (!activeEvent) return;
  activeEvent.title = eventTitleInput.value || 'Mi Recordatorio';
  activeEvent.targetDate = dateInput.value;
  activeEvent.intervalSeconds = parseInt(speedRange.value);
  activeEvent.position = getCardPosition();

  await storage.saveEvent(activeEvent);
  renderEventsTabs();
}

function getCardPosition() {
  const rect = mainCard.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
}

function applyCardPosition(x, y) {
  const maxW = window.innerWidth - mainCard.offsetWidth;
  const maxH = window.innerHeight - mainCard.offsetHeight;
  const boundedX = Math.max(6, Math.min(x, maxW - 6));
  const boundedY = Math.max(6, Math.min(y, maxH - 6));

  mainCard.style.top = `${boundedY}px`;
  mainCard.style.left = `${boundedX}px`;
  mainCard.style.transform = 'none';
}

function resetCardPosition() {
  mainCard.style.top = '50%';
  mainCard.style.left = '50%';
  mainCard.style.transform = 'translate(-50%, -50%)';
  if (activeEvent) {
    activeEvent.position = null;
    storage.saveEvent(activeEvent);
  }
}

// Configuración de Arrastre Libre
function setupDraggableCard() {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onPointerDown(clientX, clientY) {
    isDragging = true;
    const rect = mainCard.getBoundingClientRect();
    mainCard.style.transform = 'none';
    mainCard.style.left = `${rect.left}px`;
    mainCard.style.top = `${rect.top}px`;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    mainCard.style.transition = 'none';
    mainCard.classList.add('is-dragging');
  }

  function onPointerMove(clientX, clientY) {
    if (!isDragging) return;
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;

    const maxW = window.innerWidth - mainCard.offsetWidth;
    const maxH = window.innerHeight - mainCard.offsetHeight;
    const boundedX = Math.max(6, Math.min(newX, maxW - 6));
    const boundedY = Math.max(6, Math.min(newY, maxH - 6));

    mainCard.style.left = `${boundedX}px`;
    mainCard.style.top = `${boundedY}px`;
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    mainCard.classList.remove('is-dragging');
    mainCard.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    persistActiveEvent();
  }

  function isDraggableArea(target) {
    if (target.closest('input') || target.closest('button') || target.closest('.controls-section') || target.closest('.events-bar')) {
      return false;
    }
    return true;
  }

  // Mouse
  mainCard.addEventListener('mousedown', (e) => {
    if (isDraggableArea(e.target)) {
      e.preventDefault();
      onPointerDown(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mousemove', (e) => {
    onPointerMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onPointerUp);

  // Táctil (Móviles)
  mainCard.addEventListener('touchstart', (e) => {
    if (isDraggableArea(e.target)) {
      const touch = e.touches[0];
      onPointerDown(touch.clientX, touch.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      onPointerMove(touch.clientX, touch.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchend', onPointerUp);
}

function setupEventListeners() {
  // Crear nuevo evento (hasta 10)
  btnAddEvent.addEventListener('click', async () => {
    if (events.length >= MAX_EVENTS) return;
    const newId = `event_${Date.now()}`;
    const newEvent = storage.createDefaultEvent(newId, `Nuevo Recordatorio ${events.length + 1}`, '#fb7185');
    events.push(newEvent);
    await storage.saveEvent(newEvent);
    switchActiveEvent(newId);

    // Auto-expandir panel de ajustes para configurar este nuevo recordatorio
    expandSettings();

    // Enfocar y seleccionar el título para edición inmediata
    setTimeout(() => {
      eventTitleInput.focus();
      eventTitleInput.select();
    }, 150);
  });

  // Botón para alternar ajustes (Minimizar / Expandir)
  if (btnToggleSettings) {
    btnToggleSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  // Engranaje en la barra de recordatorios (Ajustes)
  if (btnSettingsGear) {
    btnSettingsGear.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  // Eliminar evento activo
  btnDeleteEvent.addEventListener('click', async () => {
    if (events.length <= 1) return;
    if (!confirm(`¿Eliminar "${activeEvent.title}" y su álbum de fotos?`)) return;

    await storage.deleteEvent(activeEvent.id);
    events = events.filter((e) => e.id !== activeEvent.id);
    activeEvent = events[0];
    storage.setActiveEventId(activeEvent.id);

    renderEventsTabs();
    renderActiveEventUI();
  });

  // Clic en la caja del contador rota al siguiente evento
  countdownTrigger.addEventListener('click', (e) => {
    if (!mainCard.classList.contains('is-dragging')) {
      cycleNextEvent();
    }
  });

  // Selector de color personalizado
  colorPicker.addEventListener('input', (e) => {
    applyColorTheme(e.target.value);
  });

  // Paleta de colores predefinidos
  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      applyColorTheme(dot.dataset.color);
    });
  });

  // Botón superior flotante único (Alternar Minimizar / Expandir)
  if (floatingToggleBtn) {
    floatingToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  // Botón "Listo (Cerrar Ajustes)" dentro del panel
  if (btnDoneSettings) {
    btnDoneSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      collapseSettings();
    });
  }

  // Edición de título y fecha
  eventTitleInput.addEventListener('input', persistActiveEvent);
  dateInput.addEventListener('change', () => {
    persistActiveEvent();
    updateCountdown();
  });

  // Velocidad del carrusel
  speedRange.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    speedVal.innerText = val;
    carousel.setIntervalSeconds(val);
    persistActiveEvent();
  });

  // Subida de múltiples fotos al evento activo (máx 10)
  fileInput.addEventListener('change', async (e) => {
    if (!activeEvent.photos) activeEvent.photos = [];
    const remainingSlots = MAX_PHOTOS_PER_EVENT - activeEvent.photos.length;
    if (remainingSlots <= 0) return;

    const files = Array.from(e.target.files).slice(0, remainingSlots);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        activeEvent.photos.push({
          id: Date.now() + Math.random(),
          data: event.target.result,
        });
        await storage.saveEvent(activeEvent);
        carousel.setPhotos(activeEvent.photos);
        renderThumbnails();
      };
      reader.readAsDataURL(file);
    }
    fileInput.value = '';
  });

  // Doble toque en el fondo para alternar modo Ambient
  let lastTap = 0;
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.main-card') || e.target.closest('.top-actions')) return;
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 350 && tapLength > 0) {
      document.body.classList.toggle('ambient-mode');
    }
    lastTap = currentTime;
  });
}

initApp();
