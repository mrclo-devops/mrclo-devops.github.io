/**
 * Dynamic Lightweight i18n Engine for mrclo.dev
 * Handles automatic language detection, top-right switcher,
 * and Chilean Dual-Language Legal Compliance.
 */

const translations = {
  es: {
    // Navigation
    "nav.about": "Sobre mí",
    "nav.background": "Trayectoria Profesional",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.labs_drops": "Labs&Drops",
    "nav.contact": "Ubicación & Contacto",
    "contact.unified.title": "Ubicación, Movilidad & Contacto",
    "contact.unified.desc": "Disponible para oportunidades remotas internacionales, equipos distribuidos globales y opciones de reubicación.",
    "contact.loc.title": "Radicado en Chile 🇨🇱",
    "contact.loc.badge": "Zona Horaria CLT (UTC-3 / UTC-4)",
    "contact.reach.title": "Canales Directos",

    // Header
    "header.role": "Ingeniero Senior de Integraciones | DevOps | Confiabilidad de APIs",
    "header.bio1": "Ingeniero radicado en Chile con experiencia en soporte a plataformas SaaS basadas en APIs, sistemas distribuidos, entornos en la nube y confiabilidad en producción.",
    "header.bio2": "Enfocado en integraciones confiables, respuesta a incidentes y soluciones tecnológicas escalables.",
    "header.bio3": "Creador de contenido tecnológico, instructor de cursos técnicos especializados y desarrollador de aplicaciones indie orientadas a software Local-First y laboratorios de ingeniería.",
    "header.btn.resume": "Descargar CV",
    "header.btn.contact": "Contáctame",
    "header.btn.whatsapp": "WhatsApp",

    // Background Page
    "background.title": "Trayectoria Profesional",
    "background.subtitle": "Ingeniería de integraciones, sistemas distribuidos, confiabilidad en producción y stack técnico.",

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
    "exp.rootly.badge": "Gestión de Incidentes & SRE",
    "exp.rootly.role": "Ingeniero Senior de Soporte e Integraciones",
    "exp.rootly.meta": "Sep 2024 — Feb 2026<br>Canadá · Remoto",
    "exp.rootly.desc": "Soporte a clientes corporativos de SaaS depurando integraciones de API, incidentes en producción e infraestructura en la nube, colaborando estrechamente con equipos de Ingeniería y Producto.",
    "exp.rootly.b1": "Resolución de problemas en APIs REST e integraciones con webhooks.",
    "exp.rootly.b2": "Respuesta a incidentes en producción y análisis de causa raíz.",
    "exp.rootly.b3": "Soporte de entornos SaaS alojados en la nube.",
    "exp.rootly.b4": "Colaboración con equipos de Ingeniería en desafíos técnicos.",

    // PagerDuty
    "exp.pd.badge": "Respuesta a Incidentes en Nube",
    "exp.pd.role": "Ingeniero de Soporte Técnico",
    "exp.pd.meta": "2022 — 2024<br>Estados Unidos · Remoto",
    "exp.pd.desc": "Soporte a clientes globales en soluciones de gestión de incidentes en la nube, depurando incidencias técnicas, integraciones y entornos de producción.",
    "exp.pd.b1": "Depuración de fallas en plataforma SaaS e integraciones de clientes.",
    "exp.pd.b2": "Análisis de logs y métricas para identificar causas raíz.",
    "exp.pd.b3": "Soporte en integraciones de API e investigaciones técnicas.",
    "exp.pd.b4": "Colaboración con equipos de Ingeniería en entornos globales.",

    // Pago Fácil / EVO Payments
    "exp.pf.badge": "Pasarela de Pagos & FinTech",
    "exp.pf.role": "Ingeniero de Soporte e Integraciones",
    "exp.pf.meta": "Ene 2020 — Ene 2023<br>Chile · Remoto",
    "exp.pf.desc": "Soporte a integraciones de pasarelas de pago de alto volumen en entornos de producción, garantizando el procesamiento confiable de transacciones y resolviendo incidentes complejos.",
    "exp.pf.b1": "Soporte de integraciones de pasarelas de pago transaccionales de alta demanda.",
    "exp.pf.b2": "Consultas SQL y análisis forense de logs para resolver discrepancias de conciliación y fallos de pago.",
    "exp.pf.b3": "Investigación de discrepancias en contratos de API, fallos de entrega de webhooks y errores de validación de payloads.",
    "exp.pf.b4": "Optimización de estrategias de reintentos y aislamiento de fallas para pagos resilientes.",
    "exp.pf.b5": "Colaboración con equipos de Ingeniería y Operaciones durante despliegues a producción.",

    // Instituto Chileno Británico de Cultura (ICBC)
    "exp.icbc.badge": "Liderazgo Docente & Coaching",
    "exp.icbc.company": "Instituto Chileno Británico de Cultura",
    "exp.icbc.role": "Profesor de Inglés & Coach de Comunicación Técnica",
    "exp.icbc.meta": "15+ Años de Trayectoria Docente<br>Chile · Presencial & Online",
    "exp.icbc.desc": "Más de 15 años dedicados a la docencia del idioma inglés abarcando todas las etapas formativas: infancia, adolescencia, adultos y profesionales de la ingeniería. Especialista en fluidez profesional C1, fonética y comunicación asertiva para equipos globales de ingeniería.",
    "exp.icbc.b1": "Docencia y formación integral del idioma inglés abarcando todas las etapas formativas: niños, adolescentes, universitarios y profesionales de alto rendimiento.",
    "exp.icbc.b2": "Coaching de oratoria técnica, entrevistas laborales internacionales y orquestación de standups globales y post-mortems en inglés sin barreras idiomáticas.",
    "exp.icbc.b3": "Preparación intensiva de exámenes y certificaciones internacionales (Cambridge, IELTS, TOEFL) con enfoque en dominio profesional avanzado (C1).",
    "exp.icbc.b4": "Fundamento pedagógico directo de mi soltura para colaborar y comunicarme fluidamente en entornos multiculturales con equipos en EE. UU., Canadá y Reino Unido.",

    // Labs&Drops Universe & Modal
    "labs.nav.live": "ECOSISTEMA R&D",
    "labs.hero.badge": "Laboratorio Vivo de Software & Hardware",
    "labs.hero.title": "Donde el Código Cobra Vida en Productos Tangibles",
    "labs.hero.subtitle": "Ecosistema independiente de aplicaciones, asistentes de audio por hardware y laboratorios de incidentes en producción. Construidos bajo arquitectura Local-First, privacidad absoluta y cero telemetría de terceros.",
    "labs.pill.privacy": "100% Local-First",
    "labs.pill.db": "IndexedDB Nativo",
    "labs.pill.perf": "60 FPS Render Ambient",
    "labs.pill.telemetry": "Cero Rastreo / No Cookies",
    "labs.tab.all": "Todos los Drops",
    "labs.tab.apps": "Software & Apps",
    "labs.tab.voice": "Voz & AI Hardware",
    "labs.tab.academy": "Incident Labs",

    "labs.title": "Labs&Drops",
    "labs.intro": "Aplicaciones de software, ingeniería de voz y programas de aprendizaje práctico desarrollados con arquitectura Local-First y foco en privacidad.",
    "labs.d1.badge": "App Multiplataforma",
    "labs.d1.title": "Heartbeats Memories",
    "labs.d1.sub": "Live Countdown & Shared Emotional Milestones",
    "labs.d1.desc": "Visualizador ambiental de cuenta regresiva en vivo sincronizado con latidos compartidos y carrusel de fotografías. Funciona como wallpaper vivo en escritorio (Linux/macOS/Windows) o PWA en celular, preservando tu privacidad sin rastreadores.",
    "labs.d1.platforms": "Desktop Wallpaper · Web PWA · Mobile Lockscreen",
    "labs.d1.support": "Soporte: support@mrclo.dev",
    "labs.d1.price_badge": "Actualizaciones para siempre",
    "labs.d1.price_hook": "💡 <em>A diferencia de otras apps, no hay arriendo mensual.</em>",
    "labs.d1.price_usd": "(Aprox. 5 USD)",
    "labs.d1.btn_buy": "Pagar con Webpay ($5.000 CLP)",
    "labs.d1.btn_buy_alt": "Pagar con Webpay",
    "labs.d1.qr_heading": "Paga con QR",
    "labs.d1.qr_subtext": "Desde tu celular o app bancaria favorita.",
    "labs.d1.link_alt": "O pagar en este navegador",
    "labs.d1.btn_catalog": "Ver Catálogo de Funcionalidades",
    "labs.d1.btn_live_real": "Probar Demo Real en Vivo (v1.5.0 Pantalla Completa)",
    "labs.d1.trust_note": "Pago cifrado Transbank · Asistencia: support@mrclo.dev",
    "labs.d1.terms_link": "Términos de Licencia",
    "labs.d1.mobile_terms_note": "Al pagar aceptas los",
    "labs.d1.btn_demo": "Probar Demo Interactiva",
    "labs.d1.btn_web": "Lanzar Web App",
    "labs.d1.btn_repo": "Ver Repositorio",

    "labs.d2.badge": "Voz & AI Hardware",
    "labs.d2.title": "Bilingual Shadowing & Voice Engine",
    "labs.d2.sub": "Asistente de Audio con Atajos Globales para Fluidez en Inglés",
    "labs.d2.desc": "Tecnología de lectura espejo (Bilingual Shadowing) y carrusel de acentos nativos (US, UK, NZ, AU, Chile, Colombia) con traducción en caliente sin latencia para entrenar la audición activa y pronunciación técnica directamente desde tu estación de trabajo.",
    "labs.d2.platforms": "Linux Sidecar · Atajos Globales (Alt + M / Alt + L) · Audio Streaming",
    "labs.d2.btn_demo": "Solicitar Acceso Anticipado",
    "labs.d2.btn_inquire": "Consultar Arquitectura / Colaborar",

    "labs.d3.badge": "Incident Labs",
    "labs.d3.title": "Gestión de Incidentes & Inglés Técnico",
    "labs.d3.sub": "Simulaciones P0/P1 y Práctica de Standups Globales",
    "labs.d3.desc": "Formación práctica para responder a caídas de producción, liderar post-mortems y dominar standups y entrevistas técnicas en inglés profesional.",
    "labs.d3.platforms": "Simulaciones P0/P1 · Post-Mortems · Standups Globales",
    "labs.d3.btn_contact": "Contactar al Instructor",
    "labs.d3.btn_cv": "Ver Trayectoria",

    "labs.d4.badge": "En Desarrollo · Q4 2026",
    "labs.d4.title": "Synthetic API Probes & Canary",
    "labs.d4.sub": "Sonda Distribuida Ligera de Latencia y Monitoreo de APIs",
    "labs.d4.desc": "Agente de telemetría de borde para evaluar contratos de API y tiempos de respuesta transaccionales con alertas directas por webhook y cero sobrecostos de nube.",
    "labs.d4.platforms": "Edge Probe · Webhooks · Micro-agente Go/Rust",
    "labs.d4.status": "Próximo Lanzamiento en Laboratorio",

    "modal.btn.desktop": "Modo Computador (Wallpaper Desktop)",
    "modal.btn.mobile": "Modo Celular (Wallpaper PWA)",
    "modal.pos.label": "Posición Widget:",
    "modal.pos.top_left": "↖ Sup-Izq",
    "modal.pos.center": "⊙ Centro",
    "modal.pos.bottom_right": "↘ Inf-Der",
    "modal.palette.label": "Color del Widget:",
    "modal.font.label": "Letra:",
    "modal.opacity.label": "Opacidad:",
    "modal.scale.label": "Tamaño:",
    "modal.audio.btn": "Música Local",
    "modal.alarms.badge": "3 Alarmas (7d, 1d, 1h)",
    "modal.card.days": "Días",
    "modal.card.hours": "Horas",
    "modal.card.mins": "Min",
    "modal.card.secs": "Seg",
    "modal.card.beats": "latidos compartidos",
    "modal.btn.buy": "Pagar con Webpay ($5.000 CLP)",
    "modal.btn.support": "Soporte: support@mrclo.dev",
    "demo.tab.ev1": "Aniversario",
    "demo.tab.ev2": "Viaje Soñado",
    "demo.tab.ev3": "Graduación",
    "demo.ev1.title": "Aniversario Especial",
    "demo.ev2.title": "Viaje Soñado a la Patagonia",
    "demo.ev3.title": "Graduación & Hito de Vida",

    // Feature Catalog Modal (Spanish)
    "catalog.title": "✨ Catálogo de Funcionalidades — Heartbeats Memories",
    "catalog.badge": "v1.5.0 • Licencia Vitalicia",
    "catalog.price_usd": "(Aprox. 5 USD)",
    "catalog.lifetime_pill": "Actualizaciones para siempre",
    "catalog.hero_hook": "💡 <strong>A diferencia de otras apps, no hay arriendo mensual.</strong> Compras tu licencia una sola vez y es tuya para siempre con todas las mejoras y actualizaciones continuas.",
    "catalog.hero_btn_buy": "Pagar con Webpay ($5.000 CLP / ~5 USD)",
    "catalog.f1.title": "Agrandar o achicar el recuadro libremente",
    "catalog.f1.desc": "Adapta el tamaño de la tarjeta para que sea sutil y discreta en una esquina de tu pantalla o grande e impactante en tu celular. En el computador puedes arrastrar la esquina inferior con el ratón y en tu teléfono pellizcar con dos dedos.",
    "catalog.f2.title": "Hasta 10 colores y gemas temáticas",
    "catalog.f2.desc": "Personaliza el marco y el halo brillante con 10 tonos inspirados en gemas (rubí, cornalina, citrino, jade, turquesa, aguamarina, zafiro, amatista, cuarzo rosa y granate), o escoge cualquier color personalizado con el selector libre.",
    "catalog.f3.title": "Hasta 3 alarmas hacia atrás (avisos previos)",
    "catalog.f3.desc": "Configura hasta 3 alertas antes de que se cumpla tu fecha especial (por ejemplo: 1 mes antes, 1 semana antes o 1 hora antes) para que puedas preparar regalos, sorpresas o viajes con total anticipación.",
    "catalog.f4.title": "Música y sonido desde tu propio dispositivo",
    "catalog.f4.desc": "Sube tu canción favorita o una nota de voz en formato MP3, WAV o M4A directamente desde tu teléfono (Android o iPhone) o desde tu computador (Windows, Mac o Linux). Cuenta con reproductor propio, control de volumen y botón rápido para reproducir aun con la tarjeta minimizada.",
    "catalog.f5.title": "Hasta 10 fotografías por recuerdo",
    "catalog.f5.desc": "Crea un álbum vivo de hasta 10 fotos en alta resolución por cada evento. Las fotos rotan suavemente en el fondo de tu pantalla a la velocidad que tú elijas.",
    "catalog.f6.title": "Hasta 10 recuerdos y fechas independientes",
    "catalog.f6.desc": "Guarda hasta 10 aniversarios, cumpleaños, viajes o metas a la vez. Cada recuerdo tiene sus propias fotos, sus propios colores, sus propias alarmas y su propia música en pestañas fáciles de alternar.",
    "catalog.f7.title": "10 estilos de letra para cada emoción",
    "catalog.f7.desc": "Cambia la tipografía con un solo clic: letras románticas, elegantes de oro, manuscritas íntimas, divertidas de fiesta, deportivas de adrenalina o modernas minimalistas.",
    "catalog.f8.title": "Opacidad del fondo regulable al 100%",
    "catalog.f8.desc": "Controla la transparencia del recuadro. Al 0% el fondo es totalmente invisible y los números flotan mágicamente en el aire directamente sobre tus fotos familiares.",
    "catalog.f9.title": "Arrastra y ubica en cualquier rincón",
    "catalog.f9.desc": "Mueve la tarjeta flotante a cualquier lugar de la pantalla para que nunca tape los rostros o detalles importantes de tus fotografías.",
    "catalog.f10.title": "100% privado y seguro (Local-First)",
    "catalog.f10.desc": "Tus fotos, canciones y notas nunca se suben a internet ni a servidores de terceros. Todo queda guardado bajo llave en la base de datos interna de tu propio dispositivo.",
    "catalog.footer_btn_buy": "Pagar con Webpay ($5.000 CLP / ~5 USD)",
    "catalog.footer_btn_sim": "Probar Simulador Interactivo",
    "catalog.footer_btn_live": "Probar App en Vivo",

    // Portal Teaser on Landing Page
    "labs.teaser.badge": "Ecosistema de Software & R&D",
    "labs.teaser.title": "Explora Labs&Drops",
    "labs.teaser.desc": "Ingresa a un nuevo universo de aplicaciones Local-First, sidecars de voz para Linux y laboratorios interactivos de ingeniería.",
    "labs.teaser.btn": "Entrar a Labs&Drops 🚀",

    // Contact
    "contact.title": "Ubicación, Movilidad y Contacto",
    "contact.open": "Abierto a oportunidades remotas internacionales.",
    "contact.email_label": "Correo:",

    // Footer & Chilean Legal Notice
    "footer.rights": "© 2026 Marcelo Poblete | mrclo.devops",
    "footer.version": "Portfolio v1.8.0 · Labs&Drops & Cyber-Aurora Ecosystem",
    "legal.terms_link": "Ver Términos de Servicio & Política de Licencias Digitales (SERNAC / Ley 19.496)",
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
    "nav.background": "Professional Background",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.labs_drops": "Labs&Drops",
    "nav.contact": "Location & Contact",
    "contact.unified.title": "Location, Mobility & Contact",
    "contact.unified.desc": "Available for remote international opportunities, global distributed teams, and relocation options.",
    "contact.loc.title": "Based in Chile 🇨🇱",
    "contact.loc.badge": "Timezone CLT (UTC-3 / UTC-4)",
    "contact.reach.title": "Direct Channels",

    // Header
    "header.role": "Senior Integration Engineer | DevOps | API Reliability",
    "header.bio1": "Chile-based engineer with experience supporting API-driven SaaS platforms, distributed systems, cloud environments and production reliability.",
    "header.bio2": "Focused on reliable integrations, incident response and scalable technology solutions.",
    "header.bio3": "Tech content creator, specialized course instructor, and indie application builder crafting Local-First software and hands-on engineering labs.",
    "header.btn.resume": "Download Resume",
    "header.btn.contact": "Contact Me",
    "header.btn.whatsapp": "WhatsApp",

    // Background Page
    "background.title": "Professional Background",
    "background.subtitle": "Software integration engineering, distributed systems, production reliability, and technical stack.",

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
    "exp.rootly.badge": "Incident Management & SRE",
    "exp.rootly.role": "Senior Support & Integration Engineer",
    "exp.rootly.meta": "Sep 2024 — Feb 2026<br>Canada · Remote",
    "exp.rootly.desc": "Supported enterprise SaaS customers by troubleshooting API integrations, production incidents and cloud infrastructure while collaborating with Engineering and Product teams.",
    "exp.rootly.b1": "Troubleshooting REST APIs and webhook integrations.",
    "exp.rootly.b2": "Production incident response and root cause analysis.",
    "exp.rootly.b3": "Supported cloud-based SaaS environments.",
    "exp.rootly.b4": "Collaborated with Engineering teams on technical issues.",

    // PagerDuty
    "exp.pd.badge": "Cloud Incident Response",
    "exp.pd.role": "Technical Support Engineer",
    "exp.pd.meta": "2022 — 2024<br>United States · Remote",
    "exp.pd.desc": "Supported global customers using cloud-based incident management solutions, troubleshooting technical issues, integrations and production environments.",
    "exp.pd.b1": "Troubleshot SaaS platform issues and customer integrations.",
    "exp.pd.b2": "Analyzed logs and technical data to identify root causes.",
    "exp.pd.b3": "Supported API integrations and technical investigations.",
    "exp.pd.b4": "Collaborated with Engineering teams across global environments.",

    // Pago Fácil / EVO Payments
    "exp.pf.badge": "Payment Gateway & FinTech",
    "exp.pf.role": "Integration Support Engineer",
    "exp.pf.meta": "Jan 2020 — Jan 2023<br>Chile · Remote",
    "exp.pf.desc": "Supported high-volume payment gateway integrations in production environments, ensuring reliable transaction processing and troubleshooting complex integration issues.",
    "exp.pf.b1": "Supported high-volume payment gateway integrations in production environments.",
    "exp.pf.b2": "Performed SQL analysis and log investigations to resolve reconciliation discrepancies and transaction failures.",
    "exp.pf.b3": "Investigated API contract mismatches, webhook delivery issues and payload validation errors.",
    "exp.pf.b4": "Refined retry strategies and fault-isolation practices to support reliable payment processing.",
    "exp.pf.b5": "Collaborated with Engineering and Operations teams during production releases.",

    // Instituto Chileno Británico de Cultura (ICBC)
    "exp.icbc.badge": "Teaching Leadership & Technical Coaching",
    "exp.icbc.company": "Instituto Chileno Británico de Cultura",
    "exp.icbc.role": "English Language Professor & Technical Communication Coach",
    "exp.icbc.meta": "15+ Years Teaching Legacy<br>Chile · On-site & Online",
    "exp.icbc.desc": "Over 15 years dedicated to teaching English across diverse age groups: children, teens, university students, and senior tech professionals. Specialized in C1 operational fluency, phonetic nuance, and cross-cultural communication for distributed engineering teams.",
    "exp.icbc.b1": "Comprehensive English language pedagogy across all learning stages: young learners, adolescents, academic students, and high-performance engineers.",
    "exp.icbc.b2": "Technical communication coaching, international interview preparation, and facilitating global standups and blameless post-mortems without language barriers.",
    "exp.icbc.b3": "Preparation for standardized international certifications (Cambridge, IELTS, TOEFL) with focus on advanced professional fluency (C1).",
    "exp.icbc.b4": "Foundational pedagogical background enabling natural fluency, cross-cultural nuance, and frictionless technical alignment with North American and European teams.",

    // Labs&Drops Universe & Modal
    "labs.nav.live": "R&D ECOSYSTEM",
    "labs.hero.badge": "Living Software & Hardware Laboratory",
    "labs.hero.title": "Where Code Evolves Into Living Products",
    "labs.hero.subtitle": "An independent ecosystem of client-side applications, hardware voice sidecars, and production incident response labs. Engineered with Local-First architecture, absolute privacy, and zero third-party telemetry.",
    "labs.pill.privacy": "100% Local-First",
    "labs.pill.db": "Browser-Native IndexedDB",
    "labs.pill.perf": "60 FPS Ambient Rendering",
    "labs.pill.telemetry": "Zero Tracking / No Cookies",
    "labs.tab.all": "All Drops",
    "labs.tab.apps": "Software & Apps",
    "labs.tab.voice": "Voice & AI Hardware",
    "labs.tab.academy": "Incident Labs",

    "labs.title": "Labs&Drops",
    "labs.intro": "Software applications, interactive voice engineering, and hands-on learning tracks built with privacy-first and client-side architecture.",
    "labs.d1.badge": "Multiplatform App",
    "labs.d1.title": "Heartbeats Memories",
    "labs.d1.sub": "Live Countdown & Shared Emotional Milestones",
    "labs.d1.desc": "An ambient high-resolution live countdown visualizer synchronized with shared heartbeats and photo carousel. Functions as a live desktop wallpaper (Linux/macOS/Windows) or mobile PWA lockscreen, protecting your privacy without external trackers.",
    "labs.d1.platforms": "Desktop Wallpaper · Web PWA · Mobile Lockscreen",
    "labs.d1.support": "Support: support@mrclo.dev",
    "labs.d1.price_badge": "Lifetime Updates Included",
    "labs.d1.price_hook": "💡 <em>Unlike other apps, no monthly fees.</em>",
    "labs.d1.price_usd": "(Approx. $5 USD)",
    "labs.d1.btn_buy": "Pay with Webpay ($5,000 CLP)",
    "labs.d1.btn_buy_alt": "Pay with Webpay",
    "labs.d1.qr_heading": "Pay with QR",
    "labs.d1.qr_subtext": "Scan with your mobile banking app or digital wallet.",
    "labs.d1.link_alt": "Or pay directly in this browser",
    "labs.d1.btn_catalog": "View Feature Catalog",
    "labs.d1.btn_live_real": "Try Real Live App (v1.5.0 Full Screen)",
    "labs.d1.trust_note": "Encrypted Transbank Checkout · Support: support@mrclo.dev",
    "labs.d1.terms_link": "License Terms",
    "labs.d1.mobile_terms_note": "By paying you accept the",
    "labs.d1.btn_demo": "Try Interactive Demo",
    "labs.d1.btn_web": "Launch Web App",
    "labs.d1.btn_repo": "View Repository",

    "labs.d2.badge": "Voice & AI Hardware",
    "labs.d2.title": "Bilingual Shadowing & Voice Engine",
    "labs.d2.sub": "Global Hotkey Audio Assistant for English Fluency",
    "labs.d2.desc": "Real-time bilingual mirror reader and multi-accent carousel (US, UK, NZ, AU, Chile, Colombia) featuring zero-latency hot translation to train active listening and pronunciation directly from your workstation.",
    "labs.d2.platforms": "Linux Sidecar · Global Hotkeys (Alt + M / Alt + L) · Streaming Audio",
    "labs.d2.btn_demo": "Request Early Access",
    "labs.d2.btn_inquire": "Inquire Architecture / Collaborate",

    "labs.d3.badge": "Incident Labs",
    "labs.d3.title": "Incident Response & Technical English",
    "labs.d3.sub": "P0/P1 Outage Simulations & Global Standup Practice",
    "labs.d3.desc": "Hands-on training designed to tackle production outages, lead blameless post-mortems, and command global standups and technical interviews in professional English.",
    "labs.d3.platforms": "P0/P1 Incident Drills · Post-Mortems · Global Standups",
    "labs.d3.btn_contact": "Contact the Instructor",
    "labs.d3.btn_cv": "View Instructor Background",

    "labs.d4.badge": "In Development · Q4 2026",
    "labs.d4.title": "Synthetic API Probes & Canary",
    "labs.d4.sub": "Lightweight Distributed Latency Probe & API Monitoring",
    "labs.d4.desc": "Edge telemetry agent evaluating API contracts and transactional response latencies with direct webhook alerting and zero cloud bloat.",
    "labs.d4.platforms": "Edge Probe · Webhooks · Go/Rust Micro-agent",
    "labs.d4.status": "Upcoming Lab Release",

    // Device Simulator Modal & Multi-Event
    "modal.btn.desktop": "Desktop Mode (Wallpaper Desktop)",
    "modal.btn.mobile": "Mobile Mode (Wallpaper PWA)",
    "modal.pos.label": "Widget Position:",
    "modal.pos.top_left": "↖ Top-Left",
    "modal.pos.center": "⊙ Center",
    "modal.pos.bottom_right": "↘ Bottom-Right",
    "modal.palette.label": "Widget Color:",
    "modal.font.label": "Font:",
    "modal.opacity.label": "Opacity:",
    "modal.scale.label": "Scale:",
    "modal.audio.btn": "Local Audio",
    "modal.alarms.badge": "3 Alarms (7d, 1d, 1h)",
    "modal.card.days": "Days",
    "modal.card.hours": "Hours",
    "modal.card.mins": "Mins",
    "modal.card.secs": "Secs",
    "modal.card.beats": "shared heartbeats",
    "modal.btn.buy": "Pay with Webpay ($5,000 CLP)",
    "modal.btn.support": "Support: support@mrclo.dev",
    "demo.tab.ev1": "Anniversary",
    "demo.tab.ev2": "Dream Trip",
    "demo.tab.ev3": "Graduation",
    "demo.ev1.title": "Special Anniversary",
    "demo.ev2.title": "Dream Trip to Patagonia",
    "demo.ev3.title": "Graduation & Life Milestone",

    // Feature Catalog Modal (English)
    "catalog.title": "✨ Feature Catalog — Heartbeats Memories",
    "catalog.badge": "v1.5.0 • Lifetime License",
    "catalog.price_usd": "(Approx. $5 USD)",
    "catalog.lifetime_pill": "Lifetime Updates Included",
    "catalog.hero_hook": "💡 <strong>Unlike other apps, no monthly fees.</strong> You purchase your license once and it is yours forever, with continuous updates included.",
    "catalog.hero_btn_buy": "Pay with Webpay ($5,000 CLP / ~5 USD)",
    "catalog.f1.title": "Freely scale and resize the card",
    "catalog.f1.desc": "Adjust the card size to keep it subtle and discreet in a screen corner or bold and prominent on mobile. On desktop, drag the bottom corner with your mouse; on mobile, pinch with two fingers.",
    "catalog.f2.title": "Up to 10 zodiac gem colors",
    "catalog.f2.desc": "Customize borders and glow halos with 10 gem-inspired hues (Ruby, Carnelian, Citrine, Jade, Turquoise, Aquamarine, Sapphire, Amethyst, Rose Quartz, and Garnet), or pick any custom shade with the free color picker.",
    "catalog.f3.title": "Up to 3 retrospective countdown alarms",
    "catalog.f3.desc": "Set up to 3 alerts before your milestone arrives (for example: 1 month before, 1 week before, or 1 hour before) so you can plan surprises, gifts, or travel well ahead of time.",
    "catalog.f4.title": "Custom audio and music from your device",
    "catalog.f4.desc": "Upload your favorite song or voice memo in MP3, WAV, or M4A directly from your phone (Android or iPhone) or computer (Windows, Mac, or Linux). Features built-in playback, volume slider, and instant play even when minimized.",
    "catalog.f5.title": "Up to 10 photos per milestone",
    "catalog.f5.desc": "Create an ambient live album with up to 10 high-resolution photos per event. Photos cycle smoothly in your screen background at your preferred interval.",
    "catalog.f6.title": "Up to 10 independent memories and events",
    "catalog.f6.desc": "Store up to 10 anniversaries, birthdays, travels, or life goals simultaneously. Each milestone holds its own photos, color palette, alarms, and soundtrack with one-click tab switching.",
    "catalog.f7.title": "10 expressive font styles",
    "catalog.f7.desc": "Switch fonts with a single click: romantic cursive, golden elegance, intimate handwriting, playful party, adrenaline sports, or modern minimalist styles.",
    "catalog.f8.title": "Full background opacity control (0% to 100%)",
    "catalog.f8.desc": "Adjust the card background transparency. At 0%, the card background disappears completely so countdown numbers float gracefully over your personal photos.",
    "catalog.f9.title": "Drag and place anywhere on screen",
    "catalog.f9.desc": "Freely drag and reposition the floating card anywhere across your screen so key faces and scenery in your photos are never blocked.",
    "catalog.f10.title": "100% private and secure (Local-First)",
    "catalog.f10.desc": "Your photos, audio files, and notes are never uploaded to the internet or third-party cloud servers. Everything is stored securely within your own device internal database.",
    "catalog.footer_btn_buy": "Pay with Webpay ($5,000 CLP / ~5 USD)",
    "catalog.footer_btn_sim": "Try Interactive Simulator",
    "catalog.footer_btn_live": "Launch Live App",

    // Portal Teaser on Landing Page
    "labs.teaser.badge": "Software & R&D Ecosystem",
    "labs.teaser.title": "Explore Labs&Drops",
    "labs.teaser.desc": "Step into a new universe of Local-First applications, Linux voice sidecars, and interactive engineering labs.",
    "labs.teaser.btn": "Enter Labs&Drops Universe 🚀",

    // Contact
    "contact.title": "Location, Mobility & Contact",
    "contact.open": "Open to remote international opportunities.",
    "contact.email_label": "Email:",

    // Footer & Chilean Dual-Language Legal Notice
    "footer.rights": "© 2026 Marcelo Poblete | mrclo.devops",
    "footer.version": "Portfolio v1.8.0 · Labs&Drops & Cyber-Aurora Ecosystem",
    "legal.terms_link": "View Terms of Service & Digital License Agreement (SERNAC / Law 19,496)",
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
