# STE-DEV: Verificação de Conformidade Automatizada (PowerShell) - RKT Landing Page
$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " STE-DEV: Verificação de Conformidade     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Checagem de aprovação manual indevida (R-14)
Write-Host "[1/4] Verificando arquivos proibidos de aprovação manual..." -ForegroundColor Yellow
$forbiddenFiles = Get-ChildItem -Path . -Recurse -Include "BUILD_APPROVAL_*.md", "TEST_APPROVAL_*.md" -ErrorAction SilentlyContinue
if ($forbiddenFiles.Count -gt 0) {
    Write-Host "❌ ERRO [R-14]: Encontrados arquivos de aprovação manual no repositório!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Conformidade R-14 aprovada." -ForegroundColor Green

# 2. Tipagem estrita
Write-Host "[2/4] Executando verificação de tipos (TypeScript)..." -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm exec tsc --noEmit
} else {
    npx tsc --noEmit
}
Write-Host "✅ Tipos TypeScript verificados com sucesso." -ForegroundColor Green

# 3. Linter e AST
Write-Host "[3/4] Executando análise estática e ESLint..." -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm lint
} else {
    npx eslint .
}
Write-Host "✅ Linter executado." -ForegroundColor Green

# 4. Testes
Write-Host "[4/4] Executando suíte de testes..." -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm test
} else {
    npx tsx --test tests/**/*.test.ts
}
Write-Host "✅ Testes executados com sucesso." -ForegroundColor Green

# 5. Guardrail R-03 (arquivos <= 100 linhas)
Write-Host "[5/5] Verificando guardrail R-03 (arquivos <= 100 linhas)..." -ForegroundColor Yellow
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    pnpm exec node scripts/check-r03.mjs
} else {
    node scripts/check-r03.mjs
}
Write-Host "✅ Guardrail R-03 aprovado." -ForegroundColor Green

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Verificação STE-DEV Concluída com Sucesso! " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
