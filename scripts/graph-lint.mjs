#!/usr/bin/env node
import { inspectGraph } from "./graph-validation.mjs";
const graph = inspectGraph(process.cwd());
for (const warning of graph.warnings) console.warn(`Warning: ${warning}`);
if (graph.errors.length) {
  console.error(`Graph lint found ${graph.errors.length} issue(s):\n- ${graph.errors.join("\n- ")}`);
  process.exitCode = 1;
} else console.log(`Graph lint OK (${graph.nodes.size} nodes, ${graph.support.length} support documents). Structural consistency only; approval, freshness, truth, and writing quality are not verified.`);
