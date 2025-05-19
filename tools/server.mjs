// server.mjs
import '@angular/compiler';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SSR_OUTPUT_DIR = process.env.NODE_ENV === 'development' ? 'dev-server' : 'server';
const faviconPath = resolve(__dirname, './dist/browser/favicon.ico');
const ssrEntryPath = resolve(__dirname, `dist/${SSR_OUTPUT_DIR}/main.server.js`);
const browserIndex = resolve(__dirname, './dist/browser/index.html');

if (!existsSync(ssrEntryPath)) {
  throw new Error(`❌ SSR bundle not found: ${ssrEntryPath}`);
}

const { handleRequest } = await import(pathToFileURL(ssrEntryPath).href);

createServer(async (req, res) => {
  try {
    if (req.url === '/favicon.ico') {
      if (existsSync(faviconPath)) {
        const ico = await readFile(faviconPath);
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        return res.end(ico);
      } else {
        res.writeHead(204); // No Content
        return res.end();
      }
    }
    const html = await readFile(browserIndex, 'utf-8');
    const rendered = await handleRequest(req.url ?? '/', html);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(rendered);
  } catch (err) {
    console.error('❌ SSR Error:', err);
    res.writeHead(500);
    res.end('Erreur serveur lors du rendu SSR');
  }
}).listen(4200, () => {
  console.log('✅ SSR server running at http://localhost:4200');
});