import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTheme } from "../context/ThemeContext";

// Couleurs des "clusters" — cohérentes avec la palette du thème (index.css)
const CLUSTER_COLORS = [0xb98cf2, 0xf2b84b, 0xf0709c];

function makeCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.9)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Génère un nuage de points gaussien autour d'un centre (façon embeddings/t-SNE)
function gaussianCluster(center, count, spread) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Box-Muller pour une distribution normale sur chaque axe
    const u1 = Math.random();
    const u2 = Math.random();
    const u3 = Math.random();
    const u4 = Math.random();
    const g1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const g2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    const g3 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4);
    positions.push(
      center[0] + g1 * spread,
      center[1] + g2 * spread,
      center[2] + g3 * spread
    );
  }
  return positions;
}

function buildAxes(scene, theme) {
  const group = new THREE.Group();
  const axisLength = 5.2;
  const lineColor = theme === "light" ? 0xc7cfdb : 0x2a3441;
  const gridColor1 = theme === "light" ? 0xd7dde6 : 0x1f2732;
  const gridColor2 = theme === "light" ? 0xe9edf3 : 0x161d27;

  const axisMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.55,
  });

  const axes = [
    [new THREE.Vector3(-axisLength, 0, 0), new THREE.Vector3(axisLength, 0, 0)],
    [new THREE.Vector3(0, -axisLength, 0), new THREE.Vector3(0, axisLength, 0)],
    [new THREE.Vector3(0, 0, -axisLength), new THREE.Vector3(0, 0, axisLength)],
  ];

  axes.forEach(([a, b]) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
    group.add(new THREE.Line(geometry, axisMaterial));
  });

  // Petit repère de sol type "papier millimétré" pour ancrer le nuage de points
  const grid = new THREE.GridHelper(11, 22, gridColor1, gridColor2);
  grid.position.y = -3.4;
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  group.add(grid);

  scene.add(group);
  return group;
}

export default function EmbeddingScene({ className = "" }) {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(6.5, 3.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    buildAxes(scene, theme);

    const sprite = makeCircleTexture();
    const clusterCenters = [
      [-2.3, 0.6, 0],
      [1.8, -1.1, 1.4],
      [0.2, 1.7, -1.8],
    ];

    const pointsGroup = new THREE.Group();
    clusterCenters.forEach((center, i) => {
      const positions = gaussianCluster(center, 130, 1.05);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      const material = new THREE.PointsMaterial({
        color: CLUSTER_COLORS[i],
        size: 0.11,
        map: sprite,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      pointsGroup.add(new THREE.Points(geometry, material));
    });
    scene.add(pointsGroup);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.minPolarAngle = Math.PI / 2 - 0.9;
    controls.maxPolarAngle = Math.PI / 2 + 0.9;

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      pointsGroup.rotation.y = Math.sin(t * 0.05) * 0.05;
      pointsGroup.position.y = Math.sin(t * 0.4) * 0.06;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      controls.autoRotate = false;
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      pointsGroup.children.forEach((p) => {
        p.geometry.dispose();
        p.material.dispose();
      });
      sprite.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
