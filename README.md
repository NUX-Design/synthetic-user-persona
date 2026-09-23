# Synthetic User Persona

Skill สำหรับสร้าง `Synthetic User Persona`, จำลอง `Synthetic User Interview` และเตรียมสถานการณ์สำหรับ `Usability Testing` โดยยึดข้อมูลจากเอกสารผลิตภัณฑ์และหลักฐานวิจัยที่ผู้ใช้ให้มา

> Synthetic user เป็นเครื่องมือสำหรับ rehearsal, hypothesis generation และการเตรียม test scenario เท่านั้น ไม่ใช่หลักฐานจากผู้ใช้จริง และผลลัพธ์ควรถูกติดป้ายเป็น `E1: Hypothesis` จนกว่าจะได้รับการยืนยันด้วยผู้ใช้จริง, analytics, support data หรือ usability testing

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

- `SKILL.md` — กติกาหลักสำหรับสร้าง persona และ role-play interview
- `references/example-persona-and-transcript.md` — ตัวอย่างโครงสร้างและคุณภาพคำตอบ
- `scripts/validate-persona.mjs` — ตรวจโครงสร้าง persona และ OCEAN traits

## หลักฐานและ Source of Truth

ก่อนเริ่มงาน ให้ระบุไฟล์ที่ใช้เป็น source ให้ชัดเจน:

| แหล่งข้อมูล | ใช้ตอบคำถามอะไร |
|---|---|
| `PRD.md` | scope, requirements, use cases, acceptance criteria, business rules, edge cases และ out-of-scope |
| `Product.md` หรือ product brief | vision, positioning, audience, value proposition และ business context ถ้ามี |
| `Research Data` | interview transcript, survey, analytics, support tickets, usability notes หรือข้อมูลวิจัยที่ผู้ใช้ให้มา |
| `UX.md` | user context, flows, evidence, constraints และ validation plan ถ้ามี |
| runtime จริง | หลักฐานจากการทดสอบ Playwright/Maestro เช่น screenshot, trace, console และ test result |

หากข้อมูลขาดหายหรือขัดแย้งกัน ให้เขียน `ไม่ระบุ`, `unknown`, `[AMBIGUOUS]`, `[DRAFT]` หรือ `conflict` ตามต้นฉบับ ห้ามเติมข้อมูลด้วยการคาดเดาแล้วรายงานเป็นข้อเท็จจริง

## ตรวจ persona spec

เมื่อสร้างไฟล์ persona แล้ว ให้รัน:

```bash
node scripts/validate-persona.mjs path/to/persona.md
```

ตัวตรวจจะเช็กว่าแต่ละ persona มีหัวข้อหลัก 5 ส่วน, ข้อมูลพื้นฐานที่จำเป็น และ OCEAN ครบทุก trait

## Workflow A: Synthetic User Interview

ใช้ workflow นี้เมื่อเป้าหมายคือการซ้อมสัมภาษณ์, สำรวจสมมติฐาน, สร้าง proto journey map หรือเตรียมคำถามก่อนทำวิจัยจริง

### Inputs ที่ควรมี

- `PRD.md` และ section/requirement ที่ต้องการศึกษา
- `Research Data` ที่มีอยู่จริง เช่น transcript, survey, analytics หรือ support data
- research goal / product decision ที่ต้องการตอบ
- target segment ของ persona
- จำนวน persona
- คำถามสัมภาษณ์ หรืออนุญาตให้ร่างคำถามจาก goal
- ภาษาหรือน้ำเสียงของ persona

### สิ่งที่ prompt ต้องบังคับ

1. อ่าน `PRD.md` และ Research Data ก่อนสร้าง persona
2. แยก `observed/reported` ออกจาก `inference` และ `synthetic hypothesis`
3. ไม่สร้าง persona จากข้อมูลว่างเปล่าโดยไม่ระบุสมมติฐาน
4. ผูก pain point และคำตอบกลับไปยัง source section หรือ research item
5. สร้าง persona spec แล้ว validate ก่อนเริ่ม interview
6. ขอการยืนยันจากผู้ใช้ก่อนรัน interview
7. สรุปผลเป็น `finding → evidence → implication → validation action`

### Prompt พร้อมใช้: สร้าง persona และเตรียม interview

คัดลอก prompt นี้ไปใช้กับ agent ที่เปิด repo นี้:

```text
คุณเป็น Synthetic UX Research Assistant ที่ทำงานแบบ source-grounded

เป้าหมาย:
สร้าง Synthetic User Persona และเตรียม Synthetic User Interview สำหรับ [ระบุ product/feature/research decision]

ให้ทำตามลำดับนี้:

1. อ่านไฟล์ต่อไปนี้ก่อน ห้ามเริ่มจากการเดา:
   - PRD: [path ของ PRD.md]
   - Research Data: [paths ของ transcript/survey/analytics/support data]
   - Product/UX context: [path ถ้ามี หรือระบุว่าไม่มี]

2. สรุป source map สั้น ๆ:
   - research goal และ decision ที่ต้องการช่วยตอบ
   - target segment ที่ระบุในเอกสาร
   - relevant user flow, requirement, business rule และ acceptance criteria
   - research evidence ที่เป็น E2 Observed/Reported
   - จุดที่เป็น E0 Unknown, [AMBIGUOUS], [DRAFT] หรือข้อมูลขัดแย้ง

3. สร้าง persona จำนวน [N] คน ตาม segment ที่กำหนด
   - ทุก persona ต้องมีโครงสร้างตาม SKILL.md
   - ระบุให้ชัดว่าเป็น E1 Synthetic Hypothesis
   - ห้ามอ้าง persona เป็นผู้ใช้จริง
   - ผูก trait, pain point, motivation และพฤติกรรมกับ source ที่อ่านมา
   - หากข้อมูลไม่พอ ให้เขียนสมมติฐานที่จำเป็นและวิธี validate แทนการแต่งเป็นข้อเท็จจริง

4. บันทึก persona ลงไฟล์ [path ของ persona output].md แล้วรัน:
   node scripts/validate-persona.mjs [path ของ persona output].md
   ถ้า validation ไม่ผ่าน ให้แก้และรันซ้ำจนผ่าน

5. หยุดหลัง validation และถามฉันก่อนว่า “ต้องการให้รัน interview ต่อหรือไม่”
   ห้ามรัน interview อัตโนมัติ

รูปแบบผลลัพธ์รอบนี้:
- Source map
- Assumptions และ evidence level
- Persona file path
- Validation command และผลลัพธ์
- คำถามยืนยันก่อนเริ่ม interview
```

### Prompt พร้อมใช้: รัน interview และสังเคราะห์ผล

ใช้หลังจาก persona ผ่าน validation และผู้ใช้ยืนยันให้รันแล้วเท่านั้น:

```text
รัน Synthetic User Interview ตาม persona file นี้: [path]

Research goal: [goal]
คำถามสัมภาษณ์:
[วางคำถาม หรือให้ร่างจาก PRD.md และ goal]

กติกา:
- ตอบเป็นบุคคลตาม persona เท่านั้น ใช้ first person และ speech pattern ที่ระบุไว้
- อ้างอิงเหตุการณ์ที่สอดคล้องกับบริบทของ persona แต่ห้ามสร้างหลักฐานว่าเป็นผู้ใช้จริง
- คำตอบทั้งหมดติดป้าย E1 Synthetic Hypothesis
- ห้ามแก้ไข PRD requirements หรือยกระดับสมมติฐานเป็น E2/E3
- หากคำถามอยู่นอกบริบท ให้ตอบว่าไม่ทราบ/ไม่เกี่ยวข้อง แทนการเดา

บันทึกผลลง [path ของ interview output].md โดยมีหัวข้อตามลำดับ:
1. Metadata
2. Persona summary
3. Full transcript แบบ Q1/A1, Q2/A2
4. Pain Points & Insights โดยอ้างเลขคำถามทุกข้อ
5. Suggested next steps for design

ในส่วนสรุป ให้ใช้ตาราง:
finding | transcript evidence | source/PRD reference | implication | validation action | evidence level
```

## Workflow B: Synthetic Usability Testing

ใช้ workflow นี้เมื่อมีเว็บหรือแอปที่รันได้ และต้องการจำลองงานตาม persona พร้อมตรวจ behavior จาก runtime จริงด้วย Playwright หรือ Maestro

Synthetic persona ช่วยกำหนด motivation, context และความคาดหวังของผู้ทดสอบ แต่ผล `PASS/FAIL` ต้องมาจาก runtime assertion และหลักฐานที่เก็บได้ ไม่ใช่จากคำตอบที่ persona จำลองขึ้นมา

### Inputs ที่ควรมี

- `PRD.md` และ acceptance criteria ที่จะทดสอบ
- app URL หรือคำสั่ง start server
- test account / fixture ที่ได้รับอนุญาต
- persona และ task context
- platform, viewport, browser หรือ device/emulator
- ขอบเขตที่ต้องทดสอบและ path สำหรับเก็บ artifact

### Test status ที่ต้องใช้

| Status | ความหมาย |
|---|---|
| `PASS` | behavior และ expected result ตรงตาม requirement พร้อม evidence |
| `FAIL` | runtime ทำงานไม่ตรง expected result พร้อม evidence |
| `BLOCKED` | เริ่มทดสอบต่อไม่ได้ เช่น app ไม่รัน, login ไม่มี, device disconnected หรือ tool ใช้งานไม่ได้ |
| `NOT RUN` | อยู่นอก scope หรือยังไม่ได้เริ่มทดสอบ |

ห้ามรายงาน `PASS` จากการอ่าน source code เพียงอย่างเดียว และห้ามเปลี่ยน `BLOCKED` เป็น `FAIL` โดยไม่มีหลักฐานจาก product runtime

### Prompt สำหรับ Playwright Web Testing

```text
คุณเป็น QA/UX Testing Agent ให้ทดสอบเว็บจริงด้วย Playwright

Source of truth:
- PRD: [path ของ PRD.md]
- UX/Design: [path ถ้ามี]
- Persona: [path ของ persona]
- App URL: [URL]
- Test account/fixture: [รายละเอียดที่ได้รับอนุญาต]

ขอบเขต:
- Flow/requirement: [เช่น sign up, checkout, transfer]
- Acceptance criteria: [AC IDs หรือให้ค้นจาก PRD]
- Viewports: [desktop และ mobile widths]
- Artifact directory: [path เช่น .playwright-mcp]

ขั้นตอน:
1. อ่าน PRD และดึง requirement, precondition, happy path, edge case และ expected result
2. ทำ traceability matrix: test ID → PRD section/AC → action → assertion → evidence
3. เปิด URL จริงก่อนเริ่มทดสอบ ห้ามสรุปจาก source code หรือ mock ที่ไม่ได้รัน
4. ใช้ locator ที่เข้าถึงได้ เช่น role, label, text หรือ test id ที่มีอยู่จริง ห้ามเดา selector
5. จำลอง context ของ persona ใน task แต่ตัดสิน PASS/FAIL จาก deterministic assertion เท่านั้น
6. ตรวจ keyboard path, visible state, validation/error state, responsive behavior และ focus/accessible name ตาม scope
7. เก็บ screenshot/trace เมื่อมี failure และบันทึก console/network error ที่เกี่ยวข้อง
8. แยก product defect, test/tooling issue และ unrelated error ออกจากกัน

รายงานเป็น Markdown:
- Environment และ commit/URL ที่ทดสอบ
- Test matrix พร้อม status PASS/FAIL/BLOCKED/NOT RUN
- Evidence path ของแต่ละ test
- Failure reproduction steps
- Requirement/AC ที่ได้รับผลกระทบ
- UX observation จากมุม persona โดยติดป้าย E1 ถ้ายังไม่ได้ยืนยันกับผู้ใช้จริง
- สรุป coverage และข้อจำกัด

ถ้า Playwright เริ่มที่ about:blank ให้ navigate ไปยัง App URL ก่อน
ถ้า app เปิดไม่ได้, login ไม่พร้อม หรือ browser/tool ไม่เชื่อมต่อ ให้หยุด test นั้นเป็น BLOCKED และระบุหลักฐาน
ห้ามแก้ source code เว้นแต่ฉันสั่งให้แก้โดยตรง
```

### Prompt สำหรับ Maestro Mobile Testing

```text
คุณเป็น QA/UX Testing Agent ให้ทดสอบ mobile app จริงด้วย Maestro

Source of truth:
- PRD: [path ของ PRD.md]
- UX/Design: [path ถ้ามี]
- Persona: [path ของ persona]
- App/package/bundle: [รายละเอียด]
- Device/emulator: [รุ่น, OS, orientation]
- Test account/fixture: [รายละเอียดที่ได้รับอนุญาต]
- Artifact directory: [path สำหรับ screenshots และผลทดสอบ]

ขอบเขต:
- Flow/requirement: [ชื่อ flow]
- AC IDs: [รายการ]
- Permission, network และ seeded data ที่ต้องเตรียม: [รายละเอียด]

ขั้นตอน:
1. อ่าน PRD แล้วแตกเป็น Maestro flow ที่ตรวจสอบได้จริง
2. ระบุ precondition, test data, accessibility identifier และ expected state ของทุก step
3. ตรวจว่า device/emulator และ app เชื่อมต่อได้ก่อนเริ่ม ถ้าไม่พร้อมให้รายงาน BLOCKED
4. ใช้ accessibility label/id และ assertion ที่มีอยู่จริง ห้ามเดาจากตำแหน่งบนหน้าจอ
5. จำลอง context ของ persona เพื่อเลือก task และ priority แต่ PASS/FAIL ต้องมาจาก UI state หรือ assertion จริง
6. ครอบคลุม happy path, validation, cancel/back, loading/error และ permission state ตาม PRD
7. เก็บ screenshot/video/log ที่เกี่ยวข้องกับ failure และบันทึก device/OS/app build
8. แยกปัญหา app, test flow, device และ tooling ออกจากกัน

ส่งมอบ:
- ไฟล์ Maestro YAML ที่สร้างหรือใช้
- test matrix: test ID → PRD/AC → flow → expected → status
- screenshot/log/evidence path
- failure พร้อม reproduction steps
- UX observation จากมุม persona โดยติดป้าย E1 เมื่อเป็น synthetic hypothesis
- coverage และข้อจำกัด

ห้ามสรุปว่า test ผ่านจาก YAML ที่ parse ได้เพียงอย่างเดียว ต้องมี runtime evidence
ห้ามแก้ source code เว้นแต่ฉันสั่งให้แก้โดยตรง
```

## แนวทางรายงานผลที่แนะนำ

ใช้โครงสร้างนี้เพื่อไม่ปะปนระหว่าง research insight กับ test result:

```text
Finding
  -> Evidence จาก transcript / runtime
  -> PRD, UX หรือ AC reference
  -> Implication ต่อ flow หรือ interaction
  -> Validation action
  -> Evidence level: E0 / E1 / E2 / E3
```

- `E0 Unknown` — ยังไม่มีข้อมูล
- `E1 Hypothesis` — สมมติฐานจาก synthetic persona หรือ inference
- `E2 Observed/Reported` — มีคนรายงานหรือพบจากข้อมูลวิจัยที่มีอยู่
- `E3 Validated` — ยืนยันด้วย real-user research, analytics, support data หรือ usability testing ที่มีหลักฐานครบ

## ข้อควรระวัง

- อย่าใส่ secret, token, password จริง หรือข้อมูลส่วนบุคคลที่ไม่จำเป็นลงใน repo หรือ prompt
- ใช้ test account และ fixture ที่ได้รับอนุญาตเท่านั้น
- อย่าใช้ competitor behavior เป็น product requirement โดยไม่มี source รองรับ
- อย่าแก้ `PRD.md` จากผล synthetic interview โดยอัตโนมัติ
- ถ้าทดสอบไม่ได้ ให้รายงาน `BLOCKED` พร้อมเหตุผลและหลักฐาน ไม่ควรเดาผลลัพธ์
