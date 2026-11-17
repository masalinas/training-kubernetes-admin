// generator/modules/m08_helm.js
// Módulo 08: Automatización con Helm (Gestor de Paquetes) (9 diapositivas)

module.exports = {
  id: "m08",
  title: "Módulo 8: Automatización con Helm",
  slides: [
    {
      id: "m08-01-cover",
      layout: "COVER",
      badge: "MÓDULO 08 • EMPAQUETADO Y DESPLIEGUE",
      title: "Automatización con Helm",
      subtitle: "Charts, Plantillas Go, Parametrización Multi-Entorno y Rollbacks",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "2 Horas" },
        { label: "ENTORNO LAB", value: "Minikube con Helm CLI" },
        { label: "OBJETIVO CLAVE", value: "Empaquetar y parametrizar aplicaciones complejas" },
      ],
      notes: {
        objetivo: "Presentar Helm como el gestor de paquetes estándar del ecosistema Kubernetes.",
        explicacion: "Desplegar aplicaciones complejas (como Grafana o WordPress) mediante YAMLs estáticos individuales es inmanejable. Helm permite empaquetar decenas de manifiestos en un único artefacto versionado y parametrizable.",
        interaccion: "¿Cuántos habéis usado Helm para instalar herramientas de terceros o para vuestras propias aplicaciones?",
        labGotcha: "Asegurarse de tener el binario `helm` instalado en la máquina cliente para interactuar con el clúster.",
      },
    },
    {
      id: "m08-02-why-helm",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 08 • FUNDAMENTOS",
      title: "¿Por Qué Helm? El Problema de los YAMLs Estáticos",
      subtitle: "De la duplicación manual de manifiestos a la parametrización profesional",
      cards: [
        {
          title: "El 'YAML Hell' en Producción",
          items: [
            "Una aplicación real requiere Deployment, Service, Ingress, HPA, ConfigMap, Secret, ServiceAccount y NetworkPolicy.",
            "Son cientos de líneas de configuración con valores repetidos en múltiples archivos.",
            "Cualquier cambio manual de versión o puerto requiere editar 5 ficheros a la vez.",
          ],
        },
        {
          title: "El Reto de los Múltiples Entornos",
          items: [
            "En Desarrollo: 1 réplica, recursos mínimos, sin TLS, base de datos local.",
            "En Producción: 5 réplicas, alta disponibilidad, TLS estricto, base de datos externa.",
            "Sin Helm: Se duplican carpetas enteras de YAMLs (`k8s/dev` y `k8s/prod`), divergiendo con el tiempo.",
          ],
        },
        {
          title: "La Solución de Helm",
          items: [
            "El equivalente a APT, YUM o NPM para Kubernetes.",
            "Unifica todos los manifiestos en una plantilla reutilizable (**Chart**).",
            "Inyecta valores específicos por entorno mediante ficheros `values.yaml`.",
            "Mantiene un historial de versiones transaccional (**Releases**).",
          ],
        },
      ],
      notes: {
        objetivo: "Justificar por qué Helm es indispensable para la automatización en cualquier empresa seria.",
        explicacion: "Helm no solo genera YAMLs: gestiona el ciclo de vida. Si instalas un Chart con 10 recursos y luego haces `helm uninstall`, Helm borra limpiamente los 10 recursos sin dejar basura huérfana en el clúster.",
        interaccion: "¿Qué diferencia a Helm v3 de Helm v2?",
        labGotcha: "En Helm v3 se eliminó por completo 'Tiller' (el componente de servidor que requería permisos de ClusterAdmin y era un agujero de seguridad masivo). Helm v3 es puramente cliente.",
      },
    },
    {
      id: "m08-03-chart-anatomy",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 08 • ESTRUCTURA",
      title: "Anatomía de un Helm Chart",
      subtitle: "Estructura estándar de directorios y convenciones de empaquetado",
      cards: [
        {
          title: "Chart.yaml (Metadatos)",
          items: [
            "`name`: Nombre del paquete.",
            "`version`: Versión SemVer del propio Chart (ej: 1.2.0).",
            "`appVersion`: Versión de la aplicación que empaqueta (ej: nginx 1.25.4).",
            "`description`, `maintainers`, `dependencies`.",
          ],
        },
        {
          title: "values.yaml (Valores por Defecto)",
          items: [
            "Fichero central de variables y parámetros.",
            "Define valores por defecto seguros para réplicas, puertos, imágenes, recursos y flags de activación.",
            "Sobre-escribible por el usuario en tiempo de instalación.",
          ],
        },
        {
          title: "templates/ (Las Plantillas)",
          items: [
            "Contiene los ficheros YAML con sintaxis de plantillas Go (Go Templates).",
            "`deployment.yaml`, `service.yaml`, `ingress.yaml`.",
            "`_helpers.tpl`: Funciones y plantillas parciales reutilizables.",
            "`NOTES.txt`: Mensaje que se imprime en consola tras instalar el Chart.",
          ],
        },
        {
          title: "charts/ y .helmignore",
          items: [
            "`charts/`: Directorio donde residen los sub-charts o dependencias del paquete.",
            "`.helmignore`: Patrones de exclusión para no empaquetar ficheros temporales ni `.git`.",
          ],
        },
      ],
      notes: {
        objetivo: "Conocer la estructura de carpetas que genera el comando `helm create <nombre>`.",
        explicacion: "Es crucial entender la diferencia entre `version` (la versión del empaquetado de Helm) y `appVersion` (la versión del software). Se puede corregir un bug en el `service.yaml` y subir la versión del Chart a `1.0.1` sin que cambie la `appVersion` de la aplicación.",
        interaccion: "¿Qué comando crea la plantilla base de un Chart en segundos?",
        labGotcha: "Ejecutar `helm create mi-app` genera toda esta estructura con ejemplos funcionales.",
      },
    },
    {
      id: "m08-04-go-templating-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 08 • MOTOR DE PLANTILLAS",
      title: "El Motor de Plantillas de Go: Variables y Funciones",
      subtitle: "Inyección dinámica de valores, condicionales y tuberías (pipelines)",
      leftTitle: "Sintaxis de Go Templates",
      directives: [
        { field: "{{ .Values.clave }}", desc: "Acceso a variables definidas en el fichero values.yaml." },
        { field: "{{ .Release.Name }}", desc: "Objeto predefinido de Helm con el nombre de la release instalada." },
        { field: "Tuberías | (Pipes)", desc: "Envía el valor a funciones de transformación (ej: quote, default, upper)." },
        { field: "Condicionales if/else", desc: "Permite activar o desactivar bloques completos (ej: solo crear Ingress si enabled: true)." },
        { field: "nindent", desc: "Ajusta automáticamente la indentación de bloques YAML para evitar errores de sintaxis." },
      ],
      filename: "templates/deployment.yaml",
      yamlCode: `apiVersion: apps/v1
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
        {{- end }}`,
      notes: {
        objetivo: "Aprender a parametrizar un manifiesto YAML de Kubernetes utilizando el motor de plantillas de Helm.",
        explicacion: "Fijaos en `toYaml .Values.resources | nindent 10`. Esto toma el bloque entero de recursos del `values.yaml` y lo indenta automáticamente con 10 espacios para que coincida exactamente con la jerarquía del YAML.",
        interaccion: "¿Qué significa el guion al inicio de una etiqueta `{{- if ... }}`?",
        labGotcha: "El guion le dice al motor de plantillas que elimine los espacios en blanco y saltos de línea sobrantes.",
      },
    },
    {
      id: "m08-05-values-dev-vs-prod",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 08 • MULTIENTORNO",
      title: "Parametrización Multientorno: values-dev vs values-prod",
      subtitle: "Un único Chart probado, desplegado con configuraciones independientes",
      optionA: {
        tag: "Entorno Ligero",
        title: "values-dev.yaml",
        isRecommended: false,
        items: [
          "`replicaCount: 1` (Ahorro de recursos de CPU/Memoria).",
          "`image.tag: 'latest'` o rama de feature.",
          "`ingress.enabled: false` (acceso directo por port-forward).",
          "`resources.requests: { cpu: 50m, memory: 64Mi }`.",
          "`env.LOG_LEVEL: 'DEBUG'`.",
          "Despliegue: `helm upgrade --install app ./mi-chart -f values-dev.yaml`.",
        ],
      },
      optionB: {
        tag: "Entorno Blindado (Producción)",
        title: "values-prod.yaml",
        isRecommended: true,
        items: [
          "`replicaCount: 5` con PodDisruptionBudget activado.",
          "`image.tag: 'v1.4.2'` (Tags inmutables, prohibido 'latest').",
          "`ingress.enabled: true` con certificados TLS cert-manager.",
          "`resources.limits` estrictos para evitar fugas.",
          "`env.LOG_LEVEL: 'WARN'`.",
          "Despliegue: `helm upgrade --install app ./mi-chart -f values-prod.yaml`.",
        ],
      },
      notes: {
        objetivo: "Demostrar el flujo estándar de CI/CD: el artefacto empaquetado es idéntico; solo varían los values inyectados.",
        explicacion: "El gran principio de DevOps es 'build once, deploy anywhere'. Si el Chart pasa los tests en staging, se promociona exactamente el mismo Chart a producción cambiando únicamente el fichero de valores.",
        interaccion: "¿Por qué en producción está estrictamente prohibido usar la etiqueta de imagen `latest`?",
        labGotcha: "Porque `latest` no es determinista: no sabemos qué versión exacta de código está corriendo y rompe la capacidad de rollback.",
      },
    },
    {
      id: "m08-06-repos-and-releases",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 08 • CICLO DE VIDA",
      title: "Gestión de Repositorios y Ciclo de Vida de Releases",
      subtitle: "Los comandos esenciales para el día a día con Helm",
      cards: [
        {
          title: "Gestión de Repositorios",
          items: [
            "`helm repo add <nombre> <url>` -> Añade un repositorio remoto (ej: Bitnami, Prometheus).",
            "`helm repo update` -> Descarga el índice más reciente de Charts disponibles.",
            "`helm search repo <keyword>` -> Busca paquetes en los repositorios configurados.",
            "`helm search hub <keyword>` -> Busca en el Artifact Hub global público.",
          ],
        },
        {
          title: "Instalación y Actualización",
          items: [
            "`helm install <release-name> <chart>` -> Instala un nuevo paquete.",
            "`helm upgrade <release-name> <chart>` -> Aplica cambios a una release existente.",
            "`helm upgrade --install <release-name> <chart>` -> Comando idempotente por excelencia (instala si no existe, actualiza si existe).",
          ],
        },
        {
          title: "Inspección y Limpieza",
          items: [
            "`helm list` -> Muestra todas las releases activas en el namespace.",
            "`helm status <release-name>` -> Muestra el estado actual y notas de la release.",
            "`helm uninstall <release-name>` -> Elimina todos los recursos asociados limpiamente.",
          ],
        },
      ],
      notes: {
        objetivo: "Familiarizar al alumno con la sintaxis de comandos CLI de Helm.",
        explicacion: "Una 'Release' es una instancia concreta de un Chart ejecutándose en un namespace del clúster con una configuración específica. Podemos instalar el mismo Chart de PostgreSQL 3 veces con nombres de release diferentes (`db-auth`, `db-pagos`, `db-pedidos`).",
        interaccion: "¿Dónde almacena Helm v3 el estado y las versiones de las releases?",
        labGotcha: "En Secrets de Kubernetes dentro del mismo namespace donde se instaló la release (con tipo `helm.sh/release.v1`).",
      },
    },
    {
      id: "m08-07-rollbacks-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 08 • ROLLBACKS",
      title: "Actualizaciones Atómicas y Rollbacks Seguros",
      subtitle: "Garantizar que un fallo en el despliegue no deje el clúster en un estado roto",
      leftTitle: "Flags de Despliegue Robusto",
      directives: [
        { field: "--atomic", desc: "Si el despliegue falla o supera el timeout, Helm hace un ROLLBACK AUTOMÁTICO inmediato." },
        { field: "--wait", desc: "Espera a que todos los Pods estén en estado Ready antes de marcar la release como exitosa." },
        { field: "--timeout", desc: "Tiempo máximo de espera (ej: 5m0s). Si se supera, se aborta el despliegue." },
        { field: "helm history", desc: "Muestra la tabla de revisiones históricas con su estado y descripción." },
        { field: "helm rollback", desc: "Revierte la release a cualquier revisión anterior en cuestión de segundos." },
      ],
      filename: "helm-deploy-and-rollback.sh",
      yamlCode: `# 1. Despliegue seguro y atómico en CI/CD
helm upgrade --install mi-app ./charts/mi-app \\
  --namespace produccion \\
  --values values-prod.yaml \\
  --wait \\
  --timeout 5m0s \\
  --atomic

# 2. Si falla manualmente: Inspeccionar historial
helm history mi-app -n produccion

# REVISION  UPDATED                   STATUS      CHART        DESCRIPTION
# 1         Mon Nov 10 10:00:00 2026  superseded  mi-app-1.0.0 Install complete
# 2         Mon Nov 10 11:30:00 2026  failed      mi-app-1.1.0 Upgrade "mi-app" failed
#
# 3. Revertir a la revisión 1 en 3 segundos:
helm rollback mi-app 1 -n produccion`,
      notes: {
        objetivo: "Enseñar el uso de `--atomic` y `helm rollback` para garantizar operaciones 100% transaccionales.",
        explicacion: "Sin la flag `--atomic`, si una nueva versión falla (por ejemplo, por una imagen rota), Helm deja la release en estado `FAILED` y los recursos a medio actualizar. Con `--atomic`, Helm detecta que los pods no alcanzaron Ready en el tiempo límite y restaura automáticamente el estado anterior.",
        interaccion: "¿Qué revisión figurará como activa en el historial tras ejecutar `helm rollback mi-app 1`?",
        labGotcha: "Helm creará una nueva revisión número 3 que será un clon idéntico del contenido de la revisión 1.",
      },
    },
    {
      id: "m08-08-helm-hooks",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 08 • HOOKS",
      title: "Hooks del Ciclo de Vida y Tests en Helm",
      subtitle: "Ejecutar acciones antes, durante o después de instalar una release",
      cards: [
        {
          title: "Hooks de Ciclo de Vida (helm.sh/hook)",
          items: [
            "`pre-install` / `pre-upgrade`: Ejecutar migraciones de bases de datos antes de actualizar los Pods.",
            "`post-install` / `post-upgrade`: Enviar notificaciones a Slack o purgar CDNs tras finalizar.",
            "Permiten coordinar dependencias complejas durante el despliegue.",
          ],
        },
        {
          title: "Políticas de Borrado de Hooks",
          items: [
            "`helm.sh/hook-delete-policy`: Controla el ciclo de vida del Job del hook tras finalizar.",
            "`hook-succeeded`: Borra el Job si terminó con código de salida 0.",
            "`before-hook-creation`: Elimina el Job anterior antes de lanzar la nueva ejecución.",
          ],
        },
        {
          title: "Helm Tests (helm.sh/hook: test)",
          items: [
            "Manifiestos que ejecutan comprobaciones de integración (Smoke Tests).",
            "Comando: `helm test <release-name>`.",
            "Comprueba que los endpoints devuelven 200 OK y la base de datos responde.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a orquestar migraciones de bases de datos antes del rollout de la aplicación mediante Helm Hooks.",
        explicacion: "Un `pre-upgrade` hook se define creando un Job estándar de Kubernetes con la anotación `helm.sh/hook: pre-upgrade`. Helm detendrá la actualización del Deployment hasta que ese Job finalice con código 0.",
        interaccion: "¿Qué sucede si el Job del hook `pre-upgrade` falla y da error?",
        labGotcha: "Helm cancela inmediatamente la actualización del Deployment y no toca la versión en producción.",
      },
    },
    {
      id: "m08-09-linting-and-best-practices",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 08 • CALIDAD Y BUENAS PRÁCTICAS",
      title: "Validación y Buenas Prácticas de Empaquetado",
      subtitle: "Herramientas de depuración antes de enviar el Chart al clúster",
      cards: [
        {
          title: "1. helm lint (Validación Sintáctica)",
          items: [
            "`helm lint ./mi-chart`",
            "Analiza el Chart en busca de errores estructurales, claves obligatorias ausentes en Chart.yaml y problemas de convenciones.",
          ],
        },
        {
          title: "2. helm template (Renderizado Local)",
          items: [
            "`helm template <release-name> ./mi-chart -f values-prod.yaml`",
            "Genera y vuelca en la terminal todos los YAMLs resultantes SIN conectarse al clúster.",
            "Esencial para depurar la indentación y verificar que las variables se sustituyen correctamente.",
          ],
        },
        {
          title: "3. helm package y Firma de Artefactos",
          items: [
            "`helm package ./mi-chart` -> Genera un tarball comprimido `.tgz` versionado.",
            "Publicación en registros OCI (Docker Hub, GitHub Packages, Harbor): `helm push mi-chart-1.0.0.tgz oci://registry...`.",
            "Firma criptográfica de Charts con GPG para garantizar integridad en la cadena de suministro.",
          ],
        },
      ],
      notes: {
        objetivo: "Enseñar el flujo de trabajo previo al despliegue: linting -> template -> package -> push.",
        explicacion: "Nunca despleguéis un Chart sin haber ejecutado antes `helm template`. La mayoría de errores en Helm son simples fallos de indentación de 2 espacios que `helm template` detecta al instante sin necesidad de ensuciar el clúster.",
        interaccion: "¿Se pueden almacenar Helm Charts en un registro de contenedores OCI normal como Docker Registry?",
        labGotcha: "Sí, desde Helm 3.8+ el soporte OCI es nativo y oficial, permitiendo guardar imágenes Docker y Helm Charts en el mismo registro.",
      },
    },
  ],
};
