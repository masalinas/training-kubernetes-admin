// generator/modules/m03_networking.js
// Módulo 03: Redes Avanzadas y Exposición de Servicios (12 diapositivas)

module.exports = {
  id: "m03",
  title: "Módulo 3: Redes Avanzadas y Exposición de Servicios",
  slides: [
    {
      id: "m03-01-cover",
      layout: "COVER",
      badge: "MÓDULO 03 • REDES Y EXPOSICIÓN",
      title: "Redes Avanzadas y Servicios",
      subtitle: "ClusterIP, NodePort, LoadBalancer, Ingress Nginx, TLS y CoreDNS",
      meta: [
        { label: "DURACIÓN ESTIMADA", value: "4 Horas" },
        { label: "ENTORNO LAB", value: "Minikube con Ingress Addon" },
        { label: "OBJETIVO CLAVE", value: "Enrutamiento L4/L7 y resolución DNS robusta" },
      ],
      notes: {
        objetivo: "Presentar los mecanismos de red mediante los cuales las aplicaciones se comunican internamente y se exponen al exterior.",
        explicacion: "En este módulo desmitificamos el concepto de 'Service' (que no es un proceso ni un contenedor, sino una regla iptables/IPVS) y analizamos Ingress y la resolución interna con CoreDNS.",
        interaccion: "¿Por qué no podemos simplemente conectar un frontend a un backend usando la IP directa del Pod?",
        labGotcha: "En Minikube, para probar Ingress ejecutaremos `minikube addons enable ingress` y `minikube tunnel` si usamos LoadBalancer.",
      },
    },
    {
      id: "m03-02-service-concept",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • SERVICIOS",
      title: "La Necesidad del Service: Abstracción de IPs Efímeras",
      subtitle: "Punto de acceso estático y balanceado para conjuntos dinámicos de Pods",
      cards: [
        {
          title: "El Problema de las IPs Efímeras",
          items: [
            "Los Pods son mortales y desechables.",
            "Cada vez que un Pod se reinicia, muere o escala, recibe una nueva IP asignada por el CNI.",
            "Los clientes no pueden mantener una lista estática de IPs de servidores backend.",
          ],
        },
        {
          title: "El Service como Abstracción L4",
          items: [
            "Proporciona una IP Virtual (ClusterIP) inmutable y un nombre DNS estable.",
            "Distribuye el tráfico entre los Pods sanos que coincidan con sus selectores de etiquetas (`spec.selector`).",
            "Cero sobrecarga de proxy en userspace: el tráfico va directo de kernel a kernel.",
          ],
        },
        {
          title: "Endpoints y EndpointSlices",
          items: [
            "El objeto Service NO envía tráfico; es solo configuración.",
            "El EndpointSlice controller vigila los Pods y crea objetos `EndpointSlice` con las IPs y puertos de los Pods en estado `Ready`.",
            "kube-proxy lee los EndpointSlices para programar las reglas en el host.",
          ],
        },
      ],
      notes: {
        objetivo: "Comprender la separación entre el objeto Service y el objeto EndpointSlice.",
        explicacion: "Cuando un Pod falla su Readiness Probe, no se destruye el pod: simplemente el EndpointSlice controller retira su IP de la lista de endpoints. Al instante, kube-proxy retira la regla de iptables y el pod deja de recibir tráfico.",
        interaccion: "¿Qué sucede si creamos un Service sin selector (`spec.selector` vacío)?",
        labGotcha: "Respuesta: No se crean endpoints automáticos. Es útil para apuntar a bases de datos externas creando manualmente un objeto Endpoints.",
      },
    },
    {
      id: "m03-03-kube-proxy-modes",
      layout: "COMPARISON",
      moduleBadge: "MÓDULO 03 • KUBE-PROXY",
      title: "Modos de Operación de Kube-Proxy: iptables vs IPVS",
      subtitle: "Evolución del plano de datos para clústeres de gran escala",
      optionA: {
        tag: "Por Defecto (Hasta ~1000 Servicios)",
        title: "Modo iptables",
        isRecommended: false,
        items: [
          "Inserta reglas en la tabla `nat` de Linux para aplicar DNAT hacia los Pods.",
          "Balanceo mediante el módulo `statistic` de iptables con probabilidad pseudoaleatoria.",
          "Complejidad algorítmica: O(n) secuencial. Cada paquete evalúa reglas una a una.",
          "Problema a escala: Si hay más de 5.000 servicios, la actualización de reglas satura la CPU del nodo.",
          "Excelente compatibilidad y presente en cualquier distribución Linux.",
        ],
      },
      optionB: {
        tag: "Alto Rendimiento (Escala Masiva)",
        title: "Modo IPVS (IP Virtual Server)",
        isRecommended: true,
        items: [
          "Utiliza el subsistema Netfilter L4 de Linux basado en tablas Hash.",
          "Complejidad algorítmica: O(1) constante sin importar el número de servicios.",
          "Soporta múltiples algoritmos de balanceo: round-robin, least-connection, source-hash (afinidad de sesión persistente).",
          "Recomendado para clústeres con más de 1.000 servicios o alto tráfico concurrente.",
          "Requiere cargar módulos de kernel (`ip_vs`, `ip_vs_rr`, etc.) en el host.",
        ],
      },
      notes: {
        objetivo: "Explicar las limitaciones de iptables a escala y cuándo migrar a IPVS.",
        explicacion: "En iptables, 10.000 servicios generan más de 40.000 reglas en el kernel. Cada paquete de red debe recorrer secuencialmente esa cadena. En IPVS, la búsqueda en tabla hash es inmediata independientemente del tamaño del clúster.",
        interaccion: "¿Qué modo de kube-proxy utiliza Minikube por defecto?",
        labGotcha: "Minikube usa `iptables` por compatibilidad. Para activar IPVS se pasa la flag `--extra-config=kube-proxy.mode=ipvs`.",
      },
    },
    {
      id: "m03-04-networking-topology-slide",
      layout: "SPLIT_ARCHITECTURE",
      moduleBadge: "MÓDULO 03 • ARQUITECTURA DE RED",
      title: "Topología de Red: De la Petición Externa al Pod",
      subtitle: "Flujo L4 y L7 a través de las diferentes capas del clúster",
      conceptTitle: "Capas de Tráfico",
      points: [
        "Capa L7 (Ingress): Inspecciona cabeceras HTTP, Host y Path. Termina TLS y enruta hacia los servicios internos.",
        "Capa L4 (Service): Asigna una IP virtual (VIP) y balancea las conexiones TCP/UDP hacia los Pods sanos.",
        "Capa CNI: Resuelve la entrega directa del paquete al namespace de red del Pod mediante interfaces veth.",
        "CoreDNS: Traduce nombres amigables a ClusterIPs de forma transparente para los clientes.",
      ],
      diagramRenderer: "drawNetworkingTopology",
      notes: {
        objetivo: "Visualizar conjuntamente cómo cooperan Ingress, Service, CNI y CoreDNS.",
        explicacion: "Es fundamental entender que el Ingress Controller (como Nginx) suele hacer un 'bypass' de la ClusterIP: consulta los EndpointSlices directamente y enruta el paquete HTTP directamente al Pod IP para evitar un salto extra de iptables y soportar WebSockets y Keep-Alive nativo.",
        interaccion: "¿Por qué el Ingress Controller habla directamente con la IP del Pod en lugar de enviar el tráfico a la IP del Service?",
        labGotcha: "Para mantener conexiones persistentes y balanceo por cookie (session affinity) a nivel HTTP.",
      },
    },
    {
      id: "m03-05-service-types",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • TIPOS DE SERVICIO",
      title: "Tipos de Servicios en Kubernetes",
      subtitle: "Cuatro niveles de visibilidad y exposición de red",
      cards: [
        {
          title: "ClusterIP (Por Defecto)",
          items: [
            "Solo accesible desde DENTRO del clúster (VIP privada).",
            "Rango asignado mediante flag `service-cluster-ip-range`.",
            "Uso ideal: Bases de datos, cachés y microservicios internos.",
          ],
        },
        {
          title: "NodePort",
          items: [
            "Abre un puerto estático en cada nodo (rango 30000-32767).",
            "Acceso externo vía `<Cualquier-Node-IP>:<NodePort>`.",
            "Crea automáticamente una IP ClusterIP interna de soporte.",
          ],
        },
        {
          title: "LoadBalancer",
          items: [
            "Aprovisiona un balanceador externo en la nube (AWS/GCP/Azure).",
            "Asigna una IP pública única hacia los Pods de la aplicación.",
            "En entornos On-Premise / Bare-Metal requiere MetalLB.",
          ],
        },
        {
          title: "ExternalName",
          items: [
            "Sin selectores ni asignación de IP virtual (VIP).",
            "Mapea a un registro CNAME externo (ej: `db.empresa.com`).",
            "Resolución directa mediante CoreDNS sin intermediación de kube-proxy.",
          ],
        },
      ],
      notes: {
        objetivo: "Diferenciar con claridad cuándo utilizar cada tipo de Service y cómo heredan capacidades.",
        explicacion: "NodePort es una abstracción tosca para producción porque expone puertos no estándar (ej: 31245). Nadie quiere entrar a una web corporativa con `https://miempresa.com:31245`. Por ello, en producción se usa Ingress o LoadBalancer.",
        interaccion: "¿Qué ocurre con el tráfico si enviamos una petición al NodePort del Nodo 1 pero el Pod corre en el Nodo 2?",
        labGotcha: "kube-proxy en el Nodo 1 hace SNAT y reenvía el tráfico por el CNI al Nodo 2 (a menos que se use `externalTrafficPolicy: Local`).",
      },
    },
    {
      id: "m03-06-service-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 03 • MANIFIESTOS",
      title: "Service ClusterIP y NodePort en la Práctica",
      subtitle: "Desmitificando el mapeo entre port, targetPort y nodePort",
      leftTitle: "Mapeo de Puertos",
      directives: [
        { field: "port", desc: "El puerto que expone el Service dentro del clúster (en la ClusterIP)." },
        { field: "targetPort", desc: "El puerto en el que escucha la aplicación real dentro del contenedor del Pod." },
        { field: "nodePort", desc: "Puerto externo en los nodos físicos (opcional, asignado automáticamente si se omite)." },
        { field: "selector", desc: "Etiquetas de Pods hacia los que se balancea el tráfico." },
        { field: "externalTrafficPolicy", desc: "Cluster (balanceo global con SNAT) o Local (preserva IP cliente original sin saltos)." },
      ],
      filename: "service-web.yaml",
      yamlCode: `apiVersion: v1
kind: Service
metadata:
  name: frontend-svc
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - name: http
    port: 80             # Puerto del Service
    targetPort: 8080     # Puerto del Pod
    nodePort: 30080      # Puerto en el host
  externalTrafficPolicy: Local # Preserva IP cliente`,
      notes: {
        objetivo: "Aclarar definitivamente la confusión habitual entre `port`, `targetPort` y `nodePort`.",
        explicacion: "Regla mnemotécnica: `port` es donde habla el cliente al Service. `targetPort` es donde escucha el proceso en el contenedor. `nodePort` es el puerto de la máquina virtual.",
        interaccion: "¿Por qué `externalTrafficPolicy: Local` preserva la IP real del cliente pero puede desbalancear la carga?",
        labGotcha: "Con `Local`, si un nodo recibe tráfico en su nodePort pero no tiene ningún Pod local de ese servicio, DESCARTA el paquete (no lo reenvía a otros nodos).",
      },
    },
    {
      id: "m03-07-loadbalancer-metallb",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • LOAD BALANCER",
      title: "LoadBalancer en Cloud y On-Premise (MetalLB)",
      subtitle: "Cómo aprovisionar IPs externas en nubes públicas y centros de datos propios",
      cards: [
        {
          title: "LoadBalancer en Entornos Cloud",
          items: [
            "El cloud-controller-manager detecta el servicio `type: LoadBalancer`.",
            "Llama a la API de AWS/GCP/Azure y crea un Network Load Balancer (NLB) gestionado.",
            "Apunta automáticamente a los NodePorts de las instancias y reporta la IP/DNS pública en `status.loadBalancer.ingress`.",
          ],
        },
        {
          title: "El Problema On-Premise / Bare-Metal",
          items: [
            "En clústeres propios con Kubeadm en VirtualBox o centros de datos, Kubernetes no tiene API cloud nativa.",
            "El Service de tipo LoadBalancer se queda perpetuamente en estado `EXTERNAL-IP: <pending>`.",
            "Se requiere un controlador externo que gestione IPs de la red local.",
          ],
        },
        {
          title: "MetalLB: La Solución para Bare-Metal",
          items: [
            "Asigna IPs reales de un pool configurado en la red local (`IPAddressPool`).",
            "Modo Layer 2 (ARP): Un nodo asume la IP mediante ARP respondido a la pasarela.",
            "Modo BGP: Los nodos se emparejan con los routers BGP de la empresa para multirruta ECMP.",
          ],
        },
      ],
      notes: {
        objetivo: "Explicar cómo resolver la exposición de tipo LoadBalancer fuera de las grandes nubes públicas.",
        explicacion: "MetalLB es la solución estándar para que un clúster on-premise se comporte exactamente igual que un clúster de AWS o Google Cloud en cuanto a la asignación de IPs externas.",
        interaccion: "¿Qué herramienta se usa en Minikube para emular un LoadBalancer externo?",
        labGotcha: "En Minikube ejecutamos `minikube tunnel` en una terminal separada para que los servicios LoadBalancer obtengan IP externa.",
      },
    },
    {
      id: "m03-08-ingress-overview",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • INGRESS",
      title: "Ingress Controller: Enrutamiento L7 y Dominios",
      subtitle: "Un único punto de entrada HTTP/HTTPS para decenas de microservicios",
      cards: [
        {
          title: "Ingress Resource vs Ingress Controller",
          items: [
            "Ingress Resource: Es solo un manifiesto YAML con reglas declarativas (Hosts, Paths y servicios de destino). No hace nada por sí mismo.",
            "Ingress Controller: Es una aplicación real (como Nginx, Traefik, HAProxy o Envoy) ejecutándose en el clúster que lee los recursos Ingress y configura su motor de proxy en tiempo real.",
          ],
        },
        {
          title: "Ahorro de Costes y Flexibilidad",
          items: [
            "Sin Ingress: Cada microservicio requiere su propio LoadBalancer ($15-25/mes por servicio en Cloud).",
            "Con Ingress: Un único LoadBalancer da servicio a 50 microservicios diferentes mediante enrutamiento basado en host (`api.empresa.com`, `app.empresa.com`).",
          ],
        },
        {
          title: "Capacidades Avanzadas de L7",
          items: [
            "Terminación centralizada de certificados TLS/SSL.",
            "Reescritura de rutas (URL rewriting) y redirecciones 301/302.",
            "Rate limiting, autenticación básica, CORS y Whitelist de IPs mediante anotaciones.",
          ],
        },
      ],
      notes: {
        objetivo: "Diferenciar el recurso declarativo Ingress del software activo Ingress Controller.",
        explicacion: "Muchos alumnos aplican un `ingress.yaml` y se preguntan por qué no funciona. Sin un Ingress Controller desplegado (como ingress-nginx), el recurso Ingress es ignorado por completo.",
        interaccion: "¿Qué Ingress Controller es el más utilizado en la industria y cuál viene como addon en Minikube?",
        labGotcha: "Nginx Ingress Controller. En Minikube se activa con `minikube addons enable ingress`.",
      },
    },
    {
      id: "m03-09-ingress-yaml",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 03 • INGRESS",
      title: "Manifiesto de Ingress: Enrutamiento por Host y Path",
      subtitle: "Estructura estándar de la API networking.k8s.io/v1",
      leftTitle: "Componentes de la Regla",
      directives: [
        { field: "ingressClassName", desc: "Especifica qué controlador procesará la regla (ej: nginx)." },
        { field: "rules.host", desc: "Dominio FQDN que debe coincidir con la cabecera Host HTTP (ej: tienda.empresa.com)." },
        { field: "paths.pathType", desc: "Prefix (coincidencia de prefijo) o Exact (coincidencia estricta de ruta)." },
        { field: "backend.service", desc: "Nombre del Service interno y puerto de destino." },
        { field: "annotations", desc: "Directivas específicas para Nginx (ej: rewrite-target, ssl-redirect)." },
      ],
      filename: "ingress-rules.yaml",
      yamlCode: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecommerce-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: tienda.local
    http:
      paths:
      - path: /productos
        pathType: Prefix
        backend:
          service:
            name: catalog-service
            port:
              number: 80
      - path: /carrito
        pathType: Prefix
        backend:
          service:
            name: cart-service
            port:
              number: 80`,
      notes: {
        objetivo: "Analizar la sintaxis moderna de Ingress v1 y el enrutamiento por rutas múltiples.",
        explicacion: "El parámetro `pathType: Prefix` significa que `/productos/123` coincidirá con la regla de `catalog-service`. La anotación `rewrite-target: /` limpia la ruta antes de enviarla al pod para que la app reciba `/123` en lugar de `/productos/123`.",
        interaccion: "¿Qué cambio debemos hacer en nuestro archivo `/etc/hosts` local para probar el dominio `tienda.local` en Minikube?",
        labGotcha: "Añadir la línea `<minikube ip> tienda.local` a `/etc/hosts` para que el navegador resuelva el nombre.",
      },
    },
    {
      id: "m03-10-cert-manager-tls",
      layout: "YAML_ANALYSIS",
      moduleBadge: "MÓDULO 03 • TLS / SSL",
      title: "Gestión de Certificados TLS/SSL con Cert-Manager",
      subtitle: "Automatización completa del ciclo de vida y renovación con Let's Encrypt",
      leftTitle: "Flujo de Certificación",
      directives: [
        { field: "cert-manager", desc: "Operador de Kubernetes que gestiona certificados X.509 de forma nativa." },
        { field: "ClusterIssuer", desc: "Define la autoridad certificadora (Let's Encrypt ACME o CA corporativa)." },
        { field: "Desafío HTTP-01", desc: "cert-manager crea automáticamente un Pod e Ingress temporal para resolver el reto ACME." },
        { field: "Secret TLS", desc: "Guarda automáticamente la clave privada y certificado (`tls.crt`, `tls.key`)." },
        { field: "spec.tls[]", desc: "Vincula el Secret al Ingress para habilitar HTTPS en el puerto 443." },
      ],
      filename: "ingress-tls-letsencrypt.yaml",
      yamlCode: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-secure-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - app.miempresa.com
    secretName: app-miempresa-tls  # cert-manager lo genera
  rules:
  - host: app.miempresa.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80`,
      notes: {
        objetivo: "Demostrar cómo cert-manager elimina el mantenimiento manual de certificados SSL y evita caídas por expiración.",
        explicacion: "Al añadir la anotación `cert-manager.io/cluster-issuer`, el operador detecta el Ingress, genera un objeto `Certificate`, solicita el reto ACME a Let's Encrypt y cuando se aprueba, deposita el certificado en el Secret `app-miempresa-tls`. Cuando falten 30 días para caducar, cert-manager lo renovará automáticamente.",
        interaccion: "¿Por qué en desarrollo se recomienda usar `letsencrypt-staging` en lugar de `letsencrypt-prod`?",
        labGotcha: "Let's Encrypt producción tiene un 'rate limit' estricto de 5 certificados fallidos por hora por dominio.",
      },
    },
    {
      id: "m03-11-coredns-resolution",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • DNS INTERNO",
      title: "DNS Interno con CoreDNS: Resolución de Nombres",
      subtitle: "Estructura jerárquica de nombres FQDN dentro del clúster",
      cards: [
        {
          title: "Estructura del FQDN de un Servicio",
          items: [
            "Formato completo: `<servicio>.<namespace>.svc.cluster.local`.",
            "Mismo Namespace: Basta con llamar a `http://backend`.",
            "Distinto Namespace: Llamar a `http://backend.produccion`.",
            "Cross-cluster o externo: `backend.produccion.svc.cluster.local`.",
          ],
        },
        {
          title: "Resolución de Pods Individuales",
          items: [
            "Por defecto, los Pods no tienen nombre DNS propio (salvo en StatefulSets).",
            "Formato por IP: `<ip-con-guiones>.<namespace>.pod.cluster.local`.",
            "Ejemplo: IP `10.244.1.15` en default -> `10-244-1-15.default.pod.cluster.local`.",
          ],
        },
        {
          title: "Arquitectura de CoreDNS",
          items: [
            "Se ejecuta como Deployment de 2 réplicas en el namespace `kube-system`.",
            "Expuesto mediante un Service ClusterIP fijo (habitualmente la IP .10 del rango de servicios, ej: `10.96.0.10`).",
            "Configurado mediante el ConfigMap `coredns` en `kube-system`.",
          ],
        },
      ],
      notes: {
        objetivo: "Aprender a formular peticiones de red entre servicios de distintos namespaces usando la nomenclatura DNS oficial.",
        explicacion: "CoreDNS intercepta todas las peticiones DNS que terminan en `.cluster.local`. Si la petición es para un dominio externo (como `google.com`), CoreDNS la reenvía a los servidores DNS configurados en el `/etc/resolv.conf` del host del nodo.",
        interaccion: "¿Cómo podemos comprobar si CoreDNS está funcionando correctamente desde dentro de un Pod?",
        labGotcha: "Lanzar un pod de debug: `kubectl run curl --image=curlimages/curl -it --rm -- nslookup kubernetes.default`.",
      },
    },
    {
      id: "m03-12-ndots-gotcha",
      layout: "CARDS_GRID",
      moduleBadge: "MÓDULO 03 • DNS OPTIMIZACIÓN",
      title: "El Problema Oculto de ndots:5 en resolv.conf",
      subtitle: "Por qué una petición a una API externa puede lanzar 4 consultas DNS inútiles",
      cards: [
        {
          title: "El archivo /etc/resolv.conf del Pod",
          items: [
            "nameserver 10.96.0.10",
            "search default.svc.cluster.local svc.cluster.local cluster.local",
            "options ndots:5",
            "Significado de ndots:5: Si el nombre consultado tiene MENOS de 5 puntos, el resolver de Linux probará primero la lista de búsqueda (search domains).",
          ],
        },
        {
          title: "La Cascada de Peticiones Inútiles",
          items: [
            "Petición a `api.github.com` (tiene solo 2 puntos):",
            "1. Consulta: `api.github.com.default.svc.cluster.local` (NXDOMAIN)",
            "2. Consulta: `api.github.com.svc.cluster.local` (NXDOMAIN)",
            "3. Consulta: `api.github.com.cluster.local` (NXDOMAIN)",
            "4. Consulta final: `api.github.com.` (Éxito tras 3 fallos y 20-50ms de latencia).",
          ],
        },
        {
          title: "Optimizaciones en Producción",
          items: [
            "Opción 1: Añadir punto final en las URLs de apps externas: `api.github.com.` (evita la búsqueda).",
            "Opción 2: Configurar `dnsConfig.options: [{name: 'ndots', value: '2'}]` en el Pod.",
            "Opción 3: Activar el plugin `autopath` o NodeLocal DNSCache en clústeres masivos.",
          ],
        },
      ],
      notes: {
        objetivo: "Explicar uno de los problemas de rendimiento más sutiles y dañinos en Kubernetes de producción.",
        explicacion: "En microservicios con miles de peticiones salientes por segundo a APIs de terceros, `ndots:5` cuadruplica la carga de CoreDNS y satura los límites de conexión de Linux (conntrack table). Conocer este comportamiento es una marca de administrador experto.",
        interaccion: "¿Cuántos puntos tiene un dominio como `mi-bd.postgres.database.azure.com`? (4 puntos: ¡sigue cayendo en la trampa de ndots:5!)",
        labGotcha: "Inspeccionar el resolv.conf de un pod ejecutando: `kubectl exec -it <pod> -- cat /etc/resolv.conf`.",
      },
    },
  ],
};
