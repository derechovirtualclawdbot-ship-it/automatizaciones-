---
name: mailerlite
description: "Email marketing automation via MailerLite API v2. Gestión completa de suscriptores, grupos, campos personalizados y campañas. Endpoints: subscribers (CRUD, importar), groups, fields, campaigns, automations, segments. Para listas de email de Derecho Virtual y Prime Opositores."
triggers:
  - "mailerlite"
  - "email marketing"
  - "lista de correos"
  - "suscriptores"
  - "campaña email"
  - "newsletter"
  - "mailing list"
  - "enviar newsletter"
  - "gestionar suscriptores"
auto_activate: false
priority: 3
config:
  api_key_path: "/home/node/openclaw/.env.mailerlite"
  api_url: "https://connect.mailerlite.com/api"
  docs: "https://developers.mailerlite.com/docs"
---

# MailerLite Skill

Email marketing automation via MailerLite API v2.

## Configuration

Credentials stored in `/home/node/openclaw/.env.mailerlite`:
```bash
MAILERLITE_API_KEY=your_api_key_here
```

Get your API key from: https://dashboard.mailerlite.com/integrations/api

## API Base URL

```
https://connect.mailerlite.com/api
```

## Authentication

All requests require the `Authorization` header with Bearer token:
```
Authorization: Bearer $MAILERLITE_API_KEY
Content-Type: application/json
Accept: application/json
```

---

## Endpoints

### Subscribers

#### List all subscribers
```bash
curl -X GET "https://connect.mailerlite.com/api/subscribers" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Query params: `?limit=25&page=1&filter[status]=active`

Status values: `active`, `unsubscribed`, `unconfirmed`, `bounced`, `junk`

#### Get single subscriber
```bash
curl -X GET "https://connect.mailerlite.com/api/subscribers/{subscriber_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Can use email instead of ID: `subscribers/test@example.com`

#### Create subscriber
```bash
curl -X POST "https://connect.mailerlite.com/api/subscribers" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fields": {
      "name": "John",
      "last_name": "Doe",
      "company": "ACME Inc"
    },
    "groups": ["group_id_1", "group_id_2"],
    "status": "active"
  }'
```

#### Update subscriber
```bash
curl -X PUT "https://connect.mailerlite.com/api/subscribers/{subscriber_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "name": "Jane"
    }
  }'
```

#### Delete subscriber
```bash
curl -X DELETE "https://connect.mailerlite.com/api/subscribers/{subscriber_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

---

### Groups

#### List all groups
```bash
curl -X GET "https://connect.mailerlite.com/api/groups" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Query params: `?limit=25&page=1&filter[name]=Newsletter&sort=name`

#### Get single group
```bash
curl -X GET "https://connect.mailerlite.com/api/groups/{group_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

#### Create group
```bash
curl -X POST "https://connect.mailerlite.com/api/groups" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New Group"
  }'
```

#### Update group
```bash
curl -X PUT "https://connect.mailerlite.com/api/groups/{group_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Renamed Group"
  }'
```

#### Delete group
```bash
curl -X DELETE "https://connect.mailerlite.com/api/groups/{group_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

#### Get subscribers in group
```bash
curl -X GET "https://connect.mailerlite.com/api/groups/{group_id}/subscribers" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

#### Assign subscriber to group
```bash
curl -X POST "https://connect.mailerlite.com/api/subscribers/{subscriber_id}/groups/{group_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

#### Remove subscriber from group
```bash
curl -X DELETE "https://connect.mailerlite.com/api/subscribers/{subscriber_id}/groups/{group_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

---

### Campaigns

#### List all campaigns
```bash
curl -X GET "https://connect.mailerlite.com/api/campaigns" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Query params: `?filter[status]=sent&filter[type]=regular&limit=25&page=1`

Status values: `draft`, `ready`, `queued`, `sending`, `sent`
Type values: `regular`, `ab`, `resend`, `rss`

#### Get single campaign
```bash
curl -X GET "https://connect.mailerlite.com/api/campaigns/{campaign_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

#### Create campaign
```bash
curl -X POST "https://connect.mailerlite.com/api/campaigns" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Campaign",
    "type": "regular",
    "emails": [{
      "subject": "Welcome to our newsletter!",
      "from_name": "Company Name",
      "from": "hello@company.com",
      "content": "<html><body><h1>Hello!</h1><p>Welcome to our newsletter.</p></body></html>"
    }],
    "groups": ["group_id_1"]
  }'
```

#### Update campaign
```bash
curl -X PUT "https://connect.mailerlite.com/api/campaigns/{campaign_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Campaign Name",
    "emails": [{
      "subject": "New Subject Line"
    }]
  }'
```

#### Delete campaign
```bash
curl -X DELETE "https://connect.mailerlite.com/api/campaigns/{campaign_id}" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

#### Schedule campaign
```bash
curl -X POST "https://connect.mailerlite.com/api/campaigns/{campaign_id}/schedule" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "delivery": "scheduled",
    "schedule": {
      "date": "2024-12-25",
      "hours": "10",
      "minutes": "30",
      "timezone_id": 123
    }
  }'
```

Delivery values: `instant`, `scheduled`

#### Cancel scheduled campaign
```bash
curl -X POST "https://connect.mailerlite.com/api/campaigns/{campaign_id}/cancel" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY"
```

#### Get campaign activity (subscribers)
```bash
curl -X GET "https://connect.mailerlite.com/api/campaigns/{campaign_id}/reports/subscriber-activity" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Query params: `?filter[type]=opened&limit=25&page=1`

Activity types: `opened`, `clicked`, `bounced`, `junk`, `unsubscribed`

---

### Timezones

#### List all timezones
```bash
curl -X GET "https://connect.mailerlite.com/api/timezones" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

Returns list of timezones with `id`, `name`, and `offset`. Use `id` when scheduling campaigns.

Example response:
```json
{
  "data": [
    {"id": 1, "name": "Pacific/Midway", "offset": "-11:00"},
    {"id": 92, "name": "America/New_York", "offset": "-05:00"},
    {"id": 144, "name": "Europe/Madrid", "offset": "+01:00"},
    {"id": 270, "name": "UTC", "offset": "+00:00"}
  ]
}
```

---

### Fields (Custom Fields)

#### List all fields
```bash
curl -X GET "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

#### Create field
```bash
curl -X POST "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "company",
    "type": "text"
  }'
```

Type values: `text`, `number`, `date`

---

### Segments

#### List all segments
```bash
curl -X GET "https://connect.mailerlite.com/api/segments" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

#### Get subscribers in segment
```bash
curl -X GET "https://connect.mailerlite.com/api/segments/{segment_id}/subscribers" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" \
  -H "Content-Type: application/json"
```

---

## ⚠️ Formato HTML para Emails (IMPORTANTE)

Los emails de MailerLite requieren HTML simple y limpio:

### Estructura base
```html
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
  <p style="margin: 0 0 16px 0;">Párrafo 1</p>
  <p style="margin: 0 0 16px 0;">Párrafo 2</p>
</body>
</html>
```

### Reglas
- Cada párrafo = `<p>` con margin-bottom
- Negritas = `<strong>`
- Listas = `<ul><li>`
- NO usar: divs complejos, CSS externo, tablas innecesarias
- El estilo debe estar inline

### Ejemplo de texto plano a HTML
```
Entrada:
Hola,

Este es un **párrafo**.

Esto es otro párrafo.

Salida:
<p style="margin: 0 0 16px 0;">Hola,</p>
<p style="margin: 0 0 16px 0;">Este es un <strong>párrafo</strong>.</p>
<p style="margin: 0 0 16px 0;">Esto es otro párrafo.</p>
```

---

## Rate Limits

- **120 requests per minute** for most endpoints
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- HTTP 429 when exceeded (wait and retry)

---

## Common Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | Deleted (no content) |
| 401 | Unauthorized (bad API key) |
| 404 | Not found |
| 422 | Validation error |
| 429 | Rate limit exceeded |

---

## Quick Reference

Load API key:
```bash
source /home/node/openclaw/.env.mailerlite
```

Test connection:
```bash
curl -s "https://connect.mailerlite.com/api/subscribers?limit=1" \
  -H "Authorization: Bearer $MAILERLITE_API_KEY" | jq .
```

---

## Official Documentation

- API Reference: https://developers.mailerlite.com/docs/
- API Explorer: https://developers.mailerlite.com/reference

---

## 📧 HTML Email Template (Derecho Virtual)

Template oficial guardado en: `templates/email-base.html`

### Estructura Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 30px 10px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 4px; max-width: 600px;">
          <tr>
            <td style="padding: 40px 40px 36px 40px;">
              <!-- CONTENIDO AQUÍ -->
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Estilos Estándar

| Elemento | Estilo |
|----------|--------|
| Fondo exterior | `#f4f4f4` |
| Contenedor | `#ffffff`, 600px, border-radius 4px |
| Padding contenido | 40px |
| Font | Arial, Helvetica, sans-serif |
| Tamaño texto | 16px |
| Line height | 1.6 |
| Color texto | `#333333` |

### Párrafo Normal

```html
<p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
  Texto aquí. Usa <strong>negritas</strong> para destacar.
</p>
```

### Nombre Personalizado (Badge Azul)

```html
<p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
  Hola, <span style="background-color: #3b82f6; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 15px;">{$name}</span>
</p>
```

### Lista Numerada (Tabla)

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px 0;">
  <tr>
    <td style="padding: 0 0 16px 20px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;" width="30">1.</td>
    <td style="padding: 0 0 16px 8px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;">
      <strong>Título:</strong> Descripción.
    </td>
  </tr>
</table>
```

### Párrafo Final (Sin Margin)

```html
<p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
  Texto de cierre.
</p>
```

### Variables MailerLite

- `{$name}` - Nombre del suscriptor
- `{$email}` - Email del suscriptor
- `{$company}` - Empresa
- Campos personalizados: `{$custom_field_name}`

---

## 📅 Última Actualización

- **Fecha**: Febrero 2026
- **Versión**: 1.0
- **Cambios**: Documentación inicial completa

