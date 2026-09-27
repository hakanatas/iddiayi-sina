/* Shared layout + Nokta helpers for "İddiayı Sına". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          CX: { x: 0, y: -780, s: 42, w: 980 },
          G: { s: 40 }, BC: { x: [-100, 120], base: -380, h: 280, bw: 130, ax: -230 },
          GD: { x0: -300, y0: -700, d: 43, cols: 15, rows: 8, r: 10 }, B2: null, CK: { x: -380, y: [-680, -590, -500, -410] },
          W: { x: 0, y: [-190, -105, -20], s: 42, w: 980 },
          SUM: { x: 0, y: [-240, -150, -60, 40], s: 42, w: 980 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          CX: { x: 60, y: -445, s: 48, w: 1300 },
          G: { s: 44 }, BC: { x: [20, 240], base: -80, h: 280, bw: 130, ax: -110 },
          GD: { x0: -250, y0: -360, d: 36, cols: 15, rows: 8, r: 9 }, B2: { x: [560, 700], base: -80, k: 5.2, bw: 100 }, CK: { x: -200, y: [-330, -250, -170, -90] },
          W: { x: 110, y: [128, 196, 262], s: 46, w: 1250 },
          SUM: { x: 110, y: [10, 90, 170, 250], s: 48, w: 1250 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
