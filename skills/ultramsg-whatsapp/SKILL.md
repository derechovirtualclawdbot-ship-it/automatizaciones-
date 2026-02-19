---
name: ultramsg-whatsapp
description: "Envío de mensajes WhatsApp vía API UltraMsg. Soporta texto, imágenes con caption, documentos/PDF, y notas de voz (requiere formato OGG Opus). Incluye guía completa para conversión de audio MP3→OGG, subida a catbox.moe, y envío como nota de voz. Para automatización de comunicaciones con clientes y envío de documentos legales."
triggers:
  - "enviar whatsapp"
  - "mandar whatsapp"
  - "whatsapp a"
  - "mensaje whatsapp"
  - "envía por whatsapp"
  - "nota de voz whatsapp"
  - "documento whatsapp"
  - "enviar por whatsapp"
  - "audio whatsapp"
  - "pdf whatsapp"
  - "imagen whatsapp"
auto_activate: false
priority: 2
config:
  api_url: "https://api.ultramsg.com/instance125981"
  credentials_path: "/home/node/openclaw/.env.ultramsg"
requires:
  - file-share
---

# 📱 Skill: WhatsApp vía UltraMsg

> Enviar mensajes, imágenes, documentos y notas de voz por WhatsApp usando la API de UltraMsg

---

## 🎯 Descripción

Envío de mensajes WhatsApp vía API UltraMsg. Soporta texto, imágenes con caption, documentos/PDF, notas de voz. Credenciales preconfiguradas. Para automatización de comunicaciones y envío de documentos a clientes.

**Cuándo usar esta skill:**
- Enviar documentos legales (contratos, demandas) a clientes
- Enviar notas de voz con resúmenes o explicaciones
- Automatizar comunicaciones con clientes
- Compartir imágenes y archivos por WhatsApp

---

## 🔑 CREDENCIALES

```bash
ULTRAMSG_INSTANCE=instance125981
ULTRAMSG_TOKEN=y4ffepibt3l9y5ql
ULTRAMSG_API_URL=https://api.ultramsg.com/instance125981
```

**Número principal Carlos:** `+34633689258`

---

## ⚡ ENVÍO RÁPIDO

### Mensaje de texto
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/chat" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "body=Tu mensaje aquí"
```

### Imagen con caption
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/image" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "image=https://url-publica.jpg" \
  -d "caption=Texto opcional"
```

### Documento/PDF
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/document" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "document=https://url-publica.pdf" \
  -d "filename=documento.pdf"
```

---

## 🎙️ ENVIAR NOTA DE VOZ (PROCESO COMPLETO)

### ⚠️ IMPORTANTE: Las notas de voz REQUIEREN formato OGG con codec Opus

### Paso 1: Si tienes MP3, convertir a OGG
```javascript
// Node.js con fluent-ffmpeg
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg('audio.mp3')
  .audioCodec('libopus')
  .audioBitrate('64k')
  .audioChannels(1)
  .audioFrequency(48000)
  .format('ogg')
  .output('audio.ogg')
  .on('end', () => console.log('✅ Convertido'))
  .run();
```

### Paso 2: Subir a URL pública (catbox.moe)
```bash
curl -s -F "reqtype=fileupload" -F "fileToUpload=@audio.ogg" https://catbox.moe/user/api.php
# Devuelve: https://files.catbox.moe/xxxxx.ogg
```

### Paso 3: Enviar como nota de voz
```bash
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/voice" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "audio=https://files.catbox.moe/xxxxx.ogg"
```

### Script completo (una línea)
```bash
# Convertir + Subir + Enviar
cd /home/node/openclaw && node -e "
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg('INPUT.mp3')
  .audioCodec('libopus').audioBitrate('64k').audioChannels(1).audioFrequency(48000).format('ogg')
  .output('output.ogg')
  .on('end', () => console.log('✅ OGG listo'))
  .run();
" && sleep 3 && \
URL=\$(curl -s -F "reqtype=fileupload" -F "fileToUpload=@output.ogg" https://catbox.moe/user/api.php) && \
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/voice" \
  -d "token=y4ffepibt3l9y5ql" -d "to=+34633689258" -d "audio=\$URL"
```

---

## 📊 ENDPOINTS DISPONIBLES

| Endpoint | Descripción | Parámetros requeridos |
|----------|-------------|----------------------|
| `/messages/chat` | Texto | `to`, `body` |
| `/messages/image` | Imagen | `to`, `image` |
| `/messages/document` | Documento | `to`, `document`, `filename` |
| `/messages/audio` | Audio (MP3) | `to`, `audio` |
| `/messages/voice` | **Nota de voz (OGG)** | `to`, `audio` |
| `/messages/video` | Video | `to`, `video` |
| `/messages/location` | Ubicación | `to`, `address`, `lat`, `lng` |

---

## 📱 FORMATO DE NÚMEROS

- **Formato correcto:** `+34633689258`
- Sin espacios ni guiones
- Siempre con prefijo de país

---

## 🔄 RESPUESTAS API

### Éxito
```json
{"sent":"true","message":"ok","id":12345}
```

### Error
```json
{"sent":"false","message":"descripción del error"}
```

---

## ⚠️ ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| `file extension not supported` | MP3 en endpoint voice | Convertir a OGG |
| `invalid number` | Formato incorrecto | Usar +34XXXXXXXXX |
| `media not found` | URL no accesible | Subir a catbox primero |
| `file too large` | Archivo > 16MB | Comprimir |

---

## 💡 EJEMPLOS PRÁCTICOS

### Enviar resumen de caso a cliente
```bash
# 1. Generar audio con ElevenLabs (MP3)
# 2. Convertir a OGG
# 3. Subir a catbox
# 4. Enviar por WhatsApp

URL=$(curl -s -F "reqtype=fileupload" -F "fileToUpload=@resumen.ogg" https://catbox.moe/user/api.php)
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/voice" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "audio=$URL"
```

### Enviar documento legal con mensaje
```bash
# Primero el documento
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/document" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "document=https://files.catbox.moe/xxxxx.pdf" \
  -d "filename=demanda.pdf"

# Luego el mensaje explicativo
curl -s -X POST "https://api.ultramsg.com/instance125981/messages/chat" \
  -d "token=y4ffepibt3l9y5ql" \
  -d "to=+34633689258" \
  -d "body=Adjunto la demanda para tu revisión. Cualquier duda me dices."
```

---

## 📁 Archivos relacionados

- `/home/node/openclaw/.env.ultramsg` - Credenciales
- `/home/node/openclaw/skills/file-share/SKILL.md` - Subir a catbox
- `/home/node/openclaw/skills/elevenlabs/SKILL.md` - Generar audios

---

## 🔧 Troubleshooting Avanzado

### Problema: Audio no se envía como nota de voz
```bash
# Verificar formato del archivo
file audio.ogg
# Debe mostrar: "Ogg data, Opus audio"

# Si muestra otro formato, reconvertir:
ffmpeg -i audio.mp3 -c:a libopus -b:a 64k -ac 1 -ar 48000 audio_fixed.ogg
```

### Problema: URL no accesible
```bash
# Verificar que catbox devolvió URL válida
curl -I "https://files.catbox.moe/xxxxx.ogg"
# Debe devolver HTTP 200

# Si falla, probar alternativa (file.io):
curl -F "file=@audio.ogg" https://file.io
```

### Problema: Número inválido
```bash
# Formato correcto: +34XXXXXXXXX (sin espacios)
# MAL:  34 633 689 258
# MAL:  0034633689258  
# BIEN: +34633689258
```

### Problema: Archivo muy grande
```bash
# Comprimir audio antes de subir
ffmpeg -i input.mp3 -b:a 48k -ac 1 output_compressed.mp3
```

---

## 📊 Límites de la API

| Recurso | Límite |
|---------|--------|
| Tamaño máximo archivo | 16 MB |
| Mensajes por minuto | ~60 |
| Longitud mensaje texto | 4096 caracteres |
| Formatos audio soportados | MP3, OGG (Opus), WAV |
| Formatos documento | PDF, DOC, DOCX, XLS, XLSX |

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 2.1
- **Cambios**: Añadido troubleshooting avanzado, límites de API
