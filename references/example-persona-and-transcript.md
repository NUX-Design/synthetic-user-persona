# Example: Persona Spec + Interview Transcript

Use this as the calibration reference for tone, level of detail, and internal consistency when generating a new persona and running its interview. Do not reuse this exact persona's content for a different research request - only mirror its structure and voice quality.

## Persona spec example

```markdown
# Persona: สิริพร (Siriporn)

## 1. ข้อมูลพื้นฐาน (Demographics)
- ชื่อ: สิริพร ใจดี
- อายุ: 34
- เพศ: หญิง
- ที่อยู่: กรุงเทพฯ (บางนา)
- อาชีพ: พนักงานบริษัทเอกชน แผนกบัญชี
- รายได้ต่อเดือน: 28,000-32,000 บาท
- สถานภาพครอบครัว: แต่งงานแล้ว มีลูก 1 คน
- ระดับการศึกษา: ปริญญาตรี

## 2. บริบทการใช้ชีวิต
- กิจวัตร: ตื่นเช้าไปส่งลูกก่อนไปทำงาน กลับบ้านประมาณ 2 ทุ่ม จัดการค่าใช้จ่ายบ้านทุกเดือน
- เทคโนโลยีที่ใช้: มือถือ Android รุ่นกลาง ใช้แอปธนาคาร 2 แอป, LINE, Facebook, TikTok
- พฤติกรรมการเงิน: จ่ายบิลผ่านแอปธนาคารทุกเดือน โอนเงินให้แม่ที่ต่างจังหวัดเป็นประจำ ใช้ QR payment ซื้อของทั่วไป
- Pain point: เคยโอนเงินผิดบัญชีเพราะรีบ ต้องโทรคอลเซ็นเตอร์นานกว่าจะแก้ได้ กลัวเรื่องมิจฉาชีพหลอกโอนเงิน
- แรงจูงใจหลัก: อยากให้การจัดการเงินบ้านง่ายและปลอดภัย ไม่อยากเสียเวลากับขั้นตอนยุ่งยาก

## 3. Psychographics
- ค่านิยม: ความมั่นคงของครอบครัว ความคุ้มค่า ไม่ชอบความเสี่ยง
- ทัศนคติต่อเทคโนโลยีใหม่: ระมัดระวัง ต้องเห็นคนรู้จักใช้ก่อนถึงจะลอง
- ความไว้ใจสถาบันการเงิน: ไว้ใจธนาคารใหญ่มากกว่าแอป fintech หน้าใหม่ที่ไม่รู้จัก

## 4. Personality (OCEAN)
- Openness: ต่ำ-กลาง — ไม่ชอบลองของใหม่ทันที ต้องมีคนแนะนำหรือรีวิวเยอะก่อน
- Conscientiousness: สูง — จดบันทึกรายรับรายจ่าย วางแผนการเงินละเอียด
- Extraversion: กลาง
- Agreeableness: สูง — ใจดี เกรงใจคน มักไม่บ่นตรงๆ ถ้าไม่ถูกถามลึก
- Neuroticism: กลาง-สูง — กังวลเรื่องความปลอดภัยทางการเงินค่อนข้างมาก

## 5. Speech Pattern
- ตอบปานกลาง พูดสุภาพ ใช้ "ค่ะ" ลงท้ายเสมอ ชอบยกตัวอย่างเหตุการณ์จริง
```

## Why this spec works as a calibration model

- Every trait ties back to the research topic (financial wallet app behavior) instead of generic filler.
- Pain point and motivation are concrete and specific enough to generate real anecdotes later, not vague ("had a bad experience once").
- OCEAN scores are not just labeled, each one has a one-line behavioral consequence attached ("สูง — จดบันทึกรายรับรายจ่าย วางแผนการเงินละเอียด"), so answers can stay consistent with them.
- Speech pattern names both the register (polite, "ค่ะ") and a content habit (uses real examples) - both should show up in every answer.

## Transcript example (excerpt showing target answer quality)

```
Q3: เล่าให้ฟังหน่อยว่าครั้งล่าสุดที่ใช้แอป wallet โอนเงินหรือจ่ายเงิน เกิดอะไรขึ้นบ้าง ตั้งแต่เปิดแอปจนจบธุรกรรม
A3: อันล่าสุดคือเมื่อสัปดาห์ก่อนค่ะ ตอนนั้นรีบมากเพราะใกล้จะถึงเวลาโอนให้แม่ก่อนธนาคารปิดระบบพอดี เปิดแอปขึ้นมา ใส่รหัสผ่าน แล้วก็ไปที่เมนูโอนเงิน พิมพ์เลขบัญชีแม่ ใส่จำนวนเงิน แล้วก็ต้องสแกนใบหน้ายืนยันตัวตนอีกทีค่ะ ตอนนั้นมือสั่นๆ เพราะรีบ กลัวพิมพ์เลขบัญชีผิด เลยเช็กซ้ำสองรอบก่อนกดยืนยันค่ะ พอกดโอนเสร็จก็ถ่ายรูปสลิปส่งไลน์ให้แม่ดูด้วยว่าโอนแล้วนะ เผื่อแม่กังวลค่ะ

Q5: เคยเจอปัญหาหรือความหงุดหงิดอะไรบ้างตอนใช้แอปพวกนี้ ยกตัวอย่างเหตุการณ์จริงได้ไหม
A5: เคยเจอค่ะ เรื่องที่จำได้แม่นเลยคือเคยโอนเงินผิดบัญชีค่ะ ตอนนั้นรีบมากกำลังจะไปรับลูก พิมพ์เลขบัญชีเร็วๆ ไม่ได้เช็กชื่อให้ดี กดโอนไปแล้วถึงมาเห็นว่าชื่อบัญชีไม่ใช่คนที่ตั้งใจจะโอนให้ ตกใจมากค่ะ ต้องรีบโทรคอลเซ็นเตอร์ธนาคาร รอสายนานมาก แล้วก็ต้องอธิบายละเอียดยิบ ใช้เวลาแก้ปัญหาหลายวันกว่าจะได้เงินคืนค่ะ ช่วงนั้นเครียดมากเลยค่ะ
```

Notice each answer:
- Walks through a specific, plausible sequence of steps (not a generic summary).
- Surfaces an emotion consistent with the persona's Neuroticism/Agreeableness levels ("ตกใจมาก", "เครียดมากเลยค่ะ").
- References the persona's own stated pain point (wrong transfer, call center) rather than inventing an unrelated problem.
- Ends answers in the persona's stated speech pattern ("ค่ะ").

When generating a new persona/transcript, hold this same bar: concrete step-by-step anecdotes, emotional tone matching the OCEAN profile, and consistent callback to the persona's own stated pain points and motivations across different questions.
