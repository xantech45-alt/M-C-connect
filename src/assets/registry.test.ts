import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { products } from '@/state/catalog';
import { catalogAssets } from './registry';

const urlToKey = new Map(Object.entries(catalogAssets).map(([key, url]) => [url, key]));

function productImageSlots(product: (typeof products)[number]): Array<[string, string]> {
  const slots: Array<[string, string]> = [];
  if (product.imageUrl) slots.push(['imageUrl', product.imageUrl]);
  (product.gallery ?? []).forEach((src, i) => slots.push([`gallery[${i}]`, src]));
  return slots;
}

function walkSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(full, out);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

describe('asset registry - uniqueness contract (Gate D)', () => {
  it('every product imageUrl/gallery entry resolves to a key in the registry', () => {
    const unregistered: string[] = [];
    for (const product of products) {
      for (const [slot, src] of productImageSlots(product)) {
        if (!urlToKey.has(src)) unregistered.push(`${product.id}.${slot} -> ${src}`);
      }
    }
    expect(unregistered, `Unregistered asset references:\n${unregistered.join('\n')}`).toEqual([]);
  });

  it('no asset key is used in more than one product imageUrl/gallery slot', () => {
    const usage = new Map<string, string[]>();
    for (const product of products) {
      for (const [slot, src] of productImageSlots(product)) {
        const key = urlToKey.get(src) ?? src;
        const usages = usage.get(key) ?? [];
        usages.push(`${product.id}.${slot}`);
        usage.set(key, usages);
      }
    }
    const duplicates = [...usage.entries()].filter(([, usages]) => usages.length > 1);
    const report = duplicates.map(([key, usages]) => `  ${key}: ${usages.join(', ')}`).join('\n');
    expect(duplicates, `Duplicate asset usage (each photo may back only one product slot):\n${report}`).toEqual([]);
  });

  it('no source file hardcodes a raw catalog asset path instead of importing the registry', () => {
    const srcDir = path.resolve(__dirname, '..');
    const rawPathPattern = /['"`][^'"`]*assets\/catalog\/[^'"`]*['"`]/;
    const offenders: string[] = [];
    for (const file of walkSourceFiles(srcDir)) {
      if (file.endsWith(path.join('assets', 'registry.ts'))) continue;
      if (file.endsWith(path.join('assets', 'registry.test.ts'))) continue;
      const content = fs.readFileSync(file, 'utf-8');
      if (rawPathPattern.test(content)) offenders.push(path.relative(srcDir, file));
    }
    expect(offenders, `Files hardcoding a raw catalog asset path - use asset()/catalogIcon()/brandAsset() instead:\n${offenders.join('\n')}`).toEqual([]);
  });
});
