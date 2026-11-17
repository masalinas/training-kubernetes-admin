// generator/modules/m00_intro.js
// Módulo 00: Bienvenida, Metodología y Entorno de Laboratorio (4 diapositivas)

module.exports = {
  id: "m00",
  title: "Introducción y Metodología",
  slides: [
    {
      id: "m00-01-cover",
      layout: "COVER",
      badge: "CURSO DE ADMINISTRACIÓN AVANZADA • 30 HORAS",
      title: "KUBERNETES ADMINISTRACIÓN",
      subtitle: "Clústeres, Seguridad y Observabilidad en Entornos Reales",
      meta: [
        { label: "DURACIÓN", value: "30 Horas Lectivas" },
        { label: "MODALIDAD", value: "Teórico-Práctica (40/60)" },
        { label: "PRERREQUISITOS", value: "Linux, Docker, YAML" },
      ],
      notes: {
        objetivo: "Presentar el curso, establecer el marco formativo de 30 horas y alinear expectativas con los alumnos sobre las competencias de administración real de clústeres.",
        explicacion: "Kubernetes no es solo un orquestador de contenedores; es una plataforma extensible de sistemas distribuidos declarativos. Durante este curso se abordará no solo el 'cómo usarlo', sino el 'cómo funciona por dentro': la reconciliación continua de estados, el modelo de datos en etcd, la red a bajo nivel y las operaciones críticas de producción.",
        interaccion: "¿Cuántos de vosotros habéis tenido experiencia previa administrando clústeres en producción o resolviendo incidentes complejos en Kubernetes?",
        labGotcha: "Asegurarse de que todos los alumnos dispongan de acceso a una terminal Linux o WSL2 con permisos de sudo para los laboratorios prácticos.",
      },
    },
    {
      id: "m00-02-objetivos",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 00 • INTRODUCCIÓN",
      title: "Objetivos Formativos del Curso",
      subtitle: "Cuatro pilares de especialización para el Administrador de Kubernetes",
      cards: [
        {
          title: "1. Arquitectura e Instalación",
          items: [
            "Comprender el ciclo de vida de los componentes del Control Plane y Worker Nodes.",
            "Desplegar un clúster desde cero con kubeadm y configurar el modelo de red CNI.",
            "Gestionar accesos, contextos y credenciales con Kubeconfig.",
          ],
        },
        {
          title: "2. Workloads, Red y Storage",
          items: [
            "Dominar Deployments, StatefulSets y DaemonSets con zero-downtime.",
            "Implementar exposición L4/L7 (Services, Ingress Controllers y CoreDNS).",
            "Aprovisionar almacenamiento persistente dinámico mediante CSI, PV y StorageClass.",
          ],
        },
        {
          title: "3. Seguridad y Hardening",
          items: [
            "Establecer control de acceso de mínimo privilegio con RBAC granular.",
            "Aislar tráfico interno con Network Policies (Zero-Trust).",
            "Endurecer Pods con SecurityContexts y gestionar secretos externamente.",
          ],
        },
        {
          title: "4. Observabilidad y Día 2",
          items: [
            "Configurar sondas de salud y stacks de métricas con Prometheus y Grafana.",
            "Depurar caídas complejas: CrashLoopBackOff, Pending y OOMKilled.",
            "Ejecutar tareas de Día 2: actualizaciones de versión y backup de etcd.",
          ],
        },
      ],
      notes: {
        objetivo: "Clarificar el mapa de competencias que el alumno dominará al finalizar las 30 horas de formación.",
        explicacion: "El temario está diseñado siguiendo los dominios de conocimiento requeridos en las certificaciones oficiales de la Cloud Native Computing Foundation (CKA y CKS), profundizando en escenarios reales de resolución de problemas.",
        interaccion: "¿Cuál de estos cuatro pilares consideráis que representa el mayor desafío en vuestras organizaciones actuales?",
        labGotcha: "Las prácticas están pensadas para cometer errores deliberados y aprender a diagnosticar y reparar los clústeres.",
      },
    },
    {
      id: "m00-03-laboratorios",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 00 • METODOLOGÍA",
      title: "Estrategia Dual de Laboratorio Práctico",
      subtitle: "Combinando rigor de producción con agilidad didáctica en el aula",
      optionA: {
        tag: "Módulo 1: Instalación Profunda",
        title: "Clúster Kubeadm en VirtualBox",
        isRecommended: false,
        items: [
          "2 Nodos virtuales (1 Control Plane + 1 Worker) sobre Linux Ubuntu.",
          "Configuración manual de red: bridges, desactivación de swap y parámetros sysctl.",
          "Instalación paso a paso de containerd, kubeadm, kubelet y CNI Calico/Flannel.",
          "Acompañado de la guía técnica oficial detallada paso a paso.",
          "Objetivo: Entender exactamente qué hace cada binario y socket del sistema.",
        ],
      },
      optionB: {
        tag: "Módulos 2 al 9: Práctica Ágil",
        title: "Laboratorios Ágiles con Minikube",
        isRecommended: true,
        items: [
          "Entorno de pruebas ligero, rápido de reiniciar y altamente reproducible.",
          "Despliegue inmediato de manifiestos YAML: Deployments, Services, Ingress, RBAC.",
          "Soporte de addons integrados: ingress, metrics-server, storage.",
          "Permite experimentar sin miedo a corromper la infraestructura base.",
          "Objetivo: Maximizar el tiempo dedicado a administrar recursos y resolver problemas.",
        ],
      },
      notes: {
        objetivo: "Explicar a los alumnos cómo se articularán las sesiones prácticas para optimizar el tiempo de aprendizaje.",
        explicacion: "Configurar un clúster de producción con kubeadm en máquinas virtuales es esencial para comprender la fontanería de red y certificados, pero reiniciar VMs cada vez ralentizaría los módulos de workloads y seguridad. Por ello, una vez dominado kubeadm en el Módulo 1, el trabajo diario con YAMLs y troubleshooting se apoya en minikube.",
        interaccion: "¿Habéis experimentado diferencias de comportamiento entre un entorno mononodo local y un clúster multi-nodo distribuido?",
        labGotcha: "En minikube recordar activar los addons `minikube addons enable ingress` y `minikube addons enable metrics-server` cuando lleguemos a los módulos correspondientes.",
      },
    },
    {
      id: "m00-04-roadmap",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 00 • TEMARIO",
      title: "Hoja de Ruta del Temario Oficial (9 Módulos)",
      subtitle: "Estructura modular en 3 bloques de aprendizaje progresivo",
      cards: [
        {
          title: "Bloque 1: Cimientos y Conectividad",
          items: [
            "M01: Arquitectura Profunda e Instalación con Kubeadm.",
            "M02: Gestión de Workloads y Ciclo de Vida del Pod.",
            "M03: Redes Avanzadas, Services, Ingress y CoreDNS.",
          ],
        },
        {
          title: "Bloque 2: Persistencia, Recursos y Seguridad",
          items: [
            "M04: Administración de Almacenamiento CSI, PV y PVC.",
            "M05: Gestión de Recursos, Requests/Limits y Scheduling.",
            "M06: Seguridad del Clúster: RBAC, NetworkPolicies y Hardening.",
          ],
        },
        {
          title: "Bloque 3: Observabilidad, Automatización y Día 2",
          items: [
            "M07: Observabilidad: Sondas, Prometheus, Grafana y Logs.",
            "M08: Automatización con Helm (Charts, Templates y Rollback).",
            "M09: Operaciones de Día 2: Autoscaling, Drains y Backup etcd.",
          ],
        },
      ],
      notes: {
        objetivo: "Situar al alumno en la secuencia lógica del temario oficial de 9 módulos.",
        explicacion: "Cada bloque construye sobre el anterior: no se puede entender NetworkPolicies sin comprender primero el CNI, ni se puede configurar HPA sin haber entendido Requests/Limits y metrics-server.",
        interaccion: "¿Tenéis algún caso de uso inmediato que queráis enfocar especialmente en alguno de los 9 módulos?",
        labGotcha: "Revisar los comandos que se utilizarán a lo largo del curso en la Guía del Docente.",
      },
    },
  ],
};
