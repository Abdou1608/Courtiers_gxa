// scripts/wait-dist-server.ts
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout } from 'node:timers/promises';

const TARGET_PATH = resolve('dist/server/main.server.mjs');
const MAX_WAIT_MS = 30000;
const POLL_INTERVAL_MS = 500;

async function waitForFile(filePath: string, timeout: number) {
  const start = Date.now();
  while (!existsSync(filePath)) {
    if (Date.now() - start > timeout) {
      console.error(`⛔ Timeout: ${filePath} not found after ${timeout}ms`);
      process.exit(1);
    }
    await setTimeout(POLL_INTERVAL_MS);
  }
  console.log(`✅ Found: ${filePath}`);
}

waitForFile(TARGET_PATH, MAX_WAIT_MS);
