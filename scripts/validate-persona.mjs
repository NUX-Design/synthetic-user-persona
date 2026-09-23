// Validates that a persona spec markdown file contains every required
// section (per skills/user/synthetic-user-persona/SKILL.md template) and
// that each section has non-placeholder content. Supports files containing
// multiple "# Persona: ..." blocks.
//
// Usage: node validate-persona.mjs <persona-file.md>

import { readFile } from 'node:fs/promises';

const filePath = process.argv[2];
if (!filePath) throw new Error('Usage: validate-persona.mjs <persona-file.md>');

const text = await readFile(filePath, 'utf-8');

const REQUIRED_SECTIONS = [
  { key: '1', label: 'ข้อมูลพื้นฐาน (Demographics)' },
  { key: '2', label: 'บริบทการใช้ชีวิต' },
  { key: '3', label: 'Psychographics' },
  { key: '4', label: 'Personality (OCEAN)' },
  { key: '5', label: 'Speech Pattern' },
];

const REQUIRED_DEMOGRAPHIC_FIELDS = ['ชื่อ', 'อายุ', 'เพศ', 'ที่อยู่', 'อาชีพ'];
const REQUIRED_OCEAN_TRAITS = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];

// Split the file into one block per "# Persona: ..." heading.
const personaBlocks = text
  .split(/^# Persona:/m)
  .slice(1)
  .map((body, i) => ({ name: body.split('\n')[0].trim() || `#${i + 1}`, body: `# Persona:${body}` }));

if (personaBlocks.length === 0) {
  throw new Error('No "# Persona: <name>" heading found. Each persona must start with this heading.');
}

const errors = [];

for (const { name, body } of personaBlocks) {
  for (const section of REQUIRED_SECTIONS) {
    const heading = new RegExp(`^##\\s*${section.key}\\.\\s`, 'm');
    const match = heading.exec(body);
    if (!match) {
      errors.push(`[${name}] Missing section "## ${section.key}. ${section.label}"`);
      continue;
    }
    const startIdx = match.index + match[0].length;
    const nextHeading = /^##\s/m.exec(body.slice(startIdx));
    const sectionBody = nextHeading ? body.slice(startIdx, startIdx + nextHeading.index) : body.slice(startIdx);
    const meaningfulLines = sectionBody
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.startsWith('-') && l.replace(/^-\s*/, '').replace(/^[^:]*:\s*/, '').length > 0);
    if (meaningfulLines.length === 0) {
      errors.push(`[${name}] Section "## ${section.key}. ${section.label}" has no filled-in bullet content`);
    }
  }

  for (const field of REQUIRED_DEMOGRAPHIC_FIELDS) {
    const fieldRegex = new RegExp(`^-\\s*${field}\\s*:\\s*\\S`, 'm');
    if (!fieldRegex.test(body)) {
      errors.push(`[${name}] Missing or empty demographic field "${field}"`);
    }
  }

  for (const trait of REQUIRED_OCEAN_TRAITS) {
    const traitRegex = new RegExp(`^-\\s*${trait}\\s*:\\s*\\S`, 'm');
    if (!traitRegex.test(body)) {
      errors.push(`[${name}] Missing OCEAN trait "${trait}" with a value`);
    }
  }
}

if (errors.length > 0) {
  throw new Error(`Persona validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
}

console.log(`OK: ${personaBlocks.length} persona(s) passed validation (${personaBlocks.map((p) => p.name).join(', ')})`);
