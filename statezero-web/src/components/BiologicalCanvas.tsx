"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DNAKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // slow rotation on all axes
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.z = t * 0.06;
    // bob up and down — nucleoplasm float
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.25;
  });

  return (
    <TorusKnot ref={meshRef} args={[1, 0.32, 200, 24, 2, 3]}>
      <MeshDistortMaterial
        color="#7C3AED"
        emissive="#5B21B6"
        emissiveIntensity={0.6}
        roughness={0.15}
        metalness={0.4}
        distort={0.25}
        speed={1.4}
        transparent
        opacity={0.92}
      />
    </TorusKnot>
  );
}

export default function BiologicalCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        style={{ background: "transparent" }}
      >
        {/* soft fill */}
        <ambientLight intensity={0.4} />
        {/* key light — violet tint to match brand */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.2}
          color="#C4B5FD"
        />
        {/* rim light — neon green edge catch */}
        <directionalLight
          position={[-4, -3, -2]}
          intensity={0.5}
          color="#22C55E"
        />
        <DNAKnot />
      </Canvas>
    </div>
  );
}
