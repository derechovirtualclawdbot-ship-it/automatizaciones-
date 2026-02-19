---
name: noticias-iipp
description: "Genera diseños de noticias 'Actualidad de tu Oposición' para Instituciones Penitenciarias (SOLO Ayudante IIPP). Flujo: texto → imagen Gemini 3 Pro Image (fondo rojo oscuro con rejas) → enviar WhatsApp al grupo IIPP (#1 CONVIÉRTE EN FUNCIONARIO DE PRISIONES). Solo noticias de máx 24-48h. Cron: L-V a las 12 PM España."
triggers:
  - "noticia de IIPP"
  - "noticia instituciones penitenciarias"
  - "noticia prisiones"
  - "actualidad penitenciarias"
  - "noticia ayudante IIPP"
  - "news IIPP"
auto_activate: false
priority: 2
config:
  gemini_key_path: "~/.openclaw/credentials/.env.gemini"
  imagen_model: "gemini-3-pro-image-preview"
  imagen_ratio: "9:16"
  whatsapp_group: "120363317258916780@g.us"
  schedule: "Lunes a Viernes: 12:00 PM (hora España)"
  scope: "SOLO Ayudante IIPP - NO Técnicos, NO Cuerpo Especial"
---

# Skill: Noticias Instituciones Penitenciarias

Genera diseños de noticias estilo "Actualidad de tu Oposición" para Derecho Virtual - **SOLO Ayudante de Instituciones Penitenciarias**.

## ⚠️ IMPORTANTE: SOLO AYUDANTE IIPP
- ✅ Ayudante de Instituciones Penitenciarias
- ❌ NO informar sobre Técnicos (Juristas/Psicólogos)
- ❌ NO informar sobre Cuerpo Especial
- ❌ NO informar sobre otros cuerpos de IIPP

## Activación

Cuando Carlos pida:
- "noticia de IIPP"
- "noticia instituciones penitenciarias"
- "noticia prisiones"
- "actualidad penitenciarias"

## Flujo OBLIGATORIO

### 1. Primero: Generar TODO el texto

```
📰 NOTICIA OPOSICIONES

🏷️ Categoría: [IIPP / AYUDANTE INSTITUCIONES PENITENCIARIAS / etc.]
🔖 Etiqueta: [OEP 2025 / CONVOCATORIA / NOVEDADES / EXAMEN / etc.]

📌 TITULAR:
[Titular impactante, máx 15 palabras]

📝 DESCRIPCIÓN:
[Resumen de la noticia en 2-3 líneas, hasta 300 palabras]

🔗 FUENTE: [URL solo si es oficial/prensa - NUNCA de academias competidoras]
```

### 2. Después: Generar la imagen

Usar Gemini 3 Pro Image con estas especificaciones:

## Especificaciones de Diseño

### Branding Derecho Virtual - IIPP
- **Fondo:** ROJO OSCURO (#8B0000 a #4a0000) - estilo cárcel/prisión con patrón sutil de rejas
- **Logo:** Columna jónica dorada + "DERECHO" gris oscuro + "VIRTUAL" dorado
- **Header:** "ACTUALIDAD DE TU OPOSICIÓN" en blanco

### Estructura visual (9:16 vertical)
1. **TOP:** Logo Derecho Virtual (columna jónica)
2. **HEADER:** "ACTUALIDAD" + "DE TU OPOSICIÓN"
3. **FRANJA:** Naranja-roja con categoría + etiqueta/badge
4. **TITULAR:** Texto blanco grande e impactante
5. **IMAGEN:** Mujer profesional 30-50 años (SIEMPRE mujeres)

### Prompt base para Gemini

```
Professional vertical news announcement poster 9:16 ratio for Spanish legal academy about prison officer exams. 
DARK RED gradient background (#8B0000 to #4a0000) with subtle prison bars or cell door pattern, giving it a serious institutional prison atmosphere. 

TOP HEADER: Logo with stylized golden ionic column capital (Greek pillar with spiral volutes) above text DERECHO in dark charcoal and VIRTUAL in golden brown. 

BELOW: Bold white text ACTUALIDAD with orange underline, then DE TU OPOSICIÓN in white. 

MIDDLE: Bright orange-red full-width horizontal stripe with white text [CATEGORÍA: IIPP / INSTITUCIONES PENITENCIARIAS] and circular red [ETIQUETA] stamp badge. 

MAIN HEADLINE: Large bold white text: [TITULAR]

BOTTOM: Professional Spanish woman aged 35-45 years old, [descripción según contexto: estudiando/preocupada/celebrando/etc.], wearing elegant business attire. 

Dark red prison-themed background, modern corporate design, Spanish text.
```

## ⚠️ REGLA ENLACES

**INCLUIR enlace solo si viene de:**
- BOE.es (convocatorias)
- Ministerio del Interior (interior.gob.es)
- Instituciones Penitenciarias (institucionpenitenciaria.es)
- Prensa generalista (El País, La Vanguardia, ABC, etc.)
- Medios locales

**NUNCA incluir enlace si viene de:**
- Academias de oposiciones (OpositaTest, Adams, CEF, MasterD, etc.)
- Cualquier competidor

**SIEMPRE buscar e incluir enlace oficial cuando exista**

---

## 📅 Sistema de Noticias Diarias (Lunes a Viernes)

### Búsqueda automática (CRON)

**Horario:** Lunes a Viernes
- 🕛 **12:00 PM** (España) - Única búsqueda diaria

### Sistema de 3 Sub-agentes

**Sub-agente 1 - Verificar actualidad:**
- La noticia DEBE tener una fecha específica (publicación BOE, examen, resultados, etc.)
- Si noticia > 7 días → RECHAZAR
- Si no hay fecha concreta → RECHAZAR (no es noticia, es contenido informativo)
- Solo noticias con EVENTOS FECHADOS de los últimos 7 días

**Ejemplos de noticias VÁLIDAS:**
✅ "Publicada lista de admitidos en BOE el 15 de febrero"
✅ "Examen el 2 de marzo de 2026"
✅ "Notas de corte publicadas el 27 de enero"
✅ "Plazo de instancias hasta el 29 de enero"

**Ejemplos de contenido a RECHAZAR:**
❌ "¿Cuánto cobra un funcionario de prisiones?" (informativo, sin fecha)
❌ "Requisitos para ser Ayudante IIPP" (evergreen)
❌ "Sueldo 2026" (datos generales, no evento fechado)
❌ "Temario de la oposición" (informativo)

**Sub-agente 2 - Verificar tipo:**
- SOLO noticias de "Ayudante de Instituciones Penitenciarias"
- Si es Técnicos, Cuerpo Especial u otro → DESCARTAR

**Sub-agente 3 - Verificar no repetición:**
- Comprobar historial en esta skill
- Si ya se ha cubierto → RECHAZAR

### Flujo de cada búsqueda

1. **Buscar noticias** de las últimas 24-48h sobre oposiciones **SOLO Ayudante de Instituciones Penitenciarias** (NO Técnicos, NO Cuerpo Especial)
2. **Verificar** que no esté en el historial de noticias ya cubiertas
3. **Evaluar relevancia** mediante sub-agente
4. **Si hay noticia relevante y nueva:**
   - Explicar en detalle (hasta 300 palabras)
   - Generar imagen con Gemini 3 Pro Image (fondo ROJO estilo cárcel)
   - Enviar a Carlos por WhatsApp (+34633689258) - SOLO A CARLOS, sin grupo de momento
   - Actualizar historial
5. **Si NO hay noticia relevante:** Informar "No hay noticias relevantes hoy"

### 📱 ENVÍO DE NOTICIAS

**Cuando HAY noticia relevante:**
- Enviar al grupo WhatsApp: `120363317258916780@g.us`
- Grupo: #1 CONVIÉRTE EN FUNCIONARIO DE PRISIONES (687 miembros)

**Cuando NO hay noticia relevante:**
- Avisar a Carlos por Telegram (NO WhatsApp)
- Mensaje: "Hoy no hay noticias relevantes de Ayudante IIPP"

### Frecuencia esperada
- Solo lunes a viernes
- 2-3 noticias relevantes por semana (no todos los días)
- **Lo normal es que muchos días NO haya nada que enviar**
- Sub-agente decide si aprobar o denegar cada noticia

### ⚠️ REGLAS CRÍTICAS - NO REPETIR

1. **NUNCA repetir noticias** - Si una noticia ya está en el historial (hace 3 días, 2 semanas, 1 mes...) NO se vuelve a enviar
2. **Solo noticias ACTUALES** - Máximo 24-48 horas de antigüedad
3. **NO enviar noticias viejas** - Si la noticia es de hace 1 semana o más, IGNORAR
4. **Revisar SIEMPRE el historial** antes de enviar cualquier noticia
5. **Ante la duda, NO enviar** - Es preferible no mandar nada que repetir o enviar algo viejo

---

## 📋 HISTORIAL DE NOTICIAS CUBIERTAS

| Fecha | Tema | Titular resumido |
|-------|------|------------------|
| (solo Ayudante IIPP - otros cuerpos no aplican) | | |

---

## API Gemini

```bash
export $(cat ~/.openclaw/credentials/.env.gemini | xargs)
curl -s --max-time 180 "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "[PROMPT]"}]}],
    "generationConfig": {"responseModalities": ["IMAGE"]}
  }' -o /tmp/noticia_iipp_output.json
```

## Extracción de imagen

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/noticia_iipp_output.json', 'utf8'));
const part = data.candidates[0].content.parts.find(p => p.inlineData);
if (part) {
  const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'jpg';
  fs.writeFileSync('/tmp/noticia_iipp_final.' + ext, Buffer.from(part.inlineData.data, 'base64'));
}
```

## Notas

- SIEMPRE mujeres de 30-50 años (target principal de oposiciones)
- Fondo ROJO OSCURO (estilo cárcel/prisión — diferente de oposiciones Justicia que es azul)
- Franja naranja-roja para destacar categoría
- Titular impactante y directo
- Enviar imagen vía UltraMsg al grupo WhatsApp IIPP cuando hay noticia; avisar a Carlos por Telegram si no hay

---

## Dependencias / Configuración

| Requisito | Detalle |
|-----------|---------|
| **GEMINI_API_KEY** | `~/.openclaw/credentials/.env.gemini` — para generación de imagen |
| **Modelo imagen** | `gemini-3-pro-image-preview` (Gemini 3 Pro Image) |
| **Formato imagen** | 9:16 vertical — fondo ROJO OSCURO (#8B0000 a #4a0000) |
| **WhatsApp destino (noticia)** | Grupo IIPP: `120363317258916780@g.us` (687 miembros) |
| **Telegram (sin noticia)** | Avisar a Carlos solo por Telegram (no WhatsApp) |
| **Historial** | Tabla en este SKILL.md — actualizar tras cada noticia enviada |
| **Cron** | Lunes a viernes: 12:00 PM (hora España) — única búsqueda diaria |

### Fuentes de búsqueda recomendadas (SOLO Ayudante IIPP)
```
- BOE: https://www.boe.es/buscar/ — buscar "Instituciones Penitenciarias Ayudante"
- Interior: https://www.interior.gob.es
- IIPP oficial: https://www.institucionpenitenciaria.es
- Google Noticias: "oposiciones ayudante instituciones penitenciarias" (últimas 24h)
```

### Criterio de aprobación por sub-agente
Un sub-agente evalúa cada noticia. Aprueba si:
1. ✅ Tiene fecha concreta (publicación BOE, examen, resultados, plazos)
2. ✅ Es de los últimos 7 días
3. ✅ Es exclusivamente Ayudante IIPP (no Técnicos, no Cuerpo Especial)
4. ✅ No está en el historial de noticias ya cubiertas
