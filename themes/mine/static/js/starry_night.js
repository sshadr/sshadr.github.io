
// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  console.log("WebGL background script started");
  // Check for WebGL support
  if (!THREE.WEBGL.isWebGLAvailable()) {
    const warning = THREE.WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
    return;
  }

  let scene, camera, renderer, particles, clock;

  function init() {
    // Scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x111111); // Removed to allow theme background to show
    clock = new THREE.Clock();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    let canvas = document.getElementById('gl');

    // If canvas doesn't exist (e.g. on the main site), create it dynamically
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'gl';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '-1';
      document.body.prepend(canvas);
    }

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particleCount = 5000;
    const vertices = [];
    const colors = [];
    const colorPalette = [0x00ffff, 0xff00ff, 0xffd000, 0xff0088]; // Cyan, Magenta, Yellow, Pink
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      vertices.push(x, y, z);

      // Assign random color from palette
      tempColor.setHex(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Use ShaderMaterial to draw a Gaussian function per point
    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = 200.0 / -mvPosition.z; // Size attenuation
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float distSq = dot(coord, coord);
          float alpha = exp(-distSq * 20.0); // Gaussian function
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Animate particles
    if (particles) {
      particles.rotation.y += delta * 0.0;
      particles.rotation.x += delta * 0.05;
    }

    renderer.render(scene, camera);
  }

  init();
  animate();
});