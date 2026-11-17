// generator/modules/m05_scheduling.js
// Módulo 05: Gestión de Recursos y Programación (Scheduling) (10 diapositivas)

module.exports = {
  id: "m05",
  title: "Módulo 5: Gestión de Recursos y Programación (Scheduling)",
  slides: [
    {
      id: "m05-01-cover",
      layout: "COVER",
      badge: "MÓDULO 05 • GESTIÓN DE RECURSOS Y SCHEDULING",
      title: "Gestión de Recursos y Scheduling",
      subtitle: "Requests, Limits, QoS, Afinidad de Nodos/Pods y Taints/Tolerations",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "3 Horas" },
        { label: "ENTORNO LAB", value: "Minikube con Resource Limits" },
        { label: "OBJETIVO CLAVE", value: "Evitar vecinos ruidosos y controlar la ubicación de Pods" },
      ],
      notes: {
        objetivo: "Presentar los mecanismos de asignación de recursos y las reglas avanzadas del planificador (kube-scheduler).",
        explicacion: "El planificador de Kubernetes es el motor matemático que decide dónde colocar cada carga de trabajo. Si no se configuran Requests y Limits, un solo contenedor defectuoso puede saturar toda la memoria de un nodo físico y provocar caídas en cascada.",
        interaccion: "¿Habéis experimentado alguna vez una caída de servicio porque una aplicación consumió el 100% de la memoria de un servidor compartido?",
        labGotcha: "En Minikube podemos simular escenarios de saturación de recursos usando imágenes como `vish/stress`.",
      },
    },
    {
      id: "m05-02-noisy-neighbor",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • RECURSOS",
      title: "El Problema del 'Vecino Ruidoso' (Noisy Neighbor)",
      subtitle: "¿Qué sucede en un clúster de Kubernetes si no se definen límites?",
      cards: [
        {
          title: "Contención de CPU",
          items: [
            "Un proceso descontrolado con un bucle infinito (while true) consumirá el 100% de los cores del nodo.",
            "Los demás contenedores en el mismo host experimentarán retrasos masivos (latencia en peticiones HTTP).",
            "La CPU es un recurso compresible: los procesos se ralentizan pero no mueren.",
          ],
        },
        {
          title: "Agotamiento de Memoria (RAM)",
          items: [
            "La memoria es un recurso incompresible: no se puede 'ralentizar' la asignación de RAM.",
            "Si los contenedores consumen toda la RAM física y la swap está desactivada, el kernel de Linux activa el OOM Killer.",
            "El kernel matará procesos arbitrarios para evitar el bloqueo del sistema operativo.",
          ],
        },
        {
          title: "Decisiones a Ciegas del Scheduler",
          items: [
            "Sin `requests`, el Scheduler asume que un Pod consume 0 CPU y 0 Memoria.",
            "Programará 200 Pods en el mismo nodo hasta colapsar el host, mientras otros nodos del clúster permanecen totalmente vacíos.",
          ],
        },
      ],
      notes: {
        objetivo: "Sensibilizar sobre el peligro inminente de desplegar cargas sin `requests` y `limits`.",
        explicacion: "En Kubernetes, configurar `requests` no es opcional: es el dato que utiliza el Scheduler para calcular la capacidad disponible en cada nodo. Si no hay requests, el Scheduler está 'ciego'.",
        interaccion: "¿Es preferible que una aplicación sufra estrangulamiento de CPU (throttling) o que muera por OOMKilled?",
        labGotcha: "El throttling causa lentitud; el OOMKilled causa reinicio inmediato con código de salida 137.",
      },
    },
    {
      id: "m05-03-requests-vs-limits",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 05 • KERNEL CGROUPS",
      title: "Requests vs Limits a Nivel de Kernel",
      subtitle: "Diferencias fundamentales entre reserva para el Scheduler y tope de cgroups",
      optionA: {
        tag: "Para el Planificador (Scheduling)",
        title: "Requests (Garantía)",
        isRecommended: true,
        items: [
          "Cantidad mínima de CPU y Memoria que el Pod tiene garantizada para arrancar.",
          "Utilizado exclusivamente por el `kube-scheduler` para decidir en qué nodo cabe el Pod.",
          "Suma de requests de los Pods en un nodo nunca puede superar la capacidad física del nodo.",
          "Mapeo en el kernel de Linux: `cpu.shares` (prioridad relativa en el planificador CFS).",
          "Regla de oro: Configurar siempre requests basados en el consumo real medido en producción.",
        ],
      },
      optionB: {
        tag: "Para el Host (Enforcement)",
        title: "Limits (Tope Máximo)",
        isRecommended: false,
        items: [
          "Cantidad máxima absoluta de recursos que el contenedor tiene permitido consumir.",
          "CPU Limit: Implementado con `cpu.cfs_quota_us` de Linux. Si se supera, el kernel aplica Throttling.",
          "Memory Limit: Implementado con `memory.limit_in_bytes`. Si se supera, el kernel ejecuta OOMKilled (Exit Code 137).",
          "Previene que una fuga de memoria hunda el nodo físico.",
        ],
      },
      notes: {
        objetivo: "Desmitificar el funcionamiento técnico de requests y limits en el kernel de Linux.",
        explicacion: "La CPU se mide en unidades millicores (1000m = 1 vCPU). La memoria se mide en bytes o mebibytes (Mi = 1024^2, M = 1000^2). Cuando un contenedor alcanza su límite de CPU, no se reinicia; simplemente sus ciclos de reloj se pausan durante periodos de 100ms.",
        interaccion: "¿Por qué en muchas arquitecturas modernas de microservicios se recomienda fijar memory limit pero NO fijar cpu limit?",
        labGotcha: "Porque el CPU Throttling puede provocar degradaciones severas e invisibles de latencia (colas de microsegundos) incluso cuando el nodo tiene CPU ociosa.",
      },
    },
    {
      id: "m05-04-qos-classes",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • QOS CLASSES",
      title: "Clases de Calidad de Servicio (QoS Classes)",
      subtitle: "Cómo prioriza Kubernetes qué Pods matar cuando un nodo entra en presión de memoria",
      cards: [
        {
          title: "Guaranteed (Prioridad Máxima)",
          items: [
            "Condición: Todos los contenedores tienen `requests == limits` tanto en CPU como en Memoria.",
            "Garantía absoluta: Son los ÚLTIMOS en ser purgados en caso de escasez de recursos en el nodo.",
            "Puntuación oom_score_adj: -997 (casi inmunes al OOM Killer de Linux).",
            "Uso: Bases de datos críticas, colas de mensajería y servicios core.",
          ],
        },
        {
          title: "Burstable (Prioridad Media)",
          items: [
            "Condición: Tienen `requests` definidos, y `requests < limits` (o solo tienen requests pero no limits).",
            "Pueden consumir recursos ociosos del nodo hasta alcanzar su límite.",
            "Puntuación oom_score_adj: Proporcional a la memoria consumida por encima de su request.",
            "Uso: El 90% de los microservicios web y APIs convencionales.",
          ],
        },
        {
          title: "BestEffort (Prioridad Mínima)",
          items: [
            "Condición: No tienen definido NINGÚN request ni limit.",
            "Son los PRIMEROS en ser purgados (eviction inmediata) ante la menor presión de memoria en el nodo.",
            "Puntuación oom_score_adj: 1000 (máxima prioridad para el OOM Killer).",
            "Uso: Tareas batch prescindibles o entornos de desarrollo.",
          ],
        },
      ],
      notes: {
        objetivo: "Entender el ranking de desalojo de Pods y cómo la configuración de recursos asigna automáticamente la clase de QoS.",
        explicacion: "La clase de QoS no se escribe manualmente en el YAML: Kubernetes la calcula automáticamente inspeccionando los valores de requests y limits. Conocer las clases de QoS es vital para garantizar que las bases de datos no mueran antes que los frontends en un incidente de memoria.",
        interaccion: "¿Qué clase de QoS recibirá un Pod que especifica `cpu requests: 100m` pero ningún valor para memoria?",
        labGotcha: "Respuesta: Recibirá `Burstable` (porque al menos un recurso tiene request definido).",
      },
    },
    {
      id: "m05-05-resource-limits-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 05 • MANIFIESTOS",
      title: "Manifiesto de Recursos y Políticas de Cuota",
      subtitle: "Definición en el Pod y gobernanza de clúster con LimitRange y ResourceQuota",
      leftTitle: "Gobernanza de Recursos",
      directives: [
        { field: "resources.requests", desc: "Reserva mínima para el planificador: cpu en 'm' (millicores) y memory en 'Mi/Gi'." },
        { field: "resources.limits", desc: "Límite máximo permitido en el cgroup del contenedor." },
        { field: "LimitRange", desc: "Objeto a nivel de namespace que inyecta valores por defecto si el desarrollador no los pone." },
        { field: "ResourceQuota", desc: "Límite total agregado para un namespace (ej: máx 10 CPUs y 32Gi RAM entre todos los Pods)." },
      ],
      filename: "resources-and-quotas.yaml",
      yamlCode: `apiVersion: v1
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
    pods: "20"`,
      notes: {
        objetivo: "Aprender a definir recursos en Pods y a proteger el clúster mediante LimitRanges y ResourceQuotas.",
        explicacion: "Si un administrador define un `ResourceQuota` en un namespace, Kubernetes EXIGIRÁ que absolutamente todos los Pods desplegados en ese namespace tengan requests y limits explícitos; de lo contrario, rechazará el despliegue con un error.",
        interaccion: "¿Qué herramienta nos ayuda si no sabemos qué requests ponerle a una aplicación nueva?",
        labGotcha: "Vertical Pod Autoscaler (VPA) en modo 'Off' (solo recomendaciones) o herramientas de observabilidad como Prometheus.",
      },
    },
    {
      id: "m05-06-nodeselector",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • SCHEDULING BÁSICO",
      title: "Selección Básica de Nodos: nodeSelector",
      subtitle: "El método más simple para dirigir Pods hacia máquinas específicas",
      cards: [
        {
          title: "Etiquetado de Nodos Físicos",
          items: [
            "Los nodos del clúster pueden recibir etiquetas clave-valor arbitrarias.",
            "Comando: `kubectl label nodes <nombre-nodo> disktype=ssd hardware=gpu`.",
            "Inspeccionar etiquetas existentes: `kubectl get nodes --show-labels`.",
          ],
        },
        {
          title: "Sintaxis de nodeSelector en el Pod",
          items: [
            "Se añade en `spec.nodeSelector: { disktype: 'ssd' }`.",
            "El Scheduler solo considerará nodos que tengan exactamente esas etiquetas con esos valores.",
            "Si ningún nodo coincide, el Pod permanece en estado `Pending` indefinidamente.",
          ],
        },
        {
          title: "Limitaciones de nodeSelector",
          items: [
            "Solo admite coincidencia exacta (AND estricto).",
            "No permite operadores lógicos complejos (OR, NOT, IN, Exists, >).",
            "No permite preferencias suaves ('intenta ponerlo aquí, pero si no cabe, ponlo en otro sitio').",
            "Para requisitos avanzados se utiliza Node Affinity.",
          ],
        },
      ],
      notes: {
        objetivo: "Conocer el mecanismo más directo de fijación de Pods a nodos y sus limitaciones de expresividad.",
        explicacion: "nodeSelector es ideal para particiones simples (ej: `environment: prod` o `tier: frontend`), pero para arquitecturas complejas con alta disponibilidad entre zonas se queda muy corto.",
        interaccion: "¿Qué ocurre con los Pods que ya estaban corriendo en un nodo si le quitamos la etiqueta que exigía su nodeSelector?",
        labGotcha: "Los Pods existentes NO se mueven; nodeSelector solo se evalúa en el momento del scheduling inicial.",
      },
    },
    {
      id: "m05-07-node-affinity-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 05 • AFINIDAD",
      title: "Afinidad de Nodos (Node Affinity)",
      subtitle: "Reglas duras (Required) y blandas (Preferred) con operadores booleanos",
      leftTitle: "Tipos de Afinidad de Nodos",
      directives: [
        { field: "requiredDuringScheduling...", desc: "Regla DURA (Hard): Si no se cumple en ningún nodo, el Pod NO se programa (Pending)." },
        { field: "preferredDuringScheduling...", desc: "Regla BLANDA (Soft): Intenta programar en los nodos con más peso (weight 1-100), pero acepta otros." },
        { field: "Operadores soportados", desc: "In, NotIn, Exists, DoesNotExist, Gt, Lt." },
        { field: "IgnoredDuringExecution", desc: "Si la etiqueta del nodo cambia después de arrancar el Pod, el Pod sigue corriendo." },
      ],
      filename: "node-affinity.yaml",
      yamlCode: `apiVersion: v1
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
    image: analytics:2.0`,
      notes: {
        objetivo: "Aprender a combinar reglas obligatorias y reglas de mejor esfuerzo mediante Node Affinity.",
        explicacion: "El planificador suma los 'pesos' (weight de 1 a 100) de todas las preferencias cumplidas para cada nodo candidato en la fase de Scoring. El nodo con la puntuación total más alta gana el Pod.",
        interaccion: "¿Qué operador usaríais si queréis que un Pod se ejecute en cualquier nodo EXCEPTO en nodos que tengan la etiqueta `mantenimiento: 'true'`?",
        labGotcha: "Respuesta: Usar el operador `NotIn: ['true']` o `DoesNotExist`.",
      },
    },
    {
      id: "m05-08-pod-affinity-antiaffinity",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • ALTA DISPONIBILIDAD",
      title: "Afinidad y Anti-Afinidad de Pods (Inter-Pod)",
      subtitle: "Ubicar Pods en función de los Pods vecinos que ya están corriendo",
      cards: [
        {
          title: "Pod Anti-Affinity (Alta Disponibilidad)",
          items: [
            "Regla: 'No pongas dos réplicas de este Pod en la misma máquina física o en la misma zona'.",
            "Garantiza que la caída de un servidor físico o un rack no tumbe el 100% de las réplicas del servicio.",
            "Crucial para cumplir los acuerdos de nivel de servicio (SLA) en producción.",
          ],
        },
        {
          title: "Pod Affinity (Co-localización y Baja Latencia)",
          items: [
            "Regla: 'Pon este microservicio web en el mismo nodo físico donde ya esté corriendo la caché Redis'.",
            "Elimina la latencia de red entre capas comunicándose mediante loopback local o sockets de host.",
          ],
        },
        {
          title: "El Parámetro topologyKey",
          items: [
            "Define el dominio de fallo geográfico o físico.",
            "`topologyKey: kubernetes.io/hostname` -> A nivel de servidor individual.",
            "`topologyKey: topology.kubernetes.io/zone` -> A nivel de Datacenter / Zona de disponibilidad Cloud.",
            "Advertencia de rendimiento: Requiere cómputo intensivo en clústeres de miles de nodos.",
          ],
        },
      ],
      notes: {
        objetivo: "Implementar estrategias de resiliencia física evitando puntos únicos de fallo mediante Anti-Afinidad.",
        explicacion: "En un Deployment con 3 réplicas en un clúster de 3 nodos, sin anti-afinidad el Scheduler podría perfectamente colocar los 3 Pods en el Nodo 1. Si el Nodo 1 se reinicia, el servicio cae completamente. Con Pod Anti-Affinity se fuerza a que cada réplica aterrice en un nodo distinto.",
        interaccion: "¿Qué ocurre si tenemos 3 réplicas con Pod Anti-Affinity HARD (required) pero nuestro clúster solo tiene 2 nodos?",
        labGotcha: "Dos réplicas arrancarán normalmente en los 2 nodos, y la tercera réplica se quedará atascada en `Pending`.",
      },
    },
    {
      id: "m05-09-taints-and-tolerations",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • RESTRICCIÓN DE NODOS",
      title: "Taints y Tolerations: Repulsión Selectiva de Nodos",
      subtitle: "Garantizar nodos dedicados para GPU, seguridad o mantenimiento",
      cards: [
        {
          title: "Concepto de Taint (La Mancha en el Nodo)",
          items: [
            "Un Taint se aplica a un NODO para REPELER Pods que no toleren explícitamente esa condición.",
            "Sintaxis: `kubectl taint nodes <nodo> clave=valor:Efecto`.",
            "El nodo 'dice': 'Nadie entra aquí a menos que tenga una Toleration específica'.",
          ],
        },
        {
          title: "Los Tres Efectos de Taints",
          items: [
            "NoSchedule: Ningún Pod nuevo entrará si no tiene la toleration. Los Pods que ya estaban corriendo NO se expulsan.",
            "PreferNoSchedule: El Scheduler intentará evitar el nodo, pero si no hay otra opción, lo colocará allí.",
            "NoExecute: Si el Pod no tiene la toleration, es EXPULSADO inmediatamente del nodo.",
          ],
        },
        {
          title: "Casos de Uso Típicos",
          items: [
            "Control Plane dedicado: Los masters tienen el taint `node-role.kubernetes.io/control-plane:NoSchedule` para evitar que los Pods de usuario compitan con etcd.",
            "Nodos GPU caros: Taint `hardware=gpu:NoSchedule` para que solo cargas de IA/ML utilicen esos nodos.",
            "Nodos en mantenimiento o con problemas de hardware.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la diferencia entre Afinidad (atraer pods hacia nodos) y Taints (repeler pods desde los nodos).",
        explicacion: "Regla mnemotécnica: Node Affinity es el Pod diciendo 'quiero ir a ese nodo'. Taint es el Nodo diciendo 'no quiero que nadie venga aquí salvo los autorizados'.",
        interaccion: "¿Por qué pudimos ejecutar Pods en el Master en Minikube pero no en Kubeadm por defecto?",
        labGotcha: "Porque Minikube elimina el taint del control plane para permitir clústeres de un solo nodo.",
      },
    },
    {
      id: "m05-10-eviction-node-pressure",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 05 • DESALOJO",
      title: "Evicciones de Pods y Presión de Nodo",
      subtitle: "Mecanismo defensivo de Kubelet para salvar la estabilidad del sistema operativo",
      cards: [
        {
          title: "Umbrales de Presión de Kubelet",
          items: [
            "Kubelet monitoriza activamente los recursos del nodo físico.",
            "Umbrales críticos por defecto:",
            "• `memory.available < 100Mi` (Memoria agotándose)",
            "• `nodefs.available < 10%` (Disco raíz casi lleno)",
            "• `imagefs.available < 15%` (Almacenamiento de imágenes lleno)",
          ],
        },
        {
          title: "El Proceso de Evicción (Desalojo)",
          items: [
            "Cuando se supera un umbral, el nodo pasa a estado `MemoryPressure` o `DiskPressure`.",
            "Kubelet no admite nuevos Pods y empieza a expulsar Pods existentes.",
            "Orden de expulsión:",
            "1º Pods de clase `BestEffort` que exceden sus peticiones.",
            "2º Pods de clase `Burstable` que más memoria consumen por encima de su request.",
            "3º Pods de clase `Guaranteed` (solo en caso extremo).",
          ],
        },
        {
          title: "Tolerations Temporales de Sistema",
          items: [
            "Kubernetes añade taints automáticos al nodo (`node.kubernetes.io/unreachable`).",
            "Los Pods tienen por defecto una tolerancia de 300 segundos (`tolerationSeconds: 300`).",
            "Si el nodo no se recupera en 5 minutos, el Control Plane marca los Pods como desalojados y los recrea en otros nodos sanos.",
          ],
        },
      ],
      notes: {
        objetivo: "Conocer cómo actúa Kubelet antes de que el kernel de Linux colapse por falta de memoria o disco.",
        explicacion: "La evicción de Kubelet es un proceso ordenado de gracia: intenta enviar SIGTERM y respetar el apagado limpio. El OOM Killer del kernel de Linux, por contra, es instantáneo y mata procesos con SIGKILL sin previo aviso.",
        interaccion: "¿Qué comando nos muestra si un nodo tiene activada la condición de MemoryPressure o DiskPressure?",
        labGotcha: "Ejecutar `kubectl describe node <nombre>` y consultar la sección 'Conditions:'.",
      },
    },
  ],
};
