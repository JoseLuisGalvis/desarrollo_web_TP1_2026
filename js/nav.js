/*
  nav.js — Header compartido por las 5 páginas del sitio
  Interacciones dinámicas:
  1) Toggle de tema claro/oscuro (arranca en LIGHT), guardado en localStorage para que
     se recuerde entre visitas (se aplica también con un script
     inline en el <head> para evitar el parpadeo del tema incorrecto
     al cargar la página).
  2) Menú hamburguesa: muestra/oculta la navegación en pantallas
     chicas, con soporte de teclado y atributos ARIA.
*/

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // --- 1) Toggle de tema ---
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle) {
    const temaActual = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    themeToggle.setAttribute('aria-checked', String(temaActual === 'dark'));

    themeToggle.addEventListener('click', () => {
      const actual = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const siguiente = actual === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', siguiente);
      localStorage.setItem('team-two-theme', siguiente);
      themeToggle.setAttribute('aria-checked', String(siguiente === 'dark'));

      // Avisa a otros scripts (por ejemplo, el fondo animado del hero)
      // que el tema cambió, para que puedan actualizar sus colores.
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: siguiente } }));
    });
  }

  // --- 2) Menú hamburguesa ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const abierto = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(abierto));
    });

    // Cerrar el menú al elegir una sección (mejor experiencia en mobile)
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
