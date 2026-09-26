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
const btnSettingsGear = document.getElementById('btn-settings-gear');
const fontFamilySelect = document.getElementById('font-family-select');
const cardOpacitySlider = document.getElementById('card-opacity-slider');
const cardOpacityVal = document.getElementById('card-opacity-val');
const cardScaleSlider = document.getElementById('card-scale-slider');
const cardScaleVal = document.getElementById('card-scale-val');
const alarmsContainer = document.getElementById('alarms-container');
const alarmsBadge = document.getElementById('alarms-badge');
const audioFileInput = document.getElementById('audio-file-input');
const audioUploadBox = document.getElementById('audio-upload-box');
const audioPlayerCard = document.getElementById('audio-player-card');
const audioFilename = document.getElementById('audio-filename');
const btnDeleteAudio = document.getElementById('btn-delete-audio');
const btnAudioPlay = document.getElementById('btn-audio-play');
const audioVolumeSlider = document.getElementById('audio-volume-slider');
const audioAutoplayCheck = document.getElementById('audio-autoplay-check');
const audioBadge = document.getElementById('audio-badge');
const btnMiniAudio = document.getElementById('btn-mini-audio');
const activeAlarmBanner = document.getElementById('active-alarm-banner');
const alarmBannerText = document.getElementById('alarm-banner-text');

let carousel = null;
let events = [];
let activeEvent = null;
let savedMinimizedPosition = null;
const currentAudio = new Audio();
currentAudio.loop = true;

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

  // Listeners, Arrastre y Redimensionamiento
  setupEventListeners();
  setupDraggableCard();
  setupResizeHandle();

  window.addEventListener('resize', () => {
    if (activeEvent) {
      applyCardScale(activeEvent.scale || 100, false);
    }
  });
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

  // Guardar posición personalizada previa para no perderla
  if (mainCard.style.top && mainCard.style.top !== '50%') {
    savedMinimizedPosition = {
      top: mainCard.style.top,
      left: mainCard.style.left,
      transform: mainCard.style.transform
    };
  }

  // Auto-centrar en pantalla para garantizar que todos los controles sean visibles y no queden cortados
  mainCard.style.top = '50%';
  mainCard.style.left = '50%';
  mainCard.style.transform = 'translate(-50%, -50%) scale(var(--card-scale, 1.0))';

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

  // Restaurar la posición de la esquina elegida por el usuario
  if (savedMinimizedPosition && savedMinimizedPosition.top && savedMinimizedPosition.left) {
    mainCard.style.top = savedMinimizedPosition.top;
    mainCard.style.left = savedMinimizedPosition.left;
    mainCard.style.transform = savedMinimizedPosition.transform || 'scale(var(--card-scale, 1.0))';
  } else if (activeEvent && activeEvent.position) {
    applyCardPosition(activeEvent.position.x, activeEvent.position.y);
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

  const urlParams = new URLSearchParams(window.location.search);
  const forceNellyDemo = urlParams.get('demo') === 'nelly' || urlParams.get('demo') === 'aniversario';
  const isGenericEmpty = events.length === 1 && events[0].title === 'Mi Primer Recuerdo' && (!events[0].photos || events[0].photos.length === 0);

  if (events.length === 0 || forceNellyDemo || isGenericEmpty) {
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

// Renderiza las pestañas superiores de selección de evento con números compactos y mnemotecnia de color
function renderEventsTabs() {
  eventsTabsContainer.innerHTML = '';

  events.forEach((evt, idx) => {
    const tab = document.createElement('button');
    const isActive = evt.id === activeEvent.id;
    const evtColor = evt.accentColor || '#38bdf8';

    tab.className = `event-tab ${isActive ? 'active' : ''}`;
    tab.innerText = String(idx + 1);
    tab.title = `${idx + 1}. ${evt.title || 'Recordatorio'}`;

    if (isActive) {
      tab.style.backgroundColor = evtColor;
      tab.style.borderColor = evtColor;
      tab.style.color = '#0b0f19';
      tab.style.boxShadow = `0 0 14px ${evtColor}99`;
      tab.style.transform = 'scale(1.12)';
      tab.style.fontWeight = '800';
    } else {
      // Píldora inactiva: conserva su color individual con fondo translúcido y borde/número nítido
      tab.style.backgroundColor = 'rgba(15, 23, 42, 0.82)';
      tab.style.borderColor = `${evtColor}aa`;
      tab.style.color = evtColor;
      tab.style.boxShadow = `0 0 6px ${evtColor}44`;
      tab.style.transform = 'scale(1.0)';
      tab.style.fontWeight = '700';
    }

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

  if (currentAudio) {
    currentAudio.pause();
    updatePlayButtonUI(false);
  }

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

  // Aplicar tipografía emocional
  applyFontFamily(activeEvent.fontFamily || 'Montserrat', false);

  // Aplicar opacidad del recuadro
  applyCardOpacity(activeEvent.bgOpacity !== undefined ? activeEvent.bgOpacity : 65, false);

  // Aplicar tamaño / escala del recuadro
  applyCardScale(activeEvent.scale !== undefined ? activeEvent.scale : 100, false);

  // Cargar fotos al carrusel
  const photos = activeEvent.photos || [];
  carousel.setPhotos(photos);
  renderThumbnails();

  // Renderizar las 3 alarmas hacia atrás y audio local
  renderAlarmsUI();
  renderAudioUI();

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
  } else {
    daysEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    hoursEl.innerText = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    minutesEl.innerText = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    secondsEl.innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  }

  updateAlarmsStatus();
}

// --- GESTIÓN DE LAS 3 ALARMAS HACIA ATRÁS ---
function renderAlarmsUI() {
  if (!alarmsContainer || !activeEvent) return;
  alarmsContainer.innerHTML = '';

  if (!activeEvent.alarms || !Array.isArray(activeEvent.alarms)) {
    activeEvent.alarms = [
      { id: 1, enabled: true, value: 7, unit: 'days' },
      { id: 2, enabled: true, value: 1, unit: 'days' },
      { id: 3, enabled: false, value: 1, unit: 'hours' }
    ];
  }

  while (activeEvent.alarms.length < 3) {
    activeEvent.alarms.push({
      id: activeEvent.alarms.length + 1,
      enabled: false,
      value: 1,
      unit: 'days'
    });
  }

  activeEvent.alarms.forEach((alarm, idx) => {
    const card = document.createElement('div');
    card.className = `alarm-card ${alarm.enabled ? 'is-enabled' : ''}`;
    card.id = `alarm-card-${idx}`;
    card.innerHTML = `
      <div class="alarm-row-top">
        <label class="alarm-check-label">
          <input type="checkbox" class="alarm-toggle" data-idx="${idx}" ${alarm.enabled ? 'checked' : ''} />
          <span>Aviso previo ${idx + 1}</span>
        </label>
        <span class="alarm-status-pill status-disabled" id="alarm-status-${idx}">Inactiva</span>
      </div>
      <div class="alarm-row-inputs">
        <input type="number" class="alarm-val-input alarm-number-input" data-idx="${idx}" min="1" max="999" value="${alarm.value || 1}" ${!alarm.enabled ? 'disabled' : ''} />
        <select class="alarm-unit-select" data-idx="${idx}" ${!alarm.enabled ? 'disabled' : ''}>
          <option value="days" ${alarm.unit === 'days' ? 'selected' : ''}>Días antes</option>
          <option value="hours" ${alarm.unit === 'hours' ? 'selected' : ''}>Horas antes</option>
          <option value="minutes" ${alarm.unit === 'minutes' ? 'selected' : ''}>Minutos antes</option>
          <option value="weeks" ${alarm.unit === 'weeks' ? 'selected' : ''}>Semanas antes</option>
          <option value="months" ${alarm.unit === 'months' ? 'selected' : ''}>Meses antes</option>
        </select>
      </div>
    `;
    alarmsContainer.appendChild(card);
  });

  alarmsContainer.querySelectorAll('.alarm-toggle').forEach((toggle) => {
    toggle.addEventListener('change', async (e) => {
      const idx = Number(e.target.dataset.idx);
      activeEvent.alarms[idx].enabled = e.target.checked;
      await storage.saveEvent(activeEvent);
      renderAlarmsUI();
      updateCountdown();
    });
  });

  alarmsContainer.querySelectorAll('.alarm-number-input').forEach((input) => {
    input.addEventListener('change', async (e) => {
      const idx = Number(e.target.dataset.idx);
      activeEvent.alarms[idx].value = Math.max(1, parseInt(e.target.value, 10) || 1);
      await storage.saveEvent(activeEvent);
      updateCountdown();
    });
  });

  alarmsContainer.querySelectorAll('.alarm-unit-select').forEach((select) => {
    select.addEventListener('change', async (e) => {
      const idx = Number(e.target.dataset.idx);
      activeEvent.alarms[idx].unit = e.target.value;
      await storage.saveEvent(activeEvent);
      updateCountdown();
    });
  });

  updateAlarmsStatus();
}

function getAlarmOffsetMs(alarm) {
  const val = Number(alarm.value) || 1;
  switch (alarm.unit) {
    case 'months':
      return val * 30 * 24 * 60 * 60 * 1000;
    case 'weeks':
      return val * 7 * 24 * 60 * 60 * 1000;
    case 'hours':
      return val * 60 * 60 * 1000;
    case 'minutes':
      return val * 60 * 1000;
    case 'days':
    default:
      return val * 24 * 60 * 60 * 1000;
  }
}

function updateAlarmsStatus() {
  if (!activeEvent || !activeEvent.alarms || !activeEvent.targetDate) return;
  const now = new Date().getTime();
  const target = new Date(activeEvent.targetDate).getTime();
  const diff = target - now;

  let activeCount = 0;
  let triggeredAlarm = null;

  activeEvent.alarms.forEach((alarm, idx) => {
    const pill = document.getElementById(`alarm-status-${idx}`);
    const card = document.getElementById(`alarm-card-${idx}`);
    if (!pill) return;

    if (!alarm.enabled) {
      pill.innerText = 'Inactiva';
      pill.className = 'alarm-status-pill status-disabled';
      if (card) card.classList.remove('is-triggered');
      return;
    }

    activeCount++;
    const offsetMs = getAlarmOffsetMs(alarm);

    if (diff <= 0) {
      pill.innerText = 'Cumplida';
      pill.className = 'alarm-status-pill status-past';
      if (card) card.classList.remove('is-triggered');
    } else if (diff <= offsetMs) {
      pill.innerText = '🔔 ¡Activa!';
      pill.className = 'alarm-status-pill status-active';
      if (card) card.classList.add('is-triggered');
      if (!triggeredAlarm || offsetMs < getAlarmOffsetMs(triggeredAlarm)) {
        triggeredAlarm = alarm;
      }
    } else {
      pill.innerText = '⏳ En espera';
      pill.className = 'alarm-status-pill status-pending';
      if (card) card.classList.remove('is-triggered');
    }
  });

  if (alarmsBadge) {
    alarmsBadge.innerText = `${activeCount}/3 activas`;
  }

  if (activeAlarmBanner && alarmBannerText) {
    if (triggeredAlarm && diff > 0) {
      activeAlarmBanner.style.display = 'flex';
      const unitNames = {
        days: 'días',
        hours: 'horas',
        minutes: 'minutos',
        weeks: 'semanas',
        months: 'meses'
      };
      const unitLabel = unitNames[triggeredAlarm.unit] || 'días';
      alarmBannerText.innerText = `¡Alarma previa! Faltan menos de ${triggeredAlarm.value} ${unitLabel}`;
    } else {
      activeAlarmBanner.style.display = 'none';
    }
  }
}

// --- GESTIÓN DE AUDIO LOCAL ---
function renderAudioUI() {
  if (!activeEvent) return;

  if (activeEvent.audio && activeEvent.audio.data) {
    if (audioUploadBox) audioUploadBox.style.display = 'none';
    if (audioPlayerCard) audioPlayerCard.style.display = 'block';
    if (audioFilename) {
      audioFilename.innerText = activeEvent.audio.name || 'Pista de audio';
      audioFilename.title = activeEvent.audio.name || 'Pista de audio';
    }
    if (audioVolumeSlider) {
      audioVolumeSlider.value = activeEvent.audio.volume !== undefined ? activeEvent.audio.volume : 80;
    }
    if (audioAutoplayCheck) {
      audioAutoplayCheck.checked = Boolean(activeEvent.audio.autoplay);
    }
    if (audioBadge) {
      audioBadge.innerText = 'Música lista';
    }
    if (btnMiniAudio) {
      btnMiniAudio.style.display = 'flex';
    }

    // Sincronizar fuente si cambió
    if (currentAudio.src !== activeEvent.audio.data) {
      currentAudio.pause();
      currentAudio.src = activeEvent.audio.data;
      currentAudio.volume = (activeEvent.audio.volume !== undefined ? activeEvent.audio.volume : 80) / 100;
      updatePlayButtonUI(false);

      if (activeEvent.audio.autoplay) {
        currentAudio.play().then(() => {
          updatePlayButtonUI(true);
        }).catch((err) => {
          console.log('Autoplay bloqueado por políticas de navegador:', err);
        });
      }
    }
  } else {
    if (audioUploadBox) audioUploadBox.style.display = 'block';
    if (audioPlayerCard) audioPlayerCard.style.display = 'none';
    if (audioBadge) audioBadge.innerText = 'Sin audio';
    if (btnMiniAudio) btnMiniAudio.style.display = 'none';

    if (!currentAudio.paused) {
      currentAudio.pause();
    }
    currentAudio.src = '';
    updatePlayButtonUI(false);
  }
}

function updatePlayButtonUI(isPlaying) {
  if (btnAudioPlay) {
    btnAudioPlay.innerText = isPlaying ? '⏸ Pausar' : '▶ Reproducir';
  }
  if (btnMiniAudio) {
    if (isPlaying) {
      btnMiniAudio.classList.add('is-playing');
      btnMiniAudio.title = 'Pausar música del recuerdo';
    } else {
      btnMiniAudio.classList.remove('is-playing');
      btnMiniAudio.title = 'Reproducir música del recuerdo';
    }
  }
}

function toggleAudioPlayback() {
  if (!currentAudio.src) return;
  if (currentAudio.paused) {
    currentAudio.play().then(() => {
      updatePlayButtonUI(true);
    }).catch(err => {
      console.warn('Error al reproducir audio:', err);
    });
  } else {
    currentAudio.pause();
    updatePlayButtonUI(false);
  }
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
  renderEventsTabs();
}

// Aplicar y persistir tipografía emocional
function applyFontFamily(fontName, save = true) {
  if (fontFamilySelect) fontFamilySelect.value = fontName;
  document.documentElement.style.setProperty('--memory-font', `'${fontName}', sans-serif`);

  if (activeEvent) {
    activeEvent.fontFamily = fontName;
    if (save) storage.saveEvent(activeEvent);
  }
}

// Aplicar y persistir opacidad del recuadro
function applyCardOpacity(opacityVal, save = true) {
  const num = parseInt(opacityVal, 10);
  if (cardOpacitySlider) cardOpacitySlider.value = num;
  if (cardOpacityVal) cardOpacityVal.innerText = `${num}%`;

  const decimal = (num / 100).toFixed(2);
  document.documentElement.style.setProperty('--card-opacity', decimal);

  if (activeEvent) {
    activeEvent.bgOpacity = num;
    if (save) storage.saveEvent(activeEvent);
  }
}

// Calcula el límite máximo de escala permitido para que la tarjeta NUNCA supere el tamaño de la ventana visible
function getMaxAllowedScale() {
  const cardRect = mainCard.getBoundingClientRect();
  const currentScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--card-scale')) || 1.0;
  const unscaledH = Math.max(220, (cardRect.height / currentScale) || 380);
  const unscaledW = Math.max(280, (cardRect.width / currentScale) || 380);

  // Permitir al menos 20px de margen vertical y horizontal respecto a la ventana
  const maxFactorH = (window.innerHeight - 20) / unscaledH;
  const maxFactorW = (window.innerWidth - 20) / unscaledW;
  const safeFactor = Math.min(maxFactorH, maxFactorW);

  // El tope absoluto es 115%, limitado estrictamente por lo que quepa en la pantalla actual
  return Math.min(115, Math.max(60, Math.floor(safeFactor * 100)));
}

// Aplicar y persistir tamaño / escala del recuadro (60% al máximo seguro de la ventana)
function applyCardScale(scaleVal, save = true) {
  const maxSafe = getMaxAllowedScale();
  const num = Math.min(maxSafe, Math.max(60, parseInt(scaleVal, 10) || 100));

  if (cardScaleSlider) {
    cardScaleSlider.max = String(maxSafe);
    cardScaleSlider.value = num;
  }
  if (cardScaleVal) {
    cardScaleVal.innerText = `${num}%`;
  }

  const scaleFactor = (num / 100).toFixed(2);
  document.documentElement.style.setProperty('--card-scale', scaleFactor);

  if (activeEvent) {
    activeEvent.scale = num;
    if (save) storage.saveEvent(activeEvent);
  }
}

// Guardar cambios en el evento activo
async function persistActiveEvent() {
  if (!activeEvent) return;
  activeEvent.title = eventTitleInput.value || 'Mi Primer Recuerdo';
  activeEvent.targetDate = dateInput.value;
  activeEvent.intervalSeconds = parseInt(speedRange.value);
  activeEvent.position = getCardPosition();
  if (fontFamilySelect) activeEvent.fontFamily = fontFamilySelect.value;
  if (cardOpacitySlider) activeEvent.bgOpacity = parseInt(cardOpacitySlider.value, 10);
  if (cardScaleSlider) activeEvent.scale = parseInt(cardScaleSlider.value, 10);

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
  mainCard.style.transform = 'scale(var(--card-scale, 1.0))';
}

function resetCardPosition() {
  mainCard.style.top = '50%';
  mainCard.style.left = '50%';
  mainCard.style.transform = 'translate(-50%, -50%) scale(var(--card-scale, 1.0))';
  if (activeEvent) {
    activeEvent.position = null;
    storage.saveEvent(activeEvent);
  }
}

// Configuración de Arrastre Libre y Escalado Táctil (Pinch-to-scale)
function setupDraggableCard() {
  let isDragging = false;
  let isPinching = false;
  let initialPinchDist = 0;
  let initialScale = 100;
  let offsetX = 0;
  let offsetY = 0;
  let rafId = null;
  let currentTargetX = 0;
  let currentTargetY = 0;

  function onPointerDown(clientX, clientY) {
    isDragging = true;
    const rect = mainCard.getBoundingClientRect();
    mainCard.style.left = `${rect.left}px`;
    mainCard.style.top = `${rect.top}px`;
    mainCard.style.transform = 'scale(var(--card-scale, 1.0))';

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    mainCard.style.transition = 'none';
    mainCard.classList.add('is-dragging');
  }

  function updateCardPositionRAF() {
    if (!isDragging) return;
    const maxW = window.innerWidth - mainCard.offsetWidth;
    const maxH = window.innerHeight - mainCard.offsetHeight;
    const boundedX = Math.max(6, Math.min(currentTargetX, maxW - 6));
    const boundedY = Math.max(6, Math.min(currentTargetY, maxH - 6));

    mainCard.style.left = `${boundedX}px`;
    mainCard.style.top = `${boundedY}px`;
    rafId = null;
  }

  function onPointerMove(clientX, clientY) {
    if (!isDragging) return;
    currentTargetX = clientX - offsetX;
    currentTargetY = clientY - offsetY;
    if (!rafId) {
      rafId = requestAnimationFrame(updateCardPositionRAF);
    }
  }

  function onPointerUp() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (isDragging) {
      isDragging = false;
      mainCard.classList.remove('is-dragging');
      mainCard.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
      persistActiveEvent();
    }
    if (isPinching) {
      isPinching = false;
      if (activeEvent) {
        storage.saveEvent(activeEvent);
      }
    }
  }

  function isDraggableArea(target) {
    if (
      target.closest('input') ||
      target.closest('button') ||
      target.closest('.controls-section') ||
      target.closest('.events-bar') ||
      target.closest('.card-resize-handle')
    ) {
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

  // Táctil (Móviles con soporte de pellizco para redimensionar)
  mainCard.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // Detección de pellizco con 2 dedos
      isDragging = false;
      isPinching = true;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      initialPinchDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      initialScale = activeEvent && activeEvent.scale ? activeEvent.scale : 100;
      return;
    }

    if (e.touches.length === 1 && isDraggableArea(e.target)) {
      const touch = e.touches[0];
      onPointerDown(touch.clientX, touch.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (isPinching && e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (initialPinchDist > 0) {
        const factor = currentDist / initialPinchDist;
        const newScale = Math.round(initialScale * factor);
        applyCardScale(newScale, false);
      }
      return;
    }

    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      onPointerMove(touch.clientX, touch.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchend', onPointerUp);
  window.addEventListener('touchcancel', onPointerUp);
}

// Control de Redimensionamiento con Mouse y Touch en la Esquina Inferior
function setupResizeHandle() {
  const resizeHandle = document.getElementById('card-resize-handle');
  if (!resizeHandle) return;

  let isResizing = false;
  let startScale = 100;
  let centerX = 0;
  let centerY = 0;
  let initialDist = 1;

  function onResizeStart(clientX, clientY) {
    isResizing = true;
    resizeHandle.classList.add('is-resizing');
    document.body.style.cursor = 'nwse-resize';
    mainCard.style.transition = 'none';

    const rect = mainCard.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
    initialDist = Math.hypot(clientX - centerX, clientY - centerY) || 1;
    startScale = activeEvent && activeEvent.scale ? activeEvent.scale : 100;
  }

  function onResizeMove(clientX, clientY) {
    if (!isResizing) return;
    const currentDist = Math.hypot(clientX - centerX, clientY - centerY);
    const ratio = currentDist / initialDist;
    const maxSafe = getMaxAllowedScale();
    const newScale = Math.min(maxSafe, Math.max(60, Math.round(startScale * ratio)));
    applyCardScale(newScale, false);
  }

  function onResizeEnd() {
    if (!isResizing) return;
    isResizing = false;
    resizeHandle.classList.remove('is-resizing');
    document.body.style.cursor = '';
    mainCard.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.2s ease';
    if (activeEvent) {
      storage.saveEvent(activeEvent);
    }
  }

  // Mouse en el tirador
  resizeHandle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    onResizeStart(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isResizing) {
      onResizeMove(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', onResizeEnd);

  // Touch en el tirador (para redimensionar con 1 dedo en pantallas táctiles como Asus ZenBook Duo)
  resizeHandle.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      e.stopPropagation();
      const t = e.touches[0];
      onResizeStart(t.clientX, t.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (isResizing && e.touches.length === 1) {
      e.preventDefault();
      const t = e.touches[0];
      onResizeMove(t.clientX, t.clientY);
    }
  }, { passive: false });

  window.addEventListener('touchend', onResizeEnd);
  window.addEventListener('touchcancel', onResizeEnd);
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

  // Selector de color personalizado (desacoplado input/change para 60fps)
  colorPicker.addEventListener('input', (e) => {
    applyColorTheme(e.target.value, false);
  });
  colorPicker.addEventListener('change', (e) => {
    applyColorTheme(e.target.value, true);
  });

  // Paleta de colores predefinidos (Gemas zodiacales)
  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      applyColorTheme(dot.dataset.color, true);
    });
  });

  // Selector de tipografía
  if (fontFamilySelect) {
    fontFamilySelect.addEventListener('change', (e) => {
      applyFontFamily(e.target.value, true);
    });
  }

  // Regulador de opacidad de fondo (60fps en input, persiste en change)
  if (cardOpacitySlider) {
    cardOpacitySlider.addEventListener('input', (e) => {
      applyCardOpacity(e.target.value, false);
    });
    cardOpacitySlider.addEventListener('change', (e) => {
      applyCardOpacity(e.target.value, true);
    });
  }

  // Regulador de tamaño / escala (60fps en input, persiste en change)
  if (cardScaleSlider) {
    cardScaleSlider.addEventListener('input', (e) => {
      applyCardScale(e.target.value, false);
    });
    cardScaleSlider.addEventListener('change', (e) => {
      applyCardScale(e.target.value, true);
    });
  }

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

  // Selector rápido de emoticones y emojis en el título (avión, corazón, sonrisa, luto, etc.)
  const btnEmojiToggle = document.getElementById('btn-emoji-toggle');
  const emojiPickerBar = document.getElementById('emoji-picker-bar');

  function insertEmojiIntoTitle(emoji) {
    if (!eventTitleInput) return;
    const start = eventTitleInput.selectionStart ?? eventTitleInput.value.length;
    const end = eventTitleInput.selectionEnd ?? eventTitleInput.value.length;
    const currentVal = eventTitleInput.value;
    
    const before = currentVal.substring(0, start);
    const after = currentVal.substring(end);
    const spaceBefore = (before.length > 0 && !before.endsWith(' ')) ? ' ' : '';
    const spaceAfter = (after.length > 0 && !after.startsWith(' ')) ? ' ' : '';

    eventTitleInput.value = `${before}${spaceBefore}${emoji}${spaceAfter}${after}`;
    const newPos = start + spaceBefore.length + emoji.length + spaceAfter.length;
    eventTitleInput.focus();
    try {
      eventTitleInput.setSelectionRange(newPos, newPos);
    } catch (e) {}

    eventTitleInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  if (btnEmojiToggle && emojiPickerBar) {
    btnEmojiToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = emojiPickerBar.style.display !== 'none';
      emojiPickerBar.style.display = isVisible ? 'none' : 'flex';
      btnEmojiToggle.classList.toggle('active', !isVisible);
    });

    document.querySelectorAll('.emoji-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const emoji = chip.getAttribute('data-emoji') || chip.textContent;
        insertEmojiIntoTitle(emoji);
      });
    });

    document.addEventListener('click', (e) => {
      if (!emojiPickerBar.contains(e.target) && e.target !== btnEmojiToggle) {
        emojiPickerBar.style.display = 'none';
        btnEmojiToggle.classList.remove('active');
      }
    });
  }
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

  // Event Listeners para Reproductor de Audio Local
  if (audioFileInput) {
    audioFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        activeEvent.audio = {
          name: file.name,
          type: file.type,
          data: event.target.result,
          autoplay: false,
          volume: 80
        };
        await storage.saveEvent(activeEvent);
        renderAudioUI();
      };
      reader.readAsDataURL(file);
      audioFileInput.value = '';
    });
  }

  if (btnDeleteAudio) {
    btnDeleteAudio.addEventListener('click', async (e) => {
      e.stopPropagation();
      activeEvent.audio = null;
      await storage.saveEvent(activeEvent);
      renderAudioUI();
    });
  }

  if (btnAudioPlay) {
    btnAudioPlay.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudioPlayback();
    });
  }

  if (btnMiniAudio) {
    btnMiniAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudioPlayback();
    });
  }

  if (audioVolumeSlider) {
    audioVolumeSlider.addEventListener('input', async (e) => {
      const vol = parseInt(e.target.value, 10);
      currentAudio.volume = vol / 100;
      if (activeEvent && activeEvent.audio) {
        activeEvent.audio.volume = vol;
        await storage.saveEvent(activeEvent);
      }
    });
  }

  if (audioAutoplayCheck) {
    audioAutoplayCheck.addEventListener('change', async (e) => {
      if (activeEvent && activeEvent.audio) {
        activeEvent.audio.autoplay = e.target.checked;
        await storage.saveEvent(activeEvent);
      }
    });
  }

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
