/**
 * Lightweight page motion — CSS IntersectionObserver (no GSAP CDN).
 * Skips under prefers-reduced-motion.
 */
(function () {
  "use strict";

  var mq =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq && mq.matches) return;

  function reveal(el) {
    el.classList.add("is-revealed");
  }

  function boot() {
    var heroBits = document.querySelectorAll(".hero-anim");
    heroBits.forEach(function (el, i) {
      el.style.setProperty("--reveal-delay", i * 70 + "ms");
      requestAnimationFrame(function () {
        reveal(el);
      });
    });

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal-item, .impact-card, .work-card, .short-card, .proof-card, .featured-project")
        .forEach(reveal);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document
      .querySelectorAll(
        ".reveal-item, .impact-card, .work-card, .short-card, .proof-card, .featured-project"
      )
      .forEach(function (el) {
        el.classList.add("will-reveal");
        io.observe(el);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
