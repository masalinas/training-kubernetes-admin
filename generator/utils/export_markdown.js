// generator/utils/export_markdown.js
// Generador de la Guía Docente complementaria en Markdown (dist/GUIA_DEL_DOCENTE.md)
// Extrae de forma sincronizada el contenido proyectado y las notas estructuradas

const fs = require('fs');
const path = require('path');

const modules = [
  require('../modules/m00_intro'),
  require('../modules/m01_architecture'),
  require('../modules/m02_workloads'),
  require('../modules/m03_networking'),
  require('../modules/m04_storage'),
  require('../modules/m05_scheduling'),
  require('../modules/m06_security'),
  require('../modules/m07_observability'),
  require('../modules/m08_helm'),
  require('../modules/m09_day2_ops'),
  require('../modules/m10_wrapup'),
];

// Helper: Generar slug válido para anclas Markdown
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar tildes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateMarkdownGuide() {
  console.log("==================================================================");
  console.log("Iniciando generación de la Guía Docente (GUIA_DEL_DOCENTE.md)");
  console.log("==================================================================");

  let md = "";

  // 1. Cabecera y Metadatos Generales
  md += "# GUÍA DEL DOCENTE • KUBERNETES ADMINISTRACIÓN\n";
  md += "## Clústeres, Seguridad, Observabilidad y Operaciones de Día 2\n\n";
  md += "**Duración del Curso:** 30 Horas Lectivas (40% Exposición Teórica / 60% Laboratorios Prácticos)  \n";
  md += "**Nivel:** Avanzado / Administradores de Sistemas y DevOps  \n";
  md += "**Estrategia de Laboratorio:**  \n";
  md += "- **Módulo 1:** Instalación profunda de clúster de 2 nodos con `kubeadm` en máquinas virtuales **VirtualBox** (siguiendo la guía técnica oficial paso a paso).  \n";
  md += "- **Módulos 2 al 9:** Prácticas ágiles de despliegue, persistencia, políticas de red y troubleshooting sobre **`minikube`**.  \n\n";
  md += "---\n\n";

  // 2. Tabla de Contenidos Navegable
  md += "## Tabla de Contenidos y Navegación por Diapositivas\n\n";

  let globalSlideCounter = 1;
  const slideIndexData = [];

  modules.forEach(mod => {
    md += `### [${mod.title}](#${slugify(mod.title)})\n`;
    mod.slides.forEach(slide => {
      const slideNum = globalSlideCounter++;
      const slideAnchor = slugify(`diapositiva-${slideNum}-${slide.title}`);
      md += `- [Diapositiva #${slideNum}: ${slide.title}](#${slideAnchor})\n`;
      slideIndexData.push({
        slideNum,
        slideAnchor,
        moduleTitle: mod.title,
        slide,
      });
    });
    md += "\n";
  });

  md += "---\n\n";

  // 3. Contenido Detallado Diapositiva a Diapositiva
  modules.forEach(mod => {
    md += `## ${mod.title}\n\n`;

    const moduleSlides = slideIndexData.filter(s => s.moduleTitle === mod.title);

    moduleSlides.forEach(item => {
      const { slideNum, slideAnchor, slide } = item;
      md += `### <a id="${slideAnchor}"></a>Diapositiva #${slideNum}: ${slide.title}\n\n`;
      
      if (slide.subtitle) {
        md += `*Subtítulo:* **${slide.subtitle}**  \n`;
      }
      md += `*Layout en Presentación:* \`${slide.layout}\`  \n\n`;

      // Contenido visual proyectado
      md += "#### Contenido Proyectado en la Diapositiva\n\n";

      if (slide.cards && Array.isArray(slide.cards)) {
        slide.cards.forEach(card => {
          md += `**${card.title}**\n`;
          if (card.items && Array.isArray(card.items)) {
            card.items.forEach(it => {
              md += `- ${it}\n`;
            });
          }
          md += "\n";
        });
      }

      if (slide.optionA && slide.optionB) {
        md += `**Opción A: ${slide.optionA.title}** (${slide.optionA.tag})\n`;
        slide.optionA.items.forEach(it => { md += `- ${it}\n`; });
        md += `\n**Opción B: ${slide.optionB.title}** (${slide.optionB.tag})\n`;
        slide.optionB.items.forEach(it => { md += `- ${it}\n`; });
        md += "\n";
      }

      if (slide.points && Array.isArray(slide.points)) {
        md += `**${slide.conceptTitle || "Conceptos Clave"}**\n`;
        slide.points.forEach(pt => {
          md += `- ${pt}\n`;
        });
        md += "\n";
      }

      if (slide.yamlCode) {
        md += `**Manifiesto / Comandos (${slide.filename || "YAML"}):**\n\n`;
        md += "```yaml\n";
        md += `${slide.yamlCode}\n`;
        md += "```\n\n";
      }

      // Notas estructuradas del orador
      md += "#### Guía Pedagógica para el Docente\n\n";
      if (slide.notes) {
        if (slide.notes.objetivo) {
          md += `> **[OBJETIVO PEDAGÓGICO]**  \n> ${slide.notes.objetivo}\n\n`;
        }
        if (slide.notes.explicacion) {
          md += `> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  \n> ${slide.notes.explicacion}\n\n`;
        }
        if (slide.notes.interaccion) {
          md += `> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  \n> *"${slide.notes.interaccion}"*\n\n`;
        }
        if (slide.notes.labGotcha) {
          md += `> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  \n> ${slide.notes.labGotcha}\n\n`;
        }
      } else {
        md += "> *No se han especificado notas adicionales para esta diapositiva.*\n\n";
      }

      md += "---\n\n";
    });
  });

  const distDir = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outputPath = path.join(distDir, 'GUIA_DEL_DOCENTE.md');
  fs.writeFileSync(outputPath, md, 'utf-8');

  console.log("==================================================================");
  console.log(`¡ÉXITO! Guía docente generada en: ${outputPath}`);
  console.log(`Total de diapositivas documentadas: ${slideIndexData.length}`);
  console.log("==================================================================");

  return outputPath;
}

if (require.main === module) {
  generateMarkdownGuide();
}

module.exports = {
  generateMarkdownGuide,
};
