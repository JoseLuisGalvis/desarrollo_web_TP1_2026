/*
  main.js — Portada
  Interacción dinámica de la portada: saludo según la hora del
  visitante (Date + getHours) que se actualiza al cargar la página.
*/
document.addEventListener('DOMContentLoaded', () => {
  const saludo = document.getElementById('saludo');
  if (!saludo) return;
  const hora = new Date().getHours();
  const momento = hora < 12 ? 'Buenos días' : hora < 20 ? 'Buenas tardes' : 'Buenas noches';
  saludo.textContent = `${momento}, bienvenido/a al sitio del equipo.`;
});
