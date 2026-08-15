(function () {
  "use strict";

  var HINT_KEY = "portfolio-search-hint-seen";
  var index = [];
  var active = -1;
  var open = false;

  var SECTIONS = [
    { id: "hero", title: "Home", keywords: "hero intro shashi kant paytm senior software engineer hire" },
    { id: "about", title: "About", keywords: "profile summary experience fintech enterprise mern spring boot" },
    { id: "impact", title: "Selected outcomes", keywords: "metrics outcomes 100k transactions 70k jobs latency redis kubernetes circuit breaker production" },
    { id: "timeline", title: "Career timeline", keywords: "paytm policybazaar value innovation labs trajectory growth" },
    { id: "how-i-work", title: "How I work", keywords: "ownership reliability observability collaboration senior" },
    { id: "systems", title: "Systems depth", keywords: "kafka redis api gateway jwt oauth kubernetes aws fintech distributed" },
    { id: "facts", title: "At a glance", keywords: "open to roles domain stack location timezone" },
    { id: "certificates", title: "Certificates", keywords: "internshala hackerrank kubernetes aws oracle react sql node" },
    { id: "skills", title: "Skills", keywords: "java spring nestjs kafka redis react next aws docker kubernetes typescript python" },
    { id: "resume", title: "Resume & Experience", keywords: "paytm policybazaar value innovation labs education btech internship" },
    { id: "Experience", title: "Major Projects", keywords: "zamtel swiftcab codexcave rozgar ccil epil phoenix luxorpen architecture" },
    { id: "swiftcab", title: "SwiftCab.in — Flagship", keywords: "swiftcab cab booking kafka redis websocket golang ola rapido real-time ride hailing flagship" },
    { id: "project_shorts", title: "Project Shorts", keywords: "screenshots zoom geolocation oauth cover letter luxorpen" },
    { id: "product", title: "Product", keywords: "product showcase" },
    { id: "portfolio", title: "Mini Projects", keywords: "portfolio demos blog store" },
    { id: "proof", title: "Proof & social", keywords: "resume github linkedin recommendations ccil rozgar codexcave" },
    { id: "hire", title: "Hire CTA", keywords: "available senior roles email calendly contact hiring" },
    { id: "services", title: "Services", keywords: "microservices apis cloud devops system design ai automation" },
    { id: "contact", title: "Contact", keywords: "email phone noida skntjee hire message ist notice" }
  ];

  function buildIndex() {
    index = SECTIONS.map(function (s) {
      var el = document.getElementById(s.id);
      var text = s.title + " " + (s.keywords || "");
      if (el) {
        var h = el.querySelector("h2, h3, .section-title h2");
        if (h) text += " " + h.textContent;
        text += " " + (el.innerText || "").slice(0, 800);
      }
      return {
        id: s.id,
        title: s.title,
        hay: text.toLowerCase().replace(/\s+/g, " ")
      };
    }).filter(function (item) {
      return document.getElementById(item.id);
    });
  }

  function qs(sel) {
    return document.querySelector(sel);
  }

  function openSearch() {
    var overlay = qs("#site-search");
    if (!overlay) return;
    open = true;
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-open");
    var input = qs("#site-search-input");
    input.value = "";
    render("");
    active = 0;
    highlight();
    setTimeout(function () {
      input.focus();
    }, 10);
  }

  function closeSearch() {
    var overlay = qs("#site-search");
    if (!overlay) return;
    open = false;
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-open");
    active = -1;
  }

  function score(hay, terms) {
    var s = 0;
    for (var i = 0; i < terms.length; i++) {
      var t = terms[i];
      if (!t) continue;
      var idx = hay.indexOf(t);
      if (idx < 0) return -1;
      s += 10 - Math.min(idx, 9);
      if (hay.indexOf(" " + t) >= 0) s += 3;
    }
    return s;
  }

  function search(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return index.slice();
    var terms = q.split(/\s+/);
    return index
      .map(function (item) {
        return { item: item, s: score(item.hay, terms) };
      })
      .filter(function (r) {
        return r.s >= 0;
      })
      .sort(function (a, b) {
        return b.s - a.s;
      })
      .map(function (r) {
        return r.item;
      });
  }

  function render(q) {
    var list = qs("#site-search-results");
    var empty = qs("#site-search-empty");
    var results = search(q);
    list.innerHTML = "";
    if (!results.length) {
      empty.hidden = false;
      active = -1;
      return;
    }
    empty.hidden = true;
    results.forEach(function (item, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "site-search__item";
      btn.setAttribute("data-id", item.id);
      btn.setAttribute("data-index", String(i));
      btn.innerHTML =
        '<span class="site-search__item-title">' +
        item.title +
        '</span><span class="site-search__item-id">#' +
        item.id +
        "</span>";
      btn.addEventListener("click", function () {
        goTo(item.id);
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    active = 0;
    highlight();
  }

  function highlight() {
    var items = document.querySelectorAll(".site-search__item");
    items.forEach(function (el, i) {
      el.classList.toggle("is-active", i === active);
    });
    var cur = items[active];
    if (cur) cur.scrollIntoView({ block: "nearest" });
  }

  function goTo(id) {
    var el = document.getElementById(id);
    closeSearch();
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("search-flash");
    setTimeout(function () {
      el.classList.remove("search-flash");
    }, 1400);
    try {
      history.replaceState(null, "", "#" + id);
    } catch (e) {}
  }

  function showHint() {
    try {
      if (localStorage.getItem(HINT_KEY)) return;
    } catch (e) {}
    var tip = qs("#site-search-hint");
    if (!tip) return;
    tip.hidden = false;
    tip.classList.add("is-visible");
    setTimeout(function () {
      tip.classList.remove("is-visible");
      setTimeout(function () {
        tip.hidden = true;
      }, 350);
      try {
        localStorage.setItem(HINT_KEY, "1");
      } catch (e) {}
    }, 5500);
  }

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
  }

  function onKey(e) {
    var metaK = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
    var slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;

    if (metaK || (slash && !isTypingTarget(e.target) && !open)) {
      e.preventDefault();
      if (open && metaK) closeSearch();
      else openSearch();
      return;
    }

    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
      return;
    }

    var items = document.querySelectorAll(".site-search__item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!items.length) return;
      active = (active + 1) % items.length;
      highlight();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      active = (active - 1 + items.length) % items.length;
      highlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && items[active]) {
        goTo(items[active].getAttribute("data-id"));
      }
    }
  }

  function init() {
    buildIndex();

    var toggle = qs("#site-search-toggle");
    var overlay = qs("#site-search");
    var input = qs("#site-search-input");
    var backdrop = qs("#site-search-backdrop");
    var closeBtn = qs("#site-search-close");
    var hintClose = qs("#site-search-hint-close");

    if (toggle) toggle.addEventListener("click", openSearch);
    if (backdrop) backdrop.addEventListener("click", closeSearch);
    if (closeBtn) closeBtn.addEventListener("click", closeSearch);
    if (input) {
      input.addEventListener("input", function () {
        render(input.value);
      });
    }
    if (hintClose) {
      hintClose.addEventListener("click", function () {
        var tip = qs("#site-search-hint");
        if (tip) {
          tip.classList.remove("is-visible");
          tip.hidden = true;
        }
        try {
          localStorage.setItem(HINT_KEY, "1");
        } catch (e) {}
      });
    }

    document.addEventListener("keydown", onKey);

    var isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    document.querySelectorAll("[data-search-shortcut]").forEach(function (el) {
      el.textContent = isMac ? "⌘ K" : "Ctrl K";
    });

    setTimeout(showHint, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
