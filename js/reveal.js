/*
  reveal.js — Animaciones de entrada al hacer scroll
  Reemplazo hecho con Intersection Observer (API nativa del navegador)
  de lo que suele resolverse con la librería AOS. Se eligió esta opción
  para no sumar dependencias externas y mantener el TP en HTML, CSS y
  JavaScript puro.

  Cualquier elemento con la clase "reveal" empieza invisible y
  corrido hacia abajo (ver css/style.css); en cuanto entra en el
  viewport se le agrega "is-visible" y la transición CSS hace el
  resto. Se agrega un pequeño escalonado (stagger) entre elementos
  para que no aparezcan todos exactamente al mismo tiempo.
*/

document.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.reveal');
  if (elementos.length === 0) return;

  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefiereMenosMovimiento || !('IntersectionObserver' in window)) {
    // Sin animación: se muestran directamente (accesibilidad / navegadores viejos)
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el, indice) => {
    el.style.transitionDelay = `${(indice % 4) * 90}ms`;
    observer.observe(el);
  });
});
