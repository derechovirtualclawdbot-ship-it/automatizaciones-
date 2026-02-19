---
name: portadas-cursos
description: "Genera portadas/cajas de producto 3D para cursos de Derecho Virtual y Prime Opositores. Estilo caja packaging con fondo blanco, título bold en dos colores, franja inferior de color con tagline, ilustración vectorial central, logo DV arriba. USAR cuando alguien pida 'portada de curso', 'imagen de curso', 'caja de curso'. Las 16 referencias están en ./referencias/."
triggers:
  - "portada de curso"
  - "imagen de curso"
  - "caja de curso"
  - "portada para el curso"
  - "portada videoleyes"
  - "diseño de curso"
  - "cover de curso"
  - "box del curso"
  - "crea la portada"
  - "hazme la portada"
auto_activate: true
priority: 3
config:
  image_generator: "Gemini Image 3 (gemini-2.0-flash-exp-image-generation)"
  api_key_env: "GEMINI_API_KEY"
  api_key_path: "~/.openclaw/credentials/.env.gemini"
  output: "telegram_only"
---

# Skill: Portadas de Cursos — Derecho Virtual

> ⚡ Activación automática cuando pidan una portada/imagen para un curso

---

## ⚠️ REGLA DE ENTREGA

**SIEMPRE enviar la imagen aquí (Telegram). NUNCA por WhatsApp.**

---

## 🎨 Estilo de Referencia

16 cajas de cursos reales en `./referencias/`. El estilo es **caja de producto 3D packaging**, perspectiva isométrica (cara frontal + lomo lateral izquierdo visible).

### Estructura visual:
```
┌────────────────────────────────────────┐
│  Logo DERECHO VIRTUAL (columna dorada) │
│                                        │
│  LÍNEA TÍTULO 1   ← negro, ultra-bold  │
│  LÍNEA TÍTULO 2   ← color acento, bold │
│                                        │
│      [ ilustración / personaje ]       │
│                                        │
│ ▓▓▓▓▓▓ Tagline en blanco ▓▓▓▓▓▓▓▓▓▓▓ │ ← franja color acento
└────────────────────────────────────────┘
+ lomo izquierdo con título vertical
```

---

## 🎨 Colores por Materia

| Materia | Color de acento |
|---------|----------------|
| Derecho Civil / Obligaciones / Contratos | Verde `#2e7d32` |
| Derecho Penal / Procesal Penal | Rojo `#d32f2f` |
| Derecho Constitucional / Historia | Dorado `#d4a017` |
| Derecho de Sociedades / Internacional | Verde oscuro `#1b5e20` |
| Derechos Reales | Dorado sobre fondo oscuro |
| Derecho del Trabajo | Púrpura `#7b1fa2` |
| Financiero / Tributario | Amarillo-verde `#c6b800` |
| Teoría / Deontología | Marrón `#795548` |
| Corporate Compliance | Rojo oscuro `#c62828` |
| Oposiciones (Prime Opositores) | Amarillo `#f9a825` |

---

## 🖼️ Generación — Pasos

### 1. Recopilar datos
- **Nombre del curso** (ej: "Derecho del Trabajo")
- **Tagline** (ej: "De becario a laboralista")
- **Ilustración** → qué debe aparecer (personaje, iconos, tipografía pura)

### 2. Construir el prompt

```
3D product box illustration, software packaging style, isometric perspective showing front face and left spine.

FRONT FACE:
- White background
- Top: "DERECHO VIRTUAL" text with golden Roman column icon, small and centered
- Title line 1: "[PALABRA1]" - ultra-bold black sans-serif, all caps, large
- Title line 2: "[PALABRA2]" - ultra-bold [COLOR_ACENTO], all caps, large
- Center: [DESCRIPCIÓN ILUSTRACIÓN] - flat vector cartoon style, NOT photorealistic
- Bottom stripe: solid [COLOR_ACENTO] band (~15% height), white sans-serif text "[TAGLINE]"

LEFT SPINE:
- [COLOR_ACENTO] background
- "DERECHO VIRTUAL" text rotated 90°, white, small logo
- Title text rotated 90°, white, bold

STYLE:
- Professional product mockup, clean and modern
- Vector/cartoon illustration (flat design), never photorealistic
- Subtle drop shadow on white background
- Portrait orientation 4:5

QUALITY: High quality product packaging design, premium educational brand
```

### 3. Llamada a la API

```bash
GEMINI_KEY=$(cat ~/.openclaw/credentials/.env.gemini | grep GEMINI_API_KEY | cut -d= -f2)

# Construir JSON del prompt (escapar comillas)
PROMPT="[PROMPT COMPLETO AQUÍ]"

curl -s --max-time 120 \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=$GEMINI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "'"$PROMPT"'"}]}],
    "generationConfig": {
      "responseModalities": ["image", "text"],
      "temperature": 1.0
    }
  }' > /tmp/portada_resp.json

# Extraer y guardar imagen
python3 -c "
import json, base64, sys
with open('/tmp/portada_resp.json') as f:
    r = json.load(f)
for part in r.get('candidates', [{}])[0].get('content', {}).get('parts', []):
    if 'inlineData' in part:
        data = part['inlineData']['data']
        with open('/tmp/portada_final.jpg', 'wb') as out:
            out.write(base64.b64decode(data))
        print('OK: /tmp/portada_final.jpg')
        sys.exit(0)
print('ERROR: no image in response')
print(json.dumps(r, indent=2)[:500])
"
```

### 4. Entregar al usuario

Enviar **aquí en Telegram** usando:
```
MEDIA:./portada_final.jpg
```
o vía `message tool` con `filePath=/tmp/portada_final.jpg`

---

## 📚 Referencias Disponibles

Abrir para comparar estilo antes de generar:

- `./referencias/01-teoria-del-derecho.jpg` — Marrón, personaje mujer
- `./referencias/03-civil-de-obligaciones.jpg` — Dorado, tipografía limpia
- `./referencias/04-contratos-mercantiles.jpg` — Verde, apretón de manos
- `./referencias/07-corporate-compliance.jpg` — Rojo, personaje masculino
- `./referencias/08-procesal-penal.jpg` — Rojo, iconos juzgado+rejas
- `./referencias/09-derecho-constitucional.jpg` — Dorado, solo tipografía elegante
- `./referencias/10-derecho-sociedades.jpg` — Verde, fondo verde completo
- `./referencias/11-derecho-del-trabajo.jpg` — Púrpura, grupo trabajadores
- `./referencias/14-derechos-reales.jpg` — Dorado oscuro, casa+manos
- `./referencias/16-penal-especial.jpg` — Rojo, ladrón cartoon + libros

*(Ver las 16 en la carpeta `./referencias/`)*

---

## ✅ Checklist Rápido

- [ ] Caja 3D con perspectiva (frontal + lomo)
- [ ] Logo DV arriba al centro
- [ ] Título en 2 colores (negro + acento)
- [ ] Franja inferior con tagline en blanco
- [ ] Ilustración vectorial (no fotorrealista)
- [ ] Color de acento correcto según materia
- [ ] Entregado por Telegram ✓

---

*Skill creada: 2026-02-19 | Basada en análisis de 16 cajas reales de Derecho Virtual*
