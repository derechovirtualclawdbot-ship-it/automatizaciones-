---
name: sequra-teachable
description: "Sincronización automática Sequra → Teachable. Cuando alguien compra en Sequra, se enrolla automáticamente en el curso correspondiente de Teachable."
triggers:
  - "sequra teachable"
  - "enrollar sequra"
  - "sincronizar ventas"
auto_activate: false
priority: 2
---

# 🔄 Skill: Sequra → Teachable Auto-Enrollment

> Sincronización automática de ventas de Sequra con cursos de Teachable

---

## 🎯 Descripción

Cada vez que alguien compra un producto en Sequra, se enrolla automáticamente en el curso correspondiente de Teachable usando su email.

---

## 📋 Mapeo de Productos

| Producto Sequra | Curso Teachable | Course ID |
|-----------------|-----------------|-----------|
| Gestión Procesal | OPOSICIONES DE JUSTICIA | `1994647` |
| Tramitación Procesal | OPOSICIONES DE JUSTICIA | `1994647` |
| Auxilio Judicial | OPOSICIONES DE JUSTICIA | `1994647` |
| Oposiciones de Justicia | OPOSICIONES DE JUSTICIA | `1994647` |
| Instituciones Penitenciarias | INSTITUCIONES PENITENCIARIAS | `2637836` |
| Legal Prime | Legal Prime / membresía anual | `2854170` |

---

## 🔑 Credenciales

### Sequra MCP
- **Endpoint**: `https://simba.sequra.com/mcp`
- **Auth**: Bearer JWT token
- **Token**: Ver `/home/node/openclaw/skills/sequra-teachable/.env`

### Teachable API
- **Endpoint**: `https://developers.teachable.com/v1`
- **Auth**: apiKey header
- **Key**: Ver `/home/node/openclaw/skills/sequra-teachable/.env`

---

## ⚙️ Cómo Funciona

1. **Cron job** cada 15 minutos revisa ventas nuevas en Sequra
2. **Filtra** por productos mapeados
3. **Enrolla** al cliente en Teachable usando su email
4. **Envía WhatsApp** al grupo "Avisos Calendly DV Verdadero" con los datos del estudiante
5. **Registra** las ventas procesadas para no duplicar

---

## 📱 Notificación WhatsApp

Cada enrollment envía un mensaje al grupo:
- **Grupo**: Avisos Calendly DV Verdadero
- **ID**: `120363402820307448@g.us`
- **Formato**: "Hola, VENTA POR SEQURA. Se ha inscrito al estudiante [NOMBRE] en el curso: [PRODUCTO]. Puedes contactarlo a su correo: [EMAIL]"

---

## 🛠️ Scripts

### Revisar y Enrollar
```bash
node /home/node/openclaw/skills/sequra-teachable/sync.js
```

### Ver ventas recientes (sin enrollar)
```bash
node /home/node/openclaw/skills/sequra-teachable/check-sales.js
```

---

## 📊 Estado

- **Última sincronización**: Ver `last_sync.json`
- **Ventas procesadas**: Ver `processed_orders.json`

---

## 🚨 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| 401 Unauthorized | Token Sequra expirado | Regenerar en portal Sequra |
| User not found | Email no existe en Teachable | Se crea automáticamente |
| Already enrolled | Usuario ya en el curso | Se ignora (no es error) |

---

## Ejemplos de uso

**Ejemplo 1 — Consultar ventas pendientes de enrollar:**
> "¿Hay ventas de Sequra sin procesar?"

```bash
node /home/node/openclaw/skills/sequra-teachable/check-sales.js
```
→ Lista los pedidos de Sequra que aún no tienen enrollment en Teachable

**Ejemplo 2 — Sincronizar manualmente:**
> "Sincroniza las ventas de Sequra con Teachable ahora"

```bash
node /home/node/openclaw/skills/sequra-teachable/sync.js
```
→ Revisa ventas nuevas, enrolla en Teachable y envía notificación WhatsApp al grupo de avisos

**Ejemplo 3 — Verificar enrollment de un alumno específico:**
> "Comprueba si María García (mgarcia@example.com) está enrollada en Gestión Procesal"

→ Consultar la API de Teachable con el email y course_id `1994647` para verificar

---

## Dependencias / Configuración

| Variable | Detalle |
|----------|---------|
| **SEQURA_JWT_TOKEN** | Bearer token para API Sequra (`/home/node/openclaw/skills/sequra-teachable/.env`) |
| **TEACHABLE_API_KEY** | API key de Teachable (mismo archivo `.env`) |
| **Cron schedule** | Cada 15 minutos — revisión automática de ventas |
| **Historial** | `processed_orders.json` — evita duplicados |
| **Estado** | `last_sync.json` — timestamp de última sincronización |

### Renovación del token Sequra
Si la sincronización falla con 401:
1. Acceder al portal Sequra → Configuración → API
2. Regenerar el JWT token
3. Actualizar en `/home/node/openclaw/skills/sequra-teachable/.env`

---

## 📅 Última Actualización
- **Fecha**: 2026-02-19
- **Versión**: 1.1
- **Cambios**: Añadidos ejemplos de uso y sección de dependencias/configuración
