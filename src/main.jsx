import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
/* шрифты свои, с этого же сайта (без запросов к Google Fonts): браузер
   скачивает только нужные наборы букв (латиница, кириллица, казахские) */
import "@fontsource/oswald/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./styles.css";
import App from "./App.jsx";
import { langFromPath } from "./seo.js";

/* На сайте HTML уже собран заранее (scripts/build-site.mjs), и React
   только "оживляет" его (hydrate). В разработке и в превью root пустой,
   тогда страница рисуется с нуля. Язык берётся из адреса: /, /kk/, /en/. */
const el = document.getElementById("root");
const app = <App initialLang={langFromPath(window.location.pathname)} />;

if (el.hasChildNodes()) hydrateRoot(el, app);
else createRoot(el).render(app);
