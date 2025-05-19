const levels = {
    silent: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  };
  
  const LOG_LEVEL = process.env['LOG_LEVEL'] ?? 'info';
  const activeLevel = levels[LOG_LEVEL.toLowerCase()] ?? 3;
  
  const color = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
  };
  
  const out = (tag, msg, clr) => console.log(`${tag} ${clr}${msg}${color.reset}`);
  
  export const log = {
    startTimer: (label = 'start') => console.time(`⏱ ${label}`),
    stopTimer: (label = 'start') => console.timeEnd(`⏱ ${label}`),
  
    error: (msg) => activeLevel >= 1 && out('❌ ERROR', msg, color.red),
    warn: (msg) => activeLevel >= 2 && out('⚠️  WARN', msg, color.yellow),
    info: (msg) => activeLevel >= 3 && out('ℹ️  INFO', msg, color.cyan),
    debug: (msg) => activeLevel >= 4 && out('🐛 DEBUG', msg, color.gray),
    success: (msg) => activeLevel >= 2 && out('✅ SUCCESS', msg, color.green)
  };
  
  