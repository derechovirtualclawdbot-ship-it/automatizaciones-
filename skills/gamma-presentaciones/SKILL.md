---
name: gamma-presentaciones
description: "Genera documentos A4 profesionales para oposiciones con Gamma.app API. Incluye: reglas de formato basadas en análisis de 100+ páginas reales, límites de densidad (1000-1200 chars/pág), plantillas de contenido, vocabulario obligatorio (SIEMPRE/NUNCA/TRAMPA), preguntas tipo examen, trucos de memoria. ~6,700 créditos disponibles."
triggers:
  - "documentos Gamma"
  - "PDF oposiciones"
  - "esquemas de estudio"
  - "material A4"
  - "gamma.app"
  - "crear documento oposición"
  - "esquema Prime Opositores"
  - "generar PDF estudio"
auto_activate: false
priority: 2
config:
  api_url: "https://public-api.gamma.app/v1.0"
  credits_available: 6700
dependencies:
  - "gamma-client.js (cliente JavaScript incluido)"
---

# Skill: Gamma Documentos A4 - Derecho Virtual

> Genera documentos A4 profesionales para oposiciones con Gamma.app

---

## 📑 ÍNDICE RÁPIDO

| Documento | Contenido | Cuándo usar |
|-----------|-----------|-------------|
| **Este archivo (SKILL.md)** | Guía principal, reglas, checklist | Siempre empezar aquí |
| [ERRORES-FRECUENTES.md](./ERRORES-FRECUENTES.md) | 20+ errores a evitar | Antes de generar |
| [SOLUCION-PAGINAS-VACIAS.md](./SOLUCION-PAGINAS-VACIAS.md) | Cómo evitar huecos | Si hay páginas vacías |
| [CONFIGURACION-OPTIMA-A4.md](./CONFIGURACION-OPTIMA-A4.md) | Parámetros API | Configurar generación |
| [TEMPLATES-CONTENIDO.md](./TEMPLATES-CONTENIDO.md) | 5 plantillas listas | Crear contenido nuevo |
| [VOCABULARIO-OPOSICIONES.md](./VOCABULARIO-OPOSICIONES.md) | Palabras clave, plazos | Redactar contenido |
| [TRUCOS-MEMORIA-OPOSICIONES.md](./TRUCOS-MEMORIA-OPOSICIONES.md) | Acrónimos, mnemotecnia | Añadir trucos |
| [ARTICULOS-MAS-PREGUNTADOS.md](./ARTICULOS-MAS-PREGUNTADOS.md) | Top artículos + trampas | Priorizar contenido |
| [TEMAS-34-35-ANALISIS.md](./TEMAS-34-35-ANALISIS.md) | Análisis LEC ejecución | Referencia técnica |
| [API.md](./API.md) | Documentación Gamma API | Desarrollo técnico |
| [ejemplos/](./ejemplos/) | 3 modelos de contenido | Copiar y adaptar |

---

## 🎯 Activación

Cuando el usuario pida: documentos Gamma, PDF oposiciones, esquemas de estudio, material A4

---

## ✅ Estado: FUNCIONAL

```
API: https://public-api.gamma.app/v1.0
Créditos: ~6,700 disponibles
```

---

# 📏 REGLAS DE FORMATO - ANÁLISIS DE DOCUMENTOS DE REFERENCIA

## 📊 Estadísticas Reales (Tema 34: 43 págs, Tema 35: 56 págs)

### Frecuencia de elementos por documento:

| Elemento | Tema 34 | Tema 35 | Promedio/página |
|----------|---------|---------|-----------------|
| "Grado de importancia" | 29 | 46 | ~0.75/pág |
| "En el examen te preguntarán" | 20 | 22 | ~0.4/pág |
| "Puntos clave" | 35 | 48 | ~0.8/pág |
| Artículos literales | 16 | 21 | ~0.4/pág |
| Menciones "trampa" | 66 | 24 | ~0.9/pág |
| Items listas numeradas | 138 | 145 | ~2.8/pág |
| Referencias a artículos | 63 | 61 | ~1.2/pág |
| Palabra "siempre" | 28 | 24 | ~0.5/pág |
| Palabra "nunca" | 7 | - | - |
| Palabra "clave" | 39 | 52 | ~0.9/pág |
| Menciones plazos | 39 | 6 | variable |

### Densidad de caracteres:

| Métrica | Valor |
|---------|-------|
| Mínimo/página (sin portada) | ~700 caracteres |
| Promedio/página | 1500-2000 caracteres |
| Máximo/página | ~2700 caracteres |
| Líneas promedio | 20-50 líneas |

---

## 📐 REGLAS DE DISTRIBUCIÓN DE CONTENIDO

### Regla 1: La distribución es FLEXIBLE
- ❌ NO es obligatorio "1 artículo = 1 página"
- ✅ Un artículo extenso puede ocupar 2-3 páginas
- ✅ Una página puede contener 2-3 artículos cortos
- ✅ La distribución depende del contenido real

### Regla 2: Página 1 es DIFERENTE
- La portada/primera página solo tiene título y subtemas
- Es ACEPTABLE que sea más ligera (~200 caracteres)
- Las demás páginas deben estar llenas

### Regla 3: Balance densidad vs legibilidad
- Cada página (excepto la 1) debe tener **1000-1200 caracteres** (no más)
- Con >1800 chars/página la tipografía queda ILEGIBLE
- NO dejar más del 30% de espacio en blanco
- Si hay poco contenido, COMBINAR; si hay mucho, DISTRIBUIR en más páginas

### Regla 4: LÍMITES POR ELEMENTO (para legibilidad)

| Elemento | Máximo por página | Si hay más → |
|----------|-------------------|--------------|
| Tablas | 1 tabla (5-6 filas) | Nueva página |
| Preguntas examen | 2 preguntas | Nueva página |
| Apartados de artículo | 1-2 apartados | Nueva página |
| Puntos clave | 4-5 puntos | Nueva página |
| Trucos memoria | 1 truco (GRANDE) | Nueva página |

### Regla 5: Artículos según complejidad

| Tipo de artículo | Páginas recomendadas |
|------------------|---------------------|
| Simple (1 apartado, <200 chars) | 1 página |
| Medio (2 apartados) | 1-2 páginas |
| Extenso (3+ apartados, como Art. 9 CE) | **2-3 páginas** |
| Muy extenso (Art. 24 CE, derechos) | 3-4 páginas |

**Ejemplo Art. 9 CE (3 apartados):**
- Página 1: Texto literal + Análisis Art. 9.1
- Página 2: Análisis Art. 9.2 + 9.3 + Tabla principios
- Página 3: Trucos de memoria + Preguntas examen

### Regla 6: IMÁGENES (mínimo 1 cada 2 páginas)

| Frecuencia | Detalle |
|------------|---------|
| **Mínimo** | 1 imagen cada 2 páginas |
| Tipo | Ilustraciones profesionales, iconos legales |
| Estilo | Minimalista, colores azul/dorado |
| Tamaño | Mediano (no ocupar más del 25% de página) |

**Cuándo incluir imagen:**
- Inicio de nuevo artículo/tema
- Conceptos abstractos que se benefician de visual
- Separación entre bloques de contenido denso

**Estilo recomendado:**
- Balanza de justicia, libros legales, columnas griegas
- Iconos de leyes, martillo de juez
- Ilustraciones conceptuales (no fotos reales)

### Regla 4: Consistencia de elementos
- Cada sección DEBE tener "Grado de importancia"
- Incluir "En el examen te preguntarán" cada 2-3 secciones
- "Puntos clave" en casi todas las secciones (~0.8/página)

---

## 📝 ESTRUCTURA OBLIGATORIA POR SECCIÓN

```markdown
[ICONO] Título de la sección

**Grado de importancia: [ALTÍSIMO/ALTO/MEDIO/BAJO]**

## Texto literal:
"Artículo XXX. [TEXTO COMPLETO de la ley entre comillas]"

## Análisis detallado:
[Explicación extensa de 150-300 palabras]

## Cuadro comparativo (cuando aplique):
| Concepto A | Concepto B |
|------------|------------|
| [Detalle]  | [Detalle]  |

## Puntos clave:
📌 **[Punto 1]**: [Explicación de 1-2 líneas]
📌 **[Punto 2]**: [Explicación de 1-2 líneas]
📌 **[Punto 3]**: [Explicación]

## ⚠️ En el examen te preguntarán:
⚠️ **Pregunta tipo**: "[Texto de la pregunta]"
- Opciones trampa: [Lista de errores comunes]
- **Respuesta correcta**: [Con explicación]

## 💡 Truco de memoria:
[Regla mnemotécnica o acrónimo]

## Relación con otros artículos:
- Art. X: [Conexión]
- Art. Y: [Conexión]
```

---

## 🔤 VOCABULARIO OBLIGATORIO A INCLUIR

### Palabras de énfasis (usar frecuentemente):
- "SIEMPRE" - para reglas absolutas
- "NUNCA" - para prohibiciones absolutas
- "CLAVE" - para conceptos fundamentales
- "OJO" - para advertencias
- "TRAMPA" - para errores comunes de examen
- "EXCEPCIÓN" - para casos especiales

### Frases de examen:
- "En el examen te preguntarán..."
- "Trampa que te puedes encontrar..."
- "La respuesta correcta es..."
- "Las opciones trampa suelen ser..."
- "Recuerda que SIEMPRE/NUNCA..."

### Niveles de importancia:
- **ALTÍSIMO**: Pregunta casi segura en examen
- **ALTO**: Pregunta frecuente
- **MEDIO**: Puede caer ocasionalmente
- **BAJO**: Poco frecuente pero posible

---

## 📋 ELEMENTOS QUE LLENAN PÁGINAS

### 1. Tablas comparativas (muy efectivas):
```markdown
| Aspecto | Opción A | Opción B |
|---------|----------|----------|
| Plazo   | 10 días  | 20 días  |
| Quién   | Juez     | LAJ      |
| Efecto  | Suspende | No suspende |
```

### 2. Listas numeradas extensas:
```markdown
Los requisitos son (memorizar en orden):
1. **Primer requisito**: [Explicación]
2. **Segundo requisito**: [Explicación]
3. **Tercer requisito**: [Explicación]
```

### 3. Cuadros de "Puntos clave":
```markdown
## Puntos clave:
📌 **Concepto 1**: Explicación detallada de este punto
📌 **Concepto 2**: Otra explicación importante
📌 **Concepto 3**: Más detalles relevantes
```

### 4. Secciones de preguntas de examen:
```markdown
## ⚠️ En el examen te preguntarán:

⚠️ **"¿Cuál es el plazo para...?"**
- Trampa: Confundir días hábiles con naturales
- Respuesta: X días HÁBILES (no naturales)

⚠️ **"¿Quién es competente para...?"**
- Trampa: Confundir Juez con LAJ
- Respuesta: El LAJ (no el Juez)
```

### 5. Excepciones y matices:
```markdown
## Excepciones importantes:
❗ **Excepción 1**: Cuando ocurre X, entonces Y
❗ **Excepción 2**: En caso de Z, aplica W
```

---

## ⚙️ PARÁMETROS API

```javascript
{
  inputText: contenido,           // Markdown estructurado
  textMode: 'preserve',           // Mantener texto exacto
  format: 'document',             // OBLIGATORIO para A4
  cardSplit: 'inputTextBreaks',   // Respetar ---
  exportAs: 'pdf',                // Generar PDF
  
  additionalInstructions: `
    FORMATO A4 LEGIBLE PARA OPOSICIONES ESPAÑOLAS:
    - Contenido sustancial (1000-1500 chars/página)
    - SIN espacios en blanco grandes
    - Tipografía LEGIBLE: MÍNIMO 13pt cuerpo, 18pt títulos
    - Cuadros con bordes y fondos de color
    - TODO en español
    - Colores: azul oscuro y dorado
    - PRIORIDAD: Que se pueda LEER cómodamente
  `,
  
  cardOptions: {
    dimensions: 'a4'
  },
  
  imageOptions: {
    source: 'aiGenerated',        // Imágenes IA (mínimo 1 cada 2 páginas)
    model: 'imagen-4-pro',
    style: 'ilustración profesional minimalista, derecho español, balanza justicia, libros legales, colores azul oscuro y dorado'
  },
  
  textOptions: {
    language: 'es'
  }
}
```

---

## 🚨 ERRORES CRÍTICOS A EVITAR

### Error 1: Páginas semi-vacías
```
❌ MALO:
Artículo 11
Ningún español de origen podrá ser privado de su nacionalidad
[ENORME ESPACIO EN BLANCO]
```
**Solución**: Añadir más contenido o combinar con siguiente sección

### Error 2: Contenido demasiado resumido
```
❌ MALO:
Puntos clave:
- Punto 1
- Punto 2
```
**Solución**: Explicar cada punto en 1-2 líneas

### Error 3: Sin elementos de examen
```
❌ MALO: Sección sin "En el examen te preguntarán"
```
**Solución**: Incluir al menos 1 pregunta tipo cada 2-3 secciones

### Error 4: Falta "Grado de importancia"
```
❌ MALO: Sección sin indicar importancia
```
**Solución**: SIEMPRE incluir al inicio de cada sección

### Error 5: Artículo literal incompleto
```
❌ MALO: Resumir el artículo
```
**Solución**: Copiar el texto COMPLETO de la ley

---

## 📁 ARCHIVOS DE REFERENCIA

```
skills/gamma-presentaciones/
├── SKILL.md                    # Este archivo (guía principal)
├── ERRORES-FRECUENTES.md       # Catálogo de 20+ errores a evitar
├── SOLUCION-PAGINAS-VACIAS.md  # Guía específica para el problema de huecos
├── CONFIGURACION-OPTIMA-A4.md  # Parámetros API probados y recomendados
├── TEMAS-34-35-ANALISIS.md     # Análisis detallado LEC ejecución
├── VOCABULARIO-OPOSICIONES.md  # Palabras clave y frases obligatorias
├── API.md                      # Documentación de la API de Gamma
├── INVESTIGACION-A4.md         # Notas de investigación
├── gamma-client.js             # Cliente JavaScript para la API
└── ejemplos/                   # Ejemplos de contenido denso
    ├── README.md               # Índice de ejemplos
    ├── ejemplo-art517-lec.md   # Títulos ejecutivos (~4500 chars)
    ├── ejemplo-art592-lec.md   # Orden de embargo (~5800 chars)
    └── ejemplo-art605-606.md   # Bienes inembargables (~6500 chars)

referencia-esquemas/
├── referencia1.pdf    # Tema 35 - Ejecución Dineraria (56 págs, 4454 KB)
├── referencia2.pdf    # Tema 34 - Ejecución Forzosa (43 págs, 3975 KB)
└── imagenes/          # Capturas de Instagram @primeopositores

contenido-ce-1-10-denso.md  # Ejemplo de contenido bien estructurado (25KB)
```

### 📚 DOCUMENTOS COMPLEMENTARIOS:

1. **ERRORES-FRECUENTES.md**: Catálogo exhaustivo de 20+ errores clasificados por:
   - Formato visual
   - Contenido
   - Estructura
   - Densidad
   - Vocabulario
   - Distribución

2. **TEMAS-34-35-ANALISIS.md**: Análisis completo incluyendo:
   - Artículos literales de la LEC (517-680)
   - Puntos clave de ejecución forzosa
   - Trampas de examen documentadas
   - Tablas comparativas
   - Trucos de memoria

---

## 📊 CHECKLIST ANTES DE GENERAR

### Contenido
- [ ] ¿Cada sección tiene "Grado de importancia"?
- [ ] ¿Artículos literales COMPLETOS entre comillas?
- [ ] ¿Hay "Puntos clave" con explicaciones extensas?
- [ ] ¿Incluye "En el examen te preguntarán" cada 2-3 secciones?
- [ ] ¿Menciona trampas comunes de examen?
- [ ] ¿Usa palabras clave: SIEMPRE, NUNCA, CLAVE, OJO?

### ⚠️ LÍMITES DE LEGIBILIDAD (CRÍTICO)
- [ ] ¿Contenido de **1000-1200 caracteres** por página? (NO más)
- [ ] ¿Máximo **1 tabla** (5-6 filas) por página?
- [ ] ¿Máximo **2 preguntas de examen** por página?
- [ ] ¿Artículos extensos (3+ apartados) en **2-3 páginas**?
- [ ] ¿Trucos de memoria con texto GRANDE y destacado?
- [ ] ¿Sin huecos ni espacios en blanco grandes?

### 🖼️ IMÁGENES
- [ ] ¿Mínimo **1 imagen cada 2 páginas**?
- [ ] ¿Estilo profesional/minimalista (no fotos reales)?
- [ ] ¿Imágenes no ocupan más del 25% de página?

---

## 🎯 PLANTILLAS GUARDADAS POR CARLOS

Carlos tiene plantillas guardadas en Gamma que sirven como modelo.
Para usarlas: Create from Template API con el gammaId correspondiente.

---

## 📖 LEYES PRINCIPALES PARA OPOSICIONES DE JUSTICIA

### Referencias legales más frecuentes:

| Ley | Abreviatura | Temas típicos |
|-----|-------------|---------------|
| Ley de Enjuiciamiento Civil | LEC | Procedimientos, ejecución, recursos |
| Ley de Enjuiciamiento Criminal | LECrim | Proceso penal |
| Ley Orgánica del Poder Judicial | LOPJ | Organización judicial |
| Constitución Española | CE | Derechos fundamentales |
| Ley 39/2015 | LPAC | Procedimiento administrativo |
| Ley 40/2015 | LRJSP | Régimen jurídico sector público |
| TREBEP | RDL 5/2015 | Empleados públicos |

### Artículos más preguntados por ley:

**LEC (Ejecución):**
- Art. 517: Títulos ejecutivos (ALTÍSIMO)
- Art. 538: Despacho ejecución (ALTÍSIMO)
- Art. 556-557: Oposición (ALTÍSIMO)
- Art. 592: Orden de embargo (ALTÍSIMO)
- Art. 605-606: Bienes inembargables (ALTÍSIMO)

**Constitución Española:**
- Art. 1: Estado social y democrático (ALTO)
- Art. 14: Igualdad (ALTÍSIMO)
- Art. 15-29: Derechos fundamentales (ALTÍSIMO)
- Art. 117-127: Poder Judicial (ALTÍSIMO)

---

## 🎨 ICONOS RECOMENDADOS POR SECCIÓN

| Tipo de sección | Icono |
|-----------------|-------|
| Artículo de ley | 📜 |
| Definición | 📖 |
| Plazo | ⏱️ |
| Competencia | 🏛️ |
| Procedimiento | 📋 |
| Recurso | ⚖️ |
| Trampa de examen | ⚠️ |
| Puntos clave | 📌 |
| Truco memoria | 💡 |
| Excepción | ❗ |
| Tabla comparativa | 📊 |
| Importante | 🔴 |

---

## 🧠 TÉCNICAS DE MEMORIZACIÓN (Instagram @primeopositores)

### Técnica 1: Anclajes numéricos
Relaciona el número del artículo con algo conocido:
- Art. 14 → 14 de febrero → IGUALDAD (todos iguales ante el amor)
- Art. 21 → Siglo 21 → REUNIÓN (nos reunimos online)

### Técnica 2: Estructura antes que contenido
1. Cuántos apartados tiene el artículo
2. Cómo empieza cada apartado
3. El orden lógico interno

### Técnica 3: Conectores obligatorios
Palabras que NO se pueden cambiar en artículos literales:
- "Podrá" / "Deberá"
- "Únicamente" / "Previo"
- "Salvo" / "Cuando"

---

## 💰 USO DE CRÉDITOS GAMMA

| Operación | Créditos aprox |
|-----------|----------------|
| Documento corto (5-10 págs) | 30-50 |
| Documento medio (15-25 págs) | 80-120 |
| Documento largo (40+ págs) | 150-200 |
| Regeneración | ~50% del original |
| Edición menor | 10-20 |

**Estado actual**: ~6,700 créditos disponibles
**Recomendación**: Probar con contenido corto primero, luego escalar

---

## 🔄 FLUJO DE TRABAJO RECOMENDADO

```
1. PREPARAR CONTENIDO
   ├── Extraer artículos literales completos
   ├── Redactar análisis extensos (150-300 palabras)
   ├── Crear tablas comparativas
   ├── Añadir preguntas de examen con trampas
   └── Incluir trucos de memoria

2. VERIFICAR DENSIDAD
   ├── Contar caracteres por sección (~1500-2500)
   ├── Comprobar que hay suficiente para cada página
   └── Combinar secciones cortas si es necesario

3. GENERAR CON GAMMA
   ├── Usar parámetros de la sección "PARÁMETROS API"
   ├── format: 'document'
   ├── cardSplit: 'inputTextBreaks'
   └── imageOptions: { source: 'noImages' }

4. REVISAR RESULTADO
   ├── Verificar que no hay páginas semi-vacías
   ├── Comprobar legibilidad
   └── Ajustar si es necesario
```

---

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.2
- **Cambios**: Revisión de mantenimiento nocturno, reglas de legibilidad verificadas

*Basada en análisis exhaustivo de Tema 34 (43 págs) y Tema 35 (56 págs)*
*Incluye técnicas de @primeopositores para memorización*
