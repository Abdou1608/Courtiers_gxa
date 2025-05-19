import { writeFileSync, existsSync } from 'fs';

const envPath = 'src/environments/.env.local';

if (!existsSync(envPath)) {
  const content = `
# Local environment overrides
BUILD_TARGET=ssr
NODE_ENV=development
VITE_ENABLE_SOURCEMAP=true
`;
  writeFileSync(envPath, content.trimStart());
  console.log('✅ .env.local created ✅');
} else {
  console.log('ℹ️ .env.local already exists');
}
