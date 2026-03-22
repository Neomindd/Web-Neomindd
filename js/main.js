// Año automático en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// ══════════════════════════════════════════
// FONDO ANIMADO — Sección Nosotros Neomind
// Bokeh violeta + red de líneas + pulsos
// Se superpone sobre la cortina binaria fija
// ══════════════════════════════════════════
(function () {
  const sec   = document.getElementById('nosotros');
  const bgCv  = document.getElementById('nmBgCv');
  const netCv = document.getElementById('nmNetCv');
  if (!sec || !bgCv || !netCv) return;

  const bg  = bgCv.getContext('2d');
  const net = netCv.getContext('2d');
  let W, H, t = 0, animId = null, visible = false;
  let nodes = [], bokeh = [], sparks = [], blobs = [], pulses = [];
  const MAX_DIST    = 130;
  const MAX_DIST_SQ = MAX_DIST * MAX_DIST; // evita sqrt en el 95% de pares descartados
  const NODE_COUNT  = 50;                  // fijo — evita O(n²) con secciones altas

  function init() {
    W = bgCv.width = netCv.width   = sec.offsetWidth;
    H = bgCv.height = netCv.height = sec.offsetHeight;

    // 50 nodos distribuidos aleatoriamente — pre-cacheamos el string de color
    nodes = Array.from({ length: NODE_COUNT }, () => {
      const ox  = Math.random() * W;
      const oy  = Math.random() * H;
      const mix = ox / W;
      const cr  = ~~(80  + mix * 140);
      const cb  = ~~(220 - mix * 60);
      return {
        x: ox, y: oy, ox, oy,
        vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .22,
        ph: Math.random() * Math.PI * 2,
        r:  .8 + Math.random() * 1.6,
        bright: Math.random() > .72,
        cr, cb,
        col: `rgba(${cr},0,${cb},`, // prefijo pre-construido, evita template en hot loop
      };
    });

    // 8 bokeh — reducido de 14
    bokeh = Array.from({ length: 8 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  70 + Math.random() * 90,
      vx: (Math.random() - .5) * .09,
      vy: (Math.random() - .5) * .07,
      a:  .06 + Math.random() * .10,
      ph: Math.random() * Math.PI * 2,
      cr: 90  + ~~(Math.random() * 80),
      cb: 190 + ~~(Math.random() * 65),
    }));

    // 20 sparks — reducido de 45
    sparks = Array.from({ length: 20 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  .5 + Math.random() * 1.4,
      vx: (Math.random() - .5) * .12,
      vy: (Math.random() - .5) * .10,
      a:  .2  + Math.random() * .55,
      ph: Math.random() * Math.PI * 2,
      cr: 140 + ~~(Math.random() * 80),
      cb: 200 + ~~(Math.random() * 55),
    }));

    // 3 blobs con posición base (ox/oy) para el movimiento oscilatorio
    blobs = [
      { ox: W * .3,  oy: H * .25, r: W * .55, ca: 'rgba(20,2,80,0.45)',    sp: .0025, ph: 0 },
      { ox: W * .72, oy: H * .55, r: W * .52, ca: 'rgba(60,5,130,0.35)',   sp: .002,  ph: 2 },
      { ox: W * .5,  oy: H * .82, r: W * .48, ca: 'rgba(120,20,190,0.22)', sp: .003,  ph: 1 },
    ];

    pulses = [];
  }

  function frame() {
    // ── Canvas de fondo ──────────────────────────────
    bg.clearRect(0, 0, W, H);
    bg.fillStyle = 'rgba(3,1,10,0.65)';
    bg.fillRect(0, 0, W, H);

    for (const b of blobs) {
      const cx = b.ox + Math.sin(t * b.sp + b.ph) * W * .08;
      const cy = b.oy + Math.cos(t * b.sp * .6  + b.ph) * H * .06;
      const gr = bg.createRadialGradient(cx, cy, 0, cx, cy, b.r);
      gr.addColorStop(0, b.ca);
      gr.addColorStop(1, 'transparent');
      bg.fillStyle = gr;
      // fillRect acotado al blob — evita pintar el canvas completo 3 veces
      bg.fillRect(cx - b.r, cy - b.r, b.r * 2, b.r * 2);
    }

    for (const b of bokeh) {
      const p  = b.a * (.68 + Math.sin(t * .02 + b.ph) * .32);
      const gr = bg.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      gr.addColorStop(0,   `rgba(${b.cr},0,${b.cb},${p.toFixed(3)})`);
      gr.addColorStop(.5,  `rgba(${b.cr},0,${b.cb},${(p * .15).toFixed(3)})`);
      gr.addColorStop(1,   'transparent');
      bg.fillStyle = gr;
      bg.beginPath(); bg.arc(b.x, b.y, b.r, 0, Math.PI * 2); bg.fill();
      b.x += b.vx; b.y += b.vy;
      if (b.x < -b.r) b.x = W + b.r; if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H + b.r; if (b.y > H + b.r) b.y = -b.r;
    }

    // ── Canvas de red ────────────────────────────────
    net.clearRect(0, 0, W, H);

    for (const n of nodes) {
      n.vx += (n.ox - n.x) * .003;
      n.vy += (n.oy - n.y) * .003;
      n.vx *= .988; n.vy *= .988;
      n.x  += n.vx + Math.sin(t * .014 + n.ph) * .22;
      n.y  += n.vy + Math.cos(t * .011 + n.ph) * .18;
    }

    if (t % 90 === 0) {
      pulses.push({ ni: ~~(Math.random() * nodes.length), prog: 0, speed: .018 + Math.random() * .015 });
    }

    // Todas las conexiones en un único path + stroke — de N draw calls a 1
    net.beginPath();
    net.strokeStyle = 'rgba(140,30,220,0.14)';
    net.lineWidth   = 0.7;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy >= MAX_DIST_SQ) continue; // compara cuadrados, sin sqrt
        net.moveTo(nodes[i].x, nodes[i].y);
        net.lineTo(nodes[j].x, nodes[j].y);
      }
    }
    net.stroke();

    // Pulsos
    for (let p = pulses.length - 1; p >= 0; p--) {
      const pulse = pulses[p];
      pulse.prog += pulse.speed;
      if (pulse.prog >= 1) { pulses.splice(p, 1); continue; }
      const src = nodes[pulse.ni];
      let bestDist = Infinity, bestJ = -1;
      for (let j = 0; j < nodes.length; j++) {
        if (j === pulse.ni) continue;
        const d = Math.hypot(nodes[j].x - src.x, nodes[j].y - src.y);
        if (d < MAX_DIST && d < bestDist) { bestDist = d; bestJ = j; }
      }
      if (bestJ < 0) continue;
      const dst   = nodes[bestJ];
      const px    = src.x + (dst.x - src.x) * pulse.prog;
      const py    = src.y + (dst.y - src.y) * pulse.prog;
      const alpha = Math.sin(pulse.prog * Math.PI) * .9;
      const gl    = net.createRadialGradient(px, py, 0, px, py, 8);
      gl.addColorStop(0, `${src.col}${(alpha * .55).toFixed(3)})`);
      gl.addColorStop(1, 'transparent');
      net.fillStyle = gl;
      net.beginPath(); net.arc(px, py, 8, 0, Math.PI * 2); net.fill();
      net.fillStyle = `rgba(255,255,255,${(alpha * .85).toFixed(3)})`;
      net.beginPath(); net.arc(px, py, 1.8, 0, Math.PI * 2); net.fill();
    }

    // Nodos — usa col pre-cacheado
    for (const n of nodes) {
      const p = .45 + Math.sin(t * .035 + n.ph) * .45;
      if (n.bright) {
        const gl = net.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        gl.addColorStop(0, `${n.col}${(p * .32).toFixed(3)})`);
        gl.addColorStop(1, 'transparent');
        net.fillStyle = gl;
        net.beginPath(); net.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2); net.fill();
        net.beginPath(); net.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
        net.strokeStyle = `${n.col}${(p * .22).toFixed(3)})`;
        net.lineWidth = .5; net.stroke();
      }
      net.fillStyle = `${n.col}${(p * (n.bright ? .88 : .42)).toFixed(3)})`;
      net.beginPath(); net.arc(n.x, n.y, n.r, 0, Math.PI * 2); net.fill();
      if (n.bright && p > .7) {
        net.fillStyle = `rgba(255,255,255,${((p - .7) * .8).toFixed(3)})`;
        net.beginPath(); net.arc(n.x, n.y, n.r * .45, 0, Math.PI * 2); net.fill();
      }
    }

    // Sparks
    for (const s of sparks) {
      const p = s.a * (.45 + Math.sin(t * .038 + s.ph) * .55);
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      if (p < .04) continue;
      net.fillStyle = `rgba(${s.cr},0,${s.cb},${Math.min(p * 1.5, 1).toFixed(3)})`;
      net.beginPath(); net.arc(s.x, s.y, s.r, 0, Math.PI * 2); net.fill();
    }

    t++;
    animId = visible ? requestAnimationFrame(frame) : null;
  }

  // Pausa automática cuando la sección sale del viewport
  new IntersectionObserver(([e]) => {
    const wasVisible = visible;
    visible = e.isIntersecting;
    if (visible && !wasVisible) frame();
  }, { threshold: 0.01 }).observe(sec);

  new ResizeObserver(() => {
    cancelAnimationFrame(animId);
    animId = null;
    init();
    if (visible) frame();
  }).observe(sec);

  init();
  // El IntersectionObserver arranca frame() cuando la sección entra en pantalla
})();
