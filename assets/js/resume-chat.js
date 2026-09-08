/**
 * Nexus — resume AI chat widget for the portfolio.
 * Intent-first dialogue + optional visitor intake for follow-ups.
 * Talks to rag-starter: POST /api/visit, POST /api/ask
 */
(function () {
  "use strict";

  var API_BASE = (
    document.documentElement.getAttribute("data-resume-api") ||
    "http://127.0.0.1:3001"
  ).replace(/\/$/, "");

  var STORAGE_KEY = "nexus-chat-v2";
  var MAX_CHARS = 400;
  var MAX_STORED = 40;
  var HANDOFF_AFTER = 2;
  var MAX_NAME = 80;
  var MAX_CONTACT = 160;

  var STARTERS = [
    { q: "What is your current role?", label: "Current role", intent: "role" },
    { q: "Tell me about SwiftCab", label: "SwiftCab", intent: "swiftcab" },
    { q: "What are your strongest skills?", label: "Skills", intent: "skills" },
    { q: "What did you do at Paytm?", label: "Paytm", intent: "paytm" },
    { q: "How can I contact you?", label: "Contact", intent: "contact" },
    { q: "Are you open to new roles?", label: "Availability", intent: "availability" },
  ];

  var FOLLOWUPS = {
    greeting: ["What is your current role?", "How can I contact you?"],
    role: ["What did you do at Paytm?", "Tell me about SwiftCab"],
    experience: ["What did you do at Paytm?", "What are your strongest skills?"],
    paytm: ["Strongest skills?", "Tell me about SwiftCab"],
    swiftcab: ["What stack does SwiftCab use?", "How can I contact you?"],
    projects: ["Tell me about SwiftCab", "What did you do at Paytm?"],
    skills: ["What is your current role?", "Experience at Paytm?"],
    education: ["What is your current role?", "How can I contact you?"],
    contact: ["Are you open to new roles?", "What is your current role?"],
    availability: ["How can I contact you?", "What is your current role?"],
    resume: ["What are your strongest skills?", "Tell me about SwiftCab"],
    fallback: ["What is your current role?", "How can I contact you?", "Tell me about SwiftCab"],
    default: ["What is your current role?", "How can I contact you?"],
  };

  var INTENT_ACK = {
    role: "Got it — current role.",
    experience: "Looking at experience.",
    paytm: "Pulling Paytm context.",
    swiftcab: "Looking up SwiftCab.",
    projects: "Checking projects.",
    skills: "Checking skills & stack.",
    education: "Checking education.",
    contact: "Contact details coming up.",
    availability: "Checking availability.",
    resume: "From the resume docs…",
    greeting: "Hi — happy to help.",
    fallback: "I’ll stick to what’s in the docs.",
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function formatTime(ts) {
    try {
      return new Date(ts).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  }

  function svg(html) {
    var wrap = document.createElement("span");
    wrap.className = "nx-icon";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = html;
    return wrap;
  }

  function nexusMark(sizeClass) {
    var gid = "nxg-" + uid();
    var node = svg(
      '<svg viewBox="0 0 32 32" fill="none">' +
        '<defs><linearGradient id="' +
        gid +
        '" x1="5" y1="3" x2="28" y2="30" gradientUnits="userSpaceOnUse">' +
        '<stop stop-color="#5eead4"/><stop offset="1" stop-color="#38bdf8"/>' +
        "</linearGradient></defs>" +
        '<circle cx="16" cy="16" r="15" fill="url(#' +
        gid +
        ')"/>' +
        '<circle cx="7.4" cy="10.2" r="1.35" fill="#042f2e" opacity=".32"/>' +
        '<circle cx="25.4" cy="11.4" r="1.15" fill="#042f2e" opacity=".28"/>' +
        '<path d="M8.6 10.8 11.4 13.4M21 13.6l3.4-1.6" stroke="#042f2e" stroke-width="1.15" stroke-linecap="round" opacity=".28"/>' +
        '<circle cx="12.15" cy="14.15" r="1.6" fill="#042f2e"/>' +
        '<circle cx="19.85" cy="14.15" r="1.6" fill="#042f2e"/>' +
        '<path d="M11.4 19.15c1.55 2.05 7.65 2.05 9.2 0" stroke="#042f2e" stroke-width="1.75" stroke-linecap="round"/>' +
        "</svg>",
    );
    if (sizeClass) node.className += " " + sizeClass;
    return node;
  }

  function iconClose() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    );
  }

  function iconReset() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 12a7.5 7.5 0 1 0 2.1-5.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4.5 4.8V8.6h3.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    );
  }

  function iconSend() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12 14-7-5.2 14L12 13.2 5 12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m12 13.2 7-8.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    );
  }

  function iconCopy() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M5 15.2V6.8A1.8 1.8 0 0 1 6.8 5h8.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    );
  }

  function iconRetry() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><path d="M19.2 12a7.2 7.2 0 1 1-2.1-5.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M19.2 5.4V9h-3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    );
  }

  function iconStop() {
    return svg(
      '<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/></svg>',
    );
  }

  function defaultVisitor() {
    return {
      done: false,
      phase: "name",
      id: null,
      name: "",
      contact: "",
      skipped: false,
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // migrate v1 messages if present
        var legacy = localStorage.getItem("nexus-chat-v1");
        if (legacy) {
          var old = JSON.parse(legacy);
          return {
            messages: Array.isArray(old.messages) ? old.messages.slice(-MAX_STORED) : [],
            misses: Number(old.misses) || 0,
            visitor: defaultVisitor(),
          };
        }
        return { messages: [], misses: 0, visitor: defaultVisitor() };
      }
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.messages)) {
        return { messages: [], misses: 0, visitor: defaultVisitor() };
      }
      var visitor = parsed.visitor && typeof parsed.visitor === "object"
        ? Object.assign(defaultVisitor(), parsed.visitor)
        : defaultVisitor();
      return {
        messages: parsed.messages.slice(-MAX_STORED),
        misses: Number(parsed.misses) || 0,
        visitor: visitor,
      };
    } catch (e) {
      return { messages: [], misses: 0, visitor: defaultVisitor() };
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          messages: state.messages.slice(-MAX_STORED),
          misses: state.misses,
          visitor: state.visitor,
        }),
      );
    } catch (e) {}
  }

  /** Intent classification — route before response. */
  function guessIntent(text) {
    var q = String(text || "").toLowerCase();
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|namaste)\b/.test(q)) {
      return "greeting";
    }
    if (/contact|email|reach|linkedin|phone|hire\s*me|get\s*in\s*touch/.test(q)) {
      return "contact";
    }
    if (/open\s*to|available|hiring|looking\s*for|new\s*role|opportunity|job\s*change/.test(q)) {
      return "availability";
    }
    if (/swiftcab|cab\s*ride|ride[- ]?hail/.test(q)) return "swiftcab";
    if (/paytm/.test(q)) return "paytm";
    if (/zamtel|rozgar|project|built|shipped|portfolio/.test(q)) return "projects";
    if (/skill|stack|tech|java|react|kafka|spring|node|aws|docker/.test(q)) {
      return "skills";
    }
    if (/educat|degree|college|university|b\.?tech|bachelor/.test(q)) return "education";
    if (/experience|career|background|worked|years/.test(q)) return "experience";
    if (/role|title|current\s*job|what\s+do\s+you\s+do|senior\s*software/.test(q)) {
      return "role";
    }
    if (/resume|cv|summary|about\s+you|who\s+are\s+you/.test(q)) return "resume";
    return "fallback";
  }

  function welcomeText(visitor) {
    var name = visitor && visitor.name && visitor.name !== "Anonymous" ? visitor.name : null;
    if (name) {
      return (
        "Nice to meet you, " +
        name +
        ". I’m Nexus — Shashi’s resume assistant. Ask about roles, Paytm, SwiftCab, skills, or how to reach him. I’ll answer from his indexed docs."
      );
    }
    return "Hi — I’m Nexus, Shashi’s resume assistant. Ask about roles, Paytm, SwiftCab, skills, or how to reach him. I’ll answer from his indexed docs.";
  }

  function buildUI() {
    var fab = el("button", "nx-fab");
    fab.type = "button";
    fab.setAttribute("aria-controls", "nx-panel");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Open Nexus, the resume assistant");
    fab.classList.add("nx-fab--pulse");
    fab.appendChild(nexusMark("nx-icon--lg"));
    var fabCopy = el("span", "nx-fab__copy");
    fabCopy.appendChild(el("span", "nx-fab__name", "Nexus"));
    fabCopy.appendChild(el("span", "nx-fab__hint", "Ask about my resume"));
    fab.appendChild(fabCopy);
    var badge = el("span", "nx-fab__badge", "1");
    badge.hidden = true;
    badge.setAttribute("aria-hidden", "true");
    fab.appendChild(badge);

    var backdrop = el("div", "nx-backdrop");
    backdrop.hidden = true;

    var panel = el("div", "nx-panel");
    panel.id = "nx-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.setAttribute("aria-labelledby", "nx-title");

    var head = el("div", "nx-head");
    var brand = el("div", "nx-brand");
    brand.appendChild(nexusMark("nx-icon--md"));
    var titles = el("div", "nx-titles");
    var titleRow = el("div", "nx-title-row");
    titleRow.appendChild(el("h2", "nx-title", "Nexus"));
    titleRow.firstChild.id = "nx-title";
    var live = el("span", "nx-live", "Checking");
    live.id = "nx-status";
    titleRow.appendChild(live);
    titles.appendChild(titleRow);
    titles.appendChild(el("p", "nx-sub", "Resume assistant · answers from docs"));
    brand.appendChild(titles);
    head.appendChild(brand);

    var tools = el("div", "nx-tools");
    var reset = el("button", "nx-icon-btn");
    reset.type = "button";
    reset.setAttribute("aria-label", "Start a new conversation");
    reset.title = "New chat";
    reset.appendChild(iconReset());
    var close = el("button", "nx-icon-btn");
    close.type = "button";
    close.setAttribute("aria-label", "Close Nexus");
    close.title = "Close";
    close.appendChild(iconClose());
    tools.appendChild(reset);
    tools.appendChild(close);
    head.appendChild(tools);

    var confirm = el("div", "nx-confirm");
    confirm.hidden = true;
    confirm.appendChild(el("p", null, "Clear this conversation?"));
    var confirmActions = el("div", "nx-confirm__actions");
    var confirmNo = el("button", "nx-btn nx-btn--ghost", "Keep");
    confirmNo.type = "button";
    var confirmYes = el("button", "nx-btn nx-btn--danger", "Clear chat");
    confirmYes.type = "button";
    confirmActions.appendChild(confirmNo);
    confirmActions.appendChild(confirmYes);
    confirm.appendChild(confirmActions);

    /* ---- Visitor intake gate (name → optional contact → skip OK) ---- */
    var gate = el("div", "nx-gate");
    gate.hidden = true;
    gate.setAttribute("role", "form");
    gate.setAttribute("aria-labelledby", "nx-gate-title");
    gate.appendChild(nexusMark("nx-icon--hero"));
    var gateTitle = el("h3", "nx-gate__title", "Hi, I’m Nexus");
    gateTitle.id = "nx-gate-title";
    gate.appendChild(gateTitle);
    var gateLead = el(
      "p",
      "nx-gate__lead",
      "Ask about Shashi’s work. A name is optional so he can follow up — skip anytime.",
    );
    gate.appendChild(gateLead);

    var gateStep = el("p", "nx-gate__step", "Step 1 of 2");
    gateStep.id = "nx-gate-step";
    gate.appendChild(gateStep);

    var gateLabel = el("label", "nx-gate__label", "What should I call you?");
    gateLabel.htmlFor = "nx-gate-input";
    gateLabel.id = "nx-gate-label";
    gate.appendChild(gateLabel);

    var gateInput = document.createElement("input");
    gateInput.type = "text";
    gateInput.id = "nx-gate-input";
    gateInput.className = "nx-gate__input";
    gateInput.autocomplete = "nickname";
    gateInput.maxLength = MAX_NAME;
    gateInput.placeholder = "Your name or username";
    gate.appendChild(gateInput);

    var gateHint = el(
      "p",
      "nx-gate__hint",
      "Used only for follow-up counts — not shared publicly.",
    );
    gate.appendChild(gateHint);

    var gateActions = el("div", "nx-gate__actions");
    var gateBack = el("button", "nx-btn nx-btn--ghost", "Back");
    gateBack.type = "button";
    gateBack.id = "nx-gate-back";
    gateBack.hidden = true;
    var gateContinue = el("button", "nx-btn nx-btn--primary", "Continue");
    gateContinue.type = "button";
    gateContinue.id = "nx-gate-continue";
    var gateSkip = el("button", "nx-btn nx-btn--ghost", "Skip & chat");
    gateSkip.type = "button";
    gateSkip.id = "nx-gate-skip";
    gateActions.appendChild(gateBack);
    gateActions.appendChild(gateSkip);
    gateActions.appendChild(gateContinue);
    gate.appendChild(gateActions);

    var thread = el("div", "nx-thread");
    thread.id = "nx-thread";
    thread.setAttribute("role", "log");
    thread.setAttribute("aria-live", "polite");
    thread.setAttribute("aria-relevant", "additions");
    thread.setAttribute("aria-label", "Nexus conversation");

    var empty = el("div", "nx-empty");
    empty.appendChild(nexusMark("nx-icon--hero"));
    empty.appendChild(el("h3", null, "Hi, I’m Nexus"));
    empty.appendChild(
      el(
        "p",
        null,
        "Ask about experience, projects, stack, or how to reach Shashi. I stay on his resume docs — I won’t invent details.",
      ),
    );
    var caps = el("ul", "nx-caps");
    ["Roles & experience", "Projects like SwiftCab", "Skills & stack", "How to get in touch"].forEach(
      function (item) {
        caps.appendChild(el("li", null, item));
      },
    );
    empty.appendChild(caps);

    var suggestions = el("div", "nx-chips");
    STARTERS.forEach(function (item) {
      var btn = el("button", "nx-chip", item.label);
      btn.type = "button";
      btn.dataset.q = item.q;
      btn.dataset.intent = item.intent;
      suggestions.appendChild(btn);
    });

    var jump = el("button", "nx-jump", "Latest");
    jump.type = "button";
    jump.hidden = true;
    jump.setAttribute("aria-label", "Jump to latest message");

    var form = el("form", "nx-form");
    var field = el("div", "nx-field");
    var label = el("label", "nx-sr", "Message Nexus");
    label.htmlFor = "nx-input";
    var input = document.createElement("textarea");
    input.id = "nx-input";
    input.rows = 1;
    input.maxLength = MAX_CHARS;
    input.placeholder = "Ask about roles, projects, skills…";
    input.setAttribute("aria-describedby", "nx-hint nx-count");
    var send = el("button", "nx-send");
    send.type = "submit";
    send.setAttribute("aria-label", "Send message");
    send.disabled = true;
    send.appendChild(iconSend());
    field.appendChild(label);
    field.appendChild(input);
    field.appendChild(send);

    var meta = el("div", "nx-meta");
    meta.appendChild(el("p", "nx-hint", "Enter to send · Shift+Enter for a new line"));
    meta.firstChild.id = "nx-hint";
    var count = el("p", "nx-count", "0 / " + MAX_CHARS);
    count.id = "nx-count";
    meta.appendChild(count);

    var disclaimer = el(
      "p",
      "nx-disclaimer",
      "Nexus reads Shashi’s resume docs. For hiring, email is the surest path.",
    );
    var handoff = el("div", "nx-handoff");
    handoff.hidden = true;
    handoff.appendChild(el("p", null, "Want a human reply?"));
    var links = el("div", "nx-handoff__links");
    var mail = el("a", "nx-chip nx-chip--link", "Email Shashi");
    mail.href = "mailto:skntjee@gmail.com?subject=Hello%20from%20Nexus";
    var li = el("a", "nx-chip nx-chip--link", "LinkedIn");
    li.href = "https://www.linkedin.com/in/shashi-kant-5a1710185/";
    li.target = "_blank";
    li.rel = "noopener noreferrer";
    links.appendChild(mail);
    links.appendChild(li);
    handoff.appendChild(links);

    form.appendChild(field);
    form.appendChild(meta);
    form.appendChild(disclaimer);
    form.appendChild(handoff);

    panel.appendChild(head);
    panel.appendChild(confirm);
    panel.appendChild(gate);
    panel.appendChild(thread);
    panel.appendChild(jump);
    panel.appendChild(suggestions);
    panel.appendChild(form);

    document.body.appendChild(backdrop);
    document.body.appendChild(fab);
    document.body.appendChild(panel);

    return {
      fab: fab,
      badge: badge,
      backdrop: backdrop,
      panel: panel,
      close: close,
      reset: reset,
      confirm: confirm,
      confirmYes: confirmYes,
      confirmNo: confirmNo,
      gate: gate,
      gateTitle: gateTitle,
      gateLead: gateLead,
      gateStep: gateStep,
      gateLabel: gateLabel,
      gateInput: gateInput,
      gateHint: gateHint,
      gateContinue: gateContinue,
      gateSkip: gateSkip,
      gateBack: gateBack,
      thread: thread,
      empty: empty,
      suggestions: suggestions,
      jump: jump,
      form: form,
      input: input,
      send: send,
      status: live,
      count: count,
      handoff: handoff,
    };
  }

  function setStatus(ui, kind, text) {
    ui.status.textContent = text;
    ui.status.className = "nx-live nx-live--" + kind;
  }

  function nearBottom(thread) {
    return thread.scrollHeight - thread.scrollTop - thread.clientHeight < 72;
  }

  function scrollThread(ui, force) {
    if (force || nearBottom(ui.thread)) {
      ui.thread.scrollTop = ui.thread.scrollHeight;
      ui.jump.hidden = true;
    } else {
      ui.jump.hidden = false;
    }
  }

  function resizeInput(input) {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }

  function setSendMode(ui, mode) {
    ui.send.replaceChildren();
    if (mode === "stop") {
      ui.send.appendChild(iconStop());
      ui.send.setAttribute("aria-label", "Stop reply");
      ui.send.classList.add("is-stop");
      ui.send.disabled = false;
    } else {
      ui.send.appendChild(iconSend());
      ui.send.setAttribute("aria-label", "Send message");
      ui.send.classList.remove("is-stop");
    }
  }

  function updateComposer(ui) {
    var value = ui.input.value;
    var len = value.trim().length;
    ui.count.textContent = value.length + " / " + MAX_CHARS;
    ui.count.classList.toggle("is-warn", value.length > MAX_CHARS - 40);
    if (ui.form.dataset.busy === "1") {
      if (!ui.send.classList.contains("is-stop")) setSendMode(ui, "stop");
      return;
    }
    if (ui.send.classList.contains("is-stop")) setSendMode(ui, "send");
    var gated = !ui.state.visitor.done;
    ui.send.disabled = gated || !len;
  }

  function setBusy(ui, busy) {
    ui.form.dataset.busy = busy ? "1" : "0";
    ui.input.disabled = busy || !ui.state.visitor.done;
    Array.prototype.forEach.call(ui.suggestions.querySelectorAll("button"), function (b) {
      b.disabled = busy || !ui.state.visitor.done;
    });
    updateComposer(ui);
  }

  function showEmpty(ui, show) {
    if (show && !ui.empty.parentNode) {
      ui.thread.appendChild(ui.empty);
    } else if (!show && ui.empty.parentNode) {
      ui.empty.remove();
    }
  }

  function setGatePhase(ui, phase) {
    var visitor = ui.state.visitor;
    visitor.phase = phase;
    if (phase === "done") {
      visitor.done = true;
      ui.gate.hidden = true;
      ui.thread.hidden = false;
      ui.suggestions.hidden = false;
      ui.form.hidden = false;
      ui.jump.hidden = true;
      ui.input.disabled = false;
      ui.gateInput.value = "";
      updateComposer(ui);
      return;
    }

    visitor.done = false;
    ui.gate.hidden = false;
    ui.thread.hidden = true;
    ui.suggestions.hidden = true;
    ui.form.hidden = true;
    ui.jump.hidden = true;
    ui.handoff.hidden = true;

    ui.gateInput.removeAttribute("aria-invalid");
    if (phase === "name") {
      ui.gateStep.textContent = "Step 1 of 2 · optional";
      ui.gateTitle.textContent = "Hi, I’m Nexus";
      ui.gateLead.textContent =
        "Ask about Shashi’s work. A name is optional so he can follow up — skip anytime.";
      ui.gateLabel.textContent = "What should I call you?";
      ui.gateInput.placeholder = "Your name or username";
      ui.gateInput.maxLength = MAX_NAME;
      ui.gateInput.autocomplete = "nickname";
      ui.gateInput.type = "text";
      ui.gateHint.textContent = "Used only so Shashi can follow up — not shown on the site.";
      ui.gateContinue.textContent = "Continue";
      ui.gateSkip.textContent = "Skip & chat";
      ui.gateBack.hidden = true;
      ui.gateInput.value = visitor.name && visitor.name !== "Anonymous" ? visitor.name : "";
    } else {
      ui.gateStep.textContent = "Step 2 of 2 · optional";
      ui.gateTitle.textContent = "Want a follow-up?";
      ui.gateLead.textContent =
        "Email, LinkedIn, or phone — only if you’d like Shashi to reach you. Otherwise skip.";
      ui.gateLabel.textContent = "Contact (optional)";
      ui.gateInput.placeholder = "email · LinkedIn · phone";
      ui.gateInput.maxLength = MAX_CONTACT;
      ui.gateInput.autocomplete = "email";
      ui.gateInput.type = "text";
      ui.gateHint.textContent = "Skip if you prefer to stay anonymous.";
      ui.gateContinue.textContent = "Start chatting";
      ui.gateSkip.textContent = "Skip";
      ui.gateBack.hidden = false;
      ui.gateInput.value = visitor.contact || "";
    }
    saveState(ui.state);
    setTimeout(function () {
      ui.gateInput.focus();
    }, 40);
  }

  async function finishIntake(ui, opts) {
    opts = opts || {};
    var visitor = ui.state.visitor;
    if (opts.skipName) {
      visitor.name = "Anonymous";
      visitor.skipped = true;
      visitor.contact = "";
    }
    if (opts.skipContact) {
      visitor.contact = "";
    }
    if (!visitor.name) visitor.name = "Anonymous";

    setGatePhase(ui, "done");

    try {
      var res = await fetch(API_BASE + "/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: visitor.name,
          contact: visitor.contact || undefined,
          skipped: visitor.skipped || visitor.name === "Anonymous",
        }),
      });
      var data = await res.json().catch(function () {
        return {};
      });
      if (res.ok && data.visitor && data.visitor.id) {
        visitor.id = data.visitor.id;
      } else {
        visitor.id = visitor.id || "local_" + uid();
      }
    } catch (e) {
      visitor.id = visitor.id || "local_" + uid();
    }

    saveState(ui.state);

    if (!ui.state.messages.length) {
      pushMessage(ui, ui.state, {
        id: uid(),
        role: "assistant",
        text: welcomeText(visitor),
        ts: Date.now(),
      });
      resetStarters(ui);
    } else {
      hydrate(ui, ui.state);
    }
    ui.input.focus();
  }

  function advanceGate(ui, skipped) {
    var visitor = ui.state.visitor;
    var phase = visitor.phase || "name";
    var value = String(ui.gateInput.value || "").trim();

    if (phase === "name") {
      if (skipped) {
        void finishIntake(ui, { skipName: true });
        return;
      }
      if (!value) {
        ui.gateHint.textContent = "Enter a name, or tap Skip & chat.";
        ui.gateInput.setAttribute("aria-invalid", "true");
        ui.gateInput.focus();
        return;
      }
      visitor.name = value.slice(0, MAX_NAME);
      visitor.skipped = false;
      saveState(ui.state);
      setGatePhase(ui, "contact");
      return;
    }

    if (phase === "contact") {
      if (skipped) {
        void finishIntake(ui, { skipContact: true });
        return;
      }
      visitor.contact = value.slice(0, MAX_CONTACT);
      void finishIntake(ui, {});
    }
  }

  function renderActions(row, msg, ui) {
    var actions = el("div", "nx-msg__actions");
    var copy = el("button", "nx-mini", "Copy");
    copy.type = "button";
    copy.prepend(iconCopy());
    copy.addEventListener("click", function () {
      var done = function () {
        copy.lastChild.textContent = "Copied";
        setTimeout(function () {
          copy.lastChild.textContent = "Copy";
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg.text).then(done).catch(done);
      } else {
        done();
      }
    });
    actions.appendChild(copy);

    if (msg.error && msg.question) {
      var retry = el("button", "nx-mini", "Try again");
      retry.type = "button";
      retry.prepend(iconRetry());
      retry.addEventListener("click", function () {
        void ask(ui, msg.question);
      });
      actions.appendChild(retry);
    }
    row.appendChild(actions);
  }

  function addMessage(ui, msg, opts) {
    opts = opts || {};
    var row = el("article", "nx-msg nx-msg--" + msg.role);
    row.dataset.id = msg.id;

    if (msg.role !== "user") {
      var avatar = el("div", "nx-avatar");
      avatar.appendChild(nexusMark("nx-icon--sm"));
      avatar.setAttribute("aria-hidden", "true");
      row.appendChild(avatar);
    }

    var col = el("div", "nx-msg__col");
    var bubble = el("div", "nx-bubble", msg.text);
    col.appendChild(bubble);
    col.appendChild(el("time", "nx-time", formatTime(msg.ts)));
    if (msg.role !== "system") renderActions(col, msg, ui);
    row.appendChild(col);

    if (msg.role === "user") {
      var you = el("div", "nx-avatar nx-avatar--user", "You");
      you.setAttribute("aria-hidden", "true");
      row.appendChild(you);
    }

    ui.thread.appendChild(row);
    if (!opts.silent) scrollThread(ui, true);
    return row;
  }

  function showFollowups(ui, question) {
    var intent = guessIntent(question);
    var next = FOLLOWUPS[intent] || FOLLOWUPS.default;
    ui.suggestions.replaceChildren();
    next.forEach(function (text) {
      var btn = el("button", "nx-chip", text);
      btn.type = "button";
      btn.dataset.q = text;
      ui.suggestions.appendChild(btn);
    });
    ui.suggestions.hidden = !ui.state.visitor.done;
  }

  function resetStarters(ui) {
    ui.suggestions.replaceChildren();
    STARTERS.forEach(function (item) {
      var btn = el("button", "nx-chip", item.label);
      btn.type = "button";
      btn.dataset.q = item.q;
      btn.dataset.intent = item.intent;
      ui.suggestions.appendChild(btn);
    });
    ui.suggestions.hidden = !ui.state.visitor.done;
  }

  function hydrate(ui, state) {
    if (!state.visitor.done) {
      setGatePhase(ui, state.visitor.phase === "contact" ? "contact" : "name");
      return;
    }
    setGatePhase(ui, "done");
    ui.thread.replaceChildren();
    if (!state.messages.length) {
      showEmpty(ui, true);
      resetStarters(ui);
      return;
    }
    showEmpty(ui, false);
    state.messages.forEach(function (msg) {
      addMessage(ui, msg, { silent: true });
    });
    var lastUser = null;
    for (var i = state.messages.length - 1; i >= 0; i--) {
      if (state.messages[i].role === "user") {
        lastUser = state.messages[i];
        break;
      }
    }
    if (lastUser) showFollowups(ui, lastUser.text);
    else resetStarters(ui);
    ui.handoff.hidden = state.misses < HANDOFF_AFTER;
    scrollThread(ui, true);
  }

  function getFocusable(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll(
        'button:not([disabled]):not([hidden]), textarea:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
      function (node) {
        return !node.closest("[hidden]");
      },
    );
  }

  function setOpen(ui, open) {
    ui.panel.hidden = !open;
    ui.backdrop.hidden = !open;
    ui.fab.setAttribute("aria-expanded", open ? "true" : "false");
    ui.fab.classList.remove("nx-fab--pulse");
    document.body.classList.toggle("nx-open", open);
    if (open) {
      ui.unread = 0;
      ui.badge.hidden = true;
      ui.fab.removeAttribute("data-unread");
      ui.lastFocus = document.activeElement;
      if (!ui.state.visitor.done) {
        ui.gateInput.focus();
      } else {
        ui.input.focus();
      }
      scrollThread(ui, true);
    } else {
      ui.confirm.hidden = true;
      if (ui.lastFocus && typeof ui.lastFocus.focus === "function") {
        ui.lastFocus.focus();
      } else {
        ui.fab.focus();
      }
    }
  }

  function markUnread(ui) {
    if (!ui.panel.hidden) return;
    ui.unread = (ui.unread || 0) + 1;
    ui.badge.textContent = String(ui.unread);
    ui.badge.hidden = false;
    ui.fab.setAttribute("data-unread", String(ui.unread));
  }

  async function checkHealth(ui) {
    try {
      var res = await fetch(API_BASE + "/api/health");
      if (!res.ok) throw new Error("offline");
      setStatus(ui, "on", "Online");
    } catch (e) {
      setStatus(ui, "off", "Offline");
    }
  }

  function addTyping(ui, intent) {
    var row = el("article", "nx-msg nx-msg--assistant nx-typing");
    row.setAttribute("role", "status");
    var avatar = el("div", "nx-avatar");
    avatar.appendChild(nexusMark("nx-icon--sm"));
    row.appendChild(avatar);
    var col = el("div", "nx-msg__col");
    var dots = el("div", "nx-dots");
    dots.appendChild(el("span"));
    dots.appendChild(el("span"));
    dots.appendChild(el("span"));
    col.appendChild(dots);
    col.appendChild(el("p", "nx-time", INTENT_ACK[intent] || "Nexus is thinking"));
    row.appendChild(col);
    ui.thread.appendChild(row);
    scrollThread(ui, true);
    return row;
  }

  function pushMessage(ui, state, msg) {
    state.messages.push(msg);
    saveState(state);
    showEmpty(ui, false);
    addMessage(ui, msg);
  }

  async function ask(ui, question) {
    if (!ui.state.visitor.done) {
      setGatePhase(ui, ui.state.visitor.phase || "name");
      return;
    }

    var q = String(question || "").trim();
    if (!q || ui.form.dataset.busy === "1") return;
    if (q.length > MAX_CHARS) q = q.slice(0, MAX_CHARS);

    var intent = guessIntent(q);
    var state = ui.state;
    if (ui.abort) ui.abort.abort();
    ui.abort = new AbortController();

    setBusy(ui, true);
    ui.confirm.hidden = true;
    ui.suggestions.hidden = true;

    pushMessage(ui, state, {
      id: uid(),
      role: "user",
      text: q,
      ts: Date.now(),
      intent: intent,
    });
    ui.input.value = "";
    resizeInput(ui.input);
    updateComposer(ui);

    var typing = addTyping(ui, intent);
    setStatus(ui, "busy", "Thinking");

    try {
      var res = await fetch(API_BASE + "/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          intent: intent,
          visitorId: state.visitor.id || undefined,
          visitorName: state.visitor.name || undefined,
        }),
        signal: ui.abort.signal,
      });
      var data = await res.json().catch(function () {
        return {};
      });
      typing.remove();
      if (!res.ok) {
        throw new Error(data.error || res.statusText || "Ask failed");
      }
      var answer = data.answer || "I don’t have that in the resume docs yet.";
      if (intent === "fallback" && state.misses === 0) {
        // soft guide without inventing facts
      }
      pushMessage(ui, state, {
        id: uid(),
        role: "assistant",
        text: answer,
        ts: Date.now(),
        intent: intent,
      });
      state.misses = 0;
      saveState(state);
      ui.handoff.hidden = true;
      showFollowups(ui, q);
      setStatus(ui, "on", "Online");
      markUnread(ui);
    } catch (err) {
      typing.remove();
      if (err && err.name === "AbortError") {
        setStatus(ui, "on", "Online");
        setBusy(ui, false);
        return;
      }
      state.misses += 1;
      var raw = err && err.message ? String(err.message) : "";
      var fallback =
        state.misses >= HANDOFF_AFTER
          ? "I still couldn’t reach the resume docs. Email or LinkedIn will get a human reply."
          : /failed to fetch|networkerror|load failed|offline/i.test(raw)
            ? "Nexus is offline right now — the resume API isn’t reachable."
            : raw || "Could not reach Nexus. Is the resume API running?";
      if (state.misses === 1) {
        fallback += " Try current role, Paytm, SwiftCab, skills, or contact.";
      }
      pushMessage(ui, state, {
        id: uid(),
        role: "system",
        text: fallback,
        ts: Date.now(),
        error: true,
        question: q,
      });
      saveState(state);
      ui.handoff.hidden = state.misses < HANDOFF_AFTER;
      if (state.misses === 1) resetStarters(ui);
      setStatus(ui, "off", "Offline");
      markUnread(ui);
    } finally {
      setBusy(ui, false);
    }
  }

  function clearChat(ui) {
    if (ui.abort) ui.abort.abort();
    ui.state = {
      messages: [],
      misses: 0,
      visitor: defaultVisitor(),
    };
    saveState(ui.state);
    ui.confirm.hidden = true;
    ui.handoff.hidden = true;
    hydrate(ui, ui.state);
    setStatus(ui, "on", ui.status.classList.contains("nx-live--off") ? "Offline" : "Online");
  }

  function bind(ui) {
    ui.fab.addEventListener("click", function () {
      setOpen(ui, true);
    });
    ui.close.addEventListener("click", function () {
      setOpen(ui, false);
    });
    ui.backdrop.addEventListener("click", function () {
      setOpen(ui, false);
    });
    ui.reset.addEventListener("click", function () {
      if (!ui.state.visitor.done && !ui.state.messages.length) return;
      ui.confirm.hidden = !ui.confirm.hidden;
    });
    ui.confirmNo.addEventListener("click", function () {
      ui.confirm.hidden = true;
    });
    ui.confirmYes.addEventListener("click", function () {
      clearChat(ui);
    });
    ui.jump.addEventListener("click", function () {
      scrollThread(ui, true);
    });
    ui.thread.addEventListener("scroll", function () {
      ui.jump.hidden = nearBottom(ui.thread);
    });

    ui.gateContinue.addEventListener("click", function () {
      advanceGate(ui, false);
    });
    ui.gateSkip.addEventListener("click", function () {
      advanceGate(ui, true);
    });
    ui.gateBack.addEventListener("click", function () {
      setGatePhase(ui, "name");
    });
    ui.gateInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        advanceGate(ui, false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (ui.panel.hidden) return;
      if (e.key === "Escape") {
        if (!ui.confirm.hidden) {
          ui.confirm.hidden = true;
          return;
        }
        setOpen(ui, false);
        return;
      }
      if (e.key !== "Tab") return;
      var nodes = getFocusable(ui.panel);
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    ui.suggestions.addEventListener("click", function (e) {
      var t = e.target.closest("[data-q]");
      if (t) void ask(ui, t.dataset.q);
    });
    ui.form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (ui.form.dataset.busy === "1") {
        if (ui.abort) ui.abort.abort();
        return;
      }
      void ask(ui, ui.input.value);
    });
    ui.input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void ask(ui, ui.input.value);
      }
    });
    ui.input.addEventListener("input", function () {
      resizeInput(ui.input);
      updateComposer(ui);
    });

    document.querySelectorAll("[data-open-resume-chat]").forEach(function (node) {
      node.addEventListener("click", function (e) {
        e.preventDefault();
        setOpen(ui, true);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var ui = buildUI();
    ui.state = loadState();
    ui.unread = 0;
    hydrate(ui, ui.state);
    updateComposer(ui);
    bind(ui);
    void checkHealth(ui);
  });
})();
