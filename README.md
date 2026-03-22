# NeoMind — Tecnología y Desarrollo

Sitio web de presentación para **NeoMind**, agencia de desarrollo web y soluciones digitales. Página estática de una sola vista con animaciones interactivas, formulario de contacto y soporte bilingüe (ES / EN).

---

## Características

- Diseño oscuro con animación de lluvia binaria interactiva (click / tap para explosión de partículas)
- Fondo animado con red de nodos en la sección Nosotros
- Sistema de traducción ES / EN sin librerías externas, con persistencia en `localStorage`
- Formulario de contacto integrado con **EmailJS**
- 100% responsivo — adaptado para móvil, tablet y escritorio
- Animaciones pausadas automáticamente cuando la pestaña no está visible (ahorro de CPU)
- Script de EmailJS cargado con hash de integridad SRI

---

## Estructura del proyecto

```
Neomind/
├── index.html
├── css/
│   └── base.css
├── js/
│   ├── i18n.js          # Sistema de traducción ES/EN
│   ├── main.js          # Animación de fondo sección Nosotros
│   ├── binary-bg.js     # Lluvia binaria animada
│   └── contacto.js      # Lógica del formulario con EmailJS
├── img/
│   ├── Logo page.png
│   ├── Logo page NAVBAR.png
│   ├── Logo RRSS.png
│   ├── LogoRRSS edit.png
│   ├── Sitios web.jpg
│   ├── Aplicaciones.jpg
│   ├── Integraciones.jpg
│   └── inteligencia artificial.jpg
└── backend/
    ├── .env.example
    └── requirements.txt
```

---

## Configuración del formulario de contacto

El formulario usa [EmailJS](https://www.emailjs.com/) para enviar mensajes sin backend.

1. Crear una cuenta en EmailJS
2. Crear un **Service** y un **Template**
3. Abrir `js/contacto.js` y reemplazar los valores:

```js
const EMAILJS_PUBLIC_KEY  = 'TU_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'TU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID';
```

---

## Uso local

No requiere instalación. Abrir `index.html` directamente en el navegador o usar un servidor local:

```bash
# Con VS Code — extensión Live Server
# Click derecho en index.html → "Open with Live Server"

# O con Python
python -m http.server 5500
```

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura |
| CSS3 | Estilos y animaciones |
| JavaScript (Vanilla) | Animaciones, traducción, formulario |
| Canvas API | Lluvia binaria y red de nodos |
| EmailJS | Envío de formulario de contacto |
| Google Fonts | Tipografías Sora y DM Sans |

---

## Seguridad

- Script de EmailJS cargado con **SRI** (Subresource Integrity) para verificar integridad del archivo externo
- Validación de formulario en el cliente antes del envío
- Sin dependencias de terceros salvo EmailJS y Google Fonts

---

## Licencia

© 2025 NeoMind. Todos los derechos reservados.
