#!/usr/bin/env node
/**
 * check-tokens.mjs — OrangeHueGlad token lint script
 *
 * Enforces that no hardcoded design values appear in component files.
 * Run: node scripts/check-tokens.mjs
 * CI:  exits 1 on violations so the GitHub Actions job fails.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');
const TOKENS_DIR = join(ROOT, 'src', 'tokens');

// ─── Patterns that must not appear in component files ───────────────────────

const FORBIDDEN = [
  {
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    description: 'Hardcoded hex color — use an --ohg-color-* token instead',
  },
  {
    // Font family strings that aren't token references
    pattern: /font-family:\s*['"]?(Nunito|Helvetica|Arial)/g,
    description: 'Hardcoded font-family — use var(--ohg-font-family-base) instead',
  },
];

// Extensions to check
const EXTENSIONS = new Set(['.scss', '.tsx', '.ts']);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function* walkDir(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walkDir(full);
    } else {
      yield full;
    }
  }
}

function isTokenFile(filePath) {
  return filePath.startsWith(TOKENS_DIR);
}

// ─── Main ────────────────────────────────────────────────────────────────────

let violations = 0;

for (const filePath of walkDir(COMPONENTS_DIR)) {
  const ext = filePath.slice(filePath.lastIndexOf('.'));
  if (!EXTENSIONS.has(ext)) continue;
  if (isTokenFile(filePath)) continue;

  const content = readFileSync(filePath, 'utf8');
  const rel = relative(ROOT, filePath);

  for (const { pattern, description } of FORBIDDEN) {
    // Reset lastIndex for global regexes used across iterations
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const lineNum = content.slice(0, match.index).split('\n').length;
      console.error(`\n  ✗  ${rel}:${lineNum}`);
      console.error(`     Found: "${match[0]}"`);
      console.error(`     Rule:  ${description}`);
      violations++;
    }
  }
}

if (violations > 0) {
  console.error(`\n${violations} token violation(s) found. Replace hardcoded values with --ohg-* tokens.\n`);
  process.exit(1);
} else {
  console.log('✓ No token violations found.');
}
