#!/usr/bin/env node
/**
 * Sincronización de skills entre OpenClaw bots via GitHub
 * 
 * Uso: node sync-skills.js [--push-all] [--pull-only]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuración
const WORKSPACE = process.env.OPENCLAW_WORKSPACE || '/home/node/openclaw';
const SYNC_REPO = path.join(WORKSPACE, 'sync-repo');
const LOCAL_SKILLS = path.join(WORKSPACE, 'skills');
const BOT_ID = process.env.BOT_ID || 'henry';
const CREDENTIALS_PATH = path.join(process.env.HOME, '.openclaw/credentials/.env.github');

// Cargar credenciales
function loadCredentials() {
  const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
  const lines = content.split('\n');
  const creds = {};
  lines.forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) creds[key.trim()] = vals.join('=').trim();
  });
  return creds;
}

// Ejecutar comando git
function git(cmd, cwd = SYNC_REPO) {
  try {
    return execSync(`git ${cmd}`, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch (e) {
    console.error(`Git error: ${e.message}`);
    return null;
  }
}

// Actualizar repo desde GitHub
function pullLatest() {
  console.log('📥 Pulling latest changes...');
  git('fetch origin');
  git('reset --hard origin/main 2>/dev/null || git reset --hard origin/master 2>/dev/null || true');
}

// Leer manifest
function readManifest() {
  const manifestPath = path.join(SYNC_REPO, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return { version: '1.0.0', skills: [], bots: [] };
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

// Guardar manifest
function saveManifest(manifest) {
  manifest.lastUpdated = new Date().toISOString();
  fs.writeFileSync(
    path.join(SYNC_REPO, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

// Obtener lista de skills locales
function getLocalSkills() {
  if (!fs.existsSync(LOCAL_SKILLS)) return [];
  return fs.readdirSync(LOCAL_SKILLS)
    .filter(f => {
      const skillPath = path.join(LOCAL_SKILLS, f);
      return fs.statSync(skillPath).isDirectory() && 
             fs.existsSync(path.join(skillPath, 'SKILL.md'));
    });
}

// Obtener lista de skills en repo
function getRepoSkills() {
  const skillsDir = path.join(SYNC_REPO, 'skills');
  if (!fs.existsSync(skillsDir)) return [];
  return fs.readdirSync(skillsDir)
    .filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());
}

// Copiar skill local al repo
function pushSkill(skillName) {
  console.log(`  📤 Pushing skill: ${skillName}`);
  const src = path.join(LOCAL_SKILLS, skillName);
  const dest = path.join(SYNC_REPO, 'skills', skillName);
  
  // Copiar recursivamente
  execSync(`rm -rf "${dest}" && cp -r "${src}" "${dest}"`, { encoding: 'utf8' });
  
  // Crear REQUIRES.md si no existe
  const requiresPath = path.join(dest, 'REQUIRES.md');
  if (!fs.existsSync(requiresPath)) {
    // Buscar referencias a variables de entorno en los archivos
    const envVars = new Set();
    findEnvVars(dest, envVars);
    
    if (envVars.size > 0) {
      const content = `# Variables de entorno requeridas\n\n${[...envVars].map(v => `- \`${v}\``).join('\n')}\n`;
      fs.writeFileSync(requiresPath, content);
    }
  }
}

// Buscar variables de entorno en archivos
function findEnvVars(dir, vars) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findEnvVars(filePath, vars);
    } else if (file.endsWith('.js') || file.endsWith('.md') || file.endsWith('.sh')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(/process\.env\.([A-Z_]+)|(\$[A-Z_]+)|\benv\.[A-Z_]+/g);
      if (matches) {
        matches.forEach(m => {
          const varName = m.replace(/process\.env\.|env\.|\$/g, '');
          if (varName && !['HOME', 'PATH', 'USER', 'PWD'].includes(varName)) {
            vars.add(varName);
          }
        });
      }
    }
  });
}

// Copiar skill del repo a local
function pullSkill(skillName) {
  console.log(`  📥 Pulling skill: ${skillName}`);
  const src = path.join(SYNC_REPO, 'skills', skillName);
  const dest = path.join(LOCAL_SKILLS, skillName);
  
  execSync(`rm -rf "${dest}" && cp -r "${src}" "${dest}"`, { encoding: 'utf8' });
}

// Commit y push cambios
function commitAndPush(message) {
  console.log('📤 Committing and pushing...');
  git('add -A');
  const status = git('status --porcelain');
  if (!status || status.trim() === '') {
    console.log('  No changes to commit');
    return false;
  }
  git(`commit -m "${message}"`);
  git('push origin HEAD');
  return true;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  const pushAll = args.includes('--push-all');
  const pullOnly = args.includes('--pull-only');
  
  console.log('🔄 OpenClaw Skills Sync');
  console.log(`   Bot: ${BOT_ID}`);
  console.log(`   Workspace: ${WORKSPACE}\n`);
  
  // Pull latest
  pullLatest();
  
  const manifest = readManifest();
  const localSkills = getLocalSkills();
  const repoSkills = getRepoSkills();
  
  console.log(`📊 Local skills: ${localSkills.length}`);
  console.log(`📊 Repo skills: ${repoSkills.length}\n`);
  
  // Skills nuevas en repo (descargar)
  const newFromRepo = repoSkills.filter(s => !localSkills.includes(s));
  if (newFromRepo.length > 0) {
    console.log(`🆕 New skills from repo: ${newFromRepo.length}`);
    newFromRepo.forEach(pullSkill);
  }
  
  if (!pullOnly) {
    // Skills nuevas locales (subir)
    const newLocal = localSkills.filter(s => !repoSkills.includes(s));
    if (newLocal.length > 0 || pushAll) {
      const toPush = pushAll ? localSkills : newLocal;
      console.log(`🆕 Skills to push: ${toPush.length}`);
      
      toPush.forEach(pushSkill);
      
      // Actualizar manifest
      manifest.skills = [...new Set([...manifest.skills, ...toPush])];
      
      // Actualizar bot en manifest
      const botIndex = manifest.bots.findIndex(b => b.id === BOT_ID);
      if (botIndex >= 0) {
        manifest.bots[botIndex].lastSync = new Date().toISOString();
      } else {
        manifest.bots.push({ id: BOT_ID, name: BOT_ID, lastSync: new Date().toISOString() });
      }
      
      saveManifest(manifest);
      commitAndPush(`sync: ${BOT_ID} pushed ${toPush.length} skills`);
    }
  }
  
  console.log('\n✅ Sync complete!');
}

main().catch(console.error);
