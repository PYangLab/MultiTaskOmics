/* Multi-Task Omics — portal hero "task sphere" (refined).
   A slowly-rotating globe: a central light-blue "Omics" core (the shared
   multimodal representation) with 12 single-cell tasks on the surface and the
   task-to-task relationships drawn as arcs ON the sphere surface. The back of
   the globe recedes into the page (depth fog), spokes to the core stay hidden
   until you hover a task. Drag to spin; hover to isolate a task's links.
   No-ops on any page without #taskSphere. Palette follows the light/dark scheme. */
(function () {
  // Shared graph + helpers are defined once; a self-contained renderer is then
  // instantiated per matching canvas (#taskSphere or any [data-task-sphere]),
  // so several spheres can live on one page.

  var labels = ['Integration', 'Dimension reduction', 'Batch correction', 'Clustering',
    'Classification', 'Feature selection', 'Imputation', 'Augmentation',
    'Spatial registration', 'Patient prediction', 'Factor decomposition'];
  var T = labels.length;

  // Verified relationship graph (surface arcs). 0 Integration · 1 Dim.reduction ·
  // 2 Batch correction · 3 Clustering · 4 Classification · 5 Feature selection ·
  // 6 Imputation · 7 Augmentation · 8 Spatial registration · 9 Patient prediction ·
  // 10 Factor decomposition
  var tedges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
    [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
    [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
    [2, 10], [9, 10]
  ];
  var adj = labels.map(function () { return []; });
  tedges.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });

  function fib(n, off) {
    var a = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - ((i + 0.5) / n) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * i + off;
      a.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    return a;
  }
  var tpos = fib(T, 2.4);

  function slerp(A, B, steps) {
    var dot = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
    dot = Math.max(-1, Math.min(1, dot));
    var Om = Math.acos(dot), out = [];
    if (Om < 1e-4) return [A.slice(), B.slice()];
    var sO = Math.sin(Om);
    for (var s = 0; s <= steps; s++) {
      var u = s / steps, w1 = Math.sin((1 - u) * Om) / sO, w2 = Math.sin(u * Om) / sO;
      out.push([A[0] * w1 + B[0] * w2, A[1] * w1 + B[1] * w2, A[2] * w1 + B[2] * w2]);
    }
    return out;
  }
  var arcs = tedges.map(function (e) { return slerp(tpos[e[0]], tpos[e[1]], 22); });

  // A faint latitude ring (small circle on the sphere) for a quiet globe read.
  function latitude(yLevel, steps) {
    var out = [], r = Math.sqrt(Math.max(0, 1 - yLevel * yLevel));
    for (var s = 0; s <= steps; s++) { var a = (s / steps) * Math.PI * 2; out.push([Math.cos(a) * r, yLevel, Math.sin(a) * r]); }
    return out;
  }
  var lat = latitude(0.18, 64);

  function pal() {
    var dark = document.body.getAttribute('data-md-color-scheme') === 'slate';
    return dark ? {
      bg: [10, 10, 20],
      ring: '148,163,184', core: [20, 40, 70], coreStroke: '56,189,248', coreGlow: '56,189,248', coreDot: '125,211,252',
      node: [56, 189, 248], nodeDeep: [125, 211, 252], arc: [56, 189, 248], spoke: '125,211,252',
      label: '203,213,225', labelHi: '248,250,252', coreLabel: '125,211,252'
    } : {
      bg: [255, 255, 255],
      ring: '148,163,184', core: [220, 232, 246], coreStroke: '143,184,228', coreGlow: '63,134,207', coreDot: '0,70,173',
      node: [0, 70, 173], nodeDeep: [0, 58, 143], arc: [63, 134, 207], spoke: '63,134,207',
      label: '51,65,85', labelHi: '15,23,42', coreLabel: '63,134,207'
    };
  }

  // Blend an [r,g,b] toward the background by k (0 = full colour, 1 = bg).
  function fog(rgb, bg, k) {
    return Math.round(rgb[0] + (bg[0] - rgb[0]) * k) + ',' +
           Math.round(rgb[1] + (bg[1] - rgb[1]) * k) + ',' +
           Math.round(rgb[2] + (bg[2] - rgb[2]) * k);
  }

  function init(canvas) {
    if (!canvas || !canvas.getContext) return;
    if (canvas.__sphereInit) return;          // avoid double-init on the same canvas
    canvas.__sphereInit = true;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, ready = false;
  function perfNow() { return (typeof performance !== 'undefined') ? performance.now() : Date.now(); }
  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready && W > 0 && H > 0) frame(perfNow());  // immediate repaint, independent of rAF
  }
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas);
  window.addEventListener('resize', resize);

  var angY = 0.0, tilt = 0.30, baseSpeed = 0.00045;
  var dragging = false, lastX = 0, lastY = 0, hover = -1, mx = -1e3, my = -1e3, reduce = false;
  var focus = 0; // eased hover-focus amount 0..1 for smooth reveal of spokes/arcs
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing'; try { canvas.setPointerCapture(e.pointerId); } catch (x) {} });
  canvas.addEventListener('pointerup', function () { dragging = false; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('pointerleave', function () { dragging = false; mx = -1e3; my = -1e3; });
  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
    if (dragging) { angY += (e.clientX - lastX) * 0.01; tilt += (e.clientY - lastY) * 0.006; tilt = Math.max(-1.05, Math.min(1.05, tilt)); lastX = e.clientX; lastY = e.clientY; }
  });

  var cy, sy, ct, st, R, cx, cyp, focal, CR = 16, tms = 0;
  function rot(v) {
    var x = v[0], y = v[1], z = v[2];
    var x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    var y2 = y * ct - z1 * st, z2 = y * st + z1 * ct;
    var p = focal / (focal - z2);
    return { x: cx + x1 * R * p, y: cyp + y2 * R * p, z: z2, p: p, t: (z2 + 1) / 2 };
  }

  function ringPath(pts) {
    ctx.beginPath();
    for (var s = 0; s < pts.length; s++) { var q = pts[s]; if (s === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y); }
  }

  function frame(now) {
    if (!canvas.isConnected) return;          // stop the loop if the canvas was swapped out
    tms = now || 0;
    var bs = (typeof window.__sphereSpeed === 'number') ? window.__sphereSpeed : baseSpeed;
    if (!dragging && !reduce) angY += bs * (hover >= 0 ? 0.12 : 1);
    cy = Math.cos(angY); sy = Math.sin(angY); ct = Math.cos(tilt); st = Math.sin(tilt);
    R = 0.40 * Math.min(W, H); cx = W / 2; cyp = H / 2; focal = 7.2;
    var P = pal(), BG = P.bg;
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    // resolve hover from last frame's projected node positions
    var tp = tpos.map(rot);
    hover = -1; var bestD = 22 * 22;
    for (var i = 0; i < T; i++) { var dx = tp[i].x - mx, dy = tp[i].y - my, d = dx * dx + dy * dy; var rr = 6 * tp[i].p + 9; rr *= rr; if (d < rr && d < bestD) { bestD = d; hover = i; } }
    canvas.style.cursor = hover >= 0 ? 'pointer' : (dragging ? 'grabbing' : 'grab');
    // ease the focus state for smooth reveals
    focus += ((hover >= 0 ? 1 : 0) - focus) * 0.12;
    var hl = hover >= 0 ? adj[hover].concat([hover]) : null;

    var isDark = BG[0] < 60;
    var shadowRGB = isDark ? '0,0,0' : '15,23,42';

    // helper: stroke a projected polyline as ONE continuous path (smooth, no segment banding)
    function strokePoly(pts) {
      ctx.beginPath();
      for (var s = 0; s < pts.length; s++) { if (s === 0) ctx.moveTo(pts[s].x, pts[s].y); else ctx.lineTo(pts[s].x, pts[s].y); }
      ctx.stroke();
    }

    // 1 · silhouette ring — barely-there
    ctx.beginPath(); ctx.arc(cx, cyp, R, 0, 6.2832);
    ctx.strokeStyle = 'rgba(' + P.ring + ',0.14)'; ctx.lineWidth = 1; ctx.stroke();

    // 2 · project all arcs; classify each as behind/in-front of the core by its midpoint depth
    var arcProj = [];
    for (var e = 0; e < arcs.length; e++) arcProj.push(arcs[e].map(rot));

    function drawArc(e) {
      var a = tedges[e][0], b = tedges[e][1], on = hl && (a === hover || b === hover);
      var dim = hl && !on ? (1 - focus * 0.88) : 1, pr = arcProj[e], tt = pr[11].t;
      if (on) {
        ctx.strokeStyle = 'rgba(' + fog(P.arc, BG, (1 - tt) * 0.25) + ',' + ((0.34 + 0.5 * tt) * (0.25 + 0.75 * focus)).toFixed(3) + ')';
        ctx.lineWidth = 1.4 + 0.5 * tt;
      } else {
        ctx.strokeStyle = 'rgba(' + fog(P.arc, BG, (1 - tt) * 0.55) + ',' + ((0.05 + 0.34 * tt * tt) * dim).toFixed(3) + ')';
        ctx.lineWidth = 0.75 + 0.55 * tt;
      }
      strokePoly(pr);
    }
    function drawNode(i) {
      var n = tp[i], t = n.t, rad = (4.6 + 1.8 * t) * n.p, isHi = hl && hl.indexOf(i) >= 0, faded = hl && !isHi;
      var fk = (1 - t) * 0.66, hide = faded ? 0.26 + 0.74 * (1 - focus) : 1;
      ctx.save();
      ctx.shadowColor = 'rgba(' + shadowRGB + ',' + (0.10 * t * hide).toFixed(3) + ')';
      ctx.shadowBlur = 1.6 * t; ctx.shadowOffsetY = 0.5 * t;
      ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, 6.2832);
      if (i === hover) ctx.fillStyle = 'rgb(' + P.nodeDeep.join(',') + ')';
      else ctx.fillStyle = 'rgba(' + fog(P.node, BG, fk) + ',' + hide.toFixed(3) + ')';
      ctx.fill();
      ctx.restore();
      ctx.beginPath(); ctx.arc(n.x, n.y, rad, 0, 6.2832);
      ctx.lineWidth = 1.4; ctx.strokeStyle = 'rgba(' + BG.join(',') + ',' + (0.85 * hide).toFixed(3) + ')'; ctx.stroke();
    }
    function drawSpoke() {
      if (!(focus > 0.01 && hover >= 0)) return;
      var n = tp[hover], dx = n.x - cx, dy = n.y - cyp, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
      ctx.beginPath(); ctx.moveTo(cx + ux * CR, cyp + uy * CR); ctx.lineTo(n.x - ux * (6.5 * n.p), n.y - uy * (6.5 * n.p));
      ctx.strokeStyle = 'rgba(' + P.spoke + ',' + (0.5 * focus).toFixed(3) + ')'; ctx.lineWidth = 1.3; ctx.stroke();
    }

    // split + depth-sort: the core sits at the sphere centre (z=0), so far-side geometry
    // draws BEHIND it and near-side geometry draws IN FRONT — making Omics read as the centre.
    var arcBack = [], arcFront = [];
    for (var e = 0; e < arcs.length; e++) (arcProj[e][11].z < 0 ? arcBack : arcFront).push(e);
    arcBack.sort(function (p, q) { return arcProj[p][11].z - arcProj[q][11].z; });
    arcFront.sort(function (p, q) { return arcProj[p][11].z - arcProj[q][11].z; });
    var nodeBack = [], nodeFront = [];
    for (var i = 0; i < T; i++) (tp[i].z < 0 ? nodeBack : nodeFront).push(i);
    nodeBack.sort(function (a, b) { return tp[a].z - tp[b].z; });
    nodeFront.sort(function (a, b) { return tp[a].z - tp[b].z; });
    var hoverBack = hover >= 0 && tp[hover].z < 0;

    // ---- BACK pass (behind the core) ----
    arcBack.forEach(drawArc);
    if (hoverBack) drawSpoke();
    nodeBack.forEach(drawNode);

    // ---- CORE — soft light disc with a real (shadow-blurred) breathing glow + thin ring ----
    var pulse = reduce ? 0.5 : (Math.sin(tms / 2200) * 0.5 + 0.5); // 0..1
    ctx.save();
    ctx.shadowColor = 'rgba(' + P.coreGlow + ',' + (0.26 + 0.14 * pulse).toFixed(3) + ')';
    ctx.shadowBlur = 8 + 4 * pulse;
    ctx.beginPath(); ctx.arc(cx, cyp, CR, 0, 6.2832); ctx.fillStyle = 'rgb(' + P.core.join(',') + ')'; ctx.fill();
    ctx.restore();
    ctx.beginPath(); ctx.arc(cx, cyp, CR, 0, 6.2832); ctx.lineWidth = 1.1; ctx.strokeStyle = 'rgba(' + P.coreStroke + ',0.85)'; ctx.stroke();
    var dd = 4.4; ctx.fillStyle = 'rgba(' + P.coreDot + ',0.5)';
    [[0, -dd], [-dd * 0.9, dd * 0.55], [dd * 0.9, dd * 0.55]].forEach(function (o) { ctx.beginPath(); ctx.arc(cx + o[0], cyp + o[1], 1.7, 0, 6.2832); ctx.fill(); });

    // ---- FRONT pass (in front of the core) ----
    if (!hoverBack) drawSpoke();
    arcFront.forEach(drawArc);
    nodeFront.forEach(drawNode);

    // 6 · labels — soft shadow halo (no chunky outline), front hemisphere + hovered
    ctx.save();
    ctx.shadowColor = 'rgba(' + BG.join(',') + ',1)'; ctx.shadowBlur = 3;
    // core label
    ctx.font = '500 12px Inter, system-ui, sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(' + P.coreLabel + ')'; ctx.fillText('Omics', cx, cyp + CR + 18);
    // task labels — anchor-flipped, smooth fade
    for (var i = 0; i < T; i++) {
      var n = tp[i], t = n.t, isHi = (i === hover), inHl = hl && hl.indexOf(i) >= 0, faded = (hl && !inHl);
      var show = t > 0.54 || isHi || inHl;
      if (!show) continue;
      var la = isHi ? 1 : (t - 0.54) / 0.46; la = Math.max(0, Math.min(1, la));
      if (faded) la *= (1 - focus * 0.7);
      if (inHl && !isHi) la = Math.max(la, 0.55 * focus);
      if (la <= 0.02) continue;
      var rad = (4.6 + 1.8 * t) * n.p, left = n.x > W * 0.60;
      ctx.textAlign = left ? 'right' : 'left';
      var lx = left ? (n.x - rad - 7) : (n.x + rad + 7);
      ctx.font = (isHi ? '500 ' : '400 ') + '12px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(' + (isHi ? P.labelHi : P.label) + ',' + la.toFixed(2) + ')';
      ctx.fillText(labels[i], lx, n.y + 4);
    }
    ctx.restore();
    ctx.textAlign = 'left';
    requestAnimationFrame(frame);
  }
  // synchronous first paint (robust even if rAF is initially throttled), then loop
  ready = true;
  frame(perfNow());
  }

  // Instantiate one renderer per matching canvas. Re-run after Material's instant
  // navigation (document$) so the sphere survives in-site page swaps / anchor links.
  function initAll() {
    var nodes = document.querySelectorAll('#taskSphere, [data-task-sphere]');
    for (var qi = 0; qi < nodes.length; qi++) init(nodes[qi]);
  }
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(function () { initAll(); });
  } else {
    initAll();
  }
})();
