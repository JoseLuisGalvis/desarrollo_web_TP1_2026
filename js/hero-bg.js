/*
  hero-bg.js — Fondo dinámico del HERO (solo portada)
  Interacción dinámica exigida por la consigna, implementada con el
  Canvas API nativo del navegador (sin librerías externas como
  Three.js o GSAP): dibuja una cuadrícula de dos capas —una más
  lenta y tenue "de fondo", otra más rápida y visible "de frente"—
  que se desplazan en diagonal para dar sensación de profundidad
  (parallax), con puntos en las intersecciones que laten suavemente.
*/

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  const hero = canvas ? canvas.closest('.hero') : null;
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ancho = 0;
  let alto = 0;
  let dpr = window.devicePixelRatio || 1;
  let t = 0;
  let colorAcento = leerColorAcento();

  function leerColorAcento() {
    const valor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    return valor || '#4da6ff';
  }

  function hexARgb(hex) {
    const limpio = hex.replace('#', '');
    const completo = limpio.length === 3
      ? limpio.split('').map((c) => c + c).join('')
      : limpio;
    const numero = parseInt(completo, 16);
    return {
      r: (numero >> 16) & 255,
      g: (numero >> 8) & 255,
      b: numero & 255,
    };
  }

  function ajustarTamano() {
    dpr = window.devicePixelRatio || 1;
    ancho = hero.clientWidth;
    alto = hero.clientHeight;
    canvas.width = ancho * dpr;
    canvas.height = alto * dpr;
    canvas.style.width = `${ancho}px`;
    canvas.style.height = `${alto}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function dibujarCapa(espaciado, velocidad, alphaLinea, alphaPunto) {
    const offset = (t * velocidad) % espaciado;
    const { r, g, b } = hexARgb(colorAcento);

    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alphaLinea})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -espaciado + offset; x < ancho + espaciado; x += espaciado) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, alto);
    }
    for (let y = -espaciado + offset; y < alto + espaciado; y += espaciado) {
      ctx.moveTo(0, y);
      ctx.lineTo(ancho, y);
    }
    ctx.stroke();

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alphaPunto})`;
    for (let x = -espaciado + offset; x < ancho + espaciado; x += espaciado) {
      for (let y = -espaciado + offset; y < alto + espaciado; y += espaciado) {
        const pulso = (Math.sin((x + y) * 0.02 + t * 0.002) + 1) / 2;
        const radio = 1 + pulso * 1.6;
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function dibujarFrame() {
    ctx.clearRect(0, 0, ancho, alto);
    dibujarCapa(72, 0.15, 0.05, 0.10); // capa de fondo: lenta y tenue
    dibujarCapa(42, 0.32, 0.09, 0.20); // capa de frente: más rápida y notoria
  }

  function animar() {
    t += 1;
    dibujarFrame();
    requestAnimationFrame(animar);
  }

  ajustarTamano();

  if (prefiereMenosMovimiento) {
    // Accesibilidad: si el usuario pidió menos movimiento en su SO,
    // dibujamos la cuadrícula una sola vez, sin animarla.
    dibujarFrame();
  } else {
    animar();
  }

  window.addEventListener('resize', ajustarTamano);
  window.addEventListener('themechange', () => {
    colorAcento = leerColorAcento();
    if (prefiereMenosMovimiento) dibujarFrame();
  });
});
