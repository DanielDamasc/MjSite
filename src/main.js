import './style.css'
import { createIcons, icons } from 'lucide';

// Inicializa todos os ícones que possuem o atributo data-lucide no HTML
createIcons({ icons });

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