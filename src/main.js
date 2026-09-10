import './style.css'
import { createIcons, icons } from 'lucide';

// Inicializa todos os ícones que possuem o atributo data-lucide no HTML
createIcons({ icons });

// Carrossel de fundo da seção de início
const heroCarousel = document.getElementById('hero-carousel');

if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll('.hero-slide'));
  const caption = document.getElementById('hero-caption');
  const dotsWrap = document.getElementById('hero-dots');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const INTERVAL = 5000;

  let current = 0;
  let timer = null;

  // Cria um indicador (dot) para cada slide
  const dots = slides.map((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para ${slide.dataset.title}`);
    dot.className =
      'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300';
    dot.addEventListener('click', () => {
      goTo(i);
      restart();
    });
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('opacity-100', i === current);
      slide.classList.toggle('opacity-0', i !== current);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-white', i === current);
      dot.classList.toggle('w-6', i === current);
      dot.classList.toggle('bg-white/40', i !== current);
    });
    if (caption) caption.textContent = slides[current].dataset.title;
  }

  function next() {
    goTo(current + 1);
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = window.setInterval(next, INTERVAL);
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function restart() {
    stop();
    start();
  }

  nextBtn?.addEventListener('click', () => {
    next();
    restart();
  });
  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    restart();
  });

  // Pausa a rotação automática enquanto o usuário interage
  const section = document.getElementById('inicio');
  section?.addEventListener('mouseenter', stop);
  section?.addEventListener('mouseleave', start);
  section?.addEventListener('focusin', stop);
  section?.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  goTo(0);
  start();
}

// Lógica do Menu Mobile
const mobileMenuButton = document.querySelector('header button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    // Alterna entre mostrar e ocultar o menu
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  // Fecha o menu automaticamente ao clicar em qualquer link interno
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}