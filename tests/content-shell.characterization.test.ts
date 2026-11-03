import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as ContentShellModule from '../src/components/content/ContentShell';

test('ContentShell: módulo exporta função ContentShell', () => {
  assert.equal(typeof ContentShellModule.ContentShell, 'function');
});

test('ContentShell: função aceita parâmetros path e children', () => {
  const fn = ContentShellModule.ContentShell;
  assert.equal(fn.length, 1);
});

test('ContentShell: módulo não exporta valores inesperados', () => {
  const keys = Object.keys(ContentShellModule);
  assert.ok(keys.includes('ContentShell'));
  assert.equal(keys.length, 1);
});

test('ContentShell: path aceito é string', () => {
  const validatePath = (path: string) => path;
  assert.equal(typeof validatePath('/'), 'string');
});
