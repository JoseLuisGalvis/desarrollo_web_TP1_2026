/*
  perfil.js — Página de perfil individual
  Interacciones dinámicas exigidas por la consigna:
  1) Al tocar/clickear la tarjeta-avatar, se "da vuelta" (flip 3D con
     CSS) y muestra un dato curioso elegido al azar de una lista
     (array + Math.random), tomado de data-facts en el HTML.
  2) Al cargar la página, las barras de habilidades se animan desde
     0% hasta el valor real (atributo data-level) usando una clase
     que dispara la transición CSS.
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Flip card con dato aleatorio ---
  const flipCard = document.querySelector('.flip-card');
  const factEl = document.getElementById('random-fact');

  if (flipCard && factEl) {
    let facts = [];
    try {
      facts = JSON.parse(flipCard.dataset.facts || '[]');
    } catch (error) {
      console.error('No se pudieron leer los datos curiosos:', error);
    }

    flipCard.addEventListener('click', () => {
      const yaEstaDadaVuelta = flipCard.classList.contains('is-flipped');

      if (!yaEstaDadaVuelta && facts.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * facts.length);
        factEl.textContent = facts[indiceAleatorio];
      }

      flipCard.classList.toggle('is-flipped');
      flipCard.setAttribute('aria-pressed', String(!yaEstaDadaVuelta));
    });

    // Accesibilidad: también se puede activar con Enter/Espacio
    flipCard.setAttribute('tabindex', '0');
    flipCard.setAttribute('role', 'button');
    flipCard.setAttribute('aria-pressed', 'false');
    flipCard.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        flipCard.click();
      }
    });
  }

  // --- 2) Animación de barras de habilidades ---
  const profileInfo = document.querySelector('.profile-info');
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  if (profileInfo && skillFills.length > 0) {
    skillFills.forEach((fill) => {
      const nivel = fill.dataset.level || '0';
      fill.style.setProperty('--fill', `${nivel}%`);
    });

    // Pequeño delay para que la transición CSS se note al entrar
    window.requestAnimationFrame(() => {
      setTimeout(() => profileInfo.classList.add('skills-shown'), 150);
    });
  }
});
