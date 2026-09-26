/**
 * Módulo de Almacenamiento Multi-Evento v1.1.0 (IndexedDB + LocalStorage)
 * Permite gestionar hasta 10 recordatorios independientes, cada uno con su propio paquete de hasta 10 fotos.
 */

const DB_NAME = 'AnniversaryCountdownDB';
const DB_VERSION = 2;
const STORE_EVENTS = 'events';

class MultiEventStorage {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_EVENTS)) {
          db.createObjectStore(STORE_EVENTS, { keyPath: 'id' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = (e) => {
        console.error('Error al abrir IndexedDB:', e.target.error);
        reject(e.target.error);
      };
    });
  }

  async getAllEvents() {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([STORE_EVENTS], 'readonly');
      const store = tx.objectStore(STORE_EVENTS);
      const req = store.getAll();

      req.onsuccess = () => {
        const items = req.result || [];
        items.forEach((evt) => {
          if (!evt.alarms || !Array.isArray(evt.alarms)) {
            evt.alarms = [
              { id: 1, enabled: true, value: 7, unit: 'days' },
              { id: 2, enabled: true, value: 1, unit: 'days' },
              { id: 3, enabled: false, value: 1, unit: 'hours' }
            ];
          }
          if (evt.audio === undefined) {
            evt.audio = null;
          }
        });
        resolve(items);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async saveEvent(eventData) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([STORE_EVENTS], 'readwrite');
      const store = tx.objectStore(STORE_EVENTS);
      const req = store.put(eventData);

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteEvent(eventId) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction([STORE_EVENTS], 'readwrite');
      const store = tx.objectStore(STORE_EVENTS);
      const req = store.delete(eventId);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  getActiveEventId() {
    return localStorage.getItem('anniversary_active_event_id') || 'event_default';
  }

  setActiveEventId(id) {
    localStorage.setItem('anniversary_active_event_id', id);
  }

  createDefaultEvent(id = 'event_default', title = '❤️ Primer aniversario con Marcelo ❤️', color = '#ec4899') {
    const defaultDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    return {
      id,
      title,
      targetDate: defaultDate,
      accentColor: color,
      fontFamily: 'Great Vibes',
      bgOpacity: 55,
      scale: 100,
      intervalSeconds: 4,
      position: null,
      photos: [
        { id: 'p1', data: './assets/photos/photo_1.webp' },
        { id: 'p2', data: './assets/photos/photo_4.webp' },
        { id: 'p3', data: './assets/photos/photo_6.webp' },
        { id: 'p4', data: './assets/photos/photo_7.webp' },
        { id: 'p5', data: './assets/photos/photo_8.webp' },
        { id: 'p6', data: './assets/photos/photo_19.webp' },
        { id: 'p7', data: './assets/photos/photo_9.webp' },
        { id: 'p8', data: './assets/photos/photo_10.webp' },
        { id: 'p9', data: './assets/photos/photo_11.webp' },
        { id: 'p10', data: './assets/photos/photo_17.webp' }
      ],
      alarms: [
        { id: 1, enabled: true, value: 7, unit: 'days' },
        { id: 2, enabled: true, value: 1, unit: 'days' },
        { id: 3, enabled: false, value: 1, unit: 'hours' }
      ],
      audio: {
        name: 'Solamente Tú - Pablo Alborán',
        type: 'audio/mp3',
        data: './assets/audio/Solamente_tu.mp3',
        autoplay: true,
        volume: 80
      }
    };
  }
}

export const storage = new MultiEventStorage();
