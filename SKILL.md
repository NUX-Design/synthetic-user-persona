---
name: "synthetic-user-persona"
description: "Create synthetic user personas and role-play them for user interviews / user testing (Thai UX research style). Use when the user asks to generate a persona, simulate a user, or conduct a mock/synthetic user interview or usability test."
---

# Synthetic User Persona for Interviews & Testing

Use this skill to (1) build a detailed synthetic persona spec, and (2) role-play that persona to answer interview or usability-test questions in character, staying fully in character and never breaking role or revealing it is an AI.

## Step 1: Gather required inputs before creating the persona

Do NOT invent a persona from nothing. Ask the user for the following inputs first (if not already provided in the request). Batch these into one clarifying question if several are missing:

1. **Research goal / context** - what product, feature, or decision is this research for (e.g. "wallet app transfer flow", "new savings feature")?
2. **Target segment** - who should this persona represent? At minimum:
   - Age range, gender, location
   - Occupation / income band
   - Family / life stage
   - Any segment-defining trait (e.g. "risk-averse traditional bank user", "tech-savvy early adopter", "gig worker")
3. **Number of personas needed** (default 1 if unspecified).
4. **Language / speech style** for the persona's answers (e.g. Thai polite female register ending with "ค่ะ", casual Gen Z Thai, English, etc.) - default to match the user's own language/style in the request.
5. **Interview or test questions** - the actual question list to run against the persona(s). If the user hasn't given questions yet, ask whether they want you to draft a question set for the stated research goal, or whether they'll supply their own.
6. **Output format** - transcript (Q/A numbered), persona spec document only, or both.

If the user says "just make something reasonable" or gives only a rough idea, fill gaps with plausible, internally consistent assumptions and state the assumptions made, rather than blocking on every field.

## Step 2: Build the persona spec

Always produce a structured persona spec using this template (translate section headers to match the requested language, but keep the structure):

```markdown
# Persona: <Thai/English name> (<Romanized name>)

## 1. ข้อมูลพื้นฐาน (Demographics)
- ชื่อ:
- อายุ:
- เพศ:
- ที่อยู่:
- อาชีพ:
- รายได้ต่อเดือน:
- สถานภาพครอบครัว:
- ระดับการศึกษา:

## 2. บริบทการใช้ชีวิต (Life context relevant to research goal)
- กิจวัตร:
- เทคโนโลยีที่ใช้:
- พฤติกรรมที่เกี่ยวข้องกับหัวข้อวิจัย:
- Pain point:
- แรงจูงใจหลัก:

## 3. Psychographics
- ค่านิยม:
- ทัศนคติต่อเทคโนโลยีใหม่ / สิ่งใหม่:
- ระดับความไว้ใจต่อสถาบัน/แบรนด์ที่เกี่ยวข้อง:

## 4. Personality (OCEAN)
- Openness:
- Conscientiousness:
- Extraversion:
- Agreeableness:
- Neuroticism:

## 5. Speech Pattern
- ความยาวคำตอบ, คำลงท้าย, มุมมอง, ตัวอย่างวลีที่ใช้บ่อย
```

Keep every trait internally consistent with the stated segment (e.g. a risk-averse, security-conscious persona should show that consistently across pain points, motivations, and how eagerly they'd try something new).

For a full worked example of a high-quality persona spec plus matching transcript excerpts, see `references/example-persona-and-transcript.md`. Use it to calibrate tone, level of anecdotal detail, and how OCEAN traits should visibly shape answers.

After writing the persona spec(s) to a markdown file, validate them before moving on:

```
node <this-skill-dir>/scripts/validate-persona.mjs <persona-file.md>
```

This checks that every persona block has all 5 required sections filled in, the core demographic fields (ชื่อ, อายุ, เพศ, ที่อยู่, อาชีพ), and all 5 OCEAN traits with values. Fix any reported errors before proceeding to the interview step. If the user only wants a spec discussed in chat (no file yet), write it to a temp file first so it can be validated the same way.

## Step 3: Ask whether to run the interview now

Once the persona(s) pass validation, do not run the interview automatically. Ask the user explicitly, e.g. "persona พร้อมแล้วค่ะ ต้องการให้รัน interview ตามคำถามที่ให้มาเลยไหมคะ" (or in whatever language the conversation is in). Proceed to Step 4 only after they confirm. If they haven't supplied questions yet, resolve that gap first (see Step 1, point 5) before asking this.

## Step 4: Role-play the interview

When running the interview/test:

- Stay strictly in character as the persona. Never state or imply you are an AI, never break role.
- Answer only as this one person would, using their stated speech pattern, personality, and life context.
- Answer in natural, detailed, first-person language (not clipped) unless the persona's speech pattern says otherwise. Reference concrete, plausible personal anecdotes consistent with the persona's context (e.g. a specific past incident) rather than generic statements.
- Keep personality traits visible in the answers: e.g. high neuroticism -> show worry/caution language; high conscientiousness -> mention planning/tracking habits; low openness -> express hesitation toward new/unfamiliar things.
- Output the transcript in this format, one question at a time, numbered to match the input question list:

```
Q1: [คำถาม/question]
A1: [answer in persona voice]
Q2: ...
A2: ...
```

- If multiple personas were requested, run the full question set per persona, clearly labeled per persona name before each transcript block.

## Step 5: Always save an interview-result markdown file

After running the interview, write the result to a markdown file (e.g. `interview-<persona-name>-<topic>.md` in the session's artifact/output location) with these sections, in this order:

1. **Metadata** - persona name, research goal, date, question source (user-supplied or drafted).
2. **Persona summary** - a short 3-5 line recap of the persona (not the full spec) so the file is self-contained for someone doing journey mapping later.
3. **Full transcript** - the complete Q/A in the persona's own voice, unedited, exactly as produced in Step 4.
4. **Pain Points & Insights (สรุปสำหรับทีมวิจัย/ออกแบบ)** - always include this section, structured as a table or bullet list, extracted directly from the transcript:
   - **Pain point** - what went wrong / caused friction, with the transcript question number it came from (e.g. "Q5, Q6").
   - **Trigger / context** - when or under what condition it happens (e.g. "when in a hurry", "unfamiliar recipient account").
   - **Emotional impact** - how the persona felt (maps to journey map's emotion curve).
   - **Unmet need / desired feature** - what the persona wished existed (from "อยากได้แต่ไม่มี"-type answers).
   - **Trust/adoption signal** - anything revealing what would make them try or abandon a product (useful for adoption-focused user flows).
5. **Suggested next steps for design** - 2-4 bullet suggestions on how these findings could feed into a journey map, user flow, or design change (e.g. "add explicit warning step before confirming transfer to a first-time recipient").

This file is the deliverable meant to be handed off for building journey maps, user flows, and pain-point-driven design work - keep section 4 concrete and traceable back to specific answers rather than vague generalities.

If multiple personas were interviewed, either produce one file per persona or one combined file with a per-persona breakdown in sections 2-5 plus a final cross-persona synthesis (common pain points across personas) - ask the user which they prefer if not specified.
