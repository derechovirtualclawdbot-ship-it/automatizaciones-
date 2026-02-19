#!/usr/bin/env node
/**
 * Helper para obtener saludos variados sin repetir
 * Uso: node saludo-helper.js [acción] [tipo]
 * Acciones: get (default), history, list
 * Tipos: oposiciones (default), lexi, iipp
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATHS = {
  'oposiciones': '/home/node/openclaw/config/saludos-oposiciones.json',
  'lexi': '/home/node/openclaw/config/saludos-lexi-ai.json',
  'iipp': '/home/node/openclaw/config/saludos-oposiciones.json' // Usa el mismo que oposiciones
};

// Detectar tipo desde argumentos
const args = process.argv.slice(2);
const tipo = args.find(a => CONFIG_PATHS[a]) || 'oposiciones';
const CONFIG_PATH = CONFIG_PATHS[tipo];

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (e) {
    console.error('Error loading config:', e.message);
    process.exit(1);
  }
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function getRandomSaludo() {
  const config = loadConfig();
  const { saludos, last_used, max_history } = config;
  
  // Filtrar saludos que no estén en los últimos usados
  const available = saludos.filter(s => !last_used.includes(s));
  
  // Si todos están usados, resetear (no debería pasar con 40 saludos y max_history 5)
  const pool = available.length > 0 ? available : saludos;
  
  // Elegir uno aleatorio
  const selected = pool[Math.floor(Math.random() * pool.length)];
  
  // Actualizar historial
  config.last_used.push(selected);
  if (config.last_used.length > max_history) {
    config.last_used = config.last_used.slice(-max_history);
  }
  
  saveConfig(config);
  
  return selected;
}

function getLastUsed() {
  const config = loadConfig();
  return config.last_used;
}

// CLI
const action = process.argv[2] || 'get';

if (action === 'get') {
  console.log(getRandomSaludo());
} else if (action === 'history') {
  console.log('Últimos usados:', getLastUsed());
} else if (action === 'list') {
  const config = loadConfig();
  console.log(`Total saludos: ${config.saludos.length}`);
  config.saludos.forEach((s, i) => console.log(`${i + 1}. ${s}`));
}
