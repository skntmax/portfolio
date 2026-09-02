/**
 * Lightweight Three.js hero (ui-ux-pro-max / threejs).
 * Deferred load, low particle counts, MeshBasicMaterial (no lights),
 * setAnimationLoop + pause offscreen/hidden, ResizeObserver, dispose-ready.
 */
(function () {
  "use strict";

  var host = document.getElementById("hero-three-root");
  if (!host) return;

  var motionMq =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  var noMotion = motionMq ? motionMq.matches : false;
  var saveData =
    (navigator.connection && navigator.connection.saveData) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2);

  if (noMotion || saveData) {
    host.classList.add("hero-three--static");
    return;
  }

  var mobile = window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  var INSTANCE_COUNT = mobile ? 28 : 48;
  var STAR_COUNT = mobile ? 120 : 220;
  var mouse = { x: 0, y: 0 };
  var look = { x: 0, y: 0 };
  var visible = true;
  var tabHidden = false;
  var sceneRoot = null;
  var animateFn = null;
  var rendererRef = null;
  var disposables = [];

  function trackDispose(obj) {
    if (obj) disposables.push(obj);
  }

  function loadThree(cb) {
    if (window.THREE) return cb(window.THREE);
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";
    s.async = true;
    s.onload = function () {
      cb(window.THREE);
    };
    s.onerror = function () {
      host.classList.add("hero-three--static");
    };
    document.head.appendChild(s);
  }

  function syncLoop() {
    if (!rendererRef || !animateFn) return;
    if (noMotion || !visible || tabHidden) {
      rendererRef.setAnimationLoop(null);
    } else {
      rendererRef.setAnimationLoop(animateFn);
    }
  }

  function scheduleBoot() {
    var start = function () {
      loadThree(boot);
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(start, { timeout: 1800 });
    } else {
      setTimeout(start, 400);
    }
  }

  if (motionMq) {
    var onMotionChange = function (e) {
      noMotion = e.matches;
      if (noMotion) {
        host.classList.add("hero-three--static");
        if (rendererRef) rendererRef.setAnimationLoop(null);
      } else {
        host.classList.remove("hero-three--static");
        if (!rendererRef) scheduleBoot();
        else syncLoop();
      }
    };
    if (motionMq.addEventListener) motionMq.addEventListener("change", onMotionChange);
    else if (motionMq.addListener) motionMq.addListener(onMotionChange);
  }

  function boot(THREE) {
    if (!THREE || noMotion) return;

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061018, 0.055);

    var camera = new THREE.PerspectiveCamera(48, 1, 0.1, 80);
    camera.position.set(0, 0.45, 7.6);

    var renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "hero-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    rendererRef = renderer;

    var clock = new THREE.Clock();
    sceneRoot = new THREE.Group();
    sceneRoot.position.x = mobile ? 0.1 : 1.4;
    scene.add(sceneRoot);

    var starPos = new Float32Array(STAR_COUNT * 3);
    var si;
    for (si = 0; si < STAR_COUNT; si++) {
      starPos[si * 3] = (Math.random() - 0.5) * 36;
      starPos[si * 3 + 1] = (Math.random() - 0.5) * 20;
      starPos[si * 3 + 2] = (Math.random() - 0.5) * 24 - 4;
    }
    var starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    var starMat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: mobile ? 0.04 : 0.03,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true
    });
    var stars = new THREE.Points(starGeo, starMat);
    sceneRoot.add(stars);
    trackDispose(starGeo);
    trackDispose(starMat);

    var coreGeo = new THREE.IcosahedronGeometry(1.0, 0);
    var coreMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    var core = new THREE.Mesh(coreGeo, coreMat);
    sceneRoot.add(core);
    trackDispose(coreGeo);
    trackDispose(coreMat);

    var ringGeo = new THREE.TorusGeometry(1.9, 0.014, 6, 48);
    var ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.4
    });
    var ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    sceneRoot.add(ring);
    trackDispose(ringGeo);
    trackDispose(ringMat);

    var shardGeo = new THREE.OctahedronGeometry(0.08, 0);
    var shardMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.75
    });
    var shards = new THREE.InstancedMesh(shardGeo, shardMat, INSTANCE_COUNT);
    sceneRoot.add(shards);
    trackDispose(shardGeo);
    trackDispose(shardMat);

    var dummy = new THREE.Object3D();
    var shardMeta = [];
    var i;
    for (i = 0; i < INSTANCE_COUNT; i++) {
      shardMeta.push({
        radius: 2.4 + Math.random() * 3.2,
        speed: 0.12 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.1,
        yAmp: 0.35 + Math.random() * 1.3
      });
    }

    function resize() {
      var w = host.clientWidth || 1;
      var h = host.clientHeight || 1;
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25));
      renderer.setSize(w, h, false);
      if (sceneRoot) sceneRoot.position.x = w < 960 ? 0.15 : 1.4;
    }

    animateFn = function () {
      if (noMotion) return;
      var dt = Math.min(clock.getDelta(), 0.05);
      var t = clock.elapsedTime;

      core.rotation.y += dt * 0.32;
      core.rotation.x += dt * 0.1;
      ring.rotation.z += dt * 0.22;
      stars.rotation.y += dt * 0.015;

      for (i = 0; i < INSTANCE_COUNT; i++) {
        var m = shardMeta[i];
        var ang = t * m.speed + m.phase;
        dummy.position.set(
          Math.cos(ang) * m.radius,
          Math.sin(ang * 0.7 + m.tilt) * m.yAmp,
          Math.sin(ang) * m.radius * 0.85
        );
        dummy.rotation.set(ang, ang * 0.8, 0);
        dummy.scale.setScalar(0.85);
        dummy.updateMatrix();
        shards.setMatrixAt(i, dummy.matrix);
      }
      shards.instanceMatrix.needsUpdate = true;

      look.x += (mouse.x * 0.7 - look.x) * 0.04;
      look.y += (mouse.y * 0.4 - look.y) * 0.04;
      camera.position.x = look.x * 0.85;
      camera.position.y = 0.45 + look.y * 0.4;
      camera.lookAt(sceneRoot.position.x * 0.3, 0, 0);

      renderer.render(scene, camera);
    };

    var hero = document.getElementById("hero");
    if ("IntersectionObserver" in window && hero) {
      new IntersectionObserver(
        function (entries) {
          visible = entries[0].isIntersecting;
          syncLoop();
        },
        { threshold: 0.06 }
      ).observe(hero);
    }

    document.addEventListener("visibilitychange", function () {
      tabHidden = document.hidden;
      syncLoop();
    });

    function onPointer(clientX, clientY) {
      var w = window.innerWidth || 1;
      var h = window.innerHeight || 1;
      mouse.x = (clientX / w) * 2 - 1;
      mouse.y = -((clientY / h) * 2 - 1);
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        if (!visible) return;
        onPointer(e.clientX, e.clientY);
      },
      { passive: true }
    );

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(function () {
        resize();
      }).observe(host);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    resize();
    syncLoop();
  }

  scheduleBoot();
})();
