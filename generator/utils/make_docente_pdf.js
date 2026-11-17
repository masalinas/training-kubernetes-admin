// generator/utils/make_docente_pdf.js
// Generador de la Guía del Docente en PDF con acabado editorial profesional (Playwright + PyMuPDF)
// Estilo visual exacto y componentes idénticos a training-sqlserver/GUIA_DEL_DOCENTE.pdf

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');
const { chromium } = require('playwright');
const { execSync } = require('child_process');

// Configuración de marked con highlight.js
marked.use({
  breaks: false,
  gfm: true,
  renderer: {
    code({ text, lang }) {
      const language = (lang && hljs.getLanguage(lang)) ? lang : 'yaml';
      let highlighted = '';
      try {
        highlighted = hljs.highlight(text, { language }).value;
      } catch (e) {
        highlighted = text;
      }
      return `<div class="code-wrapper"><div class="code-badge">${language.toUpperCase()}</div><pre><code class="hljs ${language}">${highlighted}</code></pre></div>`;
    },
    table(header, body) {
      return `<div class="table-container"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
    }
  }
});

// Metadatos oficiales de los 11 módulos (Temario Oficial de 30 Horas)
const modulesMeta = {
  0: { title: 'MÓDULO 00: BIENVENIDA, DINÁMICA Y ENTORNO DUAL', duration: '1,0 h', slides: '1 – 4', focus: 'Objetivos del curso, dinámica lectiva y estrategia dual: Kubeadm en VirtualBox + Minikube' },
  1: { title: 'MÓDULO 01: ARQUITECTURA PROFUNDA E INSTALACIÓN CON KUBEADM', duration: '4,0 h', slides: '5 – 15', focus: 'Control Plane, Worker Nodes, etcd Raft, CNI Calico/Flannel, prerrequisitos Linux e instalación real con Kubeadm' },
  2: { title: 'MÓDULO 02: GESTIÓN DECLARATIVA DE CARGAS DE TRABAJO (WORKLOADS)', duration: '3,5 h', slides: '16 – 26', focus: 'Ciclo de vida del Pod, Deployments, RollingUpdate, Rollbacks, StatefulSets con Headless Service, DaemonSets y Jobs' },
  3: { title: 'MÓDULO 03: REDES EN KUBERNETES: CONECTIVIDAD Y EXPOSICIÓN', duration: '3,5 h', slides: '27 – 38', focus: 'ClusterIP, NodePort, LoadBalancer (MetalLB), iptables/IPVS, Ingress Controller Nginx, TLS cert-manager y CoreDNS ndots' },
  4: { title: 'MÓDULO 04: ALMACENAMIENTO PERSISTENTE EN KUBERNETES (CSI)', duration: '3,0 h', slides: '39 – 48', focus: 'Container Storage Interface (CSI), AccessModes, ciclo PV/PVC, Reclaim Policies (Retain/Delete), StorageClasses y NFS' },
  5: { title: 'MÓDULO 05: PLANIFICACIÓN DE CARGAS (SCHEDULING) Y RECURSOS', duration: '3,0 h', slides: '49 – 58', focus: 'Requests y Limits en cgroups, QoS Classes, CPU Throttling, OOMKilled, Node Affinity, Inter-Pod Anti-Affinity y Taints' },
  6: { title: 'MÓDULO 06: SEGURIDAD DEL CLÚSTER, RBAC Y HARDENING', duration: '3,5 h', slides: '59 – 71', focus: 'Defensa en profundidad, RBAC (Roles/ClusterRoles), NetworkPolicies Zero-Trust, Pod Security Standards (PSS) y External Secrets' },
  7: { title: 'MÓDULO 07: OBSERVABILIDAD: MÉTRICAS, LOGS Y SONDAS DE SALUD', duration: '3,0 h', slides: '72 – 84', focus: 'Sondas (Startup, Liveness, Readiness), métricas con Prometheus/Grafana, logs con Loki/Fluentd y árbol de triage de incidencias' },
  8: { title: 'MÓDULO 08: EMPAQUETADO Y DESPLIEGUES CON HELM', duration: '2,5 h', slides: '85 – 93', focus: 'Anatomía de Charts, plantillas Go, valores multientorno (values-dev/prod), lifecycle hooks y rollbacks atómicos' },
  9: { title: 'MÓDULO 09: OPERACIONES DE DÍA 2, MANTENIMIENTO Y TROUBLESHOOTING', duration: '2,0 h', slides: '94 – 103', focus: 'Autoscaling (HPA/VPA), mantenimiento de nodos con Cordon/Drain, PodDisruptionBudgets, cluster upgrade y backup de etcd' },
  10: { title: 'MÓDULO 10: CONCLUSIONES, ROADMAP DE CERTIFICACIÓN Y CIERRE', duration: '1,0 h', slides: '104 – 107', focus: 'Resumen de competencias, hoja de ruta oficial CNCF (CKA y CKS), simuladores Killer.sh y herramientas recomendadas' }
};

// Carga de módulos de datos
const moduleFiles = [
  'm00_intro.js',
  'm01_architecture.js',
  'm02_workloads.js',
  'm03_networking.js',
  'm04_storage.js',
  'm05_scheduling.js',
  'm06_security.js',
  'm07_observability.js',
  'm08_helm.js',
  'm09_day2_ops.js',
  'm10_wrapup.js',
];

const modulesData = moduleFiles.map(file => require(`../modules/${file}`));

// Formateo de contenido proyectado en pantalla según layout
function formatScreenContent(slide) {
  let html = '';

  if (slide.layout === 'YAML_ANALYSIS') {
    if (slide.yamlCode) {
      const lang = slide.filename && slide.filename.endsWith('.sh') ? 'bash' : 'yaml';
      let highlighted = '';
      try {
        highlighted = hljs.highlight(slide.yamlCode, { language: lang }).value;
      } catch (e) {
        highlighted = slide.yamlCode;
      }
      const badge = slide.filename || 'MANIFIESTO YAML';
      html += `<div class="code-wrapper"><div class="code-badge">${badge.toUpperCase()}</div><pre><code class="hljs ${lang}">${highlighted}</code></pre></div>`;
    }
    if (slide.directives && Array.isArray(slide.directives)) {
      html += `<div class="screen-directives-title">Directivas y Parámetros Clave:</div><ul class="screen-directives">`;
      slide.directives.forEach(d => {
        html += `<li><strong><code>${d.field}</code></strong>: ${d.desc}</li>`;
      });
      html += `</ul>`;
    }
  } else if (slide.layout === 'CARDS_GRID') {
    if (slide.cards && Array.isArray(slide.cards)) {
      html += `<div class="cards-grid-content">`;
      slide.cards.forEach(c => {
        html += `<div class="card-item-content">`;
        html += `<div class="card-item-title">${c.title}</div>`;
        if (Array.isArray(c.items)) {
          html += `<ul>${c.items.map(it => `<li>${it.replace(/^[\s•\-\*]+\s*/, '')}</li>`).join('')}</ul>`;
        } else if (c.text) {
          html += `<p>${c.text}</p>`;
        }
        html += `</div>`;
      });
      html += `</div>`;
    }
  } else if (slide.layout === 'SPLIT_ARCHITECTURE') {
    if (slide.points && Array.isArray(slide.points)) {
      html += `<div class="concept-title">${slide.conceptTitle || 'Puntos Clave de Arquitectura'}:</div>`;
      html += `<ul>${slide.points.map(pt => `<li>${pt.replace(/^[\s•\-\*]+\s*/, '')}</li>`).join('')}</ul>`;
    }
    if (slide.diagramRenderer) {
      html += `<div class="diagram-ref-badge">📐 Diagrama Arquitectónico: ${slide.diagramRenderer}</div>`;
    }
  } else if (slide.layout === 'COMPARISON') {
    html += `<div class="comparison-grid-content">`;
    [slide.optionA, slide.optionB].forEach(opt => {
      if (!opt) return;
      html += `<div class="comparison-col ${opt.isRecommended ? 'recommended' : ''}">`;
      if (opt.tag) html += `<div class="comparison-tag">${opt.tag}</div>`;
      html += `<div class="comparison-title">${opt.title}</div>`;
      if (Array.isArray(opt.items)) {
        html += `<ul>${opt.items.map(it => `<li>${it.replace(/^[\s•\-\*]+\s*/, '')}</li>`).join('')}</ul>`;
      }
      html += `</div>`;
    });
    html += `</div>`;
  } else if (slide.meta && Array.isArray(slide.meta)) {
    html += `<div class="meta-pills-row">`;
    slide.meta.forEach(m => {
      html += `<div class="meta-pill"><span class="meta-label">${m.label}:</span> <span class="meta-val">${m.value}</span></div>`;
    });
    html += `</div>`;
  }

  return html;
}

// Recopilación de diapositivas
const slides = [];
let globalSlideNum = 1;

modulesData.forEach((mod, modIdx) => {
  (mod.slides || []).forEach((slide, sIdx) => {
    const isFirstInMod = sIdx === 0;
    const isLab = (slide.title || '').toUpperCase().includes('LAB') ||
                  (slide.title || '').toUpperCase().includes('INSTALACIÓN') ||
                  (slide.moduleBadge || '').toUpperCase().includes('LAB') ||
                  (slide.notes && slide.notes.labGotcha && slide.notes.labGotcha.toLowerCase().includes('comando'));

    slides.push({
      num: globalSlideNum,
      modIdx,
      isFirstInMod,
      isLab,
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle || '',
      badge: slide.moduleBadge || (isLab ? 'LABORATORIO PRÁCTICO' : 'ADMINISTRACIÓN'),
      moduleName: `MÓDULO ${String(modIdx).padStart(2, '0')}`,
      screenHtml: formatScreenContent(slide),
      objetivoHtml: marked.parse(slide.notes && slide.notes.objetivo ? slide.notes.objetivo : 'Capacitar al administrador en la gestión del recurso.'),
      explicacionHtml: marked.parse(slide.notes && slide.notes.explicacion ? slide.notes.explicacion : ''),
      preguntasHtml: marked.parse(slide.notes && slide.notes.interaccion ? slide.notes.interaccion : '¿Qué consideraciones de rendimiento y seguridad aplican en este punto?'),
      labHtml: slide.notes && slide.notes.labGotcha ? marked.parse(slide.notes.labGotcha) : ''
    });

    globalSlideNum++;
  });
});

console.log(`Total de diapositivas recopiladas: ${slides.length}`);

// Construcción del documento HTML completo
let html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Guía del Docente - Curso de Administración de Kubernetes</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 14mm 12mm 14mm;
    }
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 8.5pt;
      line-height: 1.40;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }

    /* Cover Page */
    .cover-page {
      height: 260mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      padding: 5mm 5mm 5mm 5mm;
    }

    .cover-top-badge {
      display: inline-block;
      background: linear-gradient(135deg, #0f2942, #1e3a8a);
      color: #ffffff;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 6px;
      margin-bottom: 22px;
    }

    .cover-title {
      font-size: 33pt;
      font-weight: 800;
      color: #0b2545;
      line-height: 1.15;
      margin: 0 0 10px 0;
      letter-spacing: -0.5px;
    }

    .cover-subtitle {
      font-size: 19pt;
      font-weight: 600;
      color: #0284c7;
      line-height: 1.3;
      margin: 0 0 18px 0;
    }

    .cover-tagline {
      font-size: 10.5pt;
      color: #475569;
      line-height: 1.6;
      max-width: 95%;
      margin-bottom: 24px;
      border-left: 3.5px solid #0284c7;
      padding-left: 15px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 22px 0;
    }

    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .metric-num {
      font-size: 18pt;
      font-weight: 800;
      color: #0b2545;
      line-height: 1;
      margin-bottom: 4px;
    }

    .metric-label {
      font-size: 8pt;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .cover-meta-box {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 14px 18px;
      margin-top: 12px;
    }

    .cover-meta-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 8.8pt;
    }
    
    .cover-meta-row:last-child {
      margin-bottom: 0;
    }

    .cover-meta-label {
      font-weight: 700;
      color: #334155;
    }

    .cover-meta-val {
      color: #475569;
    }

    .cover-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5pt;
      color: #64748b;
    }

    /* Course Structure / Overview */
    .overview-page {
      page-break-before: always;
      page-break-after: always;
      break-before: page;
      break-after: page;
      padding-top: 2mm;
    }

    .section-main-title {
      font-size: 16.5pt;
      font-weight: 800;
      color: #0b2545;
      margin: 0 0 8px 0;
      padding-bottom: 5px;
      border-bottom: 2px solid #0284c7;
    }

    .section-intro-text {
      font-size: 9pt;
      color: #475569;
      margin-bottom: 12px;
      line-height: 1.48;
    }

    .overview-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 18px 0;
      font-size: 8.2pt;
    }

    .overview-table th {
      background: #0f2942;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #0f2942;
    }

    .overview-table td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }

    .overview-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Module Divider Banner */
    .module-banner {
      page-break-before: always;
      break-before: page;
      break-after: avoid;
      background: linear-gradient(135deg, #0b2545 0%, #1e3a8a 100%);
      color: #ffffff;
      border-radius: 6px;
      padding: 12px 18px;
      margin-top: 5px;
      margin-bottom: 12px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }

    .module-banner-pill {
      display: inline-block;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #38bdf8;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2px 7px;
      border-radius: 4px;
      margin-bottom: 5px;
    }

    .module-banner-title {
      font-size: 13.5pt;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 3px 0;
      line-height: 1.2;
    }

    .module-banner-desc {
      font-size: 8.5pt;
      color: #cbd5e1;
      margin: 0;
      line-height: 1.40;
    }

    /* Slide Card */
    .slide-card {
      margin-bottom: 15px;
      break-inside: auto;
    }

    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6px;
      padding-bottom: 5px;
      border-bottom: 1.5px solid #0b2545;
      break-after: avoid;
    }

    .slide-title-left {
      flex: 1;
    }

    .slide-num-pill {
      display: inline-block;
      background: #0284c7;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      padding: 1px 6px;
      border-radius: 4px;
      margin-bottom: 3px;
    }

    .slide-title {
      font-size: 11.2pt;
      font-weight: 800;
      color: #0b2545;
      margin: 0;
      line-height: 1.2;
    }

    .slide-subtitle {
      font-size: 8.5pt;
      color: #64748b;
      margin-top: 2px;
    }

    .slide-meta-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      margin-left: 10px;
    }

    .badge-category {
      background: #e0f2fe;
      color: #0369a1;
      font-size: 6.8pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .badge-category.lab {
      background: #dcfce7;
      color: #15803d;
    }

    .badge-module {
      font-size: 6.8pt;
      color: #64748b;
      white-space: nowrap;
    }

    /* Screen Content Box (Lo que ve el alumno) */
    .screen-content-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 5px;
      padding: 7px 11px;
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .box-title-bar {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 7.2pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #475569;
      margin-bottom: 4px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }

    .screen-body {
      font-size: 8.1pt;
      color: #334155;
      line-height: 1.34;
    }

    .screen-body ul {
      margin: 2px 0 3px 0;
      padding-left: 14px;
    }

    .screen-body li {
      margin-bottom: 1.5px;
    }

    .screen-directives-title {
      font-weight: 700;
      font-size: 7.6pt;
      color: #475569;
      margin-top: 4px;
    }

    .screen-directives {
      margin: 2px 0;
      padding-left: 14px;
      font-size: 7.8pt;
    }

    .cards-grid-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 8px;
      margin-top: 4px;
    }

    .card-item-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 6px 8px;
    }

    .card-item-title {
      font-weight: 700;
      color: #0b2545;
      font-size: 8pt;
      margin-bottom: 3px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 2px;
    }

    .card-item-content ul {
      margin: 2px 0;
      padding-left: 12px;
      font-size: 7.8pt;
    }

    .comparison-grid-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 4px;
    }

    .comparison-col {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 6px 9px;
    }

    .comparison-col.recommended {
      border-color: #0284c7;
      background: #f0f9ff;
    }

    .comparison-tag {
      font-size: 6.8pt;
      font-weight: 700;
      color: #0284c7;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .comparison-title {
      font-weight: 800;
      color: #0b2545;
      font-size: 9pt;
      margin-bottom: 4px;
    }

    .comparison-col ul {
      margin: 2px 0;
      padding-left: 14px;
      font-size: 7.8pt;
    }

    .concept-title {
      font-weight: 700;
      color: #0b2545;
      font-size: 8.2pt;
      margin-bottom: 3px;
    }

    .diagram-ref-badge {
      display: inline-block;
      margin-top: 4px;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 7pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .meta-pills-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 3px;
    }

    .meta-pill {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 7.8pt;
    }

    .meta-label {
      font-weight: 700;
      color: #0b2545;
    }

    .meta-val {
      color: #334155;
    }

    /* Pedagogical Objective */
    .objective-box {
      background: #eff6ff;
      border-left: 3.5px solid #2563eb;
      border-radius: 4px;
      padding: 5px 9px;
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .objective-title {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #1e40af;
      margin-bottom: 2px;
    }

    .objective-text {
      font-size: 8.2pt;
      color: #1e3a8a;
      font-style: italic;
      line-height: 1.36;
      margin: 0;
    }
    
    .objective-text p {
      margin: 0;
    }

    /* Teacher Script Box */
    .script-section {
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .script-title {
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0b2545;
      margin: 0 0 3px 0;
      padding-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      break-after: avoid;
    }

    .script-body {
      font-size: 8.2pt;
      color: #1e293b;
      line-height: 1.38;
    }

    .script-body ul {
      margin: 2px 0;
      padding-left: 14px;
    }

    .script-body li {
      margin-bottom: 2px;
    }

    .script-body p {
      margin: 2px 0;
    }

    /* Questions / Interaction Box */
    .interaction-box {
      background: #fffbeb;
      border-left: 3.5px solid #f59e0b;
      border-radius: 4px;
      padding: 5px 9px;
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .interaction-title {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #b45309;
      margin-bottom: 2px;
    }

    .interaction-body {
      font-size: 8.1pt;
      color: #78350f;
      line-height: 1.35;
    }

    .interaction-body ul {
      margin: 2px 0;
      padding-left: 14px;
    }

    .interaction-body li {
      margin-bottom: 1px;
    }

    .interaction-body p {
      margin: 0;
    }

    /* Laboratory Box */
    .lab-box {
      background: #f0fdf4;
      border-left: 3.5px solid #10b981;
      border-radius: 4px;
      padding: 6px 9px;
      margin-top: 5px;
      margin-bottom: 6px;
      break-inside: avoid;
    }

    .lab-title {
      font-size: 7.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #065f46;
      margin-bottom: 3px;
      break-after: avoid;
    }

    .lab-body {
      font-size: 8.1pt;
      color: #064e3b;
      line-height: 1.36;
    }

    .lab-body ul {
      margin: 2px 0;
      padding-left: 14px;
    }

    .lab-body li {
      margin-bottom: 2px;
    }

    .lab-body p {
      margin: 0;
    }

    /* Code Blocks */
    .code-wrapper {
      position: relative;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      margin: 4px 0;
      overflow: hidden;
      break-inside: avoid;
    }

    .code-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #e2e8f0;
      color: #475569;
      font-size: 6pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      padding: 1px 4px;
      border-bottom-left-radius: 3px;
      border-left: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
    }

    pre {
      margin: 0;
      padding: 5px 8px;
      font-family: "SF Mono", Monaco, Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 7.2pt;
      line-height: 1.30;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    code {
      font-family: inherit;
    }

    p code, li code {
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #e2e8f0;
      padding: 1px 3px;
      border-radius: 3px;
      font-size: 7.6pt;
      font-family: "SF Mono", Monaco, Menlo, Consolas, monospace;
    }

    /* Syntax Highlighting Light Palette */
    .hljs-keyword { color: #0052cc; font-weight: 700; }
    .hljs-built_in { color: #6f42c1; font-weight: 600; }
    .hljs-string { color: #059669; }
    .hljs-comment { color: #64748b; font-style: italic; }
    .hljs-number { color: #d97706; }
    .hljs-variable { color: #b45309; }
    .hljs-literal { color: #dc2626; }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover-page">
    <div>
      <div class="cover-top-badge">CURSO TÉCNICO OFICIAL · 30 HORAS LECTIVAS</div>
      <div class="cover-title">Kubernetes Administración</div>
      <div class="cover-subtitle">Guía Didáctica y Manual del Instructor</div>
      <div class="cover-tagline">
        Administración avanzada de clústeres multi-nodo con Kubeadm en VirtualBox, gestión declarativa de cargas en Minikube, arquitectura de red CNI, almacenamiento persistente CSI, seguridad Zero-Trust, observabilidad con Prometheus/Grafana y operaciones de producción de Día 2.
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-num">30 Horas</div>
          <div class="metric-label">DURACIÓN LECTIVA TOTAL</div>
        </div>
        <div class="metric-card">
          <div class="metric-num">107 Slides</div>
          <div class="metric-label">DIAPOSITIVAS FORMATIVAS</div>
        </div>
        <div class="metric-card">
          <div class="metric-num">11 Módulos</div>
          <div class="metric-label">TEMARIO TÉCNICO OFICIAL</div>
        </div>
      </div>

      <div class="cover-meta-box">
        <div class="cover-meta-row">
          <span class="cover-meta-label">Perfil de la Audiencia:</span>
          <span class="cover-meta-val">Administradores de Sistemas, Ingenieros DevOps, SRE y Platform Engineers</span>
        </div>
        <div class="cover-meta-row">
          <span class="cover-meta-label">Entorno de Laboratorio:</span>
          <span class="cover-meta-val">Clúster Multi-Nodo Kubeadm en VirtualBox (Linux) + Minikube Ágil</span>
        </div>
        <div class="cover-meta-row">
          <span class="cover-meta-label">Certificaciones Oficiales:</span>
          <span class="cover-meta-val">Alineado al 100% con CKA (Certified Kubernetes Administrator) y CKS (Security Specialist)</span>
        </div>
        <div class="cover-meta-row">
          <span class="cover-meta-label">Metodología Pedagógica:</span>
          <span class="cover-meta-val">4 Bloques Didácticos: Objetivo, Guion de Bajo Nivel, Puntos de Interacción y Laboratorios/Gotchas</span>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <span>training-kubernetes-admin · Documento de Formación Oficial</span>
      <span>Año Académico 2026 / 2027</span>
    </div>
  </div>

  <!-- Course Overview Table -->
  <div class="overview-page">
    <div class="section-main-title">Estructura General del Curso (30 Horas)</div>
    <div class="section-intro-text">
      Distribución modular del temario oficial dividida en 11 bloques didácticos progresivos, equilibrando la comprensión profunda del kernel y componentes internos con la agilidad en la gestión declarativa de recursos.
    </div>

    <table class="overview-table">
      <thead>
        <tr>
          <th style="width: 32%;">Módulo y Título</th>
          <th style="width: 10%;">Horas</th>
          <th style="width: 12%;">Diapositivas</th>
          <th style="width: 46%;">Enfoque Técnico y Laboratorios</th>
        </tr>
      </thead>
      <tbody>
        ${Object.keys(modulesMeta).map(k => {
          const m = modulesMeta[k];
          return `
          <tr>
            <td><strong>${m.title}</strong></td>
            <td><strong>${m.duration}</strong></td>
            <td>${m.slides}</td>
            <td>${m.focus}</td>
          </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  </div>
`;

// Inserción de diapositivas y módulos
slides.forEach(slide => {
  // Banner de inicio de módulo
  if (slide.isFirstInMod) {
    const modInfo = modulesMeta[slide.modIdx];
    html += `
    <div class="module-banner">
      <div class="module-banner-pill">${slide.moduleName}</div>
      <div class="module-banner-title">${modInfo ? modInfo.title : slide.title}</div>
      <div class="module-banner-desc">${modInfo ? modInfo.focus : ''}</div>
    </div>
    `;
  }

  // Tarjeta de diapositiva
  html += `
  <div class="slide-card">
    <div class="slide-header">
      <div class="slide-title-left">
        <div class="slide-num-pill">Diapositiva #${String(slide.num).padStart(2, '0')}</div>
        <div class="slide-title">${slide.title}</div>
        ${slide.subtitle ? `<div class="slide-subtitle">${slide.subtitle}</div>` : ''}
      </div>
      <div class="slide-meta-right">
        <div class="badge-category ${slide.isLab ? 'lab' : ''}">${slide.badge}</div>
        <div class="badge-module">${slide.moduleName}</div>
      </div>
    </div>

    <!-- Contenido en Pantalla -->
    <div class="screen-content-box">
      <div class="box-title-bar">🖥️ CONTENIDO PROYECTADO EN LA DIAPOSITIVA</div>
      <div class="screen-body">
        ${slide.screenHtml}
      </div>
    </div>

    <!-- Objetivo Pedagógico -->
    <div class="objective-box">
      <div class="objective-title">🎯 Objetivo Pedagógico</div>
      <div class="objective-text">${slide.objetivoHtml}</div>
    </div>

    <!-- Guion del Docente -->
    <div class="script-section">
      <div class="script-title">📖 Guion del Docente y Explicación Técnica</div>
      <div class="script-body">${slide.explicacionHtml}</div>
    </div>

    <!-- Puntos de Interacción -->
    <div class="interaction-box">
      <div class="interaction-title">💬 Puntos de Interacción y Preguntas para la Clase</div>
      <div class="interaction-body">${slide.preguntasHtml}</div>
    </div>

    <!-- Gotchas / Laboratorio -->
    ${slide.labHtml ? `
    <div class="lab-box">
      <div class="lab-title">🧪 Guía de Laboratorio / Gotcha de Producción</div>
      <div class="lab-body">${slide.labHtml}</div>
    </div>
    ` : ''}
  </div>
  `;
});

html += `
</body>
</html>
`;

// Rutas de salida
const distDir = path.join(__dirname, '../../dist');
const htmlTempPath = path.join(distDir, 'GUIA_DEL_DOCENTE_temp.html');
const rawPdfPath = path.join(distDir, 'GUIA_DEL_DOCENTE_raw.pdf');
const finalPdfPath = path.join(distDir, 'GUIA_DEL_DOCENTE.pdf');
const metaPath = path.join(distDir, 'slides_meta.json');

// Guardar HTML intermedio y metadatos para Python
fs.writeFileSync(htmlTempPath, html, 'utf8');
fs.writeFileSync(metaPath, JSON.stringify(slides.map(s => ({
  num: s.num,
  title: s.title,
  badge: s.badge,
  modIdx: s.modIdx,
  moduleName: s.moduleName
})), null, 2));

console.log('HTML intermedio generado con éxito en:', htmlTempPath);

// Renderizado a PDF con Playwright y Chromium
(async () => {
  console.log('Iniciando Chromium para renderizar PDF de alta fidelidad...');
  const browser = await chromium.launch({
    executablePath: fs.existsSync('/usr/bin/google-chrome') ? '/usr/bin/google-chrome' : undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('file://' + htmlTempPath, { waitUntil: 'networkidle' });

  console.log('Renderizando PDF con encabezados y pies de página dinámicos...');
  await page.pdf({
    path: rawPdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 7.2pt; color: #64748b; width: 100%; display: flex; justify-content: space-between; border-bottom: 1px solid #cbd5e1; padding-bottom: 3px; margin: 0 14mm;">
        <span style="font-weight: 600;">Guía del Docente · Kubernetes Administración (30 Horas)</span>
        <span>Manual Técnico del Instructor</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 7.2pt; color: #64748b; width: 100%; display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; padding-top: 3px; margin: 0 14mm;">
        <span>training-kubernetes-admin · Documento de Formación</span>
        <span style="font-weight: 600;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>
    `,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '14mm',
      right: '14mm'
    }
  });

  await browser.close();
  console.log('PDF intermedio renderizado en:', rawPdfPath);

  // Ejecución de post-procesador PyMuPDF para TOC jerárquico y limpieza de portada
  console.log('Ejecutando post-procesador PyMuPDF para inyección de marcadores TOC...');
  execSync('./.venv/bin/python generator/utils/postprocess_docente_pdf.py', { stdio: 'inherit' });

  // Limpieza de archivos temporales
  if (fs.existsSync(htmlTempPath)) fs.unlinkSync(htmlTempPath);
  if (fs.existsSync(rawPdfPath)) fs.unlinkSync(rawPdfPath);
  if (fs.existsSync(metaPath)) fs.unlinkSync(metaPath);

  console.log('¡Guía Docente generada con éxito con el estilo de training-sqlserver en:', finalPdfPath);
})();
