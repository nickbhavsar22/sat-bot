#!/usr/bin/env node

/**
 * Generates a SHA-256 hash for use with the SAT Bot password gate.
 *
 * Usage:
 *   node tools/hash-password.js YourPassword
 *
 * Then paste the output into .env as:
 *   VITE_APP_PASSWORD_HASH=<the hash>
 */

import { createHash } from 'node:crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node tools/hash-password.js <password>');
  console.error('Example: node tools/hash-password.js MySecretPass123');
  process.exit(1);
}

const hash = createHash('sha256').update(password).digest('hex');

console.log('');
console.log('SHA-256 hash of your password:');
console.log('');
console.log(`  ${hash}`);
console.log('');
console.log('Add this to your .env file:');
console.log('');
console.log(`  VITE_APP_PASSWORD_HASH=${hash}`);
console.log('');
