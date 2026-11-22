/* Точка входа для сборки готового HTML (запускается в Node при сборке,
   в браузер не попадает). Отдаёт разметку страницы на нужном языке и
   данные для мета-тегов и структурированной разметки. */
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export { CONTENT } from "./data.jsx";
export { UI } from "./i18n.jsx";
export { CONTACTS } from "./config.js";
export { SEO, LANG_PATHS, LOCALES, structuredData } from "./seo.js";

export function render(lang) {
  return renderToString(<App initialLang={lang} />);
}
