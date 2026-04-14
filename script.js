const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const themeToggleBtn = document.querySelector('.theme-toggle');

const getTheme = () => localStorage.getItem('theme_mode') || 'dark';

const applyTheme = (mode) => {
  if (mode === 'light') document.body.setAttribute('data-theme', 'light');
  else document.body.removeAttribute('data-theme');

  if (themeToggleBtn) {
    themeToggleBtn.textContent = mode === 'light' ? 'Night' : 'Day';
  }
};

applyTheme(getTheme());

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const next = getTheme() === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme_mode', next);
    applyTheme(next);
  });
}

const revealEls = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('[data-counter]');
const tiltEls = document.querySelectorAll('[data-tilt]');

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('visible'));
}

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${index * 70}ms`;
    revealObserver.observe(el);
  });
}

const formatCounter = (value, max) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const runCounter = (el) => {
  const max = Number(el.dataset.counter);
  const duration = 1300;
  const started = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - started) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * max);
    el.textContent = formatCounter(current, max);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if (!reduceMotion) {
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((el) => {
    const max = Number(el.dataset.counter);
    el.textContent = formatCounter(max, max);
  });
}

if (!reduceMotion) {
  tiltEls.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - py) * 6;
      const tiltY = (px - 0.5) * 8;
      const isProjectCard = card.classList.contains('project-card');
      const scale = isProjectCard ? 1.02 : 1;
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(${scale})`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];

const setupCanvas = () => {
  if (!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(55, Math.floor(window.innerWidth / 24));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.7 + 0.4,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28
  }));
};

const drawParticles = () => {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(152, 229, 255, 0.33)';
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 120) {
        const alpha = (1 - distance / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(120, 208, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  if (!reduceMotion) requestAnimationFrame(drawParticles);
};

setupCanvas();
if (!reduceMotion) drawParticles();
if (canvas) window.addEventListener('resize', setupCanvas);
