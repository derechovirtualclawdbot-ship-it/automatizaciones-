---
name: tweets-ia-diarios
description: "Búsqueda diaria de tweets de IA relevantes para abogados. Se ejecuta a las 17:00 España. Usa Grok API para buscar en X, filtra por utilidad legal y envía al grupo General de Lexi AI PRO."
triggers:
  - "tweets ia"
  - "noticias ia diarias"
  - "buscar tweets ia"
auto_activate: false
priority: 2
config:
  grok_api_key_path: "~/.openclaw/credentials/.env.grok"
  whatsapp_group: "120363419863128764@g.us"
  schedule: "16:00 UTC (17:00 España)"
---

# 📰 Skill: Tweets IA Diarios para Abogados

> Búsqueda automatizada de tweets de IA relevantes para el sector legal

---

## 🎯 Objetivo

Cada día a las 17:00 (España) buscar y compartir UN tweet de IA útil para abogados en el grupo General de Lexi AI PRO.

---

## 🔄 Flujo de Trabajo (3 fases)

### Fase 1: Investigación
**Buscar 10 tweets del día anterior sobre:**
- Modelos de IA (GPT, Claude, Gemini, Grok, Llama, etc.)
- Actualizaciones y lanzamientos
- Benchmarks
- Noticias de empleo + IA
- Herramientas de productividad IA

**API:** Grok (xAI) con x_search tool
**Filtro fecha:** Solo del día anterior

### Fase 2: Filtrado Legal
**De los 10 tweets, seleccionar los 3 más útiles para abogados:**
- ¿Ayuda a redactar escritos/demandas?
- ¿Mejora productividad en despacho?
- ¿Afecta al sector legal (empleo, regulación)?
- ¿Nuevo modelo con mejor razonamiento?

### Fase 3: Selección Final
**Elegir EL tweet final considerando:**
1. **Utilidad práctica** para abogados
2. **Idioma:** Solo español o inglés
3. **Preferencia:** Español > Inglés
4. **Engagement:** Mínimo relevante (no tweets vacíos)

---

## 📤 Formato de Envío

Estilo Carlos Rivero (ver chat General):

```
Buenas compañeros! 👋

[Introducción breve de la noticia]

[Explicación de qué es y por qué importa]

[Conexión con el trabajo de abogados]

Echarle un ojo 👇
[URL del tweet]
```

**Reglas:**
- Sin métricas (likes, RT)
- Tono cercano y directo
- Explicar utilidad práctica
- Máximo 5-6 líneas de texto

---

## 🔑 Credenciales

```bash
# Grok API
export XAI_API_KEY=$(cat ~/.openclaw/credentials/.env.grok | grep XAI_API_KEY | cut -d= -f2)

# WhatsApp (UltraMsg)
ULTRAMSG_INSTANCE=instance125981
ULTRAMSG_TOKEN=y4ffepibt3l9y5ql
```

---

## 📍 Destino

**Grupo:** General - Lexi AI PRO
**ID:** `120363419863128764@g.us`

---

## ⏰ Programación

**Cron:** Diario a las 16:00 UTC (17:00 España)

---

---

## Ejemplos de uso

**Ejemplo 1 — Ejecutar búsqueda manual inmediata:**
> "Busca el tweet de IA del día para abogados y envíalo al grupo"

→ Activa el flujo completo: busca con Grok API, filtra los 3 mejores, selecciona el final y lo manda al grupo General Lexi AI PRO

**Ejemplo 2 — Previsualizar sin enviar:**
> "Busca el tweet de IA de hoy pero muéstramelo antes de enviarlo"

→ Genera el texto del mensaje con el tweet seleccionado para revisión, espera confirmación antes de enviar

**Ejemplo 3 — Búsqueda de tema concreto:**
> "Busca tweets sobre la nueva versión de Claude y prepara el mensaje para el grupo"

→ Búsqueda dirigida al modelo específico, formatea con estilo Carlos Rivero, envía al grupo

---

## Dependencias / Configuración

| Variable | Detalle |
|----------|---------|
| **XAI_API_KEY** | Grok API (xAI) · Archivo: `~/.openclaw/credentials/.env.grok` |
| **ULTRAMSG_INSTANCE** | `instance125981` |
| **ULTRAMSG_TOKEN** | `y4ffepibt3l9y5ql` |
| **Grupo destino** | General Lexi AI PRO · ID: `120363419863128764@g.us` |
| **Cron** | Diario 16:00 UTC (17:00 España, lunes a viernes) |

### Herramienta de búsqueda
- **API:** Grok (xAI) con función `x_search` para buscar en X (Twitter) en tiempo real
- **Filtro:** Solo tweets del día anterior en español o inglés
- **Engagement mínimo:** Descartar tweets sin relevancia (cuentas con pocos seguidores o sin interacción)

*Skill versión: 1.1*
*Creada: 2026-02-17*
*Actualizada: 2026-02-19 — Añadidos ejemplos de uso y dependencias*
