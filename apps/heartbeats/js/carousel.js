/**
 * Módulo de Carrusel de Fotos con Soporte Táctil y Transición Suave
 */

export class CarouselManager {
  constructor(bgSlideElement, onSlideChange) {
    this.bgSlide = bgSlideElement;
    this.onSlideChange = onSlideChange;
    this.photos = [];
    this.currentIndex = 0;
    this.timerId = null;
    this.intervalSeconds = 4;
    this.isPaused = false;

    this.initTouchGestures();
  }

  setPhotos(photos) {
    this.photos = photos;
    if (this.currentIndex >= this.photos.length) {
      this.currentIndex = 0;
    }
    this.updateBackground();
    this.restartTimer();
  }

  setIntervalSeconds(seconds) {
    this.intervalSeconds = seconds;
    this.restartTimer();
  }

  updateBackground() {
    if (this.photos.length === 0) {
      this.bgSlide.style.backgroundImage = 'none';
      return;
    }
    const currentPhoto = this.photos[this.currentIndex];
    this.bgSlide.style.backgroundImage = `url('${currentPhoto.data || currentPhoto}')`;
    if (this.onSlideChange) this.onSlideChange(this.currentIndex);
  }

  next() {
    if (this.photos.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateBackground();
    this.restartTimer();
  }

  prev() {
    if (this.photos.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateBackground();
    this.restartTimer();
  }

  restartTimer() {
    if (this.timerId) clearInterval(this.timerId);
    if (this.photos.length > 1 && !this.isPaused) {
      this.timerId = setInterval(() => this.next(), this.intervalSeconds * 1000);
    }
  }

  // Soporte para gestos táctiles (Swipe en teléfonos móviles)
  initTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      // Umbral de 50 píxeles para detectar deslizamiento
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          this.next(); // Deslizar izquierda -> Siguiente foto
        } else {
          this.prev(); // Deslizar derecha -> Foto anterior
        }
      }
    }, { passive: true });
  }
}
