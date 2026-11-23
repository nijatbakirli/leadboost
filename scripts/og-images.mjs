/* ============================================================
   Картинки превью ссылок img/og/og-{ru,en}.jpg (1200×630).
   Перерисовывать, когда меняется главный заголовок на сайте
   (hero.h1 / hero.h1Mark в src/i18n.jsx) или цифра 4 617.

   Запуск: node scripts/og-images.mjs
   Нужен Playwright с Chromium (npm i -D playwright && npx playwright
   install chromium) и Python с Pillow для сжатия в JPEG.

   Вид как на сайте: бумага с сеткой 60px, логотип, заголовок Oswald
   с мазком маркера на последней строке (те же картинки .hl-a/b/c из
   styles.css, тот же выбор варианта по тексту), белая карточка
   с цифрой из кабинета, подпись «TARGET PRO ├──┤ НАПИСАТЬ →».
   Подписи без «//». Казахскую картинку убрали вместе с казахской
   версией сайта (23.11.2026).
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = require("playwright");

/* тексты: держать в соответствии с hero.h1 / hero.h1Mark в src/i18n.jsx */
const L = {
  ru: { h: ["Таргет в Instagram", "и Facebook"], mark: "для бизнеса", cl: "Из моего кабинета Meta", num: "4 617", unit: "переписок", sub: "по $0,57 за каждую", cta: "Написать" },
  en: { h: ["Instagram and", "Facebook ads"], mark: "for businesses", cl: "From my Meta ad account", num: "4,617", unit: "conversations", sub: "$0.57 each", cta: "Message me" },
};

/* тот же выбор варианта мазка, что в Mark (src/widgets.jsx) */
function hlVariant(text) {
  let h = 0x811c9dc5;
  for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0; h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0; h ^= h >>> 16;
  return "abc"[(h >>> 0) % 3];
}

const font = (pkg, file) => pathToFileURL(path.join(ROOT, "node_modules/@fontsource", pkg, "files", file)).href;
const faces = [];
for (const sub of ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]) {
  faces.push(`@font-face{font-family:Oswald;font-weight:700;src:url(${font("oswald", `oswald-${sub}-700-normal.woff2`)})}`);
  faces.push(`@font-face{font-family:Inter;font-weight:500;src:url(${font("inter", `inter-${sub}-500-normal.woff2`)})}`);
  faces.push(`@font-face{font-family:Inter;font-weight:700;src:url(${font("inter", `inter-${sub}-700-normal.woff2`)})}`);
  faces.push(`@font-face{font-family:JBM;font-weight:700;src:url(${font("jetbrains-mono", `jetbrains-mono-${sub}-700-normal.woff2`)})}`);
}
const css = fs.readFileSync(path.join(ROOT, "src/styles.css"), "utf8");
const hlCss = css.slice(css.indexOf("@property --hlp"), css.indexOf("/* моно-лейбл капсом"));
const logo = fs.readFileSync(path.join(ROOT, "img/logo.svg"), "utf8").replace(/width="\d+" height="\d+"/, 'height="44"');
const arrow = '<svg width="24" height="20" viewBox="0 0 24 20"><path d="M0 10h21M13 2l8 8-8 8" fill="none" stroke="#0F1216" stroke-width="2.6"/></svg>';

const page = (d) => `<!doctype html><html><head><meta charset="utf-8"><style>${faces.join("")}
*{margin:0;box-sizing:border-box}
body{--ink:#0F1216;--y-ink:#0F1216;width:1200px;height:630px;position:relative;overflow:hidden;background:#FAFAF7;
 background-image:linear-gradient(rgba(15,18,22,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(15,18,22,.05) 1px,transparent 1px);background-size:60px 60px;background-position:-1px -1px}
.lbl{font-family:JBM;font-weight:700;text-transform:uppercase}
.logo{position:absolute;left:72px;top:64px;height:44px}.logo svg{height:44px;width:auto;display:block}
.h{position:absolute;left:72px;top:150px;width:660px;font:700 66px/78px Oswald;color:#0F1216;letter-spacing:-.005em;text-transform:uppercase}
.h .hm{margin-top:.16em}
.card{position:absolute;left:799px;top:178px;width:328px;height:265px;background:#FFFFFF;border:2px solid #E3E4DF;border-radius:22px;padding:28px 30px}
.cl{font-size:14px;line-height:20px;letter-spacing:.06em;color:#5C6570}
${d.interLabel ? ".cl{font-family:Inter;font-weight:700;letter-spacing:.04em}" : ""}
.num{font:700 100px/1 Oswald;color:#0F1216;margin-top:18px;letter-spacing:-.01em}
.unit{font:700 30px/1 Oswald;color:#0F1216;margin-top:10px;text-transform:uppercase}
.sub{font:500 19px/1 Inter;color:#5C6570;margin-top:14px}
.foot{position:absolute;left:72px;right:72px;bottom:46px;display:flex;align-items:center;gap:24px;font-size:26px;line-height:1;letter-spacing:.06em;color:#0F1216}
.rule{flex:1;height:14px;border-left:3px solid #0F1216;border-right:3px solid #0F1216;position:relative}
.rule:before{content:'';position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1.5px;background:#0F1216}
.cta{display:flex;align-items:center;gap:12px}
${hlCss}</style></head><body>
<div class="logo">${logo}</div>
<div class="h">${d.h.map((l) => `<div>${l}</div>`).join("")}<div class="hm"><span class="hl hl-${hlVariant(d.mark)} show">${d.mark}</span></div></div>
<div class="card"><div class="cl lbl">${d.cl}</div><div class="num">${d.num}</div><div class="unit">${d.unit}</div><div class="sub">${d.sub}</div></div>
<div class="foot lbl"><span>TARGET PRO</span><span class="rule"></span><span class="cta">${d.cta}${arrow}</span></div>
</body></html>`;

const tmp = fs.mkdtempSync(path.join(ROOT, ".build-og-"));
const browser = await chromium.launch();
try {
  for (const [lang, d] of Object.entries(L)) {
    const html = path.join(tmp, `og-${lang}.html`), png = path.join(tmp, `og-${lang}.png`);
    fs.writeFileSync(html, page(d));
    const p = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await p.goto(pathToFileURL(html).href);
    await p.evaluate(() => document.fonts.ready);
    /* строки заголовка не должны заходить на карточку (она с 799px) */
    const right = await p.evaluate(() => Math.max(...[...document.querySelectorAll(".h > div")].map((e) => { const r = document.createRange(); r.selectNodeContents(e); return r.getBoundingClientRect().right; })));
    if (right > 770) throw new Error(`${lang}: строка заголовка доходит до ${Math.round(right)}px и задевает карточку`);
    await p.screenshot({ path: png });
    await p.close();
    execFileSync("python3", ["-c", `from PIL import Image; Image.open(${JSON.stringify(png)}).convert("RGB").save(${JSON.stringify(path.join(ROOT, "img/og", `og-${lang}.jpg`))}, quality=88, optimize=True, progressive=True)`]);
    console.log(`img/og/og-${lang}.jpg`);
  }
} finally {
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
