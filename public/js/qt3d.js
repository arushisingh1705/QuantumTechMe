/* Quantum Tech 3D: restrained industrial models (graphite, steel, yellow accent). Needs three.js r128. */
(function () {
  'use strict';
  if (!window.THREE) return;
  var T = THREE, PI2 = Math.PI * 2, HP = Math.PI / 2, YEL = 0xffd900, path = location.pathname.toLowerCase();
  // Page zoom applied on wide screens (see qt.css); render canvases at that resolution so they stay sharp.
  function PZ() { var z = parseFloat(getComputedStyle(document.body).zoom); return z > 0 ? z : 1; }
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, touch = matchMedia('(hover:none)').matches, mx = 0, my = 0, jobs = [], tasks = [];
  addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

  function MS(c, m, r, x) { var o = { color: c, metalness: m, roughness: r }; for (var k in x) o[k] = x[k]; return new T.MeshStandardMaterial(o); }
  function mats() {
    return { y: MS(YEL, .45, .38), d: MS(0x2c2f36, .6, .4), d2: MS(0x454a53, .6, .38), s: MS(0xc9ccd2, .75, .3), g: MS(0x1e3a2a, .3, .5, { emissive: 0xffd900, emissiveIntensity: .45 }) };
  }
  function cyl(r, h, m, ax) { var c = new T.Mesh(new T.CylinderGeometry(r, r, h, 40), m); if (ax === 'x') c.rotation.z = HP; if (ax === 'z') c.rotation.x = HP; return c; }
  function box(w, h, d, m, x, y, z) { var b = new T.Mesh(new T.BoxGeometry(w, h, d), m); b.position.set(x || 0, y || 0, z || 0); return b; }
  function tor(r, t, m) { return new T.Mesh(new T.TorusGeometry(r, t, 12, 72), m); }
  function edges(mesh, op) { mesh.add(new T.LineSegments(new T.EdgesGeometry(mesh.geometry), new T.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: op || .18 }))); return mesh; }

  function gear(n, r, th, hole, m, body) {
    var s = new T.Shape(), st = PI2 / n, ro = r * .82, pts = [], i, k;
    for (i = 0; i < n; i++) [[.04, ro], [.2, r], [.46, r], [.62, ro]].forEach(function (q) { var a = i * st + q[0] * st; pts.push([Math.cos(a) * q[1], Math.sin(a) * q[1]]); });
    s.moveTo(pts[0][0], pts[0][1]);
    for (k = 1; k < pts.length; k++) s.lineTo(pts[k][0], pts[k][1]);
    s.closePath();
    var h = new T.Path(); h.absarc(0, 0, hole, 0, PI2, true); s.holes.push(h);
    var geo = new T.ExtrudeGeometry(s, { depth: th, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 2, curveSegments: 8 });
    geo.translate(0, 0, -th / 2);
    var o = new T.Group(); o.add(new T.Mesh(geo, body || m.d2));
    [-1, 1].forEach(function (sd) { var ring = new T.Mesh(new T.TorusGeometry(r * .55, .03, 8, 48), m.s); ring.position.z = sd * (th / 2 + .03); o.add(ring); });
    o.add(cyl(hole * .9, th + .8, m.s, 'z'));
    return o;
  }


  function ll(la, lo, r) { la *= Math.PI / 180; lo *= Math.PI / 180; return new T.Vector3(r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)); }
  function dotTex(soft) {
    var c = document.createElement('canvas'); c.width = c.height = 64; var x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(soft ? .35 : .8, 'rgba(255,255,255,' + (soft ? .5 : 1) + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c);
  }
  var M = {
    gear: function (m) { var g = new T.Group(), a = gear(20, 1.3, .5, .3, m, m.y), b = gear(12, .8, .5, .2, m, m.s); b.position.x = 2; b.rotation.z = Math.PI / 12; g.add(a, b); g.userData.a = a; g.userData.b = b; return g; },
    gearbox: function (m) {
      var g = new T.Group(), i; g.add(edges(box(2.4, 1.7, 1.7, m.d)), box(2.8, .14, 2.1, m.d2, 0, -.95, 0), box(2.3, .12, 1.6, m.d2, 0, .9, 0));
      for (i = 0; i < 5; i++) g.add(box(.08, 1.5, 1.74, m.d2, -.9 + i * .45, 0, 0));
      var out = cyl(.22, 1.6, m.s, 'x'); out.position.x = 1.8; var fl = cyl(.7, .16, m.s, 'x'); fl.position.x = 1.25; var inp = cyl(.5, .5, m.d2, 'x'); inp.position.x = -1.4;
      var np = box(.02, .5, .8, m.y, 0, 0, .87); np.rotation.y = 0; np.position.set(.3, .1, .86); np.scale.set(1, 1, 1);
      g.add(out, fl, inp, box(.9, .45, .03, m.y, .2, .1, .87), tor(.7, .03, m.y));
      g.children[g.children.length - 1].position.x = 1.17; g.children[g.children.length - 1].rotation.y = HP;
      [[-1.2, -.9], [1.2, -.9], [-1.2, .9], [1.2, .9]].forEach(function (p) { var b = cyl(.09, .22, m.s); b.position.set(p[0], -.82, p[1]); g.add(b); });
      g.userData.shaft = out; return g;
    },
    motor: function (m) {
      var g = new T.Group(), i; g.add(cyl(.9, 2.2, m.d, 'x'));
      for (i = 0; i < 9; i++) { var f = tor(.92, .04, m.d2); f.rotation.y = HP; f.position.x = -.95 + i * .24; g.add(f); }
      var band = tor(.93, .035, m.y); band.rotation.y = HP; band.position.x = .1;
      var cap = cyl(.8, .3, m.s, 'x'); cap.position.x = 1.25; var fan = cyl(.82, .4, m.d2, 'x'); fan.position.x = -1.3; var sh = cyl(.14, 1.2, m.s, 'x'); sh.position.x = 1.9;
      g.add(band, cap, fan, sh, box(.7, .35, .6, m.d2, 0, 1, 0), box(1.8, .12, 1.5, m.d2, 0, -1, 0)); g.userData.shaft = sh; return g;
    },
    drive: function (m) {
      var g = new T.Group(), i; g.add(edges(box(1.6, 2.4, .9, m.d)), box(1.5, 2.3, .06, m.d2, 0, 0, .48), box(.9, .5, .03, m.g, 0, .6, .52), box(1.5, .06, .07, m.y, 0, 1.12, .5));
      var kn = cyl(.2, .12, m.s, 'z'); kn.position.set(0, -.3, .55); g.add(kn);
      for (i = 0; i < 9; i++) g.add(box(.5, 2.2, .06, m.s, .95, 0, -.4 + i * .1));
      return g;
    },
    turbine: function (m) {
      var g = new T.Group(), sp = new T.Group(), i; g.add(sp); sp.add(cyl(.38, .5, m.s, 'z'));
      for (i = 0; i < 9; i++) { var p = new T.Group(), b = box(.34, 1.45, .05, m.s, 0, 1.15, 0); p.rotation.z = i / 9 * PI2; b.rotation.y = .65; p.add(b); sp.add(p); }
      g.add(tor(2, .09, m.d2), tor(2.25, .025, m.y)); g.userData.spin = sp; g.userData.spd = 1; return g;
    },
    bearing: function (m) {
      var g = new T.Group(), balls = new T.Group(), i; g.add(tor(1.75, .2, m.s), tor(1.0, .2, m.s), cyl(.7, .9, m.d2, 'z'), tor(1.38, .03, m.d2), tor(2.05, .025, m.y));
      for (i = 0; i < 12; i++) { var a = i / 12 * PI2, b = new T.Mesh(new T.SphereGeometry(.22, 20, 20), m.s); b.position.set(Math.cos(a) * 1.38, Math.sin(a) * 1.38, 0); balls.add(b); }
      g.add(balls); g.userData.spin = balls; return g;
    },
    plate: function (m) {
      var g = new T.Group(), i; g.add(box(3.2, 1.9, .12, m.s), box(3.2, .38, .14, m.y, 0, .76, 0));
      [[-1.4, -.8], [1.4, -.8], [-1.4, .8], [1.4, .8]].forEach(function (p) { var s = cyl(.07, .16, m.d2, 'z'); s.position.set(p[0], p[1], .08); g.add(s); });
      for (i = 0; i < 4; i++) g.add(box(2.4 - i * .35, .08, .04, m.d, -.1 - i * .17, .2 - i * .25, .08));
      g.userData.swing = true; return g;
    }
  };

  /* ======== smooth-motion core: frame-rate independent damping, eased input, adaptive quality ======== */
  var smx = 0, smy = 0, Q = 1, queue = [];
  function damp(a, b, l, dt) { return a + (b - a) * (1 - Math.exp(-l * dt)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function later(fn) { queue.push(fn); }

  function mk(cv, fov, z, aa) {
    var R = new T.WebGLRenderer({ canvas: cv, alpha: true, antialias: aa !== false, powerPreference: 'high-performance' });
    var S = new T.Scene(), C = new T.PerspectiveCamera(fov, 1, .1, 100); C.position.z = z;
    S.add(new T.AmbientLight(0xffffff, .7), new T.HemisphereLight(0xffffff, 0x222222, .55));
    var d = new T.DirectionalLight(0xffffff, 1.1); d.position.set(3, 4, 5);
    var rim = new T.DirectionalLight(0xffe9a8, .6); rim.position.set(-4, 2, -3); S.add(d, rim);
    var o = { R: R, S: S, C: C, vis: true, done: false, cv: cv };
    function rs() {
      var w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
      R.setPixelRatio(Math.min(devicePixelRatio || 1, touch ? 1.5 : 2) * Q * PZ()); R.setSize(w, h, false);
      C.aspect = w / h; C.updateProjectionMatrix(); o.done = false; if (o.resize) o.resize(w, h);
    }
    o.rs = rs; rs();
    if (window.ResizeObserver) new ResizeObserver(rs).observe(cv); else addEventListener('resize', rs);
    if (window.IntersectionObserver) new IntersectionObserver(function (e) { o.vis = e[0].isIntersecting; }).observe(cv);
    return o;
  }

  /* pointer-captured drag with velocity (rad/s) for natural inertia */
  function dragger(cv, onMove) {
    var st = { on: false, vx: 0, vy: 0 }, lx = 0, ly = 0, lt = 0;
    cv.addEventListener('pointerdown', function (e) { st.on = true; st.vx = st.vy = 0; lx = e.clientX; ly = e.clientY; lt = performance.now(); try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
    function up() { st.on = false; }
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointermove', function (e) {
      if (!st.on) return; var n = performance.now(), d = Math.max(8, n - lt) / 1000, dx = (e.clientX - lx) * .008, dy = (e.clientY - ly) * .005;
      st.vx = st.vx * .6 + dx / d * .4; st.vy = st.vy * .6 + dy / d * .4; onMove(dx, dy); lx = e.clientX; ly = e.clientY; lt = n;
    });
    return st;
  }

  function globe(cv) {
    var o = mk(cv, 40, 5.6, true), G = new T.Group(), i; o.S.add(G);
    G.add(new T.Mesh(new T.SphereGeometry(1.6, 48, 32), MS(0x101214, .3, .8)), new T.Mesh(new T.SphereGeometry(1.606, 36, 24), new T.MeshBasicMaterial({ color: 0xb7bac0, wireframe: true, transparent: true, opacity: .13 })));
    G.add(new T.Mesh(new T.SphereGeometry(1.9, 40, 40), new T.ShaderMaterial({ transparent: true, side: T.BackSide, blending: T.AdditiveBlending, depthWrite: false,
      vertexShader: 'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'varying vec3 n;void main(){float i=pow(.62-dot(n,vec3(0.,0.,1.)),3.);gl_FragColor=vec4(1.,.85,.2,1.)*i*1.1;}' })));
    var pos = [], N = 1500; for (i = 0; i < N; i++) { var y = 1 - (i + .5) / N * 2, r = Math.sqrt(1 - y * y), a = i * 2.399963; pos.push(Math.cos(a) * r * 1.615, y * 1.615, Math.sin(a) * r * 1.615); }
    var pg = new T.BufferGeometry(); pg.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    G.add(new T.Points(pg, new T.PointsMaterial({ color: 0xb7bac0, size: .03, map: dotTex(false), transparent: true, opacity: .6, depthWrite: false })));
    var C = [[25.2, 55.3], [24.45, 54.4], [24.7, 46.7], [25.3, 51.5], [23.6, 58.6], [29.4, 48], [26.2, 50.6], [21.5, 39.2], [26.4, 50.1]], hub = ll(C[0][0], C[0][1], 1.62), rings = [];
    C.forEach(function (c, k) {
      var p = ll(c[0], c[1], 1.62), d = new T.Mesh(new T.SphereGeometry(k ? .028 : .05, 16, 16), new T.MeshBasicMaterial({ color: YEL })); d.position.copy(p); G.add(d);
      var rg = new T.Mesh(new T.RingGeometry(.04, .05, 32), new T.MeshBasicMaterial({ color: YEL, transparent: true, side: T.DoubleSide, depthWrite: false })); rg.position.copy(p); rg.lookAt(p.clone().multiplyScalar(2)); G.add(rg); rings.push(rg);
      if (k) { var mid = hub.clone().add(p).normalize().multiplyScalar(1.62 + hub.distanceTo(p) * .35); G.add(new T.Line(new T.BufferGeometry().setFromPoints(new T.QuadraticBezierCurve3(hub, mid, p).getPoints(40)), new T.LineBasicMaterial({ color: YEL, transparent: true, opacity: .75 }))); }
    });
    var yaw = 0, pit = 0, t = 0, bx = .44, by = -.87, idle = 1;
    var dg = dragger(cv, function (dx, dy) { yaw += dx; pit = clamp(pit + dy, -.8, .8); });
    o.tick = function (dt) {
      t += dt;
      if (!dg.on) { yaw += dg.vx * dt; pit = clamp(pit + dg.vy * dt, -.8, .8); var f = Math.exp(-3 * dt); dg.vx *= f; dg.vy *= f; var h = Math.exp(-.4 * dt); yaw *= h; pit *= h; }
      idle = damp(idle, dg.on ? 0 : 1, 1.5, dt);
      G.rotation.set(bx + pit, by + yaw + Math.sin(t * .35) * .22 * idle, 0);
      rings.forEach(function (rg, k) { var f2 = (t * .7 + k * .27) % 1; rg.scale.setScalar(1 + f2 * 2.2); rg.material.opacity = .8 * (1 - f2); });
    };
    return o;
  }

  function scene(cv, kind, o) {
    o = o || {};
    var J = mk(cv, 38, o.z || 9, !o.bg), m = mats(), G = new T.Group(), mod = (M[kind] || M.gear)(m), u = mod.userData;
    var t = Math.random() * 6, inter = !!cv.dataset.interactive, autoOn = true, autoW = 1, timer = 0, dg = null;
    G.add(mod); J.S.add(G); G.rotation.set(.3, -.5, 0);
    J.resize = function (w) { var wide = w > 1200, mid = w > 900; G.position.x = o.bg ? (wide ? 3.5 : mid ? 4.1 : 1) : (kind === 'gear' ? -1 : 0); G.scale.setScalar(o.bg ? (wide ? .88 : .72) : 1); };
    J.resize(cv.clientWidth);
    if (inter) {
      dg = dragger(cv, function (dx, dy) { G.rotation.y += dx; G.rotation.x = clamp(G.rotation.x + dy, -.7, .7); autoOn = false; clearTimeout(timer); timer = setTimeout(function () { autoOn = true; }, 2000); });
    }
    J.tick = function (dt) {
      t += dt;
      if (u.spin) u.spin.rotation[u.axis || 'z'] += dt * (u.spd || .4);
      if (u.shaft) u.shaft.rotation.x += .9 * dt;
      if (u.a) { u.a.rotation.z += .25 * dt; u.b.rotation.z -= .25 * 20 / 12 * dt; }
      if (dg) {
        if (!dg.on) { G.rotation.y += dg.vx * dt; G.rotation.x = clamp(G.rotation.x + dg.vy * dt, -.7, .7); var f = Math.exp(-2.5 * dt); dg.vx *= f; dg.vy *= f; }
        autoW = damp(autoW, autoOn ? 1 : 0, 1.2, dt); G.rotation.y += autoW * .12 * dt;
      } else G.rotation.y += .12 * dt;
      if (u.swing) G.rotation.y = damp(G.rotation.y, Math.sin(t * .5) * .45 + smx * .4, 6, dt);
      if (!inter) G.rotation.x = damp(G.rotation.x, .3 + smy * .2, 3, dt);
      G.position.y = Math.sin(t * .7) * .05;
    };
    return J;
  }

  function hero(cv) {
    var o = mk(cv, 40, 10, true), m = mats(), G = new T.Group(), t = 0; o.S.add(G);
    var g1 = gear(20, 1.5, .55, .35, m, m.y), g2 = gear(14, 1.05, .55, .25, m, m.s), g3 = gear(28, 2.1, .55, .45, m, m.d2);
    g2.position.set(2.32, 0, 0); g2.rotation.z = Math.PI / 14; g3.position.set(-2.32, 2.32, 0);
    G.add(g1, g2, g3, tor(3.4, .012, new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .16 })));
    G.rotation.set(-.3, -.5, 0);
    o.resize = function (w) { var wide = w > 900; G.position.set(wide ? 3.6 : 1.2, wide ? -.4 : .8, 0); G.scale.setScalar(wide ? 1 : .62); };
    o.resize(cv.clientWidth);
    o.tick = function (dt) {
      t += dt; g1.rotation.z += .22 * dt; g2.rotation.z -= .22 * 20 / 14 * dt; g3.rotation.z -= .22 * 20 / 28 * dt;
      G.rotation.y = damp(G.rotation.y, -.5 + smx * .35, 3, dt); G.rotation.x = damp(G.rotation.x, -.3 + smy * .25, 3, dt);
      G.position.y = (innerWidth > 900 ? -.4 : .8) + Math.sin(t * .6) * .06;
    };
    return o;
  }


  var VOX = [".....###..#############################...#########################", ".....###..#############################...#########################", "......##...############################...#########################", ".............##########################...#########################", ".............##########################...#########################", "#####...###############################...#########################", "#####...###############################...#########################", ".####...###############################...########################.", "..............##########.....##########..........##########........", "..............##########.....##########..........##########........", "...#####.......#########.....##########..........##########........", "...#####.......#########.....##########..........##########........", "...####........#########.....##########..........##########........", "..........##############.....##########..........##########........", "..........##############.....##########..........##########........", "########.......#########.....##########..........##########........", "########.......#########.....##########..........##########........", ".######....############################..........##########........", "..........#############################..........##########........", "..........#############################..........##########........", "....####.....##########################..........##########........", "....####.....##########################..........##########........", ".....###..#..##########################..........##########........", ".........###..#########################..........##########........", ".........###..#########################..........##########........", "...........................##########..............................", "............................##########.............................", ".............................#########............................."];
  function voxel(cv) {
    var o = mk(cv, 36, 80, true), G = new T.Group(), rows = VOX.length, cols = VOX[0].length, cells = [], r, c, rn = Math.random;
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) if (VOX[r][c] === '#') cells.push([c, r]);
    var n = cells.length, inst = new T.InstancedMesh(new T.BoxGeometry(.92, .92, 1), MS(YEL, .35, .42), n), d = new T.Object3D(), col = new T.Color();
    var S0 = [], TG = [], DL = [], DP = [], RT = [], TR = [];
    cells.forEach(function (p, k) {
      var tx = p[0] - cols / 2 + .5, ty = rows / 2 - p[1] - .5, trail = p[0] < 11, a = rn() * PI2, b = Math.acos(2 * rn() - 1), rr = 60 + rn() * 50;
      TG.push(tx, ty); S0.push(Math.sin(b) * Math.cos(a) * rr, Math.cos(b) * rr * .6, Math.sin(b) * Math.sin(a) * rr);
      DL.push(.15 + p[0] / cols * 1.1 + rn() * .35); DP.push(trail ? .5 : 2.2); RT.push((rn() - .5) * 6, (rn() - .5) * 6); TR.push(trail ? 1 : 0);
      col.setHSL(.135 + (rn() - .5) * .012, 1, .5 + (rn() - .5) * .1); inst.setColorAt(k, col);
    });
    G.add(inst); o.S.add(G); G.rotation.set(.1, -.3, 0);
    o.resize = function () { o.C.position.z = Math.max(50, cols * 1.4 / (2 * Math.tan(18 * Math.PI / 180) * o.C.aspect)); /* 1.4 = room for the tilt and mouse-follow rotation */ o.C.far = o.C.position.z + 120; /* keep the far side of the turning logo inside the draw distance */ o.C.updateProjectionMatrix(); };
    o.resize();
    var t = 0, pm = { x: 0, y: 0, on: 0, tx: 0, ty: 0, to: 0 }, host = cv.parentNode;
    host.addEventListener('pointermove', function (e) { var b = cv.getBoundingClientRect(); pm.tx = ((e.clientX - b.left) / b.width - .5) * 2; pm.ty = -((e.clientY - b.top) / b.height - .5) * 2; pm.to = 1; });
    host.addEventListener('pointerleave', function () { pm.to = 0; });
    var dp = new Float32Array(150 * 3), dg = new T.BufferGeometry(), dr;
    for (dr = 0; dr < 150; dr++) { dp[dr * 3] = (rn() - .5) * cols * 1.6; dp[dr * 3 + 1] = (rn() - .5) * rows * 2.2; dp[dr * 3 + 2] = (rn() - .5) * 50 - 10; }
    dg.setAttribute('position', new T.BufferAttribute(dp, 3));
    var dust = new T.Points(dg, new T.PointsMaterial({ color: YEL, size: .45, transparent: true, opacity: .55, depthWrite: false })); o.S.add(dust);
    o.tick = function (dt) {
      t += dt; pm.x = damp(pm.x, pm.tx, 8, dt); pm.y = damp(pm.y, pm.ty, 8, dt); pm.on = damp(pm.on, pm.to, 5, dt); dust.rotation.y += dt * .03; dust.position.y = Math.sin(t * .4) * 1.2;
      var hh = o.C.position.z * Math.tan(18 * Math.PI / 180), wx = pm.x * hh * o.C.aspect, wy = pm.y * hh;
      for (var k = 0; k < n; k++) {
        var p = clamp((t - DL[k]) / 1.7, 0, 1), e = 1 - Math.pow(1 - p, 4), inv = 1 - e, x = S0[k * 3] * inv + TG[k * 2] * e, y = S0[k * 3 + 1] * inv + TG[k * 2 + 1] * e, z = S0[k * 3 + 2] * inv;
        if (TR[k]) { z += Math.sin(t * 2.2 + TG[k * 2] * .5) * .35 * e; x -= (Math.sin(t * 1.4 + TG[k * 2 + 1]) * .5 + .5) * .6 * e; }
        if (pm.on > .01 && e > .9) { var ex = x - wx, ey = y - wy, ed = Math.sqrt(ex * ex + ey * ey) + .001; if (ed < 9) { var f = Math.pow(1 - ed / 9, 2) * pm.on; x += ex / ed * f * 3.5; y += ey / ed * f * 3.5; z += f * 6; } }
        d.position.set(x, y, z); d.rotation.set(RT[k * 2] * inv, RT[k * 2 + 1] * inv, 0); d.scale.set(1, 1, DP[k] * (.2 + .8 * e)); d.updateMatrix(); inst.setMatrixAt(k, d.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
      G.rotation.y = damp(G.rotation.y, -.3 + smx * .55, 3, dt); G.rotation.x = damp(G.rotation.x, .1 + smy * .3, 3, dt);
    };
    return o;
  }

  var builders = {
    hero: hero, globe: globe, voxel: voxel,
    gearbox: function (c) { return scene(c, 'gearbox', {}); },
    viewer: function (c) { return scene(c, c.dataset.kind || 'gear', { z: 8.5 }); }
  };
  function ready(cv) { cv.classList.add('qt3d-ready'); if (cv.parentNode && cv.parentNode.classList) cv.parentNode.classList.add('has3d'); }
  document.querySelectorAll('canvas[data-3d]').forEach(function (cv) {
    later(function () { try { var b = builders[cv.dataset['3d']]; if (b) { jobs.push(b(cv)); ready(cv); } } catch (e) { cv.remove(); } });
  });

  function bg(host, kind) {
    var cv = document.createElement('canvas'); cv.className = 'qt3d-bg'; cv.setAttribute('aria-hidden', 'true');
    host.classList.add('qt3d-host'); host.insertBefore(cv, host.firstChild);
    later(function () { try { jobs.push(scene(cv, kind, { bg: true })); ready(cv); } catch (e) { cv.remove(); } });
  }
  var ROUTES = [[/^\/compare/, 'drive'], [/^\/products/, 'gearbox'], [/^\/brands/, 'gear'], [/^\/industries/, 'turbine'], [/^\/solutions/, 'bearing'], [/^\/resources/, 'gearbox'], [/^\/blog/, 'gear'], [/^\/case-studies/, 'motor'], [/^\/search/, 'gearbox'], [/^\/(request-quote|find-replacement)/, 'plate'], [/^\/about/, 'gear'], [/^\/contact/, 'drive']];
  function pick() { for (var i = 0; i < ROUTES.length; i++) if (ROUTES[i][0].test(path)) return ROUTES[i][1]; return 'gearbox'; }
  var q = function (s) { return document.querySelector(s); }, ph = q('.page-hero'), rb = q('.replacement-band');
  if (ph && !ph.querySelector('.product-visual')) bg(ph, pick());
  if (rb) bg(rb, 'plate');

  /* ---- 2D helpers ---- */
  function vis2d(el) { var o = { v: true }; if (window.IntersectionObserver) new IntersectionObserver(function (e) { o.v = e[0].isIntersecting; }).observe(el); return o; }
  function c2d(host, cls) {
    var c = document.createElement('canvas'); c.className = cls + ' qt3d-ready'; c.setAttribute('aria-hidden', 'true'); host.insertBefore(c, host.firstChild);
    var x = c.getContext('2d'), st = { c: c, x: x, w: 0, h: 0 };
    function rs() { var d = Math.min(devicePixelRatio || 1, 1.5) * Q * PZ(); st.w = c.clientWidth; st.h = c.clientHeight; c.width = st.w * d; c.height = st.h * d; x.setTransform(d, 0, 0, d, 0, 0); if (st.onrs) st.onrs(); }
    st.rs = rs; rs(); if (window.ResizeObserver) new ResizeObserver(rs).observe(c); else addEventListener('resize', rs); st.vis = vis2d(c); jobs2d.push(st); return st;
  }
  var jobs2d = [];

  /* ---- Home: hero particle network ---- */
  var hs = q('.hero');
  if (hs && !reduce) {
    var n1 = c2d(hs, 'qt3d-net'), NP = [], hmx = 0, hmy = 0, hon = 0, hox = -999, hoy = -999;
    n1.onrs = function () { NP = []; for (var i = 0, n = Math.min(70, n1.w * n1.h / 16000 | 0); i < n; i++) NP.push({ x: Math.random() * n1.w, y: Math.random() * n1.h, vx: (Math.random() - .5) * 20, vy: (Math.random() - .5) * 20 }); }; n1.onrs();
    hs.addEventListener('pointermove', function (e) { var b = n1.c.getBoundingClientRect(); hox = e.clientX - b.left; hoy = e.clientY - b.top; hon = 1; });
    hs.addEventListener('pointerleave', function () { hon = 0; });
    var hma = 0;
    tasks.push(function (dt) {
      if (!n1.vis.v) return; var x = n1.x; x.clearRect(0, 0, n1.w, n1.h);
      hma = damp(hma, hon, 5, dt); if (hon) { hmx = hmx ? damp(hmx, hox, 12, dt) : hox; hmy = hmy ? damp(hmy, hoy, 12, dt) : hoy; }
      for (var i = 0; i < NP.length; i++) {
        var a = NP[i]; a.x += a.vx * dt; a.y += a.vy * dt; if (a.x < 0 || a.x > n1.w) a.vx *= -1; if (a.y < 0 || a.y > n1.h) a.vy *= -1;
        x.fillStyle = 'rgba(255,217,0,.55)'; x.beginPath(); x.arc(a.x, a.y, 1.5, 0, PI2); x.fill();
        if (hma > .01) { var dx = a.x - hmx, dy = a.y - hmy, dm = Math.sqrt(dx * dx + dy * dy); if (dm < 170) { x.strokeStyle = 'rgba(255,217,0,' + (1 - dm / 170) * .55 * hma + ')'; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(hmx, hmy); x.stroke(); } }
        for (var j = i + 1; j < NP.length; j++) { var b = NP[j], ex = a.x - b.x, ey = a.y - b.y, d2 = ex * ex + ey * ey; if (d2 < 15625) { x.strokeStyle = 'rgba(255,255,255,' + (1 - Math.sqrt(d2) / 125) * .14 + ')'; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); } }
      }
    });
  }

  /* ---- Home: category morph particles ---- */
  var mc = q('.qt3d-morph'), rows = document.querySelectorAll('[data-category-row]');
  if (mc && rows.length && !touch) {
    later(function () {
      try {
        var MJ = mk(mc, 45, 6.2, false), N = 1500, cur = new Float32Array(N * 3), tg = new Float32Array(N * 3), lam = new Float32Array(N), col = new Float32Array(N * 3), i2, rn = Math.random;
        var SH = [
          function () { var a = rn() * PI2, b = Math.acos(2 * rn() - 1); return [1.7 * Math.sin(b) * Math.cos(a), 1.7 * Math.cos(b), 1.7 * Math.sin(b) * Math.sin(a)]; },
          function () { var a = rn() * PI2, b = rn() * PI2; return [(1.5 + .55 * Math.cos(b)) * Math.cos(a), .75 * Math.sin(b), (1.5 + .55 * Math.cos(b)) * Math.sin(a)]; },
          function () { var f = rn() * 6 | 0, u = rn() * 3 - 1.5, v = rn() * 3 - 1.5, s = f % 2 ? 1.5 : -1.5; return f < 2 ? [u, v, s] : f < 4 ? [u, s, v] : [s, u, v]; },
          function () { var a = rn() * PI2, r = 1.4 + .22 * Math.sign(Math.sin(a * 14)), z = (rn() - .5) * .5; return [Math.cos(a) * r, Math.sin(a) * r, z]; },
          function () { var a = rn() * PI2, y = (rn() - .5) * 3.2; return [Math.cos(a) * .8, y, Math.sin(a) * .8]; },
          function () { var t = rn() * PI2 * 3; return [Math.cos(t) * 1.4 + (rn() - .5) * .15, t / 18.85 * 3.2 - 1.6, Math.sin(t) * 1.4 + (rn() - .5) * .15]; }
        ];
        for (i2 = 0; i2 < N; i2++) { var q0 = SH[0](); cur.set(q0, i2 * 3); tg.set(q0, i2 * 3); lam[i2] = 2 + rn() * 3; col.set(i2 % 6 === 0 ? [1, .85, 0] : [.72, .75, .8], i2 * 3); }
        var mg = new T.BufferGeometry(); mg.setAttribute('position', new T.BufferAttribute(cur, 3)); mg.setAttribute('color', new T.BufferAttribute(col, 3));
        var mp = new T.Points(mg, new T.PointsMaterial({ size: .08, map: dotTex(false), vertexColors: true, transparent: true, opacity: .95, depthWrite: false })); MJ.S.add(mp);
        var setShape = function (k) { for (var i = 0; i < N; i++) { var p = SH[k % SH.length](); tg[i * 3] = p[0]; tg[i * 3 + 1] = p[1]; tg[i * 3 + 2] = p[2]; } };
        rows.forEach(function (r, i) { r.addEventListener('mouseenter', function () { setShape(i); }); });
        MJ.tick = function (dt) {
          var e = [1 - Math.exp(-2 * dt), 1 - Math.exp(-3.5 * dt), 1 - Math.exp(-5 * dt)];
          for (var i = 0; i < N; i++) { var k = lam[i] < 3 ? e[0] : lam[i] < 4 ? e[1] : e[2], j = i * 3; cur[j] += (tg[j] - cur[j]) * k; cur[j + 1] += (tg[j + 1] - cur[j + 1]) * k; cur[j + 2] += (tg[j + 2] - cur[j + 2]) * k; }
          mg.attributes.position.needsUpdate = true; mp.rotation.y += .25 * dt; mp.rotation.x = damp(mp.rotation.x, smy * .4, 3, dt);
        };
        jobs.push(MJ); ready(mc);
      } catch (e) { mc.remove(); }
    });
  }

  /* ---- Home: brand-name sphere (angular velocities in rad/s) ---- */
  var sph = q('.qt3d-sphere');
  if (sph && sph.children.length) {
    var items = [].slice.call(sph.children), P3 = [], sv2 = vis2d(sph), ax = .18, ay = .28, tax = .18, tay = .28, cnt = items.length;
    items.forEach(function (el, i) { var y = 1 - (i + .5) / cnt * 2, r = Math.sqrt(1 - y * y), a = i * 2.399963; P3.push({ el: el, x: Math.cos(a) * r, y: y, z: Math.sin(a) * r }); });
    sph.addEventListener('pointermove', function (e) { var b = sph.getBoundingClientRect(); tay = ((e.clientX - b.left) / b.width - .5) * 1.8; tax = -((e.clientY - b.top) / b.height - .5) * 1.8; });
    sph.addEventListener('pointerleave', function () { tax = .18; tay = .28; });
    tasks.push(function (dt) {
      if (!sv2.v) return;
      ax = damp(ax, tax, 3.5, dt); ay = damp(ay, tay, 3.5, dt);
      var cx = Math.cos(ax * dt), sx = Math.sin(ax * dt), cy = Math.cos(ay * dt), sy = Math.sin(ay * dt), R = sph.clientWidth * .38;
      P3.forEach(function (p) { var y = p.y * cx - p.z * sx, z = p.y * sx + p.z * cx; p.y = y; p.z = z; var x = p.x * cy + p.z * sy; z = -p.x * sy + p.z * cy; p.x = x; p.z = z; var d = (z + 1) / 2; p.el.style.transform = 'translate3d(' + (x * R).toFixed(1) + 'px,' + (p.y * R).toFixed(1) + 'px,0) translate(-50%,-50%) scale(' + (.62 + .6 * d).toFixed(3) + ')'; p.el.style.opacity = (.22 + .78 * d).toFixed(3); p.el.style.zIndex = d * 10 | 0; });
    });
  }

  /* ---- Home: final CTA waves ---- */
  var fc = q('.final-cta');
  if (fc && !reduce) {
    fc.classList.add('qt3d-host'); var w1 = c2d(fc, 'qt3d-wave'), wt = 0;
    tasks.push(function (dt) {
      if (!w1.vis.v) return; wt += dt * .7; var x = w1.x, w = w1.w, h = w1.h; x.clearRect(0, 0, w, h);
      for (var l = 0; l < 3; l++) { x.beginPath(); x.moveTo(0, h); for (var i = 0; i <= w; i += 12) x.lineTo(i, h * (.6 + l * .12) + Math.sin(i * .006 + wt * (1 + l * .3) + l) * h * .06); x.lineTo(w, h); x.closePath(); x.fillStyle = 'rgba(17,17,17,' + (.05 + l * .035) + ')'; x.fill(); }
    });
  }

  /* ---- Smooth 3D hover tilt (eased in and out, no CSS transition fighting) ---- */
  var tilts = [];
  if (!touch && !reduce) document.querySelectorAll('.product-card,.logo-grid a,.ind,.card').forEach(function (el) {
    var s = { el: el, rx: 0, ry: 0, tx: 0, ty: 0, act: false }; el.classList.add('qt3d-tilt');
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); s.ty = ((e.clientX - r.left) / r.width - .5) * 10; s.tx = -((e.clientY - r.top) / r.height - .5) * 10; s.act = true; });
    el.addEventListener('pointerleave', function () { s.tx = s.ty = 0; s.act = true; });
    tilts.push(s);
  });
  tasks.push(function (dt) {
    for (var i = 0; i < tilts.length; i++) {
      var s = tilts[i]; if (!s.act) continue;
      s.rx = damp(s.rx, s.tx, 9, dt); s.ry = damp(s.ry, s.ty, 9, dt);
      if (!s.tx && !s.ty && Math.abs(s.rx) < .02 && Math.abs(s.ry) < .02) { s.act = false; s.el.style.transform = ''; }
      else s.el.style.transform = 'perspective(1000px) rotateX(' + s.rx.toFixed(2) + 'deg) rotateY(' + s.ry.toFixed(2) + 'deg)';
    }
  });

  /* ---- Staggered scene start (avoids a long main-thread stall) + master loop ---- */
  function pump() { var f = queue.shift(); if (!f) return; try { f(); } catch (e) {} setTimeout(pump, 50); }
  function start() { setTimeout(pump, 80); }
  if (document.readyState === 'complete') start(); else addEventListener('load', start);

  var last = performance.now(), avg = .0167, fr = 0;
  (function loop(now) {
    var raw = (now - last) / 1000, dt = clamp(raw, .001, .033); last = now;
    if (raw < .2) avg = avg * .95 + raw * .05;
    if (++fr % 120 === 0 && avg > .024 && Q > .6) { Q = Math.max(.6, Q - .15); jobs.forEach(function (j) { j.rs && j.rs(); }); jobs2d.forEach(function (j) { j.rs(); }); }
    smx = damp(smx, mx, 4, dt); smy = damp(smy, my, 4, dt);
    jobs.forEach(function (j) {
      if (!j.vis || !j.tick || (reduce && j.done)) return;
      if (!reduce) j.tick(dt);
      j.R.render(j.S, j.C); j.done = true;
    });
    if (!reduce) for (var i = 0; i < tasks.length; i++) { try { tasks[i](dt); } catch (e) {} }
    requestAnimationFrame(loop);
  })(last);
})();
