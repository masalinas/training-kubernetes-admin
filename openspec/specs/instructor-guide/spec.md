# instructor-guide Specification

## Purpose

Proporcionar un documento complementario exhaustivo en formatos Markdown y PDF que consolide el texto íntegro de las diapositivas, notas pedagógicas, explicaciones técnicas y guías prácticas para el instructor del curso de Administración de Kubernetes.

## Requirements

### Requirement: Generación sincronizada con las diapositivas
La guía docente (`GUIA_DEL_DOCENTE.md`) SHALL generarse a partir de la misma fuente de datos que la presentación, asegurando que los títulos, contenidos de diapositiva y notas del orador coincidan exactamente sin discrepancias entre ambos entregables.

#### Scenario: Coherencia entre presentación y guía docente
- **WHEN** se comparan las secciones y notas de la guía docente con las diapositivas del archivo PPTX
- **THEN** cada diapositiva cuenta con su entrada correspondiente en la guía con el mismo número, título, contenido textual y notas estructuradas del orador.

### Requirement: Índice navegable y numeración vinculada por diapositiva
La guía docente SHALL incluir al inicio una tabla de contenidos interactiva con enlaces ancla de Markdown que organice los 9 módulos temáticos y desglosen cada diapositiva con su número y título explícito (`[Diapositiva #XX: Título](#diapositiva-xx-titulo)`), permitiendo al profesor acceder instantáneamente a cualquier punto de la exposición.

#### Scenario: Navegación directa por diapositivas en la guía
- **WHEN** el docente pulsa sobre cualquier entrada del índice en la guía Markdown o documento PDF
- **THEN** la vista salta directamente a la sección correspondiente a esa diapositiva específica, mostrando su contenido proyectado y las notas del profesor.

### Requirement: Documentación de la estrategia de laboratorios
La guía docente SHALL documentar con claridad la metodología de talleres prácticos, detallando los requisitos y pasos para el laboratorio de instalación de clúster de 2 nodos con `kubeadm` en VirtualBox (Módulo 1) y las pautas de uso ágil de `minikube` para los ejercicios de los Módulos 2 al 9.

#### Scenario: Consulta de pautas de laboratorio por el instructor
- **WHEN** el docente revisa los módulos de la guía antes de una sesión práctica
- **THEN** encuentra instrucciones claras sobre si la práctica se realiza sobre el clúster `kubeadm` en VirtualBox o en `minikube`, con comandos y salidas esperadas.

### Requirement: Exportación a documento PDF imprimible
El sistema SHALL permitir la exportación de la guía docente desde Markdown a formato PDF maquetado profesionalmente, apto para impresión física o lectura en tableta por parte del profesor.

#### Scenario: Compilación de la guía a PDF
- **WHEN** se ejecuta el proceso de generación documental
- **THEN** se produce un archivo `GUIA_DEL_DOCENTE.pdf` con tipografía limpia, paginación y estructura de encabezados coherente.
