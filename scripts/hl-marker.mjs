// Мазок маркера для жёлтой плашки .hl (src/styles.css): начало, середина
// (растягивается по длине слова) и конец. Печатает CSS трёх вариантов
// (.hl-a, .hl-b, .hl-c); его вставляют в styles.css вместо старого.
// Запуск: node scripts/hl-marker.mjs > /tmp/hl.css
// Числа случайные, но с постоянным seed: каждый запуск даёт то же самое.
// Единица = 0.01em. Высота плашки 103 (1.031em), начало и конец по 42.
// Текст начинается в начале с x=20, кончается в конце на x=22.
const H = 103, C = 42, M = 100;

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
const num = (n) => { const t = f(n); return t; };
const P = (pts) => {
  const q = pts.map(([x, y]) => [Math.round(x * 2) / 2, Math.round(y * 2) / 2]);
  let d = 'M' + num(q[0][0]) + ' ' + num(q[0][1]) + 'l';
  for (let i = 1; i < q.length; i++) {
    const dx = num(q[i][0] - q[i - 1][0]), dy = num(q[i][1] - q[i - 1][1]);
    d += (i > 1 && !dx.startsWith('-') ? ' ' : '') + dx + (dy.startsWith('-') ? '' : ' ') + dy;
  }
  return d;
};
const lerp = (a, b, t) => a + (b - a) * t;

function variant(seed, o) {
  const r = rng(seed);
  const noise = (amp, k) => {
    const ph = [r() * 6.28, r() * 6.28, r() * 6.28], kk = [k, k * 2.3, k * 5.1];
    return (t) => amp * (0.6 * Math.sin(kk[0] * t + ph[0]) + 0.28 * Math.sin(kk[1] * t + ph[1]) + 0.12 * Math.sin(kk[2] * t + ph[2]));
  };
  const jit = (a) => (r() - 0.5) * 2 * a;
  // уровни краёв на стыках: слева (стык начало|середина) и справа (середина|конец)
  const tl = 3 + o.rise / 2 + o.thick, tr = 3 - o.rise / 2;
  const bl = 100 + o.rise / 2 - o.thick, br = 100 - o.rise / 2;
  const Y = '%23F0E60D', D = '%23D2C400', L = '%23FFF9A8';

  // светлые полосы от неровного нажатия вдоль всего мазка
  const streakY = o.streaks; // [y, h, opacity]
  const sg = streakY.map((_, i) => `<linearGradient id='s${i}'>${[0, .33, .66, 1].map((o2) => `<stop offset='${o2}' stop-color='${L}' stop-opacity='${f2(.35 + r() * .65)}'/>`).join('')}</linearGradient>`).join('');
  const streaks = (x0, x1, fade) => streakY.map(([y, h, op], i) =>
    `<rect x='${f(x0)}' y='${y}' width='${f(x1 - x0)}' height='${h}' fill='${fade === 'plain' ? L : `url(%23${fade ? 'g0' : 's' + i})`}' opacity='${op}'/>`).join('');
  // контур рисуется один раз: края стыка вынесены за рамку картинки, поэтому видны только верх, низ и торец
  const body = (d, w, h, extra, defs) => `<defs><path id='p' d='${d}'/><clipPath id='c'><use href='%23p'/></clipPath>${defs}</defs><g clip-path='url(%23c)'><rect width='${w}' height='${h}' fill='${Y}'/>${extra}<use href='%23p' fill='none' stroke='${D}' stroke-width='4' opacity='.12'/></g>`;

  // ---------- середина ----------
  const nT = noise(o.amp, 2 * Math.PI * o.k), nB = noise(o.amp, 2 * Math.PI * o.k * 1.2);
  const N = 20, top = [], bot = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, env = Math.sin(Math.PI * t);
    top.push([t * M, lerp(tl, tr, t) + (nT(t) - nT(0) * (1 - t) - nT(1) * t) * env + (i && i < N ? jit(0.35) : 0) + o.sag * env]);
    bot.push([t * M, lerp(bl, br, t) + (nB(t) - nB(0) * (1 - t) - nB(1) * t) * env + (i && i < N ? jit(0.35) : 0) - o.sag * 0.4 * env]);
  }
  const ext = (pts, a, b) => [[a, pts[0][1]], ...pts, [b, pts[pts.length - 1][1]]];
  const midD = P([...ext(top, -4, M + 4), ...ext(bot, -4, M + 4).reverse()]) + 'z';
  const dens = `<linearGradient id='q'><stop offset='0' stop-color='${D}' stop-opacity='.05'/><stop offset='.6' stop-color='${D}' stop-opacity='.12'/><stop offset='1' stop-color='${D}' stop-opacity='.07'/></linearGradient>`;
  const mid = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${M} ${H}' preserveAspectRatio='none'>${body(midD, M, H, `<rect width='${M}' height='${H}' fill='url(%23q)'/>${streaks(0, M)}`, dens + sg)}</svg>`;

  // ---------- край (начало или конец) ----------
  function cap(side) {
    // side 'L': стык при x=C, край слева; side 'R': стык при x=0, край справа
    const yT = side === 'L' ? tl : tr, yB = side === 'L' ? bl : br;
    const eT = side === 'L' ? o.sT : o.eT, eB = side === 'L' ? o.sB : o.eB; // x края сверху и снизу
    const ncT = noise(o.amp * 0.7, 0.16), ncB = noise(o.amp * 0.7, 0.19);
    const dist = (x) => (side === 'L' ? C - x : x); // расстояние от стыка
    const edgeTop = (x) => yT + (ncT(dist(x)) - ncT(0)) * Math.min(1, dist(x) / 14) + (side === 'L' ? 0.9 : 0.6) * (dist(x) / C) ** 2;
    const edgeBot = (x) => yB + (ncB(dist(x)) - ncB(0)) * Math.min(1, dist(x) / 14) - (side === 'L' ? 1.2 : 0.9) * (dist(x) / C) ** 2;
    const xs = [];
    if (side === 'L') { for (let x = C; x > eT + 2; x -= 5) xs.push(x); }
    else { for (let x = 0; x < eT - 2; x += 5) xs.push(x); }
    const topPts = xs.map((x, i) => [x, edgeTop(x) + (i ? jit(0.3) : 0)]);
    // торец: скос "/" (сверху дальше вправо), лёгкий выгиб, неровность
    const n = 12, endPts = [];
    const bulge = side === 'L' ? -o.bulge : o.bulge;
    for (let i = 0; i <= n; i++) {
      const s = i / n;
      let x = lerp(eT, eB, s) + bulge * Math.sin(Math.PI * s) + jit(side === 'L' ? 0.5 : 0.8);
      // сухие просветы на конце: край отступает там, где светлые полосы
      if (side === 'R') o.notches.forEach(([ys, depth]) => { const y = lerp(yT, yB, s); x -= depth * Math.exp(-(((y - ys) / 4) ** 2)); });
      // скруглённые углы
      const corner = Math.min(s, 1 - s);
      const round = corner < 0.12 ? (0.12 - corner) * (side === 'L' ? 14 : -14) : 0;
      const y = lerp(edgeTop(eT) + 0.2, edgeBot(eB) - 0.2, s);
      endPts.push([x + round, y]);
    }
    const botXs = side === 'L' ? xs.slice().reverse() : xs.slice().reverse();
    const botPts = botXs.map((x, i) => [x, edgeBot(x) + (i < botXs.length - 1 ? jit(0.3) : 0)]);
    const J = side === 'L' ? C + 4 : -4; // стык за рамкой
    const outline = [[J, topPts[0][1]], ...topPts, ...endPts, ...botPts, [J, botPts[botPts.length - 1][1]]];
    const shape = P(outline) + 'z';
    // густая краска у торца: там маркер задержался
    const pool = `<path d='${P(endPts)}' fill='none' stroke='${D}' stroke-width='11' opacity='${side === 'L' ? '.17' : '.12'}'/>`;
    let defs = '';
    let st;
    if (side === 'R') {
      // к концу полосы светлеют сильнее: краска редеет
      defs += `<linearGradient id='g0'><stop offset='.2' stop-color='${L}' stop-opacity='.4'/><stop offset='1' stop-color='${L}'/></linearGradient>`;
      st = streaks(0, C, true);
    } else st = streaks(o.sT + 3, C, 'plain');
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${C} ${H}' preserveAspectRatio='none'>${body(shape, C, H, st + pool, defs)}</svg>`;
  }
  return { left: cap('L'), mid, right: cap('R') };
}

const V = {
  a: variant(11, { rise: 4.5, thick: 0.8, sag: 1.2, amp: 1.9, k: 1.3, sT: 13, sB: 3, bulge: 1.6, eT: 40, eB: 29, streaks: [[34, 1.5, .4], [61, 2.5, .35]], notches: [[34, 3], [61, 3.5]] }),
  b: variant(23, { rise: -3, thick: 0, sag: -0.9, amp: 2.1, k: 1.7, sT: 11, sB: 2.5, bulge: 2, eT: 38, eB: 30, streaks: [[27, 2, .35], [52, 1.5, .35], [77, 2, .3]], notches: [[27, 3.5], [77, 2.5]] }),
  c: variant(37, { rise: 2.5, thick: 0.5, sag: 1.6, amp: 1.7, k: 1.1, sT: 14, sB: 4, bulge: 1.2, eT: 41, eB: 31, streaks: [[44, 2.5, .35], [70, 1.5, .4]], notches: [[44, 4], [70, 2.5]] }),
};
const enc = (s) => s.replace(/"/g, "'").replace(/</g, '%3C').replace(/>/g, '%3E');
let css = '';
for (const k of Object.keys(V)) {
  css += `.hl-${k} {\n  --hl-l: url("data:image/svg+xml,${enc(V[k].left)}");\n  --hl-m: url("data:image/svg+xml,${enc(V[k].mid)}");\n  --hl-r: url("data:image/svg+xml,${enc(V[k].right)}");\n}\n`;
}
process.stdout.write(css);
