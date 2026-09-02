/**
 * Smooth slide sidebar — desktop collapsible, mobile overlay drawer.
 * Desktop default: open. Collapsed uses body.sidebar-collapsed.
 * Mobile default: closed. Open uses body.sidebar-open.
 * Animates via transform (not left) for smoother composites.
 */
(function () {
  "use strict";

  var MQ = 1200;
  var STORAGE_KEY = "portfolio-sidebar";
  var body = document.body;
  var root = document.documentElement;
  var toggle = document.getElementById("sidebar-toggle");
  var backdrop = document.getElementById("sidebar-backdrop");
  var header = document.getElementById("header");
  if (!toggle || !header) return;

  var mq =
    window.matchMedia && window.matchMedia("(min-width: " + MQ + "px)");

  function isDesktop() {
    return mq ? mq.matches : window.innerWidth >= MQ;
  }

  function isVisible() {
    if (isDesktop()) return !body.classList.contains("sidebar-collapsed");
    return body.classList.contains("sidebar-open");
  }

  function syncUi(visible) {
    toggle.setAttribute("aria-expanded", visible ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      visible ? "Close navigation" : "Open navigation"
    );
    toggle.title = visible ? "Hide sidebar" : "Show sidebar";
    var icon = toggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("bi-list", !visible);
      icon.classList.toggle("bi-x", visible);
    }
    if (backdrop) {
      var showBackdrop = visible && !isDesktop();
      backdrop.hidden = !showBackdrop;
      backdrop.setAttribute("aria-hidden", showBackdrop ? "false" : "true");
    }
    body.classList.toggle("mobile-nav-active", visible && !isDesktop());
  }

  function setVisible(visible) {
    if (isDesktop()) {
      body.classList.toggle("sidebar-collapsed", !visible);
      body.classList.remove("sidebar-open");
      root.classList.toggle("sidebar-collapsed-boot", !visible);
      try {
        localStorage.setItem(STORAGE_KEY, visible ? "open" : "collapsed");
      } catch (e) {}
    } else {
      body.classList.toggle("sidebar-open", visible);
      body.classList.remove("sidebar-collapsed");
      root.classList.remove("sidebar-collapsed-boot");
    }
    syncUi(visible);
  }

  function initialState() {
    if (isDesktop()) {
      var saved = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch (e) {}
      setVisible(saved !== "collapsed");
    } else {
      setVisible(false);
    }
  }

  toggle.addEventListener("click", function () {
    setVisible(!isVisible());
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setVisible(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isVisible() && !isDesktop()) {
      setVisible(false);
      toggle.focus();
    }
  });

  header.querySelectorAll(".nav-link, .scrollto").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!isDesktop() && isVisible()) setVisible(false);
    });
  });

  var onBreak = function () {
    initialState();
  };
  if (mq) {
    if (mq.addEventListener) mq.addEventListener("change", onBreak);
    else if (mq.addListener) mq.addListener(onBreak);
  }

  initialState();
})();
