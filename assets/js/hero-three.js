/**
 * Blender-sculpted hero stage (ui-ux-pro-max · OLED cinematic).
 * Loads assets/models/hero-core.glb + lightweight starfield.
 * ACES tone mapping · studio lights · pause offscreen · ResizeObserver.
 */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

(function () {
  "use strict";

  var host = document.getElementById("hero-three-root");
  if (!host) return;

  var motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var noMotion = motionMq.matches;
  var saveData =
    (navigator.connection && navigator.connection.saveData) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2);

  if (noMotion || saveData) {
    host.classList.add("hero-three--static");
    return;
  }

  var mobile = window.matchMedia("(max-width: 768px)").matches;
  var STAR_COUNT = mobile ? 90 : 160;
  var mouse = { x: 0, y: 0 };
  var look = { x: 0, y: 0 };
  var visible = true;
  var tabHidden = false;
  var renderer;
  var camera;
  var scene;
  var sceneRoot;
  var heroModel;
  var stars;
  var clock;
  var disposables = [];

  function track(obj) {
    if (obj) disposables.push(obj);
  }

  function syncLoop() {
    if (!renderer) return;
    if (noMotion || !visible || tabHidden) renderer.setAnimationLoop(null);
    else renderer.setAnimationLoop(animate);
  }

  function resize() {
    var w = host.clientWidth || 1;
    var h = host.clientHeight || 1;
    if (w < 2 || h < 2) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35));
    renderer.setSize(w, h, false);
    if (sceneRoot) sceneRoot.position.x = w < 960 ? 0.1 : 1.35;
  }

  function animate() {
    if (noMotion) return;
    var dt = Math.min(clock.getDelta(), 0.05);
    var t = clock.elapsedTime;

    if (heroModel) {
      heroModel.rotation.y += dt * 0.22;
      heroModel.rotation.x = Math.sin(t * 0.18) * 0.08;
      heroModel.traverse(function (child) {
        var n = child.name || "";
        if (n.indexOf("Orbit") === 0) {
          child.rotation.z += dt * (n.indexOf("1") >= 0 ? -0.14 : 0.2);
        } else if (n.indexOf("Wire") === 0) {
          child.rotation.y -= dt * 0.08;
        } else if (n.indexOf("Shard") === 0) {
          child.rotation.x += dt * 0.35;
          child.rotation.y += dt * 0.22;
        } else if (n.indexOf("CoreRing") === 0) {
          child.rotation.z += dt * 0.05;
        }
      });
    }

    if (stars) stars.rotation.y += dt * 0.012;

    look.x += (mouse.x * 0.65 - look.x) * 0.04;
    look.y += (mouse.y * 0.35 - look.y) * 0.04;
    camera.position.x = look.x * 0.75;
    camera.position.y = 0.5 + look.y * 0.35;
    camera.lookAt(sceneRoot.position.x * 0.32, 0, 0);

    renderer.render(scene, camera);
  }

  function addStars() {
    var pos = new Float32Array(STAR_COUNT * 3);
    for (var i = 0; i < STAR_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: mobile ? 0.038 : 0.028,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      sizeAttenuation: true
    });
    stars = new THREE.Points(geo, mat);
    sceneRoot.add(stars);
    track(geo);
    track(mat);
  }

  function addFallbackSculpture() {
    var group = new THREE.Group();
    group.name = "FallbackHero";

    var knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.95, 0.28, 120, 16),
      new THREE.MeshPhysicalMaterial({
        color: 0x0f766e,
        metalness: 0.88,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        emissive: 0x115e59,
        emissiveIntensity: 0.28
      })
    );
    group.add(knot);
    track(knot.geometry);
    track(knot.material);

    var shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({
        color: 0x5eead4,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      })
    );
    group.add(shell);
    track(shell.geometry);
    track(shell.material);

    var ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.016, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2.1;
    ring.name = "Orbit0";
    group.add(ring);
    track(ring.geometry);
    track(ring.material);

    sceneRoot.add(group);
    heroModel = group;
  }

  function polishGltf(root) {
    root.traverse(function (child) {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      var mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(function (m) {
        if (!m) return;
        m.envMapIntensity = 1.1;
        if (m.emissive) m.emissiveIntensity = Math.min((m.emissiveIntensity || 0.2) * 1.15, 1.2);
        m.needsUpdate = true;
      });
    });
    /* Normalize size */
    var box = new THREE.Box3().setFromObject(root);
    var size = new THREE.Vector3();
    box.getSize(size);
    var maxDim = Math.max(size.x, size.y, size.z) || 1;
    var scale = 2.35 / maxDim;
    root.scale.setScalar(scale);
    box.setFromObject(root);
    var center = new THREE.Vector3();
    box.getCenter(center);
    root.position.sub(center);
  }

  function boot() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.048);

    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.5, 7.0);

    renderer = new THREE.WebGLRenderer({
      antialias: !mobile,
      alpha: true,
      powerPreference: "low-power"
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.className = "hero-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    sceneRoot = new THREE.Group();
    sceneRoot.position.x = mobile ? 0.1 : 1.35;
    scene.add(sceneRoot);

    scene.add(new THREE.AmbientLight(0x8eb4c8, 0.32));
    var key = new THREE.DirectionalLight(0xe8fffb, 1.15);
    key.position.set(3.5, 4.5, 2.5);
    scene.add(key);
    var fill = new THREE.PointLight(0x38bdf8, 2.0, 18);
    fill.position.set(-3.2, 1.2, 3.5);
    scene.add(fill);
    var rim = new THREE.PointLight(0x14b8a6, 1.45, 14);
    rim.position.set(2.2, -1.4, -2.2);
    scene.add(rim);

    addStars();

    var loader = new GLTFLoader();
    loader.load(
      "assets/models/hero-core.glb",
      function (gltf) {
        heroModel = gltf.scene;
        polishGltf(heroModel);
        sceneRoot.add(heroModel);
        resize();
        syncLoop();
      },
      undefined,
      function () {
        addFallbackSculpture();
        resize();
        syncLoop();
      }
    );

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

    window.addEventListener(
      "pointermove",
      function (e) {
        if (!visible) return;
        var w = window.innerWidth || 1;
        var h = window.innerHeight || 1;
        mouse.x = (e.clientX / w) * 2 - 1;
        mouse.y = -((e.clientY / h) * 2 - 1);
      },
      { passive: true }
    );

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(host);
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    motionMq.addEventListener("change", function (e) {
      noMotion = e.matches;
      if (noMotion) {
        host.classList.add("hero-three--static");
        if (renderer) renderer.setAnimationLoop(null);
      } else {
        host.classList.remove("hero-three--static");
        syncLoop();
      }
    });

    resize();
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(boot, { timeout: 1600 });
  } else {
    setTimeout(boot, 280);
  }
})();
