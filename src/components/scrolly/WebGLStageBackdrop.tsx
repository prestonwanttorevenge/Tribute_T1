"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface WebGLStageBackdropProps {
  activeScene: number;
  sceneProgress: number;
  scrollVelocity: number;
}

const PARTICLE_COUNT = 1800;

interface ScenePalette {
  primary: number;
  secondary: number;
  ringColor: number;
  ringOpacity: number;
  gridOpacity: number;
}

const SCENE_PALETTES: Record<number, ScenePalette> = {
  0: { primary: 0x35d07f, secondary: 0x165e3a, ringColor: 0x35d07f, ringOpacity: 0.14, gridOpacity: 0.24 },
  1: { primary: 0xe4002b, secondary: 0x9fa6b2, ringColor: 0xe4002b, ringOpacity: 0.22, gridOpacity: 0.04 },
  2: { primary: 0xe5b84b, secondary: 0xfff0c2, ringColor: 0xe5b84b, ringOpacity: 0.24, gridOpacity: 0.03 },
  3: { primary: 0x7cb7f5, secondary: 0x3b618a, ringColor: 0x5c8dc4, ringOpacity: 0.14, gridOpacity: 0.0 },
  4: { primary: 0xe4002b, secondary: 0xe5b84b, ringColor: 0xe4002b, ringOpacity: 0.26, gridOpacity: 0.05 },
  5: { primary: 0xe4002b, secondary: 0xf7d070, ringColor: 0xe5b84b, ringOpacity: 0.28, gridOpacity: 0.04 },
  6: { primary: 0xe4002b, secondary: 0xf5f5f5, ringColor: 0xe5b84b, ringOpacity: 0.3, gridOpacity: 0.03 },
  7: { primary: 0xe5b84b, secondary: 0xff8a4c, ringColor: 0xe5b84b, ringOpacity: 0.24, gridOpacity: 0.02 },
  8: { primary: 0xe5b84b, secondary: 0xfff4d4, ringColor: 0xe5b84b, ringOpacity: 0.36, gridOpacity: 0.04 },
};

/**
 * Creates a soft radial glow texture on an offscreen 2D canvas for GPU point sprites.
 */
function createGlowSpriteTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.28, "rgba(255,255,255,0.72)");
  grad.addColorStop(0.65, "rgba(255,255,255,0.16)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function WebGLStageBackdrop({
  activeScene,
  sceneProgress,
  scrollVelocity,
}: WebGLStageBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    activeScene,
    sceneProgress,
    scrollVelocity,
  });

  useEffect(() => {
    stateRef.current.activeScene = activeScene;
    stateRef.current.sceneProgress = sceneProgress;
    stateRef.current.scrollVelocity = scrollVelocity;
  }, [activeScene, sceneProgress, scrollVelocity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      container.setAttribute("data-webgl-fallback", "true");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
    camera.position.set(0, 0, 14);

    // Resize sync without layout thrash or horizontal overflow
    const syncSize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    syncSize();
    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);

    // Dual-color GPU particle field (1,800 particles)
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 4); // [phase, radius, angleOffset, lane]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.4 + Math.random() * 10.5;
      const y = (Math.random() - 0.5) * 14;

      positions[i3] = Math.cos(theta) * r;
      positions[i3 + 1] = y;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;

      seeds[i4] = Math.random() * Math.PI * 2;
      seeds[i4 + 1] = r;
      seeds[i4 + 2] = theta;
      seeds[i4 + 3] = Math.random(); // 0..0.5 vs 0.5..1 split
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const spriteTexture = createGlowSpriteTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.17,
      map: spriteTexture ?? undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, particleMaterial);
    scene.add(points);

    // Perspective CRT / horizon grid (strongest in Scene 0, subtle wire horizon elsewhere)
    const gridHelper = new THREE.GridHelper(44, 34, 0x35d07f, 0x165e3a);
    gridHelper.position.set(0, -4.6, -2);
    const gridMats = Array.isArray(gridHelper.material)
      ? gridHelper.material
      : [gridHelper.material];
    gridMats.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.2;
      m.depthWrite = false;
    });
    scene.add(gridHelper);

    // 6 Gyroscopic Orbital Rings (architecture + championship finale halo)
    const ringsGroup = new THREE.Group();
    const ringGeometries: THREE.TorusGeometry[] = [];
    const ringMaterials: THREE.MeshBasicMaterial[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const radius = 3.2 + i * 0.72;
      const tube = i % 2 === 0 ? 0.016 : 0.01;
      const torusGeo = new THREE.TorusGeometry(radius, tube, 8, 96);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0xe5b84b,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(torusGeo, torusMat);
      mesh.rotation.x = 1.08 + i * 0.16;
      mesh.rotation.y = i * 0.42;
      ringGeometries.push(torusGeo);
      ringMaterials.push(torusMat);
      ringMeshes.push(mesh);
      ringsGroup.add(mesh);
    }
    scene.add(ringsGroup);

    // Pointer parallax state
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      pointer.targetX = nx;
      pointer.targetY = ny;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Reusable Three Color scratch objects to avoid GC pressure in rAF
    const colA = new THREE.Color();
    const colB = new THREE.Color();
    const currentRingCol = new THREE.Color(0xe5b84b);
    const targetRingCol = new THREE.Color();
    let smoothVelocity = 0;
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      const { activeScene: sc, sceneProgress: prog, scrollVelocity: vel } = stateRef.current;
      const clampedProg = Math.min(Math.max(prog, 0), 1);
      const palette = SCENE_PALETTES[sc] ?? SCENE_PALETTES[0];

      const speedFactor = prefersReducedMotion ? 0.12 : 1;
      smoothVelocity += (Math.max(-18, Math.min(18, vel)) - smoothVelocity) * 0.1;

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      // Camera parallax + velocity zoom pulse
      const targetCamZ = 14 - Math.min(Math.abs(smoothVelocity) * 0.12, 2.1);
      camera.position.x = pointer.x * 1.15;
      camera.position.y = -pointer.y * 0.85;
      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.lookAt(0, 0, 0);

      // Update grid opacity & scroll motion
      gridHelper.position.z = ((elapsed * 1.4 * speedFactor) % 1.3) - 2.0;
      const baseGridColor = sc === 0 ? 0x35d07f : 0xe4002b;
      gridMats.forEach((m, idx) => {
        if ("opacity" in m) {
          m.opacity += (palette.gridOpacity - m.opacity) * 0.08;
        }
        if (idx === 0 && "color" in m && m.color instanceof THREE.Color) {
          m.color.setHex(baseGridColor);
        }
      });

      // Update orbital rings per scene
      targetRingCol.setHex(palette.ringColor);
      currentRingCol.lerp(targetRingCol, 0.08);
      ringsGroup.rotation.y += (0.09 + Math.abs(smoothVelocity) * 0.02) * dt * speedFactor;

      ringMeshes.forEach((mesh, idx) => {
        const mat = ringMaterials[idx];
        mat.color.copy(currentRingCol);
        const targetOp =
          sc === 8
            ? 0.24 + 0.12 * Math.sin(elapsed * 1.8 + idx * 0.8)
            : palette.ringOpacity * (1 - idx * 0.09);
        mat.opacity += (targetOp - mat.opacity) * 0.08;

        const dir = idx % 2 === 0 ? 1 : -1;
        const speedMult =
          sc === 1 || sc === 4 || sc === 6 ? 0.34 : sc === 8 ? 0.22 : 0.14;
        mesh.rotation.z += dir * speedMult * (1 + idx * 0.12) * dt * speedFactor;

        if (sc === 5) {
          // Heartbeat double-pulse scale
          const beat = Math.pow(Math.abs(Math.sin(elapsed * 2.2)), 6) * 0.1;
          const s = 1 + beat + clampedProg * 0.14;
          mesh.scale.set(s, s, s);
        } else if (sc === 8) {
          const s = 1.05 + idx * 0.04;
          mesh.scale.set(s, s, s);
          mesh.rotation.x = 0.72 + Math.sin(elapsed * 0.4 + idx) * 0.35;
        } else {
          const targetS = 0.92 + clampedProg * 0.18;
          mesh.scale.lerp(new THREE.Vector3(targetS, targetS, targetS), 0.06);
        }
      });

      // Update particle positions & dual colors
      const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const colAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      colA.setHex(palette.primary);
      colB.setHex(palette.secondary);

      const t = elapsed * speedFactor;
      const lerpGain = prefersReducedMotion ? 0.03 : 0.085;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const i4 = i * 4;
        const phase = seeds[i4];
        const baseR = seeds[i4 + 1];
        const baseTheta = seeds[i4 + 2];
        const lane = seeds[i4 + 3];

        let tx = posArr[i3];
        let ty = posArr[i3 + 1];
        let tz = posArr[i3 + 2];
        const c = lane < 0.52 ? colA : colB;

        if (sc === 0) {
          // CRT emerald scan drift
          tx = (lane - 0.5) * 20;
          ty = 7 - (((t * 1.6 + phase * 3.0) % 14));
          tz = Math.sin(baseTheta) * 5.5 - 2;
        } else if (sc === 1) {
          // Zed crimson shadow astrolabe
          const ang = baseTheta + t * (0.55 + clampedProg * 0.65);
          const rad = Math.max(1.2, baseR * (1.05 - clampedProg * 0.35));
          tx = Math.cos(ang) * rad;
          ty = Math.sin(ang) * rad * 0.65;
          tz = Math.sin(phase + t * 2) * 3.5;
        } else if (sc === 2) {
          // Ascending gold dynasty helix
          const ang = baseTheta + t * 0.42 + yWave(phase);
          tx = Math.cos(ang) * (2.5 + baseR * 0.48);
          ty = ((phase * 2.2 + t * 0.9) % 13) - 6.5;
          tz = Math.sin(ang) * (2.5 + baseR * 0.48);
        } else if (sc === 3) {
          // Slanted Bird's Nest rain streaks
          const fall = (t * (4.8 + lane * 3.0) + phase * 5) % 15;
          ty = 7.5 - fall;
          tx = (lane - 0.5) * 22 + fall * 0.14;
          tz = Math.cos(baseTheta) * 5.5 - 1;
        } else if (sc === 4) {
          // ZOFGK crimson/gold helix -> shockwave beyond 0.65
          const shock = clampedProg > 0.65 ? (clampedProg - 0.65) * 14 : 0;
          const ang = baseTheta + t * 0.72;
          const rad = baseR * 0.6 + shock;
          tx = Math.cos(ang) * rad;
          ty = Math.sin(phase + t * 1.3) * 5.2;
          tz = Math.sin(ang) * rad;
        } else if (sc === 5) {
          // Seoul/London supernova heartbeat shell
          const beat = Math.pow(Math.abs(Math.sin(t * 2.3)), 6) * 1.4;
          const rad = 2.8 + baseR * 0.42 + beat + clampedProg * 1.2;
          const phi = phase * 0.5;
          const ang = baseTheta + t * 0.32;
          tx = Math.cos(ang) * Math.sin(phi) * rad;
          ty = Math.cos(phi) * rad * 0.85;
          tz = Math.sin(ang) * Math.sin(phi) * rad;
        } else if (sc === 6) {
          // Chengdu Red (Left) vs White (Right) vortex collision into center supernova
          const isLeft = lane < 0.5;
          const clash = Math.sin(t * 1.4 + phase) * (1 - clampedProg * 0.55);
          const centerPull = 1 - clampedProg * 0.68;
          const swirlAngle = baseTheta + t * (isLeft ? 1.1 : -1.1);
          const vortexX = (isLeft ? -5.2 : 5.2) * centerPull + Math.cos(swirlAngle) * (2.8 + clash);
          const burst = clampedProg > 0.6 ? (clampedProg - 0.6) * 5.5 : 0;
          tx = vortexX + Math.cos(baseTheta) * burst;
          ty = Math.sin(swirlAngle) * (3.4 + baseR * 0.25) + Math.sin(phase) * burst * 0.6;
          tz = Math.sin(baseTheta * 2 + t) * 3.5;
        } else if (sc === 7) {
          // Twilight golden embers ascending slowly
          tx = Math.cos(baseTheta + t * 0.2) * (1.8 + baseR * 0.75);
          ty = ((phase * 3.0 + t * 0.65) % 14) - 7;
          tz = Math.sin(baseTheta + t * 0.2) * 5.2;
        } else {
          // Scene 8: 6-Star majestic crown field
          const ang = baseTheta + t * 0.28;
          const crownR = 2.6 + (i % 6) * 1.05;
          tx = Math.cos(ang) * crownR;
          ty = Math.sin(ang) * crownR * 0.62 + Math.sin(t + phase) * 0.4;
          tz = Math.sin(ang * 2) * 2.4;
        }

        posArr[i3] += (tx - posArr[i3]) * lerpGain;
        posArr[i3 + 1] += (ty - posArr[i3 + 1]) * lerpGain;
        posArr[i3 + 2] += (tz - posArr[i3 + 2]) * lerpGain;

        colArr[i3] += (c.r - colArr[i3]) * 0.08;
        colArr[i3 + 1] += (c.g - colArr[i3 + 1]) * 0.08;
        colArr[i3 + 2] += (c.b - colArr[i3 + 2]) * 0.08;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      particleMaterial.dispose();
      spriteTexture?.dispose();
      gridHelper.geometry.dispose();
      gridMats.forEach((m) => m.dispose());
      ringGeometries.forEach((g) => g.dispose());
      ringMaterials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="webgl-backdrop absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}

function yWave(phase: number): number {
  return Math.sin(phase) * 0.6;
}
