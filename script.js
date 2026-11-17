// University Assignment Tracker — assignments, soft/hard copy checklists, due dates, saved in localStorage.
const STORAGE_KEY = "tb-assignment-tracker-v1";

const DEMO = [
  { id: "processors", subject: "Computer Assembly Language",
    topic: "Computer Processors — Intel Core i3 / i5 / i7 / i9, RISC vs CISC, 32-bit vs 64-bit",
    teacher: "", date: "", status: "in-progress", softDone: false, hardDone: false },
  { id: "se", subject: "Software Engineering",
    topic: "Topic to confirm with teacher",
    teacher: "", date: "", status: "not-started", softDone: false, hardDone: false }
];

const STATUS_LABEL = { "not-started": "Not started", "in-progress": "In progress", done: "Done" };
const NEXT_STATUS = { "not-started": "in-progress", "in-progress": "done", done: "not-started" };
const NEXT_LABEL = { "not-started": "Start", "in-progress": "Mark Done", done: "Reopen" };

let items = load();
let filter = "all";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* fall through to demo */ }
  return structuredClone(DEMO);
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* private mode */ }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function dueText(a) {
  if (!a.date) return { text: "No due date set", overdue: false };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const due = new Date(a.date + "T00:00:00+05:00").getTime();
  const days = Math.round((due - today) / 86400000);
  if (days < 0) return { text: "Overdue by " + (-days) + (days === -1 ? " day" : " days"), overdue: true };
  if (days === 0) return { text: "Due today", overdue: false };
  if (days === 1) return { text: "Due tomorrow", overdue: false };
  return { text: days + " days left", overdue: false };
}

function render() {
  const sorted = [...items].sort((a, b) => {
    if (a.date && b.date) return a.date.localeCompare(b.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.subject.localeCompare(b.subject);
  });
  const filtered = sorted.filter(a => filter === "all" ? true : a.status === filter);
  const doneCount = items.filter(a => a.status === "done").length;
  const dueSoon = items.filter(a => a.date && a.status !== "done" && dueText(a).text.indexOf("days left") === 0 && parseInt(dueText(a).text, 10) <= 3).length;
  document.getElementById("summary").textContent =
    items.length + " assignments · " + doneCount + " done · " +
    (dueSoon > 0 ? dueSoon + " due within 3 days." : "nothing due in the next 3 days.");

  const list = document.getElementById("assignment-list");
  list.innerHTML = "";
  filtered.forEach(a => {
    const due = dueText(a);
    const card = document.createElement("div");
    card.className = "result-card status-" + a.status + (due.overdue && a.status !== "done" ? " overdue" : "");
    card.innerHTML =
      '<span class="result-label">' + escapeHtml(a.subject) + '</span>' +
      '<span class="result-value">' + escapeHtml(a.topic) + '</span>' +
      '<span class="result-sub">Teacher: ' + escapeHtml(a.teacher || "—") + '</span>' +
      '<span class="result-sub' + (due.overdue && a.status !== "done" ? " overdue-text" : "") + '">Due: ' +
      escapeHtml(a.date || "—") + ' · ' + due.text + '</span>' +
      '<span><span class="badge status-' + a.status + '">' + STATUS_LABEL[a.status] + '</span></span>';
    const checks = document.createElement("div");
    checks.className = "checks";
    const softLabel = document.createElement("label");
    const softBox = document.createElement("input");
    softBox.type = "checkbox";
    softBox.checked = !!a.softDone;
    softBox.addEventListener("change", () => { a.softDone = softBox.checked; save(); render(); });
    softLabel.appendChild(softBox);
    softLabel.appendChild(document.createTextNode(" Soft copy sent to teacher"));
    const hardLabel = document.createElement("label");
    const hardBox = document.createElement("input");
    hardBox.type = "checkbox";
    hardBox.checked = !!a.hardDone;
    hardBox.addEventListener("change", () => { a.hardDone = hardBox.checked; save(); render(); });
    hardLabel.appendChild(hardBox);
    hardLabel.appendChild(document.createTextNode(" Hard copy printed & submitted"));
    checks.appendChild(softLabel);
    checks.appendChild(hardLabel);
    card.appendChild(checks);
    const actions = document.createElement("div");
    actions.className = "card-actions";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "btn btn-secondary btn-small";
    next.textContent = NEXT_LABEL[a.status];
    next.addEventListener("click", () => { a.status = NEXT_STATUS[a.status]; save(); render(); });
    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn btn-secondary btn-small";
    del.textContent = "Remove";
    del.addEventListener("click", () => { items = items.filter(x => x.id !== a.id); save(); render(); });
    actions.appendChild(next);
    actions.appendChild(del);
    card.appendChild(actions);
    list.appendChild(card);
  });
}

document.getElementById("add-form").addEventListener("submit", e => {
  e.preventDefault();
  const subject = document.getElementById("new-subject").value.trim();
  const topic = document.getElementById("new-topic").value.trim();
  const teacher = document.getElementById("new-teacher").value.trim();
  const date = document.getElementById("new-date").value;
  const status = document.getElementById("new-status").value;
  if (!subject || !topic) return;
  items.push({ id: "a" + Date.now(), subject, topic, teacher, date, status, softDone: false, hardDone: false });
  save();
  e.target.reset();
  render();
});

document.getElementById("reset-demo").addEventListener("click", () => {
  items = structuredClone(DEMO);
  save();
  render();
});

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  filter = btn.dataset.filter;
  document.querySelectorAll("#filters .chip").forEach(c => c.classList.toggle("active", c === btn));
  render();
});

render();
