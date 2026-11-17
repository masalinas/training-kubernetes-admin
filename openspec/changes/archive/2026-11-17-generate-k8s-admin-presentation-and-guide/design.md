# Design: Generación de Presentación Técnica y Guía Docente - Curso Kubernetes Administración (30 Horas)

## Context

Para impartir el curso de 30 horas sobre Administración de Kubernetes basado en el temario de 9 módulos (`doc/KUBERNETES ADMINISTRACIÓN (CLUSTERS, SEGURIDAD, OBSERVABILIDAD) (2).pdf`), se requiere un sistema que genere una presentación técnica exhaustiva (~95-102 diapositivas) y una guía docente completa. (Ver `proposal.md` para motivación y justificación).

El proyecto cuenta con Node.js v24 y herramientas locales de conversión (`soffice`/LibreOffice y `pandoc`). Además, se aplican estrictamente las directrices de la skill `pptx` para garantizar compatibilidad con LibreOffice/PowerPoint, evitar anti-patrones visuales y asegurar la integridad del archivo PPTX generado.

## Goals / Non-Goals

**Goals:**
- Implementar un generador modular en Node.js utilizando `pptxgenjs` capaz de compilar diapositivas de alta calidad gráfica en formato 16:9.
- Establecer una arquitectura Single Source of Truth (SSOT) donde la definición de cada diapositiva (título, contenido, componentes visuales, snippets YAML/CLI y 4 bloques de notas del orador) sirva simultáneamente para generar el archivo PPTX y la `GUIA_DEL_DOCENTE.md`.
- Incorporar fragmentos esenciales de manifiestos YAML (8-14 líneas) en las diapositivas conceptuales y de laboratorio cuando sea necesario para ilustrar la especificación técnica en el aula.
- Adaptar la pedagogía a una estrategia de laboratorio dual:
  * **Módulo 1:** Creación de un clúster real de 2 nodos mediante `kubeadm` en máquinas virtuales VirtualBox (apoyado en la guía documental paso a paso existente).
  * **Módulos 2 al 9:** Utilización de `minikube` para pruebas ágiles de despliegue de Pods, Workloads, Services, Ingress, persistencia, políticas de red y observabilidad.
- Generar una `GUIA_DEL_DOCENTE.md` con un índice navegable jerárquico que vincule de forma explícita cada número de diapositiva (`[Diapositiva #XX: Título]`) a su módulo y objetivos.
- Construir diagramas arquitectónicos de Kubernetes vectoriales nativos (sin depender de imágenes externas propensas a fallos de resolución o rutas rotas).
- Garantizar la cobertura exhaustiva y profunda de los 9 módulos oficiales del temario (~95-102 diapositivas).
- Integrar la exportación desatendida a PDF para ambos entregables (`dist/*.pdf`).

**Non-Goals:**
- Crear un entorno de ejecución de laboratorios en vivo dentro de este repositorio (los laboratorios se documentan y guían teóricamente con comandos y casos de prueba, pero el aprovisionamiento de infraestructura no forma parte de este cambio).
- Implementar interfaces gráficas de usuario interactivas para editar diapositivas (el flujo es código como configuración / Docs-as-Code).

## Decisions

### 1. Modelo de Datos Único (Single Source of Truth - SSOT)
- **Decisión:** Definir los 9 módulos temáticos (más módulo 0 de introducción y módulo 10 de conclusiones) como módulos de JavaScript exportables que devuelven un array tipado de objetos `SlideDefinition`.
- **Estructura de cada SlideDefinition:**
  ```javascript
  {
    id: "m01-03-api-server-flow",
    module: 1,
    slideNumber: 7,
    title: "Flujo de Petición en el Control Plane",
    subtitle: "Desde kubectl hasta la persistencia y ejecución",
    layout: "SPLIT_ARCHITECTURE", // "SPLIT_ARCHITECTURE", "CARDS_GRID", "YAML_ANALYSIS", "TROUBLESHOOTING_FLOW", etc.
    content: { ... },
    codeSnippet: { language: "yaml", code: "..." }, // Opcional, para layout YAML_ANALYSIS
    diagram: { ... }, // Opcional, directivas para el renderizador nativo
    notes: {
      objetivo: "Comprender la secuencia sincrónica y asincrónica...",
      explicacion: "Detalle técnico de bajo nivel...",
      interaccion: "Pregunta socrática para el aula...",
      labGotcha: "Atención a timeouts de etcd..."
    }
  }
  ```

### 2. Generación Visual con `pptxgenjs` respetando directrices de la Skill `pptx`
- **Decisión:**
  - Dimensiones: `LAYOUT_16x9` (10" x 5.625").
  - Paleta cromática corporativa Kubernetes:
    - Dominante / Fondo oscuro: Navy `0F1E36`
    - Secundario K8s: Azul Kubernetes `326CE5`
    - Fondo diapositivas de contenido: Gris ultra-claro `F8FAFC` o Blanco `FFFFFF`
    - Tarjetas y contenedores: `FFFFFF` con bordes suaves `E2E8F0` y esquinas redondeadas
    - Texto principal: Pizarra oscuro `1E293B`
    - Acentos semánticos: Ámbar alerta `D97706`, Verde éxito `10B981`, Rojo fallo `EF4444`
  - Tipografía segura: `Calibri` para títulos y cuerpo, `Courier New` para snippets de código, garantizando cero descuadres métricos al convertir con LibreOffice.
  - Reglas anti-patrones: Cero barras inferiores bajo títulos, cero franjas laterales artificiales, `margin: 0` al alinear cajas de texto, nuevos objetos de configuración en cada llamada para evitar mutaciones EMU internas de `pptxgenjs`.

### 3. Snippets YAML y CLI en Diapositivas Clave
- **Decisión:** Implementar un layout visual (`YAML_ANALYSIS`) compuesto por:
  - Una columna izquierda con tarjetas explicativas de los campos obligatorios y directivas de configuración.
  - Una columna derecha con un contenedor oscuro (`0F1E36` o `1E293B`), texto monoespaciado en `Courier New` de alto contraste (`F8FAFC` con palabras clave resaltadas), mostrando manifiestos condensados de 8 a 14 líneas (ej. especificación de `NetworkPolicy`, `SecurityContext`, `StatefulSet` o `StorageClass`).

### 4. Estrategia Pedagógica de Laboratorio Dual
- **Decisión:**
  - **Módulo 1:** La presentación y la guía docente articularán el taller de instalación profunda explicando la configuración de un clúster de 2 nodos con `kubeadm` en máquinas virtuales VirtualBox, enlazando los prerequisitos de red, swap, cgroups y módulos de kernel con el documento de laboratorio paso a paso disponible para el instructor.
  - **Módulos 2 al 9:** Para optimizar el tiempo de clase y facilitar que los alumnos ejecuten rápidamente los ejercicios de despliegue, escalado, persistencia, seguridad y troubleshooting, las prácticas y comandos guiados asumirán el uso de `minikube` (indicando notas y matices de compatibilidad cuando proceda).

### 5. Diagramación Vectorial Nativa
- **Decisión:** Desarrollar funciones auxiliares en `generator/utils/diagrams.js` que construyan cajas, badges y líneas de conexión nativas de PowerPoint (`addShape('roundRect')`, `addShape('line')`, `addText()`).
- **Diagramas incluidos:**
  - *M01:* Arquitectura Control Plane / Worker Nodes y flujo de petición API.
  - *M02:* Ciclo de vida del Pod (InitContainers, Hooks, Probes) y estrategias RollingUpdate.
  - *M03:* Topología de Red (CNI, ClusterIP, NodePort, Ingress Controller y CoreDNS).
  - *M04:* Arquitectura CSI (StorageClass, PV, PVC y Pod binding).
  - *M05:* Algoritmo de filtrado y puntuación del Kube-Scheduler (Affinity/Taints).
  - *M06:* Cadena de Seguridad Zero-Trust (RBAC + NetworkPolicy + SecurityContext).
  - *M07:* Árbol de diagnóstico sistémico (Pending vs CrashLoopBackOff vs OOMKilled).
  - *M08:* Anatomía de un Chart de Helm y flujo de release/rollback.
  - *M09:* Flujo de mantenimiento de nodo (Cordon -> Drain con PDB -> Upgrade -> Uncordon).

### 6. Guía Docente con Índice Navegable y Numeración Vinculada
- **Decisión:** `generator/utils/export_markdown.js` compilará `dist/GUIA_DEL_DOCENTE.md` con:
  - Metadatos del curso (30h, objetivos, estrategia dual de labs).
  - Tabla de Contenidos interactiva con enlaces ancla Markdown organizados por módulo y desglosados diapositiva por diapositiva: `[Diapositiva #XX: Título](#diapositiva-xx-titulo)`.
  - Cada sección de diapositiva incluirá el número visible, el contenido proyectado en clase y los 4 bloques estructurados de notas pedagógicas del instructor.

### 7. Pipeline de Exportación a PDF
- **Decisión:**
  - Presentación: Invocar LibreOffice en modo headless (`soffice --headless --convert-to pdf dist/kubernetes-administracion-presentacion.pptx --outdir dist/`).
  - Guía Docente: Generar `dist/GUIA_DEL_DOCENTE.md` y convertir a PDF mediante `pandoc` o `soffice`.

## Risks / Trade-offs

- **[Riesgo]** Conversión headless de LibreOffice en Linux sustituyendo fuentes y rompiendo saltos de línea.
  → *Mitigación:* Se utilizan estrictamente fuentes seguras estándar (`Calibri`, `Arial`, `Courier New`) con márgenes generosos (15-20% de holgura en contenedores) y validación visual de páginas renderizadas.
- **[Riesgo]** Mutación de objetos de opciones en `pptxgenjs` causando corrupción de archivos OOXML.
  → *Mitigación:* Todas las funciones creadoras de estilos devuelven objetos nuevos mediante factories (`() => ({ ... })`).
- **[Riesgo]** Desconexión entre la guía docente escrita y las diapositivas.
  → *Mitigación:* Ambos artefactos se generan secuencialmente en el mismo script a partir de las mismas estructuras de datos en memoria.

## Migration Plan

1. Inicializar el package Node en `generator/package.json` e instalar `pptxgenjs`.
2. Crear módulos de configuración (`theme.js`, `layouts.js`, `diagrams.js`).
3. Redactar los módulos de contenido técnico de los 9 módulos temáticos (M00 a M10) con ~10 diapositivas por módulo, snippets YAML clave, notas exhaustivas y articulación de la estrategia de laboratorios (kubeadm VirtualBox / minikube).
4. Implementar el exportador Markdown para `GUIA_DEL_DOCENTE.md` con tabla de contenidos anclada y numeración vinculada.
5. Ejecutar la compilación del PPTX, validar contra scripts de la skill `pptx` y exportar ambos documentos a PDF.
