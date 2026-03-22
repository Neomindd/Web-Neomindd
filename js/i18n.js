const TRANSLATIONS = {
  es: {
    // Nav
    'nav.inicio':     'Inicio',
    'nav.nosotros':   'Nosotros',
    'nav.soluciones': 'Soluciones',
    'nav.portafolio': 'Portafolio',
    'nav.contacto':   'Contacto',

    // Hero
    'hero.title':    'Tecnología que <span class="texto-gradiente">transforma</span>',
    'hero.subtitle': 'Creación de sitios web, aplicaciones y soluciones digitales para hacer crecer tu negocio.',
    'hero.cta':      'Hablemos',

    // Nosotros
    'nm.tag':   '// SOBRE NEOMIND',
    'nm.title': 'Tecnología que<br><span class="texto-gradiente">resuelve problemas reales</span>',
    'nm.sub':   'No vendemos páginas web. Construimos herramientas digitales que hacen que tu negocio trabaje más inteligente.',

    // Historia
    'origen.tag':   'ORIGEN',
    'origen.title': '¿Por qué existe Neomind?',
    'origen.text':  'Neomind nació de una pregunta simple: <strong>¿por qué tantas empresas siguen haciendo manualmente cosas que una herramienta digital podría hacer sola?</strong> Vimos negocios perdiendo horas en tareas repetitivas, con páginas lentas o sin presencia digital. Decidimos hacer algo al respecto.',

    'vision.tag':   'VISIÓN',
    'vision.title': 'A dónde vamos',
    'vision.text':  'Queremos ser la agencia de referencia para <strong>pequeñas y medianas empresas</strong> que quieren dar el salto digital, con tecnología de alto nivel, al alcance de cualquier negocio.',

    'mision.tag':   'MISIÓN',
    'mision.title': 'Lo que hacemos cada día',
    'mision.text':  'Construimos webs y aplicaciones que <strong>reducen tiempos de trabajo, automatizan procesos y abren nuevos canales de venta.</strong> Cada proyecto que entregamos tiene que resolver un problema real, cargar rápido, verse bien en cualquier pantalla y ser seguro desde el primer día.',

    // Métricas
    'met.proyectos':     'PROYECTOS ENTREGADOS',
    'met.respuesta':     'TIEMPO DE RESPUESTA',
    'met.intermediarios':'INTERMEDIARIOS',
    'met.carga':         'CARGA PROMEDIO',

    // Proceso
    'proceso.title': 'Cómo <span class="texto-gradiente">trabajamos</span>',
    'proceso.sub':   'Un proceso claro de principio a fin. Sabés en todo momento en qué etapa está tu proyecto.',
    'paso1.titulo': 'Reunión inicial',
    'paso1.desc':   'Entendemos tu negocio, objetivos y lo que necesitás resolver',
    'paso2.titulo': 'Propuesta',
    'paso2.desc':   'Alcance, tecnologías, plazo y precio. Sin letras chicas',
    'paso3.titulo': 'Diseño',
    'paso3.desc':   'Wireframes y diseño visual. Apruebas antes de comenzar a crear.',
    'paso4.titulo': 'Desarrollo',
    'paso4.desc':   'Código limpio, seguro y rápido. Con acceso para que veas el avance.',
    'paso5.titulo': 'Revisión y aprobación',
    'paso5.desc':   'Revisás el proyecto completo y aprueba antes del lanzamiento.',
    'paso6.titulo': 'Entrega',
    'paso6.desc':   'Deploy, dominio, HTTPS y siete días de soporte post-lanzamiento incluido',

    // Diferenciadores
    'dif.title': 'Por qué <span class="texto-gradiente">elegirnos</span>',
    'dif.sub':   'Lo que nos diferencia no son las palabras, son las decisiones que tomamos en cada proyecto.',
    'dif1.title': 'Hablas con quien hace el trabajo',
    'dif1.text':  'Sin account managers ni cadenas de correos. La persona que te responde es la misma que diseña y desarrolla tu proyecto.',
    'dif2.title': 'Seguridad desde el día uno',
    'dif2.text':  'HTTPS, protección contra ataques, código sin vulnerabilidades. No es un extra — es parte del estándar de cada proyecto.',
    'dif3.title': 'Funciona en cualquier pantalla',
    'dif3.text':  'Cada web que entregamos es 100% responsiva. Se ve igual de bien en un celular viejo que en un monitor 4K.',
    'dif4.title': 'Velocidad que se nota',
    'dif4.text':  'Webs que cargan en menos de 2 segundos. Porque la velocidad afecta directamente tus ventas y tu posicionamiento en Google.',
    'dif5.title': 'Código que puedes mantener',
    'dif5.text':  'No dejamos código que nadie puede tocar después. Todo documentado, limpio y fácil de escalar cuando tu negocio crezca.',
    'dif6.title': 'Enfocados en resultados',
    'dif6.text':  'Una web bonita que no convierte no sirve. Cada decisión está orientada a que tu sitio trabaje para tu negocio.',

    // CTA Nosotros
    'nm.cta.title': '¿Tu negocio necesita<br><span class="texto-gradiente">dar el salto digital?</span>',
    'nm.cta.sub':   'Cuentanos qué necesitas. Sin formularios complicados, sin esperas. Te respondemos en menos de 24 horas.',
    'nm.cta.btn1':  'Empezar un proyecto →',
    'nm.cta.btn2':  'Ver nuestro trabajo',

    // Soluciones
    'sol.title':       'Nuestras <span class="texto-gradiente">Soluciones</span>',
    'sol.sub':         'Todo lo que necesitas para crecer en el mundo digital',
    'sol.card1.label': 'Diseño & Web',
    'sol.card1.title': 'Sitios Web',
    'sol.card1.text':  'Landing pages, portafolios y sitios corporativos modernos y rápidos.',
    'sol.card2.label': 'Desarrollo',
    'sol.card2.title': 'Aplicaciones Web',
    'sol.card2.text':  'Sistemas a medida con base de datos, autenticación y lógica de negocio.',
    'sol.card3.label': 'Conectividad',
    'sol.card3.title': 'Integraciones',
    'sol.card3.text':  'Conectamos tu negocio con APIs, pagos, CRMs y herramientas externas.',
    'sol.card4.label': 'Innovación',
    'sol.card4.title': 'Inteligencia Artificial',
    'sol.card4.text':  'Incorporamos IA como herramienta de trabajo, no como atajo. El criterio y las decisiones siempre son de un profesional.',

    // Portafolio
    'port.title': 'Nuestro <span class="texto-gradiente">Portafolio</span>',
    'port.sub':   'Proyectos que hablan por sí solos',

    // Contacto
    'contact.tag':      '// CONTACTO',
    'contact.title':    '¿Tienes un proyecto<br><span class="texto-gradiente">en mente?</span>',
    'contact.sub':      'Cuentanos qué necesitás. Sin formularios complicados, sin esperas. Te respondemos en menos de 24 horas.',
    'contact.response': 'Respuesta en menos de 24h',

    // Formulario
    'form.nombre.label':       'Nombre',
    'form.nombre.placeholder': 'Tu nombre',
    'form.email.label':        'Email',
    'form.email.placeholder':  'tu@correo.com',
    'form.servicio.label':     '¿En qué podemos ayudarte?',
    'form.servicio.default':   'Seleccioná un servicio',
    'form.servicio.web':       'Sitio Web',
    'form.servicio.app':       'Aplicación Web',
    'form.servicio.api':       'Integración / API',
    'form.servicio.ia':        'Inteligencia Artificial',
    'form.servicio.otro':      'Otro',
    'form.mensaje.label':      'Mensaje',
    'form.mensaje.placeholder':'Cuentanos un poco sobre tu proyecto...',
    'form.btn':                'Enviar mensaje',
    'form.sending':            'Enviando...',
    'form.success':            '¡Mensaje enviado! Te respondemos en menos de 24h.',
    'form.error.required':     'Completa todos los campos antes de enviar.',
    'form.error.email':        'Ingresa un correo electrónico válido.',
    'form.error.send':         'Hubo un error al enviar. Intenta de nuevo o escribinos directamente.',

    // Footer
    'footer.tagline': 'Tecnología y Desarrollo',
  },

  en: {
    // Nav
    'nav.inicio':     'Home',
    'nav.nosotros':   'About',
    'nav.soluciones': 'Solutions',
    'nav.portafolio': 'Portfolio',
    'nav.contacto':   'Contact',

    // Hero
    'hero.title':    'Technology that <span class="texto-gradiente">transforms</span>',
    'hero.subtitle': 'Web development, apps and digital solutions to grow your business.',
    'hero.cta':      "Let's talk",

    // Nosotros
    'nm.tag':   '// ABOUT NEOMIND',
    'nm.title': 'Technology that<br><span class="texto-gradiente">solves real problems</span>',
    'nm.sub':   "We don't sell websites. We build digital tools that make your business work smarter.",

    // Historia
    'origen.tag':   'ORIGIN',
    'origen.title': 'Why does Neomind exist?',
    'origen.text':  'Neomind was born from a simple question: <strong>why do so many businesses still do manually what a digital tool could handle on its own?</strong> We saw businesses losing hours on repetitive tasks, with slow pages or no digital presence. We decided to do something about it.',

    'vision.tag':   'VISION',
    'vision.title': 'Where we are going',
    'vision.text':  'We want to be the go-to agency for <strong>small and medium-sized businesses</strong> that want to make the digital leap, with high-level technology within reach of any business.',

    'mision.tag':   'MISSION',
    'mision.title': 'What we do every day',
    'mision.text':  'We build websites and applications that <strong>reduce working hours, automate processes and open new sales channels.</strong> Every project we deliver must solve a real problem, load fast, look great on any screen and be secure from day one.',

    // Métricas
    'met.proyectos':     'PROJECTS DELIVERED',
    'met.respuesta':     'RESPONSE TIME',
    'met.intermediarios':'MIDDLEMEN',
    'met.carga':         'AVERAGE LOAD',

    // Proceso
    'proceso.title': 'How we <span class="texto-gradiente">work</span>',
    'proceso.sub':   'A clear process from start to finish. You know at every moment what stage your project is in.',
    'paso1.titulo': 'Initial meeting',
    'paso1.desc':   'We understand your business, goals and what you need to solve',
    'paso2.titulo': 'Proposal',
    'paso2.desc':   'Scope, technologies, timeline and price. No fine print.',
    'paso3.titulo': 'Design',
    'paso3.desc':   'Wireframes and visual design. You approve before we start building.',
    'paso4.titulo': 'Development',
    'paso4.desc':   'Clean, secure and fast code. With access so you can track progress.',
    'paso5.titulo': 'Review & approval',
    'paso5.desc':   'You review the complete project and approve before launch.',
    'paso6.titulo': 'Delivery',
    'paso6.desc':   'Deploy, domain, HTTPS and seven days of post-launch support included.',

    // Diferenciadores
    'dif.title': 'Why <span class="texto-gradiente">choose us</span>',
    'dif.sub':   "What sets us apart isn't words — it's the decisions we make on every project.",
    'dif1.title': 'You talk directly to who does the work',
    'dif1.text':  'No account managers or email chains. The person who answers you is the same one who designs and develops your project.',
    'dif2.title': 'Security from day one',
    'dif2.text':  "HTTPS, attack protection, vulnerability-free code. It's not an extra — it's part of the standard on every project.",
    'dif3.title': 'Works on any screen',
    'dif3.text':  'Every website we deliver is 100% responsive. Looks just as good on an old phone as on a 4K monitor.',
    'dif4.title': 'Speed you can feel',
    'dif4.text':  'Websites that load in under 2 seconds. Because speed directly impacts your sales and Google ranking.',
    'dif5.title': 'Code you can maintain',
    'dif5.text':  "We don't leave code no one can touch later. Everything documented, clean and easy to scale as your business grows.",
    'dif6.title': 'Focused on results',
    'dif6.text':  "A pretty website that doesn't convert is useless. Every decision is aimed at making your site work for your business.",

    // CTA Nosotros
    'nm.cta.title': 'Does your business need<br><span class="texto-gradiente">to make the digital leap?</span>',
    'nm.cta.sub':   'Tell us what you need. No complicated forms, no waiting. We respond in under 24 hours.',
    'nm.cta.btn1':  'Start a project →',
    'nm.cta.btn2':  'See our work',

    // Soluciones
    'sol.title':       'Our <span class="texto-gradiente">Solutions</span>',
    'sol.sub':         'Everything you need to grow in the digital world',
    'sol.card1.label': 'Design & Web',
    'sol.card1.title': 'Websites',
    'sol.card1.text':  'Modern and fast landing pages, portfolios and corporate sites.',
    'sol.card2.label': 'Development',
    'sol.card2.title': 'Web Applications',
    'sol.card2.text':  'Custom systems with databases, authentication and business logic.',
    'sol.card3.label': 'Connectivity',
    'sol.card3.title': 'Integrations',
    'sol.card3.text':  'We connect your business with APIs, payments, CRMs and external tools.',
    'sol.card4.label': 'Innovation',
    'sol.card4.title': 'Artificial Intelligence',
    'sol.card4.text':  'We integrate AI as a work tool, not a shortcut. Judgement and decisions always belong to a professional.',

    // Portafolio
    'port.title': 'Our <span class="texto-gradiente">Portfolio</span>',
    'port.sub':   'Projects that speak for themselves',

    // Contacto
    'contact.tag':      '// CONTACT',
    'contact.title':    'Do you have a project<br><span class="texto-gradiente">in mind?</span>',
    'contact.sub':      "Tell us what you need. No complicated forms, no waiting. We'll respond in under 24 hours.",
    'contact.response': 'Response in under 24h',

    // Formulario
    'form.nombre.label':       'Name',
    'form.nombre.placeholder': 'Your name',
    'form.email.label':        'Email',
    'form.email.placeholder':  'you@email.com',
    'form.servicio.label':     'How can we help you?',
    'form.servicio.default':   'Select a service',
    'form.servicio.web':       'Website',
    'form.servicio.app':       'Web Application',
    'form.servicio.api':       'Integration / API',
    'form.servicio.ia':        'Artificial Intelligence',
    'form.servicio.otro':      'Other',
    'form.mensaje.label':      'Message',
    'form.mensaje.placeholder':'Tell us a bit about your project...',
    'form.btn':                'Send message',
    'form.sending':            'Sending...',
    'form.success':            'Message sent! We\'ll respond in under 24h.',
    'form.error.required':     'Please fill in all fields before submitting.',
    'form.error.email':        'Please enter a valid email address.',
    'form.error.send':         'There was an error sending your message. Please try again or contact us directly.',

    // Footer
    'footer.tagline': 'Technology & Development',
  },
};

let currentLang = localStorage.getItem('lang') || 'es';

function t(key) {
  return TRANSLATIONS[currentLang][key] ?? key;
}

function applyLang(lang) {
  const tr = TRANSLATIONS[lang];

  // Texto plano
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = tr[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  // HTML (headings con spans de color, párrafos con <strong>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = tr[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  // Placeholders de inputs y textarea
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = tr[el.dataset.i18nPlaceholder];
    if (val !== undefined) el.placeholder = val;
  });

  document.documentElement.lang = lang;
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';

  currentLang = lang;
  localStorage.setItem('lang', lang);
}

window.t = t;

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      applyLang(currentLang === 'es' ? 'en' : 'es');
    });
  }
  applyLang(currentLang);
});
