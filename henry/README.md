# Automatizaciones - Derecho Virtual 🤖

Backup de todas las automatizaciones del bot Henry (OpenClaw) para Derecho Virtual y Prime Opositores.

**Último backup:** 19 de febrero de 2026

---

## 📁 Estructura

### `/sequra-teachable/` ⭐ (Principal)
Daemon que sincroniza ventas de Sequra → Teachable automáticamente.
- `daemon.js` — Proceso que corre 24/7 monitorizando nuevas ventas
- `sync.js` — Lógica de sincronización Sequra → Teachable
- `mark_existing.js` — Marca órdenes existentes como ya procesadas

### `/scripts/`
Scripts de utilidad del workspace:
- `extract-activecampaign-emails.js`
- `saludo-helper.js`
- `sync-skills.js`
- `test-drive-access.js`

### Scripts raíz
- `burofax_desahucio.js` — Generador de burofax
- `contrato_martinez_ruiz.js` / `contrato_martinez_word.js` — Contratos
- `factura_martinez.js` — Facturas
- `generar_contrato.js` / `generar_contrato_pdf.js` — Generadores
- `hoja_encargo_desahucio.js` — Hoja de encargo

### `/skills/`
Skills de automatización (cada carpeta tiene su `SKILL.md` con instrucciones):

| Skill | Función |
|-------|---------|
| `whatsapp-oposiciones-justicia` | Mensajes automáticos al grupo de opositores |
| `noticias-oposiciones` | Genera noticias diarias para grupos de oposiciones |
| `noticias-iipp` | Noticias para el grupo IIPP (Instituciones Penitenciarias) |
| `elevenlabs-calls` | Llamadas telefónicas automatizadas con IA |
| `mailerlite` | Email marketing automation |
| `n8n` | Integración con n8n para workflows |
| `trello` | Gestión de tareas del equipo |
| `instagram-downloader` | Descarga posts de Instagram |
| `tweets-ia-diarios` | Generación de tweets diarios |
| `ultramsg-whatsapp` | Mensajería WhatsApp vía UltraMsg API |
| `audio-postprocess` | Post-procesamiento de audio (ElevenLabs → 1.25x) |
| `gamma-presentaciones` | Generación de presentaciones vía Gamma API |
| `youtube-tools` | Herramientas para gestión de YouTube |

---

## 🚀 Automatización principal: Sequra → Teachable

El daemon corre continuamente en el servidor y cada vez que hay una venta nueva en Sequra, crea automáticamente el usuario en Teachable y le da acceso al curso.

**Para verificar que está corriendo:**
```bash
pgrep -f "sequra-teachable/daemon.js"
```

**Para arrancarlo manualmente:**
```bash
cd skills/sequra-teachable && nohup node daemon.js >> /tmp/sequra-daemon.log 2>&1 &
```

---

*Generado automáticamente por Henry (OpenClaw) — Derecho Virtual*
