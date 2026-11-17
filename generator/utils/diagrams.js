// generator/utils/diagrams.js
// Renderizador de diagramas arquitectónicos vectoriales nativos para Kubernetes
// Diseñado con flujo de texto único para evitar solapamientos y desbordamientos

const { THEME } = require('../config/theme');

// Helper: Caja de componente con texto en flujo único garantizado anti-colisión
function drawComponentBox(slide, pptx, { x, y, w, h, title, subtitle, color = THEME.colors.k8sBlue, bg = THEME.colors.bgWhite, isDark = false, titleSize = 10.5, subSize = 8.5 }) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: bg },
    line: { color: color, width: 1.5 },
    rectRadius: 0.08,
  });

  const runs = [
    { text: title + (subtitle ? "\n" : ""), options: { bold: true, fontSize: titleSize, color: isDark ? THEME.colors.textLight : color } }
  ];
  if (subtitle) {
    runs.push({ text: subtitle, options: { fontSize: subSize, color: isDark ? THEME.colors.textLightMuted : THEME.colors.textMuted } });
  }

  slide.addText(runs, {
    x: x + 0.06,
    y: y + 0.04,
    w: w - 0.12,
    h: h - 0.08,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

// Diagrama 1: Arquitectura de Control Plane y Workers
function drawControlPlaneArchitecture(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("TOPOLOGÍA DE ARQUITECTURA KUBERNETES", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.navyTitle,
    align: "center",
    margin: 0,
  });

  // Bloque Control Plane (Master)
  const cpY = y + 0.42;
  const cpH = 1.45;
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x + 0.2,
    y: cpY,
    w: w - 0.4,
    h: cpH,
    fill: { color: THEME.colors.k8sBlueLight },
    line: { color: THEME.colors.k8sBlue, width: 1 },
    rectRadius: 0.06,
  });

  slide.addText("CONTROL PLANE (Master)", {
    x: x + 0.3,
    y: cpY + 0.08,
    w: 3.0,
    h: 0.18,
    fontFace: THEME.fonts.title,
    fontSize: 8.5,
    bold: true,
    color: THEME.colors.navyTitle,
    margin: 0,
  });

  const cpCompW = (w - 0.4 - 0.4) / 4;
  const compY = cpY + 0.32;
  const compH = 0.98;

  drawComponentBox(slide, pptx, {
    x: x + 0.28,
    y: compY,
    w: cpCompW,
    h: compH,
    title: "kube-apiserver",
    subtitle: "Hub Central REST",
    color: THEME.colors.navyTitle,
    titleSize: 9.5,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.28 + (cpCompW + 0.08),
    y: compY,
    w: cpCompW,
    h: compH,
    title: "etcd",
    subtitle: "Consenso Raft",
    color: THEME.colors.navyTitle,
    titleSize: 9.5,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.28 + (cpCompW + 0.08) * 2,
    y: compY,
    w: cpCompW,
    h: compH,
    title: "scheduler",
    subtitle: "Filtro & Score",
    color: THEME.colors.navyTitle,
    titleSize: 9.5,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.28 + (cpCompW + 0.08) * 3,
    y: compY,
    w: cpCompW,
    h: compH,
    title: "controller-mgr",
    subtitle: "Bucles de Control",
    color: THEME.colors.navyTitle,
    titleSize: 9.5,
    subSize: 8,
  });

  // Bloque Worker Node
  const wkY = y + 1.98;
  const wkH = 1.52;
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x + 0.2,
    y: wkY,
    w: w - 0.4,
    h: wkH,
    fill: { color: "F8FAFC" },
    line: { color: THEME.colors.cardBorder, width: 1 },
    rectRadius: 0.06,
  });

  slide.addText("WORKER NODE (Plano de Datos)", {
    x: x + 0.3,
    y: wkY + 0.08,
    w: 3.5,
    h: 0.18,
    fontFace: THEME.fonts.title,
    fontSize: 8.5,
    bold: true,
    color: THEME.colors.navyTitle,
    margin: 0,
  });

  const wkCompW = (w - 0.4 - 0.36) / 3;
  const wkCompY = wkY + 0.32;
  const wkCompH = 1.05;

  drawComponentBox(slide, pptx, {
    x: x + 0.28,
    y: wkCompY,
    w: wkCompW,
    h: wkCompH,
    title: "kubelet",
    subtitle: "Agente del Nodo\nsystemd",
    color: THEME.colors.k8sBlue,
    titleSize: 10,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.28 + (wkCompW + 0.09),
    y: wkCompY,
    w: wkCompW,
    h: wkCompH,
    title: "kube-proxy",
    subtitle: "iptables / IPVS\nBalanceo L4",
    color: THEME.colors.k8sBlue,
    titleSize: 10,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.28 + (wkCompW + 0.09) * 2,
    y: wkCompY,
    w: wkCompW,
    h: wkCompH,
    title: "CRI (containerd)",
    subtitle: "Pods & Cgroups\nNamespaces",
    color: THEME.colors.accentGreen,
    titleSize: 10,
    subSize: 8,
  });
}

// Diagrama 2: Topología de Red y Enrutamiento de Servicios
function drawNetworkingTopology(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("ENRUTAMIENTO DE RED KUBERNETES (L4 Y L7)", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.navyTitle,
    align: "center",
    margin: 0,
  });

  const blockW = w - 0.5;
  // Capa 1: Ingress
  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 0.42,
    w: blockW,
    h: 0.70,
    title: "Ingress Controller (L7 HTTP/HTTPS)",
    subtitle: "Enrutamiento por Host / Path • Terminación TLS (cert-manager)",
    color: THEME.colors.navyTitle,
    bg: THEME.colors.k8sBlueLight,
    titleSize: 10.5,
    subSize: 8.5,
  });

  // Capa 2: Service
  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 1.25,
    w: blockW,
    h: 0.70,
    title: "Kubernetes Service (ClusterIP / NodePort)",
    subtitle: "IP Virtual estable • Balanceo mediante iptables / IPVS",
    color: THEME.colors.k8sBlue,
    bg: "F8FAFC",
    titleSize: 10.5,
    subSize: 8.5,
  });

  // Capa 3: Endpoints / Pods
  const podW = (blockW - 0.2) / 2;
  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 2.08,
    w: podW,
    h: 0.85,
    title: "Pod Replica 1",
    subtitle: "IP: 10.244.1.5\nveth pair • CNI IPAM",
    color: THEME.colors.accentGreen,
    titleSize: 10,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25 + podW + 0.2,
    y: y + 2.08,
    w: podW,
    h: 0.85,
    title: "Pod Replica 2",
    subtitle: "IP: 10.244.2.8\nveth pair • CNI IPAM",
    color: THEME.colors.accentGreen,
    titleSize: 10,
    subSize: 8,
  });

  // Nota de pie DNS
  slide.addText("CoreDNS: Resolución automática (<service>.<namespace>.svc.cluster.local)", {
    x: x + 0.25,
    y: y + 3.08,
    w: blockW,
    h: 0.35,
    fontFace: THEME.fonts.body,
    fontSize: 9,
    color: THEME.colors.textMuted,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

// Diagrama 3: Modelo de Seguridad Zero-Trust en 3 Capas
function drawSecurityZeroTrust(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("DEFENSA EN PROFUNDIDAD (ZERO-TRUST MULTICAPA)", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.navyTitle,
    align: "center",
    margin: 0,
  });

  const layerW = w - 0.5;
  const layerH = 0.88;

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 0.45,
    w: layerW,
    h: layerH,
    title: "1. Capa de Identidad y Control de Acceso (RBAC)",
    subtitle: "Subject (User/SA) -> RoleBinding -> Role\nVerbos API: get, list, watch, create, delete",
    color: THEME.colors.navyTitle,
    bg: THEME.colors.k8sBlueLight,
    titleSize: 10.5,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 1.45,
    w: layerW,
    h: layerH,
    title: "2. Capa de Tráfico de Red (Network Policies)",
    subtitle: "Default Deny Ingress/Egress • Aislamiento Pod a Pod\nFiltrado por podSelector y namespaceSelector",
    color: THEME.colors.k8sBlue,
    bg: "F8FAFC",
    titleSize: 10.5,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 2.45,
    w: layerW,
    h: layerH,
    title: "3. Capa de Ejecución y Contenedor (Security Context)",
    subtitle: "runAsNonRoot: true • readOnlyRootFilesystem: true\ncapabilities: drop [ALL] • seccomp RuntimeDefault",
    color: THEME.colors.accentGreen,
    bg: "F0FDF4",
    titleSize: 10.5,
    subSize: 8.5,
  });
}

// Diagrama 4: Árbol de Troubleshooting Sistémico
function drawTroubleshootingTree(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("ÁRBOL DE DECISIÓN: DIAGNÓSTICO SISTÉMICO", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.accentAmber,
    align: "center",
    margin: 0,
  });

  const colW = (w - 0.6) / 3;
  const cardH = 1.45;

  drawComponentBox(slide, pptx, {
    x: x + 0.2,
    y: y + 0.42,
    w: colW,
    h: cardH,
    title: "POD PENDING",
    subtitle: "Causas:\n• Falta CPU/Mem\n• Taints sin tolerar\n• PVC sin vincular\n\nComando:\nkubectl describe pod",
    color: THEME.colors.accentAmber,
    titleSize: 9.5,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.2 + (colW + 0.1),
    y: y + 0.42,
    w: colW,
    h: cardH,
    title: "CRASHLOOPBACKOFF",
    subtitle: "Causas:\n• Error en código app\n• ConfigMap ausente\n• Fallo Startup Probe\n\nComando:\nkubectl logs --previous",
    color: THEME.colors.accentRed,
    titleSize: 9.5,
    subSize: 8,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.2 + (colW + 0.1) * 2,
    y: y + 0.42,
    w: colW,
    h: cardH,
    title: "OOMKILLED (137)",
    subtitle: "Causas:\n• Memory limit superado\n• Fuga de memoria\n• cgroup purge\n\nComando:\nkubectl describe / dmesg",
    color: THEME.colors.navyTitle,
    titleSize: 9.5,
    subSize: 8,
  });

  // Caja inferior de comando clave
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x + 0.2,
    y: y + 2.05,
    w: w - 0.4,
    h: 1.35,
    fill: { color: THEME.colors.cardCodeBg },
    line: { color: THEME.colors.cardBorder, width: 1 },
    rectRadius: 0.08,
  });

  slide.addText("COMANDOS DE RESOLUCIÓN INMEDIATA", {
    x: x + 0.35,
    y: y + 2.15,
    w: w - 0.7,
    h: 0.22,
    fontFace: THEME.fonts.code,
    fontSize: 9,
    bold: true,
    color: THEME.colors.codeKeyword,
    margin: 0,
  });

  slide.addText([
    { text: "1. kubectl get events --sort-by='.metadata.creationTimestamp'\n", options: { bold: true, color: THEME.colors.navyTitle, fontSize: 8.5 } },
    { text: "2. kubectl get pod -o wide --show-labels\n", options: { bold: true, color: THEME.colors.navyTitle, fontSize: 8.5 } },
    { text: "3. kubectl logs <pod> -c <container> -f --tail=100\n", options: { bold: true, color: THEME.colors.navyTitle, fontSize: 8.5 } },
    { text: "4. kubectl run debug --rm -it --image=nicolaka/netshoot -- /bin/bash", options: { color: THEME.colors.textMuted, fontSize: 8.5 } },
  ], {
    x: x + 0.35,
    y: y + 2.42,
    w: w - 0.7,
    h: 0.85,
    fontFace: THEME.fonts.code,
    margin: 0,
  });
}

// Diagrama 5: Ciclo de Vida de Almacenamiento CSI
function drawStorageCsiFlow(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("ARQUITECTURA CSI: DINÁMICA DE PROVISIONAMIENTO", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.navyTitle,
    align: "center",
    margin: 0,
  });

  const stepW = w - 0.5;
  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 0.45,
    w: stepW,
    h: 0.75,
    title: "1. StorageClass (Definición del Proveedor)",
    subtitle: "provisioner (NFS, AWS EBS, GCP-PD) • reclaimPolicy: Retain / Delete",
    color: THEME.colors.navyTitle,
    bg: THEME.colors.k8sBlueLight,
    titleSize: 10.5,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 1.35,
    w: stepW,
    h: 0.75,
    title: "2. PersistentVolumeClaim (Petición del Usuario)",
    subtitle: "accessModes: ReadWriteOnce (RWO), RWX • storage: 10Gi",
    color: THEME.colors.k8sBlue,
    bg: "F8FAFC",
    titleSize: 10.5,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 2.25,
    w: stepW,
    h: 0.75,
    title: "3. PersistentVolume (Volumen Real Vinculado)",
    subtitle: "CSI Driver aprovisiona el disco físico y enlaza Status: Bound al PVC",
    color: THEME.colors.accentGreen,
    bg: "F0FDF4",
    titleSize: 10.5,
    subSize: 8.5,
  });

  slide.addText("Pod consume PVC mediante spec.volumes[].persistentVolumeClaim", {
    x: x + 0.25,
    y: y + 3.12,
    w: stepW,
    h: 0.35,
    fontFace: THEME.fonts.body,
    fontSize: 9,
    color: THEME.colors.textMuted,
    align: "center",
    valign: "middle",
    margin: 0,
  });
}

// Diagrama 6: Mantenimiento de Nodos
function drawNodeMaintenanceFlow(slide, x, y, w, h, data, pptx) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: THEME.colors.bgWhite },
    line: { color: THEME.colors.cardBorder, width: 1.2 },
    rectRadius: 0.1,
  });

  slide.addText("CICLO DE MANTENIMIENTO Y ACTUALIZACIÓN DE NODO", {
    x: x + 0.2,
    y: y + 0.12,
    w: w - 0.4,
    h: 0.22,
    fontFace: THEME.fonts.title,
    fontSize: 9.5,
    bold: true,
    color: THEME.colors.navyTitle,
    align: "center",
    margin: 0,
  });

  const stepW = w - 0.5;
  const stepH = 0.65;

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 0.45,
    w: stepW,
    h: stepH,
    title: "Paso 1: kubectl cordon <nodo>",
    subtitle: "Marca SchedulingDisabled: ningún Pod nuevo aterrizará en el nodo.",
    color: THEME.colors.accentAmber,
    titleSize: 10,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 1.20,
    w: stepW,
    h: stepH,
    title: "Paso 2: kubectl drain <nodo> --ignore-daemonsets",
    subtitle: "Desalojo seguro de Pods respetando PodDisruptionBudgets (PDB).",
    color: THEME.colors.accentRed,
    titleSize: 10,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 1.95,
    w: stepW,
    h: stepH,
    title: "Paso 3: Actualización Kubeadm / OS / Kubelet",
    subtitle: "apt-get upgrade + kubeadm upgrade node + systemctl restart kubelet.",
    color: THEME.colors.navyTitle,
    titleSize: 10,
    subSize: 8.5,
  });

  drawComponentBox(slide, pptx, {
    x: x + 0.25,
    y: y + 2.70,
    w: stepW,
    h: stepH,
    title: "Paso 4: kubectl uncordon <nodo>",
    subtitle: "Restaura el nodo a estado Ready para recibir nuevos workloads.",
    color: THEME.colors.accentGreen,
    titleSize: 10,
    subSize: 8.5,
  });
}

module.exports = {
  drawComponentBox,
  drawControlPlaneArchitecture,
  drawNetworkingTopology,
  drawSecurityZeroTrust,
  drawTroubleshootingTree,
  drawStorageCsiFlow,
  drawNodeMaintenanceFlow,
};
