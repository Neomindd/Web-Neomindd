// ══════════════════════════════════════════════════════════
// CONTACTO — EmailJS
// Las credenciales están en js/config.js (no se sube a GitHub)
// ══════════════════════════════════════════════════════════

(function () {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  const form    = document.getElementById('contacto-form');
  const status  = document.getElementById('form-status');
  const btn     = form ? form.querySelector('.form-btn') : null;
  const btnText = form ? form.querySelector('.form-btn-text') : null;

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validacion basica
    const nombre   = form.nombre.value.trim();
    const email    = form.email.value.trim();
    const servicio = form.servicio.value;
    const mensaje  = form.mensaje.value.trim();

    if (!nombre || !email || !servicio || !mensaje) {
      showStatus(window.t('form.error.required'), 'err');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus(window.t('form.error.email'), 'err');
      return;
    }

    // Estado de carga
    btn.disabled = true;
    btnText.textContent = window.t('form.sending');
    hideStatus();

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        nombre,
        email,
        servicio,
        mensaje,
      });

      showStatus(window.t('form.success'), 'ok');
      form.reset();
    } catch (err) {
      showStatus(window.t('form.error.send'), 'err');
    } finally {
      btn.disabled = false;
      btnText.textContent = window.t('form.btn');
    }
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className   = 'form-status ' + type;
  }

  function hideStatus() {
    status.textContent = '';
    status.className   = 'form-status';
  }
})();
