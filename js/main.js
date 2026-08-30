/* ==========================================================================
   ARUN R — Portfolio interactions
   - Neural-thread canvas: a lightweight particle/line network drawn behind
     each hero, the site's signature motif (an AIML engineer's own medium).
   - Respects prefers-reduced-motion by rendering a single static frame.
   - Pauses backdrop <video> elements off-screen / on reduced motion.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- neural thread canvas ---------------- */
  function initThreads(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, nodes;
    var NODE_COUNT = window.innerWidth < 700 ? 22 : 42;
    var LINK_DIST = 150;

    function size() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNodes() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            var alpha = (1 - d / LINK_DIST) * 0.35;
            ctx.strokeStyle = "rgba(94,231,255," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      for (var j = 0; j < nodes.length; j++) {
        var p = nodes[j];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(182,169,255,0.75)";
        ctx.fill();
      }
      if (!reduceMotion) requestAnimationFrame(step);
    }

    size();
    makeNodes();
    step();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        size();
        makeNodes();
        if (reduceMotion) step();
      }, 200);
    });
  }

  document.querySelectorAll("[data-threads]").forEach(initThreads);

  /* ---------------- backdrop video handling ---------------- */
  var videos = document.querySelectorAll("[data-bg-video]");
  videos.forEach(function (v) {
    if (reduceMotion) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            v.play().catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(v);
  });

  /* ---------------- footer year ---------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- scroll reveal (subtle) ---------------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll("[data-reveal]");
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .7s ease, transform .7s ease";
      revealIO.observe(el);
    });
  }
})();
