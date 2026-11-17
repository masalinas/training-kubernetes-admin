# Proposal: Generación de Presentación Técnica y Guía Docente - Curso Kubernetes Administración (30 Horas)

## Why

Se requiere impartir un curso oficial y profesional de 30 horas lectivas sobre "Kubernetes Administración (Clústeres, Seguridad, Observabilidad)", basado en el programa formativo de 9 módulos especificado en el documento `doc/KUBERNETES ADMINISTRACIÓN (CLUSTERS, SEGURIDAD, OBSERVABILIDAD) (2).pdf`.
Para garantizar una experiencia docente rigurosa, de alto impacto y de fácil seguimiento tanto en el aula como en los laboratorios prácticos, es necesario disponer de un conjunto integral de materiales formativos:
1. Una presentación de diapositivas en formato panorámico 16:9 (~95-100 diapositivas) en español, con diseño visual corporativo, diagramas arquitectónicos y notas de orador exhaustivas en cada lámina.
2. Una guía docente estructurada en Markdown y PDF sincronizada fielmente con las diapositivas y sus notas pedagógicas.
3. Un pipeline automatizado y reproducible en Node.js basado en `pptxgenjs` y herramientas de exportación que permita generar, actualizar y convertir a PDF todo el material sin desfases de contenido.

## What Changes

- **Generador de Presentación Modular (`generator/`)**: Implementación de un motor en Node.js que utiliza `pptxgenjs` para compilar la presentación completa a partir de módulos de datos independientes (uno por cada módulo temático oficial más apertura y cierre).
- **Diseño Visual e Identidad Kubernetes**: Estilos corporativos en formato 16:9 (`LAYOUT_16x9`), paleta de color oficial (Navy `#0F1E36`, Kubernetes Blue `#326CE5`, Pizarra `#1E293B`, acentos semánticos), tipografía legible y libre de anti-patrones visuales según las directrices de la skill `pptx`.
- **Diagramas Arquitectónicos Vectoriales Nativos**: Incorporación de esquemas visuales programados mediante formas geométricas nativas en `pptxgenjs` (flujo de petición API, networking CNI/Services/Ingress, arquitectura zero-trust/RBAC, árbol de decisión de troubleshooting).
- **Notas del Orador Exhaustivas**: Inclusión en cada diapositiva de cuatro bloques pedagógicos estructurados: `[OBJETIVO]`, `[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]`, `[PREGUNTA DE INTERACCIÓN / DINÁMICA]` y `[LABORATORIO / GOTCHA DE PRODUCCIÓN]`.
- **Guía Docente Complementaria (`GUIA_DEL_DOCENTE.md`)**: Exportación automática desde la misma fuente de datos a un documento Markdown íntegro para lectura en sala.
- **Exportación Automatizada a PDF**: Conversión sin intervención manual tanto del archivo PPTX como de la Guía Docente a PDF usando LibreOffice en modo headless y pandoc.

## Capabilities

### New Capabilities
- `course-presentation`: Motor y definición de diapositivas para el curso de 30 horas de Administración de Kubernetes en formato PPTX y PDF, cubriendo los 9 módulos oficiales, notas del orador estructuradas y diagramas vectoriales.
- `instructor-guide`: Extracción y exportación sincronizada del contenido íntegro y notas de clase a formato Markdown (`GUIA_DEL_DOCENTE.md`) y documento imprimible PDF para el facilitador.

### Modified Capabilities
<!-- None -->

## Impact

- **Código y Herramientas Nuevas**: Módulo Node.js en el proyecto con scripts de generación (`generator/build.js`, módulos de contenido, utilidades de renderizado y exportación).
- **Dependencias**: `pptxgenjs` para Node.js; herramientas de sistema locales (`soffice` / `libreoffice` para PPTX->PDF, `pandoc` para Markdown->PDF).
- **Entregables Finales**:
  - `dist/kubernetes-administracion-presentacion.pptx`
  - `dist/kubernetes-administracion-presentacion.pdf`
  - `dist/GUIA_DEL_DOCENTE.md`
  - `dist/GUIA_DEL_DOCENTE.pdf`
