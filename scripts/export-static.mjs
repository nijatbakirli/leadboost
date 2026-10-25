/* ============================================================
   Сборка готового сайта для Vercel в папку public/.
   Vercel без фреймворка ищет готовый сайт в public/ (раньше её не было,
   и каждый деплой падал с "No Output Directory named public").
   Сюда копируется только то, что нужно браузеру: index.html, бандл
   из dist/ (без .map) и картинки из img/. Папка api/ сюда не нужна:
   Vercel подхватывает серверные функции из корня проекта сам.
   ============================================================ */
import { rmSync, mkdirSync, copyFileSync, cpSync, existsSync } from "node:fs";

const OUT = "public";

rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/dist`, { recursive: true });

copyFileSync("index.html", `${OUT}/index.html`);
for (const f of ["main.js", "main.css"]) {
  if (!existsSync(`dist/${f}`)) throw new Error(`dist/${f} не найден: сначала npm run build`);
  copyFileSync(`dist/${f}`, `${OUT}/dist/${f}`);
}
cpSync("img", `${OUT}/img`, { recursive: true });

console.log("public/ готова: index.html, dist/main.js, dist/main.css, img/");
