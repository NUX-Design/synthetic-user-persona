# Synthetic User Persona

Skill สำหรับสร้าง `Synthetic User Persona`, จำลอง `Synthetic User Interview` และเตรียม `Synthetic Usability Testing` จากเอกสารผลิตภัณฑ์และข้อมูลวิจัยที่ผู้ใช้ให้มา

> Synthetic user คือสมมติฐานสำหรับ practice และการเตรียม test scenario ไม่ใช่หลักฐานจากผู้ใช้จริง ควรติดป้ายเป็น `E1: Hypothesis` จนกว่าจะได้รับการยืนยันด้วย real-user research, analytics, support data หรือ usability testing

## สิ่งที่อยู่ใน repo

```text
.
├── SKILL.md
├── README.md
├── references/
│   └── example-persona-and-transcript.md
└── scripts/
    └── validate-persona.mjs
```

- `SKILL.md` — กติกาสำหรับสร้าง persona และ role-play interview
- `references/example-persona-and-transcript.md` — ตัวอย่างโครงสร้าง persona และ transcript
- `scripts/validate-persona.mjs` — ตรวจโครงสร้าง persona และ OCEAN traits

## Source of Truth

อ่าน source ที่เกี่ยวข้องก่อนเริ่มงานทุกครั้ง:

| Source | ใช้สำหรับ |
|---|---|
| `PRD.md` | scope, requirements, use cases, acceptance criteria, business rules และ edge cases |
| `UX.md` | user context, flows, constraints, evidence และ validation plan |
| `Research Data` | transcript, survey, analytics, support tickets และ usability notes |
| Persona files | context, motivation, pain point, behavior และ speech pattern |
| Runtime จริง | screenshot, trace, console, network และผลทดสอบจาก Playwright/Maestro |

ถ้าข้อมูลไม่ครบหรือขัดแย้งกัน ให้คงค่า `ไม่ระบุ`, `unknown`, `[AMBIGUOUS]`, `[DRAFT]` หรือ `conflict` ไว้ ห้ามเติมข้อมูลแล้วรายงานเป็นข้อเท็จจริง

## Prompt Placeholder: สร้าง Personas

ใช้ prompt นี้เป็น template แล้วแทนค่าที่อยู่ใน `[วงเล็บ]`:

```text
อ่าน PRD.md, UX.md และ [RESEARCH_DATA_FILES]

ใช้ synthetic-user-persona สร้าง personas สำหรับ [PRODUCT/FEATURE/RESEARCH_GOAL]
สร้าง personas จำนวน [N] คน สำหรับกลุ่มเป้าหมาย [TARGET_SEGMENT]
ให้แต่ละ persona มีข้อมูลตามโครงสร้างใน SKILL.md พร้อม pain point, motivation, behavior และ speech pattern
ระบุสมมติฐานที่ยังไม่มีหลักฐานเป็น E1: Synthetic Hypothesis
ห้ามอ้าง synthetic persona เป็นผู้ใช้จริง

บันทึกผลเป็น [PERSONA_OUTPUT_PATH]
จากนั้นรัน:
node scripts/validate-persona.mjs [PERSONA_OUTPUT_PATH]

รายงาน source reference, assumptions, evidence level และ validation result
ถ้าข้อมูลไม่พอหรือขัดแย้งกัน ให้ระบุ unknown/[AMBIGUOUS]/conflict แทนการเดา
```

หากต้องการรัน interview ต่อ ให้ขอการยืนยันจากผู้ใช้ก่อน และใช้คำถามที่ผูกกับ `PRD.md`, `UX.md` หรือ `Research Data` อย่างชัดเจน

## Prompt Placeholder: Synthetic Usability Testing

ใช้ prompt นี้เมื่อมีเว็บที่รันได้จริงและต้องการทดสอบด้วย Playwright:

`[PRD_PATH]`, `[UX_PATH]`, `[PERSONA_FILES]` และ `[APP_URL]` เป็น placeholder ต้องแทนด้วย path/URL จริงก่อนใช้งาน โดย `[PERSONA_FILES]` ต้องเป็นรายการ persona ครบ 5 ไฟล์

```text
อ่าน [PRD_PATH], [UX_PATH] และ [PERSONA_FILES] ให้ครบทั้ง 5 ไฟล์

ใช้ synthetic-user-persona จำลอง usability testing ของ AI Hub
สร้าง test scenarios สำหรับทั้ง 5 personas
ผูกแต่ละ scenario กับ PRD section, UX flow หรือ acceptance criteria ที่เกี่ยวข้อง
จากนั้นใช้ Playwright ทดสอบเว็บจริงทีละ scenario ที่ [APP_URL]

บันทึกผลเป็น PASS, PARTIAL, FAIL หรือ BLOCKED
พร้อม evidence, emotional response, pain point และ design recommendation

สำหรับแต่ละ scenario ให้รายงาน:
- Persona และ task context
- PRD/UX/AC reference
- Preconditions และ expected result
- Status: PASS / PARTIAL / FAIL / BLOCKED
- Evidence path: screenshot, trace, URL, console หรือ network log
- Emotional response และ pain point จากมุม persona
- Design recommendation
- ข้อจำกัดและสิ่งที่ยังไม่ได้ทดสอบ

กติกา:
- Status ต้องมาจาก Playwright runtime จริง ไม่ใช่การเดาจาก source code
- Emotional response และ pain point จาก synthetic persona ให้ติดป้าย E1: Synthetic Hypothesis
- ถ้าเว็บ, login, browser หรือ test data ไม่พร้อม ให้รายงาน BLOCKED พร้อมหลักฐาน
- ห้ามแก้ source code เว้นแต่ได้รับคำสั่งโดยตรง
- สรุปผลรวมเป็นตาราง Scenario → Persona → Status → Evidence → Recommendation
```

ถ้าเป็น mobile ให้เปลี่ยน `Playwright` เป็น `Maestro` และเพิ่ม device/emulator, OS, app build และไฟล์ Maestro flow ใน inputs

## Test status

| Status | ความหมาย |
|---|---|
| `PASS` | ทำงานตรงตาม expected result และมี runtime evidence |
| `PARTIAL` | ทำงานได้บางส่วน แต่มี UX friction, missing state หรือข้อจำกัดที่ควรแก้ |
| `FAIL` | ไม่ตรงตาม expected result หรือพบ defect ที่ reproduce ได้ |
| `BLOCKED` | ทดสอบต่อไม่ได้จาก app, environment, login, device หรือ tooling |

ห้ามรายงาน `PASS` จากการอ่าน source code เพียงอย่างเดียว และห้ามเปลี่ยน `BLOCKED` เป็น `FAIL` โดยไม่มีหลักฐานจาก runtime

## รูปแบบรายงานที่แนะนำ

```text
Scenario
  -> Persona
  -> PRD / UX / AC reference
  -> Runtime evidence
  -> Status
  -> Emotional response และ pain point (E1 ถ้าเป็น synthetic)
  -> Design recommendation
  -> Validation action
```

Evidence level:

- `E0 Unknown` — ยังไม่มีข้อมูล
- `E1 Hypothesis` — สมมติฐานจาก synthetic persona หรือ inference
- `E2 Observed/Reported` — มีคนรายงานหรือพบจาก Research Data
- `E3 Validated` — ยืนยันด้วย real-user research, analytics, support data หรือ usability testing ที่มีหลักฐานครบ

## ตรวจ persona spec

```bash
node scripts/validate-persona.mjs path/to/persona.md
```

ตัวตรวจจะเช็กหัวข้อหลัก 5 ส่วน, demographic fields และ OCEAN traits ที่จำเป็น

## ข้อควรระวัง

- อย่าใส่ secret, token, password จริง หรือข้อมูลส่วนบุคคลที่ไม่จำเป็นลงใน repo หรือ prompt
- ใช้ test account และ fixture ที่ได้รับอนุญาตเท่านั้น
- อย่าใช้ competitor behavior เป็น product requirement โดยไม่มี source รองรับ
- อย่าแก้ `PRD.md` จากผล synthetic interview โดยอัตโนมัติ
- ถ้าทดสอบไม่ได้ ให้รายงาน `BLOCKED` พร้อมเหตุผลและหลักฐาน
