import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

const applyTheme = (mode, btn) => {
  if (mode === 'light') document.body.setAttribute('data-theme', 'light');
  else document.body.removeAttribute('data-theme');
  if (btn) {
    const icon = btn.querySelector('.theme-icon');
    const label = btn.querySelector('.theme-label');
    if (icon) icon.textContent = mode === 'light' ? '☀️' : '🌙';
    if (label) label.textContent = mode === 'light' ? 'Day' : 'Night';
    btn.setAttribute('title', mode === 'light' ? 'Switch to night mode' : 'Switch to day mode');
  }
};

const getTheme = () => localStorage.getItem('theme_mode') || 'dark';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const themeToggleBtn = document.querySelector('.theme-toggle');

    applyTheme(getTheme(), themeToggleBtn);

    const onToggle = () => {
      const next = getTheme() === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme_mode', next);
      applyTheme(next, themeToggleBtn);
    };

    themeToggleBtn?.addEventListener('click', onToggle);

    const revealEls = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('[data-counter]');
    const tiltEls = document.querySelectorAll('[data-tilt]');

    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add('visible'));
    }

    let revealObserver;
    if (!reduceMotion) {
      revealObserver = new IntersectionObserver(
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

    const formatCounter = (value) => new Intl.NumberFormat('en-US').format(value);

    const runCounter = (el) => {
      const max = Number(el.dataset.counter);
      const duration = 1300;
      const started = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * max);
        el.textContent = formatCounter(current);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    let counterObserver;
    if (!reduceMotion) {
      counterObserver = new IntersectionObserver(
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
        el.textContent = formatCounter(max);
      });
    }

    const onMoveHandlers = [];
    const onLeaveHandlers = [];
    if (!reduceMotion) {
      tiltEls.forEach((card) => {
        const onMove = (event) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          const tiltX = (0.5 - py) * 6;
          const tiltY = (px - 0.5) * 8;
          const isProjectCard = card.classList.contains('project-card');
          const scale = isProjectCard ? 1.02 : 1;
          card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(${scale})`;
        };
        const onLeave = () => {
          card.style.transform = '';
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        onMoveHandlers.push([card, onMove]);
        onLeaveHandlers.push([card, onLeave]);
      });
    }

    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let rafId;

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

      if (!reduceMotion) rafId = requestAnimationFrame(drawParticles);
    };

    setupCanvas();
    if (!reduceMotion) drawParticles();
    window.addEventListener('resize', setupCanvas);

    return () => {
      themeToggleBtn?.removeEventListener('click', onToggle);
      if (revealObserver) revealObserver.disconnect();
      if (counterObserver) counterObserver.disconnect();
      onMoveHandlers.forEach(([card, onMove]) => card.removeEventListener('mousemove', onMove));
      onLeaveHandlers.forEach(([card, onLeave]) => card.removeEventListener('mouseleave', onLeave));
      window.removeEventListener('resize', setupCanvas);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <>
      <canvas id="particle-canvas" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
