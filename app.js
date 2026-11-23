const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const phone = $('#phone');
const lock = $('#lock');
const home = $('#home');
const statusbar = $('#statusbar');
const homeBar = $('#homeBar');

let currentApp = null;

/* ---------- clock ---------- */

function tick() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2, '0');
  $$('.clock').forEach(el => el.textContent = `${h}:${m}`);

  $('#lockDate').textContent = now.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}
tick();
setInterval(tick, 10000);

/* ---------- icons ---------- */

const ico = {
  snap: '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="11" fill="none" stroke="#fff" stroke-width="3.4"/><circle cx="18" cy="18" r="4.5" fill="#fff"/></svg>',
  tiktok: '<svg viewBox="0 0 36 36"><ellipse cx="13" cy="25" rx="5" ry="4" fill="#fff"/><path d="M16.5 25V8l10 3.5v4.5l-7.2-2.4V25z" fill="#fff"/></svg>',
  x: '<svg viewBox="0 0 36 36"><text x="18" y="27" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#fff">X</text></svg>',
  kick: '<svg viewBox="0 0 36 36"><text x="18" y="28" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="28" font-weight="900" fill="#000">K</text></svg>',
  wa: '<svg viewBox="0 0 36 36"><path d="M18 6c6.6 0 12 5 12 11.2S24.6 28.4 18 28.4c-1.6 0-3-.3-4.4-.8L7 30l1.9-5.6A10.8 10.8 0 016 17.2C6 11 11.4 6 18 6z" fill="#fff"/><path d="M14.2 12.6c.4 0 .7.2.9.6l1 2.2c.1.3 0 .7-.2.9l-.8.9a8 8 0 003.8 3.6l.9-.9c.3-.2.6-.3.9-.1l2.2 1c.4.2.6.6.5 1l-.2.8c-.3.9-1.2 1.5-2.2 1.4-4.4-.6-8-4.1-8.7-8.5-.1-1 .5-1.9 1.4-2.2z" fill="#25d366"/></svg>',
  photos: '<svg viewBox="0 0 36 36"><rect x="6" y="8" width="24" height="20" rx="4" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="13" cy="14.5" r="2.5" fill="#fff"/><path d="M7.5 25l7-7 5 5 3-3 6 6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>',
  files: '<svg viewBox="0 0 36 36"><path d="M5 11a3 3 0 013-3h6.5l3 3H28a3 3 0 013 3v12a3 3 0 01-3 3H8a3 3 0 01-3-3z" fill="#1a84ff"/><path d="M5 15h26v11a3 3 0 01-3 3H8a3 3 0 01-3-3z" fill="#4aa3ff"/></svg>',
  notes: '<svg viewBox="0 0 36 36"><rect x="0" y="0" width="36" height="10" fill="#f5c518"/><path d="M7 16h22M7 21h22M7 26h15" stroke="#c7c7cc" stroke-width="1.6"/></svg>',
  settings: '<svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="6" fill="none" stroke="#fff" stroke-width="3"/><path d="M18 5v5M18 26v5M5 18h5M26 18h5M8.8 8.8l3.5 3.5M23.7 23.7l3.5 3.5M8.8 27.2l3.5-3.5M23.7 12.3l3.5-3.5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
  weather: '<svg viewBox="0 0 36 36"><circle cx="14" cy="14" r="5" fill="#ffd60a"/><path d="M12 27a5 5 0 010-10 7 7 0 0113.4 2A4 4 0 0125 27z" fill="#fff"/></svg>',
  calc: '<svg viewBox="0 0 36 36"><circle cx="11" cy="11" r="4" fill="#a5a5a5"/><circle cx="25" cy="11" r="4" fill="#ff9f0a"/><circle cx="11" cy="25" r="4" fill="#a5a5a5"/><circle cx="25" cy="25" r="4" fill="#ff9f0a"/></svg>',
  phone: '<svg viewBox="0 0 36 36"><path d="M12.5 7.5c.6 0 1.1.4 1.3.9l1.6 3.8c.2.5.1 1-.3 1.4l-1.6 1.6a14 14 0 006.8 6.8l1.6-1.6c.4-.4.9-.5 1.4-.3l3.8 1.6c.5.2.9.7.9 1.3v3c0 1.1-.9 2-2 2C14.8 28 8 21.2 8 9.5c0-1.1.9-2 2-2z" fill="#fff"/></svg>',
  msgs: '<svg viewBox="0 0 36 36"><path d="M18 7c6.9 0 12 4.4 12 10s-5.1 10-12 10c-1.3 0-2.6-.2-3.8-.5L8 29l1.6-4.6C7.4 22.6 6 20 6 17c0-5.6 5.1-10 12-10z" fill="#fff"/></svg>',
  camera: '<svg viewBox="0 0 36 36"><path d="M13 9l-2 3H8a3 3 0 00-3 3v10a3 3 0 003 3h20a3 3 0 003-3V15a3 3 0 00-3-3h-3l-2-3z" fill="#1c1c1e"/><circle cx="18" cy="20" r="5" fill="none" stroke="#636366" stroke-width="2.4"/></svg>'
};

const apps = [
  { id: 'snap', name: 'سناب شات', bg: '#fffc00', icon: ico.snap, open: 'app-snap' },
  { id: 'tiktok', name: 'تيك توك', bg: '#000', icon: ico.tiktok, open: 'app-tiktok' },
  { id: 'x', name: 'X', bg: '#000', icon: ico.x, open: 'app-x', border: true },
  { id: 'kick', name: 'كيك', bg: '#53fc18', icon: ico.kick, open: 'app-kick' },
  { id: 'photos', name: 'الصور', bg: 'linear-gradient(135deg,#ff9f0a,#ff375f 45%,#5e5ce6)', icon: ico.photos, open: 'app-photos' },
  { id: 'files', name: 'الملفات', bg: '#fff', icon: ico.files, open: 'app-files' },
  { id: 'notes', name: 'الملاحظات', bg: '#fff', icon: ico.notes, open: 'app-notes', clip: true },
  { id: 'cal', name: 'التقويم', bg: '#fff', cal: true },
  { id: 'weather', name: 'الطقس', bg: 'linear-gradient(180deg,#2f80ed,#56ccf2)', icon: ico.weather, open: 'app-weather' },
  { id: 'calc', name: 'الحاسبة', bg: '#1c1c1e', icon: ico.calc, open: 'app-calc' },
  { id: 'settings', name: 'الإعدادات', bg: '#8e8e93', icon: ico.settings }
];

const dockApps = [
  { id: 'phone', name: 'الهاتف', bg: '#34c759', icon: ico.phone, open: 'app-phone', badge: 2 },
  { id: 'wa', name: 'واتساب', bg: '#25d366', icon: ico.wa, open: 'app-wa', badge: 6 },
  { id: 'msgs', name: 'الرسائل', bg: '#34c759', icon: ico.msgs, badge: 1 },
  { id: 'camera', name: 'الكاميرا', bg: '#e5e5ea', icon: ico.camera }
];

function iconHTML(a) {
  let inner = a.icon || '';
  if (a.cal) {
    const d = new Date();
    inner = `<small>${d.toLocaleDateString('ar-SA-u-ca-gregory', { weekday: 'long' })}</small><b>${d.getDate()}</b>`;
  }
  const style = `background:${a.bg};${a.border ? 'box-shadow:inset 0 0 0 1px #333;' : ''}${a.clip ? 'overflow:hidden;' : ''}`;
  return `
    <div class="icon" data-id="${a.id}">
      <div class="icon-tile ${a.cal ? 'cal-tile' : ''}" style="${style}">
        ${inner}
        ${a.badge ? `<span class="badge">${a.badge}</span>` : ''}
      </div>
      <span class="icon-label">${a.name}</span>
    </div>`;
}

$('#homeGrid').innerHTML = apps.map(iconHTML).join('');
$('#dock').innerHTML = dockApps.map(iconHTML).join('');

[...apps, ...dockApps].forEach(a => {
  const el = $(`.icon[data-id="${a.id}"]`);
  el.addEventListener('click', () => {
    if (a.open) return openApp(a.open);
    el.classList.remove('wiggle');
    void el.offsetWidth;
    el.classList.add('wiggle');
  });
});

/* ---------- lock / unlock ---------- */

let unlocked = false;
let startY = null;

function unlock() {
  if (unlocked) return;
  unlocked = true;
  lock.classList.add('open');
  home.classList.add('show');
  setTimeout(showBanner, 900);
}

lock.addEventListener('click', unlock);
lock.addEventListener('touchstart', e => startY = e.touches[0].clientY, { passive: true });
lock.addEventListener('touchend', e => {
  if (startY !== null && startY - e.changedTouches[0].clientY > 40) unlock();
  startY = null;
});

const banner = $('#banner');
let bannerTimer;
function showBanner() {
  banner.classList.add('show');
  bannerTimer = setTimeout(() => banner.classList.remove('show'), 6500);
}
banner.addEventListener('click', () => {
  clearTimeout(bannerTimer);
  banner.classList.remove('show');
});

/* ---------- open / close ---------- */

const hooks = {};

function openApp(id) {
  if (currentApp) return;
  const el = document.getElementById(id);
  currentApp = el;
  el.classList.add('open');
  home.classList.add('behind');
  const light = el.classList.contains('light');
  statusbar.classList.toggle('dark', light);
  homeBar.classList.toggle('dark', light);
  if (hooks[id]?.open) hooks[id].open();
}

function closeApp() {
  if (!currentApp) return;
  const id = currentApp.id;
  currentApp.classList.remove('open');
  home.classList.remove('behind');
  statusbar.classList.remove('dark');
  homeBar.classList.remove('dark');
  if (hooks[id]?.close) hooks[id].close();
  currentApp = null;
}

$$('[data-close]').forEach(b => b.addEventListener('click', closeApp));
homeBar.addEventListener('click', () => {
  if (currentApp) closeApp();
  else if (!unlocked) unlock();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if ($('#alert').classList.contains('show')) return hideAlert();
    if ($('#viewer').classList.contains('show')) return closeViewer();
    closeApp();
  }
});

/* ---------- face id + alert ---------- */

const faceid = $('#faceid');
let faceBusy = false;

function tryFaceId(failText, done) {
  if (faceBusy) return;
  faceBusy = true;
  $('#faceidText').textContent = 'Face ID';
  faceid.classList.remove('fail');
  faceid.classList.add('show');
  setTimeout(() => {
    faceid.classList.add('fail');
    $('#faceidText').textContent = failText;
  }, 1300);
  setTimeout(() => {
    faceid.classList.remove('show', 'fail');
    faceBusy = false;
    if (done) done();
  }, 2700);
}

function showAlert(title, text) {
  $('#alertTitle').textContent = title;
  $('#alertText').textContent = text;
  $('#alert').classList.add('show');
}
function hideAlert() { $('#alert').classList.remove('show'); }
$('#alertOk').addEventListener('click', hideAlert);

/* ---------- tiktok ---------- */

const ttVideo = $('#ttVideo');
const ttPaused = $('#ttPaused');

hooks['app-tiktok'] = {
  open() {
    ttVideo.currentTime = 0;
    ttVideo.muted = false;
    ttVideo.play().catch(() => {
      ttVideo.muted = true;
      ttVideo.play();
    });
    ttPaused.classList.remove('show');
  },
  close() { ttVideo.pause(); }
};

ttVideo.addEventListener('click', () => {
  if (ttVideo.paused) { ttVideo.play(); ttPaused.classList.remove('show'); }
  else { ttVideo.pause(); ttPaused.classList.add('show'); }
});
ttVideo.addEventListener('timeupdate', () => {
  if (!ttVideo.duration) return;
  $('#ttBar').style.width = (ttVideo.currentTime / ttVideo.duration * 100) + '%';
});

/* ---------- x ---------- */

const verified = '<svg viewBox="0 0 24 24" class="tw-ver"><path d="M12 2l2.4 2.1 3.2-.3.9 3.1 2.8 1.6-1.1 3 1.1 3-2.8 1.6-.9 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.9-3.1-2.8-1.6 1.1-3-1.1-3 2.8-1.6.9-3.1 3.2.3z" fill="#1d9bf0"/><path d="M8 12l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>';

const tweets = [
  {
    name: 'cobra', user: '@cobra_10_', av: 'img/x/av-cobra.jpg', ver: true,
    text: 'ماكس بيجنني',
    time: '1:07 AM · 11/23/2026', views: '3.4K',
    stats: [21, 9, 147, 6]
  },
  {
    name: 'cobra', user: '@cobra_10_', av: 'img/x/av-cobra.jpg', ver: true,
    text: 'ارحب والله ماغير انشق انا وطيحت المسكين معي يخوي اعتقنا شوي هههههههههههههه @ikaiiser\n@shanksu10\n@QYEM1',
    media: ['img/x/apt1.jpg'],
    time: '3:29 AM · 03/08/2026', views: '2.8K',
    stats: [3, 2, 38, 3]
  },
  {
    name: 'Kaiser.', user: '@ikaiiser', av: 'img/x/av-kaiser.jpg',
    text: 'ما ودنا ورا الشمس الا كوبرا\n@cobra_10_',
    media: ['img/x/meme.jpg', 'img/x/apt2.jpg'],
    time: '2:44 AM · 03/08/2026', views: '2.8K',
    stats: [3, 1, 35, 4]
  }
];

const twIcons = [
  '<svg viewBox="0 0 24 24"><path d="M4 11a7 7 0 017-7h2a7 7 0 010 14h-2l-5 3v-4.2A7 7 0 014 11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M5 9l3-3 3 3M8 6v9a2 2 0 002 2h4M19 15l-3 3-3-3M16 18V9a2 2 0 00-2-2h-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  '<svg viewBox="0 0 24 24"><path d="M6 3.5h12v17l-6-4.2-6 4.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
];

function linkify(t) {
  return t.replace(/@\w+/g, m => `<a>${m}</a>`);
}

$('#xFeed').innerHTML = tweets.map(t => `
  <article class="tweet">
    <div class="tw-user">
      <img src="${t.av}" alt="">
      <div class="tw-names">
        <b>${t.name} ${t.ver ? verified : ''}</b>
        <small>${t.user}</small>
      </div>
    </div>
    <div class="tw-text">${linkify(t.text)}</div>
    ${t.media ? `<div class="tw-media ${t.media.length > 1 ? 'two' : ''}">${t.media.map(m => `<img src="${m}" alt="">`).join('')}</div>` : ''}
    <div class="tw-meta">${t.time} · <b>${t.views}</b> Views</div>
    <div class="tw-actions">
      ${t.stats.map((n, i) => `<span>${twIcons[i]}${n}</span>`).join('')}
    </div>
  </article>
`).join('');

/* ---------- kick ---------- */

const kickNames = [
  ['abo_saud', '#53fc18'], ['nawaf.x', '#ff6b6b'], ['3zoz_77', '#4dabf7'], ['fahad_rp', '#ffd43b'],
  ['m7md', '#da77f2'], ['outlaw_fan', '#ff922b'], ['shmri11', '#63e6be'], ['ghost_ksa', '#f783ac'],
  ['bandar', '#74c0fc'], ['dhm_', '#a9e34b']
];
const kickLines = ['نبي بث', 'كوبرا وينك؟', '3 أيام بدون بث حرام', 'نبي بث', 'نبي بث'];

const kickMsgs = $('#kickMsgs');
let kickTimer = null;

function addKickMsg() {
  const [name, color] = kickNames[Math.floor(Math.random() * kickNames.length)];
  const line = kickLines[Math.floor(Math.random() * kickLines.length)];
  const div = document.createElement('div');
  div.className = 'k-msg';
  div.innerHTML = `<b style="color:${color}"><bdi>${name}</bdi>:</b> <bdi>${line}</bdi>`;
  kickMsgs.appendChild(div);
  while (kickMsgs.children.length > 25) kickMsgs.firstChild.remove();
}

hooks['app-kick'] = {
  open() {
    if (!kickMsgs.children.length) for (let i = 0; i < 8; i++) addKickMsg();
    const loop = () => {
      addKickMsg();
      kickTimer = setTimeout(loop, 700 + Math.random() * 1100);
    };
    loop();
  },
  close() { clearTimeout(kickTimer); }
};

/* ---------- whatsapp ---------- */

const ticks = '<svg viewBox="0 0 18 11"><path d="M1 6l3 3 6-7M7 9l1 1 7-8" fill="none" stroke="#53bdeb" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const groupIco = '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" fill="#cfd8dc"/><path d="M2 19c0-3.5 3-6 7-6s7 2.5 7 6z" fill="#cfd8dc"/><circle cx="17" cy="9" r="2.8" fill="#cfd8dc"/><path d="M15.5 13.2c3.6-.4 6.5 1.8 6.5 5.8h-4.4c0-2.3-.8-4.3-2.1-5.8z" fill="#cfd8dc"/></svg>';
const personIco = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4" fill="#cfd8dc"/><path d="M4 20c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5z" fill="#cfd8dc"/></svg>';
const lockIco = '<svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0110 0v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1zm2 0h6V7a3 3 0 00-6 0z" fill="#8696a0"/></svg>';

const senderColors = {
  'ديمتري': '#53bdeb',
  'ايجنت ماكس': '#ff7b7b',
  'اد': '#ffd279',
  'ليون كندي': '#a5e75a',
  'ايجنت دانيال': '#e79be6',
  'ايجنت ناس': '#7ae3c3'
};

const chats = [
  {
    id: 'dimitri', name: 'ديمتري', color: '#6b4fbb',
    preview: 'مافي مشكله', time: '2:14 ص', unread: 2,
    sub: 'آخر ظهور اليوم 2:14 ص',
    msgs: [
      { day: 'اليوم' },
      { me: 1, t: 'الحقني بموت', at: '1:41 ص' },
      { me: 1, t: 'يتتبعوني ترا', at: '1:41 ص' },
      { me: 1, t: 'عرفو مكاني ساعدني', at: '1:41 ص' },
      { me: 1, t: 'سسسساعدني', at: '1:42 ص' },
      { me: 1, t: 'انا وليون نايمين بين الجبال تعال لنا', at: '1:42 ص' },
      { me: 1, t: 'يطلقققون علي الحقني', at: '1:42 ص' },
      { t: 'بشوف الموضوع', at: '2:14 ص' },
      { t: 'مافي مشكله', at: '2:14 ص' }
    ]
  },
  {
    id: 'fib', name: 'قروب FIB', group: true,
    preview: 'ايجنت ماكس: ياخي والله انك كسول حسبي الله على اد', time: '11:48 م', unread: 4,
    sub: 'ديمتري، ماكس، اد، ليون كندي، ايجنت دانيال، ايجنت ناس، أنت',
    msgs: [
      { day: 'أمس' },
      { from: 'ديمتري', t: 'مافي مشكلة', at: '11:31 م' },
      { from: 'ايجنت ماكس', t: 'حسبي الله عليك يا اد ليش جبته', at: '11:40 م' },
      { from: 'ايجنت ماكس', t: 'كوبرا وش سويت اليوم', at: '11:40 م' },
      { from: 'ايجنت ماكس', t: 'يا كوبرا', at: '11:42 م' },
      { me: 1, t: 'سم', at: '11:44 م' },
      { from: 'ايجنت ماكس', t: 'انت عندك مشكلة في انك تسوي تقارير', at: '11:45 م' },
      { me: 1, t: 'مو انا اللي مسويه', at: '11:46 م' },
      { me: 1, t: 'ولا انا اللي ماسح البصمات', at: '11:46 م' },
      { from: 'ايجنت ماكس', t: 'ياخي انت شخص ف FIB عين اي شخص', at: '11:48 م' },
      { from: 'ايجنت ماكس', t: 'ياخي والله انك كسول حسبي الله على اد', at: '11:48 م' }
    ]
  },
  {
    id: 'max', name: 'ماكس حسبي الله عليه', blocked: true,
    preview: 'حسبي الله على اد اللي جابك', time: 'أمس',
    sub: '',
    msgs: [
      { day: 'أمس' },
      { t: 'انا اثق فيهم اكثر منك', at: '10:52 م' },
      { t: 'حسبي الله على اد اللي جابك', at: '10:52 م' },
      { sys: 'لقد حظرت جهة الاتصال هذه. اضغط لإلغاء الحظر.' }
    ]
  },
  {
    id: 'metab', name: 'ايجنت متعب', color: '#b5542f', locked: true,
    preview: 'أنت: حسبي الله عليك وهقتني', time: 'أمس'
  },
  {
    id: 'matcha', name: 'محل الماتشا', color: '#3d8b4a',
    preview: 'جاهزه الماتشا', time: 'أمس',
    sub: 'حساب تجاري',
    msgs: [
      { day: 'الجمعة' },
      { me: 1, t: 'السلام عليكم جهز ماتشا', at: '8:03 ص' },
      { day: 'السبت' },
      { me: 1, t: 'السلام عليكم', at: '8:01 ص' },
      { t: 'جاهزه الماتشا', at: '8:02 ص' },
      { day: 'أمس' },
      { me: 1, t: 'السلام عليكم', at: '7:58 ص' },
      { t: 'جاهزه الماتشا', at: '7:58 ص' }
    ]
  }
];

function avatar(c) {
  if (c.group) return `<span class="wa-av" style="background:#6a7175">${groupIco}</span>`;
  if (c.blocked) return `<span class="wa-av" style="background:#6a7175">${personIco}</span>`;
  return `<span class="wa-av" style="background:${c.color}">${c.name.replace('ايجنت ', '').charAt(0)}</span>`;
}

$('#waRows').innerHTML = chats.map(c => `
  <div class="wa-row" data-chat="${c.id}">
    ${avatar(c)}
    <div class="wa-row-body">
      <div class="wa-row-top"><b>${c.name}</b><small class="${c.unread ? 'new' : ''}">${c.time}</small></div>
      <div class="wa-row-bot">
        <p>${c.locked ? lockIco : ''}${c.preview}</p>
        ${c.unread ? `<span class="wa-unread">${c.unread}</span>` : ''}
      </div>
    </div>
  </div>
`).join('');

const wa = $('#app-wa');
const waChat = $('#waChat');

function openChat(c) {
  $('#waChatAv').outerHTML = avatar(c).replace('class="wa-av"', 'class="wa-av" id="waChatAv"');
  $('#waChatName').textContent = c.name;
  $('#waChatSub').textContent = c.sub;
  waChat.classList.toggle('blocked', !!c.blocked);

  let last = null;
  $('#waMsgs').innerHTML = c.msgs.map(m => {
    if (m.day) { last = null; return `<div class="wa-day">${m.day}</div>`; }
    if (m.sys) return `<div class="wa-sys">${m.sys}</div>`;
    const who = m.me ? 'me' : (m.from || 'them');
    const first = who !== last;
    last = who;
    const name = c.group && !m.me && first ? `<span class="who" style="color:${senderColors[m.from] || '#53bdeb'}">${m.from}</span>` : '';
    return `<div class="bub ${m.me ? 'out' : 'in'} ${first ? 'first' : ''}">${name}${m.t}<span class="meta">${m.at}${m.me ? ticks : ''}</span></div>`;
  }).join('');

  wa.classList.add('in-chat');
  const box = $('#waMsgs');
  box.scrollTop = box.scrollHeight;
}

$$('.wa-row').forEach(row => row.addEventListener('click', () => {
  const c = chats.find(x => x.id === row.dataset.chat);
  if (c.locked) {
    tryFaceId('تعذّر التحقق من Face ID', () => {
      showAlert('المحادثة مقفلة', 'هذه المحادثة مقفلة ولا يمكن فتحها إلا بـ Face ID صاحب الجوال.');
    });
    return;
  }
  openChat(c);
}));

$('#waBack').addEventListener('click', () => wa.classList.remove('in-chat'));
$('#waBlocked').addEventListener('click', () => {
  showAlert('إلغاء الحظر', 'لا يمكن إلغاء الحظر إلا من صاحب الجوال.');
});

hooks['app-wa'] = { close() { wa.classList.remove('in-chat'); } };

/* ---------- phone ---------- */

function minsAgo(m) {
  const d = new Date(Date.now() - m * 60000);
  const h = d.getHours();
  return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h < 12 ? 'ص' : 'م'}`;
}

const outIco = '<svg viewBox="0 0 24 24"><path d="M8 16L17 7M10 7h7v7" fill="none" stroke="#8e8e93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const infoIco = '<svg viewBox="0 0 24 24" class="c-info"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#0a84ff" stroke-width="1.6"/><path d="M12 11v6" stroke="#0a84ff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.1" fill="#0a84ff"/></svg>';

const calls = [
  { name: 'ماكس حسبي الله عليه', count: 3, missed: true, sub: 'جوال', time: minsAgo(8) },
  { name: 'مندوب ماتشا', missed: true, sub: 'جوال', time: minsAgo(23) },
  { name: 'ديمتري', count: 2, sub: 'جوال', time: '1:43 ص', out: true },
  { name: 'ايجنت متعب', sub: 'جوال', time: 'أمس', out: true },
  { name: 'محل الماتشا', sub: 'جوال', time: 'أمس', out: true },
  { name: 'ماكس حسبي الله عليه', missed: true, sub: 'جوال', time: 'أمس' }
];

$('#callRows').innerHTML = calls.map(c => `
  <div class="c-row ${c.missed ? 'missed' : ''}">
    ${c.out ? outIco : '<svg></svg>'}
    <div class="c-main">
      <div>
        <b>${c.name}${c.count ? ` (${c.count})` : ''}</b>
        <small>${c.sub}</small>
      </div>
      <span class="c-time">${c.time}</span>
      ${infoIco}
    </div>
  </div>
`).join('');

/* ---------- calculator ---------- */

const keys = [
  ['AC', 'fn'], ['±', 'fn'], ['%', 'fn'], ['÷', 'op'],
  ['7'], ['8'], ['9'], ['×', 'op'],
  ['4'], ['5'], ['6'], ['−', 'op'],
  ['1'], ['2'], ['3'], ['+', 'op'],
  ['0', 'zero'], ['.'], ['=', 'op']
];
$('#calcKeys').innerHTML = keys.map(([k, c]) => `<button class="${c || ''}" data-k="${k}">${k}</button>`).join('');

const calc = { cur: '0', prev: null, op: null, fresh: false };
const calcOut = $('#calcOut');

function fmt(n) {
  if (!isFinite(n)) return 'خطأ';
  const r = parseFloat(n.toPrecision(10));
  return Math.abs(r) >= 1e9 ? r.toExponential(4) : r.toLocaleString('en-US', { maximumFractionDigits: 8 });
}

function run(a, b, op) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') return a / b;
  return b;
}

function showCalc() {
  const txt = calc.cur.endsWith('.') ? calc.cur : fmt(parseFloat(calc.cur));
  calcOut.textContent = txt;
  calcOut.style.fontSize = txt.length > 9 ? '54px' : txt.length > 6 ? '66px' : '';
  $$('.calc-keys .op').forEach(b => b.classList.toggle('on', calc.fresh && b.dataset.k === calc.op));
  $('[data-k="AC"]').textContent = calc.cur !== '0' ? 'C' : 'AC';
}

$('#calcKeys').addEventListener('click', e => {
  const k = e.target.dataset.k;
  if (!k) return;
  if (/^[0-9]$/.test(k)) {
    if (calc.fresh || calc.cur === '0') calc.cur = k;
    else if (calc.cur.replace(/[-.]/g, '').length < 9) calc.cur += k;
    calc.fresh = false;
  } else if (k === '.') {
    if (calc.fresh) { calc.cur = '0.'; calc.fresh = false; }
    else if (!calc.cur.includes('.')) calc.cur += '.';
  } else if (k === 'AC') {
    if (calc.cur !== '0') calc.cur = '0';
    else { calc.prev = null; calc.op = null; }
    calc.fresh = false;
  } else if (k === '±') {
    calc.cur = calc.cur.startsWith('-') ? calc.cur.slice(1) : (calc.cur === '0' ? '0' : '-' + calc.cur);
  } else if (k === '%') {
    calc.cur = String(parseFloat(calc.cur) / 100);
  } else if (k === '=') {
    if (calc.op !== null) {
      calc.cur = String(run(calc.prev, parseFloat(calc.cur), calc.op));
      calc.prev = null; calc.op = null;
    }
    calc.fresh = true;
  } else {
    if (calc.op !== null && !calc.fresh) calc.cur = String(run(calc.prev, parseFloat(calc.cur), calc.op));
    calc.prev = parseFloat(calc.cur);
    calc.op = k;
    calc.fresh = true;
  }
  showCalc();
});

/* ---------- weather ---------- */

const wIco = {
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#ffd60a"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><circle cx="9" cy="10" r="4" fill="#ffd60a"/><path d="M8 19a4 4 0 010-8 5.5 5.5 0 0110.6 1.6A3.3 3.3 0 0118 19z" fill="#fff"/></svg>',
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" fill="#e5e5ea"/></svg>',
  cloudy: '<svg viewBox="0 0 24 24"><path d="M7 19a4.5 4.5 0 010-9 6 6 0 0111.5 2A3.5 3.5 0 0118 19z" fill="#fff"/></svg>',
  rain: '<svg viewBox="0 0 24 24"><path d="M7 15a4 4 0 010-8 5.5 5.5 0 0110.6 1.6A3.3 3.3 0 0117 15z" fill="#fff"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke="#64d2ff" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

const nowH = new Date().getHours();
$('#wHours').innerHTML = Array.from({ length: 12 }, (_, i) => {
  const h = (nowH + i) % 24;
  const night = h >= 18 || h < 6;
  const temp = i === 0 ? 24 : Math.round(22 + 6 * Math.sin((h - 9) / 24 * Math.PI * 2));
  const icon = night ? (i % 4 === 1 ? wIco.cloudy : wIco.moon) : (i % 3 === 0 ? wIco.cloud : wIco.sun);
  const label = i === 0 ? 'الآن' : `${h % 12 || 12}${h < 12 ? 'ص' : 'م'}`;
  return `<div class="w-hour"><span>${label}</span>${icon}<span>${temp}°</span></div>`;
}).join('');

const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const forecast = [[17, 29, 'cloud'], [16, 27, 'sun'], [15, 26, 'cloudy'], [14, 24, 'rain'], [15, 25, 'cloud'], [17, 28, 'sun'], [18, 30, 'sun'], [17, 28, 'cloud'], [16, 27, 'cloudy'], [16, 28, 'sun']];
const today = new Date().getDay();
$('#wDays').innerHTML = forecast.map(([lo, hi, ic], i) => `
  <div class="w-day">
    <span>${i === 0 ? 'اليوم' : dayNames[(today + i) % 7]}</span>
    ${wIco[ic]}
    <span class="lo">${lo}°</span>
    <div class="w-bar"><i style="left:${(lo - 12) / 20 * 100}%;right:${100 - (hi - 12) / 20 * 100}%"></i></div>
    <span class="hi">${hi}°</span>
  </div>
`).join('');

/* ---------- photos ---------- */

const photos = [];
for (let i = 1; i <= 15; i++) photos.push({ src: `img/album/${String(i).padStart(2, '0')}.jpg` });
photos.splice(2, 0, { src: 'img/clip-poster.jpg', video: 'media/clip.mp4', dur: '0:17' });

$('#phCount').textContent = `${photos.length - 1} صورة، 1 فيديو`;
$('#phGrid').innerHTML = photos.map((p, i) => `
  <div class="ph-item" data-i="${i}">
    <img src="${p.src}" alt="" loading="lazy">
    ${p.video ? `<span>${p.dur}</span>` : ''}
  </div>
`).join('');

const viewer = $('#viewer');
const vStage = $('#vStage');
let vIndex = 0;

function showPhoto(i) {
  vIndex = (i + photos.length) % photos.length;
  const p = photos[vIndex];
  vStage.innerHTML = p.video
    ? `<video src="${p.video}" controls autoplay playsinline></video>`
    : `<img src="${p.src}" alt="">`;
  $('#vCount').textContent = `${vIndex + 1} / ${photos.length}`;
}

function closeViewer() {
  viewer.classList.remove('show');
  vStage.innerHTML = '';
}

$$('.ph-item').forEach(el => el.addEventListener('click', () => {
  showPhoto(+el.dataset.i);
  viewer.classList.add('show');
}));
$('#vClose').addEventListener('click', closeViewer);
$('#vNext').addEventListener('click', () => showPhoto(vIndex + 1));
$('#vPrev').addEventListener('click', () => showPhoto(vIndex - 1));

let vx = null;
viewer.addEventListener('touchstart', e => vx = e.touches[0].clientX, { passive: true });
viewer.addEventListener('touchend', e => {
  if (vx === null) return;
  const dx = e.changedTouches[0].clientX - vx;
  if (Math.abs(dx) > 50) showPhoto(vIndex + (dx < 0 ? 1 : -1));
  vx = null;
});

hooks['app-photos'] = { close: closeViewer };

/* ---------- files ---------- */

const folders = [
  { name: 'أسرار الـ FIB', count: '12 عنصر' },
  { name: 'صور التقارير', count: '37 عنصر' },
  { name: 'مستندات خاصة', count: '7 عناصر' },
  { name: 'الفرصة لا تأتي مرتين بوز', count: 'عنصر واحد' },
  { name: 'الخلايا النائمة', count: '9 عناصر' },
  { name: 'خطة إعدام ماكس', count: '3 عناصر', plan: true }
];

const folderSvg = '<svg viewBox="0 0 78 62"><path d="M4 10a6 6 0 016-6h16l6 6h36a6 6 0 016 6v36a6 6 0 01-6 6H10a6 6 0 01-6-6z" fill="#2d7ff9"/><path d="M4 20a6 6 0 016-6h58a6 6 0 016 6v32a6 6 0 01-6 6H10a6 6 0 01-6-6z" fill="#56a0ff"/></svg>';
const smallLock = '<svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0110 0v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1zm2 0h6V7a3 3 0 00-6 0z" fill="#2d7ff9"/></svg>';

$('#fGrid').innerHTML = folders.map((f, i) => `
  <div class="folder" data-i="${i}">
    <div class="folder-ico">${folderSvg}<span class="lk">${smallLock}</span></div>
    <b>${f.name}</b>
    <small>${f.count}</small>
  </div>
`).join('');

$$('.folder').forEach(el => el.addEventListener('click', () => {
  const f = folders[+el.dataset.i];
  if (f.plan) {
    showAlert('المجلد مقفل', `تعذّر التحقق من الهوية. لا يمكن فتح «${f.name}» إلا من صاحب الجوال`);
    return;
  }
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
  tryFaceId('تعذّر التحقق من Face ID');
}));

/* ---------- notes ---------- */

const notes = [
  {
    title: 'مهام اليوم', date: 'اليوم 7:10 ص', short: '7:10 ص',
    checks: [
      ['اشتري ماتشا', true],
      ['اسوي التقرير'],
      ['اكلم دمتري'],
      ['اروح لقسم الشرطة'],
      ['اتتبع متعب']
    ]
  },
  {
    title: 'انا خان', date: 'أمس 3:12 ص', short: 'أمس',
    text: Array(80).fill('انا خان').join('\n')
  },
  {
    title: 'فضفضة', date: 'أمس 2:40 ص', short: 'أمس',
    text: 'اللي حصل لك في اليومين الماضية مو طبيعي\nاللي حصل لي اني انا قاعد انهان\nيعني تبغاها طلق نار، تبغاها إساءات، تبغاها اتصالات، تبغاها تهديدات، تبغاها مراقبات، تبغاها مراقبة، كله\nتعبتت\nتعبت'
  },
  {
    title: 'يارب فكني من ماكس', date: 'السبت 11:58 م', short: 'السبت',
    text: ''
  }
];

function notePreview(n) {
  if (n.checks) return n.checks.map(c => c[0]).join('، ');
  const t = n.text.split('\n').filter(Boolean);
  return t.length > 1 ? t[1] : 'لا يوجد نص إضافي';
}

$('#ntRows').innerHTML = notes.map((n, i) => `
  <div class="nt-row" data-i="${i}">
    <b>${n.title}</b>
    <p><span>${n.short}</span>${notePreview(n)}</p>
  </div>
`).join('');
$('#ntCount').textContent = `${notes.length} ملاحظات`;

const notesApp = $('#app-notes');

function openNote(n) {
  let body = `<div class="nt-date">${n.date}</div><h2>${n.title}</h2>`;
  if (n.checks) {
    body += n.checks.map(([t, done]) => `<div class="check ${done ? 'done' : ''}"><i></i><span>${t}</span></div>`).join('');
  } else if (n.text) {
    const lines = n.text.split('\n');
    if (lines[0] === n.title) lines.shift();
    body += `<p>${lines.join('<br>')}</p>`;
  }
  $('#ntBody').innerHTML = body;
  $('#ntBody').scrollTop = 0;
  notesApp.classList.add('in-note');
}

$$('.nt-row').forEach(r => r.addEventListener('click', () => openNote(notes[+r.dataset.i])));
$('#ntBack').addEventListener('click', () => notesApp.classList.remove('in-note'));
hooks['app-notes'] = { close() { notesApp.classList.remove('in-note'); } };
