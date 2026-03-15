import { execSync } from 'child_process';
import path from 'path';

const rootDir = process.cwd();
const frontendDir = path.join(rootDir, 'frontend');

try {
  console.log('[v0] Using pnpm to install root dependencies...');
  try {
    execSync('pnpm install', { 
      cwd: rootDir,
      stdio: 'inherit'
    });
    console.log('[v0] Root dependencies installed successfully!');
  } catch (e) {
    console.warn('[v0] Root pnpm install encountered issues');
  }

  console.log('[v0] Using pnpm to install frontend dependencies...');
  try {
    execSync('pnpm install', { 
      cwd: frontendDir,
      stdio: 'inherit'
    });
    console.log('[v0] Frontend dependencies installed successfully!');
  } catch (e) {
    console.warn('[v0] Frontend pnpm install encountered issues');
  }

  console.log('[v0] Dependency installation complete!');
} catch (error) {
  console.error('[v0] Critical error:', error.message);
  process.exit(1);
}
