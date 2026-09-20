/**
 * Dynamic Lightweight i18n Engine for mrclo.dev
 * Handles automatic language detection, top-right switcher,
 * and Chilean Dual-Language Legal Compliance.
 */

const translations = {
  es: {
    // Navigation
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Header
    "header.role": "Ingeniero Senior de Integraciones | DevOps | Confiabilidad de APIs",
    "header.bio1": "Ingeniero radicado en Chile con experiencia en soporte a plataformas SaaS basadas en APIs, sistemas distribuidos, entornos en la nube y confiabilidad en producción.",
    "header.bio2": "Enfocado en integraciones confiables, respuesta a incidentes y soluciones tecnológicas escalables.",
    "header.btn.resume": "Descargar CV",
    "header.btn.contact": "Contáctame",
    "header.btn.whatsapp": "WhatsApp",

    // About
    "about.title": "Sobre mí",
    "about.desc": "Ingeniero Senior de Integraciones con experiencia en ecosistemas de APIs, plataformas SaaS y entornos de producción. He colaborado con equipos globales resolviendo integraciones complejas, depurando sistemas distribuidos y mejorando la confiabilidad de plataformas.",

    // Highlights
    "highlights.title": "Destacados Profesionales",
    "highlights.card1.title": "5+ Años",
    "highlights.card1.desc": "Plataformas SaaS e Integraciones API",
    "highlights.card2.title": "Equipos Globales",
    "highlights.card2.desc": "Experiencia en Colaboración Remota",
    "highlights.card3.title": "P0 / P1",
    "highlights.card3.desc": "Respuesta a Incidentes y Confiabilidad",
    "highlights.card4.title": "Nube",
    "highlights.card4.desc": "AWS y Prácticas de Infraestructura",

    // Mobility
    "mobility.title": "Ubicación y Movilidad",
    "mobility.p1": "Radicado en Chile 🇨🇱",
    "mobility.p2": "Disponible para oportunidades internacionales remotas, equipos distribuidos globales y opciones de reubicación.",

    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.api": "APIs e Integración",
    "skills.cloud": "Nube y DevOps",
    "skills.reliability": "Ingeniería de Confiabilidad",

    // Experience
    "exp.title": "Experiencia Laboral",
    "exp.intro.role": "Ingeniero Senior de Integraciones",
    "exp.intro.desc": "Soporte a plataformas empresariales SaaS y pasarelas de pago, resolviendo integraciones complejas, investigando incidentes en producción y optimizando la confiabilidad de sistemas en entornos distribuidos.",
    "exp.view_details": "Ver detalles",

    // Rootly
    "exp.rootly.role": "Ingeniero Senior de Soporte e Integraciones",
    "exp.rootly.meta": "Sep 2024 — Feb 2026<br>Canadá · Remoto",
    "exp.rootly.desc": "Soporte a clientes corporativos de SaaS depurando integraciones de API, incidentes en producción e infraestructura en la nube, colaborando estrechamente con equipos de Ingeniería y Producto.",
    "exp.rootly.b1": "Resolución de problemas en APIs REST e integraciones con webhooks.",
    "exp.rootly.b2": "Respuesta a incidentes en producción y análisis de causa raíz.",
    "exp.rootly.b3": "Soporte de entornos SaaS alojados en la nube.",
    "exp.rootly.b4": "Colaboración con equipos de Ingeniería en desafíos técnicos.",

    // PagerDuty
    "exp.pd.role": "Ingeniero de Soporte Técnico",
    "exp.pd.meta": "2022 — 2024<br>Estados Unidos · Remoto",
    "exp.pd.desc": "Soporte a clientes globales en soluciones de gestión de incidentes en la nube, depurando incidencias técnicas, integraciones y entornos de producción.",
    "exp.pd.b1": "Depuración de fallas en plataforma SaaS e integraciones de clientes.",
    "exp.pd.b2": "Análisis de logs y métricas para identificar causas raíz.",
    "exp.pd.b3": "Soporte en integraciones de API e investigaciones técnicas.",
    "exp.pd.b4": "Colaboración con equipos de Ingeniería en entornos globales.",

    // Pago Fácil
    "exp.pf.role": "Ingeniero de Soporte e Integraciones",
    "exp.pf.meta": "Ene 2020 — Ene 2023<br>Chile · Remoto",
    "exp.pf.desc": "Soporte a integraciones de pasarelas de pago de alto volumen en entornos de producción, garantizando el procesamiento confiable de transacciones y resolviendo incidentes complejos.",
    "exp.pf.b1": "Soporte de integraciones de pasarelas de pago transaccionales de alta demanda.",
    "exp.pf.b2": "Consultas SQL y análisis forense de logs para resolver discrepancias de conciliación y fallos de pago.",
    "exp.pf.b3": "Investigación de discrepancias en contratos de API, fallos de entrega de webhooks y errores de validación de payloads.",
    "exp.pf.b4": "Optimización de estrategias de reintentos y aislamiento de fallas para pagos resilientes.",
    "exp.pf.b5": "Colaboración con equipos de Ingeniería y Operaciones durante despliegues a producción.",

    // Projects
    "proj.title": "Proyectos",
    "proj.p1.title": "Portafolio DevOps",
    "proj.p1.desc": "Portafolio profesional que exhibe prácticas de DevOps, automatización e ingeniería de confiabilidad.",
    "proj.p2.title": "Kit de Confiabilidad de APIs",
    "proj.p2.desc": "Herramientas y ejemplos prácticos para depuración de APIs, monitoreo y resiliencia de integraciones.",
    "proj.p3.title": "Automatización de Infraestructura",
    "proj.p3.desc": "Ejemplos de Infraestructura como Código (IaC) aplicando estándares modernos de ingeniería en la nube.",

    // Contact
    "contact.title": "Contacto",
    "contact.open": "Abierto a oportunidades remotas internacionales.",
    "contact.email_label": "Correo:",

    // Footer & Chilean Legal Notice
    "footer.rights": "© 2026 Marcelo Poblete | mrclo.devops",
    "footer.version": "Portfolio v1.2.0 · Dynamic i18n & Legal Compliance",
    "legal.title": "🇨🇱 Cumplimiento Legal y Privacidad (República de Chile)",
    "legal.content": `
      <div class="legal-card single">
        <p>
          De conformidad con la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> y las normativas del Servicio Nacional del Consumidor (SERNAC) de la República de Chile, este sitio web no comercializa ni cede datos personales de sus visitantes. Los datos técnicos se emplean exclusivamente para mantener preferencias de navegación (como el idioma seleccionado) y salvaguardar la seguridad operativa. Para consultas sobre el tratamiento de datos o ejercicio de derechos legales, contáctenos en <a href="mailto:privacy@mrclo.dev">privacy@mrclo.dev</a>.
        </p>
      </div>
    `
  },

  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Header
    "header.role": "Senior Integration Engineer | DevOps | API Reliability",
    "header.bio1": "Chile-based engineer with experience supporting API-driven SaaS platforms, distributed systems, cloud environments and production reliability.",
    "header.bio2": "Focused on reliable integrations, incident response and scalable technology solutions.",
    "header.btn.resume": "Download Resume",
    "header.btn.contact": "Contact Me",
    "header.btn.whatsapp": "WhatsApp",

    // About
    "about.title": "About",
    "about.desc": "Senior Integration Engineer experienced in API ecosystems, SaaS platforms and production environments. I have worked with global teams supporting complex integrations, debugging distributed systems and improving platform reliability.",

    // Highlights
    "highlights.title": "Professional Highlights",
    "highlights.card1.title": "5+ Years",
    "highlights.card1.desc": "SaaS Platforms & API Integrations",
    "highlights.card2.title": "Global Teams",
    "highlights.card2.desc": "Remote Collaboration Experience",
    "highlights.card3.title": "P0/P1",
    "highlights.card3.desc": "Incident Response & Reliability",
    "highlights.card4.title": "Cloud",
    "highlights.card4.desc": "AWS & Infrastructure Practices",

    // Mobility
    "mobility.title": "Location & Mobility",
    "mobility.p1": "Based in Chile 🇨🇱",
    "mobility.p2": "Available for remote international opportunities, global distributed teams and relocation opportunities.",

    // Skills
    "skills.title": "Skills",
    "skills.api": "API & Integration",
    "skills.cloud": "Cloud & DevOps",
    "skills.reliability": "Reliability Engineering",

    // Experience
    "exp.title": "Experience",
    "exp.intro.role": "Senior Integration Engineer",
    "exp.intro.desc": "Supporting enterprise SaaS and payment platforms by troubleshooting complex integrations, investigating production issues, and improving system reliability across distributed environments.",
    "exp.view_details": "View details",

    // Rootly
    "exp.rootly.role": "Senior Support & Integration Engineer",
    "exp.rootly.meta": "Sep 2024 — Feb 2026<br>Canada · Remote",
    "exp.rootly.desc": "Supported enterprise SaaS customers by troubleshooting API integrations, production incidents and cloud infrastructure while collaborating with Engineering and Product teams.",
    "exp.rootly.b1": "Troubleshooting REST APIs and webhook integrations.",
    "exp.rootly.b2": "Production incident response and root cause analysis.",
    "exp.rootly.b3": "Supported cloud-based SaaS environments.",
    "exp.rootly.b4": "Collaborated with Engineering teams on technical issues.",

    // PagerDuty
    "exp.pd.role": "Technical Support Engineer",
    "exp.pd.meta": "2022 — 2024<br>United States · Remote",
    "exp.pd.desc": "Supported global customers using cloud-based incident management solutions, troubleshooting technical issues, integrations and production environments.",
    "exp.pd.b1": "Troubleshot SaaS platform issues and customer integrations.",
    "exp.pd.b2": "Analyzed logs and technical data to identify root causes.",
    "exp.pd.b3": "Supported API integrations and technical investigations.",
    "exp.pd.b4": "Collaborated with Engineering teams across global environments.",

    // Pago Fácil
    "exp.pf.role": "Integration Support Engineer",
    "exp.pf.meta": "Jan 2020 — Jan 2023<br>Chile · Remote",
    "exp.pf.desc": "Supported high-volume payment gateway integrations in production environments, ensuring reliable transaction processing and troubleshooting complex integration issues.",
    "exp.pf.b1": "Supported high-volume payment gateway integrations in production environments.",
    "exp.pf.b2": "Performed SQL analysis and log investigations to resolve reconciliation discrepancies and transaction failures.",
    "exp.pf.b3": "Investigated API contract mismatches, webhook delivery issues and payload validation errors.",
    "exp.pf.b4": "Refined retry strategies and fault-isolation practices to support reliable payment processing.",
    "exp.pf.b5": "Collaborated with Engineering and Operations teams during production releases.",

    // Projects
    "proj.title": "Projects",
    "proj.p1.title": "DevOps Portfolio",
    "proj.p1.desc": "Professional portfolio showcasing DevOps practices, automation and reliability engineering.",
    "proj.p2.title": "API Reliability Toolkit",
    "proj.p2.desc": "Examples focused on API troubleshooting, monitoring and integration reliability.",
    "proj.p3.title": "Infrastructure Automation",
    "proj.p3.desc": "Infrastructure as Code examples using modern cloud engineering practices.",

    // Contact
    "contact.title": "Contact",
    "contact.open": "Open to remote international opportunities.",
    "contact.email_label": "Email:",

    // Footer & Chilean Dual-Language Legal Notice
    "footer.rights": "© 2026 Marcelo Poblete | mrclo.devops",
    "footer.version": "Portfolio v1.2.0 · Dynamic i18n & Legal Compliance",
    "legal.title": "🇨🇱 Chilean Legal Framework & Privacy Compliance (Dual-Language Standard)",
    "legal.content": `
      <div class="legal-card dual">
        <div class="legal-col">
          <span class="legal-badge">Texto Oficial (Castellano - República de Chile)</span>
          <p>
            De conformidad con la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> y normativas del SERNAC, este sitio web no recopila ni comercializa datos personales de sus visitantes. Los datos técnicos se emplean exclusivamente para guardar preferencias y salvaguardar la seguridad operativa. Contacto: <a href="mailto:privacy@mrclo.dev">privacy@mrclo.dev</a>.
          </p>
        </div>
        <div class="legal-col">
          <span class="legal-badge">Official English Translation (Convenience Reference)</span>
          <p>
            In compliance with <strong>Law No. 19,628 on the Protection of Private Life</strong> and SERNAC regulations of the Republic of Chile, this website does not collect or sell visitors' personal data. Technical data is strictly used for user preferences and operational security. Contact: <a href="mailto:privacy@mrclo.dev">privacy@mrclo.dev</a>.
          </p>
        </div>
      </div>
    `
  }
};

/**
 * Detect language:
 * 1. Saved preference in localStorage
 * 2. Browser language (navigator.language)
 * 3. Default to 'es' if browser is Spanish, else 'en'
 */
function getInitialLanguage() {
  const saved = localStorage.getItem("mrclo_user_lang");
  if (saved && translations[saved]) {
    return saved;
  }
  const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (browserLang.startsWith("es")) {
    return "es";
  }
  return "en";
}

/**
 * Apply selected language
 */
function setLanguage(lang) {
  if (!translations[lang]) lang = "en";
  localStorage.setItem("mrclo_user_lang", lang);
  document.documentElement.lang = lang;

  const dict = translations[lang];

  // Update text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update legal framework container
  const legalTitle = document.getElementById("legal-title");
  if (legalTitle && dict["legal.title"]) {
    legalTitle.textContent = dict["legal.title"];
  }

  const legalBody = document.getElementById("legal-body");
  if (legalBody && dict["legal.content"]) {
    legalBody.innerHTML = dict["legal.content"];
  }

  // Update switcher button
  const flagEl = document.getElementById("current-lang-flag");
  const codeEl = document.getElementById("current-lang-code");
  if (flagEl && codeEl) {
    if (lang === "es") {
      flagEl.textContent = "🇨🇱";
      codeEl.textContent = "ES";
    } else {
      flagEl.textContent = "🇺🇸";
      codeEl.textContent = "EN";
    }
  }

  // Highlight active dropdown option
  document.querySelectorAll(".lang-option").forEach((opt) => {
    if (opt.getAttribute("data-lang") === lang) {
      opt.classList.add("active");
    } else {
      opt.classList.remove("active");
    }
  });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);

  // Selector dropdown logic
  const switcherBtn = document.getElementById("lang-switcher-btn");
  const dropdown = document.getElementById("lang-dropdown");

  if (switcherBtn && dropdown) {
    switcherBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.querySelectorAll(".lang-option").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const selected = opt.getAttribute("data-lang");
        setLanguage(selected);
        dropdown.classList.remove("open");
      });
    });

    document.addEventListener("click", () => {
      dropdown.classList.remove("open");
    });
  }
});
