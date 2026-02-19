---
name: trello
description: "Gestión de tareas y proyectos en Trello para Derecho Virtual. REGLA CRÍTICA: Toda tarea DEBE tener un responsable asignado. Si el usuario no especifica quién, PREGUNTAR antes de crear la tarjeta."
triggers:
  - "crear tarea"
  - "nueva tarjeta"
  - "añadir a trello"
  - "trello"
  - "agregar tarea"
  - "asignar tarea"
auto_activate: true
priority: 1
config:
  credentials_path: "/home/node/openclaw/.env.trello"
---

# 📋 Skill: Trello - Gestión de Tareas

> Gestión de tareas y proyectos en Trello para Derecho Virtual y Prime Opositores

---

## ⛔ REGLA CRÍTICA - NO NEGOCIABLE

**Toda tarea DEBE tener un responsable asignado.**

- ❌ NUNCA crear una tarjeta sin asignar a alguien
- ✅ Si el usuario no especifica responsable → **PREGUNTAR ANTES de crear**
- ✅ Confirmar el responsable antes de ejecutar

### Pregunta estándar:
```
"¿A quién le asigno esta tarea? (Adrián, David, María, Elisa, Lucía, Jorge, Brayan, Gastón, Abel, Carlos)"
```

---

## 👥 MIEMBROS DEL EQUIPO

### Con cuenta Trello (IDs)

| Nombre | ID Trello | Teléfono | Rol |
|--------|-----------|----------|-----|
| **Carlos** | `63766b497cca4205a312dea0` | +34 633 689 258 | CEO / Fundador |
| **Adrián** | `63767baeb607f90d52ccda97` | +34 664 149 448 | Socio DV, Landings |
| **Abel** | `5ce724a5adf4d65a3d4fa87f` | +34 618 908 126 | Colaborador |
| **Brayan** | `6850357dfc1042f3cd6dd960` | +57 320 965 8544 | Automatizaciones IA |
| **Gastón** | `673492db1a1a9c170b170621` | +34 651 519 762 | Marketing Oposiciones |
| **David** | `68a72e6dc55dc3a85918817b` | +34 687 772 719 | Gestión Derecho |
| **María** | `68d677ae55da227e4599ac0d` | +34 645 950 459 | Gestión Oposiciones |
| **Fran** | `6992e335e1bec058ad8cd37a` | +34 625 975 927 | IA/Automatizaciones |
| **Yaritza** | `67e3ea4685b6bad93cc57b88` | - | Colaboradora |
| **Nadia Elisa** | `6682d35cc0e73aa5c887bf58` | - | Colaboradora |

### Sin cuenta Trello (mencionar en descripción)

| Nombre | Teléfono | Rol |
|--------|----------|-----|
| **Elisa** | +34 615 927 683 | Auxiliar David |
| **Lucía** | +34 623 761 191 | Comercial |
| **Jorge** | +34 623 055 967 | Comercial |

---

## 🎯 ASIGNACIONES AUTOMÁTICAS POR TABLERO

| Tablero | ID | Responsable por defecto |
|---------|-----|------------------------|
| 📣 MARKETING OPOSICIONES | `68f1121c042232db27937d83` | **Gastón** (siempre) |
| 📚 CURSOS LEYES | `67371c843c790c3d00c1644c` | **María** (siempre) |
| 📚 MANUALES CURSOS LEYES | `69675cd962a06ebacef53175` | **David** (siempre) |
| 📚 OPOSICIONES JUSTICIA/otras opos | `66fd805a7ed1d2cf26259fab` | **María** (siempre) |
| ⚖️ EXAMEN DE ABOGACIA | `65b1155861c9b646d3cd3100` | **David** (siempre) |
| ⚖️ Cursos Derecho | `6710d91e19335b839ad479e5` | **David** (siempre) |
| 📚 INSTITUCIONES PENITENCIARIAS | `6522e496aba2a8934c0903ad` | **María** (siempre) |

### Asignación por LISTA (no tablero completo)

| Tablero | Lista | ID Lista | Responsable |
|---------|-------|----------|-------------|
| 🤖 IA AUTOMATIZACIONES | TAREAS FRAN | `69920228ec9febeb467c2514` | **Fran** (siempre) |

> ⚡ En estos tableros NO preguntar responsable → asignar automáticamente

**Nota:** Para miembros sin cuenta Trello (Elisa, Lucía, Jorge) → mencionar en descripción: `👤 Responsable: [nombre]`

---

## 📂 TABLEROS PRINCIPALES

| Tablero | ID | Uso |
|---------|-----|-----|
| 🤖 LexiAiPro | `68a21c0fa112632a95a3aca0` | Curso IA para Abogados |
| 📣 Ads | `64188a9ac78f5ac4961ecd3f` | Campañas publicitarias |
| 📣 MARKETING DV | `696f523e113dde42cb07eeb5` | Marketing Derecho Virtual |
| 📣 MARKETING OPOSICIONES | `68f1121c042232db27937d83` | Marketing Prime Opositores |
| 📚 CURSOS LEYES | `67371c843c790c3d00c1644c` | Cursos de leyes (asignar a María) |
| 📚 MANUALES CURSOS LEYES | `69675cd962a06ebacef53175` | Manuales cursos (asignar a David) |
| 📚 INSTITUCIONES PENITENCIARIAS | `6522e496aba2a8934c0903ad` | Oposiciones IIPP |
| ⚙️ BRAYAN/IA | `6977a94ce1bfca769a8f2e48` | Proyectos técnicos |

---

## 📬 NOTIFICACIONES DIARIAS (10:00 AM España)

### Configuración
- **Hora:** 10:00 AM (Europe/Madrid)
- **Vía:** WhatsApp (UltraMsg)
- **Después:** Reenviar copia a Carlos por Telegram

### Destinatarios
- ✅ Carlos (+34 633 689 258)
- ✅ Adrián (+34 664 149 448)
- ✅ Abel (+34 618 908 126)
- ✅ Gastón (+34 651 519 762)
- ✅ David (+34 687 772 719)
- ✅ María (+34 645 950 459)
- ✅ Fran (+34 625 975 927)

### Estilo del mensaje: CONVERSACIONAL Y HUMANO

❌ NO así (robótico):
```
📋 RESUMEN DIARIO DE TAREAS
⚠️ VENCIDAS:
• Tarea 1
• Tarea 2
```

✅ SÍ así (conversacional + listado final):
```
Buenos días! 👋

Oye, tienes un par de cosas pendientes que deberías mirar:

**La página de ventas** se venció ayer, ¿pudiste avanzar con eso?

Para esta semana tienes la landing para el domingo 22, los carruseles de IG ya deberías estar con ellos, y el lunes arrancamos con la **Jornada 1**.

**Lo más urgente hoy** sería cerrar lo de la landing. ¿Cómo lo ves?

Cualquier cosa me dices 🙌

---
📋 Resumen tareas:
⚠️ Página de ventas - 22 feb
⚠️ Carruseles IG - 17 feb (VENCIDA)
• Jornada 1 lanzamiento - 23 feb
```

**Claves del tono:**
- Saludar natural (Buenos días, Ey, Hola)
- Preguntar cómo va, no solo listar
- Mencionar las tareas en contexto, no como lista fría
- Priorizar qué es lo más importante HOY
- **Lo más importante en NEGRITA**
- **⚠️ Emojis de advertencia** en tareas que venzan pronto (hoy/mañana)
- Cerrar ofreciendo ayuda
- **AL FINAL: listado resumido de tareas con fechas**
- Sin firmas robóticas tipo "Mensaje automático de Henry"

### ⚠️ REGLA IMPORTANTE
- Solo mostrar vencidas de los **ÚLTIMOS 7 DÍAS**
- Solo mostrar próximas de los **PRÓXIMOS 7 DÍAS**
- ❌ NO incluir tareas de hace meses

---

## 🔧 CREDENCIALES

```bash
export $(cat /home/node/openclaw/.env.trello | xargs)
# Variables: TRELLO_API_KEY, TRELLO_TOKEN
```

---

## 🔍 DESCUBRIR LISTAS DE UN TABLERO

Antes de crear una tarjeta necesitas el `ID_LISTA`. Obtenerlo así:

```bash
# Listar todas las listas de un tablero
curl -s "https://api.trello.com/1/boards/BOARD_ID/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,id" | \
  python3 -c "import json,sys; [print(f'{l[\"id\"]} → {l[\"name\"]}') for l in json.load(sys.stdin)]"

# Listar todas las tarjetas de una lista
curl -s "https://api.trello.com/1/lists/LIST_ID/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,due,dueComplete,idMembers,shortUrl"

# Buscar tarjeta por nombre en un tablero
curl -s "https://api.trello.com/1/boards/BOARD_ID/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,due,idList,idMembers" | \
  python3 -c "import json,sys; [print(f'{c[\"name\"]} → {c[\"id\"]}') for c in json.load(sys.stdin) if 'buscar_texto' in c['name'].lower()]"
```

### IDs de listas conocidas

| Tablero | Lista | ID Lista |
|---------|-------|----------|
| 🤖 IA AUTOMATIZACIONES | TAREAS FRAN | `69920228ec9febeb467c2514` |
| _(descubrir otras con el comando anterior)_ | | |

---

## 📝 CREAR TARJETA

### Flujo obligatorio:

1. **Verificar responsable** → Si no hay, PREGUNTAR
2. **Verificar si es MARKETING OPOSICIONES** → Asignar a Gastón automático
3. **Crear tarjeta** con nombre, descripción, fecha, miembro

### Comando API:

```bash
curl -X POST "https://api.trello.com/1/cards" \
  -d "key=${TRELLO_API_KEY}" \
  -d "token=${TRELLO_TOKEN}" \
  -d "idList=ID_LISTA" \
  -d "name=Nombre de la tarea" \
  -d "desc=Descripción detallada" \
  -d "due=2026-02-20T18:00:00Z" \
  -d "idMembers=ID_MIEMBRO"
```

---

## 📋 CONSULTAR TAREAS

### Tareas de un miembro:
```bash
curl -s "https://api.trello.com/1/members/MEMBER_ID/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,due,dueComplete,shortUrl"
```

### Tareas próximas 7 días (filtrar en Python):
```python
from datetime import datetime, timezone, timedelta
now = datetime.now(timezone.utc)
hace_7_dias = now - timedelta(days=7)
en_7_dias = now + timedelta(days=7)

# Vencidas: hace_7_dias <= due < now
# Próximas: now <= due <= en_7_dias
```

---

## ✅ CHECKLIST PRE-CREACIÓN

- [ ] ¿Tiene nombre claro?
- [ ] ¿Tiene responsable? ← **OBLIGATORIO**
- [ ] ¿Tiene fecha límite?
- [ ] ¿Tablero/lista correcto?

---

## 🔄 MOVER TARJETAS

```bash
# Mover a otra lista
curl -X PUT "https://api.trello.com/1/cards/CARD_ID?idList=NEW_LIST_ID&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"

# Marcar completada
curl -X PUT "https://api.trello.com/1/cards/CARD_ID?dueComplete=true&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"
```

---

## 📎 ADJUNTAR ARCHIVOS

```bash
curl -X POST "https://api.trello.com/1/cards/CARD_ID/attachments" \
  -F "key=${TRELLO_API_KEY}" \
  -F "token=${TRELLO_TOKEN}" \
  -F "file=@/ruta/archivo.pdf"
```

---

*Skill versión: 1.2*
*Creada: 2026-02-17*
*Actualizada: 2026-02-17*
- v1.0: Creación inicial con regla de responsable obligatorio
- v1.1: Añadidas notificaciones diarias
- v1.2: Añadido Gastón, todos los contactos, regla 7 días, asignación automática MARKETING OPOSICIONES
