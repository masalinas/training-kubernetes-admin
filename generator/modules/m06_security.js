// generator/modules/m06_security.js
// Módulo 06: Seguridad del Clúster (Hardening) (13 diapositivas)

module.exports = {
  id: "m06",
  title: "Módulo 6: Seguridad del Clúster (Hardening)",
  slides: [
    {
      id: "m06-01-cover",
      layout: "COVER",
      badge: "MÓDULO 06 • SEGURIDAD Y HARDENING",
      title: "Seguridad del Clúster (Hardening)",
      subtitle: "RBAC, Network Policies Zero-Trust, Security Contexts y External Secrets",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "4.5 Horas" },
        { label: "ENTORNO LAB", value: "Minikube con Calico CNI" },
        { label: "OBJETIVO CLAVE", value: "Defensa en profundidad y principio de mínimo privilegio" },
      ],
      notes: {
        objetivo: "Presentar el modelo de seguridad integral de Kubernetes cubriendo identidad, red y tiempo de ejecución.",
        explicacion: "Por defecto, Kubernetes es 'inseguro por diseño' para facilitar el arranque: cualquier Pod puede hablar con cualquier otro, los contenedores corren como root y los Secrets solo están codificados en base64. En este módulo aprenderemos a blindar un clúster para producción corporativa.",
        interaccion: "¿Cuántos habéis auditado un clúster de Kubernetes con herramientas como Trivy, Kubescape o CIS Benchmark?",
        labGotcha: "Para que las NetworkPolicies funcionen en el laboratorio, Minikube debe arrancarse con un CNI compatible como Calico (`minikube start --cni=calico`).",
      },
    },
    {
      id: "m06-02-defense-in-depth",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 06 • MODELO ZERO-TRUST",
      title: "El Modelo de Defensa en Profundidad",
      subtitle: "Ninguna capa de seguridad es suficiente por sí sola",
      conceptTitle: "Las 4 'C's de la Seguridad Cloud Native",
      points: [
        "Cloud / Data Center: Seguridad física del hardware, redes perimetrales e IAM de la nube.",
        "Cluster: Control de acceso a la API (RBAC), auditoría y aislamiento de red interna (NetworkPolicies).",
        "Container: Imágenes firmadas libres de vulnerabilidades (CVEs), no-root y capacidades de Linux mínimas.",
        "Code: Seguridad en el código fuente, dependencias actualizadas y comunicaciones TLS internas.",
      ],
      diagramRenderer: "drawSecurityZeroTrust",
      notes: {
        objetivo: "Enseñar a pensar en seguridad multicapa: si un atacante compromete un contenedor web, no debe poder escalar al host ni pivotar por la red hacia la base de datos.",
        explicacion: "El modelo Zero-Trust asume que el perímetro ya ha sido vulnerado. Incluso dentro de la misma VPC y del mismo clúster, ningún servicio debe confiar en otro sin autenticación y políticas explícitas.",
        interaccion: "¿Si un atacante consigue ejecución remota de código (RCE) en un Pod de frontend, qué medidas evitan que robe la base de datos?",
        labGotcha: "Respuesta: Las NetworkPolicies evitan que la red llegue a la BD, y un SecurityContext no-root evita que el atacante instale herramientas de escaneo en el contenedor.",
      },
    },
    {
      id: "m06-03-authentication",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • AUTENTICACIÓN",
      title: "Autenticación en Kubernetes: Usuarios y ServiceAccounts",
      subtitle: "¿Quién eres? La primera puerta de entrada a la API",
      cards: [
        {
          title: "Usuarios Humanos (Users)",
          items: [
            "Kubernetes NO tiene una base de datos de usuarios en etcd (no existe `kubectl get users`).",
            "La identidad se delega externamente:",
            "• Certificados X.509 cliente: El Common Name (CN) es el usuario y Organization (O) son sus grupos.",
            "• Proveedores OIDC / IAM corporativos: Google Workspace, Azure AD, Okta, Keycloak.",
          ],
        },
        {
          title: "Cuentas de Servicio (ServiceAccounts)",
          items: [
            "Gestionadas nativamente dentro de Kubernetes (recurso en namespace).",
            "Identidad para procesos y aplicaciones que corren dentro de los Pods.",
            "Montan automáticamente un Token JWT firmado por la API en `/var/run/secrets/kubernetes.io/serviceaccount/token`.",
            "Token proyectado temporal (K8s 1.24+): expira y se rota automáticamente.",
          ],
        },
        {
          title: "Buenas Prácticas de ServiceAccount",
          items: [
            "Nunca usar la ServiceAccount `default` para aplicaciones críticas.",
            "Crear una ServiceAccount dedicada por cada aplicación (`serviceAccountName: mi-app`).",
            "Desactivar el automount del token si la app no necesita hablar con el API de K8s: `automountServiceAccountToken: false`.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la diferencia crucial entre identidades humanas y ServiceAccounts de aplicaciones.",
        explicacion: "En K8s 1.24+, los secretos estáticos de ServiceAccount ya no se crean automáticamente por defecto. Se utiliza la API `TokenRequest` para proyectar un token JWT efímero con tiempo de expiración (por defecto 1 hora), rotado automáticamente por Kubelet.",
        interaccion: "¿Por qué es una mala práctica dejar `automountServiceAccountToken: true` en aplicaciones que no usan la API de Kubernetes?",
        labGotcha: "Si un atacante compromete la app, encuentra inmediatamente en el filesystem un token JWT válido para consultar el API Server.",
      },
    },
    {
      id: "m06-04-rbac-fundamentals",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • AUTORIZACIÓN RBAC",
      title: "RBAC: Sujetos, Reglas y Vinculaciones",
      subtitle: "Control de acceso basado en roles con el principio de mínimo privilegio",
      cards: [
        {
          title: "1. Sujetos (Subjects)",
          items: [
            "¿Quién solicita el acceso?",
            "• User: Un usuario humano autenticado.",
            "• Group: Un grupo corporativo (ej: `developers`).",
            "• ServiceAccount: Un proceso dentro del clúster.",
          ],
        },
        {
          title: "2. Reglas (Rules / API Groups / Verbs)",
          items: [
            "¿Qué acción tiene permitida?",
            "• apiGroups: '' (core), 'apps', 'batch', 'networking.k8s.io'.",
            "• resources: 'pods', 'services', 'deployments', 'secrets'.",
            "• verbs: 'get', 'list', 'watch', 'create', 'update', 'delete'.",
          ],
        },
        {
          title: "3. Vinculaciones (Bindings)",
          items: [
            "El pegamento que une al Sujeto con el Rol.",
            "`RoleBinding`: Concede los permisos dentro de un Namespace específico.",
            "`ClusterRoleBinding`: Concede los permisos en TODO el clúster.",
          ],
        },
        {
          title: "Principio de Mínimo Privilegio",
          items: [
            "Por defecto, NINGÚN usuario ni ServiceAccount tiene permisos (Deny por defecto).",
            "Evitar siempre el uso de comodines peligrosos: `verbs: ['*']` o `resources: ['*']`.",
            "Separar estrictamente permisos de lectura (`get, list`) de permisos de mutación.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender el modelo mental de RBAC: Subject + Role + Binding.",
        explicacion: "RBAC es aditivo (whitelist pura): no existen reglas de 'Deny'. Si ninguna regla autoriza explícitamente la acción solicitada para ese sujeto en ese namespace, la petición es denegada con un HTTP 403 Forbidden.",
        interaccion: "¿Por qué conceder permiso `create` sobre `pods` puede permitir indirectamente escalar a permisos de root en el host físico?",
        labGotcha: "Un usuario que puede crear pods puede crear un pod con `privileged: true` y `hostPID: true`, escapando al host.",
      },
    },
    {
      id: "m06-05-roles-vs-clusterroles",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 06 • RBAC SCOPES",
      title: "Roles vs ClusterRoles y sus Bindings",
      subtitle: "Ámbito de espacio de nombres frente a ámbito global de clúster",
      optionA: {
        tag: "Ámbito de Namespace (Aislado)",
        title: "Role & RoleBinding",
        isRecommended: true,
        items: [
          "Definido estrictamente dentro de un Namespace (`metadata.namespace`).",
          "Solo permite gobernar recursos que pertenecen a un namespace (Pods, Services, Deployments, PVCs).",
          "Un `RoleBinding` solo concede acceso dentro de ese namespace.",
          "TRUCO AVANZADO: Se puede vincular un `ClusterRole` genérico (ej. `view`) mediante un `RoleBinding` para limitar sus efectos a un único namespace sin duplicar roles.",
          "El estándar recomendado para equipos de desarrollo multi-tenant.",
        ],
      },
      optionB: {
        tag: "Ámbito de Clúster (Global)",
        title: "ClusterRole & ClusterRoleBinding",
        isRecommended: false,
        items: [
          "Recurso no namespaced a nivel de todo el clúster.",
          "Obligatorio para gobernar recursos no-namespaced (Nodes, PersistentVolumes, StorageClasses, Namespaces).",
          "Obligatorio para acceder a endpoints no pertenecientes a recursos (ej: `/healthz`, `/metrics`).",
          "Un `ClusterRoleBinding` concede esos permisos en absolutamente TODOS los namespaces presentes y futuros del clúster.",
          "Reservado exclusivamente para administradores de plataforma y operadores globales.",
        ],
      },
      notes: {
        objetivo: "Dominar la diferencia entre ámbitos de Namespace y clúster global en RBAC.",
        explicacion: "Un patrón excelente de diseño es crear ClusterRoles reutilizables (como `developer-read-only`) y luego asociarlos en cada namespace mediante `RoleBinding` a los desarrolladores de cada equipo. Esto ahorra tener que definir 50 Roles idénticos en 50 namespaces.",
        interaccion: "¿Qué ocurre si vinculamos un ClusterRole mediante un RoleBinding en el namespace 'staging'?",
        labGotcha: "El usuario tendrá esos permisos ÚNICAMENTE dentro del namespace 'staging', no en el resto del clúster.",
      },
    },
    {
      id: "m06-06-rbac-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 06 • MANIFIESTOS RBAC",
      title: "Manifiesto RBAC en la Práctica: De la Regla al Binding",
      subtitle: "Definición de rol de solo lectura de logs y su vinculación a un desarrollador",
      leftTitle: "Componentes del Rol",
      directives: [
        { field: "apiGroups", desc: "'' para core API (pods, services, configmaps), 'apps' para deployments." },
        { field: "resources", desc: "Recursos y sub-recursos (ej: 'pods/log', 'pods/exec', 'pods/status')." },
        { field: "verbs", desc: "Acciones permitidas: get, list, watch, create, update, patch, delete." },
        { field: "subjects.kind", desc: "User, Group o ServiceAccount." },
        { field: "roleRef", desc: "Puntero inmutable al Role o ClusterRole que se está asignando." },
      ],
      filename: "rbac-log-reader.yaml",
      yamlCode: `apiVersion: rbac.authorization.k8s.io/v1
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
  apiGroup: rbac.authorization.k8s.io`,
      notes: {
        objetivo: "Analizar la sintaxis exacta de un Role y un RoleBinding incluyendo sub-recursos como `pods/log`.",
        explicacion: "Nótese el sub-recurso `pods/log`. En Kubernetes, los logs no son un campo del Pod, sino un sub-recurso de la API REST. Un usuario puede tener permiso para ver la lista de pods (`get pods`) pero no tener permiso para ver los logs confidenciales (`pods/log`).",
        interaccion: "¿Cómo concederíamos permiso para entrar a una shell interactiva con `kubectl exec`?",
        labGotcha: "Respuesta: Añadir `pods/exec` con el verbo `create`.",
      },
    },
    {
      id: "m06-07-auth-can-i",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • AUDITORÍA RBAC",
      title: "Auditoría de Permisos con kubectl auth can-i",
      subtitle: "Verificación proactiva de permisos sin ejecutar acciones destructivas",
      cards: [
        {
          title: "Consulta Básica de Permisos",
          items: [
            "`kubectl auth can-i create deployments` -> Devuelve `yes` o `no`.",
            "`kubectl auth can-i delete pods -n produccion`",
            "Comprueba si el usuario actual tiene autorización para esa acción según las reglas RBAC activas.",
          ],
        },
        {
          title: "Impersonación (Suplantación para Pruebas)",
          items: [
            "Los administradores pueden comprobar qué puede hacer otro usuario:",
            "`kubectl auth can-i get secrets --as ana.garcia@empresa.com -n produccion`.",
            "Permite verificar que las restricciones RBAC funcionan antes de entregar los accesos al equipo.",
          ],
        },
        {
          title: "Matriz Completa de Privilegios",
          items: [
            "`kubectl auth can-i --list -n produccion`",
            "Vuelca una tabla completa con todos los API groups, recursos y verbos que el usuario tiene concedidos en ese namespace.",
            "Esencial para auditorías de cumplimiento y certificaciones de seguridad.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a usar la herramienta más potente de auditoría y validación de RBAC incluida en kubectl.",
        explicacion: "`kubectl auth can-i` utiliza por debajo la API `SelfSubjectAccessReview` o `SubjectAccessReview`. Envía una consulta formal al API Server pidiendo que evalúe la matriz RBAC sin llegar a ejecutar la acción.",
        interaccion: "¿Quién puede usar la flag `--as` para suplantar a otro usuario?",
        labGotcha: "Solo usuarios o ServiceAccounts que tengan concedido el verbo `impersonate` en recursos `users` o `serviceaccounts`.",
      },
    },
    {
      id: "m06-08-network-policies-zero-trust",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • FIREWALL INTERNO",
      title: "Network Policies: Implementación de Zero-Trust",
      subtitle: "Aislamiento de tráfico a nivel de Pod dentro del clúster",
      cards: [
        {
          title: "El Estado por Defecto (Default Allow)",
          items: [
            "Por defecto en Kubernetes, la red es completamente PLANA y abierta.",
            "Cualquier Pod en cualquier namespace puede conectarse por TCP/UDP a cualquier otro Pod.",
            "Si un contenedor web es vulnerado, el atacante puede escanear la base de datos interna o el servicio de pagos.",
          ],
        },
        {
          title: "El Principio de Default Deny",
          items: [
            "La primera regla de seguridad en producción: Aplicar una política que BLOQUEE todo el tráfico entrante y saliente por defecto.",
            "A partir de ahí, se añaden reglas explícitas de whitelist permitiendo únicamente las conexiones legítimas (ej: Frontend -> Backend en puerto 8080).",
          ],
        },
        {
          title: "Dependencia Absoluta del Plugin CNI",
          items: [
            "Las NetworkPolicies son objetos nativos de K8s, pero K8s NO las aplica directamente.",
            "El plugin CNI DEBE tener soporte de NetworkPolicy (Calico, Cilium, Weave Net).",
            "Con Flannel básico, las NetworkPolicies se crean sin error pero son IGNORADAS por completo.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la necesidad urgente de NetworkPolicies para eliminar el modelo plano de red y aplicar Zero-Trust.",
        explicacion: "Las NetworkPolicies actúan como un cortafuegos distribuido a nivel de Pod (micro-segmentación). Las reglas se programan en el kernel de Linux de cada nodo trabajador mediante iptables (Calico) o eBPF (Cilium).",
        interaccion: "¿Por qué en desarrollo casi nadie configura NetworkPolicies pero en producción son obligatorias para PCI-DSS o ISO 27001?",
        labGotcha: "Porque configurarlas requiere mapear con precisión quirúrgica qué puertos y servicios hablan entre sí.",
      },
    },
    {
      id: "m06-09-network-policy-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 06 • MANIFIESTOS DE RED",
      title: "Manifiesto de NetworkPolicy: Aislamiento de Base de Datos",
      subtitle: "Permitir acceso a PostgreSQL únicamente desde Pods con etiqueta app: backend",
      leftTitle: "Estructura de la Política",
      directives: [
        { field: "podSelector", desc: "Selecciona los Pods a los que se aplica la restricción (ej: app: postgres)." },
        { field: "policyTypes", desc: "Ingress (tráfico entrante), Egress (tráfico saliente) o ambos." },
        { field: "ingress.from.podSelector", desc: "Solo acepta tráfico de Pods que tengan la etiqueta especificada." },
        { field: "ingress.from.namespaceSelector", desc: "Restringe el tráfico según etiquetas del Namespace de origen." },
        { field: "ports", desc: "Puerto exacto permitido (ej: 5432). Cualquier otro puerto es descartado." },
      ],
      filename: "db-network-policy.yaml",
      yamlCode: `apiVersion: networking.k8s.io/v1
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
      port: 5432`,
      notes: {
        objetivo: "Analizar con detalle la sintaxis combinada de podSelector y namespaceSelector en NetworkPolicies.",
        explicacion: "Cuidado con la sintaxis de guiones en YAML: si `podSelector` y `namespaceSelector` están bajo el mismo guion `-`, actúan como un 'AND' (mismo namespace con esa etiqueta Y ese podSelector). Si están en guiones separados `-`, actúan como un 'OR'.",
        interaccion: "¿Qué le ocurre a una petición que envía un Pod con etiqueta `app: frontend` hacia el puerto 5432 de la base de datos?",
        labGotcha: "La petición sufre un 'DROP' silencioso en el kernel del nodo; el frontend se quedará esperando hasta que venza su timeout.",
      },
    },
    {
      id: "m06-10-pod-security-standards",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • ESTÁNDARES PSS",
      title: "Pod Security Standards (PSS) y Admission",
      subtitle: "El sustituto moderno de las obsoletas PodSecurityPolicies (PSP)",
      cards: [
        {
          title: "1. Privileged (Sin Restricciones)",
          items: [
            "Permite cualquier privilegio de contenedor conocido.",
            "Acceso root total, privilegios de host y capacidades de red completas.",
            "Reservado para agentes de infraestructura de sistema (CNI, monitorización).",
          ],
        },
        {
          title: "2. Baseline (Seguridad Básica)",
          items: [
            "Evita escaladas de privilegios conocidas y previene configuraciones de riesgo obvias.",
            "Bloquea `hostNetwork`, `hostPID`, `hostIPC` y montajes peligrosos del host.",
            "Permite que los contenedores corran como root si no se especifica lo contrario.",
          ],
        },
        {
          title: "3. Restricted (Máxima Seguridad)",
          items: [
            "Debe correr obligatoriamente como usuario no-root (`runAsNonRoot: true`).",
            "Sistema de archivos raíz en modo de solo lectura (`readOnlyRootFilesystem: true`).",
            "Descartar todas las capacidades de Linux (`capabilities.drop: ['ALL']`).",
            "Desactivar escalada de privilegios (`allowPrivilegeEscalation: false`).",
          ],
        },
      ],
      notes: {
        objetivo: "Conocer los 3 perfiles oficiales de Pod Security Standards de Kubernetes.",
        explicacion: "A partir de K8s 1.25, Pod Security Admission reemplazó a las antiguas PodSecurityPolicies. Se activa etiquetando namespaces con `pod-security.kubernetes.io/enforce: restricted`.",
        interaccion: "¿Qué modos de control de PSS existen además de 'enforce'?",
        labGotcha: "Existen `audit` (registra violaciones en el log de auditoría sin bloquear) y `warn` (muestra avisos en la terminal del usuario al ejecutar kubectl).",
      },
    },
    {
      id: "m06-11-securitycontext-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 06 • SECURITY CONTEXT",
      title: "SecurityContext: Endurecimiento a Nivel de Contenedor",
      subtitle: "Restricción de privilegios de Linux en tiempo de ejecución",
      leftTitle: "Directivas de Endurecimiento",
      directives: [
        { field: "runAsNonRoot", desc: "Valida que el UID no sea 0 (root). Si la imagen intenta correr como root, el Pod falla al arrancar." },
        { field: "runAsUser / runAsGroup", desc: "Fuerza un UID y GID específico en Linux (ej: 10001)." },
        { field: "allowPrivilegeEscalation", desc: "false deshabilita binarios con bit SUID en Linux impidiendo escalar privilegios." },
        { field: "readOnlyRootFilesystem", desc: "true hace que todo el sistema de archivos sea de solo lectura (inmune a inyección de malware)." },
        { field: "capabilities.drop", desc: "['ALL'] elimina todas las 38 capacidades administrativas de Linux." },
      ],
      filename: "secure-pod.yaml",
      yamlCode: `apiVersion: v1
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
    emptyDir: {}`,
      notes: {
        objetivo: "Analizar el manifiesto de un Pod con endurecimiento militar según el perfil PSS Restricted.",
        explicacion: "Si la app necesita escribir temporalmente (ej: logs o caches locales), con `readOnlyRootFilesystem: true` fallará a menos que le montemos un volumen `emptyDir` en `/tmp`. Esto garantiza que un atacante no pueda modificar binarios del sistema ni instalar scripts persistentes.",
        interaccion: "¿Qué hace la directiva `seccompProfile: RuntimeDefault`?",
        labGotcha: "Bloquea más de 40 llamadas del sistema (syscalls) peligrosas de Linux que los contenedores no necesitan en condiciones normales.",
      },
    },
    {
      id: "m06-12-secrets-management",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • GESTIÓN DE SECRETOS",
      title: "Secretos Nativos de Kubernetes y sus Riesgos",
      subtitle: "¿Por qué un Secret de Kubernetes no es un sistema seguro de contraseñas?",
      cards: [
        {
          title: "El Mito de la Seguridad en Base64",
          items: [
            "Los Secrets en Kubernetes se codifican en Base64: NO ESTÁN CIFRADOS.",
            "Cualquiera con permiso `get secrets` puede ejecutar: `echo 'cGFzc3dvcmQ=' | base64 -d` y leer la clave en texto plano.",
            "Base64 es solo un formato de serialización para transportar datos binarios, no un mecanismo de seguridad.",
          ],
        },
        {
          title: "Cifrado en Reposo en etcd (Encryption at Rest)",
          items: [
            "Por defecto, etcd guarda los secretos en texto plano en disco.",
            "Es imprescindible configurar `EncryptionConfiguration` con proveedores como AES-GCM o KMS (HashiCorp Vault, AWS KMS, GCP KMS).",
            "Protege contra robos de backups de etcd o accesos directos al disco del Master.",
          ],
        },
        {
          title: "Buenas Prácticas Nativas",
          items: [
            "Nunca subir archivos YAML con Secretos a repositorios Git públicos o privados (peligro masivo de fugas).",
            "Montar los secretos como volúmenes de archivo en lugar de variables de entorno (las variables de entorno quedan expuestas en logs de crash y `/proc/<pid>/environ`).",
          ],
        },
      ],
      notes: {
        objetivo: "Desmitificar los Secretos nativos de Kubernetes y comprender la diferencia entre codificación (Base64) y cifrado criptográfico.",
        explicacion: "Guardar contraseñas en Git aunque estén en Base64 es el vector de ataque número uno en fugas de datos. Para GitOps seguro se requieren herramientas como Sealed Secrets o External Secrets Operator.",
        interaccion: "¿Por qué es más seguro montar un Secreto como fichero en `/etc/secrets/db-pass` que pasarlo como variable de entorno `DB_PASSWORD`?",
        labGotcha: "Porque los comandos de debug como `docker inspect` o volcados de excepciones de Java/Python suelen imprimir todas las variables de entorno en los logs.",
      },
    },
    {
      id: "m06-13-external-secrets-operator",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 06 • EXTERNAL SECRETS",
      title: "Secretos Corporativos: External Secrets Operator (ESO)",
      subtitle: "Sincronización segura desde HashiCorp Vault, AWS Secrets Manager o Azure Key Vault",
      cards: [
        {
          title: "El Desafío de GitOps",
          items: [
            "En flujos de CI/CD modernos (ArgoCD, Flux), todo debe estar en Git.",
            "¿Cómo desplegar manifiestos sin exponer contraseñas reales en el repositorio?",
            "Solución: Almacenar los secretos en un gestor corporativo centralizado (HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager).",
          ],
        },
        {
          title: "Arquitectura de External Secrets Operator",
          items: [
            "1. SecretStore / ClusterSecretStore: Configura la autenticación segura hacia la bóveda externa.",
            "2. ExternalSecret (CRD): Declara: 'Trae la clave /prod/db/password de Vault y crea un Secret nativo de K8s llamado db-credentials'.",
            "3. ESO se encarga de crear, rotar y sincronizar el Secret nativo en memoria de Kubernetes automáticamente.",
          ],
        },
        {
          title: "Ventajas Operativas",
          items: [
            "Cero credenciales en los repositorios de código de Git.",
            "Rotación automática de contraseñas: si la clave cambia en Vault, ESO actualiza el Secret en K8s en segundos.",
            "Auditoría centralizada en el gestor de secretos corporativo.",
          ],
        },
      ],
      notes: {
        objetivo: "Presentar la solución estándar del ecosistema para gestión segura de credenciales en flujos GitOps.",
        explicacion: "External Secrets Operator permite mantener el ciclo de vida del secreto fuera de Kubernetes (con rotaciones automáticas en Vault o AWS) mientras que los Pods de la aplicación siguen consumiendo un Secret estándar de Kubernetes sin enterarse del origen.",
        interaccion: "¿Qué ventaja tiene External Secrets Operator frente a la solución de Vault CSI Provider?",
        labGotcha: "ESO crea objetos Secret nativos de K8s reales compatibles con cualquier Helm chart o aplicación existente sin modificar sus manifiestos.",
      },
    },
  ],
};
