import { execSync } from 'child_process';
import path from 'path';

const rootDir = '/vercel/share/v0-project';
const frontendDir = path.join(rootDir, 'frontend');

try {
  console.log('[v0] Installing root dependencies...');
  try {
    execSync('npm install --no-audit', { 
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log('[v0] Root dependencies installed successfully!');
  } catch (e) {
    console.warn('[v0] Root npm install encountered issues, continuing...');
  }

  console.log('[v0] Installing frontend dependencies...');
  try {
    execSync('npm install --no-audit', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    console.log('[v0] Frontend dependencies installed successfully!');
  } catch (e) {
    console.warn('[v0] Frontend npm install encountered issues, continuing...');
  }

  console.log('[v0] Installation process completed!');
} catch (error) {
  console.error('[v0] Critical error:', error.message);
  process.exit(1);
}
