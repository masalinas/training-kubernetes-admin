// generator/modules/m01_architecture.js
// Módulo 01: Arquitectura Profunda e Instalación (11 diapositivas)

module.exports = {
  id: "m01",
  title: "Módulo 1: Arquitectura Profunda e Instalación",
  slides: [
    {
      id: "m01-01-cover",
      layout: "COVER",
      badge: "MÓDULO 01 • FUNDAMENTOS DEL CLÚSTER",
      title: "Arquitectura Profunda e Instalación",
      subtitle: "Control Plane, Workers, Red CNI y Despliegue con Kubeadm",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "4 Horas" },
        { label: "ENTORNO LAB", value: "VirtualBox + Kubeadm (2 Nodos)" },
        { label: "OBJETIVO CLAVE", value: "Entender la fontanería interna de K8s" },
      ],
      notes: {
        objetivo: "Introducir los fundamentos estructurales de Kubernetes y fijar los objetivos del módulo.",
        explicacion: "En este módulo desglosamos cómo se comunican los componentes de Kubernetes de forma asíncrona a través de eventos en kube-apiserver y cómo se configura la infraestructura base en Linux.",
        interaccion: "¿Qué diferencia a Kubernetes de un gestor de VMs tradicional como vCenter o OpenStack?",
        labGotcha: "Tener preparadas las dos máquinas virtuales con red interna o puente en VirtualBox antes de comenzar la sesión práctica.",
      },
    },
    {
      id: "m01-02-architecture-overview",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 01 • ARQUITECTURA",
      title: "Visión Global: Control Plane vs Plano de Datos",
      subtitle: "Separación estricta entre control declarativo y ejecución de contenedores",
      conceptTitle: "Principios de Diseño",
      points: [
        "Control Plane: Cerebro del clúster. Mantiene el estado deseado, toma decisiones de scheduling y responde a eventos del clúster.",
        "Plano de Datos (Workers): Ejecutan las cargas de trabajo (Pods) y gestionan la red y almacenamiento a nivel de host.",
        "kube-apiserver como único punto de contacto con etcd; ningún otro componente escribe en la base de datos.",
        "Comunicación asíncrona basada en bucles de reconciliación (Watch & Sync) mediante HTTP/2 y WebSockets.",
      ],
      diagramRenderer: "drawControlPlaneArchitecture",
      notes: {
        objetivo: "Diferenciar la responsabilidad de los componentes del Control Plane respecto a los nodos Workers.",
        explicacion: "Todos los componentes se comunican exclusivamente con kube-apiserver mediante TLS mutual (mTLS). Ni el scheduler ni el controller manager hablan entre sí directamente. kube-apiserver expone un API REST que valida y persisten los objetos en etcd.",
        interaccion: "¿Qué ocurre si se apaga el Control Plane mientras los Workers siguen encendidos? ¿Se caen los Pods?",
        labGotcha: "En producción, el Control Plane debe desplegarse en alta disponibilidad con al menos 3 nodos para tolerar la caída de 1 nodo etcd.",
      },
    },
    {
      id: "m01-03-control-plane",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • CONTROL PLANE",
      title: "Componentes del Control Plane en Detalle",
      subtitle: "Los cuatro pilares que garantizan la consistencia y estado del clúster",
      cards: [
        {
          title: "kube-apiserver",
          items: [
            "Punto de entrada único para kubectl, workers y servicios externos.",
            "Pipeline de procesamiento: Autenticación -> Autorización (RBAC) -> Mutating Admission -> Validating Admission -> Persistencia en etcd.",
            "Escalable horizontalmente (stateless detrás de un load balancer).",
          ],
        },
        {
          title: "etcd",
          items: [
            "Almacén clave-valor distribuido, consistente y transaccional.",
            "Implementa el algoritmo de consenso Raft.",
            "Guarda la única fuente de verdad (Single Source of Truth) del clúster.",
            "Requiere latencias de disco fsync < 10ms (SSD/NVMe).",
          ],
        },
        {
          title: "kube-scheduler",
          items: [
            "Asigna Pods no programados a nodos aptos en dos fases:",
            "1. Filtrado (Filtering): Descarta nodos sin CPU/Mem o con Taints.",
            "2. Puntuación (Scoring): Clasifica nodos por afinidad y dispersión.",
            "Escribe la decisión asignando `spec.nodeName` en el Pod.",
          ],
        },
        {
          title: "kube-controller-manager",
          items: [
            "Empaqueta múltiples bucles de control en un único binario.",
            "Node Controller, Deployment Controller, EndpointSlice Controller, etc.",
            "Compara continuamente el estado actual con el estado deseado.",
          ],
        },
      ],
      notes: {
        objetivo: "Profundizar en la responsabilidad técnica específica de cada binario del Control Plane.",
        explicacion: "kube-controller-manager es en realidad un demonio que corre decenas de controladores independientes. Si creamos un Deployment, el DeploymentController crea un ReplicaSet, y el ReplicaSetController crea los Pods. Cada controlador tiene una sola responsabilidad.",
        interaccion: "¿Por qué el scheduler no crea contenedores en el nodo? ¿Quién ejecuta realmente el contenedor?",
        labGotcha: "Verificar la salud de estos componentes en el clúster con `kubectl get componentstatuses` (deprecated) o comprobando los static pods en `/etc/kubernetes/manifests/`.",
      },
    },
    {
      id: "m01-04-etcd-deep-dive",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • CONTROL PLANE",
      title: "etcd: Consenso Raft y Alta Disponibilidad",
      subtitle: "Por qué etcd es el componente más crítico y sensible del clúster",
      cards: [
        {
          title: "Algoritmo Raft y Quórum",
          items: [
            "Fórmula de quórum: (N / 2) + 1 nodos operativos.",
            "Para tolerar 1 fallo: Clúster de 3 nodos (Quórum = 2).",
            "Para tolerar 2 fallos: Clúster de 5 nodos (Quórum = 3).",
            "Nunca usar número par de nodos: 4 nodos toleran 1 fallo, igual que 3, pero añaden más overhead de red.",
          ],
        },
        {
          title: "Sensibilidad al Disco y Red",
          items: [
            "etcd realiza escrituras sincrónicas con llamada del sistema `fsync()` para garantizar persistencia.",
            "Una latencia de disco superior a 10-15 ms provocará fallos en los 'heartbeats' de Raft y elecciones continuas de líder.",
            "Recomendación en producción: Discos NVMe dedicados sin compartir IOPS.",
          ],
        },
        {
          title: "Compactación y Desfragmentación",
          items: [
            "etcd es multiversión (MVCC): cada cambio crea una nueva versión de la clave sin borrar la anterior.",
            "Límite por defecto de espacio de base de datos: 2 GB (ampliable a 8 GB).",
            "Es necesario programar compactación periódica y `etcdctl defrag` para liberar espacio físico en disco.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la matemática del quórum en Raft y los requisitos de hardware de etcd.",
        explicacion: "Si etcd pierde el quórum (por ejemplo, caen 2 de 3 nodos), el clúster entra en modo de solo lectura o falla completamente. Los Pods siguen corriendo porque kubelet no los detiene, pero no se pueden crear servicios, escalar pods ni responder a caídas de nodos.",
        interaccion: "¿Qué sucede si tenemos un clúster de 2 masters y uno se apaga? ¿Tenemos quórum?",
        labGotcha: "En el laboratorio de VirtualBox de 2 nodos tendremos 1 Master y 1 Worker; etcd residirá solo en el Master.",
      },
    },
    {
      id: "m01-05-worker-nodes",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • PLANO DE DATOS",
      title: "Componentes del Worker Node",
      subtitle: "Los tres agentes que materializan las cargas en el sistema operativo",
      cards: [
        {
          title: "kubelet (El Agente Principal)",
          items: [
            "Servicio systemd nativo en el host (no corre en contenedor).",
            "Registra el nodo ante el API Server informando capacidad de CPU y RAM.",
            "Observa asignaciones con `spec.nodeName == su_nodo` vía Watch.",
            "Se comunica con el runtime por gRPC a través del socket de CRI.",
            "Supervisa la salud de contenedores con Liveness/Readiness probes.",
          ],
        },
        {
          title: "CRI: Container Runtime Interface",
          items: [
            "Estándar de interfaz abierta para desacoplar Kubernetes del runtime de contenedores.",
            "Estándar actual de facto: containerd o CRI-O (Docker shim eliminado en v1.24).",
            "Invoca a runc para crear namespaces de Linux (PID, NET, MNT, IPC, UTS) y configurar cgroups para limitar recursos.",
          ],
        },
        {
          title: "kube-proxy (El Enrutador de Red)",
          items: [
            "Se ejecuta normalmente como un DaemonSet en cada nodo del clúster.",
            "Gestiona el concepto de 'Kubernetes Service' programando reglas en el kernel del host.",
            "Modos de operación: iptables (por defecto) o IPVS (mayor rendimiento y balanceo avanzado).",
          ],
        },
      ],
      notes: {
        objetivo: "Detallar el rol de kubelet, containerd y kube-proxy en el nodo trabajador.",
        explicacion: "kubelet es el único componente que no corre dentro de Kubernetes; es el nexo entre el kernel de Linux y el control plane. Si kubelet muere, los contenedores siguen corriendo en containerd, pero el nodo pasará a estado NotReady para el API Server tras un timeout.",
        interaccion: "¿Qué pasaría si kubelet intentara hablar con el runtime de contenedores usando la API de Docker en Kubernetes v1.30+?",
        labGotcha: "Verificar siempre que `systemctl status kubelet` y `systemctl status containerd` estén en estado active (running).",
      },
    },
    {
      id: "m01-06-request-flow",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • FLUJO DE CONTROL",
      title: "Flujo de una Petición: De kubectl al Pod en Ejecución",
      subtitle: "Secuencia completa de 7 pasos sincronizados mediante eventos",
      cards: [
        {
          title: "1. Autenticación y Admisión",
          items: [
            "Usuario ejecuta: `kubectl apply -f pod.yaml`.",
            "apiserver autentica el cliente y RBAC valida permisos.",
            "Admission Controllers aplican mutaciones y validaciones.",
            "apiserver guarda el objeto en etcd con `spec.nodeName: ''`.",
          ],
        },
        {
          title: "2. Programación (Scheduling)",
          items: [
            "kube-scheduler tiene un 'Watch' activo sobre Pods sin asignar.",
            "Filtra los nodos aptos según CPU, memoria, taints y afinidad.",
            "Puntúa los nodos candidatos y elige el nodo óptimo (ej: `worker-1`).",
            "Envía una llamada `Binding` al apiserver asignando `nodeName: worker-1`.",
          ],
        },
        {
          title: "3. Detección en el Nodo (Kubelet)",
          items: [
            "kubelet de `worker-1` tiene un 'Watch' sobre Pods asignados a su nodo.",
            "Detecta el nuevo Pod y consulta las imágenes necesarias.",
            "Invoca al runtime containerd vía CRI: `RunPodSandbox`.",
            "Llama al plugin CNI (Calico/Flannel) para crear la interfaz veth y asignar IP.",
          ],
        },
        {
          title: "4. Creación y Ejecución",
          items: [
            "containerd descarga la imagen del registro si no está en caché.",
            "Crea y arranca los contenedores del Pod mediante runc.",
            "kubelet monitoriza el estado y notifica al apiserver: `Status: Running`.",
            "apiserver persiste el nuevo estado en etcd.",
          ],
        },
      ],
      notes: {
        objetivo: "Seguir cronológicamente el ciclo de vida de creación de un Pod entre todos los actores.",
        explicacion: "Nótese que en ningún momento el API Server 'ordena' activamente al Kubelet que cree el pod mediante una conexión saliente hacia el nodo. Son el Scheduler y el Kubelet los que están suscritos con HTTP Streaming (Watch) al API Server. Este patrón desacoplado es la clave de la escalabilidad de Kubernetes.",
        interaccion: "¿Por qué se utiliza el mecanismo de Watch en lugar de que el API Server haga polling o envíe push directo?",
        labGotcha: "Si un pod se queda en estado 'Pending', el fallo ocurrió en el paso 2 (el Scheduler no encontró nodo apto).",
      },
    },
    {
      id: "m01-07-cni-model",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • RED CNI",
      title: "Modelos de Red CNI (Container Network Interface)",
      subtitle: "Los tres principios fundamentales de conectividad en Kubernetes",
      cards: [
        {
          title: "Regla 1: IP Única por Pod",
          items: [
            "Cada Pod recibe su propia dirección IP enrutada.",
            "Todos los contenedores dentro del mismo Pod comparten la misma interfaz de red (localhost) y el mismo espacio de puertos.",
            "No hay colisiones de puertos entre Pods distintos en el mismo nodo.",
          ],
        },
        {
          title: "Regla 2: Comunicación Directa",
          items: [
            "Todos los Pods pueden comunicarse con todos los demás Pods del clúster sin usar NAT (Network Address Translation).",
            "La IP que un Pod ve como su dirección es exactamente la IP que ven los demás al comunicarse con él.",
            "Los agentes en un nodo (kubelet) pueden comunicarse con todos los Pods de ese nodo.",
          ],
        },
        {
          title: "Redes Overlay vs Enrutadas",
          items: [
            "Overlay (VXLAN/Geneve): Encapsula los paquetes del Pod dentro de paquetes UDP del host. Funciona sobre cualquier red física sin configurar routers.",
            "Enrutada (BGP): Los nodos anuncian las rutas de sus Pods a los switches físicos. Rendimiento nativo sin sobrecarga de encapsulación.",
          ],
        },
      ],
      notes: {
        objetivo: "Interiorizar el contrato de red de Kubernetes y cómo el CNI cumple las 3 reglas doradas.",
        explicacion: "En Docker tradicional, los contenedores comparten la IP del host y requieren mapeo de puertos (-p 8080:80). Kubernetes descartó ese modelo por ser ingobernable a escala. El estándar CNI es un binario que el Kubelet ejecuta pasándole un JSON por stdin cada vez que un Pod se añade o elimina.",
        interaccion: "¿Qué penalización de rendimiento introduce una red Overlay con VXLAN frente a una red enrutada plana?",
        labGotcha: "Si no se instala un plugin CNI tras `kubeadm init`, los nodos permanecerán perpetuamente en estado `NotReady` y CoreDNS en `Pending`.",
      },
    },
    {
      id: "m01-08-cni-comparison",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 01 • CNI",
      title: "Comparativa de CNI: Calico vs Flannel",
      subtitle: "Elegir el plugin adecuado según requisitos de seguridad y rendimiento",
      optionA: {
        tag: "Simplicidad y Ligereza",
        title: "Flannel",
        isRecommended: false,
        items: [
          "Diseñado exclusivamente para proveer conectividad L3 muy básica.",
          "Utiliza backend VXLAN por defecto para túneles overlay.",
          "Configuración mínima: solo requiere especificar el rango `pod-network-cidr`.",
          "LIMITACIÓN CRÍTICA: NO soporta Kubernetes NetworkPolicies (aislamiento de red).",
          "Ideal para: Entornos de desarrollo, Edge computing o laboratorios mínimos.",
        ],
      },
      optionB: {
        tag: "Producción y Seguridad (Recomendado)",
        title: "Calico",
        isRecommended: true,
        items: [
          "Soporta tanto redes Overlay (VXLAN / IP-in-IP) como redes nativas con BGP.",
          "Implementación completa y avanzada de NetworkPolicies de Kubernetes y políticas extendidas.",
          "Motor de políticas de alto rendimiento basado en iptables o eBPF.",
          "Cifrado de tráfico entre nodos con WireGuard nativo.",
          "Ideal para: Entornos empresariales, producción y preparación de CKA/CKS.",
        ],
      },
      notes: {
        objetivo: "Ayudar al alumno a seleccionar el CNI correcto entendiendo la gran diferencia en capacidades de seguridad.",
        explicacion: "Flannel es excelente para aprender porque casi nunca falla, pero en un entorno corporativo es inaceptable porque cualquier Pod puede hablar con cualquier otro (no hay firewall interno). Calico inspecciona el tráfico con el kernel de Linux y permite implementar Zero-Trust.",
        interaccion: "¿Si en un clúster con Flannel creamos un manifiesto de NetworkPolicy, da error de sintaxis al aplicarlo?",
        labGotcha: "Respuesta a la pregunta: No da error, se crea el objeto en etcd, pero Flannel simplemente ignora la política y no bloquea el tráfico.",
      },
    },
    {
      id: "m01-09-kubeadm-prerequisites",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 01 • INSTALACIÓN",
      title: "Instalación con Kubeadm en VirtualBox: Prerrequisitos",
      subtitle: "Preparación del sistema operativo Linux en las dos máquinas virtuales",
      cards: [
        {
          title: "1. Desactivación de Swap",
          items: [
            "`sudo swapoff -a` y comentar la línea en `/etc/fstab`.",
            "Motivo: kubelet asume que la memoria del nodo es determinista para gestionar la QoS y evitar que el kernel envíe memoria a disco.",
          ],
        },
        {
          title: "2. Módulos de Kernel y Sysctl",
          items: [
            "Cargar módulos: `overlay` y `br_netfilter`.",
            "`net.bridge.bridge-nf-call-iptables = 1`",
            "`net.ipv4.ip_forward = 1`",
            "Permite que el tráfico puenteado pase por las cadenas de iptables.",
          ],
        },
        {
          title: "3. Runtime containerd",
          items: [
            "Instalar `containerd.io` desde repositorios oficiales.",
            "Generar config limpia: `containerd config default`.",
            "IMPRESCINDIBLE: Configurar `SystemdCgroup = true` para unificar el gestor de cgroups con systemd.",
          ],
        },
        {
          title: "4. Paquetes de Kubernetes",
          items: [
            "Repositorio: `pkgs.k8s.io` (Debian/Ubuntu).",
            "Instalar: `kubeadm`, `kubelet` y `kubectl`.",
            "`sudo apt-mark hold kubeadm kubelet kubectl` para evitar actualizaciones automáticas accidentales.",
          ],
        },
      ],
      notes: {
        objetivo: "Detallar la lista de comprobaciones previas indispensables antes de inicializar el clúster con kubeadm.",
        explicacion: "El error más común en instalaciones manuales es el desajuste de cgroups entre containerd (cgroupfs) y systemd (systemd cgroup). Si ambos no usan `SystemdCgroup = true`, el kubelet fallará al arrancar con un error en los logs de journalctl.",
        interaccion: "¿Por qué bloqueamos los paquetes con `apt-mark hold`?",
        labGotcha: "Seguir atentamente la guía paso a paso proporcionada para VirtualBox para configurar la tarjeta de red interna con IPs fijas.",
      },
    },
    {
      id: "m01-10-kubeadm-init",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 01 • INSTALACIÓN",
      title: "Inicialización del Clúster: kubeadm init y join",
      subtitle: "De la generación de certificados y static pods a la adhesión del worker",
      leftTitle: "Fases Críticas de Kubeadm",
      directives: [
        { field: "--pod-network-cidr", desc: "Define el rango de IPs para los Pods (ej. 192.168.0.0/16 para Calico)." },
        { field: "--apiserver-advertise-address", desc: "IP del Master accesible por los nodos workers en la red interna." },
        { field: "Generación de PKI", desc: "Crea CA y certificados en /etc/kubernetes/pki con validez de 1 año." },
        { field: "Static Pods", desc: "Escribe manifiestos en /etc/kubernetes/manifests/ para que kubelet lance el Control Plane." },
        { field: "kubeadm join", desc: "Token de arranque (bootstrap token) y hash de CA para unir el worker de forma segura." },
      ],
      filename: "kubeadm-init-and-join.sh",
      yamlCode: `# 1. Inicializar Control Plane en el Master
sudo kubeadm init \\
  --apiserver-advertise-address=192.168.56.10 \\
  --pod-network-cidr=192.168.0.0/16

# 2. Configurar Kubeconfig para el usuario
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 3. Aplicar plugin CNI Calico
kubectl create -f tigera-operator.yaml
kubectl create -f custom-resources.yaml

# 4. En el Worker: Unirse al clúster
sudo kubeadm join 192.168.56.10:6443 \\
  --token abcdef.0123456789abcdef \\
  --discovery-token-ca-cert-hash sha256:7b5...`,
      notes: {
        objetivo: "Guiar paso a paso la ejecución de `kubeadm init` en el nodo máster y `kubeadm join` en el worker.",
        explicacion: "Al ejecutar `kubeadm init`, el binario no usa el API de Docker ni habla con un clúster existente. kubeadm genera los certificados en `/etc/kubernetes/pki`, crea los archivos kubeconfig en `/etc/kubernetes/` y deposita los ficheros YAML de apiserver, etcd, scheduler y controller-manager en `/etc/kubernetes/manifests/`. Kubelet detecta estos ficheros y arranca los pods estáticos.",
        interaccion: "¿Qué ocurre si el token de `kubeadm join` expira a las 24 horas y queremos unir un nuevo nodo?",
        labGotcha: "Si el token expira, se puede generar uno nuevo en el máster con `kubeadm token create --print-join-command`.",
      },
    },
    {
      id: "m01-11-kubeconfig",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 01 • HERRAMIENTAS",
      title: "Gestión de Contextos y Accesos con Kubeconfig",
      subtitle: "Estructura del archivo de configuración de kubectl para múltiples clústeres",
      leftTitle: "Los Tres Pilares de Kubeconfig",
      directives: [
        { field: "clusters", desc: "Define endpoints del API Server y los certificados CA de confianza (certificate-authority-data)." },
        { field: "users", desc: "Define credenciales del cliente: certificados cliente (client-certificate-data) o tokens OIDC/IAM." },
        { field: "contexts", desc: "La tupla vinculante que asocia (cluster + user + namespace por defecto)." },
        { field: "current-context", desc: "Indica a kubectl qué contexto está activo para las operaciones actuales." },
        { field: "Comandos útiles", desc: "kubectl config get-contexts, kubectl config use-context, kubectl config set-context." },
      ],
      filename: "~/.kube/config",
      yamlCode: `apiVersion: v1
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

current-context: admin@k8s-virtualbox`,
      notes: {
        objetivo: "Comprender la anatomía del archivo kubeconfig y aprender a alternar entre clústeres y namespaces.",
        explicacion: "kubectl no tiene estado interno. En cada comando, lee `~/.kube/config`, busca el `current-context`, extrae la URL del servidor y las claves criptográficas del usuario, y construye la petición HTTPS con el certificado cliente.",
        interaccion: "¿Cómo podemos comprobar qué permisos reales tiene el usuario actual en el clúster sin lanzar una acción destructiva?",
        labGotcha: "Respuesta: Usar `kubectl auth can-i create deployments` o `kubectl auth can-i --list` para verificar los permisos RBAC.",
      },
    },
  ],
};
