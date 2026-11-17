# Tasks

## 1. Configuración del Entorno y Motor Base del Generador

- [x] 1.1 Configurar el entorno Node.js e instalar `pptxgenjs` como dependencia del generador, verificando la importación exitosa mediante un script de prueba.
- [x] 1.2 Implementar la paleta de colores corporativa de Kubernetes, configuraciones de tipografía segura y factories de estilos en `generator/config/theme.js`, verificando que ningún objeto reutilice referencias mutables.
- [x] 1.3 Desarrollar plantillas de layouts modulares en `generator/config/layouts.js` (portadas oscuras, diapositivas divididas con arquitectura, cuadrículas de tarjetas, flujos de troubleshooting y layout `YAML_ANALYSIS` con contenedor oscuro y tipografía `Courier New` para snippets de manifiestos).
- [x] 1.4 Construir el módulo de diagramación vectorial nativa en `generator/utils/diagrams.js` para dibujar bloques de componentes de Kubernetes (Control Plane, Workers, Pods, Services, Storage y RBAC) con formas geométricas nativas.

## 2. Desarrollo de Módulos de Contenido: Bloque 1 (Módulos 0 a 3)

- [x] 2.1 Crear `generator/modules/m00_intro.js` con diapositivas y notas de bienvenida, objetivos del curso de 30 horas, explicación de la estrategia de laboratorios dual (kubeadm en VirtualBox + minikube) y metodología de trabajo.
- [x] 2.2 Crear `generator/modules/m01_architecture.js` cubriendo componentes del Control Plane y Workers, flujo de peticiones desde el cliente hasta el Pod, modelos CNI (Calico/Flannel) e instalación profunda de clúster de 2 nodos con `kubeadm` en máquinas virtuales VirtualBox (~11 slides con diagramas, snippets y notas).
- [x] 2.3 Crear `generator/modules/m02_workloads.js` cubriendo Deployments, StatefulSets (headless services y persistencia), DaemonSets, Jobs/CronJobs y ciclo de vida del Pod con estrategias RollingUpdate vs Recreate, adaptado a prácticas en `minikube` con snippets YAML de manifiestos (~11 slides con notas).
- [x] 2.4 Crear `generator/modules/m03_networking.js` cubriendo Services (ClusterIP, NodePort, LoadBalancer, iptables/IPVS), Ingress Controllers (Nginx Ingress, TLS con cert-manager) y resolución interna con CoreDNS con snippets YAML de Services/Ingress y diagramas (~12 slides con notas).

## 3. Desarrollo de Módulos de Contenido: Bloque 2 (Módulos 4 a 6)

- [x] 3.1 Crear `generator/modules/m04_storage.js` cubriendo CSI, StorageClass (provisionamiento dinámico en Cloud y NFS on-premise), ciclo de vida de PV y PVC, políticas de retención y modos de acceso con snippets YAML de StorageClass y PVC (~10 slides con notas).
- [x] 3.2 Crear `generator/modules/m05_scheduling.js` cubriendo Requests y Limits (cgroups, CPU throttling y OOMKilled), clases de QoS, Node Selector, Afinidad/Anti-afinidad de nodos y Pods, y Taints/Tolerations con evicciones (~10 slides con notas).
- [x] 3.3 Crear `generator/modules/m06_security.js` cubriendo RBAC (Roles, ClusterRoles, ServiceAccounts y principio de mínimo privilegio), Network Policies (Zero-Trust), Security Contexts (restricción de root, capacidades de Linux y filesystem de solo lectura) y gestión de Secretos con snippets YAML de políticas y contextos (~13 slides con notas).

## 4. Desarrollo de Módulos de Contenido: Bloque 3 (Módulos 7 a 10)

- [x] 4.1 Crear `generator/modules/m07_observability.js` cubriendo sondas de salud (Liveness, Readiness, Startup con snippets YAML), stack de monitorización con Prometheus y Grafana, agregación de logs con Loki/Fluentd y diagnóstico avanzado con árbol de troubleshooting (~13 slides con notas).
- [x] 4.2 Crear `generator/modules/m08_helm.js` cubriendo anatomía de Charts, repositorios, releases, motor de plantillas Go con valores por entorno y estrategias de rollback seguro (~9 slides con notas).
- [x] 4.3 Crear `generator/modules/m09_day2_ops.js` cubriendo autoscalado HPA y VPA, mantenimiento de nodos (Cordon, Drain con PodDisruptionBudgets, actualización de versión con kubeadm) y backup/restore de etcd (~10 slides con notas).
- [x] 4.4 Crear `generator/modules/m10_wrapup.js` con conclusiones del curso, hoja de ruta de preparación para certificaciones oficiales CKA/CKS y recursos recomendados (~4 slides con notas).

## 5. Orquestación, Exportación Documental y Validación de Calidad

- [x] 5.1 Implementar `generator/build.js` para orquestar la compilación de todos los módulos hacia `dist/kubernetes-administracion-presentacion.pptx`, verificando que el mazo contiene ~95-102 diapositivas y todas incluyen notas del orador estructuradas.
- [x] 5.2 Implementar `generator/utils/export_markdown.js` para extraer el contenido íntegro y notas de todos los módulos generando `dist/GUIA_DEL_DOCENTE.md` con un índice navegable jerárquico y numeración explícita de diapositivas vinculada (`[Diapositiva #XX: Título]`).
- [x] 5.3 Implementar el proceso de exportación a PDF para la presentación y para la guía docente en `dist/kubernetes-administracion-presentacion.pdf` y `dist/GUIA_DEL_DOCENTE.pdf` utilizando LibreOffice y pandoc.
- [x] 5.4 Ejecutar las validaciones de integridad de la presentación contra las utilidades de la skill `pptx` (`validate.py` y comprobación de ausencia de desbordamiento de texto), confirmando que los archivos generados están listos para impartir el curso.
