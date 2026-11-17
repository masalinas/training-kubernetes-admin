// generator/config/layouts.js
// Implementación de plantillas de layouts profesionales para diapositivas en 16:9 con pptxgenjs
// Estilo visual moderno corporativo con píldoras superiores, tarjetas redondeadas e iconos en círculo

const { THEME, getSlideBackground, getHeaderTextStyle, getSubtitleTextStyle, getCardFill } = require('./theme');
const { getIconPath } = require('../utils/icons');

// Helper: Formatear las notas del orador estructuradas en 4 bloques
function formatNotes(notes) {
  if (!notes) return "";
  const parts = [];
  if (notes.objetivo) {
    parts.push(`[OBJETIVO PEDAGÓGICO]\n${notes.objetivo}`);
  }
  if (notes.explicacion) {
    parts.push(`[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]\n${notes.explicacion}`);
  }
  if (notes.interaccion) {
    parts.push(`[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]\n${notes.interaccion}`);
  }
  if (notes.labGotcha) {
    parts.push(`[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]\n${notes.labGotcha}`);
  }
  return parts.join("\n\n");
}

// Helper: Detector semántico de icono según el título o contexto
function detectIcon(text = "") {
  const lower = text.toLowerCase();
  if (lower.includes("red") || lower.includes("cni") || lower.includes("service") || lower.includes("ingress") || lower.includes("dns") || lower.includes("port")) {
    return "network";
  }
  if (lower.includes("seguridad") || lower.includes("rbac") || lower.includes("policy") || lower.includes("secret") || lower.includes("hardening") || lower.includes("cert")) {
    return "shield";
  }
  if (lower.includes("storage") || lower.includes("almacenamiento") || lower.includes("pv") || lower.includes("pvc") || lower.includes("nfs") || lower.includes("etcd") || lower.includes("base de datos")) {
    return "database";
  }
  if (lower.includes("worker") || lower.includes("node") || lower.includes("control plane") || lower.includes("arquitectura") || lower.includes("host") || lower.includes("servidor")) {
    return "server";
  }
  if (lower.includes("monitor") || lower.includes("prometheus") || lower.includes("grafana") || lower.includes("métrica") || lower.includes("dashboard") || lower.includes("qos") || lower.includes("hpa")) {
    return "chart";
  }
  if (lower.includes("helm") || lower.includes("chart") || lower.includes("paquete") || lower.includes("deployment") || lower.includes("workload") || lower.includes("pod")) {
    return "box";
  }
  if (lower.includes("troubleshoot") || lower.includes("crash") || lower.includes("oom") || lower.includes("diagnóstico") || lower.includes("fallo") || lower.includes("error") || lower.includes("pending")) {
    return "troubleshoot";
  }
  if (lower.includes("kubeadm") || lower.includes("kubeconfig") || lower.includes("kubectl") || lower.includes("cli") || lower.includes("comando") || lower.includes("install")) {
    return "terminal";
  }
  if (lower.includes("ciclo") || lower.includes("lifecycle") || lower.includes("rollout") || lower.includes("drain") || lower.includes("upgrade") || lower.includes("mantenimiento") || lower.includes("autoscal")) {
    return "refresh";
  }
  if (lower.includes("objetivo") || lower.includes("requisito") || lower.includes("éxito") || lower.includes("roadmap") || lower.includes("certificación") || lower.includes("resumen")) {
    return "check";
  }
  return "gears";
}

// Helper: Cabecera estándar con píldora superior oscura estilo captura usuario
function addHeader(slide, title, subtitle, moduleBadge, isDark = false, pptx) {
  const marginX = THEME.layout.marginHorizontal;

  // Píldora superior oscura (#0F2942)
  if (moduleBadge) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: marginX,
      y: 0.25,
      w: 2.8,
      h: 0.26,
      fill: { color: isDark ? THEME.colors.navyCard : THEME.colors.navyPill },
      rectRadius: 0.13,
      line: { style: "none" },
    });

    slide.addText(moduleBadge.toUpperCase(), {
      x: marginX,
      y: 0.25,
      w: 2.8,
      h: 0.26,
      fontFace: THEME.fonts.title,
      fontSize: 8.5,
      bold: true,
      color: "FFFFFF",
      align: "center",
      valign: "middle",
      margin: 0,
    });
  }

  // Título y Subtítulo en un único flujo de texto garantizado anti-solapamiento
  const titleLen = (title || "").length;
  let titleFontSize = 24;
  if (titleLen > 55) titleFontSize = 19.5;
  else if (titleLen > 42) titleFontSize = 21.5;

  const headerRuns = [
    {
      text: title + (subtitle ? "\n" : ""),
      options: {
        fontFace: THEME.fonts.title,
        fontSize: titleFontSize,
        bold: true,
        color: isDark ? THEME.colors.textLight : THEME.colors.navyTitle,
      }
    }
  ];

  if (subtitle) {
    headerRuns.push({
      text: subtitle,
      options: {
        fontFace: THEME.fonts.body,
        fontSize: 11.5,
        color: isDark ? THEME.colors.textLightMuted : THEME.colors.textMuted,
        paraSpaceBefore: 3,
      }
    });
  }

  slide.addText(headerRuns, {
    x: marginX,
    y: moduleBadge ? 0.58 : 0.35,
    w: 8.8,
    h: 0.82,
    valign: "top",
    margin: 0,
  });
}

// Helper: Pie de diapositiva
function addFooter(slide, slideNumber, totalSlides, isDark = false) {
  slide.addText("Kubernetes Administración • Clústeres, Seguridad y Observabilidad (30 Horas)", {
    x: THEME.layout.marginHorizontal,
    y: 5.25,
    w: 7.0,
    h: 0.25,
    fontFace: THEME.fonts.body,
    fontSize: 9,
    color: isDark ? THEME.colors.textLightMuted : THEME.colors.textMuted,
    margin: 0,
  });

  if (slideNumber) {
    const pageText = totalSlides ? `${slideNumber} / ${totalSlides}` : `${slideNumber}`;
    slide.addText(pageText, {
      x: 8.0,
      y: 5.25,
      w: 1.4,
      h: 0.25,
      fontFace: THEME.fonts.body,
      fontSize: 9,
      align: "right",
      color: isDark ? THEME.colors.textLightMuted : THEME.colors.textMuted,
      margin: 0,
    });
  }
}

// Helper: Limpieza de viñetas y formato markdown
function cleanBulletText(str) {
  if (!str) return "";
  return String(str)
    .replace(/^[\s•\-\*]+\s*/, "")
    .replace(/\*\*(.*?)\*\*/g, "$1");
}

// Layout 1: COVER
function renderCover(slide, data, pptx) {
  slide.background = getSlideBackground(true);

  // Píldora superior
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0,
    y: 1.1,
    w: 4.8,
    h: 0.38,
    fill: { color: THEME.colors.k8sBlue },
    rectRadius: 0.19,
    line: { style: "none" },
  });

  slide.addText(data.badge ? data.badge.toUpperCase() : "CURSO OFICIAL DE ADMINISTRACIÓN", {
    x: 1.0,
    y: 1.1,
    w: 4.8,
    h: 0.38,
    fontFace: THEME.fonts.title,
    fontSize: 10,
    bold: true,
    color: THEME.colors.textLight,
    align: "center",
    valign: "middle",
    margin: 0,
  });

  // Título principal grande
  slide.addText(data.title, {
    x: 1.0,
    y: 1.65,
    w: 8.0,
    h: 1.2,
    fontFace: THEME.fonts.title,
    fontSize: 34,
    bold: true,
    color: THEME.colors.textLight,
    margin: 0,
  });

  // Subtítulo
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 1.0,
      y: 2.95,
      w: 8.0,
      h: 0.6,
      fontFace: THEME.fonts.body,
      fontSize: 15,
      color: THEME.colors.textLightMuted,
      margin: 0,
    });
  }

  // Tarjetas de metadatos con iconos circulares
  if (data.meta && Array.isArray(data.meta)) {
    const cardY = 3.8;
    const cardW = 2.45;
    const gap = 0.3;
    const metaIcons = ["chart", "gears", "check"];

    data.meta.forEach((item, idx) => {
      const cardX = 1.0 + idx * (cardW + gap);
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: cardY,
        w: cardW,
        h: 0.95,
        fill: { color: THEME.colors.navyCard },
        line: { color: THEME.colors.k8sBlue, width: 1.2 },
        rectRadius: 0.1,
      });

      // Icono
      const iconFile = getIconPath(metaIcons[idx] || "check");
      slide.addImage({ path: iconFile, x: cardX + 0.15, y: cardY + 0.22, w: 0.5, h: 0.5 });

      slide.addText(item.label.toUpperCase(), {
        x: cardX + 0.75,
        y: cardY + 0.15,
        w: cardW - 0.85,
        h: 0.2,
        fontFace: THEME.fonts.title,
        fontSize: 8.5,
        bold: true,
        color: THEME.colors.k8sBlue,
        margin: 0,
      });

      slide.addText(item.value, {
        x: cardX + 0.75,
        y: cardY + 0.38,
        w: cardW - 0.85,
        h: 0.45,
        fontFace: THEME.fonts.body,
        fontSize: 12,
        bold: true,
        color: THEME.colors.textLight,
        margin: 0,
      });
    });
  }

  if (data.notes) {
    slide.addNotes(formatNotes(data.notes));
  }
}

// Layout 2: CARDS_GRID (2, 3 o 4 tarjetas organizadas con iconos circulares)
function renderCardsGrid(slide, data, pptx) {
  slide.background = getSlideBackground(false);
  addHeader(slide, data.title, data.subtitle, data.moduleBadge, false, pptx);
  addFooter(slide, data.slideNumber, data.totalSlides, false);

  const cards = data.cards || [];
  const topY = THEME.layout.contentTop;
  const availW = THEME.layout.contentWidth;
  const availH = THEME.layout.contentHeight;
  const marginX = THEME.layout.marginHorizontal;

  if (cards.length === 2) {
    const cardW = (availW - 0.4) / 2;
    cards.forEach((c, i) => {
      const cardX = marginX + i * (cardW + 0.4);
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: topY,
        w: cardW,
        h: availH,
        ...getCardFill(false),
      });

      // Icono circular
      const iconPath = getIconPath(detectIcon(c.title));
      slide.addImage({ path: iconPath, x: cardX + 0.25, y: topY + 0.22, w: 0.48, h: 0.48 });

      // Título al lado del icono
      slide.addText(c.title, {
        x: cardX + 0.82,
        y: topY + 0.20,
        w: cardW - 0.95,
        h: 0.52,
        fontFace: THEME.fonts.title,
        fontSize: 15,
        bold: true,
        color: THEME.colors.navyTitle,
        valign: "middle",
        margin: 0,
      });

      // Viñetas formateadas
      const textRows = Array.isArray(c.items) ? c.items.map(it => ({
        text: cleanBulletText(it),
        options: { bullet: true, breakLine: true, fontSize: 11, color: THEME.colors.textBody, paraSpaceAfter: 5 }
      })) : [{ text: cleanBulletText(c.text), options: { fontSize: 11, color: THEME.colors.textBody } }];

      slide.addText(textRows, {
        x: cardX + 0.25,
        y: topY + 0.82,
        w: cardW - 0.5,
        h: availH - 0.95,
        fontFace: THEME.fonts.body,
        valign: "top",
        margin: 0,
      });
    });
  } else if (cards.length === 3) {
    const cardW = (availW - 0.5) / 3;
    cards.forEach((c, i) => {
      const cardX = marginX + i * (cardW + 0.25);
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: topY,
        w: cardW,
        h: availH,
        ...getCardFill(false),
      });

      // Icono circular
      const iconPath = getIconPath(detectIcon(c.title));
      slide.addImage({ path: iconPath, x: cardX + 0.18, y: topY + 0.18, w: 0.42, h: 0.42 });

      // Título al lado del icono
      slide.addText(c.title, {
        x: cardX + 0.68,
        y: topY + 0.15,
        w: cardW - 0.82,
        h: 0.48,
        fontFace: THEME.fonts.title,
        fontSize: 12.5,
        bold: true,
        color: THEME.colors.navyTitle,
        valign: "middle",
        margin: 0,
      });

      // Viñetas formateadas adaptativas
      const isDense = Array.isArray(c.items) && c.items.length >= 5;
      const textRows = Array.isArray(c.items) ? c.items.map(it => ({
        text: cleanBulletText(it),
        options: {
          bullet: true,
          breakLine: true,
          fontSize: isDense ? 9.2 : 10,
          color: THEME.colors.textBody,
          paraSpaceAfter: isDense ? 2.5 : 4,
        }
      })) : [{ text: cleanBulletText(c.text), options: { fontSize: 10, color: THEME.colors.textBody } }];

      slide.addText(textRows, {
        x: cardX + 0.18,
        y: topY + 0.70,
        w: cardW - 0.36,
        h: availH - 0.80,
        fontFace: THEME.fonts.body,
        valign: "top",
        margin: 0,
      });
    });
  } else if (cards.length === 4) {
    const cols = 2;
    const cardW = (availW - 0.3) / 2;
    const cardH = (availH - 0.22) / 2;
    cards.forEach((c, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const cardX = marginX + col * (cardW + 0.3);
      const cardY = topY + row * (cardH + 0.22);

      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: cardY,
        w: cardW,
        h: cardH,
        ...getCardFill(false),
      });

      // Icono circular
      const iconPath = getIconPath(detectIcon(c.title));
      slide.addImage({ path: iconPath, x: cardX + 0.18, y: cardY + 0.12, w: 0.38, h: 0.38 });

      // Título al lado del icono
      slide.addText(c.title, {
        x: cardX + 0.64,
        y: cardY + 0.08,
        w: cardW - 0.80,
        h: 0.44,
        fontFace: THEME.fonts.title,
        fontSize: 12.5,
        bold: true,
        color: THEME.colors.navyTitle,
        valign: "middle",
        margin: 0,
      });

      // Viñetas en caja independiente bien calculada
      const isDense = Array.isArray(c.items) && c.items.length >= 4;
      const textRows = Array.isArray(c.items) ? c.items.map(it => ({
        text: cleanBulletText(it),
        options: {
          bullet: true,
          breakLine: true,
          fontSize: isDense ? 8.8 : 9.2,
          color: THEME.colors.textBody,
          paraSpaceAfter: isDense ? 1.5 : 2.5,
        }
      })) : [{ text: cleanBulletText(c.text), options: { fontSize: 9.0, color: THEME.colors.textBody } }];

      slide.addText(textRows, {
        x: cardX + 0.18,
        y: cardY + 0.52,
        w: cardW - 0.36,
        h: cardH - 0.56,
        fontFace: THEME.fonts.body,
        valign: "top",
        margin: 0,
      });
    });
  }

  if (data.notes) {
    slide.addNotes(formatNotes(data.notes));
  }
}

// Layout 3: YAML_ANALYSIS (Estilo exacto de la captura de pantalla de usuario)
function renderYamlAnalysis(slide, data, pptx) {
  slide.background = getSlideBackground(false);
  addHeader(slide, data.title, data.subtitle, data.moduleBadge, false, pptx);
  addFooter(slide, data.slideNumber, data.totalSlides, false);

  const marginX = THEME.layout.marginHorizontal;
  const topY = THEME.layout.contentTop;
  const leftW = 4.7;
  const rightW = 3.8;
  const gap = 0.3;
  const availH = THEME.layout.contentHeight;

  // Columna Izquierda: Tarjeta suave azulada para Código (#F1F5F9)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: marginX,
    y: topY,
    w: leftW,
    h: availH,
    ...getCardFill(true),
  });

  // Etiqueta superior del código (ej. YAML · deployment-web.yaml)
  const tagText = data.filename ? `YAML · ${data.filename}` : "MANIFEST YAML SPEC";
  slide.addText(tagText, {
    x: marginX + 0.25,
    y: topY + 0.18,
    w: leftW - 0.5,
    h: 0.25,
    fontFace: THEME.fonts.title,
    fontSize: 10,
    bold: true,
    color: THEME.colors.navyPill,
    margin: 0,
  });

  // Código formateado adaptativo
  if (data.yamlCode) {
    const lineCount = (data.yamlCode || "").split("\n").length;
    let codeFontSize = 9.3;
    if (lineCount > 25) {
      codeFontSize = 7.0;
    } else if (lineCount > 20) {
      codeFontSize = 7.8;
    } else if (lineCount > 15) {
      codeFontSize = 8.4;
    } else if (lineCount > 12) {
      codeFontSize = 8.8;
    }

    slide.addText(data.yamlCode, {
      x: marginX + 0.25,
      y: topY + 0.48,
      w: leftW - 0.5,
      h: availH - 0.65,
      fontFace: THEME.fonts.code,
      fontSize: codeFontSize,
      color: THEME.colors.textDark,
      valign: "top",
      margin: 0,
    });
  }

  // Columna Derecha: Tarjeta Blanca con Icono Circular y Explicaciones
  const rightX = marginX + leftW + gap;
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: rightX,
    y: topY,
    w: rightW,
    h: availH,
    ...getCardFill(false),
  });

  // Icono circular
  const iconPath = getIconPath(detectIcon(data.leftTitle || "check"));
  slide.addImage({ path: iconPath, x: rightX + 0.25, y: topY + 0.22, w: 0.48, h: 0.48 });

  // Título de la tarjeta derecha
  slide.addText(data.leftTitle || "Directivas y Campos Clave", {
    x: rightX + 0.82,
    y: topY + 0.20,
    w: rightW - 0.95,
    h: 0.52,
    fontFace: THEME.fonts.title,
    fontSize: 15,
    bold: true,
    color: THEME.colors.navyTitle,
    valign: "middle",
    margin: 0,
  });

  // Directivas explicadas
  if (Array.isArray(data.directives)) {
    const isDense = data.directives.length >= 5;
    const dirItems = data.directives.map(d => ([
      { text: `${d.field}: `, options: { bold: true, color: THEME.colors.codeKeyword, fontSize: isDense ? 10 : 10.8 } },
      { text: `${cleanBulletText(d.desc)}\n`, options: { color: THEME.colors.textBody, fontSize: isDense ? 10 : 10.8, paraSpaceAfter: isDense ? 3.5 : 6 } }
    ])).flat();

    slide.addText(dirItems, {
      x: rightX + 0.25,
      y: topY + 0.80,
      w: rightW - 0.5,
      h: availH - 0.95,
      fontFace: THEME.fonts.body,
      valign: "top",
      margin: 0,
    });
  }

  if (data.notes) {
    slide.addNotes(formatNotes(data.notes));
  }
}

// Layout 4: SPLIT_ARCHITECTURE (Tarjeta con icono a la izquierda, diagrama a la derecha)
function renderSplitArchitecture(slide, data, pptx, diagramRenderer) {
  slide.background = getSlideBackground(false);
  addHeader(slide, data.title, data.subtitle, data.moduleBadge, false, pptx);
  addFooter(slide, data.slideNumber, data.totalSlides, false);

  const marginX = THEME.layout.marginHorizontal;
  const topY = THEME.layout.contentTop;
  const leftW = 3.9;
  const rightW = 4.6;
  const gap = 0.3;
  const availH = THEME.layout.contentHeight;

  // Tarjeta Izquierda de Contenido
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: marginX,
    y: topY,
    w: leftW,
    h: availH,
    ...getCardFill(false),
  });

  // Icono circular
  const iconPath = getIconPath(detectIcon(data.conceptTitle || "gears"));
  slide.addImage({ path: iconPath, x: marginX + 0.25, y: topY + 0.22, w: 0.48, h: 0.48 });

  // Título
  slide.addText(data.conceptTitle || "Principios Arquitectónicos", {
    x: marginX + 0.82,
    y: topY + 0.20,
    w: leftW - 0.95,
    h: 0.52,
    fontFace: THEME.fonts.title,
    fontSize: 15,
    bold: true,
    color: THEME.colors.navyTitle,
    valign: "middle",
    margin: 0,
  });

  // Puntos clave
  if (Array.isArray(data.points)) {
    const pointRows = data.points.map(pt => ({
      text: cleanBulletText(pt),
      options: { bullet: true, breakLine: true, fontSize: 10, color: THEME.colors.textBody, paraSpaceAfter: 4.5 }
    }));

    slide.addText(pointRows, {
      x: marginX + 0.25,
      y: topY + 0.82,
      w: leftW - 0.5,
      h: availH - 0.95,
      fontFace: THEME.fonts.body,
      valign: "top",
      margin: 0,
    });
  }

  // Zona Derecha: Diagrama vectorial nativo
  const diagX = marginX + leftW + gap;
  if (typeof diagramRenderer === "function") {
    diagramRenderer(slide, diagX, topY, rightW, availH, data.diagramData, pptx);
  }

  if (data.notes) {
    slide.addNotes(formatNotes(data.notes));
  }
}

// Layout 5: COMPARISON (2 columnas con iconos circulares)
function renderComparison(slide, data, pptx) {
  slide.background = getSlideBackground(false);
  addHeader(slide, data.title, data.subtitle, data.moduleBadge, false, pptx);
  addFooter(slide, data.slideNumber, data.totalSlides, false);

  const marginX = THEME.layout.marginHorizontal;
  const topY = THEME.layout.contentTop;
  const colW = (THEME.layout.contentWidth - 0.4) / 2;
  const availH = THEME.layout.contentHeight;

  const cols = [data.optionA, data.optionB];
  cols.forEach((opt, idx) => {
    if (!opt) return;
    const colX = marginX + idx * (colW + 0.4);

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: colX,
      y: topY,
      w: colW,
      h: availH,
      fill: { color: opt.isRecommended ? THEME.colors.k8sBlueLight : THEME.colors.bgWhite },
      line: { color: opt.isRecommended ? THEME.colors.k8sBlue : THEME.colors.cardBorder, width: opt.isRecommended ? 1.8 : 1.2 },
      rectRadius: 0.12,
    });

    // Icono circular
    const iconPath = getIconPath(detectIcon(opt.title));
    slide.addImage({ path: iconPath, x: colX + 0.25, y: topY + 0.22, w: 0.48, h: 0.48 });

    // Título y tag
    slide.addText([
      { text: opt.tag ? `${opt.tag.toUpperCase()}\n` : "", options: { fontSize: 8.5, bold: true, color: opt.isRecommended ? THEME.colors.k8sBlueDark : THEME.colors.textMuted } },
      { text: opt.title, options: { fontSize: 14.5, bold: true, color: THEME.colors.navyTitle } }
    ], {
      x: colX + 0.82,
      y: topY + 0.18,
      w: colW - 0.95,
      h: 0.58,
      fontFace: THEME.fonts.title,
      valign: "middle",
      margin: 0,
    });

    // Lista de características
    if (Array.isArray(opt.items)) {
      const isDense = opt.items.length >= 5;
      const rows = opt.items.map(it => ({
        text: cleanBulletText(it),
        options: {
          bullet: true,
          breakLine: true,
          fontSize: isDense ? 9.8 : 10.5,
          color: THEME.colors.textBody,
          paraSpaceAfter: isDense ? 4 : 5.5,
        }
      }));
      slide.addText(rows, {
        x: colX + 0.25,
        y: topY + 0.82,
        w: colW - 0.5,
        h: availH - 0.95,
        fontFace: THEME.fonts.body,
        valign: "top",
        margin: 0,
      });
    }
  });

  if (data.notes) {
    slide.addNotes(formatNotes(data.notes));
  }
}

module.exports = {
  renderCover,
  renderCardsGrid,
  renderYamlAnalysis,
  renderSplitArchitecture,
  renderComparison,
  formatNotes,
};
