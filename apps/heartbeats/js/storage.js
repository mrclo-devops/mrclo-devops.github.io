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

      req.onsuccess = () => resolve(req.result || []);
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

  createDefaultEvent(id = 'event_default', title = 'Aniversario con Nelly', color = '#38bdf8') {
    const defaultDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    return {
      id,
      title,
      targetDate: defaultDate,
      accentColor: color,
      intervalSeconds: 4,
      position: null,
      photos: [] // Máx 10 fotos { id, data }
    };
  }
}

export const storage = new MultiEventStorage();
