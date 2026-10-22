#!/usr/bin/env node
import fs from "node:fs";
import { buildContextPack } from "./context-bundle.mjs";
const packs = {
  "category-pov-context-pack": "category-pov-doc-v1",
  "landing-page-hero-context-pack": "landing-page-hero-v1",
  "landing-page-section-context-pack": "landing-page-section-v1",
  "inbound-outline-context-pack": "inbound-outline-v1",
};
try {
  const check = process.argv.includes("--check");
  for (const [pack, view] of Object.entries(packs)) {
    const file = `packs/${pack}.md`;
    const content = buildContextPack(process.cwd(), `context/${view}.md`);
    if (check) {
      if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) throw new Error(`stale or missing ${file}; run npm run packs:build`);
    } else { fs.mkdirSync("packs", { recursive: true }); fs.writeFileSync(file, content); }
  }
  console.log(check ? "All four packs match their source and task contracts." : "Regenerated all four packs.");
} catch (error) { console.error(error.message); process.exitCode = 1; }
