# Curso de Administración de Kubernetes (30 Horas)
## Clústeres, Seguridad, Observabilidad y Operaciones de Día 2

<div align="center">

![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.31-326CE5?logo=kubernetes&logoColor=white)
![Duración](https://img.shields.io/badge/Duración-30_Horas-0ea5e9)
![Certificación](https://img.shields.io/badge/Certificación-CKA_%7C_CKS-blue?logo=linuxfoundation&logoColor=white)
![Laboratorio](https://img.shields.io/badge/Entorno-Kubeadm_%2B_Minikube-326CE5?logo=virtualbox&logoColor=white)
![Módulos](https://img.shields.io/badge/Módulos-11_Bloques_(107_Slides)-orange)
![PPTX](https://img.shields.io/badge/PPTX-107_Diapositivas-D24726?logo=microsoftpowerpoint&logoColor=white)
![Deliverable](https://img.shields.io/badge/PDF-kubernetes--administracion--presentacion.pdf-red?logo=adobeacrobatreader)
![Deliverable](https://img.shields.io/badge/PDF-GUIA__DEL__DOCENTE.pdf-red?logo=adobeacrobatreader)

**Material Docente Oficial y Motor de Generación:** Programa formativo completo de 30 horas lectivas, 11 módulos temáticos (107 diapositivas en PPTX/PDF), guía metodológica del docente de 78 páginas maquetadas, estrategia dual de laboratorio (Kubeadm en VirtualBox + Minikube) y preparación técnica orientada a certificaciones CKA y CKS.

</div>

---

Este repositorio contiene el material técnico completo y el motor de generación automatizado para impartir el curso oficial de **Administración de Kubernetes (30 Horas)**, basado en el temario oficial de 9 módulos temáticos (11 módulos en total incluyendo introducción y conclusiones).

---

### Entregables Generados (`dist/`)

1. **[kubernetes-administracion-presentacion.pptx](file:///home/miguel/git/training-kubernetes-admin/dist/kubernetes-administracion-presentacion.pptx)**: Presentación profesional en formato 16:9 con 107 diapositivas, paleta corporativa de Kubernetes, diagramas vectoriales nativos, snippets YAML estilizados y notas de orador en todas las diapositivas.
2. **[kubernetes-administracion-presentacion.pdf](file:///home/miguel/git/training-kubernetes-admin/dist/kubernetes-administracion-presentacion.pdf)**: Versión de alta fidelidad exportada a PDF lista para proyección.
3. **[GUIA_DEL_DOCENTE.md](file:///home/miguel/git/training-kubernetes-admin/dist/GUIA_DEL_DOCENTE.md)**: Manual del profesor con índice navegable con anclas a cada diapositiva, contenido proyectado y 4 bloques pedagógicos estructurados por diapositiva.
4. **[GUIA_DEL_DOCENTE.pdf](file:///home/miguel/git/training-kubernetes-admin/dist/GUIA_DEL_DOCENTE.pdf)**: Versión imprimible maquetada en PDF de 78 páginas para el seguimiento en el aula.

---

### Estructura de Módulos (107 Diapositivas)

- **Módulo 00:** Introducción, Metodología y Entorno Dual de Laboratorio (4 slides)
- **Módulo 01:** Arquitectura Profunda e Instalación con Kubeadm en VirtualBox (11 slides)
- **Módulo 02:** Gestión de Workloads y Ciclo de Vida del Pod en Minikube (11 slides)
- **Módulo 03:** Redes Avanzadas, Services, Ingress Nginx y CoreDNS (12 slides)
- **Módulo 04:** Administración de Almacenamiento CSI, StorageClass, PV y NFS (10 slides)
- **Módulo 05:** Gestión de Recursos, Requests/Limits, QoS y Scheduling (10 slides)
- **Módulo 06:** Seguridad del Clúster: RBAC, NetworkPolicies Zero-Trust y Hardening (13 slides)
- **Módulo 07:** Observabilidad: Probes, Prometheus, Grafana, Logs y Triage (13 slides)
- **Módulo 08:** Automatización con Helm: Charts, Templates y Rollback (9 slides)
- **Módulo 09:** Operaciones de Día 2: HPA/VPA, Mantenimiento de Nodos y Backup de etcd (10 slides)
- **Módulo 10:** Conclusiones, Hoja de Ruta para CKA/CKS y Herramientas (4 slides)

---

### Scripts de Compilación

Para compilar o regenerar los materiales tras modificar el contenido en `generator/modules/`:

```bash
# Compilar todo el material (PPTX, Guía Markdown y ambos PDFs):
npm run build:all

# O compilar individualmente:
npm run build:pptx    # Genera dist/kubernetes-administracion-presentacion.pptx
npm run build:guide   # Genera dist/GUIA_DEL_DOCENTE.md
npm run build:pdf     # Convierte ambos archivos a PDF en dist/
```
