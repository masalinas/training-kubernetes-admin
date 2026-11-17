// generator/modules/m09_day2_ops.js
// Módulo 09: Operaciones de Día 2 y Mantenimiento (10 diapositivas)

module.exports = {
  id: "m09",
  title: "Módulo 9: Operaciones de Día 2 y Mantenimiento",
  slides: [
    {
      id: "m09-01-cover",
      layout: "COVER",
      badge: "MÓDULO 09 • OPERACIONES DE DÍA 2",
      title: "Operaciones de Día 2 y Mantenimiento",
      subtitle: "Autoscaling (HPA/VPA), Mantenimiento de Nodos, Upgrades y Backup de etcd",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "2.5 Horas" },
        { label: "ENTORNO LAB", value: "VirtualBox + Minikube" },
        { label: "OBJETIVO CLAVE", value: "Mantenimiento continuo sin tiempo de inactividad" },
      ],
      notes: {
        objetivo: "Preparar a los alumnos para la realidad operativa del mantenimiento continuo de clústeres en producción.",
        explicacion: "Instalar un clúster es solo el 'Día 1'. El 'Día 2' representa el 99% de la vida de la plataforma: actualizar versiones de Kubernetes cada 4 meses, drenar nodos para parches de kernel de Linux, escalar automáticamente ante picos de demanda y tener un plan de recuperación de desastres ante un fallo de etcd.",
        interaccion: "¿Habéis participado en la actualización de versión de un clúster de Kubernetes en producción? ¿Cómo se gestionó el riesgo de parada?",
        labGotcha: "El laboratorio de este módulo cubrirá el procedimiento real de backup/restore de etcd y la ejecución de `kubeadm upgrade`.",
      },
    },
    {
      id: "m09-02-autoscaling-levels",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 09 • AUTOSCALADO",
      title: "Los Tres Niveles de Escalado Automático",
      subtitle: "Coordinación entre escalado horizontal, vertical y de infraestructura",
      cards: [
        {
          title: "1. HPA (Horizontal Pod Autoscaler)",
          items: [
            "Escala el NÚMERO de réplicas de Pods (de 2 a 20 réplicas).",
            "Reacciona dinámicamente según el consumo medio de CPU, Memoria o métricas personalizadas (ej. peticiones HTTP/s o mensajes en RabbitMQ).",
            "El estándar para aplicaciones stateless y microservicios web.",
          ],
        },
        {
          title: "2. VPA (Vertical Pod Autoscaler)",
          items: [
            "Ajusta el TAMAÑO de los Pods (modifica los `requests` y `limits` de CPU y Memoria).",
            "Corrige aplicaciones sobredimensionadas o que sufren OOMKilled recurrentes.",
            "Requiere reiniciar el Pod para aplicar los nuevos límites de cgroup.",
          ],
        },
        {
          title: "3. Cluster Autoscaler / Karpenter",
          items: [
            "Escala el número de NODOS FÍSICOS o máquinas virtuales del clúster.",
            "Si hay Pods en estado `Pending` porque no caben en ningún nodo, aprovisiona un nuevo nodo en Cloud.",
            "Si hay nodos con poca carga, desaloja los pods y destruye el nodo para ahorrar costes.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a diferenciar y combinar los tres niveles de autoescalado en Kubernetes.",
        explicacion: "HPA y Cluster Autoscaler trabajan en equipo: un pico de tráfico hace que HPA pida 30 réplicas; al no caber en los nodos existentes, los pods entran en Pending; Cluster Autoscaler detecta los pods en Pending y añade 2 nodos al clúster de AWS o GCP.",
        interaccion: "¿Por qué no se debe usar HPA y VPA simultáneamente sobre la misma métrica (ej. CPU)?",
        labGotcha: "Entrarían en conflicto: HPA intentaría crear más réplicas mientras VPA intentaría agrandar el pod, desestabilizando el clúster.",
      },
    },
    {
      id: "m09-03-hpa-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 09 • HPA",
      title: "Horizontal Pod Autoscaler (HPA) en Detalle",
      subtitle: "Estructura de la API autoscaling/v2 con métricas de CPU y Memoria",
      leftTitle: "Algoritmo de Cálculo de HPA",
      directives: [
        { field: "Fórmula de réplicas", desc: "RéplicasDeseadas = ceil[ RéplicasActuales * ( ConsumoActual / ConsumoObjetivo ) ]" },
        { field: "minReplicas / maxReplicas", desc: "Límites mínimo y máximo absoluto de réplicas que el HPA puede ordenar." },
        { field: "averageUtilization", desc: "Porcentaje medio respecto al `request` del Pod (ej: 70% de 250m = 175m)." },
        { field: "scaleDown.stabilizationWindow", desc: "Periodo de enfriamiento (ej: 300s) para evitar 'flapping' (escalar y desescalar continuamente)." },
      ],
      filename: "hpa-web.yaml",
      yamlCode: `apiVersion: autoscaling/v2
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
      stabilizationWindowSeconds: 300 # 5 min de enfriamiento`,
      notes: {
        objetivo: "Analizar la sintaxis moderna de HPA v2 y la importancia de la ventana de estabilización.",
        explicacion: "Requisito técnico ineludible: para que HPA funcione, los Pods DEBEN tener definido `resources.requests`. Si no hay requests, HPA no puede calcular el porcentaje y el escalado fallará con estado `<unknown>`.",
        interaccion: "¿Qué componente de clúster es obligatorio tener instalado para que HPA obtenga las métricas?",
        labGotcha: "Metrics Server (`minikube addons enable metrics-server`). Sin él, `kubectl get hpa` muestra `<unknown>/70%`.",
      },
    },
    {
      id: "m09-04-vpa-modes",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 09 • VPA",
      title: "Vertical Pod Autoscaler (VPA): Componentes y Modos",
      subtitle: "Ajuste dinámico de tamaño de contenedores para dimensionamiento óptimo",
      cards: [
        {
          title: "Los 3 Componentes de VPA",
          items: [
            "1. VPA Recommender: Analiza el historial de métricas y calcula los requests óptimos.",
            "2. VPA Updater: Decide cuándo reiniciar el Pod si sus límites actuales difieren mucho de la recomendación.",
            "3. VPA Admission Controller: Intercepta la recreación del Pod e inyecta los nuevos requests en el YAML.",
          ],
        },
        {
          title: "Modo 'Off' (Solo Recomendaciones)",
          items: [
            "`updateMode: 'Off'`.",
            "No toca ni reinicia ningún Pod en ejecución.",
            "Calcula y muestra en el estado del objeto VPA los valores recomendados (Target, LowerBound, UpperBound).",
            "Modo imprescindible para auditorías de costes sin riesgo de caídas.",
          ],
        },
        {
          title: "Modos 'Initial' y 'Auto'",
          items: [
            "`Initial`: Solo asigna los nuevos límites cuando el Pod se crea por primera vez.",
            "`Auto`: Reinicia activamente el Pod cuando detecta que los límites están desajustados (respetando PodDisruptionBudgets).",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a usar VPA en modo 'Off' como herramienta de optimización de capacidad y costes (FinOps).",
        explicacion: "La gran mayoría de empresas usan VPA en modo 'Off'. Ejecutan VPA durante 2 semanas, leen las recomendaciones matemáticas de consumo real y ajustan manualmente sus manifiestos de Helm ahorrando hasta un 40% de costes de infraestructura.",
        interaccion: "¿Por qué el modo 'Auto' de VPA puede ser arriesgado en aplicaciones monolíticas?",
        labGotcha: "Porque reiniciar un monolito de arranque lento interrumpe sesiones de usuario y conexiones activas.",
      },
    },
    {
      id: "m09-05-maintenance-flow-slide",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 09 • MANTENIMIENTO",
      title: "Mantenimiento Seguro de Nodos: Cordon y Drain",
      subtitle: "Procedimiento oficial para vaciar servidores sin cortar servicios",
      conceptTitle: "Secuencia de Mantenimiento",
      points: [
        "1. Cordon: `kubectl cordon <nodo>` marca el nodo como 'SchedulingDisabled'. Ningún Pod nuevo aterrizará en él.",
        "2. Drain: `kubectl drain <nodo> --ignore-daemonsets` desaloja los Pods enviando SIGTERM y respetando PDBs.",
        "3. Mantenimiento físico o del SO: Parcheo de kernel de Linux, actualización de BIOS o reboot del host.",
        "4. Uncordon: `kubectl uncordon <nodo>` devuelve el nodo al estado Ready para volver a recibir cargas.",
      ],
      diagramRenderer: "drawNodeMaintenanceFlow",
      notes: {
        objetivo: "Guiar al administrador en la rutina de mantenimiento de nodos físicos o instancias cloud.",
        explicacion: "Nunca se debe apagar o reiniciar un nodo sin haber ejecutado `cordon` y `drain`. Drain contacta con la API de Eviction de Kubernetes, asegurando que las réplicas del Deployment se reubiquen ordenadamente en otros nodos antes de que el servidor se apague.",
        interaccion: "¿Por qué la flag `--ignore-daemonsets` es casi siempre obligatoria al hacer drain?",
        labGotcha: "Porque los DaemonSets no se pueden desalojar (Kubelet volvería a arrancarlos de inmediato en el mismo nodo).",
      },
    },
    {
      id: "m09-06-pdb-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 09 • PDB",
      title: "PodDisruptionBudgets (PDB): La Barrera de Protección",
      subtitle: "Garantizar que los drains y mantenimientos nunca violen la alta disponibilidad",
      leftTitle: "Reglas de Disrupción Voluntaria",
      directives: [
        { field: "minAvailable", desc: "Número o porcentaje mínimo de Pods que DEBEN permanecer vivos y Ready en todo momento." },
        { field: "maxUnavailable", desc: "Número o porcentaje máximo de Pods que se permite desalojar a la vez (ej: 1 o 20%)." },
        { field: "selector", desc: "Vincula el PDB con las etiquetas del Deployment o StatefulSet protegido." },
        { field: "Bloqueo de Drain", desc: "Si un drain violaría el PDB, la llamada falla y el nodo NO se vacía hasta que haya réplicas sanas." },
      ],
      filename: "pdb-critical-service.yaml",
      yamlCode: `apiVersion: policy/v1
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
      app: web-frontend`,
      notes: {
        objetivo: "Enseñar a blindar aplicaciones contra intervenciones de mantenimiento mediante PodDisruptionBudgets.",
        explicacion: "Si un administrador (o un script automático de actualización) intenta hacer drain de un nodo donde corre una réplica y solo queda 1 réplica viva de un Deployment con `minAvailable: 2`, el comando `kubectl drain` se pausará y esperará hasta que otra réplica esté Ready en otro nodo.",
        interaccion: "¿Qué diferencia hay entre una disrupción voluntaria (drain) y una disrupción involuntaria (fallo de hardware)?",
        labGotcha: "Los PDBs protegen contra disrupciones voluntarias (drain, cluster autoscaler downscaling); no pueden evitar un fallo de hardware súbito.",
      },
    },
    {
      id: "m09-07-cluster-upgrade-kubeadm",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 09 • UPGRADES",
      title: "Actualización de Versión del Clúster con Kubeadm",
      subtitle: "Secuencia estricta paso a paso con cero tiempo de inactividad",
      cards: [
        {
          title: "1. Regla de Skew de Versiones",
          items: [
            "Kubernetes solo soporta saltos de UNA versión menor a la vez (ej: de v1.28 a v1.29, luego a v1.30).",
            "PROHIBIDO saltar de v1.28 a v1.30 directamente.",
            "Kubelet nunca puede ser más reciente que kube-apiserver.",
          ],
        },
        {
          title: "2. Actualizar el Primer Control Plane",
          items: [
            "`sudo apt-get update && sudo apt-get install -y --allow-change-held-packages kubeadm=1.29.x-1.1`.",
            "`sudo kubeadm upgrade plan` -> Analiza el clúster y valida compatibilidad.",
            "`sudo kubeadm upgrade apply v1.29.x` -> Actualiza certificados y static pods.",
            "`sudo apt-get install -y kubelet=1.29.x-1.1 kubectl=1.29.x-1.1 && sudo systemctl restart kubelet`.",
          ],
        },
        {
          title: "3. Actualizar Nodos Workers",
          items: [
            "Drenar nodo: `kubectl drain <worker-node> --ignore-daemonsets`.",
            "Actualizar binario `kubeadm` y ejecutar: `sudo kubeadm upgrade node`.",
            "Actualizar `kubelet` y `kubectl`, y reiniciar: `sudo systemctl restart kubelet`.",
            "Reincorporar tráfico: `kubectl uncordon <worker-node>`. Repetir nodo a nodo.",
          ],
        },
      ],
      notes: {
        objetivo: "Detallar el procedimiento estándar de examen CKA y producción para actualizar clústeres creados con kubeadm.",
        explicacion: "El Control Plane se actualiza siempre primero. Durante los 2 minutos que tarda en actualizarse el Control Plane, los Workers siguen ejecutando los Pods sin interrupción. Luego los workers se actualizan uno a uno drenándolos previamente.",
        interaccion: "¿Por qué `kubeadm upgrade node` en los workers no necesita la flag `apply`?",
        labGotcha: "Porque los workers no tienen etcd ni static pods de control plane; solo ajustan la configuración del kubelet.",
      },
    },
    {
      id: "m09-08-etcd-backup-save",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 09 • DISASTER RECOVERY",
      title: "Backup de etcd: La Base de Datos del Clúster",
      subtitle: "Proteger el cerebro de Kubernetes contra corrupciones o desastres",
      cards: [
        {
          title: "¿Por Qué el Backup de etcd es Sagrado?",
          items: [
            "etcd almacena TODO: secretos, certificados, deployments, configuraciones de red y estados.",
            "Si etcd se corrompe o se destruyen los discos del Control Plane, el clúster entero deja de existir.",
            "Un backup diario de etcd permite reconstruir el clúster completo en minutos.",
          ],
        },
        {
          title: "La Herramienta Oficial: etcdctl",
          items: [
            "Herramienta CLI de gestión de etcd (cliente v3 de la API).",
            "Requiere autenticación TLS mutual estricta mediante certificados de cliente.",
            "Certificados en Kubeadm: `/etc/kubernetes/pki/etcd/`.",
          ],
        },
        {
          title: "El Comando Snapshot Save",
          items: [
            "`ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \\`",
            "`--cacert=/etc/kubernetes/pki/etcd/ca.crt \\`",
            "`--cert=/etc/kubernetes/pki/etcd/server.crt \\`",
            "`--key=/etc/kubernetes/pki/etcd/server.key \\`",
            "`snapshot save /backup/etcd-snapshot-$(date +%Y%m%d).db`",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a realizar una copia de seguridad consistente de etcd usando certificados criptográficos.",
        explicacion: "Hacer un backup de etcd no interrumpe el servicio del clúster; Raft permite generar un snapshot consistente en caliente mientras el clúster sigue atendiendo peticiones.",
        interaccion: "¿Cómo podemos comprobar que el fichero `.db` de snapshot no está corrupto antes de guardarlo en un storage externo?",
        labGotcha: "Ejecutar `ETCDCTL_API=3 etcdctl snapshot status <fichero.db>` para verificar el hash y el número de revisión.",
      },
    },
    {
      id: "m09-09-etcd-restore-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 09 • RESTAURACIÓN ETCD",
      title: "Restauración de etcd Paso a Paso",
      subtitle: "Procedimiento de recuperación ante desastres en el nodo Control Plane",
      leftTitle: "Secuencia de Recuperación",
      directives: [
        { field: "1. Detener API Server", desc: "Mover temporalmente /etc/kubernetes/manifests/kube-apiserver.yaml fuera del directorio." },
        { field: "2. snapshot restore", desc: "Restaura la base de datos en un directorio NUEVO (ej: /var/lib/etcd-backup)." },
        { field: "--data-dir", desc: "Nunca sobreescribir el directorio antiguo en caliente para evitar bloqueos de sockets." },
        { field: "3. Actualizar Static Pod", desc: "Editar /etc/kubernetes/manifests/etcd.yaml apuntando hostPath al nuevo data-dir." },
        { field: "4. Reiniciar componentes", desc: "Kubelet reinicia etcd y el apiserver vuelve a conectar con el estado restaurado." },
      ],
      filename: "etcd-restore-procedure.sh",
      yamlCode: `# 1. Restaurar snapshot a un nuevo directorio
sudo ETCDCTL_API=3 etcdctl \\
  --data-dir=/var/lib/etcd-restored \\
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
kubectl get nodes`,
      notes: {
        objetivo: "Guiar paso a paso la restauración de etcd, una de las pruebas más exigentes del examen CKA y de los simulacros de desastre.",
        explicacion: "El error común es intentar restaurar sobre `/var/lib/etcd` con el proceso corriendo. El procedimiento correcto es siempre restaurar a un directorio limpio `/var/lib/etcd-restored` y luego cambiar el volumen en el manifiesto estático.",
        interaccion: "¿Qué sucede con los recursos creados después de la fecha en que se tomó el snapshot?",
        labGotcha: "Se perderán, volviendo el clúster exactamente al estado del momento de la instantánea.",
      },
    },
    {
      id: "m09-10-production-checklist",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 09 • CHECKLIST DÍA 2",
      title: "Checklist de Salud y Hardening para Producción",
      subtitle: "Las diez comprobaciones obligatorias para el administrador de Kubernetes",
      cards: [
        {
          title: "Certificados y Clúster",
          items: [
            "Comprobar caducidad de certificados PKI: `kubeadm certs check-expiration`.",
            "Rotar certificados antes de cumplir el año: `kubeadm certs renew all`.",
            "Verificar que la versión de Kubernetes no esté en End-Of-Life (EOL).",
          ],
        },
        {
          title: "Cargas de Trabajo (Workloads)",
          items: [
            "El 100% de los Pods tienen `requests` y `limits` configurados.",
            "Todas las aplicaciones web tienen sondas de Liveness y Readiness configuradas con timeouts holgados.",
            "Los Deployments críticos tienen réplicas >= 2 con PodDisruptionBudgets activos.",
          ],
        },
        {
          title: "Seguridad y Auditoría",
          items: [
            "Auditoría CIS Benchmark con herramientas como `kube-bench`.",
            "Escaneo de vulnerabilidades de imágenes en CI/CD con Trivy.",
            "Políticas de red Default-Deny aplicadas en todos los namespaces de producción.",
          ],
        },
      ],
      notes: {
        objetivo: "Resumir las mejores prácticas operativas en un checklist accionable para los administradores del curso.",
        explicacion: "Un administrador excelente no es el que apaga fuegos rápido, sino el que evita los fuegos mediante este checklist preventivo.",
        interaccion: "¿Cuántos clústeres conocéis que hayan caído en producción porque vencieron los certificados de 1 año de kubeadm?",
        labGotcha: "Configurar un cronjob o alerta en Prometheus para avisar cuando los certificados de `/etc/kubernetes/pki` tengan menos de 30 días de vida.",
      },
    },
  ],
};
