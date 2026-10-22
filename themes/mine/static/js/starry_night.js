// Background: a particle yin-yang of Graphics (orange) and Vision (purple) over faint stars,
// echoing the ∫⟨Graphics, Vision⟩ headline. Each half is outlined in its own colour.
document.addEventListener('DOMContentLoaded', () => {
  // The background is decoration: without WebGL, skip it quietly instead of showing an error box
  if (!THREE.WEBGL.isWebGLAvailable()) {
    return;
  }

  const COLOURS = {
    graphics: [1.0, 0.5, 0.0], // CV orange, #ff8000
    vision: [0.8, 0.33, 0.8], // lightened CV purple, #cc55cc
    white: [0.91, 0.93, 0.95],
    aqua: [0.44, 0.88, 0.84], // site accent, #70e0d7
  };
  const R = 2.6; // yin-yang radius in world units
  const WALL = 0.32; // platform thickness
  const TILT = -1.3; // radians the platform leans back (about 75 degrees), so it lies like a floor
  const TILT_DOCK = -0.45; // lean once docked in the margin (about 25 degrees), so it is never flat-on
  const PLANE_Z = -2.5; // depth of the platform's centre
  const GATHER = 4.5; // seconds for the particles to gather into the shape
  // Fewer particles on small screens
  const density = window.innerWidth < 720 ? 0.6 : 1;

  const rand = (a, b) => a + Math.random() * (b - a);
  const gauss = () => {
    let u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Which half a point of the yin-yang belongs to: true = Graphics, false = Vision
  function isGraphics(x, y) {
    const top = Math.hypot(x, y - R / 2), bottom = Math.hypot(x, y + R / 2);
    if (top < R / 8) return true; // Graphics dot inside the Vision head
    if (bottom < R / 8) return false; // Vision dot inside the Graphics head
    return bottom < R / 2 || (x < 0 && top >= R / 2);
  }

  // Gaussian point sprites with a gentle per-point twinkle
  function pointsMaterial({ additive, twinkle, opacity, depthFade = 1 }) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTwinkle: { value: twinkle },
        uOpacity: { value: opacity },
        uPR: { value: renderer.getPixelRatio() },
        uDepthFade: { value: depthFade },
      },
      vertexShader: `
        attribute float size;
        attribute float phase;
        uniform float uTime, uTwinkle, uPR, uDepthFade;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = size * uPR / -mv.z;
          float speed = 0.6 + fract(phase * 7.13) * 1.6;
          vAlpha = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * speed + phase * 6.2831));
          // Depth cue: points further from the camera fade out a little
          vAlpha *= mix(uDepthFade, 1.0, smoothstep(10.0, 3.5, -mv.z));
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float a = exp(-dot(c, c) * 20.0) * vAlpha * uOpacity;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
  }

  function makePoints(positions, colours, sizes, phases, material) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colours, 3));
    g.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    g.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
    return new THREE.Points(g, material);
  }

  // Faint backdrop stars: mostly soft white, a few in the site's colours
  function backdropStars(count) {
    const p = [], c = [], s = [], ph = [];
    for (let i = 0; i < count; i++) {
      p.push(rand(-60, 60), rand(-60, 60), rand(-60, -6));
      const r = Math.random();
      const base = r < 0.72 ? COLOURS.white : r < 0.82 ? COLOURS.aqua : r < 0.91 ? COLOURS.graphics : COLOURS.vision;
      const k = r < 0.72 ? rand(0.5, 0.95) : rand(0.65, 1.0);
      c.push(base[0] * k, base[1] * k, base[2] * k);
      s.push(rand(60, 160));
      ph.push(Math.random());
    }
    return makePoints(p, c, s, ph, pointsMaterial({ additive: false, twinkle: 0.5, opacity: 0.5 }));
  }

  // The yin-yang's target positions, colours and sizes
  function yinYangPoints() {
    const target = [], cols = [], sizes = [], phases = [];
    const add = (x, y, k, size, z = gauss() * 0.03) => {
      const c = isGraphics(x, y) ? COLOURS.graphics : COLOURS.vision;
      target.push(x, y, z);
      cols.push(c[0] * k, c[1] * k, c[2] * k);
      sizes.push(size);
      phases.push(Math.random());
    };
    // Filled halves
    for (let i = 0; i < 7500 * density; i++) {
      const r = R * Math.sqrt(Math.random()) * 0.985, a = Math.random() * 2 * Math.PI;
      add(Math.cos(a) * r, Math.sin(a) * r, rand(0.7, 1.0), rand(8, 13));
    }
    // Outlines: brighter, denser points just inside each edge, so every half and dot
    // is outlined in its own colour. side: +1 outward only, -1 inward only, 0 either side.
    const edge = (cx, cy, rad, a0, a1, n, side) => {
      for (let i = 0; i < n * density; i++) {
        const a = rand(a0, a1);
        const off = 0.035 + Math.abs(gauss()) * 0.02;
        const dir = side || (Math.random() < 0.5 ? -1 : 1);
        const rr = rad + dir * off;
        add(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, rand(0.85, 1.0), rand(11, 16));
      }
    };
    edge(0, R / 2, R / 2, Math.PI / 2, 1.5 * Math.PI, 900, 0); // S-curve, upper half: both sides
    edge(0, -R / 2, R / 2, -Math.PI / 2, Math.PI / 2, 900, 0); // S-curve, lower half: both sides
    edge(0, R / 2, R / 8, 0, 2 * Math.PI, 320, -1); // rim of the Graphics dot
    edge(0, -R / 2, R / 8, 0, 2 * Math.PI, 320, -1); // rim of the Vision dot
    edge(0, 0, R, 0, 2 * Math.PI, 1500, -1); // outer rim
    // Side wall below the rim, fading downward, so the disc reads as a solid platform
    for (let i = 0; i < 1800 * density; i++) {
      const a = Math.random() * 2 * Math.PI, d = Math.pow(Math.random(), 1.6);
      const rr = R - 0.03 - Math.random() * 0.02;
      add(Math.cos(a) * rr, Math.sin(a) * rr, 0.85 * (1 - d) + 0.12, rand(9, 13), -d * WALL);
    }
    return { target, cols, sizes, phases };
  }

  // ---------- Scene ----------
  const canvas = document.getElementById('gl');
  if (!canvas) return;
  // Kept light on purpose: no antialiasing (the soft sprites don't need it), the integrated GPU
  // where a laptop has two, and a capped resolution, since a blurry glow loses nothing at 1.25x
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Opaque canvas in the page's own background colour, so the additive glow blends correctly
  renderer.setClearColor(new THREE.Color(getComputedStyle(document.body).backgroundColor), 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  const stars = backdropStars(Math.round(1400 * density));
  scene.add(stars);

  const yy = yinYangPoints();
  const N = yy.sizes.length;
  const targetPos = Float32Array.from(yy.target);
  const startPos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) startPos.set([rand(-9, 9), rand(-6, 6), rand(-6, 2)], i * 3);

  // Gather only on the first page of a visit; later pages start with the shape formed
  let gathered = false;
  try {
    gathered = sessionStorage.getItem('yinyang-gathered') === '1';
    sessionStorage.setItem('yinyang-gathered', '1');
  } catch (e) { /* storage unavailable: always gather */ }

  const yyMaterial = pointsMaterial({ additive: true, twinkle: 0.3, opacity: 0.7, depthFade: 0.35 });
  const yinYang = makePoints(Array.from(gathered ? targetPos : startPos), yy.cols, yy.sizes, yy.phases, yyMaterial);
  const group = new THREE.Group();
  group.add(yinYang);
  // Turn toward the camera first, then lean back, so an off-centre platform still looks level
  group.rotation.order = 'YXZ';
  group.rotation.x = TILT;

  // ---------- Placement ----------
  // Top of the page: a tilted platform in the empty space under the profile photo, scrolling with it.
  // Scrolling down: it first slides into the left margin and shrinks to fit, then leans up and
  // stays there. It never sits over content or outside the window; where there is no margin to
  // use it fades out instead, and on stacked phone layouts it is hidden.
  // Drawn size relative to the nominal width: glow plus perspective (the near half of a leaning
  // disc is closer to the camera). Measured at about 1.3-1.37, so sizes are planned with 1.4
  const GLOW = 1.4;
  const EDGE = 24; // minimum clearance from content and window edges, in px
  const mixN = (a, b, t) => a + (b - a) * t;
  const smoothstep = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

  let layout = null;
  function measure() {
    const section = document.querySelector('.page > section');
    const navbar = document.getElementById('navbar-main');
    const photo = document.querySelector('.hero-photo .avatar');
    const news = document.getElementById('news');
    const contentLeft = section ? section.getBoundingClientRect().left : 0;
    const navBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
    const vh = window.innerHeight;
    // Docking spot in the left margin, if the margin is wide enough
    let dock = null;
    const dockW = Math.min((contentLeft - 2 * EDGE) / GLOW, 170);
    if (dockW >= 90) {
      const h = dockW * Math.cos(TILT_DOCK) * GLOW;
      dock = { x: contentLeft / 2, y: Math.max(navBottom + EDGE + h / 2, vh * 0.32), w: dockW };
    }
    // Starting spot under the photo, between the photo and the News section (document coordinates)
    let start = null;
    if (photo && news) {
      const pr = photo.getBoundingClientRect(), nr = news.getBoundingClientRect();
      const stacked = pr.left + pr.width / 2 > window.innerWidth * 0.4; // phone layout: photo centred above the text
      if (!stacked) {
        const w = pr.width * 0.8;
        start = { x: pr.left + pr.width / 2, y: (pr.bottom + nr.top) / 2 + window.scrollY, w, h: w * Math.cos(TILT) * GLOW + 20 };
      }
    }
    layout = { dock, start, navBottom };
  }

  // Screen pixel -> world position on the platform's depth plane, plus world units per pixel
  function toWorld(px, py) {
    const halfH = (camera.position.z - PLANE_Z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW = halfH * camera.aspect;
    return [(px / window.innerWidth * 2 - 1) * halfW, (1 - py / window.innerHeight * 2) * halfH, 2 * halfW / window.innerWidth];
  }

  // Target pose for the current scroll position: screen x, y, width, tilt, opacity,
  // and q (0 = lying flat .. 1 = docked and leaning up)
  function pose() {
    const { dock, start, navBottom } = layout;
    const scroll = window.scrollY;
    if (!start) return dock ? { x: dock.x, y: dock.y, w: dock.w, tilt: TILT_DOCK, opacity: 0.7, q: 1 } : null;
    const y0 = start.y - scroll; // where it sits if it simply scrolls with the photo
    if (!dock) {
      // No margin: scroll with the page and fade out before reaching the top bar
      const gone = start.y - navBottom - start.h / 2 - EDGE;
      return { x: start.x, y: y0, w: start.w, tilt: TILT, opacity: 0.7 * (1 - smoothstep(gone - 160, gone, scroll)), q: 0 };
    }
    // Scroll distance at which the scrolling spot reaches the docking height
    const reach = Math.max(1, start.y - dock.y);
    const p = smoothstep(0, reach, scroll);
    const slide = smoothstep(0, 0.55, p); // into the margin and down to size, still lying flat
    const stand = smoothstep(0.55, 1, p); // then lean up, only once fully inside the margin
    return {
      x: mixN(start.x, dock.x, slide),
      y: Math.max(y0, dock.y),
      w: mixN(start.w, dock.w, slide),
      tilt: mixN(TILT, TILT_DOCK, stand),
      opacity: 0.7,
      q: stand,
    };
  }

  // The drawn pose eases toward the target, so scrolling glides instead of jumping
  let current = null;
  function place(dt) {
    const target = pose();
    group.visible = !!target && target.opacity > 0.01;
    if (!target) return;
    if (!current || !isFinite(dt)) current = { ...target };
    else {
      const k = 1 - Math.exp(-dt * 8);
      for (const key in target) current[key] += (target[key] - current[key]) * k;
    }
    const [x, y, perPx] = toWorld(current.x, current.y);
    group.position.set(x, y, PLANE_Z);
    group.scale.setScalar(current.w * perPx / (2 * R));
    // Turn toward the camera in proportion to the lean, cancelling the perspective shear of an
    // off-centre position, without making an upright disc look oval
    group.rotation.y = Math.atan2(camera.position.x - x, camera.position.z - PLANE_Z) * (current.tilt / TILT);
    yyMaterial.uniforms.uOpacity.value = current.opacity;
  }
  measure();
  window.addEventListener('load', measure);
  scene.add(group);
  const positions = yinYang.geometry.getAttribute('position');

  // ---------- Motion ----------
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    onInput();
  }, { passive: true });

  let elapsed = gathered ? GATHER : 0;
  let settled = gathered;
  let spin = 0;
  let last = performance.now();
  let lastRender = 0;
  let lastInput = performance.now();
  let frameId = null;

  // Scroll wobble: a damped spring kicked by scroll speed, so the disc rocks and settles
  const wobble = { a: 0, v: 0 };
  let lastScroll = window.scrollY;
  function stepWobble(dt) {
    const dScroll = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    if (!isFinite(dt) || dt === 0) return;
    wobble.v += Math.max(-60, Math.min(60, dScroll)) * 0.012;
    wobble.v += (-30 * wobble.a - 4.5 * wobble.v) * dt;
    wobble.a = Math.max(-0.3, Math.min(0.3, wobble.a + wobble.v * dt));
  }

  // dt = Infinity snaps straight to the target pose (used for still frames)
  function update(t, dt) {
    // Move particles until the shape has formed (also when the clock jumps straight past GATHER)
    if (!settled) {
      const m = ease(Math.min(1, t / GATHER));
      for (let i = 0; i < N * 3; i++) positions.array[i] = startPos[i] + (targetPos[i] - startPos[i]) * m;
      positions.needsUpdate = true;
      settled = m >= 1;
    }
    yyMaterial.uniforms.uTime.value = t;
    stars.material.uniforms.uTime.value = t;
    place(dt);
    // Hidden (phones, narrow windows): skip the unseen gathering and jump to the formed shape
    if (!settled && !group.visible) {
      positions.array.set(targetPos);
      positions.needsUpdate = true;
      settled = true;
    }
    stepWobble(dt);
    if (current) {
      // Turntable spin while flat, quicker once it leans up in the margin
      if (isFinite(dt)) spin += dt * (0.08 + 0.3 * current.q);
      yinYang.rotation.z = -spin;
      // Lean plus scroll wobble, and a gentle idle sway once docked
      const sway = current.q * 0.05;
      group.rotation.x = current.tilt + wobble.a + Math.sin(t * 0.6) * sway;
      group.rotation.z = wobble.a * 0.45 + Math.sin(t * 0.45) * sway;
    }
    // Gentle parallax toward the pointer
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  }

  // Frames per second: smooth while gathering or while the visitor scrolls or moves the pointer,
  // slower when idle; the motion is slow enough that this is hard to see but easy on the battery
  function targetFps(now) {
    const idle = now - lastInput;
    if (!settled || idle < 2000) return 30;
    return idle < 60000 ? 20 : 10;
  }

  function animate(now) {
    frameId = requestAnimationFrame(animate);
    if (now - lastRender < 1000 / targetFps(now) - 2) return;
    lastRender = now;
    const dt = Math.max(0, Math.min(0.12, (now - last) / 1000));
    elapsed += dt;
    last = now;
    update(elapsed, dt);
    renderer.render(scene, camera);
    // Nothing worth animating while the yin-yang is hidden: hold this frame until input arrives
    if (settled && !group.visible) stop();
  }

  // A single still frame with the shape fully formed
  function still() {
    if (elapsed < GATHER) elapsed = GATHER + 2;
    update(elapsed, Infinity);
    renderer.render(scene, camera);
  }

  function start() {
    if (frameId !== null || document.hidden || reduceMotion.matches) return;
    last = performance.now(); // Skip the time spent paused so nothing jumps
    lastRender = 0;
    frameId = requestAnimationFrame(animate);
  }

  // Scrolling or pointer movement speeds frames back up, and restarts a stopped loop
  function onInput() {
    lastInput = performance.now();
    if (frameId === null) start();
  }

  function stop() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    measure();
    if (frameId === null) still();
    onInput();
  });
  // Scrolling speeds the animation up; with reduced motion it only updates the still frame
  window.addEventListener('scroll', () => {
    if (reduceMotion.matches) still();
    else onInput();
  }, { passive: true });
  // Pause while the tab is in the background
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  // Respect the OS "reduce motion" setting: show a still frame instead of animating
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      stop();
      still();
    } else {
      start();
    }
  });

  if (reduceMotion.matches) still();
  else start();
});
