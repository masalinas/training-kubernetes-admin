// generator/config/theme.js
// Configuración de estilos y tema corporativo Kubernetes profesional
// Basado en la identidad corporativa de Kubernetes y el diseño de tarjetas con iconos

const THEME = {
  colors: {
    navyPill: "0F2942",     // Píldora / badge superior oscuro
    navyTitle: "0B2545",    // Títulos principales en azul marino oscuro
    navyCard: "0F1E36",     // Fondo oscuro para tarjetas especiales
    k8sBlue: "326CE5",      // Azul oficial de Kubernetes
    k8sBlueDark: "1D4ED8",  // Azul acento para directivas de código
    k8sBlueLight: "EBF2FC", // Tinte de selección
    bgWhite: "FFFFFF",      // Fondo blanco puro
    bgLight: "F8FAFC",      // Fondo alternativo muy suave
    cardCodeBg: "F1F5F9",   // Fondo gris/azul suave para código (estilo imagen usuario)
    cardBorder: "E2E8F0",   // Borde sutil de tarjetas
    textDark: "0F172A",     // Texto principal oscuro
    textBody: "334155",     // Texto de cuerpo / viñetas
    textMuted: "64748B",    // Texto secundario / notas
    textLight: "FFFFFF",    // Texto blanco
    textLightMuted: "94A3B8",
    codeKeyword: "1D4ED8",  // Palabras clave en azul intenso
    codeString: "059669",   // Valores / strings en verde esmeralda
    codeParam: "D97706",    // Parámetros en ámbar
    codeComment: "64748B",  // Comentarios en gris
    accentGreen: "10B981",  // Éxito / Verified
    accentAmber: "F59E0B",  // Advertencia
    accentRed: "EF4444",    // Error / Peligro
  },

  fonts: {
    title: "Calibri",
    body: "Calibri",
    code: "Courier New",
  },

  layout: {
    width: 10.0,
    height: 5.625,
    marginHorizontal: 0.6,
    contentTop: 1.45,
    contentHeight: 3.65,
    contentWidth: 8.8,
  },
};

function getSlideBackground(isDark = false) {
  return { color: isDark ? THEME.colors.navyPill : THEME.colors.bgWhite };
}

function getHeaderTextStyle(isDark = false) {
  return {
    fontFace: THEME.fonts.title,
    fontSize: 26,
    bold: true,
    color: isDark ? THEME.colors.textLight : THEME.colors.navyTitle,
    margin: 0,
  };
}

function getSubtitleTextStyle(isDark = false) {
  return {
    fontFace: THEME.fonts.body,
    fontSize: 12,
    color: isDark ? THEME.colors.textLightMuted : THEME.colors.textMuted,
    margin: 0,
  };
}

function getCardFill(isCode = false) {
  return {
    fill: { color: isCode ? THEME.colors.cardCodeBg : THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.12,
  };
}

module.exports = {
  THEME,
  getSlideBackground,
  getHeaderTextStyle,
  getSubtitleTextStyle,
  getCardFill,
};
