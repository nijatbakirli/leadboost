/* ============================================================
   Картинки брендбука TARGET PRO: примеры слайдов карусели,
   обложка Facebook, обложка WhatsApp Business, обложка Reels.
   Брендбук: артефакт Design System «TARGET PRO»; там эти файлы
   лежат в разделе Assets (Banners, Carousel, Reels).

   Запуск: NODE_PATH=$(npm root -g) node scripts/brand-images.mjs <папка>
   (нужен Playwright с Chromium и Python с Pillow, как для og-images).

   Правила те же, что на сайте с 18.11.2026 (решение владельца):
   светлая основа, бумага с сеткой 60px, плашка мазком маркера (те же
   картинки .hl-a/b/c из styles.css, тот же выбор варианта по тексту),
   одна жёлтая плашка на картинку, лейблы JetBrains Mono без «//»,
   подпись «TARGET PRO ├──┤ ДЕЙСТВИЕ». Жёлтый никогда не текст,
   лент с крестиками на этих носителях нет.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = require("playwright");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, ".build-brand"));
fs.mkdirSync(OUT, { recursive: true });

/* тот же выбор варианта мазка, что в Mark (src/widgets.jsx) */
function hlVariant(text) {
  let h = 0x811c9dc5;
  for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0; h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0; h ^= h >>> 16;
  return "abc"[(h >>> 0) % 3];
}
const mark = (t) => `<span class="hl hl-${hlVariant(t)} show">${t}</span>`;

const font = (pkg, file) => pathToFileURL(path.join(ROOT, "node_modules/@fontsource", pkg, "files", file)).href;
const faces = [];
for (const sub of ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]) {
  faces.push(`@font-face{font-family:Oswald;font-weight:700;src:url(${font("oswald", `oswald-${sub}-700-normal.woff2`)})}`);
  for (const w of [500, 600, 700]) faces.push(`@font-face{font-family:Inter;font-weight:${w};src:url(${font("inter", `inter-${sub}-${w}-normal.woff2`)})}`);
  faces.push(`@font-face{font-family:JBM;font-weight:700;src:url(${font("jetbrains-mono", `jetbrains-mono-${sub}-700-normal.woff2`)})}`);
}
const css = fs.readFileSync(path.join(ROOT, "src/styles.css"), "utf8");
const hlCss = css.slice(css.indexOf("@property --hlp"), css.indexOf("/* моно-лейбл капсом"));
const logoSvg = fs.readFileSync(path.join(ROOT, "img/logo.svg"), "utf8").replace(/width="\d+" height="\d+"/, "");
const logo = (h) => `<span class="logo" style="height:${h}px">${logoSvg}</span>`;
const waIcon = "data:image/webp;base64," + fs.readFileSync(path.join(ROOT, "img/icons/social/whatsapp.webp")).toString("base64");
const arrow = (s, c = "#0F1216") => `<svg width="${s * 1.2}" height="${s}" viewBox="0 0 24 20"><path d="M0 10h21M13 2l8 8-8 8" fill="none" stroke="${c}" stroke-width="2.6"/></svg>`;
const arrowUp = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20"><path d="M3 17L17 3M6 3h11v11" fill="none" stroke="${c}" stroke-width="2.4"/></svg>`;
const play = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20"><path d="M5 2.5v15l12.5-7.5z" fill="${c}"/></svg>`;

const base = `${faces.join("")}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#FAFAF7}
body{--ink:#0F1216;--y-ink:#0F1216;position:relative;overflow:hidden;color:#0F1216;
 background-image:linear-gradient(rgba(15,18,22,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(15,18,22,.05) 1px,transparent 1px);background-size:60px 60px;background-position:-1px -1px}
.logo{display:block}.logo svg{height:100%;width:auto;display:block}
.lbl{font-family:JBM;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#5C6570}
.h{font-family:Oswald;font-weight:700;text-transform:uppercase;letter-spacing:-.005em;color:#0F1216}
.h > div{white-space:nowrap}
.h .hm{margin-top:.16em}
.body{font-family:Inter;font-weight:500;color:#5C6570}
.tile{background:#FFFFFF;border:2px solid #E3E4DF;border-radius:28px}
.sig{position:absolute;display:flex;align-items:center;font-family:JBM;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#0F1216;line-height:1}
.rule{flex:1;border-left:3px solid #0F1216;border-right:3px solid #0F1216;position:relative}
.rule:before{content:'';position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;background:#0F1216}
.act{display:flex;align-items:center;gap:12px}
${hlCss}`;

const sig = ({ left, right, bottom, size, act, gap = 24, ruleH = 14, withArrow = false }) =>
  `<div class="sig" style="left:${left}px;right:${right}px;bottom:${bottom}px;font-size:${size}px;gap:${gap}px"><span>TARGET PRO</span><span class="rule" style="height:${ruleH}px"></span><span class="act">${act}${withArrow ? arrow(size * 0.8) : ""}</span></div>`;

const IMAGES = {
  /* обложка карусели: хук на мазке */
  "TARGET_PRO_carousel_example_1.png": {
    w: 1080, h: 1350,
    html: `<div class="lbl" style="position:absolute;left:88px;top:92px;font-size:24px">Почему пропали заявки</div>
<div class="h" style="position:absolute;left:88px;top:430px;font-size:104px;line-height:124.8px">
<div>Раньше писали</div><div>каждый день,</div><div class="hm">${mark("а теперь тишина")}</div></div>
<div class="body" style="position:absolute;left:88px;top:892px;width:904px;font-size:38px;line-height:53.5px">Листай: 3 причины и что делать с каждой</div>
${sig({ left: 88, right: 88, bottom: 76, size: 26, act: "Листай" })}`,
  },
  /* слайд с цифрой из кабинета */
  "TARGET_PRO_carousel_example_2.png": {
    w: 1080, h: 1350,
    html: `<div class="lbl" style="position:absolute;left:88px;top:92px;font-size:24px">Из моего кабинета Meta</div>
<div class="h" style="position:absolute;left:88px;top:300px;font-size:200px;line-height:1">4 617</div>
<div class="h" style="position:absolute;left:88px;top:520px;font-size:72px;line-height:86px">Переписок ${mark("по $0,57")}</div>
<div class="body" style="position:absolute;left:88px;top:660px;width:904px;font-size:38px;line-height:53.5px">Цифра из отчёта Meta Ads Manager. Скрин отчёта на следующем слайде.</div>
${sig({ left: 88, right: 88, bottom: 76, size: 26, act: "Написать" })}`,
  },
  /* обложка Facebook: всё важное в центральных 1110px (265..1375), левый низ под аватар */
  "TARGET_PRO_facebook_cover_1640x624.png": {
    w: 1640, h: 624,
    html: `<div class="h" style="position:absolute;left:300px;top:174px;font-size:58px;line-height:70px">
<div>Таргет в Instagram</div><div>и Facebook для бизнеса</div><div class="hm">${mark("в Казахстане и СНГ")}</div></div>
<div class="tile" style="position:absolute;left:1045px;top:176px;width:330px;height:276px;border-radius:22px;padding:30px 32px">
<div class="lbl" style="font-size:14px;line-height:20px">Из моего кабинета Meta</div>
<div class="h" style="font-size:96px;line-height:1;margin-top:18px">4 617</div>
<div class="h" style="font-size:28px;line-height:1;margin-top:10px">Переписок</div>
<div class="body" style="font-size:19px;margin-top:14px">по $0,57 за каждую</div></div>
<div style="position:absolute;right:265px;top:545px;font-family:JBM;font-weight:700;font-size:20px;letter-spacing:.04em">targetpro.studio</div>`,
  },
  /* обложка WhatsApp Business 16:9: низ свободен под имя и кнопки профиля */
  "TARGET_PRO_whatsapp_cover_1920x1080.png": {
    w: 1920, h: 1080,
    html: `<div style="position:absolute;left:240px;top:150px">${logo(56)}</div>
<div class="h" style="position:absolute;left:240px;top:262px;font-size:104px;line-height:124px">
<div>Таргет в Instagram и Facebook</div><div>для бизнеса</div><div class="hm">${mark("в Казахстане и СНГ")}</div></div>
<div class="body" style="position:absolute;left:240px;top:676px;font-size:36px;line-height:50px">Ещё TikTok, Threads и Google. Сайты под рекламу.</div>`,
  },
  /* обложка Reels 9:16: всё важное в центре 3:4 (y 240..1680), подпись ниже видна только во вкладке Reels */
  "TARGET_PRO_reels_cover_1080x1920.png": {
    w: 1080, h: 1920,
    html: `<style>
.g{position:absolute;left:60px;width:960px;display:grid;grid-template-columns:repeat(12,1fr);gap:20px}
.t{position:relative;padding:32px 34px;overflow:hidden}
.in{background:#F3F3EE;border-radius:18px}
.note{display:flex;align-items:center;gap:14px;padding:14px 16px;background:#FFFFFF;border:2px solid #E3E4DF;border-radius:16px}
.ic{width:40px;height:40px;border-radius:50%;background:#0F1216;display:grid;place-items:center;flex:0 0 auto}
.ic i{width:22px;height:22px;background:#FFFFFF;-webkit-mask:url(${waIcon}) center/contain no-repeat;mask:url(${waIcon}) center/contain no-repeat}
.nt{font-family:Inter;font-weight:600;font-size:20px;line-height:1.2}.ns{font-family:Inter;font-weight:500;font-size:16px;color:#6B7480;margin-top:3px}
.cr{height:118px;border-radius:14px;background:#F3F3EE;position:relative;display:flex;align-items:flex-end;padding:10px;font-family:JBM;font-weight:700;font-size:16px;text-transform:uppercase;color:#6B7480}
.cr.lead{outline:3px solid #0F1216;outline-offset:-3px;background:#FFFFFF;color:#0F1216}
.pill{display:inline-block;font-family:JBM;font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;border:2px solid #0F1216;border-radius:999px;padding:6px 12px;line-height:1}
</style>
<div style="position:absolute;left:88px;top:330px">${logo(40)}</div>
<div class="lbl" style="position:absolute;right:88px;top:330px;font-size:30px;line-height:40px;color:#0F1216;display:flex;align-items:center;gap:12px">${play(24, "#0F1216")}Reels</div>
<div class="g" style="top:430px">
 <div class="tile t" style="grid-column:span 12;height:520px">
  <div class="lbl" style="font-size:22px">Разбор за 25 секунд</div>
  <div class="in" style="position:absolute;right:30px;top:30px;width:268px;padding:18px 20px">
   <div class="lbl" style="font-size:14px">Бюджет</div><div class="h" style="font-size:34px;line-height:1.1">Уходит</div>
   <svg width="228" height="40" viewBox="0 0 228 40" style="display:block;margin:8px 0 12px"><path d="M2 36L60 30 110 22 160 14 226 4" fill="none" stroke="#0F1216" stroke-width="3"/></svg>
   <div class="lbl" style="font-size:14px">Заявки</div><div class="h" style="font-size:34px;line-height:1.1">0</div>
   <svg width="228" height="10" viewBox="0 0 228 10" style="display:block;margin-top:8px"><path d="M2 5H226" stroke="#6B7480" stroke-width="3" stroke-dasharray="8 8"/></svg>
  </div>
  <div class="h" style="position:absolute;left:34px;bottom:34px;font-size:96px;line-height:115px">
   <div>Реклама</div><div>крутится,</div><div class="hm">${mark("а заявок нет")}</div></div>
 </div>
 <div class="tile t" style="grid-column:span 6;height:260px">
  <div class="lbl" style="font-size:16px;margin-bottom:16px">Заявки приходят</div>
  <div class="note"><span class="ic"><i></i></span><span><div class="nt">Новая заявка</div><div class="ns">Кухня 3 м, Алматы</div></span></div>
  <div class="note" style="margin-top:10px;opacity:.45"><span class="ic"><i></i></span><span><div class="nt">Новая заявка</div><div class="ns">Шкаф-купе, Астана</div></span></div>
 </div>
 <div class="tile t" style="grid-column:span 6;height:260px">
  <div class="lbl" style="font-size:16px">За месяц</div>
  <div style="display:flex;align-items:flex-end;gap:18px;margin-top:6px"><div class="h" style="font-size:120px;line-height:1">86</div><div style="padding-bottom:12px"><div class="h" style="font-size:30px;line-height:1">Заявок</div><div class="body" style="font-size:17px;margin-top:6px">с рекламы</div></div></div>
  <div style="margin-top:14px"><span class="pill">Условный пример</span></div>
 </div>
 <div class="tile t" style="grid-column:span 8;height:240px">
  <div class="lbl" style="font-size:16px;margin-bottom:18px">Тестирую 4 креатива</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
   <div class="cr">A</div><div class="cr">B</div><div class="cr lead">C · лидер</div><div class="cr">D</div></div>
 </div>
 <div class="t" style="grid-column:span 4;height:240px;background:#0F1216;border-radius:28px;color:#FFFFFF">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
   <span style="width:64px;height:64px;border-radius:50%;border:3px solid #FFFFFF;display:grid;place-items:center;padding-left:4px">${play(26, "#FFFFFF")}</span>${arrowUp(30, "#FFFFFF")}</div>
  <div class="h" style="font-size:58px;line-height:1;color:#FFFFFF;margin-top:30px;letter-spacing:.04em">Смотри</div>
  <div class="lbl" style="font-size:15px;color:#AEB7C3;margin-top:10px">Как я это чиню</div>
 </div>
</div>
${sig({ left: 88, right: 88, bottom: 77, size: 40, act: "Смотри", ruleH: 19, withArrow: true })}`,
  },
};

const browser = await chromium.launch();
try {
  for (const [name, d] of Object.entries(IMAGES)) {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${base}body{width:${d.w}px;height:${d.h}px}</style></head><body>${d.html}</body></html>`;
    const file = path.join(OUT, name.replace(/\.png$/, ".html"));
    fs.writeFileSync(file, html);
    const p = await browser.newPage({ viewport: { width: d.w, height: d.h }, deviceScaleFactor: 1 });
    await p.goto(pathToFileURL(file).href);
    await p.evaluate(() => document.fonts.ready);
    /* проверки: строки не вылезают за картинку, мазок не переносится */
    const bad = await p.evaluate(() => {
      const out = [];
      for (const e of document.querySelectorAll(".h > div, .h, .body, .lbl, .sig")) {
        const r = e.getBoundingClientRect();
        if (r.right > innerWidth - 40 || r.left < 0) out.push(`вылезает: ${e.textContent.trim().slice(0, 30)} (${Math.round(r.right)})`);
      }
      for (const e of document.querySelectorAll(".hl")) if (e.getClientRects().length > 1) out.push(`мазок переносится: ${e.textContent}`);
      return out;
    });
    if (bad.length) throw new Error(`${name}: ${bad.join("; ")}`);
    const png = path.join(OUT, name);
    await p.screenshot({ path: png });
    await p.close();
    execFileSync("python3", ["-c", `from PIL import Image; im=Image.open(${JSON.stringify(png)}).convert("RGB"); im.save(${JSON.stringify(png)}, optimize=True)`]);
    fs.rmSync(file);
    console.log(path.relative(process.cwd(), png));
  }
} finally {
  await browser.close();
}
