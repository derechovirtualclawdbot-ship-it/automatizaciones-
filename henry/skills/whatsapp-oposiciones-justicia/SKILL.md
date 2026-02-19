---
name: whatsapp-oposiciones-justicia
description: "Enviar mensajes al grupo de WhatsApp 'OPOSICIONES JUSTICIA TEAM' de Derecho Virtual. Incluye avisos de clases Zoom, encuestas, temas gratis, PDFs de resúmenes y promociones. Activar cuando Carlos pida enviar mensaje al grupo de oposiciones, justicia team, o comunicar algo a los opositores."
triggers:
  - "mensaje grupo oposiciones"
  - "enviar al grupo de justicia"
  - "whatsapp oposiciones"
  - "avisar a los opositores"
  - "grupo justicia team"
  - "comunidad oposiciones"
---

# 📢 Skill: WhatsApp Oposiciones Justicia Team

> Comunicación con la comunidad de opositores de Justicia de Derecho Virtual

---

## 🎯 Grupos Disponibles

| Grupo | ID | Uso |
|-------|-----|-----|
| 👋OPOSICIONES JUSTICIA TEAM (Principal) | `120363421498269943@g.us` | Comunidad principal |
| 👋OPOSICIONES JUSTICIA TEAM (Secundario) | `120363402842068000@g.us` | Comunidad backup |
| ‼️ JORNADAS EN DIRECTO: EXAMEN JUSTICIA 2026 | `120363421268541809@g.us` | Avisos de directos |

**Por defecto usar:** `120363421498269943@g.us` (Principal)

---

## 🔑 Credenciales (heredadas de ultramsg-whatsapp)

```
INSTANCE: instance125981
TOKEN: y4ffepibt3l9y5ql
API_URL: https://api.ultramsg.com/instance125981
```

---

## ⚡ Envío Rápido

### Mensaje de texto al grupo
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/chat" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=120363421498269943@g.us" \
  -d "body=Tu mensaje aquí"
```

### Imagen con caption
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/image" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=120363421498269943@g.us" \
  -d "image=https://url-publica.jpg" \
  -d "caption=Texto opcional"
```

### Documento/PDF
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/document" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=120363421498269943@g.us" \
  -d "document=https://url-publica.pdf" \
  -d "filename=documento.pdf"
```

---

## 📝 Estilo de Comunicación del Grupo

### Formato típico de mensajes (basado en Gastón/Adrián)

**Estructura de aviso de clase:**
```
👋🏽 Buenas [Opositor]! [Mensaje de apertura]

⚠️ [Información importante]

✅ Enlace [Evento] en Directo con Laura: [Título]
https://zoom.us/j/XXXXXXXX

⚠️ Habilitamos la sala de espera a las [hora]

Nos vemos en un rato 👋🏽
```

**Estructura de encuesta:**
```
👋🏽 Buenas [Opositor]! [Pregunta introductoria]

ENCUESTA:
[Pregunta principal]
OPCIÓN: A) [Opción 1]
OPCIÓN: B) [Opción 2]
OPCIÓN: C) [Opción 3]
```

**Estructura de regalo/recurso:**
```
🎁 [Título del recurso]

✅ [Descripción de qué incluye]

👆🏽 [Llamada a la acción]
```

### Emojis frecuentes
- 👋🏽 Saludo
- ⚠️ Atención/Importante
- ✅ Confirmación/Enlace
- 🎁 Regalo/Recurso
- 📢 Anuncio
- 🙌🏽 Celebración
- 🤯 Sorpresa
- 🥳 Éxito
- ‼️ Urgente
- 📋 Contenido
- 🔓 Sala abierta

### Vocabulario clave
- "Opositor" (siempre dirigirse así)
- "Plaza" (no "puesto")
- "Examen de Justicia 2026"
- "Gestión, Tramitación o Auxilio"
- "Laura" (profesora de clases en directo)
- "Derecho Virtual" / "Prime Opositores"

---

## 🎯 Tipos de Mensajes Comunes

### 1. Aviso de clase en directo
Ver `references/plantillas.md` → Sección "Clase Zoom"

### 2. Encuesta interactiva
Ver `references/plantillas.md` → Sección "Encuestas"

### 3. Recurso gratuito (tema/PDF)
Ver `references/plantillas.md` → Sección "Recursos"

### 4. Recordatorio de plazas/inscripción
Ver `references/plantillas.md` → Sección "Promoción"

---

## 📊 Datos del Grupo

- **Creado:** 29/09/2025
- **Admins:** Carlos, Adrián, Abel, Gastón
- **Miembros activos:** ~400+
- **Frecuencia envío:** 1-3 mensajes/día
- **Horario óptimo:** 12:00-14:00 y 19:00-21:00

---

## ⚠️ Reglas de Uso

1. **NO spamear** - Máximo 3 mensajes/día
2. **Siempre valor** - Cada mensaje debe aportar algo útil
3. **Tono cercano** - Hablar como Gastón (entusiasta pero profesional)
4. **Urgencia real** - Solo usar ⚠️/‼️ cuando sea genuino
5. **Recursos gratis** - Intercalar contenido gratuito con promociones

---

## Ejemplos de uso

**Ejemplo 1 — Aviso de clase en directo:**
> "Avisa al grupo de oposiciones que mañana a las 18:00 hay clase en directo con Laura sobre Ley 40/2015"

```
👋🏽 Buenas opositor! Mañana tienes una cita importante:

⚠️ CLASE EN DIRECTO con Laura sobre la Ley 40/2015

✅ Enlace Zoom en Directo: Ley 40/2015 - Procedimiento Administrativo
https://zoom.us/j/XXXXXXXX

⚠️ Habilitamos la sala de espera a las 17:50

Nos vemos mañana 👋🏽
```
→ Enviar al grupo principal `120363421498269943@g.us` mediante UltraMsg API (texto)

**Ejemplo 2 — Recurso gratuito (PDF):**
> "Manda al grupo de justicia el PDF de resumen del Estatuto Básico del Empleado Público"

```bash
# Subir PDF a catbox.moe
URL=$(curl -s -F "reqtype=fileupload" -F "fileToUpload=@trebep_resumen.pdf" https://catbox.moe/user/api.php)

# Enviar como documento
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/document" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=120363421498269943@g.us" \
  -d "document=$URL" \
  -d "filename=Resumen_TREBEP.pdf"

# Enviar mensaje explicativo
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/chat" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=120363421498269943@g.us" \
  -d "body=🎁 Aquí tienes el resumen del TREBEP que me pedisteis. ¡A por la plaza!"
```

**Ejemplo 3 — Mensaje a los 3 grupos (anuncio importante):**
> "Manda a todos los grupos de oposiciones que el examen de Gestión Procesal ha sido convocado"

→ Enviar mensaje de texto a los tres grupos: Principal, Secundario y Jornadas
```bash
for GROUP in "120363421498269943@g.us" "120363402842068000@g.us" "120363421268541809@g.us"; do
  curl -s -X POST "https://api.ultramsg.com/instance125981/messages/chat" \
    -d "token=y4ffepibt3l9y5ql" \
    -d "to=$GROUP" \
    -d "body=‼️ CONVOCATORIA OFICIAL: El examen de Gestión Procesal ya tiene fecha. ¡Toda la info en el grupo!"
done
```

---

## 🔧 Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| Mensaje no entregado | Grupo puede haber cambiado ID | Verificar IDs en TOOLS.md |
| Token inválido | UltraMsg token expirado | Renovar en panel UltraMsg |
| Solo admins pueden escribir | Grupo restringido | Verificar que la instancia es admin del grupo |
| Imagen no se envía | URL no pública | Subir primero a catbox.moe |
| Error `file extension not supported` | Formato de audio incorrecto | Usar solo OGG/Opus para notas de voz |

---

## Dependencias / Configuración

| Requisito | Detalle |
|-----------|---------|
| **UltraMsg** | Skill `ultramsg-whatsapp` · Instance: `instance125981` · Token: `y4ffepibt3l9y5ql` |
| **file-share** | Para enviar PDFs/imágenes vía catbox.moe |
| **Plantillas** | `references/plantillas.md` — plantillas completas por tipo de mensaje |

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.1
- **Cambios**: Añadidos ejemplos completos, troubleshooting y sección de dependencias
