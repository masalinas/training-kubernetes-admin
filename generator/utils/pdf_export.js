// generator/utils/pdf_export.js
// Utilidad para exportar la presentación PPTX y la Guía Docente a PDF

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function exportPresentationPdf() {
  console.log("-> Convirtiendo presentación PPTX a PDF mediante LibreOffice...");
  const rootDir = path.resolve(__dirname, '../../');
  const pptxPath = path.join(rootDir, 'dist/kubernetes-administracion-presentacion.pptx');
  const distDir = path.join(rootDir, 'dist');

  if (!fs.existsSync(pptxPath)) {
    throw new Error(`No se encontró el archivo PPTX en: ${pptxPath}`);
  }

  const cmd = `libreoffice "-env:UserInstallation=file:///tmp/lo_profile_export" --headless --convert-to pdf "${pptxPath}" --outdir "${distDir}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log("✓ Presentación convertida con éxito: dist/kubernetes-administracion-presentacion.pdf");
}

function exportGuidePdf() {
  console.log("-> Compilando Guía Docente en PDF de alta fidelidad editorial (Playwright + PyMuPDF)...");
  const rootDir = path.resolve(__dirname, '../../');
  const makePdfScript = path.join(rootDir, 'generator/utils/make_docente_pdf.js');

  execSync(`node "${makePdfScript}"`, { stdio: 'inherit', cwd: rootDir });
  console.log("✓ Guía Docente compilada con éxito: dist/GUIA_DEL_DOCENTE.pdf");
}

function exportAllPdfs() {
  console.log("==================================================================");
  console.log("Iniciando Exportación Automatizada a PDF (Presentación y Guía)");
  console.log("==================================================================");
  exportPresentationPdf();
  exportGuidePdf();
  console.log("==================================================================");
  console.log("¡Exportación a PDF completada exitosamente!");
  console.log("==================================================================");
}

if (require.main === module) {
  exportAllPdfs();
}

module.exports = {
  exportPresentationPdf,
  exportGuidePdf,
  exportAllPdfs,
};
