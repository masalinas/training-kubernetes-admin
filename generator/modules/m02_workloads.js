// generator/modules/m02_workloads.js
// Módulo 02: Gestión de Workloads y Ciclo de Vida (11 diapositivas)

module.exports = {
  id: "m02",
  title: "Módulo 2: Gestión de Workloads y Ciclo de Vida",
  slides: [
    {
      id: "m02-01-cover",
      layout: "COVER",
      badge: "MÓDULO 02 • ORQUESTACIÓN DE CARGAS",
      title: "Gestión de Workloads y Ciclo de Vida",
      subtitle: "Deployments, StatefulSets, DaemonSets, Jobs y Estrategias de Actualización",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "3.5 Horas" },
        { label: "ENTORNO LAB", value: "Minikube Ágil" },
        { label: "OBJETIVO CLAVE", value: "Despliegues sin downtime y persistencia de estado" },
      ],
      notes: {
        objetivo: "Presentar las abstracciones de alto nivel que gestionan el ciclo de vida de los Pods en Kubernetes.",
        explicacion: "En producción raramente se crean Pods 'sueltos' (naked pods). Se utilizan controladores que garantizan autorreparación (self-healing), escalabilidad y actualizaciones progresivas.",
        interaccion: "¿Qué ocurre con un Pod individual si el nodo donde corre sufre un corte de alimentación físico?",
        labGotcha: "A partir de este módulo usaremos Minikube para crear y destruir rápidamente Deployments y observar el comportamiento de réplicas.",
      },
    },
    {
      id: "m02-02-pod-atomic",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • FUNDAMENTOS DE WORKLOADS",
      title: "El Pod: La Unidad Atómica de Cómputo",
      subtitle: "Patrones de diseño de contenedor único y multicontenedor",
      cards: [
        {
          title: "Espacios de Nombres Compartidos",
          items: [
            "Network Namespace: Todos los contenedores del Pod comparten la misma IP y localhost (127.0.0.1).",
            "IPC & UTS: Comunicación por memoria compartida y mismo hostname.",
            "Storage Volumes: Los volúmenes montados son accesibles por todos los contenedores del Pod.",
          ],
        },
        {
          title: "Init Containers (Inicializadores)",
          items: [
            "Se ejecutan en serie y deben completarse exitosamente antes de que arranquen los contenedores de la aplicación.",
            "Casos típicos: Esperar a que la base de datos esté accesible (`wait-for-it`), descargar certificados o pre-poblar datos en un volumen compartido (`emptyDir`).",
          ],
        },
        {
          title: "Patrones Multicontenedor",
          items: [
            "Sidecar: Extiende o mejora el contenedor principal (ej. exportador de métricas Prometheus o recolector de logs).",
            "Adapter: Homogeneiza salidas heterogéneas para monitorización centralizada.",
            "Ambassador: Actúa como proxy local simplificando la conexión a servicios externos.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la relación íntima entre contenedores dentro de un mismo Pod y la utilidad de los Init Containers.",
        explicacion: "Un Pod modela una 'máquina virtual lógica' donde múltiples procesos cooperan estrechamente. En Kubernetes 1.28+, los sidecars nativos se pueden definir mediante `initContainers` con `restartPolicy: Always`.",
        interaccion: "¿Cuándo deberíamos separar dos contenedores en Pods diferentes en lugar de juntarlos en el mismo Pod?",
        labGotcha: "Si un initContainer falla o entra en bucle, el Pod nunca pasará a estado Running y mostrará `Init:CrashLoopBackOff`.",
      },
    },
    {
      id: "m02-03-pod-lifecycle",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • CICLO DE VIDA",
      title: "Fases y Condiciones del Pod",
      subtitle: "Interpretación precisa del estado de salud según la API de Kubernetes",
      cards: [
        {
          title: "Fases del Pod (spec.status.phase)",
          items: [
            "Pending: Aceptado por API Server; a la espera de nodo o imágenes.",
            "Running: Enlazado a un nodo y al menos un contenedor en marcha.",
            "Succeeded: Todos los contenedores terminaron con éxito (código 0).",
            "Failed: Al menos un contenedor finalizó con código distinto de 0.",
            "Unknown: Sin comunicación con el Kubelet del nodo.",
          ],
        },
        {
          title: "Condiciones del Pod (status.conditions)",
          items: [
            "PodScheduled: El Scheduler ha asignado un nodo exitosamente.",
            "Initialized: Todos los initContainers han terminado con éxito.",
            "ContainersReady: Todos los contenedores han pasado su Readiness Probe.",
            "Ready: El Pod está apto para recibir tráfico de la red (Services).",
          ],
        },
        {
          title: "Políticas de Reinicio (restartPolicy)",
          items: [
            "Always (Por defecto en Deployments): Reinicia el contenedor si se cae.",
            "OnFailure: Solo reinicia si el contenedor termina con código de error (Jobs).",
            "Never: Nunca reinicia el contenedor tras finalizar.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a diferenciar las fases de alto nivel de las condiciones granulares del Pod para un diagnóstico rápido.",
        explicacion: "Muchos administradores confunden `Running` con `Ready`. Un Pod puede estar en fase `Running` (el proceso existe en Linux), pero su condición `Ready` puede ser `False` porque la base de datos aún no responde a la sonda. En ese caso, Kubernetes NO le enviará tráfico de red.",
        interaccion: "¿Qué diferencia práctica hay entre un Pod que está en estado CrashLoopBackOff y un Pod en estado Error?",
        labGotcha: "Inspeccionar siempre las condiciones con `kubectl describe pod <nombre>` en la sección 'Conditions:'.",
      },
    },
    {
      id: "m02-04-deployment-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 02 • WORKLOADS",
      title: "Deployments y ReplicaSets: Gestión Declarativa",
      subtitle: "El estándar para aplicaciones stateless con autorreparación y escalado",
      leftTitle: "Claves de la Especificación",
      directives: [
        { field: "replicas", desc: "Número deseado de réplicas de Pods en ejecución constante." },
        { field: "selector.matchLabels", desc: "Regla inmutable que vincula el Deployment con sus Pods gestionados." },
        { field: "template.metadata.labels", desc: "DEBE coincidir con matchLabels para que el controlador reconozca los Pods." },
        { field: "strategy.type", desc: "Estrategia de actualización: RollingUpdate (por defecto) o Recreate." },
        { field: "maxSurge / maxUnavailable", desc: "Porcentaje o número de Pods temporales adicionales o no disponibles durante el despliegue." },
      ],
      filename: "deployment-web.yaml",
      yamlCode: `apiVersion: apps/v1
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
        - containerPort: 80`,
      notes: {
        objetivo: "Entender cómo un Deployment utiliza un ReplicaSet por debajo para garantizar el estado deseado.",
        explicacion: "El Deployment no gestiona directamente los Pods. El Deployment crea un ReplicaSet con un hash en el nombre (ej. `nginx-deployment-7b89f8c65`). Es el ReplicaSet el que se encarga de crear o destruir Pods para igualar el número de réplicas deseadas.",
        interaccion: "¿Qué ocurre si cambiamos manualmente las labels de un Pod que pertenece a un Deployment?",
        labGotcha: "Respuesta: El Deployment 'pierde' el Pod (queda huérfano) y crea inmediatamente un nuevo Pod para restaurar las 3 réplicas.",
      },
    },
    {
      id: "m02-05-rollingupdate-vs-recreate",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 02 • ESTRATEGIAS",
      title: "Estrategias de Actualización: RollingUpdate vs Recreate",
      subtitle: "Garantizar disponibilidad continua frente a incompatibilidades de esquema",
      optionA: {
        tag: "Sin Inactividad (Por Defecto)",
        title: "RollingUpdate",
        isRecommended: true,
        items: [
          "Crea Pods de la nueva versión progresivamente mientras retira los antiguos.",
          "Cero tiempo de inactividad (Zero Downtime) para los usuarios finales.",
          "Requiere que la aplicación soporte versiones coexistentes (ej. v1 y v2 compartiendo la misma base de datos).",
          "Control fino con `maxSurge` (cuántos Pods extra crear) y `maxUnavailable` (cuántos pueden caer).",
          "Recomendado para APIs stateless, frontends y microservicios modernos.",
        ],
      },
      optionB: {
        tag: "Inactividad Controlada",
        title: "Recreate",
        isRecommended: false,
        items: [
          "Mata TODOS los Pods de la versión anterior a la vez antes de arrancar los nuevos.",
          "Introduce una ventana temporal de inactividad (Downtime).",
          "Evita que dos versiones de la aplicación se ejecuten al mismo tiempo contra la base de datos.",
          "Obligatorio si hay migraciones de base de datos destructivas y no retrocompatibles.",
          "Consumo de recursos constante (no requiere capacidad extra de CPU/Memoria en los nodos).",
        ],
      },
      notes: {
        objetivo: "Saber elegir entre RollingUpdate y Recreate según la arquitectura de datos de la aplicación.",
        explicacion: "En `RollingUpdate`, durante el tiempo que dura el despliegue, el Service enviará tráfico tanto a pods v1 como v2 de forma balanceada. Si la v2 cambia la firma de una cookie o una columna de base de datos sin retrocompatibilidad, la sesión del usuario fallará. Por eso la retrocompatibilidad hacia atrás es esencial.",
        interaccion: "¿Qué valores de `maxSurge` y `maxUnavailable` configuraríais para desplegar lo más rápido posible si tenemos capacidad de sobra en el clúster?",
        labGotcha: "Configurar `maxUnavailable: 0` y `maxSurge: 100%` duplica temporalmente los pods y acelera el despliegue con 0 downtime.",
      },
    },
    {
      id: "m02-06-rollout-undo",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • ROLLBACKS",
      title: "Historial de Revisiones y Rollbacks Inmediatos",
      subtitle: "Cómo revertir un despliegue fallido en cuestión de segundos",
      cards: [
        {
          title: "1. Monitorizar el Despliegue",
          items: [
            "`kubectl rollout status deployment/<nombre>`",
            "Bloquea la terminal o el pipeline de CI/CD hasta que el despliegue finaliza con éxito o supera el `progressDeadlineSeconds` (600s por defecto).",
          ],
        },
        {
          title: "2. Inspeccionar el Historial",
          items: [
            "`kubectl rollout history deployment/<nombre>`",
            "Muestra las diferentes revisiones generadas.",
            "Para ver el detalle de cambios de una revisión concreta: `kubectl rollout history deployment/<nombre> --revision=2`.",
          ],
        },
        {
          title: "3. Reversión Rápida (Rollback)",
          items: [
            "Revertir a la versión inmediatamente anterior: `kubectl rollout undo deployment/<nombre>`.",
            "Revertir a una revisión específica histórica: `kubectl rollout undo deployment/<nombre> --to-revision=1`.",
            "El Deployment reutiliza el ReplicaSet antiguo preexistente.",
          ],
        },
      ],
      notes: {
        objetivo: "Capacitar al administrador para auditar y revertir despliegues defectuosos sin tener que reescribir YAMLs.",
        explicacion: "Kubernetes guarda los ReplicaSets antiguos (por defecto los últimos 10, configurable con `revisionHistoryLimit`). Cuando ejecutamos `rollout undo`, el Deployment simplemente escala hacia arriba el ReplicaSet antiguo y escala a cero el nuevo. Por eso el rollback tarda apenas 2 o 3 segundos.",
        interaccion: "¿Qué ocurre con los ReplicaSets antiguos si `revisionHistoryLimit` está configurado en 0?",
        labGotcha: "Si está en 0, no se guarda historial y `kubectl rollout undo` no funcionará.",
      },
    },
    {
      id: "m02-07-statefulsets-theory",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • STATEFULSETS",
      title: "StatefulSets: Cargas con Estado e Identidad",
      subtitle: "Diseñado para bases de datos distribuidas (PostgreSQL, Kafka, Elasticsearch)",
      cards: [
        {
          title: "Identidad de Red Estable",
          items: [
            "Cada Pod recibe un índice ordinal predecible en su hostname: `web-0`, `web-1`, `web-2`.",
            "No cambia tras reinicios ni tras reprogramarse en otro nodo.",
            "Requiere un 'Headless Service' (`clusterIP: None`) que crea registros DNS dedicados para cada Pod.",
          ],
        },
        {
          title: "Persistencia Dedicada (PVC)",
          items: [
            "Utiliza `volumeClaimTemplates` en lugar de volúmenes compartidos.",
            "Cada Pod `web-N` recibe su propio disco persistente: `data-web-0`, `data-web-1`.",
            "Si el Pod `web-0` muere, su reemplazo se vincula exactamente al mismo disco `data-web-0`.",
          ],
        },
        {
          title: "Garantías de Orden y Despliegue",
          items: [
            "Despliegue y escalado secuencial: `web-0` debe estar 100% Ready antes de arrancar `web-1`.",
            "Escalado hacia abajo inverso: primero se destruye `web-2`, luego `web-1`.",
            "Configurable mediante `podManagementPolicy: OrderedReady` o `Parallel`.",
          ],
        },
        {
          title: "Políticas de Retención de Discos",
          items: [
            "Al reducir réplicas o borrar el StatefulSet, los PVCs NO se eliminan automáticamente para prevenir pérdida de datos catastrófica.",
            "El administrador debe borrar explícitamente los PVCs huérfanos.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender cuándo es imprescindible usar un StatefulSet en lugar de un Deployment.",
        explicacion: "En un Deployment, todos los pods son clones anónimos y fungibles (`app-7bc9-4x2kl`). En un clúster como Kafka o MongoDB réplica, necesitas saber con certeza quién es el nodo primario (`mongo-0`) y quiénes los secundarios (`mongo-1`, `mongo-2`). StatefulSet proporciona esa identidad fija de red y disco.",
        interaccion: "¿Por qué borrar un StatefulSet no borra sus PersistentVolumeClaims asociados?",
        labGotcha: "Es una medida de seguridad por diseño de Kubernetes: los datos son sagrados y solo se purgan por acción manual.",
      },
    },
    {
      id: "m02-08-statefulset-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 02 • STATEFULSETS",
      title: "StatefulSet en la Práctica: Manifiesto y Headless Service",
      subtitle: "Integración de Headless Service con volumeClaimTemplates",
      leftTitle: "Elementos Clave del Manifiesto",
      directives: [
        { field: "serviceName", desc: "Nombre del Headless Service que gobierna el dominio DNS del StatefulSet." },
        { field: "clusterIP: None", desc: "En el Service, desactiva la IP virtual para devolver directamente las IPs de los Pods." },
        { field: "volumeClaimTemplates", desc: "Genera automáticamente un PVC único por cada réplica del StatefulSet." },
        { field: "DNS Resoluble", desc: "Cada réplica es accesible como: <pod-name>.<serviceName>.<namespace>.svc.cluster.local." },
      ],
      filename: "statefulset-db.yaml",
      yamlCode: `apiVersion: apps/v1
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
          storage: 5Gi`,
      notes: {
        objetivo: "Analizar la sintaxis declarativa que vincula un StatefulSet con su Headless Service y sus plantillas de volumen.",
        explicacion: "El registro DNS resultante será `postgres-0.db-service.default.svc.cluster.local`. Gracias a esto, la aplicación cliente o las réplicas secundarias pueden conectarse directamente al nodo 0 sin pasar por un balanceador aleatorio.",
        interaccion: "¿Qué pasaría si intentamos usar un `emptyDir` o un `hostPath` compartido en un StatefulSet en lugar de `volumeClaimTemplates`?",
        labGotcha: "En Minikube, el provisionador por defecto `standard` (hostpath) creará automáticamente los volúmenes para las pruebas.",
      },
    },
    {
      id: "m02-09-daemonsets",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • DAEMONSETS",
      title: "DaemonSets: Un Pod en Cada Nodo del Clúster",
      subtitle: "Garantizar servicios de infraestructura y agentes de nodo",
      cards: [
        {
          title: "Casos de Uso Principales",
          items: [
            "Agentes de Recolección de Logs: Fluentd, Fluentbit, Promtail.",
            "Monitorización de Infraestructura: Node-Exporter, Datadog Agent.",
            "Networking del Clúster: CNI Plugins (kube-proxy, Calico-node, Flannel).",
            "Gestores de Almacenamiento Local: Ceph OSD, GlusterFS.",
          ],
        },
        {
          title: "Comportamiento Dinámico",
          items: [
            "Cuando se añade un nuevo nodo worker al clúster, el DaemonSetController programa automáticamente un Pod en él.",
            "Cuando un nodo es eliminado del clúster, sus Pods del DaemonSet son destruidos por el recolector de basura.",
          ],
        },
        {
          title: "Tolerancia de Nodos y Scheduling",
          items: [
            "Los DaemonSets suelen incluir tolerations para taints de sistema (`node-role.kubernetes.io/control-plane:NoSchedule`) si necesitan ejecutarse también en los masters.",
            "Desde K8s 1.12, los DaemonSets son gestionados por el scheduler por defecto (respetando afinidades).",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la función crítica de los DaemonSets para los servicios a nivel de host.",
        explicacion: "A diferencia de un Deployment donde se especifica `replicas: 5` sin importar en qué nodos caigan, en un DaemonSet el número de réplicas es siempre igual al número de nodos aptos del clúster. Si hay 10 nodos, habrá 10 pods.",
        interaccion: "¿Cómo podemos hacer que un DaemonSet se ejecute solo en nodos que tengan tarjetas GPU?",
        labGotcha: "Respuesta: Usar `spec.template.spec.nodeSelector: { gpu: 'nvidia' }`.",
      },
    },
    {
      id: "m02-10-jobs-and-cronjobs",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 02 • BATCH & CRON",
      title: "Jobs y CronJobs: Tareas Batch y Programadas",
      subtitle: "Ejecución de procesos finitos garantizando finalización exitosa",
      leftTitle: "Parámetros Clave de Control",
      directives: [
        { field: "schedule", desc: "Formato cron estándar ('0 2 * * *' = todos los días a las 02:00 AM)." },
        { field: "concurrencyPolicy", desc: "Allow (paralelo), Forbid (no lanzar si el anterior sigue vivo) o Replace." },
        { field: "backoffLimit", desc: "Número de reintentos antes de marcar el Job como fallido (default: 6)." },
        { field: "restartPolicy", desc: "En Jobs solo se permite 'OnFailure' o 'Never'." },
        { field: "successfulJobsHistoryLimit", desc: "Número de jobs terminados que se conservan para auditoría (default: 3)." },
      ],
      filename: "backup-cronjob.yaml",
      yamlCode: `apiVersion: batch/v1
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
            args: ["pg_dump -h db-service -U admin mydb > /backup/mydb.sql"]`,
      notes: {
        objetivo: "Explicar la diferencia entre cargas continuas (Deployments) y tareas batch de ejecución única o programada.",
        explicacion: "En un Deployment, si el proceso finaliza con código 0, Kubernetes asume que algo ha fallado y lo reinicia. En un Job, la salida con código 0 es la victoria: el Job pasa a `Completed` y ya no consume recursos de CPU.",
        interaccion: "¿Por qué es tan peligroso dejar `concurrencyPolicy: Allow` en un backup de base de datos pesado?",
        labGotcha: "Si un backup tarda 20 minutos y el cronjob se ejecuta cada 15, con `Allow` se acumularán procesos consumiendo IOPS y colapsando el servidor.",
      },
    },
    {
      id: "m02-11-graceful-shutdown",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 02 • CICLO DE VIDA",
      title: "Ciclo de Terminación del Pod: Cierre Limpio",
      subtitle: "Secuencia de pasos para evitar pérdida de peticiones en vuelo",
      cards: [
        {
          title: "1. Desvinculación de Red (Endpoints)",
          items: [
            "El API Server marca el Pod en estado `Terminating`.",
            "EndpointSlice controller retira la IP del Pod del Service.",
            "kube-proxy elimina las reglas de enrutamiento en los nodos.",
            "A partir de este instante, ninguna petición nueva llega al Pod.",
          ],
        },
        {
          title: "2. Ejecución de preStop Hook y SIGTERM",
          items: [
            "Si está configurado, kubelet ejecuta el hook `preStop` en el contenedor.",
            "A continuación, kubelet envía la señal `SIGTERM` (PID 1).",
            "La aplicación debe dejar de aceptar peticiones nuevas y completar las peticiones en curso.",
          ],
        },
        {
          title: "3. Tiempo de Gracia y SIGKILL",
          items: [
            "`terminationGracePeriodSeconds` (por defecto: 30 segundos).",
            "Si la aplicación no ha finalizado tras cumplirse este tiempo de gracia, kubelet envía `SIGKILL` (muerte forzosa inmediata del proceso).",
            "Ajustar este valor en apps con transacciones largas.",
          ],
        },
      ],
      notes: {
        objetivo: "Asegurar que los alumnos entiendan cómo diseñar aplicaciones cloud-native con cierre elegante (Graceful Shutdown).",
        explicacion: "Existe una carrera crítica: cuando un Pod pasa a `Terminating`, la señal SIGTERM se envía al Pod AL MISMO TIEMPO que la IP se retira de iptables. Si la app cierra su socket inmediatamente al recibir SIGTERM, las peticiones que ya venían en camino por la red darán error de conexión rechazada (502 Bad Gateway).",
        interaccion: "¿Cómo puede ayudar un `sleep 5` en el hook `preStop` a eliminar los errores 502 durante un despliegue?",
        labGotcha: "Añadir `lifecycle: { preStop: { exec: { command: ['sleep', '5'] } } }` da tiempo a que iptables se actualice antes de que la app reciba el SIGTERM.",
      },
    },
  ],
};
