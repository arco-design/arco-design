#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const yaml = require('yaml');

const ROOT = path.resolve(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT, 'knowledge', 'ai', 'component-metadata.schema.json');

function loadSchema() {
  const raw = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function parseYamlWithCst(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const doc = yaml.parseDocument(content, { keepCstNodes: true });
  return { doc, content };
}

function jsonPointerToLine(doc, content, pointer) {
  try {
    const parts = pointer.split('/').slice(1);
    let node = doc.contents;
    for (const p of parts) {
      if (!node) break;
      if (node && node.type === 'MAP') {
        const item = node.items.find((it) => String(it.key && it.key.value) === p);
        node = item ? item.value : undefined;
      } else if (node && node.type === 'SEQ') {
        const idx = Number(p);
        node = node.items[idx];
      } else {
        node = undefined;
      }
    }
    const range = node && node.range ? node.range : doc.range;
    if (!range) return null;
    const start = range[0];
    const before = content.slice(0, start);
    const line = before.split(/\r?\n/).length;
    return line;
  } catch (e) {
    return null;
  }
}

function validateMeta(metaPath) {
  const schema = loadSchema();
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const { doc, content } = parseYamlWithCst(metaPath);
  const data = doc.toJSON();
  const valid = validate(data);
  if (valid) {
    return [];
  }
  const errors = validate.errors || [];
  return errors.map((err) => {
    const pointer = err.instancePath || '';
    const line = jsonPointerToLine(doc, content, pointer);
    return {
      file: metaPath,
      pointer,
      line,
      message: `${err.schemaPath} ${err.message}`,
    };
  });
}

function checkApiCompleteness(componentDir, metaData) {
  const zhReadme = path.join(componentDir, 'README.zh-CN.md');
  const enReadme = path.join(componentDir, 'README.md');
  const readmePath = fs.existsSync(zhReadme) ? zhReadme : enReadme;
  if (!fs.existsSync(readmePath)) {
    return [{ level: 'warn', message: `README not found in ${componentDir}` }];
  }
  const md = fs.readFileSync(readmePath, 'utf-8');
  const propSetFromMD = new Set();
  const lines = md.split(/\r?\n/);
  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\|\s*(属性|参数|Prop|Param|Name)\s*\|/i.test(trimmed)) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (/^\|\s*-+\s*\|/.test(trimmed)) {
        continue;
      }
      if (!trimmed.startsWith('|')) {
        inTable = false;
        continue;
      }
      const cells = trimmed.split('|').map((c) => c.trim());
      const nameCell = cells[1];
      if (nameCell) {
        const name = nameCell.replace(/`/g, '').split(/[\s,]+/)[0];
        if (name) propSetFromMD.add(name);
      }
    }
  }

  const metaProps = metaData.api && metaData.api.props ? metaData.api.props.map((p) => p.name) : [];
  const missing = [...propSetFromMD].filter((name) => !metaProps.includes(name));
  const extra = metaProps.filter((name) => !propSetFromMD.has(name));
  const report = [];
  if (missing.length) {
    report.push({ level: 'error', message: `Missing props in metadata: ${missing.join(', ')}` });
  }
  if (extra.length) {
    report.push({
      level: 'warn',
      message: `Props present in metadata but not README: ${extra.join(', ')}`,
    });
  }
  return report;
}

function loadYaml(metaPath) {
  const raw = fs.readFileSync(metaPath, 'utf-8');
  return yaml.parse(raw);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(
      'Usage: node scripts/validate-meta.js <path/to/.meta.yaml> [--check-api <components/Dir>]'
    );
    process.exit(1);
  }
  const metaPath = path.resolve(args[0]);
  const errors = validateMeta(metaPath);
  if (errors.length) {
    for (const e of errors) {
      const loc = e.line ? `:${e.line}` : '';
      console.error(`${e.file}${loc} ${e.message} (at ${e.pointer || '/'})`);
    }
    process.exit(2);
  }
  console.log(`Schema validation passed for ${metaPath}`);
  const apiIdx = args.indexOf('--check-api');
  if (apiIdx !== -1) {
    const compDirArg = args[apiIdx + 1];
    if (!compDirArg) {
      console.error('--check-api requires a components directory path');
      process.exit(3);
    }
    const compDir = path.resolve(compDirArg);
    const metaData = loadYaml(metaPath);
    const report = checkApiCompleteness(compDir, metaData);
    for (const r of report) {
      const prefix = r.level === 'error' ? 'ERROR' : 'WARN';
      console[r.level === 'error' ? 'error' : 'warn'](`[${prefix}] ${r.message}`);
    }
    const hasError = report.some((r) => r.level === 'error');
    if (hasError) process.exit(4);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateMeta, checkApiCompleteness };
