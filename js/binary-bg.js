(function () {
  const trail = document.getElementById('trail');
  const cv    = document.getElementById('cv');
  if (!trail || !cv) return;

  const tCtx = trail.getContext('2d');
  const ctx  = cv.getContext('2d');

  let W, H;
  const NUM_COLS = 40;   // reducido de 55 → menos fillText por frame

  const temas = [
    { head: 'rgba(191,90,242,',  body: 'rgba(124,58,237,',  dim: 'rgba(80,30,180,'  },
    { head: 'rgba(255,45,120,',  body: 'rgba(192,38,211,',  dim: 'rgba(120,20,140,' },
    { head: 'rgba(0,245,255,',   body: 'rgba(0,180,200,',   dim: 'rgba(0,100,140,'  },
    { head: 'rgba(167,139,250,', body: 'rgba(124,58,237,',  dim: 'rgba(60,30,120,'  }
  ];

  const particleColors = ['255,45,120', '191,90,242', '0,245,255', '255,30,100', '167,139,250'];
  const palabras       = ['ACCESS', '01001110', 'DECRYPT', 'NEOMIND', 'RUN://', 'COMPILE', 'EXECUTE', 'BREACH'];
  const wordColors     = ['#FF2D78', '#BF5AF2', '#00F5FF', '#FF1F6E', '#A78BFA'];

  let cols      = [];
  let particles = [];
  let rings     = [];
  let shakeX = 0, shakeY = 0, shakeT = 0;
  let fogGrad   = null;
  let lastTime  = 0;
  let isRunning = true;
  const FRAME_GAP = 1000 / 30; // cap a 30fps — mitad de CPU, lluvia igual de fluida

  function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function rand(a, b)    { return Math.random() * (b - a) + a; }

  // ── COLUMNS ──────────────────────────────────────────────────────────────────
  function makeCol(i) {
    const tema      = temas[randInt(0, 3)];
    const fontSize  = 9 + Math.floor(Math.random() * 9);
    const streamLen = randInt(8, 28);
    const digits    = Array.from({ length: streamLen }, () => randInt(0, 1).toString());
    const timers    = Array.from({ length: streamLen }, () => randInt(10, 40));
    const ox        = (W / NUM_COLS) * i + (W / NUM_COLS) / 2;

    return {
      ox, x: ox,
      y: -rand(H * 0.1, H * 1.2),
      vx: 0,
      vy: rand(0.6, 2.2),
      baseSpeed: 1.2 + Math.random() * 3.2,
      fontSize, streamLen, digits, timers, tema
    };
  }

  function initCols() {
    cols = [];
    for (let i = 0; i < NUM_COLS; i++) cols.push(makeCol(i));
  }

  function buildFog() {
    fogGrad = ctx.createRadialGradient(W / 2, H / 2, H * 0.04, W / 2, H / 2, H * 0.55);
    fogGrad.addColorStop(0,   'rgba(2,5,16,0.75)');
    fogGrad.addColorStop(0.3, 'rgba(2,5,16,0.42)');
    fogGrad.addColorStop(1,   'rgba(2,5,16,0.03)');
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    trail.width  = W; trail.height  = H;
    cv.width     = W; cv.height     = H;
    tCtx.fillStyle = '#020510';
    tCtx.fillRect(0, 0, W, H);
    initCols();
    buildFog();
  }

  function updateCol(c) {
    c.vx += (c.ox - c.x) * 0.07;
    c.vx *= 0.75;
    c.x  += c.vx;

    c.vy += (c.baseSpeed - c.vy) * 0.04;
    c.y  += c.vy;

    if (c.y > H * 1.5) {
      c.y  = -(Math.random() * H * 0.3 + H * 0.1);
      c.vy = rand(0.3, 1.0);
    }

    for (let i = 0; i < c.streamLen; i++) {
      c.timers[i]--;
      if (c.timers[i] <= 0) {
        c.digits[i] = randInt(0, 1).toString();
        c.timers[i] = randInt(10, 40);
      }
    }
  }

  function renderColOnCtx(target, c) {
    const { x, y, fontSize, streamLen, digits, tema } = c;
    const lineH = fontSize * 1.45;

    // Font set ONCE por columna — evita ~28x asignaciones extra
    target.font = `${fontSize}px 'Courier New', monospace`;

    for (let i = 0; i < streamLen; i++) {
      const dy = y - i * lineH;
      if (dy < -lineH || dy > H + lineH) continue;

      const t = i / streamLen;
      let color;

      if (i === 0) {
        color = 'rgba(230,210,255,0.95)';
      } else if (i < 5) {
        color = tema.head + (0.9 - t * 0.3).toFixed(2) + ')';
      } else if (i < streamLen * 0.6) {
        color = tema.body + Math.max(0, 0.75 - t * 0.55).toFixed(2) + ')';
      } else {
        const tailT = (i - streamLen * 0.6) / (streamLen * 0.4);
        color = tema.dim + Math.max(0, (1 - tailT) * 0.4).toFixed(2) + ')';
      }

      target.fillStyle = color;
      target.fillText(digits[i], x, dy);
    }
  }

  // ── PARTICLES ─────────────────────────────────────────────────────────────────
  function spawnExplosion(ex, ey) {
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + rand(-0.15, 0.15);
      const speed = rand(1.5, 8);
      const col   = particleColors[randInt(0, particleColors.length - 1)];
      particles.push({
        x: ex, y: ey,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        life: 1,
        decay: rand(0.015, 0.035),
        color: col,
        digit: randInt(0, 1).toString(),
        size: rand(9, 16)
      });
    }

    rings.push({ x: ex, y: ey, r: 2, life: 1, color: '255,45,120' });
    setTimeout(() => {
      rings.push({ x: ex, y: ey, r: 2, life: 0.6, color: '191,90,242' });
    }, 90);

    shakeT = 9;
    spawnWord(ex, ey);
  }

  function spawnWord(ex, ey) {
    const div = document.createElement('div');
    div.className   = 'word';
    div.textContent = palabras[randInt(0, palabras.length - 1)];
    div.style.color = wordColors[randInt(0, wordColors.length - 1)];
    div.style.left  = ex + 'px';
    div.style.top   = (ey - 20) + 'px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 800);
  }

  function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vy += 0.18;
      p.vx *= 0.97;
      p.x  += p.vx;
      p.y  += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      const alpha = p.life;
      const glow  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 1.8);
      glow.addColorStop(0,   `rgba(${p.color},${(alpha * 0.9).toFixed(2)})`);
      glow.addColorStop(0.5, `rgba(${p.color},${(alpha * 0.4).toFixed(2)})`);
      glow.addColorStop(1,   `rgba(${p.color},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.font      = `bold ${p.size}px 'Courier New', monospace`;
      ctx.fillStyle = `rgba(${p.color},${alpha.toFixed(2)})`;
      ctx.fillText(p.digit, p.x - p.size * 0.3, p.y + p.size * 0.35);
    }
  }

  function drawRings() {
    for (let i = rings.length - 1; i >= 0; i--) {
      const ring = rings[i];
      ring.r    += 6;
      ring.life -= 0.03;
      if (ring.life <= 0) { rings.splice(i, 1); continue; }

      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.color},${(ring.life * 0.6).toFixed(2)})`;
      ctx.lineWidth   = 2;
      ctx.stroke();
    }
  }

  function drawFog() {
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, 0, W, H);
  }

  // ── MAIN LOOP ─────────────────────────────────────────────────────────────────
  function loop(now) {
    if (!isRunning) return;
    // Cap a 30fps — devuelve el control al browser sin hacer trabajo
    if (now - lastTime < FRAME_GAP) { requestAnimationFrame(loop); return; }
    lastTime = now;

    // 1. Acumular trail
    tCtx.fillStyle = 'rgba(2,5,16,0.2)';
    tCtx.fillRect(0, 0, W, H);

    // Shake
    if (shakeT > 0) {
      shakeX = (Math.random() - 0.5) * shakeT;
      shakeY = (Math.random() - 0.5) * shakeT * 0.4;
      shakeT -= 1.2;
      if (shakeT < 0) { shakeT = 0; shakeX = 0; shakeY = 0; }
    }

    // 2. Limpiar canvas visible
    ctx.clearRect(0, 0, W, H);

    ctx.save();
    ctx.translate(shakeX, shakeY);

    // 3. Copiar trail
    ctx.drawImage(trail, 0, 0);

    // Actualizar y dibujar columnas
    for (const c of cols) {
      updateCol(c);
      renderColOnCtx(ctx, c);
      renderColOnCtx(tCtx, c);
    }

    // 4. Partículas y anillos
    drawParticles();
    drawRings();

    ctx.restore();

    // 5. Niebla siempre al final
    drawFog();

    requestAnimationFrame(loop);
  }

  // ── EVENTS ────────────────────────────────────────────────────────────────────
  // Click y touch funcionan en toda la página
  document.addEventListener('click', (e) => {
    spawnExplosion(e.clientX, e.clientY);
  });

  let touchMoved = false;
  document.addEventListener('touchstart', () => { touchMoved = false; }, { passive: true });
  document.addEventListener('touchmove',  () => { touchMoved = true;  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (!touchMoved) {
      const t = e.changedTouches[0];
      spawnExplosion(t.clientX, t.clientY);
    }
  }, { passive: true });

  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
    } else {
      isRunning = true;
      lastTime  = 0;
      requestAnimationFrame(loop);
    }
  });

  // ── INIT ──────────────────────────────────────────────────────────────────────
  resize();
  requestAnimationFrame(loop);
})();
