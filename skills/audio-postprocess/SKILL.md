---
name: audio-postprocess
description: "Post-procesamiento de audio para Prime Opositores. Acelera audios de ElevenLabs a 1.25x automáticamente usando FFmpeg. Integra generación TTS + aceleración en un solo flujo. Ideal para cursos y contenido educativo donde el ritmo estándar de ElevenLabs resulta lento."
triggers:
  - "acelerar audio"
  - "audio prime opositores"
  - "procesar audio"
  - "audio 1.25x"
  - "ffmpeg acelerar"
  - "audio más rápido"
auto_activate: false
priority: 3
requires:
  - elevenlabs
dependencies:
  - "fluent-ffmpeg"
  - "ffmpeg-static"
---

# Skill: Audio Post-Processing para Prime Opositores

> **OBLIGATORIO**: Todos los audios de ElevenLabs para Prime Opositores deben acelerarse a 1.25x

---

## 🎯 ¿Cuándo Usar Esta Skill?

- Generar audios para cursos de oposiciones
- Procesar lotes de audios educativos
- Convertir guiones a audio con ritmo dinámico
- Post-procesar cualquier audio que necesite aceleración

---

## ⚡ Scripts Disponibles

### 1. Acelerar audio existente
```bash
node skills/audio-postprocess/acelerar.js <input.mp3> [output.mp3] [velocidad]
```

### 2. Generar audio completo (ElevenLabs + acelerar)
```bash
node skills/audio-postprocess/generar-audio-prime.js <guion.txt> <output_base>
```

---

## 🔧 Uso Programático

```javascript
const { acelerarAudio } = require('./skills/audio-postprocess/acelerar.js');
const { generarAudioPrime } = require('./skills/audio-postprocess/generar-audio-prime.js');

// Solo acelerar
await acelerarAudio('input.mp3', 'output_1.25x.mp3', 1.25);

// Generar + acelerar (flujo completo)
await generarAudioPrime('guiones/tema.txt', 'audios/tema');
// → Genera: audios/tema_v3_1.25x.mp3
```

---

## 📋 Flujo Completo Prime Opositores

1. **Escribir guión** → `audios-prime/guiones/tema.txt`
2. **Ejecutar script**:
   ```bash
   node skills/audio-postprocess/generar-audio-prime.js \
     audios-prime/guiones/tema.txt \
     audios-prime/v3/tema
   ```
3. **Resultado**: `audios-prime/v3/tema_v3_1.25x.mp3`

---

## ⚙️ Configuración

En `generar-audio-prime.js`:
- **API Key**: ElevenLabs
- **Voz**: Carlos Profesional (`SL225ROFroVZtyvlzjQI`)
- **Modelo**: `eleven_v3`
- **Velocidad**: 1.25x (fija)

---

## 📦 Dependencias

```bash
npm install fluent-ffmpeg ffmpeg-static
```

Ya instaladas en `/home/node/openclaw`

---

## 🎯 Por qué 1.25x

- ElevenLabs genera audio lento por defecto
- 1.25x es el punto óptimo: más dinámico sin sonar artificial
- Ideal para contenido educativo/redes sociales

---

## Ejemplos de uso

**Ejemplo 1 — Generar audio completo desde guión:**
> "Genera el audio del guión de oposiciones sobre el artículo 53 CE"

```bash
node skills/audio-postprocess/generar-audio-prime.js \
  audios-prime/guiones/art53_CE.txt \
  audios-prime/v3/art53_CE
# → Genera: audios-prime/v3/art53_CE_v3_1.25x.mp3
```

**Ejemplo 2 — Acelerar un audio ya existente:**
> "Acelera el audio que acabo de generar"

```bash
node skills/audio-postprocess/acelerar.js input.mp3 output_1.25x.mp3 1.25
```

**Ejemplo 3 — Velocidad personalizada (ej. 1.15x para voz más lenta):**
```bash
node skills/audio-postprocess/acelerar.js guion_largo.mp3 guion_largo_1.15x.mp3 1.15
```

**Velocidades habituales:**

| Velocidad | Uso recomendado |
|-----------|-----------------|
| 1.0x | Original (demasiado lento para redes) |
| 1.15x | Podcasts o cursos largo plazo |
| **1.25x** | **Prime Opositores (estándar obligatorio)** |
| 1.5x | Avance rápido o uso interno |

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.2
- **Cambios**: Añadidos ejemplos de uso y tabla de velocidades
