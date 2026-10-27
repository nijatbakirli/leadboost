/* ============================================================
   Сборка готового сайта в public/ (её запускает Vercel: npm run build:site)

   1. Бандл для браузера с хэшем в имени (public/assets/main-XXXX.js|css),
      чтобы файлы можно было кэшировать навсегда.
   2. Готовый HTML для каждого языка: /, /kk/, /en/. Страница рендерится
      React-ом заранее, поэтому поисковики и превью ссылок в мессенджерах
      видят весь текст без JavaScript. В браузере React её "оживляет".
   3. В <head> каждой страницы: title, description, canonical, hreflang,
      Open Graph, Twitter и JSON-LD (src/seo.js).
   4. robots.txt, sitemap.xml, site.webmanifest, favicon.ico, 404.html.

   Адрес сайта для canonical/sitemap: SITE_URL, иначе домен проекта на
   Vercel (VERCEL_PROJECT_PRODUCTION_URL, Vercel задаёт его сам: если
   подключить свой домен, он подставится при следующей сборке).
   ============================================================ */
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const OUT = "public";
const TMP = ".build";
const prodDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const SITE = (process.env.SITE_URL || (prodDomain ? `https://${prodDomain}` : "https://leadboost.vercel.app")).replace(/\/+$/, "");
if (!process.env.SITE_URL && !prodDomain) console.warn(`! SITE_URL не задан, в canonical и sitemap будет ${SITE}`);

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

rmSync(OUT, { recursive: true, force: true });
rmSync(TMP, { recursive: true, force: true });
mkdirSync(`${OUT}/assets`, { recursive: true });

/* ---------- 1. бандл для браузера ---------- */
const shared = {
  bundle: true,
  jsx: "automatic",
  loader: { ".png": "dataurl", ".woff2": "file", ".woff": "file" },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
};
const client = await build({
  ...shared,
  entryPoints: ["src/main.jsx"],
  outdir: `${OUT}/assets`,
  entryNames: "[name]-[hash]",
  assetNames: "[name]-[hash]",
  publicPath: "/assets/",
  minify: true,
  target: ["es2019"],
  legalComments: "none",
  metafile: true,
});
const outputs = Object.keys(client.metafile.outputs).map((p) => "/" + p.replace(/^public\//, ""));
const JS = outputs.find((p) => p.endsWith(".js"));
const CSS = outputs.find((p) => p.endsWith(".css"));
/* стили встраиваются прямо в HTML: на один запрос меньше до первой отрисовки */
const CSS_TEXT = readFileSync(OUT + CSS, "utf8");
/* шрифты первого экрана грузим заранее: заголовок (Oswald) и текст (Inter) */
const font = (re) => outputs.find((p) => re.test(p));
const PRELOAD = {
  cyrillic: [font(/oswald-cyrillic-700-normal-[^/]+\.woff2$/), font(/inter-cyrillic-500-normal-[^/]+\.woff2$/)],
  latin: [font(/oswald-latin-700-normal-[^/]+\.woff2$/), font(/inter-latin-500-normal-[^/]+\.woff2$/)],
};
for (const f of [...PRELOAD.cyrillic, ...PRELOAD.latin]) if (!f) throw new Error("Не нашёл файлы шрифтов для preload");

/* ---------- 2. рендер страниц в Node ---------- */
await build({
  ...shared,
  entryPoints: ["src/prerender.jsx"],
  outfile: `${TMP}/prerender.cjs`,
  platform: "node",
  format: "cjs",
  target: ["node18"],
});
const pre = createRequire(import.meta.url)(resolve(`${TMP}/prerender.cjs`));
const { render, CONTENT, CONTACTS, SEO, LANG_PATHS, LOCALES, structuredData } = pre;
const LANGS = Object.keys(LANG_PATHS);

const template = readFileSync("index.html", "utf8");
const START = template.indexOf("<!-- seo:start");
const END = template.indexOf("<!-- seo:end -->") + "<!-- seo:end -->".length;
if (START < 0 || END < START) throw new Error("В index.html нет блока <!-- seo:start --> ... <!-- seo:end -->");

function head(lang) {
  const s = SEO[lang];
  const url = SITE + LANG_PATHS[lang];
  const img = `${SITE}/img/og/og-${lang}.jpg`;
  const ld = JSON.stringify(structuredData({ site: SITE, lang, content: CONTENT[lang], contacts: CONTACTS })).replace(/</g, "\\u003c");
  const preload = PRELOAD[lang === "en" ? "latin" : "cyrillic"]
    .map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin />`);
  return [
    ...preload,
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE + LANG_PATHS[l]}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="LeadBoost" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(s.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(s.ogDescription)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(s.ogImageAlt)}" />`,
    `<meta property="og:locale" content="${LOCALES[lang]}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALES[l]}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(s.ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(s.ogDescription)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<script type="application/ld+json">${ld}</script>`,
  ].join("\n  ");
}

function page(lang) {
  let html = template.slice(0, START) + head(lang) + template.slice(END);
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  const cssLink = '<link rel="stylesheet" href="/dist/main.css" />';
  if (!html.includes(cssLink) || !html.includes('src="/dist/main.js"')) throw new Error("Не нашёл /dist/main.css или /dist/main.js в index.html");
  html = html.replace(cssLink, () => `<style>${CSS_TEXT}</style>`);
  html = html.replace('src="/dist/main.js"', `src="${JS}"`);
  html = html.replace('<div id="root"></div>', `<div id="root">${render(lang)}</div>`);
  return html;
}

for (const lang of LANGS) {
  const dir = OUT + LANG_PATHS[lang];
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}index.html`, page(lang));
}

/* ---------- 3. статика и служебные файлы ---------- */
cpSync("img", `${OUT}/img`, { recursive: true });
copyFileSync("img/icons/favicon.ico", `${OUT}/favicon.ico`);

writeFileSync(`${OUT}/robots.txt`, [
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "",
  `Sitemap: ${SITE}/sitemap.xml`,
  "",
].join("\n"));

const today = new Date().toISOString().slice(0, 10);
const alternates = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE + LANG_PATHS[l]}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`).join("\n");
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>
    <loc>${SITE + LANG_PATHS[l]}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`).join("\n")}
</urlset>
`);

writeFileSync(`${OUT}/site.webmanifest`, JSON.stringify({
  name: "LeadBoost",
  short_name: "LeadBoost",
  lang: "ru",
  start_url: "/",
  display: "browser",
  background_color: "#0F1216",
  theme_color: "#0F1216",
  icons: [
    { src: "/img/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/img/icons/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
}, null, 2));

writeFileSync(`${OUT}/404.html`, `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Страница не найдена | LeadBoost</title>
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="stylesheet" href="${CSS}" />
  <style>
    html,body{margin:0;background:#0F1216;color:#D3D9E2;font:500 17px/1.55 Inter,-apple-system,'Segoe UI',sans-serif}
    body{min-height:100vh;display:flex;align-items:center;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:60px 60px}
    main{max-width:640px;margin:0 auto;padding:40px max(16px,env(safe-area-inset-left,0px))}
    .lbl{font:700 14px/1.3 'JetBrains Mono',monospace;letter-spacing:.06em;color:#E9EDF2;margin:0 0 18px}
    h1{font:700 clamp(40px,9vw,72px)/1.2 Oswald,'Arial Narrow',sans-serif;text-transform:uppercase;color:#fff;margin:0 0 18px}
    h1 span{background:#F0E60D;color:#0F1216;padding:0 .13em}
    a{display:inline-block;margin-top:10px;background:#F0E60D;color:#0F1216;text-decoration:none;font:700 18px/1 Oswald,sans-serif;text-transform:uppercase;letter-spacing:.06em;padding:16px 22px;border-radius:14px}
    a:focus-visible{outline:3px solid #fff;outline-offset:3px}
  </style>
</head>
<body>
  <main>
    <p class="lbl">// 404</p>
    <h1>Такой страницы <span>нет</span></h1>
    <p>Возможно, ссылка устарела. Всё про рекламу и сайты LeadBoost на главной.</p>
    <a href="/">На главную</a>
  </main>
</body>
</html>
`);

rmSync(TMP, { recursive: true, force: true });
console.log(`public/ готова для ${SITE}: ${LANGS.map((l) => LANG_PATHS[l]).join(", ")}, ${JS}, ${CSS}`);
