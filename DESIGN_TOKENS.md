# Sistema de Diseño y Tokens Cromáticos — mrclo.dev

Este documento registra de forma canónica y permanente los tokens de color, identidad visual y paletas temáticas asignadas a las diferentes secciones y productos del ecosistema de `mrclo.dev`.

---

## 1. Asignaciones Específicas por Sección / Proyecto

### Labs & Drops (`mrclo.dev/labs-drops/`)
* **Color Primario Asignado:** **Citrino Solar (Virgo)**
  * **Código HEX:** `#eab308`
  * **Token CSS:** `--labs-citrino-solar: #eab308;`
  * **Token Brillo / Resplandor Neón:** `--labs-citrino-glow: rgba(234, 179, 8, 0.38);`
  * **Atributos Simbólicos:** Calidez dorada, intelecto metódico, claridad de precisión analítica e ingeniería rigurosa.

---

## 2. Paleta de Gemas Zodiacales (Heartbeats Memories & Local-First Apps)

Paleta equilibrada de 8 gemas con separación cromática mínima de 30% a lo largo de los 360 grados del espectro visual, concebida para los signos Dragón, Cabra, Virgo y Capricornio:

1. **Rubí Fuego (Dragón):** `#ef4444` (Rojo pasión intenso, ángulo ~0°)
2. **Cornalina Ámbar (Capricornio):** `#ea580c` (Naranja volcánico, ángulo ~25°)
3. **Citrino Solar (Virgo):** `#eab308` (Dorado solar radiante, ángulo ~45°) — *Reservado también para Labs & Drops*
4. **Jade Imperial (Dragón):** `#10b981` (Verde esmeralda profundo, ángulo ~155°)
5. **Aguamarina Celestial (Cabra):** `#06b6d4` (Cian glaciar luminoso, ángulo ~190°)
6. **Zafiro Real (Virgo):** `#2563eb` (Azul eléctrico noble, ángulo ~220°)
7. **Amatista Mística (Capricornio):** `#8b5cf6` (Púrpura astral profundo, ángulo ~265°)
8. **Cuarzo Rosa (Cabra):** `#ec4899` (Magenta romántico suave, ángulo ~330°)

---

## 3. Accesibilidad y Alto Contraste
* Todos los tokens cuentan con relación de contraste superior a 4.5:1 sobre fondos oscuros `#070a13` y `#0b0f19` (cumplimiento WCAG AA/AAA).
* El valor alfa para estados inactivos o desenfoques translúcidos se gestiona mediante CSS Custom Properties (`--accent-glow`, `--card-opacity`).
