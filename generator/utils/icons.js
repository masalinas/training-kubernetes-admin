// generator/utils/icons.js
// Catálogo de iconos vectoriales SVG con círculo azul marino oscuro (#0F2942)
// Cumple con la estética de tarjetas profesionales con icono en círculo

const fs = require('fs');
const path = require('path');

const iconDir = path.resolve(__dirname, '../assets/icons');
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

const ICONS_SVG = {
  gears: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <circle cx="50" cy="50" r="10" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M50 26 v6 M50 68 v6 M26 50 h6 M68 50 h6 M33 33 l4.5 4.5 M62.5 62.5 l4.5 4.5 M33 67 l4.5 -4.5 M62.5 37.5 l4.5 -4.5" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="17" fill="none" stroke="#38BDF8" stroke-width="3"/>
  </svg>`,

  server: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <rect x="25" y="28" width="50" height="18" rx="4" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <circle cx="34" cy="37" r="3" fill="#38BDF8"/>
    <line x1="44" y1="37" x2="66" y2="37" stroke="#FFFFFF" stroke-width="3"/>
    <rect x="25" y="54" width="50" height="18" rx="4" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <circle cx="34" cy="63" r="3" fill="#34D399"/>
    <line x1="44" y1="63" x2="66" y2="63" stroke="#FFFFFF" stroke-width="3"/>
  </svg>`,

  shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <path d="M50 25 L73 33 V52 C73 66 63 74 50 78 C37 74 27 66 27 52 V33 Z" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
    <path d="M41 51 L47 57 L60 44" fill="none" stroke="#34D399" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  network: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <circle cx="50" cy="34" r="8" fill="none" stroke="#38BDF8" stroke-width="4"/>
    <circle cx="31" cy="66" r="8" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <circle cx="69" cy="66" r="8" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <line x1="50" y1="42" x2="50" y2="52" stroke="#FFFFFF" stroke-width="4"/>
    <line x1="50" y1="52" x2="31" y2="58" stroke="#FFFFFF" stroke-width="4"/>
    <line x1="50" y1="52" x2="69" y2="58" stroke="#FFFFFF" stroke-width="4"/>
  </svg>`,

  database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <ellipse cx="50" cy="33" rx="23" ry="8" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M27 33 v16 c0 4.5 10 8 23 8 s23 -3.5 23 -8 v-16" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M27 49 v16 c0 4.5 10 8 23 8 s23 -3.5 23 -8 v-16" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <line x1="50" y1="41" x2="50" y2="73" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="3,3"/>
  </svg>`,

  box: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <path d="M50 25 L73 38 L50 51 L27 38 Z" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M27 38 V63 L50 76 V51" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M73 38 V63 L50 76" fill="none" stroke="#38BDF8" stroke-width="4"/>
  </svg>`,

  chart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <rect x="27" y="52" width="8" height="20" rx="2" fill="#38BDF8"/>
    <rect x="41" y="40" width="8" height="32" rx="2" fill="#34D399"/>
    <rect x="55" y="30" width="8" height="42" rx="2" fill="#FBBF24"/>
    <rect x="69" y="46" width="8" height="26" rx="2" fill="#F87171"/>
    <line x1="22" y1="74" x2="80" y2="74" stroke="#FFFFFF" stroke-width="3"/>
  </svg>`,

  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <circle cx="50" cy="50" r="26" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M39 50 L47 58 L63 42" fill="none" stroke="#34D399" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  alert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <path d="M50 25 L75 70 H25 Z" fill="none" stroke="#F59E0B" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="50" y1="41" x2="50" y2="55" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="50" cy="63" r="2.5" fill="#FFFFFF"/>
  </svg>`,

  terminal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <rect x="24" y="29" width="52" height="42" rx="5" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M33 42 L42 50 L33 58" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="46" y1="58" x2="60" y2="58" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  refresh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <path d="M50 28 A22 22 0 1 1 28 50" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M28 28 V40 H40" fill="none" stroke="#38BDF8" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  troubleshoot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="48" fill="#0F2942"/>
    <circle cx="45" cy="45" r="17" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
    <line x1="57" y1="57" x2="73" y2="73" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
    <line x1="45" y1="36" x2="45" y2="47" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="45" cy="52" r="2" fill="#EF4444"/>
  </svg>`,
};

// Generar los ficheros SVG en disco
for (const [key, svg] of Object.entries(ICONS_SVG)) {
  const filePath = path.join(iconDir, `${key}.svg`);
  fs.writeFileSync(filePath, svg.trim(), 'utf-8');
}

function getIconPath(name = "gears") {
  const normalized = (name || "gears").toLowerCase();
  const target = ICONS_SVG[normalized] ? normalized : "gears";
  return path.join(iconDir, `${target}.svg`);
}

module.exports = {
  getIconPath,
  iconDir,
};
