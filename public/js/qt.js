/* Quantum Tech UI: header, menu, search, reveal, rail */
(function () {
  'use strict';
  var reduceM = matchMedia('(prefers-reduced-motion: reduce)').matches, L = null;
  var d = document, $ = function (s, c) { return (c || d).querySelector(s); }, $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var h = $('.hdr'); function sc() { h.classList.toggle('s', scrollY > 30); } addEventListener('scroll', sc, { passive: true }); sc();
  var mn = $('.menu'), mt = $('.mt');
  function lock(o) { d.body.style.overflow = o ? 'hidden' : ''; if (L) { if (o) L.stop(); else L.start(); } }
  function menu(o) { lock(o); mn.classList.toggle('open', o); mt.setAttribute('aria-expanded', o); }
  mt.addEventListener('click', function () { menu(!mn.classList.contains('open')); });
  $$('.menu a').forEach(function (a) { a.addEventListener('click', function () { menu(false); }); });
  var so = $('.so');
  function search(o) { lock(o); so.classList.toggle('open', o); if (o) setTimeout(function () { $('input', so).focus(); }, 200); }
  $$('[data-so]').forEach(function (b) { b.addEventListener('click', function () { search(true); }); });
  $('.so .x').addEventListener('click', function () { search(false); });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { search(false); menu(false); }
    if (e.key === '/' && !/input|textarea|select/i.test(d.activeElement.tagName)) { e.preventDefault(); search(true); }
  });
  $$('.nav a').forEach(function (a) { var p = new URL(a.href).pathname; if (p !== '/' && location.pathname.indexOf(p) === 0) a.classList.add('on'); });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1 });
    $$('.page-hero .container>p,.page-hero .container>.actions,.page-hero .container>.eyebrow,.sh>div>p,.product-grid .product-card,.card,.resource-card,.logo-grid a,.panel,.form-card,.spec-table,.fam,.ind,.eng-list a,.stat-strip div,.chips,.reach>*,.final-cta .container>*,.replacement-band .container>*').forEach(function (el, i) {
      el.classList.add('r'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el);
    });
    setTimeout(function () { $$('.r:not(.in)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('in'); }); }, 2500);
  }

  /* word-by-word headline reveal */
  function split(el) {
    var i = 0;
    (function walk(n) { [].slice.call(n.childNodes).forEach(function (c) {
      if (c.nodeType === 3) { var f = d.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(function (t) { if (!t) return; if (/^\s+$/.test(t)) { f.appendChild(d.createTextNode(' ')); return; } var w = d.createElement('span'), s = d.createElement('span'); w.className = 'w'; s.textContent = t; s.style.setProperty('--i', i++); w.appendChild(s); f.appendChild(w); }); n.replaceChild(f, c); }
      else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    }); })(el);
    el.classList.add('sp');
  }
  if ('IntersectionObserver' in window && !reduceM) {
    var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } }); }, { threshold: .2 });
    $$('.hero h1,.page-hero h1,.sh h2,.big,.final-cta h2,.ftr h2,.replacement-band h2').forEach(function (h) { split(h); io2.observe(h); });
    setTimeout(function () { $$('.sp:not(.in)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('in'); }); }, 2500);
  }

  /* cursor spotlight on glass surfaces */
  var SP = '.card,.product-card,.ind,.b,.panel,.resource-card,.logo-grid a', raf = 0, ev = null;
  addEventListener('pointermove', function (e) {
    ev = e; if (raf) return;
    raf = requestAnimationFrame(function () { raf = 0; var c = ev.target.closest && ev.target.closest(SP); if (c) { var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (ev.clientX - r.left) + 'px'); c.style.setProperty('--my', (ev.clientY - r.top) + 'px'); } });
  }, { passive: true });

  /* magnetic buttons */
  if (!matchMedia('(hover:none)').matches && !reduceM) $$('.btn,.pbtn,.ring-link').forEach(function (b) {
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.translate = (e.clientX - r.left - r.width / 2) * .18 + 'px ' + (e.clientY - r.top - r.height / 2) * .28 + 'px'; });
    b.addEventListener('pointerleave', function () { b.style.translate = ''; });
  });

  /* product page: photo render <-> interactive 3D */
  var pv = $('[data-pv]');
  if (pv) pv.addEventListener('click', function () { var box = pv.parentNode, on = box.classList.toggle('is3d'); pv.textContent = on ? 'View photo render' : 'View in 3D'; });

  /* gentle photo parallax */
  var par = $$('[data-par]');
  if (par.length && !reduceM) {
    var pt = function () { par.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; var k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; el.style.transform = 'translate3d(0,' + (k * -46).toFixed(1) + 'px,0)'; }); };
    addEventListener('scroll', pt, { passive: true }); pt();
  }

  /* process timeline progress */
  var steps = $('[data-steps]');
  if (steps) {
    var items = $$('.step', steps);
    var upd = function () { var r = steps.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight * .75 - r.top) / (r.height + innerHeight * .25))); steps.style.setProperty('--p', p.toFixed(3)); items.forEach(function (s, i) { s.classList.toggle('on', p > (i + .4) / items.length); }); };
    addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* inertial smooth scrolling (loads from CDN; falls back to native) */
  addEventListener('load', function () {
    if (!window.Lenis || reduceM || matchMedia('(hover:none)').matches) return;
    L = new Lenis({ lerp: .09, smoothWheel: true });
    (function loop(t) { L.raf(t); requestAnimationFrame(loop); })(performance.now());
  });

  $$('[data-rail]').forEach(function (r) {
    var dn = false, sx = 0, sl = 0, mv = 0;
    r.addEventListener('pointerdown', function (e) { dn = true; mv = 0; sx = e.clientX; sl = r.scrollLeft; r.classList.add('drag'); });
    addEventListener('pointerup', function () { dn = false; r.classList.remove('drag'); });
    r.addEventListener('pointermove', function (e) { if (dn) { mv = Math.abs(e.clientX - sx); r.scrollLeft = sl - (e.clientX - sx); } });
    r.addEventListener('click', function (e) { if (mv > 6) e.preventDefault(); }, true);
    var step = function () { var c = $('.product-card', r); return (c ? c.offsetWidth : 300) + 22; };
    var pv = $('[data-rail-prev]'), nx = $('[data-rail-next]');
    if (pv) pv.addEventListener('click', function () { r.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (nx) nx.addEventListener('click', function () { r.scrollBy({ left: step(), behavior: 'smooth' }); });
  });
})();
