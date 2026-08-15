(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-theme";
  var root = document.documentElement;

  function getPreferred() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f7fafc" : "#07131c");
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var isLight = theme === "light";
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
      btn.setAttribute("aria-label", isLight ? "Switch to night mode" : "Switch to day mode");
      btn.title = isLight ? "Night mode" : "Day mode";
    }
  }

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  }

  applyTheme(getPreferred());

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-theme") || getPreferred());
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", toggleTheme);
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function (e) {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? "light" : "dark");
        }
      } catch (err) {}
    });
  }

  /* Lightweight custom cursor — desktop only, skip if reduced motion */
  function initCursor() {
    var el = document.getElementById("siteCustomCursor");
    if (!el) return;
    var fine = window.matchMedia("(pointer: fine)").matches;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      el.remove();
      return;
    }
    var x = 0;
    var y = 0;
    var raf = 0;
    function paint() {
      raf = 0;
      el.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    }
    window.addEventListener(
      "pointermove",
      function (e) {
        x = e.clientX;
        y = e.clientY;
        el.classList.add("is-visible");
        if (!raf) raf = requestAnimationFrame(paint);
      },
      { passive: true }
    );
    window.addEventListener("pointerleave", function () {
      el.classList.remove("is-visible");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCursor);
  } else {
    initCursor();
  }
})();
