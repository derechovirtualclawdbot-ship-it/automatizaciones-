---
name: youtube-tools
description: "Descarga y transcribe videos de YouTube automáticamente. Activar cuando el usuario comparta URL de YouTube o pida transcribir/descargar un video. Incluye cookies configuradas, subtítulos automáticos, transcripción Whisper, y reescritura de guiones para ElevenLabs."
triggers:
  - "youtube.com"
  - "youtu.be"
  - "transcribe este video"
  - "descarga este video"
  - "de qué habla este video"
  - "resumen del video"
  - "transcripción youtube"
auto_activate: true
priority: 1
requires:
  - whisper-transcription
---

# YouTube Tools - Descarga y Transcripción

## ✅ Estado: COOKIES CONFIGURADAS

Las cookies de Carlos están instaladas en:
```
/home/node/openclaw/config/youtube-cookies.txt
```

## ⚠️ ANTI-BLOQUEO - REGLAS OBLIGATORIAS

**YouTube bloquea si detecta muchas descargas seguidas.** Seguir SIEMPRE estas reglas:

### 1. DELAYS ENTRE DESCARGAS
```bash
# NUNCA descargar en paralelo
# SIEMPRE esperar entre descargas:
# - 1-3 videos: 10 segundos entre cada uno
# - 4-10 videos: 30 segundos entre cada uno
# - 11-50 videos: 60 segundos entre cada uno
# - +50 videos: 90 segundos entre cada uno
```

### 2. DESCARGAS EN LOTES
```bash
# Para muchos videos, dividir en lotes de 10
# Esperar 5 minutos entre lotes
# Si hay error 403 o "Sign in to confirm": PARAR y esperar 30 min
```

### 3. VERIFICAR COOKIES ANTES DE LOTES GRANDES
```bash
# Antes de descargar +10 videos, verificar que las cookies funcionan:
/home/node/openclaw/bin/yt-dlp --cookies /home/node/openclaw/config/youtube-cookies.txt --dump-json "https://youtube.com/watch?v=VIDEO_ID" 2>&1 | head -5
# Si da error de "Sign in", pedir cookies nuevas al usuario ANTES de continuar
```

### 4. SI HAY BLOQUEO
1. PARAR inmediatamente
2. Esperar 30 minutos mínimo
3. Pedir cookies frescas al usuario
4. Reintentar con delays más largos

### 5. SCRIPT SEGURO PARA LOTES

```bash
#!/bin/bash
# Uso: ./safe_download.sh video_ids.txt
COOKIES="/home/node/openclaw/config/youtube-cookies.txt"
YT_DLP="/home/node/openclaw/bin/yt-dlp"
DELAY=60  # segundos entre descargas

while read -r video_id; do
  echo "Descargando $video_id..."
  $YT_DLP --cookies "$COOKIES" -x --audio-quality 5 \
    -o "/tmp/yt_${video_id}.%(ext)s" \
    "https://youtube.com/watch?v=${video_id}" 2>&1
  
  if [ $? -ne 0 ]; then
    echo "ERROR en $video_id - esperando 5 minutos..."
    sleep 300
  fi
  
  echo "Esperando ${DELAY}s..."
  sleep $DELAY
done < "$1"
```

## Workflow Principal: Video → Transcripción

Cuando el usuario comparta un video de YouTube, seguir este flujo:

### 1. Transcripción Rápida (usar subtítulos si existen)

```bash
# Primero intentar obtener subtítulos automáticos (más rápido)
/home/node/openclaw/bin/yt-dlp --write-auto-sub --sub-lang es,en --skip-download --sub-format vtt -o "/tmp/yt_%(id)s" "URL" 2>/dev/null

# Si hay .vtt, extraer texto:
cat /tmp/yt_*.vtt 2>/dev/null | grep -v "^WEBVTT" | grep -v "^$" | grep -v "^\d" | grep -v "^NOTE" | grep -v -- "-->" | sort -u
```

### 2. Transcripción Completa (Whisper)

Si no hay subtítulos o el usuario quiere transcripción precisa:

```bash
# Descargar solo audio
/home/node/openclaw/bin/yt-dlp -x --audio-format mp3 --audio-quality 5 -o "/tmp/yt_%(id)s.%(ext)s" "URL" 2>&1

# Transcribir con Whisper
node /home/node/openclaw/skills/whisper-transcription/transcribe.js "/tmp/yt_VIDEO_ID.mp3"
```

### 3. Script Todo-en-Uno

```bash
node /home/node/openclaw/skills/youtube-tools/scripts/youtube-transcribe.js "URL"
```

**Output:** Transcripción completa del video en texto.

---

## Autenticación con Cookies

✅ **Cookies ya instaladas** - Se usan automáticamente en todos los comandos.

Para actualizar cookies (si expiran):
1. Usuario exporta cookies de YouTube (extensión "Get cookies.txt LOCALLY")
2. Guardar en: `/home/node/openclaw/config/youtube-cookies.txt`

---

## Comandos Útiles

### Info del video
```bash
/home/node/openclaw/bin/yt-dlp --dump-json "URL" 2>/dev/null | jq '{title,channel,duration_string,view_count,upload_date,description}'
```

### Descargar video completo
```bash
/home/node/openclaw/bin/yt-dlp -f "bestvideo[height<=1080]+bestaudio/best" -o "/tmp/%(title)s.%(ext)s" "URL"
```

### Solo audio MP3
```bash
/home/node/openclaw/bin/yt-dlp -x --audio-format mp3 -o "/tmp/%(title)s.%(ext)s" "URL"
```

### Thumbnail
```bash
/home/node/openclaw/bin/yt-dlp --write-thumbnail --skip-download -o "/tmp/%(id)s" "URL"
```

### Listar videos de canal
```bash
/home/node/openclaw/bin/yt-dlp --flat-playlist --print "%(id)s | %(title)s" "CANAL_URL/videos" | head -20
```

---

## Manejo de Errores

| Error | Solución |
|-------|----------|
| "Sign in to confirm your age" | Usar cookies |
| "Video unavailable" | Video privado, necesita cookies del propietario |
| "HTTP Error 403" | Actualizar yt-dlp |
| Audio muy largo (>25MB) | Dividir antes de Whisper |

### Actualizar yt-dlp
```bash
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /home/node/openclaw/bin/yt-dlp && chmod +x /home/node/openclaw/bin/yt-dlp
```

---

## Flujo Recomendado para Transcripción

1. **¿Tiene subtítulos?** → Extraer subtítulos (instantáneo)
2. **¿No tiene subtítulos?** → Descargar audio + Whisper
3. **¿Video muy largo (>1h)?** → Avisar que tardará, considerar dividir
4. **¿Video privado?** → Pedir cookies al usuario

---

## Límites

- **Whisper API**: 25MB máximo por archivo
- **Videos largos**: ~1h de video ≈ 15-20MB en MP3 quality 5
- **Videos >2h**: Dividir audio en chunks

---

# 🎓 REESCRITURA DE GUIONES PARA ELEVENLABS (ESTUDIANTES DE DERECHO)

## Contexto y Público Objetivo

Este sistema está diseñado para transformar guiones destinados a ser narrados con ElevenLabs, orientados específicamente a **estudiantes de Derecho** que preparan sus exámenes. El objetivo es que el audio les ayude a memorizar y comprender temas densos de forma amena. **No es para abogados ni personas con problemas legales reales.**

---

## 🎯 MISIÓN PRINCIPAL: TRANSFORMAR, NO CREAR

Tu única misión es: **"Reescribir el guion que te entrego para que suene natural y humano al ser narrado por una voz de IA (ElevenLabs). Debes mantener el 100% del contenido original y respetar su duración exacta."**

---

## ✅ LOS 4 PILARES OBLIGATORIOS DE LA REESCRITURA

### 1. DURACIÓN EXACTA
La versión final debe tener un número de palabras casi idéntico al original (**margen de error máximo: ±50 palabras**). Si el guion original tiene 2.000 palabras, el tuyo debe tener entre 1.950 y 2.050. **No resumir es una regla crítica.**

### 2. CONTENIDO ÍNTEGRO
Debes conservar **cada bloque de información, cada artículo legal y cada definición clave**. No puedes eliminar datos, aunque sí puedes y debes reformular las frases para que fluyan de manera oral.

### 3. EMULAR LA EXCELENCIA (Archivos "MUESTRA")
Los archivos llamados "MUESTRA1" a "MUESTRA6" no son solo referencias; son el ejemplo concreto de un guion bien escrito. Analiza e internaliza su ritmo, su claridad para explicar conceptos complejos y su tono. Tu guion final debe sonar como si perteneciera a esa colección.

### 4. APLICAR EL MÉTODO LAW-TELLING EMOCIONAL (Archivo "lawtelling")
El archivo lawtelling es tu mapa de patrones emocionales. No te limites a seguir una estructura; debes inyectar las emociones y giros que se detallan en él para transformar un texto académico en una historia que engancha y enseña.

---

## 🧱 LA ARQUITECTURA DEL GUIÓN LAW-TELLING

Reescribe el contenido aplicando esta estructura narrativa **de forma fluida y sin usar encabezados**:

### Hook Legal (El Anzuelo)
Comienza con una pregunta, un dato sorprendente o una anécdota que capture la atención del estudiante de inmediato.
> *Ejemplo: "¿Sabías que podrías cometer un delito sin siquiera darte cuenta, solo por compartir un meme?"*

### Desarrollo Narrativo (El Viaje)
Expón la teoría, los artículos y las definiciones de manera conversacional, como si se lo estuvieras contando a un compañero de estudio.

**IMPRESCINDIBLE:**
- Habla siempre de **"tú"** al estudiante para crear conexión directa
- Introduce al menos **una pregunta retórica cada 200 palabras** para mantenerlo enganchado
> *Ejemplos: "Vale, pero ¿qué pasa si el dolo no es directo?", "¿Entiendes la diferencia clave aquí?"*

### Giro Práctico (La Conexión)
Aterriza la teoría en la realidad del estudiante. Conecta el contenido con lo que realmente importa: **el examen**.
> *Ejemplos: "Y ojo con esto, porque esta diferencia es la típica pregunta trampa en un examen tipo test" o "Si te preguntan un caso práctico sobre esto, el tribunal siempre mira…"*

### Moraleja y Cierre (El Recuerdo)
Termina con una idea clave y memorable que resuma la lección principal, seguida de una llamada a la acción sutil que motive al estudio.
> *Ejemplo: "Así que, como ves, la clave no está en memorizar el artículo 138, sino en entender por qué existe. Ahora que lo tienes claro, repásalo una vez más y verás cómo no se te olvida."*

---

## 👂 TONO Y ESTILO ORAL

- **Natural y cercano, pero riguroso.** Evita el lenguaje coloquial extremo, pero huye de la formalidad académica.
- **Frases de longitud variada.** Combina oraciones cortas y directas con otras más largas y explicativas para crear un ritmo dinámico.
- **Usa conectores orales.** Integra expresiones como:
  - "Pues bien…"
  - "Ahora vamos al lío…"
  - "Ojo, porque aquí viene lo importante…"
  - "Piensa en esto…"
  - "Entonces, ¿qué significa todo esto en la práctica?"

---

## ⛔️ REGLAS INQUEBRANTABLES (LO PROHIBIDO)

1. **NO inventes** contenido, datos ni ejemplos que no estén en el texto original.
2. **NO uses encabezados, títulos, listas con viñetas o numeración.** La estructura debe ser invisible, puramente narrativa.
3. **NO uses abreviaturas** como "Art.", "CP", "LECrim", etc. Di siempre el nombre completo: "artículo", "Código Penal", "Ley de Enjuiciamiento Criminal".
4. **NUNCA** añadas líneas como "1. ¿Qué es realmente la Buena Fe?" o "2. ¿Dónde se regula? La doble base normativa" porque ElevenLabs lo leería tal cual y arruinaría el guion.

---

## 🧠 CHECKLIST FINAL ANTES DE ENTREGAR

Antes de dar por terminado el trabajo, revisa tu guion y responde a estas preguntas:

- [ ] ¿La longitud es prácticamente idéntica a la del original?
- [ ] ¿He mantenido el 100% del contenido jurídico clave (artículos, definiciones)?
- [ ] ¿El texto suena como si una persona lo estuviera contando, no leyendo?
- [ ] ¿He eliminado todas las abreviaturas, listas y encabezados?
- [ ] ¿He aplicado la estructura Law-Telling y los patrones emocionales?
- [ ] ¿El estilo, ritmo y calidad son equiparables a los de los archivos "MUESTRA"?
- [ ] ¿He incluido preguntas retóricas y he usado el "tú" de forma consistente?

---

# 📝 MODO REVISIÓN: AÑADIR TIPS PARA EXÁMENES

## Función

Actuar como profesor especializado en revisar y mejorar guiones, añadiendo **advertencias, consejos y recordatorios clave** para que el estudiante no falle en la evaluación.

## Reglas de la Revisión

1. **Editar SOLO las secciones donde se aborden contenidos importantes para exámenes**
2. **Añadir entre 100 y 200 palabras COMO MÁXIMO** - NUNCA más
3. **Distribuir las adiciones POCO A POCO** a lo largo del guion según detectes puntos importantes
4. **NUNCA alterar la duración del guion** más allá de las 100-200 palabras añadidas
5. **Solo cambiar lo IMPRESCINDIBLE** del texto original

## Qué Hacer

- Incidir en puntos clave para el examen
- Dar consejos y advertir al alumno
- Hacer alusiones directas al alumno (preguntas de tú a tú)
- Crear un vínculo emocional con el estudiante
- Advertir sobre confusiones comunes
- Enfatizar puntos clave para memorizar

## Qué NO Hacer

- No corregir errores generales
- No cambiar la estructura general
- No introducir títulos ni apartados con dos puntos
- No desviarse del contenido jurídico
- **NUNCA** crear párrafos superiores a 5-6 líneas

## Humanización de Expresiones

**MAL:**
> Lo primero de todo, ¿qué es la buena fe contractual?

**HUMANIZADO:**
> Lo primero de todo, ¿Sabes qué es la buena fe contractual?

**El protagonista es SIEMPRE el alumno** - La tercera persona que nos está viendo. Hazle alusiones para mantenerle atento.

---

# 🎙️ AUDIO TAGS PARA ELEVENLABS

## Propósito

Incorporar audio tags de ElevenLabs para dar naturalidad a la voz clonada. Los audio tags hacen que la narración sea dinámica y entretenida.

## Reglas de Audio Tags

1. **Siempre habla una sola persona** en el guion
2. **Videos de enseñanza de 8-12 minutos** - incluir audio tags que tengan sentido
3. **Máximo 2 audio tags por párrafo** - NO abusar
4. **NUNCA omitir ninguna palabra** del guion original

## Audio Tags Disponibles

```
<break time="0.5s" />     - Pausa breve (medio segundo)
<break time="1.0s" />     - Pausa media (un segundo)
<break time="1.5s" />     - Pausa larga (segundo y medio)
```

## Cuándo Usar Audio Tags

- **Antes de un concepto importante** - para crear expectación
- **Después de una pregunta retórica** - para dar tiempo a pensar
- **Entre secciones temáticas** - para marcar transición
- **Antes de una advertencia de examen** - para captar atención
- **Después de un dato sorprendente** - para dejar que asimile

## Ejemplo de Aplicación

**Sin audio tags:**
> ¿Sabes qué es la buena fe contractual? Es uno de los principios más importantes del Derecho civil y, ojo, porque cae mucho en exámenes.

**Con audio tags:**
> ¿Sabes qué es la buena fe contractual? <break time="0.5s" /> Es uno de los principios más importantes del Derecho civil y, ojo, <break time="0.5s" /> porque cae mucho en exámenes.

---

## Flujo Completo de Trabajo

1. **Recibir guion original** → Contar palabras
2. **Reescribir aplicando Law-Telling** → Mantener ±50 palabras
3. **Revisar y añadir tips de examen** → Máximo 100-200 palabras extra
4. **Incorporar audio tags** → Máximo 2 por párrafo
5. **Verificar checklist final**
6. **Entregar guion optimizado para ElevenLabs**
