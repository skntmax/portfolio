/**
 * Load heavy below-fold vendors after first paint (idle).
 * Keeps initial load light; main.js guards missing globals.
 */
(function () {
  "use strict";

  var scripts = [
    "assets/vendor/purecounter/purecounter_vanilla.js",
    "assets/vendor/glightbox/js/glightbox.min.js",
    "assets/vendor/isotope-layout/isotope.pkgd.min.js",
    "assets/vendor/swiper/swiper-bundle.min.js"
  ];

  function loadOne(src) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = resolve;
      document.body.appendChild(s);
    });
  }

  function bootVendors() {
    var chain = Promise.resolve();
    scripts.forEach(function (src) {
      chain = chain.then(function () {
        return loadOne(src);
      });
    });
    chain.then(function () {
      if (typeof PureCounter !== "undefined") {
        try {
          new PureCounter();
        } catch (e) {}
      }
      // AOS intentionally skipped — it hid text until scroll/init.
      if (typeof GLightbox !== "undefined") {
        try {
          GLightbox({ selector: ".portfolio-lightbox" });
        } catch (e3) {}
      }
      if (typeof Isotope !== "undefined") {
        var containers = document.querySelectorAll(".portfolio-container");
        containers.forEach(function (el) {
          try {
            new Isotope(el, { itemSelector: ".portfolio-item" });
          } catch (e4) {}
        });
      }
      if (typeof Swiper !== "undefined" && document.querySelector(".testimonials-slider")) {
        try {
          new Swiper(".testimonials-slider", {
            speed: 600,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            slidesPerView: "auto",
            pagination: { el: ".swiper-pagination", type: "bullets", clickable: true },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 20 }
            }
          });
        } catch (e5) {}
      }
    });
  }

  function schedule() {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(bootVendors, { timeout: 2500 });
    } else {
      setTimeout(bootVendors, 800);
    }
  }

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
})();
