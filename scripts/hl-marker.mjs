// Мазок маркера для жёлтой плашки .hl (src/styles.css): начало, середина
// (растягивается по длине слова) и конец. Печатает CSS трёх вариантов
// (.hl-a, .hl-b, .hl-c); его вставляют в styles.css вместо старого блока.
// Запуск: node scripts/hl-marker.mjs > /tmp/hl.css
// Числа случайные, но с постоянным seed: каждый запуск даёт то же самое.
//
// Единица = 0.01em. Картинка высотой 109 (1.09em, сдвиг 0.23em от верха
// строки): прямая плашка была 2.8..105.9, мазок гуляет вокруг этих краёв.
// Начало и конец по 42 (0.42em): текст начинается в начале с x=20 и
// кончается в конце на x=22.

const H = 109, C = 42, M = 100;
const TOP = 2.8, BOT = 105.9;

function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = (n) => {
  const v = Math.round(n * 2) / 2;
  return (Object.is(v, -0) ? 0 : v).toString().replace(/^0\./, '.').replace(/^-0\./, '-.');
};
const f2 = (n) => (Math.round(n * 100) / 100).toString().replace(/^0\./, '.');
// компактный путь: M x y, дальше относительные отрезки
const P = (pts, close) => {
  const q = pts.map(([x, y]) => [Math.round(x * 2) / 2, Math.round(y * 2) / 2]);
  let d = 'M' + f(q[0][0]) + ' ' + f(q[0][1]) + 'l';
  for (let i = 1; i < q.length; i++) {
    const dx = f(q[i][0] - q[i - 1][0]), dy = f(q[i][1] - q[i - 1][1]);
    d += (i > 1 && !dx.startsWith('-') ? ' ' : '') + dx + (dy.startsWith('-') ? '' : ' ') + dy;
  }
  return d + (close ? 'z' : '');
};
const lerp = (a, b, t) => a + (b - a) * t;

const Y = '%23F0E60D', D = '%23C9BB00', L = '%23FFF9B0';

function variant(seed, o) {
  const r = rng(seed);
  const jit = (a) => (r() - 0.5) * 2 * a;
  const noise = (amp, k) => {
    const ph = [r() * 6.28, r() * 6.28, r() * 6.28], kk = [k, k * 2.3, k * 5.7];
    return (t) => amp * (0.6 * Math.sin(kk[0] * t + ph[0]) + 0.27 * Math.sin(kk[1] * t + ph[1]) + 0.13 * Math.sin(kk[2] * t + ph[2]));
  };
  // края на стыках: начало|середина и середина|конец. rise: правый край выше
  const tl = TOP + o.rise / 2 + o.thick, tr = TOP - o.rise / 2;
  const bl = BOT + o.rise / 2 - o.thick, br = BOT - o.rise / 2;

  // светлые полосы от неровного нажатия и тёмные следы войлока
  const light = o.light, dark = o.dark; // [y, h, opacity]
  const grad = (id, color) => `<linearGradient id='${id}'>${[0, .22, .45, .7, 1].map((s) => `<stop offset='${s}' stop-color='${color}' stop-opacity='${f2(r() < .35 ? r() * .15 : .45 + r() * .55)}'/>`).join('')}</linearGradient>`;
  const sgDefs = light.map((_, i) => grad('s' + i, L)).join('') + dark.map((_, i) => grad('t' + i, D)).join('');
  const streaks = (x0, x1, endFade) =>
    light.map(([y, h, op], i) => `<rect x='${f(x0)}' y='${y}' width='${f(x1 - x0)}' height='${h}' fill='url(%23${endFade ? 'e' : 's' + i})' opacity='${op}'/>`).join('') +
    dark.map(([y, h, op], i) => `<rect x='${f(x0)}' y='${y}' width='${f(x1 - x0)}' height='${h}' fill='url(%23t${i})' opacity='${op}'/>`).join('');
  // фигура и обводка краёв (краска собирается у краёв мазка): контур рисуется
  // один раз, стык вынесен за рамку картинки, поэтому его не видно
  const rimStyle = `fill='none' stroke='${D}' stroke-width='3.5' opacity='.2'`;
  const body = (d, w, extra, defs, rim) => `<defs><path id='p' d='${d}'/><clipPath id='c'><use href='%23p'/></clipPath>${defs}</defs><g clip-path='url(%23c)'><rect width='${w}' height='${H}' fill='${Y}'/>${extra}${rim ?? `<use href='%23p' ${rimStyle}/>`}</g>`;
  const svg = (w, inner) => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${H}' preserveAspectRatio='none'>${inner}</svg>`;

  // ---------- середина ----------
  const nT = noise(o.amp, 2 * Math.PI * o.k), nB = noise(o.amp, 2 * Math.PI * o.k * 1.25);
  const N = 22, top = [], bot = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, env = Math.sin(Math.PI * t), inner = i && i < N;
    top.push([t * M, lerp(tl, tr, t) + (nT(t) - lerp(nT(0), nT(1), t)) * env + (inner ? jit(o.jit) : 0) + o.sag * env]);
    bot.push([t * M, lerp(bl, br, t) + (nB(t) - lerp(nB(0), nB(1), t)) * env + (inner ? jit(o.jit) : 0) - o.sag * 0.5 * env]);
  }
  const ext = (pts) => [[-4, pts[0][1]], ...pts, [M + 4, pts[pts.length - 1][1]]];
  const midD = P([...ext(top), ...ext(bot).reverse()], true);
  const dens = `<linearGradient id='q'><stop offset='0' stop-color='${D}' stop-opacity='.03'/><stop offset='.55' stop-color='${D}' stop-opacity='.1'/><stop offset='1' stop-color='${D}' stop-opacity='.03'/></linearGradient>`;
  const mid = svg(M, body(midD, M, `<rect width='${M}' height='${H}' fill='url(%23q)'/>${streaks(0, M)}`, dens + sgDefs));

  // ---------- край мазка ----------
  function edgeFns(side) {
    const yT = side === 'L' ? tl : tr, yB = side === 'L' ? bl : br;
    const ncT = noise(o.amp * 0.8, 0.17), ncB = noise(o.amp * 0.8, 0.21);
    const dist = (x) => (side === 'L' ? C - x : x);
    const ramp = (x) => Math.min(1, dist(x) / 12);
    return {
      top: (x) => yT + (ncT(dist(x)) - ncT(0)) * ramp(x) + o.curl * (dist(x) / C) ** 2,
      bot: (x) => yB + (ncB(dist(x)) - ncB(0)) * ramp(x) - o.curl * 1.3 * (dist(x) / C) ** 2,
    };
  }

  // начало: скос "/" с неровным краем, краска гуще
  function startCap() {
    const e = edgeFns('L');
    const xs = []; for (let x = C; x > o.sT + 2; x -= 5) xs.push(x);
    const topPts = xs.map((x, i) => [x, e.top(x) + (i ? jit(o.jit * 0.8) : 0)]);
    const n = 14, endPts = [];
    for (let i = 0; i <= n; i++) {
      const s = i / n;
      const corner = Math.min(s, 1 - s);
      const round = corner < 0.14 ? (0.14 - corner) * 22 : 0;
      endPts.push([lerp(o.sT, o.sB, s) - o.bulge * Math.sin(Math.PI * s) + jit(0.9) + round, lerp(e.top(o.sT) + 0.3, e.bot(o.sB) - 0.3, s)]);
    }
    const bxs = []; for (let x = o.sB + 4; x < C; x += 5) bxs.push(x); bxs.push(C);
    const botPts = bxs.map((x, i) => [x, e.bot(x) + (i < bxs.length - 1 ? jit(o.jit * 0.8) : 0)]);
    const shape = P([[C + 4, topPts[0][1]], ...topPts, ...endPts, ...botPts, [C + 4, botPts[botPts.length - 1][1]]], true);
    const pool = `<path d='${P(endPts)}' fill='none' stroke='${D}' stroke-width='14' opacity='.2'/><path d='${P(endPts)}' fill='none' stroke='${D}' stroke-width='4' opacity='.2'/>`;
    return svg(C, body(shape, C, streaks(o.sT + 4, C) + pool, sgDefs));
  }

  // конец: краска кончается, мазок расходится на полоски разной длины
  function endCap() {
    const e = edgeFns('R');
    const base = (y) => lerp(o.eT, o.eB, (y - tr) / (br - tr)); // где кончается сплошная часть
    const yT = e.top(o.eT), yB = e.bot(o.eB);
    // полоски: доли высоты, длина за краем, глубина зазора до следующей
    const strips = o.strips;
    const total = strips.reduce((a, s) => a + s[0], 0);
    const xs = []; for (let x = 0; x < o.eT - 4; x += 5) xs.push(x);
    const pts = xs.map((x, i) => [x, e.top(x) + (i ? jit(o.jit * 0.8) : 0)]);
    const topRim = pts.slice();
    let y = yT;
    strips.forEach(([share, len, gapH, gapDepth], i) => {
      const th = (yB - yT) * share / total;
      const y0 = y, y1 = y + th - (i < strips.length - 1 ? gapH : 0);
      const ym = lerp(y0, y1, 0.45 + jit(0.12)), tip = base(ym) + len;
      pts.push([base(y0) - (i ? gapDepth : 0), y0]);
      // полоска сужается к кончику: верх и низ сходятся почти в точку
      pts.push([lerp(base(y0), tip, 0.5) + jit(0.6), lerp(y0, ym, 0.25)]);
      pts.push([tip + jit(0.3), ym]);
      pts.push([lerp(base(y1), tip, 0.45) + jit(0.6), lerp(y1, ym, 0.3)]);
      pts.push([base(y1) - (i < strips.length - 1 ? strips[i + 1][3] : 0), y1]);
      y = y0 + th;
    });
    const botStart = pts.length;
    const bxs = []; for (let x = o.eB - 5; x > 0; x -= 5) bxs.push(x); bxs.push(0);
    bxs.forEach((x, i) => pts.push([x, e.bot(x) + (i < bxs.length - 1 ? jit(o.jit * 0.8) : 0)]));
    const shape =P([[-4, pts[0][1]], ...pts, [-4, pts[pts.length - 1][1]]], true);
    const botRim = pts.slice(botStart);
    const rim = `<path d='${P([[-4, topRim[0][1]], ...topRim])}' ${rimStyle}/><path d='${P([...botRim, [-4, botRim[botRim.length - 1][1]]])}' ${rimStyle}/>`;
    // ближе к концу краска редеет: светлеет к краю
    const fade = `<linearGradient id='e'><stop offset='.35' stop-color='${L}' stop-opacity='.2'/><stop offset='1' stop-color='${L}'/></linearGradient><linearGradient id='w'><stop offset='.45' stop-color='${L}' stop-opacity='0'/><stop offset='1' stop-color='${L}' stop-opacity='.55'/></linearGradient>`;
    return svg(C, body(shape, C, streaks(0, C, true) + `<rect width='${C}' height='${H}' fill='url(%23w)'/>`, sgDefs + fade, rim));
  }

  return { left: startCap(), mid, right: endCap() };
}

const V = {
  a: variant(11, { rise: 6, thick: 1, sag: 2, amp: 3, k: 1.3, jit: 0.8, curl: 1.4, sT: 15, sB: 2.5, bulge: 2.4, eT: 30, eB: 25,
    strips: [[12, 9, 1.4, 4], [7, 3, 1.2, 6], [14, 13, 1.6, 3], [9, 5, 1.2, 7], [11, 8, 1.4, 4], [8, 2, 1.2, 6], [13, 11, 1.4, 3], [9, 4, 0, 5]],
    light: [[31, 1.6, .5], [57, 2.2, .45], [80, 1.2, .5]], dark: [[45, 1, .16]] }),
  b: variant(23, { rise: -4, thick: 0, sag: -1.5, amp: 3.4, k: 1.7, jit: 0.9, curl: 1.8, sT: 13, sB: 2, bulge: 3, eT: 28, eB: 26,
    strips: [[9, 5, 1.2, 5], [14, 12, 1.6, 3], [8, 3, 1.2, 7], [12, 10, 1.4, 4], [10, 6, 1.2, 5], [13, 14, 1.4, 3], [9, 4, 0, 6]],
    light: [[24, 2, .45], [52, 1.4, .5], [76, 2, .4]], dark: [[38, 1, .15], [90, .8, .15]] }),
  c: variant(37, { rise: 4, thick: .6, sag: 2.6, amp: 2.8, k: 1.1, jit: 0.8, curl: 1.2, sT: 16, sB: 3.5, bulge: 1.8, eT: 31, eB: 26,
    strips: [[8, 4, 1.2, 6], [13, 11, 1.4, 3], [10, 6, 1.4, 6], [14, 13, 1.6, 3], [7, 2, 1.2, 7], [12, 9, 1.4, 4], [10, 5, 0, 5]],
    light: [[40, 2.2, .45], [67, 1.4, .5], [88, 1, .45]], dark: [[20, .8, .15], [55, 1, .16]] }),
};

const enc = (s) => s.replace(/"/g, "'").replace(/</g, '%3C').replace(/>/g, '%3E');
let css = '';
for (const k of Object.keys(V)) {
  css += `.hl-${k} {\n  --hl-l: url("data:image/svg+xml,${enc(V[k].left)}");\n  --hl-m: url("data:image/svg+xml,${enc(V[k].mid)}");\n  --hl-r: url("data:image/svg+xml,${enc(V[k].right)}");\n}\n`;
}
process.stdout.write(css);
