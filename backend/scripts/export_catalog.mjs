/**
 * Exports the plant catalog from src/data/plantsData.js into
 * backend/data/catalog.json, so the Python backend can validate
 * which plant names the LLM is allowed to recommend.
 *
 * Run from the project root (paradise-nursery/):
 *   node backend/scripts/export_catalog.mjs
 *
 * Re-run this any time plantsData.js changes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import storeData from '../../src/data/plantsData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '..', 'data', 'catalog.json');

const catalog = [];
for (const [department, categories] of Object.entries(storeData)) {
  for (const categoryGroup of categories) {
    for (const item of categoryGroup.items) {
      catalog.push({
        name: item.name,
        department,
        category: categoryGroup.category,
        price: item.price,
        info: item.info || null,
      });
    }
  }
}

fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n', 'utf-8');
console.log(`Exported ${catalog.length} items to ${path.relative(process.cwd(), outPath)}`);
