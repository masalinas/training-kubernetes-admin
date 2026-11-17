// generator/modules/m10_wrapup.js
// Módulo 10: Conclusiones, Certificaciones (CKA/CKS) y Recursos (4 diapositivas)

module.exports = {
  id: "m10",
  title: "Conclusiones y Hoja de Ruta",
  slides: [
    {
      id: "m10-01-cover",
      layout: "COVER",
      badge: "MÓDULO 10 • CIERRE Y EVALUACIÓN",
      title: "Conclusiones y Hoja de Ruta",
      subtitle: "Certificaciones CNCF (CKA / CKS), Herramientas Avanzadas y Próximos Pasos",
      meta: [
        { label: "CURSO COMPLETADO", value: "30 Horas Lectivas" },
        { label: "CERTIFICACIÓN", value: "Alineado con CKA y CKS" },
        { label: "NIVEL ALCANZADO", value: "Administrador Profesional" },
      ],
      notes: {
        objetivo: "Cerrar el curso consolidando los conocimientos y orientando a los alumnos hacia la certificación oficial.",
        explicacion: "A lo largo de estas 30 horas hemos cubierto el 100% de los dominios técnicos de administración, seguridad y observabilidad de Kubernetes. El siguiente paso natural para validar estas competencias es certificar como Certified Kubernetes Administrator (CKA).",
        interaccion: "¿Cuántos de vosotros tenéis como objetivo presentaros al examen oficial CKA en los próximos meses?",
        labGotcha: "Aprovechar para resolver las últimas dudas abiertas sobre los ejercicios prácticos.",
      },
    },
    {
      id: "m10-02-summary-skills",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 10 • BALANCE DEL CURSO",
      title: "Resumen de Competencias Adquiridas",
      subtitle: "Los diez hitos técnicos dominados a lo largo de las 30 horas formativas",
      cards: [
        {
          title: "Arquitectura y Core",
          items: [
            "Dominio del Control Plane (etcd, apiserver, scheduler, controller-manager).",
            "Instalación de clústeres reales multi-nodo con Kubeadm y configuración de CNI.",
            "Gestión declarativa de Workloads (Deployments, StatefulSets y DaemonSets).",
          ],
        },
        {
          title: "Red y Almacenamiento",
          items: [
            "Enrutamiento L4/L7 con Services, Endpoints, Ingress Nginx y CoreDNS.",
            "Persistencia dinámica desacoplada con CSI, StorageClasses y servidores NFS.",
            "Gestión de certificados TLS automáticos con Cert-Manager.",
          ],
        },
        {
          title: "Seguridad y Hardening",
          items: [
            "Control de accesos estricto con RBAC de mínimo privilegio.",
            "Microsegmentación Zero-Trust con NetworkPolicies.",
            "Blindaje de contenedores con SecurityContexts y External Secrets.",
          ],
        },
        {
          title: "Operaciones y Troubleshooting",
          items: [
            "Observabilidad completa con Prometheus, Grafana y agregación de logs.",
            "Triage metódico de fallos (CrashLoopBackOff, Pending, OOMKilled).",
            "Actualizaciones de versión sin downtime y Disaster Recovery con backup de etcd.",
          ],
        },
      ],
      notes: {
        objetivo: "Hacer un repaso panorámico de todo lo aprendido para afianzar la confianza del alumno en sus nuevas capacidades.",
        explicacion: "Es fundamental recordar que la administración de Kubernetes no se basa en memorizar YAMLs, sino en entender la arquitectura: reconciliación continua, bucles de control y el estado inmutable en etcd.",
        interaccion: "¿Qué módulo os ha parecido el más revelador o aplicable de forma inmediata a vuestro trabajo?",
        labGotcha: "Animar a los alumnos a conservar los manifiestos creados en el repositorio como librería de referencia rápida.",
      },
    },
    {
      id: "m10-03-certification-roadmap",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 10 • CERTIFICACIONES CNCF",
      title: "Hoja de Ruta de Certificación: CKA y CKS",
      subtitle: "Exámenes prácticos de laboratorio en terminal real de la Linux Foundation",
      optionA: {
        tag: "Administración (Paso 1)",
        title: "CKA: Certified Kubernetes Administrator",
        isRecommended: true,
        items: [
          "Examen 100% práctico en consola (2 horas, ~17 preguntas interactivas).",
          "Troubleshooting (30% del peso del examen).",
          "Cluster Architecture, Installation & Config (25%).",
          "Services & Networking (20%).",
          "Storage (10%) y Workloads & Scheduling (15%).",
          "Este curso cubre el 100% del temario exigido en el CKA.",
        ],
      },
      optionB: {
        tag: "Especialización en Seguridad (Paso 2)",
        title: "CKS: Certified Kubernetes Security Specialist",
        isRecommended: false,
        items: [
          "Prerrequisito obligatorio: Certificación CKA vigente.",
          "Cluster Setup & Hardening: RBAC y API server (15%).",
          "Cluster Hardening: KMS provider y CIS benchmarks (15%).",
          "System Hardening: Perfiles AppArmor y Seccomp (15%).",
          "Microservice Vulnerabilities: PSS y NetworkPolicies (20%).",
          "Supply Chain & Monitoring: Falco, Trivy y Sysdig (20%).",
        ],
      },
      notes: {
        objetivo: "Guiar a los alumnos con consejos tácticos para preparar y superar los exámenes CKA y CKS.",
        explicacion: "El examen CKA no es tipo test: es un terminal de Linux real con clústeres donde tienes que arreglar fallos, actualizar nodos con kubeadm, restaurar backups de etcd y escribir YAMLs contra el reloj. La velocidad con `kubectl` y el uso de generadores imperativos (`--dry-run=client -o yaml`) es clave.",
        interaccion: "¿Conocéis los simuladores oficiales de Killer.sh que se incluyen gratis al comprar el voucher del examen?",
        labGotcha: "Killer.sh es más difícil que el examen real: si sacáis más de un 60% en Killer.sh, el aprobado en el CKA real está prácticamente garantizado.",
      },
    },
    {
      id: "m10-04-resources-tools",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 10 • RECURSOS Y COMUNIDAD",
      title: "Herramientas Indispensables y Recursos Recomendados",
      subtitle: "El kit de herramientas profesional para el día a día del administrador",
      cards: [
        {
          title: "Herramientas CLI Imprescindibles",
          items: [
            "`k9s`: Panel interactivo para terminal que multiplica por diez la velocidad de navegación entre recursos y logs.",
            "`kubectx` y `kubens`: Cambio instantáneo entre clústeres y namespaces sin editar archivos.",
            "`kube-ps1`: Prompt de shell con el contexto y namespace activo para evitar errores en producción.",
          ],
        },
        {
          title: "Auditoría y Linter",
          items: [
            "`popeye`: Escáner en tiempo real que detecta recursos huérfanos, pods sin limits y fallos de configuración.",
            "`kube-bench`: Comprobación automatizada del CIS Kubernetes Benchmark para hardening del sistema operativo.",
            "`trivy`: Escaneo instantáneo de vulnerabilidades en imágenes y manifiestos.",
          ],
        },
        {
          title: "Documentación y Comunidad",
          items: [
            "Documentación Oficial: `kubernetes.io/docs` (única web permitida durante el examen CKA).",
            "Simulador de Laboratorios: Killercoda (`killercoda.com/playgrounds/scenario/kubernetes`).",
            "Comunidad: Kubernetes Slack oficial (`slack.k8s.io`) y canales de CNCF en español.",
          ],
        },
      ],
      notes: {
        objetivo: "Despedir el curso equipando a los alumnos con las mejores herramientas del ecosistema y vías de soporte comunitario.",
        explicacion: "La formación no termina con estas 30 horas. El ecosistema evoluciona a un ritmo vertiginoso. Dominar herramientas de consola como `k9s` y consultar la documentación oficial de forma ágil marcará la diferencia en vuestra carrera como ingenieros de plataforma.",
        interaccion: "¿Alguna duda final o consulta sobre los temas vistos durante el curso?",
        labGotcha: "¡Enhorabuena a todos por completar las 30 horas del curso de Administración de Kubernetes!",
      },
    },
  ],
};
