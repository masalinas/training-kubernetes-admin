// generator/build.js
// Orquestador principal de generación de la presentación PPTX
// Compila todos los módulos (M00 a M10) hacia dist/kubernetes-administracion-presentacion.pptx

const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');

// Importar layouts y diagramas
const layouts = require('./config/layouts');
const diagrams = require('./utils/diagrams');

// Importar los 11 módulos de contenido
const modules = [
  require('./modules/m00_intro'),
  require('./modules/m01_architecture'),
  require('./modules/m02_workloads'),
  require('./modules/m03_networking'),
  require('./modules/m04_storage'),
  require('./modules/m05_scheduling'),
  require('./modules/m06_security'),
  require('./modules/m07_observability'),
  require('./modules/m08_helm'),
  require('./modules/m09_day2_ops'),
  require('./modules/m10_wrapup'),
];

async function generateDeck() {
  console.log("==================================================================");
  console.log("Iniciando compilación del Slide Deck de Kubernetes Administración");
  console.log("==================================================================");

  // 1. Recopilar y secuenciar todas las diapositivas
  const allSlides = [];
  modules.forEach(mod => {
    mod.slides.forEach(s => {
      allSlides.push({
        ...s,
        moduleName: mod.title,
        moduleId: mod.id,
      });
    });
  });

  const totalSlides = allSlides.length;
  console.log(`Total de diapositivas detectadas: ${totalSlides} distribuidas en ${modules.length} módulos.`);

  // 2. Inicializar pptxgenjs con lienzo 16:9
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Kubernetes Administración (30 Horas)";
  pres.author = "Curso de Formación Técnica";
  pres.subject = "Clústeres, Seguridad, Observabilidad y Operaciones de Día 2";

  // 3. Renderizar cada diapositiva
  allSlides.forEach((slideData, idx) => {
    const slideNumber = idx + 1;
    slideData.slideNumber = slideNumber;
    slideData.totalSlides = totalSlides;

    const slide = pres.addSlide();

    switch (slideData.layout) {
      case "COVER":
        layouts.renderCover(slide, slideData, pres);
        break;
      case "CARDS_GRID":
        layouts.renderCardsGrid(slide, slideData, pres);
        break;
      case "YAML_ANALYSIS":
        layouts.renderYamlAnalysis(slide, slideData, pres);
        break;
      case "SPLIT_ARCHITECTURE": {
        let diagFn = null;
        if (slideData.diagramRenderer && typeof diagrams[slideData.diagramRenderer] === "function") {
          diagFn = diagrams[slideData.diagramRenderer];
        }
        layouts.renderSplitArchitecture(slide, slideData, pres, diagFn);
        break;
      }
      case "COMPARISON":
        layouts.renderComparison(slide, slideData, pres);
        break;
      default:
        console.warn(`[WARN] Layout desconocido "${slideData.layout}" en slide ${slideNumber}. Usando CARDS_GRID.`);
        layouts.renderCardsGrid(slide, slideData, pres);
    }
  });

  // 4. Crear carpeta dist/ y guardar archivo
  const distDir = path.resolve(__dirname, '../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const outputPath = path.join(distDir, 'kubernetes-administracion-presentacion.pptx');
  console.log(`Escribiendo archivo de presentación en: ${outputPath}`);
  await pres.writeFile({ fileName: outputPath });

  console.log("==================================================================");
  console.log(`¡ÉXITO! Presentación generada correctamente con ${totalSlides} diapositivas.`);
  console.log("==================================================================");

  return { totalSlides, outputPath, allSlides, modules };
}

if (require.main === module) {
  generateDeck()
    .then(() => process.exit(0))
    .catch(err => {
      console.error("[ERROR] Falló la generación del PPTX:", err);
      process.exit(1);
    });
}

module.exports = {
  generateDeck,
  modules,
};
