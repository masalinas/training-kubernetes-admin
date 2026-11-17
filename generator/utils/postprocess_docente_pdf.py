# generator/utils/postprocess_docente_pdf.py
# Post-procesador PyMuPDF para la Guía Docente de Kubernetes Administración
# Redacta encabezado/pie en portada e inyecta la tabla de contenidos (bookmarks/TOC) jerárquica

import os
import json
import pymupdf

def postprocess():
    dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dist'))
    raw_pdf_path = os.path.join(dist_dir, "GUIA_DEL_DOCENTE_raw.pdf")
    output_pdf_path = os.path.join(dist_dir, "GUIA_DEL_DOCENTE.pdf")
    meta_path = os.path.join(dist_dir, "slides_meta.json")

    if not os.path.exists(raw_pdf_path):
        print(f"Error: {raw_pdf_path} no encontrado.")
        return

    doc = pymupdf.open(raw_pdf_path)
    total_pages = len(doc)
    print(f"Documento cargado con {total_pages} páginas.")

    # 1. Redactar encabezado y pie en Página 1 (Portada)
    cover_page = doc[0]
    rect_top = pymupdf.Rect(0, 0, cover_page.rect.width, 50)
    rect_bottom = pymupdf.Rect(0, cover_page.rect.height - 50, cover_page.rect.width, cover_page.rect.height)
    cover_page.add_redact_annot(rect_top, fill=(1, 1, 1))
    cover_page.add_redact_annot(rect_bottom, fill=(1, 1, 1))
    cover_page.apply_redactions()
    print("Portada limpiada exitosamente (encabezado y pie eliminados).")

    # 2. Cargar metadatos de diapositivas
    slides_meta = []
    if os.path.exists(meta_path):
        with open(meta_path, "r", encoding="utf-8") as f:
            slides_meta = json.load(f)
    print(f"Cargados metadatos para {len(slides_meta)} diapositivas.")

    # 3. Detectar páginas donde inicia cada diapositiva
    slide_pages = {}
    for page_num in range(len(doc)):
        text = doc[page_num].get_text()
        for s in range(1, len(slides_meta) + 1):
            if s not in slide_pages:
                patterns = [
                    f"Diapositiva #{s:02d}",
                    f"Diapositiva #{s}",
                    f"DIAPOSITIVA #{s:02d}",
                    f"DIAPOSITIVA #{s}"
                ]
                if any(p in text for p in patterns):
                    slide_pages[s] = page_num + 1

    print(f"Páginas detectadas para {len(slide_pages)}/{len(slides_meta)} diapositivas.")

    # Títulos de módulos
    module_titles = {
        0: "MÓDULO 00: Bienvenida, Dinámica y Entorno Dual",
        1: "MÓDULO 01: Arquitectura Profunda e Instalación con Kubeadm",
        2: "MÓDULO 02: Gestión Declarativa de Cargas de Trabajo (Workloads)",
        3: "MÓDULO 03: Redes en Kubernetes: Conectividad y Exposición",
        4: "MÓDULO 04: Almacenamiento Persistente en Kubernetes (CSI)",
        5: "MÓDULO 05: Planificación de Cargas (Scheduling) y Recursos",
        6: "MÓDULO 06: Seguridad del Clúster, RBAC y Hardening",
        7: "MÓDULO 07: Observabilidad: Métricas, Logs y Sondas de Salud",
        8: "MÓDULO 08: Empaquetado y Despliegues con Helm",
        9: "MÓDULO 09: Operaciones de Día 2, Mantenimiento y Troubleshooting",
        10: "MÓDULO 10: Conclusiones, Certificaciones CKA/CKS y Cierre"
    }

    # Construcción de la tabla de marcadores (TOC)
    toc = [
        [1, "Portada - Guía del Docente", 1],
        [1, "Estructura General del Curso (30 Horas)", 2]
    ]

    current_mod = -1
    for s_info in slides_meta:
        s_num = s_info["num"]
        s_title = s_info["title"]
        s_badge = s_info.get("badge", "")
        mod_idx = s_info.get("modIdx", 0)

        # Inserción de cabecera de módulo
        if mod_idx != current_mod:
            current_mod = mod_idx
            mod_title = module_titles.get(mod_idx, f"MÓDULO {mod_idx:02d}")
            mod_page = slide_pages.get(s_num, 2)
            toc.append([1, mod_title, mod_page])

        s_page = slide_pages.get(s_num, 2)
        is_lab = "LAB" in s_badge.upper() or "LAB" in s_title.upper() or "INSTALACIÓN" in s_title.upper()
        if is_lab:
            label = f"[LAB] Diapositiva {s_num:02d}: {s_title}"
        else:
            label = f"Diapositiva {s_num:02d}: {s_title}"

        toc.append([2, label, s_page])

    doc.set_toc(toc)
    doc.save(output_pdf_path)
    doc.close()
    print(f"PDF final guardado en {output_pdf_path} con {len(toc)} entradas en el índice de marcadores.")

if __name__ == "__main__":
    postprocess()
