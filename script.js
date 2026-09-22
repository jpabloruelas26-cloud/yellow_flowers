// ==== Configuración ====
const MESSAGE = `Flores Amarillas para la niña de mis ojos:

Cada día que pasa nos acerca un poco más,
y sé que pronto, muy pronto, estaremos juntos de verdad.

Mientras tanto, sigo aquí, amándote desde lejos.

— Me encantas demasiado mi Astrid <3`;

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

// ==== Mariposas interactivas revoloteando ====
const BUTTERFLIES = ['🦋', '🦋', '🦋'];

function createButterflies() {
  const container = document.getElementById('fxBg');
  BUTTERFLIES.forEach((emoji) => {
    const b = document.createElement('span');
    b.className = 'butterfly';
    b.textContent = emoji;
    b.style.left = 10 + Math.random() * 75 + 'vw';
    b.style.top = 15 + Math.random() * 55 + 'vh';
    b.style.setProperty('--fx1', (Math.random() * 60 - 30) + 'px');
    b.style.setProperty('--fy1', (Math.random() * 40 - 50) + 'px');
    b.style.setProperty('--fx2', (Math.random() * 60 - 30) + 'px');
    b.style.setProperty('--fy2', (Math.random() * 40 - 60) + 'px');
    b.style.setProperty('--fx3', (Math.random() * 60 - 30) + 'px');
    b.style.setProperty('--fy3', (Math.random() * 40 - 40) + 'px');
    b.style.animationDuration = 7 + Math.random() * 5 + 's, 0.3s';
    b.style.animationDelay = Math.random() * 3 + 's, 0s';

    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = b.getBoundingClientRect();
      spawnTapHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    container.appendChild(b);
  });
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
    if (e.target.closest('.card') || e.target.closest('.player') || e.target.closest('.flower') || e.target.closest('.butterfly')) {
      return;
    }
    spawnTapHeart(e.clientX, e.clientY);
  });
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

  // criterio de "dentro del corazón", con un margen de tolerancia para no
  // descartar de más los puntos que van justo sobre el contorno
  function insideHeartLoose(x, y) {
    const eq = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
    return eq <= 0.15;
  }

  // girasoles a lo largo de cada rama (absolutos, en coords del viewBox),
  // descartando los que caigan fuera del contorno del corazón
  BRANCHES.forEach((b) => {
    for (let t = 0.35; t <= 1; t += 0.13) {
      const pt = cubicBezier(b.p0, b.p1, b.p2, b.p3, t);
      const rx = (pt.x - centerX) / scale;
      const ry = (pt.y - centerY) / scale;
      if (insideHeartLoose(rx / 16, -ry / 13)) {
        points.push({ px: pt.x, py: pt.y });
      }
    }
  });

  // nube con forma de corazón (relativa al centro) para rellenar volumen
  function pushRelative(x, y) {
    points.push({ px: centerX + x * scale, py: centerY + y * scale });
  }

  // contorno principal del corazón, bien definido
  for (let t = 0; t < Math.PI * 2; t += 0.1) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pushRelative(x, y);
  }
  // capas intermedias para dar volumen y frondosidad
  [0.85, 0.68, 0.5].forEach((f) => {
    for (let t = 0; t < Math.PI * 2; t += 0.14) {
      const x = 16 * Math.pow(Math.sin(t), 3) * f;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * f;
      pushRelative(x, y);
    }
  });
  // rellenar el interior con puntos aleatorios dentro del corazón (criterio estricto)
  function insideHeart(x, y) {
    const eq = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
    return eq <= 0;
  }
  let filled = 0;
  while (filled < 130) {
    const nx = (Math.random() * 2 - 1) * 1.3;
    const ny = (Math.random() * 2 - 1) * 1.3 + 0.2;
    if (insideHeart(nx, ny)) {
      pushRelative(nx * 16, -ny * 13);
      filled++;
    }
  }
  // refuerzo específico en el centro geométrico, donde suele quedar un
  // hueco visible entre las ramas y la nube del corazón
  for (let i = 0; i < 24; i++) {
    const nx = (Math.random() * 2 - 1) * 4.5;
    const ny = (Math.random() * 2 - 1) * 3.5;
    pushRelative(nx, ny + 1);
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
});
