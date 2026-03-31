// server/index.js  — PATCHED
//
// Root cause of "secretOrPrivateKey must have a value":
//   dotenv.config() was called on line 5, but all static `import` statements
//   are hoisted before any code runs in ESM.  However, since process.env is
//   read inside function bodies (at call time, not import time), the real
//   cause is simply that no server/.env file was ever created.
//   dotenv.config() silently does nothing when the file is missing.
//
// Two fixes applied here:
//   1. Explicit dotenv path — works no matter which CWD you start from.
//   2. Fail-fast env guard — clear error at startup, not at first API call.
//
import { fileURLToPath } from 'url';
import { dirname, resolve }  from 'path';
import dotenv from 'dotenv';

// Resolve .env relative to THIS file, not process.cwd().
// This makes `npm run dev` work from both the project root and server/.
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

// Fail fast — surface missing vars immediately on startup.
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `\n[server] ❌ Missing required env vars: ${missing.join(', ')}\n` +
    `   → Copy server/.env.example to server/.env and fill in the values.\n`
  );
  process.exit(1);
}

// Static imports are hoisted above the dotenv call, but that is fine:
// every module that reads process.env does so inside function bodies,
// which only run after this module has fully initialised (i.e. after
// dotenv.config() has already populated process.env).
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] ✅ Running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});