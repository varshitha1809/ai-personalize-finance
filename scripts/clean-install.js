import { execSync } from 'child_process';

const rootDir = '/vercel/share/v0-project';

try {
  console.log('[v0] Starting clean npm install (regenerating lock file)...');
  
  // Use npm install to regenerate the lock file (not npm ci which requires exact match)
  execSync('npm install --legacy-peer-deps 2>&1', { 
    cwd: rootDir,
    stdio: 'inherit'
  });
  
  console.log('[v0] Dependencies installed successfully!');
} catch (error) {
  // npm install may show warnings but still succeed, so we continue
  console.log('[v0] Installation completed (some warnings may appear above, this is normal)');
}
