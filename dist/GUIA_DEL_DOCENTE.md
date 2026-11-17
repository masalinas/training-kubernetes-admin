# GUÍA DEL DOCENTE • KUBERNETES ADMINISTRACIÓN
## Clústeres, Seguridad, Observabilidad y Operaciones de Día 2

**Duración del Curso:** 30 Horas Lectivas (40% Exposición Teórica / 60% Laboratorios Prácticos)  
**Nivel:** Avanzado / Administradores de Sistemas y DevOps  
**Estrategia de Laboratorio:**  
- **Módulo 1:** Instalación profunda de clúster de 2 nodos con `kubeadm` en máquinas virtuales **VirtualBox** (siguiendo la guía técnica oficial paso a paso).  
- **Módulos 2 al 9:** Prácticas ágiles de despliegue, persistencia, políticas de red y troubleshooting sobre **`minikube`**.  

---

## Tabla de Contenidos y Navegación por Diapositivas

### [Introducción y Metodología](#introduccion-y-metodologia)
- [Diapositiva #1: KUBERNETES ADMINISTRACIÓN](#diapositiva-1-kubernetes-administracion)
- [Diapositiva #2: Objetivos Formativos del Curso](#diapositiva-2-objetivos-formativos-del-curso)
- [Diapositiva #3: Estrategia Dual de Laboratorio Práctico](#diapositiva-3-estrategia-dual-de-laboratorio-practico)
- [Diapositiva #4: Hoja de Ruta del Temario Oficial (9 Módulos)](#diapositiva-4-hoja-de-ruta-del-temario-oficial-9-modulos)

### [Módulo 1: Arquitectura Profunda e Instalación](#modulo-1-arquitectura-profunda-e-instalacion)
- [Diapositiva #5: Arquitectura Profunda e Instalación](#diapositiva-5-arquitectura-profunda-e-instalacion)
- [Diapositiva #6: Visión Global: Control Plane vs Plano de Datos](#diapositiva-6-vision-global-control-plane-vs-plano-de-datos)
- [Diapositiva #7: Componentes del Control Plane en Detalle](#diapositiva-7-componentes-del-control-plane-en-detalle)
- [Diapositiva #8: etcd: Consenso Raft y Alta Disponibilidad](#diapositiva-8-etcd-consenso-raft-y-alta-disponibilidad)
- [Diapositiva #9: Componentes del Worker Node](#diapositiva-9-componentes-del-worker-node)
- [Diapositiva #10: Flujo de una Petición: De kubectl al Pod en Ejecución](#diapositiva-10-flujo-de-una-peticion-de-kubectl-al-pod-en-ejecucion)
- [Diapositiva #11: Modelos de Red CNI (Container Network Interface)](#diapositiva-11-modelos-de-red-cni-container-network-interface)
- [Diapositiva #12: Comparativa de CNI: Calico vs Flannel](#diapositiva-12-comparativa-de-cni-calico-vs-flannel)
- [Diapositiva #13: Instalación con Kubeadm en VirtualBox: Prerrequisitos](#diapositiva-13-instalacion-con-kubeadm-en-virtualbox-prerrequisitos)
- [Diapositiva #14: Inicialización del Clúster: kubeadm init y join](#diapositiva-14-inicializacion-del-cluster-kubeadm-init-y-join)
- [Diapositiva #15: Gestión de Contextos y Accesos con Kubeconfig](#diapositiva-15-gestion-de-contextos-y-accesos-con-kubeconfig)

### [Módulo 2: Gestión de Workloads y Ciclo de Vida](#modulo-2-gestion-de-workloads-y-ciclo-de-vida)
- [Diapositiva #16: Gestión de Workloads y Ciclo de Vida](#diapositiva-16-gestion-de-workloads-y-ciclo-de-vida)
- [Diapositiva #17: El Pod: La Unidad Atómica de Cómputo](#diapositiva-17-el-pod-la-unidad-atomica-de-computo)
- [Diapositiva #18: Fases y Condiciones del Pod](#diapositiva-18-fases-y-condiciones-del-pod)
- [Diapositiva #19: Deployments y ReplicaSets: Gestión Declarativa](#diapositiva-19-deployments-y-replicasets-gestion-declarativa)
- [Diapositiva #20: Estrategias de Actualización: RollingUpdate vs Recreate](#diapositiva-20-estrategias-de-actualizacion-rollingupdate-vs-recreate)
- [Diapositiva #21: Historial de Revisiones y Rollbacks Inmediatos](#diapositiva-21-historial-de-revisiones-y-rollbacks-inmediatos)
- [Diapositiva #22: StatefulSets: Cargas con Estado e Identidad](#diapositiva-22-statefulsets-cargas-con-estado-e-identidad)
- [Diapositiva #23: StatefulSet en la Práctica: Manifiesto y Headless Service](#diapositiva-23-statefulset-en-la-practica-manifiesto-y-headless-service)
- [Diapositiva #24: DaemonSets: Un Pod en Cada Nodo del Clúster](#diapositiva-24-daemonsets-un-pod-en-cada-nodo-del-cluster)
- [Diapositiva #25: Jobs y CronJobs: Tareas Batch y Programadas](#diapositiva-25-jobs-y-cronjobs-tareas-batch-y-programadas)
- [Diapositiva #26: Ciclo de Terminación del Pod: Cierre Limpio](#diapositiva-26-ciclo-de-terminacion-del-pod-cierre-limpio)

### [Módulo 3: Redes Avanzadas y Exposición de Servicios](#modulo-3-redes-avanzadas-y-exposicion-de-servicios)
- [Diapositiva #27: Redes Avanzadas y Servicios](#diapositiva-27-redes-avanzadas-y-servicios)
- [Diapositiva #28: La Necesidad del Service: Abstracción de IPs Efímeras](#diapositiva-28-la-necesidad-del-service-abstraccion-de-ips-efimeras)
- [Diapositiva #29: Modos de Operación de Kube-Proxy: iptables vs IPVS](#diapositiva-29-modos-de-operacion-de-kube-proxy-iptables-vs-ipvs)
- [Diapositiva #30: Topología de Red: De la Petición Externa al Pod](#diapositiva-30-topologia-de-red-de-la-peticion-externa-al-pod)
- [Diapositiva #31: Tipos de Servicios en Kubernetes](#diapositiva-31-tipos-de-servicios-en-kubernetes)
- [Diapositiva #32: Service ClusterIP y NodePort en la Práctica](#diapositiva-32-service-clusterip-y-nodeport-en-la-practica)
- [Diapositiva #33: LoadBalancer en Cloud y On-Premise (MetalLB)](#diapositiva-33-loadbalancer-en-cloud-y-on-premise-metallb)
- [Diapositiva #34: Ingress Controller: Enrutamiento L7 y Dominios](#diapositiva-34-ingress-controller-enrutamiento-l7-y-dominios)
- [Diapositiva #35: Manifiesto de Ingress: Enrutamiento por Host y Path](#diapositiva-35-manifiesto-de-ingress-enrutamiento-por-host-y-path)
- [Diapositiva #36: Gestión de Certificados TLS/SSL con Cert-Manager](#diapositiva-36-gestion-de-certificados-tls-ssl-con-cert-manager)
- [Diapositiva #37: DNS Interno con CoreDNS: Resolución de Nombres](#diapositiva-37-dns-interno-con-coredns-resolucion-de-nombres)
- [Diapositiva #38: El Problema Oculto de ndots:5 en resolv.conf](#diapositiva-38-el-problema-oculto-de-ndots-5-en-resolv-conf)

### [Módulo 4: Administración de Almacenamiento y Persistencia](#modulo-4-administracion-de-almacenamiento-y-persistencia)
- [Diapositiva #39: Almacenamiento y Persistencia](#diapositiva-39-almacenamiento-y-persistencia)
- [Diapositiva #40: El Reto del Almacenamiento en Contenedores](#diapositiva-40-el-reto-del-almacenamiento-en-contenedores)
- [Diapositiva #41: Arquitectura CSI (Container Storage Interface)](#diapositiva-41-arquitectura-csi-container-storage-interface)
- [Diapositiva #42: Modos de Acceso a Volúmenes (AccessModes)](#diapositiva-42-modos-de-acceso-a-volumenes-accessmodes)
- [Diapositiva #43: PV y PVC: La Abstracción del Almacenamiento](#diapositiva-43-pv-y-pvc-la-abstraccion-del-almacenamiento)
- [Diapositiva #44: Políticas de Retención de Volúmenes](#diapositiva-44-politicas-de-retencion-de-volumenes)
- [Diapositiva #45: StorageClass: El Motor de Aprovisionamiento Dinámico](#diapositiva-45-storageclass-el-motor-de-aprovisionamiento-dinamico)
- [Diapositiva #46: StorageClass en Cloud y On-Premise con NFS](#diapositiva-46-storageclass-en-cloud-y-on-premise-con-nfs)
- [Diapositiva #47: Manifiesto de PVC y Consumo en el Pod](#diapositiva-47-manifiesto-de-pvc-y-consumo-en-el-pod)
- [Diapositiva #48: Expansión Dinámica y VolumeSnapshots](#diapositiva-48-expansion-dinamica-y-volumesnapshots)

### [Módulo 5: Gestión de Recursos y Programación (Scheduling)](#modulo-5-gestion-de-recursos-y-programacion-scheduling)
- [Diapositiva #49: Gestión de Recursos y Scheduling](#diapositiva-49-gestion-de-recursos-y-scheduling)
- [Diapositiva #50: El Problema del 'Vecino Ruidoso' (Noisy Neighbor)](#diapositiva-50-el-problema-del-vecino-ruidoso-noisy-neighbor)
- [Diapositiva #51: Requests vs Limits a Nivel de Kernel](#diapositiva-51-requests-vs-limits-a-nivel-de-kernel)
- [Diapositiva #52: Clases de Calidad de Servicio (QoS Classes)](#diapositiva-52-clases-de-calidad-de-servicio-qos-classes)
- [Diapositiva #53: Manifiesto de Recursos y Políticas de Cuota](#diapositiva-53-manifiesto-de-recursos-y-politicas-de-cuota)
- [Diapositiva #54: Selección Básica de Nodos: nodeSelector](#diapositiva-54-seleccion-basica-de-nodos-nodeselector)
- [Diapositiva #55: Afinidad de Nodos (Node Affinity)](#diapositiva-55-afinidad-de-nodos-node-affinity)
- [Diapositiva #56: Afinidad y Anti-Afinidad de Pods (Inter-Pod)](#diapositiva-56-afinidad-y-anti-afinidad-de-pods-inter-pod)
- [Diapositiva #57: Taints y Tolerations: Repulsión Selectiva de Nodos](#diapositiva-57-taints-y-tolerations-repulsion-selectiva-de-nodos)
- [Diapositiva #58: Evicciones de Pods y Presión de Nodo](#diapositiva-58-evicciones-de-pods-y-presion-de-nodo)

### [Módulo 6: Seguridad del Clúster (Hardening)](#modulo-6-seguridad-del-cluster-hardening)
- [Diapositiva #59: Seguridad del Clúster (Hardening)](#diapositiva-59-seguridad-del-cluster-hardening)
- [Diapositiva #60: El Modelo de Defensa en Profundidad](#diapositiva-60-el-modelo-de-defensa-en-profundidad)
- [Diapositiva #61: Autenticación en Kubernetes: Usuarios y ServiceAccounts](#diapositiva-61-autenticacion-en-kubernetes-usuarios-y-serviceaccounts)
- [Diapositiva #62: RBAC: Sujetos, Reglas y Vinculaciones](#diapositiva-62-rbac-sujetos-reglas-y-vinculaciones)
- [Diapositiva #63: Roles vs ClusterRoles y sus Bindings](#diapositiva-63-roles-vs-clusterroles-y-sus-bindings)
- [Diapositiva #64: Manifiesto RBAC en la Práctica: De la Regla al Binding](#diapositiva-64-manifiesto-rbac-en-la-practica-de-la-regla-al-binding)
- [Diapositiva #65: Auditoría de Permisos con kubectl auth can-i](#diapositiva-65-auditoria-de-permisos-con-kubectl-auth-can-i)
- [Diapositiva #66: Network Policies: Implementación de Zero-Trust](#diapositiva-66-network-policies-implementacion-de-zero-trust)
- [Diapositiva #67: Manifiesto de NetworkPolicy: Aislamiento de Base de Datos](#diapositiva-67-manifiesto-de-networkpolicy-aislamiento-de-base-de-datos)
- [Diapositiva #68: Pod Security Standards (PSS) y Admission](#diapositiva-68-pod-security-standards-pss-y-admission)
- [Diapositiva #69: SecurityContext: Endurecimiento a Nivel de Contenedor](#diapositiva-69-securitycontext-endurecimiento-a-nivel-de-contenedor)
- [Diapositiva #70: Secretos Nativos de Kubernetes y sus Riesgos](#diapositiva-70-secretos-nativos-de-kubernetes-y-sus-riesgos)
- [Diapositiva #71: Secretos Corporativos: External Secrets Operator (ESO)](#diapositiva-71-secretos-corporativos-external-secrets-operator-eso)

### [Módulo 7: Observabilidad y Troubleshooting](#modulo-7-observabilidad-y-troubleshooting)
- [Diapositiva #72: Observabilidad y Troubleshooting](#diapositiva-72-observabilidad-y-troubleshooting)
- [Diapositiva #73: Los Tres Pilares de la Observabilidad Cloud-Native](#diapositiva-73-los-tres-pilares-de-la-observabilidad-cloud-native)
- [Diapositiva #74: Sondas de Salud: Liveness, Readiness y Startup](#diapositiva-74-sondas-de-salud-liveness-readiness-y-startup)
- [Diapositiva #75: Configuración Experta de Sondas en YAML](#diapositiva-75-configuracion-experta-de-sondas-en-yaml)
- [Diapositiva #76: Las Trampas de las Sondas: Caídas en Cascada](#diapositiva-76-las-trampas-de-las-sondas-caidas-en-cascada)
- [Diapositiva #77: Arquitectura del Stack de Monitorización: Prometheus](#diapositiva-77-arquitectura-del-stack-de-monitorizacion-prometheus)
- [Diapositiva #78: Dashboards y Visualización en Grafana](#diapositiva-78-dashboards-y-visualizacion-en-grafana)
- [Diapositiva #79: Arquitecturas de Logging: Grafana Loki y Fluentd](#diapositiva-79-arquitecturas-de-logging-grafana-loki-y-fluentd)
- [Diapositiva #80: Metodología de Troubleshooting Sistémico](#diapositiva-80-metodologia-de-troubleshooting-sistemico)
- [Diapositiva #81: Diagnóstico 1: Pods en Estado Pending](#diapositiva-81-diagnostico-1-pods-en-estado-pending)
- [Diapositiva #82: Diagnóstico 2: CrashLoopBackOff y Errores de App](#diapositiva-82-diagnostico-2-crashloopbackoff-y-errores-de-app)
- [Diapositiva #83: Diagnóstico 3: OOMKilled (Exit Code 137)](#diapositiva-83-diagnostico-3-oomkilled-exit-code-137)
- [Diapositiva #84: Diagnóstico 4: Fallos de Red y Resolución DNS](#diapositiva-84-diagnostico-4-fallos-de-red-y-resolucion-dns)

### [Módulo 8: Automatización con Helm](#modulo-8-automatizacion-con-helm)
- [Diapositiva #85: Automatización con Helm](#diapositiva-85-automatizacion-con-helm)
- [Diapositiva #86: ¿Por Qué Helm? El Problema de los YAMLs Estáticos](#diapositiva-86-por-que-helm-el-problema-de-los-yamls-estaticos)
- [Diapositiva #87: Anatomía de un Helm Chart](#diapositiva-87-anatomia-de-un-helm-chart)
- [Diapositiva #88: El Motor de Plantillas de Go: Variables y Funciones](#diapositiva-88-el-motor-de-plantillas-de-go-variables-y-funciones)
- [Diapositiva #89: Parametrización Multientorno: values-dev vs values-prod](#diapositiva-89-parametrizacion-multientorno-values-dev-vs-values-prod)
- [Diapositiva #90: Gestión de Repositorios y Ciclo de Vida de Releases](#diapositiva-90-gestion-de-repositorios-y-ciclo-de-vida-de-releases)
- [Diapositiva #91: Actualizaciones Atómicas y Rollbacks Seguros](#diapositiva-91-actualizaciones-atomicas-y-rollbacks-seguros)
- [Diapositiva #92: Hooks del Ciclo de Vida y Tests en Helm](#diapositiva-92-hooks-del-ciclo-de-vida-y-tests-en-helm)
- [Diapositiva #93: Validación y Buenas Prácticas de Empaquetado](#diapositiva-93-validacion-y-buenas-practicas-de-empaquetado)

### [Módulo 9: Operaciones de Día 2 y Mantenimiento](#modulo-9-operaciones-de-dia-2-y-mantenimiento)
- [Diapositiva #94: Operaciones de Día 2 y Mantenimiento](#diapositiva-94-operaciones-de-dia-2-y-mantenimiento)
- [Diapositiva #95: Los Tres Niveles de Escalado Automático](#diapositiva-95-los-tres-niveles-de-escalado-automatico)
- [Diapositiva #96: Horizontal Pod Autoscaler (HPA) en Detalle](#diapositiva-96-horizontal-pod-autoscaler-hpa-en-detalle)
- [Diapositiva #97: Vertical Pod Autoscaler (VPA): Componentes y Modos](#diapositiva-97-vertical-pod-autoscaler-vpa-componentes-y-modos)
- [Diapositiva #98: Mantenimiento Seguro de Nodos: Cordon y Drain](#diapositiva-98-mantenimiento-seguro-de-nodos-cordon-y-drain)
- [Diapositiva #99: PodDisruptionBudgets (PDB): La Barrera de Protección](#diapositiva-99-poddisruptionbudgets-pdb-la-barrera-de-proteccion)
- [Diapositiva #100: Actualización de Versión del Clúster con Kubeadm](#diapositiva-100-actualizacion-de-version-del-cluster-con-kubeadm)
- [Diapositiva #101: Backup de etcd: La Base de Datos del Clúster](#diapositiva-101-backup-de-etcd-la-base-de-datos-del-cluster)
- [Diapositiva #102: Restauración de etcd Paso a Paso](#diapositiva-102-restauracion-de-etcd-paso-a-paso)
- [Diapositiva #103: Checklist de Salud y Hardening para Producción](#diapositiva-103-checklist-de-salud-y-hardening-para-produccion)

### [Conclusiones y Hoja de Ruta](#conclusiones-y-hoja-de-ruta)
- [Diapositiva #104: Conclusiones y Hoja de Ruta](#diapositiva-104-conclusiones-y-hoja-de-ruta)
- [Diapositiva #105: Resumen de Competencias Adquiridas](#diapositiva-105-resumen-de-competencias-adquiridas)
- [Diapositiva #106: Hoja de Ruta de Certificación: CKA y CKS](#diapositiva-106-hoja-de-ruta-de-certificacion-cka-y-cks)
- [Diapositiva #107: Herramientas Indispensables y Recursos Recomendados](#diapositiva-107-herramientas-indispensables-y-recursos-recomendados)

---

## Introducción y Metodología

### <a id="diapositiva-1-kubernetes-administracion"></a>Diapositiva #1: KUBERNETES ADMINISTRACIÓN

*Subtítulo:* **Clústeres, Seguridad y Observabilidad en Entornos Reales**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar el curso, establecer el marco formativo de 30 horas y alinear expectativas con los alumnos sobre las competencias de administración real de clústeres.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Kubernetes no es solo un orquestador de contenedores; es una plataforma extensible de sistemas distribuidos declarativos. Durante este curso se abordará no solo el 'cómo usarlo', sino el 'cómo funciona por dentro': la reconciliación continua de estados, el modelo de datos en etcd, la red a bajo nivel y las operaciones críticas de producción.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos de vosotros habéis tenido experiencia previa administrando clústeres en producción o resolviendo incidentes complejos en Kubernetes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Asegurarse de que todos los alumnos dispongan de acceso a una terminal Linux o WSL2 con permisos de sudo para los laboratorios prácticos.

---

### <a id="diapositiva-2-objetivos-formativos-del-curso"></a>Diapositiva #2: Objetivos Formativos del Curso

*Subtítulo:* **Cuatro pilares de especialización para el Administrador de Kubernetes**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Arquitectura e Instalación**
- Comprender el ciclo de vida de los componentes del Control Plane y Worker Nodes.
- Desplegar un clúster desde cero con kubeadm y configurar el modelo de red CNI.
- Gestionar accesos, contextos y credenciales con Kubeconfig.

**2. Workloads, Red y Storage**
- Dominar Deployments, StatefulSets y DaemonSets con zero-downtime.
- Implementar exposición L4/L7 (Services, Ingress Controllers y CoreDNS).
- Aprovisionar almacenamiento persistente dinámico mediante CSI, PV y StorageClass.

**3. Seguridad y Hardening**
- Establecer control de acceso de mínimo privilegio con RBAC granular.
- Aislar tráfico interno con Network Policies (Zero-Trust).
- Endurecer Pods con SecurityContexts y gestionar secretos externamente.

**4. Observabilidad y Día 2**
- Configurar sondas de salud y stacks de métricas con Prometheus y Grafana.
- Depurar caídas complejas: CrashLoopBackOff, Pending y OOMKilled.
- Ejecutar tareas de Día 2: actualizaciones de versión y backup de etcd.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Clarificar el mapa de competencias que el alumno dominará al finalizar las 30 horas de formación.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El temario está diseñado siguiendo los dominios de conocimiento requeridos en las certificaciones oficiales de la Cloud Native Computing Foundation (CKA y CKS), profundizando en escenarios reales de resolución de problemas.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuál de estos cuatro pilares consideráis que representa el mayor desafío en vuestras organizaciones actuales?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Las prácticas están pensadas para cometer errores deliberados y aprender a diagnosticar y reparar los clústeres.

---

### <a id="diapositiva-3-estrategia-dual-de-laboratorio-practico"></a>Diapositiva #3: Estrategia Dual de Laboratorio Práctico

*Subtítulo:* **Combinando rigor de producción con agilidad didáctica en el aula**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Clúster Kubeadm en VirtualBox** (Módulo 1: Instalación Profunda)
- 2 Nodos virtuales (1 Control Plane + 1 Worker) sobre Linux Ubuntu.
- Configuración manual de red: bridges, desactivación de swap y parámetros sysctl.
- Instalación paso a paso de containerd, kubeadm, kubelet y CNI Calico/Flannel.
- Acompañado de la guía técnica oficial detallada paso a paso.
- Objetivo: Entender exactamente qué hace cada binario y socket del sistema.

**Opción B: Laboratorios Ágiles con Minikube** (Módulos 2 al 9: Práctica Ágil)
- Entorno de pruebas ligero, rápido de reiniciar y altamente reproducible.
- Despliegue inmediato de manifiestos YAML: Deployments, Services, Ingress, RBAC.
- Soporte de addons integrados: ingress, metrics-server, storage.
- Permite experimentar sin miedo a corromper la infraestructura base.
- Objetivo: Maximizar el tiempo dedicado a administrar recursos y resolver problemas.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Explicar a los alumnos cómo se articularán las sesiones prácticas para optimizar el tiempo de aprendizaje.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Configurar un clúster de producción con kubeadm en máquinas virtuales es esencial para comprender la fontanería de red y certificados, pero reiniciar VMs cada vez ralentizaría los módulos de workloads y seguridad. Por ello, una vez dominado kubeadm en el Módulo 1, el trabajo diario con YAMLs y troubleshooting se apoya en minikube.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Habéis experimentado diferencias de comportamiento entre un entorno mononodo local y un clúster multi-nodo distribuido?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En minikube recordar activar los addons `minikube addons enable ingress` y `minikube addons enable metrics-server` cuando lleguemos a los módulos correspondientes.

---

### <a id="diapositiva-4-hoja-de-ruta-del-temario-oficial-9-modulos"></a>Diapositiva #4: Hoja de Ruta del Temario Oficial (9 Módulos)

*Subtítulo:* **Estructura modular en 3 bloques de aprendizaje progresivo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Bloque 1: Cimientos y Conectividad**
- M01: Arquitectura Profunda e Instalación con Kubeadm.
- M02: Gestión de Workloads y Ciclo de Vida del Pod.
- M03: Redes Avanzadas, Services, Ingress y CoreDNS.

**Bloque 2: Persistencia, Recursos y Seguridad**
- M04: Administración de Almacenamiento CSI, PV y PVC.
- M05: Gestión de Recursos, Requests/Limits y Scheduling.
- M06: Seguridad del Clúster: RBAC, NetworkPolicies y Hardening.

**Bloque 3: Observabilidad, Automatización y Día 2**
- M07: Observabilidad: Sondas, Prometheus, Grafana y Logs.
- M08: Automatización con Helm (Charts, Templates y Rollback).
- M09: Operaciones de Día 2: Autoscaling, Drains y Backup etcd.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Situar al alumno en la secuencia lógica del temario oficial de 9 módulos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Cada bloque construye sobre el anterior: no se puede entender NetworkPolicies sin comprender primero el CNI, ni se puede configurar HPA sin haber entendido Requests/Limits y metrics-server.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Tenéis algún caso de uso inmediato que queráis enfocar especialmente en alguno de los 9 módulos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Revisar los comandos que se utilizarán a lo largo del curso en la Guía del Docente.

---

## Módulo 1: Arquitectura Profunda e Instalación

### <a id="diapositiva-5-arquitectura-profunda-e-instalacion"></a>Diapositiva #5: Arquitectura Profunda e Instalación

*Subtítulo:* **Control Plane, Workers, Red CNI y Despliegue con Kubeadm**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Introducir los fundamentos estructurales de Kubernetes y fijar los objetivos del módulo.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En este módulo desglosamos cómo se comunican los componentes de Kubernetes de forma asíncrona a través de eventos en kube-apiserver y cómo se configura la infraestructura base en Linux.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué diferencia a Kubernetes de un gestor de VMs tradicional como vCenter o OpenStack?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Tener preparadas las dos máquinas virtuales con red interna o puente en VirtualBox antes de comenzar la sesión práctica.

---

### <a id="diapositiva-6-vision-global-control-plane-vs-plano-de-datos"></a>Diapositiva #6: Visión Global: Control Plane vs Plano de Datos

*Subtítulo:* **Separación estricta entre control declarativo y ejecución de contenedores**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Principios de Diseño**
- Control Plane: Cerebro del clúster. Mantiene el estado deseado, toma decisiones de scheduling y responde a eventos del clúster.
- Plano de Datos (Workers): Ejecutan las cargas de trabajo (Pods) y gestionan la red y almacenamiento a nivel de host.
- kube-apiserver como único punto de contacto con etcd; ningún otro componente escribe en la base de datos.
- Comunicación asíncrona basada en bucles de reconciliación (Watch & Sync) mediante HTTP/2 y WebSockets.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar la responsabilidad de los componentes del Control Plane respecto a los nodos Workers.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Todos los componentes se comunican exclusivamente con kube-apiserver mediante TLS mutual (mTLS). Ni el scheduler ni el controller manager hablan entre sí directamente. kube-apiserver expone un API REST que valida y persisten los objetos en etcd.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si se apaga el Control Plane mientras los Workers siguen encendidos? ¿Se caen los Pods?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En producción, el Control Plane debe desplegarse en alta disponibilidad con al menos 3 nodos para tolerar la caída de 1 nodo etcd.

---

### <a id="diapositiva-7-componentes-del-control-plane-en-detalle"></a>Diapositiva #7: Componentes del Control Plane en Detalle

*Subtítulo:* **Los cuatro pilares que garantizan la consistencia y estado del clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**kube-apiserver**
- Punto de entrada único para kubectl, workers y servicios externos.
- Pipeline de procesamiento: Autenticación -> Autorización (RBAC) -> Mutating Admission -> Validating Admission -> Persistencia en etcd.
- Escalable horizontalmente (stateless detrás de un load balancer).

**etcd**
- Almacén clave-valor distribuido, consistente y transaccional.
- Implementa el algoritmo de consenso Raft.
- Guarda la única fuente de verdad (Single Source of Truth) del clúster.
- Requiere latencias de disco fsync < 10ms (SSD/NVMe).

**kube-scheduler**
- Asigna Pods no programados a nodos aptos en dos fases:
- 1. Filtrado (Filtering): Descarta nodos sin CPU/Mem o con Taints.
- 2. Puntuación (Scoring): Clasifica nodos por afinidad y dispersión.
- Escribe la decisión asignando `spec.nodeName` en el Pod.

**kube-controller-manager**
- Empaqueta múltiples bucles de control en un único binario.
- Node Controller, Deployment Controller, EndpointSlice Controller, etc.
- Compara continuamente el estado actual con el estado deseado.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Profundizar en la responsabilidad técnica específica de cada binario del Control Plane.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> kube-controller-manager es en realidad un demonio que corre decenas de controladores independientes. Si creamos un Deployment, el DeploymentController crea un ReplicaSet, y el ReplicaSetController crea los Pods. Cada controlador tiene una sola responsabilidad.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué el scheduler no crea contenedores en el nodo? ¿Quién ejecuta realmente el contenedor?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Verificar la salud de estos componentes en el clúster con `kubectl get componentstatuses` (deprecated) o comprobando los static pods en `/etc/kubernetes/manifests/`.

---

### <a id="diapositiva-8-etcd-consenso-raft-y-alta-disponibilidad"></a>Diapositiva #8: etcd: Consenso Raft y Alta Disponibilidad

*Subtítulo:* **Por qué etcd es el componente más crítico y sensible del clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Algoritmo Raft y Quórum**
- Fórmula de quórum: (N / 2) + 1 nodos operativos.
- Para tolerar 1 fallo: Clúster de 3 nodos (Quórum = 2).
- Para tolerar 2 fallos: Clúster de 5 nodos (Quórum = 3).
- Nunca usar número par de nodos: 4 nodos toleran 1 fallo, igual que 3, pero añaden más overhead de red.

**Sensibilidad al Disco y Red**
- etcd realiza escrituras sincrónicas con llamada del sistema `fsync()` para garantizar persistencia.
- Una latencia de disco superior a 10-15 ms provocará fallos en los 'heartbeats' de Raft y elecciones continuas de líder.
- Recomendación en producción: Discos NVMe dedicados sin compartir IOPS.

**Compactación y Desfragmentación**
- etcd es multiversión (MVCC): cada cambio crea una nueva versión de la clave sin borrar la anterior.
- Límite por defecto de espacio de base de datos: 2 GB (ampliable a 8 GB).
- Es necesario programar compactación periódica y `etcdctl defrag` para liberar espacio físico en disco.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la matemática del quórum en Raft y los requisitos de hardware de etcd.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Si etcd pierde el quórum (por ejemplo, caen 2 de 3 nodos), el clúster entra en modo de solo lectura o falla completamente. Los Pods siguen corriendo porque kubelet no los detiene, pero no se pueden crear servicios, escalar pods ni responder a caídas de nodos.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si tenemos un clúster de 2 masters y uno se apaga? ¿Tenemos quórum?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En el laboratorio de VirtualBox de 2 nodos tendremos 1 Master y 1 Worker; etcd residirá solo en el Master.

---

### <a id="diapositiva-9-componentes-del-worker-node"></a>Diapositiva #9: Componentes del Worker Node

*Subtítulo:* **Los tres agentes que materializan las cargas en el sistema operativo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**kubelet (El Agente Principal)**
- Servicio systemd nativo en el host (no corre en contenedor).
- Registra el nodo ante el API Server informando capacidad de CPU y RAM.
- Observa asignaciones con `spec.nodeName == su_nodo` vía Watch.
- Se comunica con el runtime por gRPC a través del socket de CRI.
- Supervisa la salud de contenedores con Liveness/Readiness probes.

**CRI: Container Runtime Interface**
- Estándar de interfaz abierta para desacoplar Kubernetes del runtime de contenedores.
- Estándar actual de facto: containerd o CRI-O (Docker shim eliminado en v1.24).
- Invoca a runc para crear namespaces de Linux (PID, NET, MNT, IPC, UTS) y configurar cgroups para limitar recursos.

**kube-proxy (El Enrutador de Red)**
- Se ejecuta normalmente como un DaemonSet en cada nodo del clúster.
- Gestiona el concepto de 'Kubernetes Service' programando reglas en el kernel del host.
- Modos de operación: iptables (por defecto) o IPVS (mayor rendimiento y balanceo avanzado).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Detallar el rol de kubelet, containerd y kube-proxy en el nodo trabajador.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> kubelet es el único componente que no corre dentro de Kubernetes; es el nexo entre el kernel de Linux y el control plane. Si kubelet muere, los contenedores siguen corriendo en containerd, pero el nodo pasará a estado NotReady para el API Server tras un timeout.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué pasaría si kubelet intentara hablar con el runtime de contenedores usando la API de Docker en Kubernetes v1.30+?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Verificar siempre que `systemctl status kubelet` y `systemctl status containerd` estén en estado active (running).

---

### <a id="diapositiva-10-flujo-de-una-peticion-de-kubectl-al-pod-en-ejecucion"></a>Diapositiva #10: Flujo de una Petición: De kubectl al Pod en Ejecución

*Subtítulo:* **Secuencia completa de 7 pasos sincronizados mediante eventos**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Autenticación y Admisión**
- Usuario ejecuta: `kubectl apply -f pod.yaml`.
- apiserver autentica el cliente y RBAC valida permisos.
- Admission Controllers aplican mutaciones y validaciones.
- apiserver guarda el objeto en etcd con `spec.nodeName: ''`.

**2. Programación (Scheduling)**
- kube-scheduler tiene un 'Watch' activo sobre Pods sin asignar.
- Filtra los nodos aptos según CPU, memoria, taints y afinidad.
- Puntúa los nodos candidatos y elige el nodo óptimo (ej: `worker-1`).
- Envía una llamada `Binding` al apiserver asignando `nodeName: worker-1`.

**3. Detección en el Nodo (Kubelet)**
- kubelet de `worker-1` tiene un 'Watch' sobre Pods asignados a su nodo.
- Detecta el nuevo Pod y consulta las imágenes necesarias.
- Invoca al runtime containerd vía CRI: `RunPodSandbox`.
- Llama al plugin CNI (Calico/Flannel) para crear la interfaz veth y asignar IP.

**4. Creación y Ejecución**
- containerd descarga la imagen del registro si no está en caché.
- Crea y arranca los contenedores del Pod mediante runc.
- kubelet monitoriza el estado y notifica al apiserver: `Status: Running`.
- apiserver persiste el nuevo estado en etcd.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Seguir cronológicamente el ciclo de vida de creación de un Pod entre todos los actores.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Nótese que en ningún momento el API Server 'ordena' activamente al Kubelet que cree el pod mediante una conexión saliente hacia el nodo. Son el Scheduler y el Kubelet los que están suscritos con HTTP Streaming (Watch) al API Server. Este patrón desacoplado es la clave de la escalabilidad de Kubernetes.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué se utiliza el mecanismo de Watch en lugar de que el API Server haga polling o envíe push directo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si un pod se queda en estado 'Pending', el fallo ocurrió en el paso 2 (el Scheduler no encontró nodo apto).

---

### <a id="diapositiva-11-modelos-de-red-cni-container-network-interface"></a>Diapositiva #11: Modelos de Red CNI (Container Network Interface)

*Subtítulo:* **Los tres principios fundamentales de conectividad en Kubernetes**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Regla 1: IP Única por Pod**
- Cada Pod recibe su propia dirección IP enrutada.
- Todos los contenedores dentro del mismo Pod comparten la misma interfaz de red (localhost) y el mismo espacio de puertos.
- No hay colisiones de puertos entre Pods distintos en el mismo nodo.

**Regla 2: Comunicación Directa**
- Todos los Pods pueden comunicarse con todos los demás Pods del clúster sin usar NAT (Network Address Translation).
- La IP que un Pod ve como su dirección es exactamente la IP que ven los demás al comunicarse con él.
- Los agentes en un nodo (kubelet) pueden comunicarse con todos los Pods de ese nodo.

**Redes Overlay vs Enrutadas**
- Overlay (VXLAN/Geneve): Encapsula los paquetes del Pod dentro de paquetes UDP del host. Funciona sobre cualquier red física sin configurar routers.
- Enrutada (BGP): Los nodos anuncian las rutas de sus Pods a los switches físicos. Rendimiento nativo sin sobrecarga de encapsulación.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Interiorizar el contrato de red de Kubernetes y cómo el CNI cumple las 3 reglas doradas.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En Docker tradicional, los contenedores comparten la IP del host y requieren mapeo de puertos (-p 8080:80). Kubernetes descartó ese modelo por ser ingobernable a escala. El estándar CNI es un binario que el Kubelet ejecuta pasándole un JSON por stdin cada vez que un Pod se añade o elimina.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué penalización de rendimiento introduce una red Overlay con VXLAN frente a una red enrutada plana?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si no se instala un plugin CNI tras `kubeadm init`, los nodos permanecerán perpetuamente en estado `NotReady` y CoreDNS en `Pending`.

---

### <a id="diapositiva-12-comparativa-de-cni-calico-vs-flannel"></a>Diapositiva #12: Comparativa de CNI: Calico vs Flannel

*Subtítulo:* **Elegir el plugin adecuado según requisitos de seguridad y rendimiento**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Flannel** (Simplicidad y Ligereza)
- Diseñado exclusivamente para proveer conectividad L3 muy básica.
- Utiliza backend VXLAN por defecto para túneles overlay.
- Configuración mínima: solo requiere especificar el rango `pod-network-cidr`.
- LIMITACIÓN CRÍTICA: NO soporta Kubernetes NetworkPolicies (aislamiento de red).
- Ideal para: Entornos de desarrollo, Edge computing o laboratorios mínimos.

**Opción B: Calico** (Producción y Seguridad (Recomendado))
- Soporta tanto redes Overlay (VXLAN / IP-in-IP) como redes nativas con BGP.
- Implementación completa y avanzada de NetworkPolicies de Kubernetes y políticas extendidas.
- Motor de políticas de alto rendimiento basado en iptables o eBPF.
- Cifrado de tráfico entre nodos con WireGuard nativo.
- Ideal para: Entornos empresariales, producción y preparación de CKA/CKS.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Ayudar al alumno a seleccionar el CNI correcto entendiendo la gran diferencia en capacidades de seguridad.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Flannel es excelente para aprender porque casi nunca falla, pero en un entorno corporativo es inaceptable porque cualquier Pod puede hablar con cualquier otro (no hay firewall interno). Calico inspecciona el tráfico con el kernel de Linux y permite implementar Zero-Trust.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Si en un clúster con Flannel creamos un manifiesto de NetworkPolicy, da error de sintaxis al aplicarlo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta a la pregunta: No da error, se crea el objeto en etcd, pero Flannel simplemente ignora la política y no bloquea el tráfico.

---

### <a id="diapositiva-13-instalacion-con-kubeadm-en-virtualbox-prerrequisitos"></a>Diapositiva #13: Instalación con Kubeadm en VirtualBox: Prerrequisitos

*Subtítulo:* **Preparación del sistema operativo Linux en las dos máquinas virtuales**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Desactivación de Swap**
- `sudo swapoff -a` y comentar la línea en `/etc/fstab`.
- Motivo: kubelet asume que la memoria del nodo es determinista para gestionar la QoS y evitar que el kernel envíe memoria a disco.

**2. Módulos de Kernel y Sysctl**
- Cargar módulos: `overlay` y `br_netfilter`.
- `net.bridge.bridge-nf-call-iptables = 1`
- `net.ipv4.ip_forward = 1`
- Permite que el tráfico puenteado pase por las cadenas de iptables.

**3. Runtime containerd**
- Instalar `containerd.io` desde repositorios oficiales.
- Generar config limpia: `containerd config default`.
- IMPRESCINDIBLE: Configurar `SystemdCgroup = true` para unificar el gestor de cgroups con systemd.

**4. Paquetes de Kubernetes**
- Repositorio: `pkgs.k8s.io` (Debian/Ubuntu).
- Instalar: `kubeadm`, `kubelet` y `kubectl`.
- `sudo apt-mark hold kubeadm kubelet kubectl` para evitar actualizaciones automáticas accidentales.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Detallar la lista de comprobaciones previas indispensables antes de inicializar el clúster con kubeadm.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El error más común en instalaciones manuales es el desajuste de cgroups entre containerd (cgroupfs) y systemd (systemd cgroup). Si ambos no usan `SystemdCgroup = true`, el kubelet fallará al arrancar con un error en los logs de journalctl.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué bloqueamos los paquetes con `apt-mark hold`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Seguir atentamente la guía paso a paso proporcionada para VirtualBox para configurar la tarjeta de red interna con IPs fijas.

---

### <a id="diapositiva-14-inicializacion-del-cluster-kubeadm-init-y-join"></a>Diapositiva #14: Inicialización del Clúster: kubeadm init y join

*Subtítulo:* **De la generación de certificados y static pods a la adhesión del worker**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (kubeadm-init-and-join.sh):**

```yaml
# 1. Inicializar Control Plane en el Master
sudo kubeadm init \
  --apiserver-advertise-address=192.168.56.10 \
  --pod-network-cidr=192.168.0.0/16

# 2. Configurar Kubeconfig para el usuario
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 3. Aplicar plugin CNI Calico
kubectl create -f tigera-operator.yaml
kubectl create -f custom-resources.yaml

# 4. En el Worker: Unirse al clúster
sudo kubeadm join 192.168.56.10:6443 \
  --token abcdef.0123456789abcdef \
  --discovery-token-ca-cert-hash sha256:7b5...
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Guiar paso a paso la ejecución de `kubeadm init` en el nodo máster y `kubeadm join` en el worker.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Al ejecutar `kubeadm init`, el binario no usa el API de Docker ni habla con un clúster existente. kubeadm genera los certificados en `/etc/kubernetes/pki`, crea los archivos kubeconfig en `/etc/kubernetes/` y deposita los ficheros YAML de apiserver, etcd, scheduler y controller-manager en `/etc/kubernetes/manifests/`. Kubelet detecta estos ficheros y arranca los pods estáticos.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si el token de `kubeadm join` expira a las 24 horas y queremos unir un nuevo nodo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si el token expira, se puede generar uno nuevo en el máster con `kubeadm token create --print-join-command`.

---

### <a id="diapositiva-15-gestion-de-contextos-y-accesos-con-kubeconfig"></a>Diapositiva #15: Gestión de Contextos y Accesos con Kubeconfig

*Subtítulo:* **Estructura del archivo de configuración de kubectl para múltiples clústeres**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (~/.kube/config):**

```yaml
apiVersion: v1
kind: Config
preferences: {}

clusters:
- cluster:
    certificate-authority-data: LS0tLS1...
    server: https://192.168.56.10:6443
  name: k8s-virtualbox

users:
- name: kubernetes-admin
  user:
    client-certificate-data: LS0tLS1...
    client-key-data: LS0tLS1...

contexts:
- context:
    cluster: k8s-virtualbox
    user: kubernetes-admin
    namespace: default
  name: admin@k8s-virtualbox

current-context: admin@k8s-virtualbox
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la anatomía del archivo kubeconfig y aprender a alternar entre clústeres y namespaces.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> kubectl no tiene estado interno. En cada comando, lee `~/.kube/config`, busca el `current-context`, extrae la URL del servidor y las claves criptográficas del usuario, y construye la petición HTTPS con el certificado cliente.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos comprobar qué permisos reales tiene el usuario actual en el clúster sin lanzar una acción destructiva?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Usar `kubectl auth can-i create deployments` o `kubectl auth can-i --list` para verificar los permisos RBAC.

---

## Módulo 2: Gestión de Workloads y Ciclo de Vida

### <a id="diapositiva-16-gestion-de-workloads-y-ciclo-de-vida"></a>Diapositiva #16: Gestión de Workloads y Ciclo de Vida

*Subtítulo:* **Deployments, StatefulSets, DaemonSets, Jobs y Estrategias de Actualización**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar las abstracciones de alto nivel que gestionan el ciclo de vida de los Pods en Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En producción raramente se crean Pods 'sueltos' (naked pods). Se utilizan controladores que garantizan autorreparación (self-healing), escalabilidad y actualizaciones progresivas.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre con un Pod individual si el nodo donde corre sufre un corte de alimentación físico?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> A partir de este módulo usaremos Minikube para crear y destruir rápidamente Deployments y observar el comportamiento de réplicas.

---

### <a id="diapositiva-17-el-pod-la-unidad-atomica-de-computo"></a>Diapositiva #17: El Pod: La Unidad Atómica de Cómputo

*Subtítulo:* **Patrones de diseño de contenedor único y multicontenedor**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Espacios de Nombres Compartidos**
- Network Namespace: Todos los contenedores del Pod comparten la misma IP y localhost (127.0.0.1).
- IPC & UTS: Comunicación por memoria compartida y mismo hostname.
- Storage Volumes: Los volúmenes montados son accesibles por todos los contenedores del Pod.

**Init Containers (Inicializadores)**
- Se ejecutan en serie y deben completarse exitosamente antes de que arranquen los contenedores de la aplicación.
- Casos típicos: Esperar a que la base de datos esté accesible (`wait-for-it`), descargar certificados o pre-poblar datos en un volumen compartido (`emptyDir`).

**Patrones Multicontenedor**
- Sidecar: Extiende o mejora el contenedor principal (ej. exportador de métricas Prometheus o recolector de logs).
- Adapter: Homogeneiza salidas heterogéneas para monitorización centralizada.
- Ambassador: Actúa como proxy local simplificando la conexión a servicios externos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la relación íntima entre contenedores dentro de un mismo Pod y la utilidad de los Init Containers.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Un Pod modela una 'máquina virtual lógica' donde múltiples procesos cooperan estrechamente. En Kubernetes 1.28+, los sidecars nativos se pueden definir mediante `initContainers` con `restartPolicy: Always`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuándo deberíamos separar dos contenedores en Pods diferentes en lugar de juntarlos en el mismo Pod?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si un initContainer falla o entra en bucle, el Pod nunca pasará a estado Running y mostrará `Init:CrashLoopBackOff`.

---

### <a id="diapositiva-18-fases-y-condiciones-del-pod"></a>Diapositiva #18: Fases y Condiciones del Pod

*Subtítulo:* **Interpretación precisa del estado de salud según la API de Kubernetes**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Fases del Pod (spec.status.phase)**
- Pending: Aceptado por API Server; a la espera de nodo o imágenes.
- Running: Enlazado a un nodo y al menos un contenedor en marcha.
- Succeeded: Todos los contenedores terminaron con éxito (código 0).
- Failed: Al menos un contenedor finalizó con código distinto de 0.
- Unknown: Sin comunicación con el Kubelet del nodo.

**Condiciones del Pod (status.conditions)**
- PodScheduled: El Scheduler ha asignado un nodo exitosamente.
- Initialized: Todos los initContainers han terminado con éxito.
- ContainersReady: Todos los contenedores han pasado su Readiness Probe.
- Ready: El Pod está apto para recibir tráfico de la red (Services).

**Políticas de Reinicio (restartPolicy)**
- Always (Por defecto en Deployments): Reinicia el contenedor si se cae.
- OnFailure: Solo reinicia si el contenedor termina con código de error (Jobs).
- Never: Nunca reinicia el contenedor tras finalizar.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a diferenciar las fases de alto nivel de las condiciones granulares del Pod para un diagnóstico rápido.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Muchos administradores confunden `Running` con `Ready`. Un Pod puede estar en fase `Running` (el proceso existe en Linux), pero su condición `Ready` puede ser `False` porque la base de datos aún no responde a la sonda. En ese caso, Kubernetes NO le enviará tráfico de red.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué diferencia práctica hay entre un Pod que está en estado CrashLoopBackOff y un Pod en estado Error?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Inspeccionar siempre las condiciones con `kubectl describe pod <nombre>` en la sección 'Conditions:'.

---

### <a id="diapositiva-19-deployments-y-replicasets-gestion-declarativa"></a>Diapositiva #19: Deployments y ReplicaSets: Gestión Declarativa

*Subtítulo:* **El estándar para aplicaciones stateless con autorreparación y escalado**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (deployment-web.yaml):**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Máx 4 pods en update
      maxUnavailable: 0  # Cero downtime garantizado
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.4-alpine
        ports:
        - containerPort: 80
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Entender cómo un Deployment utiliza un ReplicaSet por debajo para garantizar el estado deseado.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El Deployment no gestiona directamente los Pods. El Deployment crea un ReplicaSet con un hash en el nombre (ej. `nginx-deployment-7b89f8c65`). Es el ReplicaSet el que se encarga de crear o destruir Pods para igualar el número de réplicas deseadas.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si cambiamos manualmente las labels de un Pod que pertenece a un Deployment?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: El Deployment 'pierde' el Pod (queda huérfano) y crea inmediatamente un nuevo Pod para restaurar las 3 réplicas.

---

### <a id="diapositiva-20-estrategias-de-actualizacion-rollingupdate-vs-recreate"></a>Diapositiva #20: Estrategias de Actualización: RollingUpdate vs Recreate

*Subtítulo:* **Garantizar disponibilidad continua frente a incompatibilidades de esquema**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: RollingUpdate** (Sin Inactividad (Por Defecto))
- Crea Pods de la nueva versión progresivamente mientras retira los antiguos.
- Cero tiempo de inactividad (Zero Downtime) para los usuarios finales.
- Requiere que la aplicación soporte versiones coexistentes (ej. v1 y v2 compartiendo la misma base de datos).
- Control fino con `maxSurge` (cuántos Pods extra crear) y `maxUnavailable` (cuántos pueden caer).
- Recomendado para APIs stateless, frontends y microservicios modernos.

**Opción B: Recreate** (Inactividad Controlada)
- Mata TODOS los Pods de la versión anterior a la vez antes de arrancar los nuevos.
- Introduce una ventana temporal de inactividad (Downtime).
- Evita que dos versiones de la aplicación se ejecuten al mismo tiempo contra la base de datos.
- Obligatorio si hay migraciones de base de datos destructivas y no retrocompatibles.
- Consumo de recursos constante (no requiere capacidad extra de CPU/Memoria en los nodos).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Saber elegir entre RollingUpdate y Recreate según la arquitectura de datos de la aplicación.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En `RollingUpdate`, durante el tiempo que dura el despliegue, el Service enviará tráfico tanto a pods v1 como v2 de forma balanceada. Si la v2 cambia la firma de una cookie o una columna de base de datos sin retrocompatibilidad, la sesión del usuario fallará. Por eso la retrocompatibilidad hacia atrás es esencial.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué valores de `maxSurge` y `maxUnavailable` configuraríais para desplegar lo más rápido posible si tenemos capacidad de sobra en el clúster?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Configurar `maxUnavailable: 0` y `maxSurge: 100%` duplica temporalmente los pods y acelera el despliegue con 0 downtime.

---

### <a id="diapositiva-21-historial-de-revisiones-y-rollbacks-inmediatos"></a>Diapositiva #21: Historial de Revisiones y Rollbacks Inmediatos

*Subtítulo:* **Cómo revertir un despliegue fallido en cuestión de segundos**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Monitorizar el Despliegue**
- `kubectl rollout status deployment/<nombre>`
- Bloquea la terminal o el pipeline de CI/CD hasta que el despliegue finaliza con éxito o supera el `progressDeadlineSeconds` (600s por defecto).

**2. Inspeccionar el Historial**
- `kubectl rollout history deployment/<nombre>`
- Muestra las diferentes revisiones generadas.
- Para ver el detalle de cambios de una revisión concreta: `kubectl rollout history deployment/<nombre> --revision=2`.

**3. Reversión Rápida (Rollback)**
- Revertir a la versión inmediatamente anterior: `kubectl rollout undo deployment/<nombre>`.
- Revertir a una revisión específica histórica: `kubectl rollout undo deployment/<nombre> --to-revision=1`.
- El Deployment reutiliza el ReplicaSet antiguo preexistente.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Capacitar al administrador para auditar y revertir despliegues defectuosos sin tener que reescribir YAMLs.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Kubernetes guarda los ReplicaSets antiguos (por defecto los últimos 10, configurable con `revisionHistoryLimit`). Cuando ejecutamos `rollout undo`, el Deployment simplemente escala hacia arriba el ReplicaSet antiguo y escala a cero el nuevo. Por eso el rollback tarda apenas 2 o 3 segundos.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre con los ReplicaSets antiguos si `revisionHistoryLimit` está configurado en 0?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si está en 0, no se guarda historial y `kubectl rollout undo` no funcionará.

---

### <a id="diapositiva-22-statefulsets-cargas-con-estado-e-identidad"></a>Diapositiva #22: StatefulSets: Cargas con Estado e Identidad

*Subtítulo:* **Diseñado para bases de datos distribuidas (PostgreSQL, Kafka, Elasticsearch)**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Identidad de Red Estable**
- Cada Pod recibe un índice ordinal predecible en su hostname: `web-0`, `web-1`, `web-2`.
- No cambia tras reinicios ni tras reprogramarse en otro nodo.
- Requiere un 'Headless Service' (`clusterIP: None`) que crea registros DNS dedicados para cada Pod.

**Persistencia Dedicada (PVC)**
- Utiliza `volumeClaimTemplates` en lugar de volúmenes compartidos.
- Cada Pod `web-N` recibe su propio disco persistente: `data-web-0`, `data-web-1`.
- Si el Pod `web-0` muere, su reemplazo se vincula exactamente al mismo disco `data-web-0`.

**Garantías de Orden y Despliegue**
- Despliegue y escalado secuencial: `web-0` debe estar 100% Ready antes de arrancar `web-1`.
- Escalado hacia abajo inverso: primero se destruye `web-2`, luego `web-1`.
- Configurable mediante `podManagementPolicy: OrderedReady` o `Parallel`.

**Políticas de Retención de Discos**
- Al reducir réplicas o borrar el StatefulSet, los PVCs NO se eliminan automáticamente para prevenir pérdida de datos catastrófica.
- El administrador debe borrar explícitamente los PVCs huérfanos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender cuándo es imprescindible usar un StatefulSet en lugar de un Deployment.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En un Deployment, todos los pods son clones anónimos y fungibles (`app-7bc9-4x2kl`). En un clúster como Kafka o MongoDB réplica, necesitas saber con certeza quién es el nodo primario (`mongo-0`) y quiénes los secundarios (`mongo-1`, `mongo-2`). StatefulSet proporciona esa identidad fija de red y disco.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué borrar un StatefulSet no borra sus PersistentVolumeClaims asociados?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Es una medida de seguridad por diseño de Kubernetes: los datos son sagrados y solo se purgan por acción manual.

---

### <a id="diapositiva-23-statefulset-en-la-practica-manifiesto-y-headless-service"></a>Diapositiva #23: StatefulSet en la Práctica: Manifiesto y Headless Service

*Subtítulo:* **Integración de Headless Service con volumeClaimTemplates**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (statefulset-db.yaml):**

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: "db-service"    # Enlaza con Headless Service
  replicas: 2
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 5Gi
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar la sintaxis declarativa que vincula un StatefulSet con su Headless Service y sus plantillas de volumen.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El registro DNS resultante será `postgres-0.db-service.default.svc.cluster.local`. Gracias a esto, la aplicación cliente o las réplicas secundarias pueden conectarse directamente al nodo 0 sin pasar por un balanceador aleatorio.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué pasaría si intentamos usar un `emptyDir` o un `hostPath` compartido en un StatefulSet en lugar de `volumeClaimTemplates`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube, el provisionador por defecto `standard` (hostpath) creará automáticamente los volúmenes para las pruebas.

---

### <a id="diapositiva-24-daemonsets-un-pod-en-cada-nodo-del-cluster"></a>Diapositiva #24: DaemonSets: Un Pod en Cada Nodo del Clúster

*Subtítulo:* **Garantizar servicios de infraestructura y agentes de nodo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Casos de Uso Principales**
- Agentes de Recolección de Logs: Fluentd, Fluentbit, Promtail.
- Monitorización de Infraestructura: Node-Exporter, Datadog Agent.
- Networking del Clúster: CNI Plugins (kube-proxy, Calico-node, Flannel).
- Gestores de Almacenamiento Local: Ceph OSD, GlusterFS.

**Comportamiento Dinámico**
- Cuando se añade un nuevo nodo worker al clúster, el DaemonSetController programa automáticamente un Pod en él.
- Cuando un nodo es eliminado del clúster, sus Pods del DaemonSet son destruidos por el recolector de basura.

**Tolerancia de Nodos y Scheduling**
- Los DaemonSets suelen incluir tolerations para taints de sistema (`node-role.kubernetes.io/control-plane:NoSchedule`) si necesitan ejecutarse también en los masters.
- Desde K8s 1.12, los DaemonSets son gestionados por el scheduler por defecto (respetando afinidades).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la función crítica de los DaemonSets para los servicios a nivel de host.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> A diferencia de un Deployment donde se especifica `replicas: 5` sin importar en qué nodos caigan, en un DaemonSet el número de réplicas es siempre igual al número de nodos aptos del clúster. Si hay 10 nodos, habrá 10 pods.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos hacer que un DaemonSet se ejecute solo en nodos que tengan tarjetas GPU?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Usar `spec.template.spec.nodeSelector: { gpu: 'nvidia' }`.

---

### <a id="diapositiva-25-jobs-y-cronjobs-tareas-batch-y-programadas"></a>Diapositiva #25: Jobs y CronJobs: Tareas Batch y Programadas

*Subtítulo:* **Ejecución de procesos finitos garantizando finalización exitosa**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (backup-cronjob.yaml):**

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
spec:
  schedule: "*/15 * * * *"        # Cada 15 minutos
  concurrencyPolicy: Forbid       # Evita solapamiento
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      backoffLimit: 3             # 3 reintentos máx
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: db-backup
            image: postgres:15-alpine
            command: ["/bin/sh", "-c"]
            args: ["pg_dump -h db-service -U admin mydb > /backup/mydb.sql"]
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Explicar la diferencia entre cargas continuas (Deployments) y tareas batch de ejecución única o programada.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En un Deployment, si el proceso finaliza con código 0, Kubernetes asume que algo ha fallado y lo reinicia. En un Job, la salida con código 0 es la victoria: el Job pasa a `Completed` y ya no consume recursos de CPU.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué es tan peligroso dejar `concurrencyPolicy: Allow` en un backup de base de datos pesado?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si un backup tarda 20 minutos y el cronjob se ejecuta cada 15, con `Allow` se acumularán procesos consumiendo IOPS y colapsando el servidor.

---

### <a id="diapositiva-26-ciclo-de-terminacion-del-pod-cierre-limpio"></a>Diapositiva #26: Ciclo de Terminación del Pod: Cierre Limpio

*Subtítulo:* **Secuencia de pasos para evitar pérdida de peticiones en vuelo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Desvinculación de Red (Endpoints)**
- El API Server marca el Pod en estado `Terminating`.
- EndpointSlice controller retira la IP del Pod del Service.
- kube-proxy elimina las reglas de enrutamiento en los nodos.
- A partir de este instante, ninguna petición nueva llega al Pod.

**2. Ejecución de preStop Hook y SIGTERM**
- Si está configurado, kubelet ejecuta el hook `preStop` en el contenedor.
- A continuación, kubelet envía la señal `SIGTERM` (PID 1).
- La aplicación debe dejar de aceptar peticiones nuevas y completar las peticiones en curso.

**3. Tiempo de Gracia y SIGKILL**
- `terminationGracePeriodSeconds` (por defecto: 30 segundos).
- Si la aplicación no ha finalizado tras cumplirse este tiempo de gracia, kubelet envía `SIGKILL` (muerte forzosa inmediata del proceso).
- Ajustar este valor en apps con transacciones largas.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Asegurar que los alumnos entiendan cómo diseñar aplicaciones cloud-native con cierre elegante (Graceful Shutdown).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Existe una carrera crítica: cuando un Pod pasa a `Terminating`, la señal SIGTERM se envía al Pod AL MISMO TIEMPO que la IP se retira de iptables. Si la app cierra su socket inmediatamente al recibir SIGTERM, las peticiones que ya venían en camino por la red darán error de conexión rechazada (502 Bad Gateway).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo puede ayudar un `sleep 5` en el hook `preStop` a eliminar los errores 502 durante un despliegue?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Añadir `lifecycle: { preStop: { exec: { command: ['sleep', '5'] } } }` da tiempo a que iptables se actualice antes de que la app reciba el SIGTERM.

---

## Módulo 3: Redes Avanzadas y Exposición de Servicios

### <a id="diapositiva-27-redes-avanzadas-y-servicios"></a>Diapositiva #27: Redes Avanzadas y Servicios

*Subtítulo:* **ClusterIP, NodePort, LoadBalancer, Ingress Nginx, TLS y CoreDNS**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar los mecanismos de red mediante los cuales las aplicaciones se comunican internamente y se exponen al exterior.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En este módulo desmitificamos el concepto de 'Service' (que no es un proceso ni un contenedor, sino una regla iptables/IPVS) y analizamos Ingress y la resolución interna con CoreDNS.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué no podemos simplemente conectar un frontend a un backend usando la IP directa del Pod?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube, para probar Ingress ejecutaremos `minikube addons enable ingress` y `minikube tunnel` si usamos LoadBalancer.

---

### <a id="diapositiva-28-la-necesidad-del-service-abstraccion-de-ips-efimeras"></a>Diapositiva #28: La Necesidad del Service: Abstracción de IPs Efímeras

*Subtítulo:* **Punto de acceso estático y balanceado para conjuntos dinámicos de Pods**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El Problema de las IPs Efímeras**
- Los Pods son mortales y desechables.
- Cada vez que un Pod se reinicia, muere o escala, recibe una nueva IP asignada por el CNI.
- Los clientes no pueden mantener una lista estática de IPs de servidores backend.

**El Service como Abstracción L4**
- Proporciona una IP Virtual (ClusterIP) inmutable y un nombre DNS estable.
- Distribuye el tráfico entre los Pods sanos que coincidan con sus selectores de etiquetas (`spec.selector`).
- Cero sobrecarga de proxy en userspace: el tráfico va directo de kernel a kernel.

**Endpoints y EndpointSlices**
- El objeto Service NO envía tráfico; es solo configuración.
- El EndpointSlice controller vigila los Pods y crea objetos `EndpointSlice` con las IPs y puertos de los Pods en estado `Ready`.
- kube-proxy lee los EndpointSlices para programar las reglas en el host.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la separación entre el objeto Service y el objeto EndpointSlice.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Cuando un Pod falla su Readiness Probe, no se destruye el pod: simplemente el EndpointSlice controller retira su IP de la lista de endpoints. Al instante, kube-proxy retira la regla de iptables y el pod deja de recibir tráfico.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si creamos un Service sin selector (`spec.selector` vacío)?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: No se crean endpoints automáticos. Es útil para apuntar a bases de datos externas creando manualmente un objeto Endpoints.

---

### <a id="diapositiva-29-modos-de-operacion-de-kube-proxy-iptables-vs-ipvs"></a>Diapositiva #29: Modos de Operación de Kube-Proxy: iptables vs IPVS

*Subtítulo:* **Evolución del plano de datos para clústeres de gran escala**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Modo iptables** (Por Defecto (Hasta ~1000 Servicios))
- Inserta reglas en la tabla `nat` de Linux para aplicar DNAT hacia los Pods.
- Balanceo mediante el módulo `statistic` de iptables con probabilidad pseudoaleatoria.
- Complejidad algorítmica: O(n) secuencial. Cada paquete evalúa reglas una a una.
- Problema a escala: Si hay más de 5.000 servicios, la actualización de reglas satura la CPU del nodo.
- Excelente compatibilidad y presente en cualquier distribución Linux.

**Opción B: Modo IPVS (IP Virtual Server)** (Alto Rendimiento (Escala Masiva))
- Utiliza el subsistema Netfilter L4 de Linux basado en tablas Hash.
- Complejidad algorítmica: O(1) constante sin importar el número de servicios.
- Soporta múltiples algoritmos de balanceo: round-robin, least-connection, source-hash (afinidad de sesión persistente).
- Recomendado para clústeres con más de 1.000 servicios o alto tráfico concurrente.
- Requiere cargar módulos de kernel (`ip_vs`, `ip_vs_rr`, etc.) en el host.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Explicar las limitaciones de iptables a escala y cuándo migrar a IPVS.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En iptables, 10.000 servicios generan más de 40.000 reglas en el kernel. Cada paquete de red debe recorrer secuencialmente esa cadena. En IPVS, la búsqueda en tabla hash es inmediata independientemente del tamaño del clúster.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué modo de kube-proxy utiliza Minikube por defecto?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Minikube usa `iptables` por compatibilidad. Para activar IPVS se pasa la flag `--extra-config=kube-proxy.mode=ipvs`.

---

### <a id="diapositiva-30-topologia-de-red-de-la-peticion-externa-al-pod"></a>Diapositiva #30: Topología de Red: De la Petición Externa al Pod

*Subtítulo:* **Flujo L4 y L7 a través de las diferentes capas del clúster**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Capas de Tráfico**
- Capa L7 (Ingress): Inspecciona cabeceras HTTP, Host y Path. Termina TLS y enruta hacia los servicios internos.
- Capa L4 (Service): Asigna una IP virtual (VIP) y balancea las conexiones TCP/UDP hacia los Pods sanos.
- Capa CNI: Resuelve la entrega directa del paquete al namespace de red del Pod mediante interfaces veth.
- CoreDNS: Traduce nombres amigables a ClusterIPs de forma transparente para los clientes.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Visualizar conjuntamente cómo cooperan Ingress, Service, CNI y CoreDNS.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Es fundamental entender que el Ingress Controller (como Nginx) suele hacer un 'bypass' de la ClusterIP: consulta los EndpointSlices directamente y enruta el paquete HTTP directamente al Pod IP para evitar un salto extra de iptables y soportar WebSockets y Keep-Alive nativo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué el Ingress Controller habla directamente con la IP del Pod en lugar de enviar el tráfico a la IP del Service?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Para mantener conexiones persistentes y balanceo por cookie (session affinity) a nivel HTTP.

---

### <a id="diapositiva-31-tipos-de-servicios-en-kubernetes"></a>Diapositiva #31: Tipos de Servicios en Kubernetes

*Subtítulo:* **Cuatro niveles de visibilidad y exposición de red**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**ClusterIP (Por Defecto)**
- Solo accesible desde DENTRO del clúster (VIP privada).
- Rango asignado mediante flag `service-cluster-ip-range`.
- Uso ideal: Bases de datos, cachés y microservicios internos.

**NodePort**
- Abre un puerto estático en cada nodo (rango 30000-32767).
- Acceso externo vía `<Cualquier-Node-IP>:<NodePort>`.
- Crea automáticamente una IP ClusterIP interna de soporte.

**LoadBalancer**
- Aprovisiona un balanceador externo en la nube (AWS/GCP/Azure).
- Asigna una IP pública única hacia los Pods de la aplicación.
- En entornos On-Premise / Bare-Metal requiere MetalLB.

**ExternalName**
- Sin selectores ni asignación de IP virtual (VIP).
- Mapea a un registro CNAME externo (ej: `db.empresa.com`).
- Resolución directa mediante CoreDNS sin intermediación de kube-proxy.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar con claridad cuándo utilizar cada tipo de Service y cómo heredan capacidades.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> NodePort es una abstracción tosca para producción porque expone puertos no estándar (ej: 31245). Nadie quiere entrar a una web corporativa con `https://miempresa.com:31245`. Por ello, en producción se usa Ingress o LoadBalancer.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre con el tráfico si enviamos una petición al NodePort del Nodo 1 pero el Pod corre en el Nodo 2?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> kube-proxy en el Nodo 1 hace SNAT y reenvía el tráfico por el CNI al Nodo 2 (a menos que se use `externalTrafficPolicy: Local`).

---

### <a id="diapositiva-32-service-clusterip-y-nodeport-en-la-practica"></a>Diapositiva #32: Service ClusterIP y NodePort en la Práctica

*Subtítulo:* **Desmitificando el mapeo entre port, targetPort y nodePort**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (service-web.yaml):**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - name: http
    port: 80             # Puerto del Service
    targetPort: 8080     # Puerto del Pod
    nodePort: 30080      # Puerto en el host
  externalTrafficPolicy: Local # Preserva IP cliente
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aclarar definitivamente la confusión habitual entre `port`, `targetPort` y `nodePort`.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Regla mnemotécnica: `port` es donde habla el cliente al Service. `targetPort` es donde escucha el proceso en el contenedor. `nodePort` es el puerto de la máquina virtual.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué `externalTrafficPolicy: Local` preserva la IP real del cliente pero puede desbalancear la carga?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Con `Local`, si un nodo recibe tráfico en su nodePort pero no tiene ningún Pod local de ese servicio, DESCARTA el paquete (no lo reenvía a otros nodos).

---

### <a id="diapositiva-33-loadbalancer-en-cloud-y-on-premise-metallb"></a>Diapositiva #33: LoadBalancer en Cloud y On-Premise (MetalLB)

*Subtítulo:* **Cómo aprovisionar IPs externas en nubes públicas y centros de datos propios**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**LoadBalancer en Entornos Cloud**
- El cloud-controller-manager detecta el servicio `type: LoadBalancer`.
- Llama a la API de AWS/GCP/Azure y crea un Network Load Balancer (NLB) gestionado.
- Apunta automáticamente a los NodePorts de las instancias y reporta la IP/DNS pública en `status.loadBalancer.ingress`.

**El Problema On-Premise / Bare-Metal**
- En clústeres propios con Kubeadm en VirtualBox o centros de datos, Kubernetes no tiene API cloud nativa.
- El Service de tipo LoadBalancer se queda perpetuamente en estado `EXTERNAL-IP: <pending>`.
- Se requiere un controlador externo que gestione IPs de la red local.

**MetalLB: La Solución para Bare-Metal**
- Asigna IPs reales de un pool configurado en la red local (`IPAddressPool`).
- Modo Layer 2 (ARP): Un nodo asume la IP mediante ARP respondido a la pasarela.
- Modo BGP: Los nodos se emparejan con los routers BGP de la empresa para multirruta ECMP.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Explicar cómo resolver la exposición de tipo LoadBalancer fuera de las grandes nubes públicas.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> MetalLB es la solución estándar para que un clúster on-premise se comporte exactamente igual que un clúster de AWS o Google Cloud en cuanto a la asignación de IPs externas.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué herramienta se usa en Minikube para emular un LoadBalancer externo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube ejecutamos `minikube tunnel` en una terminal separada para que los servicios LoadBalancer obtengan IP externa.

---

### <a id="diapositiva-34-ingress-controller-enrutamiento-l7-y-dominios"></a>Diapositiva #34: Ingress Controller: Enrutamiento L7 y Dominios

*Subtítulo:* **Un único punto de entrada HTTP/HTTPS para decenas de microservicios**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Ingress Resource vs Ingress Controller**
- Ingress Resource: Es solo un manifiesto YAML con reglas declarativas (Hosts, Paths y servicios de destino). No hace nada por sí mismo.
- Ingress Controller: Es una aplicación real (como Nginx, Traefik, HAProxy o Envoy) ejecutándose en el clúster que lee los recursos Ingress y configura su motor de proxy en tiempo real.

**Ahorro de Costes y Flexibilidad**
- Sin Ingress: Cada microservicio requiere su propio LoadBalancer ($15-25/mes por servicio en Cloud).
- Con Ingress: Un único LoadBalancer da servicio a 50 microservicios diferentes mediante enrutamiento basado en host (`api.empresa.com`, `app.empresa.com`).

**Capacidades Avanzadas de L7**
- Terminación centralizada de certificados TLS/SSL.
- Reescritura de rutas (URL rewriting) y redirecciones 301/302.
- Rate limiting, autenticación básica, CORS y Whitelist de IPs mediante anotaciones.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar el recurso declarativo Ingress del software activo Ingress Controller.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Muchos alumnos aplican un `ingress.yaml` y se preguntan por qué no funciona. Sin un Ingress Controller desplegado (como ingress-nginx), el recurso Ingress es ignorado por completo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué Ingress Controller es el más utilizado en la industria y cuál viene como addon en Minikube?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Nginx Ingress Controller. En Minikube se activa con `minikube addons enable ingress`.

---

### <a id="diapositiva-35-manifiesto-de-ingress-enrutamiento-por-host-y-path"></a>Diapositiva #35: Manifiesto de Ingress: Enrutamiento por Host y Path

*Subtítulo:* **Estructura estándar de la API networking.k8s.io/v1**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (ingress-rules.yaml):**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecommerce-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: tienda.local
    http:
      paths:
      - path: /productos
        pathType: Prefix
        backend:
          service:
            name: catalog-service
            port:
              number: 80
      - path: /carrito
        pathType: Prefix
        backend:
          service:
            name: cart-service
            port:
              number: 80
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar la sintaxis moderna de Ingress v1 y el enrutamiento por rutas múltiples.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El parámetro `pathType: Prefix` significa que `/productos/123` coincidirá con la regla de `catalog-service`. La anotación `rewrite-target: /` limpia la ruta antes de enviarla al pod para que la app reciba `/123` en lugar de `/productos/123`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué cambio debemos hacer en nuestro archivo `/etc/hosts` local para probar el dominio `tienda.local` en Minikube?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Añadir la línea `<minikube ip> tienda.local` a `/etc/hosts` para que el navegador resuelva el nombre.

---

### <a id="diapositiva-36-gestion-de-certificados-tls-ssl-con-cert-manager"></a>Diapositiva #36: Gestión de Certificados TLS/SSL con Cert-Manager

*Subtítulo:* **Automatización completa del ciclo de vida y renovación con Let's Encrypt**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (ingress-tls-letsencrypt.yaml):**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-secure-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - app.miempresa.com
    secretName: app-miempresa-tls  # cert-manager lo genera
  rules:
  - host: app.miempresa.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Demostrar cómo cert-manager elimina el mantenimiento manual de certificados SSL y evita caídas por expiración.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Al añadir la anotación `cert-manager.io/cluster-issuer`, el operador detecta el Ingress, genera un objeto `Certificate`, solicita el reto ACME a Let's Encrypt y cuando se aprueba, deposita el certificado en el Secret `app-miempresa-tls`. Cuando falten 30 días para caducar, cert-manager lo renovará automáticamente.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en desarrollo se recomienda usar `letsencrypt-staging` en lugar de `letsencrypt-prod`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Let's Encrypt producción tiene un 'rate limit' estricto de 5 certificados fallidos por hora por dominio.

---

### <a id="diapositiva-37-dns-interno-con-coredns-resolucion-de-nombres"></a>Diapositiva #37: DNS Interno con CoreDNS: Resolución de Nombres

*Subtítulo:* **Estructura jerárquica de nombres FQDN dentro del clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Estructura del FQDN de un Servicio**
- Formato completo: `<servicio>.<namespace>.svc.cluster.local`.
- Mismo Namespace: Basta con llamar a `http://backend`.
- Distinto Namespace: Llamar a `http://backend.produccion`.
- Cross-cluster o externo: `backend.produccion.svc.cluster.local`.

**Resolución de Pods Individuales**
- Por defecto, los Pods no tienen nombre DNS propio (salvo en StatefulSets).
- Formato por IP: `<ip-con-guiones>.<namespace>.pod.cluster.local`.
- Ejemplo: IP `10.244.1.15` en default -> `10-244-1-15.default.pod.cluster.local`.

**Arquitectura de CoreDNS**
- Se ejecuta como Deployment de 2 réplicas en el namespace `kube-system`.
- Expuesto mediante un Service ClusterIP fijo (habitualmente la IP .10 del rango de servicios, ej: `10.96.0.10`).
- Configurado mediante el ConfigMap `coredns` en `kube-system`.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a formular peticiones de red entre servicios de distintos namespaces usando la nomenclatura DNS oficial.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> CoreDNS intercepta todas las peticiones DNS que terminan en `.cluster.local`. Si la petición es para un dominio externo (como `google.com`), CoreDNS la reenvía a los servidores DNS configurados en el `/etc/resolv.conf` del host del nodo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos comprobar si CoreDNS está funcionando correctamente desde dentro de un Pod?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Lanzar un pod de debug: `kubectl run curl --image=curlimages/curl -it --rm -- nslookup kubernetes.default`.

---

### <a id="diapositiva-38-el-problema-oculto-de-ndots-5-en-resolv-conf"></a>Diapositiva #38: El Problema Oculto de ndots:5 en resolv.conf

*Subtítulo:* **Por qué una petición a una API externa puede lanzar 4 consultas DNS inútiles**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El archivo /etc/resolv.conf del Pod**
- nameserver 10.96.0.10
- search default.svc.cluster.local svc.cluster.local cluster.local
- options ndots:5
- Significado de ndots:5: Si el nombre consultado tiene MENOS de 5 puntos, el resolver de Linux probará primero la lista de búsqueda (search domains).

**La Cascada de Peticiones Inútiles**
- Petición a `api.github.com` (tiene solo 2 puntos):
- 1. Consulta: `api.github.com.default.svc.cluster.local` (NXDOMAIN)
- 2. Consulta: `api.github.com.svc.cluster.local` (NXDOMAIN)
- 3. Consulta: `api.github.com.cluster.local` (NXDOMAIN)
- 4. Consulta final: `api.github.com.` (Éxito tras 3 fallos y 20-50ms de latencia).

**Optimizaciones en Producción**
- Opción 1: Añadir punto final en las URLs de apps externas: `api.github.com.` (evita la búsqueda).
- Opción 2: Configurar `dnsConfig.options: [{name: 'ndots', value: '2'}]` en el Pod.
- Opción 3: Activar el plugin `autopath` o NodeLocal DNSCache en clústeres masivos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Explicar uno de los problemas de rendimiento más sutiles y dañinos en Kubernetes de producción.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En microservicios con miles de peticiones salientes por segundo a APIs de terceros, `ndots:5` cuadruplica la carga de CoreDNS y satura los límites de conexión de Linux (conntrack table). Conocer este comportamiento es una marca de administrador experto.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos puntos tiene un dominio como `mi-bd.postgres.database.azure.com`? (4 puntos: ¡sigue cayendo en la trampa de ndots:5!)"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Inspeccionar el resolv.conf de un pod ejecutando: `kubectl exec -it <pod> -- cat /etc/resolv.conf`.

---

## Módulo 4: Administración de Almacenamiento y Persistencia

### <a id="diapositiva-39-almacenamiento-y-persistencia"></a>Diapositiva #39: Almacenamiento y Persistencia

*Subtítulo:* **CSI, StorageClass, PV, PVC, NFS y Políticas de Retención**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Introducir los mecanismos de persistencia desacoplada en Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Los contenedores están diseñados para ser efímeros. Si un contenedor se reinicia, su capa de lectura/escritura (overlayfs) se destruye. Para bases de datos o ficheros subidos por usuarios se requiere una infraestructura de almacenamiento persistente independiente del ciclo de vida del nodo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre con los datos de un Pod si este muere y se reinicia en el mismo nodo usando solo su almacenamiento interno?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube disponemos de la StorageClass `standard` por defecto, pero configuraremos un provisionador NFS para simular un entorno on-premise.

---

### <a id="diapositiva-40-el-reto-del-almacenamiento-en-contenedores"></a>Diapositiva #40: El Reto del Almacenamiento en Contenedores

*Subtítulo:* **Tipos de volúmenes básicos y sus limitaciones en producción**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**emptyDir (Almacenamiento Temporal)**
- Se crea vacío al asignar el Pod al nodo; sobrevive a reinicios de contenedores.
- Peligro: Se destruye permanentemente si el Pod se elimina o se migra de nodo.
- Uso ideal: Caché de disco rápida, memoria compartida (`medium: Memory`) o traspaso InitContainer.

**hostPath (Directorio del Host)**
- Monta un fichero o directorio de la máquina virtual del host dentro del Pod.
- Riesgo de seguridad: el contenedor accede al sistema de archivos del host (`/var/log`, `/etc`).
- Limitación: Si el Pod se reprograma en otro nodo, pierde el acceso a esos datos.
- Uso legítimo: Únicamente agentes de infraestructura (DaemonSets como cAdvisor o Fluentd).

**Volúmenes de Red Persistentes**
- Almacenamiento desacoplado físicamente del ciclo de vida de los nodos computacionales.
- Protocolos de red empresariales: NFS, iSCSI, Ceph, GlusterFS.
- Proveedores Cloud: AWS EBS/EFS, GCP Persistent Disk/Filestore, Azure Disk/Files.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar los volúmenes efímeros de host frente al almacenamiento persistente desacoplado.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Nunca se debe usar `hostPath` para bases de datos en producción. Si el nodo 1 falla por hardware, el scheduler moverá el Pod al nodo 2, y la base de datos arrancará completamente vacía provocando una catástrofe.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué `emptyDir` con `medium: Memory` es tan útil para procesos que necesitan alta velocidad de escritura temporal?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Crea un sistema de archivos `tmpfs` en RAM, consumiendo memoria del límite del Pod pero con latencia de nanosegundos.

---

### <a id="diapositiva-41-arquitectura-csi-container-storage-interface"></a>Diapositiva #41: Arquitectura CSI (Container Storage Interface)

*Subtítulo:* **El estándar abierto que desacopló los drivers de almacenamiento del core de K8s**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Evolución de CSI**
- Antiguamente (In-Tree): Los drivers de AWS EBS, Ceph o NFS estaban compilados dentro del código binario de Kubernetes. Actualizar un driver requería actualizar todo Kubernetes.
- CSI Moderno (Out-of-Tree): Los fabricantes implementan controladores gRPC independientes que se despliegan como Pods en el clúster.
- Separación de responsabilidades: El desarrollador solicita capacidad mediante un PVC; el CSI Driver habla con la cabina de discos o API cloud y crea el LUN/volumen.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la arquitectura moderna de Container Storage Interface (CSI) y el desacoplamiento de drivers.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> CSI define tres llamadas RPC estándar: `CreateVolume/DeleteVolume` (Controller Plugin), `ControllerPublishVolume/Attach` (unión a la VM) y `NodeStageVolume/NodePublishVolume/Mount` (formateo ext4/xfs y montaje en el directorio del contenedor por Kubelet).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Quién es el responsable de formatear el disco con ext4 o XFS cuando se crea un volumen nuevo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El Node Plugin del CSI Driver ejecutándose en el nodo worker antes de que Kubelet monte el volumen en el Pod.

---

### <a id="diapositiva-42-modos-de-acceso-a-volumenes-accessmodes"></a>Diapositiva #42: Modos de Acceso a Volúmenes (AccessModes)

*Subtítulo:* **Compatibilidad entre almacenamiento de bloque y almacenamiento de archivos**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**ReadWriteOnce (RWO)**
- El volumen puede ser montado como lectura/escritura por UN SOLO NODO.
- Típico de almacenamiento en bloque (AWS EBS, GCP Persistent Disk, Azure Disk, iSCSI).
- Múltiples Pods pueden escribir si y solo si residen en el MISMO nodo.

**ReadOnlyMany (ROX)**
- El volumen puede ser montado como solo lectura por MUCHOS NODOS a la vez.
- Ideal para catálogos de imágenes estáticas, diccionarios de machine learning o datasets de referencia compartidos.

**ReadWriteMany (RWX)**
- El volumen puede ser montado como lectura/escritura simultánea por MUCHOS NODOS.
- Requiere sistemas de archivos de red (NFS, AWS EFS, Azure Files, CephFS, GlusterFS).
- Ideal para CMS (Wordpress subidas de medios), servidores web compartidos o clusters de procesamiento.

**ReadWriteOncePod (RWOP)**
- Introducido en K8s 1.22 (GA en 1.29).
- Restringe el acceso de lectura/escritura a un ÚNICO POD en todo el clúster.
- Evita corrupciones cuando dos Pods en el mismo nodo intentan escribir en la misma base de datos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Dominar la matriz de compatibilidad de AccessModes para no solicitar modos que la infraestructura no soporta.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Un error habitual es pedir `ReadWriteMany` sobre una StorageClass de discos de bloque (como EBS gp3). El PVC se quedará perpetuamente en estado `Pending` porque un disco de bloque no puede ser montado simultáneamente por dos hipervisores distintos sin corromper el filesystem.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Si tenemos un Deployment con 5 réplicas que necesitan escribir en el mismo disco, qué AccessMode necesitamos obligatoriamente?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: ReadWriteMany (RWX), lo que exige un almacenamiento basado en NFS o sistema de archivos distribuido.

---

### <a id="diapositiva-43-pv-y-pvc-la-abstraccion-del-almacenamiento"></a>Diapositiva #43: PV y PVC: La Abstracción del Almacenamiento

*Subtítulo:* **Separación nítida de roles entre el Administrador y el Desarrollador**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**PersistentVolume (PV) - Rol Administrador**
- Recurso a nivel de clúster (no pertenece a ningún namespace).
- Representa una porción real de almacenamiento físico (ej: un disco de 100GB en la SAN o una exportación NFS).
- Detalla la tecnología de almacenamiento, capacidad, modos de acceso y política de reciclaje.

**PersistentVolumeClaim (PVC) - Rol Desarrollador**
- Recurso dentro de un Namespace específico.
- Es una petición de almacenamiento: 'Necesito 10GB con modo RWO'.
- El desarrollador no necesita saber si el disco es un SSD de AWS, un LUN de NetApp o un servidor NFS.

**El Proceso de Binding (Vinculación)**
- El PersistentVolumeController busca continuamente un PV que satisfaga la petición del PVC (capacidad igual o mayor y mismo accessMode).
- Cuando lo encuentra, los une en una relación 1 a 1 exclusiva (`Status: Bound`).
- Ningún otro PVC puede vincularse a ese PV.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la analogía entre Pod/Node y PVC/PV.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Así como un Pod solicita CPU/memoria y el Scheduler le asigna un Nodo, un PVC solicita tamaño/acceso y el PVController le asigna un PV. Esta abstracción permite la portabilidad de las aplicaciones entre nubes y centros de datos propios.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si un PVC solicita 10GB y el único PV disponible tiene 50GB?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El PVC se vinculará al PV de 50GB, pero se desperdiciarán los 40GB restantes porque el PV no se puede fraccionar.

---

### <a id="diapositiva-44-politicas-de-retencion-de-volumenes"></a>Diapositiva #44: Políticas de Retención de Volúmenes

*Subtítulo:* **persistentVolumeReclaimPolicy: Retain vs Delete en producción**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Retain (Retener)** (Máxima Seguridad (Producción))
- Al borrar el PVC, el PV pasa a estado `Released` (Liberado).
- Los datos físicos en el disco o NFS permanecen intactos.
- El PV NO se asigna automáticamente a otro usuario (contiene datos residuales).
- El administrador debe limpiar manualmente los datos o recuperar el volumen si fue un borrado accidental.
- Política obligatoria para bases de datos críticas y producción.

**Opción B: Delete (Eliminar)** (Automatización / Limpieza)
- Al borrar el PVC, el PV asociado se elimina automáticamente de Kubernetes.
- El CSI Driver invoca la API y BORRA el disco físico o carpeta en la infraestructura de almacenamiento.
- Los datos se destruyen de forma irrecuperable de forma automática.
- Por defecto en la mayoría de StorageClasses dinámicas de Cloud.
- Ideal para entornos efímeros de testing, CI/CD o desarrollo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Sensibilizar sobre el riesgo de pérdida irreversible de datos si se utiliza la política `Delete` en producción.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En una StorageClass con `reclaimPolicy: Delete`, si un desarrollador ejecuta por error `kubectl delete pvc mi-bd-data`, el disco de EBS o Persistent Disk de Google Cloud se destruirá en segundos. En producción corporativa siempre se debe sobreescribir a `Retain`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos reutilizar un PV que se ha quedado en estado `Released` tras borrar su PVC?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Editar el PV y eliminar la sección `spec.claimRef` para que vuelva a estar en estado `Available`.

---

### <a id="diapositiva-45-storageclass-el-motor-de-aprovisionamiento-dinamico"></a>Diapositiva #45: StorageClass: El Motor de Aprovisionamiento Dinámico

*Subtítulo:* **Eliminar el aprovisionamiento manual mediante 'clases' de almacenamiento**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Aprovisionamiento Estático vs Dinámico**
- Estático (Antiguo): El admin debía crear previamente 20 PVs a mano. Si los desarrolladores pedían un tamaño no disponible, se bloqueaban.
- Dinámico (Moderno): El desarrollador crea el PVC referenciando una StorageClass. El CSI Driver crea el disco físico 'on-demand' en milisegundos.

**volumeBindingMode**
- Immediate (Por defecto): Crea el disco físico en cuanto se crea el PVC. Peligro en Cloud: el disco puede crearse en la Zona A (AZ-a) y el Pod ser programado en la Zona B (AZ-b), fallando el montaje.
- WaitForFirstConsumer (Recomendado): Pospone la creación del disco hasta que un Pod usa el PVC. El Scheduler elige primero el nodo y el disco se crea en la misma zona.

**allowVolumeExpansion**
- Permite redimensionar volúmenes hacia arriba simplemente editando el campo `spec.resources.requests.storage` del PVC.
- El CSI redimensiona el volumen físico y el sistema de archivos sin desmontar el disco.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la importancia crítica de `volumeBindingMode: WaitForFirstConsumer` en arquitecturas multi-zona.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En AWS o GCP, un disco de bloque EBS solo puede conectarse a instancias EC2 de su misma Availability Zone (ej. us-east-1a). Con `Immediate`, si el disco se crea en 1a pero el Pod aterriza en 1b, el Pod se quedará atascado en `ContainerCreating` con error `FailedAttachVolume`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si intentamos reducir el tamaño de un PVC de 20Gi a 10Gi?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Kubernetes prohíbe la reducción de volúmenes; la API rechazará el cambio porque reducir un filesystem ext4/xfs suele causar corrupción de datos.

---

### <a id="diapositiva-46-storageclass-en-cloud-y-on-premise-con-nfs"></a>Diapositiva #46: StorageClass en Cloud y On-Premise con NFS

*Subtítulo:* **Configuración para servidores de archivos NFS corporativos**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (storageclass-nfs.yaml):**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-client
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: k8s-sigs.io/nfs-subdir-external-provisioner
parameters:
  archiveOnDelete: "true" # Preserva carpeta con prefijo 'archived-'
reclaimPolicy: Retain
volumeBindingMode: Immediate
allowVolumeExpansion: true
mountOptions:
  - hard
  - nfsvers=4.1
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a definir una StorageClass para entornos On-Premise utilizando NFS como almacenamiento compartido.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Al marcar la anotación `is-default-class: 'true'`, cualquier PVC que no especifique `storageClassName` utilizará automáticamente esta clase NFS. El provisionador de subdirectorios creará una carpeta única en el servidor NFS para cada PVC.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en NFS es seguro utilizar `volumeBindingMode: Immediate` a diferencia de los discos de bloque en Cloud?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque NFS es un recurso de red accesible desde cualquier nodo del clúster; no está atado a una zona de disponibilidad física.

---

### <a id="diapositiva-47-manifiesto-de-pvc-y-consumo-en-el-pod"></a>Diapositiva #47: Manifiesto de PVC y Consumo en el Pod

*Subtítulo:* **El enlace declarativo entre la petición de cuota y el punto de montaje**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (pvc-and-pod.yaml):**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: nfs-client
  resources:
    requests:
      storage: 10Gi
---
apiVersion: v1
kind: Pod
metadata:
  name: web-app
spec:
  containers:
  - name: app
    image: nginx:alpine
    volumeMounts:
    - name: persistent-storage
      mountPath: /usr/share/nginx/html
  volumes:
  - name: persistent-storage
    persistentVolumeClaim:
      claimName: app-data-pvc
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Ver en un solo archivo la relación entre la solicitud de almacenamiento (PVC) y su montaje en un Pod.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El contenedor solo ve un directorio local estándar (`/usr/share/nginx/html`). Es el Kubelet el que se encarga de que ese directorio apunte al volumen persistente de red.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si dos Pods distintos montan el mismo PVC RWO en dos nodos diferentes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El segundo Pod fallará al arrancar con un error `Multi-Attach error for volume`.

---

### <a id="diapositiva-48-expansion-dinamica-y-volumesnapshots"></a>Diapositiva #48: Expansión Dinámica y VolumeSnapshots

*Subtítulo:* **Operaciones de mantenimiento de almacenamiento sin interrupción de servicio**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Expansión de Volúmenes en Caliente**
- Paso 1: Modificar el PVC: `kubectl edit pvc <nombre>` y cambiar `storage: 10Gi` a `20Gi`.
- Paso 2: El CSI Driver expande el disco físico en la cabina o nube.
- Paso 3: Kubelet expande el sistema de archivos (`resize2fs` para ext4 o `xfs_growfs` para xfs) mientras el Pod sigue en ejecución.

**VolumeSnapshots (Copias Puntuales)**
- Recurso CRD estandarizado en K8s para tomar instantáneas a nivel de bloque.
- Componentes: `VolumeSnapshotClass` (driver del snapshot), `VolumeSnapshot` (petición de snapshot) y `VolumeSnapshotContent` (el snapshot real).
- Permite clonar entornos de staging o restaurar tras un fallo de datos.

**Restauración a partir de un Snapshot**
- Se crea un nuevo PVC especificando `spec.dataSource`:
- `dataSource: { name: 'mi-snapshot', kind: 'VolumeSnapshot', apiGroup: 'snapshot.storage.k8s.io' }`.
- Kubernetes aprovisiona un nuevo disco con los datos exactos del momento de la instantánea.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a redimensionar volúmenes en producción sin desmontar y a utilizar snapshots nativos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Antiguamente, redimensionar un disco requería apagar el pod, clonar los datos a otro disco y recrear todo. Hoy, gracias a CSI, basta con cambiar el número en el YAML del PVC y Kubernetes hace la expansión en caliente.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Es necesario reiniciar el Pod tras redimensionar el PVC?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En la mayoría de CSIs modernos no se requiere reinicio si el sistema de archivos soporta online-resize (como ext4 y XFS).

---

## Módulo 5: Gestión de Recursos y Programación (Scheduling)

### <a id="diapositiva-49-gestion-de-recursos-y-scheduling"></a>Diapositiva #49: Gestión de Recursos y Scheduling

*Subtítulo:* **Requests, Limits, QoS, Afinidad de Nodos/Pods y Taints/Tolerations**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar los mecanismos de asignación de recursos y las reglas avanzadas del planificador (kube-scheduler).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El planificador de Kubernetes es el motor matemático que decide dónde colocar cada carga de trabajo. Si no se configuran Requests y Limits, un solo contenedor defectuoso puede saturar toda la memoria de un nodo físico y provocar caídas en cascada.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Habéis experimentado alguna vez una caída de servicio porque una aplicación consumió el 100% de la memoria de un servidor compartido?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube podemos simular escenarios de saturación de recursos usando imágenes como `vish/stress`.

---

### <a id="diapositiva-50-el-problema-del-vecino-ruidoso-noisy-neighbor"></a>Diapositiva #50: El Problema del 'Vecino Ruidoso' (Noisy Neighbor)

*Subtítulo:* **¿Qué sucede en un clúster de Kubernetes si no se definen límites?**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Contención de CPU**
- Un proceso descontrolado con un bucle infinito (while true) consumirá el 100% de los cores del nodo.
- Los demás contenedores en el mismo host experimentarán retrasos masivos (latencia en peticiones HTTP).
- La CPU es un recurso compresible: los procesos se ralentizan pero no mueren.

**Agotamiento de Memoria (RAM)**
- La memoria es un recurso incompresible: no se puede 'ralentizar' la asignación de RAM.
- Si los contenedores consumen toda la RAM física y la swap está desactivada, el kernel de Linux activa el OOM Killer.
- El kernel matará procesos arbitrarios para evitar el bloqueo del sistema operativo.

**Decisiones a Ciegas del Scheduler**
- Sin `requests`, el Scheduler asume que un Pod consume 0 CPU y 0 Memoria.
- Programará 200 Pods en el mismo nodo hasta colapsar el host, mientras otros nodos del clúster permanecen totalmente vacíos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Sensibilizar sobre el peligro inminente de desplegar cargas sin `requests` y `limits`.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En Kubernetes, configurar `requests` no es opcional: es el dato que utiliza el Scheduler para calcular la capacidad disponible en cada nodo. Si no hay requests, el Scheduler está 'ciego'.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Es preferible que una aplicación sufra estrangulamiento de CPU (throttling) o que muera por OOMKilled?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El throttling causa lentitud; el OOMKilled causa reinicio inmediato con código de salida 137.

---

### <a id="diapositiva-51-requests-vs-limits-a-nivel-de-kernel"></a>Diapositiva #51: Requests vs Limits a Nivel de Kernel

*Subtítulo:* **Diferencias fundamentales entre reserva para el Scheduler y tope de cgroups**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Requests (Garantía)** (Para el Planificador (Scheduling))
- Cantidad mínima de CPU y Memoria que el Pod tiene garantizada para arrancar.
- Utilizado exclusivamente por el `kube-scheduler` para decidir en qué nodo cabe el Pod.
- Suma de requests de los Pods en un nodo nunca puede superar la capacidad física del nodo.
- Mapeo en el kernel de Linux: `cpu.shares` (prioridad relativa en el planificador CFS).
- Regla de oro: Configurar siempre requests basados en el consumo real medido en producción.

**Opción B: Limits (Tope Máximo)** (Para el Host (Enforcement))
- Cantidad máxima absoluta de recursos que el contenedor tiene permitido consumir.
- CPU Limit: Implementado con `cpu.cfs_quota_us` de Linux. Si se supera, el kernel aplica Throttling.
- Memory Limit: Implementado con `memory.limit_in_bytes`. Si se supera, el kernel ejecuta OOMKilled (Exit Code 137).
- Previene que una fuga de memoria hunda el nodo físico.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Desmitificar el funcionamiento técnico de requests y limits en el kernel de Linux.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> La CPU se mide en unidades millicores (1000m = 1 vCPU). La memoria se mide en bytes o mebibytes (Mi = 1024^2, M = 1000^2). Cuando un contenedor alcanza su límite de CPU, no se reinicia; simplemente sus ciclos de reloj se pausan durante periodos de 100ms.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en muchas arquitecturas modernas de microservicios se recomienda fijar memory limit pero NO fijar cpu limit?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque el CPU Throttling puede provocar degradaciones severas e invisibles de latencia (colas de microsegundos) incluso cuando el nodo tiene CPU ociosa.

---

### <a id="diapositiva-52-clases-de-calidad-de-servicio-qos-classes"></a>Diapositiva #52: Clases de Calidad de Servicio (QoS Classes)

*Subtítulo:* **Cómo prioriza Kubernetes qué Pods matar cuando un nodo entra en presión de memoria**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Guaranteed (Prioridad Máxima)**
- Condición: Todos los contenedores tienen `requests == limits` tanto en CPU como en Memoria.
- Garantía absoluta: Son los ÚLTIMOS en ser purgados en caso de escasez de recursos en el nodo.
- Puntuación oom_score_adj: -997 (casi inmunes al OOM Killer de Linux).
- Uso: Bases de datos críticas, colas de mensajería y servicios core.

**Burstable (Prioridad Media)**
- Condición: Tienen `requests` definidos, y `requests < limits` (o solo tienen requests pero no limits).
- Pueden consumir recursos ociosos del nodo hasta alcanzar su límite.
- Puntuación oom_score_adj: Proporcional a la memoria consumida por encima de su request.
- Uso: El 90% de los microservicios web y APIs convencionales.

**BestEffort (Prioridad Mínima)**
- Condición: No tienen definido NINGÚN request ni limit.
- Son los PRIMEROS en ser purgados (eviction inmediata) ante la menor presión de memoria en el nodo.
- Puntuación oom_score_adj: 1000 (máxima prioridad para el OOM Killer).
- Uso: Tareas batch prescindibles o entornos de desarrollo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Entender el ranking de desalojo de Pods y cómo la configuración de recursos asigna automáticamente la clase de QoS.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> La clase de QoS no se escribe manualmente en el YAML: Kubernetes la calcula automáticamente inspeccionando los valores de requests y limits. Conocer las clases de QoS es vital para garantizar que las bases de datos no mueran antes que los frontends en un incidente de memoria.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué clase de QoS recibirá un Pod que especifica `cpu requests: 100m` pero ningún valor para memoria?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Recibirá `Burstable` (porque al menos un recurso tiene request definido).

---

### <a id="diapositiva-53-manifiesto-de-recursos-y-politicas-de-cuota"></a>Diapositiva #53: Manifiesto de Recursos y Políticas de Cuota

*Subtítulo:* **Definición en el Pod y gobernanza de clúster con LimitRange y ResourceQuota**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (resources-and-quotas.yaml):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: backend-api
spec:
  containers:
  - name: api
    image: myapi:1.0
    resources:
      requests:
        cpu: "250m"       # 0.25 vCPU reservada
        memory: "256Mi"   # 256 MiB garantizados
      limits:
        cpu: "1000m"      # 1 vCPU tope (throttling)
        memory: "512Mi"   # 512 MiB tope (OOMKilled)
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: desarrollo
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    pods: "20"
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a definir recursos en Pods y a proteger el clúster mediante LimitRanges y ResourceQuotas.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Si un administrador define un `ResourceQuota` en un namespace, Kubernetes EXIGIRÁ que absolutamente todos los Pods desplegados en ese namespace tengan requests y limits explícitos; de lo contrario, rechazará el despliegue con un error.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué herramienta nos ayuda si no sabemos qué requests ponerle a una aplicación nueva?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Vertical Pod Autoscaler (VPA) en modo 'Off' (solo recomendaciones) o herramientas de observabilidad como Prometheus.

---

### <a id="diapositiva-54-seleccion-basica-de-nodos-nodeselector"></a>Diapositiva #54: Selección Básica de Nodos: nodeSelector

*Subtítulo:* **El método más simple para dirigir Pods hacia máquinas específicas**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Etiquetado de Nodos Físicos**
- Los nodos del clúster pueden recibir etiquetas clave-valor arbitrarias.
- Comando: `kubectl label nodes <nombre-nodo> disktype=ssd hardware=gpu`.
- Inspeccionar etiquetas existentes: `kubectl get nodes --show-labels`.

**Sintaxis de nodeSelector en el Pod**
- Se añade en `spec.nodeSelector: { disktype: 'ssd' }`.
- El Scheduler solo considerará nodos que tengan exactamente esas etiquetas con esos valores.
- Si ningún nodo coincide, el Pod permanece en estado `Pending` indefinidamente.

**Limitaciones de nodeSelector**
- Solo admite coincidencia exacta (AND estricto).
- No permite operadores lógicos complejos (OR, NOT, IN, Exists, >).
- No permite preferencias suaves ('intenta ponerlo aquí, pero si no cabe, ponlo en otro sitio').
- Para requisitos avanzados se utiliza Node Affinity.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Conocer el mecanismo más directo de fijación de Pods a nodos y sus limitaciones de expresividad.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> nodeSelector es ideal para particiones simples (ej: `environment: prod` o `tier: frontend`), pero para arquitecturas complejas con alta disponibilidad entre zonas se queda muy corto.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre con los Pods que ya estaban corriendo en un nodo si le quitamos la etiqueta que exigía su nodeSelector?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Los Pods existentes NO se mueven; nodeSelector solo se evalúa en el momento del scheduling inicial.

---

### <a id="diapositiva-55-afinidad-de-nodos-node-affinity"></a>Diapositiva #55: Afinidad de Nodos (Node Affinity)

*Subtítulo:* **Reglas duras (Required) y blandas (Preferred) con operadores booleanos**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (node-affinity.yaml):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: analytics-worker
spec:
  affinity:
    nodeAffinity:
      # Regla DURA: Debe ser Linux y en zona europea
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: topology.kubernetes.io/zone
            operator: In
            values: ["eu-west-1a", "eu-west-1b"]
      # Regla BLANDA: Preferir disco SSD con peso 80
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 80
        preference:
          matchExpressions:
          - key: disktype
            operator: In
            values: ["ssd"]
  containers:
  - name: worker
    image: analytics:2.0
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a combinar reglas obligatorias y reglas de mejor esfuerzo mediante Node Affinity.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El planificador suma los 'pesos' (weight de 1 a 100) de todas las preferencias cumplidas para cada nodo candidato en la fase de Scoring. El nodo con la puntuación total más alta gana el Pod.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué operador usaríais si queréis que un Pod se ejecute en cualquier nodo EXCEPTO en nodos que tengan la etiqueta `mantenimiento: 'true'`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Usar el operador `NotIn: ['true']` o `DoesNotExist`.

---

### <a id="diapositiva-56-afinidad-y-anti-afinidad-de-pods-inter-pod"></a>Diapositiva #56: Afinidad y Anti-Afinidad de Pods (Inter-Pod)

*Subtítulo:* **Ubicar Pods en función de los Pods vecinos que ya están corriendo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Pod Anti-Affinity (Alta Disponibilidad)**
- Regla: 'No pongas dos réplicas de este Pod en la misma máquina física o en la misma zona'.
- Garantiza que la caída de un servidor físico o un rack no tumbe el 100% de las réplicas del servicio.
- Crucial para cumplir los acuerdos de nivel de servicio (SLA) en producción.

**Pod Affinity (Co-localización y Baja Latencia)**
- Regla: 'Pon este microservicio web en el mismo nodo físico donde ya esté corriendo la caché Redis'.
- Elimina la latencia de red entre capas comunicándose mediante loopback local o sockets de host.

**El Parámetro topologyKey**
- Define el dominio de fallo geográfico o físico.
- `topologyKey: kubernetes.io/hostname` -> A nivel de servidor individual.
- `topologyKey: topology.kubernetes.io/zone` -> A nivel de Datacenter / Zona de disponibilidad Cloud.
- Advertencia de rendimiento: Requiere cómputo intensivo en clústeres de miles de nodos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Implementar estrategias de resiliencia física evitando puntos únicos de fallo mediante Anti-Afinidad.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En un Deployment con 3 réplicas en un clúster de 3 nodos, sin anti-afinidad el Scheduler podría perfectamente colocar los 3 Pods en el Nodo 1. Si el Nodo 1 se reinicia, el servicio cae completamente. Con Pod Anti-Affinity se fuerza a que cada réplica aterrice en un nodo distinto.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si tenemos 3 réplicas con Pod Anti-Affinity HARD (required) pero nuestro clúster solo tiene 2 nodos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Dos réplicas arrancarán normalmente en los 2 nodos, y la tercera réplica se quedará atascada en `Pending`.

---

### <a id="diapositiva-57-taints-y-tolerations-repulsion-selectiva-de-nodos"></a>Diapositiva #57: Taints y Tolerations: Repulsión Selectiva de Nodos

*Subtítulo:* **Garantizar nodos dedicados para GPU, seguridad o mantenimiento**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Concepto de Taint (La Mancha en el Nodo)**
- Un Taint se aplica a un NODO para REPELER Pods que no toleren explícitamente esa condición.
- Sintaxis: `kubectl taint nodes <nodo> clave=valor:Efecto`.
- El nodo 'dice': 'Nadie entra aquí a menos que tenga una Toleration específica'.

**Los Tres Efectos de Taints**
- NoSchedule: Ningún Pod nuevo entrará si no tiene la toleration. Los Pods que ya estaban corriendo NO se expulsan.
- PreferNoSchedule: El Scheduler intentará evitar el nodo, pero si no hay otra opción, lo colocará allí.
- NoExecute: Si el Pod no tiene la toleration, es EXPULSADO inmediatamente del nodo.

**Casos de Uso Típicos**
- Control Plane dedicado: Los masters tienen el taint `node-role.kubernetes.io/control-plane:NoSchedule` para evitar que los Pods de usuario compitan con etcd.
- Nodos GPU caros: Taint `hardware=gpu:NoSchedule` para que solo cargas de IA/ML utilicen esos nodos.
- Nodos en mantenimiento o con problemas de hardware.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la diferencia entre Afinidad (atraer pods hacia nodos) y Taints (repeler pods desde los nodos).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Regla mnemotécnica: Node Affinity es el Pod diciendo 'quiero ir a ese nodo'. Taint es el Nodo diciendo 'no quiero que nadie venga aquí salvo los autorizados'.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué pudimos ejecutar Pods en el Master en Minikube pero no en Kubeadm por defecto?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque Minikube elimina el taint del control plane para permitir clústeres de un solo nodo.

---

### <a id="diapositiva-58-evicciones-de-pods-y-presion-de-nodo"></a>Diapositiva #58: Evicciones de Pods y Presión de Nodo

*Subtítulo:* **Mecanismo defensivo de Kubelet para salvar la estabilidad del sistema operativo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Umbrales de Presión de Kubelet**
- Kubelet monitoriza activamente los recursos del nodo físico.
- Umbrales críticos por defecto:
- • `memory.available < 100Mi` (Memoria agotándose)
- • `nodefs.available < 10%` (Disco raíz casi lleno)
- • `imagefs.available < 15%` (Almacenamiento de imágenes lleno)

**El Proceso de Evicción (Desalojo)**
- Cuando se supera un umbral, el nodo pasa a estado `MemoryPressure` o `DiskPressure`.
- Kubelet no admite nuevos Pods y empieza a expulsar Pods existentes.
- Orden de expulsión:
- 1º Pods de clase `BestEffort` que exceden sus peticiones.
- 2º Pods de clase `Burstable` que más memoria consumen por encima de su request.
- 3º Pods de clase `Guaranteed` (solo en caso extremo).

**Tolerations Temporales de Sistema**
- Kubernetes añade taints automáticos al nodo (`node.kubernetes.io/unreachable`).
- Los Pods tienen por defecto una tolerancia de 300 segundos (`tolerationSeconds: 300`).
- Si el nodo no se recupera en 5 minutos, el Control Plane marca los Pods como desalojados y los recrea en otros nodos sanos.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Conocer cómo actúa Kubelet antes de que el kernel de Linux colapse por falta de memoria o disco.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> La evicción de Kubelet es un proceso ordenado de gracia: intenta enviar SIGTERM y respetar el apagado limpio. El OOM Killer del kernel de Linux, por contra, es instantáneo y mata procesos con SIGKILL sin previo aviso.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué comando nos muestra si un nodo tiene activada la condición de MemoryPressure o DiskPressure?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Ejecutar `kubectl describe node <nombre>` y consultar la sección 'Conditions:'.

---

## Módulo 6: Seguridad del Clúster (Hardening)

### <a id="diapositiva-59-seguridad-del-cluster-hardening"></a>Diapositiva #59: Seguridad del Clúster (Hardening)

*Subtítulo:* **RBAC, Network Policies Zero-Trust, Security Contexts y External Secrets**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar el modelo de seguridad integral de Kubernetes cubriendo identidad, red y tiempo de ejecución.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Por defecto, Kubernetes es 'inseguro por diseño' para facilitar el arranque: cualquier Pod puede hablar con cualquier otro, los contenedores corren como root y los Secrets solo están codificados en base64. En este módulo aprenderemos a blindar un clúster para producción corporativa.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos habéis auditado un clúster de Kubernetes con herramientas como Trivy, Kubescape o CIS Benchmark?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Para que las NetworkPolicies funcionen en el laboratorio, Minikube debe arrancarse con un CNI compatible como Calico (`minikube start --cni=calico`).

---

### <a id="diapositiva-60-el-modelo-de-defensa-en-profundidad"></a>Diapositiva #60: El Modelo de Defensa en Profundidad

*Subtítulo:* **Ninguna capa de seguridad es suficiente por sí sola**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Las 4 'C's de la Seguridad Cloud Native**
- Cloud / Data Center: Seguridad física del hardware, redes perimetrales e IAM de la nube.
- Cluster: Control de acceso a la API (RBAC), auditoría y aislamiento de red interna (NetworkPolicies).
- Container: Imágenes firmadas libres de vulnerabilidades (CVEs), no-root y capacidades de Linux mínimas.
- Code: Seguridad en el código fuente, dependencias actualizadas y comunicaciones TLS internas.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Enseñar a pensar en seguridad multicapa: si un atacante compromete un contenedor web, no debe poder escalar al host ni pivotar por la red hacia la base de datos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El modelo Zero-Trust asume que el perímetro ya ha sido vulnerado. Incluso dentro de la misma VPC y del mismo clúster, ningún servicio debe confiar en otro sin autenticación y políticas explícitas.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Si un atacante consigue ejecución remota de código (RCE) en un Pod de frontend, qué medidas evitan que robe la base de datos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Las NetworkPolicies evitan que la red llegue a la BD, y un SecurityContext no-root evita que el atacante instale herramientas de escaneo en el contenedor.

---

### <a id="diapositiva-61-autenticacion-en-kubernetes-usuarios-y-serviceaccounts"></a>Diapositiva #61: Autenticación en Kubernetes: Usuarios y ServiceAccounts

*Subtítulo:* **¿Quién eres? La primera puerta de entrada a la API**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Usuarios Humanos (Users)**
- Kubernetes NO tiene una base de datos de usuarios en etcd (no existe `kubectl get users`).
- La identidad se delega externamente:
- • Certificados X.509 cliente: El Common Name (CN) es el usuario y Organization (O) son sus grupos.
- • Proveedores OIDC / IAM corporativos: Google Workspace, Azure AD, Okta, Keycloak.

**Cuentas de Servicio (ServiceAccounts)**
- Gestionadas nativamente dentro de Kubernetes (recurso en namespace).
- Identidad para procesos y aplicaciones que corren dentro de los Pods.
- Montan automáticamente un Token JWT firmado por la API en `/var/run/secrets/kubernetes.io/serviceaccount/token`.
- Token proyectado temporal (K8s 1.24+): expira y se rota automáticamente.

**Buenas Prácticas de ServiceAccount**
- Nunca usar la ServiceAccount `default` para aplicaciones críticas.
- Crear una ServiceAccount dedicada por cada aplicación (`serviceAccountName: mi-app`).
- Desactivar el automount del token si la app no necesita hablar con el API de K8s: `automountServiceAccountToken: false`.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la diferencia crucial entre identidades humanas y ServiceAccounts de aplicaciones.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En K8s 1.24+, los secretos estáticos de ServiceAccount ya no se crean automáticamente por defecto. Se utiliza la API `TokenRequest` para proyectar un token JWT efímero con tiempo de expiración (por defecto 1 hora), rotado automáticamente por Kubelet.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué es una mala práctica dejar `automountServiceAccountToken: true` en aplicaciones que no usan la API de Kubernetes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Si un atacante compromete la app, encuentra inmediatamente en el filesystem un token JWT válido para consultar el API Server.

---

### <a id="diapositiva-62-rbac-sujetos-reglas-y-vinculaciones"></a>Diapositiva #62: RBAC: Sujetos, Reglas y Vinculaciones

*Subtítulo:* **Control de acceso basado en roles con el principio de mínimo privilegio**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Sujetos (Subjects)**
- ¿Quién solicita el acceso?
- • User: Un usuario humano autenticado.
- • Group: Un grupo corporativo (ej: `developers`).
- • ServiceAccount: Un proceso dentro del clúster.

**2. Reglas (Rules / API Groups / Verbs)**
- ¿Qué acción tiene permitida?
- • apiGroups: '' (core), 'apps', 'batch', 'networking.k8s.io'.
- • resources: 'pods', 'services', 'deployments', 'secrets'.
- • verbs: 'get', 'list', 'watch', 'create', 'update', 'delete'.

**3. Vinculaciones (Bindings)**
- El pegamento que une al Sujeto con el Rol.
- `RoleBinding`: Concede los permisos dentro de un Namespace específico.
- `ClusterRoleBinding`: Concede los permisos en TODO el clúster.

**Principio de Mínimo Privilegio**
- Por defecto, NINGÚN usuario ni ServiceAccount tiene permisos (Deny por defecto).
- Evitar siempre el uso de comodines peligrosos: `verbs: ['*']` o `resources: ['*']`.
- Separar estrictamente permisos de lectura (`get, list`) de permisos de mutación.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender el modelo mental de RBAC: Subject + Role + Binding.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> RBAC es aditivo (whitelist pura): no existen reglas de 'Deny'. Si ninguna regla autoriza explícitamente la acción solicitada para ese sujeto en ese namespace, la petición es denegada con un HTTP 403 Forbidden.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué conceder permiso `create` sobre `pods` puede permitir indirectamente escalar a permisos de root en el host físico?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Un usuario que puede crear pods puede crear un pod con `privileged: true` y `hostPID: true`, escapando al host.

---

### <a id="diapositiva-63-roles-vs-clusterroles-y-sus-bindings"></a>Diapositiva #63: Roles vs ClusterRoles y sus Bindings

*Subtítulo:* **Ámbito de espacio de nombres frente a ámbito global de clúster**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: Role & RoleBinding** (Ámbito de Namespace (Aislado))
- Definido estrictamente dentro de un Namespace (`metadata.namespace`).
- Solo permite gobernar recursos que pertenecen a un namespace (Pods, Services, Deployments, PVCs).
- Un `RoleBinding` solo concede acceso dentro de ese namespace.
- TRUCO AVANZADO: Se puede vincular un `ClusterRole` genérico (ej. `view`) mediante un `RoleBinding` para limitar sus efectos a un único namespace sin duplicar roles.
- El estándar recomendado para equipos de desarrollo multi-tenant.

**Opción B: ClusterRole & ClusterRoleBinding** (Ámbito de Clúster (Global))
- Recurso no namespaced a nivel de todo el clúster.
- Obligatorio para gobernar recursos no-namespaced (Nodes, PersistentVolumes, StorageClasses, Namespaces).
- Obligatorio para acceder a endpoints no pertenecientes a recursos (ej: `/healthz`, `/metrics`).
- Un `ClusterRoleBinding` concede esos permisos en absolutamente TODOS los namespaces presentes y futuros del clúster.
- Reservado exclusivamente para administradores de plataforma y operadores globales.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Dominar la diferencia entre ámbitos de Namespace y clúster global en RBAC.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Un patrón excelente de diseño es crear ClusterRoles reutilizables (como `developer-read-only`) y luego asociarlos en cada namespace mediante `RoleBinding` a los desarrolladores de cada equipo. Esto ahorra tener que definir 50 Roles idénticos en 50 namespaces.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ocurre si vinculamos un ClusterRole mediante un RoleBinding en el namespace 'staging'?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El usuario tendrá esos permisos ÚNICAMENTE dentro del namespace 'staging', no en el resto del clúster.

---

### <a id="diapositiva-64-manifiesto-rbac-en-la-practica-de-la-regla-al-binding"></a>Diapositiva #64: Manifiesto RBAC en la Práctica: De la Regla al Binding

*Subtítulo:* **Definición de rol de solo lectura de logs y su vinculación a un desarrollador**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (rbac-log-reader.yaml):**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: produccion
  name: pod-and-log-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods/log"]        # Sub-recurso para ver logs
  verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: produccion
  name: developer-log-access
subjects:
- kind: User
  name: ana.garcia@empresa.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-and-log-reader
  apiGroup: rbac.authorization.k8s.io
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar la sintaxis exacta de un Role y un RoleBinding incluyendo sub-recursos como `pods/log`.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Nótese el sub-recurso `pods/log`. En Kubernetes, los logs no son un campo del Pod, sino un sub-recurso de la API REST. Un usuario puede tener permiso para ver la lista de pods (`get pods`) pero no tener permiso para ver los logs confidenciales (`pods/log`).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo concederíamos permiso para entrar a una shell interactiva con `kubectl exec`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Respuesta: Añadir `pods/exec` con el verbo `create`.

---

### <a id="diapositiva-65-auditoria-de-permisos-con-kubectl-auth-can-i"></a>Diapositiva #65: Auditoría de Permisos con kubectl auth can-i

*Subtítulo:* **Verificación proactiva de permisos sin ejecutar acciones destructivas**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Consulta Básica de Permisos**
- `kubectl auth can-i create deployments` -> Devuelve `yes` o `no`.
- `kubectl auth can-i delete pods -n produccion`
- Comprueba si el usuario actual tiene autorización para esa acción según las reglas RBAC activas.

**Impersonación (Suplantación para Pruebas)**
- Los administradores pueden comprobar qué puede hacer otro usuario:
- `kubectl auth can-i get secrets --as ana.garcia@empresa.com -n produccion`.
- Permite verificar que las restricciones RBAC funcionan antes de entregar los accesos al equipo.

**Matriz Completa de Privilegios**
- `kubectl auth can-i --list -n produccion`
- Vuelca una tabla completa con todos los API groups, recursos y verbos que el usuario tiene concedidos en ese namespace.
- Esencial para auditorías de cumplimiento y certificaciones de seguridad.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a usar la herramienta más potente de auditoría y validación de RBAC incluida en kubectl.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> `kubectl auth can-i` utiliza por debajo la API `SelfSubjectAccessReview` o `SubjectAccessReview`. Envía una consulta formal al API Server pidiendo que evalúe la matriz RBAC sin llegar a ejecutar la acción.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Quién puede usar la flag `--as` para suplantar a otro usuario?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Solo usuarios o ServiceAccounts que tengan concedido el verbo `impersonate` en recursos `users` o `serviceaccounts`.

---

### <a id="diapositiva-66-network-policies-implementacion-de-zero-trust"></a>Diapositiva #66: Network Policies: Implementación de Zero-Trust

*Subtítulo:* **Aislamiento de tráfico a nivel de Pod dentro del clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El Estado por Defecto (Default Allow)**
- Por defecto en Kubernetes, la red es completamente PLANA y abierta.
- Cualquier Pod en cualquier namespace puede conectarse por TCP/UDP a cualquier otro Pod.
- Si un contenedor web es vulnerado, el atacante puede escanear la base de datos interna o el servicio de pagos.

**El Principio de Default Deny**
- La primera regla de seguridad en producción: Aplicar una política que BLOQUEE todo el tráfico entrante y saliente por defecto.
- A partir de ahí, se añaden reglas explícitas de whitelist permitiendo únicamente las conexiones legítimas (ej: Frontend -> Backend en puerto 8080).

**Dependencia Absoluta del Plugin CNI**
- Las NetworkPolicies son objetos nativos de K8s, pero K8s NO las aplica directamente.
- El plugin CNI DEBE tener soporte de NetworkPolicy (Calico, Cilium, Weave Net).
- Con Flannel básico, las NetworkPolicies se crean sin error pero son IGNORADAS por completo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender la necesidad urgente de NetworkPolicies para eliminar el modelo plano de red y aplicar Zero-Trust.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Las NetworkPolicies actúan como un cortafuegos distribuido a nivel de Pod (micro-segmentación). Las reglas se programan en el kernel de Linux de cada nodo trabajador mediante iptables (Calico) o eBPF (Cilium).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en desarrollo casi nadie configura NetworkPolicies pero en producción son obligatorias para PCI-DSS o ISO 27001?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque configurarlas requiere mapear con precisión quirúrgica qué puertos y servicios hablan entre sí.

---

### <a id="diapositiva-67-manifiesto-de-networkpolicy-aislamiento-de-base-de-datos"></a>Diapositiva #67: Manifiesto de NetworkPolicy: Aislamiento de Base de Datos

*Subtítulo:* **Permitir acceso a PostgreSQL únicamente desde Pods con etiqueta app: backend**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (db-network-policy.yaml):**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: isolate-database
  namespace: produccion
spec:
  podSelector:
    matchLabels:
      app: postgres             # Protege a los Pods de BD
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: backend-api      # Solo permite al backend
      namespaceSelector:
        matchLabels:
          team: core
    ports:
    - protocol: TCP
      port: 5432
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar con detalle la sintaxis combinada de podSelector y namespaceSelector en NetworkPolicies.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Cuidado con la sintaxis de guiones en YAML: si `podSelector` y `namespaceSelector` están bajo el mismo guion `-`, actúan como un 'AND' (mismo namespace con esa etiqueta Y ese podSelector). Si están en guiones separados `-`, actúan como un 'OR'.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué le ocurre a una petición que envía un Pod con etiqueta `app: frontend` hacia el puerto 5432 de la base de datos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> La petición sufre un 'DROP' silencioso en el kernel del nodo; el frontend se quedará esperando hasta que venza su timeout.

---

### <a id="diapositiva-68-pod-security-standards-pss-y-admission"></a>Diapositiva #68: Pod Security Standards (PSS) y Admission

*Subtítulo:* **El sustituto moderno de las obsoletas PodSecurityPolicies (PSP)**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Privileged (Sin Restricciones)**
- Permite cualquier privilegio de contenedor conocido.
- Acceso root total, privilegios de host y capacidades de red completas.
- Reservado para agentes de infraestructura de sistema (CNI, monitorización).

**2. Baseline (Seguridad Básica)**
- Evita escaladas de privilegios conocidas y previene configuraciones de riesgo obvias.
- Bloquea `hostNetwork`, `hostPID`, `hostIPC` y montajes peligrosos del host.
- Permite que los contenedores corran como root si no se especifica lo contrario.

**3. Restricted (Máxima Seguridad)**
- Debe correr obligatoriamente como usuario no-root (`runAsNonRoot: true`).
- Sistema de archivos raíz en modo de solo lectura (`readOnlyRootFilesystem: true`).
- Descartar todas las capacidades de Linux (`capabilities.drop: ['ALL']`).
- Desactivar escalada de privilegios (`allowPrivilegeEscalation: false`).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Conocer los 3 perfiles oficiales de Pod Security Standards de Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> A partir de K8s 1.25, Pod Security Admission reemplazó a las antiguas PodSecurityPolicies. Se activa etiquetando namespaces con `pod-security.kubernetes.io/enforce: restricted`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué modos de control de PSS existen además de 'enforce'?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Existen `audit` (registra violaciones en el log de auditoría sin bloquear) y `warn` (muestra avisos en la terminal del usuario al ejecutar kubectl).

---

### <a id="diapositiva-69-securitycontext-endurecimiento-a-nivel-de-contenedor"></a>Diapositiva #69: SecurityContext: Endurecimiento a Nivel de Contenedor

*Subtítulo:* **Restricción de privilegios de Linux en tiempo de ejecución**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (secure-pod.yaml):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hardened-app
spec:
  securityContext:               # A nivel de Pod
    runAsNonRoot: true
    runAsUser: 10001
    fsGroup: 10001
    seccompProfile:
      type: RuntimeDefault       # Filtro de syscalls
  containers:
  - name: app
    image: myapp:distroless
    securityContext:             # A nivel de contenedor
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL                    # Descarta root caps
    volumeMounts:
    - name: tmp
      mountPath: /tmp            # Carpeta escribible
  volumes:
  - name: tmp
    emptyDir: {}
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar el manifiesto de un Pod con endurecimiento militar según el perfil PSS Restricted.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Si la app necesita escribir temporalmente (ej: logs o caches locales), con `readOnlyRootFilesystem: true` fallará a menos que le montemos un volumen `emptyDir` en `/tmp`. Esto garantiza que un atacante no pueda modificar binarios del sistema ni instalar scripts persistentes.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué hace la directiva `seccompProfile: RuntimeDefault`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Bloquea más de 40 llamadas del sistema (syscalls) peligrosas de Linux que los contenedores no necesitan en condiciones normales.

---

### <a id="diapositiva-70-secretos-nativos-de-kubernetes-y-sus-riesgos"></a>Diapositiva #70: Secretos Nativos de Kubernetes y sus Riesgos

*Subtítulo:* **¿Por qué un Secret de Kubernetes no es un sistema seguro de contraseñas?**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El Mito de la Seguridad en Base64**
- Los Secrets en Kubernetes se codifican en Base64: NO ESTÁN CIFRADOS.
- Cualquiera con permiso `get secrets` puede ejecutar: `echo 'cGFzc3dvcmQ=' | base64 -d` y leer la clave en texto plano.
- Base64 es solo un formato de serialización para transportar datos binarios, no un mecanismo de seguridad.

**Cifrado en Reposo en etcd (Encryption at Rest)**
- Por defecto, etcd guarda los secretos en texto plano en disco.
- Es imprescindible configurar `EncryptionConfiguration` con proveedores como AES-GCM o KMS (HashiCorp Vault, AWS KMS, GCP KMS).
- Protege contra robos de backups de etcd o accesos directos al disco del Master.

**Buenas Prácticas Nativas**
- Nunca subir archivos YAML con Secretos a repositorios Git públicos o privados (peligro masivo de fugas).
- Montar los secretos como volúmenes de archivo en lugar de variables de entorno (las variables de entorno quedan expuestas en logs de crash y `/proc/<pid>/environ`).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Desmitificar los Secretos nativos de Kubernetes y comprender la diferencia entre codificación (Base64) y cifrado criptográfico.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Guardar contraseñas en Git aunque estén en Base64 es el vector de ataque número uno en fugas de datos. Para GitOps seguro se requieren herramientas como Sealed Secrets o External Secrets Operator.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué es más seguro montar un Secreto como fichero en `/etc/secrets/db-pass` que pasarlo como variable de entorno `DB_PASSWORD`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque los comandos de debug como `docker inspect` o volcados de excepciones de Java/Python suelen imprimir todas las variables de entorno en los logs.

---

### <a id="diapositiva-71-secretos-corporativos-external-secrets-operator-eso"></a>Diapositiva #71: Secretos Corporativos: External Secrets Operator (ESO)

*Subtítulo:* **Sincronización segura desde HashiCorp Vault, AWS Secrets Manager o Azure Key Vault**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El Desafío de GitOps**
- En flujos de CI/CD modernos (ArgoCD, Flux), todo debe estar en Git.
- ¿Cómo desplegar manifiestos sin exponer contraseñas reales en el repositorio?
- Solución: Almacenar los secretos en un gestor corporativo centralizado (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager).

**Arquitectura de External Secrets Operator**
- 1. SecretStore / ClusterSecretStore: Configura la autenticación segura hacia la bóveda externa.
- 2. ExternalSecret (CRD): Declara: 'Trae la clave /prod/db/password de Vault y crea un Secret nativo de K8s llamado db-credentials'.
- 3. ESO se encarga de crear, rotar y sincronizar el Secret nativo en memoria de Kubernetes automáticamente.

**Ventajas Operativas**
- Cero credenciales en los repositorios de código de Git.
- Rotación automática de contraseñas: si la clave cambia en Vault, ESO actualiza el Secret en K8s en segundos.
- Auditoría centralizada en el gestor de secretos corporativo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar la solución estándar del ecosistema para gestión segura de credenciales en flujos GitOps.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> External Secrets Operator permite mantener el ciclo de vida del secreto fuera de Kubernetes (con rotaciones automáticas en Vault o AWS) mientras que los Pods de la aplicación siguen consumiendo un Secret estándar de Kubernetes sin enterarse del origen.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ventaja tiene External Secrets Operator frente a la solución de Vault CSI Provider?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> ESO crea objetos Secret nativos de K8s reales compatibles con cualquier Helm chart o aplicación existente sin modificar sus manifiestos.

---

## Módulo 7: Observabilidad y Troubleshooting

### <a id="diapositiva-72-observabilidad-y-troubleshooting"></a>Diapositiva #72: Observabilidad y Troubleshooting

*Subtítulo:* **Probes, Prometheus, Grafana, Logging y Diagnóstico Sistémico**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar la disciplina de observabilidad y las técnicas profesionales de diagnóstico de incidentes en Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En un sistema distribuido con cientos de Pods dinámicos, conectarse por SSH a los nodos ya no es viable. Necesitamos telemetría continua para saber qué está fallando antes de que lo noten los usuarios y un árbol de diagnóstico metódico.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuál es el error más frustrante o común con el que os habéis encontrado al desplegar Pods en Kubernetes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Minikube activaremos `minikube addons enable metrics-server` para habilitar el comando `kubectl top nodes` y `kubectl top pods`.

---

### <a id="diapositiva-73-los-tres-pilares-de-la-observabilidad-cloud-native"></a>Diapositiva #73: Los Tres Pilares de la Observabilidad Cloud-Native

*Subtítulo:* **Cómo correlacionar señales para entender el comportamiento interno del sistema**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Métricas (Metrics) - ¿Hay un problema?**
- Datos numéricos agregados a lo largo del tiempo (series temporales).
- Métricas clave (Golden Signals): Latencia, Tráfico, Errores y Saturación.
- Herramienta estándar: Prometheus + Grafana.
- Bajo coste de almacenamiento y alertas inmediatas.

**2. Logs (Eventos) - ¿Por qué ocurrió?**
- Registros textuales de eventos emitidos por aplicaciones y componentes del sistema.
- Salida estándar (stdout / stderr) capturada automáticamente por containerd en `/var/log/pods`.
- Herramienta estándar: Promtail + Grafana Loki o Fluentd + OpenSearch.

**3. Trazas (Traces) - ¿Dónde ocurrió?**
- Siguen el viaje de una petición HTTP/gRPC a través de múltiples microservicios (Distributed Tracing).
- Identifican cuellos de botella exactos de latencia entre llamadas a bases de datos y APIs externas.
- Herramienta estándar: OpenTelemetry (OTel) + Jaeger o Tempo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Establecer la diferencia entre métricas (detección), logs (causa raíz) y trazas (contexto distribuido).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Las métricas nos avisan con una alerta ('el 15% de peticiones dan error 500'). El distributed tracing nos dice qué microservicio causó el fallo ('el servicio de pagos tardó 4 segundos'). Los logs nos muestran la traza de la excepción exacta en el código ('NullPointerException').

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué guardar absolutamente todos los logs en texto plano puede volverse insostenible en costes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Loki resuelve esto indexando solo las etiquetas (labels) de Kubernetes en lugar de indexar el texto completo del log.

---

### <a id="diapositiva-74-sondas-de-salud-liveness-readiness-y-startup"></a>Diapositiva #74: Sondas de Salud: Liveness, Readiness y Startup

*Subtítulo:* **La interfaz entre el Kubelet y la salud interna de tu aplicación**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Startup Probe (¿Ha terminado de arrancar?)**
- Diseñada para aplicaciones con arranque lento (ej: Java/Spring Boot o carga de modelos ML pesados).
- Desactiva temporalmente las comprobaciones de Liveness y Readiness hasta que la app arranca con éxito.
- Evita que el Kubelet mate prematuramente una app antes de que termine su inicialización.

**Liveness Probe (¿Sigue viva la app?)**
- Detecta bloqueos internos (deadlocks) donde el proceso sigue en pie pero no responde.
- ACCIÓN SI FALLA: Kubelet reinicia el contenedor (kill y arranque de un contenedor nuevo).
- ADVERTENCIA: Solo debe comprobar si el proceso local está vivo, nunca dependencias externas.

**Readiness Probe (¿Puede aceptar tráfico?)**
- Detecta si la app está lista para atender clientes (ej: cachés cargadas, pools de BD listos).
- ACCIÓN SI FALLA: Kubelet NO mata el contenedor; retira la IP del Pod del Service / Ingress.
- Protege a los usuarios de recibir errores 500 durante picos de carga transitorios.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar con total claridad el propósito y las consecuencias de cada uno de los tres tipos de sondas.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El error más catastrófico en Kubernetes es usar Liveness cuando se debería usar Readiness. Si una app se satura temporalmente y tarda 3 segundos en responder, Liveness la matará y reiniciará, empeorando el colapso. Readiness simplemente la saca del balanceo hasta que se descongestione.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué mecanismos de comprobación soportan las sondas? (httpGet, tcpSocket, exec y gRPC)."*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Desde K8s 1.24+ existe soporte nativo de sondas gRPC sin necesidad de invocar herramientas como grpc_health_probe.

---

### <a id="diapositiva-75-configuracion-experta-de-sondas-en-yaml"></a>Diapositiva #75: Configuración Experta de Sondas en YAML

*Subtítulo:* **Combinación de Startup, Liveness y Readiness para aplicaciones de producción**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (probes-spec.yaml):**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resilient-backend
spec:
  containers:
  - name: api
    image: spring-app:3.0
    # 1. Margen de arranque prolongado (30x10 = 300s)
    startupProbe:
      httpGet: { path: /healthz, port: 8080 }
      failureThreshold: 30
      periodSeconds: 10
    # 2. Reinicio si el proceso entra en deadlock
    livenessProbe:
      httpGet: { path: /healthz, port: 8080 }
      periodSeconds: 10
      failureThreshold: 3
    # 3. Retiro de tráfico si se satura
    readinessProbe:
      httpGet: { path: /ready, port: 8080 }
      periodSeconds: 5
      failureThreshold: 2
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar el patrón canónico de configuración de sondas para aplicaciones con tiempos de inicio prolongados.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Con esta combinación de `startupProbe`, la aplicación tiene hasta 5 minutos (30 intentos x 10s) para arrancar sin peligro de que `livenessProbe` la mate. Una vez que `startupProbe` responde OK por primera vez, se apaga para siempre y toman el control Liveness y Readiness.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si configuramos un `timeoutSeconds: 1` en una red con latencia variable?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Un pequeño pico de red marcará la sonda como fallida provocando reinicios innecesarios (flapping).

---

### <a id="diapositiva-76-las-trampas-de-las-sondas-caidas-en-cascada"></a>Diapositiva #76: Las Trampas de las Sondas: Caídas en Cascada

*Subtítulo:* **Errores de diseño en healthchecks que pueden tumbar todo el clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Trampa 1: Sonda Liveness conectada a la Base de Datos**
- Escenario: El endpoint `/health` comprueba si PostgreSQL está accesible.
- Problema: La base de datos sufre una saturación momentánea y tarda en responder.
- Catástrofe: Kubelet mata TODOS los Pods de la aplicación a la vez. Cuando vuelven a arrancar, todos intentan reconectar a la BD simultáneamente, rematándola.

**Trampa 2: Sondas `exec` con alto consumo de CPU**
- Escenario: Usar `exec: command: ['sh', '-c', 'script.sh']` cada 3 segundos.
- Problema: Cada invocación de `exec` hace un fork de un proceso en Linux, consume PID y ciclos de CPU.
- En un nodo con 50 pods, Kubelet estará haciendo cientos de forks por segundo saturando el host.

**Regla de Oro en Producción**
- Liveness debe ser ULTRA LIGERA: solo comprobar si el loop de eventos del proceso responde (ej: devolver 200 OK en memoria).
- Readiness sí puede verificar conexiones a bases de datos o servicios downstream.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Evitar caídas en cascada producidas por sondas Liveness mal diseñadas.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Este es uno de los anti-patrones más destructivos en Kubernetes. Nunca jamás hagáis que una Liveness probe dependa de un servicio externo. Si la base de datos cae, reiniciar el backend no va a arreglar la base de datos; solo generará un bucle de reinicios masivo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué código HTTP interpreta Kubelet como éxito en una sonda httpGet?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Cualquier código mayor o igual a 200 y menor a 400 (códigos 2xx y 3xx). Un 4xx o 5xx se considera fallo.

---

### <a id="diapositiva-77-arquitectura-del-stack-de-monitorizacion-prometheus"></a>Diapositiva #77: Arquitectura del Stack de Monitorización: Prometheus

*Subtítulo:* **El estándar de facto de la CNCF para métricas de sistemas distribuidos**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El Modelo Pull (Scraping)**
- Prometheus no espera a que las apps envíen métricas (Push).
- Prometheus 'raspa' (hace peticiones HTTP GET periódicas a `/metrics`) los endpoints de los Pods y Nodos.
- Formato de texto plano estándar OpenMetrics / Prometheus.

**Prometheus Operator y ServiceMonitors**
- En Kubernetes moderno no se edita el archivo `prometheus.yml` a mano.
- Se utiliza el Prometheus Operator con recursos declarativos CRD:
- `ServiceMonitor`: Descubre y raspa automáticamente servicios según sus etiquetas de Kubernetes.

**Alertmanager y Reglas de Alerta**
- Prometheus evalúa reglas PromQL continuamente (ej: `rate(http_requests_total[5m]) > 100`).
- Envía las alertas a Alertmanager, que se encarga del silenciamiento, agrupación y enrutamiento hacia Slack, PagerDuty o Email.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Comprender el funcionamiento del modelo de scraping de Prometheus y el uso del patrón Operator.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Prometheus guarda las series temporales en su propia base de datos TSDB (Time Series Database) en disco. Gracias al ServiceMonitor, los desarrolladores solo añaden un YAML para que su nueva aplicación sea monitorizada automáticamente sin tocar la configuración central.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué ventaja tiene el modelo Pull (hacer scraping) frente al modelo Push en Kubernetes?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Prometheus sabe de inmediato si un servicio ha muerto porque el scraping falla, mientras que con Push el servicio simplemente deja de enviar señales.

---

### <a id="diapositiva-78-dashboards-y-visualizacion-en-grafana"></a>Diapositiva #78: Dashboards y Visualización en Grafana

*Subtítulo:* **Construcción de paneles de mando para infraestructura y aplicaciones**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**node-exporter (Métricas del Host)**
- Se despliega como DaemonSet en cada nodo del clúster.
- Métricas de hardware del kernel de Linux: Uso de CPU por core, RAM libre/en caché, IOPS de disco, throughput de red y estado del filesystem.
- Dashboard comunitario estándar: ID 1860.

**kube-state-metrics (Métricas de la API)**
- No mide consumo de CPU/Memoria, sino el estado de los objetos de Kubernetes:
- • Número de réplicas deseadas vs réplicas disponibles de un Deployment.
- • Pods en estado CrashLoopBackOff o Pending.
- • Fechas de expiración de certificados de Kubeconfig y Secretos.

**Métricas de Aplicación (Negocio)**
- Librerías cliente en Go, Python, Java, Node.js.
- Métricas RED: Rate (Peticiones/seg), Errors (Tasa de fallos), Duration (Latencia en percentiles p95, p99).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Diferenciar las fuentes de métricas de infraestructura (node-exporter) de las métricas de estado de objetos (kube-state-metrics).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> kube-state-metrics es fundamental para las alertas del administrador: genera métricas como `kube_deployment_status_replicas_unavailable > 0` o `kube_pod_container_status_restarts_total`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué los percentiles (p95 / p99) son mucho más útiles para medir latencia que la media aritmética?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque la media oculta picos catastróficos; el p99 muestra la experiencia real del 1% de usuarios que sufren mayor lentitud.

---

### <a id="diapositiva-79-arquitecturas-de-logging-grafana-loki-y-fluentd"></a>Diapositiva #79: Arquitecturas de Logging: Grafana Loki y Fluentd

*Subtítulo:* **Captura, centralización y consulta eficiente de logs en clústeres**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Logging a Nivel de Nodo (Node-Level)**
- Los contenedores escriben en stdout y stderr.
- El container runtime (containerd) almacena los ficheros JSON en `/var/log/pods/<namespace>_<pod>_<uid>/`.
- Logrotate se encarga de rotar y limitar el tamaño de estos ficheros en el host.

**Agentes de Recolección (DaemonSet)**
- Promtail o Fluentbit corren en cada nodo como DaemonSet.
- Monitorizan los ficheros en `/var/log/pods/`, enriquecen cada línea con metadatos del Pod (namespace, pod_name, container_name) y los transmiten al almacén central.

**Almacenamiento Centralizado: Loki**
- Loki está diseñado 'como Prometheus pero para logs'.
- No indexa el texto completo del mensaje: solo indexa las etiquetas de Kubernetes (Namespace, App).
- Almacenamiento ultra-económico en buckets de objetos (AWS S3, MinIO, GCS).
- Consultas potentes mediante lenguaje LogQL integrado en Grafana.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar la arquitectura de agregación de logs sin saturar los recursos de disco de los nodos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En Kubernetes clásico se usaba Elasticsearch (ELK), pero requería clústeres gigantescos de memoria para los índices Lucene. Grafana Loki revolucionó el logging en Kubernetes porque aprovecha las etiquetas existentes de los Pods y almacena los chunks comprimidos en almacenamiento de objetos.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué comando nativo de kubectl nos permite consultar logs de contenedores que ya se han reiniciado?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> `kubectl logs <pod> --previous` muestra el log de la ejecución anterior que falló.

---

### <a id="diapositiva-80-metodologia-de-troubleshooting-sistemico"></a>Diapositiva #80: Metodología de Troubleshooting Sistémico

*Subtítulo:* **Un enfoque metódico para diagnosticar caídas sin perder tiempo**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Las 4 Preguntas Clave**
- 1. ¿En qué fase está el Pod? (Pending, CrashLoopBackOff, OOMKilled, Running pero no Ready).
- 2. ¿Qué dicen los Eventos del clúster? (`kubectl get events` es la primera herramienta a consultar).
- 3. ¿Qué dice el Kubelet sobre el Pod? (`kubectl describe pod <nombre>` desvela eventos y condiciones).
- 4. ¿Qué dice el proceso de la aplicación? (`kubectl logs <nombre> --previous`).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Enseñar un árbol de decisión estructurado para que los alumnos dejen de adivinar y sigan un método de diagnóstico profesional.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El 95% de los problemas en Kubernetes se reducen a tres estados: Pending (fallo de scheduling o recursos), CrashLoopBackOff (fallo interno de la app o configuración) y OOMKilled (límite de memoria superado).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué diferencia hay entre la información que da `kubectl describe` y la que da `kubectl logs`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> `describe` da información del plano de control de Kubernetes; `logs` da información de la aplicación interna.

---

### <a id="diapositiva-81-diagnostico-1-pods-en-estado-pending"></a>Diapositiva #81: Diagnóstico 1: Pods en Estado Pending

*Subtítulo:* **El Scheduler no puede o no tiene permitido ubicar el Pod en ningún nodo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Causa 1: Recursos Insuficientes**
- Mensaje: `0/3 nodes are available: 3 Insufficient cpu / memory`.
- Diagnóstico: La suma de `requests` del Pod supera la capacidad disponible en todos los nodos.
- Solución: Reducir requests sobredimensionados o añadir más nodos al clúster (Cluster Autoscaler).

**Causa 2: Taints sin Tolerations**
- Mensaje: `0/3 nodes are available: 1 node has untolerated taint`.
- Diagnóstico: Los nodos tienen taints que el Pod no tolera (ej: nodos dedicados o master).
- Solución: Añadir la `toleration` adecuada en el Pod o quitar el taint del nodo si fue un error.

**Causa 3: PVC sin Vincular (Unbound)**
- Mensaje: `pod has unbound immediate PersistentVolumeClaims`.
- Diagnóstico: El PVC solicitado no encuentra un PV que coincida o la StorageClass no puede aprovisionar el disco.
- Solución: `kubectl describe pvc <nombre>` para ver si la cabina o el provisionador está caído.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a interpretar los mensajes de error exactos emitidos por el planificador en eventos de Pending.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Cuando un pod está en Pending, el Kubelet aún no ha intervenido; el problema reside 100% en el Control Plane (Scheduler o Storage Controller). Mirar los logs de la app en este estado es inútil porque el contenedor no ha llegado a crearse.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos ver rápidamente qué nodos tienen qué capacidad restante de recursos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Ejecutar `kubectl describe nodes | grep -A 8 'Allocated resources'` para ver el porcentaje de reserva.

---

### <a id="diapositiva-82-diagnostico-2-crashloopbackoff-y-errores-de-app"></a>Diapositiva #82: Diagnóstico 2: CrashLoopBackOff y Errores de App

*Subtítulo:* **El contenedor arranca, falla, muere y Kubelet retrasa exponencialmente su reinicio**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**¿Qué significa el BackOff?**
- Si un contenedor falla repetidamente, Kubelet no lo reinicia en bucle infinito instantáneo para no quemar la CPU.
- Aplica un retraso exponencial (10s, 20s, 40s, 80s... hasta un tope de 300 segundos = 5 minutos).
- El estado `CrashLoopBackOff` indica que el pod está en ese periodo de espera antes de volver a intentar arrancar.

**Causas Principales**
- 1. Error de ejecución en la app: Excepción no capturada, fallo de sintaxis, falta de variable de entorno obligatoria.
- 2. ConfigMap o Secret ausente: El pod intenta montar un secreto que no existe.
- 3. Fallo en Startup Probe: La sonda declara muerto al contenedor antes de que termine de inicializarse.

**Comandos Clave de Triage**
- `kubectl describe pod <nombre>` -> Mirar 'Last State' y 'Exit Code'.
- `kubectl logs <nombre> --previous` -> Vuelca la salida del contenedor antes de morir.
- `kubectl get events --field-selector reason=Failed`.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Guiar la resolución de CrashLoopBackOff usando los códigos de salida y los logs históricos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El código de salida (Exit Code) de Linux es la mejor pista: Exit 1 (error general de aplicación), Exit 127 (comando no encontrado dentro de la imagen), Exit 137 (OOMKilled o SIGKILL forzoso).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué significa un Exit Code 0 en un Pod gestionado por un Deployment?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Significa que el proceso terminó con éxito (ej. un script que finalizó). Pero como el Deployment tiene `restartPolicy: Always`, Kubelet lo reinicia considerándolo un fallo de servicio continuo.

---

### <a id="diapositiva-83-diagnostico-3-oomkilled-exit-code-137"></a>Diapositiva #83: Diagnóstico 3: OOMKilled (Exit Code 137)

*Subtítulo:* **Cuando el kernel de Linux ejecuta la sentencia de muerte por memoria**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**La Anatomía del Exit Code 137**
- En sistemas Unix, un código > 128 indica que el proceso murió por una señal del sistema.
- Fórmula: 128 + Número de Señal.
- 128 + 9 (SIGKILL) = 137.
- Indica inequívocamente que el kernel ejecutó un `kill -9` sobre el contenedor.

**Causa 1: Memory Limit del Contenedor**
- El proceso en el contenedor intentó asignar más memoria que su `limits.memory`.
- El subsistema cgroups de Linux intercepta la asignación y purga el proceso.
- El nodo sigue sano y con memoria libre; solo muere ese contenedor.

**Causa 2: OOM a Nivel de Nodo Físico**
- El servidor físico completo se ha quedado sin memoria RAM.
- El OOM Killer del kernel de Linux escoge una víctima según `oom_score`.
- Diagnóstico en el host: `sudo dmesg -T | grep -i oom` para ver qué proceso fue ejecutado.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Identificar con certeza matemática cuándo un contenedor ha sufrido OOMKilled y solucionar su causa raíz.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> En `kubectl describe pod`, si veis `Last State: Terminated` con `Reason: OOMKilled` y `Exit Code: 137`, no hay duda posible. La solución inmediata es incrementar el `limits.memory` o perfilar la aplicación para corregir la fuga de memoria (Memory Leak).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en aplicaciones Java con contenedores suele ocurrir OOMKilled si no se configuran las flags `-XX:MaxRAMPercentage`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Versiones antiguas de Java no entendían cgroups y asumían la memoria total del host en lugar del límite del contenedor, reservando heaps gigantes que provocaban el OOMKilled inmediato.

---

### <a id="diapositiva-84-diagnostico-4-fallos-de-red-y-resolucion-dns"></a>Diapositiva #84: Diagnóstico 4: Fallos de Red y Resolución DNS

*Subtítulo:* **Procedimiento paso a paso para desatascar problemas de conectividad**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Paso 1: Lanzar un Pod de Diagnóstico (Swiss Army Knife)**
- `kubectl run debug --rm -it --image=nicolaka/netshoot -- /bin/bash`
- La imagen `netshoot` incluye curl, dig, traceroute, tcpdump, nmap, iperf y netstat.
- Permite probar la red situándonos en la misma perspectiva que un Pod real.

**Paso 2: Comprobar Resolución DNS**
- `nslookup mi-servicio.default.svc.cluster.local`
- Si falla: comprobar si CoreDNS está corriendo (`kubectl get pods -n kube-system -l k8s-app=kube-dns`).
- Revisar logs de CoreDNS: `kubectl logs -n kube-system -l k8s-app=kube-dns`.

**Paso 3: Comprobar Endpoints del Servicio**
- `kubectl get endpoints mi-servicio`
- Si la lista de IPs está vacía (`<none>`), el Service no está enviando tráfico a nadie.
- Causa típica: Las etiquetas de `spec.selector` del Service no coinciden exactamente con las de los Pods, o los Pods no han pasado su Readiness Probe.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Dominar la secuencia de comprobaciones de red: DNS -> Service -> Endpoints -> Pod IP.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El 80% de los tickets de 'la red no funciona' se deben a dos despistes tipográficos: una errata en el selector de etiquetas del Service (que deja la lista de endpoints vacía) o que los Pods fallaron su Readiness Probe y fueron desindexados.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué comando rápido nos muestra si un Servicio tiene Pods activos asociados?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Ejecutar `kubectl get endpoints <nombre-servicio>` o `kubectl get endpointslices`.

---

## Módulo 8: Automatización con Helm

### <a id="diapositiva-85-automatizacion-con-helm"></a>Diapositiva #85: Automatización con Helm

*Subtítulo:* **Charts, Plantillas Go, Parametrización Multi-Entorno y Rollbacks**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Presentar Helm como el gestor de paquetes estándar del ecosistema Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Desplegar aplicaciones complejas (como Grafana o WordPress) mediante YAMLs estáticos individuales es inmanejable. Helm permite empaquetar decenas de manifiestos en un único artefacto versionado y parametrizable.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos habéis usado Helm para instalar herramientas de terceros o para vuestras propias aplicaciones?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Asegurarse de tener el binario `helm` instalado en la máquina cliente para interactuar con el clúster.

---

### <a id="diapositiva-86-por-que-helm-el-problema-de-los-yamls-estaticos"></a>Diapositiva #86: ¿Por Qué Helm? El Problema de los YAMLs Estáticos

*Subtítulo:* **De la duplicación manual de manifiestos a la parametrización profesional**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**El 'YAML Hell' en Producción**
- Una aplicación real requiere Deployment, Service, Ingress, HPA, ConfigMap, Secret, ServiceAccount y NetworkPolicy.
- Son cientos de líneas de configuración con valores repetidos en múltiples archivos.
- Cualquier cambio manual de versión o puerto requiere editar 5 ficheros a la vez.

**El Reto de los Múltiples Entornos**
- En Desarrollo: 1 réplica, recursos mínimos, sin TLS, base de datos local.
- En Producción: 5 réplicas, alta disponibilidad, TLS estricto, base de datos externa.
- Sin Helm: Se duplican carpetas enteras de YAMLs (`k8s/dev` y `k8s/prod`), divergiendo con el tiempo.

**La Solución de Helm**
- El equivalente a APT, YUM o NPM para Kubernetes.
- Unifica todos los manifiestos en una plantilla reutilizable (**Chart**).
- Inyecta valores específicos por entorno mediante ficheros `values.yaml`.
- Mantiene un historial de versiones transaccional (**Releases**).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Justificar por qué Helm es indispensable para la automatización en cualquier empresa seria.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Helm no solo genera YAMLs: gestiona el ciclo de vida. Si instalas un Chart con 10 recursos y luego haces `helm uninstall`, Helm borra limpiamente los 10 recursos sin dejar basura huérfana en el clúster.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué diferencia a Helm v3 de Helm v2?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Helm v3 se eliminó por completo 'Tiller' (el componente de servidor que requería permisos de ClusterAdmin y era un agujero de seguridad masivo). Helm v3 es puramente cliente.

---

### <a id="diapositiva-87-anatomia-de-un-helm-chart"></a>Diapositiva #87: Anatomía de un Helm Chart

*Subtítulo:* **Estructura estándar de directorios y convenciones de empaquetado**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Chart.yaml (Metadatos)**
- `name`: Nombre del paquete.
- `version`: Versión SemVer del propio Chart (ej: 1.2.0).
- `appVersion`: Versión de la aplicación que empaqueta (ej: nginx 1.25.4).
- `description`, `maintainers`, `dependencies`.

**values.yaml (Valores por Defecto)**
- Fichero central de variables y parámetros.
- Define valores por defecto seguros para réplicas, puertos, imágenes, recursos y flags de activación.
- Sobre-escribible por el usuario en tiempo de instalación.

**templates/ (Las Plantillas)**
- Contiene los ficheros YAML con sintaxis de plantillas Go (Go Templates).
- `deployment.yaml`, `service.yaml`, `ingress.yaml`.
- `_helpers.tpl`: Funciones y plantillas parciales reutilizables.
- `NOTES.txt`: Mensaje que se imprime en consola tras instalar el Chart.

**charts/ y .helmignore**
- `charts/`: Directorio donde residen los sub-charts o dependencias del paquete.
- `.helmignore`: Patrones de exclusión para no empaquetar ficheros temporales ni `.git`.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Conocer la estructura de carpetas que genera el comando `helm create <nombre>`.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Es crucial entender la diferencia entre `version` (la versión del empaquetado de Helm) y `appVersion` (la versión del software). Se puede corregir un bug en el `service.yaml` y subir la versión del Chart a `1.0.1` sin que cambie la `appVersion` de la aplicación.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué comando crea la plantilla base de un Chart en segundos?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Ejecutar `helm create mi-app` genera toda esta estructura con ejemplos funcionales.

---

### <a id="diapositiva-88-el-motor-de-plantillas-de-go-variables-y-funciones"></a>Diapositiva #88: El Motor de Plantillas de Go: Variables y Funciones

*Subtítulo:* **Inyección dinámica de valores, condicionales y tuberías (pipelines)**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (templates/deployment.yaml):**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-web
  labels:
    app.kubernetes.io/name: {{ .Chart.Name }}
    app.kubernetes.io/instance: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount | default 1 }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        ports:
        - containerPort: {{ .Values.service.port }}
        {{- if .Values.resources }}
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
        {{- end }}
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a parametrizar un manifiesto YAML de Kubernetes utilizando el motor de plantillas de Helm.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Fijaos en `toYaml .Values.resources | nindent 10`. Esto toma el bloque entero de recursos del `values.yaml` y lo indenta automáticamente con 10 espacios para que coincida exactamente con la jerarquía del YAML.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué significa el guion al inicio de una etiqueta `{{- if ... }}`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El guion le dice al motor de plantillas que elimine los espacios en blanco y saltos de línea sobrantes.

---

### <a id="diapositiva-89-parametrizacion-multientorno-values-dev-vs-values-prod"></a>Diapositiva #89: Parametrización Multientorno: values-dev vs values-prod

*Subtítulo:* **Un único Chart probado, desplegado con configuraciones independientes**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: values-dev.yaml** (Entorno Ligero)
- `replicaCount: 1` (Ahorro de recursos de CPU/Memoria).
- `image.tag: 'latest'` o rama de feature.
- `ingress.enabled: false` (acceso directo por port-forward).
- `resources.requests: { cpu: 50m, memory: 64Mi }`.
- `env.LOG_LEVEL: 'DEBUG'`.
- Despliegue: `helm upgrade --install app ./mi-chart -f values-dev.yaml`.

**Opción B: values-prod.yaml** (Entorno Blindado (Producción))
- `replicaCount: 5` con PodDisruptionBudget activado.
- `image.tag: 'v1.4.2'` (Tags inmutables, prohibido 'latest').
- `ingress.enabled: true` con certificados TLS cert-manager.
- `resources.limits` estrictos para evitar fugas.
- `env.LOG_LEVEL: 'WARN'`.
- Despliegue: `helm upgrade --install app ./mi-chart -f values-prod.yaml`.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Demostrar el flujo estándar de CI/CD: el artefacto empaquetado es idéntico; solo varían los values inyectados.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El gran principio de DevOps es 'build once, deploy anywhere'. Si el Chart pasa los tests en staging, se promociona exactamente el mismo Chart a producción cambiando únicamente el fichero de valores.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué en producción está estrictamente prohibido usar la etiqueta de imagen `latest`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque `latest` no es determinista: no sabemos qué versión exacta de código está corriendo y rompe la capacidad de rollback.

---

### <a id="diapositiva-90-gestion-de-repositorios-y-ciclo-de-vida-de-releases"></a>Diapositiva #90: Gestión de Repositorios y Ciclo de Vida de Releases

*Subtítulo:* **Los comandos esenciales para el día a día con Helm**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Gestión de Repositorios**
- `helm repo add <nombre> <url>` -> Añade un repositorio remoto (ej: Bitnami, Prometheus).
- `helm repo update` -> Descarga el índice más reciente de Charts disponibles.
- `helm search repo <keyword>` -> Busca paquetes en los repositorios configurados.
- `helm search hub <keyword>` -> Busca en el Artifact Hub global público.

**Instalación y Actualización**
- `helm install <release-name> <chart>` -> Instala un nuevo paquete.
- `helm upgrade <release-name> <chart>` -> Aplica cambios a una release existente.
- `helm upgrade --install <release-name> <chart>` -> Comando idempotente por excelencia (instala si no existe, actualiza si existe).

**Inspección y Limpieza**
- `helm list` -> Muestra todas las releases activas en el namespace.
- `helm status <release-name>` -> Muestra el estado actual y notas de la release.
- `helm uninstall <release-name>` -> Elimina todos los recursos asociados limpiamente.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Familiarizar al alumno con la sintaxis de comandos CLI de Helm.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Una 'Release' es una instancia concreta de un Chart ejecutándose en un namespace del clúster con una configuración específica. Podemos instalar el mismo Chart de PostgreSQL 3 veces con nombres de release diferentes (`db-auth`, `db-pagos`, `db-pedidos`).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Dónde almacena Helm v3 el estado y las versiones de las releases?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> En Secrets de Kubernetes dentro del mismo namespace donde se instaló la release (con tipo `helm.sh/release.v1`).

---

### <a id="diapositiva-91-actualizaciones-atomicas-y-rollbacks-seguros"></a>Diapositiva #91: Actualizaciones Atómicas y Rollbacks Seguros

*Subtítulo:* **Garantizar que un fallo en el despliegue no deje el clúster en un estado roto**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (helm-deploy-and-rollback.sh):**

```yaml
# 1. Despliegue seguro y atómico en CI/CD
helm upgrade --install mi-app ./charts/mi-app \
  --namespace produccion \
  --values values-prod.yaml \
  --wait \
  --timeout 5m0s \
  --atomic

# 2. Si falla manualmente: Inspeccionar historial
helm history mi-app -n produccion

# REVISION  UPDATED                   STATUS      CHART        DESCRIPTION
# 1         Mon Nov 10 10:00:00 2026  superseded  mi-app-1.0.0 Install complete
# 2         Mon Nov 10 11:30:00 2026  failed      mi-app-1.1.0 Upgrade "mi-app" failed
#
# 3. Revertir a la revisión 1 en 3 segundos:
helm rollback mi-app 1 -n produccion
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Enseñar el uso de `--atomic` y `helm rollback` para garantizar operaciones 100% transaccionales.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Sin la flag `--atomic`, si una nueva versión falla (por ejemplo, por una imagen rota), Helm deja la release en estado `FAILED` y los recursos a medio actualizar. Con `--atomic`, Helm detecta que los pods no alcanzaron Ready en el tiempo límite y restaura automáticamente el estado anterior.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué revisión figurará como activa en el historial tras ejecutar `helm rollback mi-app 1`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Helm creará una nueva revisión número 3 que será un clon idéntico del contenido de la revisión 1.

---

### <a id="diapositiva-92-hooks-del-ciclo-de-vida-y-tests-en-helm"></a>Diapositiva #92: Hooks del Ciclo de Vida y Tests en Helm

*Subtítulo:* **Ejecutar acciones antes, durante o después de instalar una release**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Hooks de Ciclo de Vida (helm.sh/hook)**
- `pre-install` / `pre-upgrade`: Ejecutar migraciones de bases de datos antes de actualizar los Pods.
- `post-install` / `post-upgrade`: Enviar notificaciones a Slack o purgar CDNs tras finalizar.
- Permiten coordinar dependencias complejas durante el despliegue.

**Políticas de Borrado de Hooks**
- `helm.sh/hook-delete-policy`: Controla el ciclo de vida del Job del hook tras finalizar.
- `hook-succeeded`: Borra el Job si terminó con código de salida 0.
- `before-hook-creation`: Elimina el Job anterior antes de lanzar la nueva ejecución.

**Helm Tests (helm.sh/hook: test)**
- Manifiestos que ejecutan comprobaciones de integración (Smoke Tests).
- Comando: `helm test <release-name>`.
- Comprueba que los endpoints devuelven 200 OK y la base de datos responde.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a orquestar migraciones de bases de datos antes del rollout de la aplicación mediante Helm Hooks.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Un `pre-upgrade` hook se define creando un Job estándar de Kubernetes con la anotación `helm.sh/hook: pre-upgrade`. Helm detendrá la actualización del Deployment hasta que ese Job finalice con código 0.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede si el Job del hook `pre-upgrade` falla y da error?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Helm cancela inmediatamente la actualización del Deployment y no toca la versión en producción.

---

### <a id="diapositiva-93-validacion-y-buenas-practicas-de-empaquetado"></a>Diapositiva #93: Validación y Buenas Prácticas de Empaquetado

*Subtítulo:* **Herramientas de depuración antes de enviar el Chart al clúster**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. helm lint (Validación Sintáctica)**
- `helm lint ./mi-chart`
- Analiza el Chart en busca de errores estructurales, claves obligatorias ausentes en Chart.yaml y problemas de convenciones.

**2. helm template (Renderizado Local)**
- `helm template <release-name> ./mi-chart -f values-prod.yaml`
- Genera y vuelca en la terminal todos los YAMLs resultantes SIN conectarse al clúster.
- Esencial para depurar la indentación y verificar que las variables se sustituyen correctamente.

**3. helm package y Firma de Artefactos**
- `helm package ./mi-chart` -> Genera un tarball comprimido `.tgz` versionado.
- Publicación en registros OCI (Docker Hub, GitHub Packages, Harbor): `helm push mi-chart-1.0.0.tgz oci://registry...`.
- Firma criptográfica de Charts con GPG para garantizar integridad en la cadena de suministro.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Enseñar el flujo de trabajo previo al despliegue: linting -> template -> package -> push.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Nunca despleguéis un Chart sin haber ejecutado antes `helm template`. La mayoría de errores en Helm son simples fallos de indentación de 2 espacios que `helm template` detecta al instante sin necesidad de ensuciar el clúster.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Se pueden almacenar Helm Charts en un registro de contenedores OCI normal como Docker Registry?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Sí, desde Helm 3.8+ el soporte OCI es nativo y oficial, permitiendo guardar imágenes Docker y Helm Charts en el mismo registro.

---

## Módulo 9: Operaciones de Día 2 y Mantenimiento

### <a id="diapositiva-94-operaciones-de-dia-2-y-mantenimiento"></a>Diapositiva #94: Operaciones de Día 2 y Mantenimiento

*Subtítulo:* **Autoscaling (HPA/VPA), Mantenimiento de Nodos, Upgrades y Backup de etcd**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Preparar a los alumnos para la realidad operativa del mantenimiento continuo de clústeres en producción.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Instalar un clúster es solo el 'Día 1'. El 'Día 2' representa el 99% de la vida de la plataforma: actualizar versiones de Kubernetes cada 4 meses, drenar nodos para parches de kernel de Linux, escalar automáticamente ante picos de demanda y tener un plan de recuperación de desastres ante un fallo de etcd.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Habéis participado en la actualización de versión de un clúster de Kubernetes en producción? ¿Cómo se gestionó el riesgo de parada?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> El laboratorio de este módulo cubrirá el procedimiento real de backup/restore de etcd y la ejecución de `kubeadm upgrade`.

---

### <a id="diapositiva-95-los-tres-niveles-de-escalado-automatico"></a>Diapositiva #95: Los Tres Niveles de Escalado Automático

*Subtítulo:* **Coordinación entre escalado horizontal, vertical y de infraestructura**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. HPA (Horizontal Pod Autoscaler)**
- Escala el NÚMERO de réplicas de Pods (de 2 a 20 réplicas).
- Reacciona dinámicamente según el consumo medio de CPU, Memoria o métricas personalizadas (ej. peticiones HTTP/s o mensajes en RabbitMQ).
- El estándar para aplicaciones stateless y microservicios web.

**2. VPA (Vertical Pod Autoscaler)**
- Ajusta el TAMAÑO de los Pods (modifica los `requests` y `limits` de CPU y Memoria).
- Corrige aplicaciones sobredimensionadas o que sufren OOMKilled recurrentes.
- Requiere reiniciar el Pod para aplicar los nuevos límites de cgroup.

**3. Cluster Autoscaler / Karpenter**
- Escala el número de NODOS FÍSICOS o máquinas virtuales del clúster.
- Si hay Pods en estado `Pending` porque no caben en ningún nodo, aprovisiona un nuevo nodo en Cloud.
- Si hay nodos con poca carga, desaloja los pods y destruye el nodo para ahorrar costes.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a diferenciar y combinar los tres niveles de autoescalado en Kubernetes.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> HPA y Cluster Autoscaler trabajan en equipo: un pico de tráfico hace que HPA pida 30 réplicas; al no caber en los nodos existentes, los pods entran en Pending; Cluster Autoscaler detecta los pods en Pending y añade 2 nodos al clúster de AWS o GCP.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué no se debe usar HPA y VPA simultáneamente sobre la misma métrica (ej. CPU)?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Entrarían en conflicto: HPA intentaría crear más réplicas mientras VPA intentaría agrandar el pod, desestabilizando el clúster.

---

### <a id="diapositiva-96-horizontal-pod-autoscaler-hpa-en-detalle"></a>Diapositiva #96: Horizontal Pod Autoscaler (HPA) en Detalle

*Subtítulo:* **Estructura de la API autoscaling/v2 con métricas de CPU y Memoria**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (hpa-web.yaml):**

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70    # Escala si CPU > 70% del request
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80    # Escala si RAM > 80% del request
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300 # 5 min de enfriamiento
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Analizar la sintaxis moderna de HPA v2 y la importancia de la ventana de estabilización.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Requisito técnico ineludible: para que HPA funcione, los Pods DEBEN tener definido `resources.requests`. Si no hay requests, HPA no puede calcular el porcentaje y el escalado fallará con estado `<unknown>`.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué componente de clúster es obligatorio tener instalado para que HPA obtenga las métricas?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Metrics Server (`minikube addons enable metrics-server`). Sin él, `kubectl get hpa` muestra `<unknown>/70%`.

---

### <a id="diapositiva-97-vertical-pod-autoscaler-vpa-componentes-y-modos"></a>Diapositiva #97: Vertical Pod Autoscaler (VPA): Componentes y Modos

*Subtítulo:* **Ajuste dinámico de tamaño de contenedores para dimensionamiento óptimo**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Los 3 Componentes de VPA**
- 1. VPA Recommender: Analiza el historial de métricas y calcula los requests óptimos.
- 2. VPA Updater: Decide cuándo reiniciar el Pod si sus límites actuales difieren mucho de la recomendación.
- 3. VPA Admission Controller: Intercepta la recreación del Pod e inyecta los nuevos requests en el YAML.

**Modo 'Off' (Solo Recomendaciones)**
- `updateMode: 'Off'`.
- No toca ni reinicia ningún Pod en ejecución.
- Calcula y muestra en el estado del objeto VPA los valores recomendados (Target, LowerBound, UpperBound).
- Modo imprescindible para auditorías de costes sin riesgo de caídas.

**Modos 'Initial' y 'Auto'**
- `Initial`: Solo asigna los nuevos límites cuando el Pod se crea por primera vez.
- `Auto`: Reinicia activamente el Pod cuando detecta que los límites están desajustados (respetando PodDisruptionBudgets).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a usar VPA en modo 'Off' como herramienta de optimización de capacidad y costes (FinOps).

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> La gran mayoría de empresas usan VPA en modo 'Off'. Ejecutan VPA durante 2 semanas, leen las recomendaciones matemáticas de consumo real y ajustan manualmente sus manifiestos de Helm ahorrando hasta un 40% de costes de infraestructura.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué el modo 'Auto' de VPA puede ser arriesgado en aplicaciones monolíticas?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque reiniciar un monolito de arranque lento interrumpe sesiones de usuario y conexiones activas.

---

### <a id="diapositiva-98-mantenimiento-seguro-de-nodos-cordon-y-drain"></a>Diapositiva #98: Mantenimiento Seguro de Nodos: Cordon y Drain

*Subtítulo:* **Procedimiento oficial para vaciar servidores sin cortar servicios**  
*Layout en Presentación:* `SPLIT_ARCHITECTURE`  

#### Contenido Proyectado en la Diapositiva

**Secuencia de Mantenimiento**
- 1. Cordon: `kubectl cordon <nodo>` marca el nodo como 'SchedulingDisabled'. Ningún Pod nuevo aterrizará en él.
- 2. Drain: `kubectl drain <nodo> --ignore-daemonsets` desaloja los Pods enviando SIGTERM y respetando PDBs.
- 3. Mantenimiento físico o del SO: Parcheo de kernel de Linux, actualización de BIOS o reboot del host.
- 4. Uncordon: `kubectl uncordon <nodo>` devuelve el nodo al estado Ready para volver a recibir cargas.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Guiar al administrador en la rutina de mantenimiento de nodos físicos o instancias cloud.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Nunca se debe apagar o reiniciar un nodo sin haber ejecutado `cordon` y `drain`. Drain contacta con la API de Eviction de Kubernetes, asegurando que las réplicas del Deployment se reubiquen ordenadamente en otros nodos antes de que el servidor se apague.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué la flag `--ignore-daemonsets` es casi siempre obligatoria al hacer drain?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque los DaemonSets no se pueden desalojar (Kubelet volvería a arrancarlos de inmediato en el mismo nodo).

---

### <a id="diapositiva-99-poddisruptionbudgets-pdb-la-barrera-de-proteccion"></a>Diapositiva #99: PodDisruptionBudgets (PDB): La Barrera de Protección

*Subtítulo:* **Garantizar que los drains y mantenimientos nunca violen la alta disponibilidad**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (pdb-critical-service.yaml):**

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: payments-pdb
  namespace: produccion
spec:
  minAvailable: 2             # Siempre debe haber al menos 2 vivos
  selector:
    matchLabels:
      app: payments-api
---
# Alternativa usando porcentaje:
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: frontend-pdb
  namespace: produccion
spec:
  maxUnavailable: "25%"       # Máximo 25% de pods caídos a la vez
  selector:
    matchLabels:
      app: web-frontend
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Enseñar a blindar aplicaciones contra intervenciones de mantenimiento mediante PodDisruptionBudgets.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Si un administrador (o un script automático de actualización) intenta hacer drain de un nodo donde corre una réplica y solo queda 1 réplica viva de un Deployment con `minAvailable: 2`, el comando `kubectl drain` se pausará y esperará hasta que otra réplica esté Ready en otro nodo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué diferencia hay entre una disrupción voluntaria (drain) y una disrupción involuntaria (fallo de hardware)?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Los PDBs protegen contra disrupciones voluntarias (drain, cluster autoscaler downscaling); no pueden evitar un fallo de hardware súbito.

---

### <a id="diapositiva-100-actualizacion-de-version-del-cluster-con-kubeadm"></a>Diapositiva #100: Actualización de Versión del Clúster con Kubeadm

*Subtítulo:* **Secuencia estricta paso a paso con cero tiempo de inactividad**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**1. Regla de Skew de Versiones**
- Kubernetes solo soporta saltos de UNA versión menor a la vez (ej: de v1.28 a v1.29, luego a v1.30).
- PROHIBIDO saltar de v1.28 a v1.30 directamente.
- Kubelet nunca puede ser más reciente que kube-apiserver.

**2. Actualizar el Primer Control Plane**
- `sudo apt-get update && sudo apt-get install -y --allow-change-held-packages kubeadm=1.29.x-1.1`.
- `sudo kubeadm upgrade plan` -> Analiza el clúster y valida compatibilidad.
- `sudo kubeadm upgrade apply v1.29.x` -> Actualiza certificados y static pods.
- `sudo apt-get install -y kubelet=1.29.x-1.1 kubectl=1.29.x-1.1 && sudo systemctl restart kubelet`.

**3. Actualizar Nodos Workers**
- Drenar nodo: `kubectl drain <worker-node> --ignore-daemonsets`.
- Actualizar binario `kubeadm` y ejecutar: `sudo kubeadm upgrade node`.
- Actualizar `kubelet` y `kubectl`, y reiniciar: `sudo systemctl restart kubelet`.
- Reincorporar tráfico: `kubectl uncordon <worker-node>`. Repetir nodo a nodo.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Detallar el procedimiento estándar de examen CKA y producción para actualizar clústeres creados con kubeadm.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El Control Plane se actualiza siempre primero. Durante los 2 minutos que tarda en actualizarse el Control Plane, los Workers siguen ejecutando los Pods sin interrupción. Luego los workers se actualizan uno a uno drenándolos previamente.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Por qué `kubeadm upgrade node` en los workers no necesita la flag `apply`?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Porque los workers no tienen etcd ni static pods de control plane; solo ajustan la configuración del kubelet.

---

### <a id="diapositiva-101-backup-de-etcd-la-base-de-datos-del-cluster"></a>Diapositiva #101: Backup de etcd: La Base de Datos del Clúster

*Subtítulo:* **Proteger el cerebro de Kubernetes contra corrupciones o desastres**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**¿Por Qué el Backup de etcd es Sagrado?**
- etcd almacena TODO: secretos, certificados, deployments, configuraciones de red y estados.
- Si etcd se corrompe o se destruyen los discos del Control Plane, el clúster entero deja de existir.
- Un backup diario de etcd permite reconstruir el clúster completo en minutos.

**La Herramienta Oficial: etcdctl**
- Herramienta CLI de gestión de etcd (cliente v3 de la API).
- Requiere autenticación TLS mutual estricta mediante certificados de cliente.
- Certificados en Kubeadm: `/etc/kubernetes/pki/etcd/`.

**El Comando Snapshot Save**
- `ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \`
- `--cacert=/etc/kubernetes/pki/etcd/ca.crt \`
- `--cert=/etc/kubernetes/pki/etcd/server.crt \`
- `--key=/etc/kubernetes/pki/etcd/server.key \`
- `snapshot save /backup/etcd-snapshot-$(date +%Y%m%d).db`

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Aprender a realizar una copia de seguridad consistente de etcd usando certificados criptográficos.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Hacer un backup de etcd no interrumpe el servicio del clúster; Raft permite generar un snapshot consistente en caliente mientras el clúster sigue atendiendo peticiones.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cómo podemos comprobar que el fichero `.db` de snapshot no está corrupto antes de guardarlo en un storage externo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Ejecutar `ETCDCTL_API=3 etcdctl snapshot status <fichero.db>` para verificar el hash y el número de revisión.

---

### <a id="diapositiva-102-restauracion-de-etcd-paso-a-paso"></a>Diapositiva #102: Restauración de etcd Paso a Paso

*Subtítulo:* **Procedimiento de recuperación ante desastres en el nodo Control Plane**  
*Layout en Presentación:* `YAML_ANALYSIS`  

#### Contenido Proyectado en la Diapositiva

**Manifiesto / Comandos (etcd-restore-procedure.sh):**

```yaml
# 1. Restaurar snapshot a un nuevo directorio
sudo ETCDCTL_API=3 etcdctl \
  --data-dir=/var/lib/etcd-restored \
  snapshot restore /backup/etcd-snapshot.db

# 2. Modificar el static pod de etcd
# En /etc/kubernetes/manifests/etcd.yaml:
# Modificar los dos puntos donde aparece hostPath:
#
# volumes:
# - name: etcd-data
#   hostPath:
#     path: /var/lib/etcd-restored    # Nueva ruta
#     type: DirectoryOrCreate
#
# 3. Kubelet detecta la modificación y reinicia etcd:
docker ps | grep etcd || crictl ps | grep etcd
kubectl get nodes
```

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Guiar paso a paso la restauración de etcd, una de las pruebas más exigentes del examen CKA y de los simulacros de desastre.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El error común es intentar restaurar sobre `/var/lib/etcd` con el proceso corriendo. El procedimiento correcto es siempre restaurar a un directorio limpio `/var/lib/etcd-restored` y luego cambiar el volumen en el manifiesto estático.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué sucede con los recursos creados después de la fecha en que se tomó el snapshot?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Se perderán, volviendo el clúster exactamente al estado del momento de la instantánea.

---

### <a id="diapositiva-103-checklist-de-salud-y-hardening-para-produccion"></a>Diapositiva #103: Checklist de Salud y Hardening para Producción

*Subtítulo:* **Las diez comprobaciones obligatorias para el administrador de Kubernetes**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Certificados y Clúster**
- Comprobar caducidad de certificados PKI: `kubeadm certs check-expiration`.
- Rotar certificados antes de cumplir el año: `kubeadm certs renew all`.
- Verificar que la versión de Kubernetes no esté en End-Of-Life (EOL).

**Cargas de Trabajo (Workloads)**
- El 100% de los Pods tienen `requests` y `limits` configurados.
- Todas las aplicaciones web tienen sondas de Liveness y Readiness configuradas con timeouts holgados.
- Los Deployments críticos tienen réplicas >= 2 con PodDisruptionBudgets activos.

**Seguridad y Auditoría**
- Auditoría CIS Benchmark con herramientas como `kube-bench`.
- Escaneo de vulnerabilidades de imágenes en CI/CD con Trivy.
- Políticas de red Default-Deny aplicadas en todos los namespaces de producción.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Resumir las mejores prácticas operativas en un checklist accionable para los administradores del curso.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Un administrador excelente no es el que apaga fuegos rápido, sino el que evita los fuegos mediante este checklist preventivo.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos clústeres conocéis que hayan caído en producción porque vencieron los certificados de 1 año de kubeadm?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Configurar un cronjob o alerta en Prometheus para avisar cuando los certificados de `/etc/kubernetes/pki` tengan menos de 30 días de vida.

---

## Conclusiones y Hoja de Ruta

### <a id="diapositiva-104-conclusiones-y-hoja-de-ruta"></a>Diapositiva #104: Conclusiones y Hoja de Ruta

*Subtítulo:* **Certificaciones CNCF (CKA / CKS), Herramientas Avanzadas y Próximos Pasos**  
*Layout en Presentación:* `COVER`  

#### Contenido Proyectado en la Diapositiva

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Cerrar el curso consolidando los conocimientos y orientando a los alumnos hacia la certificación oficial.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> A lo largo de estas 30 horas hemos cubierto el 100% de los dominios técnicos de administración, seguridad y observabilidad de Kubernetes. El siguiente paso natural para validar estas competencias es certificar como Certified Kubernetes Administrator (CKA).

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Cuántos de vosotros tenéis como objetivo presentaros al examen oficial CKA en los próximos meses?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Aprovechar para resolver las últimas dudas abiertas sobre los ejercicios prácticos.

---

### <a id="diapositiva-105-resumen-de-competencias-adquiridas"></a>Diapositiva #105: Resumen de Competencias Adquiridas

*Subtítulo:* **Los diez hitos técnicos dominados a lo largo de las 30 horas formativas**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Arquitectura y Core**
- Dominio del Control Plane (etcd, apiserver, scheduler, controller-manager).
- Instalación de clústeres reales multi-nodo con Kubeadm y configuración de CNI.
- Gestión declarativa de Workloads (Deployments, StatefulSets y DaemonSets).

**Red y Almacenamiento**
- Enrutamiento L4/L7 con Services, Endpoints, Ingress Nginx y CoreDNS.
- Persistencia dinámica desacoplada con CSI, StorageClasses y servidores NFS.
- Gestión de certificados TLS automáticos con Cert-Manager.

**Seguridad y Hardening**
- Control de accesos estricto con RBAC de mínimo privilegio.
- Microsegmentación Zero-Trust con NetworkPolicies.
- Blindaje de contenedores con SecurityContexts y External Secrets.

**Operaciones y Troubleshooting**
- Observabilidad completa con Prometheus, Grafana y agregación de logs.
- Triage metódico de fallos (CrashLoopBackOff, Pending, OOMKilled).
- Actualizaciones de versión sin downtime y Disaster Recovery con backup de etcd.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Hacer un repaso panorámico de todo lo aprendido para afianzar la confianza del alumno en sus nuevas capacidades.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> Es fundamental recordar que la administración de Kubernetes no se basa en memorizar YAMLs, sino en entender la arquitectura: reconciliación continua, bucles de control y el estado inmutable en etcd.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Qué módulo os ha parecido el más revelador o aplicable de forma inmediata a vuestro trabajo?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Animar a los alumnos a conservar los manifiestos creados en el repositorio como librería de referencia rápida.

---

### <a id="diapositiva-106-hoja-de-ruta-de-certificacion-cka-y-cks"></a>Diapositiva #106: Hoja de Ruta de Certificación: CKA y CKS

*Subtítulo:* **Exámenes prácticos de laboratorio en terminal real de la Linux Foundation**  
*Layout en Presentación:* `COMPARISON`  

#### Contenido Proyectado en la Diapositiva

**Opción A: CKA: Certified Kubernetes Administrator** (Administración (Paso 1))
- Examen 100% práctico en consola (2 horas, ~17 preguntas interactivas).
- Troubleshooting (30% del peso del examen).
- Cluster Architecture, Installation & Config (25%).
- Services & Networking (20%).
- Storage (10%) y Workloads & Scheduling (15%).
- Este curso cubre el 100% del temario exigido en el CKA.

**Opción B: CKS: Certified Kubernetes Security Specialist** (Especialización en Seguridad (Paso 2))
- Prerrequisito obligatorio: Certificación CKA vigente.
- Cluster Setup & Hardening: RBAC y API server (15%).
- Cluster Hardening: KMS provider y CIS benchmarks (15%).
- System Hardening: Perfiles AppArmor y Seccomp (15%).
- Microservice Vulnerabilities: PSS y NetworkPolicies (20%).
- Supply Chain & Monitoring: Falco, Trivy y Sysdig (20%).

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Guiar a los alumnos con consejos tácticos para preparar y superar los exámenes CKA y CKS.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> El examen CKA no es tipo test: es un terminal de Linux real con clústeres donde tienes que arreglar fallos, actualizar nodos con kubeadm, restaurar backups de etcd y escribir YAMLs contra el reloj. La velocidad con `kubectl` y el uso de generadores imperativos (`--dry-run=client -o yaml`) es clave.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Conocéis los simuladores oficiales de Killer.sh que se incluyen gratis al comprar el voucher del examen?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> Killer.sh es más difícil que el examen real: si sacáis más de un 60% en Killer.sh, el aprobado en el CKA real está prácticamente garantizado.

---

### <a id="diapositiva-107-herramientas-indispensables-y-recursos-recomendados"></a>Diapositiva #107: Herramientas Indispensables y Recursos Recomendados

*Subtítulo:* **El kit de herramientas profesional para el día a día del administrador**  
*Layout en Presentación:* `CARDS_GRID`  

#### Contenido Proyectado en la Diapositiva

**Herramientas CLI Imprescindibles**
- `k9s`: Panel interactivo para terminal que multiplica por diez la velocidad de navegación entre recursos y logs.
- `kubectx` y `kubens`: Cambio instantáneo entre clústeres y namespaces sin editar archivos.
- `kube-ps1`: Prompt de shell con el contexto y namespace activo para evitar errores en producción.

**Auditoría y Linter**
- `popeye`: Escáner en tiempo real que detecta recursos huérfanos, pods sin limits y fallos de configuración.
- `kube-bench`: Comprobación automatizada del CIS Kubernetes Benchmark para hardening del sistema operativo.
- `trivy`: Escaneo instantáneo de vulnerabilidades en imágenes y manifiestos.

**Documentación y Comunidad**
- Documentación Oficial: `kubernetes.io/docs` (única web permitida durante el examen CKA).
- Simulador de Laboratorios: Killercoda (`killercoda.com/playgrounds/scenario/kubernetes`).
- Comunidad: Kubernetes Slack oficial (`slack.k8s.io`) y canales de CNCF en español.

#### Guía Pedagógica para el Docente

> **[OBJETIVO PEDAGÓGICO]**  
> Despedir el curso equipando a los alumnos con las mejores herramientas del ecosistema y vías de soporte comunitario.

> **[EXPLICACIÓN TÉCNICA DE BAJO NIVEL]**  
> La formación no termina con estas 30 horas. El ecosistema evoluciona a un ritmo vertiginoso. Dominar herramientas de consola como `k9s` y consultar la documentación oficial de forma ágil marcará la diferencia en vuestra carrera como ingenieros de plataforma.

> **[PREGUNTA DE INTERACCIÓN / DINÁMICA DE CLASE]**  
> *"¿Alguna duda final o consulta sobre los temas vistos durante el curso?"*

> **[GUÍA DE LABORATORIO / GOTCHA DE PRODUCCIÓN]**  
> ¡Enhorabuena a todos por completar las 30 horas del curso de Administración de Kubernetes!

---

