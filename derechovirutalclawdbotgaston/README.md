# derechovirutalclawdbotgaston — Backup de Automatizaciones

Carpeta de respaldo de los **cron jobs** del agente Mira (Gaston).

## Archivos

| Archivo | Descripción |
|---|---|
| `latest.json` | Último backup (siempre actualizado) |
| `backup-YYYY-MM-DD.json` | Histórico por fecha |
| `backup-log.md` | Log de ejecuciones |

## Frecuencia

Backup automático **cada 12 horas** vía cron job de OpenClaw.

## Automatizaciones activas

| ID | Nombre | Schedule | Estado |
|---|---|---|---|
| `c940daba` | sync-skills-8h | `0 */8 * * *` | ❌ Disabled |
| `fc310339` | backup-automatizaciones-12h | `0 */12 * * *` | ✅ Enabled |

---
_Mantenido automáticamente por Mira (OpenClaw Agent)_
