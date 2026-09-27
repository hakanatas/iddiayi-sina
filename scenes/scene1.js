/* SAHNE 1 — ÜÇ İDDİA (0–10 s)  Three claims in the school paper.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut, lerp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Okul gazetesinde yemekhane üzerine üç iddia var'],
      [10.6, 27.8, '1. iddia: “Yemeği sevmeyenler, sevenlerin 3 katı!”'],
      [28.4, 45.8, '2. iddia: “Okulumuzun çoğu yemeği sevmiyor!”'],
      [46.4, 63.8, '3. iddia: “Öğrencilerin çoğu yemeği seviyor.”'],
      [64.4, 79.8, 'Bir iddiayı sınarken sor:'],
    ]);
  }

  /* ── claim 1: a bar chart whose axis starts at 23 ── */
  function chart1(ctx, env, t) {
    const L = KD.L(env), B = L.BC, f = F(), a = win(t, 10.8, 27.8) * END(t); if (a <= 0) return;
    const m = lerp(23, 0, inOut(seg(t, 19.6, 21.4))), k = B.h / (26 - m);
    Ink.path(ctx, [[B.ax, B.base], [B.x[1] + B.bw, B.base]], { w: 4, alpha: a, seed: 3300, taper: [0, 0] });
    Ink.path(ctx, [[B.ax, B.base], [B.ax, B.base - B.h - 20]], { w: 4, alpha: a, seed: 3301, taper: [0, 0] });
    const step = 26 - m <= 4.5 ? 1 : 5;
    for (let v = Math.ceil(m / step) * step; v <= 26; v += step) {
      const y = B.base - (v - m) * k;
      Ink.path(ctx, [[B.ax - 10, y], [B.ax + 6, y]], { w: 3, alpha: a, seed: 3310 + v, taper: [0, 0] });
      f.T(ctx, String(v), B.ax - 18, y, { size: L.G.s * 0.6, alpha: a, align: 'right' });
    }
    const hot = win(t, 15.4, 19.4);
    if (hot > 0) { ctx.strokeStyle = amber(hot * a); ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(B.ax, B.base, 34, 0, Math.PI * 2); ctx.stroke(); }
    [['Seviyor', 24], ['Sevmiyor', 26]].forEach(([s, v], i) => {
      const x = B.x[i], hgt = (v - m) * k * seg(t, 11.2 + i * 0.4, 12.0 + i * 0.4);
      ctx.fillStyle = amber((i ? 0.55 : 0.3) * a); ctx.fillRect(x, B.base - hgt, B.bw, hgt);
      Ink.path(ctx, [[x, B.base], [x, B.base - hgt], [x + B.bw, B.base - hgt], [x + B.bw, B.base]], { w: 4, alpha: a, seed: 3320 + i, taper: [0, 0] });
      f.T(ctx, s, x + B.bw / 2, B.base + 34, { size: L.G.s * 0.7, alpha: a });
      f.T(ctx, String(v), x + B.bw / 2, B.base - hgt - 28, Object.assign({ size: L.G.s * 0.8, alpha: a * seg(t, 12.4, 12.8), halo: true }, f.AMB));
    });
    if (t > 22.0) f.crossInk(ctx, B.x[1] + B.bw + 80, B.base - B.h / 2, 24, seg(t, 22.0, 22.8), a);
  }

  /* ── claims 2 and 3: the whole school as 120 dots ── */
  const N = 120;
  const biased = (i) => i >= 100;                                  // the last 20 in the lunch queue
  const likesB = (i) => (i - 100) % 4 === 0;                        // 5 of those 20 like it
  const fair = (i) => i % 2 === 0;                                  // every other student, every class
  const likesF = (i) => ((i / 2) * 7) % 20 < 13;                    // 39 of 60 like it
  function school(ctx, env, t) {
    const L = KD.L(env), GD = L.GD, f = F(), a = win(t, 28.6, 63.8) * END(t); if (a <= 0) return;
    const sB = win(t, 32.4, 45.8), sF = win(t, 47.0, 63.8);
    for (let i = 0; i < N; i++) {
      const c = i % GD.cols, r = Math.floor(i / GD.cols), x = GD.x0 + c * GD.d, y = GD.y0 + r * GD.d;
      const k = seg(t, 28.8 + i * 0.01, 29.4 + i * 0.01) * a; if (k <= 0) continue;
      const pick = biased(i) ? sB : 0, pickF = fair(i) ? seg(t, 47.0 + i * 0.012, 47.5 + i * 0.012) * sF : 0, sel = Math.max(pick, pickF);
      const likes = pick > 0 ? likesB(i) : likesF(i);
      ctx.fillStyle = sel > 0 ? (likes ? amber(k * (0.25 + 0.75 * sel)) : ink(k * (0.25 + 0.6 * sel))) : ink(0.22 * k);
      ctx.beginPath(); ctx.arc(x, y, GD.r * (1 + 0.25 * sel), 0, Math.PI * 2); ctx.fill();
    }
    // the queue label
    const ql = win(t, 34.4, 45.8) * a;
    if (ql > 0) {
      const x0 = GD.x0 + 10 * GD.d - GD.d / 2, y0 = GD.y0 + 6 * GD.d - GD.d / 2, x1 = GD.x0 + 14 * GD.d + GD.d / 2, y1 = GD.y0 + 7 * GD.d + GD.d / 2;
      Ink.path(ctx, [[x0, y0], [x1, y0], [x1, y1], [GD.x0 - GD.d / 2, y1], [GD.x0 - GD.d / 2, y0 + GD.d], [x0, y0 + GD.d], [x0, y0]], { w: 3.5, alpha: ql, color: LI.AMBER_RGB, seed: 3340, taper: [0, 0] });
      f.T(ctx, 'yemekhane kuyruğunun sonu', (GD.x0 + x1) / 2, y1 + 34, Object.assign({ size: L.G.s * 0.62, alpha: ql, halo: true }, f.AMB));
    }
    if (t > 40.0 && t < 45.8) f.crossInk(ctx, GD.x0 + 15 * GD.d + 20, GD.y0 + 3.5 * GD.d, 22, seg(t, 40.0, 40.8), win(t, 40.0, 45.8) * a);
    // the fair survey as a bar chart with an axis from 0
    const B = L.B2, bk = win(t, 50.6, 63.8) * a;
    if (B && bk > 0) {
      Ink.path(ctx, [[B.x[0] - 40, B.base], [B.x[1] + B.bw + 20, B.base]], { w: 4, alpha: bk, seed: 3350, taper: [0, 0] });
      [['Seviyor', 39], ['Sevmiyor', 21]].forEach(([s, v], i) => {
        const x = B.x[i] - (i ? 0 : 20), hgt = v * B.k * seg(t, 50.8 + i * 0.4, 51.6 + i * 0.4);
        ctx.fillStyle = i ? ink(0.5 * bk) : amber(0.7 * bk); ctx.fillRect(x, B.base - hgt, B.bw, hgt);
        f.T(ctx, s, x + B.bw / 2, B.base + 32, { size: L.G.s * 0.6, alpha: bk });
        f.T(ctx, String(v), x + B.bw / 2, B.base - hgt - 26, Object.assign({ size: L.G.s * 0.75, alpha: bk, halo: true }, f.AMB));
      });
      f.T(ctx, '0', B.x[0] - 56, B.base, { size: L.G.s * 0.55, alpha: bk, align: 'right' });
    }
    if (t > 56.0) f.tick(ctx, GD.x0 + 15 * GD.d + 20, GD.y0 + 3.5 * GD.d, seg(t, 56.0, 56.6), win(t, 56.0, 63.8) * a);
  }

  /* ── a checklist ── */
  function checklist(ctx, env, t) {
    const L = KD.L(env), C = L.CK, f = F(), a = win(t, 64.6, 79.8) * END(t); if (a <= 0) return;
    ['Kime ve kaç kişiye soruldu?', 'Örneklem herkesi temsil ediyor mu?', 'Grafiğin ekseni 0’dan başlıyor mu?', 'Sayılar iddiayı destekliyor mu?'].forEach((s, i) => {
      const k = seg(t, 65.0 + i * 1.4, 65.5 + i * 1.4) * a; if (k <= 0) return;
      f.T(ctx, `${i + 1}. ${s}`, C.x, C.y[i], { size: L.G.s * 0.9, alpha: k, align: 'left', halo: true });
      f.tick(ctx, C.x - 44, C.y[i], seg(t, 75.0 + i * 0.3, 75.5 + i * 0.3), a);
    });
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[5.4, 10.2, 'Kabul etmeden önce sınayalım'], [11.8, 27.8, 'Sevmiyor çubuğu 3 kat uzun görünüyor'],
      [30.4, 45.8, 'Anket: 20 öğrenci, 15’i sevmiyor'], [48.0, 63.8, 'Anket: her sınıftan eşit sayıda, toplam 60 öğrenci'],
      [72.0, 79.8, '1. iddia: yanıltıcı grafik · 2. iddia: yanlı örneklem']]);
    exprs(ctx, t, at(W, 1), [[15.4, 27.8, 'Ama dikey eksen 23’ten başlıyor!', true], [34.4, 45.8, 'Kime soruldu? Yemekhane kuyruğunun sonundaki 20 kişi'],
      [51.4, 63.8, '39 seviyor, 21 sevmiyor · eksen 0’dan başlıyor'], [75.0, 79.8, '3. iddia dört soruyu da geçti', true]]);
    exprs(ctx, t, at(W, 2), [[21.6, 27.8, 'Eksen 0’dan başlayınca 24 ile 26 neredeyse eşit: iddia çürütüldü', true],
      [38.4, 45.8, 'Yanlı örneklem: okulun tamamını temsil etmiyor, iddia kabul edilemez', true],
      [55.4, 63.8, '39, 60’ın yarısından (30) fazla: iddia kabul edilir', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Veriye ve grafiğe dikkatle bak', 80.6], ['Kime soruldu? Herkesi temsil ediyor mu?', 81.6], ['Eksen 0’dan başlıyor mu?', 82.6], ['Kanıta göre çürüt ya da kabul et', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); chart1(ctx, env, t); school(ctx, env, t); checklist(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Three claims', nameTr: 'Üç iddia', concept: 'Test before you accept', conceptTr: 'Kabul etmeden sına', render });
})(window.LI = window.LI || {});
