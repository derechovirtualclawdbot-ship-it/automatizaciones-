---
name: instagram-downloader
description: "Descarga posts, reels, stories e imágenes de Instagram. Activar automáticamente cuando el usuario comparta una URL de Instagram (instagram.com/p/, instagram.com/reel/). Soporta posts públicos, carruseles y videos."
triggers:
  - "instagram.com/p/"
  - "instagram.com/reel/"
  - "instagram.com/tv/"
  - "descarga este post"
  - "bájame este reel"
  - "descarga de instagram"
  - "descargar instagram"
auto_activate: true
priority: 1
requires:
  - file-share
---

# Instagram Downloader

## Herramienta Principal

**instaloader** - CLI para descargar contenido de Instagram

```bash
# Verificar instalación
~/.local/bin/instaloader --version
```

## Comandos Básicos

### Descargar un post por URL

```bash
# Extraer el shortcode de la URL
# URL: https://www.instagram.com/p/ABC123xyz/
# Shortcode: ABC123xyz

~/.local/bin/instaloader -- -ABC123xyz
```

**IMPORTANTE:** El guion antes del shortcode (`-ABC123xyz`) es necesario para indicar que es un shortcode, no un usuario.

### Descargar un reel

```bash
# URL: https://www.instagram.com/reel/ABC123xyz/
~/.local/bin/instaloader -- -ABC123xyz
```

### Descargar con opciones útiles

```bash
~/.local/bin/instaloader \
  --dirname-pattern="/tmp/ig_{shortcode}" \
  --filename-pattern="{shortcode}" \
  --no-metadata-json \
  --no-compress-json \
  -- -SHORTCODE
```

### Descargar perfil completo (requiere login)

```bash
~/.local/bin/instaloader --login=USUARIO perfil_objetivo
```

## Extraer Shortcode de URL

```javascript
// Función para extraer shortcode
function getShortcode(url) {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}
```

O en bash:
```bash
URL="https://www.instagram.com/p/ABC123xyz/"
SHORTCODE=$(echo "$URL" | grep -oP '(?:p|reel|tv)/\K[A-Za-z0-9_-]+')
echo $SHORTCODE
```

## Flujo de Trabajo

1. **Recibir URL de Instagram**
2. **Extraer shortcode** de la URL
3. **Ejecutar instaloader** con el shortcode
4. **Localizar archivos descargados** (jpg, mp4)
5. **Subir a catbox.moe** para compartir
6. **Enviar al usuario**

## Ejemplo Completo

```bash
#!/bin/bash
URL="$1"
SHORTCODE=$(echo "$URL" | grep -oP '(?:p|reel|tv)/\K[A-Za-z0-9_-]+')

if [ -z "$SHORTCODE" ]; then
  echo "Error: No se pudo extraer shortcode de la URL"
  exit 1
fi

# Crear directorio temporal
OUTDIR="/tmp/ig_${SHORTCODE}"
mkdir -p "$OUTDIR"

# Descargar
cd "$OUTDIR"
~/.local/bin/instaloader \
  --dirname-pattern="." \
  --filename-pattern="{shortcode}" \
  --no-metadata-json \
  --no-compress-json \
  -- -${SHORTCODE}

# Listar archivos descargados
ls -la "$OUTDIR"
```

## Tipos de Contenido

| Tipo | URL Pattern | Resultado |
|------|-------------|-----------|
| Post (imagen) | `/p/XXX` | .jpg |
| Post (carrusel) | `/p/XXX` | múltiples .jpg |
| Post (video) | `/p/XXX` | .mp4 |
| Reel | `/reel/XXX` | .mp4 |
| IGTV | `/tv/XXX` | .mp4 |

## Limitaciones

- **Posts públicos:** Funcionan sin login
- **Posts privados:** Requieren login con cookies
- **Stories:** Requieren login
- **Rate limiting:** Instagram puede bloquear si hay muchas descargas seguidas

## Configurar Login (Opcional)

Para contenido privado o stories:

```bash
# Login interactivo (guarda sesión)
~/.local/bin/instaloader --login=tu_usuario

# Las cookies se guardan en ~/.config/instaloader/
```

## Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Post not found` | Post privado o eliminado | Verificar URL, necesita login |
| `401 Unauthorized` | Sesión expirada | Re-login |
| `429 Too Many Requests` | Rate limit | Esperar 1-2 horas |

## Script Helper

```bash
# /home/node/openclaw/skills/instagram-downloader/download.sh
#!/bin/bash
URL="$1"
SHORTCODE=$(echo "$URL" | grep -oP '(?:p|reel|tv)/\K[A-Za-z0-9_-]+')
OUTDIR="/tmp/ig_${SHORTCODE}"

mkdir -p "$OUTDIR"
cd "$OUTDIR"

~/.local/bin/instaloader \
  --dirname-pattern="." \
  --filename-pattern="{shortcode}" \
  --no-metadata-json \
  --no-compress-json \
  -- -${SHORTCODE} 2>&1

# Mostrar archivos
find "$OUTDIR" -type f \( -name "*.jpg" -o -name "*.mp4" \) | head -20
```

---

## Ejemplos de uso

**Ejemplo 1 — Descargar un reel compartido:**
> [Usuario comparte URL] "https://www.instagram.com/reel/CxyzABCD123/"

→ Auto-activación, extrae shortcode `CxyzABCD123`, descarga el .mp4 con instaloader, sube a catbox.moe, envía enlace de descarga

**Ejemplo 2 — Descargar imagen de post:**
> "Bájame esta imagen de Instagram: https://www.instagram.com/p/CaAbBbCcDd/"

→ Descarga el .jpg (o múltiples si es carrusel), sube a catbox y devuelve enlace

**Ejemplo 3 — Carrusel de fotos:**
> "Descarga este post que tiene varias imágenes: https://www.instagram.com/p/XxYyZz123/"

→ Descarga todos los archivos del carrusel, los comprime en un .zip si son varios, sube y comparte

---

## Dependencias / Configuración

| Requisito | Detalle |
|-----------|---------|
| **instaloader** | Instalado en `~/.local/bin/instaloader` |
| **file-share** | Skill `file-share` para subir a catbox.moe y compartir |
| **Login (opcional)** | `~/.config/instaloader/` — cookies para contenido privado o stories |
| **Rate limit** | Instagram limita peticiones rápidas; si hay 429, esperar 1-2 horas |

### Instalar o actualizar instaloader
```bash
pip3 install --upgrade instaloader
# Verifica instalación:
~/.local/bin/instaloader --version
```

### Login para contenido privado
```bash
~/.local/bin/instaloader --login=USUARIO_IG
# Las cookies se guardan automáticamente para futuras sesiones
```

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.2
- **Cambios**: Añadidos ejemplos de uso y sección de dependencias/configuración
