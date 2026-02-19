---
name: n8n
description: "Integración completa con n8n para automatización de workflows. Incluye API REST, triggers (webhook, schedule, chat), nodos core (code, if, switch, merge), AI/LangChain (agents, LLMs, tools, memory, vector stores), y 30+ sub-skills documentadas. Autenticación via X-N8N-API-KEY."
triggers:
  - "n8n"
  - "workflow n8n"
  - "automatizar n8n"
  - "crear workflow"
  - "webhook n8n"
  - "agent n8n"
  - "langchain n8n"
auto_activate: false
priority: 2
config:
  api_url: "https://n8n.srv899180.hstgr.cloud"
  api_key_path: "/home/node/openclaw/.env.n8n"
  auth_header: "X-N8N-API-KEY"
---

# n8n Integration Skill

> Plataforma de automatización de workflows con soporte avanzado para AI/LangChain

## Overview
n8n es una plataforma de automatización de workflows con soporte avanzado para AI/LangChain. Esta skill documenta cómo interactuar con n8n via API REST, crear workflows, y usar todas sus capacidades.

## 📚 Sub-skills Disponibles

Ver [INDEX.md](INDEX.md) para lista completa de las 30 skills documentadas.

### Por Categoría
- **triggers/** - Webhook, Schedule, Chat, Error
- **core/** - Code, Set, If, Switch, Merge, Loop, HTTP Request
- **ai/** - Agent, LLM Models, Tools, Memory, Vector Stores, MCP
- **advanced/** - Subworkflows, Error Handling, Expressions, API, Wait
- **data/** - Transformations, JSON/XML, Binary Files
- **integrations/** - Google Sheets, Slack, Database, Email, Stripe

---

## 🔧 Configuración del Usuario

### Instancia n8n
- **URL pública**: `https://n8n.srv899180.hstgr.cloud`
- **URL interna**: `https://n8n.crivero.dev` (no accesible desde sandbox)

### Credenciales
- **API Key**: Guardada en `/home/node/openclaw/.env.n8n`
- **Header de autenticación**: `X-N8N-API-KEY` (NO Bearer auth)

---

## 🚀 Quick Start

### Autenticación API
```bash
# Cargar API key
export N8N_API_KEY=$(grep N8N_API_KEY /home/node/openclaw/.env.n8n | cut -d= -f2)

# Hacer petición
curl -s -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "https://n8n.srv899180.hstgr.cloud/api/v1/workflows"
```

### Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/workflows` | Listar workflows |
| GET | `/api/v1/workflows/{id}` | Obtener workflow |
| POST | `/api/v1/workflows` | Crear workflow |
| PUT | `/api/v1/workflows/{id}` | Actualizar workflow |
| DELETE | `/api/v1/workflows/{id}` | Eliminar workflow |
| POST | `/api/v1/workflows/{id}/activate` | Activar workflow |
| POST | `/api/v1/workflows/{id}/deactivate` | Desactivar workflow |
| GET | `/api/v1/executions` | Listar ejecuciones |

---

## 📝 Estructura de Workflow

### JSON Básico
```json
{
  "name": "Nombre del Workflow",
  "active": false,
  "nodes": [
    {
      "parameters": {},
      "id": "uuid-único",
      "name": "Nombre del Nodo",
      "type": "n8n-nodes-base.tipoNodo",
      "typeVersion": 1,
      "position": [x, y]
    }
  ],
  "connections": {
    "NombreNodoOrigen": {
      "main": [
        [{ "node": "NombreNodoDestino", "type": "main", "index": 0 }]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  }
}
```

### Tipos de Conexión
- `main` - Flujo principal de datos
- `ai_tool` - Herramienta para AI Agent
- `ai_languageModel` - Modelo de lenguaje
- `ai_memory` - Memoria de chat
- `ai_outputParser` - Parser de salida

---

## 🧠 Expresiones Cheatsheet

### Variables de Datos
```javascript
$json                        // Item actual
$json.campo                  // Campo específico
$json.nested?.field          // Campo anidado (safe)
$("Nodo").first().json       // Otro nodo
$input.all()                 // Todos los items
$binary.data                 // Datos binarios
```

### Variables de Workflow
```javascript
$workflow.id                 // ID del workflow
$workflow.name               // Nombre
$execution.id                // ID de ejecución
$execution.mode              // manual/webhook/trigger
$execution.resumeUrl         // URL para Wait node
$runIndex                    // Índice de run
$itemIndex                   // Índice de item
```

### DateTime
```javascript
$now                         // Momento actual
$now.toISO()                 // ISO string
$now.toFormat('yyyy-MM-dd')  // Formato custom
$now.plus({ days: 7 })       // Añadir tiempo
$today                       // Inicio del día
```

### Transformaciones
```javascript
// Strings
{{ $json.name.toUpperCase() }}
{{ $json.text.trim() }}
{{ $json.email.isEmail() }}

// Arrays
{{ $json.items.filter(i => i.active) }}
{{ $json.items.map(i => i.name) }}
{{ $json.items.reduce((s,i) => s + i.price, 0) }}

// Objetos
{{ Object.keys($json) }}
{{ { ...$json, newField: 'value' } }}
{{ JSON.stringify($json, null, 2) }}

// Condicionales
{{ $json.status === 'active' ? '✅' : '❌' }}
{{ $json.value ?? 'default' }}
```

---

## 🤖 AI/LangChain Quick Reference

### Estructura de AI Agent
```
Chat Trigger ──► AI Agent ◄── LLM Model
                    │
                    ├── Tool 1 (HTTP Request)
                    ├── Tool 2 (Code)
                    ├── Tool 3 (Workflow)
                    └── Memory (opcional)
```

### Tipos de Nodo AI
| Tipo | Package | Uso |
|------|---------|-----|
| Agent | `@n8n/n8n-nodes-langchain.agent` | Orquestador principal |
| Chat Trigger | `@n8n/n8n-nodes-langchain.chatTrigger` | Entrada de chat |
| OpenAI | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | Modelo GPT |
| Anthropic | `@n8n/n8n-nodes-langchain.lmChatAnthropic` | Modelo Claude |
| Memory | `@n8n/n8n-nodes-langchain.memoryBufferWindow` | Contexto de chat |
| Vector Store | `@n8n/n8n-nodes-langchain.vectorStorePinecone` | RAG |
| MCP Trigger | `@n8n/n8n-nodes-langchain.mcpTrigger` | MCP Server |

### $fromAI() para Tools
```javascript
// En HTTP Request Tool
{{ $fromAI('searchQuery', 'The search term to look for') }}
```

---

## 📊 Workflows del Usuario

### Consultar todos los workflows activos
```bash
export N8N_API_KEY=$(grep N8N_API_KEY /home/node/openclaw/.env.n8n | cut -d= -f2)
curl -s -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "https://n8n.srv899180.hstgr.cloud/api/v1/workflows?active=true" | \
  python3 -c "import json,sys; d=json.load(sys.stdin); [print(f'{w[\"id\"]} → {w[\"name\"]}') for w in d.get('data',[])]"
```

### Workflows Conocidos
| Nombre | ID | Tipo | Estado |
|--------|-----|------|--------|
| Pagos Teachable | `vEV6bHqSQ0CC86k0` | Webhook | Activo |
| Membresía Derecho Virtual | `w5AWCuSYyR64ux18` | Gestión | Activo |
| Atención Cliente Bot | `u0nSdMiTALYoJICC` | AI Bot | Activo |
| Packleyes Autoenrolar | `yefumRY4cNgHBcb5` | Auto-inscripción | Activo |

### MCP Servers Configurados
| Nombre | ID | Webhook Path |
|--------|-----|------|
| MCP Calendly | `wVMchXwQvGvBmUab` | `6d2e5905-606c-495d-bae3-c137563c65c2` |

### Endpoints útiles de gestión
```bash
# Ver últimas ejecuciones de un workflow
curl -s -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "https://n8n.srv899180.hstgr.cloud/api/v1/executions?workflowId=WORKFLOW_ID&limit=5"

# Activar/desactivar workflow
curl -s -X POST -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "https://n8n.srv899180.hstgr.cloud/api/v1/workflows/WORKFLOW_ID/activate"

# Obtener detalle de workflow (JSON completo)
curl -s -H "X-N8N-API-KEY: $N8N_API_KEY" \
  "https://n8n.srv899180.hstgr.cloud/api/v1/workflows/WORKFLOW_ID" | python3 -m json.tool
```

---

## ⚠️ Errores Comunes

### API
| Error | Causa | Solución |
|-------|-------|----------|
| 401 | API Key inválida | Verificar key |
| 403 | Sin permisos | Verificar permisos |
| 404 | No encontrado | Verificar ID |
| 422 | Datos inválidos | Verificar JSON |

### Workflows
| Error | Causa | Solución |
|-------|-------|----------|
| Connection error | Nodo no conectado | Verificar connections |
| Undefined | Campo no existe | Usar `?.` o `??` |
| Timeout | Operación larga | Aumentar timeout |
| Memory | Datos muy grandes | Procesar en batches |

---

## 🆕 Novedades 2025 (v2.x)

### Cambios Importantes
- **Native Python** reemplaza Pyodide (breaking change)
- **Tools Agent** es el único tipo de agent
- **MCP Client Tool** como sub-node
- **Data Tables** mejoradas

### Nuevas Features
- Streaming mejorado para Chat Hub
- Rate limiting en MCP OAuth endpoints
- Soporte Gemini 3 en Vertex AI
- Workflow demo diff view
- Custom scopes para MS integrations

---

## 📖 Documentación Completa

Para documentación detallada de cada nodo, consulta las sub-skills en las carpetas:
- [triggers/](triggers/) - Nodos de trigger
- [core/](core/) - Nodos core
- [ai/](ai/) - Nodos AI/LangChain
- [advanced/](advanced/) - Conceptos avanzados
- [data/](data/) - Procesamiento de datos
- [integrations/](integrations/) - Integraciones populares

Ver [INDEX.md](INDEX.md) para índice completo.

---

*Última actualización: Febrero 2026 | n8n v2.x*
