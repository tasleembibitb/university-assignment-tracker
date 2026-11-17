# University Assignment Tracker

A single-page web app that tracks university assignments — subject, topic,
teacher and due date for each one, with separate checklists for the soft
copy and the hard copy, so nothing is late and nothing is sent to the
wrong place.

Built by **Tasleem Bibi** (final-year BSCS, Begum Nusrat Bhutto Women
University, Sukkur, Sindh, Pakistan) as a unique, practical project for her
own final-year studies: a Computer Assembly Language assignment on computer
processors, and a Software Engineering assignment whose topic still needs
confirming with the teacher.

## How to run

No build step and no server needed:

1. Open `index.html` in any modern browser (double-click it, or serve the folder).
2. The tracker comes pre-filled with the demo example: **two real assignments**
   (Computer Assembly Language — Computer Processors; Software Engineering —
   topic to confirm).
3. Tick the soft-copy box when you send the file to the teacher, and the
   hard-copy box when you print it and submit it in class.
4. Add your own assignment with the form, or remove a sample one.
5. Your list is saved in your browser (localStorage), so it is still there
   when you come back.

## Features

- Per-assignment subject, topic, teacher and due date.
- **Soft copy / hard copy checklists** — send the file personally, print it
  for class.
- Due-date countdowns ("3 days left", "Due today", "Overdue by 2 days").
- Status flow: **Not started → In progress → Done**, with one-click moves.
- Filter by status, and a summary count of finished assignments.
- Saved in the browser — no account, no server, no personal data sent anywhere.
- Clean, professional design in dark navy and teal (TB branding),
  mobile-responsive. No personal photo, no fake logos.

## Demo result (pre-filled values)

On 17 November 2026 the demo list shows:

- **Computer Assembly Language** — Computer Processors (Core i3 / i5 / i7 / i9,
  RISC vs CISC, 32-bit vs 64-bit) — In progress, soft copy and hard copy not
  done yet, no due date set
- **Software Engineering** — Topic to confirm with teacher — Not started

## Files

- `index.html` — page structure and the add-assignment form
- `style.css` — dark navy / teal styling, mobile-responsive
- `script.js` — assignments, checklists, countdowns and localStorage saving
- `README.md` — this file

## Note

This is a demo tracker. The sample assignments are real subjects and topics
only — never put a password, phone number, CNIC number or roll number into
a tracker or a public post. Always check with your teacher for the final
due date.
