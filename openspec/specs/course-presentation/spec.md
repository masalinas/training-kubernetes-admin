# course-presentation Specification

## Purpose

Proporcionar una presentación técnica completa y profesional de 30 horas lectivas en formato PowerPoint (PPTX) y PDF para la formación avanzada en Administración de Kubernetes, cubriendo 9 módulos temáticos oficiales con notas de orador, snippets de manifiestos YAML y diagramas explicativos nativos.

## Requirements

### Requirement: Cobertura íntegra del temario oficial de 9 módulos
La presentación SHALL estructurarse en torno a los 9 módulos oficiales del temario de Administración de Kubernetes (Arquitectura e Instalación, Workloads y Ciclo de Vida, Redes Avanzadas y Servicios, Almacenamiento y Persistencia, Gestión de Recursos y Scheduling, Seguridad y Hardening, Observabilidad y Troubleshooting, Automatización con Helm, y Operaciones de Día 2 y Mantenimiento), además de diapositivas de apertura y cierre.

#### Scenario: Verificación de estructura modular completa
- **WHEN** se genera el archivo de presentación
- **THEN** el mazo contiene diapositivas dedicadas y secuenciadas para cada uno de los 9 módulos oficiales, sumando un total de entre 90 y 105 diapositivas.

### Requirement: Formato panorámico y diseño visual corporativo
La presentación SHALL generarse en relación de aspecto 16:9 panorámica, empleando una paleta cromática basada en los colores oficiales de Kubernetes (azul marino dominante, azul Kubernetes, pizarra y acentos semánticos de alerta/éxito) con alto contraste para legibilidad en pantalla o proyector, respetando las directrices de diseño sin líneas decorativas bajo títulos ni barras de color superfluas.

#### Scenario: Validación de aspecto y contraste
- **WHEN** se abre la presentación en PowerPoint o visor PDF
- **THEN** todas las diapositivas presentan dimensiones 16:9, tipografías legibles y estandarizadas (Calibri/Arial), márgenes mínimos de 0.5 pulgadas y contraste visual nítido entre textos y fondos.

### Requirement: Snippets YAML y comandos CLI integrados en diapositivas
La presentación SHALL incluir en las diapositivas que expliquen recursos específicos de Kubernetes un contenedor visual de código estilizado (fondo oscuro, tipografía monoespaciada `Courier New`) con fragmentos YAML esenciales (8-14 líneas) y comandos `kubectl` de referencia rápida.

#### Scenario: Visualización de especificaciones YAML en diapositivas
- **WHEN** el alumno o docente observa diapositivas sobre Deployments, Services, Ingress, NetworkPolicies, SecurityContexts o StorageClasses
- **THEN** la diapositiva muestra el bloque de código YAML formateado y legible junto a tarjetas explicativas de los campos clave.

### Requirement: Esquemas visuales y diagramas arquitectónicos nativos
La presentación SHALL incorporar diagramas y esquemas técnicos generados con elementos nativos vectoriales que ilustren flujos críticos de Kubernetes, incluyendo el flujo de peticiones desde el cliente hasta el Pod, el modelo de red y servicios, la arquitectura de seguridad multicapa (RBAC y Zero-Trust) y el árbol de diagnóstico de fallos.

#### Scenario: Inspección de diagramas arquitectónicos
- **WHEN** se visualizan las diapositivas de arquitectura, red, seguridad y troubleshooting
- **THEN** los diagramas se renderizan como formas vectoriales nítidas y organizadas sin depender de imágenes rasterizadas externas de baja resolución.

### Requirement: Estrategia de laboratorios articulada (Kubeadm VirtualBox y Minikube)
La presentación SHALL articular el entorno de prácticas formativas distinguiendo dos fases: en el Módulo 1 se expondrá la instalación de un clúster de dos nodos con `kubeadm` sobre máquinas virtuales VirtualBox (enlazando con el documento de laboratorio paso a paso), y a partir del Módulo 2 las prácticas se articularán principalmente sobre `minikube` para optimizar la agilidad de despliegue en clase.

#### Scenario: Presentación de los entornos de laboratorio
- **WHEN** el docente aborda las secciones prácticas en las diapositivas
- **THEN** las diapositivas y notas del Módulo 1 guían la configuración con `kubeadm` en VirtualBox y las de los Módulos 2 al 9 ofrecen comandos adaptados a `minikube` para los ejercicios prácticos.

### Requirement: Notas del orador estructuradas en cada diapositiva
Cada diapositiva SHALL incluir notas del orador exhaustivas en español accesibles mediante el panel de notas de PowerPoint, estructuradas obligatoriamente en cuatro apartados: objetivo pedagógico, explicación técnica de bajo nivel, pregunta de interacción con los alumnos y guía de laboratorio o gotcha de producción.

#### Scenario: Visualización de notas del instructor
- **WHEN** el docente activa la vista de moderador/orador en PowerPoint o consulta las notas de cualquier diapositiva
- **THEN** la diapositiva muestra los cuatro bloques pedagógicos con explicaciones detalladas y contextualizadas para la clase.

### Requirement: Exportación automatizada a PDF
El sistema SHALL permitir la compilación y exportación de la presentación completa a formato PDF de forma desatendida manteniendo la fidelidad visual, maquetación y tipografía.

#### Scenario: Generación exitosa del PDF de la presentación
- **WHEN** se ejecuta el pipeline de construcción de la presentación
- **THEN** se genera un archivo PDF equivalente en páginas y diseño visual al archivo PPTX generado.
