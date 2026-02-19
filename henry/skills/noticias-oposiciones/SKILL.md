---
name: noticias-oposiciones
description: "Genera diseños de noticias estilo 'Actualidad de tu Oposición' para Derecho Virtual (oposiciones de Justicia). Flujo: generar texto → imagen con Gemini 3 Pro Image → enviar a Carlos por WhatsApp. Incluye sistema de búsqueda automática de noticias L-V a las 9h y 12h (hora España). SOLO enviar noticias de máx 24-48h de antigüedad."
triggers:
  - "noticia de oposiciones"
  - "diseño de noticia"
  - "actualidad oposición"
  - "news para oposiciones"
  - "noticia gestión procesal"
  - "noticia justicia"
  - "noticia oposiciones"
auto_activate: false
priority: 2
config:
  gemini_key_path: "~/.openclaw/credentials/.env.gemini"
  imagen_model: "gemini-3-pro-image-preview"
  imagen_ratio: "9:16"
  whatsapp_to: "+34633689258"
  schedule: "Lunes a Viernes: 9:00 AM y 12:00 PM (hora España)"
---

# Skill: Noticias Oposiciones

Genera diseños de noticias estilo "Actualidad de tu Oposición" para Derecho Virtual.

## Activación

Cuando Carlos pida:
- "noticia de oposiciones"
- "diseño de noticia"
- "actualidad oposición"
- "news para oposiciones"

## Flujo OBLIGATORIO

### 1. Primero: Generar TODO el texto

```
📰 NOTICIA OPOSICIONES

🏷️ Categoría: [JUSTICIA 2026 / GESTIÓN PROCESAL / AUXILIO JUDICIAL / etc.]
🔖 Etiqueta: [ESCÁNDALO / OEP 2025 / CONVOCATORIA / NOVEDADES / etc.]

📌 TITULAR:
[Titular impactante, máx 15 palabras]

📝 DESCRIPCIÓN:
[Resumen de la noticia en 2-3 líneas]

🔗 FUENTE: [URL solo si es oficial/prensa - NUNCA de academias competidoras]
```

## ⚠️ REGLA ENLACES

**INCLUIR enlace solo si viene de:**
- BOE (boe.es)
- Ministerio de Justicia
- Prensa generalista (El País, La Vanguardia, ABC, etc.)
- Medios locales

**NUNCA incluir enlace si viene de:**
- Academias de oposiciones (OpositaTest, Adams, CEF, MasterD, etc.)
- administraciondejusticia.com
- Cualquier competidor

**SIEMPRE buscar e incluir enlace oficial cuando exista:**
- BOE.es (convocatorias)
- Ministerio de Justicia (mjusticia.gob.es)
- Generalitat de Catalunya (gencat.cat)
- Junta de Andalucía (juntadeandalucia.es)
- Comunidad de Madrid (comunidad.madrid)
- Otras webs oficiales de CCAA

### 2. Después: Generar la imagen

Usar Gemini 3 Pro Image con estas especificaciones:

## Especificaciones de Diseño

### Branding Derecho Virtual
- **Fondo:** Azul claro (#4a90d9 a #7eb8da) - gradiente suave
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
Professional vertical news announcement poster 9:16 ratio for Spanish legal academy. 
LIGHT BLUE gradient background (#4a90d9 to #7eb8da) - soft sky blue corporate color. 

TOP HEADER: Logo with stylized golden ionic column capital (Greek pillar with spiral volutes) above text DERECHO in dark charcoal and VIRTUAL in golden brown. 

BELOW: Bold white text ACTUALIDAD with orange underline, then DE TU OPOSICIÓN in white. 

MIDDLE: Bright orange-red full-width horizontal stripe with white text [CATEGORÍA] and circular red [ETIQUETA] stamp badge. 

MAIN HEADLINE: Large bold white text: [TITULAR]

BOTTOM: Professional Spanish woman aged 35-45 years old, [descripción según contexto: estudiando/preocupada/celebrando/etc.], wearing elegant business attire. 

Light blue background, modern corporate design, Spanish text.
```

## Ejemplo de uso

**Input:** "Hazme una noticia sobre que han salido las plazas de Gestión Procesal"

**Output texto:**
```
📰 NOTICIA OPOSICIONES

🏷️ Categoría: GESTIÓN PROCESAL
🔖 Etiqueta: OEP 2025

📌 TITULAR:
Publicadas 1.200 PLAZAS de Gestión Procesal - Convocatoria inminente

📝 DESCRIPCIÓN:
El Ministerio de Justicia anuncia la mayor oferta de empleo público para Gestión Procesal de los últimos años.

🔗 FUENTE: BOE
```

**Output imagen:** [Se genera con Gemini 3 Pro Image]

## API Gemini

```bash
export $(cat ~/.openclaw/credentials/.env.gemini | xargs)
curl -s --max-time 180 "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "[PROMPT]"}]}],
    "generationConfig": {"responseModalities": ["IMAGE"]}
  }' -o /tmp/noticia_output.json
```

## Extracción de imagen

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/noticia_output.json', 'utf8'));
const part = data.candidates[0].content.parts.find(p => p.inlineData);
if (part) {
  const ext = part.inlineData.mimeType === 'image/png' ? 'png' : 'jpg';
  fs.writeFileSync('/tmp/noticia_final.' + ext, Buffer.from(part.inlineData.data, 'base64'));
}
```

## Notas

- SIEMPRE mujeres de 30-50 años (target principal de oposiciones)
- Fondo AZUL CLARO (no oscuro)
- Franja naranja-roja para destacar categoría
- Titular impactante y directo
- Enviar imagen vía message tool con filePath

---

## Dependencias / Configuración

| Requisito | Detalle |
|-----------|---------|
| **GEMINI_API_KEY** | `~/.openclaw/credentials/.env.gemini` — para generación de imagen |
| **Modelo imagen** | `gemini-3-pro-image-preview` (Gemini 3 Pro Image) |
| **Formato imagen** | 9:16 vertical (stories/reels) |
| **WhatsApp (UltraMsg)** | Para enviar a Carlos (+34 633 689 258) |
| **Historial** | Tabla en este SKILL.md — actualizar tras cada noticia enviada |
| **Cron** | Lunes a viernes: 9:00 AM y 12:00 PM (hora España) |

### Fuentes de búsqueda recomendadas
```
- BOE: https://www.boe.es/buscar/boe.php?campo[0]=TIT&dato[0]=oposiciones+justicia
- Ministerio de Justicia: https://www.mjusticia.gob.es
- Google Noticias: "oposiciones gestión procesal" / "oposiciones justicia" (últimas 24h)
- Web search con freshness=pd o pw
```

---

## 📅 Sistema de Noticias Diarias (Lunes a Viernes)

### Búsquedas automáticas (CRON)

**Horarios:** Lunes a Viernes
- 🕘 **9:00 AM** (España) - Primera búsqueda
- 🕛 **12:00 PM** (España) - Segunda búsqueda

### Flujo de cada búsqueda

1. **Buscar noticias** de las últimas 24-48h sobre oposiciones Justicia (Gestión, Tramitación, Auxilio)
2. **Verificar** que no esté en el historial de noticias ya cubiertas
3. **Evaluar relevancia** mediante sub-agente
4. **Si hay noticia relevante y nueva:**
   - Explicar en detalle (hasta 300 palabras)
   - Generar imagen con Gemini 3 Pro Image
   - Enviar a Carlos por WhatsApp (+34633689258) para aprobación
   - Actualizar historial
5. **Si NO hay noticia relevante:** Informar "No hay noticias relevantes hoy"

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
| 2026-02-18 | Escándalo Justicia | 12.000 opositores esperan 2 años plaza |
| 2026-02-18 | Gestión Procesal | 725 plazas convocadas OEP 2025 |
| 2026-02-18 | Bolsas Interinos | Cataluña y Andalucía plazos abiertos feb 2026 |
