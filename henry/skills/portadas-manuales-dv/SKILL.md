---
name: portadas-manuales-dv
description: "Genera cajas de producto 3D estilo Videoleyes para cursos de Derecho Virtual. Fondo blanco, título bold en dos colores (negro + color de acento), franja inferior con tagline, ilustración central vectorial, logo DV arriba. SIEMPRE mandar aquí (Telegram), NUNCA por WhatsApp."
triggers:
  - "portada de manual"
  - "imagen promocional libro"
  - "miniatura curso"
  - "visual producto educativo"
  - "portada videoleyes"
  - "imagen libro derecho"
  - "portada curso"
  - "diseño manual DV"
  - "visual videoleyes"
  - "caja de curso"
  - "box de producto"
auto_activate: false
priority: 2
config:
  image_generator: "Gemini Image 3 (gemini-2.0-flash-exp-image-generation)"
  api_key_path: "~/.openclaw/credentials/.env.gemini"
  output_channel: "telegram_only"
---

# Skill: Portadas Manuales Derecho Virtual (Cajas 3D Videoleyes)

> Genera cajas de producto 3D estilo Videoleyes para cursos de Derecho Virtual y Prime Opositores

---

## ⚠️ REGLA DE ENTREGA CRÍTICA

**NUNCA enviar imágenes por WhatsApp.**
**SIEMPRE mandar las imágenes aquí (Telegram/chat actual).**

---

## 🎯 Descripción del Estilo Real

Las portadas de Derecho Virtual son **cajas de producto 3D** en perspectiva isométrica, estilo packaging de software/DVD premium. Basado en análisis de 16 cajas reales de los cursos:

### Estructura visual de la caja:
```
┌─────────────────────────────────┐
│  [LOMO: título vertical rotado] │  ← cara lateral izquierda
│  [logo DV pequeño arriba]       │
└─────────────────────────────────┘

┌─────────────────────────────────────────┐  ┐
│  [Logo DV + "DERECHO VIRTUAL" top]      │  │ CARA FRONTAL
│                                         │  │
│  TÍTULO PALABRA 1  (negro, bold)        │  │
│  TÍTULO PALABRA 2  (color de acento)    │  │
│                                         │  │
│  [Ilustración/personaje/icono central]  │  │
│                                         │  │
│ ─────────────────────────────────────  │  │ ← franja inferior
│  Tagline en blanco sobre color acento   │  │
└─────────────────────────────────────────┘  ┘
```

---

## 🎨 Sistema de Colores por Materia

Cada materia tiene su color de acento. Usar siempre el mismo para franja inferior + letras destacadas + lomo.

| Materia | Color Acento | Hex |
|---------|-------------|-----|
| Derecho Civil (obligaciones, contratos) | Verde | `#2e7d32` |
| Derecho Penal / Procesal Penal | Rojo vivo | `#d32f2f` |
| Derecho Constitucional | Dorado | `#d4a017` |
| Derecho de Sociedades | Verde oscuro | `#1b5e20` |
| Derecho Internacional Privado | Verde medio | `#388e3c` |
| Derechos Reales | Dorado/negro | `#d4a017` sobre fondo oscuro |
| Derecho del Trabajo | Púrpura | `#7b1fa2` |
| Derecho Financiero/Tributario | Amarillo-verde | `#c6b800` |
| Teoría del Derecho | Marrón/ocre | `#795548` |
| Deontología Jurídica | Marrón | `#5d4037` |
| Corporate Compliance | Rojo | `#c62828` |
| Oposiciones (Prime Opositores) | Amarillo | `#f9a825` |
| Historia del Derecho | Dorado | `#b8860b` |

---

## 📏 Especificaciones Técnicas

| Elemento | Especificación |
|----------|----------------|
| Forma | Caja 3D en perspectiva (cara frontal + lomo izquierdo visibles) |
| Fondo exterior | Blanco puro o sombra suave |
| Fondo cara frontal | Blanco (excepto Derechos Reales = dark charcoal) |
| Logo DV | Parte superior de la cara frontal (columna dorada + "DERECHO VIRTUAL") |
| Título | 2 líneas, todo mayúsculas, tipografía sans-serif ultra-bold |
| Línea 1 título | Negro o color oscuro |
| Línea 2 título | Color de acento (el llamativo) |
| Franja inferior | Barra del color de acento, ~15% del alto de la caja |
| Tagline | Texto blanco en la franja, sans-serif, frase corta descriptiva |
| Ilustración | Personaje cartoon/vector o iconos vectoriales centrados |
| Resolución | 800×1000px mínimo |

---

## 🎭 Tipos de Ilustración Central

Según el tipo de curso, usar uno de estos estilos:

**Tipo A – Personaje cartoon** (preferido para materias con personas):
- Abogado/a de dibujos animados con elementos del tema
- Expresión seria o determinada
- Vestimenta profesional
- Ejemplos: Teoría del Derecho (mujer abogada), Deontología (hombre con balanza), Agente Hacienda (hombre con calculadora)

**Tipo B – Iconos vectoriales planos**:
- 2-3 iconos representativos del tema
- Estilo outline o filled, monocromo o bicolor
- Ejemplos: Procesal Penal (juzgado + rejas), Derechos Reales (casa + apretón de manos), Internacional Privado (balanza + globo)

**Tipo C – Solo tipografía + acento** (para materias abstractas):
- El título domina el diseño
- Subtítulo o dato clave (ej: "De 0 a 169 artículos")
- Sin ilustración o muy sutil
- Ejemplos: Derecho Constitucional, Civil de Obligaciones

---

## 📝 Prompt Base para Gemini Image 3

```
3D product box illustration, software packaging style, perspective view showing front face and left spine.

BOX STYLE:
- Front face: white background
- Left spine: visible with [ACCENT COLOR] and vertical rotated title text
- Box has subtle shadow on white background
- Professional product mockup, clean and modern

LOGO (top of front face):
- "DERECHO VIRTUAL" text with golden Roman column icon above it
- Small, elegant, centered at top

TITLE (upper-center area of front face):
- Line 1: "[PALABRA 1]" - ultra-bold black sans-serif, large
- Line 2: "[PALABRA 2]" - ultra-bold [ACCENT COLOR] sans-serif, large
- All caps, tight letter spacing

ILLUSTRATION (center of front face):
- [DESCRIPCIÓN DE LA ILUSTRACIÓN]
- Clean vector/cartoon style, NOT photorealistic
- Flat illustration or simple character

BOTTOM STRIPE:
- Solid [ACCENT COLOR] band across bottom (~15% height)
- White text: "[TAGLINE]" - short, sans-serif

COLORS:
- Primary accent: [ACCENT COLOR HEX]
- Box front: white (#ffffff)
- Title contrast: black + accent color

OUTPUT:
- High quality product mockup
- Clean, professional, modern
- Similar to software box product photos
- Portrait orientation, 4:5 ratio
```

---

## 🚀 Proceso de Generación

### Paso 1: Recopilar datos del curso
```
Título del curso: [ej: "Derecho del Trabajo"]
Subtítulo/tagline: [ej: "De becario a laboralista"]
Materia → determinar color de acento
Tipo de ilustración: A (personaje), B (iconos), C (solo tipografía)
Descripción ilustración: [ej: "group of workers with hard hat and briefcase, cartoon style"]
```

### Paso 2: Generar imagen vía API Gemini

```bash
GEMINI_KEY=$(cat ~/.openclaw/credentials/.env.gemini | grep GEMINI_API_KEY | cut -d= -f2)

# Guardar prompt en variable
PROMPT="[PROMPT COMPLETO SEGÚN TEMPLATE]"

curl -s --max-time 120 \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=$GEMINI_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"contents\": [{\"parts\": [{\"text\": \"$PROMPT\"}]}],
    \"generationConfig\": {
      \"responseModalities\": [\"image\", \"text\"],
      \"temperature\": 1.0
    }
  }" > /tmp/portada_response.json

# Extraer imagen base64 y guardar
python3 -c "
import json, base64
with open('/tmp/portada_response.json') as f:
    r = json.load(f)
for part in r['candidates'][0]['content']['parts']:
    if 'inlineData' in part:
        data = part['inlineData']['data']
        with open('/tmp/portada_output.jpg', 'wb') as out:
            out.write(base64.b64decode(data))
        print('Imagen guardada: /tmp/portada_output.jpg')
        break
"
```

### Paso 3: Entregar vía Telegram (NUNCA WhatsApp)

```
# Usar message tool con filePath
# O responder directamente con MEDIA:/tmp/portada_output.jpg
```

---

## 📚 Referencia de Cajas Existentes

16 imágenes de referencia guardadas en `./referencias/`:

| Archivo | Curso | Acento | Ilustración |
|---------|-------|--------|-------------|
| `01-teoria-del-derecho.jpg` | Teoría del Derecho | Marrón | Mujer abogada + mazo |
| `02-curso-civil-dvd.jpg` | Curso de Civil | Gris/tan | Tienda + casa (DVD box) |
| `03-civil-de-obligaciones.jpg` | Civil de Obligaciones | Dorado | Limpia tipografía |
| `04-contratos-mercantiles.jpg` | Contratos Mercantiles | Verde | Apretón manos + mazo |
| `05-agente-de-hacienda.jpg` | Agente de Hacienda | Amarillo | Hombre Hacienda + calculadora |
| `06-deontologia-juridica.jpg` | Deontología Jurídica | Marrón | Abogado + check/X |
| `07-corporate-compliance.jpg` | Corporate Compliance | Rojo | Hombre + icono compliance |
| `08-procesal-penal.jpg` | Procesal Penal | Rojo | Juzgado + rejas |
| `09-derecho-constitucional.jpg` | Derecho Constitucional | Dorado | Solo tipografía elegante |
| `10-derecho-sociedades.jpg` | Derecho de Sociedades | Verde | Fondo verde + tipografía |
| `11-derecho-del-trabajo.jpg` | Derecho del Trabajo | Púrpura | Grupo trabajadores |
| `12-financiero-tributario.jpg` | Financiero y Tributario | Amarillo-verde | Hombre enfadado + impuestos |
| `13-internacional-privado.jpg` | Internacional Privado | Verde | Balanza + globo + siluetas |
| `14-derechos-reales.jpg` | Derechos Reales | Dorado/oscuro | Casa + apretón manos |
| `15-historia-derecho.jpg` | Historia del Derecho | Dorado | Balanza + pergamino + pluma |
| `16-penal-especial.jpg` | Penal Especial | Rojo | Ladrón cartoon + libros |

---

## ✅ Checklist de Calidad

Antes de entregar al usuario:
- [ ] ¿La caja tiene perspectiva 3D (cara frontal + lomo)?
- [ ] ¿El logo "DERECHO VIRTUAL" aparece en la parte superior?
- [ ] ¿El título está en dos colores (negro + color de acento)?
- [ ] ¿Hay franja de color en la parte inferior con tagline?
- [ ] ¿La ilustración es vectorial/cartoon (no fotorrealista)?
- [ ] ¿El fondo de la cara frontal es blanco?
- [ ] ¿El color de acento corresponde a la materia?
- [ ] ¿Se está enviando por Telegram (NO WhatsApp)?

---

## ⚠️ Errores Comunes

| Error | Solución |
|-------|----------|
| Enviar por WhatsApp | ❌ NUNCA. Siempre Telegram |
| Estilo fotorrealista | Añadir "flat vector/cartoon illustration style" |
| Sin perspectiva 3D | Especificar "3D product box, perspective view, left spine visible" |
| Colores incorrectos | Consultar tabla de colores por materia |
| Sin franja inferior | Añadir "solid color stripe at bottom with white tagline text" |
| Logo DV ausente | Especificar "DERECHO VIRTUAL logo with golden Roman column at top" |

---

## 📅 Historial de Versiones

- **v2.0** (Feb 2026): Reescrita completamente basada en análisis de 16 cajas reales. Eliminado estilo Pixar/verde oscuro incorrecto. Añadidas 16 imágenes de referencia. Regla: solo Telegram.
- **v1.2** (Feb 2026): Añadido índice y errores comunes
- **v1.0** (Feb 2026): Creación inicial

---

*Skill creada: 2026-02-03 | Última actualización: 2026-02-19*
*Basada en análisis visual de 16 cajas reales aprobadas por Carlos*
