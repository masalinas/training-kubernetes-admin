// generator/modules/m04_storage.js
// Módulo 04: Administración de Almacenamiento y Persistencia (10 diapositivas)

module.exports = {
  id: "m04",
  title: "Módulo 4: Administración de Almacenamiento y Persistencia",
  slides: [
    {
      id: "m04-01-cover",
      layout: "COVER",
      badge: "MÓDULO 04 • PERSISTENCIA DE DATOS",
      title: "Almacenamiento y Persistencia",
      subtitle: "CSI, StorageClass, PV, PVC, NFS y Políticas de Retención",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "3 Horas" },
        { label: "ENTORNO LAB", value: "Minikube Storage & NFS" },
        { label: "OBJETIVO CLAVE", value: "Aprovisionamiento dinámico y protección de datos" },
      ],
      notes: {
        objetivo: "Introducir los mecanismos de persistencia desacoplada en Kubernetes.",
        explicacion: "Los contenedores están diseñados para ser efímeros. Si un contenedor se reinicia, su capa de lectura/escritura (overlayfs) se destruye. Para bases de datos o ficheros subidos por usuarios se requiere una infraestructura de almacenamiento persistente independiente del ciclo de vida del nodo.",
        interaccion: "¿Qué ocurre con los datos de un Pod si este muere y se reinicia en el mismo nodo usando solo su almacenamiento interno?",
        labGotcha: "En Minikube disponemos de la StorageClass `standard` por defecto, pero configuraremos un provisionador NFS para simular un entorno on-premise.",
      },
    },
    {
      id: "m04-02-storage-challenge",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 04 • FUNDAMENTOS DE STORAGE",
      title: "El Reto del Almacenamiento en Contenedores",
      subtitle: "Tipos de volúmenes básicos y sus limitaciones en producción",
      cards: [
        {
          title: "emptyDir (Almacenamiento Temporal)",
          items: [
            "Se crea vacío al asignar el Pod al nodo; sobrevive a reinicios de contenedores.",
            "Peligro: Se destruye permanentemente si el Pod se elimina o se migra de nodo.",
            "Uso ideal: Caché de disco rápida, memoria compartida (`medium: Memory`) o traspaso InitContainer.",
          ],
        },
        {
          title: "hostPath (Directorio del Host)",
          items: [
            "Monta un fichero o directorio de la máquina virtual del host dentro del Pod.",
            "Riesgo de seguridad: el contenedor accede al sistema de archivos del host (`/var/log`, `/etc`).",
            "Limitación: Si el Pod se reprograma en otro nodo, pierde el acceso a esos datos.",
            "Uso legítimo: Únicamente agentes de infraestructura (DaemonSets como cAdvisor o Fluentd).",
          ],
        },
        {
          title: "Volúmenes de Red Persistentes",
          items: [
            "Almacenamiento desacoplado físicamente del ciclo de vida de los nodos computacionales.",
            "Protocolos de red empresariales: NFS, iSCSI, Ceph, GlusterFS.",
            "Proveedores Cloud: AWS EBS/EFS, GCP Persistent Disk/Filestore, Azure Disk/Files.",
          ],
        },
      ],
      notes: {
        objetivo: "Diferenciar los volúmenes efímeros de host frente al almacenamiento persistente desacoplado.",
        explicacion: "Nunca se debe usar `hostPath` para bases de datos en producción. Si el nodo 1 falla por hardware, el scheduler moverá el Pod al nodo 2, y la base de datos arrancará completamente vacía provocando una catástrofe.",
        interaccion: "¿Por qué `emptyDir` con `medium: Memory` es tan útil para procesos que necesitan alta velocidad de escritura temporal?",
        labGotcha: "Crea un sistema de archivos `tmpfs` en RAM, consumiendo memoria del límite del Pod pero con latencia de nanosegundos.",
      },
    },
    {
      id: "m04-03-csi-architecture",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 04 • ARQUITECTURA CSI",
      title: "Arquitectura CSI (Container Storage Interface)",
      subtitle: "El estándar abierto que desacopló los drivers de almacenamiento del core de K8s",
      conceptTitle: "Evolución de CSI",
      points: [
        "Antiguamente (In-Tree): Los drivers de AWS EBS, Ceph o NFS estaban compilados dentro del código binario de Kubernetes. Actualizar un driver requería actualizar todo Kubernetes.",
        "CSI Moderno (Out-of-Tree): Los fabricantes implementan controladores gRPC independientes que se despliegan como Pods en el clúster.",
        "Separación de responsabilidades: El desarrollador solicita capacidad mediante un PVC; el CSI Driver habla con la cabina de discos o API cloud y crea el LUN/volumen.",
      ],
      diagramRenderer: "drawStorageCsiFlow",
      notes: {
        objetivo: "Comprender la arquitectura moderna de Container Storage Interface (CSI) y el desacoplamiento de drivers.",
        explicacion: "CSI define tres llamadas RPC estándar: `CreateVolume/DeleteVolume` (Controller Plugin), `ControllerPublishVolume/Attach` (unión a la VM) y `NodeStageVolume/NodePublishVolume/Mount` (formateo ext4/xfs y montaje en el directorio del contenedor por Kubelet).",
        interaccion: "¿Quién es el responsable de formatear el disco con ext4 o XFS cuando se crea un volumen nuevo?",
        labGotcha: "El Node Plugin del CSI Driver ejecutándose en el nodo worker antes de que Kubelet monte el volumen en el Pod.",
      },
    },
    {
      id: "m04-04-access-modes",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 04 • MODOS DE ACCESO",
      title: "Modos de Acceso a Volúmenes (AccessModes)",
      subtitle: "Compatibilidad entre almacenamiento de bloque y almacenamiento de archivos",
      cards: [
        {
          title: "ReadWriteOnce (RWO)",
          items: [
            "El volumen puede ser montado como lectura/escritura por UN SOLO NODO.",
            "Típico de almacenamiento en bloque (AWS EBS, GCP Persistent Disk, Azure Disk, iSCSI).",
            "Múltiples Pods pueden escribir si y solo si residen en el MISMO nodo.",
          ],
        },
        {
          title: "ReadOnlyMany (ROX)",
          items: [
            "El volumen puede ser montado como solo lectura por MUCHOS NODOS a la vez.",
            "Ideal para catálogos de imágenes estáticas, diccionarios de machine learning o datasets de referencia compartidos.",
          ],
        },
        {
          title: "ReadWriteMany (RWX)",
          items: [
            "El volumen puede ser montado como lectura/escritura simultánea por MUCHOS NODOS.",
            "Requiere sistemas de archivos de red (NFS, AWS EFS, Azure Files, CephFS, GlusterFS).",
            "Ideal para CMS (Wordpress subidas de medios), servidores web compartidos o clusters de procesamiento.",
          ],
        },
        {
          title: "ReadWriteOncePod (RWOP)",
          items: [
            "Introducido en K8s 1.22 (GA en 1.29).",
            "Restringe el acceso de lectura/escritura a un ÚNICO POD en todo el clúster.",
            "Evita corrupciones cuando dos Pods en el mismo nodo intentan escribir en la misma base de datos.",
          ],
        },
      ],
      notes: {
        objetivo: "Dominar la matriz de compatibilidad de AccessModes para no solicitar modos que la infraestructura no soporta.",
        explicacion: "Un error habitual es pedir `ReadWriteMany` sobre una StorageClass de discos de bloque (como EBS gp3). El PVC se quedará perpetuamente en estado `Pending` porque un disco de bloque no puede ser montado simultáneamente por dos hipervisores distintos sin corromper el filesystem.",
        interaccion: "¿Si tenemos un Deployment con 5 réplicas que necesitan escribir en el mismo disco, qué AccessMode necesitamos obligatoriamente?",
        labGotcha: "Respuesta: ReadWriteMany (RWX), lo que exige un almacenamiento basado en NFS o sistema de archivos distribuido.",
      },
    },
    {
      id: "m04-05-pv-vs-pvc",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 04 • PV Y PVC",
      title: "PV y PVC: La Abstracción del Almacenamiento",
      subtitle: "Separación nítida de roles entre el Administrador y el Desarrollador",
      cards: [
        {
          title: "PersistentVolume (PV) - Rol Administrador",
          items: [
            "Recurso a nivel de clúster (no pertenece a ningún namespace).",
            "Representa una porción real de almacenamiento físico (ej: un disco de 100GB en la SAN o una exportación NFS).",
            "Detalla la tecnología de almacenamiento, capacidad, modos de acceso y política de reciclaje.",
          ],
        },
        {
          title: "PersistentVolumeClaim (PVC) - Rol Desarrollador",
          items: [
            "Recurso dentro de un Namespace específico.",
            "Es una petición de almacenamiento: 'Necesito 10GB con modo RWO'.",
            "El desarrollador no necesita saber si el disco es un SSD de AWS, un LUN de NetApp o un servidor NFS.",
          ],
        },
        {
          title: "El Proceso de Binding (Vinculación)",
          items: [
            "El PersistentVolumeController busca continuamente un PV que satisfaga la petición del PVC (capacidad igual o mayor y mismo accessMode).",
            "Cuando lo encuentra, los une en una relación 1 a 1 exclusiva (`Status: Bound`).",
            "Ningún otro PVC puede vincularse a ese PV.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la analogía entre Pod/Node y PVC/PV.",
        explicacion: "Así como un Pod solicita CPU/memoria y el Scheduler le asigna un Nodo, un PVC solicita tamaño/acceso y el PVController le asigna un PV. Esta abstracción permite la portabilidad de las aplicaciones entre nubes y centros de datos propios.",
        interaccion: "¿Qué sucede si un PVC solicita 10GB y el único PV disponible tiene 50GB?",
        labGotcha: "El PVC se vinculará al PV de 50GB, pero se desperdiciarán los 40GB restantes porque el PV no se puede fraccionar.",
      },
    },
    {
      id: "m04-06-reclaim-policies",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 04 • CICLO DE VIDA",
      title: "Políticas de Retención de Volúmenes",
      subtitle: "persistentVolumeReclaimPolicy: Retain vs Delete en producción",
      optionA: {
        tag: "Máxima Seguridad (Producción)",
        title: "Retain (Retener)",
        isRecommended: true,
        items: [
          "Al borrar el PVC, el PV pasa a estado `Released` (Liberado).",
          "Los datos físicos en el disco o NFS permanecen intactos.",
          "El PV NO se asigna automáticamente a otro usuario (contiene datos residuales).",
          "El administrador debe limpiar manualmente los datos o recuperar el volumen si fue un borrado accidental.",
          "Política obligatoria para bases de datos críticas y producción.",
        ],
      },
      optionB: {
        tag: "Automatización / Limpieza",
        title: "Delete (Eliminar)",
        isRecommended: false,
        items: [
          "Al borrar el PVC, el PV asociado se elimina automáticamente de Kubernetes.",
          "El CSI Driver invoca la API y BORRA el disco físico o carpeta en la infraestructura de almacenamiento.",
          "Los datos se destruyen de forma irrecuperable de forma automática.",
          "Por defecto en la mayoría de StorageClasses dinámicas de Cloud.",
          "Ideal para entornos efímeros de testing, CI/CD o desarrollo.",
        ],
      },
      notes: {
        objetivo: "Sensibilizar sobre el riesgo de pérdida irreversible de datos si se utiliza la política `Delete` en producción.",
        explicacion: "En una StorageClass con `reclaimPolicy: Delete`, si un desarrollador ejecuta por error `kubectl delete pvc mi-bd-data`, el disco de EBS o Persistent Disk de Google Cloud se destruirá en segundos. En producción corporativa siempre se debe sobreescribir a `Retain`.",
        interaccion: "¿Cómo podemos reutilizar un PV que se ha quedado en estado `Released` tras borrar su PVC?",
        labGotcha: "Editar el PV y eliminar la sección `spec.claimRef` para que vuelva a estar en estado `Available`.",
      },
    },
    {
      id: "m04-07-storageclass-theory",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 04 • STORAGECLASS",
      title: "StorageClass: El Motor de Aprovisionamiento Dinámico",
      subtitle: "Eliminar el aprovisionamiento manual mediante 'clases' de almacenamiento",
      cards: [
        {
          title: "Aprovisionamiento Estático vs Dinámico",
          items: [
            "Estático (Antiguo): El admin debía crear previamente 20 PVs a mano. Si los desarrolladores pedían un tamaño no disponible, se bloqueaban.",
            "Dinámico (Moderno): El desarrollador crea el PVC referenciando una StorageClass. El CSI Driver crea el disco físico 'on-demand' en milisegundos.",
          ],
        },
        {
          title: "volumeBindingMode",
          items: [
            "Immediate (Por defecto): Crea el disco físico en cuanto se crea el PVC. Peligro en Cloud: el disco puede crearse en la Zona A (AZ-a) y el Pod ser programado en la Zona B (AZ-b), fallando el montaje.",
            "WaitForFirstConsumer (Recomendado): Pospone la creación del disco hasta que un Pod usa el PVC. El Scheduler elige primero el nodo y el disco se crea en la misma zona.",
          ],
        },
        {
          title: "allowVolumeExpansion",
          items: [
            "Permite redimensionar volúmenes hacia arriba simplemente editando el campo `spec.resources.requests.storage` del PVC.",
            "El CSI redimensiona el volumen físico y el sistema de archivos sin desmontar el disco.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la importancia crítica de `volumeBindingMode: WaitForFirstConsumer` en arquitecturas multi-zona.",
        explicacion: "En AWS o GCP, un disco de bloque EBS solo puede conectarse a instancias EC2 de su misma Availability Zone (ej. us-east-1a). Con `Immediate`, si el disco se crea en 1a pero el Pod aterriza en 1b, el Pod se quedará atascado en `ContainerCreating` con error `FailedAttachVolume`.",
        interaccion: "¿Qué ocurre si intentamos reducir el tamaño de un PVC de 20Gi a 10Gi?",
        labGotcha: "Kubernetes prohíbe la reducción de volúmenes; la API rechazará el cambio porque reducir un filesystem ext4/xfs suele causar corrupción de datos.",
      },
    },
    {
      id: "m04-08-storageclass-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 04 • MANIFIESTOS",
      title: "StorageClass en Cloud y On-Premise con NFS",
      subtitle: "Configuración para servidores de archivos NFS corporativos",
      leftTitle: "Parámetros de la StorageClass",
      directives: [
        { field: "provisioner", desc: "El driver CSI encargado del aprovisionamiento (ej: nfs-subdir-external-provisioner)." },
        { field: "reclaimPolicy", desc: "Retain (conservar datos) o Delete (destruir al borrar el PVC)." },
        { field: "volumeBindingMode", desc: "WaitForFirstConsumer garantiza afinidad topológica con el nodo." },
        { field: "allowVolumeExpansion", desc: "true permite ampliar la cuota sin recrear el volumen." },
        { field: "mountOptions", desc: "Parámetros de montaje del kernel (ej: nfsvers=4.1, noatime, hard)." },
      ],
      filename: "storageclass-nfs.yaml",
      yamlCode: `apiVersion: storage.k8s.io/v1
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
  - nfsvers=4.1`,
      notes: {
        objetivo: "Aprender a definir una StorageClass para entornos On-Premise utilizando NFS como almacenamiento compartido.",
        explicacion: "Al marcar la anotación `is-default-class: 'true'`, cualquier PVC que no especifique `storageClassName` utilizará automáticamente esta clase NFS. El provisionador de subdirectorios creará una carpeta única en el servidor NFS para cada PVC.",
        interaccion: "¿Por qué en NFS es seguro utilizar `volumeBindingMode: Immediate` a diferencia de los discos de bloque en Cloud?",
        labGotcha: "Porque NFS es un recurso de red accesible desde cualquier nodo del clúster; no está atado a una zona de disponibilidad física.",
      },
    },
    {
      id: "m04-09-pvc-pod-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 04 • CONSUMO DE STORAGE",
      title: "Manifiesto de PVC y Consumo en el Pod",
      subtitle: "El enlace declarativo entre la petición de cuota y el punto de montaje",
      leftTitle: "Vinculación en el Manifiesto",
      directives: [
        { field: "storageClassName", desc: "Nombre de la StorageClass que aprovisionará el disco dinámicamente." },
        { field: "spec.volumes[].persistentVolumeClaim", desc: "En el Pod, asocia el PVC como un volumen lógico." },
        { field: "spec.containers[].volumeMounts", desc: "Monta el volumen en una ruta absoluta del contenedor (mountPath)." },
        { field: "subPath", desc: "Permite compartir un mismo volumen entre contenedores montando subcarpetas distintas." },
      ],
      filename: "pvc-and-pod.yaml",
      yamlCode: `apiVersion: v1
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
      claimName: app-data-pvc`,
      notes: {
        objetivo: "Ver en un solo archivo la relación entre la solicitud de almacenamiento (PVC) y su montaje en un Pod.",
        explicacion: "El contenedor solo ve un directorio local estándar (`/usr/share/nginx/html`). Es el Kubelet el que se encarga de que ese directorio apunte al volumen persistente de red.",
        interaccion: "¿Qué sucede si dos Pods distintos montan el mismo PVC RWO en dos nodos diferentes?",
        labGotcha: "El segundo Pod fallará al arrancar con un error `Multi-Attach error for volume`.",
      },
    },
    {
      id: "m04-10-snapshots-expansion",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 04 • OPERACIONES AVANZADAS",
      title: "Expansión Dinámica y VolumeSnapshots",
      subtitle: "Operaciones de mantenimiento de almacenamiento sin interrupción de servicio",
      cards: [
        {
          title: "Expansión de Volúmenes en Caliente",
          items: [
            "Paso 1: Modificar el PVC: `kubectl edit pvc <nombre>` y cambiar `storage: 10Gi` a `20Gi`.",
            "Paso 2: El CSI Driver expande el disco físico en la cabina o nube.",
            "Paso 3: Kubelet expande el sistema de archivos (`resize2fs` para ext4 o `xfs_growfs` para xfs) mientras el Pod sigue en ejecución.",
          ],
        },
        {
          title: "VolumeSnapshots (Copias Puntuales)",
          items: [
            "Recurso CRD estandarizado en K8s para tomar instantáneas a nivel de bloque.",
            "Componentes: `VolumeSnapshotClass` (driver del snapshot), `VolumeSnapshot` (petición de snapshot) y `VolumeSnapshotContent` (el snapshot real).",
            "Permite clonar entornos de staging o restaurar tras un fallo de datos.",
          ],
        },
        {
          title: "Restauración a partir de un Snapshot",
          items: [
            "Se crea un nuevo PVC especificando `spec.dataSource`:",
            "`dataSource: { name: 'mi-snapshot', kind: 'VolumeSnapshot', apiGroup: 'snapshot.storage.k8s.io' }`.",
            "Kubernetes aprovisiona un nuevo disco con los datos exactos del momento de la instantánea.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a redimensionar volúmenes en producción sin desmontar y a utilizar snapshots nativos.",
        explicacion: "Antiguamente, redimensionar un disco requería apagar el pod, clonar los datos a otro disco y recrear todo. Hoy, gracias a CSI, basta con cambiar el número en el YAML del PVC y Kubernetes hace la expansión en caliente.",
        interaccion: "¿Es necesario reiniciar el Pod tras redimensionar el PVC?",
        labGotcha: "En la mayoría de CSIs modernos no se requiere reinicio si el sistema de archivos soporta online-resize (como ext4 y XFS).",
      },
    },
  ],
};
