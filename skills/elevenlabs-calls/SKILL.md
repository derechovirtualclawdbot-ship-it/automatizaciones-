---
name: elevenlabs-calls
description: "Llamadas telefónicas automatizadas con IA conversacional. ElevenLabs Conversational AI + Twilio. Números: España (+34 881 199 991) y USA (+1 316 348 4002). Agentes: Carlos Rivero, Confirmación Citas, Laura. Ejemplos: preguntar algo, confirmar citas, recordatorios. Incluye obtención de transcripciones post-llamada."
triggers:
  - "llamar"
  - "llama"
  - "llamada"
  - "teléfono"
  - "telefónica"
  - "phone call"
  - "contactar por teléfono"
  - "llamada automática"
  - "agente telefónico"
  - "llamar a"
  - "haz una llamada"
auto_activate: false
priority: 2
config:
  api_key_path: "/home/node/openclaw/.env.elevenlabs"
  phone_spain: "+34 881 199 991"
  phone_usa: "+1 316 348 4002"
  default_agent: "agent_7201k9yzbgbgepesy66s2emcw0y5"
---

# 📞 Skill: Llamadas Telefónicas con ElevenLabs

> Hacer llamadas telefónicas automatizadas usando ElevenLabs Conversational AI + Twilio

---

## 🎯 Descripción

Llamadas telefónicas automatizadas con IA conversacional. ElevenLabs Conversational AI + Twilio para outbound calls. Números configurados: España (+34 881 199 991) y USA (+1 316 348 4002). Agentes personalizables con prompts dinámicos.

**Cuándo usar:** Necesitas que el agente haga una llamada telefónica para preguntar algo, confirmar citas, o dar recordatorios.

**Ejemplos:**
- "Llama a Gonzalo y pregúntale qué va a hacer esta tarde"
- "Haz una llamada a +34 XXX para confirmar la cita de mañana"
- "Llama a María para recordarle la reunión de las 17:00"

---

## ⚡ USO RÁPIDO

```bash
# Llamada simple con mensaje personalizado
curl -s "https://api.elevenlabs.io/v1/convai/twilio/outbound_call" \
  -X POST \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "AGENT_ID",
    "agent_phone_number_id": "PHONE_NUMBER_ID",
    "to_number": "+34XXXXXXXXX",
    "conversation_initiation_client_data": {
      "conversation_config_override": {
        "agent": {
          "prompt": {
            "prompt": "Tu objetivo es [INSTRUCCIONES]. Sé breve y amable."
          },
          "first_message": "[MENSAJE INICIAL QUE DIRÁ AL CONTESTAR]"
        }
      }
    }
  }'
```

---

## 📱 NÚMEROS DE TELÉFONO DISPONIBLES

| Número | País | ID | Agente Asignado |
|--------|------|-----|-----------------|
| +34 881 199 991 | 🇪🇸 España | `phnum_5601k24m7agpfs6txmdhfjqda763` | AGENTE DE CITAS |
| +1 316 348 4002 | 🇺🇸 USA | `phnum_01k03wkpy8e6gb8h1qx53t0jjw` | AGENTE DE CITAS |

**Usar el número español para llamadas a España.**

---

## 🤖 AGENTES DISPONIBLES

### Principales
| Nombre | Agent ID | Uso |
|--------|----------|-----|
| **ABOGADO CARLOS RIVERO** | `agent_7201k9yzbgbgepesy66s2emcw0y5` | General, llamadas personales |
| **AGENTE DE CITAS** | `agent_01jwgan1qmfm2v0xcn2mpg09m7` | Confirmación de citas |
| **Laura - Confirmacion Citas** | `agent_0301kgdbxv1ffynbeqjn2ra36yq0` | Citas Calendly |

### Agentes LYRA (educativos)
Ver lista completa en la API: `GET /v1/convai/agents`

---

## 🔧 PROCESO COMPLETO

### Paso 1: Hacer la llamada

```python
import requests
import os

ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY') or 'sk_...'

def hacer_llamada(telefono, nombre_contacto, mensaje_inicial, instrucciones):
    """
    Hace una llamada telefónica con ElevenLabs.
    
    Args:
        telefono: Número en formato internacional (+34XXXXXXXXX)
        nombre_contacto: Nombre de la persona (para referencia)
        mensaje_inicial: Lo primero que dirá el agente al contestar
        instrucciones: El prompt/objetivo de la llamada
    
    Returns:
        dict con conversation_id y callSid
    """
    response = requests.post(
        "https://api.elevenlabs.io/v1/convai/twilio/outbound_call",
        headers={
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
        },
        json={
            "agent_id": "agent_7201k9yzbgbgepesy66s2emcw0y5",  # ABOGADO CARLOS RIVERO
            "agent_phone_number_id": "phnum_5601k24m7agpfs6txmdhfjqda763",  # España
            "to_number": telefono,
            "conversation_initiation_client_data": {
                "conversation_config_override": {
                    "agent": {
                        "prompt": {
                            "prompt": instrucciones
                        },
                        "first_message": mensaje_inicial
                    }
                },
                "dynamic_variables": {
                    "nombre_contacto": nombre_contacto
                }
            }
        }
    )
    return response.json()
```

### Paso 2: Obtener transcripción

```python
def obtener_transcripcion(conversation_id):
    """Obtiene la transcripción de una llamada completada."""
    response = requests.get(
        f"https://api.elevenlabs.io/v1/convai/conversations/{conversation_id}",
        headers={"xi-api-key": ELEVENLABS_API_KEY}
    )
    data = response.json()
    
    resultado = {
        "estado": data.get("status"),
        "duracion": data.get("metadata", {}).get("call_duration_secs"),
        "transcripcion": [],
        "resumen": data.get("analysis", {}).get("transcript_summary")
    }
    
    for msg in data.get("transcript", []):
        resultado["transcripcion"].append({
            "rol": msg.get("role"),
            "mensaje": msg.get("message")
        })
    
    return resultado
```

---

## 📋 EJEMPLOS DE USO

### Llamada simple - Preguntar algo
```json
{
  "mensaje_inicial": "¡Hola Gonzalo! Soy el asistente de Carlos. Te llamo porque Carlos quiere saber qué vas a hacer esta tarde. ¿Tienes algún plan?",
  "instrucciones": "Eres el asistente de Carlos Rivero. Tu ÚNICO objetivo es preguntar a Gonzalo qué va a hacer esta tarde. Sé amable, breve y directo. Una vez que te responda, despídete cordialmente."
}
```

### Llamada de confirmación
```json
{
  "mensaje_inicial": "¡Hola! Soy el asistente de Derecho Virtual. Te llamo para confirmar tu cita de mañana a las 10:00. ¿Podrás asistir?",
  "instrucciones": "Eres un asistente de confirmación de citas. Confirma la cita, si dice que no puede pregunta si quiere reprogramar. Sé breve y profesional."
}
```

### Llamada de recordatorio
```json
{
  "mensaje_inicial": "¡Hola! Soy el asistente de Carlos. Te llamo para recordarte la reunión de esta tarde a las 17:00. ¡No lo olvides!",
  "instrucciones": "Eres un asistente de recordatorios. Tu objetivo es recordar la reunión y confirmar que la persona lo ha entendido. Despídete amablemente."
}
```

---

## ⚠️ CONSIDERACIONES

### Errores comunes
| Estado | Significado | Solución |
|--------|-------------|----------|
| `failed` | No contestó/rechazó | Reintentar más tarde o avisar por WhatsApp primero |
| `done` + transcripción vacía | Buzón de voz | El agente habló con el buzón |
| Duración < 5s | Colgó inmediatamente | El contacto no reconoció el número |

### Best Practices
1. **Avisar antes** si es posible (WhatsApp/SMS diciendo "te va a llamar Carlos")
2. **Usar el número español** para llamadas a España (mejor identificación)
3. **Mensaje inicial claro** - Identificarse inmediatamente
4. **Instrucciones específicas** - Un solo objetivo por llamada
5. **Esperar 30-60s** antes de consultar la transcripción

### Horarios recomendados
- ✅ 9:00 - 14:00 (mañana laboral)
- ✅ 16:00 - 20:00 (tarde laboral)
- ❌ Antes de 9:00 o después de 21:00

---

## 🔑 CREDENCIALES

```bash
# Archivo: /home/node/openclaw/.env.elevenlabs
ELEVENLABS_API_KEY=sk_2d1de55c3751ebaceedfa02eb721c82be0529ff89d59ec5e
CARLOS_VOICE_ID=SL225ROFroVZtyvlzjQI
```

---

## 📊 API Reference

### Endpoints principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/v1/convai/twilio/outbound_call` | Iniciar llamada saliente |
| GET | `/v1/convai/conversations/{id}` | Obtener detalles/transcripción |
| GET | `/v1/convai/phone-numbers` | Listar números disponibles |
| GET | `/v1/convai/agents` | Listar agentes |

### Estructura de respuesta de llamada
```json
{
  "success": true,
  "message": "Success",
  "conversation_id": "conv_XXXX",
  "callSid": "CAXXXX"
}
```

---

## 📁 Archivos relacionados

- `/home/node/openclaw/skills/elevenlabs/SKILL.md` - TTS (texto a voz)
- `/home/node/openclaw/skills/n8n/workflows/laura-confirmacion-citas.md` - Workflow automatizado
- `/home/node/openclaw/.env.elevenlabs` - Credenciales

---

## ✅ Checklist Pre-Llamada

- [ ] ¿El número tiene formato internacional (+34XXXXXXXXX)?
- [ ] ¿El mensaje inicial identifica claramente quién llama?
- [ ] ¿Las instrucciones tienen UN solo objetivo claro?
- [ ] ¿Es horario laboral (9:00-14:00 o 16:00-20:00)?
- [ ] ¿Se ha avisado al contacto previamente (opcional pero recomendado)?

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.1
- **Cambios**: Rutas actualizadas, añadido checklist pre-llamada
