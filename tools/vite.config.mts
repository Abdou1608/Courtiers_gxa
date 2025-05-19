import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'fs';
import { resolve } from 'node:path';
let proxy = {};
if (fs.existsSync('proxy.conf.json')) {
    proxy = JSON.parse(fs.readFileSync('proxy.conf.json', 'utf-8'));
  }
// Détection du mode SSR ou Browser
const buildTarget = process.env['BUILD_TARGET'] ?? 'browser';
const isSSR = buildTarget === 'ssr';

const entryFile = resolve(isSSR ? 'src/main.server.ts' : 'src/index.html');
const outDir = resolve(isSSR ? 'dist/server' : 'dist/browser');

console.log(`🛠️ BUILD_TARGET: ${buildTarget}`);
console.log(`📄 Entry file: ${entryFile}`);
console.log(`📁 Output dir: ${outDir}`);

export default defineConfig({
  plugins: [angular({ inlineStylesExtension: 'scss' }), tsconfigPaths()],
  build: {
    ssr: isSSR,
    outDir,
    target: 'es2022',
    sourcemap: process.env['NODE_ENV'] === 'development',
    minify: process.env['NODE_ENV'] === 'production',
    rollupOptions: {
      input: isSSR ?  entryFile : undefined
    },
    ssrManifest: isSSR
  },
  resolve: {
    conditions: ['angular']
  },
  ssr: {
    noExternal: ['@angular/**', 'rxjs', '@ngrx/**']
  },
  server: {
    port: 4200,
    proxy,
    watch: {
      usePolling: true
    }
  }
});
