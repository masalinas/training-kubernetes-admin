// generator/modules/m07_observability.js
// Módulo 07: Observabilidad y Resolución de Problemas (Troubleshooting) (13 diapositivas)

module.exports = {
  id: "m07",
  title: "Módulo 7: Observabilidad y Troubleshooting",
  slides: [
    {
      id: "m07-01-cover",
      layout: "COVER",
      badge: "MÓDULO 07 • OBSERVABILIDAD Y DIAGNÓSTICO",
      title: "Observabilidad y Troubleshooting",
      subtitle: "Probes, Prometheus, Grafana, Logging y Diagnóstico Sistémico",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "4 Horas" },
        { label: "ENTORNO LAB", value: "Minikube con Metrics Server" },
        { label: "OBJETIVO CLAVE", value: "Detección proactiva y resolución rápida de incidencias" },
      ],
      notes: {
        objetivo: "Presentar la disciplina de observabilidad y las técnicas profesionales de diagnóstico de incidentes en Kubernetes.",
        explicacion: "En un sistema distribuido con cientos de Pods dinámicos, conectarse por SSH a los nodos ya no es viable. Necesitamos telemetría continua para saber qué está fallando antes de que lo noten los usuarios y un árbol de diagnóstico metódico.",
        interaccion: "¿Cuál es el error más frustrante o común con el que os habéis encontrado al desplegar Pods en Kubernetes?",
        labGotcha: "En Minikube activaremos `minikube addons enable metrics-server` para habilitar el comando `kubectl top nodes` y `kubectl top pods`.",
      },
    },
    {
      id: "m07-02-pillars-observability",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • PILARES",
      title: "Los Tres Pilares de la Observabilidad Cloud-Native",
      subtitle: "Cómo correlacionar señales para entender el comportamiento interno del sistema",
      cards: [
        {
          title: "1. Métricas (Metrics) - ¿Hay un problema?",
          items: [
            "Datos numéricos agregados a lo largo del tiempo (series temporales).",
            "Métricas clave (Golden Signals): Latencia, Tráfico, Errores y Saturación.",
            "Herramienta estándar: Prometheus + Grafana.",
            "Bajo coste de almacenamiento y alertas inmediatas.",
          ],
        },
        {
          title: "2. Logs (Eventos) - ¿Por qué ocurrió?",
          items: [
            "Registros textuales de eventos emitidos por aplicaciones y componentes del sistema.",
            "Salida estándar (stdout / stderr) capturada automáticamente por containerd en `/var/log/pods`.",
            "Herramienta estándar: Promtail + Grafana Loki o Fluentd + OpenSearch.",
          ],
        },
        {
          title: "3. Trazas (Traces) - ¿Dónde ocurrió?",
          items: [
            "Siguen el viaje de una petición HTTP/gRPC a través de múltiples microservicios (Distributed Tracing).",
            "Identifican cuellos de botella exactos de latencia entre llamadas a bases de datos y APIs externas.",
            "Herramienta estándar: OpenTelemetry (OTel) + Jaeger o Tempo.",
          ],
        },
      ],
      notes: {
        objetivo: "Establecer la diferencia entre métricas (detección), logs (causa raíz) y trazas (contexto distribuido).",
        explicacion: "Las métricas nos avisan con una alerta ('el 15% de peticiones dan error 500'). El distributed tracing nos dice qué microservicio causó el fallo ('el servicio de pagos tardó 4 segundos'). Los logs nos muestran la traza de la excepción exacta en el código ('NullPointerException').",
        interaccion: "¿Por qué guardar absolutamente todos los logs en texto plano puede volverse insostenible en costes?",
        labGotcha: "Loki resuelve esto indexando solo las etiquetas (labels) de Kubernetes en lugar de indexar el texto completo del log.",
      },
    },
    {
      id: "m07-03-probes-overview",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • SONDAS DE SALUD",
      title: "Sondas de Salud: Liveness, Readiness y Startup",
      subtitle: "La interfaz entre el Kubelet y la salud interna de tu aplicación",
      cards: [
        {
          title: "Startup Probe (¿Ha terminado de arrancar?)",
          items: [
            "Diseñada para aplicaciones con arranque lento (ej: Java/Spring Boot o carga de modelos ML pesados).",
            "Desactiva temporalmente las comprobaciones de Liveness y Readiness hasta que la app arranca con éxito.",
            "Evita que el Kubelet mate prematuramente una app antes de que termine su inicialización.",
          ],
        },
        {
          title: "Liveness Probe (¿Sigue viva la app?)",
          items: [
            "Detecta bloqueos internos (deadlocks) donde el proceso sigue en pie pero no responde.",
            "ACCIÓN SI FALLA: Kubelet reinicia el contenedor (kill y arranque de un contenedor nuevo).",
            "ADVERTENCIA: Solo debe comprobar si el proceso local está vivo, nunca dependencias externas.",
          ],
        },
        {
          title: "Readiness Probe (¿Puede aceptar tráfico?)",
          items: [
            "Detecta si la app está lista para atender clientes (ej: cachés cargadas, pools de BD listos).",
            "ACCIÓN SI FALLA: Kubelet NO mata el contenedor; retira la IP del Pod del Service / Ingress.",
            "Protege a los usuarios de recibir errores 500 durante picos de carga transitorios.",
          ],
        },
      ],
      notes: {
        objetivo: "Diferenciar con total claridad el propósito y las consecuencias de cada uno de los tres tipos de sondas.",
        explicacion: "El error más catastrófico en Kubernetes es usar Liveness cuando se debería usar Readiness. Si una app se satura temporalmente y tarda 3 segundos en responder, Liveness la matará y reiniciará, empeorando el colapso. Readiness simplemente la saca del balanceo hasta que se descongestione.",
        interaccion: "¿Qué mecanismos de comprobación soportan las sondas? (httpGet, tcpSocket, exec y gRPC).",
        labGotcha: "Desde K8s 1.24+ existe soporte nativo de sondas gRPC sin necesidad de invocar herramientas como grpc_health_probe.",
      },
    },
    {
      id: "m07-04-probes-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 07 • MANIFIESTOS",
      title: "Configuración Experta de Sondas en YAML",
      subtitle: "Combinación de Startup, Liveness y Readiness para aplicaciones de producción",
      leftTitle: "Parámetros Clave de Sondaje",
      directives: [
        { field: "initialDelaySeconds", desc: "Segundos de espera antes de lanzar la primera comprobación." },
        { field: "periodSeconds", desc: "Frecuencia de comprobación periódica (ej: cada 10 segundos)." },
        { field: "timeoutSeconds", desc: "Tiempo máximo que la app tiene para responder (ej: 2s). Si lo supera, cuenta como fallo." },
        { field: "failureThreshold", desc: "Número de fallos consecutivos antes de tomar la acción (ej: reiniciar o desindexar)." },
        { field: "successThreshold", desc: "Número de éxitos necesarios para volver a marcar Ready (habitualmente 1)." },
      ],
      filename: "probes-spec.yaml",
      yamlCode: `apiVersion: v1
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
      failureThreshold: 2`,
      notes: {
        objetivo: "Analizar el patrón canónico de configuración de sondas para aplicaciones con tiempos de inicio prolongados.",
        explicacion: "Con esta combinación de `startupProbe`, la aplicación tiene hasta 5 minutos (30 intentos x 10s) para arrancar sin peligro de que `livenessProbe` la mate. Una vez que `startupProbe` responde OK por primera vez, se apaga para siempre y toman el control Liveness y Readiness.",
        interaccion: "¿Qué sucede si configuramos un `timeoutSeconds: 1` en una red con latencia variable?",
        labGotcha: "Un pequeño pico de red marcará la sonda como fallida provocando reinicios innecesarios (flapping).",
      },
    },
    {
      id: "m07-05-probes-traps",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • GOTCHAS DE PRODUCCIÓN",
      title: "Las Trampas de las Sondas: Caídas en Cascada",
      subtitle: "Errores de diseño en healthchecks que pueden tumbar todo el clúster",
      cards: [
        {
          title: "Trampa 1: Sonda Liveness conectada a la Base de Datos",
          items: [
            "Escenario: El endpoint `/health` comprueba si PostgreSQL está accesible.",
            "Problema: La base de datos sufre una saturación momentánea y tarda en responder.",
            "Catástrofe: Kubelet mata TODOS los Pods de la aplicación a la vez. Cuando vuelven a arrancar, todos intentan reconectar a la BD simultáneamente, rematándola.",
          ],
        },
        {
          title: "Trampa 2: Sondas `exec` con alto consumo de CPU",
          items: [
            "Escenario: Usar `exec: command: ['sh', '-c', 'script.sh']` cada 3 segundos.",
            "Problema: Cada invocación de `exec` hace un fork de un proceso en Linux, consume PID y ciclos de CPU.",
            "En un nodo con 50 pods, Kubelet estará haciendo cientos de forks por segundo saturando el host.",
          ],
        },
        {
          title: "Regla de Oro en Producción",
          items: [
            "Liveness debe ser ULTRA LIGERA: solo comprobar si el loop de eventos del proceso responde (ej: devolver 200 OK en memoria).",
            "Readiness sí puede verificar conexiones a bases de datos o servicios downstream.",
          ],
        },
      ],
      notes: {
        objetivo: "Evitar caídas en cascada producidas por sondas Liveness mal diseñadas.",
        explicacion: "Este es uno de los anti-patrones más destructivos en Kubernetes. Nunca jamás hagáis que una Liveness probe dependa de un servicio externo. Si la base de datos cae, reiniciar el backend no va a arreglar la base de datos; solo generará un bucle de reinicios masivo.",
        interaccion: "¿Qué código HTTP interpreta Kubelet como éxito en una sonda httpGet?",
        labGotcha: "Cualquier código mayor o igual a 200 y menor a 400 (códigos 2xx y 3xx). Un 4xx o 5xx se considera fallo.",
      },
    },
    {
      id: "m07-06-prometheus-architecture",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • PROMETHEUS",
      title: "Arquitectura del Stack de Monitorización: Prometheus",
      subtitle: "El estándar de facto de la CNCF para métricas de sistemas distribuidos",
      cards: [
        {
          title: "El Modelo Pull (Scraping)",
          items: [
            "Prometheus no espera a que las apps envíen métricas (Push).",
            "Prometheus 'raspa' (hace peticiones HTTP GET periódicas a `/metrics`) los endpoints de los Pods y Nodos.",
            "Formato de texto plano estándar OpenMetrics / Prometheus.",
          ],
        },
        {
          title: "Prometheus Operator y ServiceMonitors",
          items: [
            "En Kubernetes moderno no se edita el archivo `prometheus.yml` a mano.",
            "Se utiliza el Prometheus Operator con recursos declarativos CRD:",
            "`ServiceMonitor`: Descubre y raspa automáticamente servicios según sus etiquetas de Kubernetes.",
          ],
        },
        {
          title: "Alertmanager y Reglas de Alerta",
          items: [
            "Prometheus evalúa reglas PromQL continuamente (ej: `rate(http_requests_total[5m]) > 100`).",
            "Envía las alertas a Alertmanager, que se encarga del silenciamiento, agrupación y enrutamiento hacia Slack, PagerDuty o Email.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender el funcionamiento del modelo de scraping de Prometheus y el uso del patrón Operator.",
        explicacion: "Prometheus guarda las series temporales en su propia base de datos TSDB (Time Series Database) en disco. Gracias al ServiceMonitor, los desarrolladores solo añaden un YAML para que su nueva aplicación sea monitorizada automáticamente sin tocar la configuración central.",
        interaccion: "¿Qué ventaja tiene el modelo Pull (hacer scraping) frente al modelo Push en Kubernetes?",
        labGotcha: "Prometheus sabe de inmediato si un servicio ha muerto porque el scraping falla, mientras que con Push el servicio simplemente deja de enviar señales.",
      },
    },
    {
      id: "m07-07-grafana-dashboards",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • GRAFANA",
      title: "Dashboards y Visualización en Grafana",
      subtitle: "Construcción de paneles de mando para infraestructura y aplicaciones",
      cards: [
        {
          title: "node-exporter (Métricas del Host)",
          items: [
            "Se despliega como DaemonSet en cada nodo del clúster.",
            "Métricas de hardware del kernel de Linux: Uso de CPU por core, RAM libre/en caché, IOPS de disco, throughput de red y estado del filesystem.",
            "Dashboard comunitario estándar: ID 1860.",
          ],
        },
        {
          title: "kube-state-metrics (Métricas de la API)",
          items: [
            "No mide consumo de CPU/Memoria, sino el estado de los objetos de Kubernetes:",
            "• Número de réplicas deseadas vs réplicas disponibles de un Deployment.",
            "• Pods en estado CrashLoopBackOff o Pending.",
            "• Fechas de expiración de certificados de Kubeconfig y Secretos.",
          ],
        },
        {
          title: "Métricas de Aplicación (Negocio)",
          items: [
            "Librerías cliente en Go, Python, Java, Node.js.",
            "Métricas RED: Rate (Peticiones/seg), Errors (Tasa de fallos), Duration (Latencia en percentiles p95, p99).",
          ],
        },
      ],
      notes: {
        objetivo: "Diferenciar las fuentes de métricas de infraestructura (node-exporter) de las métricas de estado de objetos (kube-state-metrics).",
        explicacion: "kube-state-metrics es fundamental para las alertas del administrador: genera métricas como `kube_deployment_status_replicas_unavailable > 0` o `kube_pod_container_status_restarts_total`.",
        interaccion: "¿Por qué los percentiles (p95 / p99) son mucho más útiles para medir latencia que la media aritmética?",
        labGotcha: "Porque la media oculta picos catastróficos; el p99 muestra la experiencia real del 1% de usuarios que sufren mayor lentitud.",
      },
    },
    {
      id: "m07-08-logging-architectures",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • AGREGACIÓN DE LOGS",
      title: "Arquitecturas de Logging: Grafana Loki y Fluentd",
      subtitle: "Captura, centralización y consulta eficiente de logs en clústeres",
      cards: [
        {
          title: "Logging a Nivel de Nodo (Node-Level)",
          items: [
            "Los contenedores escriben en stdout y stderr.",
            "El container runtime (containerd) almacena los ficheros JSON en `/var/log/pods/<namespace>_<pod>_<uid>/`.",
            "Logrotate se encarga de rotar y limitar el tamaño de estos ficheros en el host.",
          ],
        },
        {
          title: "Agentes de Recolección (DaemonSet)",
          items: [
            "Promtail o Fluentbit corren en cada nodo como DaemonSet.",
            "Monitorizan los ficheros en `/var/log/pods/`, enriquecen cada línea con metadatos del Pod (namespace, pod_name, container_name) y los transmiten al almacén central.",
          ],
        },
        {
          title: "Almacenamiento Centralizado: Loki",
          items: [
            "Loki está diseñado 'como Prometheus pero para logs'.",
            "No indexa el texto completo del mensaje: solo indexa las etiquetas de Kubernetes (Namespace, App).",
            "Almacenamiento ultra-económico en buckets de objetos (AWS S3, MinIO, GCS).",
            "Consultas potentes mediante lenguaje LogQL integrado en Grafana.",
          ],
        },
      ],
      notes: {
        objetivo: "Presentar la arquitectura de agregación de logs sin saturar los recursos de disco de los nodos.",
        explicacion: "En Kubernetes clásico se usaba Elasticsearch (ELK), pero requería clústeres gigantescos de memoria para los índices Lucene. Grafana Loki revolucionó el logging en Kubernetes porque aprovecha las etiquetas existentes de los Pods y almacena los chunks comprimidos en almacenamiento de objetos.",
        interaccion: "¿Qué comando nativo de kubectl nos permite consultar logs de contenedores que ya se han reiniciado?",
        labGotcha: "`kubectl logs <pod> --previous` muestra el log de la ejecución anterior que falló.",
      },
    },
    {
      id: "m07-09-troubleshooting-tree-slide",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 07 • TRIAGE SISTÉMICO",
      title: "Metodología de Troubleshooting Sistémico",
      subtitle: "Un enfoque metódico para diagnosticar caídas sin perder tiempo",
      conceptTitle: "Las 4 Preguntas Clave",
      points: [
        "1. ¿En qué fase está el Pod? (Pending, CrashLoopBackOff, OOMKilled, Running pero no Ready).",
        "2. ¿Qué dicen los Eventos del clúster? (`kubectl get events` es la primera herramienta a consultar).",
        "3. ¿Qué dice el Kubelet sobre el Pod? (`kubectl describe pod <nombre>` desvela eventos y condiciones).",
        "4. ¿Qué dice el proceso de la aplicación? (`kubectl logs <nombre> --previous`).",
      ],
      diagramRenderer: "drawTroubleshootingTree",
      notes: {
        objetivo: "Enseñar un árbol de decisión estructurado para que los alumnos dejen de adivinar y sigan un método de diagnóstico profesional.",
        explicacion: "El 95% de los problemas en Kubernetes se reducen a tres estados: Pending (fallo de scheduling o recursos), CrashLoopBackOff (fallo interno de la app o configuración) y OOMKilled (límite de memoria superado).",
        interaccion: "¿Qué diferencia hay entre la información que da `kubectl describe` y la que da `kubectl logs`?",
        labGotcha: "`describe` da información del plano de control de Kubernetes; `logs` da información de la aplicación interna.",
      },
    },
    {
      id: "m07-10-pending-troubleshooting",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • DIAGNÓSTICO 1",
      title: "Diagnóstico 1: Pods en Estado Pending",
      subtitle: "El Scheduler no puede o no tiene permitido ubicar el Pod en ningún nodo",
      cards: [
        {
          title: "Causa 1: Recursos Insuficientes",
          items: [
            "Mensaje: `0/3 nodes are available: 3 Insufficient cpu / memory`.",
            "Diagnóstico: La suma de `requests` del Pod supera la capacidad disponible en todos los nodos.",
            "Solución: Reducir requests sobredimensionados o añadir más nodos al clúster (Cluster Autoscaler).",
          ],
        },
        {
          title: "Causa 2: Taints sin Tolerations",
          items: [
            "Mensaje: `0/3 nodes are available: 1 node has untolerated taint`.",
            "Diagnóstico: Los nodos tienen taints que el Pod no tolera (ej: nodos dedicados o master).",
            "Solución: Añadir la `toleration` adecuada en el Pod o quitar el taint del nodo si fue un error.",
          ],
        },
        {
          title: "Causa 3: PVC sin Vincular (Unbound)",
          items: [
            "Mensaje: `pod has unbound immediate PersistentVolumeClaims`.",
            "Diagnóstico: El PVC solicitado no encuentra un PV que coincida o la StorageClass no puede aprovisionar el disco.",
            "Solución: `kubectl describe pvc <nombre>` para ver si la cabina o el provisionador está caído.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a interpretar los mensajes de error exactos emitidos por el planificador en eventos de Pending.",
        explicacion: "Cuando un pod está en Pending, el Kubelet aún no ha intervenido; el problema reside 100% en el Control Plane (Scheduler o Storage Controller). Mirar los logs de la app en este estado es inútil porque el contenedor no ha llegado a crearse.",
        interaccion: "¿Cómo podemos ver rápidamente qué nodos tienen qué capacidad restante de recursos?",
        labGotcha: "Ejecutar `kubectl describe nodes | grep -A 8 'Allocated resources'` para ver el porcentaje de reserva.",
      },
    },
    {
      id: "m07-11-crashloop-troubleshooting",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • DIAGNÓSTICO 2",
      title: "Diagnóstico 2: CrashLoopBackOff y Errores de App",
      subtitle: "El contenedor arranca, falla, muere y Kubelet retrasa exponencialmente su reinicio",
      cards: [
        {
          title: "¿Qué significa el BackOff?",
          items: [
            "Si un contenedor falla repetidamente, Kubelet no lo reinicia en bucle infinito instantáneo para no quemar la CPU.",
            "Aplica un retraso exponencial (10s, 20s, 40s, 80s... hasta un tope de 300 segundos = 5 minutos).",
            "El estado `CrashLoopBackOff` indica que el pod está en ese periodo de espera antes de volver a intentar arrancar.",
          ],
        },
        {
          title: "Causas Principales",
          items: [
            "1. Error de ejecución en la app: Excepción no capturada, fallo de sintaxis, falta de variable de entorno obligatoria.",
            "2. ConfigMap o Secret ausente: El pod intenta montar un secreto que no existe.",
            "3. Fallo en Startup Probe: La sonda declara muerto al contenedor antes de que termine de inicializarse.",
          ],
        },
        {
          title: "Comandos Clave de Triage",
          items: [
            "`kubectl describe pod <nombre>` -> Mirar 'Last State' y 'Exit Code'.",
            "`kubectl logs <nombre> --previous` -> Vuelca la salida del contenedor antes de morir.",
            "`kubectl get events --field-selector reason=Failed`.",
          ],
        },
      ],
      notes: {
        objetivo: "Guiar la resolución de CrashLoopBackOff usando los códigos de salida y los logs históricos.",
        explicacion: "El código de salida (Exit Code) de Linux es la mejor pista: Exit 1 (error general de aplicación), Exit 127 (comando no encontrado dentro de la imagen), Exit 137 (OOMKilled o SIGKILL forzoso).",
        interaccion: "¿Qué significa un Exit Code 0 en un Pod gestionado por un Deployment?",
        labGotcha: "Significa que el proceso terminó con éxito (ej. un script que finalizó). Pero como el Deployment tiene `restartPolicy: Always`, Kubelet lo reinicia considerándolo un fallo de servicio continuo.",
      },
    },
    {
      id: "m07-12-oomkilled-troubleshooting",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • DIAGNÓSTICO 3",
      title: "Diagnóstico 3: OOMKilled (Exit Code 137)",
      subtitle: "Cuando el kernel de Linux ejecuta la sentencia de muerte por memoria",
      cards: [
        {
          title: "La Anatomía del Exit Code 137",
          items: [
            "En sistemas Unix, un código > 128 indica que el proceso murió por una señal del sistema.",
            "Fórmula: 128 + Número de Señal.",
            "128 + 9 (SIGKILL) = 137.",
            "Indica inequívocamente que el kernel ejecutó un `kill -9` sobre el contenedor.",
          ],
        },
        {
          title: "Causa 1: Memory Limit del Contenedor",
          items: [
            "El proceso en el contenedor intentó asignar más memoria que su `limits.memory`.",
            "El subsistema cgroups de Linux intercepta la asignación y purga el proceso.",
            "El nodo sigue sano y con memoria libre; solo muere ese contenedor.",
          ],
        },
        {
          title: "Causa 2: OOM a Nivel de Nodo Físico",
          items: [
            "El servidor físico completo se ha quedado sin memoria RAM.",
            "El OOM Killer del kernel de Linux escoge una víctima según `oom_score`.",
            "Diagnóstico en el host: `sudo dmesg -T | grep -i oom` para ver qué proceso fue ejecutado.",
          ],
        },
      ],
      notes: {
        objetivo: "Identificar con certeza matemática cuándo un contenedor ha sufrido OOMKilled y solucionar su causa raíz.",
        explicacion: "En `kubectl describe pod`, si veis `Last State: Terminated` con `Reason: OOMKilled` y `Exit Code: 137`, no hay duda posible. La solución inmediata es incrementar el `limits.memory` o perfilar la aplicación para corregir la fuga de memoria (Memory Leak).",
        interaccion: "¿Por qué en aplicaciones Java con contenedores suele ocurrir OOMKilled si no se configuran las flags `-XX:MaxRAMPercentage`?",
        labGotcha: "Versiones antiguas de Java no entendían cgroups y asumían la memoria total del host en lugar del límite del contenedor, reservando heaps gigantes que provocaban el OOMKilled inmediato.",
      },
    },
    {
      id: "m07-13-network-dns-troubleshooting",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 07 • DIAGNÓSTICO 4",
      title: "Diagnóstico 4: Fallos de Red y Resolución DNS",
      subtitle: "Procedimiento paso a paso para desatascar problemas de conectividad",
      cards: [
        {
          title: "Paso 1: Lanzar un Pod de Diagnóstico (Swiss Army Knife)",
          items: [
            "`kubectl run debug --rm -it --image=nicolaka/netshoot -- /bin/bash`",
            "La imagen `netshoot` incluye curl, dig, traceroute, tcpdump, nmap, iperf y netstat.",
            "Permite probar la red situándonos en la misma perspectiva que un Pod real.",
          ],
        },
        {
          title: "Paso 2: Comprobar Resolución DNS",
          items: [
            "`nslookup mi-servicio.default.svc.cluster.local`",
            "Si falla: comprobar si CoreDNS está corriendo (`kubectl get pods -n kube-system -l k8s-app=kube-dns`).",
            "Revisar logs de CoreDNS: `kubectl logs -n kube-system -l k8s-app=kube-dns`.",
          ],
        },
        {
          title: "Paso 3: Comprobar Endpoints del Servicio",
          items: [
            "`kubectl get endpoints mi-servicio`",
            "Si la lista de IPs está vacía (`<none>`), el Service no está enviando tráfico a nadie.",
            "Causa típica: Las etiquetas de `spec.selector` del Service no coinciden exactamente con las de los Pods, o los Pods no han pasado su Readiness Probe.",
          ],
        },
      ],
      notes: {
        objetivo: "Dominar la secuencia de comprobaciones de red: DNS -> Service -> Endpoints -> Pod IP.",
        explicacion: "El 80% de los tickets de 'la red no funciona' se deben a dos despistes tipográficos: una errata en el selector de etiquetas del Service (que deja la lista de endpoints vacía) o que los Pods fallaron su Readiness Probe y fueron desindexados.",
        interaccion: "¿Qué comando rápido nos muestra si un Servicio tiene Pods activos asociados?",
        labGotcha: "Ejecutar `kubectl get endpoints <nombre-servicio>` o `kubectl get endpointslices`.",
      },
    },
  ],
};
