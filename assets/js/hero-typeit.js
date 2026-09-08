/**
 * Hero TypeIt sequence: caption → name → bio.
 * Copy stays in the HTML for SEO; reduced-motion skips animation.
 */
(function () {
  "use strict";

  var TYPEIT_SRC = "https://cdn.jsdelivr.net/npm/typeit@8.8.7/dist/index.umd.js";

  function reducedMotion() {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      return false;
    }
  }

  function reveal() {
    document.documentElement.classList.remove("hero-typeit-wait");
  }

  function loadTypeIt() {
    if (typeof TypeIt !== "undefined") {
      return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = TYPEIT_SRC;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function typeNext(el, text, speed, done) {
    el.textContent = "";
    el.classList.add("ti-live");
    new TypeIt(el, {
      strings: text,
      speed: speed,
      lifeLike: true,
      cursor: true,
      cursorChar: "|",
      html: false,
      startDelay: 120,
      afterComplete: function (instance) {
        instance.destroy(true);
        if (done) done();
      },
    }).go();
  }

  function boot() {
    var caption = document.getElementById("hero-type-caption");
    var name = document.getElementById("hero-type-name");
    var bio = document.getElementById("hero-type-bio");
    if (!caption || !name || !bio) {
      reveal();
      return;
    }

    if (reducedMotion() || typeof TypeIt === "undefined") {
      reveal();
      return;
    }

    var captionText = caption.textContent.replace(/\s+/g, " ").trim();
    var nameText = name.textContent.replace(/\s+/g, " ").trim();
    var bioText = bio.textContent.replace(/\s+/g, " ").trim();

    typeNext(caption, captionText, 42, function () {
      typeNext(name, nameText, 58, function () {
        typeNext(bio, bioText, 26, function () {
          reveal();
        });
      });
    });

    window.setTimeout(reveal, 20000);
  }

  function start() {
    if (reducedMotion()) {
      reveal();
      return;
    }
    loadTypeIt().then(boot).catch(reveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
