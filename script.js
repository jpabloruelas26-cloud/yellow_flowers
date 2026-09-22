// ==== Configuración ====
const MESSAGE = `Flores Amarillas para la niña de mis ojos:

Cada día que pasa nos acerca un poco más,
y sé que pronto, muy pronto, estaremos juntos de verdad.

Mientras tanto, sigo aquí, amándote desde lejos.

— Me encantas demasiado mi Astrid 💛`;

// ==== Corazones flotantes de fondo ====
function createFloatingHearts() {
  const container = document.getElementById('heartsBg');
  const count = 22;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 1 + Math.random() * 2 + 'rem';
    heart.style.animationDuration = 8 + Math.random() * 10 + 's';
    heart.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(heart);
  }
}

// ==== Destellos y bokeh de fondo (dan profundidad al fondo sólido) ====
function createSparkles() {
  const container = document.getElementById('fxBg');
  const count = 35;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDuration = 2 + Math.random() * 3 + 's';
    s.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(s);
  }

  const bokehCount = 8;
  for (let i = 0; i < bokehCount; i++) {
    const b = document.createElement('span');
    b.className = 'bokeh';
    const size = 40 + Math.random() * 90;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.top = Math.random() * 100 + 'vh';
    b.style.setProperty('--bx', (Math.random() * 60 - 30) + 'px');
    b.style.setProperty('--by', (Math.random() * 60 - 30) + 'px');
    b.style.animationDuration = 8 + Math.random() * 10 + 's';
    b.style.animationDelay = Math.random() * 6 + 's';
    container.appendChild(b);
  }
}

// ==== Mariposas ====
// Dos mariposas ancladas a la tarjeta del árbol. Cada una entra desde fuera
// del borde, vuela lento hasta la copa, se posa y sale por el lado opuesto.
// Los puntos de la ruta se calculan en px sobre el tamaño real de la
// tarjeta (y se recalculan al redimensionar) porque `translate` en % sería
// relativo a la propia mariposa, no a la tarjeta.
const BUTTERFLY_PALETTES = [
  { outer: '#f28c28', inner: '#ffd166', edge: '#3b2400', spots: '#fff4d6' }, // naranja tipo monarca
  { outer: '#f7c948', inner: '#fff1a8', edge: '#4a3208', spots: '#ffffff' }, // amarilla, a tono con los girasoles
];

function butterflySvg(p, id) {
  return `
<svg viewBox="0 0 100 74" aria-hidden="true">
  <defs>
    <radialGradient id="bw${id}" cx="35%" cy="45%" r="75%">
      <stop offset="0" stop-color="${p.inner}"/>
      <stop offset="0.75" stop-color="${p.outer}"/>
      <stop offset="1" stop-color="${p.edge}"/>
    </radialGradient>
  </defs>
  <g class="wing wing-l">
    <path d="M50 36 C 42 12, 16 2, 6 14 C -2 24, 10 40, 48 40 Z" fill="url(#bw${id})" stroke="${p.edge}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M50 40 C 30 42, 10 52, 14 64 C 18 74, 40 68, 50 44 Z" fill="url(#bw${id})" stroke="${p.edge}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M48 38 C 36 30, 24 22, 12 16 M48 38 C 34 34, 22 36, 12 38 M49 42 C 38 48, 26 56, 18 64" fill="none" stroke="${p.edge}" stroke-width="0.9" opacity="0.55"/>
    <circle cx="14" cy="20" r="2.2" fill="${p.spots}"/><circle cx="22" cy="13" r="1.6" fill="${p.spots}"/>
    <circle cx="20" cy="60" r="1.8" fill="${p.spots}"/>
  </g>
  <g class="wing wing-r">
    <path d="M50 36 C 58 12, 84 2, 94 14 C 102 24, 90 40, 52 40 Z" fill="url(#bw${id})" stroke="${p.edge}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M50 40 C 70 42, 90 52, 86 64 C 82 74, 60 68, 50 44 Z" fill="url(#bw${id})" stroke="${p.edge}" stroke-width="1.4" stroke-linejoin="round"/>
    <path d="M52 38 C 64 30, 76 22, 88 16 M52 38 C 66 34, 78 36, 88 38 M51 42 C 62 48, 74 56, 82 64" fill="none" stroke="${p.edge}" stroke-width="0.9" opacity="0.55"/>
    <circle cx="86" cy="20" r="2.2" fill="${p.spots}"/><circle cx="78" cy="13" r="1.6" fill="${p.spots}"/>
    <circle cx="80" cy="60" r="1.8" fill="${p.spots}"/>
  </g>
  <ellipse cx="50" cy="42" rx="2.6" ry="15" fill="${p.edge}"/>
  <circle cx="50" cy="27" r="3.2" fill="${p.edge}"/>
  <path d="M48 25 C 44 18, 40 14, 36 12 M52 25 C 56 18, 60 14, 64 12" fill="none" stroke="${p.edge}" stroke-width="1.2" stroke-linecap="round"/>
  <circle cx="36" cy="12" r="1.3" fill="${p.edge}"/><circle cx="64" cy="12" r="1.3" fill="${p.edge}"/>
</svg>`;
}

function createButterflies() {
  const layer = document.getElementById('butterflyLayer');
  const card = document.querySelector('.card');
  const scene = document.querySelector('.scene');
  const rnd = (a, b) => a + Math.random() * (b - a);

  // rutas en fracciones de la tarjeta; se convierten a px en layout()
  const routes = [
    { fromLeft: true,  y0: 0.30, size: 36, dur: 34, delay: 0,  flap: 0.95 },
    { fromLeft: false, y0: 0.22, size: 30, dur: 40, delay: 14, flap: 0.8 },
  ];

  const items = routes.map((r, i) => {
    const b = document.createElement('div');
    b.className = 'butterfly';
    b.innerHTML = butterflySvg(BUTTERFLY_PALETTES[i % BUTTERFLY_PALETTES.length], i);
    b.style.setProperty('--bsize', r.size + 'px');
    b.style.setProperty('--dur', r.dur + 's');
    b.style.setProperty('--delay', r.delay + 's');
    b.style.setProperty('--flap', r.flap + 's');
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = b.getBoundingClientRect();
      spawnTapHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
    layer.appendChild(b);
    // puntos de la copa fijos por mariposa, para que la ruta no cambie en cada resize
    const perch = { x: rnd(0.32, 0.68), y: rnd(0.16, 0.42) };
    const perch2 = { x: rnd(0.30, 0.70), y: rnd(0.14, 0.40) };
    return { b, r, perch, perch2 };
  });

  function layout() {
    const W = card.clientWidth;
    // la copa vive dentro de .scene; todo el vuelo se acota a esa franja
    const sceneH = scene.offsetTop + scene.clientHeight;

    items.forEach(({ b, r, perch, perch2 }) => {
      const size = r.size;
      const x0 = r.fromLeft ? -size * 1.6 : W + size * 0.6; // fuera del borde
      const y0 = sceneH * r.y0;
      b.style.setProperty('--x0', x0 + 'px');
      b.style.setProperty('--y0', y0 + 'px');

      const wp = (n, x, y) => {
        b.style.setProperty(`--fx${n}`, (x - x0) + 'px');
        b.style.setProperty(`--fy${n}`, (y - y0) + 'px');
      };
      wp(1, W * (r.fromLeft ? 0.18 : 0.82), sceneH * 0.55);   // entra en la tarjeta
      wp(2, W * perch.x, sceneH * perch.y);                    // se posa en la copa
      wp(3, W * perch2.x, sceneH * perch2.y);                  // revolotea a otra flor
      wp(4, r.fromLeft ? W + size * 0.6 : -size * 1.6, sceneH * 0.35); // sale por el otro lado
    });
  }

  layout();
  // recalcular cuando cambie el tamaño real de la tarjeta (giro del teléfono,
  // carga de fuentes, etc.); más fiable que el evento resize de window
  new ResizeObserver(layout).observe(card);
}

// ==== Corazoncitos al tocar el fondo ====
function spawnTapHeart(x, y) {
  const heart = document.createElement('span');
  heart.className = 'tap-heart';
  heart.textContent = ['❤️', '💛', '💕', '✨'][Math.floor(Math.random() * 4)];
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.setProperty('--tx', (Math.random() * 50 - 25) + 'px');
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

function setupBackgroundTaps() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.card') || e.target.closest('.player') || e.target.closest('.flower') || e.target.closest('.butterfly') || e.target.closest('.game')) {
      return;
    }
    spawnTapHeart(e.clientX, e.clientY);
  });
}

// ==== Mini juego: atrapa los girasoles ====
const GAME_TARGET = 15;
const GAME_LIVES = 3;

function buildSunflower(className) {
  const el = document.createElement('div');
  el.className = className;
  for (let i = 0; i < 8; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.setProperty('--i', i);
    el.appendChild(petal);
  }
  const center = document.createElement('div');
  center.className = 'center';
  el.appendChild(center);
  return el;
}

function setupGame() {
  const game = document.getElementById('game');
  const area = document.getElementById('gameArea');
  const screen = document.getElementById('gameScreen');
  const title = document.getElementById('gameTitle');
  const text = document.getElementById('gameText');
  const startBtn = document.getElementById('gameStart');
  const openBtn = document.getElementById('gameBtn');
  const closeBtn = document.getElementById('gameClose');
  const scoreEl = document.getElementById('gameScore');
  const livesEl = document.getElementById('gameLives');

  let running = false;
  let score = 0;
  let lives = GAME_LIVES;
  let flowers = [];
  let lastTime = 0;
  let spawnTimer = 0;
  let timer = 0;

  function flowerSize() {
    return Math.min(56, Math.max(42, area.clientWidth * 0.12));
  }

  function updateHud() {
    scoreEl.textContent = `🌻 ${score} / ${GAME_TARGET}`;
    livesEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(GAME_LIVES - lives);
  }

  function showPoints(x, y, label) {
    const p = document.createElement('span');
    p.className = 'game-points';
    p.textContent = label;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    area.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }

  function spawn() {
    const size = flowerSize();
    const el = buildSunflower('game-flower');
    el.style.setProperty('--gf-size', size + 'px');
    const maxX = Math.max(1, area.clientWidth - size);
    const x = Math.random() * maxX;
    // la velocidad sube con el puntaje para que se vuelva más retador
    const speed = 140 + score * 18 + Math.random() * 80;
    // a partir de la mitad, algunas flores se balancean de lado a lado
    const sways = score >= 5 && Math.random() < 0.55;
    const f = {
      el, x, baseX: x, maxX, y: -size, size, speed,
      rot: Math.random() * 360, spin: (Math.random() - 0.5) * 160,
      swayAmp: sways ? 30 + Math.random() * 50 : 0,
      swayFreq: 1.5 + Math.random() * 1.5,
      swayPhase: Math.random() * Math.PI * 2,
      age: 0, done: false,
    };
    el.style.transform = `translate(${x}px, ${f.y}px) rotate(${f.rot}deg)`;

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!running || f.done) return;
      f.done = true;
      score++;
      updateHud();
      el.classList.add('caught');
      setTimeout(() => el.remove(), 380);
      const rect = el.getBoundingClientRect();
      const areaRect = area.getBoundingClientRect();
      showPoints(rect.left - areaRect.left + rect.width / 2, rect.top - areaRect.top + rect.height / 2, '+1 💛');
      spawnTapHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
      if (score >= GAME_TARGET) finish(true);
    });

    area.appendChild(el);
    flowers.push(f);
  }

  function loseLife() {
    lives--;
    updateHud();
    area.classList.remove('hit');
    void area.offsetWidth;
    area.classList.add('hit');
    if (lives <= 0) finish(false);
  }

  // bucle con setInterval + delta real en vez de requestAnimationFrame:
  // rAF se congela en pestañas/paneles en segundo plano y el juego se quedaría
  // detenido sin aviso
  function loop() {
    if (!running) return;
    const ts = performance.now();
    const dt = Math.min(0.05, (ts - lastTime) / 1000);
    lastTime = ts;

    spawnTimer += dt;
    const interval = Math.max(0.38, 1.1 - score * 0.055);
    if (spawnTimer >= interval) {
      spawn();
      // de vez en cuando caen dos a la vez cuando ya vas avanzado
      if (score >= 8 && Math.random() < 0.3) spawn();
      spawnTimer = 0;
    }

    const floor = area.clientHeight;
    flowers = flowers.filter((f) => {
      if (f.done) return false;
      f.age += dt;
      f.y += f.speed * dt;
      f.rot += f.spin * dt;
      if (f.swayAmp) {
        f.x = Math.min(f.maxX, Math.max(0, f.baseX + Math.sin(f.age * f.swayFreq + f.swayPhase) * f.swayAmp));
      }
      f.el.style.transform = `translate(${f.x}px, ${f.y}px) rotate(${f.rot}deg)`;
      if (f.y > floor) {
        f.done = true;
        f.el.remove();
        loseLife();
        return false;
      }
      return true;
    });
  }

  function clearFlowers() {
    flowers.forEach((f) => f.el.remove());
    flowers = [];
    area.querySelectorAll('.game-flower, .game-points').forEach((n) => n.remove());
  }

  function start() {
    score = 0;
    lives = GAME_LIVES;
    spawnTimer = 0.9; // que el primero salga casi de inmediato
    clearFlowers();
    updateHud();
    screen.hidden = true;
    running = true;
    lastTime = performance.now();
    clearInterval(timer);
    timer = setInterval(loop, 16);
  }

  function finish(won) {
    running = false;
    clearInterval(timer);
    clearFlowers();
    title.classList.toggle('win', won);
    if (won) {
      title.textContent = 'Ganaste mi corazón 💛';
      text.textContent = 'Atrapaste todos los girasoles… y también a mí. Te amo, Astrid.';
      startBtn.textContent = 'Jugar de nuevo';
      for (let i = 0; i < 18; i++) {
        setTimeout(() => {
          spawnTapHeart(window.innerWidth * (0.15 + Math.random() * 0.7), window.innerHeight * (0.25 + Math.random() * 0.6));
        }, i * 90);
      }
    } else {
      title.textContent = 'Casi…';
      text.textContent = `Atrapaste ${score} de ${GAME_TARGET}. Mi corazón sigue aquí esperándote, ¿lo intentas otra vez?`;
      startBtn.textContent = 'Intentar de nuevo';
    }
    screen.hidden = false;
  }

  function open() {
    title.classList.remove('win');
    title.textContent = 'Atrapa los girasoles';
    text.textContent = `Toca los girasoles antes de que lleguen al suelo. Atrapa ${GAME_TARGET} y descubre la sorpresa.`;
    startBtn.textContent = 'Jugar';
    updateHud();
    screen.hidden = false;
    game.hidden = false;
    document.body.classList.add('game-open');
  }

  function close() {
    running = false;
    clearInterval(timer);
    clearFlowers();
    game.hidden = true;
    document.body.classList.remove('game-open');
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  startBtn.addEventListener('click', start);
}

// ==== Girasoles en forma de corazón (ecuación paramétrica) ====
// Las posiciones se calculan como % del contenedor (mismo sistema de
// coordenadas que el viewBox del árbol, 300x320) para que todo escale
// de forma responsiva sin depender de tamaños fijos en px.
const LOVE_MESSAGES = [
  'Te amo', 'Me encantas', 'Eres mi sol', 'Te adoro',
  'Mi amor', 'Contigo siempre', 'Eres todo', 'Te quiero',
  '❤️', 'Mi vida', 'Eres perfecta', 'Te extraño'
];

function popLoveMessage(container, leftPct, topPct) {
  const msg = document.createElement('div');
  msg.className = 'love-msg';
  msg.style.left = leftPct + '%';
  msg.style.top = topPct + '%';
  msg.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
  msg.appendChild(bubble);

  container.appendChild(msg);
  msg.addEventListener('animationend', () => msg.remove());
  setTimeout(() => msg.remove(), 2400);
}

// ==== Girasoles anclados a las ramas, con silueta de corazón ====
// Cada rama del SVG (curvas de Bézier cúbicas) recibe su propio racimo
// de girasoles a lo largo de su trayecto; a eso se suma una nube de
// puntos con forma de corazón (ecuación paramétrica) para rellenar el
// volumen entre ramas. Todo se expresa en % del contenedor (mismo
// sistema de coordenadas que el viewBox del árbol, 300x320) para que
// escale de forma responsiva.
function cubicBezier(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

const BRANCHES = [
  { p0: { x: 150, y: 260 }, p1: { x: 130, y: 230 }, p2: { x: 110, y: 210 }, p3: { x: 90, y: 190 } },
  { p0: { x: 150, y: 250 }, p1: { x: 170, y: 220 }, p2: { x: 190, y: 200 }, p3: { x: 210, y: 180 } },
  { p0: { x: 150, y: 230 }, p1: { x: 145, y: 200 }, p2: { x: 140, y: 180 }, p3: { x: 150, y: 150 } },
  { p0: { x: 150, y: 240 }, p1: { x: 120, y: 210 }, p2: { x: 100, y: 190 }, p3: { x: 70, y: 170 } },
  { p0: { x: 150, y: 235 }, p1: { x: 180, y: 205 }, p2: { x: 200, y: 185 }, p3: { x: 230, y: 165 } },
];

function createFlowers() {
  const container = document.getElementById('flowers');
  const scene = document.querySelector('.scene');
  const viewW = 300;
  const viewH = 320;
  const centerX = 150; // se alinea con el tronco del árbol (viewBox)
  const centerY = 145; // altura donde nacen las ramas
  const scale = 7.8;
  const points = [];

  // Una sola definición del corazón (curva paramétrica) para TODO: contorno,
  // relleno y filtro de ramas. Antes el relleno usaba la fórmula implícita
  // (x²+y²-1)³ = x²y³, cuyos lóbulos son ~70% más altos que los de esta
  // curva, y por eso quedaban girasoles sueltos por encima del corazón.
  // Coordenadas relativas al centro; y crece hacia abajo (como en pantalla).
  function heartPoint(t, f = 1) {
    return {
      x: 16 * Math.pow(Math.sin(t), 3) * f,
      y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * f,
    };
  }

  // polígono del contorno para las pruebas punto-dentro (ray casting)
  const outline = [];
  for (let t = 0; t < Math.PI * 2; t += 0.05) outline.push(heartPoint(t));
  function insideOutline(x, y, f = 1) {
    let inside = false;
    for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
      const xi = outline[i].x * f, yi = outline[i].y * f;
      const xj = outline[j].x * f, yj = outline[j].y * f;
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function pushRelative(x, y) {
    points.push({ px: centerX + x * scale, py: centerY + y * scale });
  }

  // girasoles a lo largo de cada rama (coords del viewBox), solo los que
  // quedan dentro del corazón (margen del 6% para los que van justo al borde)
  BRANCHES.forEach((b) => {
    for (let t = 0.35; t <= 1; t += 0.13) {
      const pt = cubicBezier(b.p0, b.p1, b.p2, b.p3, t);
      const rx = (pt.x - centerX) / scale;
      const ry = (pt.y - centerY) / scale;
      if (insideOutline(rx, ry, 1.06)) points.push({ px: pt.x, py: pt.y });
    }
  });

  // contorno principal del corazón, bien definido
  for (let t = 0; t < Math.PI * 2; t += 0.1) {
    const p = heartPoint(t);
    pushRelative(p.x, p.y);
  }
  // relleno interior: cuadrícula con jitter recortada al contorno (al 94%
  // para no abultar el borde). Un muestreo aleatorio deja huecos; la
  // cuadrícula garantiza cobertura uniforme. El paso (2.0) es menor que el
  // diámetro de una flor (~2.4 en estas unidades) para que se solapen.
  const step = 2.0;
  const jitter = 0.55;
  for (let gy = -11; gy <= 18; gy += step) {
    for (let gx = -17; gx <= 17; gx += step) {
      const x = gx + (Math.random() * 2 - 1) * jitter;
      const y = gy + (Math.random() * 2 - 1) * jitter;
      if (insideOutline(x, y, 0.94)) pushRelative(x, y);
    }
  }

  // la copa no baja hasta el piso: se recorta un poco antes de llegar
  // abajo para que el tronco quede claramente visible por debajo, como
  // en un árbol real (una franja angosta no funcionaba: las flores son
  // más anchas que el propio tronco y terminaban tapándolo igual).
  const canopyBottom = 244;
  const visiblePoints = points.filter((p) => p.py <= canopyBottom);

  visiblePoints.forEach((p) => {
    const flower = document.createElement('div');
    flower.className = 'flower';

    const leftPct = (p.px / viewW) * 100;
    const topPct = (p.py / viewH) * 100;
    flower.style.left = leftPct + '%';
    flower.style.top = topPct + '%';
    flower.style.animationDelay = 2 + Math.random() * 1.5 + 's';

    for (let i = 0; i < 8; i++) {
      const petalLeaf = document.createElement('div');
      petalLeaf.className = 'petal';
      petalLeaf.style.setProperty('--i', i);
      flower.appendChild(petalLeaf);
    }
    const center = document.createElement('div');
    center.className = 'center';
    flower.appendChild(center);

    flower.addEventListener('click', () => {
      if (flower.dataset.falling === '1') return;
      flower.dataset.falling = '1';
      flower.classList.add('flower-fall');
      popLoveMessage(scene, leftPct, topPct);

      setTimeout(() => {
        // quitar la clase revierte al 'bloom' original, reiniciando la aparición
        flower.classList.remove('flower-fall');
        flower.dataset.falling = '0';
      }, 550 + 2200);
    });

    container.appendChild(flower);
  });
}

// ==== Pétalos cayendo ====
function createPetals() {
  const container = document.getElementById('petals');
  const count = 14;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.style.left = 12 + Math.random() * 76 + '%';
    petal.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
    petal.style.animationDuration = 4 + Math.random() * 4 + 's';
    petal.style.animationDelay = 3.5 + Math.random() * 6 + 's';
    container.appendChild(petal);
  }
}

// ==== Efecto máquina de escribir ====
function typeWriter() {
  const el = document.getElementById('typewriter');
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '_';

  function step() {
    if (i <= MESSAGE.length) {
      el.textContent = MESSAGE.slice(0, i);
      el.appendChild(cursor);
      i++;
      setTimeout(step, 28);
    }
  }
  setTimeout(step, 2200);
}

// ==== Reproductor de audio ====
const AUDIO_START = 90; // 1:30
const AUDIO_VOLUME = 0.3; // 30%

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function setupPlayer() {
  const audio = document.getElementById('audio');
  const toggleBtn = document.getElementById('playToggle');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const seek = document.getElementById('seek');
  const volume = document.getElementById('volume');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal = document.getElementById('timeTotal');

  audio.volume = AUDIO_VOLUME;
  volume.value = AUDIO_VOLUME * 100;

  let seeking = false;
  let startApplied = false;

  function trySetStart() {
    if (audio.readyState > 0 && !startApplied) {
      audio.currentTime = AUDIO_START;
      timeTotal.textContent = formatTime(audio.duration);
      startApplied = true;
    }
  }

  // los metadatos pueden llegar antes o después de este punto:
  // cubrimos ambos casos (evento futuro y estado ya listo).
  audio.addEventListener('loadedmetadata', trySetStart);
  if (audio.readyState > 0) trySetStart();

  function attemptAutoplay() {
    trySetStart();
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          trySetStart();
          iconPlay.style.display = 'none';
          iconPause.style.display = '';
        })
        .catch(() => {
          // el navegador bloqueó el autoplay con sonido; se necesita interacción
          iconPlay.style.display = '';
          iconPause.style.display = 'none';
        });
    }
  }

  // intento de autoplay al cargar; si el navegador lo bloquea,
  // se reproducirá con el primer clic en el botón
  attemptAutoplay();
  window.addEventListener(
    'pointerdown',
    () => {
      if (audio.paused) {
        attemptAutoplay();
      } else {
        trySetStart();
      }
    },
    { once: true }
  );

  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      if (audio.currentTime === 0) trySetStart();
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    iconPlay.style.display = 'none';
    iconPause.style.display = '';
  });

  audio.addEventListener('pause', () => {
    iconPlay.style.display = '';
    iconPause.style.display = 'none';
  });

  audio.addEventListener('timeupdate', () => {
    if (seeking || !audio.duration) return;
    seek.value = (audio.currentTime / audio.duration) * 100;
    timeCurrent.textContent = formatTime(audio.currentTime);
  });

  seek.addEventListener('input', () => {
    seeking = true;
    if (audio.duration) {
      timeCurrent.textContent = formatTime((seek.value / 100) * audio.duration);
    }
  });

  seek.addEventListener('change', () => {
    if (audio.duration) {
      audio.currentTime = (seek.value / 100) * audio.duration;
    }
    seeking = false;
  });

  volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  createSparkles();
  createButterflies();
  setupBackgroundTaps();
  createFlowers();
  createPetals();
  typeWriter();
  setupPlayer();
  setupGame();
});
