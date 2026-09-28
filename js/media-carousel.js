/*
  media-carousel.js — Carrusel de películas y discos (perfiles individuales)
  Dos interacciones dinámicas, con JavaScript nativo (sin librerías de
  carrusel externas):
  1) Botones de navegación que desplazan el carrusel con scroll suave.
  2) Efecto "tilt" 3D: cada tarjeta rota levemente en 3D siguiendo la
     posición del mouse (transformaciones CSS calculadas en base a
     dónde está el cursor dentro de la tarjeta).
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Botones prev/next ---
  document.querySelectorAll('.media-nav').forEach((boton) => {
    boton.addEventListener('click', () => {
      const carrusel = boton.closest('.media-carousel');
      const track = carrusel ? carrusel.querySelector('.media-track') : null;
      if (!track) return;

      const direccion = boton.classList.contains('media-nav-prev') ? -1 : 1;
      track.scrollBy({ left: direccion * 220, behavior: 'smooth' });
    });
  });

  // --- 2) Tilt 3D con el mouse ---
  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tieneMouse = window.matchMedia('(hover: hover)').matches;

  if (prefiereMenosMovimiento || !tieneMouse) return; // en touch/mobile no aplica

  document.querySelectorAll('.media-card-inner').forEach((tarjeta) => {
    tarjeta.addEventListener('mousemove', (evento) => {
      const rect = tarjeta.getBoundingClientRect();
      const posicionX = (evento.clientX - rect.left) / rect.width - 0.5;
      const posicionY = (evento.clientY - rect.top) / rect.height - 0.5;

      const rotY = posicionX * 18;
      const rotX = posicionY * -18;

      tarjeta.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.05)`;
    });

    tarjeta.addEventListener('mouseleave', () => {
      tarjeta.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
});
