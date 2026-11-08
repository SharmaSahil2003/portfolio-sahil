import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { RuntimeTraceCanvasProps } from "./RuntimeTraceScene";

export function RuntimeTraceCanvas({ onFailure, reducedMotion, variant }: RuntimeTraceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.innerWidth > 700,
      });
    } catch {
      onFailure();
      return;
    }

    const compact = window.matchMedia("(max-width: 680px)").matches;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, compact ? 1 : variant === "hero" ? 2 : 1.5),
    );
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 40);
    camera.position.set(0, 0, 6.8);

    const system = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(1.38, 1);
    const edgeGeometry = new THREE.EdgesGeometry(geometry, 14);
    const wire = new THREE.LineSegments(
      edgeGeometry,
      new THREE.LineBasicMaterial({ color: 0xe6ad55, transparent: true, opacity: 0.74 }),
    );
    system.add(wire);

    const nodes = new THREE.Points(
      geometry.clone(),
      new THREE.PointsMaterial({
        color: 0x83c9c7,
        size: compact ? 0.055 : 0.06,
        sizeAttenuation: true,
      }),
    );
    system.add(nodes);

    const focusGeometry = new THREE.SphereGeometry(compact ? 0.09 : 0.1, 12, 10);
    const focusMaterial = new THREE.MeshBasicMaterial({ color: 0x83c9c7 });
    const focusNode = new THREE.Mesh(focusGeometry, focusMaterial);
    focusNode.visible = false;
    if (variant === "hero") system.add(focusNode);

    const orbitGeometry = new THREE.TorusGeometry(1.75, 0.006, 4, 96);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x83c9c7,
      transparent: true,
      opacity: 0.3,
    });
    const orbitA = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitA.rotation.set(0.9, 0.12, -0.35);
    const orbitB = new THREE.Mesh(
      orbitGeometry.clone(),
      new THREE.MeshBasicMaterial({ color: 0xe6ad55, transparent: true, opacity: 0.24 }),
    );
    orbitB.rotation.set(0.35, 1.02, 0.62);
    system.add(orbitA, orbitB);

    const anchors = new THREE.Group();
    const anchorGeometry = new THREE.SphereGeometry(0.045, 8, 6);
    const anchorMaterial = new THREE.MeshBasicMaterial({ color: 0xe6ad55 });
    const anchorPoints = [
      new THREE.Vector3(-1.8, 0.55, 0),
      new THREE.Vector3(1.65, 0.1, 0.25),
      new THREE.Vector3(0.25, -1.82, -0.1),
    ];
    anchorPoints.forEach((position) => {
      const anchor = new THREE.Mesh(anchorGeometry, anchorMaterial);
      anchor.position.copy(position);
      anchors.add(anchor);
    });
    system.add(anchors);
    scene.add(system);

    const size = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let visible = true;
    let inViewport = true;
    let frame = 0;
    let lastDraw = 0;
    let scroll = window.scrollY;
    let pointerX = 0;
    let pointerY = 0;
    const target = new THREE.Vector2();

    const render = (time: number) => {
      if (!visible || !inViewport) return;
      const targetFrame = variant === "hero" ? 1000 / 60 : 1000 / 30;
      if (time - lastDraw >= targetFrame || reducedMotion) {
        lastDraw = time;
        target.set(pointerY * 0.18, scroll * 0.00022 + pointerX * 0.18);
        if (!reducedMotion) {
          system.rotation.x += (target.x - system.rotation.x) * 0.05;
          system.rotation.y += (target.y - system.rotation.y) * 0.05;
          system.rotation.z += 0.0016;
          orbitA.rotation.z += 0.001;
          orbitB.rotation.y -= 0.0012;
        }
        renderer.render(scene, camera);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inViewport = Boolean(entry?.isIntersecting);
      cancelAnimationFrame(frame);
      if (inViewport) frame = requestAnimationFrame(render);
    });
    observer.observe(canvas);

    const onResize = () => {
      size();
      if (reducedMotion) render(performance.now());
    };
    const onScroll = () => {
      scroll = window.scrollY;
      if (reducedMotion) render(performance.now());
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (variant === "hero") {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const y = (event.clientY - rect.top) / Math.max(rect.height, 1);
        const inStage = x >= 0 && x <= 1 && y >= 0 && y <= 1;
        focusNode.visible = inStage && !reducedMotion;
        if (inStage) {
          pointerX = x - 0.5;
          pointerY = y - 0.5;
          const attribute = geometry.getAttribute("position");
          const targetX = (x - 0.5) * 2.4;
          const targetY = (0.5 - y) * 2.4;
          let nearest = 0;
          let nearestDistance = Number.POSITIVE_INFINITY;
          for (let index = 0; index < attribute.count; index += 1) {
            const dx = attribute.getX(index) - targetX;
            const dy = attribute.getY(index) - targetY;
            const distance = dx * dx + dy * dy;
            if (distance < nearestDistance) {
              nearest = index;
              nearestDistance = distance;
            }
          }
          focusNode.position.set(
            attribute.getX(nearest),
            attribute.getY(nearest),
            attribute.getZ(nearest),
          );
        }
        return;
      }
      pointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
    };
    const onVisibility = () => {
      visible = !document.hidden;
      cancelAnimationFrame(frame);
      if (visible && inViewport) frame = requestAnimationFrame(render);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };

    size();
    render(performance.now());
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      edgeGeometry.dispose();
      orbitGeometry.dispose();
      nodes.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      (nodes.material as THREE.Material).dispose();
      orbitMaterial.dispose();
      (orbitB.material as THREE.Material).dispose();
      anchorGeometry.dispose();
      anchorMaterial.dispose();
      focusGeometry.dispose();
      focusMaterial.dispose();
      renderer.dispose();
    };
  }, [onFailure, reducedMotion, variant]);

  return <canvas ref={canvasRef} className="runtime-trace-webgl" />;
}
