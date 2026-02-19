#!/usr/bin/env node
/**
 * Sequra → Teachable Sync Daemon
 * Se ejecuta cada 15 minutos entre 9am-9pm España
 * Coste: 0 tokens (no pasa por agente)
 */

const { spawn } = require('child_process');
const path = require('path');

const INTERVAL_MS = 15 * 60 * 1000; // 15 minutos
const SCRIPT_PATH = path.join(__dirname, 'sync.js');

function isWithinOperatingHours() {
  const now = new Date();
  // Spain is UTC+1 in winter, UTC+2 in summer
  // Get Spain hour (approximate: UTC+1)
  const spainHour = (now.getUTCHours() + 1) % 24;
  return spainHour >= 9 && spainHour < 21;
}

function runSync() {
  if (!isWithinOperatingHours()) {
    console.log(`[${new Date().toISOString()}] Fuera de horario (9am-9pm España), saltando...`);
    return;
  }

  console.log(`[${new Date().toISOString()}] Ejecutando sync...`);
  
  const child = spawn('node', [SCRIPT_PATH], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  child.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
  });

  child.on('close', (code) => {
    console.log(`[${new Date().toISOString()}] Sync completado (code: ${code})`);
  });
}

console.log('🚀 Sequra → Teachable Daemon iniciado');
console.log(`   Intervalo: cada 15 minutos`);
console.log(`   Horario: 9am - 9pm España`);
console.log('');

// Primera ejecución inmediata
runSync();

// Después cada 15 minutos
setInterval(runSync, INTERVAL_MS);
