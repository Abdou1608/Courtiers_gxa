import dotenv from 'dotenv';
dotenv.config({ path: 'src/environments/.env.local' });

const keys = ['BUILD_TARGET', 'NODE_ENV', 'VITE_ENABLE_SOURCEMAP'];

console.log('🌍 Current environment variables (via .env.local):\n');
for (const key of keys) {
  const val = process.env[key];
  console.log(`- ${key.padEnd(25)} : ${val ?? '❌ not set'}`);
}
