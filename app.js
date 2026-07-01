/* ==========================================================================
   ADUMAS — shared client-side logic
   Data is persisted in localStorage so the whole app works as a static site
   (no backend required). Swap `Store` internals for real API calls later.
   ========================================================================== */

const DB_KEY = "adumas_complaints_v1";
const SESSION_KEY = "adumas_session_v1";
const ADMIN_EMAIL = "admin@mhs.id";

const Store = {
  seedIfEmpty() {
    if (localStorage.getItem(DB_KEY)) return;
    const now = Date.now();
    const seed = [
      { id: 1, code: "ADUAN#001", title: "WiFi kampus sering putus", body: "Koneksi WiFi di gedung B sering putus saat jam kuliah siang.", status: "selesai", email: "yesking0000@mhs.id", createdAt: now - 86400000 * 4 },
      { id: 2, code: "ADUAN#002", title: "AC ruang kelas rusak", body: "AC di ruang 302 tidak dingin sejak minggu lalu.", status: "diproses", email: "yesking0000@mhs.id", createdAt: now - 86400000 * 2 },
      { id: 3, code: "ADUAN#003", title: "Jadwal ujian bertabrakan", body: "Jadwal UAS mata kuliah A dan B bertabrakan di waktu yang sama.", status: "selesai", email: "yesking0000@mhs.id", createdAt: now - 86400000 },
    ];
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
  },
  all() {
    return JSON.parse(localStorage.getItem(DB_KEY) || "[]");
  },
  save(list) {
    localStorage.setItem(DB_KEY, JSON.stringify(list));
  },
  byEmail(email) {
    return this.all().filter(c => c.email === email).sort((a, b) => b.createdAt - a.createdAt);
  },
  add({ title, body, email }) {
    const list = this.all();
    const nextNum = list.length + 1;
    const item = {
      id: Date.now(),
      code: "ADUAN#" + String(nextNum).padStart(3, "0"),
      title, body, email,
      status: "diproses",
      createdAt: Date.now(),
    };
    list.push(item);
    this.save(list);
    return item;
  },
  setStatus(id, status) {
    const list = this.all().map(c => c.id === id ? { ...c, status } : c);
    this.save(list);
  },
  remove(id) {
    this.save(this.all().filter(c => c.id !== id));
  },
};

const Session = {
  get() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; }
  },
  set(email) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, isAdmin: email === ADMIN_EMAIL }));
  },
  clear() {
    localStorage.removeItem(SESSION_KEY);
  },
  requireStudent() {
    const s = this.get();
    if (!s) { window.location.href = "index.html"; return null; }
    return s;
  },
  requireAdmin() {
    const s = this.get();
    if (!s || !s.isAdmin) { window.location.href = "index.html"; return null; }
    return s;
  },
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return "baru saja";
  if (diff < 60) return diff + " menit lalu";
  const h = Math.floor(diff / 60);
  if (h < 24) return h + " jam lalu";
  const d = Math.floor(h / 24);
  return d + " hari lalu";
}

function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

Store.seedIfEmpty();
