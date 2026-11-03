import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const MAX_LINES = 100;
const rootDir = join(process.cwd(), 'src');
const filesToCheck = [];

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
      filesToCheck.push(fullPath);
    }
  }
}

function countLines(content) {
  if (!content) return 0;
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines.length;
}

await walk(rootDir);

let violations = 0;
console.log(`[STE-DEV R-03] Auditando ${filesToCheck.length} arquivos em src/...`);

for (const filePath of filesToCheck) {
  const content = await readFile(filePath, 'utf8');
  const lineCount = countLines(content);
  const relPath = relative(process.cwd(), filePath).replace(/\\/g, '/');

  if (lineCount > MAX_LINES) {
    console.error(`❌ [R-03 VIOLAÇÃO] ${relPath}: ${lineCount} linhas (máximo permitido: ${MAX_LINES})`);
    violations++;
  } else {
    console.log(`✅ [R-03 OK] ${relPath} (${lineCount}L)`);
  }
}

if (violations > 0) {
  console.error(`\n❌ Falha no guardrail R-03: ${violations} arquivo(s) excedem 100 linhas.`);
  process.exit(1);
} else {
  console.log(`\n🎉 Todos os ${filesToCheck.length} arquivos respeitam estritamente a regra R-03 (<= 100 linhas).`);
}

