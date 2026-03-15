import { execSync } from 'child_process';

try {
  console.log('Running npm install...');
  execSync('npm install', { 
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit'
  });
  console.log('Dependencies installed successfully!');
} catch (error) {
  console.error('Error installing dependencies:', error.message);
  process.exit(1);
}
