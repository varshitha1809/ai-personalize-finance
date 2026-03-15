import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = '/vercel/share/v0-project';
const frontendDir = path.join(rootDir, 'frontend');

console.log('[v0] Debug: Checking npm version...');
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf-8' });
  console.log('[v0] npm version:', npmVersion.trim());
} catch (e) {
  console.error('[v0] npm not found:', e.message);
}

console.log('[v0] Debug: Checking root directory...');
console.log('[v0] Root files:', fs.readdirSync(rootDir).filter(f => !f.startsWith('.')));

console.log('[v0] Debug: Checking frontend directory...');
if (fs.existsSync(frontendDir)) {
  console.log('[v0] Frontend files:', fs.readdirSync(frontendDir).filter(f => !f.startsWith('.')));
} else {
  console.log('[v0] Frontend directory does not exist');
}

console.log('[v0] Debug: Attempting npm install in frontend...');
try {
  const result = execSync('npm install --no-audit --legacy-peer-deps 2>&1', {
    cwd: frontendDir,
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024 * 10
  });
  console.log('[v0] npm install output:', result);
} catch (e) {
  console.error('[v0] npm install error:', e.message);
  console.error('[v0] npm install stdout:', e.stdout?.toString() || 'no stdout');
  console.error('[v0] npm install stderr:', e.stderr?.toString() || 'no stderr');
}

console.log('[v0] Debug: Checking if node_modules was created...');
const nmPath = path.join(frontendDir, 'node_modules');
if (fs.existsSync(nmPath)) {
  console.log('[v0] node_modules exists');
  const files = fs.readdirSync(nmPath).slice(0, 10);
  console.log('[v0] First 10 modules:', files);
} else {
  console.log('[v0] node_modules does not exist');
}
